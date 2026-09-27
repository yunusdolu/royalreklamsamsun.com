/**
 * Veritabanı hatasını panel kullanıcısının anlayacağı bir cümleye çevirir.
 *
 * En sık karşılaşılan durum şemanın güncel olmaması: kodda yeni bir sütun ya
 * da tablo kullanılıyor ama Supabase'te `supabase/schema.sql` yeniden
 * çalıştırılmamış. Ham hata ("column service_overrides.card_focus does not
 * exist") bunu söylemiyor; kullanıcı neyi düzelteceğini bilemiyor.
 */
export function describeDbError(error: { code?: string; message: string }): string {
  /*
    Eksik sütun iki farklı kodla gelebiliyor: okurken Postgres'in kendi
    42703'ü, yazarken PostgREST'in PGRST204'ü ("Could not find the
    'card_focus' column … in the schema cache"). İkisi de aynı anlama geliyor.
  */
  const missingColumn =
    error.code === "42703" ||
    error.code === "PGRST204" ||
    /could not find the '.+' column/i.test(error.message);
  const missingTable =
    error.code === "42P01" ||
    error.code === "PGRST205" ||
    /could not find the table/i.test(error.message);

  if (missingColumn || missingTable) {
    return (
      "Veritabanı şeması güncel değil. Supabase → SQL Editor'de " +
      "supabase/schema.sql dosyasının tamamını çalıştır, sonra tekrar kaydet. " +
      `(Ayrıntı: ${error.message})`
    );
  }
  return `Kaydedilemedi: ${error.message}`;
}
