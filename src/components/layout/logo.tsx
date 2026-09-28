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
  /*
    next/image: 131 KB'lık PNG her sayfada olduğu gibi iniyordu. Artık
    gösterildiği genişliğe göre küçültülüp AVIF/WebP geliyor; en/boy
    bildirildiği için yüklenirken sayfa kaymıyor.
  */
  return (
    <Image
      src="/brand/my-logo.png"
      alt={`${siteConfig.name} — ${siteConfig.tagline.tr}`}
      width={1024}
      height={232}
      sizes={`(min-width: 1024px) ${Math.max(width, 530)}px, 330px`}
      loading={priority ? "eager" : undefined}
      className={cn("h-auto w-full select-none object-contain", className)}
    />
  );
}
