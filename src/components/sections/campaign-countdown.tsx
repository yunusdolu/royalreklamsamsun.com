"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Units = { days: string; hours: string; minutes: string; seconds: string };

/**
 * Kampanya bitişine canlı geri sayım: gün · saat · dakika · saniye.
 *
 * Sayfalar statik üretiliyor; sunucuda hesaplanan süre sayfa önbellekte
 * durdukça eskir. Bu yüzden sayı yalnızca tarayıcıda hesaplanıyor — ilk
 * çizimde kutular "––" gösterir (yerleşim kaymasın diye aynı genişlikte),
 * hidrasyondan sonra saniyede bir güncellenir. Süre dolunca bileşen
 * kendini gizler; kampanya zaten bir sonraki yenilemede listeden düşer.
 */
export function CampaignCountdown({
  endsAt,
  units,
  label,
  tone = "light",
  size = "md",
  className,
}: {
  endsAt: string;
  units: Units;
  /** Kutuların üstündeki küçük başlık — "Bitmesine kalan" */
  label?: string;
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  const end = new Date(endsAt).getTime();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  if (left === 0) return null;

  const parts =
    left === null
      ? null
      : [
          Math.floor(left / 86_400_000),
          Math.floor(left / 3_600_000) % 24,
          Math.floor(left / 60_000) % 60,
          Math.floor(left / 1000) % 60,
        ];
  const names = [units.days, units.hours, units.minutes, units.seconds];

  return (
    <div className={className}>
      {label && (
        <p
          className={cn(
            "mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em]",
            tone === "dark" ? "text-white/50" : "text-royal-faint",
          )}
        >
          {label}
        </p>
      )}
      <div className="flex gap-2" role="timer" aria-live="off">
        {names.map((name, i) => (
          <div
            key={name}
            className={cn(
              "flex flex-col items-center rounded-xl",
              size === "sm" ? "min-w-[3.25rem] px-2 py-1.5" : "min-w-[4rem] px-2.5 py-2.5",
              tone === "dark" ? "bg-white/[0.08] text-white" : "bg-zinc-100 text-royal-fg",
            )}
          >
            <span
              className={cn(
                "font-display font-extrabold leading-none tabular-nums",
                size === "sm" ? "text-lg" : "text-2xl",
              )}
            >
              {parts ? String(parts[i]).padStart(2, "0") : "––"}
            </span>
            <span
              className={cn(
                "mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em]",
                tone === "dark" ? "text-white/55" : "text-royal-muted",
              )}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
