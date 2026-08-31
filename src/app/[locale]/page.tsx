import { setRequestLocale } from "next-intl/server";

import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { PortfolioTeaser } from "@/components/sections/portfolio-teaser";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { homeFaqs } from "@/content/faq";
import type { Locale } from "@/i18n/routing";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/schema";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesSection />
      <ProcessSection />
      <PortfolioTeaser />
      <FaqSection faqs={homeFaqs[locale]} />
      <CtaSection />

      <JsonLd id="ld-home-faq" data={buildFaqSchema(homeFaqs[locale])} />
      <JsonLd
        id="ld-home-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
