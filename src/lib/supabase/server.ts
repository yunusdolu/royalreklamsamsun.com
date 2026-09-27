import "server-only";

import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SECRET_KEY,
  SUPABASE_URL,
  isSupabaseReady,
  isSupabaseWritable,
} from "./env";

/**
 * Üç ayrı istemci var, çünkü üç farklı yetki seviyesi gerekiyor:
 *
 *  - `readClient`   — sayfaların içeriği çekmesi için. Okuma anahtarı, yalnızca
 *                     okuma. Oturum taşımadığı için önbelleğe alınabilir.
 *  - `authClient`   — panelin giriş/çıkış işlemleri. Oturumu çerezde tutar,
 *                     bu yüzden istek başına yeniden kurulur.
 *  - `adminClient`  — panelin yazma işlemleri. RLS'i atlar; sadece oturum
 *                     doğrulandıktan sonra kullanılır.
 */

/** İçerik okumak için. Anahtar yoksa `null` döner, çağıran yedek içeriğe düşer. */
export function readClient() {
  if (!isSupabaseReady) return null;
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Oturum taşıyan istemci. `cookies()` istek kapsamına bağlı olduğu için bu
 * fonksiyon önbelleğe alınan bir yerden çağrılamaz.
 */
export async function authClient() {
  if (!isSupabaseReady) return null;
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(list) {
        /*
          Sunucu bileşeninden çerez yazılamaz; Next bu durumda hata fırlatır.
          Oturum yenileme zaten panel sayfalarında (Server Action / Route
          Handler) gerçekleştiği için burada sessizce geçmek doğru davranış.
        */
        try {
          for (const { name, value, options } of list) {
            store.set(name, value, options);
          }
        } catch {
          // salt okunur bağlam — yoksayılır
        }
      },
    },
  });
}

/** Yazma yetkili istemci. Çağırmadan önce oturumu doğrula. */
export function adminClient() {
  if (!isSupabaseWritable) return null;
  return createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
