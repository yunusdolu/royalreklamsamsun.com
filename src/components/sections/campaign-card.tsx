import Image from "next/image";

import { CampaignCountdown } from "@/components/sections/campaign-countdown";
import { PillBody } from "@/components/ui/pill-button";
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
 * Paneldeki etiketi ("%20 indirim", "25% off") iri sayı + küçük nota
 * ayırır. Sayı içermeyen etiket ("Ücretsiz montaj") için null döner; o
 * zaman düz hap olarak gösterilir.
 */
export function splitBadge(badge?: string) {
  if (!badge) return null;
  const match = badge
    .trim()
    .match(/^(%\s?\d+(?:[.,]\d+)?|\d+(?:[.,]\d+)?\s?%)\s*(.*)$/u);
  if (!match) return null;
  return { value: match[1].replace(/\s/g, ""), note: match[2] };
}

/** Siyah indirim plakası: iri "%20", altında altın küçük not, üstünden
 *  arada bir geçen ışık. */
export function CampaignDiscount({
  value,
  note,
  size = "md",
  className,
}: {
  value: string;
  note: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-black text-center text-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] ring-1 ring-white/10",
        size === "lg" ? "px-8 py-6" : "px-4 py-3",
        className,
      )}
    >
      <span
        className={cn(
          "font-display font-black leading-none tracking-tight",
          size === "lg" ? "text-6xl lg:text-7xl" : "text-[2.25rem]",
        )}
      >
        {value}
      </span>
      {note && (
        <span
          className={cn(
            "font-bold uppercase text-gold-400",
            size === "lg"
              ? "mt-2.5 text-xs tracking-[0.28em]"
              : "mt-1.5 text-[0.625rem] tracking-[0.22em]",
          )}
        >
          {note}
        </span>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/25 to-transparent motion-reduce:hidden"
      />
    </span>
  );
}

/** "● Aktif kampanya" — nabız atan nokta. */
export function CampaignLiveTag({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.16em]",
        tone === "dark" ? "bg-white/10 text-gold-300" : "bg-gold-500/[0.12] text-gold-700",
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-500 opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-gold-500" />
      </span>
      {label}
    </span>
  );
}

export type CountdownCopy = {
  label: string;
  units: { days: string; hours: string; minutes: string; seconds: string };
};

/** `campaignsPage` çevirilerinden geri sayım metinleri. */
export function campaignCountdownCopy(t: (key: string) => string): CountdownCopy {
  return {
    label: t("timeLeft"),
    units: {
      days: t("units.days"),
      hours: t("units.hours"),
      minutes: t("units.minutes"),
      seconds: t("units.seconds"),
    },
  };
}

/**
 * Kampanya kartı — fotoğraf önce, indirim plakası fotoğrafın üstünde;
 * metin tarafında canlı etiket, geri sayım ve hap buton.
 *
 * Görseli olmayan kampanyada fotoğraf alanı siyah bir plaka; indirim
 * plakası o durumda büyüyüp alanın ortasına geçiyor.
 */
export function CampaignCard({
  campaign,
  endsLabel,
  ongoingLabel,
  detailsLabel,
  liveLabel,
  countdown,
  wide = false,
  className,
}: {
  campaign: Campaign;
  /** "Son gün: {date}" — geri sayım verilmezse gösterilir. */
  endsLabel?: string;
  ongoingLabel: string;
  detailsLabel: string;
  /** "Aktif kampanya" */
  liveLabel?: string;
  /** Verilirse bitiş tarihi yerine canlı geri sayım. */
  countdown?: CountdownCopy;
  /** Tek kampanya varken: masaüstünde fotoğraf solda, metin sağda. */
  wide?: boolean;
  className?: string;
}) {
  const discount = splitBadge(campaign.badge);

  return (
    <Link
      href={{ pathname: "/kampanyalar/[slug]", params: { slug: campaign.slug } }}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_20px_50px_-32px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_34px_70px_-30px_rgba(0,0,0,0.5)]",
        wide && "md:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/10] shrink-0 overflow-hidden bg-[#121214]",
          wide && "md:aspect-auto md:min-h-[26rem] md:w-[52%]",
        )}
      >
        {campaign.image && (
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            quality={85}
            sizes={wide ? "(min-width:768px) 52vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
            style={{ objectPosition: campaign.imageFocus }}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        )}

        {campaign.image ? (
          discount ? (
            <CampaignDiscount
              value={discount.value}
              note={discount.note}
              size={wide ? "lg" : "md"}
              className="absolute left-4 top-4 sm:left-5 sm:top-5"
            />
          ) : (
            campaign.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-black/85 px-3.5 py-1.5 text-[0.75rem] font-bold tracking-wide text-gold-400 backdrop-blur-sm">
                {campaign.badge}
              </span>
            )
          )
        ) : discount ? (
          <span className="absolute inset-0 grid place-items-center">
            <CampaignDiscount value={discount.value} note={discount.note} size="lg" />
          </span>
        ) : (
          campaign.badge && (
            <span className="absolute inset-0 grid place-items-center px-6 text-center font-display text-3xl font-black leading-tight text-gold-400 sm:text-4xl">
              {campaign.badge}
            </span>
          )
        )}
      </div>

      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", wide && "md:justify-center md:p-10 lg:p-12")}>
        {liveLabel && <CampaignLiveTag label={liveLabel} />}

        <h3
          className={cn(
            "font-display text-xl font-bold leading-snug text-royal-fg",
            liveLabel && "mt-4",
            wide && "md:text-3xl lg:text-[2.125rem]",
          )}
        >
          {campaign.title}
        </h3>
        {campaign.excerpt && (
          <p className={cn("mt-2.5 line-clamp-3 text-[0.9375rem] leading-relaxed text-royal-muted", wide && "md:text-base")}>
            {campaign.excerpt}
          </p>
        )}

        {campaign.endsAt && countdown ? (
          <CampaignCountdown
            endsAt={campaign.endsAt}
            units={countdown.units}
            label={countdown.label}
            size={wide ? "md" : "sm"}
            className="mt-6"
          />
        ) : (
          <span className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-royal-faint">
            {campaign.endsAt ? endsLabel : ongoingLabel}
          </span>
        )}

        <span className={cn("mt-auto flex pt-7", wide && "md:mt-9 md:pt-0")}>
          <span className="inline-flex items-center">
            <PillBody tone="dark">{detailsLabel}</PillBody>
          </span>
        </span>
      </div>
    </Link>
  );
}
