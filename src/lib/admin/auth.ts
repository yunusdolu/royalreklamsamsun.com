import "server-only";

import { redirect } from "next/navigation";

import { authClient } from "@/lib/supabase/server";

/**
 * Panel oturumu.
 *
 * Giriş Supabase Auth ile e-posta + şifre üzerinden yapılıyor; kullanıcı
 * Supabase panelinden elle açılıyor, sitede kayıt formu yok. Tek bir yönetici
 * hesabı olan bir işletme sitesi için kayıt akışı fazladan yüzey açmak olurdu.
 */
export async function getSession() {
  const supabase = await authClient();
  if (!supabase) return null;
  /*
    `getUser()` kullanılıyor, `getSession()` değil: ikincisi çerezdeki veriye
    güvenir ve çerez istemci tarafında değiştirilebilir. `getUser()` her
    çağrıda Supabase'e doğrulatır.
  */
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

/** Oturum yoksa giriş sayfasına atar. Panel sayfalarının ilk satırı. */
export async function requireSession() {
  const user = await getSession();
  if (!user) redirect("/admin/giris");
  return user;
}
