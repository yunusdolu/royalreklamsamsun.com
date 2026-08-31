import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * İç sayfaların ortak başlık bloğu.
 *
 * `answer` alanı GEO içindir: sayfanın ilk paragrafı, dil modellerinin
 * doğrudan alıntılayabileceği, kendi başına anlamlı bir tanım cümlesidir.
 * `data-speakable` ile de sesli asistanlara işaret edilir.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  answer,
  children,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  answer?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-white/5 bg-royal-carbon",
        className,
      )}
    >
      {/* Üstten inen ince altın hale */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(212,175,55,0.12)_0%,transparent_72%)]"
      />

      <div className="container-royal relative py-12 lg:py-16">
        <Breadcrumbs items={crumbs} />

        <div className="mt-7 max-w-3xl">
          {eyebrow && (
            <Reveal>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-500">
                {eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <h1 className="mt-3 font-display text-3xl leading-[1.12] text-royal-fg sm:text-4xl lg:text-[3rem]">
              {title}
            </h1>
          </Reveal>

          {lead && (
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-royal-muted lg:text-lg">
                {lead}
              </p>
            </Reveal>
          )}
        </div>

        {answer && (
          <Reveal delay={0.15}>
            <div
              data-speakable
              className="mt-8 max-w-3xl border-l-2 border-gold-500/60 bg-white/[0.02] py-4 pl-5 pr-4"
            >
              <p className="text-[0.9375rem] leading-relaxed text-royal-fg/90">
                {answer}
              </p>
            </div>
          </Reveal>
        )}

        {children}
      </div>
    </section>
  );
}
