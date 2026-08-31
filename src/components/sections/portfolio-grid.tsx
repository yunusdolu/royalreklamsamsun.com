"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Images } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";

import { InstagramIcon } from "@/components/ui/brand-icons";
import { siteConfig } from "@/config/site";
import { projects, projectServiceIds } from "@/content/projects";
import { getServiceById } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Filtrelenebilir referans galerisi.
 *
 * `src/content/projects.ts` boşken dürüst bir boş durum gösterilir; veri
 * eklendiği anda filtre çubuğu ve grid otomatik olarak devreye girer.
 * Filtre listesi sabit değil — yalnızca gerçekten projesi olan hizmetler
 * gösterilir, böylece hiç sonuç döndürmeyen filtre butonu oluşmaz.
 */
export function PortfolioGrid() {
  const locale = useLocale() as Locale;
  const t = useTranslations("portfolioPage");
  const [active, setActive] = useState<string>("all");

  const availableServices = useMemo(
    () =>
      projectServiceIds()
        .map((id) => getServiceById(id))
        .filter((service) => service !== undefined),
    [],
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.serviceId === active),
    [active],
  );

  if (projects.length === 0) {
    return (
      <div className="surface-royal grain relative overflow-hidden rounded-2xl px-6 py-16 text-center sm:px-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/[0.06] text-gold-400">
          <Images className="size-6" aria-hidden="true" />
        </span>
        <p className="mx-auto mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-royal-muted">
          {t("comingSoon")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
            className="inline-flex h-11 items-center rounded-md bg-gradient-to-b from-gold-300 to-gold-600 px-5 text-sm font-bold text-royal-ink transition-all hover:from-gold-200 hover:to-gold-500"
          >
            {t("title")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        role="group"
        aria-label={t("filterAll")}
        className="flex flex-wrap gap-2"
      >
        {[{ id: "all", label: t("filterAll") }, ...availableServices.map((s) => ({
          id: s.id,
          label: s.copy[locale].shortName,
        }))].map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setActive(option.id)}
            aria-pressed={active === option.id}
            className={cn(
              "rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors",
              active === option.id
                ? "border-gold-500/60 bg-gold-500/10 text-gold-200"
                : "border-royal-border text-royal-muted hover:border-gold-500/35 hover:text-royal-fg",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => {
            const copy = project.copy[locale];
            const service = getServiceById(project.serviceId);
            return (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
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
                    <h2 className="mt-1.5 font-display text-base font-bold text-white">
                      {copy.title}
                    </h2>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-[0.9375rem] text-royal-faint">
          {t("empty")}
        </p>
      )}
    </>
  );
}
