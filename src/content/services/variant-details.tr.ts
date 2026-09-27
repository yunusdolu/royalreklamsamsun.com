import type { VariantDetail } from "./types";

/**
 * Çeşitlere özel ayrıntılar (Türkçe).
 *
 * Her dizi, `tr.ts` içindeki aynı hizmetin `variants` listesiyle AYNI
 * SIRADA. Yeni çeşit eklenirse buraya da aynı sıraya bir satır eklenmeli;
 * eksik kalırsa sayfa o çeşit için hizmetin genel bilgisini gösterir.
 *
 * Teknik değerler sektörde tipik olan aralıklardır; firmaya özel bir değer
 * (ör. kullanılan LED markası) değiştiğinde buradan güncellenir.
 */

/** Etiketleri hizmet başına bir kez yazıp değerleri sırayla eşleştirir. */
function group(labels: string[]) {
  return (
    values: string[],
    bestFor: string[],
    pros: string[],
    watch: string,
  ): VariantDetail => ({
    specs: labels.map((label, index) => ({ label, value: values[index] })),
    bestFor,
    pros,
    watch,
  });
}

const sign = group(["Kasa", "Yüzey", "Aydınlatma", "Tipik ömür"]);
const letter = group(["Gövde", "Ön yüz", "Aydınlatma", "Önerilen harf boyu"]);
const totem = group(["Gövde", "Yükseklik", "Aydınlatma", "Temel"]);
const box = group(["Kasa", "Yüzey", "Aydınlatma", "Görsel değişimi"]);
const facade = group(["Malzeme", "Taşıyıcı", "Dayanım", "Tipik ömür"]);
const wrap = group(["Folyo", "Kaplama alanı", "Uygulama süresi", "Tipik ömür"]);
const print = group(["Malzeme", "Baskı", "Kullanım", "Tipik ömür"]);
const brand = group(["Teslim edilenler", "Dosya formatı", "Revizyon", "Süre"]);
const label = group(["Malzeme", "Yapışkan", "Kesim", "Dayanım"]);
const work = group(["Kapsam", "Ekipman", "Çıktı", "Süre"]);
const road = group(["Levha", "Taşıyıcı", "Yansıtma", "Temel"]);
const led = group(["Piksel aralığı", "Parlaklık", "Koruma", "İçerik kontrolü"]);

