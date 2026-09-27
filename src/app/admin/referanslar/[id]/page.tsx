import Link from "next/link";
import { notFound } from "next/navigation";

import { services } from "@/content/services";
import { requireSession } from "@/lib/admin/auth";
import type { ProjectRow } from "@/lib/content/projects";
import { adminClient } from "@/lib/supabase/server";
import { ProjectForm } from "../project-form";
import { deleteProject } from "../actions";

export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const db = adminClient();
  const { data } = (await db
    ?.from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle()) ?? { data: null };

  if (!data) notFound();
  const project = data as ProjectRow;

  return (
    <div>
      <Link
        href="/admin/referanslar"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Referans İşler
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        {project.title_tr}
      </h1>
      <p className="mt-1 text-sm text-zinc-500">/referanslar/{project.slug_tr}</p>

      <ProjectForm project={project} services={services} />

      <form action={deleteProject} className="mt-10 border-t border-black/10 pt-6">
        <input type="hidden" name="id" value={project.id} />
        <p className="text-sm text-zinc-600">
          Kaydı tamamen siler. Yalnızca gizlemek istiyorsan listedeki
          &ldquo;Kaldır&rdquo; düğmesini kullan.
        </p>
        <button
          type="submit"
          className="mt-3 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
        >
          Kaydı sil
        </button>
      </form>
    </div>
  );
}
