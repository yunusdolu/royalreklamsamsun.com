import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { ServiceCampaigns } from "@/components/sections/service-campaigns";
import { ServiceExplorer } from "@/components/sections/service-explorer";
import { JsonLd } from "@/components/seo/json-ld";
import { PillLink } from "@/components/ui/pill-button";
import { ServiceCard } from "@/components/ui/service-card";
import { services } from "@/content/services";
import { getCampaignsForService } from "@/lib/content/campaigns";
import { getServiceBySlugAsync, getServices } from "@/lib/content/services";
import { type Locale, routing } from "@/i18n/routing";
import { withExistingImages } from "@/lib/variant-images";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildSpeakableSchema,
} from "@/lib/schema";
import {
  buildLocalizedAlternates,
  buildOpenGraph,
  clampDescription,
} from "@/lib/seo";

type Params = { locale: Locale; slug: string };

/**
 * Her dil için ayrı slug üretilir:
 *   /hizmetler/kutu-harf-tabela
 *   /en/services/channel-letter-signs
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlugAsync(slug, locale);
  if (!service) return {};

  const copy = service.copy[locale];
  const href = {
    pathname: "/hizmetler/[slug]" as const,
    params: { slug: service.slug[locale] },
  };

  return {
    // metaTitle zaten marka adını içeriyor; şablonun tekrar eklemesini engelle
    title: { absolute: copy.metaTitle },
    description: clampDescription(copy.metaDescription),
    keywords: copy.keywords,
    alternates: buildLocalizedAlternates(
      (l) => ({
        pathname: "/hizmetler/[slug]",
        params: { slug: service.slug[l] },
      }),
      locale,
    ),
    openGraph: buildOpenGraph({
      title: copy.metaTitle,
      description: copy.metaDescription,
      href,
      locale,
    }),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = await getServiceBySlugAsync(slug, locale);
  if (!service) notFound();

  const copy = service.copy[locale];
  const t = await getTranslations("common");
  const tServices = await getTranslations("servicesPage");

  const [allServices, campaigns] = await Promise.all([
    getServices(),
    getCampaignsForService(service.id, locale),
  ]);
  const related = allServices
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  const crumbs = [
    { name: t("breadcrumbHome"), href: "/" as const },
    { name: tServices("title"), href: "/hizmetler" as const },
    { name: copy.shortName },
  ];

  return (
    <>
      {/* Başlıkta tek çağrı var: teklif. WhatsApp ve teslim süresi yan
          panelde zaten duruyor, burada tekrar etmeleri asıl butonun
          ağırlığını düşürüyordu. */}
      <PageHeader
        crumbs={crumbs}
        title={copy.name}
        lead={copy.summary}
        image={service.heroImage || service.image}
        imagePosition={service.heroFocus}
      >
        <PillLink href="/teklif-al" tone="onDark">{t("getQuote")}</PillLink>
      </PageHeader>

      <ServiceCampaigns campaigns={campaigns} locale={locale} />

      {/*
        Çeşitler ve ayrıntılar tek bileşende: ziyaretçinin ilk sorusu "hangi
        tipini yapıyorsunuz" oluyor, cevabı seçtiği çeşide göre veriliyor —
        teknik tablo, öne çıkanlar ve "kimler için uygun" o çeşide göre
        değişiyor. Başlık hizmet adıyla kurulur ("Kutu Harf Çeşitleri");
        aranan uzun kuyruk ifadeye de böyle denk gelir.
      */}
      <ServiceExplorer
        copy={copy}
        variants={withExistingImages(copy.variants)}
        fallbackImage={service.image}
        leadTimeDays={service.leadTimeDays}
      />

      {/* SSS */}
      <FaqSection faqs={copy.faqs} showCta={false} />

      {/* İlgili hizmetler — iç linkleme SEO'nun temel taşı.
          Sayfa üç beyaz bölümle üst üste bitiyordu; kapanışa ayrı bir zemin
          vermek bölümlerin birbirine akmasını engelliyor. */}
      <section className="bg-royal-graphite/60 py-20 lg:py-28">
        <div className="container-royal">
          <h2 className="font-display text-xl font-bold text-royal-fg lg:text-2xl">
            {tServices("title")}
          </h2>
          <RevealGroup as="ul" className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <RevealItem as="li" key={item.id}>
                <ServiceCard
                  service={item}
                  locale={locale}
                  daysLabel={t("days")}
                  readMoreLabel={t("readMore")}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10">
            <PillLink href="/hizmetler" tone="light">
              {t("backToServices")}
            </PillLink>
          </div>
        </div>
      </section>

      <JsonLd id="ld-service" data={buildServiceSchema(service, locale)} />
      <JsonLd id="ld-service-faq" data={buildFaqSchema(copy.faqs)} />
      <JsonLd
        id="ld-service-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: t("breadcrumbHome"), href: "/" },
            { name: tServices("title"), href: "/hizmetler" },
            {
              name: copy.name,
              href: {
                pathname: "/hizmetler/[slug]",
                params: { slug: service.slug[locale] },
              },
            },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-service-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
