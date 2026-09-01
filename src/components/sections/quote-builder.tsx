"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { additionalDistricts, regions } from "@/content/regions";
import { services } from "@/content/services";
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
  const [region, setRegion] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [touched, setTouched] = useState(false);

  const districtOptions = useMemo(
    () => [...regions.map((r) => r.name[locale]), ...additionalDistricts],
    [locale],
  );

  const toggleService = (name: string) =>
    setSelectedServices((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
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
    if (region) lines.push(`• ${tMessage("location")}: ${region}`);
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
    region,
    business,
    name,
    phone,
    details,
    t,
    tMessage,
  ]);

  const isValid = selectedServices.length > 0 && name.trim().length > 0;

  /** Sağ paneldeki tek satırlık özet */
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
    setRegion("");
    setName("");
    setPhone("");
    setBusiness("");
    setDetails("");
    setTouched(false);
  };

  const fieldClass =
    "h-11 border-black/10 bg-white text-royal-fg placeholder:text-royal-faint focus-visible:border-black/30 focus-visible:ring-black/10";

  const chipClass = (active: boolean) =>
    cn(
      "rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-all duration-300",
      active
        ? "bg-black text-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.9)]"
        : "border border-black/[0.09] text-royal-muted hover:border-black/25 hover:text-royal-fg",
    );

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Alanlar */}
      <div className="space-y-5 lg:col-span-7">
        {/* 1 — Hizmet seçimi */}
        <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
              <span className="mr-2 text-gold-600">01</span>
              {t("sectionWhat")}
            </h2>
            <span className="text-[0.75rem] text-royal-faint">
              {t("serviceHint")}
            </span>
          </div>

          <fieldset className="mt-5">
            <legend className="sr-only">{t("serviceLabel")}</legend>
            <div className="flex flex-wrap gap-2">
              {services.map((item) => {
                const label = item.copy[locale].name;
                const active = selectedServices.includes(label);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleService(label)}
                    aria-pressed={active}
                    className={chipClass(active)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {touched && selectedServices.length === 0 && (
            <p className="mt-3 text-xs text-destructive">{t("required")}</p>
          )}
        </section>

        {/* 2 — İşin detayları */}
        <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
            <span className="mr-2 text-gold-600">02</span>
            {t("sectionSpec")}
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <Label htmlFor="q-width" className="text-royal-muted">
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
              <Label htmlFor="q-height" className="text-royal-muted">
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
              <Label htmlFor="q-quantity" className="text-royal-muted">
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
            <p className="mt-3 text-[0.8125rem] text-royal-muted">
              {t("areaLabel")}:{" "}
              <span className="font-semibold tabular-nums text-royal-fg">
                {area} m²
              </span>
            </p>
          )}

          <div className="mt-7 space-y-6 border-t border-black/[0.06] pt-6">
            <fieldset>
              <legend className="text-[0.8125rem] font-medium text-royal-muted">
                {t("lightingLabel")}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {LIGHTING.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setLighting((prev) => (prev === option ? "" : option))
                    }
                    aria-pressed={lighting === option}
                    className={chipClass(lighting === option)}
                  >
                    {t(`lightingOptions.${option}`)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[0.8125rem] font-medium text-royal-muted">
                {t("placementLabel")}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {PLACEMENT.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setPlacement((prev) => (prev === option ? "" : option))
                    }
                    aria-pressed={placement === option}
                    className={chipClass(placement === option)}
                  >
                    {t(`placementOptions.${option}`)}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[0.8125rem] font-medium text-royal-muted">
                {t("timingLabel")}
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TIMING.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setTiming((prev) => (prev === option ? "" : option))
                    }
                    aria-pressed={timing === option}
                    className={chipClass(timing === option)}
                  >
                    {t(`timingOptions.${option}`)}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </section>

        {/* 3 — İletişim */}
        <section className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-royal-faint">
            <span className="mr-2 text-gold-600">03</span>
            {t("sectionWho")}
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="q-name" className="text-royal-muted">
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
              <Label htmlFor="q-phone" className="text-royal-muted">
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
              <Label htmlFor="q-business" className="text-royal-muted">
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
              <Label htmlFor="q-region" className="text-royal-muted">
                {t("regionLabel")}
              </Label>
              <Input
                id="q-region"
                list="q-region-options"
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                placeholder={t("regionPlaceholder")}
                className={cn("mt-2", fieldClass)}
              />
              <datalist id="q-region-options">
                {districtOptions.map((district) => (
                  <option key={district} value={district} />
                ))}
              </datalist>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="q-details" className="text-royal-muted">
                {t("detailsLabel")}
              </Label>
              <Textarea
                id="q-details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder={t("detailsPlaceholder")}
                rows={4}
                className="mt-2 border-black/10 bg-white text-royal-fg placeholder:text-royal-faint focus-visible:border-black/30 focus-visible:ring-black/10"
              />
            </div>
          </div>

          <p className="mt-5 border-t border-black/[0.06] pt-5 text-[0.8125rem] leading-relaxed text-royal-muted">
            {t("photoNote")}
          </p>
        </section>

        <ul className="space-y-2 px-1">
          {[tReassure("free"), tReassure("noSpam"), tReassure("fast")].map(
            (line) => (
              <li
                key={line}
                className="flex items-baseline gap-3 text-[0.8125rem] text-royal-faint"
              >
                <span
                  className="h-px w-3 shrink-0 translate-y-[-0.2rem] bg-gold-600"
                  aria-hidden="true"
                />
                {line}
              </li>
            ),
          )}
        </ul>
      </div>

      {/* Canlı önizleme + gönderim */}
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#141416_0%,#252017_58%,#141416_100%)] p-6 sm:p-7">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
              {t("summaryTitle")}
            </span>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {summary.length > 0 ? (
                summary.map((part) => (
                  <span
                    key={part}
                    className="rounded-full bg-white/[0.08] px-3 py-1 text-[0.75rem] font-medium text-white/80"
                  >
                    {part}
                  </span>
                ))
              ) : (
                <span className="text-[0.8125rem] text-white/40">
                  {t("emptySummary")}
                </span>
              )}
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                {t("previewTitle")}
              </span>
              <pre className="mt-3 max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-xl bg-black/40 p-4 font-sans text-[0.8125rem] leading-relaxed text-white/70">
                {message}
              </pre>
            </div>

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
                "mt-6 flex h-12 items-center justify-center gap-2.5 rounded-full text-sm font-bold transition-colors",
                isValid
                  ? "bg-[#25d366] text-black hover:bg-[#2ee674]"
                  : "cursor-not-allowed bg-white/10 text-white/35",
              )}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {t("submit")}
            </a>

            <a
              href={telLink}
              className="mt-3 flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold text-white/80 transition-colors hover:border-white/35 hover:text-white"
            >
              <Phone className="size-4" aria-hidden="true" />
              {t("call")} · {siteConfig.contact.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={reset}
              className="mt-4 w-full text-center text-[0.75rem] text-white/35 transition-colors hover:text-white/70"
            >
              {t("clear")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
