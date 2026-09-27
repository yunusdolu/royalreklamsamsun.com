"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import {
  signIn,
  requestPasswordReset,
  type PasswordResetResponse,
} from "../actions";

function LoginSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin text-white" />
          <span>Giriş yapılıyor…</span>
        </>
      ) : (
        <span>Giriş Yap</span>
      )}
    </button>
  );
}

function ResetSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin text-white" />
          <span>Gönderiliyor…</span>
        </>
      ) : (
        <span>Sıfırlama Bağlantısı Gönder</span>
      )}
    </button>
  );
}

export function LoginForm({
  initialError,
  initialMessage,
}: {
  initialError?: string;
  initialMessage?: string;
}) {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Giriş aksiyonu
  const [loginError, loginAction] = useActionState(signIn, undefined);

  // Şifre sıfırlama aksiyonu
  const [resetState, resetAction] = useActionState<
    PasswordResetResponse | undefined,
    FormData
  >(requestPasswordReset, undefined);

  return (
    <div className="mt-6 w-full">
      {/* Üst Bilgilendirme / Hata Bildirimleri */}
      {initialMessage && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-800">
          <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
          <span>{initialMessage}</span>
        </div>
      )}

      {initialError && !loginError && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800">
          <AlertCircle className="size-4 shrink-0 text-rose-600 mt-0.5" />
          <span>{initialError}</span>
        </div>
      )}

      {mode === "login" ? (
        /* GİRİŞ FORMU */
        <form action={loginAction} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1 text-sm">
            <label
              htmlFor="email-input"
              className="text-xs font-medium text-zinc-700"
            >
              E-posta
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
              <input
                id="email-input"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="ornek@royalreklamsamsun.com"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 pl-9 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password-input"
                className="text-xs font-medium text-zinc-700"
              >
                Şifre
              </label>
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs text-zinc-500 transition-colors hover:text-zinc-900"
              >
                Şifremi unuttum?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
              <input
                id="password-input"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 pl-9 pr-9 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {loginError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800"
            >
              <AlertCircle className="size-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <LoginSubmit />
        </form>
      ) : (
        /* ŞİFREMİ UNUTTUM FORMU */
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <span className="text-sm font-semibold text-zinc-900">
              Şifre Sıfırlama
            </span>
            <button
              type="button"
              onClick={() => setMode("login")}
              className="inline-flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-900"
            >
              <ArrowLeft className="size-3" />
              <span>Girişe dön</span>
            </button>
          </div>

          <p className="text-xs text-zinc-500">
            Kayıtlı e-posta adresinizi girin, sıfırlama bağlantısını iletelim.
          </p>

          <form action={resetAction} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-sm">
              <label
                htmlFor="reset-email-input"
                className="text-xs font-medium text-zinc-700"
              >
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
                <input
                  id="reset-email-input"
                  name="email"
                  type="email"
                  required
                  placeholder="ornek@royalreklamsamsun.com"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 pl-9 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900"
                />
              </div>
            </div>

            {resetState?.error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800"
              >
                <AlertCircle className="size-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{resetState.error}</span>
              </div>
            )}

            {resetState?.success && (
              <div className="flex flex-col gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{resetState.success}</span>
                </div>

              </div>
            )}

            <ResetSubmit />
          </form>
        </div>
      )}

      {/* Sitenin anasayfasına dönüş */}
      <div className="mt-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-600"
        >
          <ArrowLeft className="size-3" />
          <span>royalreklamsamsun.com</span>
        </Link>
      </div>
    </div>
  );
}
