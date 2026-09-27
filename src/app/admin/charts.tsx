/*
  Panel grafikleri.

  Kütüphane yok: dört küçük grafik için bir grafik paketi getirmek sayfayı
  ağırlaştırırdı ve hepsi düz HTML + CSS ile çiziliyor. Sunucuda üretiliyor,
  tarayıcıya JavaScript inmiyor.

  Renk kararları ölçülerek verildi (dataviz doğrulayıcısı, beyaz kart
  zeminine karşı):
  - Tek seri: altın #b4892c. Tek renk olduğu için gösterge kutusu yok,
    başlık seriyi adlandırıyor. Kontrast 3:1'in üstünde.
  - Kampanya durumu: sabit durum paleti (yeşil = yayında, sarı = bekliyor)
    + iki gri. Sarı ve açık gri 3:1'in altında kalıyor; bu yüzden her dilim
    göstergede ikon, etiket ve sayıyla birlikte yazılıyor — renk hiçbir
    yerde tek başına anlam taşımıyor.
  - Metinler seri renginde değil, metin rengiyle yazılıyor.
*/

import type { LucideIcon } from "lucide-react";

export const SERIES = "#b4892c";
const TRACK = "#f4f4f5";
const GRID = "#e4e4e7";

/* -------------------------------------------------------------------------- */
/* Kart kabuğu                                                                */
/* -------------------------------------------------------------------------- */

