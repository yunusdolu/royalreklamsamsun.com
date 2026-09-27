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

/**
 * Hizmetin alt türü — "kutu harf" içindeki "fileli krom harf" gibi.
 *
 * Açıklama zorunludur: yalnızca ad listelemek müşteriye de arama motoruna da
 * bir şey anlatmaz; asıl değer hangi çeşidin ne zaman doğru olduğunu söyleyen
 * cümlede.
 */
export interface ServiceVariant {
  name: string;
  description: string;
  /** Çeşidin 16:10 editoryal fotoğrafı (`public/images/services/variants/...`) */
  image?: string;
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
  /** Bu hizmet başlığı altında üretilen alt türler */
  variants: ServiceVariant[];
  faqs: ServiceFaq[];
}

export interface Service {
  id: string;
  /** Her dil için ayrı, o dilde anlamlı URL parçası */
  slug: Record<Locale, string>;
  /** lucide-react ikon adı */
  icon: string;
  /**
   * Hizmet kartındaki fotoğraf (`public/images/services/` altındaki yol).
   * Hem anasayfadaki hem hizmetler sayfasındaki kart bu görseli kullanır,
   * bu yüzden zorunludur — yeni bir hizmet eklenirken fotoğrafı da eklenir.
   */
  image: string;
  heroImage?: string;
  /**
   * Hero görselinin yatay odak noktası (`object-position`).
   *
   * Masaüstünde çerçeve de görsel de 3:1 olduğu için etkisi yoktur. Telefon
   * ve tablette çerçeve daha kare olduğundan görselin yanları kırpılır;
   * tabela kadranın ortasında değilse burada yüzde vererek odakta tutulur.
   * Boş bırakılırsa ortalanır.
   */
  heroFocus?: string;
  /**
   * Kart görselinin odak noktası. Kart anasayfada neredeyse kare, hizmetler
   * listesinde 16:10 kırpılıyor; konu kadranın kenarındaysa panelden
   * işaretlenen nokta merkezde tutuluyor.
   */
  cardFocus?: string;
  /** Anasayfada öne çıkarılsın mı */
  featured: boolean;
  /** Ortalama teslim süresi (schema.org ve kart rozeti için) */
  leadTimeDays: [number, number];
  copy: Record<Locale, ServiceCopy>;
}
