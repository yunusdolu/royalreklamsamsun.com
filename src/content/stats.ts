import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

/**
 * ⚠️  MÜŞTERİ ONAYI GEREKTİREN VERİLER
 *
 * `projects` ve `foundingYear` değerleri temsilîdir ve Royal Reklam
 * tarafından doğrulanmalıdır. Doğrulanmadan yayına alınırsa sitede gerçek
 * olmayan bir iddia yer almış olur.
 *
 * `services` hizmet listesinden türetilir, elle güncellenmesi gerekmez.
 */
export const stats = {
  /** TODO: gerçek proje sayısı ile değiştirilecek */
  projects: 900,
  /** siteConfig.foundingYear üzerinden hesaplanır — TODO: kuruluş yılını doğrula */
  years: new Date().getFullYear() - siteConfig.foundingYear,
  /** Sunulan hizmet kalemi sayısı — içerik dosyasından türetilir */
  services: services.length,
  /**
   * Türkiye'nin toplam il sayısı. Montaj ekibi her ile gidebildiği için
   * kapsam göstergesi olarak kullanılır — "81 ilde iş yapıldı" değil,
   * "81 ile montaja gidiliyor" anlamındadır; etiket de buna göre yazıldı.
   */
  provinces: 81,
} as const;
