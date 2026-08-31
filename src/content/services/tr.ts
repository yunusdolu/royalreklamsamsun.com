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
    name: "Işıklı Tabela",
    shortName: "Işıklı Tabela",
    tagline: "Gece de okunan cephe",
    summary:
      "LED aydınlatmalı pleksi ve kompozit kasa tabelalar. Yüksek gece görünürlüğü, düşük enerji tüketimi.",
    answer:
      "Işıklı tabela, LED aydınlatma sayesinde karanlıkta da net okunabilen cephe tanıtım levhasıdır. Royal Reklam, Samsun'da alüminyum kompozit kasa ve pleksiglas yüzey ile IP65 korumalı LED modüllü ışıklı tabela imalatı yapar. Keşif, tasarım, üretim ve montaj dâhil ortalama teslim süresi 5–10 iş günüdür.",
    metaTitle: "Samsun Işıklı Tabela İmalatı | LED Tabela — Royal Reklam",
    metaDescription:
      "Samsun'da ışıklı tabela imalatı: LED kutu, pleksi ve kompozit kasa tabela. Keşif, tasarım, imalat ve montaj tek elden, 2 yıl garantili. 0544 230 71 77",
    keywords: [
      "samsun ışıklı tabela",
      "ışıklı tabela imalatı samsun",
      "led tabela samsun",
      "samsun tabela firmaları",
      "cephe tabelası samsun",
      "ışıklı tabela fiyatları",
    ],
    intro: [
      "Bir mağazanın en çok çalışan reklam aracı cephesidir. Gündüz doğru tipografiyle dikkat çeken bir tabela, gece aydınlatması zayıfsa görünmez hâle gelir. Işıklı tabela tam olarak bu boşluğu kapatır: markanızı akşam saatlerinde de, kapalı olduğunuz saatlerde bile çalışan bir vitrine dönüştürür.",
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
      { label: "Kasa malzemesi", value: "Alüminyum kompozit veya galvaniz sac profil" },
      { label: "Yüzey", value: "Pleksiglas 3–5 mm (opal, renkli veya buzlu)" },
      { label: "Aydınlatma", value: "SMD LED modül, 12V / 24V, IP65" },
      { label: "Besleme", value: "Sabit voltajlı LED trafo, koruma sigortalı" },
      { label: "Baskı", value: "UV dayanımlı folyo kesim veya dijital baskı" },
      { label: "LED ömrü", value: "30.000 – 50.000 saat" },
      { label: "Montaj", value: "Dübel + kimyasal ankraj, cephe tipine göre" },
      { label: "Garanti", value: "İmalat ve LED için 2 yıl" },
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
        a: "Hayır. Modüler yapı sayesinde yalnızca arızalı LED modül veya trafo değiştirilir. Tabelayı sökmeye gerek kalmaz; garantili işlerde bu servis ücretsizdir.",
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
    metaTitle: "Samsun Kutu Harf Tabela İmalatı — Royal Reklam",
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
      { label: "Montaj", value: "Distans aparatlı, paslanmaz bağlantı elemanı" },
      { label: "Türkçe karakter", value: "ş, ğ, ı, ö, ü, ç tam destek" },
      { label: "Garanti", value: "İmalat ve LED için 2 yıl" },
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
    metaTitle: "Samsun Totem Tabela İmalatı ve Montajı — Royal Reklam",
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
        description: "Her iki trafik yönünden okunur; tek yüz maliyet kaybı yaratmaz.",
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
      { label: "Garanti", value: "Konstrüksiyon 5 yıl, LED 2 yıl" },
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
    metaTitle: "Samsun Lightbox Tabela ve Gergi Kumaş Pano — Royal Reklam",
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
        description: "Edge-lit LED panel sayesinde duvara neredeyse gömülü görünür.",
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
        description: "Tavandan sarkıtmalı çift yüzlü kullanım için askı aparatı dâhil.",
      },
    ],
    specs: [
      { label: "Kasa", value: "Alüminyum profil, 4–8 cm derinlik" },
      { label: "Yüzey", value: "Gergi kumaş (silikon fitilli) veya pleksiglas" },
      { label: "Aydınlatma", value: "Edge-lit LED panel + difüzör" },
      { label: "Baskı", value: "Textile süblimasyon veya UV baskı" },
      { label: "Montaj", value: "Duvara sabit, tavandan askılı veya ayaklı" },
      { label: "Kullanım", value: "İç mekân; dış mekân için IP54 versiyon" },
      { label: "Görsel değişimi", value: "Kumaş sistemde araçsız, 3–5 dakika" },
      { label: "Garanti", value: "Kasa 3 yıl, LED 2 yıl" },
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
    metaTitle: "Samsun Cephe Giydirme | Kompozit Panel Kaplama — Royal Reklam",
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
        description: "Sepetli araç ve cephe iskelesiyle güvenli, sigortalı uygulama.",
      },
    ],
    specs: [
      { label: "Ana malzeme", value: "Alüminyum kompozit panel (ACP) 4 mm" },
      { label: "Yangın sınıfı", value: "B-s1 standart / A2-s1 mineral dolgulu" },
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
    metaTitle: "Samsun Araç Giydirme ve Araç Kaplama — Royal Reklam",
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
      "Kısmi kaplamadan tam kaplamaya kadar her ölçekte çalışıyoruz. Filo işlerinde tüm araçlarda birebir aynı yerleşimi garanti etmek için araç bazlı kalıp şablonu hazırlıyoruz — böylece on aracın onunda logo aynı noktada durur.",
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
      { label: "Cam uygulaması", value: "One-way vision (tek yön görüş) delikli folyo" },
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
    metaTitle: "Samsun Dijital Baskı | Branda, Vinil, Folyo — Royal Reklam",
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
      { label: "Malzemeler", value: "Vinil, branda, mesh, folyo, kanvas, one-way vision" },
      { label: "Çözünürlük", value: "720 – 1440 dpi (kullanım mesafesine göre)" },
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
      "Kurumsal kimlik çalışması, bir markanın logo, renk paleti, tipografi ve uygulama kurallarını tanımlayan sistemin oluşturulmasıdır. Royal Reklam, Samsun'da art direktör İshak Bal yönetiminde logo tasarımı, kimlik kılavuzu ve tüm basılı/uygulamalı materyalleri üretir. Tabela, araç ve cephe uygulamaları aynı sistemden beslenir.",
    metaTitle: "Samsun Kurumsal Kimlik ve Logo Tasarımı — Royal Reklam",
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
          "Tüm süreç İshak Bal'ın direktörlüğünde yürür; tek elden estetik tutarlılık sağlanır.",
      },
    ],
    specs: [
      { label: "Logo teslimi", value: "AI, EPS, SVG, PDF, PNG (şeffaf)" },
      { label: "Renk sistemi", value: "Pantone, CMYK, RGB, RAL karşılıkları" },
      { label: "Tipografi", value: "Ana ve yardımcı font ailesi, hiyerarşi tanımı" },
      { label: "Kılavuz", value: "PDF kimlik kılavuzu (kullanım + yanlış kullanım)" },
      { label: "Basılı set", value: "Kartvizit, antetli kâğıt, zarf, dosya" },
      { label: "Dijital set", value: "Sosyal medya şablonları, e-posta imzası" },
      { label: "Uygulama", value: "Tabela, araç, cephe, personel kıyafeti görselleri" },
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
    metaTitle: "Samsun Etiket ve Sticker Baskı | Kontur Kesim — Royal Reklam",
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
        description: "Logo formunda veya özel şekilli kesim; kare kalıp zorunluluğu yok.",
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
      { label: "Malzemeler", value: "PVC folyo, şeffaf folyo, kuşe etiket, zemin folyosu" },
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
      "Royal Reklam; keşif, tasarım, imalat ve montaj aşamalarının tamamını kendi ekibiyle yürüten bir açık hava reklam firmasıdır. Samsun merkezli atölyemizde üretilen tabela ve cephe uygulamaları, Türkiye'nin her iline montaj ekibimizle sevk edilir. Tek sözleşme, tek muhatap ve tek garanti kapsamı sunulur.",
    metaTitle: "Tabela İmalatı, Tasarım ve Montaj — Royal Reklam Samsun",
    metaDescription:
      "Samsun merkezli tabela imalatı, tasarım ve montaj hizmeti. Kendi atölyemizde üretim, Türkiye geneli montaj ekibi, tek elden garanti. 0544 230 71 77",
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
          "Tasarım, imalat, montaj ve garanti tek sözleşmede — sorumluluk dağılmaz.",
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
      { label: "Tasarım", value: "3D görselleştirme ve cephe montaj simülasyonu" },
      { label: "İmalat", value: "Kendi atölyemizde; CNC kesim, kaynak, boya" },
      { label: "Montaj", value: "Sepetli araç ve iskele ile yüksekte çalışma" },
      { label: "Kapsama", value: "Samsun merkez + tüm ilçeler + Türkiye geneli" },
      { label: "Belgelendirme", value: "Teknik çizim ve izin başvuru dosyası" },
      { label: "Garanti", value: "Tek elden, tüm bileşenler için" },
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
        a: "Evet. Garanti süresi boyunca imalat ve LED kaynaklı arızalar ücretsiz giderilir. Sonrasında talep eden işletmelerle periyodik bakım anlaşması yapıyoruz.",
      },
    ],
  },
  "yol-panolari": {
    name: "Yol ve Yönlendirme Panoları",
    shortName: "Yol Panoları",
    tagline: "Doğru Yönlendirme",
    summary:
      "Açık alanlarda müşterilerinizi işletmenize yönlendiren büyük ölçekli ve dayanıklı yol panoları.",
    answer: "Açık alanlarda müşterilerinizi işletmenize yönlendiren büyük ölçekli yol panoları.",
    metaTitle: "Yol Panoları",
    metaDescription: "Yol ve yönlendirme panoları",
    keywords: [],
    intro: [],
    highlights: [],
    specs: [],
    priceFactors: [],
    useCases: [],
    faqs: [],
  },
  "led-ekranlar": {
    name: "LED Ekran Sistemleri",
    shortName: "LED Ekranlar",
    tagline: "Dinamik Görüntü",
    summary:
      "Hareketli reklam ve video gösterimi için yüksek çözünürlüklü dış mekan ve iç mekan LED ekran sistemleri.",
    answer: "Hareketli reklam ve video gösterimi için yüksek çözünürlüklü LED ekranlar.",
    metaTitle: "LED Ekranlar",
    metaDescription: "Dış mekan LED ekran",
    keywords: [],
    intro: [],
    highlights: [],
    specs: [],
    priceFactors: [],
    useCases: [],
    faqs: [],
  }
};
