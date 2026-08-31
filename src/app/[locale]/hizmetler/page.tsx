import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceIcon } from "@/components/ui/service-icon";
import { services } from "@/content/services";
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
        <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2" stagger={0.06}>
          {services.map((service) => {
            const copy = service.copy[locale];
            return (
              <RevealItem as="li" key={service.id}>
                <Link
                  href={{
                    pathname: "/hizmetler/[slug]",
                    params: { slug: service.slug[locale] },
                  }}
                  className="surface-royal surface-royal-hover group flex h-full gap-5 rounded-xl p-6 transition-all duration-500 sm:p-7"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-gold-500/25 bg-gold-500/[0.06] text-gold-400 transition-all duration-500 group-hover:border-gold-500/60 group-hover:text-gold-200">
                    <ServiceIcon name={service.icon} className="size-5.5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-display text-lg font-bold text-royal-fg transition-colors group-hover:text-gold-100">
                        {copy.name}
                      </span>
                      <span className="text-[0.6875rem] font-medium text-royal-faint">
                        {tCommon("leadTime")}: {service.leadTimeDays[0]}–
                        {service.leadTimeDays[1]} {tCommon("days")}
                      </span>
                    </span>

                    <span className="mt-2.5 block text-[0.875rem] leading-relaxed text-royal-muted">
                      {copy.summary}
                    </span>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-gold-400 transition-all group-hover:gap-2.5 group-hover:text-gold-200">
                      {tCommon("readMore")}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
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
