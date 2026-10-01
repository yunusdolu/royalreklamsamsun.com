import { getLocale } from "next-intl/server";

import { MarqueeBand } from "@/components/ui/marquee-band";
import type { Locale } from "@/i18n/routing";
import { getMarqueeItems } from "@/lib/content/marquee";

/**
 * Anasayfadaki kayan şerit. İfadeleri panelden düzenleniyor
 * (Anasayfa → Kayan şerit), yeri de diğer bölümler gibi değiştirilebiliyor.
 */
export async function MarqueeStrip() {
  const locale = (await getLocale()) as Locale;
  const items = await getMarqueeItems(locale);

  return (
    <MarqueeBand
      items={items}
      label={locale === "tr" ? "Öne çıkanlar" : "Highlights"}
    />
  );
}
