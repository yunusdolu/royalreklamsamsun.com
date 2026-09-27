import Link from "next/link";

import { requireSession } from "@/lib/admin/auth";
import { getAllCampaignRows } from "@/lib/content/campaigns";
import { getAllProjectRows } from "@/lib/content/projects";
import { services } from "@/content/services";

const CARDS = [
  {
    href: "/admin/hizmetler",
    title: "Hizmetler",
    note: "Kapak ve banner görselleri, başlıklar, kısa açıklamalar, teslim süresi.",
  },
  {
    href: "/admin/kampanyalar",
    title: "Kampanyalar",
    note: "Yeni kampanya oluştur, tarih ver, hangi hizmet sayfalarında görüneceğini seç.",
  },
  {
    href: "/admin/referanslar",
    title: "Referans İşler",
    note: "Yaptığın işleri fotoğraflarıyla ekle, sıralamasını değiştir.",
  },
] as const;

export default async function AdminHome() {
  const user = await requireSession();
  const [campaigns, projects] = await Promise.all([
    getAllCampaignRows(),
    getAllProjectRows(),
  ]);

  const counts: Record<string, string> = {
    "/admin/hizmetler": `${services.length} hizmet`,
    "/admin/kampanyalar": `${campaigns.length} kampanya`,
    "/admin/referanslar": `${projects.length} iş`,
  };

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Özet</h1>
      <p className="mt-2 text-sm text-zinc-600">{user.email} olarak girdin.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-black/10 bg-white p-5 transition-colors hover:border-black/30"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-semibold tracking-tight">{card.title}</h2>
              <span className="text-xs text-zinc-500">{counts[card.href]}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {card.note}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
