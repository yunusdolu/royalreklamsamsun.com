/**
 * Metinden adres parçası üretir: "Efsane Kasım İNDİRİMİ" → "efsane-kasim-indirimi".
 *
 * Türkçe büyük harfler için `toLocaleLowerCase("tr")` şart: düz
 * `toLowerCase()` "İ" harfini "i" + birleşik nokta (U+0307) diye iki
 * karaktere ayırıyor, nokta da tireye dönüp adres "i-ndi-ri-mi" oluyordu.
 * Kalan aksanlar (â, î, é…) ayrıştırılıp atılıyor.
 */
export function slugify(value: string, fallback: string, max = 70): string {
  return (
    value
      .toLocaleLowerCase("tr")
      .replace(/ı/g, "i")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, max)
      .replace(/-+$/g, "") || fallback
  );
}
