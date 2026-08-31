import sharp from "sharp";
const { data, info } = await sharp("public/brand/logo-full.png").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
// üst %35'teki opak piksellerin bbox'ı (at figürü)
const limit = Math.round(height * 0.35);
let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
for (let y = 0; y < limit; y++) {
  for (let x = 0; x < width; x++) {
    if (data[(y * width + x) * channels + 3] > 40) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
}
console.log(JSON.stringify({ width, height, limit, minX, maxX, minY, maxY }));
