// scripts/verify-kortterminal-rates.mjs — driftvakt för kortterminal-transaktionsrater.
//
// branchindex.kortterminal.verifiedRates ankrar det verifierbara (raten %). Sidorna är
// JS-renderade → Playwright. Vakten renderar varje leverantörssida och kontrollerar att den
// lagrade raten fortfarande står där. Rött vid drift (Zettle gick t.ex. 1,75 → 1,85 %).
//
//   node scripts/verify-kortterminal-rates.mjs        (live — kräver HTTP-egress + Chromium)
//
// HTTP/Chromium saknas i sandboxen → körs på GitHub Actions-runnern
// (.github/workflows/verify-kortterminal-rates.yml, veckovis + manuell).
//
// REGEL 1/3/4: förväntan härleds ur prisboken (ingen andra kopia). Rött bygge vid drift →
// människa bekräftar och uppdaterar verifiedRates. Vakten skriver aldrig själv.

import { chromium } from 'playwright';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const vr = BRANCHINDEX.kortterminal?.verifiedRates;
if (!vr?.rates?.length) { console.error('[kort-vakt] verifiedRates saknas'); process.exit(1); }

function pctRx(pct) {
  // Matcha lagrad rate på sidan, komma ELLER punkt. Tål en-decimalform: 1,40 → "1,4" eller "1,40".
  const [intPart, decPart] = pct.toFixed(2).split('.');           // 1.85 → ["1","85"], 1.40 → ["1","40"]
  const dec = decPart.endsWith('0') ? `${decPart[0]}0?` : decPart;  // "40" → "40?" (matchar 1,4 och 1,40), "85" → "85"
  return new RegExp(`\\b${intPart}[.,]${dec}\\s*%`);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

const drift = [];
for (const r of vr.rates) {
  const page = await context.newPage();
  page.setDefaultTimeout(35000);
  let status = 'ok', text = '';
  try {
    const resp = await page.goto(r.url, { waitUntil: 'domcontentloaded', timeout: 35000 });
    status = resp ? resp.status() : 'no-response';
  } catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Accept all")']) {
    try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1200 })) { await b.click(); await page.waitForTimeout(1200); break; } } catch {}
  }
  await page.waitForTimeout(3000);
  text = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
  await page.close();

  const rx = pctRx(r.pct);
  const found = rx.test(text);
  console.log(`  ${found ? '✓' : '✗ DRIFT'} ${r.supplier.padEnd(18)} förväntat ${r.pct.toFixed(2).replace('.', ',')} % · sida ${status} · ${found ? 'hittad' : 'EJ hittad'} (${rx})`);
  if (!found) drift.push({ ...r, status });
}
await browser.close();

if (drift.length) {
  console.error('\n[kort-vakt] DRIFT — lagrad rate hittades inte på leverantörssidan:');
  for (const d of drift) console.error(`  · ${d.supplier}: förväntat ${d.pct.toFixed(2).replace('.', ',')} % på ${d.url} (status ${d.status})`);
  console.error('[kort-vakt] FAIL: hellre rött bygge än ett overifierat rate (regel 4).');
  console.error('[kort-vakt] Åtgärd: verifiera leverantörssidan, uppdatera verifiedRates + bumpa lastVerified, kör testsviten.');
  process.exit(1);
}
console.log('\n[kort-vakt] ✓ alla verifierade rater oförändrade mot leverantörssidorna — kortterminal-bandet håller.');
