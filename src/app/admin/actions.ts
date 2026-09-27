"use server";

import { redirect } from "next/navigation";

import { authClient } from "@/lib/supabase/server";

/** Giriş formunun gönderdiği işlem. Hata mesajı forma geri döner. */
export async function signIn(
  _prev: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return "E-posta ve şifre gerekli.";

  const supabase = await authClient();
  if (!supabase) return "Supabase yapılandırılmamış.";

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  /*
    Supabase "Invalid login credentials" döndürüyor; hangi alanın yanlış
    olduğunu söylemiyoruz, e-posta taraması yapılmasını kolaylaştırmasın.
  */
  if (error) return "E-posta veya şifre hatalı.";

  redirect("/admin");
}

export async function signOut() {
  const supabase = await authClient();
  await supabase?.auth.signOut();
  redirect("/admin/giris");
}
