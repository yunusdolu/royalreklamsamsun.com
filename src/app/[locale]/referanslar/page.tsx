import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
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
  const t = await getTranslations({ locale, namespace: "portfolioPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/referanslar", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/referanslar",
      locale,
    }),
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("portfolioPage");
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
      />

      <section className="container-royal py-16 lg:py-20">
        <PortfolioGrid />
      </section>

      <CtaSection />

      <JsonLd
        id="ld-portfolio-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/referanslar" },
          ],
          locale,
        )}
      />
    </>
  );
}
