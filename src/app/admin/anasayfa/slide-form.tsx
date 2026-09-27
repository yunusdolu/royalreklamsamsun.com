"use client";

import { useActionState } from "react";

import type { HeroSlideRow } from "@/lib/content/hero";
import { ImageField } from "../image-field";
import { Field, SubmitButton, TextArea } from "../ui";
import { saveSlide } from "./actions";

export function SlideForm({ slide }: { slide: HeroSlideRow | null }) {
  const [error, formAction] = useActionState(saveSlide, undefined);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-8">
      {slide && <input type="hidden" name="id" value={slide.id} />}

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <ImageField
          label="Slayt görseli"
          name="image"
          current={slide?.image}
          currentFocus={slide?.image_focus}
          hint="Geniş (24:9) bir fotoğraf en iyi sonucu verir. Telefonda dikey kırpıldığı için odak noktasını konunun üstüne koy."
          previews={[
            { label: "Masaüstü", ratio: 24 / 9 },
            { label: "Tablet", ratio: 16 / 9 },
            { label: "Telefon", ratio: 4 / 5 },
          ]}
        />

        <div className="flex flex-col gap-5">
          <Field
            label="Başlık — birinci satır"
            name="title_tr"
            required
            defaultValue={slide?.title_tr}
            placeholder="Samsun'da tabela"
          />
          <Field
            label="Başlık — ikinci satır"
            name="title2_tr"
            defaultValue={slide?.title2_tr}
            placeholder="ve cephe giydirme"
            hint="Başlığın nerede alt satıra ineceğine sen karar veriyorsun. Tek satır istiyorsan boş bırak."
          />
          <TextArea
            label="Açıklama"
            name="description_tr"
            defaultValue={slide?.description_tr}
            hint="Başlığın altındaki iki satırlık cümle."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-2.5">
              <input
                type="checkbox"
                name="is_active"
                defaultChecked={slide ? slide.is_active : true}
                className="size-4"
              />
              <span className="text-sm font-medium">Yayında</span>
            </label>
            <Field
              label="Sıra"
              name="sort"
              type="number"
              defaultValue={slide?.sort ?? 0}
              hint="Küçük sayı önce gösterilir."
            />
          </div>
        </div>
      </section>

      <Field
        label="Görsel açıklaması"
        name="alt_tr"
        defaultValue={slide?.alt_tr}
        placeholder="Kafe cephesinde ışıklı kutu harf tabela"
        hint="Fotoğrafta ne olduğunu yazar. Görme engelli ziyaretçiler ve Google için; boş bırakırsan başlık kullanılır."
      />

      <details className="rounded-xl border border-black/10 bg-white p-5">
        <summary className="cursor-pointer text-sm font-medium">
          İngilizce metinler
        </summary>
        <div className="mt-5 flex flex-col gap-5">
          <Field
            label="Başlık — birinci satır (EN)"
            name="title_en"
            defaultValue={slide?.title_en}
          />
          <Field
            label="Başlık — ikinci satır (EN)"
            name="title2_en"
            defaultValue={slide?.title2_en}
          />
          <TextArea
            label="Açıklama (EN)"
            name="description_en"
            defaultValue={slide?.description_en}
            hint="Boş bırakırsan İngilizce sayfada Türkçesi görünür."
          />
          <Field
            label="Görsel açıklaması (EN)"
            name="alt_en"
            defaultValue={slide?.alt_en}
          />
        </div>
      </details>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <SubmitButton>Kaydet ve yayınla</SubmitButton>
    </form>
  );
}
