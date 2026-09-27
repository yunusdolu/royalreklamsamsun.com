import { getLocale, getTranslations } from "next-intl/server";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { PillLink } from "@/components/ui/pill-button";
import type { Locale } from "@/i18n/routing";
import { getLiveCampaigns } from "@/lib/content/campaigns";
import { CampaignCard, formatCampaignEnd } from "./campaign-card";

/**
 * Anasayfadaki kampanya şeridi.
 *
 * Yayında kampanya yoksa hiç çizilmiyor: "şu an kampanya yok" yazan bir
 * bölüm anasayfada yer kaplamaktan başka bir şey yapmaz. Panelden ilk
 * kampanya açıldığı anda kendiliğinden belirir.
 */
export async function CampaignStrip() {
  const locale = (await getLocale()) as Locale;
  const campaigns = await getLiveCampaigns(locale);
  if (campaigns.length === 0) return null;

  const t = await getTranslations("home.campaigns");
  const tPage = await getTranslations("campaignsPage");

  const shown = campaigns.slice(0, 3);

  return (
    <section className="container-royal py-20 lg:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        {campaigns.length > shown.length && (
          <PillLink href="/kampanyalar" tone="light" className="shrink-0">
            {t("cta")}
          </PillLink>
        )}
      </div>

      <RevealGroup
        as="ul"
        className={
          shown.length === 1
            ? "mt-10 grid gap-5"
            : "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {shown.map((campaign) => (
          <RevealItem as="li" key={campaign.id}>
            <CampaignCard
              campaign={campaign}
              endsLabel={
                campaign.endsAt
                  ? tPage("endsOn", { date: formatCampaignEnd(campaign.endsAt, locale) })
                  : undefined
              }
              ongoingLabel={tPage("ongoing")}
              detailsLabel={tPage("details")}
              wide={shown.length === 1}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
