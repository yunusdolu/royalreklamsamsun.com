import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { CampaignCountdown } from "@/components/sections/campaign-countdown";
import { PillLink } from "@/components/ui/pill-button";
import type { Locale } from "@/i18n/routing";
import type { Campaign } from "@/lib/content/campaigns";
import {
  CampaignLiveTag,
  campaignCountdownCopy,
  formatCampaignEnd,
  splitBadge,
} from "./campaign-card";

/**
 * Hizmet sayfasının başındaki kampanya bandı.
 *
 * Panelde kampanyaya bu hizmet işaretlendiyse görünür. Başlık bloğunun
 * hemen altında duruyor: kampanya, ziyaretçinin fiyat sorusundan önce
 * görmesi gereken bilgi. Birden fazla kampanya varsa alt alta dizilir.
 *
 * Beyaz kart: altındaki "Çeşitler" bölümü koyu. Band da koyuyken ikisi
 * birbirine yapışıp tek parça gibi görünüyordu; alttaki boşluk da bu
 * yüzden var. İndirim solda siyah plakada iri yazılıyor, sağda canlı geri
 * sayım — ziyaretçinin gözünü ilk bu iki şey yakalıyor.
 */
export async function ServiceCampaigns({
  campaigns,
  locale,
}: {
  campaigns: Campaign[];
  locale: Locale;
}) {
  if (campaigns.length === 0) return null;
  const t = await getTranslations("campaignsPage");
  const countdown = campaignCountdownCopy(t);

  return (
    <section className="container-royal pt-10 pb-16 lg:pt-12 lg:pb-20">
      <div className="flex flex-col gap-5">
        {campaigns.map((campaign) => {
          const discount = splitBadge(campaign.badge);
          const href = {
            pathname: "/kampanyalar/[slug]" as const,
            params: { slug: campaign.slug },
          };

          return (
            <Reveal key={campaign.id}>
              <div className="flex flex-col overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_24px_60px_-34px_rgba(0,0,0,0.4)] md:flex-row">
                {campaign.badge && (
                  <div className="relative flex shrink-0 flex-col items-center justify-center overflow-hidden bg-black px-8 py-8 text-center md:w-56 lg:w-64">
                    {discount ? (
                      <>
                        <span className="font-display text-6xl font-black leading-none tracking-tight text-white lg:text-7xl">
                          {discount.value}
                        </span>
                        <span className="mt-3 text-xs font-bold uppercase tracking-[0.28em] text-gold-400">
                          {discount.note || t("discount")}
                        </span>
                      </>
                    ) : (
                      <span className="font-display text-2xl font-black leading-tight text-gold-400">
                        {campaign.badge}
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/20 to-transparent motion-reduce:hidden"
                    />
                  </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
                  <div className="min-w-0 flex-1 p-6 sm:p-8 lg:py-9">
                    <CampaignLiveTag label={t("serviceBanner")} />
                    <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-royal-fg lg:text-[1.75rem]">
                      {campaign.title}
                    </h2>
                    {campaign.excerpt && (
                      <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-royal-muted">
                        {campaign.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-5 border-t border-black/[0.07] p-6 sm:p-8 lg:justify-center lg:border-l lg:border-t-0 lg:py-9">
                    {campaign.endsAt ? (
                      <CampaignCountdown
                        endsAt={campaign.endsAt}
                        units={countdown.units}
                        label={countdown.label}
                        size="sm"
                      />
                    ) : (
                      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-royal-faint">
                        {t("ongoing")}
                      </span>
                    )}
                    {campaign.endsAt && (
                      <span className="sr-only">
                        {t("endsOn", { date: formatCampaignEnd(campaign.endsAt, locale) })}
                      </span>
                    )}
                    <PillLink href={href} tone="dark" className="shrink-0">
                      {t("details")}
                    </PillLink>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
