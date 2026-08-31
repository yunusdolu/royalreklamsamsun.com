import { ArrowUpRight, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { additionalDistricts, regions } from "@/content/regions";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function RegionsStrip() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.regions");

  return (
    <section className="border-y border-white/5 bg-royal-carbon py-20 lg:py-28">
      <div className="container-royal">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <Link
            href="/bolgeler"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
          >
            {t("cta")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.05}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {regions.map((region) => (
            <RevealItem as="li" key={region.id}>
              <Link
                href={{
                  pathname: "/bolgeler/[slug]",
                  params: { slug: region.slug[locale] },
                }}
                className="group flex h-full flex-col justify-between rounded-lg border border-royal-border bg-royal-graphite p-4 transition-all duration-400 hover:border-gold-500/40 hover:bg-royal-surface"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-royal-fg transition-colors group-hover:text-gold-200">
                  <MapPin
                    className="size-3.5 shrink-0 text-gold-600"
                    aria-hidden="true"
                  />
                  {region.name[locale]}
                </span>
                <span className="mt-2 line-clamp-2 text-[0.6875rem] leading-snug text-royal-faint">
                  {region.copy[locale].character}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-[0.8125rem] text-royal-faint">
          <span className="font-semibold text-royal-muted">
            {t("othersLabel")}:
          </span>{" "}
          {additionalDistricts.join(" · ")}
        </p>
      </div>
    </section>
  );
}
