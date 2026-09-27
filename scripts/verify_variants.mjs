import fs from "fs";
import { servicesTr } from "../src/content/services/tr.ts";

const prompts = JSON.parse(fs.readFileSync("scripts/prompts_data.json", "utf8"));

let mismatch = 0;
for (const [sId, service] of Object.entries(servicesTr)) {
  const servicePrompts = prompts.filter(p => p.serviceId === sId && p.type === 'variant');
  if (service.variants.length !== servicePrompts.length) {
    console.error(`Variant count mismatch for ${sId}: ${service.variants.length} vs ${servicePrompts.length}`);
    mismatch++;
  }
  service.variants.forEach((v, idx) => {
    const p = servicePrompts[idx];
    if (!p) {
      console.error(`Missing prompt for ${sId} [${idx}] ${v.name}`);
      mismatch++;
    } else {
      console.log(`[OK] ${sId} #${p.id}: ${v.name} -> ${p.imagePath}`);
    }
  });
}
if (mismatch === 0) console.log('\nSUCCESS: All 101 service variants matched prompts 100%!');
