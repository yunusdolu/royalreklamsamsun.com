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
/**
 * Etkin Lenis örneği. Lenis kaydırma sınırını (`scrollHeight - innerHeight`)
 * önbelleğe alır; sayfaya sonradan içerik eklendiğinde bu sınır eski kalır,
 * hedef konum eski sınıra kırpılır ve kullanıcı aşağı inemeyip yukarı geri
 * çekilir. İçeriği büyüten bileşenler `refreshScroll()` çağırır.
 */
let activeLenis: Lenis | null = null;

/** Sayfa yüksekliğini değiştiren bileşenler bunu çağırmalı. */
export function refreshScroll() {
  activeLenis?.resize();
  ScrollTrigger.refresh();
}

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

    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /**
     * Lenis'in kendi gözlemcisi `document.documentElement` üzerinde ve
     * 250 ms geciktirmeli çalışır; bu aralıkta kaydırma eski sınıra takılır.
     * Gövde yüksekliğini gecikmesiz izleyip sınırı anında tazeliyoruz.
     */
    const bodyObserver = new ResizeObserver(() => lenis.resize());
    bodyObserver.observe(document.body);

    return () => {
      bodyObserver.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);

  return <>{children}</>;
}
