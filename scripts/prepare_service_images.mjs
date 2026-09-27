import fs from "fs";
import path from "path";
import sharp from "sharp";

const brainDir = "C:\\Users\\can20\\.gemini\\antigravity-ide\\brain\\09e43a4f-42ef-4860-956e-7333bc8d09c0";
const hizmetkartDir = "hizmetkart görseller";
const servicesDir = "public/images/services";
const heroDir = "public/images/services/hero";

if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

// 12 Services mapping
const servicesConfig = [
  {
    id: "isikli-tabela",
    cardSource: path.join(brainDir, "tabela_kart_1790364443768.jpg"),
    fallbackCard: path.join(hizmetkartDir, "Işıklı Tabela.jpeg"),
    heroSource: path.join(brainDir, "tabela_hero_1790364461633.jpg"),
    fallbackHero: path.join(servicesDir, "isikli-tabela.jpg"),
  },
  {
    id: "kutu-harf-tabela",
    cardSource: path.join(brainDir, "kutu_harf_kart_1790364479527.jpg"),
    fallbackCard: path.join(hizmetkartDir, "Kutu Harf Tabela.jpeg"),
    heroSource: path.join(brainDir, "kutu_harf_hero_1790364496746.jpg"),
    fallbackHero: path.join(servicesDir, "kutu-harf-tabela.jpg"),
  },
  {
    id: "totem-tabela",
    cardSource: path.join(brainDir, "totem_tabela_kart_1790364517871.jpg"),
    fallbackCard: path.join(hizmetkartDir, "Totem Tabela.jpeg"),
    heroSource: path.join(brainDir, "totem_tabela_hero_1790364543774.jpg"),
    fallbackHero: path.join(servicesDir, "totem-tabela.jpg"),
  },
  {
    id: "lightbox-tabela",
    cardSource: path.join(brainDir, "lightbox_tabela_kart_1790364564555.jpg"),
    fallbackCard: path.join(hizmetkartDir, "Lightbox Tabela.jpeg"),
    heroSource: path.join(brainDir, "lightbox_tabela_hero_1790364590909.jpg"),
    fallbackHero: path.join(servicesDir, "lightbox-tabela.jpg"),
  },
  {
    id: "cephe-giydirme",
    cardSource: path.join(brainDir, "cephe_giydirme_kart_1790364616507.jpg"),
    fallbackCard: path.join(hizmetkartDir, "Cephe Giydirme.jpeg"),
    heroSource: path.join(brainDir, "cephe_giydirme_hero_1790364647489.jpg"),
    fallbackHero: path.join(servicesDir, "cephe-giydirme.jpg"),
  },
  {
    id: "arac-giydirme",
    cardSource: path.join(brainDir, "arac_giydirme_kart_1790364675668.jpg"),
    fallbackCard: path.join(hizmetkartDir, "Araç Giydirme.jpeg"),
    heroSource: path.join(brainDir, "arac_giydirme_hero_1790364704753.jpg"),
    fallbackHero: path.join(servicesDir, "arac-giydirme.jpg"),
  },
  {
    id: "dijital-baski",
    cardSource: path.join(brainDir, "dijital_baski_kart_1790364736041.jpg"),
    fallbackCard: path.join(hizmetkartDir, "Dijital Baskı.jpeg"),
    heroSource: path.join(servicesDir, "dijital-baski.jpg"),
    fallbackHero: path.join(hizmetkartDir, "Dijital Baskı.jpeg"),
  },
  {
    id: "kurumsal-kimlik",
    cardSource: path.join(hizmetkartDir, "Kurumsal Kimlik Çalışmaları.jpeg"),
    fallbackCard: path.join(hizmetkartDir, "Kurumsal Kimlik Çalışmaları.jpeg"),
    heroSource: path.join(servicesDir, "kurumsal-kimlik.jpg"),
    fallbackHero: path.join(hizmetkartDir, "Kurumsal Kimlik Çalışmaları.jpeg"),
  },
  {
    id: "etiket-sticker",
    cardSource: path.join(hizmetkartDir, "Etiket & Sticker.jpeg"),
    fallbackCard: path.join(hizmetkartDir, "Etiket & Sticker.jpeg"),
    heroSource: path.join(servicesDir, "etiket-sticker.jpg"),
    fallbackHero: path.join(hizmetkartDir, "Etiket & Sticker.jpeg"),
  },
  {
    id: "imalat-tasarim-montaj",
    cardSource: path.join(hizmetkartDir, "İmalat, Tasarım ve Montaj.jpeg"),
    fallbackCard: path.join(hizmetkartDir, "İmalat, Tasarım ve Montaj.jpeg"),
    heroSource: path.join(servicesDir, "imalat-tasarim-montaj.jpg"),
    fallbackHero: path.join(hizmetkartDir, "İmalat, Tasarım ve Montaj.jpeg"),
  },
  {
    id: "yol-panolari",
    cardSource: path.join(hizmetkartDir, "Yol ve Yönlendirme Panoları.jpeg"),
    fallbackCard: path.join(hizmetkartDir, "Yol ve Yönlendirme Panoları.jpeg"),
    heroSource: path.join(servicesDir, "yol-panolari.jpg"),
    fallbackHero: path.join(hizmetkartDir, "Yol ve Yönlendirme Panoları.jpeg"),
  },
  {
    id: "led-ekranlar",
    cardSource: path.join(hizmetkartDir, "LED Ekran Sistemleri.jpeg"),
    fallbackCard: path.join(hizmetkartDir, "LED Ekran Sistemleri.jpeg"),
    heroSource: path.join(servicesDir, "led-ekranlar.jpg"),
    fallbackHero: path.join(hizmetkartDir, "LED Ekran Sistemleri.jpeg"),
  },
];

async function processAll() {
  console.log("Servis görselleri işleniyor...");

  for (const s of servicesConfig) {
    // 1. Kart görseli (1:1, 1600x1600)
    const cardInput = fs.existsSync(s.cardSource) ? s.cardSource : s.fallbackCard;
    const cardTarget = path.join(servicesDir, `${s.id}.jpg`);

    console.log(`[Kart 1:1] ${s.id} <- ${path.basename(cardInput)}`);
    await sharp(cardInput)
      .resize(1600, 1600, { fit: "cover", position: "center" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(cardTarget);

    // 2. Hero görseli (3:1, 2400x800)
    const heroInput = fs.existsSync(s.heroSource) ? s.heroSource : s.fallbackHero;
    const heroTarget = path.join(heroDir, `${s.id}.jpg`);

    console.log(`[Hero 3:1] ${s.id} <- ${path.basename(heroInput)}`);
    await sharp(heroInput)
      .resize(2400, 800, { fit: "cover", position: "center" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(heroTarget);
  }

  console.log("\nTüm 24 görsel başarıyla 1600x1600 (Kart) ve 2400x800 (Hero) olarak üretildi/işlendi!");
}

processAll().catch(console.error);
