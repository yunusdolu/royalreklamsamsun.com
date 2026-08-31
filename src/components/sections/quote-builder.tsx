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
 * Sunucuya hiçbir veri gitmez: alanlar tarayıcıda bir WhatsApp mesajına
 * dönüştürülür ve `wa.me` bağlantısıyla açılır. Bunun üç faydası var —
 * (1) form altyapısı, spam koruması ve KVKK aydınlatma metni gerekmez,
 * (2) kullanıcı mesajı göndermeden önce görür ve düzenleyebilir,
 * (3) yanıt oranı klasik forma göre belirgin şekilde yüksektir.
 */
export function QuoteBuilder() {
  const t = useTranslations("quotePage.form");
  const tReassure = useTranslations("quotePage.reassure");
  const locale = useLocale() as Locale;

  const [service, setService] = useState("");
  const [region, setRegion] = useState("");
  const [size, setSize] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [details, setDetails] = useState("");
  const [touched, setTouched] = useState(false);

  const districtOptions = useMemo(
    () => [...regions.map((r) => r.name[locale]), ...additionalDistricts],
    [locale],
  );

  const message = useMemo(() => {
    const lines: string[] = [
      `Merhaba ${siteConfig.name}, web sitenizden teklif istiyorum.`,
      "",
    ];
    if (service) lines.push(`• Hizmet: ${service}`);
    if (region) lines.push(`• Konum: ${region}`);
    if (size) lines.push(`• Yaklaşık ölçü: ${size}`);
    if (business) lines.push(`• İşletme: ${business}`);
    if (name) lines.push(`• Ad Soyad: ${name}`);
    if (details) lines.push("", details);
    return lines.join("\n");
  }, [service, region, size, business, name, details]);

  const isValid = service.trim().length > 0 && name.trim().length > 0;

  const fieldClass =
    "h-11 border-royal-border bg-royal-graphite text-royal-fg placeholder:text-royal-faint focus-visible:border-gold-500/60 focus-visible:ring-gold-500/25";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Alanlar */}
      <div className="lg:col-span-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="q-service" className="text-royal-muted">
              {t("serviceLabel")} <span className="text-gold-500">*</span>
            </Label>
            <select
              id="q-service"
              value={service}
              onChange={(event) => setService(event.target.value)}
              className={cn(
                "mt-2 w-full rounded-md border px-3 text-sm outline-none transition-colors",
                fieldClass,
                touched && !service.trim()
                  ? "border-destructive/70"
                  : "border-royal-border",
              )}
            >
              <option value="">{t("servicePlaceholder")}</option>
              {services.map((item) => (
                <option key={item.id} value={item.copy[locale].name}>
                  {item.copy[locale].name}
                </option>
              ))}
            </select>
            {touched && !service.trim() && (
              <p className="mt-1.5 text-xs text-destructive">{t("required")}</p>
            )}
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

          <div>
            <Label htmlFor="q-size" className="text-royal-muted">
              {t("sizeLabel")}
            </Label>
            <Input
              id="q-size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              placeholder={t("sizePlaceholder")}
              className={cn("mt-2", fieldClass)}
            />
          </div>

          <div>
            <Label htmlFor="q-name" className="text-royal-muted">
              {t("nameLabel")} <span className="text-gold-500">*</span>
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
              <p className="mt-1.5 text-xs text-destructive">{t("required")}</p>
            )}
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
              className="mt-2 border-royal-border bg-royal-graphite text-royal-fg placeholder:text-royal-faint focus-visible:border-gold-500/60 focus-visible:ring-gold-500/25"
            />
          </div>
        </div>

        <ul className="mt-7 space-y-2">
          {[tReassure("free"), tReassure("noSpam"), tReassure("fast")].map(
            (line) => (
              <li
                key={line}
                className="flex gap-2.5 text-[0.8125rem] text-royal-faint"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-600"
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
          <div className="surface-royal rounded-xl p-6">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-500">
              {t("previewTitle")}
            </h2>

            <pre className="mt-4 max-h-72 overflow-y-auto whitespace-pre-wrap break-words rounded-lg border border-royal-border bg-royal-black/60 p-4 font-sans text-[0.8125rem] leading-relaxed text-royal-muted">
              {message}
            </pre>

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
                "mt-5 flex h-12 items-center justify-center gap-2.5 rounded-md text-sm font-bold transition-colors",
                isValid
                  ? "bg-[#1f8f4e] text-white hover:bg-[#25a75c]"
                  : "cursor-not-allowed bg-royal-elevated text-royal-faint",
              )}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {t("submit")}
            </a>

            <a
              href={telLink}
              className="mt-3 flex h-11 items-center justify-center gap-2 rounded-md border border-gold-500/35 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-500/10"
            >
              <Phone className="size-4" aria-hidden="true" />
              {t("call")} · {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
