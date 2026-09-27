import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Campaign } from "@/lib/content/campaigns";
import { cn } from "@/lib/utils";

/**
 * Kampanyanın son gününü okunur yazar: "30 Eylül", yıl farklıysa
 * "12 Ocak 2027". Saat dilimi sabit — sunucu UTC'de çalışıyor, gece
 * yarısına yakın biten bir kampanya aksi halde bir gün erken görünürdü.
 */
export function formatCampaignEnd(endsAt: string, locale: Locale): string {
  const date = new Date(endsAt);
  const sameYear =
    date.getUTCFullYear() === new Date().getUTCFullYear();
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: sameYear ? undefined : "numeric",
    timeZone: "Europe/Istanbul",
  }).format(date);
}

/**
 * Kampanya kartı — fotoğraf önce, etiket fotoğrafın üstünde.
 *
 * Görseli olmayan kampanya da boş bir gri kutuyla değil koyu bir plakayla
 * açılıyor; etiket ("%20 indirim") o durumda kartın ana görseli oluyor.
 */
export function CampaignCard({
  campaign,
  endsLabel,
  ongoingLabel,
  detailsLabel,
  wide = false,
  className,
}: {
  campaign: Campaign;
  /** "Son gün: {date}" — tarih yerine konmuş hali. */
  endsLabel?: string;
  ongoingLabel: string;
  detailsLabel: string;
  /** Tek kampanya varken: masaüstünde fotoğraf solda, metin sağda. */
  wide?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={{ pathname: "/kampanyalar/[slug]", params: { slug: campaign.slug } }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_26px_60px_-30px_rgba(0,0,0,0.45)]",
        wide && "md:flex-row",
        className,
      )}
    >
      <div className={cn("relative aspect-[16/10] shrink-0 overflow-hidden bg-[#121214]", wide && "md:aspect-auto md:min-h-80 md:w-1/2")}>
        {campaign.image ? (
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            sizes={wide ? "(min-width:768px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
            style={{ objectPosition: campaign.imageFocus }}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          campaign.badge && (
            <span className="absolute inset-0 grid place-items-center px-6 text-center font-display text-3xl font-black leading-tight text-gold-400 sm:text-4xl">
              {campaign.badge}
            </span>
          )
        )}

        {campaign.badge && campaign.image && (
          <span className="absolute left-4 top-4 rounded-full bg-black/85 px-3.5 py-1.5 text-[0.75rem] font-bold tracking-wide text-gold-400 backdrop-blur-sm">
            {campaign.badge}
          </span>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-6", wide && "md:justify-center md:p-10")}>
        <h3 className={cn("font-display text-lg font-bold leading-snug text-royal-fg", wide && "md:text-2xl")}>
          {campaign.title}
        </h3>
        {campaign.excerpt && (
          <p className="mt-2.5 line-clamp-3 text-[0.9375rem] leading-relaxed text-royal-muted">
            {campaign.excerpt}
          </p>
        )}

        <div className={cn("mt-auto flex items-center justify-between gap-4 pt-6", wide && "md:mt-8")}>
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-royal-faint">
            {campaign.endsAt ? endsLabel : ongoingLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-royal-fg">
            {detailsLabel}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
