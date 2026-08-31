import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline.tr}`,
    short_name: siteConfig.name,
    description:
      "Samsun'da ışıklı tabela, kutu harf, totem, cephe giydirme ve araç giydirme. Keşiften montaja tek elden.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0a0a0a",
    lang: "tr",
    dir: "ltr",
    categories: ["business", "shopping"],
    icons: [
      {
        src: "/brand/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
