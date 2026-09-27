"use server";

import { redirect } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import { describeDbError } from "@/lib/admin/errors";
import { UploadError, resolveImageField } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { HERO_TAG, getCodeSlides } from "@/lib/content/hero";
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

  if (id && !row.is_active && (await isLastLive(db, id))) {
    return "Anasayfada en az bir slayt yayında kalmalı. Önce başka bir slaytı yayına al.";
  }

  const { error } = id
    ? await db.from("hero_slides").update(row).eq("id", id)
    : await db.from("hero_slides").insert(row);

  if (error) return describeDbError(error);

  publishContent(HERO_TAG);
  redirect("/admin/anasayfa?kaydedildi=1");
}

/**
 * Bu slayt kaldırılırsa yayında hiç slayt kalmıyor mu?
 *
 * Anasayfanın tepesi boş kalamaz; tablo tamamen yayından kalkınca site
 * koddaki eski üç slayta geri düşüyor. Panelden "hepsini kaldırdım" diyen
 * kişi sitede eski slaytları görünce ne olduğunu anlamazdı, o yüzden son
 * yayındaki slaytın kaldırılmasına izin verilmiyor.
 */
async function isLastLive(
  db: NonNullable<ReturnType<typeof adminClient>>,
  id: string,
): Promise<boolean> {
  const { data } = await db.from("hero_slides").select("id").eq("is_active", true);
  const live = (data ?? []).map((row) => row.id as string);
  return live.length === 1 && live[0] === id;
}

export async function deleteSlide(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  const id = String(formData.get("id") ?? "");
  if (await isLastLive(db, id)) redirect("/admin/anasayfa?son=1");

  await db.from("hero_slides").delete().eq("id", id);
  publishContent(HERO_TAG);
  redirect("/admin/anasayfa?silindi=1");
}

export async function toggleSlide(formData: FormData) {
  await requireSession();
  const db = adminClient();
  if (!db) return;

  const id = String(formData.get("id") ?? "");
  const next = formData.get("next") === "1";
  if (!next && (await isLastLive(db, id))) redirect("/admin/anasayfa?son=1");

  await db.from("hero_slides").update({ is_active: next }).eq("id", id);

  publishContent(HERO_TAG);
  redirect("/admin/anasayfa");
}

/**
 * Koddaki üç özgün slaytı tabloya aktarır. Tabloda aynı başlıklı slayt
 * varsa onu atlar; ikinci kez basılırsa kopya üretmez. Panelde önceden
 * eklenmiş slaytlara dokunmaz.
 */
export async function importCodeSlides() {
  await requireSession();
  const db = adminClient();
  if (!db) redirect("/admin/anasayfa?hata=anahtar");

  const { data: existing, error: readError } = await db
    .from("hero_slides")
    .select("title_tr");
  if (readError) {
    console.error("[hero] okunamadı:", readError.message);
    redirect("/admin/anasayfa?hata=aktarim");
  }
  const known = new Set((existing ?? []).map((row) => String(row.title_tr).trim()));
  const rows = (await getCodeSlides()).filter((row) => !known.has(row.title_tr.trim()));
  if (rows.length === 0) redirect("/admin/anasayfa");
  const { error } = await db.from("hero_slides").insert(rows);
  if (error) {
    console.error("[hero] aktarılamadı:", error.message);
    redirect("/admin/anasayfa?hata=aktarim");
  }

  publishContent(HERO_TAG);
  redirect(`/admin/anasayfa?aktarildi=${rows.length}`);
}
