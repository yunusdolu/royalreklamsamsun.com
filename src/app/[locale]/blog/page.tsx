import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { sortedPosts } from "@/content/posts";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { buildBreadcrumbSchema, schemaIds } from "@/lib/schema";
import { buildAlternates, buildOpenGraph, localizedUrl } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/blog", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/blog",
      locale,
    }),
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blogPage");
  const tCommon = await getTranslations("common");
  const format = await getFormatter();

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
        {sortedPosts.length === 0 ? (
          <p className="text-center text-[0.9375rem] text-royal-faint">
            {t("empty")}
          </p>
        ) : (
          <RevealGroup as="ul" className="grid gap-4 lg:grid-cols-2" stagger={0.07}>
            {sortedPosts.map((post) => {
              const copy = post.copy[locale];
              return (
                <RevealItem as="li" key={post.id}>
                  <Link
                    href={{
                      pathname: "/blog/[slug]",
                      params: { slug: post.slug[locale] },
                    }}
                    className="surface-royal surface-royal-hover group flex h-full flex-col rounded-xl p-7 transition-all duration-500"
                  >
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-royal-faint">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" aria-hidden="true" />
                        <time dateTime={post.published}>
                          {format.dateTime(new Date(post.published), "long")}
                        </time>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" aria-hidden="true" />
                        {post.readingMinutes} {t("readingTime")}
                      </span>
                    </span>

                    <h2 className="mt-4 font-display text-xl font-bold leading-snug text-royal-fg transition-colors group-hover:text-gold-100">
                      {copy.title}
                    </h2>

                    <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-royal-muted">
                      {copy.excerpt}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-gold-400 transition-all group-hover:gap-2.5 group-hover:text-gold-200">
                      {tCommon("readMore")}
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}
      </section>

      <CtaSection />

      <JsonLd
        id="ld-blog-list"
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: t("title"),
          description: t("metaDescription"),
          publisher: { "@id": schemaIds.localBusiness },
          blogPost: sortedPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.copy[locale].title,
            datePublished: post.published,
            url: localizedUrl(
              { pathname: "/blog/[slug]", params: { slug: post.slug[locale] } },
              locale,
            ),
          })),
        }}
      />
      <JsonLd
        id="ld-blog-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/blog" },
          ],
          locale,
        )}
      />
    </>
  );
}
