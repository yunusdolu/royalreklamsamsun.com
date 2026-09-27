import Link from "next/link";

import { requireSession } from "@/lib/admin/auth";
import { SlideForm } from "../slide-form";

export default async function NewSlide() {
  await requireSession();

  return (
    <div>
      <Link
        href="/admin/anasayfa"
        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
      >
        ← Anasayfa
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Yeni slayt</h1>
      <SlideForm slide={null} />
    </div>
  );
}
