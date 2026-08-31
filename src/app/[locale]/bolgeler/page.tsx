import { ArrowUpRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { additionalDistricts, regions } from "@/content/regions";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { buildBreadcrumbSchema, buildSpeakableSchema } from "@/lib/schema";
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
  const t = await getTranslations({ locale, namespace: "regionsPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/bolgeler", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/bolgeler",
      locale,
    }),
  };
}

export default async function RegionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("regionsPage");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader
        crumbs={[
          { name: tCommon("breadcrumbHome"), href: "/" },
          { name: t("title") },
        ]}
        title={t("title")}
        lead={t("lead")}
        answer={t("answer")}
      />

      <section className="container-royal py-16 lg:py-20">
        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2" stagger={0.06}>
          {regions.map((region) => {
            const copy = region.copy[locale];
            return (
              <RevealItem as="li" key={region.id}>
                <Link
                  href={{
                    pathname: "/bolgeler/[slug]",
                    params: { slug: region.slug[locale] },
                  }}
                  className="surface-royal surface-royal-hover group flex h-full flex-col rounded-xl p-6 transition-all duration-500 sm:p-7"
                >
                  <span className="flex items-center gap-2.5">
                    <MapPin
                      className="size-4 text-gold-500 transition-colors group-hover:text-gold-300"
                      aria-hidden="true"
                    />
                    <span className="font-display text-lg font-bold text-royal-fg transition-colors group-hover:text-gold-100">
                      {region.name[locale]}
                    </span>
                  </span>

                  <span className="mt-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-600">
                    {copy.character}
                  </span>

                  <span className="mt-3.5 block flex-1 text-[0.875rem] leading-relaxed text-royal-muted">
                    {copy.answer}
                  </span>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-gold-400 transition-all group-hover:gap-2.5 group-hover:text-gold-200">
                    {tCommon("readMore")}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal>
          <div className="surface-royal mt-10 rounded-xl p-6 sm:p-7">
            <h2 className="font-display text-base font-bold text-royal-fg">
              {t("otherDistricts")}
            </h2>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-royal-muted">
              {t("otherDistrictsNote")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {additionalDistricts.map((district) => (
                <li
                  key={district}
                  className="rounded-full border border-royal-border px-3.5 py-1.5 text-[0.8125rem] text-royal-muted"
                >
                  {district}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaSection />

      <JsonLd
        id="ld-regions-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/bolgeler" },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-regions-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
