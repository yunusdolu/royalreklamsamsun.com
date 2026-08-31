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
        metaTitle: "Samsun Tabela Fiyatları Nasıl Hesaplanır? | Royal Reklam",
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
        metaTitle: "Kutu Harf mi Işıklı Kompozit Tabela mı? | Royal Reklam",
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
        metaTitle: "Channel Letters vs Composite Cabinet Signs | Royal Reklam",
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
        metaTitle: "Samsun Tabela Belediye İzni Rehberi | Royal Reklam",
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
        metaTitle: "Signage Permit Guide for Samsun | Royal Reklam",
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
