import type { MetadataRoute } from "next";

import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { regions } from "@/content/regions";
import { services } from "@/content/services";
import { hreflangMap, type Locale, routing } from "@/i18n/routing";
import { localizedUrl, type AppHref } from "@/lib/seo";

/**
 * Dinamik site haritası.
 *
 * Her giriş `alternates.languages` ile diğer dildeki karşılığına bağlanır —
 * Google'ın çok dilli eşleştirmeyi doğru yapması için hreflang etiketlerinin
 * yanında bu da güçlü bir sinyaldir.
 *
 * Hizmet, bölge, blog ve referans sayfaları içerik dosyalarından türetilir;
 * yeni bir kayıt eklendiğinde site haritası kendiliğinden güncellenir.
 */

type Entry = {
  hrefFor: (locale: Locale) => AppHref;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: Date;
};

function buildEntry(entry: Entry): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: localizedUrl(entry.hrefFor(locale), locale),
    lastModified: entry.lastModified ?? new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((alt) => [
          hreflangMap[alt],
          localizedUrl(entry.hrefFor(alt), alt),
        ]),
      ),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { hrefFor: () => "/", priority: 1, changeFrequency: "weekly" },
    { hrefFor: () => "/hizmetler", priority: 0.9, changeFrequency: "monthly" },
    { hrefFor: () => "/bolgeler", priority: 0.8, changeFrequency: "monthly" },
    { hrefFor: () => "/referanslar", priority: 0.8, changeFrequency: "weekly" },
    { hrefFor: () => "/hakkimizda", priority: 0.6, changeFrequency: "yearly" },
    { hrefFor: () => "/blog", priority: 0.7, changeFrequency: "weekly" },
    { hrefFor: () => "/sss", priority: 0.7, changeFrequency: "monthly" },
    { hrefFor: () => "/teklif-al", priority: 0.9, changeFrequency: "monthly" },
    { hrefFor: () => "/iletisim", priority: 0.8, changeFrequency: "yearly" },
    { hrefFor: () => "/gizlilik", priority: 0.2, changeFrequency: "yearly" },
    { hrefFor: () => "/cerez", priority: 0.2, changeFrequency: "yearly" },
    { hrefFor: () => "/kvkk", priority: 0.2, changeFrequency: "yearly" },

    // Hizmet detayları — organik trafiğin ana giriş noktaları
    ...services.map<Entry>((service) => ({
      hrefFor: (locale) => ({
        pathname: "/hizmetler/[slug]",
        params: { slug: service.slug[locale] },
      }),
      priority: 0.9,
      changeFrequency: "monthly",
    })),

    // Bölge sayfaları
    ...regions.map<Entry>((region) => ({
      hrefFor: (locale) => ({
        pathname: "/bolgeler/[slug]",
        params: { slug: region.slug[locale] },
      }),
      priority: 0.7,
      changeFrequency: "monthly",
    })),

    // Rehber yazıları
    ...posts.map<Entry>((post) => ({
      hrefFor: (locale) => ({
        pathname: "/blog/[slug]",
        params: { slug: post.slug[locale] },
      }),
      priority: 0.6,
      changeFrequency: "yearly",
      lastModified: new Date(post.updated ?? post.published),
    })),

    // Referans detayları (proje eklendikçe otomatik gelir)
    ...projects.map<Entry>((project) => ({
      hrefFor: (locale) => ({
        pathname: "/referanslar/[slug]",
        params: { slug: project.slug[locale] },
      }),
      priority: 0.6,
      changeFrequency: "yearly",
    })),
  ];

  return entries.flatMap(buildEntry);
}
