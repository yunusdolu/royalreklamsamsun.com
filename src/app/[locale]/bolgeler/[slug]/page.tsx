import { MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { PillAnchor, PillLink } from "@/components/ui/pill-button";
import { ServiceCard } from "@/components/ui/service-card";
import {
  mapsDirectionsLink,
  siteConfig,
  telLink,
  whatsappLink,
} from "@/config/site";
import { getRegionBySlug, regions } from "@/content/regions";
import { getServiceById } from "@/content/services";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSpeakableSchema,
  schemaIds,
} from "@/lib/schema";
import {
  buildLocalizedAlternates,
  buildOpenGraph,
  localizedUrl,
} from "@/lib/seo";

type Params = { locale: Locale; slug: string };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    regions.map((region) => ({ locale, slug: region.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const region = getRegionBySlug(slug, locale);
  if (!region) return {};

  const copy = region.copy[locale];

  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: buildLocalizedAlternates(
      (l) => ({
        pathname: "/bolgeler/[slug]",
        params: { slug: region.slug[l] },
      }),
      locale,
    ),
    openGraph: buildOpenGraph({
      title: copy.metaTitle,
      description: copy.metaDescription,
      href: {
        pathname: "/bolgeler/[slug]",
        params: { slug: region.slug[locale] },
      },
      locale,
    }),
  };
}

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const region = getRegionBySlug(slug, locale);
  if (!region) notFound();

  const copy = region.copy[locale];
  const t = await getTranslations("common");
  const tRegions = await getTranslations("regionsPage");

  const popular = region.popularServiceIds
    .map((id) => getServiceById(id))
    .filter((service) => service !== undefined);

  const whatsappMessage = tRegions("whatsappPrefill", { region: region.name[locale] });

  /**
   * Bölgeye özel `Service` şeması: sağlayıcı ana işletme, hizmet alanı ise
   * bu ilçe. "Samsun Atakum tabela" gibi konuma bağlı sorgularda varlık
   * eşleşmesini güçlendirir.
   */
  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.heading,
    description: copy.answer,
    provider: { "@id": schemaIds.localBusiness },
    areaServed: {
      "@type": "AdministrativeArea",
      name: region.name[locale],
      containedInPlace: { "@type": "City", name: "Samsun" },
    },
    url: localizedUrl(
      { pathname: "/bolgeler/[slug]", params: { slug: region.slug[locale] } },
      locale,
    ),
  };

  return (
    <>
      <PageHeader
        crumbs={[
          { name: t("breadcrumbHome"), href: "/" },
          { name: tRegions("title"), href: "/bolgeler" },
          { name: region.name[locale] },
        ]}
        eyebrow={copy.character}
        title={copy.heading}
        answer={copy.answer}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PillAnchor href={telLink} external={false} icon={Phone}>
            {siteConfig.contact.phoneDisplay}
          </PillAnchor>
          <PillAnchor
            href={whatsappLink(whatsappMessage)}
            tone="light"
            icon={MessageCircle}
          >
            {t("whatsapp")}
          </PillAnchor>
        </div>
      </PageHeader>

      <section className="container-royal grid gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="lg:col-span-7 xl:col-span-8">
          <Reveal>
            <div className="space-y-5">
              {copy.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[0.9375rem] leading-[1.75] text-royal-muted lg:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Bölgede en çok istenen hizmetler — fotoğraflı kartlar */}
          <div className="mt-14">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("popularServices")}
            </h2>
            <RevealGroup
              as="ul"
              className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {popular.map((service) => (
                <RevealItem as="li" key={service.id}>
                  <ServiceCard
                    service={service}
                    locale={locale}
                    daysLabel={t("days")}
                    readMoreLabel={t("readMore")}
                  />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Atölye künyesi + teklif — ikonsuz, çizgiyle ayrılmış satırlar */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Reveal direction="left">
              <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                  {t("address")}
                </h2>
                <p className="mt-3 font-display text-[0.9375rem] font-bold leading-relaxed text-royal-fg">
                  {siteConfig.address.full}
                </p>

                <dl className="mt-5 divide-y divide-black/[0.06] text-[0.875rem]">
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="shrink-0 text-royal-faint">{t("phone")}</dt>
                    <dd>
                      <a
                        href={telLink}
                        className="font-medium text-royal-fg underline-offset-4 transition-colors hover:text-gold-600 hover:underline"
                      >
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="shrink-0 text-royal-faint">
                      {t("weekdays")}
                    </dt>
                    <dd className="font-medium tabular-nums text-royal-fg">
                      {siteConfig.openingHours.weekdays.opens}–
                      {siteConfig.openingHours.weekdays.closes}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="shrink-0 text-royal-faint">
                      {t("saturday")}
                    </dt>
                    <dd className="font-medium tabular-nums text-royal-fg">
                      {siteConfig.openingHours.saturday.opens}–
                      {siteConfig.openingHours.saturday.closes}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="shrink-0 text-royal-faint">{t("sunday")}</dt>
                    <dd className="font-medium text-royal-faint">
                      {t("closed")}
                    </dd>
                  </div>
                </dl>

                <PillAnchor
                  href={mapsDirectionsLink}
                  tone="light"
                  block
                  className="mt-5"
                >
                  {t("getDirections")}
                </PillAnchor>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.08}>
              <div className="overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-6">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {region.name[locale]}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold text-white">
                  {t("quoteCtaTitle")}
                </h2>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-white/60">
                  {t("quoteCtaText")}
                </p>
                <PillLink
                  href="/teklif-al"
                  tone="onDark"
                  block
                  className="mt-6"
                >
                  {t("getQuote")}
                </PillLink>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>

      <FaqSection faqs={copy.faqs} showCta={false} />

      <section className="container-royal pb-20 lg:pb-28">
        <PillLink href="/bolgeler" tone="light">
          {t("backToRegions")}
        </PillLink>
      </section>

      <JsonLd id="ld-region-service" data={areaSchema} />
      <JsonLd id="ld-region-faq" data={buildFaqSchema(copy.faqs)} />
      <JsonLd
        id="ld-region-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: t("breadcrumbHome"), href: "/" },
            { name: tRegions("title"), href: "/bolgeler" },
            {
              name: region.name[locale],
              href: {
                pathname: "/bolgeler/[slug]",
                params: { slug: region.slug[locale] },
              },
            },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-region-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
