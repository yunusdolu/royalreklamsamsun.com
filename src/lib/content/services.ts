import "server-only";

import { unstable_cache } from "next/cache";

import { services as baseServices, type Service } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { readClient } from "@/lib/supabase/server";

/**
 * Hizmetleri panelde yapılan düzenlemelerle birlikte okur.
 *
 * Kodda duran liste temeldir; veritabanındaki satır yalnızca kendi doldurduğu
 * alanları ezer. Böylece 101 çeşit, SSS ve schema.org metinleri yerinde kalır,
 * panel de yalnızca gerçekten düzenlenen alanı taşır. Tablo boşsa ya da
 * Supabase hiç kurulmamışsa site bugünkü haliyle çalışır.
 */

export const SERVICES_TAG = "services";

interface ServiceOverrideRow {
  id: string;
  name_tr: string | null;
  name_en: string | null;
  short_name_tr: string | null;
  short_name_en: string | null;
  summary_tr: string | null;
  summary_en: string | null;
  card_image: string | null;
  hero_image: string | null;
  hero_focus: string | null;
  lead_time_min: number | null;
  lead_time_max: number | null;
}

/** Boş metni "değer verilmemiş" sayar: panelde alan temizlenince koda döner. */
function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  return value;
}

function merge(service: Service, row: ServiceOverrideRow | undefined): Service {
  if (!row) return service;

  const copy = { ...service.copy };
  for (const locale of ["tr", "en"] as const) {
    copy[locale] = {
      ...copy[locale],
      name: pick(row[`name_${locale}`], copy[locale].name),
      shortName: pick(row[`short_name_${locale}`], copy[locale].shortName),
      summary: pick(row[`summary_${locale}`], copy[locale].summary),
    };
  }

  return {
    ...service,
    copy,
    image: pick(row.card_image, service.image),
    heroImage: pick(row.hero_image, service.heroImage),
    heroFocus: pick(row.hero_focus, service.heroFocus),
    leadTimeDays: [
      pick(row.lead_time_min, service.leadTimeDays[0]),
      pick(row.lead_time_max, service.leadTimeDays[1]),
    ],
  };
}

async function fetchOverrides(): Promise<ServiceOverrideRow[]> {
  const db = readClient();
  if (!db) return [];
  const { data, error } = await db.from("service_overrides").select("*");
  if (error) {
    /*
      Veritabanı erişilemezse sayfayı düşürmek yerine koddaki içerikle devam
      ediyoruz. Site bir tabela firmasının vitrini; eksik bir başlık, kapalı
      bir sayfadan iyidir.
    */
    console.error("[services] düzenlemeler okunamadı:", error.message);
    return [];
  }
  return (data ?? []) as ServiceOverrideRow[];
}

const cachedOverrides = unstable_cache(fetchOverrides, ["service-overrides"], {
  tags: [SERVICES_TAG],
  /*
    Etiket yalnızca panelden kaydedildiğinde temizleniyor. Satır Supabase'in
    kendi tablo düzenleyicisinden değiştirilirse site bunu hiç görmezdi;
    saatlik tazeleme o ihtimale karşı güvenlik ağı.
  */
  revalidate: 3600,
});

/** Tüm hizmetler, panel düzenlemeleri uygulanmış halde. */
export async function getServices(): Promise<Service[]> {
  const rows = await cachedOverrides();
  const byId = new Map(rows.map((row) => [row.id, row]));
  return baseServices.map((service) => merge(service, byId.get(service.id)));
}

export async function getFeaturedServices(): Promise<Service[]> {
  return (await getServices()).filter((service) => service.featured);
}

export async function getService(id: string): Promise<Service | undefined> {
  return (await getServices()).find((service) => service.id === id);
}

export async function getServiceBySlugAsync(
  slug: string,
  locale: Locale,
): Promise<Service | undefined> {
  return (await getServices()).find((service) => service.slug[locale] === slug);
}
