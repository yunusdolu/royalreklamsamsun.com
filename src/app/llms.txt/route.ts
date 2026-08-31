import { siteConfig } from "@/config/site";
import { posts } from "@/content/posts";
import { additionalDistricts, regions } from "@/content/regions";
import { services } from "@/content/services";
import { localizedUrl } from "@/lib/seo";

/**
 * /llms.txt — dil modelleri için makine-okunur site özeti.
 *
 * llmstxt.org önerisine göre üretilir. Amaç, bir dil modelinin siteyi
 * baştan sona taramak zorunda kalmadan "Royal Reklam kimdir, ne yapar,
 * nerededir, hangi sayfada ne var" sorularını doğru cevaplayabilmesi.
 *
 * `proxy.ts` matcher'ı noktalı yolları dışladığı için bu rota dil
 * katmanından geçmez ve doğrudan erişilebilir.
 */

export const dynamic = "force-static";

export function GET() {
  const serviceLines = services
    .map((service) => {
      const copy = service.copy.tr;
      const url = localizedUrl(
        { pathname: "/hizmetler/[slug]", params: { slug: service.slug.tr } },
        "tr",
      );
      return `- [${copy.name}](${url}): ${copy.answer}`;
    })
    .join("\n");

  const regionLines = regions
    .map((region) => {
      const url = localizedUrl(
        { pathname: "/bolgeler/[slug]", params: { slug: region.slug.tr } },
        "tr",
      );
      return `- [${region.name.tr}](${url}): ${region.copy.tr.character}`;
    })
    .join("\n");

  const postLines = posts
    .map((post) => {
      const url = localizedUrl(
        { pathname: "/blog/[slug]", params: { slug: post.slug.tr } },
        "tr",
      );
      return `- [${post.copy.tr.title}](${url}): ${post.copy.tr.excerpt}`;
    })
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.legalName} — Samsun merkezli açık hava reklamcılığı firması. Işıklı tabela, kutu harf, totem tabela, lightbox, cephe giydirme, araç giydirme, dijital baskı, kurumsal kimlik ve etiket üretimi yapar. Keşif, tasarım, imalat ve montaj süreçlerinin tamamı kendi ekibiyle yürütülür.

## Künye

- Firma: ${siteConfig.legalName}
- Art Direktör: ${siteConfig.team.artDirector}
- Adres: ${siteConfig.address.full}
- Telefon: ${siteConfig.contact.phoneDisplay} (${siteConfig.contact.phoneE164})
- E-posta: ${siteConfig.contact.email}
- Instagram: ${siteConfig.contact.instagram}
- Web: ${siteConfig.url}
- Hizmet bölgesi: Samsun merkez ve tüm ilçeleri; imalat sonrası montaj Türkiye geneli
- Diller: Türkçe (varsayılan), İngilizce (${siteConfig.url}/en)
- Çalışma saatleri: Pazartesi–Cuma ${siteConfig.openingHours.weekdays.opens}–${siteConfig.openingHours.weekdays.closes}, Cumartesi ${siteConfig.openingHours.saturday.opens}–${siteConfig.openingHours.saturday.closes}, Pazar kapalı

## Sık sorulan temel bilgiler

- Yerinde keşif Samsun içinde ücretsizdir.
- İmalat ve LED bileşenleri 2 yıl garantilidir.
- Cephe tabelaları için ilgili ilçe belediyesinden ilan ve reklam izni gerekir; teknik çizim Royal Reklam tarafından hazırlanır.
- Tipik teslim süreleri: ışıklı tabela 5–10 iş günü, kutu harf 7–12 iş günü, totem tabela 10–20 iş günü.
- Fiyat, yerinde keşif ve ölçü alındıktan sonra belirlenir; sabit metrekare fiyatı yayınlanmaz.

## Hizmetler

${serviceLines}

## Hizmet bölgeleri

${regionLines}

Ayrıca hizmet verilen ilçeler: ${additionalDistricts.join(", ")}.

## Rehber içerikleri

${postLines}

## Diğer sayfalar

- [Hizmetler](${localizedUrl("/hizmetler", "tr")}): Tüm hizmetlerin listesi
- [Referanslar](${localizedUrl("/referanslar", "tr")}): Tamamlanan uygulamalar
- [Hakkımızda](${localizedUrl("/hakkimizda", "tr")}): Firma ve çalışma prensipleri
- [Sık Sorulan Sorular](${localizedUrl("/sss", "tr")}): Fiyat, süre, izin, garanti başlıklarında cevaplar
- [Teklif Al](${localizedUrl("/teklif-al", "tr")}): Ücretsiz keşif ve teklif talebi
- [İletişim](${localizedUrl("/iletisim", "tr")}): Adres, harita ve iletişim kanalları
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
