import Link from "next/link";
import { notFound } from "next/navigation";

import { getServiceById } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { adminClient } from "@/lib/supabase/server";
import { resetService } from "../actions";
import { ServiceForm } from "./service-form";

export default async function ServiceEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const service = getServiceById(id);
  if (!service) notFound();

  const db = adminClient();
  const { data: row } = (await db
    ?.from("service_overrides")
    .select("*")
    .eq("id", id)
    .maybeSingle()) ?? { data: null };

  return (
    <div>
      <Link
        href="/admin/hizmetler"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Hizmetler
      </Link>

      <h1 className="mt-3 text-xl font-semibold tracking-tight">
        {service.copy.tr.name}
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        /hizmetler/{service.slug.tr} · /en/services/{service.slug.en}
      </p>

      <ServiceForm service={service} row={row} />

      {row && (
        <form action={resetService} className="mt-10 border-t border-black/10 pt-6">
          <input type="hidden" name="id" value={id} />
          <p className="text-sm text-zinc-600">
            Bu hizmette yaptığın tüm düzenlemeleri silip sitedeki özgün haline
            döndürür. Yüklediğin görseller depoda kalır.
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
