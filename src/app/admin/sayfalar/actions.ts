"use server";

import { redirect } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import { describeDbError } from "@/lib/admin/errors";
import { UploadError, resolveImageField } from "@/lib/admin/media";
import { publishContent } from "@/lib/admin/publish";
import { EDITABLE_PAGES, PAGES_TAG } from "@/lib/content/pages";
import { adminClient } from "@/lib/supabase/server";

function text(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? null : value;
}

export async function savePage(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  /* Sayfa listesi kodda sabit; forma elle başka bir anahtar yazılamasın. */
  if (!EDITABLE_PAGES.some((page) => page.key === id)) {
    return "Bilinmeyen sayfa.";
  }

  const db = adminClient();
  if (!db) return "Supabase yazma anahtarı tanımlı değil.";

  const { data: existing, error: readError } = await db
    .from("page_content")
    .select("image")
    .eq("id", id)
    .maybeSingle();
  if (readError) return describeDbError(readError);

  let image: string | null;
  try {
    image = await resolveImageField(formData, "image", `pages/${id}`, existing?.image ?? null);
  } catch (error) {
    if (error instanceof UploadError) return error.message;
    throw error;
  }

  const { error } = await db.from("page_content").upsert({
    id,
    title_tr: text(formData, "title_tr"),
    title_en: text(formData, "title_en"),
    lead_tr: text(formData, "lead_tr"),
    lead_en: text(formData, "lead_en"),
    image,
    image_focus: image ? text(formData, "image_focus") : null,
  });

  if (error) return describeDbError(error);

  publishContent(PAGES_TAG);
  redirect(`/admin/sayfalar/${id}?kaydedildi=1`);
}

/** Sayfanın tüm düzenlemelerini siler; koddaki başlığa geri döner. */
export async function resetPage(formData: FormData) {
  await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!EDITABLE_PAGES.some((page) => page.key === id)) return;

  const db = adminClient();
  if (!db) return;

  await db.from("page_content").delete().eq("id", id);
  publishContent(PAGES_TAG);
  redirect(`/admin/sayfalar/${id}?sifirlandi=1`);
}
