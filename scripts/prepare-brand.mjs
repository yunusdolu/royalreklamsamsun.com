/**
 * Marka görsellerini hazırlar:
 *  - Beyaz arka planı şeffaflaştırır
 *  - Kırpar (trim)
 *  - Koyu zeminlerde kullanılacak altın maske üretir
 *  - Favicon / apple-icon için at figürünü ayırır
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "royalreklamlogo.png";
const OUT = "public/brand";

/** Beyaza yakın pikselleri şeffaf yapar. */
async function removeWhite(input) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);
    // Beyaz = üç kanal da yüksek ve birbirine yakın
    if (min > 238 && Math.max(r, g, b) - min < 14) {
      data[i + 3] = 0;
    } else if (min > 216) {
      // Kenar yumuşatma: yarı şeffaf geçiş
      data[i + 3] = Math.round(((238 - min) / 22) * 255);
    }
  }
  return sharp(data, { raw: { width, height, channels } }).png();
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // 1) Şeffaf + kırpılmış tam logo
  const transparent = await (await removeWhite(SRC)).toBuffer();
  const trimmed = await sharp(transparent)
    .trim({ threshold: 1 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  console.log(`Kırpılmış logo: ${meta.width}x${meta.height}`);

  await sharp(trimmed).toFile(`${OUT}/logo-full.png`);
  await sharp(trimmed)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 95 })
    .toFile(`${OUT}/logo-full.webp`);

  // 2) Koyu zemin için altın maske (şeklin alfa kanalı -> beyaz siluet)
  const { data: rd, info: ri } = await sharp(trimmed)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const mask = Buffer.alloc(rd.length);
  for (let i = 0; i < rd.length; i += ri.channels) {
    mask[i] = 255;
    mask[i + 1] = 255;
    mask[i + 2] = 255;
    mask[i + 3] = rd[i + 3];
  }
  await sharp(mask, { raw: { width: ri.width, height: ri.height, channels: ri.channels } })
    .png({ compressionLevel: 9 })
    .toFile(`${OUT}/logo-mask.png`);

  console.log("Tam logo + maske hazır.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
