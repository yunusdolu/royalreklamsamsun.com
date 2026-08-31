"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis yumuşak kaydırma + GSAP ScrollTrigger senkronizasyonu.
 *
 * Kritik nokta: Lenis kendi RAF döngüsünü çalıştırırsa ScrollTrigger ile
 * senkron kaybolur ve pinned bölümler titrer. Bu yüzden Lenis'i GSAP'in
 * ticker'ına bağlıyor, `lagSmoothing(0)` ile sekme geri geldiğinde oluşan
 * sıçramayı engelliyoruz.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hareket azaltma tercihinde yumuşak kaydırma devre dışı kalır.
    if (prefersReducedMotion()) return;

    /**
     * Dokunmatik cihazlarda Lenis çalıştırılmaz. Native kaydırma hem daha
     * akıcı hem de sürekli çalışan bir rAF döngüsü kurmadığı için pil
     * tüketimi belirgin şekilde düşük olur. Bu, mobil öncelikli bir sitede
     * bilinçli bir tercihtir.
     */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Dokunmatik cihazlarda native kaydırma daha akıcı ve pil dostudur.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
