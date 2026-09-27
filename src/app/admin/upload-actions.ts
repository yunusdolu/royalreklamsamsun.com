"use server";

import { requireSession } from "@/lib/admin/auth";
import { UploadError, createDirectUpload } from "@/lib/admin/media";

export type StartUploadResult =
  | { ok: true; signedUrl: string; publicUrl: string }
  | { ok: false; error: string };

/** Görsel alanları dosya seçilir seçilmez bunu çağırıyor; bkz. createDirectUpload. */
export async function startImageUpload(input: {
  folder: string;
  name: string;
  type: string;
  size: number;
}): Promise<StartUploadResult> {
  await requireSession();
  try {
    return { ok: true, ...(await createDirectUpload(input.folder, input.name, input.type, input.size)) };
  } catch (error) {
    if (error instanceof UploadError) return { ok: false, error: error.message };
    throw error;
  }
}
