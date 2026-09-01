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
 * Fotoğrafı olmayan hizmetlerde yanlış görsel göstermek yerine koyu panele
 * düşülür — `service.image` bilinçli olarak opsiyonel.
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
  /** "iş günü" / "business days" */
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
        {service.image ? (
          <>
            <Image
              src={service.image}
              alt={copy.name}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5" />
          </>
        ) : (
          <span className="absolute inset-0 bg-[linear-gradient(140deg,#1c1c1f_0%,#2a2620_55%,#1c1c1f_100%)]" />
        )}

        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.6875rem] font-semibold text-royal-fg shadow-sm backdrop-blur-sm">
          {service.leadTimeDays[0]}–{service.leadTimeDays[1]} {daysLabel}
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
