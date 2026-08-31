import { Clock, FileCheck, Layers, LifeBuoy } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildBreadcrumbSchema,
  buildSpeakableSchema,
  schemaIds,
} from "@/lib/schema";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const VALUE_ICONS = {
  honesty: FileCheck,
  material: Layers,
  schedule: Clock,
  aftercare: LifeBuoy,
} as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/hakkimizda", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/hakkimizda",
      locale,
    }),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");
  const tCommon = await getTranslations("common");

  const story = t.raw("story") as string[];
  const valueKeys = ["honesty", "material", "schedule", "aftercare"] as const;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": schemaIds.founder,
    name: siteConfig.team.artDirector,
    jobTitle: locale === "tr" ? "Art Direktör" : "Art Director",
    worksFor: { "@id": schemaIds.localBusiness },
    description: t("artDirectorBio"),
  };

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

      <StatsBar />

      <section className="container-royal py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="underline-gold font-display text-2xl font-bold text-royal-fg">
              {t("storyTitle")}
            </h2>
            <Reveal>
              <div className="mt-8 space-y-5">
                {story.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[0.9375rem] leading-[1.75] text-royal-muted lg:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Art direktör kartı */}
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <div className="surface-royal grain relative overflow-hidden rounded-xl p-7">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-500">
                  {t("teamTitle")}
                </h2>

                <div className="mt-6 flex items-center gap-4">
                  <span
                    className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold-500/35 bg-gold-500/[0.08] font-display text-lg font-bold text-gold-300"
                    aria-hidden="true"
                  >
                    İB
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold text-royal-fg">
                      {siteConfig.team.artDirector}
                    </p>
                    <p className="text-[0.8125rem] text-gold-400">
                      {tCommon("artDirector")}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-[0.875rem] leading-relaxed text-royal-muted">
                  {t("artDirectorBio")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Çalışma prensipleri */}
        <div className="mt-20">
          <h2 className="underline-gold font-display text-2xl font-bold text-royal-fg">
            {t("valuesTitle")}
          </h2>
          <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-2">
            {valueKeys.map((key) => {
              const Icon = VALUE_ICONS[key];
              return (
                <RevealItem
                  as="li"
                  key={key}
                  className="surface-royal group rounded-xl p-6 sm:p-7"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-lg border border-gold-500/25 bg-gold-500/[0.06] text-gold-400 transition-colors duration-500 group-hover:border-gold-500/55 group-hover:text-gold-200">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-royal-fg">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-royal-muted">
                    {t(`values.${key}.description`)}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CtaSection />

      <JsonLd id="ld-about-person" data={personSchema} />
      <JsonLd
        id="ld-about-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/hakkimizda" },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-about-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
