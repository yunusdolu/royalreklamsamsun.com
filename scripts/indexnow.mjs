/**
 * IndexNow bildirimi — Yandex ve Bing'e "şu sayfalar değişti" der.
 *
 * Google IndexNow kullanmaz (onun için Search Console yeterlidir), ama
 * Yandex ve Bing bu protokolle sayfaları saatler yerine dakikalar içinde
 * kuyruğa alır. Yeni içerik yayınlandıktan sonra çalıştırın:
 *
 *   npm run indexnow
 *
 * URL listesi canlı sitedeki sitemap.xml'den okunur, yani ayrıca liste
 * tutmaya gerek yoktur.
 */

const SITE = "https://royalreklamsamsun.com";
const KEY = "0d8b2e1949b240e413d04ec3ea9fe2c5";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml okunamadı: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  // Anahtar dosyası yayında olmadan gönderim reddedilir; önce onu doğrula
  const keyRes = await fetch(`${SITE}/${KEY}.txt`);
  if (!keyRes.ok) {
    throw new Error(
      `Anahtar dosyası yayında değil: ${SITE}/${KEY}.txt (HTTP ${keyRes.status}). Önce siteyi deploy edin.`,
    );
  }

  const urlList = await sitemapUrls();
  console.log(`${urlList.length} URL gönderiliyor…`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList,
    }),
  });

  // 200 ve 202 başarı sayılır; 202 "alındı, doğrulanıyor" demektir
  if (res.status === 200 || res.status === 202) {
    console.log(`Tamam (HTTP ${res.status}). Yandex ve Bing bilgilendirildi.`);
    return;
  }
  throw new Error(`IndexNow reddetti: HTTP ${res.status} — ${await res.text()}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
