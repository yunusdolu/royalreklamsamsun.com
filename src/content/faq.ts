import type { Locale } from "@/i18n/routing";

export interface Faq {
  q: string;
  a: string;
}

export type FaqCategory = "general" | "pricing" | "permits" | "technical" | "aftercare";

export interface CategorisedFaq extends Faq {
  category: FaqCategory;
}

/**
 * Anasayfadaki kısa SSS bloğu.
 * Bu sorular hem FAQPage schema'sını hem de dil modellerinin doğrudan
 * alıntılayabileceği cevapları besler — bu yüzden cevaplar tam cümle ve
 * kendi başına anlamlıdır ("yukarıda belirtildiği gibi" tarzı bağlam yok).
 */
export const homeFaqs: Record<Locale, Faq[]> = {
  tr: [
    {
      q: "Samsun'da tabela fiyatları neye göre belirlenir?",
      a: "Tabela fiyatı metrekare üzerinden başlar; kasa derinliği, yüzey malzemesi (pleksi kalınlığı veya kompozit sınıfı), LED modül sayısı, montaj yüksekliği ve erişim yöntemi toplam bedeli belirler. Yerinde keşif yapılmadan verilen rakamlar genellikle yanıltıcı olur.",
    },
    {
      q: "Tabela ne kadar sürede teslim edilir?",
      a: "Standart ölçülerde bir cephe tabelası, keşif ve tasarım onayından sonra ortalama 5–10 iş günü içinde monte edilir. Kutu harf 7–12 iş günü, totem tabela ise temel ve statik gereksinimleri nedeniyle 10–20 iş günü sürer.",
    },
    {
      q: "Tabela için belediyeden izin almak gerekiyor mu?",
      a: "Evet. Samsun'da cepheye asılacak tabelalar ilan ve reklam vergisine tabidir ve ilgili ilçe belediyesinden izin alınması gerekir. Ölçü, aydınlatma ve cepheden taşma sınırları ilçeden ilçeye değişir. Başvuru için gereken teknik çizimi Royal Reklam hazırlar.",
    },
    {
      q: "Keşif ücretli mi?",
      a: "Samsun merkez ve ilçelerinde yerinde keşif ücretsizdir. Şehir dışı keşiflerde yol gideri alınır, iş sözleşmeye bağlandığında bu tutar toplam bedelden düşülür.",
    },
    {
      q: "Samsun dışına hizmet veriyor musunuz?",
      a: "Evet. İmalat Samsun İlkadım'daki atölyemizde yapılır, montaj ekibimiz Türkiye'nin her iline gider. Şubeleşen markalarla çalışırken tüm şubelerde aynı standardı uyguluyoruz.",
    },
    {
      q: "Tabelanın garantisi var mı?",
      a: "İmalat ve LED bileşenleri için 2 yıl garanti verilir. Garanti süresince arızalı LED modülü veya trafo ücretsiz değiştirilir; tabelanın tamamının sökülmesi gerekmez.",
    },
  ],
  en: [
    {
      q: "What determines sign prices in Samsun?",
      a: "Pricing starts per square metre; cabinet depth, face material (acrylic thickness or composite class), LED module count, installation height and access method set the total. Figures quoted without an on-site survey are usually misleading.",
    },
    {
      q: "How long does a sign take to deliver?",
      a: "A standard shopfront sign is installed within 5–10 business days of survey and design approval. Channel letters take 7–12 business days, and totem signs 10–20 business days because of foundation and structural requirements.",
    },
    {
      q: "Is a municipal permit required for signage?",
      a: "Yes. Façade signs in Samsun are subject to advertising tax and require permission from the relevant district municipality. Limits on size, brightness and projection vary by district. Royal Reklam prepares the technical drawings for the application.",
    },
    {
      q: "Is the survey chargeable?",
      a: "On-site surveys within Samsun and its districts are free. For out-of-city surveys a travel charge applies, which is deducted from the total once the work is contracted.",
    },
    {
      q: "Do you work outside Samsun?",
      a: "Yes. Fabrication takes place at our workshop in İlkadım, Samsun, and our installation crews travel to every province in Türkiye. For multi-site brands we hold the same standard at every branch.",
    },
    {
      q: "Is the sign under warranty?",
      a: "Fabrication and LED components carry a 2-year warranty. Faulty LED modules or drivers are replaced free of charge during that period, without dismounting the whole sign.",
    },
  ],
};

