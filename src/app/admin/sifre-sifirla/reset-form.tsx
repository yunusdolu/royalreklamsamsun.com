"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
} from "lucide-react";

import { resetPassword, type PasswordResetResponse } from "../actions";

function SubmitButton() {
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
          <span>Şifre güncelleniyor…</span>
        </>
      ) : (
        <span>Şifremi Güncelle ve Giriş Yap</span>
      )}
    </button>
  );
}

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [state, formAction] = useActionState<
    PasswordResetResponse | undefined,
    FormData
  >(resetPassword, undefined);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-3.5">
      {state?.error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800"
        >
          <AlertCircle className="size-4 shrink-0 text-rose-600 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Yeni Şifre */}
      <div className="flex flex-col gap-1 text-sm">
        <label
          htmlFor="new-password"
          className="text-xs font-medium text-zinc-700"
        >
          Yeni Şifre
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            id="new-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="En az 6 karakter"
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

      {/* Yeni Şifre Tekrar */}
      <div className="flex flex-col gap-1 text-sm">
        <label
          htmlFor="confirm-password"
          className="text-xs font-medium text-zinc-700"
        >
          Yeni Şifre (Tekrar)
        </label>
        <div className="relative">
          <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
          <input
            id="confirm-password"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={6}
            placeholder="Şifreyi tekrar yazın"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2 pl-9 pr-9 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            aria-label={showConfirm ? "Şifreyi gizle" : "Şifreyi göster"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-zinc-700"
          >
            {showConfirm ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <p className="text-[11px] text-zinc-400">
        Şifreniz en az 6 karakter uzunluğunda olmalıdır.
      </p>

      <SubmitButton />

      {/* Girişe dön */}
      <div className="mt-2 text-center">
        <Link
          href="/admin/giris"
          className="inline-flex items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-600"
        >
          <ArrowLeft className="size-3" />
          <span>Giriş ekranına dön</span>
        </Link>
      </div>
    </form>
  );
}
