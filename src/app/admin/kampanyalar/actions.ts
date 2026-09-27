"use server";

import { redirect } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import { describeDbError } from "@/lib/admin/errors";
import { UploadError, resolveImageField } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { CAMPAIGNS_TAG } from "@/lib/content/campaigns";
import { adminClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

/**
 * Başlıktan adres parçası üretir. Kampanya adresleri Google'a düşebildiği
 * için Türkçe harfler sadeleştiriliyor.
 */
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
      .slice(0, 70) || "kampanya"
  );
}

/** Tarih alanı boşsa null; `datetime-local` yerel saat verir, ISO'ya çeviriyoruz. */
function timestamp(formData: FormData, key: string): string | null {
  const value = text(formData, key);
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function saveCampaign(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const db = adminClient();
  if (!db) return "Supabase yazma anahtarı tanımlı değil.";

  const id = text(formData, "id");
  const title = text(formData, "title_tr");
  if (!title) return "Kampanya başlığı gerekli.";

  const starts = timestamp(formData, "starts_at");
  const ends = timestamp(formData, "ends_at");
  if (starts && ends && new Date(ends) < new Date(starts)) {
    return "Bitiş tarihi başlangıçtan önce olamaz.";
  }

  let existingImage: string | null = null;
  if (id) {
    const { data } = await db
      .from("campaigns")
      .select("image")
      .eq("id", id)
      .maybeSingle();
    existingImage = data?.image ?? null;
  }

  let image: string | null;
  try {
    image = await resolveImageField(formData, "image", "campaigns", existingImage);
  } catch (error) {
    if (error instanceof UploadError) return error.message;
    throw error;
  }

  const row = {
    slug: text(formData, "slug") ?? slugify(title),
    title_tr: title,
    title_en: text(formData, "title_en"),
    excerpt_tr: text(formData, "excerpt_tr"),
    excerpt_en: text(formData, "excerpt_en"),
    body_tr: text(formData, "body_tr"),
    body_en: text(formData, "body_en"),
    badge_tr: text(formData, "badge_tr"),
    badge_en: text(formData, "badge_en"),
    image,
    image_focus: text(formData, "image_focus"),
    service_ids: formData.getAll("service_ids").map(String),
    starts_at: starts,
    ends_at: ends,
    is_active: formData.get("is_active") === "on",
    sort: Number(text(formData, "sort") ?? 0) || 0,
  };

  const query = id
    ? db.from("campaigns").update(row).eq("id", id)
    : db.from("campaigns").insert(row);

  const { error } = await query;
  if (error) {
    /* Adres benzersiz; aynı başlıkla ikinci kampanya açılırsa burası patlar. */
    if (error.code === "23505") {
      return "Bu adres zaten kullanılıyor. Adres alanına farklı bir değer yaz.";
    }
    return describeDbError(error);
  }

  publishContent(CAMPAIGNS_TAG);
  redirect("/admin/kampanyalar?kaydedildi=1");
}

export async function deleteCampaign(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  await db.from("campaigns").delete().eq("id", String(formData.get("id") ?? ""));
  publishContent(CAMPAIGNS_TAG);
  redirect("/admin/kampanyalar?silindi=1");
}

/** Listeden tek tıkla yayına alma / yayından kaldırma. */
export async function toggleCampaign(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  await db
    .from("campaigns")
    .update({ is_active: formData.get("next") === "1" })
    .eq("id", String(formData.get("id") ?? ""));

  publishContent(CAMPAIGNS_TAG);
  redirect("/admin/kampanyalar");
}
