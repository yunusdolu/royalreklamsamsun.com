"use server";

import { redirect } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import { UploadError, resolveImageField, uploadImage } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { PROJECTS_TAG } from "@/lib/content/projects";
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

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/İ/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 70) || "proje"
  );
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

  const base = text(formData, "slug_tr") ?? slugify(title);
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
    return `Kaydedilemedi: ${error.message}`;
  }

  publishContent(PROJECTS_TAG);
  redirect("/admin/referanslar?kaydedildi=1");
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
