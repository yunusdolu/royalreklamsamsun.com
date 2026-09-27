/*
  Görseli tarayıcıdan doğrudan Supabase deposuna yükler.

  Fotoğraf küçültülmüyor, olduğu gibi gidiyor. Panel formu dosyayı değil
  yalnızca yüklenen adresi gönderiyor; bu yüzden istek gövdesi sınırına
  (Vercel'de 4,5 MB) hiç takılmıyor. Ayrıntı: createDirectUpload.
*/

import { startImageUpload } from "./upload-actions";

export function formatBytes(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

export class DirectUploadError extends Error {}

/**
 * Dosyayı yükler, herkese açık adresini döndürür. `onProgress` 0–1 arası.
 * fetch yerine XMLHttpRequest: yükleme ilerlemesini yalnızca o veriyor ve
 * büyük bir fotoğrafta "takıldı mı" sorusunu yüzde çubuğu cevaplıyor.
 */
export async function uploadDirect(
  file: File,
  folder: string,
  onProgress?: (ratio: number) => void,
): Promise<string> {
  const start = await startImageUpload({
    folder,
    name: file.name,
    type: file.type,
    size: file.size,
  });
  if (!start.ok) throw new DirectUploadError(start.error);

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", start.signedUrl);
    xhr.setRequestHeader("content-type", file.type);
    xhr.setRequestHeader("cache-control", "max-age=31536000");
    xhr.setRequestHeader("x-upsert", "false");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(event.loaded / event.total);
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new DirectUploadError(`Yükleme başarısız (${xhr.status}).`));
    xhr.onerror = () =>
      reject(new DirectUploadError("Bağlantı koptu, yükleme tamamlanamadı. Tekrar dene."));
    xhr.send(file);
  });

  return start.publicUrl;
}

/**
 * Yükleme sürerken formun gönderilmesini engeller. Aksi halde yarım kalan
 * görselin adresi yerine eski değer kaydedilir ve kişi "yükledim ama
 * görünmüyor" der. Dinleyici formun kendisinde: React'in form işleyicisi
 * kökte çalıştığı için ondan önce devreye giriyor ve `preventDefault`
 * gönderimi durduruyor.
 */
export function blockSubmitWhile(
  form: HTMLFormElement | null | undefined,
  isBusy: () => boolean,
  onBlocked: () => void,
): () => void {
  if (!form) return () => {};
  const handler = (event: Event) => {
    if (!isBusy()) return;
    event.preventDefault();
    onBlocked();
  };
  form.addEventListener("submit", handler);
  return () => form.removeEventListener("submit", handler);
}
