import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { LegalBody } from "@/components/sections/legal-body";
import { JsonLd } from "@/components/seo/json-ld";
import { legalDocs } from "@/content/legal";
import { type Locale, routing } from "@/i18n/routing";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const doc = legalDocs["gizlilik"];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = doc.copy[locale];

  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    alternates: buildAlternates("/gizlilik", locale),
    openGraph: buildOpenGraph({
      title: copy.metaTitle,
      description: copy.metaDescription,
      href: "/gizlilik",
      locale,
    }),
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = doc.copy[locale];
  const tCommon = await getTranslations("common");
  const tLegal = await getTranslations("legal");

  return (
    <>
      <PageHeader
        crumbs={[
          { name: tCommon("breadcrumbHome"), href: "/" },
          { name: copy.title },
        ]}
        title={copy.title}
        lead={copy.lead}
      />

      <section className="container-royal py-16 lg:py-20">
        <LegalBody copy={copy} updatedLabel={tLegal("updated")} />
      </section>

      <CtaSection />

      <JsonLd
        id="ld-gizlilik-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: copy.title, href: "/gizlilik" },
          ],
          locale,
        )}
      />
    </>
  );
}
