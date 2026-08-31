import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Marka logosu.
 *
 * Orijinal logo dosyasının arka planı beyaz ve harfleri koyu olduğu için
 * siyah zeminde kullanılamıyordu. `scripts/prepare-brand.mjs` ile arka plan
 * şeffaflaştırılıp tüm şekil altın gradientle boyanmış bir sürüm üretildi;
 * burada kullanılan dosya odur.
 */
export function Logo({
  className,
  priority = false,
  width = 200,
}: {
  className?: string;
  priority?: boolean;
  width?: number;
}) {
  return (
    <img
      src="/brand/my-logo.png"
      alt={`${siteConfig.name} — ${siteConfig.tagline.tr}`}
      className={cn("h-auto w-full select-none object-contain", className)}
    />
  );
}

/** Yalnızca at figürü — dar alanlarda (mobil başlık, favicon alanı) */
export function LogoMark({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/brand/mark-gold.png"
      alt={siteConfig.name}
      width={size}
      height={size}
      className={cn("select-none", className)}
    />
  );
}
