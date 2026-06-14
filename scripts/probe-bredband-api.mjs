// scripts/probe-bredband-api.mjs — nätverks-sond för bredbands-priskällan.
// Vendor-DOM:en är adress-gated/cookie-vägg → fånga XHR/fetch-svaren istället och hitta
// det API som bär planer+priser (samma idé som Eurostat/M365: gå till den strukturerade källan).
// Skriver inget — dumpar bara kandidat-endpoints + pris-bärande JSON-snuttar.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const ADDRESS = 'Sveavägen 44, Stockholm';

const SOURCES = [
  { tag: 'Tele2',   url: 'https://www.tele2.se/foretag/bredband' },
  { tag: 'Bahnhof', url: 'https://www.bahnhof.se/foretag/internet' },
];

const PRICEY = /(\d{3,4})\s*kr|"price"|"pris"|mbit|mbit|"amount"|"monthlyFee"|kr\/m/i;
const APIISH = /(api|graphql|pris|price|plan|product|broadband|bredband|offer|catalog|address|adress)/i;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

for (const src of SOURCES) {
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  const hits = [];
  page.on('response', async (resp) => {
    try {
      const url = resp.url();
      const ct = (resp.headers()['content-type'] || '');
      if (!/json|javascript|text/.test(ct) && !APIISH.test(url)) return;
      if (!APIISH.test(url)) return;
      const body = await resp.text().catch(() => '');
      if (body && PRICEY.test(body)) {
        const m = body.match(/.{0,40}(\d{3,4}\s*kr|"price"\s*:\s*\d+|"amount"\s*:\s*\d+|\d{3,4}\s*(?:mbit|Mbit)).{0,40}/i);
        hits.push({ url: url.slice(0, 140), status: resp.status(), ct: ct.split(';')[0], snippet: m ? m[0].replace(/\s+/g, ' ').trim() : '(pris-token)' });
      }
    } catch {}
  });

  let status = 'ok';
  try { const r = await page.goto(src.url, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Jag godkänner")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1500 })) { await b.click(); await page.waitForTimeout(1500); break; } } catch {}
  }
  // Försök mata in en känd adress i första rimliga fält och trigga sök.
  try {
    const input = page.locator('input[type="text"], input[type="search"], input:not([type])').first();
    if (await input.isVisible({ timeout: 3000 })) {
      await input.click(); await input.type(ADDRESS, { delay: 30 });
      await page.waitForTimeout(2500);
      await page.keyboard.press('Enter').catch(() => {});
      await page.waitForTimeout(3500);
      // klicka första autocomplete-förslag om det finns
      const opt = page.locator('[role="option"], li[class*="suggest"], [class*="autocomplete"] li').first();
      if (await opt.isVisible({ timeout: 1500 })) { await opt.click(); await page.waitForTimeout(3500); }
    }
  } catch {}
  await page.waitForTimeout(2000);

  console.log(`\n=== ${src.tag} — status ${status}, ${hits.length} pris-bärande API-svar ===`);
  const seen = new Set();
  for (const h of hits) {
    const key = h.url.split('?')[0];
    if (seen.has(key)) continue; seen.add(key);
    console.log(`  [${h.status} ${h.ct}] ${h.url}`);
    console.log(`      → ${h.snippet}`);
  }
  if (hits.length === 0) console.log('  (inga pris-bärande API-svar fångade)');
  await page.close();
}
console.log('\n[probe-bredband-api] klar');
await browser.close();
