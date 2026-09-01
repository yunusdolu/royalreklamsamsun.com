import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { additionalDistricts, regions } from "@/content/regions";
import { getServiceById } from "@/content/services";
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
  const t = await getTranslations({ locale, namespace: "regionsPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/bolgeler", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/bolgeler",
      locale,
    }),
  };
}

export default async function RegionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("regionsPage");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHeader
        crumbs={[
          { name: tCommon("breadcrumbHome"), href: "/" },
          { name: t("title") },
        ]}
        title={t("title")}
        lead={t("lead")}
        answer={t("answer")}
      />

      {/*
       * Kart ızgarası yerine editoryal dizin: her ilçe tam genişlikte bir
       * satır. İsim büyük tipografiyle önde, ilçenin ticari karakteri ve o
       * bölgede en çok istenen hizmetler satırın içinde okunur.
       */}
      <section className="container-royal py-16 lg:py-20">
        <RevealGroup
          as="ul"
          className="border-t border-black/[0.08]"
          stagger={0.04}
        >
          {regions.map((region, index) => {
            const copy = region.copy[locale];
            const popular = region.popularServiceIds
              .map((id) => getServiceById(id))
              .filter((service) => service !== undefined);

            return (
              <RevealItem as="li" key={region.id}>
                <Link
                  href={{
                    pathname: "/bolgeler/[slug]",
                    params: { slug: region.slug[locale] },
                  }}
                  className="group relative flex items-start gap-4 border-b border-black/[0.08] py-7 md:gap-8 md:py-8"
                >
                  {/* Hover'da soldan sağa çizilen altın çizgi */}
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 bg-gold-500 transition-all duration-700 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />

                  <span className="w-7 shrink-0 pt-2 font-display text-[0.6875rem] font-bold tabular-nums text-royal-faint transition-colors duration-500 group-hover:text-gold-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Geniş ekranda isim ve açıklama yan yana, satır boydan boya dolu */}
                  <span className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:gap-12">
                    <span className="lg:w-[34%] lg:shrink-0">
                      <span className="block font-display text-[1.5rem] font-extrabold leading-tight text-royal-fg transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:text-[2rem]">
                        {region.name[locale]}
                      </span>

                      <span className="mt-3 flex flex-wrap gap-1.5">
                        {popular.map((service) => (
                          <span
                            key={service.id}
                            className="rounded-full bg-black/[0.045] px-2.5 py-1 text-[0.6875rem] font-medium text-royal-muted"
                          >
                            {service.copy[locale].shortName}
                          </span>
                        ))}
                      </span>
                    </span>

                    <span className="block flex-1 text-[0.9375rem] leading-relaxed text-royal-muted">
                      {copy.character}
                    </span>
                  </span>

                  <span className="flex size-10 shrink-0 items-center justify-center self-center rounded-full bg-black/[0.045] text-royal-faint transition-all duration-500 group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Ayrı sayfası olmayan ilçeler — koyu şerit */}
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-8 sm:p-10">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
              {t("otherDistricts")}
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-white/60">
              {t("otherDistrictsNote")}
            </p>
            <ul className="mt-7 flex flex-wrap items-center">
              {additionalDistricts.map((district) => (
                <li
                  key={district}
                  className="font-display text-lg font-bold text-white/85 after:ml-4 after:mr-4 after:text-gold-500/60 after:content-['•'] last:after:content-['']"
                >
                  {district}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <CtaSection />

      <JsonLd
        id="ld-regions-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/bolgeler" },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-regions-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
