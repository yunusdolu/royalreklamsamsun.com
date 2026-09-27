import "server-only";

import { unstable_cache } from "next/cache";
import { getTranslations } from "next-intl/server";

import { legalDocs } from "@/content/legal";
import type { Locale } from "@/i18n/routing";
import { readClient } from "@/lib/supabase/server";

export const PAGES_TAG = "pages";

/**
 * Panelden başlığı düzenlenebilen sayfalar.
 *
 * Her sayfanın bir başlık bloğu var (başlık + kısa açıklama + isteğe bağlı
 * görsel). Tabloda satır yoksa metin çeviri dosyasından ya da yasal
 * metinlerden gelir; panelden girilen değer onun üstüne biner. Adres ve SEO
 * başlığı (`<title>`) bilerek dışarıda: ikisi de Google'daki kaydı etkiler.
 *
 * `source` varsayılan metnin nereden okunacağını söylüyor. Yeni bir sayfa
 * eklendiğinde yalnızca buraya bir satır eklemek yetiyor; hem site hem
 * panel aynı listeyi kullanıyor.
 */
export const EDITABLE_PAGES = [
  { key: "hizmetler", label: "Hizmetler", path: "/hizmetler", source: { ns: "servicesPage" } },
  { key: "referanslar", label: "Referans İşler", path: "/referanslar", source: { ns: "portfolioPage" } },
  { key: "kampanyalar", label: "Kampanyalar", path: "/kampanyalar", source: { ns: "campaignsPage" } },
  { key: "bolgeler", label: "Hizmet Bölgeleri", path: "/bolgeler", source: { ns: "regionsPage" } },
  { key: "hakkimizda", label: "Hakkımızda", path: "/hakkimizda", source: { ns: "aboutPage" } },
  { key: "blog", label: "Blog", path: "/blog", source: { ns: "blogPage" } },
  { key: "sss", label: "Sık Sorulan Sorular", path: "/sss", source: { ns: "faqPage" } },
  { key: "iletisim", label: "İletişim", path: "/iletisim", source: { ns: "contactPage" } },
  { key: "teklif-al", label: "Teklif Al", path: "/teklif-al", source: { ns: "quotePage" } },
  { key: "gizlilik", label: "Gizlilik Politikası", path: "/gizlilik", source: { legal: "gizlilik" } },
  { key: "cerez", label: "Çerez Politikası", path: "/cerez", source: { legal: "cerez" } },
  { key: "kvkk", label: "KVKK Aydınlatma Metni", path: "/kvkk", source: { legal: "kvkk" } },
] as const;

export type PageKey = (typeof EDITABLE_PAGES)[number]["key"];

export interface PageContentRow {
  id: string;
  title_tr: string | null;
  title_en: string | null;
  lead_tr: string | null;
  lead_en: string | null;
  image: string | null;
  image_focus: string | null;
  updated_at: string;
}

export interface PageContent {
  title: string;
  lead: string;
  image?: string;
  imageFocus?: string;
}

/** Sayfanın koddaki özgün başlığı ve açıklaması. */
export async function getPageDefaults(
  key: PageKey,
  locale: Locale,
): Promise<{ title: string; lead: string }> {
  const page = EDITABLE_PAGES.find((item) => item.key === key);
  if (!page) return { title: "", lead: "" };

  if ("legal" in page.source) {
    const copy = legalDocs[page.source.legal]?.copy[locale];
    return { title: copy?.title ?? "", lead: copy?.lead ?? "" };
  }

  const t = await getTranslations({ locale, namespace: page.source.ns });
  return { title: t("title"), lead: t("lead") };
}

async function fetchRows(): Promise<PageContentRow[]> {
  const db = readClient();
  if (!db) return [];
  const { data, error } = await db.from("page_content").select("*");
  if (error) {
    /*
      Tablo henüz kurulmamışsa (şema çalıştırılmadıysa) buraya düşüyor.
      Sayfa koddaki başlığıyla açılmaya devam ediyor.
    */
    console.error("[pages] başlıklar okunamadı:", error.message);
    return [];
  }
  return (data ?? []) as PageContentRow[];
}

const cachedRows = unstable_cache(fetchRows, ["page-content"], {
  tags: [PAGES_TAG],
  revalidate: 3600,
});

/**
 * Sayfanın başlık bloğu, panel düzenlemesi uygulanmış halde.
 *
 * İngilizce alan boşsa Türkçesine değil koddaki İngilizce metne düşüyor:
 * yalnızca Türkçe başlığı değiştiren kişi İngilizce sayfada Türkçe bir
 * başlık görmek istemez.
 */
export async function getPageContent(
  key: PageKey,
  locale: Locale,
): Promise<PageContent> {
  const [defaults, rows] = await Promise.all([
    getPageDefaults(key, locale),
    cachedRows(),
  ]);
  const row = rows.find((item) => item.id === key);

  const pick = (value: string | null | undefined, fallback: string) =>
    value && value.trim() ? value.trim() : fallback;

  return {
    title: pick(row?.[`title_${locale}`], defaults.title),
    lead: pick(row?.[`lead_${locale}`], defaults.lead),
    image: row?.image || undefined,
    imageFocus: row?.image_focus || undefined,
  };
}

/** Panel listesi — önbelleğe girmez. */
export async function getAllPageRows(): Promise<PageContentRow[]> {
  return fetchRows();
}
