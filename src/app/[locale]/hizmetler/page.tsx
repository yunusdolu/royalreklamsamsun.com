import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceCard } from "@/components/ui/service-card";
import { services } from "@/content/services";
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
  const t = await getTranslations({ locale, namespace: "servicesPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/hizmetler", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/hizmetler",
      locale,
    }),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("servicesPage");
  const tCommon = await getTranslations("common");

  const crumbs = [
    { name: tCommon("breadcrumbHome"), href: "/" as const },
    { name: t("title") },
  ];

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title={t("title")}
        lead={t("lead")}
        answer={t("answer")}
      />

      <section className="container-royal py-16 lg:py-20">
        <RevealGroup
          as="ul"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.05}
        >
          {services.map((service) => (
            <RevealItem as="li" key={service.id}>
              <ServiceCard
                service={service}
                locale={locale}
                daysLabel={tCommon("days")}
                readMoreLabel={tCommon("readMore")}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CtaSection />

      <JsonLd
        id="ld-services-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/hizmetler" },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-services-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
