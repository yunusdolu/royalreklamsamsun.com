import { getFormatter } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { legalUpdated, type LegalCopy } from "@/content/legal";

/**
 * Kurumsal metinlerin (garanti, gizlilik, çerez, KVKK) ortak gövdesi.
 * Numaralı bölümler + ince çizgi ayraçlar; okunabilirlik için ölçü kolonu
 * dar tutulur.
 */
export async function LegalBody({
  copy,
  updatedLabel,
}: {
  copy: LegalCopy;
  updatedLabel: string;
}) {
  const format = await getFormatter();

  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
          {updatedLabel}:{" "}
          <time dateTime={legalUpdated} className="text-royal-muted">
            {format.dateTime(new Date(legalUpdated), "long")}
          </time>
        </p>
      </Reveal>

      <div className="mt-10 space-y-12">
        {copy.sections.map((section, index) => (
          <Reveal key={section.heading} delay={index * 0.03}>
            <section className="border-t border-black/[0.08] pt-8">
              <span className="font-display text-[0.6875rem] font-bold tabular-nums text-gold-600">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2 className="mt-3 font-display text-xl font-bold text-royal-fg">
                {section.heading}
              </h2>

              {section.paragraphs && (
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-[0.9375rem] leading-[1.75] text-royal-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.items && (
                <ul className="mt-4">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-black/[0.06] py-3 last:border-0"
                    >
                      <span
                        className="mt-2.5 h-px w-3.5 shrink-0 bg-gold-600"
                        aria-hidden="true"
                      />
                      <span className="text-[0.9375rem] leading-relaxed text-royal-muted">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
