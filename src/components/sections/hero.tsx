"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { Link } from "@/i18n/navigation";

/** Slayt görselleri; başlık ve açıklamalar çeviri dosyasından gelir. */
const slideImages = [
  "/images/hero/hero1.jpeg",
  "/images/hero/hero2.jpeg",
  "/images/hero/hero3.jpeg",
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const mediaItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}>) {
  if (!active) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slides = slideImages.map((image, index) => ({
    image,
    title: t(`slides.${index + 1}.title`),
    titleLine2: t(`slides.${index + 1}.titleLine2`),
    description: t(`slides.${index + 1}.description`),
    alt: t(`slides.${index + 1}.alt`),
  }));
  const activeSlide = slides[currentSlide];

  return (
    <section className="bg-background relative isolate w-full overflow-hidden bg-white">
      <h1 className="sr-only">{t("h1")}</h1>
      <motion.div
        className="relative z-10 mx-auto flex max-w-[1400px] flex-col px-6 pt-24 lg:pt-36 pb-12 sm:pb-20 gap-10 sm:gap-14"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Reveal active={true} variants={mediaItem} className="w-full">
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[24/9] overflow-hidden rounded-3xl outline outline-black/10 shadow-xl bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={activeSlide.image}
                alt={activeSlide.alt}
                className="absolute inset-0 size-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
            
            <div className="from-black/5 via-transparent to-black/30 absolute inset-0 bg-gradient-to-b mix-blend-multiply" />
            
            {/* Indicators overlaying the image on the bottom center */}
            <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={tCommon("slide", { number: index + 1 })}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          active={true}
          className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-4 lg:gap-12 mt-2 lg:mt-0"
        >
          <div className="flex-1 max-w-3xl relative grid">
            {/* 
              Gizli (Ghost) Elemanlar: 
              Tüm slaytların metinlerini görünmez bir şekilde buraya koyuyoruz.
              Bu sayede grid'in yüksekliği her zaman en uzun metne göre sabitleniyor 
              ve metinler değişirken aşağıdaki buton/istatistik kısımları yukarı-aşağı zıplamıyor.
            */}
            {slides.map((slide, i) => (
              <div key={`ghost-${i}`} className="col-start-1 row-start-1 invisible flex flex-col gap-4 pointer-events-none" aria-hidden="true">
                <div className="text-foreground font-display font-bold tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl text-gray-900">
                  {slide.title}
                  {slide.titleLine2 && (
                    <>
                      {" "}
                      {slide.titleLine2}
                    </>
                  )}
                </div>
                <p className="text-muted-foreground max-w-xl text-base sm:text-lg text-gray-600 text-balance">
                  {slide.description}
                </p>
              </div>
            ))}

            <AnimatePresence>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
                className="col-start-1 row-start-1 flex flex-col gap-4"
              >
                <div className="text-foreground font-display font-bold tracking-tight text-balance text-4xl sm:text-5xl md:text-6xl text-gray-900">
                  {activeSlide.title}
                  {activeSlide.titleLine2 && (
                    <>
                      {" "}
                      {activeSlide.titleLine2}
                    </>
                  )}
                </div>
                <p className="text-muted-foreground max-w-xl text-base sm:text-lg text-gray-600 text-balance">
                  {activeSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="shrink-0 pb-4 lg:pb-6">
            <Link
              href="/teklif-al"
              className="group flex w-fit cursor-pointer items-center justify-center gap-0 rounded-full bg-transparent px-0 py-2 transition-transform duration-300 hover:scale-105"
            >
              <span className="rounded-full bg-black px-8 py-3.5 font-semibold text-white transition-colors duration-500 ease-in-out group-hover:bg-gray-900">
                {t("primaryCta")}
              </span>
              <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-gold-500 p-3.5 text-black transition-colors duration-500 ease-in-out hover:bg-gold-400">
                <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
              </div>
            </Link>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
