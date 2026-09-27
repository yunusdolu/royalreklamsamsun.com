import fs from "fs";
import { servicesTr } from "../src/content/services/tr.ts";

for (const [id, service] of Object.entries(servicesTr)) {
  console.log(`Service: ${id} (${service.name}) - ${service.variants.length} variants`);
  service.variants.forEach((v, i) => {
    console.log(`  ${i + 1}. ${v.name}`);
  });
}
