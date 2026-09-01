import type { Locale } from "@/i18n/routing";

/**
 * REHBER YAZILARI (BLOG)
 *
 * GEO stratejisinin ana motoru. Her yazı:
 *  - "cevap-önce" bir `answer` paragrafıyla açılır (LLM'ler bunu alıntılar),
 *  - soru biçiminde H2 başlıklar kullanır,
 *  - mümkün olduğunda tablo içerir (yapılandırılmış içerik daha çok alıntılanır),
 *  - satış metni değil, karar verdiren bilgi sunar.
 *
 * NOT: `published` tarihleri yayına alınırken gerçek yayın tarihleriyle
 * güncellenmelidir.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; text: string };

export interface PostCopy {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** GEO: alıntılanabilir açılış tanımı */
  answer: string;
  keywords: string[];
  body: Block[];
}

export interface Post {
  id: string;
  slug: Record<Locale, string>;
  published: string;
  updated?: string;
  readingMinutes: number;
  /** İlgili hizmet sayfasına iç link için */
  relatedServiceIds: string[];
  copy: Record<Locale, PostCopy>;
}

export const posts: Post[] = [
  {
    id: "tabela-fiyatlari-nasil-hesaplanir",
    slug: {
      tr: "samsun-tabela-fiyatlari-nasil-hesaplanir",
      en: "how-sign-prices-are-calculated",
    },
    published: "2026-06-12",
    readingMinutes: 7,
    relatedServiceIds: ["isikli-tabela", "kutu-harf-tabela", "totem-tabela"],
    copy: {
      tr: {
        title: "Samsun'da Tabela Fiyatları Nasıl Hesaplanır?",
        metaTitle: "Samsun Tabela Fiyatları Nasıl Hesaplanır? | Royal Reklam Samsun",
        metaDescription:
          "Tabela fiyatını belirleyen kalemler: metraj, kasa derinliği, malzeme, LED sayısı ve montaj. Teklifleri karşılaştırırken nelere bakmalısınız?",
        excerpt:
          "Aynı tabela için gelen iki teklif arasında iki kat fark olabiliyor. Bu farkın nereden geldiğini kalem kalem açıklıyoruz.",
        answer:
          "Tabela fiyatı metrekare üzerinden başlar ve beş ana kalemle şekillenir: toplam yüzey alanı, kasa derinliği ve konstrüksiyon, yüzey malzemesi, aydınlatma yoğunluğu ve montaj koşulları. İki teklif arasındaki fark genellikle malzeme sınıfından ve montaj yönteminden kaynaklanır, kâr marjından değil.",
        keywords: [
          "samsun tabela fiyatları",
          "tabela fiyat hesaplama",
          "ışıklı tabela fiyatı",
          "kutu harf fiyatı",
          "tabela metrekare fiyatı",
        ],
        body: [
          {
            type: "p",
            text: "Tabela yaptıracak hemen herkes aynı soruyla başlıyor: metrekaresi kaç para? Cevabı zor olan bir soru bu, çünkü tabela bir metre kumaş gibi tek fiyatlı bir ürün değil. Aynı ölçüdeki iki tabelanın maliyeti, kullanılan malzemeye ve monte edileceği yere göre iki katına kadar farklılaşabiliyor.",
          },
          {
            type: "p",
            text: "Aşağıda, bir teklifin içindeki kalemleri tek tek açıyoruz. Amaç sizi bize yönlendirmek değil; hangi teklifin gerçekten ucuz, hangisinin sadece eksik olduğunu ayırt edebilmeniz.",
          },
          { type: "h2", text: "1. Toplam yüzey alanı (metraj)" },
          {
            type: "p",
            text: "Fiyatın başlangıç noktası budur. 4 metre x 80 santimetre bir cephe tabelası 3,2 m² eder. Ancak metrekare fiyatı sabit değildir: küçük tabelalarda birim maliyet yüksektir, çünkü kesim, kaynak ve kurulum süresi metrajla doğru orantılı azalmaz. 1 m²'lik bir tabelanın metrekare fiyatı, 10 m²'lik bir tabelanınkinden belirgin şekilde yüksek çıkar.",
          },
          { type: "h2", text: "2. Kasa derinliği ve taşıyıcı konstrüksiyon" },
          {
            type: "p",
            text: "Işıklı bir tabelada kasa derinliği hem malzeme miktarını hem de aydınlatma kalitesini belirler. Sığ bir kasada LED'ler yüzeye çok yakın kalır ve pleksi üzerinde nokta nokta parlak lekeler oluşur. Derinlik arttıkça ışık yayılır, yüzey homojenleşir — ama alüminyum profil tüketimi de artar.",
          },
          {
            type: "p",
            text: "Totem gibi zemine oturan işlerde bu kalem daha da ağırlaşır: rüzgâr yüküne göre hesaplanmış çelik konstrüksiyon, betonarme temel ve gerekiyorsa zemin iyileştirmesi toplam bedelin önemli bir kısmını oluşturur.",
          },
          { type: "h2", text: "3. Yüzey malzemesi" },
          {
            type: "p",
            text: "En çok gizli fark burada saklanır. Teklifte yalnızca 'pleksi' yazıyorsa eksik bilgi verilmiş demektir; kalınlık ve tip belirtilmelidir.",
          },
          {
            type: "table",
            head: ["Malzeme", "Tipik kullanım", "Dikkat edilmesi gereken"],
            rows: [
              ["Pleksiglas 3 mm", "Küçük ve orta ölçekli ışıklı tabela", "Geniş yüzeylerde sarkma yapabilir"],
              ["Pleksiglas 5 mm", "Büyük cephe tabelaları, kutu harf", "Daha ağır, taşıyıcı gereksinimi artar"],
              ["Alüminyum kompozit 3–4 mm", "Işıksız cephe ve kaplama", "Yangın sınıfı teklifte yazmalı"],
              ["Vinil / folyo yüzey", "Geçici ve bütçe odaklı işler", "UV laminasyonsuz kısa ömürlü"],
            ],
          },
          { type: "h2", text: "4. Aydınlatma: LED sayısı ve sınıfı" },
          {
            type: "p",
            text: "LED modüller metre başına belirli aralıklarla dizilir. Aralığı açmak maliyeti düşürür ama yüzeyde gölge bantları oluşturur. Ayrıca dış mekân için IP65 korumalı modül kullanılmalıdır; iç mekân modülü kullanılan bir tabela ilk kışta su alır.",
          },
          {
            type: "ul",
            items: [
              "Modül aralığı kasa derinliğine göre hesaplanmalı, standart bir sayıya sabitlenmemeli.",
              "Trafo (sürücü) kapasitesi toplam yükün en az %20 üzerinde seçilmeli.",
              "Dış mekânda IP65 altındaki modüller kullanılmamalı.",
            ],
          },
          { type: "h2", text: "5. Montaj koşulları" },
          {
            type: "p",
            text: "Çoğu teklifte en çok tahmin hatası yapılan kalem budur. Zeminden erişilebilen bir cephe ile üçüncü kattaki bir cephe aynı işçilik değildir. Sepetli araç kirası, cephe iskelesi kurulumu, trafiğe kapatma izni ve yüksekte çalışma sigortası doğrudan maliyete girer.",
          },
          {
            type: "note",
            text: "Teklifi alırken montaj yönteminin yazılı olarak belirtilmesini isteyin. 'Montaj dâhil' ifadesi, sepetli araç gerektiğinde ek fatura çıkmayacağı anlamına gelmeyebilir.",
          },
          { type: "h2", text: "İki teklifi doğru karşılaştırmanın yolu" },
          {
            type: "p",
            text: "Fiyatları yan yana koymadan önce her iki teklifin de şu beş bilgiyi içerdiğinden emin olun: yüzey malzemesinin cinsi ve kalınlığı, kasa malzemesi ve derinliği, LED modül markası ve IP sınıfı, montaj yöntemi, garanti süresi ve kapsamı. Bu beş kalem yazılı değilse karşılaştırdığınız şey fiyat değil, sadece bir rakamdır.",
          },
          {
            type: "p",
            text: "Royal Reklam olarak Samsun içinde yerinde keşif yapıyor, ölçü ve koşulları gördükten sonra bu kalemlerin hepsini yazılı olarak içeren bir teklif hazırlıyoruz. Keşif ücretsizdir ve teklif bağlayıcı değildir.",
          },
        ],
      },
      en: {
        title: "How Are Sign Prices Calculated?",
        metaTitle: "How Are Sign Prices Calculated? | Royal Reklam Samsun",
        metaDescription:
          "What drives a sign's price: area, cabinet depth, materials, LED density and installation. How to compare two quotes properly.",
        excerpt:
          "Two quotes for the same sign can differ by a factor of two. Here is exactly where that difference comes from.",
        answer:
          "Sign pricing starts per square metre and is shaped by five factors: total surface area, cabinet depth and structure, face material, lighting density, and installation conditions. The gap between two quotes usually comes from material grade and access method rather than margin.",
        keywords: [
          "sign prices",
          "signage cost calculation",
          "illuminated sign price",
          "channel letter cost",
        ],
        body: [
          {
            type: "p",
            text: "Almost everyone commissioning a sign starts with the same question: what is the price per square metre? It is a hard question to answer, because a sign is not a fixed-price commodity. Two signs of identical size can differ in cost by a factor of two depending on materials and where they must be installed.",
          },
          { type: "h2", text: "1. Total surface area" },
          {
            type: "p",
            text: "This is the starting point, but the per-square-metre rate is not constant. On small signs the unit cost is higher, because cutting, welding and setup time do not shrink proportionally with area.",
          },
          { type: "h2", text: "2. Cabinet depth and structure" },
          {
            type: "p",
            text: "Depth governs both material volume and lighting quality. In a shallow cabinet the LEDs sit too close to the face and produce bright spots. Greater depth diffuses the light evenly — at the cost of more aluminium profile. For totems, wind-load-engineered steel and a reinforced foundation form a substantial share of the total.",
          },
          { type: "h2", text: "3. Face material" },
          {
            type: "p",
            text: "This is where hidden differences live. A quote that only says 'acrylic' is incomplete — thickness and type must be stated.",
          },
          {
            type: "table",
            head: ["Material", "Typical use", "Watch out for"],
            rows: [
              ["Acrylic 3 mm", "Small to mid-size illuminated signs", "Can bow across wide spans"],
              ["Acrylic 5 mm", "Large shopfronts, channel letters", "Heavier, needs more support"],
              ["Composite 3–4 mm", "Non-illuminated façades and cladding", "Fire class must be stated"],
              ["Vinyl film face", "Temporary and budget work", "Short-lived without UV laminate"],
            ],
          },
          { type: "h2", text: "4. Lighting: LED count and rating" },
          {
            type: "p",
            text: "Modules are spaced at set intervals. Widening the spacing lowers cost but creates shadow banding. Outdoor work requires IP65-rated modules; a sign built with indoor modules will take water in its first winter.",
          },
          {
            type: "ul",
            items: [
              "Module spacing should follow cabinet depth, not a fixed number.",
              "Driver capacity should exceed total load by at least 20%.",
              "Nothing below IP65 belongs outdoors.",
            ],
          },
          { type: "h2", text: "5. Installation conditions" },
          {
            type: "p",
            text: "This is where quotes most often go wrong. A façade reachable from the ground is not the same job as one on the third floor. Cherry picker hire, scaffold, road closure permits and working-at-height insurance all enter the cost.",
          },
          {
            type: "note",
            text: "Ask for the installation method to be stated in writing. 'Installation included' does not always mean no extra invoice when a cherry picker turns out to be necessary.",
          },
          { type: "h2", text: "Comparing two quotes properly" },
          {
            type: "p",
            text: "Before putting prices side by side, check that both quotes state five things: face material type and thickness, cabinet material and depth, LED brand and IP rating, installation method, and warranty term and scope. Without those, you are comparing numbers, not offers.",
          },
        ],
      },
    },
  },

  {
    id: "kutu-harf-mi-kompozit-tabela-mi",
    slug: {
      tr: "kutu-harf-mi-isikli-kompozit-tabela-mi",
      en: "channel-letters-vs-composite-signs",
    },
    published: "2026-07-08",
    readingMinutes: 6,
    relatedServiceIds: ["kutu-harf-tabela", "isikli-tabela", "cephe-giydirme"],
    copy: {
      tr: {
        title: "Kutu Harf mi, Işıklı Kompozit Tabela mı?",
        metaTitle: "Kutu Harf mi Işıklı Kompozit Tabela mı? | Royal Reklam Samsun",
        metaDescription:
          "İki tabela tipinin görünüm, maliyet, ömür ve bakım açısından karşılaştırması. Hangi işletmeye hangisi uygun?",
        excerpt:
          "Cephe bütçenizi doğru yere harcamak için iki seçeneğin gerçek farklarını bilmeniz gerekiyor.",
        answer:
          "Kutu harf, her harfin ayrı bir hacim olarak üretilip cepheye tek tek monte edildiği tabela tipidir; kompozit kasa tabelada ise tüm yazı tek bir ışıklı panel üzerindedir. Kutu harf daha prestijli görünür ve uzun ömürlüdür, kompozit tabela ise daha ekonomiktir ve daha hızlı üretilir.",
        keywords: [
          "kutu harf mi kompozit mi",
          "kutu harf tabela",
          "ışıklı kompozit tabela",
          "tabela karşılaştırma",
        ],
        body: [
          {
            type: "p",
            text: "Cephe kararı verirken en sık karşılaştığımız ikilem bu. İki seçenek de ışıklıdır, ikisi de yıllarca dayanır, ama yarattıkları algı ve maliyetleri birbirinden oldukça farklıdır.",
          },
          { type: "h2", text: "Temel yapısal fark nedir?" },
          {
            type: "p",
            text: "Kompozit kasa tabelada tek bir dikdörtgen kutu vardır; markanın adı bu kutunun ön yüzeyine basılır veya folyo ile uygulanır. Kutu harfte ise her harf kendi derinliği, kendi LED'i ve kendi montaj noktası olan bağımsız bir gövdedir. Cephe duvarı harflerin arasından görünür.",
          },
          { type: "h2", text: "Görünüş ve algı" },
          {
            type: "p",
            text: "Kutu harf, cephede gölge ve derinlik oluşturur. Gündüz bile — ışıklar kapalıyken — hacimli bir yazı olarak okunur. Kompozit kasa tabela gündüz düz bir dikdörtgen olarak görünür; asıl etkisini karanlıkta gösterir.",
          },
          { type: "h2", text: "Maliyet ve süre" },
          {
            type: "table",
            head: ["Kriter", "Kutu Harf", "Işıklı Kompozit Kasa"],
            rows: [
              ["Göreli maliyet", "Daha yüksek", "Daha ekonomik"],
              ["İmalat süresi", "7–12 iş günü", "5–10 iş günü"],
              ["Gündüz görünüm", "Hacimli, gölgeli", "Düz yüzey"],
              ["Gece görünüm", "Harf bazında ışık, halo seçeneği", "Tüm yüzey homojen ışık"],
              ["Cephe uyumu", "Taş, ahşap, koyu cephelerde çok güçlü", "Düz ve açık cephelerde iyi"],
              ["Yazı değişikliği", "Harf bazında müdahale gerekir", "Yüzey folyosu değiştirilir"],
            ],
          },
          { type: "h2", text: "Hangi durumda hangisi?" },
          {
            type: "ul",
            items: [
              "Kurumsal algı önceliğinizse ve cepheniz taş/ahşap/koyu renkliyse: kutu harf.",
              "Bütçe sınırlıysa ve yazı uzun, çok kelimeli ise: kompozit kasa.",
              "Kampanya veya slogan gibi metni sık değiştirecekseniz: kompozit kasa (folyo değişimi kolaydır).",
              "AVM içindeyseniz: AVM kılavuzunu kontrol edin — birçok AVM yalnızca kutu harfe izin verir.",
              "Cephe çok yüksekteyse ve uzaktan okunacaksa: geniş yüzeyli kompozit kasa daha okunaklı olabilir.",
            ],
          },
          { type: "h2", text: "Bakım ve uzun vadeli maliyet" },
          {
            type: "p",
            text: "Kutu harfte bir harfin LED'i arızalanırsa yalnızca o harfe müdahale edilir; diğerleri çalışmaya devam eder. Kompozit kasada arıza tüm yüzeyi etkileyebilir. Öte yandan kompozit kasanın yüzeyini yenilemek (rebranding) çok daha ucuzdur — folyo değişir, kasa kalır.",
          },
          {
            type: "note",
            text: "Ara bir çözüm de mümkün: logo kısmını kutu harf, alt açıklama satırını kompozit kasa olarak uygulamak hem bütçeyi hem de algıyı dengeler. Samsun'da bu karma çözümü sık uyguluyoruz.",
          },
        ],
      },
      en: {
        title: "Channel Letters or an Illuminated Composite Cabinet?",
        metaTitle: "Channel Letters vs Composite Cabinet Signs | Royal Reklam Samsun",
        metaDescription:
          "A comparison of the two sign types across appearance, cost, lifespan and maintenance — and which suits which business.",
        excerpt:
          "To spend a façade budget well, you need to know how the two options really differ.",
        answer:
          "Channel letters are individually fabricated three-dimensional letters mounted separately on a façade, whereas a composite cabinet carries the whole wordmark on one illuminated panel. Channel letters look more premium and last longer; composite cabinets are cheaper and faster to produce.",
        keywords: [
          "channel letters vs composite",
          "channel letter signs",
          "illuminated cabinet sign",
        ],
        body: [
          {
            type: "p",
            text: "This is the most common dilemma we meet when a façade decision is being made. Both options are illuminated and both last for years, but the perception they create and their costs differ considerably.",
          },
          { type: "h2", text: "The structural difference" },
          {
            type: "p",
            text: "A composite cabinet is a single rectangular box with the brand name printed or applied to its face. With channel letters, each letter is an independent body with its own depth, LEDs and fixings — the wall shows between the letters.",
          },
          { type: "h2", text: "Appearance" },
          {
            type: "p",
            text: "Channel letters create shadow and relief on the façade. Even in daylight with the lights off, they read as dimensional type. A composite cabinet reads as a flat rectangle by day and does its real work after dark.",
          },
          { type: "h2", text: "Cost and lead time" },
          {
            type: "table",
            head: ["Criterion", "Channel Letters", "Illuminated Composite Cabinet"],
            rows: [
              ["Relative cost", "Higher", "More economical"],
              ["Lead time", "7–12 business days", "5–10 business days"],
              ["Daytime look", "Dimensional, shadowed", "Flat surface"],
              ["Night look", "Per-letter light, halo option", "Even light across the face"],
              ["Façade fit", "Excellent on stone, timber, dark walls", "Good on flat, light walls"],
              ["Changing the wording", "Letter-by-letter work", "Replace the face graphic"],
            ],
          },
          { type: "h2", text: "Which one, when?" },
          {
            type: "ul",
            items: [
              "Corporate perception matters and your façade is stone, timber or dark: channel letters.",
              "Budget is tight and the wording is long: composite cabinet.",
              "You will change the message often: composite cabinet — the graphic is easy to swap.",
              "You are inside a shopping mall: check the façade guidelines; many permit channel letters only.",
              "The sign is high up and read from a distance: a large composite face can be more legible.",
            ],
          },
          { type: "h2", text: "Maintenance and long-term cost" },
          {
            type: "p",
            text: "If a channel letter's LEDs fail, only that letter is serviced while the rest keep working. On a composite cabinet a fault can affect the whole face. Conversely, refreshing a composite face for a rebrand is far cheaper — the graphic changes and the cabinet stays.",
          },
          {
            type: "note",
            text: "A hybrid also works: channel letters for the logo and a composite cabinet for the descriptor line balances budget against perception.",
          },
        ],
      },
    },
  },

  {
    id: "tabela-belediye-izni",
    slug: {
      tr: "samsun-tabela-belediye-izni-rehberi",
      en: "signage-permits-in-samsun",
    },
    published: "2026-08-14",
    readingMinutes: 5,
    relatedServiceIds: ["isikli-tabela", "totem-tabela", "imalat-tasarim-montaj"],
    copy: {
      tr: {
        title: "Tabela İçin Belediye İzni: Samsun'da Bilmeniz Gerekenler",
        metaTitle: "Samsun Tabela Belediye İzni Rehberi | Royal Reklam Samsun",
        metaDescription:
          "Tabela için hangi izinler gerekir, hangi evraklar istenir, süreç nasıl işler? Samsun'da tabela izni hakkında pratik rehber.",
        excerpt:
          "İzinsiz asılan bir tabela sökülebilir. Süreci baştan doğru kurmak, sonradan iki kez ödemekten ucuzdur.",
        answer:
          "Türkiye'de cepheye asılan tabelalar ilan ve reklam vergisine tabidir ve ilgili ilçe belediyesinden izin alınması gerekir. Samsun'da başvuru, işletme adına yapılır; tabelanın ölçülerini, malzemesini ve cephedeki konumunu gösteren teknik çizim ile görselleştirme istenir. İzinsiz uygulamalarda söküm ve ceza riski vardır.",
        keywords: [
          "samsun tabela izni",
          "tabela belediye izni",
          "ilan reklam vergisi",
          "tabela ruhsatı samsun",
        ],
        body: [
          {
            type: "p",
            text: "Tabela sürecinde en çok atlanan adım izin. Çoğu işletme sahibi tabelayı astırdıktan sonra öğreniyor — ve o noktada söküp yeniden yaptırmak, baştan doğru yapmanın iki katına mal oluyor.",
          },
          { type: "h2", text: "Hangi tabelalar izne tabi?" },
          {
            type: "p",
            text: "Genel kural şu: kamuya açık alandan görülen her tanıtım levhası ilan ve reklam kapsamındadır. Cephe tabelası, totem, çatı tabelası, vitrin folyosu ve bina üzerindeki logolar bu kapsama girer. Dükkân içinde kalan, dışarıdan görülmeyen yönlendirmeler genellikle kapsam dışıdır.",
          },
          { type: "h2", text: "Başvuru için genellikle istenen evraklar" },
          {
            type: "ul",
            items: [
              "İşletme sahibinin kimlik ve vergi levhası bilgileri",
              "İşyeri açma ve çalışma ruhsatı",
              "Tabelanın ölçülerini gösteren teknik çizim",
              "Tabelanın cepheye yerleştirilmiş hâlini gösteren görselleştirme",
              "Kira sözleşmesi veya tapu (cephe kullanım hakkı için)",
              "Bina yönetiminden muvafakat (ortak cephe kullanımlarında)",
            ],
          },
          {
            type: "note",
            text: "İstenen evrak listesi ilçeden ilçeye ve yıl içinde değişebilir. Başvuru öncesinde ilgili ilçe belediyesinin ruhsat ve denetim müdürlüğünden güncel listeyi teyit etmek gerekir.",
          },
          { type: "h2", text: "Ölçü ve görünüm kısıtları" },
          {
            type: "p",
            text: "Belediyeler genellikle tabelanın cepheden ne kadar taşabileceğini, kaç metrekareyi geçemeyeceğini ve hangi yükseklikte durabileceğini kurala bağlar. Bazı cadde ve meydanlarda ise kentsel tasarım rehberi devreye girer; renk ve malzeme bile sınırlanabilir. Tarihi doku içindeki sokaklarda kurallar belirgin şekilde daha sıkıdır.",
          },
          { type: "h2", text: "AVM içindeki mağazalar" },
          {
            type: "p",
            text: "AVM içindeyseniz iki ayrı onay söz konusudur: belediye izni ve AVM yönetiminin cephe kılavuzuna uygunluk onayı. AVM kılavuzları çoğu zaman belediyeden daha katıdır — harf yüksekliği, kutu derinliği, cepheden taşma ve aydınlatma parlaklığı ayrı ayrı sınırlanır. Kılavuzu imalattan önce edinmek şarttır.",
          },
          { type: "h2", text: "Süreç nasıl işler?" },
          {
            type: "p",
            text: "Sıralama şöyledir: keşif ve ölçü → tasarım → teknik çizim ve görselleştirmenin hazırlanması → belediyeye başvuru → izin sonrası imalat → montaj. İmalata izinden önce başlamak risklidir; ölçü veya konum reddedilirse üretilmiş tabela kullanılamaz.",
          },
          {
            type: "p",
            text: "Royal Reklam olarak başvuru için gereken teknik çizim, ölçü ve görselleştirmeyi hazırlıyoruz. Resmî başvurunun işletme adına yapılması gerektiği için evrak setini size teslim ediyor, süreç boyunca sorularınıza cevap veriyoruz.",
          },
        ],
      },
      en: {
        title: "Signage Permits in Samsun: What You Need to Know",
        metaTitle: "Signage Permit Guide for Samsun | Royal Reklam Samsun",
        metaDescription:
          "Which permits a sign needs, what documents are requested and how the process runs — a practical guide to signage permits in Samsun.",
        excerpt:
          "A sign installed without permission can be taken down. Getting the process right first is cheaper than paying twice.",
        answer:
          "In Türkiye, signs mounted on façades are subject to advertising tax and require permission from the relevant district municipality. In Samsun the application is made in the business's name and requires technical drawings showing dimensions, materials and position on the façade. Unpermitted installations risk removal and penalties.",
        keywords: [
          "signage permit samsun",
          "sign permit turkey",
          "advertising tax turkey",
        ],
        body: [
          {
            type: "p",
            text: "Permits are the most commonly skipped step. Many business owners learn about them after the sign is up — at which point removing and redoing the work costs twice what doing it correctly would have.",
          },
          { type: "h2", text: "Which signs need permission?" },
          {
            type: "p",
            text: "The general rule: any sign visible from public space falls under advertising regulation. Shopfront signs, totems, roof signs, window graphics and logos on buildings are all included. Interior wayfinding not visible from outside is usually exempt.",
          },
          { type: "h2", text: "Documents typically requested" },
          {
            type: "ul",
            items: [
              "Owner identification and tax registration details",
              "Business operating licence",
              "Technical drawing showing the sign's dimensions",
              "Visualisation of the sign in position on the façade",
              "Lease agreement or title deed for rights to the façade",
              "Building management consent where the façade is shared",
            ],
          },
          {
            type: "note",
            text: "The required document list varies by district and changes over time. Confirm the current list with the relevant district municipality before applying.",
          },
          { type: "h2", text: "Size and appearance limits" },
          {
            type: "p",
            text: "Municipalities usually regulate how far a sign may project, its maximum area and its mounting height. On some streets an urban design guide applies, which can restrict even colour and material. Rules are notably stricter within historic streetscapes.",
          },
          { type: "h2", text: "Units inside shopping malls" },
          {
            type: "p",
            text: "Inside a mall there are two approvals: municipal permission and compliance with the mall's own façade guidelines. Mall guidelines are often stricter, limiting letter height, return depth, projection and brightness separately. Obtain the guideline before fabrication begins.",
          },
          { type: "h2", text: "How the process runs" },
          {
            type: "p",
            text: "The order is: survey and measurement → design → technical drawings and visualisation → municipal application → fabrication after approval → installation. Starting fabrication before approval is risky; if the size or position is refused, the sign cannot be used.",
          },
        ],
      },
    },
  },
  {
    id: "arac-giydirme-folyo-rehberi",
    slug: {
      tr: "arac-giydirme-folyo-secimi-ve-omru",
      en: "vehicle-wrap-vinyl-guide",
    },
    published: "2026-08-28",
    readingMinutes: 6,
    relatedServiceIds: ["arac-giydirme", "dijital-baski", "etiket-sticker"],
    copy: {
      tr: {
        title: "Araç Giydirme: Folyo Seçimi, Ömrü ve Bakımı",
        metaTitle: "Araç Giydirme Folyo Rehberi | Royal Reklam Samsun",
        metaDescription:
          "Döküm ve kalender folyo arasındaki fark, araç giydirmenin ömrü, laminasyon ve yıkama kuralları. Filo giydirmeden önce bilinmesi gerekenler.",
        excerpt:
          "Aynı görselle kaplanan iki araçtan biri beş yıl dayanıyor, diğeri bir yılda kenarlardan çekiyor. Fark neredeyse her zaman folyo tipinde.",
        answer:
          "Araç giydirmede kullanılan folyo iki sınıfa ayrılır: döküm (cast) ve kalender. Döküm folyo ince, esnek ve boyutsal olarak kararlıdır; tampon, ayna ve derin kavisli yüzeylerde geri çekilmez, laminasyonlu kullanıldığında dış mekânda tipik olarak 5–7 yıl ömür verir. Kalender folyo daha kalın ve ucuzdur, düz yüzeylerde ve kısa süreli kampanyalarda kullanılır.",
        keywords: [
          "araç giydirme",
          "araç folyo kaplama",
          "döküm folyo",
          "kalender folyo",
          "samsun araç giydirme",
        ],
        body: [
          {
            type: "p",
            text: "Araç giydirme, metrekare başına en çok reklam gösterimi üreten mecralardan biri. Şehir içinde çalışan tek bir servis aracı, aylık olarak sabit bir panonun göremeyeceği kadar kişiye ulaşıyor. Ama bu görünürlük iki yönlü çalışıyor: kenarlarından kalkmış, rengi solmuş bir giydirme de aynı sayıda kişiye ulaşıyor.",
          },
          {
            type: "p",
            text: "Aşağıda, teklif alırken sorulması gereken teknik soruları ve uygulama sonrası bakımı anlatıyoruz.",
          },
          { type: "h2", text: "Döküm folyo ile kalender folyo arasındaki fark" },
          {
            type: "p",
            text: "İki folyo türü farklı üretim yöntemleriyle yapılır. Döküm folyo sıvı hâlde serilip kurutulduğu için içinde gerilme kalmaz; ısıtılıp gerildiğinde eski hâline dönmeye çalışmaz. Kalender folyo ise merdaneden geçirilerek inceltilir, bu nedenle içinde kalıcı bir gerilme taşır ve zamanla toparlanmaya çalışır. Kavisli bir tampona uygulanan kalender folyonun kenarlarından kalkmasının sebebi budur.",
          },
          {
            type: "table",
            head: ["Özellik", "Döküm (cast) folyo", "Kalender folyo"],
            rows: [
              ["Kalınlık", "Yaklaşık 50 mikron", "80–100 mikron"],
              [
                "Kavisli yüzey",
                "Derin kavis ve girintide çekmez",
                "Zamanla kenardan kalkar",
              ],
              [
                "Dış mekân ömrü",
                "Laminasyonlu 5–7 yıl",
                "Kullanıma göre 1–3 yıl",
              ],
              [
                "Tipik kullanım",
                "Tam araç giydirme, filo işleri",
                "Düz yüzey, kısa süreli kampanya",
              ],
            ],
          },
          {
            type: "note",
            text: "Teklifte yalnızca \"folyo\" yazıyorsa eksik bilgi verilmiş demektir. Marka, seri ve laminasyon bilgisi yazılı olmalıdır — fiyat farkının büyük kısmı burada saklanır.",
          },
          { type: "h2", text: "Laminasyon neden şart?" },
          {
            type: "p",
            text: "Baskılı folyonun üzerine uygulanan şeffaf laminasyon üç işi birden yapar: baskıyı UV'ye karşı korur, yıkama fırçasının ve yol çakılının çizmesini önler, rengin solmasını geciktirir. Laminasyonsuz basılmış bir araç giydirme, Karadeniz ikliminde bile ilk yazın sonunda gözle görülür şekilde matlaşır.",
          },
          { type: "h2", text: "Uygulama kaç gün sürer?" },
          {
            type: "p",
            text: "Sıra şöyledir: aracın ölçülmesi ve şablonun çıkarılması, tasarım, baskı ve laminasyon, ardından uygulama. Tam giydirme yapılan bir binek araçta uygulama tipik olarak bir ile üç gün arasında sürer. Araç uygulamadan önce yıkanmış ve tamamen kurumuş olmalıdır; nemli yüzeye yapıştırılan folyo tutmaz.",
          },
          {
            type: "ul",
            items: [
              "Uygulama ortam sıcaklığına duyarlıdır; soğuk açık havada yapılan yapıştırma kenarlarda tutunma sorunu yaratır.",
              "Kavisli bölgeler ısı tabancasıyla şekillendirilir, sonra tekrar ısıtılarak folyonun hafızası sıfırlanır.",
              "Uygulamadan sonraki ilk 48 saat araç yıkanmamalıdır.",
            ],
          },
          { type: "h2", text: "Giydirilmiş aracın bakımı" },
          {
            type: "ul",
            items: [
              "Mümkünse elle, yumuşak sünger ve nötr şampuanla yıkayın.",
              "Yüksek basınçlı yıkamada tabancayı yüzeye 45 cm'den yakın tutmayın ve folyo kenarlarına doğrudan tutmayın.",
              "Cila, pasta ve aşındırıcı temizleyiciler laminasyon yüzeyini çizer.",
              "Kışın yola atılan tuz kalıntısını bekletmeden durulayın.",
            ],
          },
          {
            type: "note",
            text: "Sıkça sorulan soru: sökerken boya kalkar mı? Orijinal fabrika boyası sağlamsa ve folyo ısıtılarak kontrollü sökülürse kalkmaz. Riskli olan, daha önce boyanmış ve boyası tam kürlenmemiş yüzeylerdir; bu durum uygulamadan önce belirtilmelidir.",
          },
          { type: "h2", text: "Filo giydirmede tutarlılık" },
          {
            type: "p",
            text: "Birden fazla araç giydirildiğinde asıl mesele renk tutarlılığıdır. Farklı zamanlarda, farklı folyo partileriyle basılan işler yan yana geldiğinde ton farkı gözle görülür. Bu yüzden filo işlerinde baskıların aynı parti folyoyla ve aynı profil ayarıyla yapılması, mümkünse tüm araçların tek seferde planlanması gerekir.",
          },
          {
            type: "p",
            text: "Royal Reklam olarak araç giydirmede şablon çıkarma, baskı, laminasyon ve uygulamayı kendi ekibimizle yapıyoruz. Kullanılacak folyonun markası ve laminasyon bilgisi teklifte yazılı olarak yer alır.",
          },
        ],
      },
      en: {
        title: "Vehicle Wraps: Choosing the Vinyl, Lifespan and Care",
        metaTitle: "Vehicle Wrap Vinyl Guide | Royal Reklam Samsun",
        metaDescription:
          "Cast versus calendered vinyl, how long a wrap lasts, lamination and washing rules. What to know before wrapping a fleet.",
        excerpt:
          "Two vehicles wrapped with the same artwork: one lasts five years, the other lifts at the edges within a year. The difference is almost always the film.",
        answer:
          "Vehicle wrapping film comes in two classes: cast and calendered. Cast film is thin, flexible and dimensionally stable; it does not shrink back on bumpers, mirrors and deep curves, and with lamination it typically lasts 5–7 years outdoors. Calendered film is thicker and cheaper, and is used on flat panels and for short campaigns.",
        keywords: [
          "vehicle wrapping",
          "car wrap vinyl",
          "cast vinyl",
          "calendered vinyl",
          "fleet graphics samsun",
        ],
        body: [
          {
            type: "p",
            text: "A wrapped vehicle is one of the highest-exposure advertising surfaces per square metre a business can own. A single service van working across a city reaches more people in a month than a fixed panel on a side street. That visibility runs both ways: a wrap with lifting edges and faded colour reaches exactly the same number of people.",
          },
          {
            type: "p",
            text: "Below are the technical questions worth asking before you accept a quote, and how to look after the wrap afterwards.",
          },
          { type: "h2", text: "Cast versus calendered film" },
          {
            type: "p",
            text: "The two films are made differently. Cast film is poured as a liquid and cured, so it carries no internal stress and will not try to return to its original shape once heated and stretched. Calendered film is rolled thin between drums and retains that stress, which is why it creeps back over time. That is the reason calendered film lifts at the edges of a curved bumper.",
          },
          {
            type: "table",
            head: ["Property", "Cast film", "Calendered film"],
            rows: [
              ["Thickness", "Around 50 microns", "80–100 microns"],
              [
                "Curved surfaces",
                "Holds on deep curves and recesses",
                "Lifts at edges over time",
              ],
              [
                "Outdoor lifespan",
                "5–7 years when laminated",
                "1–3 years depending on use",
              ],
              [
                "Typical use",
                "Full wraps, fleet work",
                "Flat panels, short campaigns",
              ],
            ],
          },
          {
            type: "note",
            text: "If a quote only says \"vinyl\", information is missing. The brand, series and lamination should be stated in writing — most of the price difference hides there.",
          },
          { type: "h2", text: "Why lamination is not optional" },
          {
            type: "p",
            text: "The clear laminate applied over printed film does three jobs at once: it shields the print from UV, it takes the abrasion from wash brushes and road grit, and it slows fading. An unlaminated wrap visibly dulls by the end of its first summer, even in a mild coastal climate.",
          },
          { type: "h2", text: "How long does application take?" },
          {
            type: "p",
            text: "The sequence is: measuring the vehicle and producing templates, design, printing and laminating, then application. A full wrap on a passenger car typically takes one to three days. The vehicle must be washed and completely dry beforehand; film will not bond to a damp surface.",
          },
          {
            type: "ul",
            items: [
              "Application is temperature sensitive; wrapping outdoors in cold weather causes adhesion problems at the edges.",
              "Curved areas are formed with a heat gun, then post-heated so the film loses its memory.",
              "The vehicle should not be washed for the first 48 hours after application.",
            ],
          },
          { type: "h2", text: "Caring for a wrapped vehicle" },
          {
            type: "ul",
            items: [
              "Hand wash where possible, using a soft sponge and a neutral shampoo.",
              "With a pressure washer, keep the lance at least 45 cm away and never aim it directly at the film edges.",
              "Polish, cutting compound and abrasive cleaners will scratch the laminate.",
              "Rinse off road salt promptly in winter.",
            ],
          },
          {
            type: "note",
            text: "A common question: does removal damage the paint? Not if the factory paint is sound and the film is removed with controlled heat. The risk lies with previously resprayed panels whose paint has not fully cured — mention any respray before application.",
          },
          { type: "h2", text: "Consistency across a fleet" },
          {
            type: "p",
            text: "With more than one vehicle, the real issue is colour consistency. Jobs printed at different times on different batches of film show a visible tonal shift when parked side by side. Fleet work should therefore be printed from the same film batch with the same colour profile, and ideally scheduled in a single run.",
          },
          {
            type: "p",
            text: "At Royal Reklam we produce templates, print, laminate and apply in house. The film brand and lamination used are stated in writing in the quote.",
          },
        ],
      },
    },
  },

  {
    id: "tabela-bakimi-led-arizalari",
    slug: {
      tr: "tabela-bakimi-ve-led-arizalari",
      en: "sign-maintenance-and-led-faults",
    },
    published: "2026-08-05",
    readingMinutes: 5,
    relatedServiceIds: [
      "isikli-tabela",
      "imalat-tasarim-montaj",
      "kutu-harf-tabela",
    ],
    copy: {
      tr: {
        title: "Tabela Bakımı: LED Arızaları Neden Olur, Nasıl Önlenir?",
        metaTitle: "Tabela Bakımı ve LED Arızaları | Royal Reklam Samsun",
        metaDescription:
          "Işıklı tabelalarda titreme, sönme ve harf kararmasının gerçek nedenleri. Yıllık bakımda kontrol edilmesi gerekenler ve garanti kapsamı.",
        excerpt:
          "Sönen bir tabelanın sorumlusu genellikle LED değil, kapasitesi sınırda seçilmiş bir trafo ya da yalıtılmamış bir kablo girişidir.",
        answer:
          "Işıklı tabelalardaki arızaların büyük çoğunluğu LED modülün kendisinden değil, güç kaynağından ve su yalıtımından kaynaklanır. Kapasitesi sınırda seçilmiş trafo, IP sınıfı düşük modül ve kasa üzerindeki kablo girişinin yalıtılmaması; ilk yıl içinde görülen titreme, bölgesel sönme ve harf harf kararmanın en yaygın üç nedenidir.",
        keywords: [
          "tabela bakımı",
          "led tabela arızası",
          "tabela tamiri samsun",
          "ışıklı tabela sönmesi",
          "tabela trafosu",
        ],
        body: [
          {
            type: "p",
            text: "Bir tabelanın ömrü, montaj günü değil ilk kıştan sonra belli olur. Sahada gördüğümüz arızaların çok azı gerçekten LED modülün ömrünü tamamlamasından kaynaklanıyor; büyük kısmı montaj sırasında verilmiş kararların birkaç ay sonra ortaya çıkması.",
          },
          { type: "h2", text: "Bir harf söndü, neden komşuları da etkilendi?" },
          {
            type: "p",
            text: "LED modüller zincir hâlinde birbirine bağlanır ve her zincir bir trafodan beslenir. Zincirin ortasındaki bir bağlantı bozulduğunda, o noktadan sonrası tamamen sönük kalır. Bu yüzden \"tek harf yandı\" diye başlayan bir arıza, çoğu zaman tek bir modülün değil o hattaki bağlantının sorunudur.",
          },
          { type: "h2", text: "En sık görülen beş arıza" },
          {
            type: "table",
            head: ["Belirti", "Olası neden", "Kalıcı çözüm"],
            rows: [
              [
                "Işık titriyor",
                "Trafo kapasitesi sınırda seçilmiş",
                "Toplam yükün en az %20 üzerinde trafo",
              ],
              [
                "Bir bölge tamamen sönük",
                "O hattaki modül zinciri veya klemens kopmuş",
                "Hattın komple yenilenmesi",
              ],
              [
                "Yağmurdan sonra sönüyor",
                "Kasa üzerindeki kablo girişi yalıtımsız",
                "Rakor ve silikon ile sızdırmazlık",
              ],
              [
                "Işık zamanla sarardı",
                "Düşük kaliteli LED veya pleksinin UV ile sararması",
                "Modül ve yüzey değişimi",
              ],
              [
                "Gece ilerledikçe zayıflıyor",
                "Trafo aşırı ısınıyor, gerilim düşüyor",
                "Havalandırmalı yerleşim, doğru kesitte kablo",
              ],
            ],
          },
          { type: "h2", text: "Yılda bir kez yapılması gerekenler" },
          {
            type: "ul",
            items: [
              "Kasa içinde su birikintisi ve nem kontrolü; tahliye deliklerinin açık olduğunun doğrulanması.",
              "Klemens ve kablo bağlantılarının sıkılığı — titreşim zamanla gevşetir.",
              "Trafo sıcaklığının çalışırken ölçülmesi.",
              "Pleksi yüzeyin yumuşak bezle temizlenmesi; solvent içerikli temizleyici kullanılmaması.",
              "Cephe bağlantı elemanlarının ve dübellerin gözle kontrolü.",
            ],
          },
          {
            type: "note",
            text: "Garanti genellikle imalat hatalarını ve LED/trafo arızalarını kapsar; fiziksel darbe, yıldırım, sel ve üçüncü kişilerin müdahalesi kapsam dışıdır. Garanti kapsamının teklifte yazılı olması, sonradan tartışma çıkmasını önler.",
          },
          { type: "h2", text: "Tabela ne zaman tamir edilmez, yenilenir?" },
          {
            type: "p",
            text: "Bir tabelada aynı sezon içinde birden fazla hat sönüyorsa, sorun tek tek modüllerde değil besleme ve yalıtım kurgusundadır. Bu durumda modül değiştirmek maliyeti öteler ama bitirmez. Kasa sağlamsa iç aksamın komple yenilenmesi, sağlam olmayan kasada ise tabelanın yenilenmesi daha ekonomiktir.",
          },
          {
            type: "p",
            text: "Royal Reklam olarak kendi ürettiğimiz tabelalarda garanti süresince imalat ve LED kaynaklı arızaları ücretsiz gideriyoruz; başka firmaların ürettiği tabelalarda da bakım ve onarım yapıyoruz.",
          },
        ],
      },
      en: {
        title: "Sign Maintenance: Why LED Faults Happen and How to Prevent Them",
        metaTitle: "Sign Maintenance and LED Faults | Royal Reklam Samsun",
        metaDescription:
          "The real causes of flickering, dark sections and dead letters in illuminated signs, what an annual service should cover, and what warranty includes.",
        excerpt:
          "When an illuminated sign goes dark, the culprit is rarely the LED itself — it is usually an undersized driver or an unsealed cable entry.",
        answer:
          "Most faults in illuminated signs come from the power supply and from water ingress rather than the LED modules themselves. An undersized driver, modules with a low IP rating, and an unsealed cable entry into the cabinet are the three most common causes of the flickering, dark sections and dead letters that appear within the first year.",
        keywords: [
          "sign maintenance",
          "led sign fault",
          "sign repair samsun",
          "illuminated sign flickering",
          "sign transformer",
        ],
        body: [
          {
            type: "p",
            text: "The real quality of a sign shows up after its first winter, not on installation day. Very few of the faults we see on site are LED modules reaching the end of their life; most are decisions made during installation surfacing a few months later.",
          },
          { type: "h2", text: "One letter went dark — why did its neighbours go too?" },
          {
            type: "p",
            text: "LED modules are wired in chains, and each chain is fed by one driver. When a connection in the middle of a chain fails, everything after that point goes dark. So a fault reported as \"one letter has gone out\" is usually a connection problem along the run rather than a single failed module.",
          },
          { type: "h2", text: "The five most common faults" },
          {
            type: "table",
            head: ["Symptom", "Likely cause", "Permanent fix"],
            rows: [
              [
                "Light flickers",
                "Driver specified right at its capacity limit",
                "Driver rated at least 20% above total load",
              ],
              [
                "A whole section is dark",
                "Broken module chain or terminal on that run",
                "Replacing the full run",
              ],
              [
                "Goes out after rain",
                "Unsealed cable entry into the cabinet",
                "Proper gland and sealing",
              ],
              [
                "Light has yellowed",
                "Low-grade LEDs or UV yellowing of the acrylic",
                "Module and face replacement",
              ],
              [
                "Dims as the night goes on",
                "Driver overheating, voltage dropping",
                "Ventilated layout, correct cable gauge",
              ],
            ],
          },
          { type: "h2", text: "What an annual service should cover" },
          {
            type: "ul",
            items: [
              "Checking the cabinet for standing water and confirming drain holes are clear.",
              "Retightening terminals and cable connections — vibration loosens them over time.",
              "Measuring driver temperature under load.",
              "Cleaning the acrylic face with a soft cloth; no solvent-based cleaners.",
              "Visual inspection of fixings and anchors into the façade.",
            ],
          },
          {
            type: "note",
            text: "Warranty normally covers manufacturing defects and LED or driver failures; impact damage, lightning, flooding and third-party interference are excluded. Having the scope written into the quote prevents arguments later.",
          },
          { type: "h2", text: "When repair stops making sense" },
          {
            type: "p",
            text: "If more than one run fails in a single season, the problem is not the individual modules but the power and sealing design. Replacing modules then defers the cost rather than ending it. Where the cabinet itself is sound, renewing the internals completely is the better option; where it is not, replacing the sign is.",
          },
          {
            type: "p",
            text: "For signs we manufacture, Royal Reklam covers manufacturing and LED faults free of charge during the warranty period. We also service and repair signs built by other companies.",
          },
        ],
      },
    },
  },

  {
    id: "totem-tabela-rehberi",
    slug: {
      tr: "totem-tabela-nedir-nerede-kullanilir",
      en: "what-is-a-totem-sign",
    },
    published: "2026-07-21",
    readingMinutes: 6,
    relatedServiceIds: [
      "totem-tabela",
      "imalat-tasarim-montaj",
      "isikli-tabela",
    ],
    copy: {
      tr: {
        title: "Totem Tabela Nedir? Nerede ve Hangi Ölçüde Kullanılır?",
        metaTitle: "Totem Tabela Rehberi | Royal Reklam Samsun",
        metaDescription:
          "Totem tabela nerede işe yarar, yüksekliği neye göre seçilir, temel ve rüzgâr yükü nasıl hesaplanır? Yol kenarı işletmeleri için rehber.",
        excerpt:
          "Totem, araçtan okunmak için tasarlanan bir yapıdır. Yüksekliği ve harf boyu görüş mesafesine göre hesaplanmazsa yalnızca pahalı bir direk olur.",
        answer:
          "Totem tabela, zemine sabitlenen, çoğunlukla çift yüzlü ve ışıklı bir tanıtım yapısıdır. Akaryakıt istasyonu, oto galeri, AVM, hastane ve sanayi tesisi girişleri gibi araç trafiğinden okunması gereken noktalarda kullanılır. Yükseklik görüş mesafesine, taşıyıcı konstrüksiyon ve temel ise bölgenin rüzgâr yüküne göre hesaplanır.",
        keywords: [
          "totem tabela",
          "totem tabela fiyatları",
          "yol kenarı tabela",
          "pylon tabela",
          "samsun totem tabela",
        ],
        body: [
          {
            type: "p",
            text: "Cephe tabelası yayaya, totem tabela sürücüye hitap eder. Aradaki fark yalnızca boyut değil: sürücünün okumak için ayırdığı süre bir saniyenin altındadır. Bu yüzden totemde satır sayısı azaltılır, harf yüksekliği artırılır ve kontrast en üst düzeye çekilir.",
          },
          { type: "h2", text: "Totem hangi işletmelerde işe yarar?" },
          {
            type: "ul",
            items: [
              "Cephesi ana yoldan görünmeyen, sapak veya servis yolundan girilen işletmeler.",
              "Aynı parselde birden fazla markanın bulunduğu yapılar — plazalar, sanayi siteleri, AVM girişleri.",
              "Akaryakıt istasyonu, oto galeri, market ve lokanta gibi araçla yaklaşılan işletmeler.",
              "Bina cephesine tabela asılmasının mümkün olmadığı, cephe kısıtı bulunan yapılar.",
            ],
          },
          { type: "h2", text: "Yükseklik ve harf boyu nasıl seçilir?" },
          {
            type: "p",
            text: "Okunabilirlikte kabul gören pratik kural, her bir metre görüş mesafesi için yaklaşık 0,8 santimetre harf yüksekliğidir. Aşağıdaki tablo bu kuralın yaklaşık karşılıklarını verir; hızlı akan trafikte bir üst kademeyi seçmek gerekir.",
          },
          {
            type: "table",
            head: ["Görüş mesafesi", "En küçük harf yüksekliği", "Tipik yer"],
            rows: [
              ["10 m", "yaklaşık 8 cm", "Yaya geçişi, otopark girişi"],
              ["30 m", "yaklaşık 25 cm", "Şehir içi cadde"],
              ["50 m", "yaklaşık 40 cm", "Çevre yolu servis şeridi"],
              ["100 m", "yaklaşık 80 cm", "Bölünmüş yol, istasyon girişi"],
            ],
          },
          {
            type: "note",
            text: "Bu ölçüler markanın adı için geçerlidir. Telefon numarası, slogan ve alt markalar aynı ölçüde okunamaz; totem üzerinde ikinci derece bilgiyi çoğaltmak ana adı küçültmek pahasına gelir.",
          },
          { type: "h2", text: "Temel ve rüzgâr yükü" },
          {
            type: "p",
            text: "Totemin görünmeyen kısmı, görünen kısmı kadar önemlidir. Yapı rüzgâra kapalı bir yüzey sunduğu için toplam yükü belirleyen şey ağırlık değil, yüzey alanı ve bölgenin rüzgâr hızıdır. Betonarme temel bu yüke göre boyutlandırılır; zemin gevşekse iyileştirme gerekir.",
          },
          {
            type: "ul",
            items: [
              "Taşıyıcı çelik konstrüksiyon galvanizli olmalı, kaynak noktaları kaynak sonrası korunmalıdır.",
              "Temel betonu yeterince kürlenmeden gövde monte edilmemelidir.",
              "Elektrik beslemesi temel aşamasında borulanmalı, sonradan yüzeyden çekilmemelidir.",
              "Topraklama ve kaçak akım koruması ihmal edilmemelidir.",
            ],
          },
          { type: "h2", text: "Tek yüzlü mü, çift yüzlü mü?" },
          {
            type: "p",
            text: "Totem iki yönden de araç geçen bir noktadaysa çift yüzlü yapılır; tek yönlü yolda ikinci yüz boşa maliyettir. Ancak çift yüzlü bir gövdenin iç hacmi aydınlatma için daha elverişlidir ve bakım kapağı yerleşimi kolaylaşır. Karar, konumun trafik yönü incelenerek verilmelidir.",
          },
          {
            type: "note",
            text: "Totem, zemine sabitlenen bir yapı olduğu için belediye izni cephe tabelasından daha kapsamlıdır; yola olan mesafe, görüş üçgenini kapatmama ve bazı yerlerde statik hesap talep edilir. İzin süreci imalattan önce başlatılmalıdır.",
          },
          {
            type: "p",
            text: "Royal Reklam olarak totem işlerinde ölçü ve zemin incelemesini yerinde yapıyor, konstrüksiyon ve temeli işin ölçüsüne göre planlıyoruz. Belediye başvurusu için gereken çizim ve görselleri de biz hazırlıyoruz.",
          },
        ],
      },
      en: {
        title: "What Is a Totem Sign? Where and at What Size to Use One",
        metaTitle: "Totem and Pylon Sign Guide | Royal Reklam Samsun",
        metaDescription:
          "Where a totem sign earns its place, how to size the height and letters for viewing distance, and how foundations and wind load are calculated.",
        excerpt:
          "A totem is designed to be read from a moving vehicle. Size its height and letters for the viewing distance, or it is just an expensive post.",
        answer:
          "A totem or pylon sign is a ground-mounted, usually double-sided and illuminated structure. It is used where the audience arrives by car — filling stations, car dealerships, retail parks, hospitals and industrial estate entrances. Height is set by viewing distance, while the structure and foundation are calculated from local wind load.",
        keywords: [
          "totem sign",
          "pylon sign",
          "roadside signage",
          "freestanding sign",
          "totem sign samsun",
        ],
        body: [
          {
            type: "p",
            text: "A façade sign speaks to pedestrians; a totem speaks to drivers. The difference is not only scale — a driver gives a sign less than a second. That is why a totem carries fewer lines, larger letters and the strongest contrast available.",
          },
          { type: "h2", text: "Which businesses benefit from a totem?" },
          {
            type: "ul",
            items: [
              "Premises set back from the main road, reached by a turning or service lane.",
              "Sites hosting several brands — office blocks, industrial estates, retail park entrances.",
              "Filling stations, dealerships, supermarkets and restaurants approached by car.",
              "Buildings where façade signage is restricted or not physically possible.",
            ],
          },
          { type: "h2", text: "Sizing height and letters" },
          {
            type: "p",
            text: "The accepted rule of thumb for legibility is roughly 0.8 cm of letter height for every metre of viewing distance. The table below gives approximate equivalents; in fast-moving traffic, step up one level.",
          },
          {
            type: "table",
            head: ["Viewing distance", "Minimum letter height", "Typical setting"],
            rows: [
              ["10 m", "about 8 cm", "Pedestrian approach, car park entry"],
              ["30 m", "about 25 cm", "Urban street"],
              ["50 m", "about 40 cm", "Ring road service lane"],
              ["100 m", "about 80 cm", "Dual carriageway, station forecourt"],
            ],
          },
          {
            type: "note",
            text: "These sizes apply to the brand name. Phone numbers, straplines and sub-brands will not read at the same distance; adding secondary information to a totem always costs you size on the primary name.",
          },
          { type: "h2", text: "Foundation and wind load" },
          {
            type: "p",
            text: "The part of a totem you cannot see matters as much as the part you can. Because the structure presents a solid face to the wind, the governing load comes from surface area and local wind speed rather than weight. The reinforced concrete foundation is sized to that load, and poor ground needs improvement first.",
          },
          {
            type: "ul",
            items: [
              "Structural steel should be galvanised, with welds protected after fabrication.",
              "The body should not be erected before the foundation concrete has cured properly.",
              "Power should be ducted at foundation stage, not surface-run afterwards.",
              "Earthing and residual current protection must not be skipped.",
            ],
          },
          { type: "h2", text: "Single or double sided?" },
          {
            type: "p",
            text: "If traffic passes in both directions, build it double sided; on a one-way approach the second face is wasted cost. A double-sided body does, however, give more internal depth for even illumination and easier access panels. Decide by looking at the direction of traffic at the actual location.",
          },
          {
            type: "note",
            text: "Because a totem is a ground-fixed structure, permitting is more involved than for façade signage: distance to the carriageway, keeping sight lines clear and, in some districts, structural calculations. Start the application before fabrication.",
          },
          {
            type: "p",
            text: "For totem projects Royal Reklam surveys the site and ground conditions in person and plans the structure and foundation to suit. We also prepare the drawings and visuals needed for the municipal application.",
          },
        ],
      },
    },
  },

  {
    id: "cephe-giydirme-malzeme-secimi",
    slug: {
      tr: "cephe-giydirme-malzeme-secimi",
      en: "facade-cladding-material-guide",
    },
    published: "2026-07-02",
    readingMinutes: 7,
    relatedServiceIds: [
      "cephe-giydirme",
      "imalat-tasarim-montaj",
      "dijital-baski",
    ],
    copy: {
      tr: {
        title: "Cephe Giydirmede Malzeme Seçimi: Kompozit, Alüminyum ve Alternatifleri",
        metaTitle: "Cephe Giydirme Malzeme Rehberi | Royal Reklam Samsun",
        metaDescription:
          "Alüminyum kompozit panel yangın sınıfları, panel kalınlığı, alt konstrüksiyon ve derz payı. Cephe giydirme teklifinde aranması gereken bilgiler.",
        excerpt:
          "Cephe giydirme tekliflerinde en çok atlanan bilgi yangın sınıfıdır. Aynı görünen iki panelin arasındaki fark burada başlar.",
        answer:
          "Cephe giydirmede en yaygın malzeme alüminyum kompozit paneldir; hafifliği, düz yüzeyi ve kolay işlenmesi nedeniyle tercih edilir. Seçimi belirleyen üç kriter vardır: panelin yangın sınıfı, toplam kalınlık ile alüminyum yüzey kalınlığı ve taşıyıcı alt konstrüksiyonun malzemesi. Yangın sınıfı teklifte yazılı olmalıdır.",
        keywords: [
          "cephe giydirme",
          "alüminyum kompozit panel",
          "kompozit cephe kaplama",
          "cephe kaplama malzemesi",
          "samsun cephe giydirme",
        ],
        body: [
          {
            type: "p",
            text: "Cephe giydirme, bir binanın görünüşünü en hızlı değiştiren işlerden biri. Aynı zamanda yanlış yapıldığında en pahalıya mal olan işlerden biri: panel arkasındaki konstrüksiyon ve su tahliyesi hatalı kurgulanırsa sorun yıllar sonra ve cephe sökülerek çözülüyor.",
          },
          { type: "h2", text: "Alüminyum kompozit panel (ACP) nedir?" },
          {
            type: "p",
            text: "İki ince alüminyum levha arasına dolgu katmanı sıkıştırılarak üretilen bir sandviç paneldir. Hafiflik ve düzlük sağlar, kolay bükülür ve kasetlenir. Kritik nokta ortadaki dolgu katmanıdır: dolgunun içeriği panelin yangın sınıfını belirler.",
          },
          {
            type: "table",
            head: ["Malzeme", "Nerede uygun", "Dikkat edilmesi gereken"],
            rows: [
              [
                "ACP — A2 yangın sınıfı",
                "Yüksek katlı ve kalabalık kullanımlı binalar",
                "Mineral dolgulu, daha ağır ve maliyetli",
              ],
              [
                "ACP — B sınıfı",
                "Alçak yapılar, mevzuatın izin verdiği durumlar",
                "Sınıfın teklifte ve sertifikada yazması şart",
              ],
              [
                "Alüminyum levha (tek katman)",
                "Küçük yüzeyler, detay ve söve işleri",
                "Geniş yüzeyde dalgalanma riski yüksek",
              ],
              [
                "HPL / kompakt lamine",
                "Doku ve ahşap görünümü istenen cepheler",
                "Isıl genleşme payı ACP'den farklıdır",
              ],
              [
                "Cam üzeri folyo uygulaması",
                "Vitrin ve giriş cepheleri",
                "Isı yalıtım camında folyo tipi seçimi önemlidir",
              ],
            ],
          },
          {
            type: "note",
            text: "Teklifte yalnızca \"kompozit\" yazması yeterli değildir. Marka, toplam panel kalınlığı, alüminyum yüzey kalınlığı ve yangın sınıfı ayrı ayrı belirtilmelidir. Aynı kalınlıkta görünen iki panelin yüzey alüminyumu farklı olabilir; fark, çarpma dayanımında ve düzlükte ortaya çıkar.",
          },
          { type: "h2", text: "Alt konstrüksiyon: cephenin görünmeyen yarısı" },
          {
            type: "p",
            text: "Paneller doğrudan duvara yapıştırılmaz; galvanizli çelik veya alüminyum profillerden oluşan bir iskeleye kasetlenerek monte edilir. Bu iskelenin görevi yalnızca taşımak değil, panelin arkasında havalandırma boşluğu bırakmak ve yoğuşma suyunu aşağı yönlendirmektir.",
          },
          {
            type: "ul",
            items: [
              "Panel araları derz payı bırakılarak monte edilmelidir; alüminyum sıcakla genleşir, paylar kapatılırsa panel göbek yapar.",
              "Cephenin alt ucunda su tahliyesi bırakılmalı, boşluk tamamen kapatılmamalıdır.",
              "Farklı metallerin temas ettiği noktalarda galvanik korozyon önlemi alınmalıdır.",
              "Sahile yakın cephelerde bağlantı elemanları paslanmaz seçilmelidir.",
            ],
          },
          { type: "h2", text: "Cephe giydirme ne kadar sürer?" },
          {
            type: "p",
            text: "Süreyi belirleyen şey panel imalatı değil, iskele ve erişimdir. Zeminden erişilebilen tek katlı bir dükkân cephesi birkaç günde tamamlanırken, çok katlı bir binada iskele kurulumu ve söküm süresi işin toplam takviminin yarısını oluşturabilir. Keşifte cephe yüksekliği ve erişim yöntemi netleşmeden verilen süre tahmindir.",
          },
          { type: "h2", text: "Bakım ve ömür" },
          {
            type: "p",
            text: "Kaliteli boyalı bir kompozit cephe, düzenli yıkandığında uzun yıllar rengini korur. Yüzeyi aşındıran temizleyiciler ve sert fırçalar boya tabakasını matlaştırır. Yılda bir kez derz ve silikon kontrolü, cephenin arkasına su almasını önlemenin en ucuz yoludur.",
          },
          {
            type: "p",
            text: "Royal Reklam olarak cephe giydirme işlerinde kullanılacak panelin markasını, kalınlığını ve yangın sınıfını teklifte yazılı olarak belirtiyoruz; alt konstrüksiyon ve montaj yöntemi de aynı teklifte yer alır.",
          },
        ],
      },
      en: {
        title: "Choosing Façade Cladding Materials: Composite, Aluminium and the Alternatives",
        metaTitle: "Façade Cladding Material Guide | Royal Reklam Samsun",
        metaDescription:
          "Composite panel fire classes, panel thickness, sub-framing and expansion gaps — what a façade cladding quote should state in writing.",
        excerpt:
          "The detail most often missing from a cladding quote is the fire class. That is where the difference between two identical-looking panels begins.",
        answer:
          "The most common façade cladding material is aluminium composite panel, chosen for its light weight, flat surface and ease of fabrication. Three criteria drive the choice: the panel's fire class, its total thickness together with the aluminium skin thickness, and the material of the supporting sub-frame. The fire class should be stated in the quote.",
        keywords: [
          "facade cladding",
          "aluminium composite panel",
          "acp cladding",
          "shopfront cladding",
          "facade cladding samsun",
        ],
        body: [
          {
            type: "p",
            text: "Cladding changes the appearance of a building faster than almost any other work. It is also among the most expensive things to get wrong: if the sub-frame and drainage behind the panels are badly detailed, the problem appears years later and can only be fixed by taking the façade off again.",
          },
          { type: "h2", text: "What aluminium composite panel actually is" },
          {
            type: "p",
            text: "It is a sandwich panel: a core pressed between two thin aluminium skins. That gives lightness and flatness, and it folds and cassettes easily. The critical element is the core, because what the core is made of determines the panel's fire class.",
          },
          {
            type: "table",
            head: ["Material", "Where it suits", "What to check"],
            rows: [
              [
                "ACP — A2 fire class",
                "Taller buildings and high-occupancy use",
                "Mineral filled, heavier and dearer",
              ],
              [
                "ACP — class B",
                "Low-rise buildings where regulations allow",
                "Class must appear in the quote and certificate",
              ],
              [
                "Solid aluminium sheet",
                "Small areas, reveals and detail work",
                "Prone to oil-canning over wide spans",
              ],
              [
                "HPL / compact laminate",
                "Façades wanting texture or a timber look",
                "Different expansion allowance to ACP",
              ],
              [
                "Applied film on glazing",
                "Shopfronts and entrance elevations",
                "Film choice matters on insulated glazing",
              ],
            ],
          },
          {
            type: "note",
            text: "\"Composite\" alone is not enough in a quote. Brand, total panel thickness, aluminium skin thickness and fire class should each be stated. Two panels of the same overall thickness can have different skins, and the difference shows up in impact resistance and flatness.",
          },
          { type: "h2", text: "The sub-frame: the invisible half of a façade" },
          {
            type: "p",
            text: "Panels are not glued to the wall. They are cassetted onto a frame of galvanised steel or aluminium profiles whose job is not only to carry the load but to leave a ventilation cavity behind the panel and route condensation downwards.",
          },
          {
            type: "ul",
            items: [
              "Panels need expansion gaps between them; aluminium moves with heat, and closing the gaps makes panels bow.",
              "Drainage must be left at the bottom of the façade — the cavity should not be sealed shut.",
              "Where dissimilar metals meet, galvanic corrosion has to be designed out.",
              "On coastal elevations, fixings should be stainless.",
            ],
          },
          { type: "h2", text: "How long does cladding take?" },
          {
            type: "p",
            text: "Access, not panel fabrication, drives the programme. A single-storey shopfront reachable from the ground can be finished in a few days, whereas on a multi-storey building the scaffold up and down can account for half the total schedule. Any duration quoted before the height and access method are established is a guess.",
          },
          { type: "h2", text: "Maintenance and lifespan" },
          {
            type: "p",
            text: "A well-coated composite façade holds its colour for many years if it is washed regularly. Abrasive cleaners and stiff brushes dull the coating. An annual check of joints and sealant is the cheapest way to keep water out from behind the façade.",
          },
          {
            type: "p",
            text: "Royal Reklam states the panel brand, thickness and fire class in writing in every cladding quote, along with the sub-frame specification and installation method.",
          },
        ],
      },
    },
  },

  {
    id: "dijital-baski-malzeme-secimi",
    slug: {
      tr: "dijital-baskida-malzeme-secimi",
      en: "large-format-print-materials",
    },
    published: "2026-06-24",
    readingMinutes: 5,
    relatedServiceIds: [
      "dijital-baski",
      "etiket-sticker",
      "lightbox-tabela",
    ],
    copy: {
      tr: {
        title: "Branda, Vinil, Mesh: Dijital Baskıda Hangi Malzeme Nerede Kullanılır?",
        metaTitle: "Dijital Baskı Malzeme Rehberi | Royal Reklam Samsun",
        metaDescription:
          "Branda, yapışkanlı folyo, mesh ve one-way vision arasındaki farklar; çözünürlük, laminasyon ve montaj detayları.",
        excerpt:
          "Baskının ömrünü belirleyen şey mürekkep değil, malzemenin asılacağı yere uygun seçilmesi ve doğru bitirilmesidir.",
        answer:
          "Dijital baskıda malzeme, baskının asılacağı yere ve kalacağı süreye göre seçilir. Branda dış mekân afiş ve pano kaplamalarında, yapışkanlı vinil folyo düz yüzeyler ve camda, mesh (delikli branda) rüzgâr yükü yüksek geniş cephelerde, one-way vision ise içeriden görüşün korunması gereken vitrinlerde kullanılır.",
        keywords: [
          "dijital baskı",
          "branda baskı",
          "vinil folyo baskı",
          "mesh branda",
          "samsun dijital baskı",
        ],
        body: [
          {
            type: "p",
            text: "Dijital baskıda en sık yapılan hata, malzemeyi fiyatına göre seçmek. Oysa aynı görsel; camda, beton cephede ve rüzgâra açık bir iskele üzerinde tamamen farklı malzemeler ister. Yanlış seçim genellikle baskının kalitesizliği olarak değil, birkaç ay sonra yırtılma, kabarma ya da solma olarak ortaya çıkar.",
          },
          { type: "h2", text: "Malzemeler ve yerleri" },
          {
            type: "table",
            head: ["Malzeme", "Nerede kullanılır", "Dikkat edilmesi gereken"],
            rows: [
              [
                "Branda (PVC)",
                "Dış mekân afiş, pano kaplama, açılış duyurusu",
                "Kenar kaynağı ve kuşgözü aralığı ömrü belirler",
              ],
              [
                "Mesh (delikli branda)",
                "Geniş bina cepheleri, iskele örtüsü",
                "Rüzgârı geçirir; kapalı brandaya göre çok daha güvenli",
              ],
              [
                "Yapışkanlı vinil folyo",
                "Düz cephe, kompozit yüzey, araç, cam",
                "Yüzey tozlu veya nemliyse tutmaz",
              ],
              [
                "One-way vision",
                "Vitrin camı",
                "İçeriden dışarı görüşü korur, dışarıdan görsel görünür",
              ],
              [
                "Backlit (arkadan aydınlatmalı) film",
                "Lightbox ve ışıklı kutu içleri",
                "Normal folyo backlit olarak kullanılırsa soluk kalır",
              ],
            ],
          },
          { type: "h2", text: "Çözünürlük ne olmalı?" },
          {
            type: "p",
            text: "Büyük formatta \"ne kadar yüksek o kadar iyi\" doğru değildir. Baskı izleyiciye ne kadar uzaktan görünecekse, o mesafeye göre çözünürlük seçilir. Yakından incelenecek bir vitrin görseli ile 30 metreden bakılacak bir bina cephesi aynı dosya kalitesini gerektirmez; ikincisinde gereğinden yüksek çözünürlük yalnızca dosya boyutunu ve işlem süresini artırır.",
          },
          {
            type: "ul",
            items: [
              "Görselin gerçek boyutta hazırlanması, oranın baskı öncesinde kontrol edilmesi gerekir.",
              "Yazılar vektörel olmalı; büyütülen piksel yazı kenarlarda tırtıklanır.",
              "Kesim ve katlama payı tasarıma baştan eklenmelidir.",
              "Kurumsal renkler için ekran değil, baskı profili referans alınmalıdır.",
            ],
          },
          { type: "h2", text: "Laminasyon ve bitirme" },
          {
            type: "p",
            text: "Dış mekânda kalacak yapışkanlı baskılar laminasyonsuz uygulanmamalıdır. Brandada ise bitirme işi kenarlarda düğümlenir: kenar kaynağının düzgün yapılması ve kuşgözlerinin yeterli sıklıkta konması, brandanın rüzgârda yırtılmasını önler. Geniş yüzeylerde kuşgöz aralığını açmak, kısa vadede işçilikten kazandırır ama ilk fırtınada işi baştan yaptırır.",
          },
          {
            type: "note",
            text: "Bina cephesine asılacak geniş yüzeyli baskılarda kapalı branda yerine mesh tercih edilmelidir. Kapalı yüzey rüzgârı tuttuğu için hem yırtılma hem de taşıyıcıya aşırı yük riski doğurur.",
          },
          {
            type: "p",
            text: "Royal Reklam olarak dijital baskıyı kendi bünyemizde yapıyor, malzemeyi işin asılacağı yere göre seçiyoruz. Baskı öncesinde ölçüyü ve montaj yöntemini netleştiriyoruz — çünkü doğru basılmış ama yanlış monte edilmiş bir iş de kısa ömürlü oluyor.",
          },
        ],
      },
      en: {
        title: "Banner, Vinyl or Mesh: Which Material Goes Where in Large Format Printing",
        metaTitle: "Large Format Print Material Guide | Royal Reklam Samsun",
        metaDescription:
          "The differences between PVC banner, self-adhesive vinyl, mesh and one-way vision, plus resolution, lamination and finishing details.",
        excerpt:
          "What determines how long a print lasts is not the ink — it is choosing a material suited to where it will hang, and finishing it properly.",
        answer:
          "In large format printing the material is chosen for where the print will hang and how long it needs to last. PVC banner suits outdoor posters and panel wraps, self-adhesive vinyl suits flat surfaces and glass, mesh suits large façades exposed to wind, and one-way vision suits shop windows where the view from inside must be preserved.",
        keywords: [
          "large format printing",
          "pvc banner printing",
          "self-adhesive vinyl",
          "mesh banner",
          "digital printing samsun",
        ],
        body: [
          {
            type: "p",
            text: "The most common mistake in large format printing is choosing the material on price. The same artwork calls for completely different substrates on glass, on a concrete façade and on scaffolding exposed to wind. A wrong choice rarely shows up as poor print quality; it shows up months later as tearing, bubbling or fading.",
          },
          { type: "h2", text: "Materials and where they belong" },
          {
            type: "table",
            head: ["Material", "Where it is used", "What to watch"],
            rows: [
              [
                "PVC banner",
                "Outdoor posters, panel wraps, opening announcements",
                "Edge welding and eyelet spacing determine its life",
              ],
              [
                "Mesh banner",
                "Large building façades, scaffold wraps",
                "Lets wind through; far safer than solid banner",
              ],
              [
                "Self-adhesive vinyl",
                "Flat façades, composite panels, vehicles, glass",
                "Will not bond to a dusty or damp surface",
              ],
              [
                "One-way vision",
                "Shop windows",
                "Keeps the view out while showing artwork outside",
              ],
              [
                "Backlit film",
                "Lightboxes and illuminated cabinets",
                "Standard vinyl used as backlit looks washed out",
              ],
            ],
          },
          { type: "h2", text: "What resolution do you actually need?" },
          {
            type: "p",
            text: "In large format, \"higher is better\" is not true. Resolution follows viewing distance. A window graphic examined from arm's length and a building façade read from 30 metres do not need the same file. On the latter, excess resolution only inflates file size and processing time.",
          },
          {
            type: "ul",
            items: [
              "Artwork should be prepared at actual size, with proportions checked before printing.",
              "Type should be vector; enlarged pixel type breaks up along the edges.",
              "Trim and hem allowances belong in the design from the start.",
              "Brand colours should be matched to the print profile, not to a screen.",
            ],
          },
          { type: "h2", text: "Lamination and finishing" },
          {
            type: "p",
            text: "Adhesive prints staying outdoors should never be applied unlaminated. With banners the finishing lives at the edges: a properly welded hem and eyelets at sensible spacing are what stop a banner tearing in the wind. Widening eyelet spacing saves labour today and costs a reprint after the first storm.",
          },
          {
            type: "note",
            text: "For large prints on building façades, choose mesh over solid banner. A solid face catches the wind, risking both tearing and excessive load on whatever is holding it.",
          },
          {
            type: "p",
            text: "Royal Reklam prints in house and selects the material for the location the work will hang in. We confirm dimensions and the installation method before printing — because a well-printed job that is badly installed is just as short-lived.",
          },
        ],
      },
    },
  },
];

export function getPostBySlug(slug: string, locale: Locale): Post | undefined {
  return posts.find((post) => post.slug[locale] === slug);
}

export function allPostSlugs(locale: Locale): string[] {
  return posts.map((post) => post.slug[locale]);
}

/** Yayın tarihine göre yeniden eskiye sıralı. */
export const sortedPosts = [...posts].sort(
  (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime(),
);
