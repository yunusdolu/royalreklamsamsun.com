/**
 * Kullanıcının bildirdiği senaryo: 3 hizmet + çeşitler + adet 2 + zamanlama
 * seçiliyken genişlik kaydırağı sürükleniyor. m² çipi alt satıra geçerken
 * yerinden kopuyor muydu — artık kopuyor mu?
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const OUT =
  "C:/Users/can20/AppData/Local/Temp/claude/c--Users-can20-Desktop-royalreklamsamsun-com/00888013-2f01-4b4f-877e-e67057fd16e2/scratchpad/";
const PORT = 9458;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--hide-scrollbars",
    "--no-first-run",
    "--user-data-dir=C:/Users/can20/AppData/Local/Temp/cdp-wrap",
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const l = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const pg = l.find((t) => t.type === "page");
      if (pg) return pg;
    } catch {}
    await sleep(300);
  }
  throw new Error("chrome baslamadi");
}

const page = await target();
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const ev = (src) =>
  send("Runtime.evaluate", { expression: `(${src})()`, returnByValue: true }).then(
    (r) => r.result?.result?.value,
  );

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1800,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.navigate", { url: "http://localhost:3000/teklif-al" });
await sleep(7000);

const SET =
  "(el, v) => { const d = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; d.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); }";

/* Üç hizmet, birkaç çeşit, adet 2, yükseklik ve zamanlama */
await ev(`() => {
  const s = ${SET};
  const tiles = [...document.querySelectorAll('button[aria-pressed]')];
  tiles[0].click(); tiles[1].click(); tiles[2].click();
}`);
await sleep(1200);
await ev(`() => {
  const chips = [...document.querySelectorAll('fieldset button[aria-pressed]')];
  chips.slice(0, 5).forEach((b) => b.click());
}`);
await sleep(1000);
await ev(`() => {
  const s = ${SET};
  s(document.querySelector('#q-quantity'), '2');
  s(document.querySelectorAll('input[type=range]')[1], '160');
  const timing = [...document.querySelectorAll('button[aria-pressed]')]
    .find((b) => /hafta|normal/i.test(b.textContent));
  if (timing) timing.click();
}`);
await sleep(1500);

const oku = () =>
  ev(`() => {
    const card = [...document.querySelectorAll('h2')]
      .find((h) => h.textContent.trim() === '\u00d6zet').closest('div.relative');
    const kutu = card.querySelector('div.flex.flex-wrap');
    const cips = [...kutu.children].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        metin: el.textContent.trim(),
        ust: Math.round(r.top),
        sol: Math.round(r.left),
        sag: Math.round(r.right),
        alt: Math.round(r.bottom),
        donusum: getComputedStyle(el).transform,
      };
    });
    const kr = kutu.getBoundingClientRect();
    return JSON.stringify({
      kutu: { ust: Math.round(kr.top), alt: Math.round(kr.bottom) },
      cips,
    });
  }`);

console.log("baslangic:", await oku());

/* Kaydırağı hızlıca oynat, her karede kontrol et */
const hatalar = [];
const satirlar = new Set();
for (const v of ["100", "250", "400", "560", "690", "820", "950", "690", "300"]) {
  await ev(`() => { const s = ${SET}; s(document.querySelectorAll('input[type=range]')[0], '${v}'); }`);
  await sleep(140);
  const durum = JSON.parse(await oku());
  const altin = durum.cips.find((c) => c.metin.includes("m²"));
  if (!altin) continue;
  satirlar.add(altin.ust);

  /* Çip kutunun dışına taşmış mı ya da kendi satırından kopmuş mu */
  if (altin.ust < durum.kutu.ust - 1 || altin.alt > durum.kutu.alt + 1) {
    hatalar.push(`kutu disina tasti @${v}: ${JSON.stringify(altin)}`);
  }
  /* Üstündeki çiplerle çakışma */
  for (const c of durum.cips) {
    if (c === altin) continue;
    const dikeyCakisma = altin.ust < c.alt - 1 && altin.alt > c.ust + 1;
    const yatayCakisma = altin.sol < c.sag - 1 && altin.sag > c.sol + 1;
    if (dikeyCakisma && yatayCakisma) {
      hatalar.push(`cakisma @${v}: "${altin.metin}" ile "${c.metin}"`);
    }
  }
}

console.log("gorulen satir sayisi:", satirlar.size);
console.log("hata:", hatalar.length === 0 ? "yok" : JSON.stringify(hatalar, null, 2));
console.log("son:", await oku());

const box = await ev(`() => {
  const card = [...document.querySelectorAll('h2')]
    .find((h) => h.textContent.trim() === '\u00d6zet').closest('div.relative');
  const r = card.getBoundingClientRect();
  return JSON.stringify({ x: r.x, y: r.y, width: r.width, height: r.height });
}`);
const r = JSON.parse(box);
const shot = await send("Page.captureScreenshot", {
  format: "png",
  clip: { x: r.x - 6, y: r.y - 6, width: r.width + 12, height: r.height + 12, scale: 1 },
});
writeFileSync(OUT + "w-son.png", Buffer.from(shot.result.data, "base64"));

ws.close();
chrome.kill();
