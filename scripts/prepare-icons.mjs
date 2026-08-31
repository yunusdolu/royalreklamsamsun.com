/** At figürünü ayırıp altın gradient favicon / app icon üretir. */
import sharp from "sharp";

const MASK = "public/brand/logo-mask.png";
const OUT = "public/brand";

// At figürü (metnin üstünde kalan bölge — probe ile ölçüldü)
const CROP = { left: 625, top: 0, width: 225, height: 196 };

const markBuf = await sharp(MASK).extract(CROP).trim({ threshold: 1 }).png().toBuffer();
const markMeta = await sharp(markBuf).metadata();
console.log(`At figürü: ${markMeta.width}x${markMeta.height}`);

/** Maskeyi altın gradient ile boyar (dest-in). */
async function gild(maskBuffer, w, h) {
  const gradient = Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
       <defs><linearGradient id="g" x1="0" y1="0" x2="0.35" y2="1">
         <stop offset="0%" stop-color="#F2DFA0"/>
         <stop offset="38%" stop-color="#D4AF37"/>
         <stop offset="72%" stop-color="#B4892C"/>
         <stop offset="100%" stop-color="#E8C766"/>
       </linearGradient></defs>
       <rect width="${w}" height="${h}" fill="url(#g)"/>
     </svg>`
  );
  return sharp(gradient)
    .composite([{ input: maskBuffer, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Şeffaf altın at işareti (koyu zeminler için)
const markSquare = await sharp({
  create: { width: 640, height: 640, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([{ input: await sharp(markBuf).resize({ width: 600, height: 600, fit: "inside" }).toBuffer(), gravity: "center" }])
  .png()
  .toBuffer();
await sharp(await gild(markSquare, 640, 640)).toFile(`${OUT}/mark-gold.png`);

// Tüm logonun altın versiyonu (koyu zemin navbar/footer için)
const logoMeta = await sharp(MASK).metadata();
await sharp(await gild(await sharp(MASK).toBuffer(), logoMeta.width, logoMeta.height)).toFile(`${OUT}/logo-gold.png`);
await sharp(`${OUT}/logo-gold.png`).resize({ width: 900 }).webp({ quality: 95 }).toFile(`${OUT}/logo-gold.webp`);

/** Siyah yuvarlak kare zemin üzerine altın at. */
async function makeIcon(size, padding, radius, file) {
  const inner = size - padding * 2;
  const resized = await sharp(markBuf).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  const rm = await sharp(resized).metadata();
  const golden = await gild(resized, rm.width, rm.height);

  const plate = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
       <rect width="${size}" height="${size}" rx="${radius}" fill="#0A0A0A"/>
     </svg>`
  );

  await sharp(plate)
    .composite([{ input: golden, left: Math.round((size - rm.width) / 2), top: Math.round((size - rm.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(file);
}

await makeIcon(512, 60, 100, "src/app/icon.png");
await makeIcon(180, 20, 40, "src/app/apple-icon.png");
await makeIcon(512, 96, 0, `${OUT}/maskable-512.png`);
console.log("İkonlar hazır.");
