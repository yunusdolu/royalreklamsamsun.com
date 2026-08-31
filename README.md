# Royal Reklam — royalreklamsamsun.com

Samsun merkezli açık hava reklamcılığı firması Royal Reklam'ın kurumsal web sitesi.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · next-intl

```bash
npm run dev     # geliştirme sunucusu — http://localhost:3000
npm run build   # üretim derlemesi
npm run start   # üretim sunucusu
npm run lint    # ESLint
```

---

## ⚠️ Yayına almadan önce yapılması gerekenler

Aşağıdaki maddeler **doğrulanmamış veya eksik** veridir. Site bunlar olmadan da
çalışır, ancak yayına almadan önce mutlaka gözden geçirilmelidir.

| # | Konu | Dosya | Ne yapılmalı |
|---|------|-------|--------------|
| 1 | **Proje sayısı ve kuruluş yılı** | `src/content/stats.ts`, `src/config/site.ts` | `projects: 900` ve `foundingYear: 2013` temsilîdir. Gerçek değerlerle değiştirin; doğrulanamıyorsa bu iki sayacı kaldırın. |
| 2 | **Harita koordinatları** | `src/config/site.ts` → `geo` | Google Business Profile'daki kesin pin ile değiştirin. Yerel SEO'da konum doğruluğu önemlidir. |
| 3 | **Proje fotoğrafları** | `src/content/projects.ts` | Dizi bilinçli olarak boş. Fotoğraflar `public/images/portfolio/` altına konup dizi doldurulunca anasayfa teaser'ı, `/referanslar` sayfası, filtreler ve sitemap otomatik güncellenir. |
| 4 | **Hero görseli** | `public/images/hero/hero-night.jpg` | Şu an üretilmiş bir yer tutucu. Gerçek gece çekimi tabela fotoğrafıyla **aynı dosya adıyla** değiştirin; kod değişikliği gerekmez. |
| 5 | **Blog yayın tarihleri** | `src/content/posts.ts` → `published` | Gerçek yayın tarihleriyle güncelleyin. |
| 6 | **Müşteri yorumları** | — | Uydurma referans üretilmedi. Google yorumları elde edildiğinde ayrı bir bölüm eklenebilir. |
| 7 | **Çalışma saatleri** | `src/config/site.ts` → `openingHours` | Gerçek saatlerle teyit edin (JSON-LD'ye de gider). |
| 8 | **Google Search Console** | — | Domain doğrulaması yapıp `sitemap.xml` gönderin. |

---

## Mimari

```
src/
├─ app/
│  ├─ [locale]/            # Tüm sayfalar (TR ön eksiz, EN /en)
│  │  ├─ page.tsx               anasayfa
│  │  ├─ hizmetler/             hub + [slug] (10 hizmet)
│  │  ├─ referanslar/           hub + [slug]
│  │  ├─ bolgeler/              hub + [slug] (10 ilçe)
│  │  ├─ hakkimizda/  blog/  sss/  teklif-al/  iletisim/
│  │  ├─ opengraph-image.tsx    dinamik OG kartı (next/og)
│  │  └─ not-found.tsx
│  ├─ llms.txt/route.ts    # GEO: dil modelleri için site özeti
│  ├─ sitemap.ts  robots.ts  manifest.ts
│  ├─ icon.png  apple-icon.png
│  └─ globals.css          # tasarım sistemi (siyah/altın token'ları)
├─ components/
│  ├─ layout/    header, footer, breadcrumbs, page-header, quick-contact-bar
│  ├─ sections/  hero, stats, services, process, why, portfolio, faq, cta…
│  ├─ motion/    reveal (Framer), split-heading & counter (GSAP), lenis provider
│  ├─ seo/       json-ld
│  └─ ui/        shadcn + 21st.dev bileşenleri
├─ content/      services/ · regions · posts · projects · faq · stats
├─ config/site.ts   NAP (isim-adres-telefon) tek kaynak
├─ i18n/         routing · navigation · request
├─ lib/          seo · schema · gsap · utils
└─ proxy.ts      next-intl dil yönlendirmesi
messages/        tr.json · en.json
scripts/         marka görseli üretimi (logo, ikon, hero)
```

### İçerik nasıl güncellenir?

Metinlerin tamamı içerik dosyalarında; JSX içine gömülü hardcoded metin yok.

- **Hizmet metni** → `src/content/services/tr.ts` ve `en.ts`
- **Bölge metni** → `src/content/regions.ts`
- **Blog yazısı** → `src/content/posts.ts` (blok tabanlı: `p`, `h2`, `ul`, `table`, `note`)
- **Arayüz metni** → `messages/tr.json` ve `messages/en.json` (ikisi aynı anahtar yapısına sahip olmalı)
- **İletişim bilgisi** → `src/config/site.ts` (buradan footer, header, JSON-LD ve llms.txt'ye yayılır)

Yeni bir hizmet eklemek için `src/content/services/index.ts` içindeki
`definitions` dizisine bir kayıt ve iki dil dosyasına metin eklemek yeterlidir;
menü, footer, sitemap ve iç linkler otomatik güncellenir.

---

## Dil (i18n)

- Varsayılan dil **Türkçe** ve ön ek almaz: `/hizmetler`
- İngilizce `/en` ön eki alır **ve URL'leri yerelleşir**: `/en/services/channel-letter-signs`
- Tarayıcı diline göre otomatik yönlendirme **kapalı** (`localeDetection: false`) —
  Samsun odaklı bir işletme için Türk kullanıcının `/en`'e atılmaması gerekir.
- Uygulama içi bağlantılarda `next/link` yerine **`@/i18n/navigation`'daki `Link`**
  kullanılmalıdır; aksi halde dil ön eki ve yerelleşmiş yollar bozulur.

---

## Animasyon iş bölümü

Aynı DOM elemanı **asla** iki kütüphane tarafından birden animate edilmez.

| Katman | Sorumluluk |
|--------|-----------|
| **Framer Motion** | Bileşen içi: giriş/çıkış, hover, stagger, mobil menü, sayfa geçişleri (`components/motion/reveal.tsx`) |
| **GSAP + ScrollTrigger** | Sayfa seviyesi: hero zaman çizelgesi, SplitText satır açılımı, süreç çizgisi, sayaçlar, parallax |
| **Lenis** | Yumuşak kaydırma — yalnızca masaüstünde; dokunmatik cihazlarda native kaydırma kullanılır (pil) |

Tüm animasyonlar `prefers-reduced-motion` tercihine saygılıdır.

---

## SEO

- Sayfa başına `generateMetadata`, tek `<h1>`, canonical
- **hreflang** çifti (`tr-TR` ↔ `en`) + `x-default`, dile göre farklı slug'larla eşleşir
- JSON-LD: `LocalBusiness`, `Organization`, `WebSite`, `Service`, `BreadcrumbList`,
  `FAQPage`, `Article`, `Person`, `speakable`
- Dinamik `sitemap.xml` (alternates dâhil), `robots.txt`, `manifest.webmanifest`
- Dinamik OG görselleri (`next/og`), AVIF/WebP, `next/font` (latin-ext — Türkçe karakterler)

## GEO (üretken arama motoru optimizasyonu)

- **`/llms.txt`** — künye, hizmetler, bölgeler ve temel bilgilerin makine-okunur özeti
- Her sayfada **"cevap-önce" paragrafı** (`PageHeader`'ın `answer` alanı) — dil
  modellerinin doğrudan alıntılayabileceği 40–60 kelimelik tanım
- Soru biçiminde H2 başlıklar, teknik özellik ve karşılaştırma **tabloları**
- `robots.txt`'te GPTBot / ClaudeBot / PerplexityBot / Google-Extended **açık**
- İçerik sunucu tarafında render edilir; JS çalıştırmayan yapay zeka tarayıcıları da okur

---

## İletişim akışı

Sunucu tarafında form yok. `/teklif-al` sayfasındaki alanlar tarayıcıda bir
WhatsApp mesajına dönüştürülüp `wa.me` bağlantısıyla açılır. Böylece form
altyapısı, spam koruması ve KVKK aydınlatma metni gerekmez; kullanıcı mesajı
göndermeden önce görür.

---

## 21st.dev bileşenleri

`rules.md` gereği UI bileşenleri katalogdan alındı:

| Bileşen | Kaynak | Kullanım |
|---------|--------|----------|
| `components/glow-card-grid.tsx` | `@ncdai/glow-card-grid` | Hizmet kartlarındaki imleç takipli parıltı |
| `components/ui/timeline.tsx` | `@manuarora700/timeline` | (yedek) süreç çizelgesi |
| `components/gallery-grid-block-shadcnui.tsx` | `@moumensoliman/gallery-grid-block-shadcnui` | (yedek) lightbox'lı galeri |
| `components/ui/navbar-with-animated-mega-dropdown.tsx` | `@aghasisahakyan1/…` | Header mega menü deseni |
| `components/ui/*` | shadcn/ui | accordion, sheet, input, card… |

Yeni bileşen çekmek için:

```bash
npx shadcn@latest add "https://21st.dev/r/<yazar>/<bileşen>?api_key=$API_KEY_21ST"
```

`API_KEY_21ST` `.env.local` içindedir ve `.gitignore` kapsamındadır — commit edilmez.

---

## Yayınlama (Vercel)

1. Depoyu GitHub'a gönderin.
2. Vercel'de "New Project" → depoyu seçin (ayarlar otomatik algılanır).
3. Domain olarak `royalreklamsamsun.com` ekleyin; `www` → apex yönlendirmesini açın.
4. `API_KEY_21ST` ortam değişkenini yalnızca geliştirme için ekleyin (üretimde gerekmez).
5. Yayından sonra Google Search Console'a `sitemap.xml` gönderin.
