import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { requireSession } from "@/lib/admin/auth";
import {
  EDITABLE_PAGES,
  getPageDefaults,
  type PageContentRow,
  type PageKey,
} from "@/lib/content/pages";
import { adminClient } from "@/lib/supabase/server";
import { Notice } from "../../ui-server";
import { resetPage } from "../actions";
import { PageForm } from "../page-form";

/*
  Kayıtları olan sayfaların başlığı kendi bölümünden açılıyor (menüde
  "Hizmetler" satırı gibi); düzenleyiciden geri dönüş de oraya.
*/
const PARENT: Partial<Record<PageKey, { href: string; label: string }>> = {
  hizmetler: { href: "/admin/hizmetler", label: "Hizmetler" },
  referanslar: { href: "/admin/referanslar", label: "Referans İşler" },
  kampanyalar: { href: "/admin/kampanyalar", label: "Kampanyalar" },
};

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ kaydedildi?: string; sifirlandi?: string }>;
}) {
  await requireSession();
  const [{ key }, query] = await Promise.all([params, searchParams]);

  const page = EDITABLE_PAGES.find((item) => item.key === key);
  if (!page) notFound();

  const db = adminClient();
  const [trDefaults, enDefaults, result] = await Promise.all([
    getPageDefaults(page.key as PageKey, "tr"),
    getPageDefaults(page.key as PageKey, "en"),
    db?.from("page_content").select("*").eq("id", page.key).maybeSingle() ??
      Promise.resolve({ data: null }),
  ]);
  const row = (result?.data ?? null) as PageContentRow | null;
  const parent = PARENT[page.key as PageKey];

  return (
    <div>
      {parent && (
        <Link
          href={parent.href}
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
        >
          ← {parent.label}
        </Link>
      )}

      <div className={`flex flex-wrap items-start justify-between gap-4 ${parent ? "mt-3" : ""}`}>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {parent ? `${page.label} sayfasının başlığı` : page.label}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-zinc-600">
            Sitedeki <span className="font-medium text-zinc-800">{page.path}</span>{" "}
            sayfasının üstündeki başlık, kısa açıklama ve görsel. Boş bıraktığın
            alan sitedeki mevcut metinle kalır.
          </p>
        </div>
        <a
          href={page.path}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-black/25"
        >
          <ExternalLink className="size-3.5" aria-hidden="true" />
          Sayfayı aç
        </a>
      </div>

      {(query.kaydedildi || query.sifirlandi) && (
        <div className="mt-6">
          <Notice>
            {query.kaydedildi
              ? "Kaydedildi. Site tazelendi."
              : "Düzenlemeler silindi, sayfa özgün başlığına döndü."}
          </Notice>
        </div>
      )}

      {/* Kaydettikten sonra form yeni değerlerle yeniden kurulsun. */}
      <PageForm
        key={row?.updated_at ?? "yeni"}
        pageKey={page.key}
        row={row}
        defaults={{ tr: trDefaults, en: enDefaults }}
      />

      {row && (
        <form action={resetPage} className="mt-10 border-t border-black/10 pt-6">
          <input type="hidden" name="id" value={page.key} />
          <p className="text-sm text-zinc-600">
            Bu sayfada yaptığın tüm düzenlemeleri silip özgün başlığına
            döndürür. Yüklediğin görsel depoda kalır.
          </p>
          <button
            type="submit"
            className="mt-3 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
          >
            Düzenlemeleri sıfırla
          </button>
        </form>
      )}
    </div>
  );
}
