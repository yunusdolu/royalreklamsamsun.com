"use client";

import { Check, MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { services } from "@/content/services";
import { homeProvince, provinces } from "@/content/turkey";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Teklif oluşturucu.
 *
 * Sunucuya hiçbir veri gitmez: alanlar tarayıcıda yapılandırılmış bir
 * WhatsApp mesajına dönüştürülür ve `wa.me` bağlantısıyla açılır. Bunun üç
 * faydası var — (1) form altyapısı, spam koruması ve KVKK aydınlatma metni
 * gerekmez, (2) kullanıcı mesajı göndermeden önce görür ve düzenleyebilir,
 * (3) yanıt oranı klasik forma göre belirgin şekilde yüksektir.
 */

const LIGHTING = ["lit", "unlit", "unsure"] as const;
const PLACEMENT = [
  "ground",
  "upper",
  "freestanding",
  "indoor",
  "vehicle",
] as const;
const TIMING = ["urgent", "normal", "flexible"] as const;

type Lighting = (typeof LIGHTING)[number];
type Placement = (typeof PLACEMENT)[number];
type Timing = (typeof TIMING)[number];

export function QuoteBuilder() {
  const t = useTranslations("quotePage.form");
  const tReassure = useTranslations("quotePage.reassure");
  const tMessage = useTranslations("quotePage.message");
  const locale = useLocale() as Locale;

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [quantity, setQuantity] = useState("1");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lighting, setLighting] = useState<Lighting | "">("");
  const [placement, setPlacement] = useState<Placement | "">("");
  const [timing, setTiming] = useState<Timing | "">("");
  const [province, setProvince] = useState<string>(homeProvince);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [touched, setTouched] = useState(false);

  const toggleService = (label: string) =>
    setSelectedServices((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );

  /** Girilen cm ölçülerinden m² — yalnızca ikisi de doluysa hesaplanır */
  const area = useMemo(() => {
    const w = Number.parseFloat(width.replace(",", "."));
    const h = Number.parseFloat(height.replace(",", "."));
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      return null;
    }
    return ((w * h) / 10000).toFixed(2).replace(".", ",");
  }, [width, height]);

  const message = useMemo(() => {
    const lines: string[] = [tMessage("intro"), ""];

    if (selectedServices.length > 0) {
      lines.push(`• ${tMessage("service")}: ${selectedServices.join(", ")}`);
    }
    if (quantity && quantity !== "1")
      lines.push(`• ${tMessage("quantity")}: ${quantity}`);
    if (width && height) {
      lines.push(
        `• ${tMessage("size")}: ${width} cm x ${height} cm${area ? ` (~${area} m²)` : ""}`,
      );
    }
    if (lighting)
      lines.push(
        `• ${tMessage("lighting")}: ${t(`lightingOptions.${lighting}`)}`,
      );
    if (placement)
      lines.push(
        `• ${tMessage("placement")}: ${t(`placementOptions.${placement}`)}`,
      );
    if (timing)
      lines.push(`• ${tMessage("timing")}: ${t(`timingOptions.${timing}`)}`);
    if (province.trim())
      lines.push(`• ${tMessage("location")}: ${province.trim()}`);
    if (business) lines.push(`• ${tMessage("business")}: ${business}`);
    if (name) lines.push(`• ${tMessage("name")}: ${name}`);
    if (phone) lines.push(`• ${tMessage("phone")}: ${phone}`);
    if (details) lines.push("", details);

    return lines.join("\n");
  }, [
    selectedServices,
    quantity,
    width,
    height,
    area,
    lighting,
    placement,
    timing,
    province,
    business,
    name,
    phone,
    details,
    t,
    tMessage,
  ]);

  const isValid = selectedServices.length > 0 && name.trim().length > 0;

  /** Üç bölümün doluluk durumu — sağ paneldeki ilerleme göstergesi */
  const steps = useMemo(
    () => [
      { label: t("stepWhat"), done: selectedServices.length > 0 },
      {
        label: t("stepSpec"),
        done: Boolean((width && height) || lighting || placement || timing),
      },
      { label: t("stepWho"), done: name.trim().length > 0 },
    ],
    [selectedServices, width, height, lighting, placement, timing, name, t],
  );

  /** Panelin üstündeki tek satırlık özet çipleri */
  const summary = useMemo(() => {
    const parts: string[] = [];
    if (selectedServices.length > 0) {
      parts.push(
        selectedServices.length === 1
          ? selectedServices[0]
          : tMessage("summaryServices", { count: selectedServices.length }),
      );
    }
    if (quantity && quantity !== "1") {
      parts.push(tMessage("summaryQuantity", { count: quantity }));
    }
    if (area) parts.push(`${area} m²`);
    if (timing) parts.push(t(`timingOptions.${timing}`));
    return parts;
  }, [selectedServices, quantity, area, timing, t, tMessage]);

  const reset = () => {
    setSelectedServices([]);
    setQuantity("1");
    setWidth("");
    setHeight("");
    setLighting("");
    setPlacement("");
    setTiming("");
    setProvince(homeProvince);
    setName("");
    setPhone("");
    setBusiness("");
    setDetails("");
    setTouched(false);
  };

  const fieldClass =
    "h-12 rounded-xl border-black/10 bg-white text-[0.9375rem] text-royal-fg placeholder:text-royal-faint/70 focus-visible:border-black/40 focus-visible:ring-black/10";

  const labelClass = "text-[0.8125rem] font-medium text-royal-fg";

  const chip = (active: boolean) =>
    cn(
      "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.875rem] font-medium transition-all duration-300",
      active
        ? "bg-black text-white shadow-[0_12px_28px_-16px_rgba(0,0,0,0.9)]"
        : "border border-black/[0.09] bg-white text-royal-muted hover:border-black/30 hover:text-royal-fg",
    );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      {/* ---------------- Sol: form ---------------- */}
      <div className="space-y-6 lg:col-span-7">
        {/* 01 — Hizmet seçimi */}
        <Section index="01" title={t("sectionWhat")} hint={t("serviceHint")}>
          <fieldset>
            <legend className="sr-only">{t("serviceLabel")}</legend>
            <div className="flex flex-wrap gap-2.5">
              {services.map((item) => {
                const label = item.copy[locale].name;
                const active = selectedServices.includes(label);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleService(label)}
                    aria-pressed={active}
                    className={chip(active)}
                  >
                    {active && (
                      <Check className="size-3.5 shrink-0" aria-hidden="true" />
                    )}
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {touched && selectedServices.length === 0 && (
            <p className="mt-4 text-[0.8125rem] text-destructive">
              {t("required")}
            </p>
          )}
        </Section>

        {/* 02 — Ölçü ve koşullar */}
        <Section index="02" title={t("sectionSpec")}>
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <Label htmlFor="q-width" className={labelClass}>
                {t("widthLabel")}
              </Label>
              <Input
                id="q-width"
                inputMode="numeric"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                placeholder="400"
                className={cn("mt-2", fieldClass)}
              />
            </div>
            <div>
              <Label htmlFor="q-height" className={labelClass}>
                {t("heightLabel")}
              </Label>
              <Input
                id="q-height"
                inputMode="numeric"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                placeholder="80"
                className={cn("mt-2", fieldClass)}
              />
            </div>
            <div>
              <Label htmlFor="q-quantity" className={labelClass}>
                {t("quantityLabel")}
              </Label>
              <Input
                id="q-quantity"
                inputMode="numeric"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                className={cn("mt-2", fieldClass)}
              />
            </div>
          </div>

          {area && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3.5 py-1.5 text-[0.8125rem] text-royal-fg">
              {t("areaLabel")}
              <span className="font-bold tabular-nums">{area} m²</span>
            </p>
          )}

          <div className="mt-8 space-y-7 border-t border-black/[0.06] pt-7">
            <ChipGroup
              legend={t("lightingLabel")}
              options={LIGHTING.map((o) => ({
                value: o,
                label: t(`lightingOptions.${o}`),
              }))}
              selected={lighting}
              onSelect={(v) => setLighting(v as Lighting | "")}
              chip={chip}
            />
            <ChipGroup
              legend={t("placementLabel")}
              options={PLACEMENT.map((o) => ({
                value: o,
                label: t(`placementOptions.${o}`),
              }))}
              selected={placement}
              onSelect={(v) => setPlacement(v as Placement | "")}
              chip={chip}
            />
            <ChipGroup
              legend={t("timingLabel")}
              options={TIMING.map((o) => ({
                value: o,
                label: t(`timingOptions.${o}`),
              }))}
              selected={timing}
              onSelect={(v) => setTiming(v as Timing | "")}
              chip={chip}
            />
          </div>
        </Section>

        {/* 03 — İletişim */}
        <Section index="03" title={t("sectionWho")}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="q-name" className={labelClass}>
                {t("nameLabel")} <span className="text-gold-600">*</span>
              </Label>
              <Input
                id="q-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t("namePlaceholder")}
                autoComplete="name"
                className={cn(
                  "mt-2",
                  fieldClass,
                  touched && !name.trim() && "border-destructive/70",
                )}
              />
              {touched && !name.trim() && (
                <p className="mt-1.5 text-xs text-destructive">
                  {t("required")}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="q-phone" className={labelClass}>
                {t("phoneLabel")}
              </Label>
              <Input
                id="q-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={t("phonePlaceholder")}
                autoComplete="tel"
                className={cn("mt-2", fieldClass)}
              />
            </div>

            <div>
              <Label htmlFor="q-business" className={labelClass}>
                {t("businessLabel")}
              </Label>
              <Input
                id="q-business"
                value={business}
                onChange={(event) => setBusiness(event.target.value)}
                placeholder={t("businessPlaceholder")}
                autoComplete="organization"
                className={cn("mt-2", fieldClass)}
              />
            </div>

            <div>
              <Label htmlFor="q-province" className={labelClass}>
                {t("provinceLabel")}
              </Label>
              <Combobox
                id="q-province"
                value={province}
                onChange={setProvince}
                options={provinces}
                placeholder={t("provincePlaceholder")}
                emptyText={t("noMatch")}
                className="mt-2"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="q-details" className={labelClass}>
                {t("detailsLabel")}
              </Label>
              <Textarea
                id="q-details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder={t("detailsPlaceholder")}
                rows={4}
                className="mt-2 rounded-xl border-black/10 bg-white text-[0.9375rem] text-royal-fg placeholder:text-royal-faint/70 focus-visible:border-black/40 focus-visible:ring-black/10"
              />
            </div>
          </div>

          <p className="mt-6 border-t border-black/[0.06] pt-6 text-[0.875rem] leading-relaxed text-royal-muted">
            {t("photoNote")}
          </p>
        </Section>
      </div>

      {/* ---------------- Sağ: özet ve gönderim ---------------- */}
      <div className="lg:col-span-5">
        <div className="overflow-hidden rounded-3xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-7 sm:p-8 lg:sticky lg:top-28">
          {/* İlerleme — hangi bölüm dolduruldu */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
              {t("summaryTitle")}
            </span>
            <span className="text-[0.6875rem] font-medium tabular-nums text-white/40">
              {t("progress")} {steps.filter((s) => s.done).length}/3
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {steps.map((step) => (
              <div key={step.label}>
                <span
                  className={cn(
                    "block h-1 rounded-full transition-colors duration-500",
                    step.done ? "bg-gold-500" : "bg-white/12",
                  )}
                />
                <span
                  className={cn(
                    "mt-2 block text-[0.6875rem] transition-colors duration-500",
                    step.done ? "text-white/80" : "text-white/35",
                  )}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          {/* Seçim özeti */}
          <div className="mt-7 border-t border-white/10 pt-6">
            {summary.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {summary.map((part) => (
                  <span
                    key={part}
                    className="rounded-full bg-white/[0.08] px-3 py-1.5 text-[0.8125rem] font-medium text-white/85"
                  >
                    {part}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[0.875rem] text-white/40">
                {t("emptySummary")}
              </p>
            )}
          </div>

          {/* Gidecek mesaj */}
          <div className="mt-6">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("previewTitle")}
            </span>
            <pre
              data-lenis-prevent
              className="mt-3 max-h-56 overflow-y-auto overscroll-contain whitespace-pre-wrap break-words rounded-2xl bg-black/40 p-4 font-sans text-[0.8125rem] leading-relaxed text-white/70"
            >
              {message}
            </pre>
          </div>

          {/* Gönderim */}
          <a
            href={isValid ? whatsappLink(message) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              setTouched(true);
              if (!isValid) event.preventDefault();
            }}
            aria-disabled={!isValid}
            className={cn(
              "mt-6 flex h-14 items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-bold transition-colors",
              isValid
                ? "bg-[#25d366] text-black hover:bg-[#2ee674]"
                : "cursor-not-allowed bg-white/10 text-white/35",
            )}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            {t("submit")}
          </a>

          <p className="mt-2.5 text-center text-[0.75rem] text-white/40">
            {isValid ? t("ready") : t("missing")}
          </p>

          <a
            href={telLink}
            className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-[0.875rem] font-semibold text-white/80 transition-colors hover:border-white/35 hover:text-white"
          >
            <Phone className="size-4" aria-hidden="true" />
            {t("call")} · {siteConfig.contact.phoneDisplay}
          </a>

          {/* Güvenceler — eskiden formun altında öksüz duruyordu */}
          <ul className="mt-7 space-y-2.5 border-t border-white/10 pt-6">
            {[tReassure("free"), tReassure("noSpam"), tReassure("fast")].map(
              (line) => (
                <li
                  key={line}
                  className="flex items-baseline gap-3 text-[0.8125rem] leading-relaxed text-white/55"
                >
                  <span
                    className="h-px w-3 shrink-0 translate-y-[-0.25rem] bg-gold-500"
                    aria-hidden="true"
                  />
                  {line}
                </li>
              ),
            )}
          </ul>

          <button
            type="button"
            onClick={reset}
            className="mt-6 w-full text-center text-[0.75rem] text-white/30 transition-colors hover:text-white/70"
          >
            {t("clear")}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Numaralı form bölümü — başlık ağırlığı kartın kendisini taşıyor */
function Section({
  index,
  title,
  hint,
  children,
}: {
  index: string;
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-black/[0.06] pb-5">
        <h2 className="flex items-baseline gap-3 font-display text-[1.125rem] font-bold text-royal-fg">
          <span className="font-display text-[0.75rem] font-bold tabular-nums text-gold-600">
            {index}
          </span>
          {title}
        </h2>
        {hint && (
          <span className="text-[0.8125rem] text-royal-faint">{hint}</span>
        )}
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Tek seçimli çip grubu; aynı çipe basmak seçimi kaldırır */
function ChipGroup({
  legend,
  options,
  selected,
  onSelect,
  chip,
}: {
  legend: string;
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (value: string) => void;
  chip: (active: boolean) => string;
}) {
  return (
    <fieldset>
      <legend className="text-[0.8125rem] font-medium text-royal-fg">
        {legend}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((option) => {
          const active = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(active ? "" : option.value)}
              aria-pressed={active}
              className={chip(active)}
            >
              {active && (
                <Check className="size-3.5 shrink-0" aria-hidden="true" />
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