export const variantDetailsTr: Record<string, VariantDetail[]> = {
  "isikli-tabela": [
    sign(
      ["Alüminyum kompozit (ACP) 4 mm", "Opal pleksi 3 mm, folyo kesim veya UV baskı", "İç SMD LED modül, 12 V, IP65", "Kasa 10+ yıl, LED 30.000–50.000 saat"],
      ["Cadde üstü mağazalar", "Eczane, kuaför, kafe gibi esnaf", "Gece de okunması gereken dükkânlar"],
      ["Maliyet ve dayanım arasında en dengeli tip", "Yüzey eskidiğinde kasa yerinde kalır, yalnız pleksi yenilenir", "Gece ve gündüz aynı netlikte okunur"],
      "3 metreyi aşan boylarda pleksi ek yeri oluşur; kesintisiz yüzey isteniyorsa vinil yüzey düşünülmeli.",
    ),
    sign(
      ["Alüminyum kompozit veya galvaniz sac", "Işık geçiren gergi vinil, baskılı", "İç LED modül", "Vinil 3–5 yıl, kasa 10+ yıl"],
      ["Geniş cepheler", "Market, bayi ve akaryakıt binaları", "Görselini sık yenileyen markalar"],
      ["Ek yeri olmadan çok büyük ölçüler", "Metrekare maliyeti pleksiden düşük", "Görsel kasa sökülmeden yenilenir"],
      "Vinil yıllar içinde gevşeyebilir; birkaç yılda bir gergi kontrolü gerekir.",
    ),
    sign(
      ["Alüminyum", "Isıyla şişirilmiş kabartmalı pleksi", "İç LED modül", "10+ yıl"],
      ["Zincir markalar ve bayiler", "Banka ve akaryakıt şubeleri", "Logosu belirgin markalar"],
      ["Logo yüzeyden kabarık, üç boyutlu durur", "Tek kalıpla her şubede birebir aynı ürün", "Gece ve gündüz güçlü etki"],
      "Kalıp maliyeti tek tabelada yüksektir; birden çok adet üretilecekse ekonomikleşir.",
    ),
    sign(
      ["Alüminyum kompozit", "Folyo kesim veya dijital baskı", "Yok", "8–10 yıl"],
      ["Pasaj içi dükkânlar", "Zaten aydınlık cepheler", "Bütçesi sınırlı işletmeler"],
      ["En ekonomik kasa tabela", "Elektrik tesisatı gerektirmez", "Bakım ihtiyacı neredeyse yok"],
      "Gece görünmez; akşam da çalışıyorsan tabelanın üstüne spot eklenmeli.",
    ),
    sign(
      ["Alüminyum, çift yüz", "Pleksi veya vinil, iki yüz", "İç LED modül", "10+ yıl"],
      ["Dar sokaklardaki dükkânlar", "Eczane, kafe ve kuaförler", "Cephe tabelasına ek görünürlük isteyenler"],
      ["Kaldırımdan yaklaşan yaya metrelerce önceden görür", "İki yönden okunur", "Küçük boyla büyük etki"],
      "Kaldırıma taşan tabelalarda belediyenin çıkma ölçüsü sınırlarına uyulmalı.",
    ),
    sign(
      ["Paslanmaz çelik, ayna veya satine", "Pleksi veya metal kesim", "İç LED veya halo", "15+ yıl"],
      ["Otel, plaza ve kurumsal binalar", "Kuyumcular", "Sahile yakın cepheler"],
      ["Deniz havasında paslanmaz", "Metalin ağırlığıyla prestijli görünüm", "Boya atmaz, solmaz"],
      "Ayna yüzey parmak izini ve kiri belli eder, düzenli temizlik ister; satine yüzey daha az gösterir.",
    ),
    sign(
      ["Pleksi arka panel veya doğrudan duvar", "Silikon neon flex hortum", "12/24 V LED neon", "30.000+ saat"],
      ["Kafe, bar ve restoranlar", "Fotoğraf köşeleri", "Gençlere hitap eden markalar"],
      ["Klasik neonun görüntüsü, kırılmadan ve düşük enerjiyle", "İstenen yazı ve çizim kıvrılarak şekillenir", "Düşük voltaj, güvenli"],
      "Çok küçük kıvrımlar yapılamaz; el yazısı tasarımların sadeleştirilmesi gerekir.",
    ),
    sign(
      ["Ahşap desenli kompozit veya gerçek ahşap kaplama", "Pleksi harf veya kesim", "Harf içi veya halo LED", "10+ yıl"],
      ["Kafe, fırın ve butikler", "Doğal konseptli mağazalar", "Otel ve restoranlar"],
      ["Sıcak, doğal görünüm", "Işıklı harfle gece de okunur", "Kompozit seçenekte çürüme ve böceklenme yok"],
      "Gerçek ahşap dış mekânda düzenli vernik bakımı ister; bakım istemiyorsan kompozit seç.",
    ),
    sign(
      ["İnce alüminyum", "Backlit film + pleksi", "Kenar LED", "8+ yıl"],
      ["Vitrinli mağazalar", "Emlak ve turizm ofisleri", "Eczane ve optik"],
      ["Yağmurdan ve güneşten korunduğu için uzun ömürlü", "Görsel kolayca değişir", "Vitrine profesyonel görünüm"],
      "Vitrin camındaki yansıma okunurluğu düşürebilir; parlaklık buna göre seçilmeli.",
    ),
  ],

  "kutu-harf-tabela": [
    letter(
      ["Alüminyum yan bant, fırın boyalı", "Opal pleksi 3 mm", "Önden, harf içi LED", "25 cm ve üzeri"],
      ["Kurumsal cepheler", "Mağaza ve şube tabelaları", "Gece okunurluğu önemli işletmeler"],
      ["En yaygın ve bakımı en kolay tip", "Renk seçeneği en geniş", "Harfler tek tek monte edildiği için cephe görünür kalır"],
      "20 cm'nin altındaki harflere LED sığmaz; küçük yazılar için dekota ya da krom harf daha doğru.",
    ),
    letter(
      ["Paslanmaz krom sac, ayna veya satine", "Krom, ışık geçirmez", "Yok ya da arkadan halo", "10 cm ve üzeri"],
      ["Kuyumcu, otel ve plaza girişleri", "Resepsiyon arkası duvarlar", "Prestij vurgusu isteyen markalar"],
      ["Metal parlaklığıyla premium görünüm", "Paslanmaz, dış mekânda uzun ömürlü", "Küçük boylarda da üretilebilir"],
      "Önden ışık vermez; gece okunması için halo (arkadan) aydınlatma eklenmeli.",
    ),
    letter(
      ["Krom yan bant (file)", "Opal pleksi", "Önden, harf içi LED", "20 cm ve üzeri"],
      ["Işıklı ama metal çerçeveli görünüm isteyenler", "AVM mağazaları", "Kurumsal ofis cepheleri"],
      ["Kutu harfin ışığını krom çerçeveyle birleştirir", "Gündüz metal parlaklığı, gece ışıklı yüz", "Kenarları darbeye karşı daha sağlam"],
      "Krom bant el işçiliği ister; standart kutu harften pahalıdır ve üretimi 1–2 gün uzar.",
    ),
    letter(
      ["Krom sac", "Krom, kapalı", "Harf altından duvara vuran LED", "15 cm ve üzeri"],
      ["Restoran ve butik oteller", "Gece atmosferi önemli cepheler", "Dekoratif iç mekân yazıları"],
      ["Işık doğrudan göze gelmez, yumuşak bir hale oluşur", "Gündüz krom, gece dramatik görünüm", "Duvar dokusunu öne çıkarır"],
      "Okunurluk duvarın rengine bağlıdır; koyu duvarlarda ışığın yansıması zayıf kalır.",
    ),
    letter(
      ["PVC köpük levha 5–20 mm, CNC kesim", "Boyalı veya folyo kaplı", "Yok", "3 cm ve üzeri"],
      ["İç mekân duvar yazıları", "Ofis ve klinik resepsiyonları", "Bütçesi sınırlı cephe yazıları"],
      ["En ekonomik harf tipi", "Çok küçük boylarda bile ince detay kesilir", "Hafif; bantla da monte edilebilir"],
      "Güneş altında renk zamanla açılabilir; dış mekânda UV dayanımlı boya ya da folyo şart.",
    ),
    letter(
      ["Alüminyum veya krom, arkası açık", "Kapalı metal", "Arkadan duvara vuran LED", "25 cm ve üzeri"],
      ["Premium markalar ve showroomlar", "Ofis girişleri", "Minimal cephe tasarımları"],
      ["Harfin arkasında zarif bir ışık halkası oluşur", "Gündüz metal, gece silüet görünümü", "Duvardan 3–5 cm uzakta durur, derinlik verir"],
      "Duvar açık renkli ve düz olmalı; pürüzlü ya da koyu yüzeyde hale etkisi kaybolur.",
    ),
    letter(
      ["Alüminyum yan bant", "Opal pleksi", "Hem önden hem arkadan LED", "30 cm ve üzeri"],
      ["Ana cadde ve kavşak cepheleri", "Uzaktan görülmesi gereken markalar", "Gece yoğun çalışan işletmeler"],
      ["Önden okunurluk ve arkadan hale bir arada", "Gece en güçlü görünen kutu harf tipi", "Cepheye derinlik katar"],
      "İki ayrı LED devresi olduğu için tüketim ve maliyet standart harften yüksektir.",
    ),
    letter(
      ["Alüminyum, kenar çıtası yok", "Yan banda gömülü pleksi", "Önden, homojen LED", "20 cm ve üzeri"],
      ["Modern ve minimal marka kimlikleri", "AVM ve teknoloji mağazaları", "Yakından bakılan cepheler"],
      ["Görünür çerçeve olmadığı için harf tek parça gibi durur", "İnce yazı karakterlerine daha sadık", "Yakından bakıldığında en temiz sonuç"],
      "Hassas yapıştırma ve cila ister; standart kutu harfe göre pahalıdır.",
    ),
    letter(
      ["Alüminyum, paslanmaz veya pleksi", "Boyalı ya da metal", "Yok; dışarıdan spotla desteklenebilir", "10 cm ve üzeri"],
      ["Gündüz çalışan işletmeler", "Aydınlık cepheler ve pasajlar", "Bina adı ve numara yazıları"],
      ["Elektrik tesisatı gerektirmez", "Işıklı harfe göre ekonomik", "Bakım ihtiyacı neredeyse yok"],
      "Gece okunmaz; akşam da görünmesi gerekiyorsa cephe spotu eklenmeli.",
    ),
  ],

  "totem-tabela": [
    totem(
      ["Çelik iskelet + ACP kaplama", "2–6 m", "İç LED, tek veya çift yüz", "Betonarme, ankraj bulonlu"],
      ["Yol kenarındaki işletmeler", "Otopark girişleri", "Cepheden görünmeyen mağazalar"],
      ["Çift yüzde iki yönden gelen trafik okur", "Gece 7/24 görünür", "Markayı yol seviyesine indirir"],
      "3 metreyi aşan totemlerde rüzgâr yükü hesabı ve belediye izni gerekir.",
    ),
    totem(
      ["Çelik iskelet, değiştirilebilir kasetler", "2–5 m", "Kaset başına iç LED", "Betonarme"],
      ["Birden çok firmanın olduğu plaza ve iş merkezleri", "AVM girişleri", "Kiracısı değişen ticari binalar"],
      ["Kiracı değişince yalnız ilgili kaset yenilenir", "Tek totemde çok marka düzenli görünür", "Uzun vadede en düşük yenileme maliyeti"],
      "Kaset ölçüleri baştan standart belirlenmeli; sonradan farklı boy eklemek zordur.",
    ),
    totem(
      ["Tek blok, ACP veya kompozit kaplama", "1,5–4 m", "Logo bölgesinde LED veya halo", "Betonarme"],
      ["Kurumsal genel merkezler", "Otel ve hastane girişleri", "Mimari bütünlük isteyen projeler"],
      ["Ek yeri görünmeyen, heykelsi görünüm", "Binanın mimarisiyle uyumlanır", "Prestij algısı yüksek"],
      "Tek parça göründüğü için yüzey hasarında onarım bütün paneli etkileyebilir.",
    ),
    totem(
      ["Çelik iskelet + ACP", "5–12 m", "İç LED + LED fiyat modülleri", "Derin betonarme, statik hesaplı"],
      ["Akaryakıt istasyonları", "LPG ve şarj istasyonları", "Yol üstü tesisler"],
      ["Fiyat kumanda ya da yazılımla değişir", "Uzak mesafeden okunan rakam boyları", "Dağıtıcı firmanın kimlik standardına göre üretim"],
      "Dağıtıcı firmanın onay süreci ve statik proje gerekir; takvimi çoğunlukla bunlar belirler.",
    ),
    totem(
      ["Taş, kompozit veya corten görünümlü kaplama", "1–3 m", "Halo harf veya zemin spotu", "Betonarme"],
      ["Konut siteleri", "Villa projeleri", "Toplu yaşam alanları"],
      ["Proje adını mimariyle uyumlu sunar", "Projenin değer algısına katkı sağlar", "Bakım ihtiyacı düşük"],
      "Satış dönemi ile kalıcı kullanım farklıdır; malzeme kalıcı kullanıma göre seçilmeli.",
    ),
    totem(
      ["Alüminyum profil + ACP", "1,2–2,5 m", "İsteğe bağlı iç LED", "Zemine ankraj"],
      ["Hastane ve üniversite kampüsleri", "Organize sanayi bölgeleri", "Büyük site ve AVM otoparkları"],
      ["Ziyaretçiyi soru sormadan yönlendirir", "Harita, ok ve bina listesi tek yüzeyde", "Aynı tasarımla seri üretime uygun"],
      "Hangi noktada ne yazacağı (yönlendirme planı) üretimden önce netleşmeli.",
    ),
    totem(
      ["Alüminyum, 8–15 cm derinlik", "1,5–3 m", "Kenar LED veya ışıksız", "Gömme ankraj plakası"],
      ["Dar kaldırımlar ve bina önleri", "Showroom ve ofis girişleri", "Modern mimariye sahip binalar"],
      ["Az yer kaplar, geçişi daraltmaz", "Zarif ve modern görünüm", "Hafif olduğu için küçük temel yeter"],
      "İnce gövde rüzgârlı açık alanlarda daha güçlü ankraj ister.",
    ),
  ],

  "lightbox-tabela": [
    box(
      ["Alüminyum profil, 3–12 cm", "Silikon kenarlı tekstil baskı", "Kenar veya arkadan LED", "Dakikalar içinde, kumaş çekilip takılır"],
      ["Mağaza içi büyük görseller", "Kampanyası sık değişen markalar", "Showroom ve fuar alanları"],
      ["Çok büyük ölçüler ek yeri olmadan", "Görsel ucuz ve hızlı yenilenir", "Işık dağılımı homojen"],
      "Kumaş iç mekân içindir; dış mekânda nem ve tozdan etkilenir.",
    ),
    box(
      ["Alüminyum, 3–5 cm", "Opal pleksi + backlit film", "Kenar LED", "Ön kapak açılıp film değişir"],
      ["Vitrinler", "Eczane ve optik mağazaları", "Kasa arkası duvarlar"],
      ["Çok ince, duvara yapışık görünür", "Pleksi yüzey silinebilir", "Enerji tüketimi düşük"],
      "Kenar aydınlatmalı olduğu için 1,5 m'yi aşan ölçülerde orta kısım daha sönük kalabilir.",
    ),
    box(
      ["Alüminyum, iki yüzü açık", "Pleksi veya kumaş, iki yüz", "İç LED", "Her yüz ayrı değişir"],
      ["AVM koridorları", "Mağaza içi bölüm başlıkları", "Tavandan asılı yönlendirme"],
      ["İki yönden gelen kalabalık aynı anda görür", "Tavanda durduğu için zemin kaplamaz", "Uzaktan dikkat çeker"],
      "Tavandaki taşıyıcı ve elektrik noktası önceden kontrol edilmeli.",
    ),
    box(
      ["Alüminyum, modüler", "Bölmeli backlit film", "İç LED", "Bölüm bölüm; fiyat değişince yalnız ilgili film"],
      ["Kafe ve restoranlar", "Fast-food ve büfeler", "Fırın ve pastaneler"],
      ["Ürün fotoğrafları iştah açıcı parlaklıkta görünür", "Fiyat değişiminde bütün pano yenilenmez", "Kasa arkasını verimli kullanır"],
      "Menü çok sık değişiyorsa uzun vadede dijital ekran daha ekonomik olabilir.",
    ),
    box(
      ["Hazır alüminyum profil", "Pleksi + film", "Kenar LED", "Klip çerçeveyle önden, saniyeler içinde"],
      ["Emlak ofisleri", "Vitrinde ilan gösteren işletmeler", "Hızlı kurulum isteyenler"],
      ["A4–A0 hazır ölçülerde hızlı teslim", "En ekonomik lightbox", "Görsel saniyeler içinde değişir"],
      "Hazır ölçülerin dışına çıkılamaz; özel ölçü için ince kasa pleksi seçilmeli.",
    ),
    box(
      ["Alüminyum, ayaklı gövde", "Tek veya çift yüz film ya da kumaş", "İç LED", "Önden kapak ya da kumaş"],
      ["Mağaza girişleri", "Fuar ve etkinlik alanları", "Otel lobileri"],
      ["Duvar gerektirmez, istenen yere taşınır", "Göz hizasında durduğu için dikkat çeker", "Kurulumu fişi takmak kadar kolay"],
      "Kalabalık alanlarda devrilmeye karşı ağırlıklı taban tercih edilmeli.",
    ),
    box(
      ["Alüminyum, contalı", "UV dayanımlı pleksi", "IP65 LED, dış mekân trafo", "Contalı kapak açılarak"],
      ["Cadde üstü menü ve fiyat panoları", "Açık otopark ve istasyonlar", "Bina dışı duyuru panoları"],
      ["Yağmura ve toza karşı contalı", "Güneşte solmayan yüzey", "Gece de okunan dış mekân duyurusu"],
      "Doğrudan yağmur alan yerlerde yıllık conta kontrolü önerilir.",
    ),
  ],

  "cephe-giydirme": [
    facade(
      ["4 mm alüminyum kompozit panel", "Alüminyum alt konstrüksiyon", "PVDF boya; yangına dayanıklı (FR) çekirdek seçeneği", "15–20 yıl"],
      ["Mağaza ve showroom cepheleri", "Bayi ve akaryakıt binaları", "Eski cephesini yenilemek isteyen binalar"],
      ["Geniş renk, ahşap ve metal desen seçeneği", "Hafif ve pürüzsüz yüzey", "Tabelayla aynı dilde bütün bir cephe"],
      "Çok katlı binalarda yangın yönetmeliği gereği FR çekirdekli panel kullanılmalı.",
    ),
    facade(
      ["Delikli PVC mesh, UV baskı", "Çelik halat veya profil gergi", "Rüzgâr geçirgen", "1–3 yıl"],
      ["İnşaat ve tadilattaki binalar", "Dönemsel kampanya cepheleri", "Çok büyük cephe reklamları"],
      ["Rüzgâr deliklerden geçer, yüksek cephede güvenli", "Metrekare maliyeti en düşük cephe çözümü", "İçeriden dışarısı görünmeye devam eder"],
      "Kalıcı değildir; güneş altında 2–3 yılda renkler açılır.",
    ),
    facade(
      ["Işık geçiren kompozit/pleksi veya lineer LED", "Alüminyum alt konstrüksiyon", "IP65 LED, dış mekân trafo", "LED 50.000 saat"],
      ["Gece de çalışan işletmeler", "Ana cadde köşe binaları", "Binasıyla öne çıkmak isteyen markalar"],
      ["Bina gece bir marka simgesine dönüşür", "Renk ve senaryo programlanabilir (RGB)", "Ayrı tabelaya gerek bırakmadan tanıtır"],
      "Elektrik projesi ve belediye onayı gerekir; enerji tüketimi baştan planlanmalı.",
    ),
    facade(
      ["Delikli alüminyum veya corten levha", "Çelik/alüminyum alt konstrüksiyon", "Elektrostatik boya", "20+ yıl"],
      ["Otopark ve endüstriyel yapılar", "Güneş kırıcı gereken cepheler", "Mimari vurgulu showroomlar"],
      ["Güneşi ve bakışı filtreler, havalandırmayı kesmez", "Delik deseniyle logo ya da desen oluşturulabilir", "Uzun ömürlü, bakımsız"],
      "Özel delik deseni tasarım ve kalıp süresi ister; teslim 3–4 haftaya uzayabilir.",
    ),
    facade(
      ["Ahşap desenli kompozit panel", "Alüminyum alt konstrüksiyon", "Çürümez, böceklenmez", "15+ yıl"],
      ["Kafe, restoran ve butikler", "Doğal görünüm isteyen konseptler", "Otel ve villa girişleri"],
      ["Ahşabın sıcaklığı, boya ve bakım derdi olmadan", "Nemde ve güneşte çarpılmaz", "ACP ile aynı montaj kolaylığı"],
      "Yakından bakıldığında desen tekrarı fark edilebilir; göz hizasında numuneyle seçilmeli.",
    ),
    facade(
      ["Kompakt lamine (HPL) 6–10 mm", "Alüminyum alt konstrüksiyon, gizli veya perçinli", "Darbeye ve çizilmeye dayanıklı", "20+ yıl"],
      ["Okul, hastane ve kamu binaları", "Zemine yakın, darbe alan cepheler", "Yoğun kullanılan girişler"],
      ["Darbeye ACP'den çok daha dayanıklı", "Grafiti ve kir kolay temizlenir", "Renk uzun yıllar solmaz"],
      "ACP'ye göre ağır ve pahalıdır; alt konstrüksiyon buna göre hesaplanmalı.",
    ),
    facade(
      ["Baskılı, one-way vision veya buzlu folyo", "Doğrudan cama uygulama", "Dış mekân folyosu", "3–5 yıl"],
      ["Mağaza vitrinleri", "Ofis cam bölmeleri", "Kampanya dönemindeki dükkânlar"],
      ["Bir günde uygulanır, iz bırakmadan sökülür", "İçeriden dışarısı görünmeye devam edebilir", "En hızlı cephe yenileme yolu"],
      "Güneş alan camlarda koyu folyo ısı birikimine yol açabilir; açık renk ya da delikli folyo tercih edilmeli.",
    ),
  ],

  "arac-giydirme": [
    wrap(
      ["Cast (döküm) araç folyosu + laminasyon", "Tavan dahil bütün gövde", "1–2 gün", "5–7 yıl"],
      ["Marka araçları ve food truck'lar", "Dikkat çekmesi gereken tanıtım araçları", "Filonun öncü araçları"],
      ["Araç baştan sona reklam yüzeyi olur", "Orijinal boyayı taştan ve güneşten korur", "Söküldüğünde boyada iz bırakmaz"],
      "Hasarlı ya da rötuşlu boyada söküm sırasında boya kalkabilir; uygulama öncesi kontrol edilir.",
    ),
    wrap(
      ["Cast veya polimerik folyo", "Yanlar ve arka, kısmi", "1 gün", "4–6 yıl"],
      ["Servis ve teslimat araçları", "Esnafın ticari araçları", "Bütçe ile görünürlüğü dengelemek isteyenler"],
      ["Tam kaplamanın etkisinin büyük kısmı, daha düşük maliyetle", "Aracın kendi rengi tasarımın parçası olur", "Hızlı uygulama"],
      "Tasarım aracın orijinal rengiyle birlikte kurgulanmalı; yoksa yarım kalmış gibi görünür.",
    ),
    wrap(
      ["Tek renk kesim folyo", "Logo, telefon, adres", "Birkaç saat", "5–8 yıl"],
      ["Esnaf ve ustalar", "Yeni ya da kiralık ticari araçlar", "Sade kurumsal görünüm isteyenler"],
      ["En ekonomik araç yazısı", "Aynı gün teslim", "Solmayan, uzun ömürlü renkler"],
      "Fotoğraf ya da renk geçişi yapılamaz; görsel isteniyorsa baskılı folyo gerekir.",
    ),
    wrap(
      ["Delikli one-way vision folyo", "Arka ve arka yan camlar", "1–3 saat", "1–2 yıl"],
      ["Minibüs ve servis araçları", "Arka camı reklam alanı yapmak isteyenler", "Ticari araçlar"],
      ["Dışarıdan baskı görünür, içeriden dışarısı görülür", "Camı da reklama katar", "Kolay değiştirilir"],
      "Ön cama ve ön yan camlara uygulanmaz; yalnızca mevzuata uygun alanlara yapılır.",
    ),
    wrap(
      ["Mat, saten, metalik veya krom renk folyosu", "Bütün gövde", "2–3 gün", "5–7 yıl"],
      ["Kişisel araçlar", "Marka rengine uyarlanan filo araçları", "Boya yaptırmak istemeyenler"],
      ["Boyanın aksine geri alınabilir", "Orijinal boyayı korur, ikinci el değerini düşürmez", "Boyada bulunmayan mat ve metalik efektler"],
      "Renk değişikliği ruhsata işlenmesi gereken bir değişiklik olabilir; uygulamadan önce kontrol edilmeli.",
    ),
    wrap(
      ["Cast/polimerik folyo, şablon tasarım", "Standart yerleşim", "Araç başına 1 gün, paralel ekip", "5–7 yıl"],
      ["Kargo, servis ve dağıtım filoları", "Belediye ve kurum araçları", "Şubeli işletmeler"],
      ["Her araçta birebir aynı görünüm", "Yeni araç şablondan hızla giydirilir", "Toplu üretimde birim maliyet düşer"],
      "Farklı marka ve model araçlar için şablonun her modele ayrıca uyarlanması gerekir.",
    ),
    wrap(
      ["Kesim veya reflektif şerit folyo", "Gövde çizgileri ve bantlar", "Birkaç saat", "5–8 yıl"],
      ["Ambulans, çekici ve servis araçları", "Sportif görünüm isteyen araçlar", "Kurumsal renk bandı uygulamaları"],
      ["Az malzemeyle güçlü görsel etki", "Reflektif şerit gece görünürlük ve güvenlik sağlar", "Hızlı ve ekonomik"],
      "Resmî araçlarda (ambulans vb.) şerit düzeni mevzuata bağlıdır; standart dışına çıkılmamalı.",
    ),
    wrap(
      ["Mıknatıslı levha + baskı", "Kapılar", "Anında takılır", "2–3 yıl"],
      ["Özel aracını iş için de kullananlar", "Geçici tanıtım dönemleri", "Kiralık araçlar"],
      ["Takıp çıkarmak saniyeler sürer", "Araca kalıcı müdahale yok", "En düşük maliyetli araç reklamı"],
      "Yalnız düz metal yüzeyde tutar; alüminyum ya da plastik kapılarda ve yüksek hızda uygun değildir.",
    ),
  ],

  "dijital-baski": [
    print(
      ["440–510 gr PVC branda", "Solvent / eco-solvent, 720 dpi", "Dış mekân, kuşgözlü veya gergili", "1–3 yıl"],
      ["Kampanya ve açılış duyuruları", "Cephe ve balkon reklamları", "Etkinlik alanları"],
      ["Büyük ölçüde en ekonomik baskı", "Suya ve rüzgâra dayanıklı", "Birkaç saatte hazır"],
      "Rüzgâr alan yüksek cephelerde mesh branda tercih edilmeli.",
    ),
    print(
      ["Delikli PVC mesh", "Solvent, dış mekân", "Yüksek cephe, iskele, çit", "1–2 yıl"],
      ["İnşaat iskele örtüleri", "Stadyum ve çit reklamları", "Rüzgârlı yüksek cepheler"],
      ["Rüzgâr yükünü belirgin azaltır", "Arkasındaki pencereler kapanmaz", "Büyük ölçülerde güvenli"],
      "Delikli yapı nedeniyle ince yazılar uzaktan zayıf okunur; yazılar kalın tasarlanmalı.",
    ),
    print(
      ["Delikli (%50) vinil folyo", "Eco-solvent + laminasyon", "Vitrin ve araç camları", "1–2 yıl"],
      ["Mağaza vitrinleri", "Banka ve ofis camları", "Toplu taşıma araçları"],
      ["Dışarıdan görsel, içeriden şeffaf", "Güneşi kısmen keser", "Camı reklama dönüştürür"],
      "Gece içerisi aydınlıkken dışarıdan içerisi görünür hale gelir.",
    ),
    print(
      ["Işık geçiren PET film", "Yüksek yoğunluklu mürekkep", "Lightbox ve ışıklı tabela yüzü", "2–4 yıl"],
      ["Lightbox görselleri", "Menü panoları", "AVM reklam panoları"],
      ["Işık altında canlı renkler", "Gündüz ve gece aynı etki", "Kolay değiştirilir"],
      "Renkler ışıkta farklı görünür; kutunun ölçüsü ve ışık yoğunluğu bilinmeden basılmamalı.",
    ),
    print(
      ["Tekstil tabanlı duvar kâğıdı veya vinil", "Lateks / UV, kokusuz", "İç mekân duvarları", "5–10 yıl"],
      ["Kafe, ofis ve mağaza iç mekânları", "Klinik ve çocuk alanları", "Konsept duvarlar"],
      ["Tek duvarla mekânın havası değişir", "Silinebilir yüzey seçenekleri", "Kokusuz baskı, hemen kullanılır"],
      "Duvar düz ve kuru olmalı; nemli duvarda önce yüzey hazırlığı gerekir.",
    ),
    print(
      ["Zemin folyosu", "Eco-solvent + kaymaz (R9/R10) laminasyon", "Mağaza, AVM ve fuar zeminleri", "Trafiğe göre 3–12 ay"],
      ["Yön ve sıra işaretleri", "Kampanya ve ürün tanıtımı", "Fuar standları"],
      ["Göz hizası dolu mekânda boş kalan alanı kullanır", "Kaymaz yüzeyle güvenli", "Kolay sökülür"],
      "Halı ve pürüzlü zeminde tutmaz; düz, temiz ve sert zemin gerekir.",
    ),
    print(
      ["Forex, dekota veya kompozit levha 3–10 mm", "Doğrudan UV baskı", "İç ve dış mekân pano", "3–5 yıl"],
      ["Bilgilendirme ve kapı levhaları", "Fuar ve mağaza içi panolar", "Emlak ve şantiye tabelaları"],
      ["Folyo yok; baskı doğrudan levhanın üstünde", "Kabarma ve hava kabarcığı olmaz", "Hızlı üretim"],
      "Dekota dış mekânda güneşten etkilenir; uzun süreli dış kullanım için kompozit levha seçilmeli.",
    ),
    print(
      ["Pamuk/polyester kanvas", "Pigment mürekkep", "Ahşap kasnağa gergi", "İç mekânda 20+ yıl"],
      ["Ofis ve otel dekorasyonu", "Kafe ve restoran duvarları", "Hediye ve kişisel baskılar"],
      ["Tablo dokusunda galeri görünümü", "Solmaya dayanıklı pigment mürekkep", "Çerçeveye gerek yok"],
      "Düşük çözünürlüklü fotoğraf büyük boyda bulanıklaşır; en az 150 dpi dosya gerekir.",
    ),
    print(
      ["Stand için PVC/polyester, afiş için kuşe", "Eco-solvent / dijital", "Taşınabilir stand, iç mekân", "Stand yıllarca, baskı 1–2 yıl"],
      ["Fuar ve etkinlikler", "Mağaza girişleri", "Toplantı ve lansmanlar"],
      ["Çantasıyla taşınır, bir dakikada kurulur", "Aynı gün teslim", "Görsel değişince yalnız baskı yenilenir"],
      "Dış mekânda rüzgârda devrilir; açık alan için su bidonlu ağır stand gerekir.",
    ),
  ],

  "kurumsal-kimlik": [
    brand(
      ["Ana logo, alternatif ve ikon versiyonları", "AI, PDF, SVG, PNG", "Seçilen yön üzerinde 3 tur", "1–3 hafta"],
      ["Yeni kurulan işletmeler", "Logosu eskimiş markalar", "Tabela öncesi kimliğini netleştirmek isteyenler"],
      ["Tabelada, araçta ve dijitalde aynı netlikte çalışır", "Küçük boyda okunurluk testinden geçer", "Vektörel, sınırsız büyütülebilir"],
      "Yenilemede mevcut tanınırlık korunmalı; logoyu tamamen değiştirmek her zaman doğru değildir.",
    ),
    brand(
      ["Logo kullanımı, renk, tipografi, yanlış kullanımlar", "PDF kılavuz + kaynak dosyalar", "2 tur", "2–3 hafta"],
      ["Şubeli işletmeler", "Ajans ve matbaayla çalışan markalar", "Kurumsallaşan KOBİ'ler"],
      ["Her tedarikçi aynı kurala göre üretir", "Pantone, CMYK ve RAL karşılıklarıyla renk sapmasını önler", "Yeni personele marka dilini öğretir"],
      "Kılavuz ancak uygulanırsa işe yarar; bütün tedarikçilere dağıtılmalı.",
    ),
    brand(
      ["Kartvizit, antetli kâğıt, zarf, dosya, fatura", "Baskıya hazır PDF", "2 tur", "1 hafta"],
      ["Yeni açılan işletmeler", "Kimliğini yenileyen firmalar", "Teklif ve sözleşmeyle çalışan sektörler"],
      ["Bütün evrak tek elden ve tutarlı", "Baskısı da aynı yerden yapılır", "Matbaaya hazır teknik dosya"],
      "Vergi no, MERSİS gibi yasal bilgiler tasarım aşamasında eksiksiz verilmeli.",
    ),
    brand(
      ["Ölçü, malzeme, ışık ve montaj detay çizimleri", "PDF + DWG", "2 tur", "2–3 hafta"],
      ["Zincir mağazalar ve franchise markalar", "Bayi ağı olan firmalar", "Farklı illerde şubesi olanlar"],
      ["Hangi ilde üretilirse üretilsin aynı tabela", "Tedarikçiden karşılaştırılabilir teklif almayı kolaylaştırır", "Farklı cephe tiplerine göre varyasyonlar"],
      "Standart, gerçek bir cephede denenmeden kesinleştirilmemeli.",
    ),
    brand(
      ["Model bazlı araç yerleşim çizimleri", "Baskıya hazır vektörel dosya", "2 tur", "1–2 hafta"],
      ["Filo sahibi firmalar", "Servis ve dağıtım şirketleri", "Bayi araçları"],
      ["Her araç modelinde aynı marka görünümü", "Farklı atölyelerde de aynı sonuç", "Yeni araç eklemek hızlanır"],
      "Araç marka, model ve yılı kesin bilinmeli; kapı ve kalıp çizgileri modele göre değişir.",
    ),
    brand(
      ["Kıyafet yerleşimi, yaka kartı, isimlik", "Nakış ve baskı için vektörel dosya", "2 tur", "1 hafta"],
      ["Restoran, otel ve mağaza personeli", "Sağlık kuruluşları", "Saha ekipleri"],
      ["Müşteri personeli anında tanır", "Nakış ve baskıya uygun sadeleştirilmiş logo", "Kıyafet üreticisine hazır dosya"],
      "Nakışta çok ince detaylar kaybolur; logonun nakış için sadeleştirilmesi gerekir.",
    ),
    brand(
      ["Gönderi, hikâye ve kapak şablonları", "Canva veya Figma/PSD, düzenlenebilir", "2 tur", "1 hafta"],
      ["Kendi paylaşımını yapan işletmeler", "Kampanyası sık olan markalar", "Instagram'da görünür olmak isteyenler"],
      ["Her paylaşım aynı kimlikte görünür", "Ajansa bağlı kalmadan kendin düzenlersin", "Tabela ile dijital dil tutarlı olur"],
      "Şablon içerik üretimi değildir; düzenli paylaşım işletmeye kalır.",
    ),
    brand(
      ["Sayfa düzeni, ürün sunumu, baskı dosyası", "Baskıya hazır PDF + dijital PDF", "2–3 tur", "1–2 hafta"],
      ["Kafe ve restoranlar", "Ürün kataloğu olan üreticiler", "Tanıtım broşürü kullanan hizmet firmaları"],
      ["Baskısı da tek elden", "QR menü için dijital sürüm", "Fiyat değişimine uygun, kolay güncellenen yapı"],
      "Ürün fotoğrafları zayıfsa tasarım da zayıf kalır; profesyonel çekim önerilir.",
    ),
    brand(
      ["Cephe, iç mekân, tabela ve iletişim standartları", "Kapsamlı PDF el kitabı + teknik çizimler", "3 tur", "3–6 hafta"],
      ["Franchise vermeye hazırlanan markalar", "Hızlı büyüyen zincirler", "Bayi sistemiyle çalışan firmalar"],
      ["Her yeni şube aynı deneyimi sunar", "Franchise alanın açılış süreci netleşir", "Marka değerini korur"],
      "Pilot bir şubede denenip düzeltilmeden bütün ağa yayılmamalı.",
    ),
  ],

  "etiket-sticker": [
    label(
      ["Kuşe, kraft, şeffaf veya metalize PP", "Kalıcı; gıdaya uygun seçenek", "Rulo veya tabaka, özel şekil", "Suya ve yağa karşı laminasyon seçeneği"],
      ["Gıda ve kozmetik üreticileri", "El yapımı ürün satanlar", "E-ticaret paketleri"],
      ["Rulo halinde etiket makinesine uygun", "Küçük adetlerde de ekonomik dijital baskı", "Özel şekil kesim"],
      "Soğuk zincirde ya da yağlı yüzeyde standart yapışkan tutmaz; kullanım ortamı baştan söylenmeli.",
    ),
    label(
      ["Şeffaf PVC/PET", "Kalıcı veya iz bırakmayan", "Kontur kesim", "Dış mekân 2–3 yıl"],
      ["Vitrin ve kapı camları", "Çalışma saatleri ve logo", "Kampanya duyuruları"],
      ["Camda zemin görünmez, yalnız tasarım kalır", "Beyaz alt baskıyla net renkler", "Kolay uygulama"],
      "Beyaz alt baskı olmadan açık renkler camda soluk görünür.",
    ),
    label(
      ["Tek renk vinil folyo", "Kalıcı", "Plotter kesim, ayıklama + transfer bant", "Dış mekân 5–8 yıl"],
      ["Vitrin yazıları", "Araç ve kapı üzeri logolar", "Duvar yazıları"],
      ["Zemin olmadığı için yalnız harfler görünür", "Solmaz, uzun ömürlü", "Ekonomik"],
      "1 cm'den küçük harfler ve çok ince çizgiler ayıklanamaz; tasarım kesime uygun olmalı.",
    ),
    label(
      ["Kumlama efektli folyo", "Kalıcı", "Düz, desenli veya logolu kesim", "İç mekân 7+ yıl"],
      ["Ofis cam bölmeleri", "Klinik ve banyo camları", "Toplantı odaları"],
      ["Işığı geçirir, görüşü kapatır", "Logolu desenle kurumsal görünüm", "Gerçek kumlamaya göre ucuz ve geri alınabilir"],
      "İçeriden aydınlatılan camlarda gece silüetler belli olur; tam gizlilik için opak folyo gerekir.",
    ),
    label(
      ["Zemin folyosu + kaymaz laminasyon", "Güçlü; iz bırakmayan seçenek", "Kontur kesim", "Trafiğe göre 3–12 ay"],
      ["Sıra ve mesafe işaretleri", "Yön okları", "Mağaza içi kampanyalar"],
      ["Kaymaz yüzey, güvenli", "Dikkat çeken zemin iletişimi", "İz bırakmadan sökülür"],
      "Forklift ve yoğun trafik alanında kısa sürede aşınır; endüstriyel zemin bandı gerekir.",
    ),
    label(
      ["Vinil + poliüretan reçine kabartma", "Güçlü, dış mekâna uygun", "Özel şekil", "Dış mekân 5+ yıl, UV dayanımlı"],
      ["Makine ve cihaz logoları", "Promosyon ürünleri", "Araç içi ve kapı etiketleri"],
      ["Üç boyutlu, premium dokunuş", "Çizilmeye ve suya dayanıklı", "Renkler reçine altında korunur"],
      "Büyük ölçülerde reçine akabilir; çoğunlukla 10 cm'nin altındaki etiketler için uygundur.",
    ),
    label(
      ["Void yazılı güvenlik vinili", "Kaldırılınca \"VOID\" izi bırakır", "Standart veya özel şekil", "İç mekân"],
      ["Garanti ve servis etiketleri", "Kargo ve kutu mühürleri", "Cihaz kasaları"],
      ["Açılma girişimini gösterir", "Numaralandırmayla takip edilir", "Sahteciliği zorlaştırır"],
      "Tek kullanımlıktır; yerinden oynatılan etiket yeniden yapıştırılamaz.",
    ),
    label(
      ["Polyester, alüminyum görünümlü veya PVC", "Güçlü, kalıcı", "Rulo, numaralı", "Silinmeye ve çizilmeye dayanıklı"],
      ["Okul, hastane ve kamu kurumları", "Envanter takibi yapan firmalar", "Depo ve üretim alanları"],
      ["Seri numara, barkod ya da QR ile basılır", "Taranabilir; sayım hızlanır", "Uzun ömürlü"],
      "Numara listesi baştan hazır olmalı; barkod tipi mevcut okuyucuya uygun seçilmeli.",
    ),
    label(
      ["Vinil veya kâğıt", "Kalıcı veya iz bırakmayan", "Kontur kesim, tabaka", "Kısa–orta süreli"],
      ["Açılış ve etkinlikler", "Ürün paketleri ve hediyeler", "Laptop ve telefon için marka stickerları"],
      ["Düşük maliyetle yayılan marka görünürlüğü", "Özel şekillerde kesim", "Hızlı üretim"],
      "Çok düşük adette birim maliyet yüksektir; birkaç yüz adetten itibaren ekonomikleşir.",
    ),
  ],

  "imalat-tasarim-montaj": [
    work(
      ["Cephe ölçüsü, taşıyıcı ve elektrik kontrolü", "Lazer metre, fotoğraf; gerekirse drone", "Ölçülü taslak ve net fiyat", "Samsun içinde 1–2 gün içinde"],
      ["Yeni tabela yaptıracak herkes", "Eski tabelasını yenileyecekler", "Ölçüsünden emin olmayanlar"],
      ["Ücretsiz ve bağlayıcı değil", "Sürpriz maliyet kalmaz", "Doğru ölçü, sorunsuz montaj demek"],
      "İlçe ve il dışı keşifler programa göre planlanır; tarih önceden konuşulmalı.",
    ),
    work(
      ["Tabelanın gerçek cephe fotoğrafına yerleşimi", "3D modelleme, gece ve gündüz görünüm", "Onay için görseller", "1–3 gün"],
      ["Karar vermeden önce görmek isteyenler", "Birden çok alternatifi karşılaştıranlar", "Ortak ya da yönetim onayı gereken işler"],
      ["Sonucu üretimden önce görürsün", "Boy ve renk hatası baştan önlenir", "Belediye ve AVM başvurusunda kullanılır"],
      "Simülasyon için cephenin karşıdan, düz çekilmiş net bir fotoğrafı gerekir.",
    ),
    work(
      ["Belediye reklam izni veya AVM teknik şartname onayı", "Proje çizimi, statik ve elektrik belgeleri", "Onaylı başvuru dosyası", "Kuruma göre 1–4 hafta"],
      ["Cadde tabelası yaptıranlar", "AVM mağazaları", "Totem ve büyük cephe işleri"],
      ["Ceza ve söküm riskini ortadan kaldırır", "Dosya şartnameye uygun hazırlanır", "Takibi biz yaparız"],
      "Süre kurumun takvimine bağlıdır; açılış tarihi buna göre planlanmalı.",
    ),
    work(
      ["Tasarım, imalat, montaj, elektrik bağlantısı", "Kendi atölyemiz ve montaj ekibimiz", "Çalışır durumda tabela", "İşe göre 5–15 iş günü"],
      ["Tek muhatap isteyenler", "Açılış tarihi belli olan işletmeler", "Birden çok tabela kalemi olan projeler"],
      ["Tek sorumlu, tek fatura", "Atölye ve montaj ekibi aynı çatı altında", "Garanti tek yerden"],
      "Elektrik hattının tabela noktasına kadar getirilmesi binaya ait bir iştir; önceden hazırlanmalı.",
    ),
    work(
      ["Yüksek cephe, çatı ve direk üstü montaj", "Sepetli vinç, iskele, iş güvenliği ekipmanı", "Güvenli ve sigortalı montaj", "Havaya bağlı, 1–2 gün"],
      ["Çok katlı bina cepheleri", "Çatı tabelaları", "Yüksek totemler"],
      ["Yüksekte çalışma eğitimli ekip", "Sigortalı iş", "Trafik ve çevre güvenliği önlemi"],
      "Sepetli araç için yol ya da kaldırım izni gerekebilir; rüzgârlı havada montaj yapılmaz.",
    ),
    work(
      ["Samsun'da imalat, başka illere nakliye ve montaj", "Kendi ekibimiz veya yerel iş ortağı", "Bütün şubelerde aynı kalite", "Rotaya göre planlanır"],
      ["Farklı illerde şubesi olan markalar", "Bayi ağları", "Tek tedarikçi isteyen zincirler"],
      ["Her şubede aynı ürün ve standart", "Nakliyeye uygun paketleme", "Toplu programla maliyet düşer"],
      "Şubelerin cephe ölçüleri ve fotoğrafları önceden toplanmalı.",
    ),
    work(
      ["Eski tabelanın sökümü, cephe onarımı, yeni montaj", "Sepetli araç, cephe tamir malzemesi", "Temiz cephe ve yeni tabela", "Çoğunlukla aynı gün"],
      ["Devren alınan dükkânlar", "Marka değiştiren işletmeler", "Tabelası eskimiş olanlar"],
      ["Eski tabelanın atığını biz alırız", "Cephedeki delik ve izler kapatılır", "Dükkân tabelasız kalmaz"],
      "Eski taşıyıcı paslanmışsa yeni tabelaya taşıyıcı değişimi de eklenmeli.",
    ),
    work(
      ["LED, trafo, kasa ve bağlantı kontrolü", "Mobil servis aracı", "Arıza tespiti ve onarım", "Arızada 24–48 saat"],
      ["Işıklı tabela kullanan bütün işletmeler", "Şubeli markalar", "Başka firmanın yaptığı tabelalar"],
      ["Sönen harf ve yanıp sönme hızlı çözülür", "Düzenli kontrolle tabelanın ömrü uzar", "Başka firmanın tabelasına da bakılır"],
      "Çok eski tabelalarda onarım yerine LED modülleri yenilemek daha ekonomik olabilir.",
    ),
    work(
      ["Onlarca şubeye aynı tabela ve iç mekân uygulaması", "Seri üretim, birden çok montaj ekibi", "Proje takvimi ve şube bazlı raporlama", "Şube sayısına göre planlanır"],
      ["Zincir market ve mağazalar", "Banka ve operatör şubeleri", "Franchise sistemleri"],
      ["Seri üretimle birim maliyet düşer", "Bütün şubelerde aynı dönemde yenileme mümkün", "Tek proje yöneticisi"],
      "Pilot şube uygulaması yapılmadan seri üretime geçilmemeli.",
    ),
  ],

  "yol-panolari": [
    road(
      ["Kenar profilli alüminyum levha", "Çift galvaniz direk", "Sınıf I veya II reflektif folyo", "Betonarme, statik hesaplı"],
      ["Fabrika ve OSB girişleri", "Otel ve tesis yönlendirmeleri", "Uzun mesafe yönlendirme"],
      ["Büyük yüzey, uzaktan okunur", "Rüzgâra karşı sağlam", "Gece farla okunur"],
      "Karayolu kenarındaki kurulumlar için ilgili kurumdan izin gerekir.",
    ),
    road(
      ["Alüminyum", "Galvaniz boru direk", "Reflektif folyo", "Beton gömme"],
      ["Site ve kampüs içi yollar", "İşletme yön tabelaları", "Kavşak yönlendirmeleri"],
      ["Ekonomik ve hızlı kurulum", "Az yer kaplar", "Standart ölçülerle seri üretim"],
      "Levha büyüdükçe tek direk yetmez; 1,5 m'yi aşan levhalarda çift direk önerilir.",
    ),
    road(
      ["Ok formunda kesilmiş alüminyum", "Direk veya duvar bağlantısı", "Reflektif folyo", "Direğe göre"],
      ["Restoran, otel ve tesis yönlendirmeleri", "Kavşakta birden çok yön", "Etkinlik alanları"],
      ["Yön tek bakışta anlaşılır", "Aynı direğe birden çok ok eklenir", "Kolay güncellenir"],
      "Bir direkte çok fazla ok okunurluğu düşürür; en fazla 4–5 ok önerilir.",
    ),
    road(
      ["Alüminyum", "Direk veya duvar", "Engineer grade, high intensity veya diamond grade", "Uygulamaya göre"],
      ["Gece trafiği olan yollar", "Şantiye ve tehlike uyarıları", "Otopark ve servis yolları"],
      ["Araç farıyla gece de gündüz gibi okunur", "Elektrik gerektirmez", "Standart levhalarla uyumlu"],
      "Yansıtma sınıfı yolun hızına göre seçilmeli; hızlı yollarda üst sınıf gerekir.",
    ),
    road(
      ["Alüminyum veya kompozit", "Dekoratif direk ya da profil", "İsteğe bağlı", "Beton gömme"],
      ["Konut siteleri", "Kampüsler", "Organize sanayi bölgeleri"],
      ["Ziyaretçi ve kargo doğru bloğa ulaşır", "Sitenin mimarisine uygun tasarım", "Bütün tabelalar tek dilde"],
      "Blok ve kapı numaraları yönetimle netleşmeden üretime geçilmemeli.",
    ),
    road(
      ["Kompozit veya alüminyum; karanlıkta parlayan seçenek", "Tavan askısı veya duvar", "Reflektif ya da ışıklı", "Tavan veya duvar bağlantısı"],
      ["AVM ve plaza otoparkları", "Hastane otoparkları", "Kapalı site otoparkları"],
      ["Kat ve bölge renk kodlamasıyla araç kolay bulunur", "Giriş, çıkış ve rampa trafiğini düzenler", "Karanlıkta okunur"],
      "Tavan yüksekliği sınırı ve yangın sprinkleri montajdan önce kontrol edilmeli.",
    ),
    road(
      ["Pleksi, alüminyum veya dekota", "Duvar, tavan veya kapı üstü", "Yok", "Vidalı veya bantlı"],
      ["Hastane ve klinikler", "Ofis ve plazalar", "Okul ve kamu binaları"],
      ["Kat planına göre eksiksiz set", "Kapı isimliklerinde değiştirilebilir sistem", "Mimariyle uyumlu malzeme"],
      "Oda ve birim adları sık değişiyorsa değiştirilebilir (insertli) sistem seçilmeli.",
    ),
    road(
      ["Karanlıkta parlayan (fotolüminesan) levha", "Duvar veya tavan", "Karanlıkta ışıma", "Vidalı"],
      ["Bütün işyerleri", "Otel, okul ve hastaneler", "Fabrika ve depolar"],
      ["Elektrik kesildiğinde de görünür", "Standart piktogramlar", "Yangın denetimlerine uygun"],
      "Yerleşim tahliye planına göre yapılmalı; mevzuata uygun sembol ve ölçü kullanılmalı.",
    ),
    road(
      ["Kompozit veya branda", "Çelik iskelet, çift direk", "İsteğe bağlı", "Beton veya ağırlık"],
      ["İnşaat şantiyeleri", "Kamu yatırımları", "Konut projesi satış alanları"],
      ["Zorunlu proje bilgilerini gösterir", "Aynı zamanda satış reklamıdır", "Proje bitince sökülüp yeniden kullanılabilir"],
      "Ruhsat numarası, yapı denetim gibi zorunlu bilgiler eksiksiz yazılmalı.",
    ),
  ],

  "led-ekranlar": [
    led(
      ["P4–P10 (izleme mesafesine göre)", "5.500–7.000 nit", "Ön yüz IP65", "İnternet üzerinden, uzaktan"],
      ["Cadde ve kavşak cepheleri", "AVM dış cepheleri", "Reklam alanı satmak isteyenler"],
      ["Gün ışığında bile net görüntü", "İçerik anında değişir, video oynatır", "Birden çok kampanya sırayla döner"],
      "Belediye izni ve elektrik altyapısı gerekir; parlaklık gece otomatik düşürülmeli.",
    ),
    led(
      ["P1.5–P3", "800–1.200 nit", "IP30 (iç mekân)", "Bilgisayar, USB veya bulut"],
      ["Mağaza ve showroomlar", "Toplantı ve konferans salonları", "Resepsiyon duvarları"],
      ["Çerçevesiz, istenen ölçüde tek görüntü", "Projeksiyondan çok daha parlak", "Uzun ömürlü"],
      "Yakından izleniyorsa küçük piksel aralığı şarttır; bu da maliyeti belirgin artırır.",
    ),
    led(
      ["P10, tek renk", "Dış mekân seviyesi", "IP54–IP65", "Bilgisayar veya telefon uygulaması"],
      ["Eczane ve esnaf", "Döviz ve fiyat duyuruları", "Vitrin üstü kampanya duyuruları"],
      ["En ekonomik LED çözüm", "Mesaj anında değişir", "Düşük enerji tüketimi"],
      "Yalnız yazı gösterir; görsel ve video için tam renkli ekran gerekir.",
    ),
    led(
      ["7 segment rakam modülü", "Dış mekân seviyesi", "IP65", "Kumanda veya yazılım"],
      ["Akaryakıt istasyonları", "Döviz büroları", "Kuyumcular"],
      ["Uzaktan okunan büyük rakamlar", "Fiyat saniyeler içinde güncellenir", "Totemle birlikte üretilir"],
      "Rakam boyu okunma mesafesine göre seçilmeli; totem tasarımıyla birlikte planlanmalı.",
    ),
    led(
      ["P1.8–P2.5", "1.500–2.500 nit (vitrin)", "İç mekân", "USB, Wi-Fi veya bulut"],
      ["Vitrinler", "Mağaza içi tanıtım", "Kafe ve restoran girişleri"],
      ["Tak-çalıştır, montaj gerektirmez", "Vitrin camının arkasından bile okunur", "Birden çok poster senkron çalışır"],
      "Güneş alan vitrinde yeterli parlaklık için yüksek nit'li model seçilmeli.",
    ),
    led(
      ["P3–P6", "5.000+ nit", "IP65, havalandırmalı gövde", "Uzaktan içerik yönetimi"],
      ["Yol kenarı işletmeler", "AVM ve otopark girişleri", "Kampüs ve fuar alanları"],
      ["İki yönden gelen trafiğe ayrı içerik", "Totem gövdesinde sabit marka alanı", "Göz hizasında dikkat çeker"],
      "Çift ekran ve havalandırma nedeniyle elektrik ihtiyacı yüksektir; temel ve besleme birlikte planlanmalı.",
    ),
    led(
      ["P2.5–P6", "İç ya da dış mekâna göre", "Konuma göre", "Tek görüntü, senkron"],
      ["Bina köşeleri", "AVM atriyumları", "Etkinlik sahneleri"],
      ["3D (anamorfik) içerikle çarpıcı etki", "Köşeden iki cadde birden görür", "Mimaride dikkat çeken bir öğe"],
      "Anamorfik 3D içerik özel üretim ister; içerik bütçesi ayrıca planlanmalı.",
    ),
    led(
      ["P2.9–P3.9 (sahne)", "İç ve dış mekân seçeneği", "Kiralık kasa sistemi", "Teknik ekiple"],
      ["Konser ve düğünler", "Lansman ve toplantılar", "Fuar ve spor etkinlikleri"],
      ["Satın almadan büyük ekran", "Kurulum, operasyon ve söküm dahil", "Ölçü etkinliğe göre ayarlanır"],
      "Tarih önceden rezerve edilmeli; yoğun sezonda ekipman erken dolar.",
    ),
    led(
      ["Rakam modülü veya tam renkli", "Salon veya açık saha seviyesi", "Darbeye dayanıklı ön yüz", "Masa kontrol ünitesi"],
      ["Spor salonları", "Okul ve üniversite sahaları", "Belediye tesisleri"],
      ["Skor, süre ve faul tek panoda", "Masadan anlık güncelleme", "Reklam alanı eklenebilir"],
      "Resmî müsabakalarda federasyonun pano şartlarına uygunluk kontrol edilmeli.",
    ),
  ],
};
