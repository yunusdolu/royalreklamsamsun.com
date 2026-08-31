import { Factory, Handshake, Map, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

const ITEMS = [
  { key: "workshop", Icon: Factory },
  { key: "single", Icon: Handshake },
  { key: "nationwide", Icon: Map },
  { key: "materials", Icon: ShieldCheck },
] as const;

export async function WhySection() {
  const t = await getTranslations("home.why");

  return (
    <section className="container-royal py-20 lg:py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

      <RevealGroup
        as="ul"
        className="mt-14 grid gap-px overflow-hidden rounded-xl border border-gold-500/12 bg-gold-500/10 sm:grid-cols-2 lg:grid-cols-4"
      >
        {ITEMS.map(({ key, Icon }) => (
          <RevealItem as="li" key={key} className="group bg-royal-graphite p-7">
            <span className="inline-flex size-11 items-center justify-center rounded-lg border border-gold-500/25 bg-gold-500/[0.06] text-gold-400 transition-colors duration-500 group-hover:border-gold-500/55 group-hover:text-gold-200">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-base font-bold text-royal-fg">
              {t(`items.${key}.title`)}
            </h3>
            <p className="mt-2.5 text-[0.875rem] leading-relaxed text-royal-muted">
              {t(`items.${key}.description`)}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
