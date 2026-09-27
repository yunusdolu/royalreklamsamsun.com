import type { Metadata } from "next";
import "../globals.css";

import { getSession } from "@/lib/admin/auth";
import { isSupabaseReady, isSupabaseWritable } from "@/lib/supabase/env";
import { Sidebar } from "./sidebar";

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <html lang="tr">
      <body className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
        {!isSupabaseReady && (
          <Banner>
            Supabase anahtarları tanımlı değil. Panel çalışmaz; site koddaki
            içerikle yayında kalmaya devam eder.
          </Banner>
        )}
        {isSupabaseReady && !isSupabaseWritable && (
          <Banner>
            <code>SUPABASE_SECRET_KEY</code> tanımlı değil. Kayıt işlemleri
            çalışmaz.
          </Banner>
        )}

        {/* Giriş ekranında menü yok: oturum açılmadan gidilecek bir yer de yok. */}
        {user ? (
          <div className="lg:pl-64">
            <Sidebar email={user.email ?? "yönetici"} />
            <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
              {children}
            </main>
          </div>
        ) : (
          <div className="min-h-screen w-full">{children}</div>
        )}
      </body>
    </html>
  );
}

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <p className="bg-amber-100 px-4 py-3 text-center text-sm text-amber-900">
      {children}
    </p>
  );
}
