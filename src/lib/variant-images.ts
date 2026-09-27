import { existsSync } from "node:fs";
import { join } from "node:path";

import type { ServiceVariant } from "@/content/services";

/**
 * Çeşit görsellerini dosya sistemine göre doğrular.
 *
 * `scripts/inject_variant_images.mjs`, 101 çeşidin tamamına bir görsel yolu
 * yazıyor — dosyanın üretilip üretilmediğine bakmadan. Görseller sırayla
 * üretildiği için aradaki her çeşit, henüz var olmayan bir dosyayı çağırıyor
 * ve `/_next/image` 400 dönüyordu; sayfada kırık görsel kalıyordu.
 *
 * Burada yol, dosya gerçekten varsa bırakılır. Yoksa alan düşürülür ve
 * bileşen hizmetin kart görseline geri düşer. Böylece yeni görseller
 * üretildikçe kendiliğinden yayına girer, veri dosyalarını budamak
 * gerekmez.
 *
 * Yalnızca sunucuda çalışır. Hizmet sayfaları `generateStaticParams` ile
 * tamamen statik üretildiği için bu kontrol derleme anında yapılır.
 */
export function withExistingImages(
  variants: readonly ServiceVariant[],
): ServiceVariant[] {
  return variants.map((variant) => {
    if (!variant.image) return { ...variant };
    const file = join(process.cwd(), "public", variant.image);
    if (existsSync(file)) return { ...variant };
    const { image: _dropped, ...rest } = variant;
    return rest;
  });
}
