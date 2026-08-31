import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
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
                    className="relative aspect-4/3 overflow-hidden rounded-xl border border-gold-500/12 bg-royal-graphite"
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

          <aside className="lg:col-span-4">
            <Reveal direction="left">
              <div className="surface-royal rounded-xl p-6 lg:sticky lg:top-28">
                <dl className="space-y-4 text-[0.875rem]">
                  {copy.client && (
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                        {locale === "tr" ? "Müşteri" : "Client"}
                      </dt>
                      <dd className="mt-1 text-royal-fg">{copy.client}</dd>
                    </div>
                  )}
                  {service && (
                    <div>
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                        {locale === "tr" ? "Hizmet" : "Service"}
                      </dt>
                      <dd className="mt-1">
                        <Link
                          href={{
                            pathname: "/hizmetler/[slug]",
                            params: { slug: service.slug[locale] },
                          }}
                          className="text-gold-300 transition-colors hover:text-gold-200"
                        >
                          {service.copy[locale].name}
                        </Link>
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                      {locale === "tr" ? "Yıl" : "Year"}
                    </dt>
                    <dd className="mt-1 text-royal-fg tabular-nums">{project.year}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                      {locale === "tr" ? "Kapsam" : "Scope"}
                    </dt>
                    <dd className="mt-1.5 flex flex-wrap gap-1.5">
                      {copy.scope.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-royal-border px-2.5 py-1 text-[0.75rem] text-royal-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>

        <Link
          href="/referanslar"
          className="mt-12 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
        >
          {t("backToPortfolio")}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
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
