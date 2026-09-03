/**
 * Kurumsal sabitler — NAP (Name / Address / Phone) tek kaynaktan yönetilir.
 * Google Business Profile ile BİREBİR aynı olmalı; yerel SEO sinyalinin
 * temeli budur. Buradaki değerler JSON-LD, footer ve iletişim sayfasını besler.
 */

export const siteConfig = {
  name: "Royal Reklam",
  /**
   * Site kimliği: sekme başlığı, og:site_name ve WebSite şeması burayı
   * kullanır. `name` ise metin içinde geçen konuşma dilindeki addır
   * ("Merhaba Royal Reklam, ..."), `legalName` tescilli unvandır.
   */
  siteName: "Royal Reklam Samsun",
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
    /** Google Business Profile kaydındaki posta kodu */
    postalCode: "55000",
    region: "Samsun",
    country: "TR",
    countryName: { tr: "Türkiye", en: "Türkiye" },
    full: "Hürriyet Mah. Levent Özalpay Sok. No: 6/B, İlkadım / SAMSUN",
  },

  /**
   * Google Maps kaydındaki pin koordinatı (`mapsDirectionsLink` içindeki
   * yer koordinatı). Önceki değer (41.2867, 36.3253) yaklaşık 600 m
   * kuzeybatıda, başka bir sokağı işaret ediyordu.
   */
  geo: {
    latitude: 41.2860449,
    longitude: 36.3329812,
  },

  openingHours: {
    weekdays: { opens: "09:00", closes: "19:00" },
    saturday: { opens: "09:00", closes: "17:00" },
  },

  team: {
    artDirector: "İsak Bahar",
    /**
     * Telefon ve WhatsApp hattını yanıtlayan kişi. İletişim sayfasında
     * gösterilir — arayan kimi aradığını bilsin diye.
     */
    contactPerson: "İsak Bahar",
  },

  /**
   * IndexNow anahtarı. Yandex ve Bing'e "bu sayfa değişti" bildirimi
   * göndermek için kullanılır; anahtar `public/<anahtar>.txt` dosyasında
   * aynı değerle yayınlanmak zorundadır. `npm run indexnow` ile gönderilir.
   */
  indexNowKey: "0d8b2e1949b240e413d04ec3ea9fe2c5",

  /**
   * Arama motoru doğrulama kodları. Google Search Console ve Yandex
   * Webmaster panelinden alınıp buraya yazılır; boşken etiket basılmaz.
   */
  verification: {
    google: "mILkywoxa56C0yfyiXLMI9WJNpa7bXxL19PXeIBTVbI",
    yandex: "",
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
export const mapsDirectionsLink = "https://www.google.com/maps/place/ROYAL+REKLAM/@41.2860489,36.3304063,17z/data=!3m1!4b1!4m6!3m5!1s0x408877aaba355701:0xbee1f0d2b79ca40c!8m2!3d41.2860449!4d36.3329812!16s%2Fg%2F11lynszrmg?hl=eu&entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D";

/**
 * Gömülü harita (API anahtarı gerektirmeyen embed biçimi).
 *
 * Sorguya işletme adı da eklenir: yalnızca adresle arandığında Google
 * geocode'u tutturamayıp haritayı Samsun geneline açıyor. Ad + adres ile
 * gerçek işletme kaydı bulunur ve pin "ROYAL REKLAM" etiketiyle çıkar.
 */
export const mapsEmbedLink = `https://www.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.name} ${siteConfig.address.full}`,
)}&z=17&output=embed`;
