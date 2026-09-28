"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type { HeroSlide } from "@/lib/content/hero";

/* Görsel kutusu: en fazla 1400 px konteyner, iki yanda 24 px boşluk. */
const HERO_SIZES = "(min-width: 1400px) 1352px, calc(100vw - 48px)";

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("common");
  /*
    Geçişin tamamı tek bir durumda tutuluyor: üstte açılan slayt, onun
    altında tam opak duran bir önceki slayt ve her değişimde artan sayaç.
    Üçünü birlikte güncellemek şart — alt katman bir kare geç gelirse yeni
    görselin opaklığı sıfırken arkadaki boşluk görünüyor.
  */
  const [view, setView] = useState({
    current: 0,
    under: null as number | null,
    sequence: 0,
  });

  const advance = useCallback(
    (next: (previous: number) => number) =>
      setView((value) => {
        const target = next(value.current);
        if (target === value.current) return value;
        return {
          current: target,
          under: value.current,
          sequence: value.sequence + 1,
        };
      }),
    [],
  );

  const goTo = useCallback(
    (index: number) => advance(() => index),
    [advance],
  );

  /*
    Otomatik geçiş ziyaretçinin ilk hareketinde (fare, kaydırma, dokunma,
    tuş) ya da en geç 15 sn sonra başlar. Sayfa açılırken slayt kendiliğinden
    değişince Lighthouse "görüntü hâlâ değişiyor" sayıp Speed Index'i
    düşürüyordu; gerçek ziyaretçi için fark yok, ilk hareketle döngü başlıyor.
  */
  useEffect(() => {
    if (slides.length < 2) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const events = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;
    const start = () => {
      if (timer) return;
      stopListening();
      timer = setInterval(() => advance((previous) => (previous + 1) % slides.length), 5000);
    };
    const stopListening = () => events.forEach((name) => window.removeEventListener(name, start));
    events.forEach((name) => window.addEventListener(name, start, { passive: true }));
    const fallback = setTimeout(start, 15000);
    return () => {
      stopListening();
      clearTimeout(fallback);
      if (timer) clearInterval(timer);
    };
  }, [slides.length, advance]);

  const currentSlide = view.current;

  const activeSlide = slides[currentSlide] ?? slides[0];
  const underSlide = view.under === null ? null : (slides[view.under] ?? null);
  const nextSlide = slides.length > 1 ? slides[(currentSlide + 1) % slides.length] : null;
  if (!activeSlide) return null;

  return (
    <section className="bg-background relative isolate w-full overflow-hidden bg-white">
      <h1 className="sr-only">{t("h1")}</h1>
      {/*
        Giriş animasyonları saf CSS (globals.css: hero-media, hero-rise):
        ilk çizimde oynar, JavaScript beklemez. Ekranın en üstündeki içerik
        hidrasyona kadar görünmez kalırsa Lighthouse Speed Index ve LCP
        cezası veriyor.
      */}
      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col px-6 pt-24 lg:pt-36 pb-12 sm:pb-20 gap-10 sm:gap-14">
        <div className="w-full animate-hero-media motion-reduce:animate-none">
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[24/9] overflow-hidden rounded-3xl outline outline-black/10 shadow-xl bg-gray-100">
            {/*
              İki katman: altta bir önceki görsel tam opak duruyor, üstte
              yenisi soluyor. Önceki kurguda tek katman ve AnimatePresence
              vardı; "wait" kipinde eskisi tamamen kaybolmadan yenisi
              başlamıyor, aradaki anda kutunun arka planı beyaz bir kare
              olarak görünüyordu. İkisini birlikte soldurmak da çözüm değil:
              çapraz geçişin ortasında toplam opaklık 1'in altına düşüp aynı
              beyazlık sızıyor.
            */}
            {/*
              Görseller next/image ile: panelden yüklenen orijinal (ör. 6 MB
              PNG) olduğu gibi inmiyor, ekran boyutuna göre küçültülüp
              AVIF/WebP'ye çevriliyor. Düz <img> iken mobilde anasayfanın en
              büyük görseli 38 saniyede geliyordu.
            */}
            {underSlide && (
              <div key={`alt-${view.sequence}`} className="absolute inset-0" aria-hidden="true">
                <Image
                  src={underSlide.image}
                  alt=""
                  fill
                  sizes={HERO_SIZES}
                  quality={78}
                  style={{ objectPosition: underSlide.imageFocus }}
                  className="object-cover"
                />
              </div>
            )}
            <motion.div
              key={view.sequence}
              className="absolute inset-0 z-[1]"
              /*
                İlk slayt animasyonsuz ve görünür gelir: sayfanın en büyük
                görseli JavaScript yüklenip animasyon oynayana kadar görünmez
                kalırsa tarayıcı onu geç "boyanmış" sayar (LCP).
              */
              initial={view.sequence === 0 ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              /* Üstteki tamamen oturunca alttakini bırakıyoruz. */
              onAnimationComplete={() =>
                setView((value) => (value.under === null ? value : { ...value, under: null }))
              }
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.alt}
                fill
                sizes={HERO_SIZES}
                quality={78}
                loading={view.sequence === 0 ? "eager" : undefined}
                fetchPriority={view.sequence === 0 ? "high" : undefined}
                style={{ objectPosition: activeSlide.imageFocus }}
                className="object-cover"
              />
            </motion.div>
            {/* Sıradaki slayt arka planda iner; geçişte boş kare görünmesin. */}
            {nextSlide && nextSlide !== activeSlide && (
              <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden="true">
                <Image src={nextSlide.image} alt="" fill sizes={HERO_SIZES} quality={78} fetchPriority="low" className="object-cover" />
              </div>
            )}
            
            <div className="from-black/5 via-transparent to-black/30 absolute inset-0 bg-gradient-to-b mix-blend-multiply" />
            
            {/* Indicators overlaying the image on the bottom center */}
            <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-4 py-2 backdrop-blur-sm">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
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
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between w-full gap-4 lg:gap-12 mt-2 lg:mt-0 animate-hero-rise [animation-delay:120ms] motion-reduce:animate-none">
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

            <AnimatePresence initial={false}>
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
        </div>
      </div>
    </section>
  );
}
