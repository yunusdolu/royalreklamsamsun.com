import fs from "fs";
import { servicesEn } from "../src/content/services/en.ts";

const prompts = JSON.parse(fs.readFileSync("scripts/prompts_data.json", "utf8"));
const variantPrompts = prompts.filter(p => p.type === "variant");

let enFileContent = fs.readFileSync("src/content/services/en.ts", "utf8");

for (const [serviceId, service] of Object.entries(servicesEn)) {
  const serviceVariants = variantPrompts.filter(p => p.serviceId === serviceId);
  service.variants.forEach((v, idx) => {
    const p = serviceVariants[idx];
    if (p) {
      // Find this variant in enFileContent
      const escapedName = v.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(name:\\s*["'\`]${escapedName}["'\`][\\s\\S]*?description:\\s*["'\`][\\s\\S]*?["'\`])(,?\\s*(?:image:\\s*["'\`][^"'\`]+["'\`])?\\s*\\})`, 'g');
      enFileContent = enFileContent.replace(regex, (match, p1) => {
        return `${p1},\n        image: "${p.imagePath}",\n      }`;
      });
    }
  });
}

fs.writeFileSync("src/content/services/en.ts", enFileContent, "utf8");
console.log("Updated src/content/services/en.ts with all variant images!");
