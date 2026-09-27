import "server-only";

import { unstable_cache } from "next/cache";

import type { Locale } from "@/i18n/routing";
import { readClient } from "@/lib/supabase/server";

export const CAMPAIGNS_TAG = "campaigns";

/** Panelden girilen ham satır. */
export interface CampaignRow {
  id: string;
  slug: string;
  title_tr: string;
  title_en: string | null;
  excerpt_tr: string | null;
  excerpt_en: string | null;
  body_tr: string | null;
  body_en: string | null;
  badge_tr: string | null;
  badge_en: string | null;
  image: string | null;
  image_focus: string | null;
  service_ids: string[];
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
  sort: number;
  created_at: string;
  updated_at: string;
}

/** Sayfaların kullandığı, dili çözülmüş kampanya. */
export interface Campaign {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  badge?: string;
  image?: string;
  serviceIds: string[];
  endsAt?: string;
}

/**
 * İngilizce alan boş bırakılırsa Türkçesine düşer. Kampanyalar acele girilen
 * içerik; iki dili de doldurmaya zorlamak yerine tek dille yayına
 * çıkabilmesini tercih ediyoruz.
 */
function localized(row: CampaignRow, locale: Locale): Campaign {
  const en = locale === "en";
  const text = (tr: string | null, other: string | null) =>
    (en ? other?.trim() || tr?.trim() : tr?.trim()) ?? "";

  const body = text(row.body_tr, row.body_en);

  return {
    id: row.id,
    slug: row.slug,
    title: text(row.title_tr, row.title_en),
    excerpt: text(row.excerpt_tr, row.excerpt_en),
    body: body ? body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) : [],
    badge: text(row.badge_tr, row.badge_en) || undefined,
    image: row.image ?? undefined,
    serviceIds: row.service_ids ?? [],
    endsAt: row.ends_at ?? undefined,
  };
}

async function fetchCampaigns(): Promise<CampaignRow[]> {
  const db = readClient();
  if (!db) return [];
  const { data, error } = await db
    .from("campaigns")
    .select("*")
    .order("sort", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[campaigns] okunamadı:", error.message);
    return [];
  }
  return (data ?? []) as CampaignRow[];
}

const cachedCampaigns = unstable_cache(fetchCampaigns, ["campaigns"], {
  tags: [CAMPAIGNS_TAG],
  /*
    Tarih bazlı bir filtre var: süresi dolan kampanya, panelde hiçbir şey
    değişmese bile yayından kalkmalı. Etiketle temizleme buna yetmediği için
    saatlik bir tazeleme koyuyoruz.
  */
  revalidate: 3600,
});

function isLive(row: CampaignRow, now: number): boolean {
  if (!row.is_active) return false;
  if (row.starts_at && new Date(row.starts_at).getTime() > now) return false;
  if (row.ends_at && new Date(row.ends_at).getTime() < now) return false;
  return true;
}

/** Şu anda yayında olan kampanyalar. */
export async function getLiveCampaigns(locale: Locale): Promise<Campaign[]> {
  const now = Date.now();
  const rows = await cachedCampaigns();
  return rows.filter((row) => isLive(row, now)).map((row) => localized(row, locale));
}

/** Bir hizmet sayfasında gösterilecek kampanyalar. */
export async function getCampaignsForService(
  serviceId: string,
  locale: Locale,
): Promise<Campaign[]> {
  return (await getLiveCampaigns(locale)).filter((campaign) =>
    campaign.serviceIds.includes(serviceId),
  );
}

export async function getCampaignBySlug(
  slug: string,
  locale: Locale,
): Promise<Campaign | undefined> {
  return (await getLiveCampaigns(locale)).find((c) => c.slug === slug);
}

/** sitemap ve generateStaticParams için. */
export async function getCampaignSlugs(): Promise<string[]> {
  const now = Date.now();
  return (await cachedCampaigns())
    .filter((row) => isLive(row, now))
    .map((row) => row.slug);
}

/** Panel listesi — yayında olmayanları da gösterir, önbelleğe girmez. */
export async function getAllCampaignRows(): Promise<CampaignRow[]> {
  return fetchCampaigns();
}
