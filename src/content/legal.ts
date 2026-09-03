import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

/**
 * KURUMSAL METİNLER (gizlilik, çerez, KVKK)
 *
 * Metinler sitenin GERÇEK davranışına göre yazılmıştır:
 *  - sunucu tarafı form yoktur, teklif oluşturucu tarayıcıda çalışır,
 *  - analitik, reklam veya izleme kodu bulunmaz, site kendi çerezini yazmaz,
 *  - tek üçüncü taraf gömülü içerik Google Haritalar'dır.
 * Site bu davranışlardan biri değişirse (ör. analitik eklenirse) bu metinler
 * de güncellenmelidir.
 *
 * ⚠️ KVKK metni hukuki taahhüt içerir; yayına almadan önce Royal Reklam
 * tarafından onaylanmalıdır.
 */

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalCopy {
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: LegalSection[];
}

export interface LegalDoc {
  id: string;
  copy: Record<Locale, LegalCopy>;
}

/** Metinlerin son gözden geçirme tarihi — sayfada gösterilir. */
export const legalUpdated = "2026-09-01";

const kurum = `${siteConfig.legalName}`;

export const legalDocs: Record<string, LegalDoc> = {
  gizlilik: {
    id: "gizlilik",
    copy: {
      tr: {
        title: "Gizlilik Politikası",
        metaTitle: "Gizlilik Politikası | Royal Reklam Samsun",
        metaDescription:
          "Royal Reklam web sitesinde hangi verilerin işlendiği, teklif oluşturucunun nasıl çalıştığı ve üçüncü taraf hizmetler hakkında bilgi.",
        lead: "Bu sitede iletişim formu yoktur ve ziyaretiniz sunucumuzda kişisel bir kayıt oluşturmaz. Aşağıda hangi bilgilerin nerede işlendiğini açıkça yazdık.",
        sections: [
          {
            heading: "Sitede form yok, kayıt yok",
            paragraphs: [
              "Web sitemizde sunucuya veri gönderen bir iletişim formu bulunmuyor. Sayfaları gezerken ad, telefon veya e-posta gibi bir bilgi istenmez ve saklanmaz.",
              "Teklif sayfasındaki teklif oluşturucu tamamen tarayıcınızda çalışır. Girdiğiniz bilgiler bize otomatik olarak iletilmez; yalnızca bir WhatsApp mesajı metnine dönüştürülür ve göndermeye siz karar verirsiniz. Mesajı göndermezseniz bu bilgiler hiçbir yere ulaşmaz, sayfayı kapattığınızda kaybolur.",
            ],
          },
          {
            heading: "İletişim kanallarında paylaştığınız bilgiler",
            paragraphs: [
              "Telefon, WhatsApp veya e-posta yoluyla bize ilettiğiniz ad, telefon numarası, işletme adı, adres ve işe dair detaylar; teklif hazırlamak, keşif planlamak, işi yürütmek ve satış sonrası destek vermek amacıyla işlenir.",
              "Bu bilgiler pazarlama listesine eklenmez, üçüncü kişilere satılmaz veya kiralanmaz.",
            ],
          },
          {
            heading: "Barındırma ve teknik kayıtlar",
            paragraphs: [
              "Site Vercel altyapısında barındırılmaktadır. Her web sunucusunda olduğu gibi, güvenlik ve hata takibi amacıyla altyapı düzeyinde teknik erişim kayıtları (IP adresi, tarayıcı bilgisi, istek zamanı) tutulabilir. Bu kayıtlara pazarlama amacıyla erişmiyoruz.",
            ],
          },
          {
            heading: "Üçüncü taraf içerikler",
            items: [
              "İletişim sayfasındaki harita Google Haritalar üzerinden gömülüdür; harita yüklendiğinde tarayıcınız Google sunucularına istek yapar.",
              "WhatsApp bağlantıları sizi WhatsApp uygulamasına yönlendirir; yazışma WhatsApp'ın kendi gizlilik politikasına tabidir.",
              "Instagram bağlantısı sizi Instagram'a yönlendirir.",
            ],
          },
          {
            heading: "İzleme ve reklam kodu kullanmıyoruz",
            paragraphs: [
              "Sitede analitik, reklam veya davranış takibi amaçlı üçüncü taraf kodu bulunmuyor. Ayrıntı için Çerez Politikası sayfasına bakabilirsiniz.",
            ],
          },
          {
            heading: "Sorularınız için",
            paragraphs: [
              `Gizlilikle ilgili her konuda ${siteConfig.contact.email} adresinden veya ${siteConfig.contact.phoneDisplay} numarasından bize ulaşabilirsiniz. Kişisel verilere ilişkin yasal haklarınız için KVKK Aydınlatma Metni sayfamıza bakın.`,
            ],
          },
        ],
      },
      en: {
        title: "Privacy Policy",
        metaTitle: "Privacy Policy | Royal Reklam Samsun",
        metaDescription:
          "What data the Royal Reklam website processes, how the quote builder works, and which third-party services are involved.",
        lead: "This site has no contact form, and visiting it does not create a personal record on our servers. Below is exactly what is processed and where.",
        sections: [
          {
            heading: "No forms, no stored records",
            paragraphs: [
              "There is no contact form on this website that sends data to a server. Browsing the site never asks for or stores your name, phone number or email address.",
              "The quote builder runs entirely in your browser. What you enter is not sent to us automatically; it is only turned into the text of a WhatsApp message, and you decide whether to send it. If you do not send it, the information goes nowhere and is discarded when you close the page.",
            ],
          },
          {
            heading: "Information you share through contact channels",
            paragraphs: [
              "The name, phone number, business name, address and job details you send us by phone, WhatsApp or email are processed to prepare a quote, arrange a survey, carry out the work and provide after-sales support.",
              "This information is not added to a marketing list, and is never sold or rented to third parties.",
            ],
          },
          {
            heading: "Hosting and technical logs",
            paragraphs: [
              "The site is hosted on Vercel. As with any web server, technical access logs (IP address, browser information, request time) may be kept at infrastructure level for security and error tracking. We do not access these logs for marketing purposes.",
            ],
          },
          {
            heading: "Third-party content",
            items: [
              "The map on the contact page is embedded from Google Maps; loading it makes a request from your browser to Google's servers.",
              "WhatsApp links open the WhatsApp application; that conversation is subject to WhatsApp's own privacy policy.",
              "The Instagram link takes you to Instagram.",
            ],
          },
          {
            heading: "No tracking or advertising code",
            paragraphs: [
              "The site contains no third-party analytics, advertising or behavioural tracking code. See the Cookie Policy page for details.",
            ],
          },
          {
            heading: "Questions",
            paragraphs: [
              `For anything related to privacy, contact us at ${siteConfig.contact.email} or on ${siteConfig.contact.phoneDisplay}. For your statutory rights regarding personal data, see our KVKK disclosure page.`,
            ],
          },
        ],
      },
    },
  },

  cerez: {
    id: "cerez",
    copy: {
      tr: {
        title: "Çerez Politikası",
        metaTitle: "Çerez Politikası | Royal Reklam Samsun",
        metaDescription:
          "Royal Reklam web sitesi kendi çerezini kullanmaz. Gömülü Google Haritalar kaynaklı üçüncü taraf çerezleri ve tarayıcı ayarları hakkında bilgi.",
        lead: "Bu sitede analitik, reklam veya davranış takibi çerezi kullanılmaz. Kullanılan tek çerez dil tercihini hatırlayan teknik bir çerezdir.",
        sections: [
          {
            heading: "Çerez nedir?",
            paragraphs: [
              "Çerez, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyasıdır. Oturum açma durumu gibi bilgileri hatırlamak veya ziyaretçi davranışını ölçmek için kullanılır.",
            ],
          },
          {
            heading: "Bu sitede kullanılan çerez",
            paragraphs: [
              "Sitede yalnızca bir çerez kullanılır: dil tercihinizi hatırlayan `NEXT_LOCALE` adlı teknik çerez. Türkçe yerine İngilizceyi seçtiğinizde, bir sonraki ziyaretinizde sayfaların doğru dilde açılması için tarayıcınıza kaydedilir.",
            ],
            items: [
              "Çerez adı: NEXT_LOCALE — amacı: dil tercihini saklamak.",
              "Türü: birinci taraf, oturum çerezi. İçinde yalnızca dil kodu (tr veya en) bulunur.",
              "Kimlik, iletişim bilgisi veya davranış verisi tutmaz; ziyaretçi takibi için kullanılmaz.",
              "Sitede Google Analytics, Meta Pixel veya benzeri bir ölçüm ya da reklam kodu bulunmaz.",
            ],
          },
          {
            heading: "Üçüncü taraf çerezleri",
            items: [
              "İletişim sayfasındaki gömülü Google Haritalar, Google'ın kendi çerezlerini veya yerel depolamasını kullanabilir. Bu, haritayı görüntülediğinizde gerçekleşir.",
              "WhatsApp ve Instagram bağlantılarına tıkladığınızda ilgili platformun kendi çerez politikası geçerli olur.",
            ],
          },
          {
            heading: "Çerezleri nasıl yönetirsiniz?",
            paragraphs: [
              "Tüm modern tarayıcılar çerezleri görüntüleme, silme ve engelleme imkânı sunar. Bu ayarlar genellikle tarayıcının Gizlilik ve Güvenlik bölümünde bulunur. Üçüncü taraf çerezlerini engellemeniz sitenin çalışmasını etkilemez; yalnızca gömülü harita kısıtlanabilir.",
            ],
          },
          {
            heading: "Bu politika değişirse",
            paragraphs: [
              "Siteye ileride ölçümleme veya benzeri bir araç eklenirse bu sayfa güncellenir ve gerekiyorsa çerez onayı sunulur.",
            ],
          },
        ],
      },
      en: {
        title: "Cookie Policy",
        metaTitle: "Cookie Policy | Royal Reklam Samsun",
        metaDescription:
          "The Royal Reklam website sets no cookies of its own. Information about third-party cookies from the embedded Google Map and browser settings.",
        lead: "This site uses no analytics, advertising or behavioural tracking cookies. The only cookie it sets is a technical one that remembers your language preference.",
        sections: [
          {
            heading: "What a cookie is",
            paragraphs: [
              "A cookie is a small text file that a website stores in your browser, used to remember things such as a signed-in state or to measure visitor behaviour.",
            ],
          },
          {
            heading: "The cookie this site uses",
            paragraphs: [
              "The site sets a single cookie: a technical cookie named `NEXT_LOCALE` that remembers your language preference. It is stored when you choose English instead of Turkish, so that pages open in the right language on your next visit.",
            ],
            items: [
              "Cookie name: NEXT_LOCALE — purpose: storing the language preference.",
              "Type: first-party session cookie. It contains only a language code (tr or en).",
              "It holds no identity, contact or behavioural data and is not used to track visitors.",
              "The site contains no Google Analytics, Meta Pixel or comparable measurement or advertising code.",
            ],
          },
          {
            heading: "Third-party cookies",
            items: [
              "The embedded Google Map on the contact page may use Google's own cookies or local storage when the map loads.",
              "Following a WhatsApp or Instagram link places you under that platform's own cookie policy.",
            ],
          },
          {
            heading: "Managing cookies",
            paragraphs: [
              "Every modern browser lets you view, delete and block cookies, usually under Privacy and Security settings. Blocking third-party cookies does not affect how this site works; it may only restrict the embedded map.",
            ],
          },
          {
            heading: "If this policy changes",
            paragraphs: [
              "If measurement or similar tooling is added to the site in future, this page will be updated and a cookie consent notice provided where required.",
            ],
          },
        ],
      },
    },
  },

  kvkk: {
    id: "kvkk",
    copy: {
      tr: {
        title: "KVKK Aydınlatma Metni",
        metaTitle: "KVKK Aydınlatma Metni | Royal Reklam Samsun",
        metaDescription:
          "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Royal Reklam tarafından işlenen kişisel veriler, işleme amaçları, hukuki sebepler ve haklarınız.",
        lead: "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu sıfatıyla hangi verilerinizi hangi amaçla işlediğimizi aşağıda açıklıyoruz.",
        sections: [
          {
            heading: "Veri sorumlusu",
            paragraphs: [
              `${kurum}`,
              `${siteConfig.address.full}`,
              `Telefon: ${siteConfig.contact.phoneDisplay} · E-posta: ${siteConfig.contact.email}`,
            ],
          },
          {
            heading: "İşlenen kişisel veriler",
            items: [
              "Kimlik ve iletişim bilgileri: ad soyad, telefon numarası, e-posta adresi, işletme adı.",
              "Uygulama bilgileri: keşif ve montaj için gerekli adres ve cephe bilgileri, iletmeniz hâlinde cephe fotoğrafları.",
              "İşlem bilgileri: teklif, sipariş ve fatura kayıtları.",
            ],
            paragraphs: [
              "Bu veriler yalnızca sizin telefon, WhatsApp, e-posta veya yüz yüze görüşme yoluyla ilettiğiniz ölçüde işlenir. Web sitesi üzerinden otomatik veri toplama yapılmaz.",
            ],
          },
          {
            heading: "İşleme amaçları",
            items: [
              "Teklif hazırlanması ve keşif randevusunun planlanması.",
              "Sözleşmenin kurulması, imalat ve montaj sürecinin yürütülmesi.",
              "Satış sonrası servis ve bakım taleplerinin karşılanması.",
              "Faturalandırma ve yasal saklama yükümlülüklerinin yerine getirilmesi.",
            ],
          },
          {
            heading: "Hukuki sebepler",
            paragraphs: [
              "Kişisel verileriniz KVKK'nın 5. maddesi uyarınca; sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi ve ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaat hukuki sebeplerine dayanılarak işlenir.",
            ],
          },
          {
            heading: "Aktarım",
            paragraphs: [
              "Kişisel verileriniz pazarlama amacıyla üçüncü kişilere aktarılmaz. Aktarım yalnızca şu hâllerde gerçekleşir: yasal olarak yetkili kamu kurumlarının talebi; muhasebe ve faturalandırma yükümlülükleri için mali müşavirlik hizmeti; iletişimin gerçekleştiği platformların (WhatsApp) ve site barındırma altyapısının (Vercel) kendi işleyişi gereği.",
            ],
          },
          {
            heading: "Saklama süresi",
            paragraphs: [
              "Veriler, iş ilişkisi ve satış sonrası destek sürdüğü sürece; fatura ve ticari kayıtlar ise ilgili mevzuatın öngördüğü yasal saklama süresince muhafaza edilir. Sürenin sonunda silinir veya anonim hâle getirilir.",
            ],
          },
          {
            heading: "KVKK 11. madde kapsamındaki haklarınız",
            items: [
              "Kişisel verinizin işlenip işlenmediğini öğrenme.",
              "İşlenmişse buna ilişkin bilgi talep etme.",
              "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.",
              "Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme.",
              "Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme.",
              "Kanunda öngörülen şartlar çerçevesinde verilerin silinmesini veya yok edilmesini isteme.",
              "Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme.",
              "Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.",
              "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
            ],
          },
          {
            heading: "Başvuru",
            paragraphs: [
              `Yukarıdaki haklarınıza ilişkin taleplerinizi ${siteConfig.contact.email} adresine e-posta göndererek veya ${siteConfig.address.full} adresine yazılı olarak başvurarak iletebilirsiniz. Başvurunuz, talebin niteliğine göre en kısa sürede ve en geç otuz gün içinde sonuçlandırılır.`,
            ],
          },
        ],
      },
      en: {
        title: "Personal Data Protection Notice",
        metaTitle: "Personal Data Protection Notice | Royal Reklam Samsun",
        metaDescription:
          "Personal data processed by Royal Reklam under Turkish Law No. 6698 (KVKK), the purposes and legal grounds for processing, and your rights.",
        lead: "Under Turkish Law No. 6698 on the Protection of Personal Data (KVKK), and as data controller, we set out below which of your data we process and why.",
        sections: [
          {
            heading: "Data controller",
            paragraphs: [
              `${kurum}`,
              `${siteConfig.address.full}`,
              `Phone: ${siteConfig.contact.phoneDisplay} · Email: ${siteConfig.contact.email}`,
            ],
          },
          {
            heading: "Personal data processed",
            items: [
              "Identity and contact details: name, phone number, email address, business name.",
              "Project details: the address and façade information needed for a survey and installation, plus any photographs you send.",
              "Transaction records: quotes, orders and invoices.",
            ],
            paragraphs: [
              "This data is processed only to the extent that you provide it by phone, WhatsApp, email or in person. The website performs no automated data collection.",
            ],
          },
          {
            heading: "Purposes of processing",
            items: [
              "Preparing a quote and scheduling a site survey.",
              "Forming the contract and carrying out fabrication and installation.",
              "Handling after-sales service and maintenance requests.",
              "Invoicing and meeting statutory record-keeping obligations.",
            ],
          },
          {
            heading: "Legal grounds",
            paragraphs: [
              "Under Article 5 of the KVKK, your personal data is processed on the grounds that it is directly related to the establishment or performance of a contract, that it is necessary for the data controller to meet a legal obligation, and on the basis of legitimate interest provided this does not harm your fundamental rights and freedoms.",
            ],
          },
          {
            heading: "Transfers",
            paragraphs: [
              "Your personal data is never transferred to third parties for marketing purposes. Transfers occur only where legally authorised public authorities request them, where accountancy services require them for invoicing obligations, and as an inherent part of the operation of the platforms used for communication (WhatsApp) and website hosting (Vercel).",
            ],
          },
          {
            heading: "Retention",
            paragraphs: [
              "Data is retained for as long as the business relationship and after-sales support continue; invoices and commercial records are kept for the statutory retention period required by the relevant legislation. At the end of that period they are deleted or anonymised.",
            ],
          },
          {
            heading: "Your rights under Article 11 of the KVKK",
            items: [
              "To learn whether your personal data is being processed.",
              "To request information if it has been processed.",
              "To learn the purpose of processing and whether the data is used accordingly.",
              "To know the third parties, in Türkiye or abroad, to whom the data has been transferred.",
              "To request correction of incomplete or inaccurate data.",
              "To request erasure or destruction of the data within the conditions set by law.",
              "To request that correction, erasure or destruction be notified to third parties the data was transferred to.",
              "To object to an adverse outcome arising from analysis carried out solely by automated means.",
              "To claim compensation for damage suffered as a result of unlawful processing.",
            ],
          },
          {
            heading: "Making a request",
            paragraphs: [
              `You can submit requests relating to the rights above by emailing ${siteConfig.contact.email} or by writing to ${siteConfig.address.full}. Requests are concluded as soon as possible and within thirty days at the latest, depending on their nature.`,
            ],
          },
        ],
      },
    },
  },
};

export function getLegalDoc(id: string): LegalDoc | undefined {
  return legalDocs[id];
}
