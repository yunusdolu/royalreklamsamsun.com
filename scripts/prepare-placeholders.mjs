/**
 * Geçici hero arka planı üretir.
 *
 * NOT: Bu bir fotoğraf DEĞİL, yer tutucudur. Gerçek proje fotoğrafı
 * geldiğinde public/images/hero/hero-night.jpg dosyası değiştirilmelidir.
 * Fotoğrafsız da site tamamlanmış görünsün diye koyu, sıcak ışık
 * bloom'lu atmosferik bir zemin üretiliyor.
 */
import sharp from "sharp";

const W = 2000;
const H = 1250;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bloom" cx="0.62" cy="0.44" r="0.55">
      <stop offset="0%"   stop-color="#7a5f22" stop-opacity="0.85"/>
      <stop offset="35%"  stop-color="#3d3014" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bloom2" cx="0.18" cy="0.78" r="0.45">
      <stop offset="0%"   stop-color="#2a2a33" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="floor" x1="0" y1="0.55" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#d4af37" stop-opacity="0"/>
      <stop offset="50%"  stop-color="#e8c766" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#050505"/>
  <rect width="${W}" height="${H}" fill="url(#bloom)"/>
  <rect width="${W}" height="${H}" fill="url(#bloom2)"/>

  <!-- Uzakta bir cephe hissi veren dikey blok ritmi -->
  <g opacity="0.20">
    <rect x="120"  y="250" width="150" height="700" fill="#15151a"/>
    <rect x="330"  y="330" width="110" height="620" fill="#101015"/>
    <rect x="1520" y="200" width="190" height="760" fill="#131318"/>
    <rect x="1760" y="300" width="130" height="660" fill="#0e0e12"/>
  </g>

  <!-- Işıklı tabela ipucu: yatay altın bant -->
  <rect x="520" y="520" width="960" height="120" rx="8" fill="url(#streak)"/>
  <rect x="520" y="520" width="960" height="120" rx="8" fill="none" stroke="#d4af37" stroke-opacity="0.16" stroke-width="2"/>

  <rect width="${W}" height="${H}" fill="url(#floor)"/>
</svg>`;

await sharp(Buffer.from(svg))
  .blur(28)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/images/hero/hero-night.jpg");

// LQIP: blurDataURL için küçük ve çok sıkıştırılmış sürüm
const tiny = await sharp("public/images/hero/hero-night.jpg")
  .resize(20)
  .jpeg({ quality: 40 })
  .toBuffer();

console.log("hero-night.jpg üretildi");
console.log(`blurDataURL: data:image/jpeg;base64,${tiny.toString("base64")}`);
