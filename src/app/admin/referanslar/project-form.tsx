"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import type { Service } from "@/content/services";
import type { ProjectRow } from "@/lib/content/projects";
import { Field, SubmitButton, TextArea } from "../ui";
import { ImageField } from "../image-field";
import { DirectUploadError, blockSubmitWhile, uploadDirect } from "../upload-client";
import { saveProject } from "./actions";

/**
 * Galeri alanı.
 *
 * Kayıtlı fotoğraflar gizli alanlarla geri gönderiliyor; kaldırılan biri
 * listeden düşünce sunucuya hiç ulaşmıyor. Yeni seçilen fotoğraflar
 * seçildiği anda, küçültülmeden doğrudan depoya yükleniyor ve listeye
 * ekleniyor; form yalnızca adresleri gönderiyor.
 */
function Gallery({ current }: { current: string[] }) {
  const [kept, setKept] = useState(current);
  const [note, setNote] = useState<{ tone: "info" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () =>
      blockSubmitWhile(
        inputRef.current?.form,
        () => busyRef.current,
        () => setNote({ tone: "error", text: "Fotoğraflar hâlâ yükleniyor; bitince kaydet." }),
      ),
    [],
  );

  async function upload(files: File[]) {
    busyRef.current = true;
    setBusy(true);
    const failed: string[] = [];
    /* Sırayla: aynı anda on büyük dosya zayıf bağlantıyı kilitliyordu. */
    for (const [index, file] of files.entries()) {
      try {
        const url = await uploadDirect(file, "projects/galeri", (ratio) =>
          setNote({
            tone: "info",
            text: `${index + 1}/${files.length} yükleniyor… %${Math.round(ratio * 100)}`,
          }),
        );
        setKept((list) => [...list, url]);
      } catch (error) {
        failed.push(error instanceof DirectUploadError ? `${file.name}: ${error.message}` : file.name);
      }
    }
    busyRef.current = false;
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    setNote(
      failed.length > 0
        ? { tone: "error", text: `Yüklenemeyenler — ${failed.join(" · ")}` }
        : { tone: "info", text: `${files.length} fotoğraf yüklendi, özgün kalitede. Kaydetmeyi unutma.` },
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium">Galeri</span>

      {kept.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {kept.map((url) => (
            <li key={url} className="relative">
              <input type="hidden" name="gallery_keep" value={url} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="aspect-square w-full rounded-lg border border-black/10 object-cover"
              />
              <button
                type="button"
                aria-label="Fotoğrafı kaldır"
                onClick={() => setKept((list) => list.filter((x) => x !== url))}
                className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-zinc-900 text-white"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* `name` yok: dosyalar formla bir daha gitmesin, yalnızca adresleri. */}
      <input
        ref={inputRef}
        type="file"
        multiple
        disabled={busy}
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? []);
          if (files.length > 0) void upload(files);
        }}
        className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
      />
      {note ? (
        <span
          role={note.tone === "error" ? "alert" : "status"}
          className={`text-xs ${note.tone === "error" ? "text-red-600" : "text-zinc-500"}`}
        >
          {note.text}
        </span>
      ) : (
        <span className="text-xs text-zinc-500">
          Birden fazla fotoğrafı tek seferde seçebilirsin. Fotoğraflar özgün
          kalitesinde yüklenir.
        </span>
      )}
    </div>
  );
}

export function ProjectForm({
  project,
  services,
}: {
  project: ProjectRow | null;
  services: Pick<Service, "id" | "copy">[];
}) {
  const [error, formAction] = useActionState(saveProject, undefined);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-8">
      {project && <input type="hidden" name="id" value={project.id} />}

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-5">
          <Field
            label="İş başlığı"
            name="title_tr"
            required
            defaultValue={project?.title_tr}
            placeholder="Atakum'da kutu harf tabela"
          />
          <Field
            label="Müşteri"
            name="client"
            defaultValue={project?.client}
            placeholder="Kafe Nar"
            hint="Boş bırakabilirsin."
          />
          <TextArea
            label="Kısa açıklama"
            name="summary_tr"
            defaultValue={project?.summary_tr}
            hint="Referans kartında bu metin görünür."
          />
          <TextArea
            label="Detay metni"
            name="body_tr"
            rows={5}
            defaultValue={project?.body_tr?.join("\n")}
            hint="Her satır ayrı bir paragraf olur."
          />
          <TextArea
            label="Yapılan işler"
            name="scope_tr"
            rows={4}
            defaultValue={project?.scope_tr?.join("\n")}
            placeholder={"Tasarım\nİmalat\nMontaj"}
            hint="Her satır ayrı bir madde olur."
          />
        </div>

        <div className="flex flex-col gap-5">
          <ImageField
            label="Kapak fotoğrafı"
            name="cover"
            folder="projects/kapak"
            current={project?.cover}
            currentFocus={project?.cover_focus}
            hint="Referans listesindeki kart görseli."
            previews={[{ label: "Referans kartı", ratio: 4 / 3 }]}
          />
          <label className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-white px-3 py-2.5">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={project ? project.is_published : true}
              className="size-4"
            />
            <span className="text-sm font-medium">Yayında</span>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Hizmet</span>
            <select
              name="service_id"
              defaultValue={project?.service_id ?? ""}
              className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-900"
            >
              <option value="">Seçilmedi</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.copy.tr.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-zinc-500">
              Referanslar sayfasındaki filtrede bu seçim kullanılır.
            </span>
          </label>
          <Field
            label="Yıl"
            name="year"
            type="number"
            defaultValue={project?.year ?? new Date().getFullYear()}
          />
          <Field
            label="Sıra"
            name="sort"
            type="number"
            defaultValue={project?.sort ?? 0}
            hint="Küçük sayı önce görünür."
          />
        </div>
      </section>

      <Gallery current={project?.gallery ?? []} />

      <details className="rounded-xl border border-black/10 bg-white p-5">
        <summary className="cursor-pointer text-sm font-medium">
          İngilizce metinler ve adres
        </summary>
        <div className="mt-5 flex flex-col gap-5">
          <Field
            label="Adres (slug)"
            name="slug_tr"
            defaultValue={project?.slug_tr}
            placeholder="başlıktan otomatik üretilir"
          />
          <Field
            label="Adres (EN)"
            name="slug_en"
            defaultValue={project?.slug_en}
            placeholder="boşsa Türkçesiyle aynı olur"
          />
          <Field label="Başlık (EN)" name="title_en" defaultValue={project?.title_en} />
          <TextArea
            label="Kısa açıklama (EN)"
            name="summary_en"
            defaultValue={project?.summary_en}
          />
          <TextArea
            label="Detay metni (EN)"
            name="body_en"
            rows={4}
            defaultValue={project?.body_en?.join("\n")}
          />
          <TextArea
            label="Yapılan işler (EN)"
            name="scope_en"
            rows={3}
            defaultValue={project?.scope_en?.join("\n")}
            hint="Boş bırakırsan İngilizce sayfada Türkçesi görünür."
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
