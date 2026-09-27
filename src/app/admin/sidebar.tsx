"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  CircleHelp,
  ClipboardList,
  Cookie,
  ExternalLink,
  Home,
  Images,
  Info,
  LayoutDashboard,
  LogOut,
  MapPin,
  Megaphone,
  Menu,
  Package,
  Phone,
  Scale,
  ShieldCheck,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { signOut } from "./actions";

interface NavItem {
  href: string;
  label: string;
  icon: typeof Package;
  exact?: boolean;
  /** Bu yollar da aynı satırı seçili gösterir (sayfanın başlık düzenleyicisi gibi). */
  also?: string[];
}

/*
  Menü sitenin kendi sırasını izliyor: her satır sitedeki bir sayfa. "Sayfalar"
  diye ayrı bir başlık yok; kullanıcı "Hakkımızda'yı nereden değiştiririm"
  diye düşünürken bir ara klasör aramasın. Gruplar arasında yalnızca ince bir
  çizgi var:
    1. Panel
    2. Kayıtları olan sayfalar (anasayfa slaytları, hizmetler, işler, kampanyalar)
    3. Tek başlık bloklu içerik sayfaları
    4. Yasal metinler
*/
const NAV: NavItem[][] = [
  [{ href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true }],
  [
    { href: "/admin/anasayfa", label: "Anasayfa", icon: Home },
    { href: "/admin/hizmetler", label: "Hizmetler", icon: Package, also: ["/admin/sayfalar/hizmetler"] },
    { href: "/admin/referanslar", label: "Referans İşler", icon: Images, also: ["/admin/sayfalar/referanslar"] },
    { href: "/admin/kampanyalar", label: "Kampanyalar", icon: Megaphone, also: ["/admin/sayfalar/kampanyalar"] },
  ],
  [
    { href: "/admin/sayfalar/bolgeler", label: "Hizmet Bölgeleri", icon: MapPin },
    { href: "/admin/sayfalar/hakkimizda", label: "Hakkımızda", icon: Info },
    { href: "/admin/sayfalar/blog", label: "Blog", icon: BookOpen },
    { href: "/admin/sayfalar/sss", label: "Sık Sorulan Sorular", icon: CircleHelp },
    { href: "/admin/sayfalar/iletisim", label: "İletişim", icon: Phone },
    { href: "/admin/sayfalar/teklif-al", label: "Teklif Al", icon: ClipboardList },
  ],
  [
    { href: "/admin/sayfalar/gizlilik", label: "Gizlilik Politikası", icon: ShieldCheck },
    { href: "/admin/sayfalar/cerez", label: "Çerez Politikası", icon: Cookie },
    { href: "/admin/sayfalar/kvkk", label: "KVKK Metni", icon: Scale },
  ],
];

/**
 * Yan menü.
 *
 * Masaüstünde sabit duruyor, telefonda üstteki düğmeyle açılıyor. Açılır
 * menü sunucudan gelen bir durum değil; bu yüzden kabuk sunucuda kalıp
 * yalnızca bu parça istemciye iniyor.
 */
export function Sidebar({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* "/admin/sayfalar/blog" "/admin/sayfalar/b" ile başlamasın diye sınır "/" ile. */
  const matches = (path: string) => pathname === path || pathname.startsWith(`${path}/`);
  const isActive = (item: NavItem) =>
    item.exact
      ? pathname === item.href
      : matches(item.href) || (item.also ?? []).some(matches);

  return (
    <>
      {/* Telefon başlığı */}
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menüyü aç"
            className="rounded-lg border border-black/10 p-2 text-zinc-700 hover:bg-zinc-100"
          >
            <Menu className="size-5" />
          </button>
          {/*
            Sitenin kendi logosu. Önceki `mark-gold.png` atı yanlış kırpılmış
            bir lekeydi; küçük boyutta hiçbir şeye benzemiyordu.
          */}
          <Image
            src="/brand/my-logo.png"
            alt="Royal Reklam"
            width={1024}
            height={232}
            priority
            className="h-6 w-auto"
          />
        </div>
        <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
          Yönetim
        </span>
      </div>

      {/* Telefonda menü açıkken arkayı karartan katman */}
      {open && (
        <button
          type="button"
          aria-label="Menüyü kapat"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-black/10 bg-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo ve Başlık Alanı */}
        <div className="flex items-center justify-between gap-2 border-b border-black/5 px-5 py-4">
          {/* Logo alanın tamamını kaplıyor; telefonda kapatma düğmesine yer bırakıyor. */}
          <Link href="/admin" className="block min-w-0 flex-1">
            <Image
              src="/brand/my-logo.png"
              alt="Royal Reklam — Yönetim Paneli"
              width={1024}
              height={232}
              priority
              /* PNG'nin iki yanında saydam boşluk var; negatif kenar
                 boşluğuyla görünen logo alanın kenarlarına kadar uzanıyor. */
              className="-mx-4 h-auto w-[calc(100%+2rem)] max-w-none"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menüyü kapat"
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* 14 satır küçük ekranlarda sığmayabilir; menü kendi içinde kayıyor. */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-3">
          {NAV.map((group, index) => (
            <div
              key={group[0].href}
              className={cn("flex flex-col gap-0.5", index > 0 && "mt-2 border-t border-black/5 pt-2")}
            >
              {group.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      active
                        ? "bg-zinc-900 text-amber-400 font-semibold shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                    )}
                  >
                    <item.icon className={cn("size-4 shrink-0", active ? "text-amber-400" : "text-zinc-500")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="mt-2 border-t border-black/5 pt-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <ExternalLink className="size-4 shrink-0 text-zinc-400" />
              <span>Siteyi Yeni Sekmede Aç</span>
            </a>
          </div>
        </nav>

        {/* Profil ve çıkış — menünün dibinde */}
        <div className="border-t border-black/10 bg-zinc-50/50 p-3">
          <div className="flex items-center gap-3 rounded-xl bg-white border border-black/5 px-3 py-2.5 shadow-xs">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-900 text-sm font-bold uppercase text-amber-400 shadow-xs">
              {email.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-zinc-900">{email}</p>
              <p className="text-[11px] text-zinc-500">Yönetici</p>
            </div>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="mt-2 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="size-4 shrink-0" />
              <span>Güvenli Çıkış Yap</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
