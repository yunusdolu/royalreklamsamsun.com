import type { Locale } from "@/i18n/routing";

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceHighlight {
  title: string;
  description: string;
}

/** Bir hizmetin tek dildeki tüm metinleri. */
export interface ServiceCopy {
  name: string;
  /** Menü ve breadcrumb için kısa ad */
  shortName: string;
  /** Kart üstü tek satırlık vurgu */
  tagline: string;
  /** Hizmet kartındaki açıklama (2 satır) */
  summary: string;
  /**
   * GEO (üretken arama motoru optimizasyonu) için "cevap-önce" tanım.
   * 40–60 kelime, tek paragraf, kendi başına anlamlı — dil modellerinin
   * doğrudan alıntılayabileceği biçimde yazılır.
   */
  answer: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** Gövde metni paragrafları */
  intro: string[];
  highlights: ServiceHighlight[];
  /** Teknik özellik tablosu — LLM'ler tabloyu düz metne tercih eder */
  specs: ServiceSpec[];
  /** "Fiyatı ne belirler" listesi */
  priceFactors: string[];
  /** Kimler için uygun */
  useCases: string[];
  faqs: ServiceFaq[];
}

export interface Service {
  id: string;
  /** Her dil için ayrı, o dilde anlamlı URL parçası */
  slug: Record<Locale, string>;
  /** lucide-react ikon adı */
  icon: string;
  /** Anasayfada öne çıkarılsın mı */
  featured: boolean;
  /** Ortalama teslim süresi (schema.org ve kart rozeti için) */
  leadTimeDays: [number, number];
  copy: Record<Locale, ServiceCopy>;
}
