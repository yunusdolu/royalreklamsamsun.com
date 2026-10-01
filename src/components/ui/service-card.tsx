import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import type { Service } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Fotoğraf öncelikli hizmet kartı. Hem hizmet listesinde hem de detay
 * sayfasının "ilgili hizmetler" bölümünde kullanılır.
 *
 * Her hizmetin `public/images/services/` altında kendi fotoğrafı vardır;
 * `service.image` bu yüzden zorunlu alandır.
 */
export function ServiceCard({
  service,
  locale,
  daysLabel,
  readMoreLabel,
  className,
}: {
  service: Service;
  locale: Locale;
  /** "Gün Teslim" / "Day Delivery" */
  daysLabel: string;
  /** "Detaylı bilgi" / "Read more" */
  readMoreLabel: string;
  className?: string;
}) {
  const copy = service.copy[locale];

  return (
    <Link
      href={{
        pathname: "/hizmetler/[slug]",
        params: { slug: service.slug[locale] },
      }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_26px_60px_-30px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-royal-graphite">
        <Image
          src={service.image}
          alt={copy.name}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          quality={85}
          style={{ objectPosition: service.cardFocus }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5" />

        {/* Anasayfadaki hizmet kartlarıyla aynı teslim rozeti: beyaz yazı,
            okunsun diye üstten inen koyu geçiş. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
        />
        <span className="absolute right-5 top-4 text-right drop-shadow-md">
          <span className="block text-[22px] font-bold leading-none text-white">
            {service.leadTimeDays[1] || 5}+
          </span>
          <span className="mt-1 block text-[11px] text-white/90">{daysLabel}</span>
        </span>
      </span>

      <span className="flex flex-1 flex-col p-5">
        <span className="font-display text-[1.0625rem] font-bold text-royal-fg">
          {copy.name}
        </span>

        <span className="mt-2 block flex-1 text-[0.85rem] leading-relaxed text-royal-muted">
          {copy.summary}
        </span>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-gold-600 transition-all group-hover:gap-2.5">
          {readMoreLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </span>
    </Link>
  );
}
