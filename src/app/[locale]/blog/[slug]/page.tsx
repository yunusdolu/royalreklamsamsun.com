import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { PostBody } from "@/components/sections/post-body";
import { JsonLd } from "@/components/seo/json-ld";
import { PillLink } from "@/components/ui/pill-button";
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
            {/* İlgili hizmetler — ikonsuz, çizgiyle ayrılmış satırlar */}
            {relatedServices.length > 0 && (
              <Reveal direction="left">
                <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                    {t("popularServices")}
                  </h2>
                  <ul className="mt-3 divide-y divide-black/[0.06]">
                    {relatedServices.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={{
                            pathname: "/hizmetler/[slug]",
                            params: { slug: service.slug[locale] },
                          }}
                          className="group flex items-center gap-3 py-3 text-[0.875rem] font-medium text-royal-fg transition-colors hover:text-gold-600"
                        >
                          <span
                            className="h-px w-3.5 shrink-0 bg-gold-600 transition-all duration-500 group-hover:w-6"
                            aria-hidden="true"
                          />
                          {service.copy[locale].shortName}
                          <ArrowUpRight
                            className="ml-auto size-4 text-royal-faint transition-all duration-500 group-hover:text-gold-600"
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
              <div className="overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-6">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {tBlog("title")}
                </span>
                <h2 className="mt-3 font-display text-lg font-bold text-white">
                  {t("quoteCtaTitle")}
                </h2>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-white/60">
                  {t("quoteCtaText")}
                </p>
                <PillLink
                  href="/teklif-al"
                  tone="onDark"
                  block
                  className="mt-6"
                >
                  {t("getQuote")}
                </PillLink>
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
          <RevealGroup as="ul" className="mt-8 border-t border-black/[0.08]">
            {otherPosts.map((item) => (
              <RevealItem as="li" key={item.id}>
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    params: { slug: item.slug[locale] },
                  }}
                  className="group relative flex items-start gap-4 border-b border-black/[0.08] py-6 md:gap-10"
                >
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 bg-gold-500 transition-all duration-700 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />

                  <span className="hidden w-32 shrink-0 pt-1 text-[0.75rem] text-royal-faint md:block">
                    <time dateTime={item.published}>
                      {format.dateTime(new Date(item.published), "long")}
                    </time>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.125rem] font-bold leading-snug text-royal-fg transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                      {item.copy[locale].title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-[0.875rem] leading-relaxed text-royal-muted">
                      {item.copy[locale].excerpt}
                    </span>
                  </span>

                  <span className="flex size-10 shrink-0 items-center justify-center self-center rounded-full bg-black/[0.045] text-royal-faint transition-all duration-500 group-hover:bg-black group-hover:text-white">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10">
            <PillLink href="/blog" tone="light">
              {t("backToBlog")}
            </PillLink>
          </div>
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
