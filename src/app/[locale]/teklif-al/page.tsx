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
        {/* Adımlar — çerçeveli rakam yerine üstte altın çizgi + numara */}
        <RevealGroup as="ul" className="mt-9 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <RevealItem as="li" key={step}>
              <span className="block h-px w-full bg-black/10" aria-hidden="true">
                <span className="block h-px w-10 bg-gold-500" />
              </span>
              <span className="mt-4 block font-display text-[0.6875rem] font-bold tabular-nums text-gold-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-1.5 block text-[0.9375rem] font-medium text-royal-fg">
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
