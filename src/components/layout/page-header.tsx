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
 *  - `image` verilince: Teklif Al sayfasıyla aynı kurgu — fotoğraf
 *    yuvarlak köşeli bir kutunun zemini, başlık ve açıklama onun üstünde.
 *    Soldan sağa açılan koyu geçiş yazının okunmasını sağlıyor; fotoğraf
 *    sağ tarafta daha açık kaldığı için konusu yine seçiliyor. Butonlar
 *    koyu zemin üstünde duracağı için çağıran sayfa `tone="onDark"`
 *    vermeli.
 *  - `image` + `imageLayout="stacked"`: hizmet detay sayfaları, anasayfa
 *    hero'suyla aynı kurgu. Üstte tam genişlikte, karartmasız fotoğraf;
 *    altında solda başlık ve açıklama, sağda buton. Hiçbir şey fotoğrafın
 *    üstüne binmez. Buton açık zeminde durduğu için `tone="dark"`.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  lead,
  answer,
  image,
  imagePosition,
  imageLayout = "overlay",
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
  imageLayout?: "overlay" | "stacked";
  children?: React.ReactNode;
  className?: string;
}) {
  const overlay = Boolean(image) && imageLayout === "overlay";

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
      <p
        className={cn(
          "text-[0.9375rem] leading-relaxed",
          overlay ? "text-white/85" : "text-royal-fg/90",
        )}
      >
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

        {image && imageLayout === "stacked" ? (
          <>
            {/*
              Hizmet fotoğrafları geniş (2400×800, 3:1); kutu da md'den
              itibaren aynı oranda, kırpılmadan tam görünüyor. Kırpan bir
              kutuda tarayıcı kutu genişliğine göre küçük dosyayı indirip
              yarısını büyütüyordu — fotoğraf bulanık çıkıyordu. Mobilde
              16:9 kırpılıyor; `170vw` bu kırpmayı karşılıyor (3:1'in 16:9'luk
              kesiti genişliğin ~%59'u).
              Animasyonsuz: sayfanın en büyük görseli, hemen görünmeli.
            */}
            <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-3xl bg-royal-graphite shadow-xl outline outline-black/5 md:aspect-[3/1] lg:mt-8">
              <Image
                src={image}
                alt={title}
                fill
                quality={85}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1312px) 1248px, (min-width: 768px) calc(100vw - 64px), 170vw"
                style={{ objectPosition: imagePosition }}
                className="object-cover object-center"
              />
            </div>

            <div className="mt-8 flex flex-col gap-7 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="min-w-0 max-w-3xl">
                {eyebrowNode && <Reveal>{eyebrowNode}</Reveal>}
                <Reveal delay={0.05}>
                  <h1 className="font-display text-3xl leading-[1.12] text-royal-fg sm:text-4xl lg:text-[2.75rem]">
                    {title}
                  </h1>
                </Reveal>
                {lead && (
                  <Reveal delay={0.1}>
                    <p className="mt-4 text-base leading-relaxed text-royal-muted lg:text-lg">
                      {lead}
                    </p>
                  </Reveal>
                )}
                {answerNode && <Reveal delay={0.15}>{answerNode}</Reveal>}
              </div>
              {children && (
                <Reveal delay={0.15} className="shrink-0 lg:pb-1">
                  {children}
                </Reveal>
              )}
            </div>
          </>
        ) : image ? (
          <Reveal>
            <div className="relative mt-7 overflow-hidden rounded-3xl bg-royal-graphite lg:mt-8">
              <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(min-width: 1312px) 1248px, 100vw"
                style={{ objectPosition: imagePosition }}
                className="object-cover object-center"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35"
              />

              <div className="relative flex flex-col gap-8 px-6 py-12 sm:px-10 sm:py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-14 lg:px-14 lg:py-20">
                <div className="min-w-0 max-w-2xl">
                  {eyebrowNode}
                  <h1 className="mt-3 font-display text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]">
                    {title}
                  </h1>
                  {lead && (
                    <p className="mt-4 text-base leading-relaxed text-white/75 lg:text-lg">
                      {lead}
                    </p>
                  )}
                  {answerNode}
                </div>

                {children && <div className="shrink-0">{children}</div>}
              </div>
            </div>
          </Reveal>
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
