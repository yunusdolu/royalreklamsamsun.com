import { siteConfig } from "@/config/site";

/**
 * ⚠️  MÜŞTERİ ONAYI GEREKTİREN VERİLER
 *
 * `projects` ve `foundingYear` değerleri temsilîdir ve Royal Reklam
 * tarafından doğrulanmalıdır. Doğrulanmadan yayına alınırsa sitede gerçek
 * olmayan bir iddia yer almış olur.
 *
 * `districts` (17) ve `warrantyYears` (2) değerleri sırasıyla Samsun'un ilçe
 * sayısı ve teklifte taahhüt edilen garanti süresidir.
 */
export const stats = {
  /** TODO: gerçek proje sayısı ile değiştirilecek */
  projects: 900,
  /** siteConfig.foundingYear üzerinden hesaplanır — TODO: kuruluş yılını doğrula */
  years: new Date().getFullYear() - siteConfig.foundingYear,
  /** Samsun'un toplam ilçe sayısı */
  districts: 17,
  warrantyYears: 2,
} as const;
