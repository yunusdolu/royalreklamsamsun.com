import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { PinContainer } from "@/components/ui/3d-pin";

export async function ServicesSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.services");
  const tCommon = await getTranslations("common");

  return (
    <section
      className="container-royal scroll-mt-24 py-20 lg:py-28"
      id="hizmetler"
    >
      <div className="mb-16">
        <SectionHeading title={t("title")} description={t("description")} />
      </div>

      <RevealGroup className="mt-16" stagger={0.1}>
        <div className="grid gap-x-6 gap-y-16 sm:gap-x-8 sm:gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {services.map((service) => {
            const copy = service.copy[locale];
            // Düz dize yerine tipli yol: next-intl dile göre çevirir
            const href = {
              pathname: "/hizmetler/[slug]" as const,
              params: { slug: service.slug[locale] },
            };
            const maxDays = service.leadTimeDays[1] || 5;

            return (
              <RevealItem
                key={service.id}
                className="flex justify-center w-full"
              >
                {/*
                  Yayındaki tasarım: üstte fotoğraf ve teslim rozeti, altında
                  beyaz alanda ad, iki satırlık özet, ince ayırıcı ve sağ
                  alttaki "İncele".

                  `sizes` 292 değil 420: kart görsel alanı 16:10 fotoğrafı
                  1.15 orana kırptığı için gerçekte 405px genişlik görünüyor;
                  292 verildiğinde tarayıcı küçük sürümü indirip büyütüyor ve
                  fotoğraf bulanıklaşıyordu.
                */}
                <PinContainer
                  title={tCommon("variantCount", {
                    count: service.copy[locale].variants.length,
                    service: copy.shortName,
                  })}
                  href={href}
                  containerClassName="w-[292px] h-[28.75rem]"
                >
                  <div className="group/card relative flex h-[28.75rem] w-[292px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white tracking-tight shadow-2xl">
                    <div className="relative h-[60%] w-full overflow-hidden bg-zinc-100">
                      <Image
                        src={service.image}
                        alt={copy.name}
                        fill
                        sizes="420px"
                        quality={85}
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />

                      {/* Rozet beyaz yazılı; aydınlık fotoğraflarda okunması
                          için üstten inen koyu geçiş. */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
                      />

                      <div className="absolute right-5 top-4 z-20 text-right drop-shadow-md">
                        <div className="text-[22px] font-bold leading-none text-white">
                          {maxDays}+
                        </div>
                        <div className="mt-1 text-[11px] text-white/90">
                          {tCommon("dayDelivery")}
                        </div>
                      </div>
                    </div>

                    <div className="z-20 flex flex-1 flex-col px-6 pb-6 pt-5">
                      <h3 className="text-balance text-[20px] font-bold leading-tight tracking-tight text-black">
                        {copy.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-[13px] font-medium leading-relaxed text-zinc-600">
                        {copy.summary}
                      </p>

                      <div className="mt-auto flex items-center justify-end border-t border-black/10 pt-4">
                        <div className="flex items-center gap-1.5 text-[13px] font-semibold text-black transition-colors group-hover/card:text-gold-500">
                          {tCommon("learnMore")}
                          <ArrowUpRight className="size-3.5 transition-transform group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
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
