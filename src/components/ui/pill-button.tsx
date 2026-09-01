import * as React from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * Anasayfa hero'sundaki hap buton — metin hapı + ayrı yuvarlak ok rozeti,
 * hover'da ok yukarı kayıp alttan geri giriyor. Site genelinde tek kaynak
 * olsun diye buraya alındı.
 *
 * tone:
 *  - "dark"   : siyah hap + altın rozet   → açık zeminlerde birincil eylem
 *  - "light"  : beyaz hap + siyah rozet   → açık zeminlerde ikincil eylem
 *  - "onDark" : beyaz hap + altın rozet   → koyu panellerde
 */
type Tone = "dark" | "light" | "onDark";

const pillTone: Record<Tone, string> = {
  dark: "bg-black text-white group-hover:bg-zinc-800",
  light:
    "border border-black/12 bg-white text-black group-hover:border-black/25 group-hover:bg-black/[0.03]",
  onDark: "bg-white text-black group-hover:bg-zinc-100",
};

const badgeTone: Record<Tone, string> = {
  dark: "bg-gold-500 text-black",
  light: "bg-black text-white",
  onDark: "bg-gold-500 text-black",
};

interface PillProps {
  children: React.ReactNode;
  tone?: Tone;
  /** Rozetteki ikon — varsayılan çapraz ok */
  icon?: LucideIcon;
  /** Dar kolonlarda tam genişlik (yan panel gibi) */
  block?: boolean;
  className?: string;
}

const shell =
  "group inline-flex cursor-pointer items-center justify-center rounded-full transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500";

function PillBody({
  children,
  tone = "dark",
  icon: Icon = ArrowUpRight,
  block,
}: PillProps) {
  return (
    <>
      <span
        className={cn(
          "rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-500 ease-in-out",
          block && "flex-1 text-center",
          pillTone[tone],
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "relative flex h-fit items-center overflow-hidden rounded-full p-3.5 transition-colors duration-500 ease-in-out",
          badgeTone[tone],
        )}
        aria-hidden="true"
      >
        <Icon className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
        <Icon className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
      </span>
    </>
  );
}

/** Site içi yönlendirme (next-intl tipli Link) */
export function PillLink({
  href,
  className,
  block,
  ...body
}: PillProps & { href: React.ComponentProps<typeof Link>["href"] }) {
  return (
    <Link href={href} className={cn(shell, block ? "w-full" : "w-fit", className)}>
      <PillBody {...body} block={block} />
    </Link>
  );
}

/** Site dışı bağlantı — mailto/tel dâhil */
export function PillAnchor({
  href,
  external = true,
  className,
  block,
  ...body
}: PillProps & { href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(shell, block ? "w-full" : "w-fit", className)}
    >
      <PillBody {...body} block={block} />
    </a>
  );
}
