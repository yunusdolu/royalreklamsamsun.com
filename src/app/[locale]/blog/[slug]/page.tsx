import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { PostBody } from "@/components/sections/post-body";
import { JsonLd } from "@/components/seo/json-ld";
import { ServiceIcon } from "@/components/ui/service-icon";
import { siteConfig } from "@/config/site";
import { getPostBySlug, posts, sortedPosts } from "@/content/posts";
import { getServiceById } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildSpeakableSchema,
} from "@/lib/schema";
import { buildLocalizedAlternates, localizedUrl } from "@/lib/seo";

type Params = { locale: Locale; slug: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug[locale] })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  const copy = post.copy[locale];

  return {
    title: { absolute: copy.metaTitle },
    description: copy.metaDescription,
    keywords: copy.keywords,
    alternates: buildLocalizedAlternates(
      (l) => ({ pathname: "/blog/[slug]", params: { slug: post.slug[l] } }),
      locale,
    ),
    openGraph: {
      type: "article",
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: localizedUrl(
        { pathname: "/blog/[slug]", params: { slug: post.slug[locale] } },
        locale,
      ),
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const copy = post.copy[locale];
  const t = await getTranslations("common");
  const tBlog = await getTranslations("blogPage");
  const format = await getFormatter();

  const relatedServices = post.relatedServiceIds
    .map((id) => getServiceById(id))
    .filter((service) => service !== undefined);

  const otherPosts = sortedPosts.filter((item) => item.id !== post.id).slice(0, 2);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: t("breadcrumbHome"), href: "/" },
          { name: tBlog("title"), href: "/blog" },
          { name: copy.title },
        ]}
        title={copy.title}
        answer={copy.answer}
      >
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-royal-faint">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden="true" />
            {tBlog("publishedOn")}:{" "}
            <time dateTime={post.published}>
              {format.dateTime(new Date(post.published), "long")}
            </time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" />
            {post.readingMinutes} {tBlog("readingTime")}
          </span>
        </div>
      </PageHeader>

      <section className="container-royal grid gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <article className="lg:col-span-8">
          <Reveal>
            <PostBody blocks={copy.body} />
          </Reveal>
        </article>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            {relatedServices.length > 0 && (
              <Reveal direction="left">
                <div className="surface-royal rounded-xl p-6">
                  <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-500">
                    {t("popularServices")}
                  </h2>
                  <ul className="mt-4 space-y-1">
                    {relatedServices.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={{
                            pathname: "/hizmetler/[slug]",
                            params: { slug: service.slug[locale] },
                          }}
                          className="group flex items-center gap-3 rounded-md py-2.5 text-[0.875rem] text-royal-muted transition-colors hover:text-gold-200"
                        >
                          <ServiceIcon
                            name={service.icon}
                            className="size-4 shrink-0 text-gold-600"
                          />
                          {service.copy[locale].shortName}
                          <ArrowUpRight
                            className="ml-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <Reveal direction="left" delay={0.08}>
              <div className="rounded-xl border border-gold-500/25 bg-gradient-to-b from-gold-500/[0.07] to-transparent p-6">
                <h2 className="font-display text-base font-bold text-royal-fg">
                  {t("quoteCtaTitle")}
                </h2>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-royal-muted">
                  {t("quoteCtaText")}
                </p>
                <Link
                  href="/teklif-al"
                  className="mt-5 flex h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-b from-gold-300 to-gold-600 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
                >
                  {t("getQuote")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>

      {otherPosts.length > 0 && (
        <section className="container-royal pb-16 lg:pb-20">
          <h2 className="underline-gold font-display text-xl font-bold text-royal-fg lg:text-2xl">
            {tBlog("relatedTitle")}
          </h2>
          <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-2">
            {otherPosts.map((item) => (
              <RevealItem as="li" key={item.id}>
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    params: { slug: item.slug[locale] },
                  }}
                  className="surface-royal surface-royal-hover group flex h-full flex-col rounded-lg p-6 transition-all duration-500"
                >
                  <span className="font-display text-base font-bold leading-snug text-royal-fg transition-colors group-hover:text-gold-100">
                    {item.copy[locale].title}
                  </span>
                  <span className="mt-2.5 flex-1 text-[0.8125rem] leading-relaxed text-royal-muted">
                    {item.copy[locale].excerpt}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
          >
            {t("backToBlog")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </section>
      )}

      <CtaSection />

      <JsonLd
        id="ld-article"
        data={buildArticleSchema({
          title: copy.title,
          description: copy.metaDescription,
          slug: post.slug[locale],
          published: post.published,
          modified: post.updated,
          locale,
        })}
      />
      <JsonLd
        id="ld-article-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: t("breadcrumbHome"), href: "/" },
            { name: tBlog("title"), href: "/blog" },
            {
              name: copy.title,
              href: { pathname: "/blog/[slug]", params: { slug: post.slug[locale] } },
            },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-article-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1"])}
      />
    </>
  );
}
