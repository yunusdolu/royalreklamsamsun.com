import fs from "fs";

const prompts = JSON.parse(fs.readFileSync("scripts/prompts_data.json", "utf8"));
const variantPrompts = prompts.filter(p => p.type === "variant");

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // We match each service block and then update variants
  for (const p of variantPrompts) {
    // If the variant name is in the file and doesn't already have this image
    // Find the variant by name
    const escapedName = p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Regex looking for the variant object in TR
    const trRegex = new RegExp(`(name:\\s*["'\`]${escapedName}["'\`][\\s\\S]*?description:\\s*["'\`][\\s\\S]*?["'\`])(,?\\s*(?:image:\\s*["'\`][^"'\`]+["'\`])?\\s*\\})`, 'g');
    
    if (content.match(trRegex)) {
      content = content.replace(trRegex, (match, p1) => {
        return `${p1},\n        image: "${p.imagePath}",\n      }`;
      });
    }
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated ${filePath}`);
}

updateFile("src/content/services/tr.ts");
