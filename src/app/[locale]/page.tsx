import { Fragment } from "react";
import { setRequestLocale } from "next-intl/server";

import { CampaignStrip } from "@/components/sections/campaign-strip";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { PortfolioTeaser } from "@/components/sections/portfolio-teaser";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { homeFaqs } from "@/content/faq";
import type { Locale } from "@/i18n/routing";
import { getHeroSlides } from "@/lib/content/hero";
import { getHomeOrder, type HomeSectionKey } from "@/lib/content/home-layout";
import { buildFaqSchema, buildSpeakableSchema } from "@/lib/schema";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [heroSlides, order] = await Promise.all([getHeroSlides(locale), getHomeOrder()]);
  const heroFirst = order[0] === "hero";

  /*
    Bölümlerin sırası panelden ayarlanıyor (Anasayfa → Bölüm sırası);
    anahtarlar `HOME_SECTIONS` ile aynı. Yeni bölüm eklerken buraya da
    bir giriş eklenmeli — TypeScript eksik anahtarı derlemede yakalar.
  */
  const sections: Record<HomeSectionKey, React.ReactNode> = {
    hero: <Hero slides={heroSlides} first={heroFirst} />,
    marquee: <MarqueeStrip />,
    stats: <StatsBar />,
    /* Yayında kampanya yoksa hiçbir şey çizmez. */
    campaigns: <CampaignStrip />,
    services: <ServicesSection />,
    process: <ProcessSection />,
    portfolio: <PortfolioTeaser />,
    faq: <FaqSection faqs={homeFaqs[locale]} />,
    cta: <CtaSection />,
  };

  return (
    <>
      {/*
        Üst menü sabit ve saydam; sayfa en üstteyken büyük logo içeriğin
        üstünde duruyor. Slaytlar bu boşluğu kendi içinde bırakıyor; en üste
        başka bir bölüm alındıysa aynı boşluğu burada bırakıyoruz, yoksa
        bölümün başı logonun altında kalır.
      */}
      {!heroFirst && <div aria-hidden="true" className="h-20 lg:h-36" />}

      {order.map((key) => (
        <Fragment key={key}>{sections[key]}</Fragment>
      ))}

      <JsonLd id="ld-home-faq" data={buildFaqSchema(homeFaqs[locale])} />
      <JsonLd
        id="ld-home-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
