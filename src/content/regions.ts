import type { Locale } from "@/i18n/routing";

/**
 * Yerel SEO bölge sayfaları.
 *
 * ÖNEMLİ: Bu sayfaların her biri özgün metin taşır. Aynı paragrafı ilçe adını
 * değiştirerek çoğaltmak ("thin/duplicate content") Google tarafından
 * cezalandırılır ve dil modelleri tarafından da düşük değerli görülür.
 * Bu yüzden her ilçe kendi ticari karakteri üzerinden anlatılır.
 */

export interface RegionCopy {
  /** Sayfa H1'i */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  /** GEO: alıntılanabilir kısa tanım */
  answer: string;
  intro: string[];
  /** İlçenin ticari karakterini özetleyen tek cümle (kart üstü) */
  character: string;
  faqs: { q: string; a: string }[];
}

export interface Region {
  id: string;
  slug: Record<Locale, string>;
  name: Record<Locale, string>;
  /** Anasayfa ve footer'da öne çıkarılacak ilçeler */
  featured: boolean;
  /** Bu ilçede en çok talep gören hizmetlerin id'leri */
  popularServiceIds: string[];
  copy: Record<Locale, RegionCopy>;
}

export const regions: Region[] = [
  {
    id: "ilkadim",
    slug: { tr: "ilkadim", en: "ilkadim" },
    name: { tr: "İlkadım", en: "İlkadım" },
    featured: true,
    popularServiceIds: ["isikli-tabela", "kutu-harf-tabela", "cephe-giydirme"],
    copy: {
      tr: {
        heading: "İlkadım Tabela ve Reklam Uygulamaları",
        metaTitle: "İlkadım Tabela İmalatı | Samsun İlkadım — Royal Reklam",
        metaDescription:
          "Samsun İlkadım'da ışıklı tabela, kutu harf ve cephe giydirme. Atölyemiz İlkadım'da; keşif ve montaj aynı gün planlanabilir. 0544 230 71 77",
        answer:
          "Royal Reklam'ın atölyesi Samsun İlkadım'da, Hürriyet Mahallesi'nde bulunur. İlkadım'daki cadde mağazaları, çarşı esnafı ve ofisler için ışıklı tabela, kutu harf, cephe giydirme ve dijital baskı hizmeti verilir. Aynı ilçede olduğumuz için keşif çoğu zaman aynı gün yapılabilir.",
        intro: [
          "İlkadım, Samsun'un ticari kalbidir. Çarşı bölgesindeki yoğun esnaf dokusu, ana caddelerdeki mağazalar ve iş hanları; tabelacılık açısından şehrin en rekabetçi cephesini oluşturur. Böyle bir yoğunlukta bir tabelanın işini yapabilmesi için yalnızca büyük olması yetmez — komşu cephelerden ayrışması gerekir.",
          "Atölyemiz de İlkadım'da olduğu için bu ilçede keşif ve montaj planlamasını çok daha esnek yapabiliyoruz. Acil bir arıza, kampanya öncesi hızlı bir vitrin uygulaması ya da açılışa yetiştirilmesi gereken bir cephe işi söz konusu olduğunda mesafe bizim için sorun olmuyor.",
          "İlkadım'da çalışırken en sık karşılaştığımız konu belediyenin cephe ve ilan-reklam kurallarıdır. Ölçü, aydınlatma ve cepheden taşma sınırları başvuru öncesinde bilinmezse iş sökülüp yeniden yapılabiliyor. Projeyi baştan bu kısıtlara göre kurguluyoruz.",
        ],
        character: "Samsun'un ticari merkezi — yoğun cadde mağazacılığı ve çarşı esnafı",
        faqs: [
          {
            q: "İlkadım'da keşif için ne kadar beklemem gerekir?",
            a: "Atölyemiz İlkadım'da olduğu için keşif genellikle aynı gün ya da ertesi gün yapılabiliyor. Yerinde ölçü ve değerlendirme ücretsizdir.",
          },
          {
            q: "İlkadım Belediyesi'nden tabela izni gerekiyor mu?",
            a: "Cepheye asılacak tabelalar ilan ve reklam vergisine tabidir ve ilçe belediyesinden izin gerektirir. Başvuru için gereken teknik çizim ve görselleri biz hazırlıyoruz.",
          },
        ],
      },
      en: {
        heading: "Signage in İlkadım, Samsun",
        metaTitle: "Sign Manufacturing in İlkadım, Samsun — Royal Reklam",
        metaDescription:
          "Illuminated signs, channel letters and façade cladding in İlkadım, Samsun. Our workshop is in İlkadım, so surveys can often be same-day.",
        answer:
          "Royal Reklam's workshop is located in Hürriyet Mahallesi, İlkadım, Samsun. We provide illuminated signage, channel letters, façade cladding and large format printing for the high-street shops, market traders and offices of İlkadım.",
        intro: [
          "İlkadım is the commercial heart of Samsun. Its dense market district, main-road retail and office blocks make it the most competitive stretch of shopfront in the city. In that density, a sign has to do more than be large — it has to separate itself from its neighbours.",
          "Because our workshop is in İlkadım, we can schedule surveys and installations with far more flexibility here. Urgent repairs, quick window campaigns and façades that must be ready for an opening date are all easier when distance is not a factor.",
          "The recurring issue in İlkadım is municipal façade and advertising rules. Limits on size, brightness and projection must be known before application, or work can end up removed and redone. We design to those constraints from the outset.",
        ],
        character: "The commercial centre of Samsun — dense high-street retail",
        faqs: [
          {
            q: "How quickly can you survey in İlkadım?",
            a: "Our workshop is in İlkadım, so surveys can usually be arranged same day or next day. On-site measurement is free of charge.",
          },
          {
            q: "Is a municipal permit required?",
            a: "Yes, façade signage is subject to advertising tax and requires district municipality approval. We prepare the technical drawings and visuals for the application.",
          },
        ],
      },
    },
  },

  {
    id: "atakum",
    slug: { tr: "atakum", en: "atakum" },
    name: { tr: "Atakum", en: "Atakum" },
    featured: true,
    popularServiceIds: ["kutu-harf-tabela", "lightbox-tabela", "isikli-tabela"],
    copy: {
      tr: {
        heading: "Atakum Tabela ve Reklam Uygulamaları",
        metaTitle: "Atakum Tabela İmalatı | Samsun Atakum — Royal Reklam",
        metaDescription:
          "Samsun Atakum'da kutu harf, ışıklı tabela ve lightbox uygulamaları. Kafe, restoran ve yeni açılan işletmeler için tasarım odaklı çözümler.",
        answer:
          "Royal Reklam, Samsun Atakum'da kutu harf tabela, ışıklı tabela, lightbox ve cephe uygulamaları yapar. Sahil bandındaki kafe ve restoranlar ile yeni açılan işletmeler için tasarım odaklı, gece görünürlüğü yüksek çözümler üretilir.",
        intro: [
          "Atakum, Samsun'un en hızlı büyüyen ilçelerinden biri. Yeni konut alanları, sahil bandındaki kafe ve restoran yoğunluğu ile üniversite çevresindeki genç müşteri profili, buradaki işletmelerin tabela beklentisini de farklılaştırıyor.",
          "Atakum'da yaptığımız işlerin ağırlığı tasarım tarafında. Burada bir kafenin tabelası yalnızca okunmakla kalmıyor; fotoğraflanıyor, sosyal medyada paylaşılıyor. Bu yüzden kutu harf, halo aydınlatma ve doğru malzeme dokusu gibi detaylar Atakum projelerinde belirgin biçimde öne çıkıyor.",
          "Sahile yakınlık malzeme seçimini de etkiliyor. Tuzlu ve nemli hava, kalitesiz bağlantı elemanlarında kısa sürede pas akıntısı yaratıyor. Bu bölgedeki uygulamalarımızda paslanmaz bağlantı elemanı kullanımı standarttır.",
        ],
        character: "Hızlı büyüyen sahil ilçesi — kafe, restoran ve yeni işletme yoğunluğu",
        faqs: [
          {
            q: "Atakum'da sahile yakın cephelerde hangi malzeme uygun?",
            a: "Tuzlu ve nemli hava nedeniyle paslanmaz bağlantı elemanı, elektrostatik boyalı alüminyum gövde ve en az IP65 korumalı LED kullanılması gerekir. Galvaniz olmayan çelik bağlantılar birkaç yıl içinde pas akıntısı yapar.",
          },
          {
            q: "Yeni açılacak kafem için ne kadar önceden başlamalıyım?",
            a: "Tasarım ve onay süreci dâhil en az 3 hafta önce başlamanızı öneriyoruz. Kutu harf gibi imalatı uzun süren işlerde bu süre kritiktir.",
          },
        ],
      },
      en: {
        heading: "Signage in Atakum, Samsun",
        metaTitle: "Sign Manufacturing in Atakum, Samsun — Royal Reklam",
        metaDescription:
          "Channel letters, illuminated signs and lightboxes in Atakum, Samsun. Design-led signage for cafés, restaurants and new openings.",
        answer:
          "Royal Reklam produces channel letters, illuminated signage, lightboxes and façade work in Atakum, Samsun — design-led solutions with strong night-time presence for the district's cafés, restaurants and new businesses.",
        intro: [
          "Atakum is among Samsun's fastest-growing districts. New residential areas, a dense strip of cafés and restaurants along the shore and a young customer base around the university all shape what businesses here expect from signage.",
          "Our work in Atakum leans heavily toward design. A café sign here is not just read — it is photographed and shared. Channel letters, halo lighting and material texture matter noticeably more in Atakum projects.",
          "Proximity to the sea also drives material choice. Salt-laden, humid air causes rust staining on poor fixings within a short time, so stainless hardware is standard on everything we install in this district.",
        ],
        character: "Fast-growing coastal district — cafés, restaurants and new openings",
        faqs: [
          {
            q: "What materials suit seafront façades in Atakum?",
            a: "Salt and humidity call for stainless fixings, powder-coated aluminium bodies and LEDs rated at least IP65. Non-galvanised steel fixings will stain the façade with rust within a few years.",
          },
          {
            q: "How far ahead should I start for a new opening?",
            a: "We recommend at least three weeks including design and approval. For channel letters, where fabrication takes longer, that lead time is critical.",
          },
        ],
      },
    },
  },

  {
    id: "canik",
    slug: { tr: "canik", en: "canik" },
    name: { tr: "Canik", en: "Canik" },
    featured: true,
    popularServiceIds: ["isikli-tabela", "dijital-baski", "arac-giydirme"],
    copy: {
      tr: {
        heading: "Canik Tabela ve Reklam Uygulamaları",
        metaTitle: "Canik Tabela İmalatı | Samsun Canik — Royal Reklam",
        metaDescription:
          "Samsun Canik'te ışıklı tabela, dijital baskı ve araç giydirme. Esnaf işletmeleri ve ticari araç filoları için ekonomik çözümler.",
        answer:
          "Royal Reklam, Samsun Canik'te ışıklı tabela, cephe tabelası, dijital baskı ve araç giydirme hizmeti verir. İlçedeki esnaf işletmeleri ve servis araçları için dayanıklı ve bütçeye uygun uygulamalar üretilir.",
        intro: [
          "Canik, konut ve ticaretin iç içe geçtiği, esnaf işletmelerinin yoğun olduğu bir ilçe. Buradaki talebin karakteri net: dayanıklı, bakımı kolay ve maliyeti öngörülebilir işler.",
          "Canik'te en çok yaptığımız iş kalemleri cephe tabelası ve ticari araç giydirme. Servis, tesisat ve teknik hizmet veren pek çok işletme için aracın kendisi zaten en etkili reklam alanı; bu ilçede araç giydirmenin geri dönüşü cephe tabelasından bile yüksek olabiliyor.",
          "Bütçeye uygun çözüm üretirken malzemeden ödün vermiyoruz. Ucuz folyo ya da IP korumasız LED ile yapılan bir tabela ilk kıştan sonra sorun çıkarır; bu, tasarruf değil ertelenmiş bir masraftır.",
        ],
        character: "Konut ve ticaretin iç içe olduğu esnaf ilçesi",
        faqs: [
          {
            q: "Küçük bir dükkân tabelası için de geliyor musunuz?",
            a: "Evet. İş büyüklüğüne bakmaksızın Canik dâhil tüm Samsun ilçelerinde keşif yapıyor ve teklif veriyoruz.",
          },
          {
            q: "Servis aracımı giydirmek mantıklı mı?",
            a: "Sahada çalışan bir servis aracı günde binlerce kişi tarafından görülür. Tek seferlik maliyetle 5–7 yıl çalışan bir reklam alanı elde edersiniz; aylık kirası olmayan tek mecra budur.",
          },
        ],
      },
      en: {
        heading: "Signage in Canik, Samsun",
        metaTitle: "Sign Manufacturing in Canik, Samsun — Royal Reklam",
        metaDescription:
          "Illuminated signage, large format printing and vehicle wrapping in Canik, Samsun. Durable, budget-conscious solutions for local traders.",
        answer:
          "Royal Reklam provides illuminated signage, shopfront signs, large format printing and vehicle wrapping in Canik, Samsun — durable and cost-predictable work for the district's independent businesses and service fleets.",
        intro: [
          "Canik mixes residential and commercial use, with a strong base of independent traders. Demand here has a clear character: durable, easy to maintain and predictable in cost.",
          "Shopfront signs and commercial vehicle wraps make up most of our work in the district. For plumbing, service and technical trades the vehicle is already the most effective advertising surface — often outperforming the shopfront itself.",
          "Working to a budget does not mean compromising materials. A sign built with cheap film or unrated LEDs will fail after its first winter; that is not a saving, only a deferred cost.",
        ],
        character: "Mixed residential and trading district",
        faqs: [
          {
            q: "Do you take on small shop signs?",
            a: "Yes. We survey and quote across every Samsun district including Canik, regardless of job size.",
          },
          {
            q: "Is wrapping a service vehicle worthwhile?",
            a: "A working service vehicle is seen by thousands of people a day. One outlay buys five to seven years of advertising with no monthly rent — no other medium works that way.",
          },
        ],
      },
    },
  },

  {
    id: "tekkekoy",
    slug: { tr: "tekkekoy", en: "tekkekoy" },
    name: { tr: "Tekkeköy", en: "Tekkeköy" },
    featured: true,
    popularServiceIds: ["totem-tabela", "cephe-giydirme", "imalat-tasarim-montaj"],
    copy: {
      tr: {
        heading: "Tekkeköy Tabela ve Endüstriyel Reklam Uygulamaları",
        metaTitle: "Tekkeköy Tabela ve Totem İmalatı | Samsun — Royal Reklam",
        metaDescription:
          "Samsun Tekkeköy'de totem tabela, fabrika cephe markalaması ve endüstriyel yönlendirme sistemleri. Sanayi tesisleri için anahtar teslim.",
        answer:
          "Royal Reklam, Samsun Tekkeköy'de sanayi tesisleri ve lojistik işletmeleri için totem tabela, fabrika cephe markalaması ve saha yönlendirme sistemleri üretir. Statik hesap, temel imalatı ve montaj tek sözleşmede toplanır.",
        intro: [
          "Tekkeköy, Samsun'un sanayi ve lojistik ağırlığının yoğunlaştığı ilçesi. Buradaki tabela ihtiyacı, cadde mağazacılığından tamamen farklı bir mühendislik gerektiriyor: geniş araziler, uzaktan görünürlük ve tesis içi yönlendirme.",
          "Sanayi tesislerinde en çok talep gören ürünümüz totem tabela. Ana yoldan tesis girişini işaretleyen, rüzgâr yüküne göre hesaplanmış çelik konstrüksiyonlu totemler; ardından saha içi yönlendirme levhaları, kapı numaralandırmaları ve bina cephesi markalaması geliyor.",
          "Endüstriyel işlerde iş güvenliği ve montaj koşulları belirleyicidir. Faal bir tesiste çalışırken üretimi durdurmadan, tesisin kendi İSG kurallarına uyarak montaj yapmak ayrı bir disiplin gerektirir; bu tür projelerde çalışma planını tesis yönetimiyle birlikte kuruyoruz.",
        ],
        character: "Sanayi ve lojistik ilçesi — tesis ölçeğinde uygulamalar",
        faqs: [
          {
            q: "Faal bir fabrikada üretimi durdurmadan montaj yapılabilir mi?",
            a: "Evet. Vardiya planına göre çalışma saati belirliyor, tesisin İSG kurallarına uygun ekip ve ekipmanla sahaya giriyoruz. Bu planlamayı keşif aşamasında tesis yönetimiyle birlikte yapıyoruz.",
          },
          {
            q: "Tesis içi yönlendirme sistemi de yapıyor musunuz?",
            a: "Evet. Bina numaralandırma, acil çıkış yönlendirme, ziyaretçi karşılama panosu ve saha içi trafik levhalarını bütün bir sistem olarak tasarlayıp üretiyoruz.",
          },
        ],
      },
      en: {
        heading: "Industrial Signage in Tekkeköy, Samsun",
        metaTitle: "Totem & Industrial Signage in Tekkeköy — Royal Reklam",
        metaDescription:
          "Totem signs, factory façade branding and site wayfinding in Tekkeköy, Samsun. Turnkey delivery for industrial facilities.",
        answer:
          "Royal Reklam produces totem signs, factory façade branding and site wayfinding systems for industrial and logistics operations in Tekkeköy, Samsun, with structural calculation, foundations and installation under one contract.",
        intro: [
          "Tekkeköy concentrates Samsun's industrial and logistics activity. Signage here demands different engineering from high-street retail: large sites, long sight lines and internal wayfinding.",
          "Totem signs are our most requested product for industrial sites — steel structures engineered to wind load that mark a facility entrance from the main road — followed by site wayfinding, building numbering and façade branding.",
          "On industrial work, safety and installation conditions govern everything. Installing inside a live facility without halting production, while following the site's own safety rules, is its own discipline; we plan that jointly with facility management.",
        ],
        character: "Industrial and logistics district — facility-scale work",
        faqs: [
          {
            q: "Can you install without stopping production?",
            a: "Yes. We set working hours around shift patterns and attend site with crews and equipment compliant with your safety rules, planned with facility management at survey stage.",
          },
          {
            q: "Do you produce internal wayfinding?",
            a: "Yes — building numbering, emergency egress signs, visitor reception boards and internal traffic signage designed and produced as one coherent system.",
          },
        ],
      },
    },
  },

  {
    id: "bafra",
    slug: { tr: "bafra", en: "bafra" },
    name: { tr: "Bafra", en: "Bafra" },
    featured: true,
    popularServiceIds: ["isikli-tabela", "kutu-harf-tabela", "dijital-baski"],
    copy: {
      tr: {
        heading: "Bafra Tabela ve Reklam Uygulamaları",
        metaTitle: "Bafra Tabela İmalatı | Samsun Bafra — Royal Reklam",
        metaDescription:
          "Samsun Bafra'da ışıklı tabela, kutu harf ve dijital baskı. İlçe merkezindeki esnaf ve gıda işletmeleri için montaj dâhil hizmet.",
        answer:
          "Royal Reklam, Samsun Bafra'da ışıklı tabela, kutu harf ve dijital baskı uygulamaları yapar. İmalat Samsun merkezdeki atölyemizde tamamlanır, montaj ekibimiz Bafra'ya giderek uygulamayı yerinde yapar.",
        intro: [
          "Bafra, Samsun'un en büyük ilçelerinden biri ve kendi içinde güçlü bir ticaret hayatı barındırıyor. İlçe merkezindeki esnaf yoğunluğu, tarım ve gıda işletmeleri ile hizmet sektörü, düzenli bir tabela talebi oluşturuyor.",
          "Bafra işlerinde çalışma yöntemimiz nettir: keşfe biz gideriz, imalat Samsun merkezdeki atölyemizde yapılır, montaj için ekip yeniden Bafra'ya sevk edilir. Böylece ilçede tam donanımlı bir atölye aramanıza gerek kalmaz.",
          "Gıda üretimi ve paketleme yapan işletmeler için tabela dışında etiket ve ambalaj baskısı da önemli bir kalem. Ürün etiketi, kasa etiketi ve sevkiyat etiketlerini de aynı çatı altında üretebiliyoruz.",
        ],
        character: "Güçlü ilçe ticareti — esnaf, tarım ve gıda işletmeleri",
        faqs: [
          {
            q: "Bafra'ya keşfe geliyor musunuz?",
            a: "Evet. Samsun'un tüm ilçelerinde yerinde keşif yapıyoruz. Keşif sonrası ölçü, tasarım ve teklif süreci merkezdeki ekibimizle yürüyor.",
          },
          {
            q: "Montaj için ek nakliye ücreti alınıyor mu?",
            a: "İlçe montajlarında ulaşım maliyeti teklifin içinde şeffaf biçimde belirtilir; iş onaylandığında sonradan sürpriz bir kalem çıkmaz.",
          },
        ],
      },
      en: {
        heading: "Signage in Bafra, Samsun",
        metaTitle: "Sign Manufacturing in Bafra, Samsun — Royal Reklam",
        metaDescription:
          "Illuminated signs, channel letters and printing in Bafra, Samsun. Fabricated in our Samsun workshop, installed on site by our own crew.",
        answer:
          "Royal Reklam produces illuminated signage, channel letters and printed graphics for Bafra, Samsun. Fabrication is completed at our workshop in central Samsun and our own crew travels to Bafra for installation.",
        intro: [
          "Bafra is one of Samsun's largest districts and sustains a substantial commercial life of its own. Its town-centre traders, agricultural and food businesses and service sector generate steady demand for signage.",
          "Our method in Bafra is straightforward: we travel out for the survey, fabricate at our workshop in central Samsun, then send the crew back to Bafra for installation — so you do not need to find a fully equipped workshop locally.",
          "For food producers and packers, labels and packaging print matter as much as signage. Product, case and dispatch labels are produced under the same roof.",
        ],
        character: "Strong district commerce — traders, agriculture and food businesses",
        faqs: [
          {
            q: "Do you travel to Bafra for surveys?",
            a: "Yes, we survey on site across all Samsun districts. Measurement, design and quotation then run through our central team.",
          },
          {
            q: "Is there an extra travel charge?",
            a: "Travel costs for district installations are shown transparently within the quotation — no surprise items appear later.",
          },
        ],
      },
    },
  },

  {
    id: "carsamba",
    slug: { tr: "carsamba", en: "carsamba" },
    name: { tr: "Çarşamba", en: "Çarşamba" },
    featured: true,
    popularServiceIds: ["totem-tabela", "isikli-tabela", "arac-giydirme"],
    copy: {
      tr: {
        heading: "Çarşamba Tabela ve Reklam Uygulamaları",
        metaTitle: "Çarşamba Tabela İmalatı | Samsun Çarşamba — Royal Reklam",
        metaDescription:
          "Samsun Çarşamba'da totem tabela, ışıklı tabela ve araç giydirme. Havalimanı güzergâhındaki işletmeler için uzaktan görünür çözümler.",
        answer:
          "Royal Reklam, Samsun Çarşamba'da totem tabela, ışıklı cephe tabelası ve araç giydirme hizmeti verir. Samsun-Çarşamba Havalimanı güzergâhındaki işletmeler için yüksek hızlı trafikten okunabilen tabela çözümleri üretilir.",
        intro: [
          "Çarşamba, Samsun-Çarşamba Havalimanı'nın bulunduğu ilçe olması nedeniyle yoğun bir geçiş trafiğine sahip. Bu, buradaki işletmeler için önemli bir fırsat: doğru konumlandırılmış bir tabela, yalnızca ilçe sakinlerine değil şehir dışından gelen binlerce kişiye de ulaşır.",
          "Yüksek hızlı güzergâhlarda tabela tasarımının kuralları değişir. Araç 90 km/s ile geçiyorsa okuyucunun tabelaya ayırdığı süre saniyenin altındadır; bu yüzden karakter yüksekliği, kontrast ve kelime sayısı cadde tabelasından tamamen farklı hesaplanır.",
          "Bu tür konumlarda totem tabelayı öneriyoruz. Cephe tabelası yalnızca binaya baktığınızda görünürken, yol kenarına dikilmiş bir totem yaklaşırken de fark edilir ve sürücüye yavaşlama için zaman tanır.",
        ],
        character: "Havalimanı güzergâhı — yoğun geçiş trafiği ve tarım işletmeleri",
        faqs: [
          {
            q: "Yol kenarındaki bir tabela için ne kadar büyük olmalı?",
            a: "Belirleyici olan hız ve mesafedir. Genel kural olarak her 10 metre okuma mesafesi için yaklaşık 2,5 cm karakter yüksekliği gerekir; 90 km/s'lik bir güzergâhta bu, oldukça büyük harfler demektir. Keşifte konumu birlikte ölçüyoruz.",
          },
          {
            q: "Karayolu kenarında tabela için ek izin gerekir mi?",
            a: "Karayolları güzergâhına yakın konumlarda belediye izninin yanında Karayolları Genel Müdürlüğü görüşü de istenebilir. Başvuru dosyasını buna göre hazırlıyoruz.",
          },
        ],
      },
      en: {
        heading: "Signage in Çarşamba, Samsun",
        metaTitle: "Sign Manufacturing in Çarşamba, Samsun — Royal Reklam",
        metaDescription:
          "Totem signs, illuminated signage and vehicle wrapping in Çarşamba, Samsun. Long-sight-line solutions for the airport corridor.",
        answer:
          "Royal Reklam provides totem signs, illuminated shopfront signage and vehicle wrapping in Çarşamba, Samsun — legible-at-speed solutions for businesses along the Samsun-Çarşamba Airport corridor.",
        intro: [
          "Çarşamba carries heavy through traffic as the district hosting Samsun-Çarşamba Airport. That is a real opportunity: a well-placed sign reaches not only local residents but thousands of visitors from outside the city.",
          "On fast roads the rules of sign design change. At 90 km/h a driver gives a sign less than a second, so character height, contrast and word count are calculated quite differently from a high-street shopfront.",
          "For these locations we usually recommend a totem. A façade sign is only visible once you face the building; a roadside totem is noticed on approach and gives the driver time to slow down.",
        ],
        character: "Airport corridor — through traffic and agricultural businesses",
        faqs: [
          {
            q: "How large should a roadside sign be?",
            a: "Speed and distance decide it. As a rule of thumb, every 10 metres of reading distance needs roughly 2.5 cm of character height — on a 90 km/h road that means substantial letters. We measure the location during survey.",
          },
          {
            q: "Are extra permits needed near a highway?",
            a: "Locations close to state highways may require highways authority approval in addition to municipal permission. We prepare the application accordingly.",
          },
        ],
      },
    },
  },

  {
    id: "terme",
    slug: { tr: "terme", en: "terme" },
    name: { tr: "Terme", en: "Terme" },
    featured: false,
    popularServiceIds: ["isikli-tabela", "dijital-baski", "etiket-sticker"],
    copy: {
      tr: {
        heading: "Terme Tabela ve Reklam Uygulamaları",
        metaTitle: "Terme Tabela İmalatı | Samsun Terme — Royal Reklam",
        metaDescription:
          "Samsun Terme'de ışıklı tabela, dijital baskı ve etiket uygulamaları. İlçe merkezi esnafı ve tarım işletmeleri için montaj dâhil hizmet.",
        answer:
          "Royal Reklam, Samsun Terme'de ışıklı tabela, cephe tabelası, dijital baskı ve etiket üretimi yapar. İmalat Samsun merkezdeki atölyemizde tamamlanır, montaj ekibimiz ilçeye giderek uygulamayı gerçekleştirir.",
        intro: [
          "Terme, ilçe merkezindeki esnaf ticareti ve çevresindeki tarımsal üretimle kendi ekonomik dinamiğine sahip bir ilçe. Buradaki tabela talebinin ağırlığı cephe tabelası ve dükkân vitrini uygulamalarında yoğunlaşıyor.",
          "Tarımsal üretim yapan işletmeler için ürün etiketi ve ambalaj baskısı da önemli bir ihtiyaç. Fındık, sebze ve gıda ürünlerinin paketlenmesinde kullanılan etiketleri kontur kesimli olarak üretiyoruz.",
          "İlçe işlerinde keşif, imalat ve montajı tek bir programda topluyoruz; böylece ekibin ilçeye birden fazla kez gitmesi gerekmiyor ve süreç kısalıyor.",
        ],
        character: "İlçe merkezi esnafı ve tarımsal üretim",
        faqs: [
          {
            q: "Terme'ye montaj için geliyor musunuz?",
            a: "Evet. Samsun'un tüm ilçelerine kendi montaj ekibimizle gidiyoruz; taşeron kullanmıyoruz.",
          },
        ],
      },
      en: {
        heading: "Signage in Terme, Samsun",
        metaTitle: "Sign Manufacturing in Terme, Samsun — Royal Reklam",
        metaDescription:
          "Illuminated signage, printing and labels in Terme, Samsun. Fabricated centrally, installed on site by our own crew.",
        answer:
          "Royal Reklam produces illuminated signage, shopfront signs, printed graphics and labels for Terme, Samsun. Fabrication is completed centrally and our crew travels to the district for installation.",
        intro: [
          "Terme has its own economic rhythm, built on town-centre trade and the agricultural production around it. Demand here concentrates on shopfront signs and window graphics.",
          "For agricultural producers, product labelling and packaging print are equally important. We contour-cut labels for hazelnut, produce and food packaging.",
          "For district work we combine survey, fabrication and installation into a single programme so the crew does not need repeated trips.",
        ],
        character: "Town-centre trade and agricultural production",
        faqs: [
          {
            q: "Do you install in Terme?",
            a: "Yes. We travel to every Samsun district with our own installation crews — we do not subcontract.",
          },
        ],
      },
    },
  },

  {
    id: "vezirkopru",
    slug: { tr: "vezirkopru", en: "vezirkopru" },
    name: { tr: "Vezirköprü", en: "Vezirköprü" },
    featured: false,
    popularServiceIds: ["isikli-tabela", "kutu-harf-tabela", "dijital-baski"],
    copy: {
      tr: {
        heading: "Vezirköprü Tabela ve Reklam Uygulamaları",
        metaTitle: "Vezirköprü Tabela İmalatı | Samsun — Royal Reklam",
        metaDescription:
          "Samsun Vezirköprü'de ışıklı tabela, kutu harf ve dijital baskı. İlçe merkezindeki işletmeler için keşiften montaja tek elden.",
        answer:
          "Royal Reklam, Samsun Vezirköprü'de ışıklı tabela, kutu harf ve dijital baskı hizmeti verir. Keşif, tasarım, imalat ve montaj süreçlerinin tamamı kendi ekibimizle yürütülür.",
        intro: [
          "Vezirköprü, ilçe merkezindeki hareketli çarşı hayatıyla Samsun'un batı kesimindeki önemli ticaret noktalarından biri. Buradaki işletmelerin çoğu için tabela, yıllarca değiştirilmeyecek bir yatırım; bu yüzden dayanıklılık ilk kriter oluyor.",
          "Merkeze uzaklık nedeniyle projeleri tek seferde ve eksiksiz tamamlamayı önemsiyoruz. Keşifte ölçüyü, elektrik altyapısını ve montaj erişimini eksiksiz kaydediyoruz ki montaj günü sürprizle karşılaşılmasın.",
          "Uzun ömürlü sonuç için galvaniz veya alüminyum gövde, elektrostatik boya ve IP65 LED kullanımını standart tutuyoruz.",
        ],
        character: "Hareketli ilçe çarşısı — uzun ömürlü uygulama talebi",
        faqs: [
          {
            q: "Merkeze uzak ilçelerde teslim süresi uzuyor mu?",
            a: "İmalat süresi değişmez; yalnızca montaj programlaması ilçe rotamıza göre planlanır. Bu genellikle birkaç günlük bir fark yaratır.",
          },
        ],
      },
      en: {
        heading: "Signage in Vezirköprü, Samsun",
        metaTitle: "Sign Manufacturing in Vezirköprü, Samsun — Royal Reklam",
        metaDescription:
          "Illuminated signs, channel letters and printing in Vezirköprü, Samsun. Survey to installation handled by one team.",
        answer:
          "Royal Reklam provides illuminated signage, channel letters and printed graphics in Vezirköprü, Samsun, with survey, design, fabrication and installation all handled by our own team.",
        intro: [
          "Vezirköprü is a significant trading centre in the western part of Samsun province, with an active town-centre market. For most businesses here a sign is an investment meant to last years, so durability comes first.",
          "Given the distance from the city centre, we place particular weight on completing projects in a single visit — recording measurements, electrical supply and access fully at survey so installation day holds no surprises.",
          "For longevity we keep galvanised or aluminium bodies, powder-coat finishes and IP65 LEDs as standard.",
        ],
        character: "Active town-centre market — demand for long-life installations",
        faqs: [
          {
            q: "Do outlying districts take longer?",
            a: "Fabrication time is unchanged; only installation scheduling follows our district routing, which usually amounts to a few days' difference.",
          },
        ],
      },
    },
  },

  {
    id: "havza",
    slug: { tr: "havza", en: "havza" },
    name: { tr: "Havza", en: "Havza" },
    featured: false,
    popularServiceIds: ["isikli-tabela", "lightbox-tabela", "kurumsal-kimlik"],
    copy: {
      tr: {
        heading: "Havza Tabela ve Reklam Uygulamaları",
        metaTitle: "Havza Tabela İmalatı | Samsun Havza — Royal Reklam",
        metaDescription:
          "Samsun Havza'da ışıklı tabela, lightbox ve kurumsal kimlik uygulamaları. Konaklama ve termal tesisler için tasarım odaklı çözümler.",
        answer:
          "Royal Reklam, Samsun Havza'da ışıklı tabela, lightbox pano ve kurumsal kimlik uygulamaları yapar. Termal tesisler ve konaklama işletmeleri için karşılama panosu, yönlendirme ve cephe tabelası çözümleri üretilir.",
        intro: [
          "Havza, kaplıcaları ve termal tesisleriyle bilinen bir ilçe. Konaklama sektörünün ağırlıklı olduğu yerlerde tabela ihtiyacı, tek bir cephe levhasından çok bir sistem halinde ortaya çıkıyor: karşılama panosu, resepsiyon arkası kurumsal duvar, kat ve oda yönlendirmeleri, açıklama levhaları.",
          "Bu tür projelerde tüm parçaların aynı tipografi ve malzeme dilini konuşması gerekir. Kurumsal kimlik ve tabela üretimini aynı ekipte topladığımız için bu tutarlılığı sağlamak bizim için doğal bir süreç.",
          "İç mekân uygulamalarında lightbox ve gergi kumaş sistemler öne çıkıyor; ince kasa yapısı sayesinde otel lobisi gibi hassas mekânlarda ağır durmuyorlar.",
        ],
        character: "Termal turizm ve konaklama işletmeleri",
        faqs: [
          {
            q: "Otel için komple yönlendirme sistemi yapıyor musunuz?",
            a: "Evet. Karşılama panosundan oda numaralarına, kat yönlendirmelerinden acil çıkış levhalarına kadar tüm seti tek bir tasarım dili içinde üretiyoruz.",
          },
        ],
      },
      en: {
        heading: "Signage in Havza, Samsun",
        metaTitle: "Sign Manufacturing in Havza, Samsun — Royal Reklam",
        metaDescription:
          "Illuminated signage, lightboxes and identity work in Havza, Samsun. Design-led solutions for thermal and hospitality venues.",
        answer:
          "Royal Reklam produces illuminated signage, lightbox panels and brand identity work in Havza, Samsun — reception boards, wayfinding and façade signage for thermal and hospitality businesses.",
        intro: [
          "Havza is known for its thermal springs and spa facilities. Where hospitality dominates, signage arrives as a system rather than a single façade panel: reception boards, branded feature walls, floor and room wayfinding, and information panels.",
          "Every piece has to speak the same typographic and material language. Because identity design and sign fabrication sit in the same team here, that consistency comes naturally.",
          "Indoors, lightboxes and tensioned fabric systems come to the fore — their slim profile keeps them from feeling heavy in a hotel lobby.",
        ],
        character: "Thermal tourism and hospitality",
        faqs: [
          {
            q: "Do you produce complete hotel wayfinding?",
            a: "Yes — from reception boards to room numbers, floor directories and emergency egress signage, all within a single design language.",
          },
        ],
      },
    },
  },

  {
    id: "ondokuzmayis",
    slug: { tr: "ondokuzmayis", en: "ondokuzmayis" },
    name: { tr: "Ondokuzmayıs", en: "Ondokuzmayıs" },
    featured: false,
    popularServiceIds: ["isikli-tabela", "dijital-baski", "arac-giydirme"],
    copy: {
      tr: {
        heading: "Ondokuzmayıs Tabela ve Reklam Uygulamaları",
        metaTitle: "Ondokuzmayıs Tabela İmalatı | Samsun — Royal Reklam",
        metaDescription:
          "Samsun Ondokuzmayıs ilçesinde ışıklı tabela, dijital baskı ve araç giydirme. Keşiften montaja kendi ekibimizle.",
        answer:
          "Royal Reklam, Samsun Ondokuzmayıs ilçesinde ışıklı tabela, cephe tabelası, dijital baskı ve araç giydirme hizmeti verir. Keşif, imalat ve montaj kendi ekibimizle yürütülür.",
        intro: [
          "Ondokuzmayıs, sahil şeridi ve ilçe merkezindeki esnaf ticaretiyle ölçekli ama düzenli bir tabela talebi oluşturuyor. Küçük ve orta ölçekli işletmeler için doğru kurgulanmış bir cephe tabelası, ilçe içindeki rekabette belirgin fark yaratıyor.",
          "Deniz etkisi altındaki tüm konumlarda olduğu gibi burada da malzeme seçimi kritik. Paslanmaz bağlantı elemanı ve dış mekân sınıfı LED kullanımı standardımızdır.",
          "İlçedeki işleri tek programda topluyor, keşif ve montajı aynı rota içinde planlıyoruz.",
        ],
        character: "Sahil şeridi ve ilçe merkezi esnafı",
        faqs: [
          {
            q: "Küçük işletmeler için de uygun çözümünüz var mı?",
            a: "Evet. Bütçeye göre kompozit cephe tabelasından kutu harfe kadar farklı seviyelerde seçenek sunuyoruz; malzeme kalitesinden ödün vermeden ölçek küçültülebilir.",
          },
        ],
      },
      en: {
        heading: "Signage in Ondokuzmayıs, Samsun",
        metaTitle: "Sign Manufacturing in Ondokuzmayıs, Samsun — Royal Reklam",
        metaDescription:
          "Illuminated signage, printing and vehicle wrapping in Ondokuzmayıs, Samsun, handled end to end by our own team.",
        answer:
          "Royal Reklam provides illuminated signage, shopfront signs, printing and vehicle wrapping in Ondokuzmayıs, Samsun, with survey, fabrication and installation handled in house.",
        intro: [
          "Ondokuzmayıs generates modest but steady demand through its coastal strip and town-centre trade. For small and mid-sized businesses, a well-considered shopfront makes a visible difference locally.",
          "As with every location exposed to sea air, material choice matters. Stainless fixings and outdoor-grade LEDs are standard on our installations here.",
          "We group district work into a single programme, planning survey and installation on the same route.",
        ],
        character: "Coastal strip and town-centre trade",
        faqs: [
          {
            q: "Do you have options for small businesses?",
            a: "Yes — from composite shopfront panels through to channel letters, scaled to budget without compromising material quality.",
          },
        ],
      },
    },
  },
];

export const featuredRegions = regions.filter((region) => region.featured);

/**
 * Ayrı sayfası olmayan, ancak hizmet verdiğimiz diğer ilçeler.
 * Bölge merkez sayfasında liste olarak gösterilir — hem kullanıcı hem de
 * "Samsun'un hangi ilçelerine hizmet veriyorsunuz" sorusuna cevap arayan
 * dil modelleri için değerlidir.
 */
export const additionalDistricts = [
  "Alaçam",
  "Asarcık",
  "Ayvacık",
  "Kavak",
  "Ladik",
  "Salıpazarı",
  "Yakakent",
];

export function getRegionBySlug(slug: string, locale: Locale): Region | undefined {
  return regions.find((region) => region.slug[locale] === slug);
}

export function allRegionSlugs(locale: Locale): string[] {
  return regions.map((region) => region.slug[locale]);
}
