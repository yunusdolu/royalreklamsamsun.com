import { defineRouting } from "next-intl/routing";

/**
 * Yönlendirme yapılandırması.
 *
 * - Varsayılan dil Türkçe ve ÖN EK ALMAZ (`/hizmetler`), İngilizce `/en` alır.
 * - `pathnames` sayesinde her dil kendi anlamlı URL'ine sahip olur
 *   (`/hizmetler` ↔ `/en/services`) — çok dilli SEO için kritik.
 * - `localeDetection: false`: tarayıcı dili yüzünden Türk kullanıcıyı
 *   `/en`'e atmayı engeller. Samsun odaklı bir işletme için doğru davranış.
 */
export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/hizmetler": { tr: "/hizmetler", en: "/services" },
    "/hizmetler/[slug]": { tr: "/hizmetler/[slug]", en: "/services/[slug]" },
    "/referanslar": { tr: "/referanslar", en: "/portfolio" },
    "/referanslar/[slug]": { tr: "/referanslar/[slug]", en: "/portfolio/[slug]" },
    "/bolgeler": { tr: "/bolgeler", en: "/service-areas" },
    "/bolgeler/[slug]": { tr: "/bolgeler/[slug]", en: "/service-areas/[slug]" },
    "/hakkimizda": { tr: "/hakkimizda", en: "/about" },
    "/blog": { tr: "/blog", en: "/blog" },
    "/blog/[slug]": { tr: "/blog/[slug]", en: "/blog/[slug]" },
    "/sss": { tr: "/sss", en: "/faq" },
    "/teklif-al": { tr: "/teklif-al", en: "/get-a-quote" },
    "/iletisim": { tr: "/iletisim", en: "/contact" },
    "/garanti": { tr: "/garanti", en: "/warranty" },
    "/gizlilik": { tr: "/gizlilik", en: "/privacy" },
    "/cerez": { tr: "/cerez", en: "/cookies" },
    "/kvkk": { tr: "/kvkk", en: "/data-protection" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

/** hreflang etiketleri için BCP-47 karşılıkları. */
export const hreflangMap: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en",
};
