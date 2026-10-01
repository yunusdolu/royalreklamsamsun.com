"use client";

import { useActionState, useState } from "react";

import { MarqueeBand } from "@/components/ui/marquee-band";
import { SubmitButton } from "../../ui";
import { saveMarquee } from "../actions";

const areaClass =
  "w-full resize-y rounded-lg border border-black/15 bg-white px-3 py-2 text-sm leading-relaxed outline-none focus:border-zinc-900";

const toLines = (text: string) =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

/**
 * Kayan şeridin yazıları: her satır bir ifade. Üstteki önizleme sitedeki
 * bileşenin aynısı; yazdıkça güncelleniyor.
 */
export function MarqueeForm({
  initialTr,
  initialEn,
  defaultsTr,
  defaultsEn,
  maxItems,
  maxLength,
}: {
  initialTr: string[];
  initialEn: string[];
  defaultsTr: string[];
  defaultsEn: string[];
  maxItems: number;
  maxLength: number;
}) {
  /* Henüz yazı girilmediyse alan sitede görünen özgün ifadelerle dolu gelir. */
  const [tr, setTr] = useState((initialTr.length > 0 ? initialTr : defaultsTr).join("\n"));
  const [en, setEn] = useState(initialEn.join("\n"));
  const [error, formAction] = useActionState(saveMarquee, undefined);

  const trLines = toLines(tr);
  const preview = trLines.length > 0 ? trLines : defaultsTr;

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-6">
      <div>
        <p className="text-xs font-medium text-zinc-500">Önizleme</p>
        <div className="mt-2 overflow-hidden rounded-xl">
          <MarqueeBand items={preview} />
        </div>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Şeritteki ifadeler</span>
        <textarea
          name="items_tr"
          rows={8}
          value={tr}
          onChange={(event) => setTr(event.target.value)}
          className={areaClass}
        />
        <span className="text-xs text-zinc-500">
          Her satır bir ifade; aralarına yıldız kendiliğinden konur ve hepsi büyük harfle
          yazılır. Kısa tut: en fazla {maxItems} ifade, ifade başına {maxLength} karakter.
          Tümünü silip kaydedersen şerit ilk yazılarına döner.
        </span>
        <span className="text-xs tabular-nums text-zinc-400">{trLines.length} ifade</span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">İngilizce ifadeler</span>
        <textarea
          name="items_en"
          rows={5}
          value={en}
          onChange={(event) => setEn(event.target.value)}
          placeholder={defaultsEn.join("\n")}
          className={areaClass}
        />
        <span className="text-xs text-zinc-500">
          Boş bırakırsan İngilizce sayfada gri görünen hazır İngilizce ifadeler kayar.
        </span>
      </label>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton>Şeridi kaydet</SubmitButton>
        <button
          type="button"
          onClick={() => setTr(defaultsTr.join("\n"))}
          className="rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          İlk yazılara dön
        </button>
      </div>
    </form>
  );
}
