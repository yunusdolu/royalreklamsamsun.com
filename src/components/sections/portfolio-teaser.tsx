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
import { PortfolioCarousel } from "./portfolio-carousel";

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
  const tCommon = await getTranslations("common");

  const featured = projects.slice(0, 6);

  return (
    <section className="container-royal py-20 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
      </div>

      {featured.length > 0 ? (
        <Reveal className="mt-8 md:mt-12">
          <PortfolioCarousel projects={featured} locale={locale} />
        </Reveal>
      ) : (
        <Reveal className="mt-12">
          {/* Swipable Carousel (Kaydırmalı Resimler) */}
          <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-6 px-4 -mx-4 sm:px-0 sm:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1518818414575-995ce88da208?q=80&w=800&auto=format&fit=crop"
            ].map((src, i) => (
              <div key={i} className="relative shrink-0 w-[85vw] sm:w-[380px] aspect-[4/3] snap-center sm:snap-start rounded-2xl overflow-hidden shadow-lg border border-black/5 group cursor-grab active:cursor-grabbing">
                <img src={src} alt="Referans" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Alt Bilgi ve Yenilenmiş Butonlar */}
          <div className="mt-10 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold text-black mb-3 tracking-tight">
              Daha Fazla Proje Yükleniyor
            </h3>
            <p className="text-[15px] text-zinc-600 font-medium mb-8 max-w-lg leading-relaxed text-balance">
              {tPortfolio("comingSoon")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center px-4 sm:px-0">
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-white border border-black/10 px-8 text-[15px] font-bold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-50 shadow-sm"
              >
                <InstagramIcon className="size-5 text-pink-600 transition-transform duration-300 group-hover/btn:scale-110" aria-hidden="true" />
                <span>{tCommon("instagramBrowse")}</span>
              </a>
              
              <Link
                href="/teklif-al"
                className="group/btn relative inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-gold-500 px-8 text-[15px] font-bold text-black transition-all duration-300 hover:scale-[1.03] hover:bg-gold-400 shadow-[0_8px_25px_rgba(212,175,55,0.3)]"
              >
                <span>{t("cta")}</span>
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
}
