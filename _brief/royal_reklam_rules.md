# Geliştirme ve Tasarım Kuralları (Rules)

Bu dosya, Royal Reklam projesi geliştirilirken yapay zeka ajanının (Antigravity/Cursor) kesinlikle uyması gereken katı kuralları içerir.

## 1. 21st.dev MCP Zorunluluğu
- **Sıfırdan Bileşen Yazma:** Buton, Navbar, Footer, Hero Section, Hizmet Kartları, Grid Yapıları, Formlar gibi UI elementlerinin **hiçbirini sıfırdan Tailwind ile yazmaya çalışma.**
- **MCP Kullanımı:** Mutlaka 21st.dev MCP'sini kullanarak arama yap (`search components: premium dark mode hero`, `luxury cards`, `timeline` vb.) ve beğendiğin, siyah/altın konseptine uyarlanabilecek en iyi bileşenleri projeye dahil et.

## 2. Tasarım ve Estetik
- **Renk Disiplini:** Siyah ve altın uyumu dışına çıkma. Altın rengini (#D4AF37, #FFD700 veya markaya uygun gradientler) sadece vurgulanması gereken yerlerde (ikonlar, border hoverları, butonlar, başlık altı çizgileri) kullan. Siyahın tonlarını (#000000, #111111, #1A1A1A) katman oluşturmak için kullan.
- **Gerçekçilik:** Sitede kullanılacak örnek veya placeholder görseller yapay zeka ile üretilecekse **asla plastik, çizgi film veya aşırı fütüristik durmamalıdır.** Gerçek bir AVM içi veya sokak arası tabela fotoğrafı doğallığında, doğru ışıklandırılmış "Premium Mockup" tarzında görseller kullanılmalıdır.

## 3. Responsive (Duyarlı) Tasarım
- Proje "Mobile First" (Önce Mobil) mantığıyla geliştirilmelidir.
- Telefon, tablet ve masaüstü görünümleri kusursuz olmalıdır. Menü mobilde hamburger menüye dönüşmeli, hizmet kartları mobilde tekli sütun, tablette ikili, masaüstünde üçlü/dörtlü grid yapısına geçmelidir.

## 4. Çoklu Dil (i18n) Kuralları
- Sitede bir dil değiştirici (Language Switcher) bileşeni (TR/EN) bulunmalıdır.
- Çeviriler hardcoded (kod içine doğrudan yazılmış) olmamalıdır. JSON dosyaları (`tr.json`, `en.json`) veya Next.js i18n routing yapısı üzerinden temiz bir şekilde kurgulanmalıdır.
- Varsayılan dil her zaman **Türkçe** olmalıdır.

## 5. Performans ve Kod Kalitesi
- **TypeScript:** Mutlaka TypeScript kullanılmalı, `any` kullanımından kaçınılmalı ve interfaceler doğru tanımlanmalıdır.
- **Animasyonlar:** Framer Motion kullanılmalı ancak animasyonlar kullanıcıyı yormamalıdır (subtle fade-in, yavaş y y ekseni kaymaları tercih edilmelidir).
- Tüm importlar düzenli olmalı, modüler bir dosya mimarisi (`/components`, `/locales`, `/utils`) kullanılmalıdır.
