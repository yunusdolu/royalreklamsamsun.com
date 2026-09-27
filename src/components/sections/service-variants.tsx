"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";

import type { ServiceVariant } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Hizmetin alt türleri — başlığa basınca açılan sade liste.
 *
 * Bilinçli olarak yalın: kutu yok, çerçeve yok, köşe yuvarlatma yok,
 * başlık altı süs çizgisi yok. Satırları ince çizgiler ayırıyor. Açılan
 * satırda yalnızca üç şey var: fotoğraf, açıklama, başlık.
 *
 * Kapalı satırların açıklaması DOM'dan silinmez, yalnızca gizlenir —
 * arama motorları hepsini görsün diye.
 */
export function ServiceVariants({
  title,
  variants,
  fallbackImage,
}: {
  title: string;
  variants: ServiceVariant[];
  fallbackImage?: string;
}) {
  const t = useTranslations("common");
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-[#121214] py-16 lg:py-20">
      <div className="container-royal">
        <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>

        <ul className="mt-8 border-t border-white/10 lg:mt-10">
          {variants.map((variant, index) => {
            const isOpen = index === openIndex;
            const panelId = `${baseId}-${index}`;
            const image = variant.image || fallbackImage;

            return (
              <li key={variant.name} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "min-w-0 font-display text-[1.0625rem] font-semibold transition-colors duration-200 sm:text-lg",
                        isOpen
                          ? "text-gold-400"
                          : "text-white hover:text-white/70",
                      )}
                    >
                      {variant.name}
                    </span>
                    {isOpen ? (
                      <Minus
                        aria-hidden="true"
                        className="size-5 shrink-0 text-gold-400"
                      />
                    ) : (
                      <Plus
                        aria-hidden="true"
                        className="size-5 shrink-0 text-white/40"
                      />
                    )}
                  </button>
                </h3>

                {/*
                  Yükseklik animasyonu için içerik DOM'dan silinmez, yalnızca
                  kapatılır — arama motorları bütün açıklamaları görmeye devam
                  eder. `overflow-hidden` kapanırken içeriğin taşmasını önler.
                */}
                <motion.div
                  id={panelId}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                          opacity: {
                            duration: isOpen ? 0.32 : 0.16,
                            delay: isOpen ? 0.08 : 0,
                          },
                        }
                  }
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pb-8 lg:grid-cols-2 lg:items-start lg:gap-10">
                    <div className="relative aspect-[16/10] w-full bg-black/40">
                      {image ? (
                        <Image
                          src={image}
                          alt={variant.name}
                          fill
                          sizes="(min-width: 1024px) 560px, 92vw"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-[0.8125rem] text-white/30">
                          {t("variantsImageLoading")}
                        </span>
                      )}
                    </div>

                    <p className="text-[0.9375rem] leading-relaxed text-white/70 lg:pt-1">
                      {variant.description}
                    </p>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
