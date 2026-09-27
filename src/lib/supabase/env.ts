/**
 * Supabase bağlantı bilgileri.
 *
 * Adlar Supabase'in kendi belgelerindeki adlarla birebir aynı tutuldu ki
 * panelden kopyalanan değer doğrudan yapıştırılabilsin.
 *
 * Hiçbirinde `NEXT_PUBLIC_` öneki yok: tüm okuma ve yazma sunucuda oluyor,
 * anahtarların tarayıcıya gitmesine gerek yok. Önek eklenirse anahtar istemci
 * paketine gömülür ve herkes tarafından görülebilir.
 *
 * Üçü de isteğe bağlı: tanımlı değilse site, panel hiç kurulmamış gibi
 * çalışır ve içeriğini `src/content/` altındaki dosyalardan okur. Bu sayede
 * hem anahtarsız geliştirme yapılabiliyor hem de Supabase bir gün
 * erişilemezse sayfalar boş kalmıyor.
 */
export const SUPABASE_URL = process.env.SUPABASE_URL ?? "";

/** Yalnızca okuma yetkisi olan anahtar (`sb_publishable_…`). */
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ?? "";

/**
 * Satır güvenliğini (RLS) atlayan gizli anahtar (`sb_secret_…`). Panelin
 * yazma işlemleri bununla yapılır; asla tarayıcıya gönderilmez.
 */
export const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? "";

/** Okuma yapılabilir mi. */
export const isSupabaseReady = Boolean(
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY,
);

/** Panelden yazılabilir mi. */
export const isSupabaseWritable = Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY);
