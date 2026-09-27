import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";

import { getSession } from "@/lib/admin/auth";
import { isSupabaseReady, isSupabaseWritable } from "@/lib/supabase/env";
import { signOut } from "./actions";

/**
 * Panel, sitenin dil katmanının dışında duruyor (`src/proxy.ts` içindeki
 * matcher `/admin`'i atlıyor). Tek kişinin kullandığı bir arayüzü iki dile
 * çevirmenin karşılığı yok; yönetim Türkçe.
 */
export const metadata: Metadata = {
  title: "Royal Reklam Yönetim",
  robots: { index: false, follow: false },
};

/* Panel her zaman canlı veriyi göstermeli; statik üretilmemeli. */
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "Özet" },
  { href: "/admin/hizmetler", label: "Hizmetler" },
  { href: "/admin/kampanyalar", label: "Kampanyalar" },
  { href: "/admin/referanslar", label: "Referans İşler" },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <html lang="tr">
      <body className="min-h-screen bg-zinc-100 text-zinc-900 antialiased">
        {!isSupabaseReady && (
          <p className="bg-amber-100 px-4 py-3 text-center text-sm text-amber-900">
            Supabase anahtarları tanımlı değil. Panel çalışmaz; site koddaki
            içerikle yayında kalmaya devam eder.
          </p>
        )}
        {isSupabaseReady && !isSupabaseWritable && (
          <p className="bg-amber-100 px-4 py-3 text-center text-sm text-amber-900">
            <code>SUPABASE_SECRET_KEY</code> tanımlı değil. Kayıt
            işlemleri çalışmaz.
          </p>
        )}

        {user && (
          <header className="border-b border-black/10 bg-white">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4">
              <span className="text-sm font-semibold tracking-tight">
                Royal Reklam Yönetim
              </span>
              <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <form action={signOut} className="ml-auto">
                <button
                  type="submit"
                  className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                >
                  Çıkış
                </button>
              </form>
            </div>
          </header>
        )}

        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
