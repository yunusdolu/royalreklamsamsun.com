import "server-only";

import { slugify } from "@/lib/slugify";
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
  return slugify(base, "gorsel", 60);
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

/**
 * Tarayıcıdan doğrudan yükleme için büyük sınır. Fotoğraf küçültülmeden,
 * olduğu gibi depoya gidiyor; sitede her ekran için uygun boyutu zaten
 * next/image üretiyor. 25 MB telefonla çekilmiş en büyük fotoğrafı da
 * karşılıyor.
 */
const MAX_DIRECT_BYTES = 25 * 1024 * 1024;

/**
 * Tarayıcının dosyayı doğrudan depoya yükleyebileceği tek kullanımlık adres.
 *
 * Neden: dosya panel formuyla (server action) gönderildiğinde istek
 * gövdesi sınırına takılıyor — Next.js'te ayarlanabilir ama Vercel'de 4,5
 * MB'ta sabit. Fotoğrafı küçültmek kaliteyi düşürüyordu. Bu yolda dosya
 * sunucumuzdan hiç geçmiyor: sunucu yalnızca oturumu ve dosya türünü
 * denetleyip Supabase'ten imzalı bir adres alıyor, dosyayı tarayıcı oraya
 * yüklüyor, forma da yalnızca ortaya çıkan adres yazılıyor.
 *
 * Adres yalnızca bu tek yol için, iki saat geçerli; gizli anahtar tarayıcıya
 * hiç gitmiyor.
 */
export async function createDirectUpload(
  folder: string,
  fileName: string,
  type: string,
  size: number,
): Promise<{ signedUrl: string; publicUrl: string }> {
  if (!ALLOWED.has(type)) {
    throw new UploadError("Yalnızca JPG, PNG, WEBP veya AVIF yükleyebilirsin.");
  }
  if (!(size > 0) || size > MAX_DIRECT_BYTES) {
    throw new UploadError("Dosya 25 MB'tan büyük olmamalı.");
  }
  /* Klasör adı istemciden geliyor; depo içinde başka yere yazılamasın. */
  if (!/^[a-z0-9][a-z0-9-]*(\/[a-z0-9-]+)*$/.test(folder)) {
    throw new UploadError("Geçersiz klasör.");
  }

  const db = adminClient();
  if (!db) throw new UploadError("Supabase yazma anahtarı tanımlı değil.");

  const ext = type.split("/")[1].replace("jpeg", "jpg");
  const path = `${folder}/${Date.now()}-${slugifyName(fileName)}.${ext}`;

  const { data, error } = await db.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    throw new UploadError(`Yükleme başlatılamadı: ${error?.message ?? "bilinmeyen hata"}`);
  }

  return {
    signedUrl: data.signedUrl,
    publicUrl: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`,
  };
}
