import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { PillLink } from "@/components/ui/pill-button";
import type { Locale } from "@/i18n/routing";
import type { Campaign } from "@/lib/content/campaigns";
import { formatCampaignEnd } from "./campaign-card";

/**
 * Hizmet sayfasının başındaki kampanya bandı.
 *
 * Panelde kampanyaya bu hizmet işaretlendiyse görünür. Başlık bloğunun
 * hemen altında duruyor: kampanya, ziyaretçinin fiyat sorusundan önce
 * görmesi gereken bilgi. Birden fazla kampanya varsa alt alta dizilir.
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

  return (
    <section className="container-royal pt-10 lg:pt-12">
      <div className="flex flex-col gap-4">
        {campaigns.map((campaign) => (
          <Reveal key={campaign.id}>
            <div className="flex flex-col gap-6 overflow-hidden rounded-2xl bg-[#121214] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
                  {t("serviceBanner")}
                  {campaign.badge && (
                    <span className="rounded-full bg-gold-500 px-3 py-1 text-[0.75rem] normal-case tracking-normal text-black">
                      {campaign.badge}
                    </span>
                  )}
                </p>
                <h2 className="mt-3 font-display text-xl font-bold text-white lg:text-2xl">
                  {campaign.title}
                </h2>
                {campaign.excerpt && (
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-white/60">
                    {campaign.excerpt}
                  </p>
                )}
                {campaign.endsAt && (
                  <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {t("endsOn", { date: formatCampaignEnd(campaign.endsAt, locale) })}
                  </p>
                )}
              </div>

              <PillLink
                href={{ pathname: "/kampanyalar/[slug]", params: { slug: campaign.slug } }}
                tone="onDark"
                className="shrink-0"
              >
                {t("details")}
              </PillLink>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
