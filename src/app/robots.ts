import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt
 *
 * Yapay zeka tarayıcıları BİLİNÇLİ olarak açık bırakıldı. Birçok site
 * GPTBot / ClaudeBot / PerplexityBot'u farkında olmadan engelliyor ve
 * üretken arama motorlarında hiç görünmüyor. Royal Reklam için hedef bunun
 * tam tersi: "Samsun'da tabela" diye soran bir kullanıcıya dil modelinin
 * kaynak göstererek cevap verebilmesi.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Üretken arama motorları — GEO için açık
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
