import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { QuoteBuilder } from "@/components/sections/quote-builder";
import { JsonLd } from "@/components/seo/json-ld";
import { type Locale, routing } from "@/i18n/routing";
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
  const t = await getTranslations({ locale, namespace: "quotePage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/teklif-al", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/teklif-al",
      locale,
    }),
  };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("quotePage");
  const tCommon = await getTranslations("common");

  const steps = [t("steps.one"), t("steps.two"), t("steps.three")];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: tCommon("breadcrumbHome"), href: "/" },
          { name: t("title") },
        ]}
        title={t("title")}
        lead={t("lead")}
      >
        <RevealGroup as="ul" className="mt-9 grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => (
            <RevealItem
              as="li"
              key={step}
              className="flex items-center gap-3 rounded-lg border border-royal-border bg-royal-graphite/60 px-4 py-3.5"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold-500/35 font-display text-xs font-bold text-gold-300">
                {index + 1}
              </span>
              <span className="text-[0.875rem] font-medium text-royal-fg">
                {step}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageHeader>

      <section className="container-royal py-16 lg:py-20">
        <QuoteBuilder />
      </section>

      <JsonLd
        id="ld-quote-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/teklif-al" },
          ],
          locale,
        )}
      />
    </>
  );
}
