import "server-only";

import { SUPABASE_URL } from "@/lib/supabase/env";
import { adminClient } from "@/lib/supabase/server";

const BUCKET = "media";

/** Panelin kabul ettiği görsel türleri. */
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

/** 8 MB. Telefonla çekilmiş bir fotoğraf rahat sığar, kaza eseri video yüklenmez. */
const MAX_BYTES = 8 * 1024 * 1024;

export class UploadError extends Error {}

function slugifyName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  return (
    base
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "gorsel"
  );
}

/**
 * Bir görseli Supabase Storage'a yükler ve herkese açık adresini döndürür.
 *
 * Dosya adına zaman damgası ekleniyor: aynı adla yeniden yüklenen bir görsel
 * eskisinin üstüne yazsaydı, tarayıcıların ve Vercel'in önbelleğindeki eski
 * fotoğraf günlerce görünmeye devam ederdi. Yeni ad her seferinde yeni adres
 * demek, yani değişiklik anında görünür.
 */
export async function uploadImage(
  file: File,
  folder: string,
): Promise<string> {
  if (!ALLOWED.has(file.type)) {
    throw new UploadError("Yalnızca JPG, PNG, WEBP veya AVIF yükleyebilirsin.");
  }
  if (file.size > MAX_BYTES) {
    throw new UploadError("Dosya 8 MB'tan büyük olmamalı.");
  }

  const db = adminClient();
  if (!db) throw new UploadError("Supabase yazma anahtarı tanımlı değil.");

  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${folder}/${Date.now()}-${slugifyName(file.name)}.${ext}`;

  const { error } = await db.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new UploadError(`Yükleme başarısız: ${error.message}`);

  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

/**
 * Formdan gelen dosyayı yükler; dosya seçilmemişse mevcut değeri korur.
 * Panel formlarında "değiştirmek istemiyorsan boş bırak" davranışı bu.
 */
export async function resolveImageField(
  formData: FormData,
  field: string,
  folder: string,
  current: string | null,
): Promise<string | null> {
  const file = formData.get(field);
  if (file instanceof File && file.size > 0) {
    return uploadImage(file, folder);
  }
  /* Gizli alandaki mevcut adres; kullanıcı "kaldır" derse boş gelir. */
  const kept = formData.get(`${field}_current`);
  if (typeof kept === "string") return kept.trim() || null;
  return current;
}
