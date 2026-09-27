import Link from "next/link";
import { PencilLine } from "lucide-react";

import { getAllPageRows, getPageDefaults, type PageKey } from "@/lib/content/pages";

/**
 * Liste sayfalarının (hizmetler, referanslar, kampanyalar) başındaki kart.
 *
 * Bu üç sayfanın hem kayıtları hem kendi başlık bloğu var. Başlık için
 * menüde ayrı bir satır açmak yerine kaydın hemen üstünde, sitede
 * göründüğü sırayla duruyor: önce sayfanın başlığı, altında kartlar.
 */
export async function PageHeaderCard({ pageKey }: { pageKey: PageKey }) {
  const [rows, defaults] = await Promise.all([
    getAllPageRows(),
    getPageDefaults(pageKey, "tr"),
  ]);
  const row = rows.find((item) => item.id === pageKey);
  const title = row?.title_tr?.trim() || defaults.title;
  const lead = row?.lead_tr?.trim() || defaults.lead;

  return (
    <Link
      href={`/admin/sayfalar/${pageKey}`}
      className="group flex items-center gap-4 rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-black/25"
    >
      {row?.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={row.image}
          alt=""
          style={{ objectPosition: row.image_focus ?? undefined }}
          className="h-14 w-24 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <span className="hidden h-14 w-24 shrink-0 rounded-lg bg-[#121214] sm:block" />
      )}

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          Sayfa başlığı
          {row && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-800">
              düzenlendi
            </span>
          )}
        </span>
        <span className="mt-1 block truncate text-sm font-semibold text-zinc-900">{title}</span>
        <span className="mt-0.5 block truncate text-xs text-zinc-500">{lead}</span>
      </span>

      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-black/10 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors group-hover:border-black/25 group-hover:text-zinc-900">
        <PencilLine className="size-3.5" aria-hidden="true" />
        Düzenle
      </span>
    </Link>
  );
}
