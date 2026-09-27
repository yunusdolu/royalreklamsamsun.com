import Link from "next/link";
import { notFound } from "next/navigation";

import { requireSession } from "@/lib/admin/auth";
import type { HeroSlideRow } from "@/lib/content/hero";
import { adminClient } from "@/lib/supabase/server";
import { SlideForm } from "../slide-form";
import { deleteSlide } from "../actions";

export default async function EditSlide({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const db = adminClient();
  const { data } = (await db
    ?.from("hero_slides")
    .select("*")
    .eq("id", id)
    .maybeSingle()) ?? { data: null };

  if (!data) notFound();
  const slide = data as HeroSlideRow;

  return (
    <div>
      <Link
        href="/admin/anasayfa"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Anasayfa
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        {slide.title_tr}
      </h1>

      <SlideForm slide={slide} />

      <form action={deleteSlide} className="mt-10 border-t border-black/10 pt-6">
        <input type="hidden" name="id" value={slide.id} />
        <p className="text-sm text-zinc-600">
          Slaydı tamamen siler. Yalnızca gizlemek istiyorsan listedeki
          &ldquo;Kaldır&rdquo; düğmesini kullan.
        </p>
        <button
          type="submit"
          className="mt-3 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50"
        >
          Slaydı sil
        </button>
      </form>
    </div>
  );
}
