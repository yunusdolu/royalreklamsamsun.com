"use client";

import { useActionState } from "react";

import type { Service } from "@/content/services";
import { Field, SubmitButton, TextArea } from "../../ui";
import { ImageField } from "../../image-field";
import { saveService } from "../actions";

interface OverrideRow {
  name_tr: string | null;
  name_en: string | null;
  short_name_tr: string | null;
  short_name_en: string | null;
  summary_tr: string | null;
  summary_en: string | null;
  card_image: string | null;
  hero_image: string | null;
  hero_focus: string | null;
  card_focus: string | null;
  lead_time_min: number | null;
  lead_time_max: number | null;
}

/**
 * Alanların `defaultValue`'su tablodaki ham değer, `placeholder`'ı ise
 * koddaki özgün metin. Böylece boş bir kutu "burada bir şey yok" değil,
 * "burada şu an şu yazıyor, değiştirmek istersen doldur" anlamına geliyor.
 */
export function ServiceForm({
  service,
  row,
}: {
  service: Service;
  row: OverrideRow | null;
}) {
  const [error, formAction] = useActionState(saveService, undefined);
  const tr = service.copy.tr;
  const en = service.copy.en;

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-8">
      <input type="hidden" name="id" value={service.id} />

      <section className="grid gap-6 sm:grid-cols-2">
        <ImageField
          label="Kart görseli"
          name="card_image"
          folder={`services/${service.id}/kart`}
          current={row?.card_image ?? service.image}
          currentFocus={row?.card_focus ?? service.cardFocus}
          hint="Anasayfa ve hizmetler sayfasındaki kart. Kare (1:1) en iyi sonucu verir."
          previews={[
            { label: "Anasayfa kartı", ratio: 292 / 275 },
            { label: "Hizmetler listesi", ratio: 16 / 10 },
          ]}
        />
        <ImageField
          label="Sayfa banner'ı"
          name="hero_image"
          folder={`services/${service.id}/banner`}
          current={row?.hero_image ?? service.heroImage ?? service.image}
          currentFocus={row?.hero_focus ?? service.heroFocus}
          hint="Hizmet sayfasının başlığının arkasındaki görsel; yazı sol tarafta durur. Konusu sağda olan yatay bir fotoğraf en iyi sonucu verir."
          previews={[
            { label: "Masaüstü", ratio: 4 },
            { label: "Tablet", ratio: 2.4 },
            { label: "Telefon", ratio: 1.2 },
          ]}
        />
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Türkçe
          </h2>
          <Field
            label="Hizmet adı"
            name="name_tr"
            defaultValue={row?.name_tr}
            placeholder={tr.name}
          />
          <Field
            label="Kısa ad"
            name="short_name_tr"
            defaultValue={row?.short_name_tr}
            placeholder={tr.shortName}
            hint="Menüde ve breadcrumb'da görünen kısa hali."
          />
          <TextArea
            label="Kart açıklaması"
            name="summary_tr"
            defaultValue={row?.summary_tr}
            placeholder={tr.summary}
            hint="Kartta iki satır görünür, uzun yazma."
          />
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            İngilizce
          </h2>
          <Field
            label="Hizmet adı"
            name="name_en"
            defaultValue={row?.name_en}
            placeholder={en.name}
          />
          <Field
            label="Kısa ad"
            name="short_name_en"
            defaultValue={row?.short_name_en}
            placeholder={en.shortName}
          />
          <TextArea
            label="Kart açıklaması"
            name="summary_en"
            defaultValue={row?.summary_en}
            placeholder={en.summary}
          />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Field
          label="En az teslim (gün)"
          name="lead_time_min"
          type="number"
          defaultValue={row?.lead_time_min}
          placeholder={String(service.leadTimeDays[0])}
        />
        <Field
          label="En çok teslim (gün)"
          name="lead_time_max"
          type="number"
          defaultValue={row?.lead_time_max}
          placeholder={String(service.leadTimeDays[1])}
          hint="Kart üzerindeki rozette bu sayı görünür."
        />
      </section>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <SubmitButton>Kaydet ve yayınla</SubmitButton>
        <span className="text-xs text-zinc-500">
          Kaydedince site birkaç saniye içinde güncellenir.
        </span>
      </div>
    </form>
  );
}
