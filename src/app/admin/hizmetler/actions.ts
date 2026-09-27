"use server";

import { redirect } from "next/navigation";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { UploadError, resolveImageField } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { SERVICES_TAG } from "@/lib/content/services";
import { adminClient } from "@/lib/supabase/server";

/** Boş metni null yapar: alan temizlenince koddaki değer geri devreye girer. */
function text(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

function number(formData: FormData, key: string): number | null {
  const value = text(formData, key);
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

export async function saveService(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  /*
    Hizmet listesi kodda sabit; panelden yeni hizmet eklenmiyor. Gelen id'yi
    o listeye karşı doğruluyoruz ki forma elle başka bir değer yazılarak
    tabloya karşılığı olmayan satır açılamasın.
  */
  if (!services.some((service) => service.id === id)) {
    return "Bilinmeyen hizmet.";
  }

  const db = adminClient();
  if (!db) return "Supabase yazma anahtarı tanımlı değil.";

  const { data: existing } = await db
    .from("service_overrides")
    .select("card_image, hero_image")
    .eq("id", id)
    .maybeSingle();

  let cardImage: string | null;
  let heroImage: string | null;
  try {
    cardImage = await resolveImageField(
      formData,
      "card_image",
      `services/${id}/kart`,
      existing?.card_image ?? null,
    );
    heroImage = await resolveImageField(
      formData,
      "hero_image",
      `services/${id}/banner`,
      existing?.hero_image ?? null,
    );
  } catch (error) {
    if (error instanceof UploadError) return error.message;
    throw error;
  }

  const { error } = await db.from("service_overrides").upsert({
    id,
    name_tr: text(formData, "name_tr"),
    name_en: text(formData, "name_en"),
    short_name_tr: text(formData, "short_name_tr"),
    short_name_en: text(formData, "short_name_en"),
    summary_tr: text(formData, "summary_tr"),
    summary_en: text(formData, "summary_en"),
    card_image: cardImage,
    hero_image: heroImage,
    hero_focus: text(formData, "hero_image_focus"),
    card_focus: text(formData, "card_image_focus"),
    lead_time_min: number(formData, "lead_time_min"),
    lead_time_max: number(formData, "lead_time_max"),
  });

  if (error) return `Kaydedilemedi: ${error.message}`;

  publishContent(SERVICES_TAG);
  redirect("/admin/hizmetler?kaydedildi=1");
}

/** Bu hizmetin tüm düzenlemelerini siler; koddaki içeriğe geri döner. */
export async function resetService(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  const db = adminClient();
  if (!db) return;

  await db.from("service_overrides").delete().eq("id", id);
  publishContent(SERVICES_TAG);
  redirect("/admin/hizmetler?sifirlandi=1");
}
