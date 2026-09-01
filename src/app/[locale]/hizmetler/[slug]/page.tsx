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
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { getServiceBySlug, services } from "@/content/services";
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

  const whatsappMessage = tServices("whatsappPrefill", { service: copy.name });

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        eyebrow={copy.tagline}
        title={copy.name}
        answer={copy.answer}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PillLink href="/teklif-al">{t("getQuote")}</PillLink>
          <PillAnchor
            href={whatsappLink(whatsappMessage)}
            tone="light"
            icon={MessageCircle}
          >
            {t("whatsapp")}
          </PillAnchor>
          <span className="ml-1 text-[0.75rem] text-royal-faint">
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
            {/* Numaralı editoryal kartlar — çerçeveli ikon yerine hayalet rakam */}
            <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.highlights.map((highlight, index) => (
                <RevealItem
                  as="li"
                  key={highlight.title}
                  className="group relative overflow-hidden rounded-2xl bg-royal-graphite/70 p-6 transition-colors duration-500 hover:bg-royal-graphite"
                >
                  <span
                    className="pointer-events-none absolute -top-5 right-1 font-display text-[4.5rem] font-black leading-none text-black/[0.045] transition-colors duration-500 group-hover:text-gold-600/20"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="relative font-display text-[0.9375rem] font-bold text-royal-fg">
                    {highlight.title}
                  </h3>
                  <span
                    className="relative mt-3 block h-px w-8 bg-gold-600/70 transition-all duration-500 group-hover:w-14"
                    aria-hidden="true"
                  />
                  <p className="relative mt-3 text-[0.875rem] leading-relaxed text-royal-muted">
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
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[26rem] border-collapse text-left text-[0.875rem]">
                  <tbody>
                    {copy.specs.map((spec) => (
                      <tr
                        key={spec.label}
                        className="border-b border-black/[0.07] last:border-0"
                      >
                        <th
                          scope="row"
                          className="w-2/5 py-4 pr-6 align-top text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-royal-faint"
                        >
                          {spec.label}
                        </th>
                        <td className="py-4 align-top font-medium text-royal-fg">
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
            <RevealGroup as="ul" className="mt-8" stagger={0.05}>
              {copy.priceFactors.map((factor, index) => (
                <RevealItem
                  as="li"
                  key={factor}
                  className="flex gap-5 border-b border-black/[0.06] py-3.5 last:border-0"
                >
                  <span
                    className="shrink-0 pt-0.5 font-display text-[0.75rem] font-bold tabular-nums text-gold-600"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-royal-muted">
                    {factor}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Yan panel */}
        <aside className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Kimler için uygun — ikon yerine altın çizgi işaretleri */}
            <Reveal direction="left">
              <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                  {t("useCasesTitle")}
                </h2>
                <ul className="mt-4 divide-y divide-black/[0.06]">
                  {copy.useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-baseline gap-3.5 py-2.5 text-[0.875rem] leading-snug text-royal-fg"
                    >
                      <span
                        className="h-px w-3.5 shrink-0 translate-y-[-0.3rem] bg-gold-600"
                        aria-hidden="true"
                      />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Teklif kutusu — açık sayfada koyu panel, kontrast için */}
            <Reveal direction="left" delay={0.08}>
              <div className="overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-6">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {t("leadTime")}: {service.leadTimeDays[0]}–
                  {service.leadTimeDays[1]} {t("days")}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold text-white">
                  {t("quoteCtaTitle")}
                </h2>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-white/60">
                  {t("quoteCtaText")}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <PillAnchor
                    href={telLink}
                    external={false}
                    tone="onDark"
                    icon={Phone}
                    block
                  >
                    {siteConfig.contact.phoneDisplay}
                  </PillAnchor>
                  <a
                    href={whatsappLink(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 text-[0.8125rem] font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    <MessageCircle
                      className="size-4 text-[#25d366]"
                      aria-hidden="true"
                    />
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
        <RevealGroup as="ul" className="mt-8 grid gap-5 sm:grid-cols-3">
          {related.map((item) => (
            <RevealItem as="li" key={item.id}>
              <ServiceCard
                service={item}
                locale={locale}
                daysLabel={t("days")}
                readMoreLabel={t("readMore")}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10">
          <PillLink href="/hizmetler" tone="light">
            {t("backToServices")}
          </PillLink>
        </div>
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
