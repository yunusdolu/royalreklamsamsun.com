import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceIcon } from "@/components/ui/service-icon";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { getRegionBySlug, regions } from "@/content/regions";
import { getServiceById } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSpeakableSchema,
  schemaIds,
} from "@/lib/schema";
import { buildLocalizedAlternates, buildOpenGraph, localizedUrl } from "@/lib/seo";

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
      (l) => ({ pathname: "/bolgeler/[slug]", params: { slug: region.slug[l] } }),
      locale,
    ),
    openGraph: buildOpenGraph({
      title: copy.metaTitle,
      description: copy.metaDescription,
      href: { pathname: "/bolgeler/[slug]", params: { slug: region.slug[locale] } },
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

  const whatsappMessage = `Merhaba, ${siteConfig.name} — ${region.name.tr} bölgesinde tabela yaptırmak istiyorum.`;

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
          <a
            href={telLink}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-gradient-to-b from-gold-300 to-gold-600 px-6 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
          >
            <Phone className="size-4" aria-hidden="true" />
            {siteConfig.contact.phoneDisplay}
          </a>
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-gold-500/40 px-5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-500/10"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t("whatsapp")}
          </a>
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

          <div className="mt-14">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("popularServices")}
            </h2>
            <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
              {popular.map((service) => (
                <RevealItem as="li" key={service.id}>
                  <Link
                    href={{
                      pathname: "/hizmetler/[slug]",
                      params: { slug: service.slug[locale] },
                    }}
                    className="surface-royal surface-royal-hover group flex h-full flex-col rounded-lg p-5 transition-all duration-500"
                  >
                    <ServiceIcon
                      name={service.icon}
                      className="size-5 text-gold-500 transition-colors group-hover:text-gold-300"
                    />
                    <span className="mt-4 font-display text-[0.9375rem] font-bold text-royal-fg transition-colors group-hover:text-gold-100">
                      {service.copy[locale].name}
                    </span>
                    <span className="mt-1.5 flex-1 text-[0.8125rem] leading-snug text-royal-faint">
                      {service.copy[locale].tagline}
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Reveal direction="left">
              <div className="surface-royal rounded-xl p-6">
                <h2 className="flex items-center gap-2 font-display text-base font-bold text-royal-fg">
                  <MapPin className="size-4 text-gold-500" aria-hidden="true" />
                  {t("address")}
                </h2>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-royal-muted">
                  {siteConfig.address.full}
                </p>
                <p className="mt-4 border-t border-white/5 pt-4 text-[0.8125rem] leading-relaxed text-royal-faint">
                  {tRegions("lead")}
                </p>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.08}>
              <div className="rounded-xl border border-gold-500/25 bg-gradient-to-b from-gold-500/[0.07] to-transparent p-6">
                <h2 className="font-display text-base font-bold text-royal-fg">
                  {t("quoteCtaTitle")}
                </h2>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-royal-muted">
                  {t("quoteCtaText")}
                </p>
                <Link
                  href="/teklif-al"
                  className="mt-5 flex h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-gold-300 to-gold-600 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
                >
                  {t("getQuote")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>

      <FaqSection faqs={copy.faqs} showCta={false} />

      <section className="container-royal pb-20 lg:pb-28">
        <Link
          href="/bolgeler"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
        >
          {t("backToRegions")}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
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
