"use server";

import { redirect } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import { UploadError, resolveImageField } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { HERO_TAG } from "@/lib/content/hero";
import { adminClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

export async function saveSlide(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const db = adminClient();
  if (!db) return "Supabase yazma anahtarı tanımlı değil.";

  const id = text(formData, "id");
  const title = text(formData, "title_tr");
  if (!title) return "Başlık gerekli.";

  let existingImage: string | null = null;
  if (id) {
    const { data } = await db
      .from("hero_slides")
      .select("image")
      .eq("id", id)
      .maybeSingle();
    existingImage = data?.image ?? null;
  }

  let image: string | null;
  try {
    image = await resolveImageField(formData, "image", "hero", existingImage);
  } catch (error) {
    if (error instanceof UploadError) return error.message;
    throw error;
  }

  const row = {
    image,
    image_focus: text(formData, "image_focus"),
    title_tr: title,
    title_en: text(formData, "title_en"),
    title2_tr: text(formData, "title2_tr"),
    title2_en: text(formData, "title2_en"),
    description_tr: text(formData, "description_tr"),
    description_en: text(formData, "description_en"),
    alt_tr: text(formData, "alt_tr"),
    alt_en: text(formData, "alt_en"),
    is_active: formData.get("is_active") === "on",
    sort: Number(text(formData, "sort") ?? 0) || 0,
  };

  const { error } = id
    ? await db.from("hero_slides").update(row).eq("id", id)
    : await db.from("hero_slides").insert(row);

  if (error) return `Kaydedilemedi: ${error.message}`;

  publishContent(HERO_TAG);
  redirect("/admin/anasayfa?kaydedildi=1");
}

export async function deleteSlide(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  await db.from("hero_slides").delete().eq("id", String(formData.get("id") ?? ""));
  publishContent(HERO_TAG);
  redirect("/admin/anasayfa?silindi=1");
}

export async function toggleSlide(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  await db
    .from("hero_slides")
    .update({ is_active: formData.get("next") === "1" })
    .eq("id", String(formData.get("id") ?? ""));

  publishContent(HERO_TAG);
  redirect("/admin/anasayfa");
}
