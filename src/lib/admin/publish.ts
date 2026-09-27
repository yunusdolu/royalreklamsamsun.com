import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Panelde bir kayıt değiştikten sonra siteyi tazeler.
 *
 * İki adım birden gerekiyor:
 *
 *  1. `revalidateTag` — `unstable_cache` ile saklanan veritabanı okumasını
 *     bayatlatır. Bu olmazsa sayfa yeniden üretilse bile eski satırı okur.
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
  revalidateTag(tag, "max");
  revalidatePath("/[locale]", "layout");
}
