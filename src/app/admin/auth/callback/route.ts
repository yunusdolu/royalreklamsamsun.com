import { NextResponse, type NextRequest } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { authClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  /*
    `next` yalnızca panelin kendi yollarından biri olabilir. Doğrulama
    olmadan `?next=@kotu.com` verildiğinde yönlendirme
    "https://site.com@kotu.com" oluyordu; tarayıcı bunu kullanıcı adı +
    başka bir alan adı olarak okuyup ziyaretçiyi dışarı gönderiyordu.
  */
  const requested = searchParams.get("next") ?? "";
  const next =
    requested.startsWith("/admin") && !requested.startsWith("//")
      ? requested
      : "/admin/sifre-sifirla";

  const supabase = await authClient();

  if (supabase) {
    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } else if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  const errorDesc =
    searchParams.get("error_description") ||
    "Sıfırlama bağlantısı geçersiz veya süresi dolmuş.";
  return NextResponse.redirect(
    `${origin}/admin/giris?error=${encodeURIComponent(errorDesc)}`,
  );
}
