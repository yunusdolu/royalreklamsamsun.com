import Link from "next/link";
import { Megaphone, Plus } from "lucide-react";

import { requireSession } from "@/lib/admin/auth";
import { getAllCampaignRows, type CampaignRow } from "@/lib/content/campaigns";
import { Notice } from "../ui-server";
import { toggleCampaign } from "./actions";

function state(row: CampaignRow): { label: string; tone: string } {
  const now = Date.now();
  if (!row.is_active) return { label: "Yayında değil", tone: "bg-zinc-100 text-zinc-600" };
  if (row.starts_at && new Date(row.starts_at).getTime() > now) {
    return { label: "Bekliyor", tone: "bg-amber-100 text-amber-800" };
  }
  if (row.ends_at && new Date(row.ends_at).getTime() < now) {
    return { label: "Süresi doldu", tone: "bg-zinc-100 text-zinc-600" };
  }
  return { label: "Yayında", tone: "bg-emerald-100 text-emerald-800" };
}

function formatRange(row: CampaignRow): string {
  const fmt = (value: string) =>
    new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short" }).format(
      new Date(value),
    );
  if (row.starts_at && row.ends_at) return `${fmt(row.starts_at)} – ${fmt(row.ends_at)}`;
  if (row.ends_at) return `${fmt(row.ends_at)} tarihine kadar`;
  if (row.starts_at) return `${fmt(row.starts_at)} tarihinden itibaren`;
  return "Süresiz";
}

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string; silindi?: string }>;
}) {
  await requireSession();
  const params = await searchParams;
  const campaigns = await getAllCampaignRows();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Kampanyalar</h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600">
            Tarihi geçen kampanya siteden kendiliğinden kalkar; elle kaldırman
            gerekmez.
          </p>
        </div>
        <Link
          href="/admin/kampanyalar/yeni"
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Yeni kampanya
        </Link>
      </header>

      {params.kaydedildi && <Notice>Kaydedildi. Site tazelendi.</Notice>}
      {params.silindi && <Notice>Kampanya silindi.</Notice>}

      {campaigns.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/15 bg-white px-6 py-14 text-center">
          <Megaphone className="mx-auto size-7 text-zinc-400" />
          <p className="mt-3 text-sm font-medium">Henüz kampanya yok</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-zinc-500">
            İlk kampanyanı oluştur; anasayfada şerit olarak, kampanyalar
            sayfasında ve seçtiğin hizmet sayfalarında görünsün.
          </p>
          <Link
            href="/admin/kampanyalar/yeni"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Yeni kampanya
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10 bg-white">
          {campaigns.map((row) => {
            const badge = state(row);
            return (
              <li key={row.id} className="flex items-center gap-4 px-4 py-3">
                {row.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={row.image}
                    alt=""
                    className="size-12 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-400">
                    <Megaphone className="size-5" />
                  </span>
                )}

                <Link
                  href={`/admin/kampanyalar/${row.id}`}
                  className="min-w-0 flex-1"
                >
                  <p className="truncate text-sm font-medium">{row.title_tr}</p>
                  <p className="truncate text-xs text-zinc-500">
                    {formatRange(row)}
                    {row.service_ids.length > 0 &&
                      ` · ${row.service_ids.length} hizmet sayfası`}
                  </p>
                </Link>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${badge.tone}`}
                >
                  {badge.label}
                </span>

                <form action={toggleCampaign} className="shrink-0">
                  <input type="hidden" name="id" value={row.id} />
                  <input type="hidden" name="next" value={row.is_active ? "0" : "1"} />
                  <button
                    type="submit"
                    className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
                  >
                    {row.is_active ? "Kaldır" : "Yayınla"}
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
