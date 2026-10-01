import "server-only";

import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/routing";
import { adminClient, readClient } from "@/lib/supabase/server";

export const MARQUEE_TAG = "marquee";

/** `site_settings` tablosundaki satırın anahtarı. */
export const MARQUEE_KEY = "marquee";

/** Panelde bir şeride girilebilecek en fazla ifade ve ifade uzunluğu. */
export const MARQUEE_MAX_ITEMS = 12;
export const MARQUEE_MAX_LENGTH = 80;

/**
 * Anasayfadaki kayan şeridin koddaki özgün ifadeleri. Panelden yazı
 * girilmediyse bunlar görünür. Hepsi sitenin başka yerinde zaten geçen,
 * doğrulanmış ifadeler; proje sayısı gibi onay bekleyen rakam yok.
 */
export const DEFAULT_MARQUEE: Record<Locale, string[]> = {
  tr: [
    "Keşiften montaja tek ekip",
    "1991'den beri sahada",
    "Kendi atölyemizde imalat",
    "Ücretsiz keşif ve teklif",
    "81 ile montaj",
    "Tabela · Kutu harf · Totem · Cephe giydirme",
  ],
  en: [
    "One team from survey to installation",
    "In the field since 1991",
    "Fabricated in our own workshop",
    "Free survey and quote",
    "Installation in all 81 provinces",
    "Signage · Channel letters · Totems · Façade cladding",
  ],
};

export interface MarqueeValue {
  tr: string[];
  en: string[];
}

/** Tablodan gelen değeri temizler: boş satırlar atılır, uzunluk ve adet sınırlanır. */
export function cleanMarqueeItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, MARQUEE_MAX_LENGTH))
    .filter(Boolean)
    .slice(0, MARQUEE_MAX_ITEMS);
}

function parse(value: unknown): MarqueeValue {
  const raw = (value ?? {}) as Partial<Record<Locale, unknown>>;
  return { tr: cleanMarqueeItems(raw.tr), en: cleanMarqueeItems(raw.en) };
}

async function fetchMarquee(): Promise<MarqueeValue> {
  const db = readClient();
  if (!db) return { tr: [], en: [] };
  const { data, error } = await db
    .from("site_settings")
    .select("value")
    .eq("key", MARQUEE_KEY)
    .maybeSingle();
  if (error) {
    console.error("[kayan şerit] okunamadı:", error.message);
    return { tr: [], en: [] };
  }
  return parse(data?.value);
}

const cachedMarquee = unstable_cache(fetchMarquee, ["marquee"], {
  tags: [MARQUEE_TAG],
  revalidate: 3600,
});

/**
 * Şeritte kayacak ifadeler. Panelde o dil için yazı yoksa koddaki özgün
 * ifadelere düşer — İngilizce boş bırakılınca İngilizce sayfada Türkçe
 * değil, koddaki İngilizce ifadeler görünür.
 */
export async function getMarqueeItems(locale: Locale): Promise<string[]> {
  const saved = (await cachedMarquee())[locale];
  return saved.length > 0 ? saved : DEFAULT_MARQUEE[locale];
}

/** Panel için: önbelleksiz, kayıtlı ham değer. */
export async function getMarqueeForAdmin(): Promise<MarqueeValue> {
  const db = adminClient();
  if (!db) return { tr: [], en: [] };
  const { data } = await db
    .from("site_settings")
    .select("value")
    .eq("key", MARQUEE_KEY)
    .maybeSingle();
  return parse(data?.value);
}
