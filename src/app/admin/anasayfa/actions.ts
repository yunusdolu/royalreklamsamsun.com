"use server";

import { redirect } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import { describeDbError } from "@/lib/admin/errors";
import { UploadError, resolveImageField } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { HERO_TAG, getCodeSlides } from "@/lib/content/hero";
import {
  DEFAULT_HOME_ORDER,
  HOME_LAYOUT_KEY,
  HOME_LAYOUT_TAG,
  normalizeHomeOrder,
} from "@/lib/content/home-layout";
import {
  MARQUEE_KEY,
  MARQUEE_MAX_ITEMS,
  MARQUEE_MAX_LENGTH,
  MARQUEE_TAG,
  cleanMarqueeItems,
} from "@/lib/content/marquee";
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

/**
 * Anasayfa bölümlerinin sırasını kaydeder. Form tek bir gizli alan
 * gönderiyor: virgülle ayrılmış bölüm anahtarları, yukarıdan aşağıya.
 */
export async function saveHomeLayout(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const db = adminClient();
  if (!db) return "Supabase yazma anahtarı tanımlı değil.";

  const sent = String(formData.get("order") ?? "")
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
  const order = normalizeHomeOrder(sent);
  /* Eksik ya da tanınmayan anahtar geldiyse form bozulmuş demektir. */
  if (sent.length !== DEFAULT_HOME_ORDER.length || sent.join() !== order.join()) {
    return "Sıra okunamadı. Sayfayı yenileyip tekrar dene.";
  }

  const { error } = await db
    .from("site_settings")
    .upsert({ key: HOME_LAYOUT_KEY, value: order }, { onConflict: "key" });
  if (error) return describeDbError(error);

  publishContent(HOME_LAYOUT_TAG);
  redirect("/admin/anasayfa/duzen?kaydedildi=1");
}

/** Çok satırlı alanı ifade listesine çevirir: her satır bir ifade. */
function marqueeLines(formData: FormData, key: string): string[] {
  return String(formData.get(key) ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Kayan şeridin yazılarını kaydeder. Türkçe boş bırakılırsa şerit koddaki
 * özgün ifadelere döner; İngilizce boşsa İngilizce sayfa koddaki İngilizce
 * ifadeleri gösterir.
 */
export async function saveMarquee(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const db = adminClient();
  if (!db) return "Supabase yazma anahtarı tanımlı değil.";

  const tr = marqueeLines(formData, "items_tr");
  const en = marqueeLines(formData, "items_en");
  for (const list of [tr, en]) {
    if (list.length > MARQUEE_MAX_ITEMS) {
      return `En fazla ${MARQUEE_MAX_ITEMS} ifade girilebilir.`;
    }
    const long = list.find((item) => item.length > MARQUEE_MAX_LENGTH);
    if (long) {
      return `"${long.slice(0, 30)}…" çok uzun. Bir ifade en fazla ${MARQUEE_MAX_LENGTH} karakter olabilir; şerit kısa ifadelerle güzel durur.`;
    }
  }

  const { error } = await db
    .from("site_settings")
    .upsert(
      { key: MARQUEE_KEY, value: { tr: cleanMarqueeItems(tr), en: cleanMarqueeItems(en) } },
      { onConflict: "key" },
    );
  if (error) return describeDbError(error);

  publishContent(MARQUEE_TAG);
  redirect("/admin/anasayfa/serit?kaydedildi=1");
}
