import { redirect } from "next/navigation";

import { getSession } from "@/lib/admin/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
        Royal Reklam
      </p>
      <h1 className="mt-2 text-xl font-semibold tracking-tight">
        Yönetim paneli
      </h1>
      <p className="mt-1.5 text-sm text-zinc-600">
        Hesap Supabase tarafından açılır; burada kayıt yoktur.
      </p>
      <LoginForm />
    </div>
  );
}
