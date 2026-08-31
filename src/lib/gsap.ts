"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * GSAP eklentileri tek yerden kaydedilir.
 *
 * GSAP 3.13'ten itibaren SplitText, DrawSVG gibi eski "Club" eklentileri
 * ücretsizdir; ayrı lisans gerektirmez.
 *
 * Kayıt yalnızca tarayıcıda yapılır — sunucuda `window` olmadığı için
 * ScrollTrigger hata verir.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);
}

/** Kullanıcı hareket azaltma tercihi belirtmişse animasyonlar atlanır. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Proje genelinde tutarlı yumuşama eğrileri. */
export const royalEase = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export { DrawSVGPlugin, gsap, ScrollTrigger, SplitText, useGSAP };