export function ChartCard({
  title,
  headline,
  children,
  className = "",
}: {
  title: string;
  /** Başlığın yanında duran tek sayı — grafiğin asıl cevabı. */
  headline?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-black/10 bg-white p-5 ${className}`}>
      <header className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-semibold tracking-tight text-zinc-900">{title}</h2>
        {headline && <span className="text-xs text-zinc-500">{headline}</span>}
      </header>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    /* grid yerine flex: grid her çocuğu (metin, <br>, bağlantı) ayrı bir
       satıra koyup yüksekliğe yaydığı için bağlantı metinden kopuyordu. */
    <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-black/10 px-4 py-6">
      <p className="text-center text-xs leading-relaxed text-zinc-500">{children}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Günlük hareket — sütun grafiği                                             */
/* -------------------------------------------------------------------------- */

export interface DayCount {
  key: string;
  /** "27 Eyl" */
  label: string;
  count: number;
}

export function ActivityChart({ days }: { days: DayCount[] }) {
  const max = Math.max(0, ...days.map((day) => day.count));
  if (max === 0) {
    return (
      <Empty>
        Son 30 günde panelden güncellenen kayıt yok.
        <br />
        İlk düzenlemeni yaptığında burada günlük hareket görünür.
      </Empty>
    );
  }

  /* Eksen: yalnızca ilk, orta ve son gün — otuz etiket okunmaz. */
  const ticks = [days[0], days[Math.floor(days.length / 2)], days[days.length - 1]];

  /* Kenardaki sütunların ipucu kartın dışına taşmasın: sola ya da sağa yaslanıyor. */
  const tipAlign = (index: number) =>
    index < 4
      ? "left-0"
      : index > days.length - 5
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  return (
    <div>
      <div className="relative">
        {/* Izgara: üst çizgi en yüksek değeri, alt çizgi sıfırı gösteriyor. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2">
          <span className="w-4 text-right text-[10px] tabular-nums text-zinc-400">{max}</span>
          <span className="h-px flex-1" style={{ background: GRID }} />
        </div>

        <div className="ml-6 flex h-36 items-end gap-[2px] border-b pt-2" style={{ borderColor: "#d4d4d8" }}>
          {days.map((day, index) => {
            const height = day.count === 0 ? 0 : Math.max(6, (day.count / max) * 100);
            return (
              <div
                key={day.key}
                tabIndex={0}
                aria-label={`${day.label}: ${day.count} kayıt`}
                className="group relative flex h-full flex-1 items-end rounded-sm outline-none focus-visible:bg-black/[0.05]"
              >
                {day.count > 0 && (
                  <span
                    className="block w-full max-w-6 rounded-t-[4px] transition-opacity group-hover:opacity-80"
                    style={{ height: `${height}%`, background: SERIES }}
                  />
                )}
                {/* Üzerine gelince ya da odaklanınca. focus-visible değil focus:
                    programatik ve dokunmatik odakta da görünsün. */}
                <span className={`pointer-events-none absolute bottom-full z-10 mb-1.5 hidden whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] text-white group-hover:block group-focus:block ${tipAlign(index)}`}>
                  {day.label} · <strong className="font-semibold">{day.count}</strong> kayıt
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/*
        Etiketler sütun hücrelerinin içinde değil: her hücre ~20 px, "29 Ağu"
        iki satıra kırılıyordu. Üç etiket kendi satırında, uçlara yaslı.
      */}
      <div className="ml-6 mt-1.5 flex justify-between whitespace-nowrap text-[10px] tabular-nums text-zinc-400">
        {ticks.map((day) => (
          <span key={day.key}>{day.label}</span>
        ))}
      </div>

      <DataTable
        caption="Günlere göre güncellenen kayıt"
        head={["Gün", "Kayıt"]}
        rows={days.filter((day) => day.count > 0).map((day) => [day.label, String(day.count)])}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Parça-bütün — yatay yığılmış çubuk                                         */
/* -------------------------------------------------------------------------- */

export interface Segment {
  label: string;
  count: number;
  color: string;
  icon: LucideIcon;
}

export function StatusBar({ segments, emptyText }: { segments: Segment[]; emptyText: string }) {
  const total = segments.reduce((sum, item) => sum + item.count, 0);
  if (total === 0) return <Empty>{emptyText}</Empty>;

  const visible = segments.filter((item) => item.count > 0);

  return (
    <div>
      {/* Dilimler arası 2 px beyaz boşluk; uçlar 4 px yuvarlak. */}
      <div className="flex h-3 gap-[2px] overflow-hidden rounded-[4px]">
        {visible.map((item) => (
          <span
            key={item.label}
            title={`${item.label}: ${item.count}`}
            style={{ flexGrow: item.count, background: item.color }}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {segments.map((item) => (
          <li key={item.label} className="flex items-center gap-2.5 text-xs">
            <span className="size-2.5 shrink-0 rounded-[2px]" style={{ background: item.color }} />
            <item.icon className="size-3.5 shrink-0 text-zinc-500" aria-hidden="true" />
            <span className="flex-1 text-zinc-700">{item.label}</span>
            <span className="tabular-nums font-medium text-zinc-900">{item.count}</span>
            <span className="w-10 text-right tabular-nums text-zinc-400">
              {Math.round((item.count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sıralı çubuklar — büyükten küçüğe                                          */
/* -------------------------------------------------------------------------- */

export function RankBars({
  rows,
  emptyText,
  unit,
}: {
  rows: { label: string; value: number }[];
  emptyText: React.ReactNode;
  unit: string;
}) {
  const data = rows.filter((row) => row.value > 0).sort((a, b) => b.value - a.value);
  if (data.length === 0) return <Empty>{emptyText}</Empty>;

  const max = data[0].value;
  return (
    <ul className="flex flex-col gap-2.5">
      {data.map((row) => (
        <li key={row.label} className="grid grid-cols-[9rem_1fr_2rem] items-center gap-3 text-xs">
          <span className="truncate text-zinc-700" title={row.label}>
            {row.label}
          </span>
          <span className="h-2.5 overflow-hidden rounded-r-[4px]" style={{ background: TRACK }}>
            <span
              className="block h-full rounded-r-[4px]"
              style={{ width: `${(row.value / max) * 100}%`, background: SERIES }}
            />
          </span>
          <span className="text-right tabular-nums font-medium text-zinc-900">
            {row.value}
            <span className="sr-only"> {unit}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Ölçer — tek oran                                                           */
/* -------------------------------------------------------------------------- */

export function Meter({
  label,
  value,
  max,
  note,
  href,
}: {
  label: string;
  value: number;
  max: number;
  note: string;
  href: string;
}) {
  const ratio = max === 0 ? 0 : Math.min(1, value / max);
  return (
    <a href={href} className="group block rounded-lg p-2 -m-2 transition-colors hover:bg-zinc-50">
      <div className="flex items-baseline justify-between gap-3 text-xs">
        <span className="font-medium text-zinc-800">{label}</span>
        <span className="tabular-nums text-zinc-500">
          <strong className="font-semibold text-zinc-900">{value}</strong> / {max}
        </span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className="mt-2 h-2 overflow-hidden rounded-full"
        style={{ background: TRACK }}
      >
        <span
          className="block h-full rounded-full"
          style={{ width: `${ratio * 100}%`, background: SERIES }}
        />
      </div>
      <p className="mt-1.5 text-[11px] text-zinc-500">{note}</p>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/* Tablo görünümü                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Grafiğin arkasındaki sayılar. Üzerine gelme ipucu tek erişim yolu
 * olmasın diye her grafiğin altında katlanır bir tablo var.
 */
function DataTable({ caption, head, rows }: { caption: string; head: string[]; rows: string[][] }) {
  if (rows.length === 0) return null;
  return (
    <details className="group mt-3">
      <summary className="cursor-pointer text-[11px] text-zinc-500 transition-colors hover:text-zinc-900">
        Tablo olarak göster
      </summary>
      <table className="mt-2 w-full text-left text-xs">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-black/10 text-zinc-500">
            {head.map((cell) => (
              <th key={cell} scope="col" className="py-1.5 font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-b border-black/[0.04]">
              {row.map((cell, index) => (
                <td key={index} className={`py-1.5 ${index > 0 ? "tabular-nums" : ""}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
