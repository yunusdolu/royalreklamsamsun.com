"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

/* Panelin ortak form parçaları. Sitenin tasarım sisteminden bilerek ayrı:
   burası tek kişinin kullandığı bir araç, okunaklı olması yeter. */

const inputClass =
  "w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900";

export function Field({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  hint?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  hint?: string;
  rows?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={inputClass + " resize-y leading-relaxed"}
      />
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

/**
 * Görsel alanı.
 *
 * Üç durumu var: mevcut görsel duruyor, yenisi seçildi, kaldırıldı. Seçilen
 * dosyanın önizlemesi tarayıcıda üretiliyor — yükleme kaydetmeye kadar
 * başlamıyor ki yarım kalan bir düzenleme depoda çöp bırakmasın.
 *
 * `name_current` gizli alanı, dosya seçilmediğinde hangi adresin korunacağını
 * sunucuya taşır.
 */
export function ImageField({
  label,
  name,
  current,
  hint,
}: {
  label: string;
  name: string;
  current?: string | null;
  hint?: string;
}) {
  const [kept, setKept] = useState(current ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const shown = preview ?? (kept || null);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>

      {shown ? (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-zinc-50">
          {/* Panel önizlemesi: next/image yerine düz img, çünkü kaynak hem
              yerel yol hem Supabase adresi hem de tarayıcıdaki geçici
              blob olabiliyor. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shown}
            alt=""
            className="max-h-48 w-full bg-white object-contain"
          />
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-black/15 px-3 py-6 text-center text-sm text-zinc-500">
          Görsel yok
        </p>
      )}

      <input type="hidden" name={`${name}_current`} value={kept} />
      <input
        ref={fileRef}
        name={name}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={(event) => {
          const file = event.target.files?.[0];
          setPreview(file ? URL.createObjectURL(file) : null);
        }}
        className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
      />

      {shown && (
        <button
          type="button"
          onClick={() => {
            setKept("");
            setPreview(null);
            if (fileRef.current) fileRef.current.value = "";
          }}
          className="self-start text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-900"
        >
          Görseli kaldır
        </button>
      )}

      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </div>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Kaydediliyor…" : children}
    </button>
  );
}
