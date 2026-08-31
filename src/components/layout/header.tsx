"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { ServiceIcon } from "@/components/ui/service-icon";
import { siteConfig, telLink } from "@/config/site";
import { services } from "@/content/services";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import CurvedMenu from "@/components/ui/curved-menu";
import GradualBlur from "@/components/ui/gradual-blur";

type NavKey = "services" | "portfolio" | "regions" | "about" | "blog" | "contact";

const navItems: { key: NavKey; href: "/hizmetler" | "/referanslar" | "/bolgeler" | "/hakkimizda" | "/blog" | "/iletisim" }[] = [
  { key: "services", href: "/hizmetler" },
  { key: "portfolio", href: "/referanslar" },
  { key: "regions", href: "/bolgeler" },
  { key: "about", href: "/hakkimizda" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/iletisim" },
];

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        scrolled ? "bg-transparent lg:bg-black/95 lg:backdrop-blur-md lg:shadow-sm pointer-events-none lg:pointer-events-auto" : "bg-transparent pointer-events-none"
      )}
    >
      {/* Kademeli Blur (Gradual Blur) Arka Planı - Sadece mobilde ve sürekli görünür */}
      <div className="absolute inset-0 pointer-events-none -z-10 block lg:hidden">
        <GradualBlur
          target="parent"
          position="top"
          height="7rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          zIndex={-1}
        />
      </div>



      {/* Ana çubuk */}
      <div className="relative z-10 pointer-events-auto">
        <div className={cn(
          "container-royal flex items-center justify-between gap-4 lg:gap-6 relative transition-all duration-700 h-16",
          scrolled ? "lg:h-20" : "lg:h-36"
        )}>
          
          {/* Mobil için boş alan. Masaüstü için scrolled durumunda logonun yerini tutan spacer */}
          <div className={cn(
            "transition-all duration-700 ease-in-out",
            "flex-1 lg:flex-none",
            scrolled ? "lg:w-[240px]" : "lg:w-0"
          )}></div>

          <Link
            href="/"
            className={cn(
              "absolute left-1/2 -translate-x-1/2 translate-y-[10px] z-20 flex items-center justify-center h-full w-full max-w-[310px] sm:max-w-[340px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "lg:max-w-none lg:w-auto lg:top-1/2 lg:-translate-y-1/2",
              scrolled ? "lg:left-4 xl:left-8 lg:translate-x-0" : "lg:left-1/2 lg:-translate-x-1/2"
            )}
            aria-label={siteConfig.name}
          >
            <Logo
              priority
              className={cn(
                "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-[310px] md:w-[330px] brightness-110",
                scrolled ? "lg:w-[220px]" : "lg:w-[480px] lg:scale-110"
              )}
            />
          </Link>

          {/* Masaüstü gezinme */}
          <nav
            className={cn(
              "hidden items-center gap-4 xl:gap-6 lg:flex transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            )}
            aria-label={t("openMenu")}
          >
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative px-1 py-2 text-[0.9375rem] font-medium tracking-wide transition-colors",
                    isActive 
                      ? (scrolled ? "text-white" : "text-black") 
                      : (scrolled ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black")
                  )}
                >
                  {t(item.key)}
                  {isActive && (
                    <span className={cn(
                      "absolute bottom-0 left-0 h-0.5 w-full rounded-full",
                      scrolled ? "bg-white" : "bg-black"
                    )} />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={cn(
            "flex flex-1 items-center justify-end gap-3 lg:flex-none transition-all duration-700",
            scrolled ? "lg:opacity-100 lg:pointer-events-auto" : "lg:opacity-0 lg:pointer-events-none"
          )}>
            <div className="hidden lg:block">
              <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
            </div>

            <CurvedMenu
              navItems={navItems.map((item) => ({
                heading: t(item.key),
                href: item.href,
              }))}
            />
          </div>
        </div>

      </div>

      {/* Removed old mobile drawer */}
    </header>
  );
}