/** Tam SSS sayfası — kategorilere ayrılmış geniş set. */
export const allFaqs: Record<Locale, CategorisedFaq[]> = {
  tr: [
    ...homeFaqs.tr.slice(0, 1).map((f) => ({ ...f, category: "pricing" as const })),
    {
      category: "general",
      q: "Royal Reklam hangi hizmetleri veriyor?",
      a: "Işıklı tabela, kutu harf tabela, totem tabela, lightbox pano, cephe giydirme, araç giydirme, dijital baskı, kurumsal kimlik çalışmaları, etiket ve sticker üretimi ile imalat-tasarım-montaj hizmetleri veriyoruz. Tüm süreçler kendi ekibimizle yürütülür.",
    },
    {
      category: "general",
      q: "Tasarımım yok, siz yapabilir misiniz?",
      a: "Evet. Art direktör İshak Bal yönetimindeki tasarım ekibimiz logo, kurumsal kimlik ve tabela tasarımını hazırlar. Tasarımı onaylamadan önce cephenize giydirilmiş üç boyutlu görselini görürsünüz.",
    },
    {
      category: "general",
      q: "Mevcut tabelamı yenileyebilir misiniz?",
      a: "Evet. Çoğu durumda mevcut kasa korunarak yalnızca yüzey ve LED yenilemesi yapılabilir; bu, komple yeni imalata göre belirgin bir maliyet avantajı sağlar. Kasanın durumu keşifte değerlendirilir.",
    },
    {
      category: "pricing",
      q: "Telefonda fiyat alabilir miyim?",
      a: "Ölçüleri ve montaj koşullarını bildiğiniz standart işlerde telefonda bir aralık verebiliriz. Ancak cephe tipi, montaj yüksekliği ve elektrik altyapısı görülmeden verilen kesin fiyat çoğu zaman yanıltıcı olur; bu yüzden keşfi öneriyoruz.",
    },
    {
      category: "pricing",
      q: "Ödeme nasıl yapılıyor?",
      a: "Genel uygulamamız iş başlangıcında peşinat, teslimde bakiye şeklindedir. Kurumsal işlerde ve çok noktalı projelerde ödeme planı sözleşmeyle ayrıca belirlenir.",
    },
    {
      category: "permits",
      q: "İzin başvurusunu siz mi yapıyorsunuz?",
      a: "Başvuru için gereken teknik çizim, ölçü ve görselleştirmeyi biz hazırlıyoruz. Resmî başvurunun işletme adına yapılması gerektiği için evrak setini size teslim ediyor, süreç boyunca destek oluyoruz.",
    },
    {
      category: "permits",
      q: "AVM içindeki mağazam için farklı kurallar var mı?",
      a: "Evet. Çoğu AVM'nin cephe kılavuzu vardır; harf yüksekliği, kutu derinliği, cepheden taşma miktarı ve aydınlatma parlaklığı sınırlanır. Projeyi bu kılavuza göre hazırlayıp AVM yönetiminin onayını almanıza yardımcı oluyoruz.",
    },
    {
      category: "technical",
      q: "Kutu harf ile düz tabela arasındaki fark nedir?",
      a: "Düz tabelada tüm yazı tek bir levha üzerine basılır. Kutu harfte ise her harf ayrı bir hacim olarak üretilip cepheye tek tek monte edilir; bu gölge ve derinlik oluşturduğu için çok daha prestijli görünür. İmalat süresi ve maliyeti daha yüksektir.",
    },
    {
      category: "technical",
      q: "Işıklı tabelanın elektrik tüketimi ne kadar?",
      a: "LED aydınlatmalı bir tabela, aynı ölçüdeki floresanlı bir tabelaya göre %60'a varan tasarruf sağlar. Kesin tüketim, kullanılan modül sayısı ve günlük çalışma süresine göre hesaplanır; teklifte bu bilgiyi de veriyoruz.",
    },
    {
      category: "technical",
      q: "Denize yakın cephelerde hangi malzeme kullanılmalı?",
      a: "Tuzlu ve nemli hava nedeniyle paslanmaz bağlantı elemanı, elektrostatik boyalı alüminyum gövde ve en az IP65 korumalı LED kullanılmalıdır. Galvanizsiz çelik bağlantılar birkaç yıl içinde cephede pas akıntısı oluşturur.",
    },
    {
      category: "aftercare",
      q: "LED'ler arızalanırsa ne oluyor?",
      a: "Modüler yapı sayesinde yalnızca arızalı LED modülü veya trafo değiştirilir; tabelanın sökülmesine gerek kalmaz. Garanti süresi içindeki bu müdahale ücretsizdir.",
    },
    {
      category: "aftercare",
      q: "Periyodik bakım anlaşması yapıyor musunuz?",
      a: "Evet. Garanti süresi sonrasında talep eden işletmelerle yıllık bakım anlaşması yapıyoruz. Bakım kapsamında aydınlatma kontrolü, bağlantı elemanı sıkılığı ve yüzey temizliği yer alır.",
    },
  ],
  en: [
    ...homeFaqs.en.slice(0, 1).map((f) => ({ ...f, category: "pricing" as const })),
    {
      category: "general",
      q: "What services does Royal Reklam offer?",
      a: "Illuminated signage, channel letters, totem signs, lightbox panels, façade cladding, vehicle wrapping, large format printing, brand identity work, labels and stickers, plus manufacturing, design and installation. Every stage is handled by our own team.",
    },
    {
      category: "general",
      q: "I have no artwork — can you design it?",
      a: "Yes. Our design team, led by art director İshak Bal, produces logos, brand identity and sign design. You see a three-dimensional rendering on your own façade before approving anything.",
    },
    {
      category: "general",
      q: "Can you refurbish my existing sign?",
      a: "Often yes. In many cases the existing cabinet can be retained and only the face and LEDs renewed, which is significantly cheaper than complete replacement. The cabinet's condition is assessed at survey.",
    },
    {
      category: "pricing",
      q: "Can I get a price over the phone?",
      a: "For standard work where you know the measurements and conditions we can give a range by phone. But a firm price given without seeing the façade type, installation height and electrical supply is usually misleading, so we recommend a survey.",
    },
    {
      category: "pricing",
      q: "How does payment work?",
      a: "Our usual arrangement is a deposit at commencement and the balance on handover. For corporate and multi-site projects the payment schedule is set out separately in the contract.",
    },
    {
      category: "permits",
      q: "Do you handle the permit application?",
      a: "We prepare the technical drawings, measurements and visuals required. Since the formal application must be made in the business's name, we hand over the document set and support you throughout.",
    },
    {
      category: "permits",
      q: "Are the rules different inside a shopping mall?",
      a: "Yes. Most malls have façade guidelines limiting letter height, return depth, projection and brightness. We engineer to those guidelines and help you secure mall management approval.",
    },
    {
      category: "technical",
      q: "What is the difference between channel letters and a flat sign?",
      a: "A flat sign prints the whole wordmark onto one panel. Channel letters are individual three-dimensional volumes mounted separately, creating depth and shadow for a far more premium result, at higher cost and lead time.",
    },
    {
      category: "technical",
      q: "How much electricity does an illuminated sign use?",
      a: "An LED-lit sign uses up to 60% less than a fluorescent equivalent of the same size. Exact consumption depends on module count and daily operating hours; we include this figure in the quotation.",
    },
    {
      category: "technical",
      q: "Which materials suit seafront façades?",
      a: "Salt and humidity call for stainless fixings, powder-coated aluminium bodies and LEDs rated at least IP65. Non-galvanised steel fixings will produce rust staining on the façade within a few years.",
    },
    {
      category: "aftercare",
      q: "What happens if the LEDs fail?",
      a: "The modular build means only the faulty module or driver is replaced — the sign does not need to be dismounted. Within the warranty period this service is free.",
    },
    {
      category: "aftercare",
      q: "Do you offer maintenance agreements?",
      a: "Yes. After the warranty period we arrange annual maintenance agreements covering lighting checks, fixing torque inspection and surface cleaning.",
    },
  ],
};
