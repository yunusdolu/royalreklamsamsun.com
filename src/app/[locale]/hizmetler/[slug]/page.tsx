import { ArrowUpRight, Check, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceIcon } from "@/components/ui/service-icon";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { getServiceBySlug, services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildSpeakableSchema,
} from "@/lib/schema";
import {
  buildLocalizedAlternates,
  buildOpenGraph,
  clampDescription,
} from "@/lib/seo";

type Params = { locale: Locale; slug: string };

/**
 * Her dil için ayrı slug üretilir:
 *   /hizmetler/kutu-harf-tabela
 *   /en/services/channel-letter-signs
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug, locale);
  if (!service) return {};

  const copy = service.copy[locale];
  const href = {
    pathname: "/hizmetler/[slug]" as const,
    params: { slug: service.slug[locale] },
  };

  return {
    // metaTitle zaten marka adını içeriyor; şablonun tekrar eklemesini engelle
    title: { absolute: copy.metaTitle },
    description: clampDescription(copy.metaDescription),
    keywords: copy.keywords,
    alternates: buildLocalizedAlternates(
      (l) => ({ pathname: "/hizmetler/[slug]", params: { slug: service.slug[l] } }),
      locale,
    ),
    openGraph: buildOpenGraph({
      title: copy.metaTitle,
      description: copy.metaDescription,
      href,
      locale,
    }),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug, locale);
  if (!service) notFound();

  const copy = service.copy[locale];
  const t = await getTranslations("common");
  const tServices = await getTranslations("servicesPage");

  const related = services
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  const crumbs = [
    { name: t("breadcrumbHome"), href: "/" as const },
    { name: tServices("title"), href: "/hizmetler" as const },
    { name: copy.shortName },
  ];

  const whatsappMessage = `Merhaba, ${siteConfig.name} — "${copy.name}" hakkında bilgi ve fiyat almak istiyorum.`;

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow={copy.tagline}
        title={copy.name}
        answer={copy.answer}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/teklif-al"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-gradient-to-b from-gold-300 to-gold-600 px-6 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
          >
            {t("getQuote")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-gold-500/40 px-5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-500/10"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t("whatsapp")}
          </a>
          <span className="text-[0.75rem] text-royal-faint">
            {t("leadTime")}: {service.leadTimeDays[0]}–{service.leadTimeDays[1]}{" "}
            {t("days")}
          </span>
        </div>
      </PageHeader>

      {/* Gövde metni + yan panel */}
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

          {/* Öne çıkanlar */}
          <div className="mt-14">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("highlightsTitle")}
            </h2>
            <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.highlights.map((highlight) => (
                <RevealItem
                  as="li"
                  key={highlight.title}
                  className="surface-royal rounded-lg p-5"
                >
                  <h3 className="flex items-start gap-2 font-display text-[0.9375rem] font-bold text-royal-fg">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-gold-500"
                      aria-hidden="true"
                    />
                    {highlight.title}
                  </h3>
                  <p className="mt-2 pl-6 text-[0.875rem] leading-relaxed text-royal-muted">
                    {highlight.description}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Teknik özellikler — LLM'lerin alıntılaması için tablo */}
          <div className="mt-14">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("specsTitle")}
            </h2>
            <Reveal>
              <div className="mt-8 overflow-x-auto rounded-lg border border-royal-border">
                <table className="w-full min-w-[30rem] border-collapse text-left text-[0.875rem]">
                  <tbody>
                    {copy.specs.map((spec, index) => (
                      <tr
                        key={spec.label}
                        className={
                          index % 2 === 0 ? "bg-royal-graphite" : "bg-royal-surface"
                        }
                      >
                        <th
                          scope="row"
                          className="w-2/5 border-b border-royal-border px-4 py-3.5 font-medium text-royal-muted"
                        >
                          {spec.label}
                        </th>
                        <td className="border-b border-royal-border px-4 py-3.5 text-royal-fg">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          {/* Fiyatı belirleyen etkenler */}
          <div className="mt-14">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("priceTitle")}
            </h2>
            <RevealGroup as="ul" className="mt-8 space-y-3" stagger={0.05}>
              {copy.priceFactors.map((factor) => (
                <RevealItem
                  as="li"
                  key={factor}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-royal-muted"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-500"
                    aria-hidden="true"
                  />
                  {factor}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Yan panel */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            <Reveal direction="left">
              <div className="surface-royal rounded-xl p-6">
                <h2 className="font-display text-base font-bold text-royal-fg">
                  {t("useCasesTitle")}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {copy.useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex gap-2.5 text-[0.875rem] leading-snug text-royal-muted"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-gold-600"
                        aria-hidden="true"
                      />
                      {useCase}
                    </li>
                  ))}
                </ul>
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
                <div className="mt-5 space-y-2.5">
                  <a
                    href={telLink}
                    className="flex h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-gold-300 to-gold-600 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <a
                    href={whatsappLink(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center justify-center gap-2 rounded-md border border-royal-border text-sm font-semibold text-royal-fg transition-colors hover:border-gold-500/40 hover:text-gold-200"
                  >
                    <MessageCircle className="size-4 text-[#25d366]" aria-hidden="true" />
                    {t("whatsapp")}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>

      {/* SSS */}
      <FaqSection faqs={copy.faqs} showCta={false} />

      {/* İlgili hizmetler — iç linkleme SEO'nun temel taşı */}
      <section className="container-royal pb-20 lg:pb-28">
        <h2 className="underline-gold font-display text-xl font-bold text-royal-fg lg:text-2xl">
          {tServices("title")}
        </h2>
        <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <RevealItem as="li" key={item.id}>
              <Link
                href={{
                  pathname: "/hizmetler/[slug]",
                  params: { slug: item.slug[locale] },
                }}
                className="surface-royal surface-royal-hover group flex h-full flex-col rounded-lg p-5 transition-all duration-500"
              >
                <ServiceIcon
                  name={item.icon}
                  className="size-5 text-gold-500 transition-colors group-hover:text-gold-300"
                />
                <span className="mt-4 font-display text-[0.9375rem] font-bold text-royal-fg transition-colors group-hover:text-gold-100">
                  {item.copy[locale].name}
                </span>
                <span className="mt-1.5 flex-1 text-[0.8125rem] leading-snug text-royal-faint">
                  {item.copy[locale].tagline}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Link
          href="/hizmetler"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
        >
          {t("backToServices")}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </section>

      <JsonLd id="ld-service" data={buildServiceSchema(service, locale)} />
      <JsonLd id="ld-service-faq" data={buildFaqSchema(copy.faqs)} />
      <JsonLd
        id="ld-service-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: t("breadcrumbHome"), href: "/" },
            { name: tServices("title"), href: "/hizmetler" },
            {
              name: copy.name,
              href: {
                pathname: "/hizmetler/[slug]",
                params: { slug: service.slug[locale] },
              },
            },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-service-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
