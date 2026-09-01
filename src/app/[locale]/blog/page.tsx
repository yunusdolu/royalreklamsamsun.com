import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { sortedPosts } from "@/content/posts";
import { getServiceById } from "@/content/services";
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

  // En yeni yazı öne çıkar, kalanlar liste olarak devam eder
  const [featured, ...rest] = sortedPosts;

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
          <>
            {/* En yeni yazı — koyu, tam genişlikte öne çıkan blok */}
            {featured && (
              <Reveal>
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    params: { slug: featured.slug[locale] },
                  }}
                  className="group relative block overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-12"
                >
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                    {t("featured")}
                    <span className="text-white/25" aria-hidden="true">
                      /
                    </span>
                    <time dateTime={featured.published} className="text-white/45">
                      {format.dateTime(new Date(featured.published), "long")}
                    </time>
                    <span className="text-white/25" aria-hidden="true">
                      /
                    </span>
                    <span className="text-white/45">
                      {featured.readingMinutes} {t("readingTime")}
                    </span>
                  </span>

                  <h2 className="mt-6 max-w-3xl font-display text-2xl font-extrabold leading-tight text-white sm:text-[2.25rem]">
                    {featured.copy[locale].title}
                  </h2>

                  <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-white/60">
                    {featured.copy[locale].excerpt}
                  </p>

                  <span className="mt-8 inline-flex items-center rounded-full">
                    <span className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors duration-500 group-hover:bg-zinc-100">
                      {t("readPost")}
                    </span>
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold-500 text-black">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            )}

            {/* Kalan yazılar — çizgiyle ayrılmış editoryal satırlar */}
            <RevealGroup
              as="ul"
              className="mt-14 border-t border-black/[0.08]"
              stagger={0.04}
            >
              {rest.map((post) => {
                const copy = post.copy[locale];
                const topic = getServiceById(post.relatedServiceIds[0]);

                return (
                  <RevealItem as="li" key={post.id}>
                    <Link
                      href={{
                        pathname: "/blog/[slug]",
                        params: { slug: post.slug[locale] },
                      }}
                      className="group relative flex items-start gap-4 border-b border-black/[0.08] py-7 md:gap-10 md:py-8"
                    >
                      <span
                        className="absolute bottom-0 left-0 h-px w-0 bg-gold-500 transition-all duration-700 ease-out group-hover:w-full"
                        aria-hidden="true"
                      />

                      {/* Tarih sütunu */}
                      <span className="hidden w-32 shrink-0 pt-1.5 md:block">
                        <time
                          dateTime={post.published}
                          className="block text-[0.75rem] font-medium text-royal-fg"
                        >
                          {format.dateTime(new Date(post.published), "long")}
                        </time>
                        <span className="mt-1 block text-[0.75rem] text-royal-faint">
                          {post.readingMinutes} {t("readingTime")}
                        </span>
                      </span>

                      <span className="min-w-0 flex-1">
                        {topic && (
                          <span className="mb-2.5 inline-block rounded-full bg-black/[0.045] px-2.5 py-1 text-[0.6875rem] font-medium text-royal-muted">
                            {topic.copy[locale].shortName}
                          </span>
                        )}

                        <span className="block font-display text-[1.25rem] font-bold leading-snug text-royal-fg transition-transform duration-500 ease-out group-hover:translate-x-1.5 md:text-[1.5rem]">
                          {copy.title}
                        </span>

                        <span className="mt-2.5 block max-w-2xl text-[0.9375rem] leading-relaxed text-royal-muted">
                          {copy.excerpt}
                        </span>

                        {/* Tarih — mobilde başlığın altında */}
                        <span className="mt-3 block text-[0.75rem] text-royal-faint md:hidden">
                          <time dateTime={post.published}>
                            {format.dateTime(new Date(post.published), "long")}
                          </time>
                          {" · "}
                          {post.readingMinutes} {t("readingTime")}
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
          </>
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
