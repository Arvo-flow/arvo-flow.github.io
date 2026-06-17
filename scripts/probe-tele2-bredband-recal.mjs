// scripts/probe-tele2-bredband-recal.mjs — fånga Tele2:s NUVARANDE broadband/products-anrop.
// Adress-API:t (feasibility) funkar; products ger 500 på våra lagrade params (entryId/infra).
// Vi driver den riktiga bredbands-adressökningen och nätverksfångar det skarpa products-
// anropet → ser de nya params (entryId, infrastructure, category). Ren spaning. GH Actions.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const URLS = [
  'https://www.tele2.se/handla/bredband',
  'https://www.tele2.se/bredband',
  'https://www.tele2.se/foretag/bredband',
];
const ADDR = 'Götgatan 92B';

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await ctx.newPage();
page.setDefaultTimeout(30000);

const apiHits = [];
page.on('request', (req) => {
  const u = req.url();
  if (/\/api\/.*(broadband|feasibility|product|address|offer)/i.test(u)) {
    apiHits.push({ method: req.method(), url: u });
  }
});

for (const url of URLS) {
  let status = '?';
  try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  console.log(`\n#### ${url} — status ${status}`);
  if (typeof status !== 'number' || status >= 400) continue;

  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn")', 'button:has-text("Acceptera")']) {
    try { await page.click(sel, { timeout: 1500 }); await page.waitForTimeout(1000); break; } catch {}
  }
  await page.waitForTimeout(2500);

  // Hitta adressfältet och skriv.
  let typed = false;
  const inputs = await page.$$('input:visible, input[type="text"], input[type="search"]');
  for (const el of inputs) {
    const meta = (await el.evaluate((e) => `${e.name || ''} ${e.id || ''} ${e.placeholder || ''} ${e.getAttribute('aria-label') || ''}`)).toLowerCase();
    if (/adress|postnummer|gata|sök|address|zip/.test(meta)) {
      try { await el.click(); await el.fill(ADDR); typed = true; await page.waitForTimeout(2500); break; } catch {}
    }
  }
  if (!typed && inputs[0]) { try { await inputs[0].click(); await inputs[0].fill(ADDR); typed = true; await page.waitForTimeout(2500); } catch {} }
  console.log(`  skrev adress: ${typed}`);

  // Klicka första adress-förslaget (combobox/listbox-option).
  for (const sel of ['[role="option"]', 'li[role="option"]', 'ul li button', '.suggestion', '[data-testid*="suggestion"]', 'button:has-text("GÖTGATAN")']) {
    try { await page.click(sel, { timeout: 2000 }); console.log(`  klickade förslag via ${sel}`); break; } catch {}
  }
  await page.waitForTimeout(5000);

  if (apiHits.some((h) => /broadband\/products/i.test(h.url))) break; // fångade products
}

console.log('\n==================== Fångade API-anrop ====================');
const seen = new Set();
for (const h of apiHits) {
  const k = h.method + h.url.split('?')[0];
  if (seen.has(k)) continue; seen.add(k);
  console.log(`\n[${h.method}] ${h.url}`);
}
if (!apiHits.length) console.log('(inga broadband/feasibility-anrop fångade — adressdrivningen träffade inte rätt fält)');

await browser.close();
console.log('\n[probe-tele2-bredband-recal] klar');
