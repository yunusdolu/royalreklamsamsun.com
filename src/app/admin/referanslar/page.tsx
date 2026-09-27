import Link from "next/link";
import { Images, Plus } from "lucide-react";

import { getServiceById } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { getAllProjectRows } from "@/lib/content/projects";
import { Notice, PageTitle } from "../ui-server";
import { toggleProject } from "./actions";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string; silindi?: string }>;
}) {
  await requireSession();
  const params = await searchParams;
  const projects = await getAllProjectRows();

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="Referans İşler"
        lead="Yaptığın işleri fotoğraflarıyla ekle. Buraya kayıt girdiğin anda sitedeki örnek projelerin yerini alır."
      >
        <Link
          href="/admin/referanslar/yeni"
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Yeni iş
        </Link>
      </PageTitle>

      {params.kaydedildi && <Notice>Kaydedildi. Site tazelendi.</Notice>}
      {params.silindi && <Notice>Kayıt silindi.</Notice>}

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/15 bg-white px-6 py-14 text-center">
          <Images className="mx-auto size-7 text-zinc-400" />
          <p className="mt-3 text-sm font-medium">Henüz iş eklenmedi</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-zinc-500">
            Şu an sitede yer tutucu projeler görünüyor. Buraya ilk gerçek işi
            eklediğinde onların hepsi kalkar.
          </p>
          <Link
            href="/admin/referanslar/yeni"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Yeni iş
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((row) => (
            <li
              key={row.id}
              className="overflow-hidden rounded-xl border border-black/10 bg-white"
            >
              <Link href={`/admin/referanslar/${row.id}`} className="block">
                {row.cover ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={row.cover}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <span className="grid aspect-[4/3] w-full place-items-center bg-zinc-100 text-zinc-400">
                    <Images className="size-6" />
                  </span>
                )}
                <div className="p-4">
                  <p className="truncate text-sm font-medium">{row.title_tr}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {getServiceById(row.service_id ?? "")?.copy.tr.name ??
                      "Hizmet seçilmedi"}
                    {row.year ? ` · ${row.year}` : ""}
                    {row.gallery.length > 0 ? ` · ${row.gallery.length} foto` : ""}
                  </p>
                </div>
              </Link>

              <div className="flex items-center justify-between gap-3 border-t border-black/10 px-4 py-2.5">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    row.is_published
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {row.is_published ? "Yayında" : "Yayında değil"}
                </span>
                <form action={toggleProject}>
                  <input type="hidden" name="id" value={row.id} />
                  <input
                    type="hidden"
                    name="next"
                    value={row.is_published ? "0" : "1"}
                  />
                  <button
                    type="submit"
                    className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
                  >
                    {row.is_published ? "Kaldır" : "Yayınla"}
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
