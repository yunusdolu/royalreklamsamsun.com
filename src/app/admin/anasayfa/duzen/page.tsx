import Link from "next/link";

import { requireSession } from "@/lib/admin/auth";
import {
  DEFAULT_HOME_ORDER,
  HOME_SECTIONS,
  getHomeOrderForAdmin,
} from "@/lib/content/home-layout";
import { Notice, PageTitle } from "../../ui-server";
import { LayoutEditor } from "./layout-editor";

export default async function HomeLayoutPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string }>;
}) {
  await requireSession();
  const params = await searchParams;
  const { order, tableMissing } = await getHomeOrderForAdmin();

  return (
    <div>
      <Link
        href="/admin/anasayfa"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Anasayfa
      </Link>

      <div className="mt-3 flex flex-col gap-6">
        <PageTitle
          title="Bölüm sırası"
          lead="Anasayfadaki bölümlerin yukarıdan aşağıya sırası. Bir satırı tutup sürükle ya da oklarla taşı, sonra kaydet. Bölümlerin içeriği değişmez, yalnızca yerleri değişir."
        />

        {params.kaydedildi && <Notice>Sıra kaydedildi. Site tazelendi.</Notice>}

        {tableMissing && (
          <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
            <p className="font-semibold">Bu özellik için veritabanında bir tablo eksik</p>
            <p className="mt-1 leading-relaxed">
              Supabase → SQL Editor&apos;ü aç, <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code>{" "}
              dosyasının tamamını yapıştırıp çalıştır (mevcut verilere dokunmaz), sonra bu sayfayı yenile.
              O zamana kadar sıra kaydedilemez; site şu anki sırayla açılmaya devam eder.
            </p>
          </div>
        )}
      </div>

      <LayoutEditor
        /* Kayıttan sonra düzenleyici yeni sırayı "başlangıç" saysın. */
        key={order.join()}
        sections={HOME_SECTIONS.map((section) => ({ ...section }))}
        initialOrder={order}
        defaultOrder={DEFAULT_HOME_ORDER}
      />
    </div>
  );
}
