import { redirect } from "next/navigation";

import { getSession } from "@/lib/admin/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="text-xl font-semibold tracking-tight">Yönetim Girişi</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Hesap Supabase panelinden açılır; burada kayıt yoktur.
      </p>
      <LoginForm />
    </div>
  );
}
