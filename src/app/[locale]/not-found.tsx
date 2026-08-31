import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { LogoMark } from "@/components/layout/logo";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("notFound");
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");

  const suggestions = services.slice(0, 4);

  return (
    <section className="container-royal flex min-h-[60svh] flex-col justify-center py-24">
      <div className="max-w-2xl">
        <LogoMark size={56} className="opacity-70" />

        <p className="mt-8 font-display text-6xl font-extrabold text-gold-700/60 lg:text-7xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl text-royal-fg lg:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-royal-muted">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-gradient-to-b from-gold-300 to-gold-600 px-6 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
          >
            {tCommon("backHome")}
          </Link>
          <Link
            href="/hizmetler"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-gold-500/40 px-6 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-500/10"
          >
            {tNav("services")}
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-500">
            {t("suggestionsTitle")}
          </h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {suggestions.map((service) => (
              <li key={service.id}>
                <Link
                  href={{
                    pathname: "/hizmetler/[slug]",
                    params: { slug: service.slug[locale] },
                  }}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-royal-border px-4 py-3 text-[0.875rem] text-royal-muted transition-colors hover:border-gold-500/40 hover:text-gold-200"
                >
                  {service.copy[locale].name}
                  <ArrowUpRight
                    className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
