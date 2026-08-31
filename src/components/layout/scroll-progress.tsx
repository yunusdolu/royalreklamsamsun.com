"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Sayfanın üstünde ince altın ilerleme çizgisi.
 * Yalnızca görsel bir katman olduğu için `aria-hidden`.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-gold-700 via-gold-400 to-gold-200"
    />
  );
}
