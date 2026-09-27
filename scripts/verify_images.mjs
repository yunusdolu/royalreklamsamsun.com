import fs from "fs";
import path from "path";

const promptsData = JSON.parse(fs.readFileSync("scripts/prompts_data.json", "utf8"));
console.log(`Checking ${promptsData.length} prompt entries...`);

let missingPrompts = 0;
for (const p of promptsData) {
  const fullPath = path.join("public", p.imagePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing prompt image #${p.id}: ${p.imagePath}`);
    missingPrompts++;
  }
}

// Check tr.ts and en.ts
function checkServiceFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const matches = content.match(/image:\s*["']([^"']+)["']/g) || [];
  let missing = 0;
  for (const m of matches) {
    const imgPath = m.match(/["']([^"']+)["']/)[1];
    if (!fs.existsSync(path.join("public", imgPath))) {
      console.error(`Missing file referenced in ${filePath}: ${imgPath}`);
      missing++;
    }
  }
  return { total: matches.length, missing };
}

const trResult = checkServiceFile("src/content/services/tr.ts");
const enResult = checkServiceFile("src/content/services/en.ts");

console.log("\n=== VERIFICATION SUMMARY ===");
console.log(`Total prompt set items: ${promptsData.length}`);
console.log(`Missing prompt images on disk: ${missingPrompts}`);
console.log(`tr.ts image references: ${trResult.total} (missing: ${trResult.missing})`);
console.log(`en.ts image references: ${enResult.total} (missing: ${enResult.missing})`);
console.log("============================\n");
