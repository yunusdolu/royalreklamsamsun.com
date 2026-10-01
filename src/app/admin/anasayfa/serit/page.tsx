import Link from "next/link";

import { requireSession } from "@/lib/admin/auth";
import {
  DEFAULT_MARQUEE,
  MARQUEE_MAX_ITEMS,
  MARQUEE_MAX_LENGTH,
  getMarqueeForAdmin,
} from "@/lib/content/marquee";
import { Notice, PageTitle } from "../../ui-server";
import { MarqueeForm } from "./marquee-form";

export default async function MarqueePage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string }>;
}) {
  await requireSession();
  const params = await searchParams;
  const saved = await getMarqueeForAdmin();

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
          title="Kayan şerit"
          lead="Anasayfada sağdan sola kayan siyah bant. Burada yazılarını değiştirirsin; sayfadaki yerini Bölüm sırası'ndan ayarlarsın."
        >
          <Link
            href="/admin/anasayfa/duzen"
            className="rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Yerini değiştir
          </Link>
        </PageTitle>

        {params.kaydedildi && <Notice>Şerit kaydedildi. Site tazelendi.</Notice>}
      </div>

      <MarqueeForm
        /* Kayıttan sonra form kaydedilen yazılarla yeniden kurulsun. */
        key={`${saved.tr.join("|")}#${saved.en.join("|")}`}
        initialTr={saved.tr}
        initialEn={saved.en}
        defaultsTr={DEFAULT_MARQUEE.tr}
        defaultsEn={DEFAULT_MARQUEE.en}
        maxItems={MARQUEE_MAX_ITEMS}
        maxLength={MARQUEE_MAX_LENGTH}
      />
    </div>
  );
}
