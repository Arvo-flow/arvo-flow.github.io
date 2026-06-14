// scripts/probe-anchors.mjs — upptäcktsrunda för bredband- + kortterminal-ankare.
// Renderar varje leverantörssida med Playwright och dumpar pris-/avgiftskontext så vi
// kan skriva deterministiska vakter (samma mönster som Tele2-mobil-sonden). Ingen skrivning.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const SOURCES = [
  { tag: 'bredband/Tele2',   url: 'https://www.tele2.se/foretag/bredband',     rx: /(\d[\d ]*)\s*kr\s*\/?\s*m[åa]n/gi, min: 100 },
  { tag: 'bredband/Bahnhof', url: 'https://www.bahnhof.se/foretag/internet',   rx: /(\d[\d ]*)\s*kr\s*\/?\s*m[åa]n/gi, min: 100 },
  { tag: 'kortterminal/SumUp',  url: 'https://sumup.com/sv-se/avgifter/',       rx: /(\d[\d ]*[.,]\d{1,2})\s*%/g, min: 0 },
  { tag: 'kortterminal/Zettle', url: 'https://www.zettle.com/se/priser',        rx: /(\d[\d ]*[.,]\d{1,2})\s*%/g, min: 0 },
  { tag: 'kortterminal/Stripe', url: 'https://stripe.com/se/terminal/pricing',  rx: /(\d[\d ]*[.,]\d{1,2})\s*%/g, min: 0 },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

for (const src of SOURCES) {
  const page = await context.newPage();
  page.setDefaultTimeout(40000);
  let status = 'ok';
  try {
    const resp = await page.goto(src.url, { waitUntil: 'networkidle', timeout: 40000 });
    status = resp ? resp.status() : 'no-response';
  } catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Accept all")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1200 })) { await b.click(); await page.waitForTimeout(1200); break; } } catch {}
  }
  await page.waitForTimeout(2000);
  const text = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
  console.log(`\n=== ${src.tag} — status ${status}, len ${text.length} ===`);
  const seen = new Set();
  let m, n = 0;
  while ((m = src.rx.exec(text)) && n < 18) {
    const val = m[1].replace(/\s/g, '');
    if (src.min && Number(val) < src.min) continue;
    const before = text.slice(Math.max(0, m.index - 55), m.index).trim();
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 25).trim();
    const key = before.slice(-22) + val;
    if (seen.has(key)) continue; seen.add(key);
    console.log(`  [${m[0].trim()}]  …${before}  «»  ${after}…`);
    n++;
  }
  if (n === 0) console.log('  (inga träffar — JS-render eller annan struktur)');
  await page.close();
}
console.log('\n[probe-anchors] klar');
await browser.close();
