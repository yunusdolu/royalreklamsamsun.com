import type { ServiceCopy } from "./types";

/**
 * Türkçe hizmet metinleri.
 *
 * Yazım kuralları (SEO + GEO):
 *  - `answer` alanı her zaman "X nedir + Royal Reklam ne yapar + süre" kalıbında,
 *    40–60 kelime. Dil modelleri bu paragrafı olduğu gibi alıntılar.
 *  - `metaTitle` 60 karakteri, `metaDescription` 155 karakteri aşmamalı.
 *  - `specs` ve `priceFactors` yapılandırılmış olduğu için hem kullanıcı hem
 *    yapay zeka tarafından kolay taranır.
 */
export const servicesTr: Record<string, ServiceCopy> = {
  "isikli-tabela": {
    name: "Tabela",
    shortName: "Tabela",
    tagline: "Cephenizin ilk cümlesi",
    summary:
      "Işıklı ve ışıksız cephe tabelaları: kompozit kasa, pleksi, vinil, kör kasa ve fener tabela imalatı.",
    answer:
      "Tabela, bir işletmenin adını ve işini cepheden okutan tanıtım levhasıdır; ışıklı veya ışıksız üretilir. Royal Reklam, Samsun'da alüminyum kompozit kasa, pleksiglas ve vinil yüzeyle ışıklı tabela; aydınlatması olmayan konumlar için kör kasa tabela imalatı yapar. Keşif, tasarım, üretim ve montaj dâhil ortalama teslim süresi 5–10 iş günüdür.",
    metaTitle: "Samsun Tabela İmalatı | Cephe Tabelası — Royal Reklam",
    metaDescription:
      "Samsun'da tabela imalatı: ışıklı tabela, kör kasa, fener tabela ve vinil tabela. Keşif, tasarım, imalat ve montaj tek elden, ücretsiz keşif. 0544 230 71 77",
    keywords: [
      "samsun tabela",
      "samsun tabela imalatı",
      "samsun ışıklı tabela",
      "kör kasa tabela",
      "led tabela samsun",
      "samsun tabela firmaları",
      "cephe tabelası samsun",
      "tabela fiyatları samsun",
    ],
    intro: [
      "Bir mağazanın en çok çalışan reklam aracı cephesidir. Doğru tipografiyle hazırlanmış bir tabela gündüz dikkat çeker; gece aydınlatması yoksa görünmez hâle gelir. Bu yüzden tabelayı konuma göre seçmek gerekir: cephesi karanlık bir sokakta ışıklı tabela zorunludur, zaten aydınlık bir pasajda kör kasa tabela hem yeterli hem daha ekonomiktir.",
      "Royal Reklam olarak Samsun'da ışıklı tabela üretimini kendi atölyemizde yapıyoruz. Kasa imalatından pleksi kesimine, LED dizilişinden elektrik bağlantısına kadar tüm süreç tek elden yürüdüğü için hem teslim süresi kısalıyor hem de sorumluluk dağılmıyor.",
      "Kullandığımız LED modüller IP65 korumalıdır; Karadeniz ikliminin nem ve yağışına, Samsun cephesindeki rüzgâr yüküne göre seçilir. Aydınlatmanın homojen olması için modül aralığı her tabelada ayrı hesaplanır — bu, ucuz üretimlerde en sık görülen leke ve gölge sorununu baştan ortadan kaldırır.",
    ],
    highlights: [
      {
        title: "Homojen aydınlatma",
        description:
          "LED modül aralığı tabela derinliğine göre hesaplanır; yüzeyde leke, gölge veya parlak nokta oluşmaz.",
      },
      {
        title: "IP65 dış mekân koruması",
        description:
          "Nem, yağmur ve toza karşı sızdırmaz modüller. Karadeniz iklimi için doğru seçim.",
      },
      {
        title: "Düşük enerji tüketimi",
        description:
          "Floresan ve neona kıyasla %60'a varan tasarruf; işletme gideriniz aylık faturaya yansır.",
      },
      {
        title: "Servis edilebilir tasarım",
        description:
          "Modüller ve trafo, cepheyi sökmeden ulaşılabilecek şekilde konumlandırılır.",
      },
    ],
    specs: [
      {
        label: "Kasa malzemesi",
        value: "Alüminyum kompozit veya galvaniz sac profil",
      },
      { label: "Yüzey", value: "Pleksiglas 3–5 mm (opal, renkli veya buzlu)" },
      { label: "Aydınlatma", value: "SMD LED modül, 12V / 24V, IP65" },
      { label: "Besleme", value: "Sabit voltajlı LED trafo, koruma sigortalı" },
      { label: "Baskı", value: "UV dayanımlı folyo kesim veya dijital baskı" },
      { label: "LED ömrü", value: "30.000 – 50.000 saat" },
      { label: "Montaj", value: "Dübel + kimyasal ankraj, cephe tipine göre" },
    ],
    priceFactors: [
      "Tabela ölçüsü (m² olarak toplam yüzey)",
      "Kasa derinliği ve taşıyıcı konstrüksiyon ihtiyacı",
      "Yüzey malzemesi: pleksi kalınlığı, tek yüz / çift yüz kullanım",
      "LED modül sayısı ve aydınlatma yoğunluğu",
      "Montaj yüksekliği — sepetli araç veya iskele gerekip gerekmediği",
      "Belediye ruhsatı ve cephe yönetmeliği kaynaklı ölçü kısıtları",
    ],
    useCases: [
      "Cadde üstü mağaza ve butikler",
      "AVM içi dükkân cepheleri",
      "Eczane, market ve şube tabelaları",
      "Restoran, kafe ve gece işleyen işletmeler",
      "Ofis ve plaza giriş tanıtım levhaları",
    ],
    variants: [
      {
        name: "Kompozit Kasa + Pleksi Yüzey",
        description:
          "Alüminyum kompozit kasa, pleksiglas yüzey ve iç LED aydınlatma. Cephe tabelasının en yaygın ve en dengeli tipi. Cadde üstü mağazaların çoğunda ilk önerdiğimiz tiptir; maliyet, dayanım ve gece okunurluğu arasında en dengeli noktayı tutar.",
        image:
          "/images/services/variants/isikli-tabela/kompozit-kasa-pleksi-yuzey.jpg",
      },
      {
        name: "Işıklı Vinil Tabela",
        description:
          "Pleksi yerine ışık geçiren vinil yüzey kullanılır. Geniş ölçülerde daha ekonomik, görseli gerektiğinde yenilenebilir. Uzun cephelerde pleksi ek yeri gerektirmediği için yüzey kesintisiz görünür; görseli değiştirmek de kasayı sökmeden mümkündür.",
        image:
          "/images/services/variants/isikli-tabela/isikli-vinil-tabela.jpg",
      },
      {
        name: "Vakum Pleksi Tabela",
        description:
          "Pleksi kalıpta ısıtılıp şişirilerek kabartmalı yüzey elde edilir; logo ve yazı yüzeyden çıkıntılı durur. Kalıp gerektirdiği için tek seferlik maliyeti yüksektir, ama zincir markalarda aynı kalıp her şubede kullanılır.",
        image:
          "/images/services/variants/isikli-tabela/vakum-pleksi-tabela.jpg",
      },
      {
        name: "Kör Kasa Tabela (Işıksız)",
        description:
          "Aydınlatması olmayan kapalı kasa tabela. Yüzeyine folyo kesim veya dijital baskı uygulanır; cephesi zaten aydınlık konumlar için. İçinde LED olmadığı için hem daha ucuzdur hem elektrik tesisatı istemez; pasaj içi ve aydınlatılmış cephelerde yeterlidir.",
        image: "/images/services/variants/isikli-tabela/kor-kasa-tabela.jpg",
      },
      {
        name: "Fener Tabela",
        description:
          "Cepheye dik monte edilen çift yüzlü ışıklı kasa. Kaldırımda yürüyen kişi cepheye dönmeden de görür. Dar sokaklarda cephe tabelası ancak karşıdan görülürken, fener tabela kaldırımdan yaklaşan müşteriye metrelerce önce görünür.",
        image: "/images/services/variants/isikli-tabela/fener-tabela.jpg",
      },
      {
        name: "Krom / Paslanmaz Kasalı Tabela",
        description:
          "Kasası paslanmaz çelikten üretilir. Otel, plaza ve kurumsal cephelerde metalin verdiği ağırlık için tercih edilir. Paslanmaz yüzey deniz havasına dayanır; Samsun'da sahile yakın cephelerde boyalı kasaya göre belirgin avantaj sağlar.",
        image: "/images/services/variants/isikli-tabela/krom-kasali-tabela.jpg",
      },
      {
        name: "Neon Efektli (Neon Flex) Tabela",
        description:
          "Cam neonun görüntüsünü LED şeritle verir. Kırılmaz, az enerji harcar; kafe ve bar cephelerinde yaygın. Cam neonun aksine kırılmaz ve sökülüp taşınabilir; iç mekânda duvar yazısı olarak da sık kullanılır.",
        image: "/images/services/variants/isikli-tabela/neon-flex-tabela.jpg",
      },
      {
        name: "Ahşap Görünümlü Işıklı Tabela",
        description:
          "Ahşap veya ahşap desenli kompozit yüzeyle sıcak bir doku. Butik, kahveci ve konsept mekânlara uygun. Gerçek ahşap yerine ahşap desenli kompozit kullanılır; dış mekânda çatlama, kabarma ve yıllık bakım derdi olmaz.",
        image:
          "/images/services/variants/isikli-tabela/ahsap-gorunumlu-isikli-tabela.jpg",
      },
      {
        name: "Vitrin İçi Işıklı Pano",
        description:
          "Cepheye değil vitrinin içine yerleştirilen ince ışıklı pano. Ruhsat kısıtı olan konumlarda pratik çözüm. Cepheye müdahale edilmediği için çoğu yerde ruhsat gerektirmez; kiracı taşınırken panoyu da yanında götürür.",
        image:
          "/images/services/variants/isikli-tabela/vitrin-ici-isikli-pano.jpg",
      },
    ],
    faqs: [
      {
        q: "Samsun'da ışıklı tabela ne kadar sürede teslim edilir?",
        a: "Standart ölçülerde bir cephe tabelası, keşif ve tasarım onayından sonra ortalama 5–10 iş günü içinde monte edilir. Özel konstrüksiyon veya yüksek metrajlı işlerde bu süre 2–3 haftaya çıkabilir.",
      },
      {
        q: "Işıklı tabela fiyatı neye göre belirlenir?",
        a: "Fiyat metrekare üzerinden başlar; kasa derinliği, pleksi kalınlığı, LED modül sayısı ve montaj yüksekliği toplam bedeli belirleyen ana kalemlerdir. Yerinde keşif yapılmadan verilen rakamlar genellikle yanıltıcı olur.",
      },
      {
        q: "Işıklı tabela için belediyeden izin gerekiyor mu?",
        a: "Evet. Samsun'da cepheye asılacak tabelalar için ilgili ilçe belediyesinden ilan ve reklam izni alınması gerekir. Ölçü, renk ve konum sınırları ilçeden ilçeye değişir; başvuru için gereken teknik çizimi biz hazırlıyoruz.",
      },
      {
        q: "LED'ler arızalanırsa tabelanın tamamı değişir mi?",
        a: "Hayır. Modüler yapı sayesinde yalnızca arızalı LED modül veya trafo değiştirilir. Tabelayı sökmeye gerek kalmaz; müdahale çoğu işte tek ziyarette biter.",
      },
    ],
  },

  "kutu-harf-tabela": {
    name: "Kutu Harf Tabela",
    shortName: "Kutu Harf",
    tagline: "Hacimli, prestijli, kalıcı",
    summary:
      "Her harfin ayrı üretildiği, üç boyutlu ve ışıklı tabela çözümü. Kurumsal markaların ilk tercihi.",
    answer:
      "Kutu harf tabela, her harfin ayrı bir hacimli kutu olarak üretilip cepheye tek tek monte edildiği tabela türüdür. Royal Reklam, Samsun'da pleksi yüzlü, alüminyum yan bantlı ve LED aydınlatmalı kutu harf imalatı yapar. Önden, arkadan (halo) veya çift yönlü aydınlatma seçenekleriyle ortalama 7–12 iş gününde teslim edilir.",
    metaTitle: "Samsun Kutu Harf Tabela İmalatı — Royal Reklam Samsun",
    metaDescription:
      "Samsun kutu harf tabela: pleksi yüzlü, LED aydınlatmalı, halo ışıklı 3 boyutlu harf imalatı. AVM ve cadde mağazaları için kurumsal çözüm. 0544 230 71 77",
    keywords: [
      "samsun kutu harf",
      "kutu harf tabela samsun",
      "kutu harf imalatı",
      "3 boyutlu tabela samsun",
      "halo ışık tabela",
      "kutu harf fiyatları",
    ],
    intro: [
      "Kutu harf, tabelacılıkta kurumsal algının en yüksek olduğu üründür. Harfler tek parça bir levha üzerine basılmaz; her biri kendi derinliği, kendi aydınlatması ve kendi montaj noktası olan bağımsız bir hacim olarak üretilir. Sonuç, cephede gölge ve derinlik yaratan, ucuz durmayan bir görünümdür.",
      "Üç aydınlatma tipini de uyguluyoruz: harfin ön yüzünden ışık veren klasik kullanım, arka yüzeyden duvara vuran ve harfin etrafında hâle oluşturan halo (backlit) kullanım ve ikisinin birlikte çalıştığı çift yönlü kullanım. Halo aydınlatma özellikle taş, ahşap ve koyu cephelerde çok güçlü bir sonuç verir.",
      "Harf kalıpları CNC ile kesildiği için tipografinizin kurumsal kimlik dosyanızdaki hâline birebir sadık kalırız. İnce serif detayları, ligatürler ve Türkçe karakterler (ş, ğ, ı, ö, ü, ç) dâhil hiçbir harf sadeleştirilmez.",
    ],
    highlights: [
      {
        title: "CNC hassasiyeti",
        description:
          "Harfler vektörel dosyadan doğrudan kesilir; kurumsal tipografiniz bozulmadan uygulanır.",
      },
      {
        title: "Üç aydınlatma tipi",
        description:
          "Önden ışıklı, arkadan halo ışıklı veya çift yönlü — cephenin karakterine göre seçilir.",
      },
      {
        title: "Paslanmaz montaj",
        description:
          "Distans aparatları ve bağlantı elemanları paslanmaz; yıllar içinde cephede pas akıntısı oluşmaz.",
      },
      {
        title: "AVM yönetmeliğine uygun",
        description:
          "AVM cephe kılavuzlarındaki derinlik, taşma ve aydınlatma sınırlarına uygun projelendirme.",
      },
    ],
    specs: [
      { label: "Harf yüzeyi", value: "Pleksiglas 3–5 mm veya alüminyum" },
      { label: "Yan bant", value: "Alüminyum profil, 5–15 cm derinlik" },
      { label: "Aydınlatma", value: "SMD LED, önden / halo / çift yön" },
      { label: "Yüzey işlemi", value: "Elektrostatik toz boya, RAL renk kodu" },
      { label: "Kesim", value: "CNC router, vektörel dosyadan" },
      {
        label: "Montaj",
        value: "Distans aparatlı, paslanmaz bağlantı elemanı",
      },
      { label: "Türkçe karakter", value: "ş, ğ, ı, ö, ü, ç tam destek" },
    ],
    priceFactors: [
      "Harf yüksekliği ve toplam karakter sayısı",
      "Kutu derinliği (5 cm ile 15 cm arası)",
      "Aydınlatma tipi — halo aydınlatma önden ışığa göre daha maliyetlidir",
      "Yüzey malzemesi ve boya seçimi (özel RAL, mat/parlak)",
      "Logo/amblem karmaşıklığı — çok parçalı ambleme ek kalıp gerekir",
      "Cephe tipi ve montaj yüksekliği",
    ],
    useCases: [
      "AVM içi mağaza cepheleri",
      "Kurumsal ofis ve plaza girişleri",
      "Otel, restoran ve kafe cepheleri",
      "Showroom ve galeri tabelaları",
      "Fabrika ve tesis ana giriş tanıtımı",
    ],
    variants: [
      {
        name: "Standart Kutu Harf",
        description:
          "Yüzeyi pleksi, yan bandı alüminyum; ışık önden verilir. Kutu harfin en bilinen ve en çok uygulanan tipi. Harfler tek tek monte edildiği için aralarından cephe görünür; tabela bir levhadan çok mimarinin parçası gibi durur.",
        image:
          "/images/services/variants/kutu-harf-tabela/standart-kutu-harf.jpg",
      },
      {
        name: "Krom Harf",
        description:
          "Yüzey ve yan bant paslanmaz kromdan üretilir. Önden ışık geçmez; metalin parlaklığıyla prestijli bir duruş verir. Gece görünürlük bu yüzden cephe aydınlatmasına bağlıdır, spot veya halo ile birlikte planlanmalıdır.",
        image: "/images/services/variants/kutu-harf-tabela/krom-harf.jpg",
      },
      {
        name: "Fileli Krom Harf",
        description:
          "Ön yüzün kenarında 1,5–3 cm krom şerit bırakılır, ortasına ışık geçiren pleksi yerleştirilir. Yandığında krom bir çerçeve içinde parlar. Krom çerçeve harfin kenarını keskinleştirir; uzaktan bakıldığında yazı düz pleksi harfe göre daha net okunur.",
        image:
          "/images/services/variants/kutu-harf-tabela/fileli-krom-harf.jpg",
      },
      {
        name: "Alttan Aydınlatmalı Krom Harf",
        description:
          "Işık harfin altından verilir; krom yüzey aydınlanmaz, duvara yumuşak bir ışık yayılır. Resepsiyon ve kurumsal girişlerde şık durur. Işık doğrudan göze gelmediği için resepsiyon ve lobi gibi yakından bakılan yerlerde rahatsız etmez.",
        image:
          "/images/services/variants/kutu-harf-tabela/alttan-aydinlatmali-krom-harf.jpg",
      },
      {
        name: "Dekota Harf (PVC Köpük)",
        description:
          "PVC köpük levhadan CNC ile kesilen ışıksız harf. Hafif ve ekonomik; iç mekân ve kısa vadeli uygulamalar için. Dış mekânda uzun ömürlü değildir; fuar, mağaza içi ve süreli uygulamalarda tercih edilir.",
        image: "/images/services/variants/kutu-harf-tabela/dekota-harf.jpg",
      },
      {
        name: "Halo (Arkadan Işıklı) Kutu Harf",
        description:
          "Işık harfin arkasından duvara vurur, harf kendi hâlesinin önünde koyu durur. Kutu harfin en prestijli görünen tipi. Etkisi duvarın rengine bağlıdır: koyu ve düz yüzeyde hâle net çıkar, açık renk veya dokulu duvarda zayıflar.",
        image: "/images/services/variants/kutu-harf-tabela/halo-kutu-harf.jpg",
      },
      {
        name: "Çift Yönlü Işıklı Kutu Harf",
        description:
          "Hem önden hem arkadan aydınlatılır; harfin kendisi okunurken duvarda da hâle oluşur. Tek başına hem önden hem arkadan aydınlattığı için ikinci bir tabelaya gerek kalmaz; enerji tüketimi de ona göre artar.",
        image:
          "/images/services/variants/kutu-harf-tabela/cift-yonlu-isikli-kutu-harf.jpg",
      },
      {
        name: "Trimless (Çerçevesiz) Kutu Harf",
        description:
          "Yan bant profili görünmeyecek şekilde üretilir; harfin kenarı keskin ve tek parça görünür. Kenar profili görünmediği için imalat toleransı düşüktür; kesim ve montaj hassasiyeti standart harften daha kritiktir.",
        image:
          "/images/services/variants/kutu-harf-tabela/trimless-kutu-harf.jpg",
      },
      {
        name: "Işıksız Dekoratif Kutu Harf",
        description:
          "Aydınlatması olmayan hacimli harf. Resepsiyon arkası, toplantı odası ve iç mekân duvarları için. Elektrik hattı gerektirmediği için kiralık ofis ve mağazalarda tadilatsız uygulanabilir.",
        image:
          "/images/services/variants/kutu-harf-tabela/isiksiz-dekoratif-kutu-harf.jpg",
      },
    ],
    faqs: [
      {
        q: "Kutu harf ile düz tabela arasındaki fark nedir?",
        a: "Düz tabelada tüm yazı tek bir levha üzerine basılır; kutu harfte ise her harf ayrı bir hacimdir ve cepheye tek tek monte edilir. Kutu harf gölge ve derinlik oluşturduğu için çok daha prestijli görünür, ancak imalat süresi ve maliyeti daha yüksektir.",
      },
      {
        q: "Halo (arkadan aydınlatmalı) kutu harf nedir?",
        a: "Harfin ön yüzü opak kalır, LED ışık harfin arkasından duvara vurur ve harfin çevresinde yumuşak bir hâle oluşur. Koyu renkli, taş veya ahşap kaplı cephelerde son derece şık bir sonuç verir.",
      },
      {
        q: "AVM'ler kutu harf için özel kural koyuyor mu?",
        a: "Evet. Çoğu AVM'nin cephe kılavuzu vardır; harf yüksekliği, kutu derinliği, cepheden taşma miktarı ve aydınlatma parlaklığı sınırlanır. Projeyi bu kılavuza göre hazırlayıp AVM yönetiminin onayını almanıza yardımcı oluyoruz.",
      },
      {
        q: "Kutu harf tabela kaç yıl dayanır?",
        a: "Alüminyum gövde ve elektrostatik boya ile üretilen bir kutu harf, dış mekânda 10 yılın üzerinde form bozulmadan kalır. LED modüller ise 30.000–50.000 saatlik ömürleri sonunda değiştirilir; gövde aynen kullanılmaya devam eder.",
      },
    ],
  },

  "totem-tabela": {
    name: "Totem Tabela",
    shortName: "Totem",
    tagline: "Uzaktan görünen yön işareti",
    summary:
      "Yol kenarı ve otopark girişleri için dikey, çift yüzlü, ışıklı totem tabela imalatı ve montajı.",
    answer:
      "Totem tabela, zemine sabitlenen çelik konstrüksiyon üzerine kurulan dikey ve genellikle çift yüzlü tanıtım tabelasıdır. Royal Reklam, Samsun'da 2 ile 8 metre arası ışıklı totem imalatı, temel betonu ve montajını üstlenir. Akaryakıt istasyonu, AVM, otel ve site girişlerinde uzaktan görünürlük sağlar.",
    metaTitle: "Samsun Totem Tabela İmalatı ve Montajı — Royal Reklam Samsun",
    metaDescription:
      "Samsun totem tabela: 2–8 metre çift yüzlü ışıklı totem imalatı, statik hesap, temel ve montaj dâhil. AVM, otel ve istasyonlar için. 0544 230 71 77",
    keywords: [
      "totem tabela samsun",
      "samsun totem tabela imalatı",
      "ışıklı totem",
      "çift yüzlü totem tabela",
      "yol kenarı tabela samsun",
    ],
    intro: [
      "Cephe tabelası yalnızca binanın önünden görülür. Totem tabela ise aracını süren, karşı kaldırımdan geçen ya da otoparka giren birinin sizi yüzlerce metre öteden fark etmesini sağlar. Yol kenarındaki işletmeler için en yüksek geri dönüşü olan tabela türüdür.",
      "Totem, bir tabeladan çok bir yapı elemanıdır: rüzgâr yükünü taşıyacak çelik konstrüksiyon, uygun derinlikte betonarme temel ve doğru topraklama gerektirir. Royal Reklam olarak totem işlerinde statik hesabı, temel imalatını ve elektrik altyapısını da kapsayan komple bir teslim yapıyoruz.",
      "Çift yüzlü kullanım standardımızdır — böylece hem gelen hem giden trafik tabelayı okur. Çok kiracılı yapılar için modüler kaset sistemi kurgularız; yeni bir marka geldiğinde totemin tamamı değil, yalnızca ilgili kaset değişir.",
    ],
    highlights: [
      {
        title: "Statik hesaplı konstrüksiyon",
        description:
          "Rüzgâr yüküne göre boyutlandırılmış çelik iskelet ve betonarme temel.",
      },
      {
        title: "Çift yüzlü görünürlük",
        description:
          "Her iki trafik yönünden okunur; tek yüz maliyet kaybı yaratmaz.",
      },
      {
        title: "Modüler kaset sistemi",
        description:
          "Çok kiracılı totemlerde marka değişince yalnızca ilgili kaset sökülür.",
      },
      {
        title: "Anahtar teslim",
        description:
          "Temel kazısı, beton, elektrik çekimi ve montaj tek sözleşmede toplanır.",
      },
    ],
    specs: [
      { label: "Yükseklik", value: "2 – 8 m (özel projelerde daha yüksek)" },
      { label: "Konstrüksiyon", value: "Galvaniz veya boyalı çelik profil" },
      { label: "Kaplama", value: "Alüminyum kompozit + pleksiglas yüzey" },
      { label: "Aydınlatma", value: "İç aydınlatmalı SMD LED, IP65" },
      { label: "Temel", value: "Betonarme, zemin etüdüne göre derinlik" },
      { label: "Kullanım", value: "Tek yüz veya çift yüz" },
      { label: "Elektrik", value: "Topraklamalı hat, sigortalı pano" },
    ],
    priceFactors: [
      "Totem yüksekliği ve genişliği",
      "Çelik konstrüksiyon ağırlığı ve statik gereksinim",
      "Zemin yapısı — temel derinliğini ve beton miktarını belirler",
      "Tek yüz mü çift yüz mü kullanılacağı",
      "Kaset sayısı (çok kiracılı totemlerde)",
      "Elektrik hattının mesafesi ve pano ihtiyacı",
    ],
    useCases: [
      "Akaryakıt istasyonları",
      "AVM ve iş merkezi girişleri",
      "Otel, motel ve konaklama tesisleri",
      "Site ve konut projesi girişleri",
      "Sanayi sitesi ve fabrika yol yönlendirmeleri",
    ],
    variants: [
      {
        name: "Tek Yüz / Çift Yüz Işıklı Totem",
        description:
          "İç aydınlatmalı dikey totem. Çift yüz uygulamada yolun iki yönünden de okunur. Yol kenarında çift yüz neredeyse zorunludur; tek yüz yalnızca arkası duvara veya bina cephesine dayanan konumlarda yeterlidir.",
        image:
          "/images/services/variants/totem-tabela/tek-cift-yuz-isikli-totem.jpg",
      },
      {
        name: "Modüler Kaset Totem",
        description:
          "Her kiracı için ayrı kaset. AVM, iş merkezi ve sanayi sitelerinde kiracı değiştiğinde tek kaset sökülüp yenilenir. Kiracı değiştiğinde yalnızca o kaset yenilenir; tüm totemi sökmek veya yeniden boyamak gerekmez.",
        image: "/images/services/variants/totem-tabela/moduler-kaset-totem.jpg",
      },
      {
        name: "Monolit (Tek Blok) Totem",
        description:
          "Ayağı görünmeyen, zeminden yükselen masif blok biçiminde totem. Modern mimariyle uyumlu. Gövde tek parça göründüğü için temel ve statik hesabı daha kritiktir; rüzgâr yükü doğrudan zemine aktarılır.",
        image: "/images/services/variants/totem-tabela/monolit-totem.jpg",
      },
      {
        name: "Akaryakıt Fiyat Totemi",
        description:
          "LED rakamlı fiyat göstergeli istasyon totemi. Fiyatlar uzaktan güncellenir, elle levha değiştirmeye gerek kalmaz. Fiyat değişimi günlük olduğu için LED gösterge, elle levha değiştirmeye göre hem hızlı hem güvenlidir.",
        image:
          "/images/services/variants/totem-tabela/akaryakit-fiyat-totemi.jpg",
      },
      {
        name: "Site ve Konut Girişi Totemi",
        description:
          "Proje adı, blok şeması ve kat planını birlikte taşıyan giriş totemi. Ziyaretçi ve kurye blok numarasını girişte gördüğü için site içinde dolaşma ihtiyacı ortadan kalkar.",
        image:
          "/images/services/variants/totem-tabela/site-konut-girisi-totemi.jpg",
      },
      {
        name: "Wayfinding (Yön Bulma) Totemi",
        description:
          "Hastane, kampüs ve fabrika gibi geniş alanlarda ziyaretçiyi adım adım yönlendiren totem serisi. Tekil levha yerine seri hâlinde planlanır; tipografi ve ok dili her noktada aynı kaldığı sürece işe yarar.",
        image: "/images/services/variants/totem-tabela/wayfinding-totemi.jpg",
      },
      {
        name: "İnce Profil Totem",
        description:
          "Dar kesitli, yüksek ve zarif totem. Cephesi dar veya kaldırımı sınırlı konumlar için. Kaldırım genişliği veya belediye kısıtı nedeniyle geniş totem konulamayan yerlerde yüksekliği kullanarak görünürlük sağlar.",
        image: "/images/services/variants/totem-tabela/ince-profil-totem.jpg",
      },
    ],
    faqs: [
      {
        q: "Totem tabela için zemin etüdü gerekli mi?",
        a: "4 metrenin üzerindeki totemlerde zemin yapısının bilinmesi şarttır. Gevşek veya dolgu zeminde temel derinliği artırılır. Keşif sırasında zemini değerlendirir, gerekiyorsa ek temel önerisi sunarız.",
      },
      {
        q: "Totem tabela belediye iznine tabi mi?",
        a: "Evet, totemler ilan ve reklam vergisine tabidir ve ilgili belediyeden izin alınması gerekir. Yol kenarındaysa Karayolları görüşü de istenebilir. Başvuru dosyası için gereken teknik çizimleri hazırlıyoruz.",
      },
      {
        q: "Kaç metrelik totem yaptırmalıyım?",
        a: "Belirleyici olan aracın hıza bağlı görüş mesafesidir. Şehir içi caddede 3–4 metre çoğu durumda yeterlidir; çevre yolu ve yüksek hızlı güzergâhlarda 6 metre ve üzeri önerilir. Keşifte konumu birlikte değerlendiriyoruz.",
      },
    ],
  },

  "lightbox-tabela": {
    name: "Lightbox Tabela",
    shortName: "Lightbox",
    tagline: "İnce kasa, eşit ışık",
    summary:
      "Gergi kumaş veya pleksi yüzeyli, arkadan homojen aydınlatmalı ince kasa ışıklı pano sistemleri.",
    answer:
      "Lightbox tabela, ince alüminyum kasa içine yerleştirilen LED panel ile arkadan homojen aydınlatılan ışıklı panodur. Royal Reklam, Samsun'da gergi kumaş (textile) ve pleksi yüzeyli lightbox imalatı yapar. Görsel değişimi kumaş baskının sökülüp takılmasıyla dakikalar içinde yapılabilir.",
    metaTitle:
      "Samsun Lightbox Tabela ve Gergi Kumaş Pano — Royal Reklam Samsun",
    metaDescription:
      "Samsun lightbox tabela imalatı: ince kasa, gergi kumaş veya pleksi yüzey, homojen LED aydınlatma. Vitrin ve iç mekân için. 0544 230 71 77",
    keywords: [
      "lightbox tabela samsun",
      "gergi kumaş pano",
      "ışıklı pano samsun",
      "textile lightbox",
      "vitrin ışıklı pano",
    ],
    intro: [
      "Lightbox, kalın kasalı klasik ışıklı panonun çağdaş karşılığıdır. Kenar aydınlatmalı LED panel sayesinde kasa derinliği 4–8 santimetreye kadar iner, buna rağmen yüzeydeki ışık dağılımı kusursuz kalır. İç mekânda ve vitrinde çok daha zarif durur.",
      "İki yüzey seçeneği sunuyoruz. Gergi kumaş (textile) sistemde görsel, kenarına silikon fitil dikilmiş bir kumaşa basılır ve kasaya kanaldan geçirilerek gerilir; kampanya değiştiğinde kumaşı çıkarıp yenisini takmak birkaç dakika sürer. Pleksi yüzeyli sistemde ise görsel kalıcıdır ve daha yüksek darbe dayanımı sunar.",
      "Restoran menü panolarından mağaza vitrinlerine, hastane ve ofis yönlendirmelerinden fuar standlarına kadar geniş bir kullanım alanı vardır. Ölçüler tamamen projeye göre üretilir; standart kalıba bağlı değiliz.",
    ],
    highlights: [
      {
        title: "4–8 cm ince kasa",
        description:
          "Edge-lit LED panel sayesinde duvara neredeyse gömülü görünür.",
      },
      {
        title: "Dakikalar içinde görsel değişimi",
        description:
          "Gergi kumaş sistemde kampanya görselini işletme sahibi kendisi değiştirebilir.",
      },
      {
        title: "Leke bırakmayan ışık",
        description:
          "Difüzör tabaka ile yüzeyin tamamında eşit parlaklık; LED noktaları görünmez.",
      },
      {
        title: "Tek veya çift yüz",
        description:
          "Tavandan sarkıtmalı çift yüzlü kullanım için askı aparatı dâhil.",
      },
    ],
    specs: [
      { label: "Kasa", value: "Alüminyum profil, 4–8 cm derinlik" },
      {
        label: "Yüzey",
        value: "Gergi kumaş (silikon fitilli) veya pleksiglas",
      },
      { label: "Aydınlatma", value: "Edge-lit LED panel + difüzör" },
      { label: "Baskı", value: "Textile süblimasyon veya UV baskı" },
      { label: "Montaj", value: "Duvara sabit, tavandan askılı veya ayaklı" },
      { label: "Kullanım", value: "İç mekân; dış mekân için IP54 versiyon" },
      { label: "Görsel değişimi", value: "Kumaş sistemde araçsız, 3–5 dakika" },
    ],
    priceFactors: [
      "Pano ölçüsü (m²)",
      "Yüzey tipi — gergi kumaş veya pleksi",
      "Tek yüz / çift yüz kullanım",
      "LED panel parlaklık sınıfı",
      "İç mekân mı dış mekân mı (IP koruma sınıfı)",
      "Askı, ayak veya özel montaj aparatı ihtiyacı",
    ],
    useCases: [
      "Mağaza vitrini ve iç mekân kampanya panoları",
      "Restoran ve kafe menü panoları",
      "AVM içi reklam ve yönlendirme üniteleri",
      "Fuar standı ve showroom aydınlatmalı görselleri",
      "Hastane, otel ve ofis karşılama panoları",
    ],
    variants: [
      {
        name: "Gergi Kumaş (Textile) Lightbox",
        description:
          "Silikon fitilli kumaş yüzey kasaya gerilir. Görsel, araç gerekmeden 3–5 dakikada değiştirilir. Kampanyası sık değişen mağazalarda baskı maliyeti yalnızca kumaşla sınırlı kalır; kasa aynı kalır.",
        image:
          "/images/services/variants/lightbox-tabela/gergi-kumas-lightbox.jpg",
      },
      {
        name: "Pleksi Yüzeyli İnce Kasa Lightbox",
        description:
          "Klasik pleksi yüzeyli ince kasa. Uzun ömürlü; sabit kalacak görseller için. Görsel değişimi kumaşa göre zahmetlidir, buna karşılık yüzey daha sert ve çizilmeye dayanıklıdır.",
        image:
          "/images/services/variants/lightbox-tabela/pleksi-yuzeyli-ince-kasa-lightbox.jpg",
      },
      {
        name: "Çift Yüz Askılı Lightbox",
        description:
          "Tavandan sarkan, iki yüzü de aydınlık pano. AVM koridoru ve geniş iç mekânlarda kullanılır. Koridorda iki yönden gelen yayaya aynı anda hitap eder; tavan taşıma kapasitesinin önceden kontrolü gerekir.",
        image:
          "/images/services/variants/lightbox-tabela/cift-yuz-askili-lightbox.jpg",
      },
      {
        name: "Menü Panosu Lightbox",
        description:
          "Restoran ve kafeler için modüler menü panosu. Fiyat değiştiğinde yalnızca ilgili bölüm yenilenir. Panolar modüler olduğu için fiyat güncellemesinde tüm menü değil, yalnızca değişen bölüm yeniden basılır.",
        image:
          "/images/services/variants/lightbox-tabela/menu-panosu-lightbox.jpg",
      },
      {
        name: "Standart Ölçü Vitrin Lightboxı",
        description:
          "A0, A1 ve B1 gibi hazır poster ölçülerinde kasa. Ajans görsellerini olduğu gibi kabul eder. Hazır ölçü kullanıldığı için ajansın hazırladığı görsel ek düzenleme gerektirmeden takılır.",
        image:
          "/images/services/variants/lightbox-tabela/standart-olcu-vitrin-lightboxi.jpg",
      },
      {
        name: "Ayaklı Zemin Lightboxı",
        description:
          "Duvara sabitlenmeden ayakta duran pano. Fuar, karşılama ve showroom için taşınabilir. Duvara delik açılmadığı için kiralık alanlarda ve fuar standlarında kurulum ve söküm dakikalar sürer.",
        image:
          "/images/services/variants/lightbox-tabela/ayakli-zemin-lightboxi.jpg",
      },
      {
        name: "Dış Mekân IP54 Lightbox",
        description:
          "Nem ve yağmura karşı korumalı dış mekân versiyonu. Giriş cephesi ve pasaj girişlerinde kullanılır. İç mekân kasası dışarıda birkaç sezonda nem alır; dış mekân versiyonunda conta ve kasa buna göre üretilir.",
        image:
          "/images/services/variants/lightbox-tabela/dis-mekan-ip54-lightbox.jpg",
      },
    ],
    faqs: [
      {
        q: "Gergi kumaş mı pleksi mi seçmeliyim?",
        a: "Görselinizi sık değiştiriyorsanız gergi kumaş sistem doğru tercihtir; baskıyı kendiniz söküp takabilirsiniz. Görsel sabit kalacaksa ve pano temas riski olan bir yerdeyse pleksi yüzey daha dayanıklıdır.",
      },
      {
        q: "Lightbox tabela dış mekânda kullanılabilir mi?",
        a: "Evet, ancak standart iç mekân kasası uygun değildir. Dış mekân için conta sızdırmazlıklı, en az IP54 korumalı kasa ve dış mekân LED paneli kullanılır. Bunu keşifte netleştiriyoruz.",
      },
      {
        q: "Işık yüzeyde eşit dağılır mı?",
        a: "Edge-lit panel ve difüzör tabaka kullandığımız için yüzeyin tamamında eşit parlaklık elde edilir; LED noktaları veya bant izleri görünmez. Ucuz sistemlerdeki en yaygın sorun budur.",
      },
    ],
  },

  "cephe-giydirme": {
    name: "Cephe Giydirme",
    shortName: "Cephe Giydirme",
    tagline: "Binanın tamamını markalaştırın",
    summary:
      "Alüminyum kompozit panel ve mesh vinil ile bina cephelerinin kurumsal kimliğe uygun kaplanması.",
    answer:
      "Cephe giydirme, bir binanın dış yüzeyinin alüminyum kompozit panel, mesh vinil veya pleksi yüzeylerle kaplanarak marka kimliğine dönüştürülmesidir. Royal Reklam, Samsun'da keşif, statik değerlendirme, taşıyıcı konstrüksiyon ve montaj dâhil anahtar teslim cephe giydirme uygular. Ortalama uygulama süresi cephe büyüklüğüne göre 1–4 haftadır.",
    metaTitle:
      "Samsun Cephe Giydirme | Kompozit Panel Kaplama — Royal Reklam Samsun",
    metaDescription:
      "Samsun cephe giydirme: alüminyum kompozit panel, mesh vinil ve pleksi kaplama. Statik hesap, konstrüksiyon ve montaj dâhil. 0544 230 71 77",
    keywords: [
      "samsun cephe giydirme",
      "kompozit cephe kaplama samsun",
      "bina cephe giydirme",
      "mesh vinil cephe",
      "cephe kaplama samsun",
    ],
    intro: [
      "Cephe giydirme, tabelacılığın en büyük ölçekli işidir. Artık tek bir levhadan değil, binanın tamamından söz ediyoruz: eski ve yıpranmış bir cephe, doğru malzeme ve doğru konstrüksiyonla birkaç hafta içinde markanızın en güçlü reklam yüzeyine dönüşebilir.",
      "En yaygın çözüm alüminyum kompozit paneldir (ACP). İki alüminyum tabaka arasına polietilen çekirdek yerleştirilmiş bu malzeme hafiftir, kolay şekil alır ve boya dayanımı yüksektir. Yangın yönetmeliği kapsamına giren yapılarda A2 sınıfı mineral dolgulu panel kullanırız — bu, göz ardı edilmemesi gereken bir sorumluluktur.",
      "İnşaat hâlindeki binalarda ve geçici kampanyalarda mesh (delikli) vinil tercih edilir. Rüzgârı geçirdiği için taşıyıcıya binen yük düşer, buna karşın uzaktan tam kapalı bir görsel etkisi verir.",
    ],
    highlights: [
      {
        title: "Taşıyıcı konstrüksiyon",
        description:
          "Panel doğrudan duvara yapıştırılmaz; alüminyum karkas üzerine, ısıl genleşme payı bırakılarak monte edilir.",
      },
      {
        title: "A2 yangın sınıfı seçeneği",
        description:
          "Yönetmeliğe tabi yapılarda mineral dolgulu, zor yanıcı kompozit panel kullanımı.",
      },
      {
        title: "Mesh vinil alternatifi",
        description:
          "Şantiye ve geçici kampanyalarda rüzgâr yükünü azaltan delikli vinil uygulaması.",
      },
      {
        title: "Yüksekte çalışma yetkinliği",
        description:
          "Sepetli araç ve cephe iskelesiyle güvenli, sigortalı uygulama.",
      },
    ],
    specs: [
      { label: "Ana malzeme", value: "Alüminyum kompozit panel (ACP) 4 mm" },
      {
        label: "Yangın sınıfı",
        value: "B-s1 standart / A2-s1 mineral dolgulu",
      },
      { label: "Alternatif", value: "Mesh vinil, pleksiglas, HPL" },
      { label: "Taşıyıcı", value: "Alüminyum karkas, genleşme paylı" },
      { label: "Yüzey", value: "PVDF boyalı; mat, parlak veya ahşap desenli" },
      { label: "Renk", value: "RAL kataloğu veya kurumsal renk eşleştirme" },
      { label: "Uygulama", value: "Sepetli araç / cephe iskelesi" },
      { label: "Ömür", value: "PVDF kaplamada 15+ yıl renk dayanımı" },
    ],
    priceFactors: [
      "Cephe alanı (m²) ve geometrik karmaşıklık",
      "Panel sınıfı — A2 yangın dayanımlı panel standart panelden pahalıdır",
      "Taşıyıcı konstrüksiyon miktarı ve mevcut duvarın durumu",
      "Yükseklik ve erişim yöntemi (sepetli araç / iskele)",
      "Kesim detayları: pencere kenarları, köşe dönüşleri, denizlikler",
      "Sökülecek eski kaplama olup olmadığı",
    ],
    useCases: [
      "Mağaza ve showroom cepheleri",
      "İş merkezi ve plaza dış kaplamaları",
      "Otel ve konaklama tesisi yenilemeleri",
      "Fabrika ve depo cephe markalaması",
      "İnşaat hâlindeki binalarda mesh vinil kampanyaları",
    ],
    variants: [
      {
        name: "Alüminyum Kompozit (ACP) Cephe Kaplama",
        description:
          "Binanın tamamını kurumsal renge çeviren 4 mm kompozit panel kaplama. Cephe giydirmenin ana yöntemi. Eski ve yıpranmış cepheyi sökmeden üzerine uygulanır; bina kısa sürede bütünüyle yeni görünür.",
        image:
          "/images/services/variants/cephe-giydirme/aluminyum-kompozit-cephe-kaplama.jpg",
      },
      {
        name: "Mesh Vinil Cephe Brandası",
        description:
          "Rüzgârı geçiren delikli branda. İnşaat hâlindeki binalarda ve süreli kampanyalarda kullanılır. Kalıcı kaplamaya göre çok daha ucuzdur; inşaat süresince veya kampanya boyunca kullanılıp sökülür.",
        image:
          "/images/services/variants/cephe-giydirme/mesh-vinil-cephe-brandasi.jpg",
      },
      {
        name: "Işıklı Cephe",
        description:
          "Kaplamanın içine LED şerit veya profil gömülür; bina gece de kurumsal kimliğini gösterir. Gece cephenin tamamı marka rengine döner; tabela olmadan da binanın kime ait olduğu anlaşılır.",
        image: "/images/services/variants/cephe-giydirme/isikli-cephe.jpg",
      },
      {
        name: "Perfore (Delikli) Metal Cephe",
        description:
          "Desenli delikli metal panel. Hem gölgeleme sağlar hem cepheye doku katar. Güneş kırıcı işlevi de gördüğü için güney cephelerde iç mekân ısınmasını azaltır.",
        image:
          "/images/services/variants/cephe-giydirme/perfore-metal-cephe.jpg",
      },
      {
        name: "Ahşap Görünümlü Kompozit Cephe",
        description:
          "Ahşap desenli PVDF kaplama. Doğal görünüm verir ama ahşabın bakım yükünü getirmez. Doğal ahşabın aksine yılda bir vernik veya yağ bakımı istemez, rengini de yıllarca korur.",
        image:
          "/images/services/variants/cephe-giydirme/ahsap-gorunumlu-kompozit-cephe.jpg",
      },
      {
        name: "HPL / Kompakt Lamine Cephe",
        description:
          "Darbeye ve çizilmeye dayanıklı kompakt lamine panel. Yoğun kullanımlı girişler için. Darbeye dayanıklı olduğu için okul, hastane ve yoğun geçişli girişlerde kompozitten daha uzun ömürlüdür.",
        image:
          "/images/services/variants/cephe-giydirme/hpl-kompakt-lamine-cephe.jpg",
      },
      {
        name: "Vitrin ve Cam Folyo Giydirme",
        description:
          "Cephedeki cam yüzeylerin folyo ile kaplanması. One-way vision ile içeriden görüş açık kalır. Cam değiştirmeden vitrin kimliğini yeniler; kampanya bitince folyo sökülüp zemin ilk hâline döner.",
        image:
          "/images/services/variants/cephe-giydirme/vitrin-cam-folyo-giydirme.jpg",
      },
    ],
    faqs: [
      {
        q: "Cephe giydirme ne kadar sürer?",
        a: "Küçük bir mağaza cephesi 3–5 günde tamamlanır. Bir plaza veya çok katlı bina cephesi, konstrüksiyon ve iskele süresi dâhil 2–4 hafta sürebilir. Kesin süreyi keşif sonrası netleştiriyoruz.",
      },
      {
        q: "Kompozit panel yangına dayanıklı mı?",
        a: "Standart panel B-s1 sınıfıdır. Yüksek yapılar ve kamuya açık binalar gibi yönetmeliğe tabi yerlerde A2-s1 mineral dolgulu panel kullanılması gerekir. Hangi sınıfın gerektiğini proje bazında değerlendirip yazılı olarak bildiriyoruz.",
      },
      {
        q: "Mevcut cephenin sökülmesi gerekir mi?",
        a: "Her zaman değil. Zemin sağlamsa yeni karkas mevcut yüzeyin üzerine kurulabilir. Ancak kabarmış sıva, nemli veya taşıma gücü şüpheli yüzeylerde eski kaplamanın sökülmesi zorunludur.",
      },
    ],
  },

  "arac-giydirme": {
    name: "Araç Giydirme",
    shortName: "Araç Giydirme",
    tagline: "Hareket eden reklam panonuz",
    summary:
      "Kesim folyo ve tam kaplama uygulamalarıyla ticari araçlarınızı gezen bir reklam yüzeyine çevirin.",
    answer:
      "Araç giydirme, ticari araçların yüzeyinin kesim folyo veya dijital baskılı folyo ile kaplanarak reklam alanına dönüştürülmesidir. Royal Reklam, Samsun'da laminasyonlu döküm folyo ile kısmi ve tam araç kaplama uygular. Uygulama süresi araç tipine göre 1–3 gündür ve orijinal boyaya zarar vermez.",
    metaTitle: "Samsun Araç Giydirme ve Araç Kaplama — Royal Reklam Samsun",
    metaDescription:
      "Samsun araç giydirme: kesim folyo, tam kaplama, filo uygulamaları. Döküm folyo + laminasyon, orijinal boyaya zarar vermez. 0544 230 71 77",
    keywords: [
      "samsun araç giydirme",
      "araç kaplama samsun",
      "ticari araç reklam samsun",
      "araç folyo kaplama",
      "filo giydirme samsun",
    ],
    intro: [
      "Bir ticari araç, günde ortalama binlerce kişi tarafından görülür. Araç giydirme, tek seferlik bir yatırımla yıllarca çalışan, aylık kirası olmayan bir açık hava reklam alanı yaratır — üstelik hedef kitlenizin bulunduğu güzergâhlarda.",
      "Malzeme seçimi bu işin özüdür. Ucuz kalender folyo, kavisli yüzeylerde geri çeker, kısa sürede solar ve sökümde boya kaldırır. Biz döküm (cast) folyo kullanır ve üzerine UV koruyucu laminasyon uygularız; bu kombinasyon dış mekânda 5–7 yıl renk dayanımı sağlar ve söküm sırasında orijinal boya zarar görmez.",
      "Kısmi kaplamadan tam kaplamaya kadar her ölçekte çalışıyoruz. Filo işlerinde tüm araçlarda birebir aynı yerleşimi sağlamak için araç bazlı kalıp şablonu hazırlıyoruz — böylece on aracın onunda logo aynı noktada durur.",
    ],
    highlights: [
      {
        title: "Döküm folyo + laminasyon",
        description:
          "Kavisli yüzeylerde geri çekmeyen, 5–7 yıl UV dayanımlı profesyonel malzeme.",
      },
      {
        title: "Boyaya zarar vermez",
        description:
          "Doğru ısı ile sökülen folyo orijinal boyayı bırakmaz; hatta altındaki boyayı korur.",
      },
      {
        title: "Filo tutarlılığı",
        description:
          "Araç modeline özel kalıp şablonuyla tüm filoda birebir aynı yerleşim.",
      },
      {
        title: "Tozsuz uygulama ortamı",
        description:
          "Kapalı atölyede uygulama; folyo altında hava kabarcığı ve toz kalmaz.",
      },
    ],
    specs: [
      { label: "Folyo tipi", value: "Döküm (cast) folyo, 3M / Oracal sınıfı" },
      { label: "Koruma", value: "UV dayanımlı laminasyon" },
      { label: "Baskı", value: "Eko-solvent veya lateks dijital baskı" },
      { label: "Kapsam", value: "Kısmi kaplama, yarım kaplama, tam kaplama" },
      {
        label: "Cam uygulaması",
        value: "One-way vision (tek yön görüş) delikli folyo",
      },
      { label: "Dış mekân ömrü", value: "5 – 7 yıl" },
      { label: "Uygulama süresi", value: "1 – 3 gün (araç tipine göre)" },
      { label: "Söküm", value: "Isıtmalı söküm, boya hasarsız" },
    ],
    priceFactors: [
      "Araç tipi ve kaplanacak yüzey alanı",
      "Kısmi mi tam kaplama mı",
      "Folyo sınıfı — döküm folyo kalender folyodan pahalı, ancak kat kat uzun ömürlü",
      "Tasarımdaki renk sayısı ve baskı gerekip gerekmediği",
      "Kavis, çıkıntı ve derin girinti miktarı (işçilik süresini artırır)",
      "Filo adedi — çok araçlı işlerde birim maliyet düşer",
    ],
    useCases: [
      "Servis ve dağıtım araçları",
      "Kurumsal filo araçları",
      "Ticari minibüs, panelvan ve kamyonet",
      "Taksi ve yolcu taşıma araçları",
      "Şantiye ve teknik servis araçları",
    ],
    variants: [
      {
        name: "Tam Kaplama (Full Wrap)",
        description:
          "Aracın tüm gövdesi folyo ile kaplanır. Reklam etkisi en yüksek; orijinal boya folyonun altında korunur. Folyo aynı zamanda orijinal boyayı taş ve çizikten korur; söküldüğünde altındaki boya ilk günkü gibi kalır.",
        image: "/images/services/variants/arac-giydirme/tam-kaplama.jpg",
      },
      {
        name: "Yarım Kaplama (Half Wrap)",
        description:
          "Aracın alt yarısı veya arka bölümü kaplanır. Tam kaplamanın görünürlüğüne yakın, maliyeti belirgin düşük. Aracın en çok görülen alt yarısı kaplandığı için görünürlük kaybı sınırlı, maliyet farkı ise belirgindir.",
        image: "/images/services/variants/arac-giydirme/yarim-kaplama.jpg",
      },
      {
        name: "Kesim Folyo Uygulama",
        description:
          "Yalnızca logo, telefon ve web adresi kesilerek yapıştırılır. En ekonomik ve en hızlı seçenek. Tek araçlı işletmeler ve bütçesi dar filolar için giriş seviyesidir; gerektiğinde sonradan tam kaplamaya geçilebilir.",
        image:
          "/images/services/variants/arac-giydirme/kesim-folyo-uygulama.jpg",
      },
      {
        name: "One-Way Vision Cam Uygulaması",
        description:
          "Camlara delikli folyo uygulanır; dışarıdan görsel okunur, içeriden görüş açık kalır. Cam yüzeyi de reklam alanına katar; sürücünün görüşünü kapatmadığı için arka ve yan camlarda kullanılabilir.",
        image:
          "/images/services/variants/arac-giydirme/one-way-vision-cam-uygulamasi.jpg",
      },
      {
        name: "Renk Değişimi Kaplama",
        description:
          "Mat, saten veya kromatik folyo ile aracın rengi değiştirilir. Reklam değil, görünüm amaçlıdır. Aracın ikinci el değerini boyamaya göre korur; kiralık ve leasing araçlarda sözleşme sonunda sökülür.",
        image:
          "/images/services/variants/arac-giydirme/renk-degisimi-kaplama.jpg",
      },
      {
        name: "Filo Standart Giydirme",
        description:
          "Çok sayıda araçta birebir aynı uygulama. Şablon bir kez çıkarılır, tüm filoda tekrarlanır. Şablon bir kez çıkarıldığı için sonradan filoya katılan araç da aynı gün aynı standartta kaplanır.",
        image:
          "/images/services/variants/arac-giydirme/filo-standart-giydirme.jpg",
      },
      {
        name: "Şerit ve Bant Uygulaması",
        description:
          "Ticari araçların yanına kurumsal renkte şerit. Sade ama filoyu tek elden çıkmış gösterir. Reklam yükü olmadan kurumsal bir görünüm verir; servis ve yönetici araçlarında sık tercih edilir.",
        image:
          "/images/services/variants/arac-giydirme/serit-bant-uygulamasi.jpg",
      },
      {
        name: "Manyetik Araç Panosu",
        description:
          "Takılıp çıkarılabilen manyetik pano. Aracı özel kullanımda sade bırakmak isteyenler için. Mesai dışında çıkarıldığı için araç özel kullanımda sade kalır; aynı pano birden çok araçta kullanılabilir.",
        image:
          "/images/services/variants/arac-giydirme/manyetik-arac-panosu.jpg",
      },
    ],
    faqs: [
      {
        q: "Araç giydirme aracın boyasına zarar verir mi?",
        a: "Hayır. Doğru folyo ve doğru söküm tekniğiyle orijinal boya zarar görmez. Aksine folyo, altında kalan boyayı UV ve taş sıçramasına karşı korur. Zarar riski, ucuz kalender folyo ve zorlayarak söküm yapıldığında ortaya çıkar.",
      },
      {
        q: "Araç giydirme için ruhsat değişikliği gerekir mi?",
        a: "Ticari araçlarda reklam uygulaması için aracın rengini bütünüyle değiştiren tam kaplamalarda trafik tescil kaydının güncellenmesi gerekebilir. Kısmi ve yazı ağırlıklı uygulamalarda genellikle gerekmez.",
      },
      {
        q: "Kaplanan araç yıkanabilir mi?",
        a: "Evet. Uygulamadan 48 saat sonra araç yıkanabilir. Fırçalı yıkama yerine basınçlı su veya elde yıkama önerilir; basınçlı suyu folyo kenarlarına çok yakın mesafeden tutmamak gerekir.",
      },
      {
        q: "Folyo ne kadar dayanır?",
        a: "Döküm folyo ve laminasyon kombinasyonu dış mekânda 5–7 yıl renk dayanımı verir. Aracın sürekli güneşte mi yoksa kapalı otoparkta mı durduğu bu süreyi doğrudan etkiler.",
      },
    ],
  },

  "dijital-baski": {
    name: "Dijital Baskı",
    shortName: "Dijital Baskı",
    tagline: "Geniş format, canlı renk",
    summary:
      "Vinil, branda, mesh, folyo ve one-way vision üzerine yüksek çözünürlüklü geniş format baskı.",
    answer:
      "Dijital baskı, vinil, branda, mesh ve folyo gibi geniş format malzemelere doğrudan görsel basılmasıdır. Royal Reklam, Samsun'da eko-solvent ve UV baskı teknolojisiyle afiş, branda, vitrin folyosu ve cephe görseli üretir. Kurumsal renkler Pantone eşleştirmesiyle korunur; standart işler 1–3 iş gününde teslim edilir.",
    metaTitle:
      "Samsun Dijital Baskı | Branda, Vinil, Folyo — Royal Reklam Samsun",
    metaDescription:
      "Samsun dijital baskı: branda, vinil, mesh, one-way vision ve folyo baskı. Pantone renk eşleştirme, 1–3 iş günü teslim. 0544 230 71 77",
    keywords: [
      "samsun dijital baskı",
      "branda baskı samsun",
      "vinil baskı samsun",
      "afiş baskı samsun",
      "geniş format baskı samsun",
      "one way vision samsun",
    ],
    intro: [
      "Dijital baskı, tabelacılığın görünmeyen ama her işin içine giren temel altyapısıdır. Bir kutu harfin yüzeyindeki renk de, bir aracın üzerindeki görsel de, vitrindeki kampanya afişi de aynı baskı disiplininden geçer.",
      "Renk tutarlılığı burada belirleyicidir. Kurumsal kimliğinizdeki kırmızı, tabelada, brandada ve araçta aynı kırmızı olmalıdır. Bunu sağlamak için ICC profilleriyle kalibre edilmiş baskı ve Pantone referanslı renk eşleştirmesi kullanıyoruz; büyük işlerde baskı öncesi renk provası veriyoruz.",
      "Malzeme seçimini kullanım yerine göre yapıyoruz: kısa ömürlü bir etkinlik afişiyle üç yıl cephede kalacak bir branda aynı malzeme olamaz. Yanlış malzeme, ilk kışta solmuş veya yırtılmış bir baskı demektir.",
    ],
    highlights: [
      {
        title: "Pantone renk eşleştirme",
        description:
          "Kurumsal renginiz her malzemede ve her işte aynı tonda çıkar.",
      },
      {
        title: "Yüksek çözünürlük",
        description:
          "Yakından okunacak işlerde 1440 dpi'a kadar; uzaktan görülecek cephede optimize çözünürlük.",
      },
      {
        title: "Doğru malzeme seçimi",
        description:
          "Kullanım süresine ve mekâna göre vinil, branda, mesh veya folyo önerisi.",
      },
      {
        title: "Kesim ve konfeksiyon",
        description:
          "Kenar kaynağı, kuşgözü ve ebat kesimi baskıyla birlikte tek yerde tamamlanır.",
      },
    ],
    specs: [
      { label: "Baskı teknolojisi", value: "Eko-solvent, lateks ve UV" },
      {
        label: "Malzemeler",
        value: "Vinil, branda, mesh, folyo, kanvas, one-way vision",
      },
      {
        label: "Çözünürlük",
        value: "720 – 1440 dpi (kullanım mesafesine göre)",
      },
      { label: "Renk yönetimi", value: "ICC profilli, Pantone referanslı" },
      { label: "Laminasyon", value: "Mat / parlak, UV korumalı (opsiyonel)" },
      { label: "Konfeksiyon", value: "Kenar kaynağı, kuşgözü, kanal dikişi" },
      { label: "Kesim", value: "Kontur kesim (dieline) desteği" },
      { label: "Teslim", value: "Standart işlerde 1 – 3 iş günü" },
    ],
    priceFactors: [
      "Baskı alanı (m²)",
      "Malzeme cinsi ve gramajı",
      "Laminasyon eklenip eklenmediği",
      "Konfeksiyon işlemleri (kaynak, kuşgözü, kanal)",
      "Kontur kesim gerektiren özel formlar",
      "Adet — yüksek metrajda birim fiyat belirgin şekilde düşer",
    ],
    useCases: [
      "Cephe brandaları ve kampanya afişleri",
      "Vitrin folyoları ve one-way vision cam uygulamaları",
      "Fuar standı ve roll-up görselleri",
      "Şantiye çevresi mesh perde baskıları",
      "İç mekân duvar kaplama ve dekoratif baskılar",
    ],
    variants: [
      {
        name: "Cephe Brandası",
        description:
          "Vinil veya branda üzerine geniş format baskı. Kampanya ve açılış duyuruları için en hızlı çözüm. Açılış, indirim ve sezon kampanyalarında birkaç gün içinde hazırlanır; iş bitince sökülüp saklanabilir.",
        image: "/images/services/variants/dijital-baski/cephe-brandasi.jpg",
      },
      {
        name: "Mesh (Delikli) Branda",
        description:
          "Rüzgârı geçirdiği için yüksek katlarda ve açık alanlarda güvenli. İskele ve cephe perdesi uygulamalarında şart. Rüzgârı geçirdiği için taşıyıcıya binen yük düşer; yüksek katlarda düz brandaya göre çok daha güvenlidir.",
        image:
          "/images/services/variants/dijital-baski/mesh-delikli-branda.jpg",
      },
      {
        name: "One-Way Vision Cam Folyosu",
        description:
          "Delikli yapısı sayesinde dışarıdan görsel, içeriden manzara. Vitrin ve araç camlarında kullanılır. Vitrinin tamamını reklam alanına çevirirken içeriden dışarısı görülmeye devam eder; mağaza karanlık hissettirmez.",
        image:
          "/images/services/variants/dijital-baski/one-way-vision-cam-folyosu.jpg",
      },
      {
        name: "Backlit Film Baskı",
        description:
          "Arkadan aydınlatılan kasalar için ışık geçirgen film baskı. Lightbox ve menü panolarında renkler yanınca canlanır. Normal baskı ışıkta soluk kalır; backlit film yoğunluğu arkadan aydınlatmaya göre ayarlanarak basılır.",
        image: "/images/services/variants/dijital-baski/backlit-film-baski.jpg",
      },
      {
        name: "Duvar Kaplama ve Duvar Kâğıdı Baskısı",
        description:
          "İç mekân duvarlarına tam alan baskı. Ofis, mağaza ve restoranlarda mekânı markaya çevirir. Boyayla elde edilemeyen fotoğraf ve desenleri duvara taşır; uygulama boya gibi kuruma süresi istemez.",
        image:
          "/images/services/variants/dijital-baski/duvar-kaplama-ve-duvar-kagidi-baskisi.jpg",
      },
      {
        name: "Zemin Folyosu",
        description:
          "Kaymaz laminasyonlu zemin baskısı. Yönlendirme ve kampanya mesajları için güvenli yüzey. Kaymaz laminasyon güvenlik için şarttır; laminasyonsuz baskı ıslanınca kayma riski yaratır.",
        image: "/images/services/variants/dijital-baski/zemin-folyosu.jpg",
      },
      {
        name: "Forex / Dekota Üzeri UV Baskı",
        description:
          "Sert levha üzerine doğrudan UV baskı. Çerçeve gerekmeden asılabilen, sert ve düz pano. Levhanın kendisi taşıyıcı olduğu için ayrı çerçeve gerekmez; doğrudan asılır veya ayağa oturtulur.",
        image:
          "/images/services/variants/dijital-baski/forex-dekota-uzeri-uv-baski.jpg",
      },
      {
        name: "Kanvas ve Tablo Baskı",
        description:
          "Kanvas üzerine baskı ve şasiye germe. Ofis, otel ve restoran duvarları için. Cam ve çerçeve gerektirmediği için hafiftir; otel odası ve ofis gibi çok sayıda duvara ekonomik çözümdür.",
        image:
          "/images/services/variants/dijital-baski/kanvas-ve-tablo-baski.jpg",
      },
      {
        name: "Roll-up, X-Banner ve Afiş Baskı",
        description:
          "Fuar ve etkinlik için taşınabilir tanıtım üniteleri. Dakikalar içinde kurulur, kutusunda taşınır. Kendi çantasında taşınır, kurulum dakikalar sürer; fuar sonrası aynı ünite tekrar tekrar kullanılır.",
        image:
          "/images/services/variants/dijital-baski/roll-up-x-banner-afis-baski.jpg",
      },
    ],
    faqs: [
      {
        q: "Baskı dosyamı hangi formatta göndermeliyim?",
        a: "Tercihen vektörel PDF, AI veya EPS. Fotoğraf içeren işlerde gerçek boyutta en az 100–150 dpi çözünürlük yeterlidir. Dosyanız yoksa tasarımı biz hazırlayabiliriz.",
      },
      {
        q: "One-way vision nedir?",
        a: "Delikli bir folyodur: dışarıdan bakıldığında görsel tam görünür, içeriden bakıldığında dışarısı rahatça izlenir. Mağaza vitrinlerinde ve araç camlarında görüşü kapatmadan reklam yapmayı sağlar.",
      },
      {
        q: "Branda dış mekânda ne kadar dayanır?",
        a: "Kaliteli bir branda üzerine UV laminasyon uygulandığında dış mekânda 2–4 yıl renk dayanımı verir. Laminasyonsuz ve düşük gramajlı brandalarda bu süre bir sezona kadar iner.",
      },
    ],
  },

  "kurumsal-kimlik": {
    name: "Kurumsal Kimlik Çalışmaları",
    shortName: "Kurumsal Kimlik",
    tagline: "Markanın tutarlı dili",
    summary:
      "Logo, renk, tipografi ve uygulama kurallarını içeren; tabeladan araca tüm yüzeyleri kapsayan kimlik sistemi.",
    answer:
      "Kurumsal kimlik çalışması, bir markanın logo, renk paleti, tipografi ve uygulama kurallarını tanımlayan sistemin oluşturulmasıdır. Royal Reklam, Samsun'da art direktör İsak Bahar yönetiminde logo tasarımı, kimlik kılavuzu ve tüm basılı/uygulamalı materyalleri üretir. Tabela, araç ve cephe uygulamaları aynı sistemden beslenir.",
    metaTitle: "Samsun Kurumsal Kimlik ve Logo Tasarımı — Royal Reklam Samsun",
    metaDescription:
      "Samsun kurumsal kimlik: logo tasarımı, renk ve tipografi sistemi, kimlik kılavuzu, kartvizit ve tüm uygulama materyalleri. 0544 230 71 77",
    keywords: [
      "samsun kurumsal kimlik",
      "logo tasarım samsun",
      "kurumsal kimlik tasarımı samsun",
      "marka kimliği samsun",
      "kartvizit tasarım samsun",
    ],
    intro: [
      "Kurumsal kimlik bir logo dosyası değildir. Logo, sistemin yalnızca en görünür parçasıdır. Asıl değer; o logonun hangi renklerle, hangi boşluk oranlarıyla, hangi yazı karakteriyle ve hangi yüzeyde nasıl kullanılacağının kural haline getirilmesindedir.",
      "Bu iş bizde bir avantajla yürüyor: kimliği tasarlayan ekiple onu cepheye, araca ve tabelaya uygulayan ekip aynı. Bu yüzden ekranda güzel görünüp uygulamada tutmayan tasarımlar üretmiyoruz. Bir logo çizilirken kutu harf olarak kesilebilirliği, tek renge düştüğünde okunurluğu ve küçük ölçekteki davranışı baştan hesaba katılır.",
      "Teslim ettiğimiz kimlik kılavuzu; logo kullanım kuralları, koruma alanı, renk kodları (Pantone / CMYK / RGB / RAL), tipografi hiyerarşisi ve yanlış kullanım örneklerini içerir. Kılavuz, ileride başka bir tedarikçiyle çalışsanız bile markanızın tutarlılığını korur.",
    ],
    highlights: [
      {
        title: "Uygulanabilirlik odaklı tasarım",
        description:
          "Logo, kutu harf kesimi ve tek renk kullanım düşünülerek çizilir — ekranda değil cephede test edilir.",
      },
      {
        title: "Eksiksiz renk tanımı",
        description:
          "Pantone, CMYK, RGB ve RAL karşılıkları verilir; tabela boyası ile kartvizit aynı tonu tutar.",
      },
      {
        title: "Kimlik kılavuzu",
        description:
          "Kullanım kuralları ve yanlış kullanım örnekleriyle marka disiplini kalıcı hale gelir.",
      },
      {
        title: "Art direktör kontrolü",
        description:
          "Tüm süreç İsak Bahar'ın direktörlüğünde yürür; tek elden estetik tutarlılık sağlanır.",
      },
    ],
    specs: [
      { label: "Logo teslimi", value: "AI, EPS, SVG, PDF, PNG (şeffaf)" },
      { label: "Renk sistemi", value: "Pantone, CMYK, RGB, RAL karşılıkları" },
      {
        label: "Tipografi",
        value: "Ana ve yardımcı font ailesi, hiyerarşi tanımı",
      },
      {
        label: "Kılavuz",
        value: "PDF kimlik kılavuzu (kullanım + yanlış kullanım)",
      },
      { label: "Basılı set", value: "Kartvizit, antetli kâğıt, zarf, dosya" },
      {
        label: "Dijital set",
        value: "Sosyal medya şablonları, e-posta imzası",
      },
      {
        label: "Uygulama",
        value: "Tabela, araç, cephe, personel kıyafeti görselleri",
      },
      { label: "Revizyon", value: "Konsept başına 2 tur revizyon" },
    ],
    priceFactors: [
      "Kapsam: yalnız logo mu, tam kimlik sistemi mi",
      "Sunulacak konsept sayısı",
      "Kimlik kılavuzunun detay seviyesi",
      "Basılı ve dijital materyal kalemlerinin sayısı",
      "Mevcut logonun yenilenmesi mi sıfırdan tasarım mı",
      "Uygulama görselleştirmesi (mockup) talebi",
    ],
    useCases: [
      "Yeni açılan mağaza ve işletmeler",
      "Marka yenileme (rebranding) süreçleri",
      "Franchise ve çok şubeli işletmeler",
      "Kurumsallaşma sürecindeki aile şirketleri",
      "Tabela yenilerken kimliğini de güncellemek isteyenler",
    ],
    variants: [
      {
        name: "Logo Tasarımı ve Yenileme",
        description:
          "Sıfırdan logo tasarımı veya mevcut logonun uygulanabilir hâle getirilmesi. Tabelada da ekranda da çalışacak biçimde. Tabelaya, araca ve kartvizite aynı anda uyması gerektiği için tasarım en küçük ve en büyük kullanımda birlikte denenir.",
        image:
          "/images/services/variants/kurumsal-kimlik/logo-tasarimi-ve-yenileme.jpg",
      },
      {
        name: "Kurumsal Kimlik Kılavuzu",
        description:
          "Renk, tipografi, boşluk ve yanlış kullanım kurallarını tanımlayan PDF kılavuz. Her tedarikçi aynı standardı uygular. Farklı tedarikçilerle çalışan markalarda tutarlılığı sağlayan tek belge budur; matbaa da tabelacı da aynı dosyaya bakar.",
        image:
          "/images/services/variants/kurumsal-kimlik/kurumsal-kimlik-kilavuzu.jpg",
      },
      {
        name: "Basılı Evrak Seti",
        description:
          "Kartvizit, antetli kâğıt, zarf ve dosya tasarımı. Kurumsal izlenimin ilk fiziksel temas noktası. Müşterinin markayla ilk fiziksel teması genelde kartvizittir; kâğıt cinsi ve baskı kalitesi algıyı doğrudan etkiler.",
        image:
          "/images/services/variants/kurumsal-kimlik/basili-evrak-seti.jpg",
      },
      {
        name: "Tabela Uygulama Standardı",
        description:
          "Logonun cephede hangi ölçü, renk ve malzemeyle kullanılacağını belirleyen kurallar. Şube açılışlarında tabelanın ölçüsü ve rengi tartışma konusu olmaktan çıkar; karar önceden verilmiş olur.",
        image:
          "/images/services/variants/kurumsal-kimlik/tabela-uygulama-standardi.jpg",
      },
      {
        name: "Araç Giydirme Kimlik Şablonu",
        description:
          "Araç tiplerine göre hazırlanmış kaplama şablonları. Filoda her araç aynı görünür. Araç tipi değişse bile yerleşim mantığı aynı kalır; filo dağınık görünmez.",
        image:
          "/images/services/variants/kurumsal-kimlik/arac-giydirme-kimlik-sablonu.jpg",
      },
      {
        name: "Personel Kıyafeti ve Yaka Kartı Tasarımı",
        description:
          "Logo ve renklerin kıyafet, önlük ve kimlik kartına uyarlanması. Sahada çalışan ekip markanın yürüyen temsilcisidir; kıyafet ve kart aynı kimlik diliyle hazırlanır.",
        image:
          "/images/services/variants/kurumsal-kimlik/personel-kiyafeti-yaka-karti-tasarimi.jpg",
      },
      {
        name: "Sosyal Medya Şablon Seti",
        description:
          "Paylaşım, hikâye ve kapak görselleri için düzenlenebilir şablonlar. Her paylaşımda sıfırdan tasarım yapılmaz; şablon üzerinden içerik değiştirilerek düzen korunur.",
        image:
          "/images/services/variants/kurumsal-kimlik/sosyal-medya-sablon-seti.jpg",
      },
      {
        name: "Menü, Katalog ve Broşür Tasarımı",
        description:
          "Ürün ve hizmetleri tanıtan basılı materyallerin kimliğe uygun tasarımı. Ürün sıralaması ve tipografi, satın alma kararını fiyat kadar etkiler; düzen buna göre kurulur.",
        image:
          "/images/services/variants/kurumsal-kimlik/menu-katalog-brosur-tasarimi.jpg",
      },
      {
        name: "Franchise Uygulama Standartları",
        description:
          "Çok şubeli markalar için şube açılışında uygulanacak eksiksiz kimlik paketi. Yeni şube açan bayi neyi nasıl yaptıracağını tek dosyadan görür; merkeze her seferinde sormak gerekmez.",
        image:
          "/images/services/variants/kurumsal-kimlik/franchise-uygulama-standartlari.jpg",
      },
    ],
    faqs: [
      {
        q: "Sadece logo tasarımı yaptırabilir miyim?",
        a: "Evet. Yalnız logo çalışması da yapıyoruz. Ancak logonun tabelada, araçta ve basılı işlerde tutarlı çıkması için en azından renk ve tipografi tanımlarını içeren temel bir kılavuz öneriyoruz.",
      },
      {
        q: "Mevcut logomu koruyup kimlik oluşturabilir misiniz?",
        a: "Elbette. Mevcut logo üzerinden renk, tipografi ve uygulama sistemini kurabilir; gerekiyorsa logoyu yeniden çizerek (vektörel temizlik) baskı ve kesim için uygun hale getirebiliriz.",
      },
      {
        q: "Tasarım dosyalarının telif hakkı kimde olur?",
        a: "Teslim ve ödeme tamamlandığında tasarımın kullanım hakları size geçer. Kaynak dosyaları (AI/EPS) da teslim edilir; ileride başka bir ajansla çalışmanız durumunda elinizde eksik bir şey kalmaz.",
      },
    ],
  },

  "etiket-sticker": {
    name: "Etiket & Sticker",
    shortName: "Etiket & Sticker",
    tagline: "Küçük yüzey, büyük detay",
    summary:
      "Ürün etiketi, cam sticker, zemin etiketi ve promosyon çıkartmalarında kontur kesimli üretim.",
    answer:
      "Etiket ve sticker üretimi, folyo veya kuşe malzemeye baskı yapılıp kontur kesimle şekil verilmesidir. Royal Reklam, Samsun'da ürün etiketi, cam ve kapı stickerı, zemin etiketi ve promosyon çıkartması üretir. Küçük adetli işler dâhil, standart siparişler 1–3 iş gününde teslim edilir.",
    metaTitle:
      "Samsun Etiket ve Sticker Baskı | Kontur Kesim — Royal Reklam Samsun",
    metaDescription:
      "Samsun etiket ve sticker baskı: ürün etiketi, cam sticker, zemin etiketi, kontur kesim. Küçük adetli işler dâhil, 1–3 gün teslim. 0544 230 71 77",
    keywords: [
      "samsun sticker baskı",
      "etiket baskı samsun",
      "kontur kesim sticker",
      "cam sticker samsun",
      "ürün etiketi samsun",
    ],
    intro: [
      "Etiket ve sticker, bütçesi en küçük ama temas noktası en yoğun reklam ürünüdür. Ürün ambalajındaki bir etiket, kapıdaki çalışma saati stickerı ya da zemindeki yönlendirme çıkartması, müşteriyle doğrudan temas eden yüzeylerdir.",
      "Kontur (dieline) kesim ile herhangi bir forma üretim yapıyoruz — kare kalıba mahkûm değilsiniz. Logo formunda, dalgalı kenarlı ya da iç boşluklu kesimler mümkündür.",
      "Kullanım yerine göre malzeme değişir: buzdolabı ürünleri için neme dayanıklı folyo, cam yüzeyler için statik tutunan veya şeffaf zeminli folyo, zemin için üzerine basılabilen kaymaz laminasyonlu malzeme kullanılır.",
    ],
    highlights: [
      {
        title: "Kontur kesim",
        description:
          "Logo formunda veya özel şekilli kesim; kare kalıp zorunluluğu yok.",
      },
      {
        title: "Küçük adet mümkün",
        description:
          "Dijital üretim sayesinde 50 adetlik işler de ekonomik biçimde basılabilir.",
      },
      {
        title: "Kullanıma özel malzeme",
        description:
          "Neme dayanıklı, şeffaf, statik tutunan veya zemine uygun kaymaz seçenekler.",
      },
      {
        title: "Söküldüğünde iz bırakmaz",
        description:
          "Cam ve vitrin uygulamalarında çıkarılabilir yapıştırıcılı folyo tercih edilir.",
      },
    ],
    specs: [
      {
        label: "Malzemeler",
        value: "PVC folyo, şeffaf folyo, kuşe etiket, zemin folyosu",
      },
      { label: "Kesim", value: "Kontur (dieline) kesim, tabaka veya rulo" },
      { label: "Baskı", value: "Eko-solvent / UV, CMYK + beyaz mürekkep" },
      { label: "Laminasyon", value: "Mat, parlak veya kaymaz (zemin için)" },
      { label: "Yapıştırıcı", value: "Kalıcı veya çıkarılabilir (removable)" },
      { label: "Minimum adet", value: "50 adetten itibaren" },
      { label: "Dış mekân ömrü", value: "2 – 5 yıl (malzemeye göre)" },
      { label: "Teslim", value: "1 – 3 iş günü" },
    ],
    priceFactors: [
      "Etiket ölçüsü ve toplam adet",
      "Malzeme cinsi (şeffaf ve özel folyolar daha maliyetli)",
      "Kontur kesim karmaşıklığı",
      "Laminasyon ve özel yüzey işlemleri",
      "Beyaz mürekkep gerekip gerekmediği (şeffaf zeminde)",
      "Rulo sarım veya tekli kesim tercihi",
    ],
    useCases: [
      "Ürün ve ambalaj etiketleri",
      "Vitrin, kapı ve cam uyarı stickerları",
      "Zemin yönlendirme ve kampanya çıkartmaları",
      "Promosyon ve etkinlik stickerları",
      "Demirbaş ve envanter etiketleri",
    ],
    variants: [
      {
        name: "Ürün ve Ambalaj Etiketi",
        description:
          "Rulo veya tabaka hâlinde ürün etiketi. Gıda, kozmetik ve üretim ambalajlarında kullanılır. Rulo teslim otomatik etiketleme makineleri için, tabaka teslim elle uygulama için uygundur.",
        image:
          "/images/services/variants/etiket-sticker/urun-ve-ambalaj-etiketi.jpg",
      },
      {
        name: "Şeffaf Cam Stickerı",
        description:
          "Zemini görünmeyen şeffaf folyo. Vitrin ve kapı camlarında yazı camın üstünde duruyormuş gibi görünür. Zemin rengi olmadığı için cam yüzeyde yazı havada duruyormuş gibi görünür; vitrinin ışığını kesmez.",
        image:
          "/images/services/variants/etiket-sticker/seffaf-cam-stickeri.jpg",
      },
      {
        name: "Kesim Folyo Yazı ve Logo",
        description:
          "Zemin olmadan, yalnızca harflerin kesilip yapıştırılması. Cam ve düz yüzeylerde en temiz görünüm. Cam, kapı ve düz duvarda en temiz sonucu verir; ince detay ve küçük punto kesime uygun değildir.",
        image:
          "/images/services/variants/etiket-sticker/kesim-folyo-yazi-ve-logo.jpg",
      },
      {
        name: "Buzlu Cam (Kumlama Görünümlü) Folyo",
        description:
          "Kumlanmış cam etkisi veren folyo. Ofis bölmelerinde ışığı geçirir ama görüşü keser. Gerçek kumlamanın aksine sökülebilir; bölme düzeni değiştiğinde cam değiştirmek gerekmez.",
        image: "/images/services/variants/etiket-sticker/buzlu-cam-folyo.jpg",
      },
      {
        name: "Zemin Etiketi",
        description:
          "Kaymaz laminasyonlu, üzerine basılabilen etiket. Yönlendirme ve kampanya mesajları için. Üzerine basılan bir yüzey olduğu için laminasyon ve yapıştırıcı seçimi normal etiketten farklıdır.",
        image: "/images/services/variants/etiket-sticker/zemin-etiketi.jpg",
      },
      {
        name: "Doming (Kabartma Reçineli) Etiket",
        description:
          "Üzerine şeffaf reçine dökülen kabartma etiket. Cihaz ve ürün üstünde yüksek algı yaratır. Reçine yüzeyi çizilmeye ve neme karşı korur; cihaz ve makine etiketlerinde uzun ömürlüdür.",
        image:
          "/images/services/variants/etiket-sticker/doming-kabartma-recineli-etiket.jpg",
      },
      {
        name: "Güvenlik / Void Etiket",
        description:
          "Söküldüğünde iz bırakan, tekrar yapıştırılamayan etiket. Garanti ve mühür uygulamalarında kullanılır. Garanti mührü olarak kullanıldığında açılıp açılmadığı çıplak gözle anlaşılır.",
        image:
          "/images/services/variants/etiket-sticker/guvenlik-void-etiket.jpg",
      },
      {
        name: "Demirbaş ve Barkod Etiketi",
        description:
          "Envanter takibi için numaralı veya barkodlu dayanıklı etiket. Sayım ve zimmet takibini kolaylaştırır; numaralar sıralı üretilerek teslim edilir.",
        image:
          "/images/services/variants/etiket-sticker/demirbas-ve-barkod-etiketi.jpg",
      },
      {
        name: "Promosyon ve Etkinlik Stickerı",
        description:
          "Kampanya, açılış ve etkinlikler için kontur kesimli çıkartmalar. Küçük adette bile üretilebildiği için etkinliğe özel tasarımlar ekonomik kalır.",
        image:
          "/images/services/variants/etiket-sticker/promosyon-ve-etkinlik-stickeri.jpg",
      },
    ],
    faqs: [
      {
        q: "Kaç adetten itibaren sipariş verebilirim?",
        a: "Dijital üretim yaptığımız için 50 adetlik siparişler bile ekonomiktir. Adet arttıkça birim fiyat belirgin şekilde düşer.",
      },
      {
        q: "Sticker camdan sökülünce iz bırakır mı?",
        a: "Çıkarılabilir (removable) yapıştırıcılı folyo kullanıldığında iz bırakmaz. Kullanım amacınızı söylerseniz doğru yapıştırıcı sınıfını biz seçeriz.",
      },
      {
        q: "Şeffaf zeminli sticker basılabiliyor mu?",
        a: "Evet. Şeffaf folyo üzerine beyaz mürekkep alt basımıyla renkler soluk kalmadan çıkar. Beyaz basım olmadan şeffaf üzerine yapılan baskılarda renkler zeminle karışır.",
      },
    ],
  },

  "imalat-tasarim-montaj": {
    name: "İmalat, Tasarım ve Montaj",
    shortName: "İmalat & Montaj",
    tagline: "Türkiye geneli anahtar teslim",
    summary:
      "Keşiften tasarıma, kendi atölyemizdeki imalattan sahadaki montaja kadar tek elden ve tek sorumlulukla.",
    answer:
      "Royal Reklam; keşif, tasarım, imalat ve montaj aşamalarının tamamını kendi ekibiyle yürüten bir açık hava reklam firmasıdır. Samsun merkezli atölyemizde üretilen tabela ve cephe uygulamaları, Türkiye'nin her iline montaj ekibimizle sevk edilir. Tek sözleşme ve tek muhatap sunulur; sorumluluk taşerona dağılmaz.",
    metaTitle: "Tabela İmalatı, Tasarım ve Montaj — Royal Reklam Samsun",
    metaDescription:
      "Samsun merkezli tabela imalatı, tasarım ve montaj hizmeti. Kendi atölyemizde üretim, Türkiye geneli montaj ekibi, tek elden sorumluluk. 0544 230 71 77",
    keywords: [
      "tabela imalatı samsun",
      "tabela montajı samsun",
      "türkiye geneli tabela montaj",
      "anahtar teslim tabela",
      "reklam imalat samsun",
    ],
    intro: [
      "Tabela işinde en sık yaşanan sorun, sorumluluğun dağılmasıdır: tasarımı bir yerden, imalatı başka bir yerden, montajı üçüncü bir ekipten aldığınızda bir aksilik çıktığında kimse üstlenmez. Royal Reklam bu zinciri tek çatı altında topluyor.",
      "Keşifle başlıyoruz — cepheyi yerinde ölçüyor, elektrik altyapısını, montaj erişimini ve varsa belediye/AVM kısıtlarını not ediyoruz. Tasarım onayından sonra imalat kendi atölyemizde yapılıyor; bu, teslim tarihini bir taşerona bağlı kalmadan taahhüt edebilmemizi sağlıyor.",
      "Montaj ekibimiz Samsun dışına da çıkıyor. Türkiye genelinde şubeleşen markalarla çalışırken tüm şubelerde birebir aynı standardı tutturmak, en çok değer verilen özelliğimiz oluyor.",
    ],
    highlights: [
      {
        title: "Tek muhatap",
        description:
          "Tasarım, imalat ve montaj tek sözleşmede — sorumluluk dağılmaz.",
      },
      {
        title: "Kendi atölyemiz",
        description:
          "Üretim dışarıya verilmediği için teslim tarihi taahhüt edilebilir ve kalite kontrol edilebilir.",
      },
      {
        title: "Türkiye geneli montaj",
        description:
          "Şubeleşen markalar için tüm illerde aynı standartta uygulama.",
      },
      {
        title: "Keşif ve izin desteği",
        description:
          "Yerinde ölçü, teknik çizim ve belediye/AVM başvuru dosyası hazırlığı.",
      },
    ],
    specs: [
      { label: "Keşif", value: "Samsun içinde ücretsiz yerinde keşif" },
      {
        label: "Tasarım",
        value: "3D görselleştirme ve cephe montaj simülasyonu",
      },
      { label: "İmalat", value: "Kendi atölyemizde; CNC kesim, kaynak, boya" },
      { label: "Montaj", value: "Sepetli araç ve iskele ile yüksekte çalışma" },
      {
        label: "Kapsama",
        value: "Samsun merkez + tüm ilçeler + Türkiye geneli",
      },
      { label: "Belgelendirme", value: "Teknik çizim ve izin başvuru dosyası" },
      { label: "Bakım", value: "Talep üzerine periyodik bakım anlaşması" },
    ],
    priceFactors: [
      "İşin kapsamı ve toplam metraj",
      "Uygulama ili ve mesafe (Samsun dışı işlerde nakliye/konaklama)",
      "Montaj yöntemi: sepetli araç, iskele veya vinç ihtiyacı",
      "Keşifte tespit edilen altyapı eksikleri (elektrik hattı, sağlamlaştırma)",
      "Şube sayısı — çok noktalı işlerde birim maliyet düşer",
      "İzin ve belgelendirme süreçlerinin kapsamı",
    ],
    useCases: [
      "Yeni açılan mağaza ve şubeler",
      "Çok şubeli zincir markaların standart uygulamaları",
      "AVM mağaza teslim projeleri",
      "Toplu tabela yenileme çalışmaları",
      "Şehir dışı şube açılışları",
    ],
    variants: [
      {
        name: "Yerinde Keşif ve Ölçü",
        description:
          "Cepheye gelinir; ölçü, elektrik altyapısı ve montaj erişimi yerinde kaydedilir. Samsun içinde ücretsizdir. Cephenin ölçüsü kadar elektrik noktası, cephe malzemesi ve montaj aracının yanaşıp yanaşamayacağı da kaydedilir.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/yerinde-kesif-ve-olcu.jpg",
      },
      {
        name: "3D Tasarım ve Cephe Simülasyonu",
        description:
          'Tabelanın kendi cephenizdeki hâli üretimden önce görselleştirilir. Onaydan sonra sürpriz çıkmaz. Onay öncesi görmek, üretim sonrası "böyle düşünmemiştim" sürprizini ortadan kaldırır.',
        image:
          "/images/services/variants/imalat-tasarim-montaj/3d-tasarim-ve-cephe-simulasyonu.jpg",
      },
      {
        name: "Belediye / AVM İzin Dosyası",
        description:
          "İlan ve reklam izni için gereken teknik çizim ve başvuru dosyasının hazırlanması. Ölçü ve renk kısıtları ilçeden ilçeye değişir; dosya reddedilirse gereken düzeltmeyi de biz yaparız.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/belediye-avm-izin-dosyasi.jpg",
      },
      {
        name: "Anahtar Teslim İmalat + Montaj",
        description:
          "Tasarımdan montaja kadar tüm süreç tek elden. Tek muhatap, tek sorumluluk. Tasarım, üretim ve montaj ayrı firmalara verildiğinde sorumluluk dağılır; tek elden yürüdüğünde muhatap tektir.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/anahtar-teslim-imalat-montaj.jpg",
      },
      {
        name: "Yüksekte Montaj",
        description:
          "Sepetli araç ve iskele ile yüksek cephelerde montaj. Gerekli güvenlik ekipmanı ekipte mevcut. Sepetli araç ve iskele planı keşifte belirlenir; sokak kapatma izni gerekiyorsa başvuru önceden yapılır.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/yuksekte-montaj.jpg",
      },
      {
        name: "Şehir Dışı ve Türkiye Geneli Montaj",
        description:
          "Samsun dışındaki şubelere montaj ekibiyle gidilir; 81 ile ulaşım sağlanır. Şubeleri farklı illerde olan markalar her şehirde ayrı tabelacı aramak zorunda kalmaz.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/sehir-disi-turkiye-geneli-montaj.jpg",
      },
      {
        name: "Tabela Söküm ve Yenileme",
        description:
          "Eski tabelanın sökülmesi, cephenin düzeltilmesi ve yenisinin montajı. Eski tabelanın izi ve dübel delikleri kapatılmadan yeni tabela takılırsa cephe bakımsız görünür.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/tabela-sokum-ve-yenileme.jpg",
      },
      {
        name: "Periyodik Bakım ve Arıza Servisi",
        description:
          "LED, trafo ve bağlantı elemanlarının düzenli kontrolü. Arızada tek ziyarette müdahale. Sönük veya yarım yanan tabela, kapalı bir işletme izlenimi verir; düzenli kontrol bunu önler.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/periyodik-bakim-ve-ariza-servisi.jpg",
      },
      {
        name: "Zincir Marka Toplu Uygulama",
        description:
          "Çok şubeli markalarda tüm şubelerin aynı standartla tek programda uygulanması. Tüm şubeler tek programda üretildiği için hem maliyet düşer hem şubeler arası fark kalmaz.",
        image:
          "/images/services/variants/imalat-tasarim-montaj/zincir-marka-toplu-uygulama.jpg",
      },
    ],
    faqs: [
      {
        q: "Samsun dışına da hizmet veriyor musunuz?",
        a: "Evet. İmalat Samsun'daki atölyemizde yapılır, montaj ekibimiz Türkiye'nin her iline gider. Şubeleşen markalarla çalışırken tüm şubelerde aynı standardı tutturuyoruz.",
      },
      {
        q: "Keşif ücretli mi?",
        a: "Samsun merkez ve ilçelerinde yerinde keşif ücretsizdir. Şehir dışı keşiflerde yol gideri, iş sözleşmeye bağlandığında toplam bedelden düşülür.",
      },
      {
        q: "Belediye izin sürecini siz mi takip ediyorsunuz?",
        a: "Başvuru için gereken teknik çizim, ölçü ve görselleştirmeyi biz hazırlıyoruz. Resmî başvurunun işletme adına yapılması gerektiği için evrak setini size teslim edip süreç boyunca destek oluyoruz.",
      },
      {
        q: "İş bittikten sonra bakım veriyor musunuz?",
        a: "Evet. Kendi ürettiğimiz işlerde arıza bildirimini aldığımızda yerinde müdahale ediyor, talep eden işletmelerle periyodik bakım anlaşması yapıyoruz.",
      },
    ],
  },
  "yol-panolari": {
    name: "Yol ve Yönlendirme Panoları",
    shortName: "Yol Panoları",
    tagline: "Bulunmak için önce görünmek",
    summary:
      "Yol kenarından bina içine kadar, müşteriyi işletmenize ve doğru birime ulaştıran yönlendirme sistemleri.",
    answer:
      "Yol ve yönlendirme panoları, sürücü ve yayaları bir işletmeye ya da doğru birime ulaştıran açık alan levhalarıdır. Royal Reklam, Samsun'da galvaniz direkli, reflektif folyo kaplı yol panoları ve bina içi yönlendirme setleri üretir. Keşif, imalat ve montaj dâhil ortalama teslim süresi 10–15 iş günüdür.",
    metaTitle: "Samsun Yol ve Yönlendirme Panosu | Royal Reklam Samsun",
    metaDescription:
      "Samsun'da yol ve yönlendirme panosu imalatı: reflektif levha, site içi yönlendirme, otopark ve bina içi kat panoları. Ücretsiz keşif. 0544 230 71 77",
    keywords: [
      "samsun yol panosu",
      "yönlendirme panosu samsun",
      "yol tabelası imalatı",
      "reflektif levha samsun",
      "bina içi yönlendirme samsun",
    ],
    intro: [
      "Bir işletmenin kaybettiği müşterilerin bir kısmı fiyattan ya da üründen değil, basitçe yeri bulunamadığı için kaybolur. Sapağı kaçıran sürücü geri dönmez; hangi blokta olduğunuzu anlayamayan ziyaretçi telefon açmak yerine vazgeçer. Yönlendirme panosu bu sessiz kaybı kapatan en ucuz yatırımdır.",
      "Royal Reklam olarak yönlendirmeyi tek bir levha olarak değil, bir sistem olarak kuruyoruz. Yol kenarındaki ilk panodan otopark girişine, oradan kat ve kapı numaralarına kadar aynı tipografi, aynı renk ve aynı ok dili kullanılır — ziyaretçi her adımda kendini nerede olduğunu bilerek ilerler.",
      "Açık alandaki levhalar rüzgâr yükü ve nem altında çalışır. Bu yüzden direkleri galvaniz çelikten üretip elektrostatik toz boya ile kaplıyor, levha yüzeyinde aydınlatması olmayan yollarda far ışığını geri yansıtan reflektif folyo kullanıyoruz. Amaç panoyu bir kere asıp yıllarca unutmanız.",
    ],
    highlights: [
      {
        title: "Gece de okunan yüzey",
        description:
          "Reflektif folyo far ışığını kaynağına geri yansıtır; aydınlatması olmayan yollarda pano geceleri de okunur.",
      },
      {
        title: "Rüzgâra göre hesaplanan direk",
        description:
          "Direk kesiti ve temel derinliği panonun yüzey alanına ve konumun rüzgâr yüküne göre belirlenir.",
      },
      {
        title: "Galvaniz gövde, toz boya yüzey",
        description:
          "Galvanizli çelik ve elektrostatik toz boya, Karadeniz nemine karşı paslanmayı yıllarca geciktirir.",
      },
      {
        title: "Tutarlı yönlendirme dili",
        description:
          "Yoldan kapıya kadar tüm levhalar aynı tipografi, renk ve ok düzeniyle üretilir; ziyaretçi tereddüt etmez.",
      },
    ],
    specs: [
      {
        label: "Levha malzemesi",
        value: "Galvaniz sac, alüminyum veya alüminyum kompozit",
      },
      {
        label: "Yüzey",
        value: "Reflektif folyo (1. veya 2. sınıf) ya da düz renkli folyo",
      },
      { label: "Direk", value: "Galvaniz çelik boru veya kutu profil" },
      { label: "Yüzey işlemi", value: "Elektrostatik toz boya, RAL renk kodu" },
      { label: "Baskı", value: "UV dayanımlı dijital baskı veya folyo kesim" },
      {
        label: "Temel",
        value: "Betonarme; zemin ve rüzgâr yüküne göre boyutlandırılır",
      },
      { label: "Ölçü", value: "Standart levha ölçüleri veya projeye özel" },
      { label: "Dış mekân ömrü", value: "Reflektif folyoda 7 – 10 yıl" },
    ],
    priceFactors: [
      "Levha ölçüsü ve toplam pano adedi",
      "Reflektif folyo sınıfı — gece okunurluğu arttıkça malzeme maliyeti artar",
      "Direk yüksekliği ve taşıyıcı konstrüksiyon kesiti",
      "Betonarme temel gerekip gerekmediği, zemin durumu",
      "Montaj konumu ve iş makinesi erişimi",
      "Karayolları veya belediye izin süreci",
    ],
    useCases: [
      "Yol kenarı işletme ve tesis yönlendirmeleri",
      "Konut sitesi, kampüs ve fabrika içi yönlendirme",
      "Otopark giriş, çıkış ve kat levhaları",
      "Hastane, okul ve kamu binası iç yönlendirme setleri",
      "Şantiye bilgilendirme ve iş güvenliği panoları",
    ],
    variants: [
      {
        name: "Çift Direkli Büyük Yol Panosu",
        description:
          "İki çelik direk üzerine oturan büyük ölçekli pano. Şehirlerarası yol kenarında uzaktan okunur. Yüzey büyüdükçe rüzgâr yükü artar; direk kesiti ve temel derinliği buna göre hesaplanır.",
        image:
          "/images/services/variants/yol-panolari/cift-direkli-buyuk-yol-panosu.jpg",
      },
      {
        name: "Tek Ayaklı Yönlendirme Levhası",
        description:
          "Tek direkli, orta ölçekli yönlendirme panosu. İşletme girişi ve sapak noktaları için. İşletme girişini kaçırmamak için genelde sapaktan birkaç yüz metre önce konumlandırılır.",
        image:
          "/images/services/variants/yol-panolari/tek-ayakli-yonlendirme-levhasi.jpg",
      },
      {
        name: "Ok Yönlü Yönlendirme Panosu",
        description:
          "Yön okuyla mesafe ve işletme adını birlikte veren pano. Birden çok işletme aynı direğe dizilebilir. Aynı direğe birden çok işletme dizilebildiği için sanayi sitesi ve iş merkezlerinde levha kalabalığı önlenir.",
        image:
          "/images/services/variants/yol-panolari/ok-yonlu-yonlendirme-panosu.jpg",
      },
      {
        name: "Reflektif (Işık Yansıtmalı) Levha",
        description:
          "Far ışığını geri yansıtan reflektif folyo kaplı levha. Aydınlatması olmayan yollarda gece okunur. Aydınlatması olan cadde üzerinde gereksiz maliyettir; karanlık şehirlerarası yolda ise şarttır.",
        image: "/images/services/variants/yol-panolari/reflektif-levha.jpg",
      },
      {
        name: "Site İçi Blok ve Yönlendirme Panoları",
        description:
          "Konut sitelerinde blok, otopark ve sosyal tesis yönlendirmeleri; tek tasarım dili altında. Blok, otopark ve sosyal tesis levhaları aynı dilde üretilmezse ziyaretçi her noktada yeniden düşünmek zorunda kalır.",
        image:
          "/images/services/variants/yol-panolari/site-ici-blok-ve-yonlendirme-panolari.jpg",
      },
      {
        name: "Otopark Yönlendirme ve Kat Panoları",
        description:
          "Giriş, çıkış, kat ve ada numaralarını gösteren otopark levha seti. Kat ve ada numaraları büyük punto ile yazılır; sürücü aracı bıraktığı yeri dönüşte kolayca bulur.",
        image:
          "/images/services/variants/yol-panolari/otopark-yonlendirme-ve-kat-panolari.jpg",
      },
      {
        name: "Bina İçi Kat ve Kapı Yönlendirme",
        description:
          "Kat planı, oda numarası ve departman levhalarından oluşan iç mekân yönlendirme seti. Kat planı girişte, oda numarası kapıda olacak şekilde kurgulanır; ziyaretçi danışmaya sormadan ilerler.",
        image:
          "/images/services/variants/yol-panolari/bina-ici-kat-ve-kapi-yonlendirme.jpg",
      },
      {
        name: "Acil Çıkış ve Güvenlik Levhaları",
        description:
          "Yönetmeliğe uygun fosforlu acil çıkış, yangın ve uyarı levhaları. Yönetmeliğe uygunluk denetimde aranır; fosforlu yüzey elektrik kesilse bile görünür kalır.",
        image:
          "/images/services/variants/yol-panolari/acil-cikis-ve-guvenlik-levhalari.jpg",
      },
      {
        name: "Şantiye Bilgilendirme Panosu",
        description:
          "Yapı ruhsatı bilgilerini ve iş güvenliği uyarılarını taşıyan şantiye girişi panosu. Yapı ruhsatı bilgilerinin şantiye girişinde bulundurulması zorunludur; pano bu yükümlülüğü karşılar.",
        image:
          "/images/services/variants/yol-panolari/santiye-bilgilendirme-panosu.jpg",
      },
    ],
    faqs: [
      {
        q: "Yol panosu için izin gerekiyor mu?",
        a: "Panonun konumuna göre değişir. İşletmenin kendi parselinde kalan levhalar için genelde belediye ilan ve reklam izni yeterlidir; karayolu kamulaştırma sınırı içinde kalan panolarda Karayolları'ndan izin alınması gerekir. Hangi kuruma başvurulacağını keşifte netleştirip başvuru dosyasını biz hazırlıyoruz.",
      },
      {
        q: "Reflektif levha ile normal levha arasındaki fark nedir?",
        a: "Normal folyo kaplı levha, üzerine ışık düşmediğinde okunmaz. Reflektif folyo far ışığını geldiği yöne geri yansıttığı için aydınlatması olmayan yollarda gece de okunur. Aydınlatılmış bir cadde üzerindeyseniz normal folyo yeterli olabilir; şehirlerarası yol kenarında reflektif tercih edilmelidir.",
      },
      {
        q: "Bina içi yönlendirme de yapıyor musunuz?",
        a: "Evet. Kat planı, oda numarası, departman ve acil çıkış levhalarından oluşan iç mekân setlerini dış yönlendirmeyle aynı tasarım dili altında üretiyoruz; böylece ziyaretçi otoparktan kapıya kadar aynı işaretleri takip eder.",
      },
    ],
  },
  "led-ekranlar": {
    name: "LED Ekran Sistemleri",
    shortName: "LED Ekran",
    tagline: "Değişen mesaj, sabit cephe",
    summary:
      "Dış ve iç mekân için tam renkli LED ekranlar, kayan yazı sistemleri ve uzaktan yönetilen fiyat göstergeleri.",
    answer:
      "LED ekran, modüler LED panellerden oluşan; video, görsel ve yazıyı hareketli gösterebilen elektronik reklam yüzeyidir. Royal Reklam, Samsun'da dış mekân ve iç mekân LED ekran kurulumu, kayan yazı ve akaryakıt fiyat göstergesi uygular. Keşif, montaj ve yazılım kurulumu dâhil ortalama teslim süresi 15–30 iş günüdür.",
    metaTitle: "Samsun LED Ekran Sistemleri | Royal Reklam Samsun",
    metaDescription:
      "Samsun'da LED ekran kurulumu: dış mekân tam renkli ekran, iç mekân ekran, kayan yazı ve fiyat göstergesi. Keşif, montaj ve yazılım tek elden. 0544 230 71 77",
    keywords: [
      "samsun led ekran",
      "led ekran fiyatları samsun",
      "kayan yazı samsun",
      "dış mekan led ekran samsun",
      "led ekran kurulumu",
    ],
    intro: [
      "Basılı bir tabela tek bir mesaj taşır; astığınız gün ne yazıyorsa yıllarca onu söyler. LED ekran ise aynı cepheyi gün içinde kampanyaya, akşam menüye, hafta sonu duyuruya çevirebilir. Mesajı değiştirmek için matbaaya gitmek ya da montaj ekibi çağırmak gerekmez.",
      "Royal Reklam olarak LED ekranı kutudan çıkarıp asmakla bırakmıyoruz. Ekranın izleneceği mesafeye göre piksel aralığını, konumun gün ışığı yüküne göre parlaklığını seçiyor; kurulumdan sonra içeriği kendinizin yönetebilmesi için yazılımı devrediyor ve kullanımını gösteriyoruz.",
      "Dış mekân ekranlarında asıl mesele parlaklık ve sızdırmazlıktır. Doğrudan güneş alan bir cephede düşük parlaklıkta ekran gündüz okunmaz; kabin koruması yetersizse Karadeniz yağışı birkaç sezonda modülleri bitirir. Ekranı bu iki kritere göre seçiyoruz.",
    ],
    highlights: [
      {
        title: "İzleme mesafesine göre piksel",
        description:
          "Piksel aralığı izleyicinin uzaklığına göre seçilir; yakından izlenen ekranda sık, yol kenarında seyrek piksel doğru sonucu verir.",
      },
      {
        title: "Gün ışığında okunan parlaklık",
        description:
          "Dış mekân modülleri doğrudan güneş altında bile okunacak parlaklıkta seçilir; gece otomatik olarak kısılır.",
      },
      {
        title: "İçeriği kendiniz yönetirsiniz",
        description:
          "Kurulumdan sonra yazılım devredilir. Görsel ve yazıyı bilgisayardan veya telefondan değiştirebilirsiniz.",
      },
      {
        title: "Modül modül servis",
        description:
          "Arıza hâlinde ekranın tamamı değil yalnızca ilgili kabin veya modül değiştirilir.",
      },
    ],
    specs: [
      {
        label: "Piksel aralığı",
        value: "Dış mekân P4 – P10, iç mekân P1.8 – P3",
      },
      {
        label: "Parlaklık",
        value: "Dış mekân 5.000 – 7.000 nit, iç mekân 800 – 1.500 nit",
      },
      { label: "Kabin", value: "Alüminyum döküm veya sac kabin, modüler" },
      {
        label: "Koruma sınıfı",
        value: "Dış mekânda ön yüz IP65, arka yüz IP54",
      },
      {
        label: "Yenileme hızı",
        value: "≥ 1.920 Hz — kamerada bantlanma olmaz",
      },
      {
        label: "İçerik yönetimi",
        value: "Ağ üzerinden yazılım; USB ile çevrimdışı yükleme",
      },
      {
        label: "Görüntü kaynağı",
        value: "HDMI, ağ bağlantısı veya dâhili oynatıcı",
      },
      { label: "LED ömrü", value: "50.000 – 100.000 saat" },
    ],
    priceFactors: [
      "Ekran ölçüsü (m² olarak toplam yüzey)",
      "Piksel aralığı — piksel sıklaştıkça metrekare maliyeti hızla artar",
      "İç mekân mı dış mekân mı; dış mekânda parlaklık ve koruma sınıfı",
      "Kabin kalitesi ve modül markası",
      "Taşıyıcı konstrüksiyon ve montaj yüksekliği",
      "Elektrik altyapısı, pano ve topraklama ihtiyacı",
    ],
    useCases: [
      "Cadde üstü mağaza ve zincir şube cepheleri",
      "Akaryakıt istasyonu fiyat göstergeleri",
      "Eczane, market ve vitrin kayan yazıları",
      "AVM, otel lobisi ve showroom iç mekân ekranları",
      "Etkinlik, kongre ve sahne uygulamaları",
    ],
    variants: [
      {
        name: "Dış Mekân Tam Renkli LED Ekran",
        description:
          "P4–P10 piksel aralığında, gün ışığında da okunan yüksek parlaklıkta dış mekân ekranı. Parlaklık gündüz güneşe göre seçilir, gece otomatik kısılır; aksi hâlde karanlıkta göz alır ve şikâyet konusu olur.",
        image:
          "/images/services/variants/led-ekranlar/dis-mekan-tam-renkli-led-ekran.jpg",
      },
      {
        name: "İç Mekân LED Ekran",
        description:
          "P1.8–P3 gibi sık piksel aralığı. Yakın mesafeden izlendiği için mağaza ve lobide net görüntü verir. Yakından izlendiği için piksel aralığı sıklaşır; aynı metrekare dış mekân ekranına göre belirgin şekilde pahalıdır.",
        image: "/images/services/variants/led-ekranlar/ic-mekan-led-ekran.jpg",
      },
      {
        name: "Kayan Yazı (Tek Renk LED Bant)",
        description:
          "Tek renk LED bant üzerinde akan metin. Eczane, market ve şube vitrinlerinde en ekonomik hareketli çözüm. Nöbetçi eczane, günün menüsü veya kampanya gibi sık değişen kısa mesajlar için en ekonomik çözümdür.",
        image: "/images/services/variants/led-ekranlar/kayan-yazi-led-bant.jpg",
      },
      {
        name: "LED Fiyat Göstergesi",
        description:
          "Akaryakıt istasyonları için rakam modülü. Fiyat uzaktan güncellenir, direğe çıkmaya gerek kalmaz. Fiyat merkezden güncellendiği için direğe çıkıp levha değiştirme ihtiyacı ve iş güvenliği riski ortadan kalkar.",
        image:
          "/images/services/variants/led-ekranlar/led-fiyat-gostergesi.jpg",
      },
      {
        name: "Vitrin İçi LED Poster Ekran",
        description:
          "Vitrine yerleştirilen ince, dikey LED ekran. Kampanya görselini kapalı saatlerde de gösterir. Kepenk kapalıyken bile çalışır; mağaza mesai dışında da görünür kalır.",
        image:
          "/images/services/variants/led-ekranlar/vitrin-ici-led-poster-ekran.jpg",
      },
      {
        name: "Çift Yüz LED Totem Ekran",
        description:
          "Totem gövdesine entegre çift yüzlü ekran. Yolun iki yönünden de izlenir. Yaya akışının iki yönlü olduğu girişlerde tek ünite iki yönü birden karşılar.",
        image:
          "/images/services/variants/led-ekranlar/cift-yuz-led-totem-ekran.jpg",
      },
      {
        name: "Kavisli / Köşe LED Ekran",
        description:
          "Bina köşesini veya kavisli yüzeyi saran modüler ekran. Cepheyi kesintisiz kullanır. Köşe binalarda iki cepheyi kesintisiz kullanır; standart düz panelle bu etki elde edilemez.",
        image:
          "/images/services/variants/led-ekranlar/kavisli-kose-led-ekran.jpg",
      },
      {
        name: "Kiralık LED Ekran",
        description:
          "Konser, kongre ve açılış gibi süreli etkinlikler için kurulum ve söküm dâhil kiralama. Yılda birkaç kez ekran ihtiyacı olan işletmeler için satın almaya göre çok daha makuldür; kurulum ve söküm dâhildir.",
        image: "/images/services/variants/led-ekranlar/kiralik-led-ekran.jpg",
      },
      {
        name: "Skor ve Spor Salonu Panosu",
        description:
          "Skor, süre ve faul bilgisini gösteren salon panosu; kumandayla yönetilir. Skor, süre ve faul bilgisi kumandayla yönetilir; hakem masasından tek kişi kontrol eder.",
        image:
          "/images/services/variants/led-ekranlar/skor-ve-spor-salonu-panosu.jpg",
      },
    ],
    faqs: [
      {
        q: "LED ekran fiyatı neye göre değişir?",
        a: "Fiyatın belirleyicisi metrekare ve piksel aralığıdır. Piksel sıklaştıkça aynı alanda çok daha fazla LED kullanıldığı için maliyet hızla artar. Bu yüzden ekranın kaç metreden izleneceğini doğru belirlemek gereksiz harcamayı önler — yol kenarındaki bir ekranda iç mekân pikseli kullanmak parayı boşa harcamaktır.",
      },
      {
        q: "İçeriği kendim değiştirebilir miyim?",
        a: "Evet. Kurulumdan sonra içerik yönetim yazılımı size devredilir ve kullanımı gösterilir. Görsel, video ve yazıyı ağ üzerinden bilgisayardan değiştirebilir, internet olmayan konumlarda USB ile yükleyebilirsiniz.",
      },
      {
        q: "Dış mekân ekranı yağmurdan etkilenir mi?",
        a: "Doğru koruma sınıfı seçildiğinde hayır. Dış mekân ekranlarında ön yüzde IP65, arka yüzde IP54 koruma standarttır; bu sınıf yağmur ve toza karşı sızdırmazlık sağlar. Sorun genellikle iç mekân ekranının dışarıda kullanılmasından çıkar.",
      },
    ],
  },
};
