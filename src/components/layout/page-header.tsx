import Image from "next/image";

import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * İç sayfaların ortak başlık bloğu.
 *
 * `answer` alanı GEO içindir: dil modellerinin doğrudan alıntılayabileceği,
 * kendi başına anlamlı bir tanım cümlesidir. `data-speakable` ile de sesli
 * asistanlara işaret edilir.
 *
 * İki düzen var:
 *  - `image` verilmeden: klasik dar başlık bloğu. Sitedeki 14 sayfa bunu
 *    kullanıyor, davranışı değişmedi.
 *  - `image` verilince: anasayfa kahramanıyla aynı kurgu — üstte geniş
 *    fotoğraf, altında solda başlık ve kısa açıklama, sağda butonlar.
 *    Fotoğraf bilinçli olarak anasayfadakinden daha alçak (3/1 karşısında
 *    24/9); iç sayfada ekranı tümüyle kaplaması istenmiyor.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  answer,
  image,
  imagePosition,
  children,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  answer?: string;
  image?: string;
  imagePosition?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const eyebrowNode = eyebrow ? (
    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-500">
      {eyebrow}
    </p>
  ) : null;

  const answerNode = answer ? (
    <div
      data-speakable
      className="mt-6 max-w-3xl border-l-2 border-gold-500/60 bg-white/[0.02] py-4 pl-5 pr-4"
    >
      <p className="text-[0.9375rem] leading-relaxed text-royal-fg/90">
        {answer}
      </p>
    </div>
  ) : null;

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
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(212,175,55,0.14)_0%,transparent_75%)]"
      />

      <div className="container-royal relative pt-28 pb-12 lg:pt-40 lg:pb-16">
        <Breadcrumbs items={crumbs} />

        {image ? (
          <>
            <Reveal>
              <div className="relative mt-7 aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-royal-graphite shadow-[0_18px_44px_-24px_rgba(0,0,0,0.45)] sm:aspect-[2/1] lg:mt-8 lg:aspect-[3/1]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  priority
                  sizes="(min-width: 1312px) 1248px, 100vw"
                  style={{ objectPosition: imagePosition }}
                  className="object-cover object-center"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-col gap-7 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
                <div className="min-w-0 max-w-2xl">
                  {eyebrowNode}
                  <h1 className="mt-3 font-display text-3xl leading-[1.12] text-royal-fg sm:text-4xl lg:text-[2.75rem]">
                    {title}
                  </h1>
                  {lead && (
                    <p className="mt-4 text-base leading-relaxed text-royal-muted lg:text-lg">
                      {lead}
                    </p>
                  )}
                  {answerNode}
                </div>

                {children && <div className="shrink-0">{children}</div>}
              </div>
            </Reveal>
          </>
        ) : (
          <div className="mt-7 max-w-3xl">
            {eyebrowNode && <Reveal>{eyebrowNode}</Reveal>}

            <Reveal delay={0.05}>
              <h1 className="mt-3 font-display text-3xl leading-[1.12] text-royal-fg sm:text-4xl lg:text-[2.75rem]">
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

            {answerNode && <Reveal delay={0.15}>{answerNode}</Reveal>}

            {children}
          </div>
        )}
      </div>
    </section>
  );
}
