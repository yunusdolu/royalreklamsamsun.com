"use client";

import { useActionState, useRef, useState } from "react";
import { ArrowDown, ArrowUp, GripVertical, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { SubmitButton } from "../../ui";
import { saveHomeLayout } from "../actions";

interface Section {
  key: string;
  label: string;
  note: string;
}

/**
 * Anasayfa bölümlerinin sırası.
 *
 * İki yolla taşınıyor: satırı tutup sürükleyerek ya da ok düğmeleriyle
 * (telefonda ve klavyeyle sürüklemek zor). Sıra, "Sırayı kaydet"e basılana
 * kadar yalnızca bu ekranda değişiyor; site kayıtla birlikte tazeleniyor.
 */
export function LayoutEditor({
  sections,
  initialOrder,
  defaultOrder,
}: {
  sections: Section[];
  initialOrder: string[];
  defaultOrder: string[];
}) {
  const [order, setOrder] = useState(initialOrder);
  const [dragging, setDragging] = useState<string | null>(null);
  const [error, formAction] = useActionState(saveHomeLayout, undefined);
  /* Sürüklerken aynı satırın üstünde durdukça tekrar tekrar yer değiştirmesin. */
  const lastSwap = useRef<string | null>(null);

  const byKey = new Map(sections.map((section) => [section.key, section]));
  const dirty = order.join() !== initialOrder.join();
  const isDefault = order.join() === defaultOrder.join();

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || from === to) return;
    setOrder((current) => {
      const next = [...current];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  return (
    <form action={formAction} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
      <input type="hidden" name="order" value={order.join(",")} />

      <div>
        <ol className="flex flex-col gap-2">
          {order.map((key, index) => {
            const section = byKey.get(key);
            if (!section) return null;
            return (
              <li
                key={key}
                draggable
                onDragStart={(event) => {
                  setDragging(key);
                  lastSwap.current = null;
                  event.dataTransfer.effectAllowed = "move";
                  /* Firefox veri konmadan sürüklemeyi başlatmıyor. */
                  event.dataTransfer.setData("text/plain", key);
                }}
                onDragOver={(event) => {
                  if (!dragging) return;
                  event.preventDefault();
                  if (dragging === key || lastSwap.current === key) return;
                  lastSwap.current = key;
                  move(order.indexOf(dragging), index);
                }}
                onDragLeave={() => {
                  if (lastSwap.current === key) lastSwap.current = null;
                }}
                onDragEnd={() => setDragging(null)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border bg-white px-3 py-3 transition-shadow",
                  dragging === key
                    ? "border-zinc-900 opacity-60 shadow-lg"
                    : "border-black/10 hover:border-black/25",
                )}
              >
                <span className="cursor-grab text-zinc-400 active:cursor-grabbing" aria-hidden="true">
                  <GripVertical className="size-5" />
                </span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-zinc-900 text-xs font-semibold tabular-nums text-white">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-zinc-900">{section.label}</span>
                  <span className="block truncate text-xs text-zinc-500">{section.note}</span>
                </span>
                <span className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                    aria-label={`${section.label} bölümünü yukarı taşı`}
                    className="rounded-lg border border-black/10 p-2 text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, index + 1)}
                    disabled={index === order.length - 1}
                    aria-label={`${section.label} bölümünü aşağı taşı`}
                    className="rounded-lg border border-black/10 p-2 text-zinc-700 transition-colors hover:bg-zinc-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowDown className="size-4" />
                  </button>
                </span>
              </li>
            );
          })}
        </ol>

        {error && (
          <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <SubmitButton>Sırayı kaydet</SubmitButton>
          <button
            type="button"
            onClick={() => setOrder(defaultOrder)}
            disabled={isDefault}
            className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-40"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            İlk sıraya dön
          </button>
          {dirty && (
            <span className="text-xs font-medium text-amber-700">
              Kaydedilmemiş değişiklik var
            </span>
          )}
        </div>
      </div>

      {/* Sayfanın küçük şeması: sıra bir bakışta görülsün. */}
      <aside aria-hidden="true" className="hidden lg:block">
        <p className="text-xs font-medium text-zinc-500">Sayfa görünümü</p>
        <div className="mt-2 flex flex-col gap-1.5 rounded-xl border border-black/10 bg-white p-2.5">
          <span className="rounded-md bg-zinc-100 py-1 text-center text-[10px] font-medium text-zinc-500">
            Logo ve menü
          </span>
          {order.map((key) => (
            <span
              key={key}
              className={cn(
                "rounded-md px-2 text-center text-[11px] font-medium",
                key === "hero" ? "py-5" : key === "marquee" ? "py-1" : "py-2.5",
                key === "stats" || key === "process" || key === "marquee"
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-200/70 text-zinc-700",
                dragging === key && "ring-2 ring-amber-500",
              )}
            >
              {byKey.get(key)?.label}
            </span>
          ))}
          <span className="rounded-md bg-zinc-100 py-1 text-center text-[10px] font-medium text-zinc-500">
            Alt bilgi
          </span>
        </div>
      </aside>
    </form>
  );
}
