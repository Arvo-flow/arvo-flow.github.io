// scripts/probe-tele2-mobil.mjs — upptäcktsrunda Tele2 Företag mobilabonnemang.
// Huvudplanerna är JS-renderade (server-HTML ger bara tillägg) → Playwright.
// Dumpar plan→pris-strukturen ur den renderade DOM:en så vi kan skriva en
// deterministisk parser + driftvakt. Inga inserts, ingen prisboksskrivning.

import { chromium } from 'playwright';

const URL = 'https://www.tele2.se/foretag/mobilabonnemang';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await context.newPage();
page.setDefaultTimeout(45000);

let status = 'ok';
try {
  const resp = await page.goto(URL, { waitUntil: 'networkidle', timeout: 45000 });
  status = resp ? resp.status() : 'no-response';
} catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }

// Cookie-vägg blockerar ofta innehåll — försök acceptera (best effort).
for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
  try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1500 })) { await b.click(); await page.waitForTimeout(1500); break; } } catch {}
}
await page.waitForTimeout(2500);

const text = await page.evaluate(() => document.body?.innerText ?? '');
console.log(`Tele2 status ${status}, innerText len ${text.length}`);

// 1) Varje "NNN kr"-pris med kontext före/efter (planens namn ligger oftast nära).
const flat = text.replace(/\s+/g, ' ');
const re = /(\d[\d ]*)\s*kr/g;
const seen = new Set();
let m, n = 0;
console.log('── pris-kontext ──');
while ((m = re.exec(flat)) && n < 40) {
  const price = m[1].replace(/\s/g, '');
  if (Number(price) < 50) continue; // hoppa över småbelopp/datamängder
  const before = flat.slice(Math.max(0, m.index - 70), m.index).trim();
  const after = flat.slice(m.index + m[0].length, m.index + m[0].length + 35).trim();
  const key = before.slice(-25) + price;
  if (seen.has(key)) continue; seen.add(key);
  console.log(`  [${price} kr]  …${before}  «PRIS»  ${after}…`);
  n++;
}

// 2) Strukturerad kortavsökning: rubriker (h1-h4) + närliggande pris i samma block.
const cards = await page.evaluate(() => {
  const out = [];
  const heads = Array.from(document.querySelectorAll('h1,h2,h3,h4,[class*="card"] [class*="title"],[class*="plan"] [class*="name"]'));
  for (const h of heads) {
    const name = (h.textContent || '').trim();
    if (!name || name.length > 40) continue;
    // leta pris i närmaste kort-container
    let box = h.closest('[class*="card"],[class*="plan"],article,li,section') || h.parentElement;
    const t = (box?.textContent || '').replace(/\s+/g, ' ');
    const pm = t.match(/(\d[\d ]*)\s*kr\s*\/?\s*(mån|månad)?/i);
    if (pm) out.push({ name, price: pm[1].replace(/\s/g, ''), ctx: t.slice(0, 90) });
  }
  return out.slice(0, 25);
});
console.log('── kort (rubrik → pris) ──');
for (const c of cards) console.log(`  ${c.name.padEnd(22)} → ${c.price} kr   «${c.ctx}»`);

console.log('[probe-tele2] klar');
await browser.close();
