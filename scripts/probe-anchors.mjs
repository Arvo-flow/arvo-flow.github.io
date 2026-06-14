// scripts/probe-anchors.mjs — upptäcktsrunda v2 för bredband- + kortterminal-ankare.
// Renderar varje leverantörssida med Playwright och dumpar pris-/avgiftskontext.
// domcontentloaded (inte networkidle — vissa sidor når aldrig idle). Ingen skrivning.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const SOURCES = [
  { tag: 'bredband/Tele2',    url: 'https://www.tele2.se/foretag/bredband',          rx: /(\d[\d ]*)\s*kr/gi, min: 200 },
  { tag: 'bredband/Bahnhof',  url: 'https://www.bahnhof.se/foretag/internet',        rx: /(\d[\d ]*)\s*kr/gi, min: 200 },
  { tag: 'kort/SumUp-home',   url: 'https://www.sumup.com/sv-se/',                   rx: /(\d[\d ]*[.,]\d{1,2})\s*%/g, min: 0 },
  { tag: 'kort/SumUp-lasare', url: 'https://www.sumup.com/sv-se/kortlasare/',        rx: /(\d[\d ]*[.,]\d{1,2})\s*%/g, min: 0 },
  { tag: 'kort/Zettle',       url: 'https://www.zettle.com/se/priser',               rx: /(\d[\d ]*[.,]\d{1,2})\s*%/g, min: 0 },
  { tag: 'kort/Stripe',       url: 'https://stripe.com/se/terminal',                 rx: /(\d[\d ]*[.,]\d{1,2})\s*%/g, min: 0 },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

for (const src of SOURCES) {
  const page = await context.newPage();
  page.setDefaultTimeout(35000);
  let status = 'ok';
  try {
    const resp = await page.goto(src.url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    status = resp ? resp.status() : 'no-response';
  } catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Accept all")', 'button:has-text("Jag godkänner")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1200 })) { await b.click(); await page.waitForTimeout(1500); break; } } catch {}
  }
  await page.waitForTimeout(4000);
  const text = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
  console.log(`\n=== ${src.tag} — status ${status}, len ${text.length} ===`);
  const seen = new Set();
  let m, n = 0;
  while ((m = src.rx.exec(text)) && n < 20) {
    const val = m[1].replace(/\s/g, '');
    if (src.min && Number(val) < src.min) continue;
    const before = text.slice(Math.max(0, m.index - 50), m.index).trim();
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 22).trim();
    const key = before.slice(-20) + val;
    if (seen.has(key)) continue; seen.add(key);
    console.log(`  [${m[0].trim()}]  …${before}  «»  ${after}…`);
    n++;
  }
  if (n === 0) console.log('  (inga träffar)');
  await page.close();
}
console.log('\n[probe-anchors] klar');
await browser.close();
