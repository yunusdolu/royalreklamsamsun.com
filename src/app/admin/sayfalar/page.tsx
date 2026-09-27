import Link from "next/link";
import { ArrowUpRight, FileText, Home, Images, Package } from "lucide-react";

import { requireSession } from "@/lib/admin/auth";
import {
  EDITABLE_PAGES,
  getAllPageRows,
  getPageDefaults,
} from "@/lib/content/pages";
import { Notice, PageTitle } from "../ui-server";

/*
  Sitenin kendi yapısı olan sayfaları (anasayfa, hizmet ve referans
  sayfaları) burada ayrıca düzenletmiyoruz; onların zaten kendi bölümleri
  var. Yine de listede duruyorlar ki "hangi sayfayı nereden değiştiririm"
  sorusunun cevabı tek yerde olsun.
*/
const MANAGED_ELSEWHERE = [
  {
    label: "Anasayfa",
    path: "/",
    note: "Üstteki kayan slaytlar",
    href: "/admin/anasayfa",
    icon: Home,
  },
  {
    label: "Hizmet sayfaları",
    path: "/hizmetler/…",
    note: "Her hizmetin görseli, adı, açıklaması, teslim süresi",
    href: "/admin/hizmetler",
    icon: Package,
  },
  {
    label: "Referans iş sayfaları",
    path: "/referanslar/…",
    note: "Her işin fotoğrafları ve metni",
    href: "/admin/referanslar",
    icon: Images,
  },
] as const;

export default async function PagesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string; sifirlandi?: string }>;
}) {
  await requireSession();
  const params = await searchParams;

  const [rows, defaults] = await Promise.all([
    getAllPageRows(),
    Promise.all(EDITABLE_PAGES.map((page) => getPageDefaults(page.key, "tr"))),
  ]);
  const byId = new Map(rows.map((row) => [row.id, row]));

  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        title="Sayfa başlıkları"
        lead="Sitedeki her sayfanın başlığı, kısa açıklaması ve isteğe bağlı bir görseli buradan değişir. Boş bıraktığın alan sitedeki mevcut metinle kalır."
      />

      {params.kaydedildi && <Notice>Kaydedildi. Site tazelendi.</Notice>}
      {params.sifirlandi && (
        <Notice>Düzenlemeler silindi, sayfa özgün başlığına döndü.</Notice>
      )}

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Sayfa başlıkları · {EDITABLE_PAGES.length} sayfa
        </h2>
        <ul className="mt-3 divide-y divide-black/[0.06] overflow-hidden rounded-xl border border-black/10 bg-white">
          {EDITABLE_PAGES.map((page, index) => {
            const row = byId.get(page.key);
            const title = row?.title_tr?.trim() || defaults[index].title;
            const edited = Boolean(row);
            return (
              <li key={page.key}>
                <Link
                  href={`/admin/sayfalar/${page.key}`}
                  className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-zinc-50"
                >
                  {row?.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={row.image}
                      alt=""
                      style={{ objectPosition: row.image_focus ?? undefined }}
                      className="h-10 w-16 shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <span className="grid h-10 w-16 shrink-0 place-items-center rounded-md bg-zinc-100 text-zinc-400">
                      <FileText className="size-4" aria-hidden="true" />
                    </span>
                  )}

                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-zinc-900">
                        {page.label}
                      </span>
                      <span className="truncate text-xs text-zinc-400">
                        {page.path}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-zinc-500">
                      {title}
                    </span>
                  </span>

                  {edited && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-800">
                      düzenlendi
                    </span>
                  )}
                  <ArrowUpRight
                    className="size-4 shrink-0 text-zinc-300 transition-colors group-hover:text-zinc-900"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Kendi bölümünden yönetilen sayfalar
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {MANAGED_ELSEWHERE.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-2 rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-black/25"
              >
                <span className="flex items-center justify-between">
                  <item.icon className="size-4 text-zinc-500" aria-hidden="true" />
                  <ArrowUpRight
                    className="size-4 text-zinc-300 transition-colors group-hover:text-zinc-900"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-sm font-medium text-zinc-900">{item.label}</span>
                <span className="text-xs text-zinc-500">{item.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
