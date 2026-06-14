// scripts/probe-bredband-api.mjs — v5: fullständig recon av Tele2:s adress→tillgänglighets-API.
// Fångar request- OCH response-kroppar när adress-checkern drivs, så vi ser autocomplete-
// endpointen + plan/pris-endpointen + deras payloads. Mål: kunna replaya API:t direkt
// (ingen DOM) i vakten med fasta adresser → Zon A/B/C. Skriver inget.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
// Konsumentsidan har en tydlig adress-checker; backend-API:t är oftast delat med företag.
const PAGES = [
  'https://www.tele2.se/bredband',
  'https://www.tele2.se/handla/bredband',
];
const ADDRESS = 'Sveavägen 44';
const INTEREST = /(api-web\.tele2|graphql|availab|tillgang|address|adress|broadband|bredband|product|offer|price|pris|installation|utbud|coverage|sok|search|autocomplete|suggest|point|fastighet)/i;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

for (const PAGE of PAGES) {
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  const recs = [];
  page.on('response', async (resp) => {
    try {
      const req = resp.request();
      const url = resp.url();
      if (!INTEREST.test(url)) return;
      if (req.resourceType() === 'document' || req.resourceType() === 'image' || req.resourceType() === 'stylesheet') return;
      let body = '';
      try { body = (await resp.text()).slice(0, 700); } catch {}
      recs.push({ method: req.method(), url: url.slice(0, 170), status: resp.status(), post: (req.postData() || '').slice(0, 250), body: body.replace(/\s+/g, ' ') });
    } catch {}
  });

  let status = 'ok';
  try { const r = await page.goto(PAGE, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Jag godkänner")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1500 })) { await b.click(); await page.waitForTimeout(1500); break; } } catch {}
  }
  await page.waitForTimeout(2500);

  // Lista adress-lika fält (för diagnos) och driv det första.
  const fields = await page.evaluate(() => Array.from(document.querySelectorAll('input')).slice(0, 15)
    .map((el) => ({ ph: el.getAttribute('placeholder'), aria: el.getAttribute('aria-label'), name: el.getAttribute('name'), type: el.getAttribute('type') }))
    .filter((f) => /adress|gatuadress|sök|search|address|postnr/i.test(`${f.ph} ${f.aria} ${f.name}`)));
  console.log(`\n========== ${PAGE} — status ${status} ==========`);
  console.log('adress-lika fält:', JSON.stringify(fields));

  try {
    const cand = page.locator('input[placeholder*="adress" i], input[aria-label*="adress" i], input[placeholder*="gatuadress" i], input[name*="address" i], input[placeholder*="Sök" i]').first();
    if (await cand.isVisible({ timeout: 4000 })) {
      await cand.click();
      for (const ch of ADDRESS) await cand.type(ch, { delay: 110 });
      await page.waitForTimeout(4500); // låt autocomplete fyra
      await page.keyboard.press('ArrowDown').catch(() => {});
      await page.keyboard.press('Enter').catch(() => {});
      await page.waitForTimeout(5000); // låt tillgänglighets/pris-API fyra
    } else { console.log('  (inget adressfält synligt på denna sida)'); }
  } catch (e) { console.log('  adress-interaktion fel:', e.message.split('\n')[0]); }
  await page.waitForTimeout(1500);

  console.log(`── ${recs.length} intressanta svar ──`);
  const seen = new Set();
  for (const r of recs) {
    const key = r.method + r.url.split('?')[0];
    if (seen.has(key)) continue; seen.add(key);
    console.log(`\n  [${r.status}] ${r.method} ${r.url}`);
    if (r.post) console.log(`     POST: ${r.post}`);
    if (r.body) console.log(`     BODY: ${r.body.slice(0, 420)}`);
  }
  await page.close();
}
console.log('\n[probe-bredband-api v5] klar');
await browser.close();
