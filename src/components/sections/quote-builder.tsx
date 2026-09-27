"use client";

import { Check, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import type { Service } from "@/content/services";
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

export function QuoteBuilder({ services }: { services: Service[] }) {
  const t = useTranslations("quotePage.form");
  const tReassure = useTranslations("quotePage.reassure");
  const tMessage = useTranslations("quotePage.message");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;

  /*
    Kimlik tutuluyor, ad değil: çeşitleri hizmete bağlamak için kimlik şart
    ve paneldeki bir ad değişikliği seçimi bozmuyor.
  */
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  /** "hizmetKimligi::çeşitAdı" — aynı çeşit adı iki hizmette geçebiliyor. */
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
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

  const byId = useMemo(
    () => new Map(services.map((item) => [item.id, item])),
    [services],
  );

  const serviceName = (id: string) => byId.get(id)?.copy[locale].name ?? id;

  const toggleService = (id: string) =>
    setSelectedServices((prev) => {
      if (!prev.includes(id)) return [...prev, id];
      /* Hizmet kaldırılınca altındaki çeşit seçimleri de gitmeli. */
      setSelectedVariants((list) =>
        list.filter((key) => !key.startsWith(`${id}::`)),
      );
      return prev.filter((item) => item !== id);
    });

  const toggleVariant = (key: string) =>
    setSelectedVariants((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
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
      /*
        Çeşitler ayrı bir satır değil, ait oldukları hizmetin parantezi:
        "Tabela (kör kasa, fener)" okunurken hangi çeşidin hangi işe ait
        olduğu belli oluyor, ayrı satırda olsaydı olmazdı.
      */
      const parts = selectedServices.map((id) => {
        const item = byId.get(id);
        if (!item) return id;
        const picked = item.copy[locale].variants
          .filter((variant) =>
            selectedVariants.includes(`${id}::${variant.name}`),
          )
          .map((variant) => variant.name);
        return picked.length > 0
          ? `${item.copy[locale].name} (${picked.join(", ")})`
          : item.copy[locale].name;
      });
      lines.push(`• ${tMessage("service")}: ${parts.join(", ")}`);
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
    selectedVariants,
    byId,
    locale,
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
          ? serviceName(selectedServices[0])
          : tMessage("summaryServices", { count: selectedServices.length }),
      );
    }
    if (selectedVariants.length > 0) {
      parts.push(t("variantSummary", { count: selectedVariants.length }));
    }
    if (quantity && quantity !== "1") {
      parts.push(tMessage("summaryQuantity", { count: quantity }));
    }
    if (area) parts.push(`${area} m²`);
    if (timing) parts.push(t(`timingOptions.${timing}`));
    return parts;
    // serviceName yalnızca byId'ye bakıyor; ayrı bağımlılık gerekmiyor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, selectedVariants, byId, quantity, area, timing, t, tMessage]);

  const reset = () => {
    setSelectedServices([]);
    setSelectedVariants([]);
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
    "h-12 rounded-lg border-black/10 bg-white text-[0.9375rem] text-royal-fg placeholder:text-royal-faint/70 focus-visible:border-black/40 focus-visible:ring-black/10";

  const labelClass = "text-[0.8125rem] font-medium text-royal-fg";

  const chip = (active: boolean) =>
    cn(
      "inline-flex items-center gap-2 rounded-[0.3rem] px-4 py-2.5 text-[0.875rem] font-medium transition-all duration-300",
      active
        ? "bg-black text-white shadow-[0_12px_28px_-16px_rgba(0,0,0,0.9)]"
        : "border border-black/[0.09] bg-white text-royal-muted hover:border-black/30 hover:text-royal-fg",
    );

  return (
    <div className="grid gap-8 pb-28 lg:grid-cols-12 lg:gap-12 lg:pb-0">
      {/* ---------------- Sol: form ---------------- */}
      <div className="space-y-10 lg:col-span-7">
        {/* 01 — Hizmet seçimi */}
        <Section index="01" title={t("sectionWhat")} hint={t("serviceHint")}>
          <fieldset>
            <legend className="sr-only">{t("serviceLabel")}</legend>
            {/*
              Onikisi de aynı boyda gri çipti; hangisinin ne olduğunu ancak
              okuyarak anlıyordun. Tabela işi görsel bir iş, seçim de öyle
              olmalı — kartın fotoğrafı zaten panelde yönetiliyor.
            */}
            {/*
              Fotoğraf denendi ve iyi görünüyordu ama on iki fotoğrafın
              yüksekliği altındaki çeşit listesini ekrandan itiyordu. İkon
              hem sayfayı hafifletiyor hem de asıl seçim burada değil, altta
              açılan çeşitlerde.
            */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {services.map((item) => {
                const active = selectedServices.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleService(item.id)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-all duration-300",
                      active
                        ? "border-black bg-black text-white"
                        : "border-black/[0.09] bg-white text-royal-fg hover:border-black/30",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-[0.3rem] transition-colors",
                        active ? "bg-white/15 text-white" : "bg-black/[0.04] text-royal-muted",
                      )}
                    >
                      <ServiceIcon name={item.icon} className="size-4.5" />
                    </span>
                    <span className="min-w-0 text-[0.8125rem] font-medium leading-tight">
                      {item.copy[locale].name}
                    </span>
                    {active && (
                      <Check className="ml-auto size-4 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>

            {/*
              Çeşitler yalnızca ilgili hizmet seçilince açılıyor. Hepsini
              birden göstermek 101 seçenek demekti; kimse okumaz.
            */}
            {selectedServices.length > 0 && (
              <div className="mt-7 flex flex-col gap-6 border-t border-black/[0.06] pt-7">
                {selectedServices.map((id) => {
                  const item = byId.get(id);
                  if (!item || item.copy[locale].variants.length === 0) return null;
                  return (
                    <fieldset key={id}>
                      <legend className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-[0.8125rem] font-medium text-royal-fg">
                          {tCommon("variantsTitle", {
                            service: item.copy[locale].shortName,
                          })}
                        </span>
                        <span className="text-[0.75rem] text-royal-faint">
                          {t("serviceHint")}
                        </span>
                      </legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.copy[locale].variants.map((variant) => {
                          const key = `${id}::${variant.name}`;
                          const picked = selectedVariants.includes(key);
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => toggleVariant(key)}
                              aria-pressed={picked}
                              title={variant.description}
                              className={cn(
                                "rounded-[0.3rem] px-3.5 py-2 text-[0.8125rem] transition-all duration-300",
                                picked
                                  ? "bg-black font-medium text-white"
                                  : "border border-black/[0.09] bg-white text-royal-muted hover:border-black/30 hover:text-royal-fg",
                              )}
                            >
                              {variant.name}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            )}
          </fieldset>

          {touched && selectedServices.length === 0 && (
            <p className="mt-4 text-[0.8125rem] text-destructive">
              {t("required")}
            </p>
          )}
        </Section>

        {/* 02 — Ölçü ve koşullar */}
        <Section index="02" title={t("sectionSpec")}>
          {/*
            Genişlik ve yükseklik artık kaydırakla veriliyor. Boş bir sayı
            kutusu "buraya ne yazacağım" sorusunu doğuruyordu; kaydırak makul
            aralığı baştan gösteriyor ve sürüklerken m² anında güncelleniyor.
            Kesin ölçüsü olan yine sayıyı elle yazabiliyor.
          */}
          <div className="flex flex-col gap-6">
            <SizeSlider
              id="q-width"
              label={t("widthLabel")}
              value={width}
              onChange={setWidth}
              max={1000}
              step={10}
            />
            <SizeSlider
              id="q-height"
              label={t("heightLabel")}
              value={height}
              onChange={setHeight}
              max={500}
              step={5}
            />

            <div className="w-full sm:max-w-[12rem]">
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
        <SummaryPanel
          steps={steps}
          summary={summary}
          message={message}
          isValid={isValid}
          area={area}
          onSend={() => setTouched(true)}
          onReset={reset}
          t={t}
          tReassure={tReassure}
        />
      </div>

      {/*
        Telefonda gönderim çubuğu ekranın altına sabitleniyor. Önceki
        tasarımda özet paneli formun altında kalıyordu: kullanıcı on alanı
        dolduruyor, sonra göndermek için sayfanın sonuna kadar kaydırmak
        zorunda kalıyordu. Buton artık her an elinin altında.
      */}
      <MobileSendBar
        steps={steps}
        isValid={isValid}
        message={message}
        onSend={() => setTouched(true)}
        t={t}
      />
    </div>
  );
}

interface StepState {
  label: string;
  done: boolean;
}

type Translate = (key: string) => string;

/**
 * Özet ve gönderim kartı.
 *
 * Eskiden koyu bir gradyan kutuydu; beyaz sayfanın ortasında yamalı duruyor
 * ve içindeki her şey (ilerleme, çipler, mesaj önizlemesi, üç buton, üç
 * güvence satırı) aynı görsel ağırlıkta yarışıyordu. Artık formun kendisiyle
 * aynı beyaz kart dilinde ve tek bir hiyerarşisi var: ne seçtin, ne gidecek,
 * gönder.
 */
function SummaryPanel({
  steps,
  summary,
  message,
  isValid,
  area,
  onSend,
  onReset,
  t,
  tReassure,
}: {
  steps: StepState[];
  summary: string[];
  message: string;
  isValid: boolean;
  area: string | null;
  onSend: () => void;
  onReset: () => void;
  t: Translate;
  tReassure: Translate;
}) {
  const done = steps.filter((step) => step.done).length;

  /*
    Sayfanın tek koyu öğesi. Beyaz üstüne beyaz form göz için düz bir yüzeydi;
    gönderim tarafını siyaha çekmek hem onu ayırıyor hem de markanın
    siyah-altın diline oturuyor.
  */
  return (
    <div className="rounded-xl bg-royal-fg p-6 text-white sm:p-7 lg:sticky lg:top-28">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-[1.125rem] font-bold text-white">
          {t("summaryTitle")}
        </h2>
        <span className="text-[0.8125rem] font-medium tabular-nums text-gold-500">
          {done}/3
        </span>
      </div>

      <ol className="mt-5 flex flex-col gap-2.5">
        {steps.map((step, index) => (
          <li key={step.label} className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full text-[0.6875rem] font-bold transition-colors",
                step.done
                  ? "bg-gold-500 text-black"
                  : "border border-white/20 text-white/45",
              )}
            >
              {step.done ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                "text-[0.875rem] transition-colors",
                step.done ? "font-medium text-white" : "text-white/45",
              )}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t border-white/12 pt-5">
        {summary.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {summary.map((part) => (
              <span
                key={part}
                className="rounded-[0.3rem] bg-white/10 px-3 py-1.5 text-[0.8125rem] font-medium text-white/90"
              >
                {part}
              </span>
            ))}
            {area && (
              <span className="rounded-[0.3rem] bg-gold-500 px-3 py-1.5 text-[0.8125rem] font-bold text-black">
                {area} m²
              </span>
            )}
          </div>
        ) : (
          <p className="text-[0.875rem] text-white/45">{t("emptySummary")}</p>
        )}
      </div>

      {/*
        Mesaj önizlemesi katlanır. Kullanıcıların çoğu ona bakmadan
        gönderiyor, ama bakmak isteyenden de gizlemek olmaz; açık haliyle
        kartın yarısını kaplıyordu.
      */}
      <details className="group mt-5 border-t border-white/12 pt-5">
        <summary className="flex cursor-pointer items-center justify-between gap-3 text-[0.8125rem] font-medium text-white/65 transition-colors hover:text-white">
          {t("previewTitle")}
          <ChevronDown
            className="size-4 shrink-0 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <pre
          data-lenis-prevent
          className="mt-3 max-h-56 overflow-y-auto overscroll-contain whitespace-pre-wrap break-words rounded-lg bg-black/40 p-4 font-sans text-[0.8125rem] leading-relaxed text-white/70"
        >
          {message}
        </pre>
      </details>

      <a
        href={isValid ? whatsappLink(message) : undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          onSend();
          if (!isValid) event.preventDefault();
        }}
        aria-disabled={!isValid}
        className={cn(
          "mt-6 flex h-14 items-center justify-center gap-2.5 rounded-lg text-[0.9375rem] font-bold transition-colors",
          isValid
            ? "bg-[#25d366] text-black hover:bg-[#2ee674]"
            : "cursor-not-allowed bg-white/10 text-white/40",
        )}
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        {t("submit")}
      </a>

      <p className="mt-2.5 text-center text-[0.75rem] text-white/45">
        {isValid ? t("ready") : t("missing")}
      </p>

      <a
        href={telLink}
        className="mt-4 flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 text-[0.875rem] font-semibold text-white/85 transition-colors hover:border-white/45 hover:text-white"
      >
        <Phone className="size-4" aria-hidden="true" />
        {t("call")} · {siteConfig.contact.phoneDisplay}
      </a>

      <ul className="mt-6 flex flex-col gap-2 border-t border-white/12 pt-5">
        {[tReassure("free"), tReassure("noSpam"), tReassure("fast")].map(
          (line) => (
            <li
              key={line}
              className="flex items-baseline gap-2.5 text-[0.8125rem] leading-relaxed text-white/60"
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
        onClick={onReset}
        className="mt-5 w-full text-center text-[0.75rem] text-white/35 transition-colors hover:text-white/80"
      >
        {t("clear")}
      </button>
    </div>
  );
}

/** Telefonda ekranın altına sabitlenen gönderim çubuğu. */
function MobileSendBar({
  steps,
  isValid,
  message,
  onSend,
  t,
}: {
  steps: StepState[];
  isValid: boolean;
  message: string;
  onSend: () => void;
  t: Translate;
}) {
  const done = steps.filter((step) => step.done).length;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 px-4 pb-3 pt-2.5 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-2xl flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 gap-1">
            {steps.map((step) => (
              <span
                key={step.label}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  step.done ? "bg-gold-500" : "bg-black/10",
                )}
              />
            ))}
          </div>
          <span className="shrink-0 text-[0.75rem] font-medium tabular-nums text-royal-faint">
            {done}/3
          </span>
        </div>

        <a
          href={isValid ? whatsappLink(message) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => {
            onSend();
            if (!isValid) event.preventDefault();
          }}
          aria-disabled={!isValid}
          className={cn(
            "flex h-12 items-center justify-center gap-2 rounded-lg text-[0.875rem] font-bold transition-colors",
            isValid
              ? "bg-[#25d366] text-black"
              : "cursor-not-allowed bg-royal-fg text-white/45",
          )}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          {isValid ? t("submit") : t("missing")}
        </a>
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
  /*
    Kart içinde kart yerine açık bölüm: üstte ince çizgi, solda siyah numara.
    Üç beyaz kutu üst üste dizilince sayfa kendi içeriğinden çok kendi
    çerçevelerini gösteriyordu.
  */
  return (
    <section className="border-t border-black/10 pt-8 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="flex items-center gap-3 font-display text-[1.125rem] font-bold text-royal-fg">
          <span className="grid size-7 shrink-0 place-items-center rounded-[0.3rem] bg-royal-fg text-[0.6875rem] font-bold tabular-nums text-white">
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

/**
 * Ölçü kaydırağı.
 *
 * Kaydırak ve sayı kutusu aynı değeri paylaşıyor: sürükleyerek yaklaşık
 * ölçüyü veren de, elinde kesin rakam olup yazan da aynı alanı kullanıyor.
 * Değer metin olarak tutuluyor çünkü alan boş bırakılabilmeli — sıfır ile
 * "girilmedi" farklı şeyler.
 */
function SizeSlider({
  id,
  label,
  value,
  onChange,
  max,
  step,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  max: number;
  step: number;
}) {
  const numeric = Number.parseFloat(value.replace(",", "."));
  const current = Number.isFinite(numeric) ? numeric : 0;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor={id} className="text-[0.8125rem] font-medium text-royal-fg">
          {label}
        </Label>
        <span className="flex items-baseline gap-1.5">
          <input
            aria-label={label}
            inputMode="numeric"
            value={value}
            onChange={(event) => onChange(event.target.value.replace(/[^\d.,]/g, ""))}
            placeholder="0"
            className="w-16 rounded-[0.3rem] border border-black/10 bg-white px-2 py-1 text-right text-[0.9375rem] font-bold tabular-nums text-royal-fg outline-none focus:border-black/40"
          />
          <span className="text-[0.75rem] text-royal-faint">cm</span>
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={0}
        max={max}
        step={step}
        value={Math.min(current, max)}
        onChange={(event) => onChange(event.target.value)}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-black outline-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.35)] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-black"
      />

      <div className="mt-1.5 flex justify-between text-[0.6875rem] tabular-nums text-royal-faint">
        <span>0</span>
        <span>{max} cm</span>
      </div>
    </div>
  );
}
