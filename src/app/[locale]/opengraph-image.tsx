import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

/**
 * Sosyal paylaşım görseli.
 *
 * `[locale]` altında tanımlandığı için alt rotaların tamamı kendi
 * `opengraph-image` dosyası olmadıkça bu görseli devralır — böylece her
 * sayfa paylaşıldığında markalı, siyah/altın bir kart görünür.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline.tr}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const logo = await readFile(
    join(process.cwd(), "public", "brand", "logo-gold.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const headline =
    locale === "en"
      ? "Outdoor advertising in Samsun — signage, façades, vehicles"
      : "Samsun'da tabela, cephe ve araç giydirme";

  const subline =
    locale === "en"
      ? "Survey · Design · Manufacturing · Installation"
      : "Keşif · Tasarım · İmalat · Montaj";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Altın hale */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(212,175,55,0.30) 0%, rgba(212,175,55,0) 68%)",
            display: "flex",
          }}
        />

        {/* Üst: logo */}
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={420} height={126} />
        </div>

        {/* Alt: başlık */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 22,
            }}
          >
            <div style={{ width: 56, height: 3, background: "#d4af37", display: "flex" }} />
            <div
              style={{
                color: "#d4af37",
                fontSize: 21,
                letterSpacing: 4,
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              {subline}
            </div>
          </div>

          <div
            style={{
              color: "#f5f4f1",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: 940,
              display: "flex",
            }}
          >
            {headline}
          </div>

          <div
            style={{
              marginTop: 30,
              color: "#a3a09a",
              fontSize: 25,
              display: "flex",
              gap: 26,
            }}
          >
            <span>{siteConfig.domain}</span>
            <span style={{ color: "#4a370f" }}>|</span>
            <span>{siteConfig.contact.phoneDisplay}</span>
          </div>
        </div>

        {/* Alt altın şerit */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 8,
            background: "linear-gradient(90deg, #94701f, #e8c766, #94701f)",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
