// scripts/probe-bredband-api.mjs — v7: driv Tele2:s adress-combobox och fånga tillgänglighets/pris-API.
// Widgeten är input[role="combobox"] (synlig). Cookie-bannern måste bort först (annars
// fångas klick). Skriver inget — dumpar autocomplete- + tillgänglighets-endpoints med kroppar.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const PAGE = 'https://www.tele2.se/bredband';
const ADDRESS = 'Sveavägen 44 Stockholm';
const INTEREST = /(availab|tillgang|address|adress|broadband|bredband|product|offer|price|pris|installation|utbud|coverage|fastighet|point|delivery|leverans|sok|search|autocomplete|suggest|typeahead|place|lookup|net)/i;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await context.newPage();
page.setDefaultTimeout(15000);

const recs = [];
page.on('response', async (resp) => {
  try {
    const req = resp.request();
    const url = resp.url();
    if (!INTEREST.test(url) || /\.(js|css|woff|png|svg|jpg)($|\?)|translation|maintenance|whitelist|tracking|onetrust|cookielaw|astro/i.test(url)) return;
    let body = ''; try { body = (await resp.text()).slice(0, 1100); } catch {}
    recs.push({ m: req.method(), url: url.slice(0, 180), s: resp.status(), post: (req.postData() || '').slice(0, 200), body: body.replace(/\s+/g, ' ') });
  } catch {}
});

let status = 'ok';
try { const r = await page.goto(PAGE, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }

// Cookie bort — flera försök, force.
for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera Alla")', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")']) {
  try { await page.click(sel, { force: true, timeout: 2500 }); await page.waitForTimeout(1500); break; } catch {}
}
await page.waitForTimeout(2500);
console.log(`========== ${PAGE} — status ${status} ==========`);

// Driv combobox: scrolla in, klicka, skriv tecken för tecken, fånga autocomplete.
let drove = false;
try {
  const box = page.locator('input[role="combobox"]').first();
  await box.scrollIntoViewIfNeeded({ timeout: 5000 });
  await box.click({ force: true, timeout: 5000 });
  for (const ch of ADDRESS) { await box.type(ch, { delay: 120 }); }
  drove = true;
  await page.waitForTimeout(5000); // autocomplete-API fyr
  // Välj första förslaget i listboxen.
  const opt = page.locator('[role="option"], [role="listbox"] li, [class*="option" i], [class*="suggestion" i]').first();
  try { if (await opt.isVisible({ timeout: 3000 })) { await opt.click({ timeout: 3000 }); } else { await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); } }
  catch { await page.keyboard.press('ArrowDown').catch(() => {}); await page.keyboard.press('Enter').catch(() => {}); }
  await page.waitForTimeout(6000); // tillgänglighets/pris-API fyr
} catch (e) { console.log('  combobox-fel:', e.message.split('\n')[0]); }
console.log('drove combobox:', drove);
await page.waitForTimeout(1500);

// Dumpa eventuell pris-text som nu syns (StickyPrice).
const priceText = await page.evaluate(() => {
  const t = (document.body.innerText || '').replace(/\s+/g, ' ');
  const m = [...t.matchAll(/(\d[\d ]*)\s*kr\s*\/?\s*m[åa]n/gi)].slice(0, 8).map((x) => x[0].trim());
  return [...new Set(m)];
});
console.log('pris-text på sidan:', JSON.stringify(priceText));

console.log(`── ${recs.length} kandidat-svar ──`);
const seen = new Set();
for (const r of recs) { const k = r.m + r.url.split('?')[0]; if (seen.has(k)) continue; seen.add(k);
  console.log(`\n  [${r.s}] ${r.m} ${r.url}`); if (r.post) console.log(`     POST: ${r.post}`); if (r.body) console.log(`     BODY: ${r.body.slice(0, 650)}`); }
console.log('\n[probe-bredband-api v7] klar');
await browser.close();
