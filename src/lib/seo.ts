import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { hreflangMap, type Locale, routing } from "@/i18n/routing";

type PathnameArgs = Parameters<typeof getPathname>[0];
export type AppHref = PathnameArgs["href"];

/** Göreli yolu tam (mutlak) URL'e çevirir. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

/** Bir sayfanın belirli dildeki tam URL'i. */
export function localizedUrl(href: AppHref, locale: Locale): string {
  return absoluteUrl(getPathname({ href, locale } as PathnameArgs));
}

/**
 * canonical + hreflang üretir.
 *
 * Her sayfa kendi diline canonical verir ve diğer dile `alternate` ile
 * bağlanır. `x-default`, varsayılan dil olan Türkçeyi işaret eder — arama
 * motoruna "dil eşleşmesi yoksa Türkçeyi göster" demektir.
 */
export function buildAlternates(
  href: AppHref,
  currentLocale: Locale,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[hreflangMap[locale]] = localizedUrl(href, locale);
  }
  languages["x-default"] = localizedUrl(href, routing.defaultLocale);

  return {
    canonical: localizedUrl(href, currentLocale),
    languages,
  };
}

/** Sayfa başına OpenGraph bloğu — dinamik OG görseli otomatik eklenir. */
export function buildOpenGraph({
  title,
  description,
  href,
  locale,
  images,
  type = "website",
}: {
  title: string;
  description: string;
  href: AppHref;
  locale: Locale;
  images?: string[];
  type?: "website" | "article";
}): Metadata["openGraph"] {
  return {
    type,
    title,
    description,
    url: localizedUrl(href, locale),
    siteName: siteConfig.siteName,
    locale: locale === "tr" ? "tr_TR" : "en_US",
    images: images?.map((url) => ({ url, width: 1200, height: 630, alt: title })),
  };
}

/** Meta açıklamasını güvenli uzunlukta tutar. */
export function clampDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * Slug'ı dile göre değişen sayfalar için canonical + hreflang.
 *
 * `/hizmetler/kutu-harf-tabela` ile `/en/services/channel-letter-signs`
 * aynı içeriğin iki dildeki karşılığıdır; bunları birbirine bağlamak
 * çok dilli SEO'nun en kritik adımıdır.
 */
export function buildLocalizedAlternates(
  hrefFor: (locale: Locale) => AppHref,
  currentLocale: Locale,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[hreflangMap[locale]] = localizedUrl(hrefFor(locale), locale);
  }
  languages["x-default"] = localizedUrl(
    hrefFor(routing.defaultLocale),
    routing.defaultLocale,
  );

  return {
    canonical: localizedUrl(hrefFor(currentLocale), currentLocale),
    languages,
  };
}
