"use client";

import { useActionState } from "react";

import type { PageContentRow } from "@/lib/content/pages";
import { ImageField } from "../image-field";
import { Field, SubmitButton, TextArea } from "../ui";
import { savePage } from "./actions";

/**
 * Alanların `defaultValue`'su tablodaki ham değer, `placeholder`'ı ise
 * sitede şu an görünen özgün metin. Boş kutu "burada şu yazıyor,
 * değiştirmek istersen doldur" demek.
 */
export function PageForm({
  pageKey,
  row,
  defaults,
}: {
  pageKey: string;
  row: PageContentRow | null;
  defaults: { tr: { title: string; lead: string }; en: { title: string; lead: string } };
}) {
  const [error, formAction] = useActionState(savePage, undefined);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-8">
      <input type="hidden" name="id" value={pageKey} />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Türkçe
          </h2>
          <Field
            label="Başlık"
            name="title_tr"
            defaultValue={row?.title_tr}
            placeholder={defaults.tr.title}
          />
          <TextArea
            label="Kısa açıklama"
            name="lead_tr"
            rows={4}
            defaultValue={row?.lead_tr}
            placeholder={defaults.tr.lead}
            hint="Başlığın altındaki bir iki cümle."
          />
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            İngilizce
          </h2>
          <Field
            label="Başlık"
            name="title_en"
            defaultValue={row?.title_en}
            placeholder={defaults.en.title}
          />
          <TextArea
            label="Kısa açıklama"
            name="lead_en"
            rows={4}
            defaultValue={row?.lead_en}
            placeholder={defaults.en.lead}
            hint="Boş bırakırsan İngilizce sayfada koddaki İngilizce metin kalır."
          />
        </div>
      </section>

      <ImageField
        label="Sayfa görseli (isteğe bağlı)"
        name="image"
        folder={`pages/${pageKey}`}
        current={row?.image}
        currentFocus={row?.image_focus}
        hint="Eklenirse başlık ve açıklama bu fotoğrafın üstünde durur, soldan koyu bir geçişle (Teklif Al sayfasındaki gibi). Eklenmezse sayfa yalnızca yazıyla açılır. Konusu sağ tarafta olan yatay bir fotoğraf en iyi sonucu verir."
        previews={[
          { label: "Masaüstü", ratio: 4 },
          { label: "Tablet", ratio: 2.4 },
          { label: "Telefon", ratio: 1.2 },
        ]}
      />

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton>Kaydet ve yayınla</SubmitButton>
        <span className="text-xs text-zinc-500">
          Adres ve Google&rsquo;da görünen sayfa başlığı değişmez.
        </span>
      </div>
    </form>
  );
}
