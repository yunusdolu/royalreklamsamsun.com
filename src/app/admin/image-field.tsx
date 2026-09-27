"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair } from "lucide-react";

import { DirectUploadError, blockSubmitWhile, formatBytes, uploadDirect } from "./upload-client";

/**
 * Görsel alanı: yükleme + odak noktası + site önizlemesi.
 *
 * Site aynı fotoğrafı birden fazla oranda kırpıyor — kart neredeyse kare,
 * banner 3:1, telefonda 16:10. Hangi bölgenin kalacağına tarayıcı karar
 * verdiğinde tabelanın üstü ya da yazının yarısı kadraj dışında kalıyordu.
 * Burada fotoğrafın üstüne tıklanan nokta `object-position` olarak
 * saklanıyor; kırpma her oranda o noktayı merkezde tutmaya çalışıyor.
 *
 * Önizleme kutuları sitedeki gerçek oranlar. Amaç "kaydet, siteye bak, geri
 * gel" döngüsünü tamamen ortadan kaldırmak.
 *
 * Dosya seçilir seçilmez, küçültülmeden doğrudan depoya yükleniyor; forma
 * yalnızca adresi yazılıyor (bkz. upload-client). Dosya alanının bilerek
 * `name`'i yok: form gönderilirken dosyanın kendisi bir daha gitmesin.
 */

export interface PreviewSpec {
  /** Kutunun altında yazan yer adı. */
  label: string;
  /** en / boy oranı — 3 demek 3:1 demek. */
  ratio: number;
}

function parseFocus(value: string | null | undefined): { x: number; y: number } {
  if (!value) return { x: 50, y: 50 };
  const match = value.match(/(-?[\d.]+)%\s+(-?[\d.]+)%/);
  if (match) return { x: Number(match[1]), y: Number(match[2]) };
  /* "70% center" gibi eski değerler de okunabilsin. */
  const single = value.match(/(-?[\d.]+)%/);
  if (single) return { x: Number(single[1]), y: 50 };
  return { x: 50, y: 50 };
}

export function ImageField({
  label,
  name,
  current,
  currentFocus,
  hint,
  previews = [],
  folder,
}: {
  label: string;
  name: string;
  /** Depodaki klasör — sunucudaki kayıt işlemiyle aynı ad. */
  folder: string;
  current?: string | null;
  currentFocus?: string | null;
  hint?: string;
  previews?: PreviewSpec[];
}) {
  const [kept, setKept] = useState(current ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const [focus, setFocus] = useState(() => parseFocus(currentFocus));
  const [dragging, setDragging] = useState(false);
  const [note, setNote] = useState<{ tone: "info" | "error"; text: string } | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const busyRef = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const shown = preview ?? (kept || null);
  const position = `${focus.x}% ${focus.y}%`;

  useEffect(
    () =>
      blockSubmitWhile(
        fileRef.current?.form,
        () => busyRef.current,
        () => setNote({ tone: "error", text: "Görsel hâlâ yükleniyor; bitince kaydet." }),
      ),
    [],
  );

  async function upload(file: File) {
    busyRef.current = true;
    setPreview(URL.createObjectURL(file));
    setProgress(0);
    setNote({ tone: "info", text: `Yükleniyor… (${formatBytes(file.size)}, özgün kalitede)` });
    try {
      const url = await uploadDirect(file, folder, setProgress);
      setKept(url);
      setNote({ tone: "info", text: `Yüklendi (${formatBytes(file.size)}). Kaydetmeyi unutma.` });
    } catch (error) {
      setPreview(null);
      setNote({
        tone: "error",
        text: error instanceof DirectUploadError ? error.message : "Yükleme başarısız. Tekrar dene.",
      });
    } finally {
      busyRef.current = false;
      setProgress(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  /* Seçilen dosyanın blob adresi bellekte kalmasın. */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function pick(event: { clientX: number; clientY: number }) {
    const frame = frameRef.current;
    if (!frame) return;
    const box = frame.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    setFocus({
      x: Math.round(Math.min(100, Math.max(0, x))),
      y: Math.round(Math.min(100, Math.max(0, y))),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        {shown && (
          <span className="text-xs text-zinc-500">
            odak {focus.x}% / {focus.y}%
          </span>
        )}
      </div>

      {shown ? (
        <div
          ref={frameRef}
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
            pick(event);
          }}
          onPointerMove={(event) => dragging && pick(event)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          className="relative cursor-crosshair touch-none overflow-hidden rounded-lg border border-black/10 bg-zinc-100 select-none"
        >
          {/* Panel önizlemesi: kaynak hem yerel yol, hem Supabase adresi, hem
              de tarayıcıdaki geçici blob olabildiği için düz img. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shown}
            alt=""
            draggable={false}
            className="block max-h-56 w-full bg-white object-contain"
          />

          <span
            aria-hidden="true"
            style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
            className="pointer-events-none absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-zinc-900/80 text-white shadow"
          >
            <Crosshair className="size-3.5" />
          </span>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-black/15 px-3 py-8 text-center text-sm text-zinc-500">
          Görsel yok
        </p>
      )}

      {shown && (
        <p className="text-xs text-zinc-500">
          Fotoğrafın üstünde <strong>konunun merkezine tıkla</strong> —
          tabelanın ortası gibi. Kırpma her boyutta o noktayı korumaya çalışır.
        </p>
      )}

      <input type="hidden" name={`${name}_current`} value={kept} />
      <input type="hidden" name={`${name}_focus`} value={shown ? position : ""} />
      <input
        ref={fileRef}
        type="file"
        disabled={progress !== null}
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          if (file) void upload(file);
        }}
        className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
      />

      {progress !== null && (
        <span className="h-1.5 overflow-hidden rounded-full bg-zinc-200" aria-hidden="true">
          <span
            className="block h-full rounded-full bg-zinc-900 transition-[width]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </span>
      )}

      {note && (
        <span
          role={note.tone === "error" ? "alert" : "status"}
          className={`text-xs ${note.tone === "error" ? "text-red-600" : "text-zinc-500"}`}
        >
          {note.text}
        </span>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {shown && (
          <button
            type="button"
            onClick={() => setFocus({ x: 50, y: 50 })}
            className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-900"
          >
            Odağı ortala
          </button>
        )}
        {shown && (
          <button
            type="button"
            onClick={() => {
              setKept("");
              setPreview(null);
              setNote(null);
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-900"
          >
            Görseli kaldır
          </button>
        )}
      </div>

      {hint && <span className="text-xs text-zinc-500">{hint}</span>}

      {shown && previews.length > 0 && (
        <div className="rounded-lg border border-black/10 bg-zinc-50 p-3">
          <p className="text-xs font-medium text-zinc-600">
            Sitede böyle görünecek
          </p>
          <div className="mt-2.5 flex flex-wrap gap-3">
            {previews.map((spec) => (
              <figure key={spec.label} className="w-40">
                <div
                  style={{ aspectRatio: String(spec.ratio) }}
                  className="overflow-hidden rounded border border-black/10 bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shown}
                    alt=""
                    style={{ objectPosition: position }}
                    className="size-full object-cover"
                  />
                </div>
                <figcaption className="mt-1 text-[11px] text-zinc-500">
                  {spec.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
