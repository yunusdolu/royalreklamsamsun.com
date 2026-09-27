import type { Locale } from "@/i18n/routing";
import { servicesEn } from "./en";
import { servicesTr } from "./tr";
import type { Service, ServiceCopy } from "./types";

export type {
  Service,
  ServiceCopy,
  ServiceFaq,
  ServiceSpec,
  ServiceVariant,
} from "./types";

/**
 * Hizmet kayıtları. Sıralama anasayfa ve menüdeki gösterim sırasıdır.
 * Slug'lar her dilde ayrıdır — `/hizmetler/kutu-harf-tabela` ↔
 * `/en/services/channel-letter-signs`.
 */
const definitions: Omit<Service, "copy">[] = [
  {
    /**
     * Görünen adı "Tabela"; kapsamı ışıklının yanına kör kasa gibi ışıksız
     * tipleri de aldığı için genişletildi. İç kimlik bilerek değiştirilmedi:
     * projects, posts ve regions dosyalarında 25 yerde referans veriliyor ve
     * kullanıcıya hiç görünmüyor. Eski adresten yenisine yönlendirme
     */
    id: "isikli-tabela",
    slug: { tr: "tabela", en: "signage" },
    icon: "Lightbulb",
    image: "/images/services/cards/isikli-tabela.jpg",
    heroImage: "/images/services/hero/isikli-tabela.jpg",
    heroFocus: "22% center",
    featured: true,
    leadTimeDays: [5, 10],
  },
  {
    id: "kutu-harf-tabela",
    slug: { tr: "kutu-harf-tabela", en: "channel-letter-signs" },
    icon: "Type",
    image: "/images/services/cards/kutu-harf-tabela.jpg",
    heroImage: "/images/services/hero/kutu-harf-tabela.jpg",
    heroFocus: "58% center",
    featured: true,
    leadTimeDays: [7, 12],
  },
  {
    id: "totem-tabela",
    slug: { tr: "totem-tabela", en: "totem-pylon-signs" },
    icon: "Milestone",
    image: "/images/services/cards/totem-tabela.jpg",
    heroImage: "/images/services/hero/totem-tabela.jpg",
    heroFocus: "88% center",
    featured: true,
    leadTimeDays: [10, 20],
  },
  {
    id: "lightbox-tabela",
    slug: { tr: "lightbox-tabela", en: "lightbox-displays" },
    icon: "SquareStack",
    image: "/images/services/cards/lightbox-tabela.jpg",
    heroImage: "/images/services/hero/lightbox-tabela.jpg",
    heroFocus: "93% center",
    featured: true,
    leadTimeDays: [4, 8],
  },
  {
    id: "cephe-giydirme",
    slug: { tr: "cephe-giydirme", en: "facade-cladding" },
    icon: "Building2",
    image: "/images/services/cards/cephe-giydirme.jpg",
    heroImage: "/images/services/hero/cephe-giydirme.jpg",
    heroFocus: "69% center",
    featured: true,
    leadTimeDays: [7, 28],
  },
  {
    id: "arac-giydirme",
    slug: { tr: "arac-giydirme", en: "vehicle-wrapping" },
    icon: "Car",
    image: "/images/services/cards/arac-giydirme.jpg",
    heroImage: "/images/services/hero/arac-giydirme.jpg",
    heroFocus: "93% center",
    featured: true,
    leadTimeDays: [1, 3],
  },
  {
    id: "dijital-baski",
    slug: { tr: "dijital-baski", en: "large-format-printing" },
    icon: "Printer",
    image: "/images/services/cards/dijital-baski.jpg",
    heroImage: "/images/services/hero/dijital-baski.jpg",
    heroFocus: "82% center",
    featured: false,
    leadTimeDays: [1, 3],
  },
  {
    id: "kurumsal-kimlik",
    slug: { tr: "kurumsal-kimlik", en: "brand-identity" },
    icon: "Palette",
    image: "/images/services/cards/kurumsal-kimlik.jpg",
    heroImage: "/images/services/hero/kurumsal-kimlik.jpg",
    featured: false,
    leadTimeDays: [7, 21],
  },
  {
    id: "etiket-sticker",
    slug: { tr: "etiket-sticker", en: "labels-and-stickers" },
    icon: "Tags",
    image: "/images/services/cards/etiket-sticker.jpg",
    heroImage: "/images/services/hero/etiket-sticker.jpg",
    heroFocus: "84% center",
    featured: false,
    leadTimeDays: [1, 3],
  },
  {
    id: "imalat-tasarim-montaj",
    slug: { tr: "imalat-tasarim-montaj", en: "manufacturing-and-installation" },
    icon: "HardHat",
    image: "/images/services/cards/imalat-tasarim-montaj.jpg",
    heroImage: "/images/services/hero/imalat-tasarim-montaj.jpg",
    heroFocus: "100% center",
    featured: false,
    leadTimeDays: [5, 15],
  },
  {
    id: "yol-panolari",
    slug: { tr: "yol-panolari", en: "road-signs" },
    icon: "SignpostBig",
    image: "/images/services/cards/yol-panolari.jpg",
    heroImage: "/images/services/hero/yol-panolari.jpg",
    heroFocus: "99% center",
    featured: false,
    leadTimeDays: [10, 15],
  },
  {
    id: "led-ekranlar",
    slug: { tr: "led-ekranlar", en: "led-screens" },
    icon: "MonitorPlay",
    image: "/images/services/cards/led-ekranlar.jpg",
    heroImage: "/images/services/hero/led-ekranlar.jpg",
    heroFocus: "100% center",
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
