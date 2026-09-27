import Link from "next/link";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import { ProjectForm } from "../project-form";

export default async function NewProject() {
  await requireSession();

  return (
    <div>
      <Link
        href="/admin/referanslar"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Referans İşler
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Yeni iş</h1>
      <ProjectForm project={null} services={services} />
    </div>
  );
}
