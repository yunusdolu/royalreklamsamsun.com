"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";
import { authClient } from "@/lib/supabase/server";

export interface PasswordResetResponse {
  error?: string;
  success?: string;
}

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

/**
 * Sıfırlama bağlantısının döneceği adres.
 *
 * İstek başlığındaki Host'a körü körüne güvenilmiyor: başlık istemci
 * tarafından yazılabilir ve e-postadaki bağlantının nereye döneceğini
 * belirliyor. Yalnızca yerel geliştirme ve sitenin kendi alan adı kabul
 * ediliyor; geri kalan her şey canlı adrese düşüyor.
 */
async function resetOrigin(): Promise<string> {
  try {
    const list = await headers();
    const host = (list.get("x-forwarded-host") ?? list.get("host") ?? "")
      .split(",")[0]
      .trim()
      .toLowerCase();
    if (/^localhost(:\d+)?$/.test(host) || /^127\.0\.0\.1(:\d+)?$/.test(host)) {
      return `http://${host}`;
    }
    if (host === siteConfig.domain || host === `www.${siteConfig.domain}`) {
      return `https://${host}`;
    }
  } catch {
    // başlık okunamazsa canlı adrese düş
  }
  return siteConfig.url;
}

/**
 * Şifremi unuttum isteği: kayıtlı adrese sıfırlama bağlantısı gönderir.
 *
 * Güvenlik notu — bu fonksiyon giriş yapmamış herkese açık. Önceki sürüm
 * yönetim anahtarıyla bir kurtarma bağlantısı üretip onu doğrudan
 * tarayıcıya geri döndürüyordu; yani yönetici e-postasını bilen biri
 * posta kutusuna hiç erişmeden şifreyi değiştirip panele girebiliyordu.
 * Bağlantı artık yalnızca e-postayla gidiyor.
 *
 * Yanıt, adres kayıtlı olsun olmasın aynı: farklı mesaj vermek hangi
 * e-postanın yönetici olduğunu dışarıya söylemek olurdu.
 */
export async function requestPasswordReset(
  _prev: PasswordResetResponse | undefined,
  formData: FormData,
): Promise<PasswordResetResponse> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return { error: "Lütfen geçerli bir e-posta adresi girin." };
  }

  const supabase = await authClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const redirectTo = `${await resetOrigin()}/admin/auth/callback?next=/admin/sifre-sifirla`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  /*
    Hız sınırı gibi hatalar sunucu günlüğüne düşüyor ama kullanıcıya ayrı
    bir mesaj olarak gösterilmiyor — gösterilirse "bu adres var" ile "bu
    adres yok" yine ayırt edilebilir hale gelir.
  */
  if (error) console.error("[sifre-sifirlama]", error.message);

  return {
    success:
      "Bu adres kayıtlıysa şifre sıfırlama bağlantısı gönderildi. Gelen kutunuzu (ve gerekiyorsa spam klasörünü) kontrol edin; bağlantı bir saat geçerlidir.",
  };
}

/** Yeni şifreyi kaydeder. */
export async function resetPassword(
  _prev: PasswordResetResponse | undefined,
  formData: FormData,
): Promise<PasswordResetResponse> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!password || password.length < 6) {
    return { error: "Yeni şifre en az 6 karakter olmalıdır." };
  }

  if (password !== confirmPassword) {
    return { error: "Girdiğiniz şifreler birbiriyle eşleşmiyor." };
  }

  const supabase = await authClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return {
      error:
        error.message ||
        "Şifre güncellenemedi. Oturumunuzun süresi dolmuş olabilir. Lütfen sıfırlama bağlantısını tekrar isteyin.",
    };
  }

  redirect("/admin?message=password_updated");
}
