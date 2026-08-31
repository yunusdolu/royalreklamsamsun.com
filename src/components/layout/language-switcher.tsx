"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * TR / EN değiştirici.
 *
 * Kritik nokta: URL parçaları dile göre farklıdır (`/hizmetler` ↔
 * `/en/services`). `usePathname` next-intl'in kendi sürümüdür ve dahilî
 * (yerelleştirilmemiş) yolu döndürür; `router.replace` ise onu hedef dilin
 * yoluna çevirir. Böylece dil değiştirince kullanıcı aynı sayfada kalır,
 * anasayfaya atılmaz.
 */
export function LanguageSwitcher({ className, variant = "light" }: { className?: string, variant?: "light" | "dark" }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const segments = useSelectedLayoutSegments();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // params, dinamik segmentleri ([slug] gibi) korumak için gerekli
        { pathname, params: params as never },
        { locale: next },
      );
    });
  };

  const targetLocale = locale === "tr" ? "en" : "tr";
  const flagUrl = locale === "tr" ? "https://flagcdn.com/tr.svg" : "https://flagcdn.com/gb.svg";
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
        className
      )}
      aria-label={t("languageLabel")}
    >
      <div className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black/10">
        <img 
          src={flagUrl} 
          alt={`${label} flag`} 
          className={cn(
            "h-full w-full object-cover",
            locale === "tr" ? "object-[30%_center]" : "object-center"
          )} 
        />
      </div>
      <span className="text-[0.875rem] font-medium uppercase leading-none">{label}</span>
    </button>
  );
}
