import Link from "next/link";
import { Images, Plus } from "lucide-react";

import { requireSession } from "@/lib/admin/auth";
import { getAllHeroSlides } from "@/lib/content/hero";
import { Notice, PageTitle } from "../ui-server";
import { toggleSlide } from "./actions";

export default async function HeroPage({
  searchParams,
}: {
  searchParams: Promise<{ kaydedildi?: string; silindi?: string }>;
}) {
  await requireSession();
  const params = await searchParams;
  const slides = await getAllHeroSlides();

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="Anasayfa"
        lead="Sayfanın en üstündeki kayan slaytlar. Tablo boşken sitede koddaki üç özgün slayt görünür; buraya ilk slaydı eklediğinde onların yerini alır."
      >
        <Link
          href="/admin/anasayfa/yeni"
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Yeni slayt
        </Link>
      </PageTitle>

      {params.kaydedildi && <Notice>Kaydedildi. Site tazelendi.</Notice>}
      {params.silindi && <Notice>Slayt silindi.</Notice>}

      {slides.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/15 bg-white px-6 py-14 text-center">
          <Images className="mx-auto size-7 text-zinc-400" />
          <p className="mt-3 text-sm font-medium">Slayt eklenmemiş</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-zinc-500">
            Anasayfa şu an koddaki üç slaytla çalışıyor. Buraya slayt
            eklediğinde tamamı senin girdiklerinle değişir — yarısı panelden
            yarısı koddan gelirse başlıklar birbirini tutmaz.
          </p>
          <Link
            href="/admin/anasayfa/yeni"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white"
          >
            <Plus className="size-4" />
            Yeni slayt
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-4 sm:flex-row sm:items-center"
            >
              {slide.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={slide.image}
                  alt=""
                  style={{ objectPosition: slide.image_focus ?? undefined }}
                  className="h-24 w-full shrink-0 rounded-lg object-cover sm:w-56"
                />
              ) : (
                <span className="grid h-24 w-full shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-400 sm:w-56">
                  <Images className="size-5" />
                </span>
              )}

              <Link
                href={`/admin/anasayfa/${slide.id}`}
                className="min-w-0 flex-1"
              >
                <p className="text-xs text-zinc-400">{index + 1}. slayt</p>
                <p className="mt-0.5 font-medium">
                  {slide.title_tr}
                  {slide.title2_tr ? ` ${slide.title2_tr}` : ""}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                  {slide.description_tr ?? "Açıklama yok"}
                </p>
              </Link>

              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    slide.is_active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {slide.is_active ? "Yayında" : "Yayında değil"}
                </span>
                <form action={toggleSlide}>
                  <input type="hidden" name="id" value={slide.id} />
                  <input
                    type="hidden"
                    name="next"
                    value={slide.is_active ? "0" : "1"}
                  />
                  <button
                    type="submit"
                    className="rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
                  >
                    {slide.is_active ? "Kaldır" : "Yayınla"}
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
