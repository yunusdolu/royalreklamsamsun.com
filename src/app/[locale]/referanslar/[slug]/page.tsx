import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { PillLink } from "@/components/ui/pill-button";
import { getProjectBySlug, projects } from "@/content/projects";
import { getServiceById } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { buildBreadcrumbSchema, schemaIds } from "@/lib/schema";
import { buildLocalizedAlternates, buildOpenGraph, localizedUrl } from "@/lib/seo";

type Params = { locale: Locale; slug: string };

/**
 * `projects` boşken bu rotanın hiçbir sayfası üretilmez ve tanımsız bir
 * slug istendiğinde 404 döner — `dynamicParams: false` bunu garanti eder.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale);
  if (!project) return {};

  const copy = project.copy[locale];

  return {
    title: copy.title,
    description: copy.summary,
    alternates: buildLocalizedAlternates(
      (l) => ({ pathname: "/referanslar/[slug]", params: { slug: project.slug[l] } }),
      locale,
    ),
    openGraph: buildOpenGraph({
      title: copy.title,
      description: copy.summary,
      href: {
        pathname: "/referanslar/[slug]",
        params: { slug: project.slug[locale] },
      },
      locale,
      images: [project.cover],
    }),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug, locale);
  if (!project) notFound();

  const copy = project.copy[locale];
  const service = getServiceById(project.serviceId);
  const t = await getTranslations("common");
  const tPortfolio = await getTranslations("portfolioPage");

  const images = [project.cover, ...(project.gallery ?? [])];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: t("breadcrumbHome"), href: "/" },
          { name: tPortfolio("title"), href: "/referanslar" },
          { name: copy.title },
        ]}
        eyebrow={service?.copy[locale].shortName}
        title={copy.title}
        lead={copy.summary}
      />

      <section className="container-royal py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="space-y-4">
                {images.map((src, index) => (
                  <div
                    key={src}
                    className="relative aspect-4/3 overflow-hidden rounded-2xl bg-royal-graphite shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                  >
                    <Image
                      src={src}
                      alt={`${copy.title} — ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="(min-width:1024px) 66vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 space-y-5">
                {copy.description.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[0.9375rem] leading-[1.75] text-royal-muted lg:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Proje künyesi — fotoğrafın yanında koyu plaka, altında teklif eylemi */}
          <aside className="lg:col-span-4">
            <Reveal direction="left">
              <div className="overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-6 lg:sticky lg:top-28">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {locale === "tr" ? "Proje künyesi" : "Project details"}
                </span>

                <dl className="mt-5 divide-y divide-white/10 text-[0.875rem]">
                  {copy.client && (
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="shrink-0 text-white/45">
                        {locale === "tr" ? "Müşteri" : "Client"}
                      </dt>
                      <dd className="text-right font-medium text-white">
                        {copy.client}
                      </dd>
                    </div>
                  )}
                  {service && (
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="shrink-0 text-white/45">
                        {locale === "tr" ? "Hizmet" : "Service"}
                      </dt>
                      <dd className="text-right">
                        <Link
                          href={{
                            pathname: "/hizmetler/[slug]",
                            params: { slug: service.slug[locale] },
                          }}
                          className="font-medium text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
                        >
                          {service.copy[locale].name}
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="shrink-0 text-white/45">
                      {locale === "tr" ? "Yıl" : "Year"}
                    </dt>
                    <dd className="text-right font-medium tabular-nums text-white">
                      {project.year}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                    {locale === "tr" ? "Kapsam" : "Scope"}
                  </span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {copy.scope.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white/[0.07] px-3 py-1 text-[0.75rem] text-white/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-[0.8125rem] leading-relaxed text-white/55">
                    {t("quoteCtaText")}
                  </p>
                  <PillLink
                    href="/teklif-al"
                    tone="onDark"
                    block
                    className="mt-4"
                  >
                    {t("getQuote")}
                  </PillLink>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="mt-12">
          <PillLink href="/referanslar" tone="light">
            {t("backToPortfolio")}
          </PillLink>
        </div>
      </section>

      <CtaSection />

      <JsonLd
        id="ld-project"
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: copy.title,
          description: copy.summary,
          dateCreated: String(project.year),
          creator: { "@id": schemaIds.localBusiness },
          image: images,
          url: localizedUrl(
            {
              pathname: "/referanslar/[slug]",
              params: { slug: project.slug[locale] },
            },
            locale,
          ),
        }}
      />
      <JsonLd
        id="ld-project-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: t("breadcrumbHome"), href: "/" },
            { name: tPortfolio("title"), href: "/referanslar" },
            {
              name: copy.title,
              href: {
                pathname: "/referanslar/[slug]",
                params: { slug: project.slug[locale] },
              },
            },
          ],
          locale,
        )}
      />
    </>
  );
}
