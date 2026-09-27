import Link from "next/link";
import { notFound } from "next/navigation";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import type { CampaignRow } from "@/lib/content/campaigns";
import { adminClient } from "@/lib/supabase/server";
import { CampaignForm } from "../campaign-form";
import { deleteCampaign } from "../actions";

export default async function EditCampaign({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const db = adminClient();
  const { data } = (await db
    ?.from("campaigns")
    .select("*")
    .eq("id", id)
    .maybeSingle()) ?? { data: null };

  if (!data) notFound();
  const campaign = data as CampaignRow;

  return (
    <div>
      <Link
        href="/admin/kampanyalar"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Kampanyalar
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        {campaign.title_tr}
      </h1>
      <p className="mt-1 text-sm text-zinc-500">/kampanyalar/{campaign.slug}</p>

      <CampaignForm campaign={campaign} services={services} />

      <form action={deleteCampaign} className="mt-10 border-t border-black/10 pt-6">
        <input type="hidden" name="id" value={campaign.id} />
        <p className="text-sm text-zinc-600">
          Kampanyayı tamamen siler. Yalnızca yayından kaldırmak istiyorsan
          listedeki &ldquo;Kaldır&rdquo; düğmesini kullan.
        </p>
        <button
          type="submit"
          className="mt-3 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
        >
          Kampanyayı sil
        </button>
      </form>
    </div>
  );
}
