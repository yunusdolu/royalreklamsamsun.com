"use client";

import { useRef } from "react";

import { gsap, prefersReducedMotion, royalEase, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * GSAP SplitText ile satır satır açılan başlık.
 *
 * Erişilebilirlik notu: SplitText DOM'u parçalara böldüğü için ekran
 * okuyucular metni harf harf okuyabilir. Bunu engellemek adına orijinal metin
 * `aria-label` olarak korunur ve parçalanmış içerik `aria-hidden` yapılır.
 */
export function SplitHeading({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.09,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = container.current?.querySelector("[data-split]");
      if (!target) return;

      if (prefersReducedMotion()) {
        gsap.set(target, { opacity: 1 });
        return;
      }

      const split = new SplitText(target as HTMLElement, {
        type: "lines",
        linesClass: "split-line",
        // Satırlar taşmadan maskelenebilsin diye her satır sarmalanır
        mask: "lines",
      });

      gsap.set(target, { opacity: 1 });

      const tween = gsap.from(split.lines, {
        yPercent: 115,
        opacity: 0,
        duration: 0.9,
        delay,
        stagger,
        ease: royalEase.expo,
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.revert();
      };
    },
    { scope: container, dependencies: [text] },
  );

  return (
    <div ref={container} className={cn("overflow-hidden", className)}>
      <Tag aria-label={text}>
        <span data-split aria-hidden="true" className="block opacity-0">
          {text}
        </span>
      </Tag>
    </div>
  );
}
