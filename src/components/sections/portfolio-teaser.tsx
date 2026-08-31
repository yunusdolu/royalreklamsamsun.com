import { ArrowUpRight, Images } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { getServiceById } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/**
 * Referans teaser'ı.
 *
 * Gerçek proje fotoğrafı henüz yoksa uydurma referans göstermek yerine
 * dürüst bir "arşiv hazırlanıyor" bloğu ve Instagram bağlantısı sunulur.
 * `src/content/projects.ts` doldurulduğu anda bu bölüm otomatik olarak
 * galeri görünümüne geçer.
 */
export async function PortfolioTeaser() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.portfolio");
  const tPortfolio = await getTranslations("portfolioPage");

  const featured = projects.slice(0, 6);

  return (
    <section className="container-royal py-20 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        {featured.length > 0 && (
          <Link
            href="/referanslar"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
          >
            {t("cta")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      {featured.length > 0 ? (
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((project) => {
            const copy = project.copy[locale];
            const service = getServiceById(project.serviceId);
            return (
              <RevealItem as="li" key={project.id}>
                <Link
                  href={{
                    pathname: "/referanslar/[slug]",
                    params: { slug: project.slug[locale] },
                  }}
                  className="group relative block overflow-hidden rounded-xl border border-gold-500/12"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-royal-graphite">
                    <Image
                      src={project.cover}
                      alt={copy.title}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    {service && (
                      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-gold-400">
                        {service.copy[locale].shortName}
                      </p>
                    )}
                    <h3 className="mt-1.5 font-display text-base font-bold text-white">
                      {copy.title}
                    </h3>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      ) : (
        <Reveal className="mt-12">
          <div className="surface-royal grain relative overflow-hidden rounded-2xl px-6 py-14 text-center sm:px-12">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/[0.06] text-gold-400">
              <Images className="size-6" aria-hidden="true" />
            </span>
            <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-royal-muted">
              {tPortfolio("comingSoon")}
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-gold-500/40 px-5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-500/10"
              >
                <InstagramIcon className="size-4" aria-hidden="true" />
                {siteConfig.contact.instagramHandle}
              </a>
              <Link
                href="/teklif-al"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-gradient-to-b from-gold-300 to-gold-600 px-5 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
              >
                {t("cta")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
