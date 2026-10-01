import Link from "next/link";
import {
  ArrowUpDown,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  CirclePause,
  CircleSlash,
  Clock,
  ExternalLink,
  FileText,
  Home,
  Images,
  Megaphone,
  Package,
  PencilLine,
} from "lucide-react";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { EDITABLE_PAGES } from "@/lib/content/pages";
import { adminClient } from "@/lib/supabase/server";
import {
  ActivityChart,
  ChartCard,
  Meter,
  RankBars,
  StatusBar,
  type DayCount,
} from "./charts";

/* -------------------------------------------------------------------------- */
/* Veri                                                                       */
/* -------------------------------------------------------------------------- */

interface CampaignLite {
  id: string;
  title_tr: string;
  is_active: boolean;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}
interface ProjectLite {
  id: string;
  title_tr: string;
  service_id: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
interface Stamped {
  id: string;
  updated_at: string;
}
interface SlideLite extends Stamped {
  title_tr: string;
  is_active: boolean;
}
interface OverrideLite extends Stamped {
  name_tr: string | null;
}

/**
 * Bir tabloyu okur; tablo yoksa ya da okuma başarısızsa boş liste döner.
 * Şema henüz tam çalıştırılmamışken (örneğin page_content yokken) panelin
 * açılışı tek bir eksik tablo yüzünden çökmesin.
 */
async function safeSelect<T>(table: string, columns: string): Promise<T[]> {
  const db = adminClient();
  if (!db) return [];
  const { data, error } = await db.from(table).select(columns);
  if (error) {
    console.error(`[panel] ${table} okunamadı:`, error.message);
    return [];
  }
  return (data ?? []) as T[];
}

type CampaignState = "live" | "scheduled" | "expired" | "off";

/*
  Saate bakan hesaplar bileşen gövdesinde değil, burada: render sırasında
  Date.now() çağırmak React'in saflık kuralını çiğniyor.
*/
function campaignState(row: CampaignLite, now: number): CampaignState {
  if (!row.is_active) return "off";
  if (row.starts_at && new Date(row.starts_at).getTime() > now) return "scheduled";
  if (row.ends_at && new Date(row.ends_at).getTime() < now) return "expired";
  return "live";
}

function summarizeCampaigns(rows: CampaignLite[]) {
  const now = Date.now();
  const week = now + 7 * 24 * 3600 * 1000;
  const counts: Record<CampaignState, number> = { live: 0, scheduled: 0, expired: 0, off: 0 };
  let endingSoon = 0;
  for (const row of rows) {
    const state = campaignState(row, now);
    counts[state] += 1;
    if (state === "live" && row.ends_at && new Date(row.ends_at).getTime() < week) {
      endingSoon += 1;
    }
  }
  return { counts, endingSoon };
}

const DAY_KEY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Istanbul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const DAY_LABEL = new Intl.DateTimeFormat("tr-TR", {
  timeZone: "Europe/Istanbul",
  day: "numeric",
  month: "short",
});

/**
 * Son 30 günün her biri için o gün güncellenen kayıt sayısı.
 *
 * Tablolarda düzenleme geçmişi tutulmuyor, yalnızca kaydın son güncellenme
 * zamanı var. Bu yüzden grafik "kaç düzenleme yapıldı" değil "kaç kayıt en
 * son o gün güncellendi" sorusunu cevaplıyor; başlık da öyle yazıyor.
 */
function buildActivity(stamps: string[]): DayCount[] {
  const days: DayCount[] = [];
  const index = new Map<string, DayCount>();
  const now = Date.now();
  for (let offset = 29; offset >= 0; offset -= 1) {
    const date = new Date(now - offset * 24 * 3600 * 1000);
    const day = { key: DAY_KEY.format(date), label: DAY_LABEL.format(date), count: 0 };
    days.push(day);
    index.set(day.key, day);
  }
  for (const stamp of stamps) {
    const bucket = index.get(DAY_KEY.format(new Date(stamp)));
    if (bucket) bucket.count += 1;
  }
  return days;
}

/* -------------------------------------------------------------------------- */
/* Sayfa                                                                      */
/* -------------------------------------------------------------------------- */

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: Promise<{ message?: string }>;
}) {
  await requireSession();

  const params = searchParams ? await searchParams : undefined;
  const isPasswordUpdated = params?.message === "password_updated";

  const [campaigns, projects, overrides, slides, pages] = await Promise.all([
    safeSelect<CampaignLite>(
      "campaigns",
      "id, title_tr, is_active, starts_at, ends_at, created_at, updated_at",
    ),
    safeSelect<ProjectLite>(
      "projects",
      "id, title_tr, service_id, is_published, created_at, updated_at",
    ),
    safeSelect<OverrideLite>("service_overrides", "id, name_tr, updated_at"),
    safeSelect<SlideLite>("hero_slides", "id, title_tr, is_active, updated_at"),
    safeSelect<Stamped>("page_content", "id, updated_at"),
  ]);

  const { counts, endingSoon } = summarizeCampaigns(campaigns);
  const publishedProjects = projects.filter((row) => row.is_published);
  const activeSlides = slides.filter((row) => row.is_active);

  const activity = buildActivity([
    ...campaigns.map((row) => row.updated_at),
    ...projects.map((row) => row.updated_at),
    ...overrides.map((row) => row.updated_at),
    ...slides.map((row) => row.updated_at),
    ...pages.map((row) => row.updated_at),
  ]);
  const activityTotal = activity.reduce((sum, day) => sum + day.count, 0);

  const projectsByService = services.map((service) => ({
    label: service.copy.tr.name,
    value: publishedProjects.filter((row) => row.service_id === service.id).length,
  }));

  /*
    "/ N" yalnızca N sabit bir sayıyken yazılıyor (sitedeki hizmet ve
    düzenlenebilir sayfa sayısı). Kampanya ve referans işte sınır yok;
    orada "50 / 50" sanki en fazla 50 iş eklenebilirmiş gibi okunuyordu.
    Bu ikisinde toplam yerine yayında olmayanlar not olarak yazılıyor.
  */
  const draftProjects = projects.length - publishedProjects.length;
  const campaignNote =
    campaigns.length === 0
      ? "Henüz kampanya yok"
      : [
          counts.scheduled && `${counts.scheduled} tarihi bekliyor`,
          counts.expired && `${counts.expired} süresi doldu`,
          counts.off && `${counts.off} kapalı`,
        ]
          .filter(Boolean)
          .join(" · ") || "Hepsi yayında";

  const kpis: {
    label: string;
    value: number;
    of?: number;
    note?: string;
    href: string;
    icon: typeof Package;
  }[] = [
    {
      label: "Özelleştirilen hizmet",
      value: overrides.length,
      of: services.length,
      href: "/admin/hizmetler",
      icon: Package,
    },
    {
      label: "Yayındaki kampanya",
      value: counts.live,
      note: campaignNote,
      href: "/admin/kampanyalar",
      icon: Megaphone,
    },
    {
      label: "Yayındaki referans iş",
      value: publishedProjects.length,
      note:
        projects.length === 0
          ? "Henüz iş eklenmedi"
          : draftProjects === 0
            ? "Hepsi yayında"
            : `${draftProjects} taslak`,
      href: "/admin/referanslar",
      icon: Images,
    },
    {
      label: "Düzenlenen sayfa",
      value: pages.length,
      of: EDITABLE_PAGES.length,
      href: "/admin/sayfalar",
      icon: FileText,
    },
  ];

  /* Son dokunulan kayıtlar, tür farkı gözetmeden tek listede. */
  const recent = [
    ...overrides.map((row) => ({
      at: row.updated_at,
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
    ...slides.map((row) => ({
      at: row.updated_at,
      label: row.title_tr,
      kind: "Slayt",
      href: `/admin/anasayfa/${row.id}`,
    })),
    ...pages.map((row) => ({
      at: row.updated_at,
      label: EDITABLE_PAGES.find((page) => page.key === row.id)?.label ?? row.id,
      kind: "Sayfa",
      href: `/admin/sayfalar/${row.id}`,
    })),
  ]
    .filter((item) => item.at)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 7);

  return (
    <div className="flex flex-col gap-6">
      {isPasswordUpdated && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 text-emerald-950">
          <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
          <p className="text-sm">
            <span className="font-semibold">Şifreniz güncellendi.</span> Yeni
            şifreniz aktif.
          </p>
        </div>
      )}

      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Yönetim Paneli</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Sitenin düzenlenebilir içeriği, kampanyaları ve referansları.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-lg border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:border-black/25 hover:text-zinc-900 sm:self-auto"
        >
          <ExternalLink className="size-3.5 text-zinc-500" aria-hidden="true" />
          Siteyi incele
        </a>
      </header>

      {endingSoon > 0 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
          <p className="text-sm text-amber-900">
            <strong>{endingSoon} kampanyanın</strong> süresi bir hafta içinde
            doluyor. Tarihi geçen kampanya siteden kendiliğinden kalkar.{" "}
            <Link href="/admin/kampanyalar" className="underline underline-offset-2">
              Kampanyalara git
            </Link>
          </p>
        </div>
      )}

      {/* ---- Özet sayılar ------------------------------------------------ */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="group flex flex-col rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-black/25"
          >
            <span className="flex items-center justify-between">
              <kpi.icon className="size-4 text-zinc-500" aria-hidden="true" />
              <ArrowUpRight
                className="size-3.5 text-zinc-300 transition-colors group-hover:text-zinc-900"
                aria-hidden="true"
              />
            </span>
            {/* Büyük tek sayıda orantılı rakamlar; hizalı sütun yok. */}
            <span className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
              {kpi.value}
              {kpi.of !== undefined && (
                <span className="ml-1 text-sm font-normal text-zinc-400">/ {kpi.of}</span>
              )}
            </span>
            <span className="mt-1 text-xs text-zinc-600">{kpi.label}</span>
            {kpi.note && <span className="mt-0.5 text-[11px] text-zinc-400">{kpi.note}</span>}
          </Link>
        ))}
      </section>

      {/* ---- Grafikler --------------------------------------------------- */}
      <section className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Son 30 gün · güncellenen kayıtlar"
          headline={
            activityTotal > 0 ? (
              <>
                <strong className="font-semibold text-zinc-900">{activityTotal}</strong> kayıt
              </>
            ) : undefined
          }
        >
          <ActivityChart days={activity} />
        </ChartCard>

        <ChartCard
          title="Kampanya durumu"
          headline={
            campaigns.length > 0 ? (
              <>
                <strong className="font-semibold text-zinc-900">{campaigns.length}</strong> kampanya
              </>
            ) : undefined
          }
        >
          <StatusBar
            emptyText="Henüz kampanya yok. İlk kampanyanı oluşturduğunda durum dağılımı burada görünür."
            segments={[
              { label: "Yayında", count: counts.live, color: "#0ca30c", icon: CircleDot },
              { label: "Tarihi bekliyor", count: counts.scheduled, color: "#fab219", icon: Clock },
              { label: "Süresi doldu", count: counts.expired, color: "#71717a", icon: CircleSlash },
              { label: "Yayından kaldırıldı", count: counts.off, color: "#a1a1aa", icon: CirclePause },
            ]}
          />
        </ChartCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Hizmete göre referans işler"
          headline={
            publishedProjects.length > 0 ? (
              <>
                <strong className="font-semibold text-zinc-900">{publishedProjects.length}</strong> yayında
              </>
            ) : undefined
          }
        >
          <RankBars
            unit="iş"
            rows={projectsByService}
            emptyText={
              <>
                Henüz gerçek referans iş eklenmedi — sitede şu an yer tutucu
                projeler görünüyor.
                <br />
                <Link href="/admin/referanslar/yeni" className="font-medium text-zinc-900 underline underline-offset-2">
                  İlk işi ekle
                </Link>
              </>
            }
          />
        </ChartCard>

        <ChartCard title="Panelden özelleştirilen içerik">
          <div className="flex flex-col gap-4">
            <Meter
              label="Hizmetler"
              value={overrides.length}
              max={services.length}
              href="/admin/hizmetler"
              note={overrides.length === 0 ? "Hepsi koddaki metin ve görselle" : "Kalanlar koddaki haliyle"}
            />
            <Meter
              label="Sayfa başlıkları"
              value={pages.length}
              max={EDITABLE_PAGES.length}
              href="/admin/sayfalar"
              note={pages.length === 0 ? "Hepsi özgün başlığıyla" : "Kalanlar özgün başlığıyla"}
            />
            {/* Slayt sayısında sınır yok; oran, girilen slaytların kaçının
                yayında olduğu. */}
            <Meter
              label="Anasayfa slaytları"
              value={activeSlides.length}
              max={slides.length}
              href="/admin/anasayfa"
              note={
                activeSlides.length === 0
                  ? "Koddaki üç özgün slayt görünüyor"
                  : slides.length > activeSlides.length
                    ? `${slides.length - activeSlides.length} slayt kapalı`
                    : "Hepsi yayında"
              }
            />
          </div>
        </ChartCard>
      </section>

      {/* ---- Kısayollar ve son değişiklikler ----------------------------- */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-black/10 bg-white p-5">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900">Hızlı işlem</h2>
          <div className="mt-4 flex flex-col gap-2">
            <QuickAction href="/admin/kampanyalar/yeni" icon={Megaphone} title="Yeni kampanya" note="Tarih ver, hizmetlerini seç" />
            <QuickAction href="/admin/referanslar/yeni" icon={Images} title="Yeni referans iş" note="Fotoğraflarını yükle" />
            <QuickAction href="/admin/anasayfa" icon={Home} title="Anasayfa slaytları" note="Görsel ve başlıklar" />
            <QuickAction href="/admin/anasayfa/duzen" icon={ArrowUpDown} title="Anasayfa bölüm sırası" note="Hangi bölüm üstte, hangisi altta" />
            <QuickAction href="/admin/sayfalar" icon={PencilLine} title="Sayfa başlıkları" note="Her sayfanın başlığı ve görseli" />
          </div>
        </div>

        <div className="rounded-xl border border-black/10 bg-white p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900">Son değişiklikler</h2>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">
              Henüz bir değişiklik yok. Panelden yaptığın her kayıt burada görünür.
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
                      <span className="mr-2 inline-block w-16 text-xs text-zinc-400">{item.kind}</span>
                      {item.label}
                    </span>
                    <time className="shrink-0 text-xs tabular-nums text-zinc-400">
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
      <Icon className="size-4 shrink-0 text-zinc-600" aria-hidden="true" />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-zinc-900">{title}</span>
        <span className="block truncate text-xs text-zinc-500">{note}</span>
      </span>
    </Link>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
