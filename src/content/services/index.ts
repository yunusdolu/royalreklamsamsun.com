import type { Locale } from "@/i18n/routing";
import { servicesEn } from "./en";
import { servicesTr } from "./tr";
import type { Service, ServiceCopy } from "./types";

export type { Service, ServiceCopy, ServiceFaq, ServiceSpec } from "./types";

/**
 * Hizmet kayıtları. Sıralama anasayfa ve menüdeki gösterim sırasıdır.
 * Slug'lar her dilde ayrıdır — `/hizmetler/kutu-harf-tabela` ↔
 * `/en/services/channel-letter-signs`.
 */
const definitions: Omit<Service, "copy">[] = [
  {
    id: "isikli-tabela",
    slug: { tr: "isikli-tabela", en: "illuminated-signage" },
    icon: "Lightbulb",
    image: "/images/portfolio/proje-29.jpg",
    featured: true,
    leadTimeDays: [5, 10],
  },
  {
    id: "kutu-harf-tabela",
    slug: { tr: "kutu-harf-tabela", en: "channel-letter-signs" },
    icon: "Type",
    image: "/images/portfolio/proje-16.jpg",
    featured: true,
    leadTimeDays: [7, 12],
  },
  {
    id: "totem-tabela",
    slug: { tr: "totem-tabela", en: "totem-pylon-signs" },
    icon: "Milestone",
    image: "/images/portfolio/proje-32.jpg",
    featured: true,
    leadTimeDays: [10, 20],
  },
  {
    id: "lightbox-tabela",
    slug: { tr: "lightbox-tabela", en: "lightbox-displays" },
    icon: "SquareStack",
    image: "/images/portfolio/proje-43.jpg",
    featured: true,
    leadTimeDays: [4, 8],
  },
  {
    id: "cephe-giydirme",
    slug: { tr: "cephe-giydirme", en: "facade-cladding" },
    icon: "Building2",
    image: "/images/portfolio/proje-34.jpg",
    featured: true,
    leadTimeDays: [7, 28],
  },
  {
    id: "arac-giydirme",
    slug: { tr: "arac-giydirme", en: "vehicle-wrapping" },
    icon: "Car",
    featured: true,
    leadTimeDays: [1, 3],
  },
  {
    id: "dijital-baski",
    slug: { tr: "dijital-baski", en: "large-format-printing" },
    icon: "Printer",
    image: "/images/portfolio/proje-20.jpg",
    featured: false,
    leadTimeDays: [1, 3],
  },
  {
    id: "kurumsal-kimlik",
    slug: { tr: "kurumsal-kimlik", en: "brand-identity" },
    icon: "Palette",
    image: "/images/portfolio/proje-17.jpg",
    featured: false,
    leadTimeDays: [7, 21],
  },
  {
    id: "etiket-sticker",
    slug: { tr: "etiket-sticker", en: "labels-and-stickers" },
    icon: "Tags",
    featured: false,
    leadTimeDays: [1, 3],
  },
  {
    id: "imalat-tasarim-montaj",
    slug: { tr: "imalat-tasarim-montaj", en: "manufacturing-and-installation" },
    icon: "HardHat",
    image: "/images/portfolio/proje-36.jpg",
    featured: false,
    leadTimeDays: [5, 15],
  },
  {
    id: "yol-panolari",
    slug: { tr: "yol-panolari", en: "road-signs" },
    icon: "SignpostBig",
    featured: false,
    leadTimeDays: [10, 15],
  },
  {
    id: "led-ekranlar",
    slug: { tr: "led-ekranlar", en: "led-screens" },
    icon: "MonitorPlay",
    featured: false,
    leadTimeDays: [15, 30],
  },
];

const copyByLocale: Record<Locale, Record<string, ServiceCopy>> = {
  tr: servicesTr,
  en: servicesEn,
};

export const services: Service[] = definitions.map((definition) => ({
  ...definition,
  copy: {
    tr: servicesTr[definition.id],
    en: servicesEn[definition.id],
  },
}));

export const featuredServices = services.filter((service) => service.featured);

/** Verilen dildeki slug'a karşılık gelen hizmeti bulur. */
export function getServiceBySlug(
  slug: string,
  locale: Locale,
): Service | undefined {
  return services.find((service) => service.slug[locale] === slug);
}

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

/** Bir hizmetin belirli dildeki metinlerini döndürür. */
export function getServiceCopy(id: string, locale: Locale): ServiceCopy {
  return copyByLocale[locale][id];
}

/** sitemap.ts ve generateStaticParams için tüm slug'lar. */
export function allServiceSlugs(locale: Locale): string[] {
  return services.map((service) => service.slug[locale]);
}
