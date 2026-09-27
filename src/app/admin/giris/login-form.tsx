"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signIn } from "../actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Giriş yapılıyor…" : "Giriş yap"}
    </button>
  );
}

export function LoginForm() {
  const [error, formAction] = useActionState(signIn, undefined);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-3">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">E-posta</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="rounded-lg border border-black/15 bg-white px-3 py-2 outline-none focus:border-zinc-900"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Şifre</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-black/15 bg-white px-3 py-2 outline-none focus:border-zinc-900"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <Submit />
    </form>
  );
}
