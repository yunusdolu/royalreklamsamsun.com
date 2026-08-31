import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { PinContainer } from "@/components/ui/3d-pin";

const abstractImages = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518818414575-995ce88da208?q=80&w=800&auto=format&fit=crop",
];

export async function ServicesSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.services");

  return (
    <section className="container-royal scroll-mt-24 py-20 lg:py-28" id="hizmetler">
      <div className="mb-16">
        <SectionHeading
          title={t("title")}
          description={t("description")}
        />
      </div>

      <RevealGroup className="mt-16" stagger={0.1}>
        <div className="grid gap-x-6 gap-y-16 sm:gap-x-8 sm:gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {services.map((service, index) => {
            const copy = service.copy[locale];
            const href = `/hizmetler/${service.slug[locale]}`;
            const imageSrc = abstractImages[index % abstractImages.length];
            const maxDays = service.leadTimeDays[1] || 5;

            return (
              <RevealItem key={service.id} className="flex justify-center w-full">
                <PinContainer title="İncele" href={href} containerClassName="w-[292px] h-[28.75rem]">
                  <div className="flex flex-col tracking-tight w-[292px] h-[28.75rem] bg-white border border-black/10 rounded-2xl overflow-hidden shadow-2xl group/card relative">
                    
                    {/* Resim Alanı */}
                    <div className="relative w-full h-[55%] overflow-hidden bg-zinc-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageSrc}
                        alt={copy.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      
                      {/* Sağ Üstteki Stat (Sayı) - Resmin üzerinde olduğu için beyaz veya gölgeli kalabilir */}
                      <div className="absolute top-4 right-5 z-20 text-right drop-shadow-md">
                        <div className="text-[22px] font-bold text-white leading-none">{maxDays}+</div>
                        <div className="text-[11px] text-white/90 mt-1">Gün Teslim</div>
                      </div>
                    </div>

                    {/* Metin ve İçerik Alanı */}
                    <div className="flex flex-col flex-1 px-6 pt-5 pb-6 z-20">
                      <h3 className="text-[20px] font-bold text-black text-balance leading-tight tracking-tight">
                        {copy.name}
                      </h3>
                      
                      <p className="mt-2 text-[13px] text-zinc-600 leading-relaxed line-clamp-2 font-medium">
                        {copy.summary}
                      </p>
                      
                      {/* Alt Kısım (Footer) */}
                      <div className="mt-auto flex items-center justify-end border-t border-black/10 pt-4">
                        <div className="text-black text-[13px] font-semibold flex items-center gap-1.5 transition-colors group-hover/card:text-gold-500">
                          İncele <ArrowUpRight className="size-3.5 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </PinContainer>
              </RevealItem>
            );
          })}
        </div>
      </RevealGroup>
    </section>
  );
}
