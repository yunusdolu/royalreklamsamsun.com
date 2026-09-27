import fs from "fs";
import path from "path";
import sharp from "sharp";

// .env.local dosyasından GEMINI_API_KEY oku
let apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey && fs.existsSync(".env.local")) {
  const envContent = fs.readFileSync(".env.local", "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("GEMINI_API_KEY=") || trimmed.startsWith("GOOGLE_API_KEY=")) {
      apiKey = trimmed.split("=")[1].trim().replace(/^["']|["']$/g, "");
      break;
    }
  }
}

if (!apiKey) {
  console.error("\nHATA: GEMINI_API_KEY bulunamadı!");
  process.exit(1);
}

const promptsFile = "scripts/prompts_data.json";
const prompts = JSON.parse(fs.readFileSync(promptsFile, "utf8"));

// Sadece henüz public/ altında olmayan eksik görselleri seç
const missingPrompts = prompts.filter(p => !fs.existsSync(path.join("public", p.imagePath)));

console.log(`\n========================================`);
console.log(`Toplam prompt: ${prompts.length}`);
console.log(`Zaten mevcut: ${prompts.length - missingPrompts.length}`);
console.log(`Üretilecek eksik görsel: ${missingPrompts.length}`);
console.log(`========================================\n`);

if (missingPrompts.length === 0) {
  console.log("Tüm görseller zaten üretilmiş ve yerinde!");
  process.exit(0);
}

const NEGATIVE_PROMPT = "cartoon, 3d render, cgi, illustration, oversaturated, hdr, blurry text, garbled letters, watermark, logo overlay, distorted perspective, fisheye";

async function generateImage(promptText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        parts: [
          { text: `${promptText}. Negative: ${NEGATIVE_PROMPT}` }
        ]
      }
    ]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API Hatası (${res.status}): ${errText}`);
  }

  const data = await res.json();
  if (
    !data.candidates ||
    !data.candidates[0] ||
    !data.candidates[0].content ||
    !data.candidates[0].content.parts
  ) {
    throw new Error(`Geçersiz API yanıtı: ${JSON.stringify(data)}`);
  }

  const imagePart = data.candidates[0].content.parts.find(p => p.inlineData && p.inlineData.data);
  if (!imagePart) {
    throw new Error(`Görsel verisi bulunamadı: ${JSON.stringify(data.candidates[0].content.parts)}`);
  }

  return Buffer.from(imagePart.inlineData.data, "base64");
}

async function processQueue() {
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < missingPrompts.length; i++) {
    const item = missingPrompts[i];
    const targetPath = path.join("public", item.imagePath);
    const targetDir = path.dirname(targetPath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`[${i + 1}/${missingPrompts.length}] #${item.id} - ${item.name} (${item.serviceId})...`);

    let attempts = 0;
    let saved = false;

    while (attempts < 5 && !saved) {
      attempts++;
      try {
        const buffer = await generateImage(item.prompt);

        // 16:10 (1920x1200) olarak kaydet
        await sharp(buffer)
          .resize(1920, 1200, { fit: "cover", position: "center" })
          .jpeg({ quality: 90, mozjpeg: true })
          .toFile(targetPath);

        console.log(`  ✓ Kaydedildi: ${item.imagePath} (1920x1200)`);
        successCount++;
        saved = true;
      } catch (err) {
        console.error(`  ✗ Deneme ${attempts} başarısız (#${item.id}):`, err.message);
        if (attempts < 5) {
          const isRateLimit = err.message.includes("429") || err.message.includes("RESOURCE_EXHAUSTED") || err.message.includes("quota");
          const waitTime = isRateLimit ? 15000 : (attempts * 3000);
          console.log(`    ${waitTime / 1000} saniye beklenip tekrar deneniyor...`);
          await new Promise(r => setTimeout(r, waitTime));
        } else {
          failCount++;
        }
      }
    }

    // İstekler arası nazik bir bekleme (rate limit koruması için 2 saniye)
    if (i < missingPrompts.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`\n========================================`);
  console.log(`Tüm İşlem Tamamlandı!`);
  console.log(`Başarılı: ${successCount}`);
  console.log(`Başarısız: ${failCount}`);
  console.log(`========================================\n`);
}

processQueue();
