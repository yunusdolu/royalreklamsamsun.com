import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHeader } from "@/components/layout/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { InstagramIcon } from "@/components/ui/brand-icons";
import {
  mailLink,
  mapsDirectionsLink,
  mapsEmbedLink,
  siteConfig,
  telLink,
  whatsappLink,
} from "@/config/site";
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

  const channels = [
    {
      Icon: Phone,
      label: tCommon("phone"),
      value: siteConfig.contact.phoneDisplay,
      href: telLink,
      external: false,
      accent: "text-gold-400",
    },
    {
      Icon: MessageCircle,
      label: tCommon("whatsapp"),
      value: siteConfig.contact.phoneDisplay,
      href: whatsappLink(t("whatsappPrefill")),
      external: true,
      accent: "text-[#25d366]",
    },
    {
      Icon: Mail,
      label: tCommon("email"),
      value: siteConfig.contact.email,
      href: mailLink,
      external: false,
      accent: "text-gold-400",
    },
    {
      Icon: InstagramIcon,
      label: tCommon("instagram"),
      value: siteConfig.contact.instagramHandle,
      href: siteConfig.contact.instagram,
      external: true,
      accent: "text-gold-400",
    },
  ];

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
      />

      <section className="container-royal py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Kanallar */}
          <div className="lg:col-span-5">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg">
              {t("channelsTitle")}
            </h2>

            <RevealGroup as="ul" className="mt-8 space-y-3" stagger={0.06}>
              {channels.map(({ Icon, label, value, href, external, accent }) => (
                <RevealItem as="li" key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="surface-royal surface-royal-hover group flex items-center gap-4 rounded-lg p-4 transition-all duration-400"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-royal-border bg-royal-surface">
                      <Icon className={`size-5 ${accent}`} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.9375rem] font-semibold text-royal-fg transition-colors group-hover:text-gold-200">
                        {value}
                      </span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <p className="mt-5 rounded-lg border border-gold-500/20 bg-gold-500/[0.04] p-4 text-[0.8125rem] leading-relaxed text-royal-muted">
                {t("whatsappNote")}
              </p>
            </Reveal>

            {/* Adres + saatler */}
            <Reveal delay={0.15}>
              <div className="surface-royal mt-8 rounded-xl p-6">
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-royal-fg">
                  <MapPin className="size-4 text-gold-500" aria-hidden="true" />
                  {t("visitTitle")}
                </h3>
                <address className="mt-3 text-[0.9375rem] not-italic leading-relaxed text-royal-muted">
                  {siteConfig.address.full}
                </address>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-royal-faint">
                  {t("visitNote")}
                </p>

                <a
                  href={mapsDirectionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-md border border-gold-500/40 px-5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-500/10"
                >
                  <Navigation className="size-4" aria-hidden="true" />
                  {tCommon("getDirections")}
                </a>

                <div className="mt-6 border-t border-white/5 pt-5">
                  <h4 className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
                    <Clock className="size-3.5 text-gold-600" aria-hidden="true" />
                    {tCommon("workingHours")}
                  </h4>
                  <dl className="mt-3 space-y-1.5 text-[0.875rem] text-royal-muted">
                    <div className="flex justify-between gap-4">
                      <dt>{tCommon("weekdays")}</dt>
                      <dd className="tabular-nums text-royal-fg">
                        {siteConfig.openingHours.weekdays.opens}–
                        {siteConfig.openingHours.weekdays.closes}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>{tCommon("saturday")}</dt>
                      <dd className="tabular-nums text-royal-fg">
                        {siteConfig.openingHours.saturday.opens}–
                        {siteConfig.openingHours.saturday.closes}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>{tCommon("sunday")}</dt>
                      <dd className="text-royal-faint">{tCommon("closed")}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Harita */}
          <div className="lg:col-span-7">
            <h2 className="underline-gold font-display text-xl font-bold text-royal-fg">
              {t("mapTitle")}
            </h2>
            <Reveal direction="left">
              <div className="mt-8 overflow-hidden rounded-xl border border-gold-500/15">
                <iframe
                  src={mapsEmbedLink}
                  title={t("mapLabel")}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[26rem] w-full border-0 grayscale-[35%] contrast-110 lg:h-[38rem]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
