import { cn } from "@/lib/utils";

/** Dört köşeli yıldız — ifadelerin arasındaki altın ayraç. */
function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0c.9 6.6 4.4 10.4 12 12-7.6 1.6-11.1 5.4-12 12-.9-6.6-4.4-10.4-12-12C7.6 10.4 11.1 6.6 12 0Z" />
    </svg>
  );
}

/**
 * Kayan şerit: siyah bant, beyaz iri yazı, aralarda altın yıldız.
 *
 * Yalnızca görünüm; hem anasayfadaki bölüm hem paneldeki önizleme bunu
 * kullanıyor. İki özdeş ray yan yana duruyor ve ikisi birlikte bir ray boyu
 * sola kayıyor (globals.css `scroll-horizontal`, aradaki 2rem boşlukla) —
 * döngünün başı ile sonu aynı görüntü olduğu için ek yeri görünmüyor.
 * Üstüne gelince durur; "hareketi azalt" tercihinde hiç kaymaz.
 */
export function MarqueeBand({
  items,
  label,
  className,
}: {
  items: string[];
  /** Ekran okuyucular için bölüm adı. */
  label?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  /* Az ifade girildiyse ray geniş ekranı doldurmaz; dolana kadar çoğalt. */
  const track: string[] = [];
  while (track.length < 8) track.push(...items);
  /* Süre yazının uzunluğuyla orantılı: kısa ya da uzun şeritte hız aynı kalır. */
  const duration = Math.max(24, Math.round(track.join("").length * 0.32));

  return (
    <section
      aria-label={label}
      className={cn("group relative overflow-hidden bg-[#0a0a0a] py-4 sm:py-5", className)}
    >
      {/* Üstte ve altta ince altın çizgi */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="flex gap-8">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            style={{ "--scroll-duration": `${duration}s` } as React.CSSProperties}
            className="flex shrink-0 animate-scroll-horizontal items-center gap-8 group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
          >
            {track.map((text, index) => (
              <li
                key={index}
                /* Çoğaltılan tekrarlar ekran okuyucuya ikinci kez okunmasın. */
                aria-hidden={index >= items.length}
                className="flex items-center gap-8 whitespace-nowrap font-display text-base font-bold uppercase tracking-[0.06em] text-white sm:text-xl lg:text-2xl"
              >
                {text}
                <Spark className="size-3.5 shrink-0 text-gold-400 sm:size-4" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
