"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ExternalLink,
  Home,
  Images,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Package,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { signOut } from "./actions";

const NAV: { href: string; label: string; icon: typeof Package; exact?: boolean }[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true },
  { href: "/admin/anasayfa", label: "Anasayfa", icon: Home },
  { href: "/admin/hizmetler", label: "Hizmetler", icon: Package },
  { href: "/admin/kampanyalar", label: "Kampanyalar", icon: Megaphone },
  { href: "/admin/referanslar", label: "Referans İşler", icon: Images },
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

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Telefon başlığı */}
      <div className="flex items-center gap-3 border-b border-black/10 bg-white px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Menüyü aç"
          className="rounded-lg border border-black/10 p-2 text-zinc-700"
        >
          <Menu className="size-5" />
        </button>
        <span className="text-sm font-semibold tracking-tight">
          Royal Reklam Yönetim
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
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <div>
            <p className="text-sm font-semibold tracking-tight">Royal Reklam</p>
            <p className="text-xs text-zinc-500">Yönetim paneli</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menüyü kapat"
            className="rounded-lg p-1.5 text-zinc-500 lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                )}
              >
                <item.icon className="size-4.5 shrink-0" />
                {item.label}
              </Link>
            );
          })}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <ExternalLink className="size-4.5 shrink-0" />
            Siteyi aç
          </a>
        </nav>

        {/* Profil ve çıkış — menünün dibinde */}
        <div className="border-t border-black/10 p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-zinc-900 text-sm font-semibold uppercase text-white">
              {email.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{email}</p>
              <p className="text-xs text-zinc-500">Yönetici</p>
            </div>
          </div>

          <form action={signOut}>
            <button
              type="submit"
              className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="size-4.5 shrink-0" />
              Çıkış yap
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
