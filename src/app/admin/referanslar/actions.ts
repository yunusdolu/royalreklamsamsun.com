"use server";

import { redirect } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import { describeDbError } from "@/lib/admin/errors";
import { UploadError, resolveImageField, uploadImage } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { projects as baseProjects } from "@/content/projects";
import { PROJECTS_TAG } from "@/lib/content/projects";
import { slugify } from "@/lib/slugify";
import { adminClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

/** Çok satırlı alanı diziye çevirir: her satır bir paragraf ya da madde. */
function lines(formData: FormData, key: string): string[] {
  return String(formData.get(key) ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function saveProject(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const db = adminClient();
  if (!db) return "Supabase yazma anahtarı tanımlı değil.";

  const id = text(formData, "id");
  const title = text(formData, "title_tr");
  if (!title) return "Proje başlığı gerekli.";

  let existing: { cover: string | null; gallery: string[] } | null = null;
  if (id) {
    const { data } = await db
      .from("projects")
      .select("cover, gallery")
      .eq("id", id)
      .maybeSingle();
    existing = data ?? null;
  }

  let cover: string | null;
  const gallery = [...(formData.getAll("gallery_keep").map(String))];
  try {
    cover = await resolveImageField(
      formData,
      "cover",
      "projects/kapak",
      existing?.cover ?? null,
    );

    /*
      Galeri tek tek değil topluca yükleniyor: montaj biten bir işin on
      fotoğrafını ayrı ayrı seçtirmek panelin en sık kullanılan işini en
      yavaş iş haline getirirdi.
    */
    for (const file of formData.getAll("gallery")) {
      if (file instanceof File && file.size > 0) {
        gallery.push(await uploadImage(file, "projects/galeri"));
      }
    }
  } catch (error) {
    if (error instanceof UploadError) return error.message;
    throw error;
  }

  const base = text(formData, "slug_tr") ?? slugify(title, "proje");
  const row = {
    slug_tr: base,
    slug_en: text(formData, "slug_en") ?? base,
    service_id: text(formData, "service_id"),
    region_id: text(formData, "region_id"),
    year: Number(text(formData, "year") ?? "") || new Date().getFullYear(),
    title_tr: title,
    title_en: text(formData, "title_en"),
    client: text(formData, "client"),
    summary_tr: text(formData, "summary_tr"),
    summary_en: text(formData, "summary_en"),
    body_tr: lines(formData, "body_tr"),
    body_en: lines(formData, "body_en"),
    scope_tr: lines(formData, "scope_tr"),
    scope_en: lines(formData, "scope_en"),
    cover,
    cover_focus: text(formData, "cover_focus"),
    gallery,
    is_published: formData.get("is_published") === "on",
    sort: Number(text(formData, "sort") ?? 0) || 0,
  };

  const query = id
    ? db.from("projects").update(row).eq("id", id)
    : db.from("projects").insert(row);

  const { error } = await query;
  if (error) {
    if (error.code === "23505") {
      return "Bu adres zaten kullanılıyor. Adres alanına farklı bir değer yaz.";
    }
    return describeDbError(error);
  }

  publishContent(PROJECTS_TAG);
  redirect("/admin/referanslar?kaydedildi=1");
}

/**
 * Sitede şu an görünen, kodda duran işleri tabloya kopyalar.
 *
 * Tablo boşken site koddaki listeyi gösteriyor ama panel onları
 * düzenleyemiyor. Aktarım sonrası her iş panelde ayrı bir kayıt olur;
 * adresleri, kapakları ve sıraları aynen korunduğu için sitede hiçbir şey
 * değişmez, Google'daki adresler de kırılmaz. Aynı adresli kayıt zaten
 * varsa atlanır, yani düğmeye iki kez basmak kopya üretmez.
 */
export async function importCodeProjects() {
  await requireSession();
  const db = adminClient();
  if (!db) redirect("/admin/referanslar?hata=anahtar");

  const rows = baseProjects.map((project, index) => ({
    slug_tr: project.slug.tr,
    slug_en: project.slug.en,
    service_id: project.serviceId || null,
    region_id: project.regionId ?? null,
    year: project.year,
    title_tr: project.copy.tr.title,
    title_en: project.copy.en.title,
    client: project.copy.tr.client ?? null,
    summary_tr: project.copy.tr.summary || null,
    summary_en: project.copy.en.summary || null,
    body_tr: project.copy.tr.description,
    body_en: project.copy.en.description,
    scope_tr: project.copy.tr.scope,
    scope_en: project.copy.en.scope,
    cover: project.cover || null,
    cover_focus: project.coverFocus ?? null,
    gallery: project.gallery ?? [],
    is_published: true,
    /* Koddaki sıra korunsun; 10'ar aralık, araya iş eklemeye yer bırakıyor. */
    sort: (index + 1) * 10,
  }));

  const { error } = await db
    .from("projects")
    .upsert(rows, { onConflict: "slug_tr", ignoreDuplicates: true });

  if (error) {
    console.error("[projects] aktarılamadı:", error.message);
    redirect("/admin/referanslar?hata=aktarim");
  }

  publishContent(PROJECTS_TAG);
  redirect(`/admin/referanslar?aktarildi=${rows.length}`);
}

export async function deleteProject(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  await db.from("projects").delete().eq("id", String(formData.get("id") ?? ""));
  publishContent(PROJECTS_TAG);
  redirect("/admin/referanslar?silindi=1");
}

export async function toggleProject(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  await db
    .from("projects")
    .update({ is_published: formData.get("next") === "1" })
    .eq("id", String(formData.get("id") ?? ""));

  publishContent(PROJECTS_TAG);
  redirect("/admin/referanslar");
}
