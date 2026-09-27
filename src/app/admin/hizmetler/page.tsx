import Link from "next/link";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { adminClient } from "@/lib/supabase/server";
import { Notice, PageTitle } from "../ui-server";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string; sifirlandi?: string }>;
}) {
  await requireSession();
  const params = await searchParams;

  /*
    Panel her zaman tablodaki ham değeri göstermeli, sitenin gördüğü
    birleştirilmiş halini değil. Aksi halde "bu alanı ben mi değiştirdim,
    yoksa koddan mı geliyor" sorusu cevapsız kalır.
  */
  const db = adminClient();
  const { data } = (await db
    ?.from("service_overrides")
    .select("id, card_image, hero_image, name_tr, updated_at")) ?? { data: null };
  const edited = new Map((data ?? []).map((row) => [row.id, row]));

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="Hizmetler"
        lead="Hizmet listesi ve adresleri sabittir; buradan görselleri, başlıkları ve teslim sürelerini değiştirirsin. Boş bıraktığın her alan sitedeki mevcut metniyle kalır."
      />

      {params.kaydedildi && <Notice>Kaydedildi. Site tazelendi.</Notice>}
      {params.sifirlandi && (
        <Notice>Düzenlemeler silindi, hizmet eski haline döndü.</Notice>
      )}

      <ul className="divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10 bg-white">
        {services.map((service) => {
          const row = edited.get(service.id);
          const cover = row?.card_image ?? service.image;
          return (
            <li key={service.id}>
              <Link
                href={`/admin/hizmetler/${service.id}`}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-zinc-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt=""
                  className="size-12 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {row?.name_tr ?? service.copy.tr.name}
                  </p>
                  <p className="truncate text-xs text-zinc-500">
                    /hizmetler/{service.slug.tr}
                  </p>
                </div>
                {row && (
                  <span className="shrink-0 rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-white">
                    düzenlendi
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
