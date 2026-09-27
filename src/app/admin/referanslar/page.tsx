import Link from "next/link";
import { ArrowDownToLine, Images, Plus } from "lucide-react";

import { projects as codeProjects } from "@/content/projects";
import { getServiceById } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { getAllProjectRows } from "@/lib/content/projects";
import { SubmitButton } from "../ui";
import { Notice, PageTitle } from "../ui-server";
import { PageHeaderCard } from "../sayfalar/header-card";
import { importCodeProjects, toggleProject } from "./actions";

const ERRORS: Record<string, string> = {
  anahtar: "Supabase yazma anahtarı tanımlı değil; aktarım yapılamadı.",
  aktarim: "İşler aktarılamadı. Supabase şeması güncel mi? Şema dosyasını bir kez daha çalıştırıp tekrar dene.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    kaydedildi?: string;
    silindi?: string;
    aktarildi?: string;
    hata?: string;
    hizmet?: string;
  }>;
}) {
  await requireSession();
  const params = await searchParams;
  const projects = await getAllProjectRows();

  /* Hizmete göre filtre — 50 iş tek listede aranmıyor. */
  const serviceCounts = new Map<string, number>();
  for (const row of projects) {
    const key = row.service_id ?? "";
    serviceCounts.set(key, (serviceCounts.get(key) ?? 0) + 1);
  }
  /* `undefined` = tümü; boş metin = hizmeti seçilmemiş işler. */
  const activeService = params.hizmet;
  const visible =
    activeService === undefined
      ? projects
      : projects.filter((row) => (row.service_id ?? "") === activeService);
  const publishedCount = projects.filter((row) => row.is_published).length;

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="Referans İşler"
        lead={
          projects.length > 0
            ? `${projects.length} iş · ${publishedCount} tanesi sitede yayında. Bir işe tıklayıp fotoğrafını, başlığını ve metnini değiştirebilirsin.`
            : "Yaptığın işleri fotoğraflarıyla ekle, düzenle, yayından kaldır."
        }
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
      {params.aktarildi && (
        <Notice>
          Sitedeki {params.aktarildi} iş panele aktarıldı. Artık her birini
          buradan düzenleyebilirsin; sitede hiçbir şey değişmedi.
        </Notice>
      )}
      {params.hata && ERRORS[params.hata] && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {ERRORS[params.hata]}
        </p>
      )}

      <PageHeaderCard pageKey="referanslar" />

      {projects.length === 0 ? (
        <CodeProjectsPreview />
      ) : (
        <>
          <nav aria-label="Hizmete göre süz" className="flex flex-wrap gap-2">
            <FilterChip href="/admin/referanslar" active={activeService === undefined} label="Tümü" count={projects.length} />
            {[...serviceCounts.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([id, count]) => (
                <FilterChip
                  key={id || "yok"}
                  href={`/admin/referanslar?hizmet=${encodeURIComponent(id)}`}
                  active={activeService === id}
                  label={getServiceById(id)?.copy.tr.shortName ?? "Hizmet seçilmedi"}
                  count={count}
                />
              ))}
          </nav>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((row) => (
              <li
                key={row.id}
                className="overflow-hidden rounded-xl border border-black/10 bg-white"
              >
                <Link href={`/admin/referanslar/${row.id}`} className="group block">
                  {row.cover ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={row.cover}
                      alt=""
                      loading="lazy"
                      style={{ objectPosition: row.cover_focus ?? undefined }}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <span className="grid aspect-[4/3] w-full place-items-center bg-zinc-100 text-zinc-400">
                      <Images className="size-6" />
                    </span>
                  )}
                  <div className="p-4">
                    <p className="truncate text-sm font-medium group-hover:underline">{row.title_tr}</p>
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
        </>
      )}
    </div>
  );
}

function FilterChip({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "border border-black/10 bg-white text-zinc-600 hover:border-black/25 hover:text-zinc-900"
      }`}
    >
      {label}
      <span className={`tabular-nums ${active ? "text-amber-400" : "text-zinc-400"}`}>{count}</span>
    </Link>
  );
}

/**
 * Tablo boşken: sitede görünen işler koddan geliyor. Onları gösterip tek
 * düğmeyle panele almayı öneriyoruz; aksi halde panel "hiç iş yok" der ama
 * sitede elli iş durur ve kullanıcı bunları nereden değiştireceğini bulamaz.
 */
function CodeProjectsPreview() {
  return (
    <>
      <section className="flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold text-zinc-900">
            Sitede {codeProjects.length} iş görünüyor, ama henüz panelde değiller
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Aşağıdaki işler sitenin koduna gömülü; bu yüzden buradan
            düzenlenemiyor. Panele aktardığında her biri ayrı bir kayıt olur:
            fotoğrafını, başlığını, metnini değiştirebilir, istemediğini
            yayından kaldırabilirsin. Aktarım sitede hiçbir şeyi değiştirmez,
            adresler aynı kalır.
          </p>
        </div>
        <form action={importCodeProjects} className="shrink-0">
          <SubmitButton pendingLabel="Aktarılıyor…">
            <span className="inline-flex items-center gap-2">
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              {codeProjects.length} işi panele aktar
            </span>
          </SubmitButton>
        </form>
      </section>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {codeProjects.map((project) => (
          <li
            key={project.id}
            className="overflow-hidden rounded-xl border border-black/10 bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{project.copy.tr.title}</p>
                <p className="mt-0.5 truncate text-xs text-zinc-500">
                  {getServiceById(project.serviceId)?.copy.tr.name ?? "Hizmet seçilmedi"}
                  {` · ${project.year}`}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                Sitede
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
