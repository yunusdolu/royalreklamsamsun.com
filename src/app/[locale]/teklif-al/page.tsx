import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { QuoteBuilder } from "@/components/sections/quote-builder";
import { getServices } from "@/lib/content/services";
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
        <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => (
            <RevealItem as="li" key={step}>
              <div className="flex h-full items-start gap-3.5 rounded-2xl border border-black/[0.07] bg-white/70 p-4 backdrop-blur-sm">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-royal-fg text-[0.75rem] font-bold tabular-nums text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-[0.9375rem] font-medium leading-snug text-royal-fg">
                  {step}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup as="ul" className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {[t("reassure.free"), t("reassure.noSpam"), t("reassure.fast")].map(
            (line) => (
              <RevealItem as="li" key={line}>
                <span className="flex items-center gap-2 text-[0.8125rem] text-royal-muted">
                  <Check className="size-3.5 shrink-0 text-gold-600" aria-hidden="true" />
                  {line}
                </span>
              </RevealItem>
            ),
          )}
        </RevealGroup>
      </PageHeader>

      <section className="container-royal py-16 lg:py-20">
        <QuoteBuilder services={await getServices()} />
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
