"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { ServiceVariants } from "@/components/sections/service-variants";
import { PillAnchor } from "@/components/ui/pill-button";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import type { ServiceCopy, ServiceVariant } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Hizmet sayfasının çeşitler + ayrıntı bölümü.
 *
 * Eskiden çeşitler listesi ile altındaki bilgi (öne çıkanlar, teknik tablo,
 * kimler için uygun) birbirinden habersizdi: "Krom Harf" açıkken aşağıda
 * kutu harfin genel tablosu duruyordu. Artık ikisi tek seçimi paylaşıyor;
 * listede bir çeşit açılınca ya da aşağıdaki çiplerden biri seçilince bütün
 * ayrıntılar o çeşide göre değişiyor.
 *
 * Çeşide özel bilgisi olmayan bir alan varsa hizmetin genel bilgisi
 * kullanılıyor, yani bölüm hiçbir zaman boş kalmaz.
 *
 * Hizmetin genel metni (tanım, giriş paragrafları, fiyat etkenleri) çeşitten
 * bağımsız olduğu için ayrıntıların altında sabit duruyor.
 */
export function ServiceExplorer({
  copy,
  variants,
  fallbackImage,
  leadTimeDays,
}: {
  copy: Pick<
    ServiceCopy,
    "name" | "shortName" | "answer" | "intro" | "highlights" | "specs" | "priceFactors" | "useCases"
  >;
  variants: ServiceVariant[];
  fallbackImage?: string;
  leadTimeDays: [number, number];
}) {
  const t = useTranslations("common");
  const prefersReduced = useReducedMotion();

  /* Açık satır (liste kapatılabilir) ve ayrıntıların gösterdiği çeşit ayrı:
     listede hepsi kapatılınca aşağısı son seçilen çeşitte kalıyor. */
  const [openIndex, setOpenIndex] = useState(0);
  const [selected, setSelected] = useState(0);

  const choose = (index: number) => {
    setSelected(index);
    /* Açık satır aynı yükseklikte bir başkasıyla yer değiştirdiği için
       sayfa kaymıyor. */
    setOpenIndex(index);
  };

  const variant = variants[selected];
  const pros = variant?.pros?.length ? variant.pros : null;
  const specs = variant?.specs?.length ? variant.specs : copy.specs;
  const bestFor = variant?.bestFor?.length ? variant.bestFor : copy.useCases;

  const whatsappMessage = variant
    ? t("variantWhatsappPrefill", { service: copy.name, variant: variant.name })
    : undefined;

  const fade = prefersReduced
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <>
      <ServiceVariants
        title={t("variantsTitle", { service: copy.shortName })}
        variants={variants}
        fallbackImage={fallbackImage}
        openIndex={openIndex}
        onOpenChange={(index) => {
          setOpenIndex(index);
          if (index >= 0) setSelected(index);
        }}
      />

      <section className="container-royal grid gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        {/* `min-w-0`: grid öğesi içindeki geniş tablo kolonu şişirmesin. */}
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          {variants.length > 1 && (
            <div>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                {t("selectedVariant")}
              </p>
              {/* Mobilde tek satır kayar, masaüstünde sarar. */}
              <div
                role="group"
                aria-label={t("chooseVariant")}
                className="hide-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
              >
                {variants.map((item, index) => {
                  const active = index === selected;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      aria-pressed={active}
                      onClick={() => choose(index)}
                      className={cn(
                        "shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition-all duration-300",
                        active
                          ? "bg-black text-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.9)]"
                          : "border border-black/[0.09] text-royal-muted hover:border-black/25 hover:text-royal-fg",
                      )}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={selected} {...fade} aria-live="polite">
              {variant && (
                <h2 className="mt-8 font-display text-2xl font-bold text-royal-fg lg:text-[1.75rem]">
                  {variant.name}
                </h2>
              )}

              {/* Öne çıkanlar — çeşidin artıları; yoksa hizmetin genel başlıkları */}
              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-royal-fg lg:text-xl">
                  {t("highlightsTitle")}
                </h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {(pros ?? copy.highlights.map((item) => item.title)).map((text, index) => (
                    <li
                      key={text}
                      className="group relative overflow-hidden rounded-2xl bg-royal-graphite/70 p-5 transition-colors duration-500 hover:bg-royal-graphite"
                    >
                      <span
                        className="pointer-events-none absolute -top-4 right-1 font-display text-[4rem] font-black leading-none text-black/[0.045] transition-colors duration-500 group-hover:text-gold-600/20"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="relative block h-px w-8 bg-gold-600/70 transition-all duration-500 group-hover:w-14"
                        aria-hidden="true"
                      />
                      <p className="relative mt-4 text-[0.875rem] font-medium leading-relaxed text-royal-fg">
                        {text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Teknik özellikler — LLM'lerin alıntılaması için gerçek tablo.
                  Dar ekranda satırlar bloka dönüp etiket/değer alt alta gelir. */}
              <div className="mt-12">
                <h3 className="font-display text-lg font-bold text-royal-fg lg:text-xl">
                  {t("specsTitle")}
                </h3>
                <div className="mt-6 rounded-2xl border border-black/[0.06] bg-royal-graphite/60 px-5 py-1 sm:px-6 sm:py-2">
                  <table className="w-full border-collapse text-left text-[0.875rem]">
                    {variant && <caption className="sr-only">{variant.name}</caption>}
                    <tbody>
                      {specs.map((spec) => (
                        <tr
                          key={spec.label}
                          className="block border-b border-black/[0.07] py-3.5 last:border-0 sm:table-row sm:py-0"
                        >
                          <th
                            scope="row"
                            className="block pb-1 align-top text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-royal-faint sm:table-cell sm:w-2/5 sm:py-4 sm:pr-6 sm:pb-4"
                          >
                            {spec.label}
                          </th>
                          <td className="block align-top font-medium text-royal-fg sm:table-cell sm:py-4">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {variant?.watch && (
                <div className="mt-8 border-l-2 border-gold-500 py-1 pl-5">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-600">
                    {t("beforeYouDecide")}
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-royal-fg/85">
                    {variant.watch}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Hizmetin genel tanımı — çeşitten bağımsız. Dil modellerinin
              alıntıladığı metin bu; `data-speakable` korunuyor. */}
          <Reveal>
            <div className="mt-16 border-t border-black/[0.07] pt-12">
              <h2 className="font-display text-xl font-bold text-royal-fg lg:text-2xl">
                {t("aboutService", { service: copy.name })}
              </h2>
              <p
                data-speakable
                className="mt-6 border-l-2 border-gold-500/60 py-1 pl-5 text-base leading-relaxed text-royal-fg/90 lg:text-lg"
              >
                {copy.answer}
              </p>
              <div className="mt-8 space-y-5">
                {copy.intro.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[0.9375rem] leading-[1.75] text-royal-muted lg:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-14">
            <h2 className="font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("priceTitle")}
            </h2>
            <ul className="mt-8">
              {copy.priceFactors.map((factor, index) => (
                <li
                  key={factor}
                  className="flex gap-5 border-b border-black/[0.06] py-3.5 last:border-0"
                >
                  <span
                    className="shrink-0 pt-0.5 font-display text-[0.75rem] font-bold tabular-nums text-gold-600"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-royal-muted">
                    {factor}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Yan panel — seçili çeşide göre değişir */}
        <aside className="min-w-0 lg:col-span-5 xl:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                {t("useCasesTitle")}
              </h2>
              {variant && (
                <p className="mt-1.5 font-display text-[0.9375rem] font-bold text-royal-fg">
                  {variant.name}
                </p>
              )}
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={selected}
                  {...fade}
                  className="mt-4 divide-y divide-black/[0.06]"
                >
                  {bestFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3.5 py-2.5 text-[0.875rem] leading-snug text-royal-fg"
                    >
                      <span
                        className="h-px w-3.5 shrink-0 translate-y-[-0.3rem] bg-gold-600"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* Teklif kutusu — çeşitler bölümüyle aynı düz koyu zemin */}
            <div className="overflow-hidden rounded-2xl bg-[#121214] p-6">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                {t("leadTime")}: {leadTimeDays[0]}–{leadTimeDays[1]} {t("days")}
              </span>
              <h2 className="mt-3 font-display text-lg font-bold text-white">
                {t("quoteCtaTitle")}
              </h2>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-white/60">
                {t("quoteCtaText")}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <PillAnchor href={telLink} external={false} tone="onDark" icon={Phone} block>
                  {siteConfig.contact.phoneDisplay}
                </PillAnchor>
                <a
                  href={whatsappLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 text-[0.8125rem] font-semibold text-white/70 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 text-[#25d366]" aria-hidden="true" />
                  {t("whatsapp")}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
