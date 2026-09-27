import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/admin/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; message?: string }>;
}) {
  if (await getSession()) redirect("/admin");

  const params = searchParams ? await searchParams : undefined;
  const initialError = params?.error;
  const initialMessage = params?.message;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Arka plan görseli: hero3.jpeg (Royal Reklam 3D bina & gökyüzü) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero3.jpeg"
          alt="Royal Reklam Samsun"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />

        {/* Az gradyant ile hafif karartma */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30" />
      </div>

      {/* Beyaz Yönetici Giriş Kartı */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white p-7 sm:p-8 shadow-2xl shadow-black/25">
          {/* Logo ve Başlık */}
          <div className="flex flex-col items-center text-center">
            <Link
              href="/"
              className="group mb-4 transition-transform hover:scale-[1.02]"
              title="Royal Reklam Anasayfa"
            >
              <Image
                src="/brand/my-logo.png"
                alt="Royal Reklam Samsun"
                width={220}
                height={52}
                priority
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Yönetici Girişi
            </h1>
          </div>

          {/* Form */}
          <LoginForm
            initialError={initialError}
            initialMessage={initialMessage}
          />
        </div>
      </div>
    </div>
  );
}
