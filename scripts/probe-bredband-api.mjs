// scripts/probe-bredband-api.mjs — v4 Tele2 adress→plan-API-recon.
// Tele2:s bredbandspriser ligger bakom ett adress-gated API (api-web.tele2.se). Den här
// sonden kartlägger (a) ALLA api-anrop sidan gör, och (b) adress-widgetens DOM, så vi kan
// driva adressflödet och sedan replaya plan-API:t direkt i en robust vakt. Skriver inget.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const URL = 'https://www.tele2.se/foretag/bredband';
const ADDRESS = 'Sveavägen 44';

const API_RX = /(api-web\.tele2|graphql|content-api|broadband|bredband|address|adress|product|offer|price|pris|availab|tillgang|sok|search|autocomplete|suggest)/i;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await context.newPage();
page.setDefaultTimeout(30000);

const calls = [];
page.on('request', (req) => {
  const u = req.url();
  if (API_RX.test(u) && /\/(api|graphql|content-api)/i.test(u)) calls.push(`${req.method()} ${u.slice(0, 150)}`);
});

let status = 'ok';
try { const r = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Jag godkänner")']) {
  try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1500 })) { await b.click(); await page.waitForTimeout(1500); break; } } catch {}
}
await page.waitForTimeout(2500);

// (b) Dumpa adress-widgetens DOM: alla inputs + deras attribut.
const inputs = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('input, [contenteditable="true"]')).slice(0, 12).map((el) => ({
    tag: el.tagName, type: el.getAttribute('type'), name: el.getAttribute('name'),
    ph: el.getAttribute('placeholder'), aria: el.getAttribute('aria-label'),
    id: el.id, cls: (el.className || '').toString().slice(0, 60),
  }));
});
console.log(`=== Tele2 bredband — status ${status} ===`);
console.log('── inputs på sidan ──');
for (const i of inputs) console.log(`  ${i.tag} type=${i.type} name=${i.name} ph="${i.ph}" aria="${i.aria}" id=${i.id} cls="${i.cls}"`);

const callsBefore = calls.length;
// (a) Försök skriva adress i det mest adress-lika fältet och fånga vilka API-anrop som triggas.
try {
  const cand = page.locator('input[placeholder*="adress" i], input[aria-label*="adress" i], input[name*="address" i], input[type="search"], input[type="text"]').first();
  if (await cand.isVisible({ timeout: 3000 })) {
    await cand.click();
    for (const ch of ADDRESS) { await cand.type(ch, { delay: 90 }); }
    await page.waitForTimeout(4000); // låt autocomplete-API:t fyra
    await page.keyboard.press('ArrowDown').catch(() => {});
    await page.keyboard.press('Enter').catch(() => {});
    await page.waitForTimeout(4000);
  } else { console.log('  (hittade inget adress-likt fält)'); }
} catch (e) { console.log('  adress-interaktion fel:', e.message.split('\n')[0]); }

console.log('── api-anrop (unika) ──');
const seen = new Set();
for (const c of calls) { const key = c.split('?')[0]; if (seen.has(key)) continue; seen.add(key); console.log(`  ${c}`); }
console.log(`(${calls.length} api-anrop totalt, ${callsBefore} före adress-input)`);
console.log('[probe-bredband-api v4] klar');
await browser.close();
