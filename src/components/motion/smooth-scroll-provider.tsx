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

  /**
   * Zaten bulunulan sayfanın bağlantısına basmak.
   *
   * Next.js aynı rotaya gidildiğinde hiçbir şey yapmaz; sayfa bulunduğu
   * kaydırma konumunda kalır. Menüden "Referanslar"a basan biri ise sayfanın
   * başına dönmeyi bekler. Bu dinleyici yalnızca o durumu yakalar — farklı
   * bir sayfaya geçişte Next zaten en üste alır, ankraj (#) bağlantılarına
   * ve dış bağlantılara dokunulmaz.
   *
   * Lenis etkinken `window.scrollTo` yeterli olmaz; Lenis kendi hedefini
   * geri yazar. Bu yüzden varsa Lenis üzerinden kaydırılır.
   */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      // Dış bağlantı, ankraj ya da başka bir sayfa → dokunma
      if (url.origin !== window.location.origin) return;
      if (url.hash) return;
      if (url.pathname !== window.location.pathname) return;

      if (activeLenis) {
        activeLenis.scrollTo(0);
      } else {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
    };

    /*
     * Yakalama aşamasında dinlenir: Next'in Link bileşeni tıklamada
     * preventDefault çağırıp yönlendirmeyi kendisi yaptığı için, kabarma
     * aşamasında olay bize "iptal edilmiş" olarak ulaşır ve kaçırırdık.
     */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return <>{children}</>;
}
