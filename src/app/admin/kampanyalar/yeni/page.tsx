import Link from "next/link";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { CampaignForm } from "../campaign-form";

export default async function NewCampaign() {
  await requireSession();

  return (
    <div>
      <Link
        href="/admin/kampanyalar"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Kampanyalar
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        Yeni kampanya
      </h1>
      <CampaignForm campaign={null} services={services} />
    </div>
  );
}
