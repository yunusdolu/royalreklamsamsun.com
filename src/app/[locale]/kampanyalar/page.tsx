import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import {
  CampaignCard,
  campaignCountdownCopy,
  formatCampaignEnd,
} from "@/components/sections/campaign-card";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { PillAnchor, PillLink } from "@/components/ui/pill-button";
import { whatsappLink } from "@/config/site";
import { type Locale, routing } from "@/i18n/routing";
import { getLiveCampaigns } from "@/lib/content/campaigns";
import { getPageContent } from "@/lib/content/pages";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "campaignsPage" });
  const live = await getLiveCampaigns(locale);

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/kampanyalar", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/kampanyalar",
      locale,
    }),
    /*
      Yayında kampanya yokken sayfa yalnızca "şu an kampanya yok" diyor.
      Google'ın bu boş sayfayı dizine alıp aramada göstermesi istenmiyor.
    */
    robots: live.length === 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [page, campaigns] = await Promise.all([
    getPageContent("kampanyalar", locale),
    getLiveCampaigns(locale),
  ]);

  const t = await getTranslations("campaignsPage");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader
        crumbs={[
          { name: tCommon("breadcrumbHome"), href: "/" },
          { name: t("title") },
        ]}
        title={page.title}
        lead={page.lead}
        image={page.image}
        imagePosition={page.imageFocus}
      />

      <section className="container-royal py-16 lg:py-20">
        {campaigns.length === 0 ? (
          <div className="rounded-2xl bg-[#121214] px-6 py-16 text-center sm:px-12">
            <p className="mx-auto max-w-xl text-[0.9375rem] leading-relaxed text-white/60">
              {t("empty")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PillLink href="/teklif-al" tone="onDark">
                {tCommon("getQuote")}
              </PillLink>
              <PillAnchor href={whatsappLink()} tone="onDark">
                {tCommon("whatsapp")}
              </PillAnchor>
            </div>
          </div>
        ) : (
          <RevealGroup
            as="ul"
            className={campaigns.length === 1 ? "grid gap-5" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}
          >
            {campaigns.map((campaign) => (
              <RevealItem as="li" key={campaign.id}>
                <CampaignCard
                  campaign={campaign}
                  endsLabel={
                    campaign.endsAt
                      ? t("endsOn", { date: formatCampaignEnd(campaign.endsAt, locale) })
                      : undefined
                  }
                  ongoingLabel={t("ongoing")}
                  detailsLabel={t("details")}
                  liveLabel={t("live")}
                  countdown={campaignCountdownCopy(t)}
                  wide={campaigns.length === 1}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </section>

      <CtaSection />

      <JsonLd
        id="ld-campaigns-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/kampanyalar" },
          ],
          locale,
        )}
      />
    </>
  );
}
