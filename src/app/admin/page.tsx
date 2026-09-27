import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  Images,
  Megaphone,
  Package,
  PencilLine,
} from "lucide-react";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { getAllCampaignRows } from "@/lib/content/campaigns";
import { getAllProjectRows } from "@/lib/content/projects";
import { adminClient } from "@/lib/supabase/server";

function isLive(row: { is_active: boolean; starts_at: string | null; ends_at: string | null }) {
  const now = Date.now();
  if (!row.is_active) return false;
  if (row.starts_at && new Date(row.starts_at).getTime() > now) return false;
  if (row.ends_at && new Date(row.ends_at).getTime() < now) return false;
  return true;
}

/* Tarih hesabı bileşen gövdesinde değil: render sırasında saate bakmak
   React'in saflık kuralını çiğniyor ve lint doğru şekilde uyarıyor. */
function endingWithinAWeek<T extends { ends_at: string | null }>(rows: T[]): T[] {
  const limit = Date.now() + 7 * 24 * 3600 * 1000;
  return rows.filter((row) => row.ends_at && new Date(row.ends_at).getTime() < limit);
}

export default async function Dashboard() {
  await requireSession();

  const db = adminClient();
  const [campaigns, projects, overrides] = await Promise.all([
    getAllCampaignRows(),
    getAllProjectRows(),
    db
      ?.from("service_overrides")
      .select("id, name_tr, updated_at")
      .order("updated_at", { ascending: false })
      .then(({ data }) => data ?? []) ?? Promise.resolve([]),
  ]);

  const liveCampaigns = campaigns.filter(isLive);
  const endingSoon = endingWithinAWeek(liveCampaigns);

  const stats = [
    {
      label: "Hizmet",
      value: services.length,
      note: `${overrides.length} tanesi düzenlendi`,
      href: "/admin/hizmetler",
      icon: Package,
    },
    {
      label: "Yayındaki kampanya",
      value: liveCampaigns.length,
      note:
        campaigns.length > liveCampaigns.length
          ? `${campaigns.length - liveCampaigns.length} tanesi yayında değil`
          : "tamamı yayında",
      href: "/admin/kampanyalar",
      icon: Megaphone,
    },
    {
      label: "Referans iş",
      value: projects.filter((row) => row.is_published).length,
      note: `${projects.length} kayıt`,
      href: "/admin/referanslar",
      icon: Images,
    },
  ];

  /* Son dokunulan kayıtlar, tür farkı gözetmeden tek listede. */
  const recent = [
    ...overrides.map((row) => ({
      at: row.updated_at as string,
      label: row.name_tr ?? services.find((s) => s.id === row.id)?.copy.tr.name ?? row.id,
      kind: "Hizmet",
      href: `/admin/hizmetler/${row.id}`,
    })),
    ...campaigns.map((row) => ({
      at: row.updated_at ?? row.created_at,
      label: row.title_tr,
      kind: "Kampanya",
      href: `/admin/kampanyalar/${row.id}`,
    })),
    ...projects.map((row) => ({
      at: row.updated_at ?? row.created_at,
      label: row.title_tr,
      kind: "Referans",
      href: `/admin/referanslar/${row.id}`,
    })),
  ]
    .filter((item) => item.at)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Panel</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Sitenin düzenlenebilir içeriği buradan yönetiliyor.
        </p>
      </header>

      {endingSoon.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-amber-700" />
          <p className="text-sm text-amber-900">
            <strong>{endingSoon.length} kampanyanın</strong> süresi bir hafta
            içinde doluyor. Tarihi geçen kampanya siteden kendiliğinden kalkar.{" "}
            <Link href="/admin/kampanyalar" className="underline underline-offset-2">
              Kampanyalara git
            </Link>
          </p>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-black/10 bg-white p-5 transition-colors hover:border-black/25"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-9 place-items-center rounded-lg bg-zinc-100 text-zinc-700">
                <stat.icon className="size-4.5" />
              </span>
              <ArrowUpRight className="size-4 text-zinc-300 transition-colors group-hover:text-zinc-900" />
            </div>
            <p className="mt-4 text-3xl font-semibold tabular-nums tracking-tight">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium">{stat.label}</p>
            <p className="mt-0.5 text-xs text-zinc-500">{stat.note}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-black/10 bg-white p-5">
          <h2 className="text-sm font-semibold tracking-tight">Hızlı işlem</h2>
          <div className="mt-4 flex flex-col gap-2">
            <QuickAction
              href="/admin/kampanyalar/yeni"
              icon={Megaphone}
              title="Yeni kampanya"
              note="Tarih ver, hangi hizmetlerde görüneceğini seç"
            />
            <QuickAction
              href="/admin/referanslar/yeni"
              icon={Images}
              title="Yeni referans iş"
              note="Fotoğraf yükle, hangi hizmete ait olduğunu seç"
            />
            <QuickAction
              href="/admin/hizmetler"
              icon={PencilLine}
              title="Hizmet görseli değiştir"
              note="Kart ve banner fotoğrafları"
            />
          </div>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-5">
          <h2 className="text-sm font-semibold tracking-tight">
            Son değişiklikler
          </h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">
              Henüz bir değişiklik yok.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-black/5">
              {recent.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3 py-2.5 text-sm transition-colors hover:text-zinc-900"
                  >
                    <span className="min-w-0 truncate">
                      <span className="text-zinc-400">{item.kind} · </span>
                      {item.label}
                    </span>
                    <time className="shrink-0 text-xs text-zinc-400">
                      {formatDate(item.at)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  note,
}: {
  href: string;
  icon: typeof Megaphone;
  title: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border border-black/10 px-3 py-2.5 transition-colors hover:bg-zinc-50"
    >
      <Icon className="size-4.5 shrink-0 text-zinc-600" />
      <span className="min-w-0">
        <span className="block text-sm font-medium">{title}</span>
        <span className="block truncate text-xs text-zinc-500">{note}</span>
      </span>
    </Link>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
