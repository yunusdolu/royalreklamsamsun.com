"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Aranabilir seçim kutusu.
 *
 * Native `<select>` ve `<datalist>` işletim sisteminin kendi görünümünü
 * dayatıyor ve 81 maddelik bir listede arama vermiyordu. Bu bileşen yazdıkça
 * filtreliyor, klavyeyle gezilebiliyor ve sitenin kendi diliyle çiziliyor.
 *
 * `allowCustom` açıkken listede olmayan bir değer de yazılabilir — ilçe
 * önerisi bulunmayan illerde alanın kullanıcıyı tıkamaması için gerekli.
 */

/** Türkçe karakterleri sadeleştirip büyük/küçük harf farkını kaldırır. */
function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll("â", "a")
    .trim();
}

export function Combobox({
  id,
  value,
  onChange,
  options,
  placeholder,
  emptyText,
  allowCustom = false,
  className,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  /** Eşleşme yokken gösterilen metin (allowCustom kapalıyken) */
  emptyText?: string;
  allowCustom?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Kutu kapalıyken seçili değer, açıkken yazılan arama gösterilir
  const shown = open ? query : value;

  const filtered = useMemo(() => {
    if (!open || query.trim() === "") return options;
    const q = normalize(query);
    return options.filter((option) => normalize(option).includes(q));
  }, [open, query, options]);

  useEffect(() => setActive(0), [query, open]);

  // Dışarı tıklayınca kapat; serbest metne izin varsa yazılanı koru
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (wrapperRef.current?.contains(event.target as Node)) return;
      if (allowCustom && query.trim() !== "") onChange(query.trim());
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, allowCustom, query, onChange]);

  const select = (option: string) => {
    onChange(option);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) return setOpen(true);
      setActive((prev) => {
        const next = event.key === "ArrowDown" ? prev + 1 : prev - 1;
        if (filtered.length === 0) return 0;
        return (next + filtered.length) % filtered.length;
      });
      return;
    }
    if (event.key === "Enter") {
      if (open && filtered[active]) {
        event.preventDefault();
        select(filtered[active]);
      } else if (open && allowCustom && query.trim() !== "") {
        event.preventDefault();
        select(query.trim());
      }
      return;
    }
    if (event.key === "Escape") {
      setQuery("");
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          disabled={disabled}
          value={shown}
          /* Liste acikken alan yaziya hazir olsun diye bosalir; secili deger
             yer tutucuya dusuyor ki secim kaybolmus gibi gorunmesin. */
          placeholder={open && value ? value : placeholder}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            if (allowCustom) onChange(event.target.value);
          }}
          onKeyDown={onKeyDown}
          className={cn(
            "h-12 w-full rounded-xl border border-black/10 bg-white pl-4 pr-10 text-[0.9375rem] text-royal-fg outline-none transition-colors",
            "placeholder:text-royal-faint/70 focus:border-black/40 focus:ring-2 focus:ring-black/10",
            disabled && "cursor-not-allowed bg-black/[0.03] text-royal-faint",
          )}
        />
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-royal-faint transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </div>

      {open && (
        <ul
          id={listId}
          role="listbox"
          /* Lenis yumuşak kaydırma tekerleği sayfaya alıyor; bu nitelik
             olmadan liste kendi içinde kaydırılamıyor. */
          data-lenis-prevent
          className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto overscroll-contain rounded-2xl border border-black/[0.08] bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]"
        >
          {filtered.length === 0 && (
            <li className="px-3 py-2.5 text-[0.875rem] text-royal-faint">
              {allowCustom ? query : emptyText}
            </li>
          )}

          {filtered.map((option, index) => {
            const selected = option === value;
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => select(option)}
                  onMouseEnter={() => setActive(index)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-[0.875rem] transition-colors",
                    index === active
                      ? "bg-black text-white"
                      : "text-royal-fg hover:bg-black/[0.04]",
                  )}
                >
                  {option}
                  {selected && (
                    <Check className="size-4 shrink-0" aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
