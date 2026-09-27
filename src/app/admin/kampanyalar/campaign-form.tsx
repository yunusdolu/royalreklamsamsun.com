"use client";

import { useActionState } from "react";

import type { Service } from "@/content/services";
import type { CampaignRow } from "@/lib/content/campaigns";
import { Field, ImageField, SubmitButton, TextArea } from "../ui";
import { saveCampaign } from "./actions";

/** ISO tarihi `datetime-local` alanının beklediği yerel biçime çevirir. */
function forInput(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function CampaignForm({
  campaign,
  services,
}: {
  campaign: CampaignRow | null;
  services: Pick<Service, "id" | "copy">[];
}) {
  const [error, formAction] = useActionState(saveCampaign, undefined);
  const selected = new Set(campaign?.service_ids ?? []);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-8">
      {campaign && <input type="hidden" name="id" value={campaign.id} />}

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-5">
          <Field
            label="Başlık"
            name="title_tr"
            required
            defaultValue={campaign?.title_tr}
            placeholder="Tabelada sonbahar indirimi"
          />
          <Field
            label="Rozet"
            name="badge_tr"
            defaultValue={campaign?.badge_tr}
            placeholder="%20 indirim"
            hint="Kartın köşesinde görünen kısa etiket. Boş bırakabilirsin."
          />
          <TextArea
            label="Kısa açıklama"
            name="excerpt_tr"
            defaultValue={campaign?.excerpt_tr}
            placeholder="Kasım sonuna kadar tüm kutu harf tabelalarda geçerli."
            hint="Anasayfa şeridinde ve kartta bu metin görünür."
          />
          <TextArea
            label="Detay metni"
            name="body_tr"
            rows={6}
            defaultValue={campaign?.body_tr}
            hint="Kampanya sayfasındaki uzun metin. Paragraflar arasında bir boş satır bırak."
          />
        </div>

        <div className="flex flex-col gap-5">
          <ImageField
            label="Kampanya görseli"
            name="image"
            current={campaign?.image}
            hint="Yatay (16:9) bir görsel en iyi sonucu verir."
          />
          <label className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-2.5">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={campaign ? campaign.is_active : true}
              className="size-4"
            />
            <span className="text-sm font-medium">Yayında</span>
          </label>
          <Field
            label="Sıra"
            name="sort"
            type="number"
            defaultValue={campaign?.sort ?? 0}
            hint="Küçük sayı önce görünür."
          />
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Başlangıç tarihi"
          name="starts_at"
          type="datetime-local"
          defaultValue={forInput(campaign?.starts_at)}
          hint="Boşsa hemen başlar."
        />
        <Field
          label="Bitiş tarihi"
          name="ends_at"
          type="datetime-local"
          defaultValue={forInput(campaign?.ends_at)}
          hint="Bu tarih geçince kampanya siteden kendiliğinden kalkar."
        />
      </section>

      <section>
        <h2 className="text-sm font-medium">Hangi hizmet sayfalarında görünsün</h2>
        <p className="mt-1 text-xs text-zinc-500">
          Seçtiklerinin sayfasında kampanya kutusu çıkar. Hiçbirini seçmezsen
          yalnızca anasayfa şeridinde ve kampanyalar sayfasında görünür.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
            >
              <input
                type="checkbox"
                name="service_ids"
                value={service.id}
                defaultChecked={selected.has(service.id)}
                className="size-4 shrink-0"
              />
              <span className="truncate">{service.copy.tr.name}</span>
            </label>
          ))}
        </div>
      </section>

      <details className="rounded-xl border border-black/10 bg-white p-5">
        <summary className="cursor-pointer text-sm font-medium">
          İngilizce metinler ve adres
        </summary>
        <div className="mt-5 flex flex-col gap-5">
          <Field
            label="Adres (slug)"
            name="slug"
            defaultValue={campaign?.slug}
            placeholder="başlıktan otomatik üretilir"
            hint="Kampanya sayfasının adresi. Yayına aldıktan sonra değiştirme."
          />
          <Field label="Başlık (EN)" name="title_en" defaultValue={campaign?.title_en} />
          <Field label="Rozet (EN)" name="badge_en" defaultValue={campaign?.badge_en} />
          <TextArea
            label="Kısa açıklama (EN)"
            name="excerpt_en"
            defaultValue={campaign?.excerpt_en}
          />
          <TextArea
            label="Detay metni (EN)"
            name="body_en"
            rows={5}
            defaultValue={campaign?.body_en}
            hint="Boş bırakırsan İngilizce sayfada Türkçesi görünür."
          />
        </div>
      </details>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex items-center gap-4">
        <SubmitButton>Kaydet ve yayınla</SubmitButton>
      </div>
    </form>
  );
}
