import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { allFaqs, type FaqCategory } from "@/content/faq";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildSpeakableSchema,
} from "@/lib/schema";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

const CATEGORY_ORDER: FaqCategory[] = [
  "general",
  "pricing",
  "permits",
  "technical",
  "aftercare",
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/sss", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/sss",
      locale,
    }),
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("faqPage");
  const tCommon = await getTranslations("common");
  const faqs = allFaqs[locale];

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
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Kategori içindekiler — sayfa içi çapa bağlantıları */}
          <nav
            className="lg:col-span-3"
            aria-label={t("title")}
          >
            <ul className="lg:sticky lg:top-28 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {CATEGORY_ORDER.map((category) => (
                <li key={category}>
                  <a
                    href={`#${category}`}
                    className="inline-block rounded-md border border-royal-border px-3.5 py-2 text-[0.8125rem] font-medium text-royal-muted transition-colors hover:border-gold-500/40 hover:text-gold-200 lg:w-full lg:border-0 lg:border-l-2 lg:border-l-transparent lg:px-3 lg:hover:border-l-gold-500"
                  >
                    {t(`categories.${category}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-9">
            {CATEGORY_ORDER.map((category) => {
              const items = faqs.filter((faq) => faq.category === category);
              if (items.length === 0) return null;

              return (
                <div
                  key={category}
                  id={category}
                  className="mb-12 scroll-mt-32 last:mb-0"
                >
                  <h2 className="underline-gold font-display text-xl font-bold text-royal-fg">
                    {t(`categories.${category}`)}
                  </h2>

                  <Reveal>
                    <Accordion type="single" collapsible className="mt-6 w-full">
                      {items.map((faq, index) => (
                        <AccordionItem
                          key={faq.q}
                          value={`${category}-${index}`}
                          className="border-b border-white/8"
                        >
                          <AccordionTrigger className="py-5 text-left font-display text-[0.9375rem] font-semibold text-royal-fg hover:text-gold-200 hover:no-underline sm:text-base [&[data-state=open]]:text-gold-200">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="pb-6 text-[0.875rem] leading-relaxed text-royal-muted sm:text-[0.9375rem]">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />

      <JsonLd id="ld-faq-page" data={buildFaqSchema(faqs)} />
      <JsonLd
        id="ld-faq-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/sss" },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-faq-speakable"
        data={buildSpeakableSchema(["h1", "[data-radix-collection-item]"])}
      />
    </>
  );
}
