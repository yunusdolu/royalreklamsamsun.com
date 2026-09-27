import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const masterDir = 'hizmetkart görseller';
const cardsDir = 'public/images/services/cards';
const servicesDir = 'public/images/services';
const heroDir = 'public/images/services/hero';

// Ensure directories exist
[cardsDir, servicesDir, heroDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// The 12 services configuration
const services = [
  { id: 'isikli-tabela', master: 'Işıklı Tabela.jpeg' },
  { id: 'kutu-harf-tabela', master: 'Kutu Harf Tabela.jpeg' },
  { id: 'totem-tabela', master: 'Totem Tabela.jpeg' },
  { id: 'lightbox-tabela', master: 'Lightbox Tabela.jpeg' },
  { id: 'cephe-giydirme', master: 'Cephe Giydirme.jpeg' },
  { id: 'arac-giydirme', master: 'Araç Giydirme.jpeg' },
  { id: 'dijital-baski', master: 'Dijital Baskı.jpeg' },
  { id: 'kurumsal-kimlik', master: 'Kurumsal Kimlik Çalışmaları.jpeg' },
  { id: 'etiket-sticker', master: 'Etiket & Sticker.jpeg' },
  { id: 'imalat-tasarim-montaj', master: 'İmalat, Tasarım ve Montaj.jpeg' },
  { id: 'yol-panolari', master: 'Yol ve Yönlendirme Panoları.jpeg' },
  { id: 'led-ekranlar', master: 'LED Ekran Sistemleri.jpeg' }
];

async function processCards() {
  console.log('\n--- 1. KART GÖRSELLERİ İŞLENİYOR (1600x1600) ---');
  for (const s of services) {
    const srcPath = path.join(masterDir, s.master);
    if (!fs.existsSync(srcPath)) {
      console.error(`Master görsel bulunamadı: ${srcPath}`);
      continue;
    }

    const cardPath = path.join(cardsDir, `${s.id}.jpg`);
    const fallbackServicePath = path.join(servicesDir, `${s.id}.jpg`);

    // 1:1 1600x1600 square card image
    await sharp(srcPath)
      .resize(1600, 1600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(cardPath);

    // Also update public/images/services/${s.id}.jpg
    await sharp(srcPath)
      .resize(1600, 1600, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(fallbackServicePath);

    console.log(`  ✓ [Kart 1600x1600] ${s.id} hazırlandı: ${s.master}`);
  }
}

async function processHeroes() {
  console.log('\n--- 2. HERO GÖRSELLERİ İŞLENİYOR (2400x800 · 3:1) ---');
  const targetW = 2400;
  const targetH = 800;

  for (const s of services) {
    const srcPath = path.join(masterDir, s.master);
    const heroPath = path.join(heroDir, `${s.id}.jpg`);

    // Central subject width: 1000px (41.6% of 2400, perfectly inside central 55%)
    // Height: 800px (matches full hero height so zero vertical cropping of subject occurs)
    const sW = 1000;
    const sH = targetH;
    const featherRatio = 0.16; // 16% smooth gradient on left and right borders

    // 1. Ambient Background: wide cover with ambient blur and subtle contrast match
    const bgBuffer = await sharp(srcPath)
      .resize(targetW, targetH, { fit: 'cover', position: 'center' })
      .blur(22)
      .modulate({ brightness: 0.88, saturation: 1.05 })
      .toBuffer();

    // 2. Crisp central subject (1000x800)
    const subjectBuffer = await sharp(srcPath)
      .resize(sW, sH, { fit: 'cover', position: 'center' })
      .ensureAlpha()
      .toBuffer();

    // 3. Alpha mask with smooth linear gradient on edges
    const maskSvg = Buffer.from(`
      <svg width="${sW}" height="${sH}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="feather" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fff" stop-opacity="0" />
            <stop offset="16%" stop-color="#fff" stop-opacity="1" />
            <stop offset="84%" stop-color="#fff" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="0" />
          </linearGradient>
        </defs>
        <rect width="${sW}" height="${sH}" fill="url(#feather)" />
      </svg>
    `);

    const maskPng = await sharp(maskSvg).png().toBuffer();

    const featheredSubject = await sharp(subjectBuffer)
      .composite([{ input: maskPng, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const left = Math.round((targetW - sW) / 2); // 700px, subject from 700 to 1700

    // 4. Combine ambient background + feathered central subject
    await sharp(bgBuffer)
      .composite([
        { input: featheredSubject, left: left, top: 0, blend: 'over' }
      ])
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(heroPath);

    console.log(`  ✓ [Hero 2400x800] ${s.id} hazırlandı (Ortalanmış ve tam görünümlü)`);
  }
}

async function cleanCache() {
  console.log('\n--- 3. NEXT.JS GÖRSEL ÖNBELLEĞİ TEMİZLENİYOR ---');
  const cacheDir = '.next/cache/images';
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('  ✓ .next/cache/images temizlendi');
  } else {
    console.log('  - .next/cache/images zaten yok');
  }
}

async function run() {
  console.log('====================================================');
  console.log('ROYAL REKLAM - HİZMET KART VE HERO GÖRSEL ÜRETİMİ');
  console.log('====================================================');
  await processCards();
  await processHeroes();
  await cleanCache();
  console.log('\n====================================================');
  console.log('TÜM 24 GÖRSEL BAŞARIYLA TAMAMLANDI!');
  console.log('====================================================\n');
}

run().catch(console.error);
