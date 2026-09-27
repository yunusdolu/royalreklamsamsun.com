import "server-only";

import { unstable_cache } from "next/cache";

import { projects as baseProjects, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { readClient } from "@/lib/supabase/server";

export const PROJECTS_TAG = "projects";

/**
 * Referans işler.
 *
 * Hizmetlerin aksine burada koddaki liste yer tutucu ("Referans Proje 1")
 * olduğu için veritabanı doğrudan kaynak oluyor: tabloda satır varsa koddaki
 * liste hiç kullanılmaz. Tablo boşken eski içerik görünmeye devam eder, yani
 * panel kurulana kadar sayfa boş kalmaz.
 */

export interface ProjectRow {
  id: string;
  slug_tr: string;
  slug_en: string;
  service_id: string | null;
  region_id: string | null;
  year: number | null;
  title_tr: string;
  title_en: string | null;
  client: string | null;
  summary_tr: string | null;
  summary_en: string | null;
  body_tr: string[];
  body_en: string[];
  scope_tr: string[];
  scope_en: string[];
  cover: string | null;
  gallery: string[];
  is_published: boolean;
  sort: number;
  created_at: string;
  updated_at: string;
}

function toProject(row: ProjectRow): Project {
  /* İngilizce girilmediyse Türkçesi kullanılır. */
  const en = <T,>(value: T | null | undefined, tr: T): T =>
    value === null || value === undefined || (Array.isArray(value) && value.length === 0)
      ? tr
      : value;

  const trCopy = {
    title: row.title_tr,
    client: row.client ?? undefined,
    summary: row.summary_tr ?? "",
    description: row.body_tr ?? [],
    scope: row.scope_tr ?? [],
  };

  return {
    id: row.id,
    slug: { tr: row.slug_tr, en: row.slug_en },
    serviceId: row.service_id ?? "",
    regionId: row.region_id ?? undefined,
    year: row.year ?? new Date().getFullYear(),
    cover: row.cover ?? "",
    gallery: row.gallery?.length ? row.gallery : undefined,
    copy: {
      tr: trCopy,
      en: {
        title: en(row.title_en, trCopy.title),
        client: trCopy.client,
        summary: en(row.summary_en, trCopy.summary),
        description: en(row.body_en, trCopy.description),
        scope: en(row.scope_en, trCopy.scope),
      },
    },
  };
}

async function fetchProjects(): Promise<ProjectRow[]> {
  const db = readClient();
  if (!db) return [];
  const { data, error } = await db
    .from("projects")
    .select("*")
    .order("sort", { ascending: true })
    .order("year", { ascending: false });
  if (error) {
    console.error("[projects] okunamadı:", error.message);
    return [];
  }
  return (data ?? []) as ProjectRow[];
}

const cachedProjects = unstable_cache(fetchProjects, ["projects"], {
  tags: [PROJECTS_TAG],
  /*
    Etiket yalnızca panelden kaydedildiğinde temizleniyor. Satır Supabase'in
    kendi tablo düzenleyicisinden değiştirilirse site bunu hiç görmezdi;
    saatlik tazeleme o ihtimale karşı güvenlik ağı.
  */
  revalidate: 3600,
});

export async function getProjects(): Promise<Project[]> {
  const rows = (await cachedProjects()).filter((row) => row.is_published);
  if (rows.length === 0) return baseProjects;
  return rows.map(toProject);
}

export async function getProjectBySlugAsync(
  slug: string,
  locale: Locale,
): Promise<Project | undefined> {
  return (await getProjects()).find((project) => project.slug[locale] === slug);
}

/** Panel listesi — yayından kaldırılmışları da gösterir. */
export async function getAllProjectRows(): Promise<ProjectRow[]> {
  return fetchProjects();
}
