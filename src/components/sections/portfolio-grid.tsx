"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { refreshScroll } from "@/components/motion/smooth-scroll-provider";
import { PillAnchor, PillLink } from "@/components/ui/pill-button";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import { getServiceById, services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

/**
 * Filtrelenebilir referans galerisi.
 *
 * Filtre çubuğu hizmet listesinin tamamını gösterir; her butonda o
 * kategorideki iş sayısı yazar ve fotoğrafı olmayan kategoriler pasif
 * kalır — böylece hem tüm hizmetler görünür olur hem de boş sonuç dönen
 * bir filtreye tıklanamaz.
 */
export function PortfolioGrid() {
  const locale = useLocale() as Locale;
  const t = useTranslations("portfolioPage");
  const [active, setActive] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const project of projects) {
      map.set(project.serviceId, (map.get(project.serviceId) ?? 0) + 1);
    }
    return map;
  }, []);

  const filters = useMemo(
    () => [
      { id: "all", label: t("filterAll"), count: projects.length },
      ...services.map((service) => ({
        id: service.id,
        label: service.copy[locale].shortName,
        count: counts.get(service.id) ?? 0,
      })),
    ],
    [counts, locale, t],
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.serviceId === active),
    [active],
  );

  const handleFilterChange = (id: string) => {
    setActive(id);
    setVisibleCount(PAGE_SIZE);
  };

  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  /*
   * Kart sayısı değiştiğinde sayfa boyu da değişir. Yumuşak kaydırma
   * kaydırma sınırını önbelleğe aldığı için tazelenmezse kullanıcı yeni
   * eklenen kartlara inemez, kaydırma eski sınıra geri çekilir.
   */
  useEffect(() => {
    refreshScroll();
  }, [visibleCount, active]);

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] px-6 py-16 text-center sm:px-12">
        <p className="mx-auto max-w-xl text-[0.9375rem] leading-relaxed text-white/60">
          {t("comingSoon")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PillLink href="/teklif-al" tone="onDark">
            {t("title")}
          </PillLink>
          <PillAnchor href={siteConfig.contact.instagram} tone="onDark">
            {siteConfig.contact.instagramHandle}
          </PillAnchor>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Filtre çubuğu — mobilde tek satır kaydırılır, masaüstünde sarar */}
      <div
        role="group"
        aria-label={t("title")}
        className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {filters.map((option) => {
          const isActive = active === option.id;
          const isEmpty = option.count === 0;

          return (
            <button
              key={option.id}
              type="button"
              disabled={isEmpty}
              onClick={() => handleFilterChange(option.id)}
              aria-pressed={isActive}
              title={isEmpty ? t("noProjectsYet") : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[0.8125rem] font-semibold transition-all duration-300",
                isEmpty
                  ? "cursor-not-allowed border border-black/[0.06] text-royal-faint/60"
                  : isActive
                    ? "bg-black text-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.9)]"
                    : "border border-black/[0.09] text-royal-muted hover:border-black/25 hover:text-royal-fg",
              )}
            >
              {option.label}
              <span
                className={cn(
                  "text-[0.6875rem] tabular-nums",
                  isActive ? "text-gold-400" : "text-royal-faint",
                )}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-[0.8125rem] text-royal-faint">
        {t("resultCount", { count: filtered.length })}
      </p>

      {/*
       * Bilinçli olarak ne `layout` ne de AnimatePresence var:
       *  - `layout` grid'deki onlarca kartı her render'da yeniden ölçüyor,
       *    "daha fazla göster"den sonra kaydırma takılıyordu.
       *  - exit animasyonu, çıkan kartların grid hücresini tutmaya devam
       *    etmesine ve yeni kartlarla üst üste binmesine yol açıyordu.
       * Kartlar yalnızca DOM'a girerken sönümlenerek beliriyor; zaten
       * duran kartlar hiç yeniden animate edilmiyor.
       */}
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => {
          const copy = project.copy[locale];
          const service = getServiceById(project.serviceId);
          return (
            <motion.li
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={{
                  pathname: "/referanslar/[slug]",
                  params: { slug: project.slug[locale] },
                }}
                className="group relative block overflow-hidden rounded-2xl bg-royal-graphite transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_60px_-30px_rgba(0,0,0,0.5)]"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={copy.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
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
      </ul>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="group inline-flex cursor-pointer items-center justify-center rounded-full transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="rounded-full border border-black/12 bg-white px-7 py-3.5 text-sm font-semibold text-black transition-colors duration-500 ease-in-out group-hover:border-black/25 group-hover:bg-black/[0.03]">
              {t("loadMore")}
            </span>
            {/*
             * Rozet ölçüsü hap butonunkiyle aynı (28px daire, 20px ikon).
             * Boyut açıkça verilir ki artı flex ile tam ortalansın.
             */}
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-black text-white"
              aria-hidden="true"
            >
              <Plus className="size-5 transition-transform duration-500 ease-in-out group-hover:rotate-90" />
            </span>
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-[0.9375rem] text-royal-faint">
          {t("empty")}
        </p>
      )}
    </>
  );
}

