import { cn } from "@/lib/utils";

/**
 * `GlowCardGrid` (21st.dev) içindeki kartlara eklenen iki katman.
 *
 * Grid, imleç konumunu her karta `--pointer-x` / `--pointer-y` CSS
 * değişkenleri olarak yazar. Buradaki katmanlar o değerleri kullanarak:
 *  1. Kartın içinde imleci takip eden yumuşak bir altın parıltı,
 *  2. Kenarlıkta backdrop filtre ile ışıyan bir çerçeve üretir.
 *
 * Kenarlık katmanı `mask-composite: exclude` ile yalnızca border alanında
 * görünür — bu, kataloğun orijinal tekniğidir ve markaya uyarlanmıştır.
 */

export function GlowBloom({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-(--card-radius)",
        className,
      )}
    >
      <span
        className={cn(
          "absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full",
          "translate-x-[calc(var(--pointer-x,0)*8rem)] translate-y-[calc(var(--pointer-y,0)*6rem)]",
          "bg-[radial-gradient(circle,rgba(212,175,55,0.55)_0%,rgba(212,175,55,0)_70%)]",
          "opacity-0 blur-2xl transition-opacity duration-500 will-change-transform",
          "group-hover:opacity-100",
        )}
      />
    </span>
  );
}

export function GlowBorder() {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 translate-z-0 rounded-(--card-radius)",
        "border-(length:--card-border-width) border-solid border-transparent",
        "backdrop-blur-(--card-border-blur) backdrop-brightness-(--card-border-brightness)",
        "backdrop-contrast-(--card-border-contrast) backdrop-saturate-(--card-border-saturate)",
        "opacity-0 transition-opacity duration-500 group-hover:opacity-100",
        "[clip-path:inset(0_round_var(--card-radius))]",
      )}
      style={
        {
          maskImage: "linear-gradient(#fff 0 100%), linear-gradient(#fff 0 100%)",
          maskOrigin: "border-box, padding-box",
          maskClip: "border-box, padding-box",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        } as React.CSSProperties
      }
    />
  );
}
