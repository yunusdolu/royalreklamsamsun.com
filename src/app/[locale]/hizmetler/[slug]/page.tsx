import { MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { ServiceVariants } from "@/components/sections/service-variants";
import { JsonLd } from "@/components/seo/json-ld";
import { PillAnchor, PillLink } from "@/components/ui/pill-button";
import { ServiceCard } from "@/components/ui/service-card";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { services } from "@/content/services";
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

  const related = (await getServices())
    .filter((item) => item.id !== service.id)
    .slice(0, 3);

  const crumbs = [
    { name: t("breadcrumbHome"), href: "/" as const },
    { name: tServices("title"), href: "/hizmetler" as const },
    { name: copy.shortName },
  ];

  const whatsappMessage = tServices("whatsappPrefill", { service: copy.name });

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
        <PillLink href="/teklif-al">{t("getQuote")}</PillLink>
      </PageHeader>

      {/*
        Çeşitler — "kutu harf" içindeki "fileli krom harf" gibi alt türler.
        Sayfanın başında duruyor: ziyaretçinin ilk sorusu "hangi tipini
        yapıyorsunuz" oluyor. Başlık hizmet adıyla kurulur ("Tabela
        Çeşitleri"); aranan uzun kuyruk ifadeye de böyle denk gelir.
      */}
      <ServiceVariants
        title={t("variantsTitle", { service: copy.shortName })}
        variants={withExistingImages(copy.variants)}
        fallbackImage={service.image}
      />

      {/* Gövde metni + yan panel */}
      <section className="container-royal grid gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        {/*
          `min-w-0` şart: grid öğeleri varsayılan olarak `min-width: auto`
          taşır, yani içindeki en geniş öğenin altına inemezler. Teknik
          özellik tablosunun `min-w-[26rem]` değeri bu yüzden kolonu 390px
          ekranda 466px'e şişiriyor ve metin kırpılıyordu. Sıfırlanınca kolon
          ekrana uyuyor, tablo da kendi kutusunda yatay kayıyor.
        */}
        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          {/*
            Hizmetin tanımı. Başlık bloğu anasayfa kurgusuna geçince oradan
            çıktı; sayfanın ilk paragrafı olarak burada duruyor. Dil
            modellerinin alıntıladığı metin bu, o yüzden `data-speakable`
            ve vurgulu biçim korundu.
          */}
          <Reveal>
            <p
              data-speakable
              className="border-l-2 border-gold-500/60 py-1 pl-5 text-base leading-relaxed text-royal-fg/90 lg:text-lg"
            >
              {copy.answer}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 space-y-5">
              {copy.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[0.9375rem] leading-[1.75] text-royal-muted lg:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Öne çıkanlar */}
          <div className="mt-14">
            <h2 className="font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("highlightsTitle")}
            </h2>
            {/* Numaralı editoryal kartlar — çerçeveli ikon yerine hayalet rakam */}
            <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.highlights.map((highlight, index) => (
                <RevealItem
                  as="li"
                  key={highlight.title}
                  className="group relative overflow-hidden rounded-2xl bg-royal-graphite/70 p-6 transition-colors duration-500 hover:bg-royal-graphite"
                >
                  <span
                    className="pointer-events-none absolute -top-5 right-1 font-display text-[4.5rem] font-black leading-none text-black/[0.045] transition-colors duration-500 group-hover:text-gold-600/20"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="relative font-display text-[0.9375rem] font-bold text-royal-fg">
                    {highlight.title}
                  </h3>
                  <span
                    className="relative mt-3 block h-px w-8 bg-gold-600/70 transition-all duration-500 group-hover:w-14"
                    aria-hidden="true"
                  />
                  <p className="relative mt-3 text-[0.875rem] leading-relaxed text-royal-muted">
                    {highlight.description}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Teknik özellikler — LLM'lerin alıntılaması için tablo */}
          <div className="mt-14">
            <h2 className="font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("specsTitle")}
            </h2>
            {/* Tablo çıplak satırlar hâlinde sayfada yüzüyordu; hafif bir
                yüzey onu bir blok hâline getiriyor. */}
            <Reveal>
              {/*
                Dar ekranda satırlar bloka dönüp etiket/değer alt alta gelir;
                `min-w-[26rem]` ile yatay kaydırmaya zorlamak hem taşmaya hem
                okunmayan bir tabloya yol açıyordu. `sm` ve üstünde normal
                tabloya döner. Tablo etiketleri korunuyor — yapılandırılmış
                veri hem erişilebilirlik hem arama motorları için değerli.
              */}
              <div className="mt-8 rounded-2xl border border-black/[0.06] bg-royal-graphite/60 px-5 py-1 sm:px-6 sm:py-2">
                <table className="w-full border-collapse text-left text-[0.875rem]">
                  <tbody>
                    {copy.specs.map((spec) => (
                      <tr
                        key={spec.label}
                        className="block border-b border-black/[0.07] py-3.5 last:border-0 sm:table-row sm:py-0"
                      >
                        <th
                          scope="row"
                          className="block pb-1 align-top text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-royal-faint sm:table-cell sm:w-2/5 sm:py-4 sm:pr-6 sm:pb-4"
                        >
                          {spec.label}
                        </th>
                        <td className="block align-top font-medium text-royal-fg sm:table-cell sm:py-4">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          {/* Fiyatı belirleyen etkenler */}
          <div className="mt-14">
            <h2 className="font-display text-xl font-bold text-royal-fg lg:text-2xl">
              {t("priceTitle")}
            </h2>
            <RevealGroup as="ul" className="mt-8" stagger={0.05}>
              {copy.priceFactors.map((factor, index) => (
                <RevealItem
                  as="li"
                  key={factor}
                  className="flex gap-5 border-b border-black/[0.06] py-3.5 last:border-0"
                >
                  <span
                    className="shrink-0 pt-0.5 font-display text-[0.75rem] font-bold tabular-nums text-gold-600"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-royal-muted">
                    {factor}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Yan panel */}
        <aside className="min-w-0 lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Kimler için uygun — ikon yerine altın çizgi işaretleri */}
            <Reveal direction="left">
              <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                  {t("useCasesTitle")}
                </h2>
                <ul className="mt-4 divide-y divide-black/[0.06]">
                  {copy.useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-baseline gap-3.5 py-2.5 text-[0.875rem] leading-snug text-royal-fg"
                    >
                      <span
                        className="h-px w-3.5 shrink-0 translate-y-[-0.3rem] bg-gold-600"
                        aria-hidden="true"
                      />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Teklif kutusu — açık sayfada koyu panel, kontrast için */}
            <Reveal direction="left" delay={0.08}>
              <div className="overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-6">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {t("leadTime")}: {service.leadTimeDays[0]}–
                  {service.leadTimeDays[1]} {t("days")}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold text-white">
                  {t("quoteCtaTitle")}
                </h2>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-white/60">
                  {t("quoteCtaText")}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <PillAnchor
                    href={telLink}
                    external={false}
                    tone="onDark"
                    icon={Phone}
                    block
                  >
                    {siteConfig.contact.phoneDisplay}
                  </PillAnchor>
                  <a
                    href={whatsappLink(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 text-[0.8125rem] font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    <MessageCircle
                      className="size-4 text-[#25d366]"
                      aria-hidden="true"
                    />
                    {t("whatsapp")}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>

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
