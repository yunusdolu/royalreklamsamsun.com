import Link from "next/link";
import { ArrowUpDown, ChevronRight, Download, Images, MoveHorizontal, Plus } from "lucide-react";

import { requireSession } from "@/lib/admin/auth";
import { getAllHeroSlides, getCodeSlides } from "@/lib/content/hero";
import { HOME_SECTIONS, getHomeOrderForAdmin } from "@/lib/content/home-layout";
import { DEFAULT_MARQUEE, getMarqueeForAdmin } from "@/lib/content/marquee";
import { SubmitButton } from "../ui";
import { Notice, PageTitle } from "../ui-server";
import { importCodeSlides, toggleSlide } from "./actions";

export default async function HeroPage({
  searchParams,
}: {
  searchParams: Promise<{
    kaydedildi?: string;
    silindi?: string;
    aktarildi?: string;
    son?: string;
    hata?: string;
  }>;
}) {
  await requireSession();
  const params = await searchParams;
  const [slides, layout, marquee] = await Promise.all([
    getAllHeroSlides(),
    getHomeOrderForAdmin(),
    getMarqueeForAdmin(),
  ]);
  const marqueeItems = marquee.tr.length > 0 ? marquee.tr : DEFAULT_MARQUEE.tr;
  const sectionLabel = new Map<string, string>(HOME_SECTIONS.map((s) => [s.key, s.label]));
  /*
    Panelde yayında slayt yoksa sitede koddaki üç slayt görünüyor; panelde de
    aynısı listelensin. Daha önce aktarılmış olanlar (aynı başlık) tekrar
    gösterilmiyor.
  */
  const hasLive = slides.some((slide) => slide.is_active);
  const known = new Set(slides.map((slide) => slide.title_tr.trim()));
  const codeSlides = hasLive
    ? []
    : (await getCodeSlides()).filter((slide) => !known.has(slide.title_tr.trim()));

  return (
    <div className="flex flex-col gap-6">
      <PageTitle
        title="Anasayfa"
        lead="Anasayfadaki bölümlerin sırası ve kayan slaytlar. Bir slayta tıklayıp görselini, başlığını ve açıklamasını değiştirebilirsin; küçük sıra numarası önce görünür."
      >
        <Link
          href="/admin/anasayfa/yeni"
          className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Yeni slayt
        </Link>
      </PageTitle>

      {/* Bölüm sırası: slaytlar, tecrübe sayıları, hizmetler… hangisi üstte. */}
      <Link
        href="/admin/anasayfa/duzen"
        className="group flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-black/25 sm:flex-row sm:items-center"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-zinc-900 text-white">
          <ArrowUpDown className="size-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-zinc-900">Bölüm sırası</span>
          <span className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-zinc-500">
            {layout.order.map((key, index) => (
              <span key={key} className="inline-flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="size-3 text-zinc-300" aria-hidden="true" />}
                {sectionLabel.get(key)}
              </span>
            ))}
          </span>
        </span>
        <span className="shrink-0 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors group-hover:bg-zinc-50">
          Sırayı düzenle
        </span>
      </Link>

      {/* Kayan şerit: yazıları buradan, yeri bölüm sırasından. */}
      <Link
        href="/admin/anasayfa/serit"
        className="group flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-4 transition-colors hover:border-black/25 sm:flex-row sm:items-center"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-zinc-900 text-white">
          <MoveHorizontal className="size-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-zinc-900">Kayan şerit</span>
          <span className="mt-1 block truncate text-xs text-zinc-500">
            {marqueeItems.join("  ✦  ")}
          </span>
        </span>
        <span className="shrink-0 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors group-hover:bg-zinc-50">
          Yazıları düzenle
        </span>
      </Link>

      <h2 className="text-sm font-semibold tracking-tight text-zinc-900">Slaytlar</h2>

      {params.kaydedildi && <Notice>Kaydedildi. Site tazelendi.</Notice>}
      {params.silindi && <Notice>Slayt silindi.</Notice>}
      {params.aktarildi && (
        <Notice>
          Sitedeki {params.aktarildi} slayt panele aktarıldı. Artık her birini
          buradan düzenleyebilirsin; sitede hiçbir şey değişmedi.
        </Notice>
      )}
      {params.son && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Anasayfada en az bir slayt yayında kalmalı. Önce başka bir slaytı
          yayına al, sonra bunu kaldır.
        </p>
      )}
      {params.hata && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Slaytlar aktarılamadı. Supabase bağlantısını kontrol edip tekrar dene.
        </p>
      )}

      {codeSlides.length > 0 && (
        <>
          <div className="flex flex-col gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-zinc-900">
                Sitede {codeSlides.length} slayt görünüyor, ama henüz panelde değiller
              </p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                {slides.length > 0 &&
                  "Panelde yayında slayt olmadığı için anasayfada şu an bunlar çıkıyor. "}
                Aşağıdaki slaytlar sitenin koduna gömülü; bu yüzden buradan
                düzenlenemiyor. Panele aktardığında her biri ayrı kayıt olur:
                görselini, başlığını ve açıklamasını değiştirebilir, sırasını
                ayarlayabilirsin. Aktarım sitede hiçbir şeyi değiştirmez.
              </p>
            </div>
            <form action={importCodeSlides} className="shrink-0">
              <SubmitButton pendingLabel="Aktarılıyor…">
                <span className="inline-flex items-center gap-2">
                  <Download className="size-4" aria-hidden="true" />
                  {codeSlides.length} slaytı panele aktar
                </span>
              </SubmitButton>
            </form>
          </div>

          <ul className="flex flex-col gap-4">
            {codeSlides.map((slide, index) => (
              <li
                key={slide.image}
                className="flex flex-col gap-4 rounded-xl border border-black/10 bg-white p-4 sm:flex-row sm:items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image ?? ""}
                  alt=""
                  className="h-24 w-full shrink-0 rounded-lg object-cover sm:w-56"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-zinc-400">{index + 1}. slayt</p>
                  <p className="mt-0.5 font-medium">
                    {slide.title_tr} {slide.title2_tr}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                    {slide.description_tr}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                  Sitede · koddan
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {slides.length > 0 && (
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
