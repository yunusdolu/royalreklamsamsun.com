/**
 * Kurumsal sabitler — NAP (Name / Address / Phone) tek kaynaktan yönetilir.
 * Google Business Profile ile BİREBİR aynı olmalı; yerel SEO sinyalinin
 * temeli budur. Buradaki değerler JSON-LD, footer ve iletişim sayfasını besler.
 */

export const siteConfig = {
  name: "Royal Reklam",
  legalName: "Royal Reklam Açık Hava Reklamcılığı",
  tagline: {
    tr: "Açık Hava Reklamcılığı",
    en: "Outdoor Advertising",
  },
  url: "https://royalreklamsamsun.com",
  domain: "royalreklamsamsun.com",
  foundingYear: 2013,

  contact: {
    /** Görüntülenen biçim */
    phoneDisplay: "0544 230 71 77",
    /** tel: ve schema.org için E.164 */
    phoneE164: "+905442307177",
    /** wa.me için ülke kodlu, işaretsiz */
    whatsapp: "905442307177",
    email: "royalreklamsamsun@gmail.com",
    instagram: "https://www.instagram.com/royalreklam.tr/",
    instagramHandle: "@royalreklam.tr",
  },

  address: {
    street: "Hürriyet Mah. Levent Özalpay Sok. No: 6/B",
    district: "İlkadım",
    city: "Samsun",
    region: "Samsun",
    country: "TR",
    countryName: { tr: "Türkiye", en: "Türkiye" },
    full: "Hürriyet Mah. Levent Özalpay Sok. No: 6/B, İlkadım / SAMSUN",
  },

  /** TODO: Google Business Profile'daki kesin pin ile doğrulanmalı. */
  geo: {
    latitude: 41.2867,
    longitude: 36.3253,
  },

  openingHours: {
    weekdays: { opens: "09:00", closes: "19:00" },
    saturday: { opens: "09:00", closes: "17:00" },
  },

  team: {
    artDirector: "İshak Bal",
  },

  /** Türkiye geneli imalat + montaj, merkez Samsun. */
  serviceArea: {
    primary: "Samsun",
    scope: { tr: "Samsun merkezli, Türkiye geneli", en: "Based in Samsun, serving all of Türkiye" },
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Ön yazılı WhatsApp mesajı ile sohbet bağlantısı üretir. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${siteConfig.contact.phoneE164}`;
export const mailLink = `mailto:${siteConfig.contact.email}`;

/** Adres için Google Haritalar yol tarifi bağlantısı. */
export const mapsDirectionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${siteConfig.address.full}`,
)}`;

/** Gömülü harita (API anahtarı gerektirmeyen embed biçimi). */
export const mapsEmbedLink = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.address.full,
)}&output=embed`;
