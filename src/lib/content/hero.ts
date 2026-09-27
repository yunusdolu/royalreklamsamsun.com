import "server-only";

import { unstable_cache } from "next/cache";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { readClient } from "@/lib/supabase/server";

export const HERO_TAG = "hero";

/** Koddaki özgün slayt görselleri — tablo boşken kullanılır. */
const FALLBACK_IMAGES = [
  "/images/hero/hero1.jpeg",
  "/images/hero/hero2.jpeg",
  "/images/hero/hero3.jpeg",
];

export interface HeroSlideRow {
  id: string;
  image: string | null;
  image_focus: string | null;
  title_tr: string;
  title_en: string | null;
  title2_tr: string | null;
  title2_en: string | null;
  description_tr: string | null;
  description_en: string | null;
  alt_tr: string | null;
  alt_en: string | null;
  is_active: boolean;
  sort: number;
  created_at: string;
  updated_at: string;
}

/** Hero bileşeninin çizdiği, dili çözülmüş slayt. */
export interface HeroSlide {
  image: string;
  imageFocus?: string;
  title: string;
  titleLine2?: string;
  description: string;
  alt: string;
}

async function fetchSlides(): Promise<HeroSlideRow[]> {
  const db = readClient();
  if (!db) return [];
  const { data, error } = await db
    .from("hero_slides")
    .select("*")
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[hero] slaytlar okunamadı:", error.message);
    return [];
  }
  return (data ?? []) as HeroSlideRow[];
}

const cachedSlides = unstable_cache(fetchSlides, ["hero-slides"], {
  tags: [HERO_TAG],
  revalidate: 3600,
});

/**
 * Anasayfa slaytları.
 *
 * Tabloda yayında satır varsa onlar kullanılır; yoksa çeviri dosyalarındaki
 * üç özgün slayta düşülür. Karışık bir durum (bir kısmı tablodan, bir kısmı
 * çeviriden) bilerek yok — slaytlar birlikte kurgulanan bir anlatı, yarısı
 * panelden yarısı koddan gelirse başlıklar birbirini tutmaz.
 */
export async function getHeroSlides(locale: Locale): Promise<HeroSlide[]> {
  const rows = (await cachedSlides()).filter((row) => row.is_active);

  if (rows.length > 0) {
    const en = locale === "en";
    const text = (tr: string | null, other: string | null) =>
      ((en ? other?.trim() || tr?.trim() : tr?.trim()) ?? "");

    return rows.map((row, index) => ({
      image: row.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
      imageFocus: row.image_focus ?? undefined,
      title: text(row.title_tr, row.title_en),
      titleLine2: text(row.title2_tr, row.title2_en) || undefined,
      description: text(row.description_tr, row.description_en),
      alt: text(row.alt_tr, row.alt_en) || text(row.title_tr, row.title_en),
    }));
  }

  const t = await getTranslations({ locale, namespace: "home.hero" });
  return FALLBACK_IMAGES.map((image, index) => ({
    image,
    title: t(`slides.${index + 1}.title`),
    titleLine2: t(`slides.${index + 1}.titleLine2`),
    description: t(`slides.${index + 1}.description`),
    alt: t(`slides.${index + 1}.alt`),
  }));
}

/**
 * Koddaki üç özgün slayt, tablo satırı biçiminde. Panel bunları hem
 * "sitede şu an bunlar var" önizlemesi olarak gösteriyor hem de tek
 * tıkla tabloya aktarıyor; aktarımdan sonra site aynı görünür, fark
 * yalnızca artık panelden düzenlenebilmeleri.
 */
export async function getCodeSlides(): Promise<
  Omit<HeroSlideRow, "id" | "created_at" | "updated_at">[]
> {
  const [tr, en] = await Promise.all([
    getTranslations({ locale: "tr", namespace: "home.hero" }),
    getTranslations({ locale: "en", namespace: "home.hero" }),
  ]);
  return FALLBACK_IMAGES.map((image, index) => {
    const key = `slides.${index + 1}`;
    return {
      image,
      image_focus: null,
      title_tr: tr(`${key}.title`),
      title_en: en(`${key}.title`),
      title2_tr: tr(`${key}.titleLine2`),
      title2_en: en(`${key}.titleLine2`),
      description_tr: tr(`${key}.description`),
      description_en: en(`${key}.description`),
      alt_tr: tr(`${key}.alt`),
      alt_en: en(`${key}.alt`),
      is_active: true,
      sort: (index + 1) * 10,
    };
  });
}

/** Panel listesi — yayında olmayanları da gösterir, önbelleğe girmez. */
export async function getAllHeroSlides(): Promise<HeroSlideRow[]> {
  return fetchSlides();
}
