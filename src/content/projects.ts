import type { Locale } from "@/i18n/routing";

/**
 * REFERANS PROJELERİ
 *
 * Bu dizi bilinçli olarak BOŞ bırakıldı. Gerçek müşteri adı ve fotoğrafı
 * olmadan referans üretmek, sitede doğrulanamayan bir iddia oluşturur —
 * hem etik olarak yanlış hem de Google'ın "deneyim" (E-E-A-T) sinyalleri
 * açısından zararlıdır.
 *
 * Fotoğraflar geldiğinde:
 *  1. Görselleri `public/images/portfolio/` altına koyun (tercihen 1600px
 *     genişlik, .webp veya .jpg).
 *  2. Aşağıdaki örneğe bakarak `projects` dizisini doldurun.
 *  3. Başka hiçbir yeri değiştirmeye gerek yok — anasayfa teaser'ı,
 *     /referanslar sayfası, filtreler ve sitemap otomatik güncellenir.
 *
 * Örnek kayıt:
 *
 * {
 *   id: "avm-magaza-kutu-harf",
 *   slug: { tr: "avm-magaza-kutu-harf", en: "mall-store-channel-letters" },
 *   serviceId: "kutu-harf-tabela",
 *   regionId: "atakum",
 *   year: 2025,
 *   cover: "/images/portfolio/avm-magaza-kutu-harf.webp",
 *   gallery: ["/images/portfolio/avm-magaza-kutu-harf-2.webp"],
 *   copy: {
 *     tr: {
 *       title: "AVM Mağaza Cephesi — Kutu Harf",
 *       client: "Müşteri adı (izin alındıysa)",
 *       summary: "Halo aydınlatmalı kutu harf uygulaması, 6 metre cephe.",
 *       description: ["Detaylı anlatım paragrafı..."],
 *       scope: ["Tasarım", "İmalat", "Montaj"],
 *     },
 *     en: { ... },
 *   },
 * }
 */

export interface ProjectCopy {
  title: string;
  client?: string;
  summary: string;
  description: string[];
  scope: string[];
}

export interface Project {
  id: string;
  slug: Record<Locale, string>;
  /** İlişkili hizmetin id'si — filtreleme ve iç linkleme için */
  serviceId: string;
  /** İlişkili bölgenin id'si (varsa) */
  regionId?: string;
  year: number;
  cover: string;
  gallery?: string[];
  copy: Record<Locale, ProjectCopy>;
}

export const projects: Project[] = [];

export const hasProjects = projects.length > 0;

export function getProjectBySlug(slug: string, locale: Locale): Project | undefined {
  return projects.find((project) => project.slug[locale] === slug);
}

export function allProjectSlugs(locale: Locale): string[] {
  return projects.map((project) => project.slug[locale]);
}

/** Filtre çubuğu için, yalnızca gerçekten proje bulunan hizmetler. */
export function projectServiceIds(): string[] {
  return Array.from(new Set(projects.map((project) => project.serviceId)));
}
