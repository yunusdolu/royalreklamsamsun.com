"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams, useRouter as useAppRouter } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { hreflangMap, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * TR / EN değiştirici.
 *
 * URL parçaları dile göre farklıdır (`/hizmetler` ↔ `/en/services`) ve
 * dinamik sayfalarda slug da farklıdır (`isikli-tabela` ↔
 * `illuminated-signage`). next-intl'in router'ı yol şablonunu çevirir ama
 * slug değerini olduğu gibi taşır — bu da detay sayfalarında 404 üretir.
 *
 * Bu yüzden önce sayfanın kendi `hreflang` bağlantısı okunur: her sayfa
 * `generateMetadata` içinde diğer dildeki tam karşılığını zaten yayınlıyor.
 * Böylece slug çevirisi için içerik dosyalarını istemci paketine taşımaya
 * gerek kalmaz. Bağlantı yoksa next-intl'in kendi çevirisine düşülür.
 */
export function LanguageSwitcher({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const appRouter = useAppRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;

    // 1) Sayfanın kendi alternatif dil bağlantısı — slug dâhil tam karşılık
    const alternate = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${hreflangMap[next]}"]`,
    );

    if (alternate?.href) {
      const { pathname: target, search, hash } = new URL(alternate.href);
      startTransition(() => {
        appRouter.replace(`${target}${search}${hash}`);
      });
      return;
    }

    // 2) Yedek: yol şablonunu next-intl çevirir (dinamik olmayan sayfalar)
    startTransition(() => {
      router.replace(
        // params, dinamik segmentleri ([slug] gibi) korumak için gerekli
        { pathname, params: params as never },
        { locale: next },
      );
    });
  };

  const targetLocale = locale === "tr" ? "en" : "tr";
  const flagUrl =
    locale === "tr"
      ? "https://flagcdn.com/tr.svg"
      : "https://flagcdn.com/gb.svg";
  const label = locale === "tr" ? "TR" : "EN";

  return (
    <button
      type="button"
      onClick={() => switchTo(targetLocale)}
      disabled={isPending}
      className={cn(
        "flex h-9 items-center gap-2 rounded-full border px-3 transition-colors",
        variant === "light"
          ? "border-white/20 bg-transparent text-white hover:bg-white/10"
          : "border-black/20 bg-transparent text-black hover:bg-black/10",
        isPending && "opacity-60",
        className,
      )}
      aria-label={t("languageLabel")}
    >
      <div className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/10">
        <img
          src={flagUrl}
          alt={`${label} flag`}
          className={cn(
            "h-full w-full object-cover",
            locale === "tr" ? "object-[30%_center]" : "object-center",
          )}
        />
      </div>
      <span className="text-[0.875rem] font-medium uppercase leading-none">
        {label}
      </span>
    </button>
  );
}
