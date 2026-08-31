"use client";

import { useRef } from "react";

import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Görünür olduğunda hedefe kadar sayan rakam (GSAP).
 * `tabular-nums` ile sayarken genişlik değişmez, satır zıplamaz.
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

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      const format = (n: number) =>
        `${prefix}${Math.round(n).toLocaleString(locale)}${suffix}`;

      if (prefersReducedMotion()) {
        node.textContent = format(value);
        return;
      }

      const state = { current: 0 };
      const tween = gsap.to(state, {
        current: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = format(state.current);
        },
        scrollTrigger: { trigger: node, start: "top 90%", once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { dependencies: [value] },
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0{suffix}
    </span>
  );
}
