import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Panelde bir kayıt değiştikten sonra siteyi tazeler.
 *
 * İki adım birden gerekiyor:
 *
 *  1. `revalidateTag(tag, { expire: 0 })` — `unstable_cache` ile saklanan
 *     veritabanı okumasını hemen geçersiz kılar. `"max"` profili bilerek
 *     kullanılmıyor: o "bayat göster, arkada tazele" demek. Kayıttan sonraki
 *     ilk ziyarette sayfa arkada yeniden üretilirken veri hâlâ bayat
 *     döndüğü için sayfa eski içerikle tekrar önbelleğe yazılıyor ve saatlik
 *     tazelemeye kadar öyle kalıyordu (silinen kampanya anasayfada durmaya
 *     devam ediyordu). `expire: 0` ile sonraki istek taze veriyi bekler.
 *     (`updateTag` denendi; `unstable_cache` etiketlerini temizlemedi.)
 *  2. `revalidatePath("/[locale]", "layout")` — sayfaların kendisini
 *     bayatlatır. Site statik üretildiği için etiketi temizlemek tek başına
 *     yetmez; HTML'in yeniden üretilmesi gerekir.
 *
 * Tek tek sayfa yolu vermek yerine dil düzenini komple tazeliyoruz: bir
 * hizmetin adı menüde, anasayfa kartında, hizmet listesinde, şemada ve
 * llms.txt'te aynı anda geçiyor. Hangi sayfaların etkilendiğini elle takip
 * etmek, unutulan tek bir yer yüzünden tutarsız içerik bırakır. 200 sayfalık
 * bir sitede ve günde birkaç kayıt olan bir panelde bunun maliyeti yok.
 */
export function publishContent(tag: string) {
  revalidateTag(tag, { expire: 0 });
  revalidatePath("/[locale]", "layout");
  /* Site haritası dil düzeninin dışında; işler ve kampanyalar orada da var. */
  revalidatePath("/sitemap.xml");
}
