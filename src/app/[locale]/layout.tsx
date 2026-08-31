import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { type Locale, routing } from "@/i18n/routing";
import { buildLocalBusinessSchema, buildWebSiteSchema } from "@/lib/schema";
import { buildAlternates } from "@/lib/seo";

import "../globals.css";

/**
 * Türkçe karakterler (ş, ğ, ı, İ, ö, ü, ç) `latin-ext` alt kümesinde yer alır.
 * Bu alt küme eklenmezse başlıklarda karakterler yedek fonta düşer ve
 * tipografi bozulur.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${siteConfig.name}`,
    },
    description: t("defaultDescription"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? "en_US" : "tr_TR",
      url: siteConfig.url,
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: true, address: true },
    category: "business",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Statik render için gerekli — olmadan tüm sayfalar dinamiğe düşer.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${inter.variable} h-full overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Fonts bağlantısını erkenden aç — LCP kazancı */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="flex min-h-full flex-col bg-royal-black text-royal-fg antialiased overflow-x-hidden">
        <NextIntlClientProvider>
          <SmoothScrollProvider>
            <ScrollProgress />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-royal-ink"
            >
              {t("skipToContent")}
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>

        {/* Site genelinde geçerli yapısal veri */}
        <JsonLd id="ld-localbusiness" data={buildLocalBusinessSchema(locale as Locale)} />
        <JsonLd id="ld-website" data={buildWebSiteSchema(locale as Locale)} />
      </body>
    </html>
  );
}
