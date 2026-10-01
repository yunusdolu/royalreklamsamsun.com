import "server-only";

import { unstable_cache } from "next/cache";

import { adminClient, readClient } from "@/lib/supabase/server";

export const HOME_LAYOUT_TAG = "home-layout";

/** `site_settings` tablosundaki satırın anahtarı. */
export const HOME_LAYOUT_KEY = "home_layout";

/**
 * Anasayfanın bölümleri, koddaki varsayılan sırayla.
 *
 * Panelde sıra değiştirilebiliyor (Anasayfa → Bölüm sırası). Yeni bir bölüm
 * eklenirse buraya bir satır ve `src/app/[locale]/page.tsx` içindeki eşlemeye
 * bir giriş eklemek yetiyor; kayıtlı sırada olmayan bölüm, buradaki bir
 * önceki komşusunun hemen altına yerleşir.
 */
export const HOME_SECTIONS = [
  { key: "hero", label: "Slaytlar", note: "Kayan büyük görseller, başlık ve teklif butonu" },
  { key: "marquee", label: "Kayan şerit", note: "Kısa ifadelerin kaydığı siyah bant; yazıları panelden düzenlenir" },
  { key: "stats", label: "Tecrübe sayıları", note: "Proje, yıl, hizmet ve il sayılarının olduğu siyah kutu" },
  { key: "campaigns", label: "Kampanyalar", note: "Yalnızca yayında kampanya varken görünür" },
  { key: "services", label: "Hizmet kartları", note: "Tabela, kutu harf, totem… on iki hizmet kartı" },
  { key: "process", label: "Nasıl çalışırız", note: "Keşiften montaja beş adım" },
  { key: "portfolio", label: "Referans işler", note: "Öne çıkan işlerden seçki" },
  { key: "faq", label: "Sık sorulan sorular", note: "Soru-cevap bölümü" },
  { key: "cta", label: "Teklif çağrısı", note: "Sayfa sonundaki teklif al bölümü" },
] as const;

export type HomeSectionKey = (typeof HOME_SECTIONS)[number]["key"];

export const DEFAULT_HOME_ORDER: HomeSectionKey[] = HOME_SECTIONS.map((s) => s.key);

/**
 * Kayıtlı sırayı güvenli hale getirir: tanınmayan ve yinelenen anahtarlar
 * atılır. Kayıtta olmayan bölüm (sıra kaydedildikten sonra koda eklenmiş)
 * varsayılan sıradaki bir önceki komşusunun hemen altına girer; komşusu
 * yoksa en başa. Sona atılsaydı, "slaytların altına" diye eklenen bir bölüm
 * sırasını daha önce değiştirmiş birinde sayfanın dibinde çıkardı. Böylece
 * tabloya elle yazılmış bozuk bir değer de anasayfadan bölüm düşürmez.
 */
export function normalizeHomeOrder(value: unknown): HomeSectionKey[] {
  const known = new Set<string>(DEFAULT_HOME_ORDER);
  const order: HomeSectionKey[] = [];
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === "string" && known.has(item) && !order.includes(item as HomeSectionKey)) {
        order.push(item as HomeSectionKey);
      }
    }
  }
  DEFAULT_HOME_ORDER.forEach((key, index) => {
    if (order.includes(key)) return;
    const previous = index > 0 ? order.indexOf(DEFAULT_HOME_ORDER[index - 1]) : -1;
    order.splice(previous + 1, 0, key);
  });
  return order;
}

/** Tablodaki ham değer; normalleştirme önbellekten sonra yapılıyor. */
async function fetchOrder(): Promise<unknown> {
  const db = readClient();
  if (!db) return null;
  const { data, error } = await db
    .from("site_settings")
    .select("value")
    .eq("key", HOME_LAYOUT_KEY)
    .maybeSingle();
  if (error) {
    /* Tablo henüz kurulmadıysa buraya düşer; site varsayılan sırayla açılır. */
    console.error("[anasayfa düzeni] okunamadı:", error.message);
    return null;
  }
  return data?.value ?? null;
}

const cachedOrder = unstable_cache(fetchOrder, ["home-layout"], {
  tags: [HOME_LAYOUT_TAG],
  revalidate: 3600,
});

/** Anasayfa bölümlerinin sırası, panel ayarı uygulanmış halde. */
export async function getHomeOrder(): Promise<HomeSectionKey[]> {
  /*
    Normalleştirme önbelleğin dışında: koda yeni bir bölüm eklendiğinde
    önbellekteki eski sıra onu içermiyor. İçeride yapılsaydı yeni bölüm,
    önbellek tazelenene kadar (bir saate kadar) sitede hiç görünmezdi.
  */
  return normalizeHomeOrder(await cachedOrder());
}

/**
 * Panel için: önbelleksiz okur ve tablonun kurulu olup olmadığını da söyler
 * (kurulu değilse panel SQL'i çalıştırmayı hatırlatıyor).
 */
export async function getHomeOrderForAdmin(): Promise<{
  order: HomeSectionKey[];
  customized: boolean;
  tableMissing: boolean;
}> {
  const db = adminClient();
  if (!db) return { order: DEFAULT_HOME_ORDER, customized: false, tableMissing: false };
  const { data, error } = await db
    .from("site_settings")
    .select("value")
    .eq("key", HOME_LAYOUT_KEY)
    .maybeSingle();
  if (error) {
    const tableMissing =
      error.code === "42P01" ||
      error.code === "PGRST205" ||
      /could not find the table/i.test(error.message);
    return { order: DEFAULT_HOME_ORDER, customized: false, tableMissing };
  }
  return { order: normalizeHomeOrder(data?.value), customized: Boolean(data), tableMissing: false };
}
