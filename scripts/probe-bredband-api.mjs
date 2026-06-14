// scripts/probe-bredband-api.mjs — v6: DOM-recon för Tele2:s adress-checker (Astro-storefront).
// Dumpar ALLA knappar + inputs så vi ser adress-widgetens trigger, klickar den, driver
// adressfältet och fångar tillgänglighets/pris-API:t (request+response). Skriver inget.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const PAGE = 'https://www.tele2.se/bredband';
const ADDRESS = 'Sveavägen 44';
const INTEREST = /(availab|tillgang|address|adress|broadband|bredband|product|offer|price|pris|installation|utbud|coverage|fastighet|point|net-?adm|delivery|leverans)/i;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await context.newPage();
page.setDefaultTimeout(30000);

const recs = [];
page.on('response', async (resp) => {
  try {
    const req = resp.request();
    const url = resp.url();
    if (!INTEREST.test(url) || /\.js($|\?)|\.css|translation|maintenance|whitelist|tracking/i.test(url)) return;
    if (['document', 'image', 'stylesheet', 'font', 'script'].includes(req.resourceType())) return;
    let body = ''; try { body = (await resp.text()).slice(0, 900); } catch {}
    recs.push({ m: req.method(), url: url.slice(0, 175), s: resp.status(), post: (req.postData() || '').slice(0, 200), body: body.replace(/\s+/g, ' ') });
  } catch {}
});

let status = 'ok';
try { const r = await page.goto(PAGE, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
  try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1500 })) { await b.click(); await page.waitForTimeout(1500); break; } } catch {}
}
await page.waitForTimeout(3000);

const dom = await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button, a[role="button"], [role="button"]'))
    .map((b) => (b.textContent || '').replace(/\s+/g, ' ').trim()).filter((t) => t && t.length < 45);
  const inputs = Array.from(document.querySelectorAll('input, [contenteditable="true"]')).map((el) => ({
    type: el.getAttribute('type'), name: el.getAttribute('name'), ph: el.getAttribute('placeholder'),
    aria: el.getAttribute('aria-label'), role: el.getAttribute('role'), vis: el.offsetParent !== null,
  }));
  return { btns: [...new Set(btns)].slice(0, 40), inputs: inputs.slice(0, 20) };
});
console.log(`========== ${PAGE} — status ${status} ==========`);
console.log('KNAPPAR:', JSON.stringify(dom.btns));
console.log('INPUTS:', JSON.stringify(dom.inputs));

// Försök trigga adress-checkern: klicka knapp som låter som adress/utbud/kolla.
const triggerRx = /kolla|adress|utbud|se vad|sök|hitta|beställ|kom igång|välj|handla/i;
for (const label of dom.btns) {
  if (!triggerRx.test(label)) continue;
  try {
    const b = page.locator(`button:has-text("${label}"), [role="button"]:has-text("${label}")`).first();
    if (await b.isVisible({ timeout: 1000 })) { console.log(`→ klickar trigger: "${label}"`); await b.click(); await page.waitForTimeout(2500); break; }
  } catch {}
}
// Driv valfritt nu synligt adressfält.
try {
  const cand = page.locator('input[name="address"], input[placeholder*="adress" i], input[aria-label*="adress" i], input[type="search"], input[type="text"]:visible').first();
  if (await cand.isVisible({ timeout: 3000 })) {
    await cand.click(); for (const ch of ADDRESS) await cand.type(ch, { delay: 110 });
    await page.waitForTimeout(4500);
    await page.keyboard.press('ArrowDown').catch(() => {}); await page.keyboard.press('Enter').catch(() => {});
    await page.waitForTimeout(5000);
  } else { console.log('  (fortfarande inget synligt adressfält efter trigger)'); }
} catch (e) { console.log('  adress-fel:', e.message.split('\n')[0]); }
await page.waitForTimeout(1500);

console.log(`── ${recs.length} tillgänglighets/pris-svar ──`);
const seen = new Set();
for (const r of recs) { const k = r.m + r.url.split('?')[0]; if (seen.has(k)) continue; seen.add(k);
  console.log(`\n  [${r.s}] ${r.m} ${r.url}`); if (r.post) console.log(`     POST: ${r.post}`); if (r.body) console.log(`     BODY: ${r.body.slice(0, 500)}`); }
console.log('\n[probe-bredband-api v6] klar');
await browser.close();
