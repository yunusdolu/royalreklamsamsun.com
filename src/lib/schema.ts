import { mapsDirectionsLink, siteConfig } from "@/config/site";
import type { Service } from "@/content/services";
import type { Locale } from "@/i18n/routing";

import { absoluteUrl, localizedUrl, type AppHref } from "./seo";

/**
 * JSON-LD üreticileri.
 *
 * Yapısal veri iki işi birden yapar:
 *  1. Google'a zengin sonuç (rich result) sinyali verir.
 *  2. Dil modellerine varlık (entity) netliği sağlar — "Royal Reklam kimdir,
 *     nerededir, ne yapar" sorusunun makine-okunur cevabıdır.
 *
 * Bu yüzden NAP bilgileri Google Business Profile ile birebir aynı olmalıdır.
 */

/** Sabit @id'ler — varlıkların birbirine referans vermesini sağlar. */
export const schemaIds = {
  organization: `${siteConfig.url}/#organization`,
  website: `${siteConfig.url}/#website`,
  localBusiness: `${siteConfig.url}/#localbusiness`,
  founder: `${siteConfig.url}/#ishakbal`,
};

const descriptions: Record<Locale, string> = {
  tr: "Samsun merkezli açık hava reklamcılığı firması. Işıklı tabela, kutu harf, totem, cephe giydirme, araç giydirme ve dijital baskı alanlarında keşiften montaja anahtar teslim hizmet verir.",
  en: "Outdoor advertising company based in Samsun, Türkiye. Turnkey illuminated signage, channel letters, totems, façade cladding, vehicle wrapping and large format printing from survey to installation.",
};

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.district,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  };
}

function openingHours() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: siteConfig.openingHours.weekdays.opens,
      closes: siteConfig.openingHours.weekdays.closes,
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: siteConfig.openingHours.saturday.opens,
      closes: siteConfig.openingHours.saturday.closes,
    },
  ];
}

export function buildLocalBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": schemaIds.localBusiness,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: descriptions[locale],
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    foundingDate: String(siteConfig.foundingYear),
    image: absoluteUrl("/brand/logo-gold.png"),
    logo: absoluteUrl("/brand/logo-gold.png"),
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: openingHours(),
    priceRange: "$$",
    currenciesAccepted: "TRY",
    sameAs: [siteConfig.contact.instagram],
    /**
     * Google Business Profile kaydına açık bağlantı: sitedeki işletme ile
     * haritadaki kaydın aynı varlık olduğunu doğrulamaya yardımcı olur.
     */
    hasMap: mapsDirectionsLink,
    founder: {
      "@type": "Person",
      "@id": schemaIds.founder,
      name: siteConfig.team.artDirector,
      jobTitle: locale === "tr" ? "Art Direktör" : "Art Director",
    },
    areaServed: [
      { "@type": "City", name: "Samsun" },
      { "@type": "Country", name: "Türkiye" },
    ],
    knowsLanguage: ["tr", "en"],
  };
}

export function buildWebSiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: siteConfig.url,
    name: siteConfig.siteName,
    description: descriptions[locale],
    inLanguage: locale === "tr" ? "tr-TR" : "en",
    publisher: { "@id": schemaIds.localBusiness },
  };
}

export interface BreadcrumbItem {
  name: string;
  href: AppHref;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: localizedUrl(item.href, locale),
    })),
  };
}

export function buildServiceSchema(service: Service, locale: Locale) {
  const copy = service.copy[locale];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.name,
    description: copy.answer,
    serviceType: copy.name,
    provider: { "@id": schemaIds.localBusiness },
    areaServed: [
      { "@type": "City", name: "Samsun" },
      { "@type": "Country", name: "Türkiye" },
    ],
    url: localizedUrl(
      { pathname: "/hizmetler/[slug]", params: { slug: service.slug[locale] } },
      locale,
    ),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "TRY",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "TRY",
        // Fiyat keşif sonrası belirlendiği için sabit değer verilmez.
        valueAddedTaxIncluded: false,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.name,
      itemListElement: copy.useCases.map((useCase) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: useCase },
      })),
    },
  };
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * `speakable` — sesli asistanların ve üretken arama motorlarının sayfanın
 * hangi bölümünü okuyabileceğini işaret eder. GEO için önemli bir sinyaldir.
 */
export function buildSpeakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

export function buildArticleSchema({
  title,
  description,
  slug,
  published,
  modified,
  locale,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  published: string;
  modified?: string;
  locale: Locale;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: published,
    dateModified: modified ?? published,
    inLanguage: locale === "tr" ? "tr-TR" : "en",
    author: { "@id": schemaIds.localBusiness },
    publisher: { "@id": schemaIds.localBusiness },
    image: image ? absoluteUrl(image) : absoluteUrl("/brand/logo-gold.png"),
    mainEntityOfPage: localizedUrl(
      { pathname: "/blog/[slug]", params: { slug } },
      locale,
    ),
  };
}
