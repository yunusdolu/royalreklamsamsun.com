import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { PillAnchor, PillLink } from "@/components/ui/pill-button";
import {
  mailLink,
  mapsDirectionsLink,
  mapsEmbedLink,
  siteConfig,
  telLink,
  whatsappLink,
} from "@/config/site";
import { homeFaqs } from "@/content/faq";
import { type Locale, routing } from "@/i18n/routing";
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildSpeakableSchema,
} from "@/lib/schema";
import { buildAlternates, buildOpenGraph } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    alternates: buildAlternates("/iletisim", locale),
    openGraph: buildOpenGraph({
      title: t("metaTitle"),
      description: t("metaDescription"),
      href: "/iletisim",
      locale,
    }),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contactPage");
  const tCommon = await getTranslations("common");
  const tRegions = await getTranslations("regionsPage");

  const channels = [
    {
      label: tCommon("phone"),
      value: siteConfig.contact.phoneDisplay,
      // Hattı yanıtlayan kişi — arayan kimi aradığını bilsin
      person: siteConfig.team.contactPerson,
      note: t("phoneNote"),
      href: telLink,
      external: false,
    },
    {
      label: tCommon("whatsapp"),
      value: siteConfig.contact.phoneDisplay,
      person: siteConfig.team.contactPerson,
      note: t("whatsappNote"),
      href: whatsappLink(t("whatsappPrefill")),
      external: true,
    },
    {
      label: tCommon("email"),
      value: siteConfig.contact.email,
      person: undefined,
      note: t("emailNote"),
      href: mailLink,
      external: false,
    },
    {
      label: tCommon("instagram"),
      value: siteConfig.contact.instagramHandle,
      person: undefined,
      note: t("instagramNote"),
      href: siteConfig.contact.instagram,
      external: true,
    },
  ];

  /*
   * İletişim aşamasında sorulan sorular: keşif ücreti, şehir dışı hizmet,
   * teslim süresi ve tasarım. `homeFaqs` sırası değişirse burası da
   * güncellenmeli — bu yüzden sıra numaraları tek yerde tutuluyor.
   */
  const contactFaqs = [3, 4, 1, 5]
    .map((index) => homeFaqs[locale][index])
    .filter((faq) => faq !== undefined);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: tCommon("breadcrumbHome"), href: "/" },
          { name: t("title") },
        ]}
        title={t("title")}
        lead={t("lead")}
        answer={t("answer")}
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <PillAnchor href={telLink} external={false}>
            {siteConfig.contact.phoneDisplay}
          </PillAnchor>
          <PillAnchor href={whatsappLink(t("whatsappPrefill"))} tone="light">
            {tCommon("whatsapp")}
          </PillAnchor>
        </div>
      </PageHeader>

      <section className="container-royal py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Kanallar — ikon kutusu yok, değer büyük tipografiyle önde */}
          <div className="lg:col-span-7">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg">
              {t("channelsTitle")}
            </h2>

            <RevealGroup
              as="ul"
              className="mt-8 grid gap-4 sm:grid-cols-2"
              stagger={0.06}
            >
              {channels.map(({ label, value, person, note, href, external }) => (
                <RevealItem as="li" key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_26px_60px_-30px_rgba(0,0,0,0.35)]"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                        {label}
                      </span>
                      <ArrowUpRight
                        className="size-4 shrink-0 text-royal-faint transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-royal-fg"
                        aria-hidden="true"
                      />
                    </span>

                    <span className="mt-3 block break-words font-display text-[1.0625rem] font-bold text-royal-fg">
                      {value}
                    </span>

                    {person && (
                      <span className="mt-1.5 block text-[0.8125rem] text-royal-muted">
                        {t("personLabel")}:{" "}
                        <span className="font-semibold text-royal-fg">
                          {person}
                        </span>
                      </span>
                    )}

                    <span
                      className="mt-3 block h-px w-8 bg-gold-600/70 transition-all duration-500 group-hover:w-14"
                      aria-hidden="true"
                    />

                    <span className="mt-3 block flex-1 text-[0.8125rem] leading-relaxed text-royal-muted">
                      {note}
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Harita */}
            <Reveal delay={0.1}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-black/[0.07]">
                <iframe
                  src={mapsEmbedLink}
                  title={t("mapLabel")}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[22rem] w-full border-0 grayscale-[35%] contrast-110 lg:h-[26rem]"
                />
              </div>
            </Reveal>
          </div>

          {/* Atölye künyesi — koyu panel */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal direction="left">
                <div className="overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-7 sm:p-8">
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                    {t("visitTitle")}
                  </span>

                  <address className="mt-5 font-display text-lg font-bold not-italic leading-relaxed text-white">
                    {siteConfig.address.full}
                  </address>

                  <p className="mt-4 text-[0.875rem] leading-relaxed text-white/60">
                    {t("visitNote")}
                  </p>

                  <PillAnchor
                    href={mapsDirectionsLink}
                    tone="onDark"
                    block
                    className="mt-6"
                  >
                    {tCommon("getDirections")}
                  </PillAnchor>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                      {tCommon("workingHours")}
                    </h3>
                    <dl className="mt-3 divide-y divide-white/10 text-[0.875rem]">
                      <div className="flex items-baseline justify-between gap-4 py-2.5">
                        <dt className="text-white/45">{tCommon("weekdays")}</dt>
                        <dd className="font-medium tabular-nums text-white">
                          {siteConfig.openingHours.weekdays.opens}–
                          {siteConfig.openingHours.weekdays.closes}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 py-2.5">
                        <dt className="text-white/45">{tCommon("saturday")}</dt>
                        <dd className="font-medium tabular-nums text-white">
                          {siteConfig.openingHours.saturday.opens}–
                          {siteConfig.openingHours.saturday.closes}
                        </dd>
                      </div>
                      <div className="flex items-baseline justify-between gap-4 py-2.5">
                        <dt className="text-white/45">{tCommon("sunday")}</dt>
                        <dd className="font-medium text-white/45">
                          {tCommon("closed")}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                      {t("serviceAreaTitle")}
                    </h3>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-white/60">
                      {t("serviceAreaNote")}
                    </p>
                    <PillLink
                      href="/bolgeler"
                      tone="onDark"
                      block
                      className="mt-5"
                    >
                      {tRegions("title")}
                    </PillLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* İletişim aşamasında en çok sorulanlar */}
      <FaqSection faqs={contactFaqs} showCta={false} />

      <CtaSection />

      <JsonLd id="ld-contact-business" data={buildLocalBusinessSchema(locale)} />
      <JsonLd
        id="ld-contact-breadcrumb"
        data={buildBreadcrumbSchema(
          [
            { name: tCommon("breadcrumbHome"), href: "/" },
            { name: t("title"), href: "/iletisim" },
          ],
          locale,
        )}
      />
      <JsonLd
        id="ld-contact-speakable"
        data={buildSpeakableSchema(["[data-speakable]", "h1", "address"])}
      />
    </>
  );
}
