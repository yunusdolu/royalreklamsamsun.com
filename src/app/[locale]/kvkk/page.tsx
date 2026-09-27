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
import { getPageContent } from "@/lib/content/pages";

const doc = legalDocs["kvkk"];

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
    alternates: buildAlternates("/kvkk", locale),
    openGraph: buildOpenGraph({
      title: copy.metaTitle,
      description: copy.metaDescription,
      href: "/kvkk",
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

  /* Başlık bloğu panelden düzenlenebilir; boşsa koddaki metin gelir. */
  const page = await getPageContent("kvkk", locale);

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
        title={page.title}
        lead={page.lead}
        image={page.image}
        imagePosition={page.imageFocus}
      />

      <section className="container-royal py-16 lg:py-20">
        <LegalBody copy={copy} updatedLabel={tLegal("updated")} />
      </section>

      <CtaSection />

      <JsonLd
        id="ld-kvkk-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: copy.title, href: "/kvkk" },
          ],
          locale,
        )}
      />
    </>
  );
}
