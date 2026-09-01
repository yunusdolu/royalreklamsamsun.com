import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { PillLink } from "@/components/ui/pill-button";
import { siteConfig } from "@/config/site";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildBreadcrumbSchema,
  buildSpeakableSchema,
  schemaIds,
} from "@/lib/schema";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
  const tNav = await getTranslations("nav");

  const story = t.raw("story") as string[];
  /** Ad ve soyadın baş harfleri — hayalet monogram için */
  const initials = siteConfig.team.artDirector
    .split(" ")
    .map((part) => part[0])
    .join("");
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
                {story.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    /* İlk paragraf giriş cümlesi gibi büyür — editoryal ritim */
                    className={
                      index === 0
                        ? "text-lg leading-[1.7] text-royal-fg lg:text-xl"
                        : "text-[0.9375rem] leading-[1.75] text-royal-muted lg:text-base"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Art direktör — çerçeveli avatar yerine dev hayalet monogram */}
          <div className="space-y-5 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal direction="left">
              <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-7 sm:p-8">
                <span
                  className="pointer-events-none absolute -top-8 right-2 font-display text-[8rem] font-black leading-none text-white/[0.045]"
                  aria-hidden="true"
                >
                  {initials}
                </span>

                <h2 className="relative text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-400">
                  {t("teamTitle")}
                </h2>

                <p className="relative mt-7 font-display text-2xl font-extrabold leading-tight text-white">
                  {siteConfig.team.artDirector}
                </p>
                <p className="relative mt-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-gold-500">
                  {tCommon("artDirector")}
                </p>

                <span
                  className="relative mt-6 block h-px w-10 bg-gold-500/70"
                  aria-hidden="true"
                />

                <p className="relative mt-6 text-[0.875rem] leading-relaxed text-white/60">
                  {t("artDirectorBio")}
                </p>
              </div>
            </Reveal>

            {/* Künye — çizgiyle ayrılmış satırlar, ikon yok */}
            <Reveal direction="left" delay={0.08}>
              <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                  {t("factsTitle")}
                </h2>

                <dl className="mt-4 divide-y divide-black/[0.06] text-[0.875rem]">
                  <div className="py-3">
                    <dt className="text-royal-faint">{t("workshopLabel")}</dt>
                    <dd className="mt-1 font-medium leading-relaxed text-royal-fg">
                      {siteConfig.address.full}
                    </dd>
                  </div>
                  <div className="py-3">
                    <dt className="text-royal-faint">
                      {t("serviceAreaLabel")}
                    </dt>
                    <dd className="mt-1 font-medium leading-relaxed text-royal-fg">
                      {siteConfig.serviceArea.scope[locale]}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="shrink-0 text-royal-faint">
                      {t("foundedLabel")}
                    </dt>
                    <dd className="font-medium tabular-nums text-royal-fg">
                      {siteConfig.foundingYear}
                    </dd>
                  </div>
                </dl>

                <PillLink href="/iletisim" tone="light" block className="mt-5">
                  {tNav("contact")}
                </PillLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/*
         * Çalışma prensipleri — dört ayrı kutu yerine tek koyu manifesto
         * levhası, içi ince çizgilerle dörde bölünmüş. İkon yok; sıra
         * numarası ve tipografi taşıyor.
         */}
        <div className="mt-20">
          <h2 className="underline-gold font-display text-2xl font-bold text-royal-fg">
            {t("valuesTitle")}
          </h2>

          <Reveal>
            <ul className="mt-10 grid overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] sm:grid-cols-2">
              {valueKeys.map((key, index) => (
                <li
                  key={key}
                  className={cn(
                    "group p-7 sm:p-9",
                    index > 0 && "border-t border-white/10 sm:border-t-0",
                    index % 2 === 0 && "sm:border-r sm:border-white/10",
                    index < 2 && "sm:border-b sm:border-white/10",
                  )}
                >
                  <span className="font-display text-[0.6875rem] font-bold tabular-nums text-gold-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    {t(`values.${key}.title`)}
                  </h3>

                  <span
                    className="mt-3.5 block h-px w-8 bg-gold-500/50 transition-all duration-500 group-hover:w-16"
                    aria-hidden="true"
                  />

                  <p className="mt-3.5 text-[0.875rem] leading-relaxed text-white/60">
                    {t(`values.${key}.description`)}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
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
