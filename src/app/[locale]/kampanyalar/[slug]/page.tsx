import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { formatCampaignEnd } from "@/components/sections/campaign-card";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { PillLink } from "@/components/ui/pill-button";
import { whatsappLink } from "@/config/site";
import { getServiceById } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { getCampaignBySlug, getCampaignSlugs } from "@/lib/content/campaigns";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildLocalizedAlternates, buildOpenGraph, clampDescription } from "@/lib/seo";

type Params = { locale: Locale; slug: string };

/**
 * Derleme anında yayında olan kampanyalar önceden üretilir; panelden
 * sonradan açılan kampanya ilk ziyarette üretilir. Süresi dolan ya da
 * kapatılan kampanya `notFound()` ile 404 döner.
 */
export async function generateStaticParams() {
  const slugs = await getCampaignSlugs();
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const campaign = await getCampaignBySlug(slug, locale);
  if (!campaign) return {};

  const href = { pathname: "/kampanyalar/[slug]" as const, params: { slug } };
  const description = campaign.excerpt || campaign.body[0] || campaign.title;

  return {
    title: campaign.title,
    description: clampDescription(description),
    /* Kampanyanın adresi iki dilde aynı; yalnızca dil ön eki değişiyor. */
    alternates: buildLocalizedAlternates(() => href, locale),
    openGraph: buildOpenGraph({
      title: campaign.title,
      description,
      href,
      locale,
      images: campaign.image ? [campaign.image] : undefined,
    }),
  };
}

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const campaign = await getCampaignBySlug(slug, locale);
  if (!campaign) notFound();

  const t = await getTranslations("campaignsPage");
  const tCommon = await getTranslations("common");

  const services = campaign.serviceIds
    .map((id) => getServiceById(id))
    .filter((service) => service !== undefined);

  const crumbs = [
    { name: tCommon("breadcrumbHome"), href: "/" as const },
    { name: t("title"), href: "/kampanyalar" as const },
    { name: campaign.title },
  ];

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow={campaign.badge}
        title={campaign.title}
        lead={campaign.excerpt || undefined}
        image={campaign.image}
        imagePosition={campaign.imageFocus}
      >
        <div className="mt-4">
          <PillLink href="/teklif-al" tone={campaign.image ? "onDark" : "dark"}>
            {tCommon("getQuote")}
          </PillLink>
        </div>
      </PageHeader>

      <section className="container-royal grid gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          {campaign.body.length > 0 && (
            <Reveal>
              <div className="space-y-5">
                {campaign.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="whitespace-pre-line text-[0.9375rem] leading-[1.75] text-royal-muted lg:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          )}

          {services.length > 0 && (
            <div className={campaign.body.length > 0 ? "mt-14" : undefined}>
              <h2 className="font-display text-xl font-bold text-royal-fg lg:text-2xl">
                {t("servicesTitle")}
              </h2>
              <ul className="mt-6 divide-y divide-black/[0.06] border-y border-black/[0.06]">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={{
                        pathname: "/hizmetler/[slug]",
                        params: { slug: service.slug[locale] },
                      }}
                      className="group flex items-baseline gap-4 py-4 text-[0.9375rem] font-medium text-royal-fg transition-colors hover:text-black"
                    >
                      <span
                        className="h-px w-3.5 shrink-0 translate-y-[-0.3rem] bg-gold-600 transition-all duration-500 group-hover:w-6"
                        aria-hidden="true"
                      />
                      {service.copy[locale].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12">
            <PillLink href="/kampanyalar" tone="light">
              {t("backToCampaigns")}
            </PillLink>
          </div>
        </div>

        <aside className="min-w-0 lg:col-span-5 xl:col-span-4">
          <Reveal direction="left">
            <div className="overflow-hidden rounded-2xl bg-[#121214] p-6 lg:sticky lg:top-28">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                {campaign.endsAt
                  ? t("endsOn", { date: formatCampaignEnd(campaign.endsAt, locale) })
                  : t("ongoing")}
              </span>
              {campaign.badge && (
                <p className="mt-3 font-display text-3xl font-black leading-tight text-white">
                  {campaign.badge}
                </p>
              )}
              <p className="mt-3 text-[0.875rem] leading-relaxed text-white/60">
                {tCommon("quoteCtaText")}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <PillLink href="/teklif-al" tone="onDark" block>
                  {tCommon("getQuote")}
                </PillLink>
                <a
                  href={whatsappLink(t("whatsappPrefill", { campaign: campaign.title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-[0.8125rem] font-semibold text-white/70 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 text-[#25d366]" aria-hidden="true" />
                  {t("askWhatsapp")}
                </a>
              </div>
            </div>
          </Reveal>
        </aside>
      </section>

      <CtaSection />

      <JsonLd
        id="ld-campaign-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/kampanyalar" },
            { name: campaign.title, href: { pathname: "/kampanyalar/[slug]", params: { slug } } },
          ],
          locale,
        )}
      />
    </>
  );
}
