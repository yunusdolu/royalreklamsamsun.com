"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Görünür olduğunda hedefe kadar sayan rakam.
 * `tabular-nums` ile sayarken genişlik değişmez, satır zıplamaz.
 *
 * Önceden GSAP + ScrollTrigger ile yapılıyordu; anasayfada GSAP'i kullanan
 * tek bileşen buydu ve yalnızca bu sayaç için ~120 KB betik ile sayfa
 * açılışında ağır bir yerleşim hesabı yükleniyordu. Aynı davranış tarayıcının
 * kendi araçlarıyla: görünür olunca (IntersectionObserver) bir kez, "power2.out"
 * eğrisiyle sayar.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
  locale = "tr-TR",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const format = (n: number) =>
      `${prefix}${Math.round(n).toLocaleString(locale)}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = format(value);
      return;
    }

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / (duration * 1000));
        const eased = 1 - (1 - k) * (1 - k); // power2.out
        node.textContent = format(value * eased);
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    /* "top 90%": öğe ekranın alt %10'unun üstüne girince başlar. */
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, prefix, suffix, duration, locale]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0{suffix}
    </span>
  );
}
