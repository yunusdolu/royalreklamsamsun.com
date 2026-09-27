import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Image from "next/image";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { QuoteBuilder } from "@/components/sections/quote-builder";
import { getServices } from "@/lib/content/services";
import { JsonLd } from "@/components/seo/json-ld";
import { type Locale, routing } from "@/i18n/routing";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";
import { getPageContent } from "@/lib/content/pages";

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

  /* Başlık bloğu panelden düzenlenebilir; boşsa koddaki metin gelir. */
  const page = await getPageContent("teklif-al", locale);

  const t = await getTranslations("quotePage");
  const tCommon = await getTranslations("common");

  const steps = [t("steps.one"), t("steps.two"), t("steps.three")];

  const crumbs = [
    { name: tCommon("breadcrumbHome"), href: "/" as const },
    { name: t("title") },
  ];

  return (
    <>
      {/*
        Bu sayfanın kahramanı diğer iç sayfalardan ayrı: ziyaretçi buraya
        teklif almak için geliyor, karşılaması da işin kendisini göstermeli.
        Fotoğraf Royal Reklam'ın kendi binasının cephesi — ne yaptığımızı
        anlatmanın en kısa yolu. Metin fotoğrafın üstünde durduğu için sol
        taraftan inen koyu geçiş şart; gökyüzü aydınlık ve beyaz yazı
        okunmazdı.
      */}
      <section className="border-b border-white/5 bg-royal-carbon">
        <div className="container-royal pt-28 pb-12 lg:pt-40 lg:pb-16">
          <Breadcrumbs items={crumbs} />

          <div className="relative mt-7 overflow-hidden rounded-3xl lg:mt-8">
            <Image
              src={page.image ?? "/images/hero/teklif-al.jpg"}
              alt={t("heroAlt")}
              fill
              priority
              sizes="(min-width: 1312px) 1248px, 100vw"
              className="object-cover"
              style={{ objectPosition: page.imageFocus ?? "72% center" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35"
            />

            <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
              <h1 className="max-w-xl font-display text-3xl leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]">
                {page.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 lg:text-lg">
                {page.lead}
              </p>

              <RevealGroup as="ul" className="mt-9 grid gap-5 sm:grid-cols-3 lg:max-w-2xl">
                {steps.map((step, index) => (
                  <RevealItem as="li" key={step}>
                    <div className="border-t-2 border-gold-500 pt-3.5">
                      <span className="font-display text-[0.75rem] font-bold tabular-nums text-gold-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] font-medium leading-snug text-white">
                        {step}
                      </span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 lg:max-w-2xl">
                {[
                  t("reassure.free"),
                  t("reassure.noSpam"),
                  t("reassure.fast"),
                ].map((line) => (
                  <li key={line}>
                    <span className="flex items-center gap-2 text-[0.8125rem] text-white/70">
                      <Check
                        className="size-3.5 shrink-0 text-gold-400"
                        aria-hidden="true"
                      />
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

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
