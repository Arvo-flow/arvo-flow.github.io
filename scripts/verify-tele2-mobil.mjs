// scripts/verify-tele2-mobil.mjs — driftvakt för Tele2:s mobil-listpriser.
//
// Mobil är en av våra mest använda kategorier. Tele2:s huvudplaner är JS-renderade
// (server-HTML ger bara tillägg) → Playwright. Vakten renderar företagssidan,
// läser 24-mån-priserna (det faktiska B2B-priset vi ankrar på) och jämför mot de
// värden vi lagrar i branchindex.js (mobil.matrix → p25/median, dividerat med 12).
//
//   node scripts/verify-tele2-mobil.mjs        (live — kräver HTTP-egress + Chromium)
//
// HTTP/Chromium finns inte i sandboxen → körs på GitHub Actions-runnern
// (.github/workflows/verify-tele2-mobil.yml, veckovis + manuell).
//
// REGEL 1 + 3 + 7: prisboken är enda sanningen — vakten härleder förväntan ur
// branchindex (ingen andra kopia). Vid drift exitar den med kod 1 (rött bygge →
// larm → människa bekräftar och uppdaterar prisboken + bumpar lastVerified).
// Vakten skriver ALDRIG själv. Matchar allt → exit 0.

import { chromium } from 'playwright';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const URL = 'https://www.tele2.se/foretag/mobilabonnemang';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// Förväntade 24-mån månadspriser, härledda ur prisboken (kr/år ÷ 12).
const cell = BRANCHINDEX.mobil.matrix.byraer.micro;
const p25Monthly = Math.round(cell.p25 / 12);       // 2868/12 = 239 (entrétier 60 GB)
const medianMonthly = Math.round(cell.median / 12); // 3348/12 = 279 (Obegränsad)

function fail(msg) {
  console.error(`\n[tele2-vakt] ${msg}`);
  console.error('[tele2-vakt] FAIL: hellre rött bygge än tyst drift (regel 4).');
  console.error('[tele2-vakt] Åtgärd: verifiera tele2.se/foretag/mobilabonnemang, uppdatera mobil-matrisen i branchindex.js, bumpa lastVerified, kör testsviten, deploya.');
  process.exit(1);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await context.newPage();
page.setDefaultTimeout(45000);

let status = 'ok';
try {
  const resp = await page.goto(URL, { waitUntil: 'networkidle', timeout: 45000 });
  status = resp ? resp.status() : 'no-response';
} catch (e) { await browser.close().catch(() => {}); fail(`navigeringsfel: ${e.message.split('\n')[0]}`); }

// Cookie-vägg blockerar ofta innehåll — försök acceptera (best effort).
for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
  try { const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 1500 })) { await b.click(); await page.waitForTimeout(1500); break; } } catch {}
}
await page.waitForTimeout(2500);

const text = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
await browser.close().catch(() => {});

console.log(`Tele2 status ${status}, innerText len ${text.length}`);
if (typeof status === 'number' && status !== 200) fail(`oväntad HTTP-status ${status}`);

// Läs 24-mån-priserna: "Nu: NNN kr/mån i 24 mån". Robust mot ordning och plannamn.
const re = /Nu:\s*([\d\s]+?)\s*kr\s*\/?\s*m[åa]n\s*i\s*24\s*m[åa]n/gi;
const prices = [];
let m;
while ((m = re.exec(text))) {
  const v = Number(m[1].replace(/\s/g, ''));
  if (v >= 50 && !prices.includes(v)) prices.push(v);
}
prices.sort((a, b) => a - b);
console.log(`24-mån-priser på sidan (sorterade): ${prices.length ? prices.join(', ') + ' kr/mån' : '(inga)'}`);
console.log(`Förväntat ur prisboken: p25=${p25Monthly} kr (60 GB), median=${medianMonthly} kr (Obegränsad)`);

if (prices.length < 2) fail(`kunde bara läsa ${prices.length} 24-mån-pris(er) — parse-fel eller layoutändring.`);

// Ankaret = de två lägsta 24-mån-priserna (entré + obegränsad). Topptiern (Max) får drifta.
const [lo, mid] = prices;
const drift = [];
if (lo !== p25Monthly) drift.push(`p25/entré: prisbok ${p25Monthly} kr · live ${lo} kr`);
if (mid !== medianMonthly) drift.push(`median/Obegränsad: prisbok ${medianMonthly} kr · live ${mid} kr`);

if (drift.length) {
  for (const d of drift) console.error(`  ✗ DRIFT ${d}`);
  fail('Tele2 har ändrat sina 24-mån-priser — mobil-ankaret stämmer inte längre.');
}

console.log(`  ✓ p25/entré     prisbok ${p25Monthly} kr · live ${lo} kr`);
console.log(`  ✓ median        prisbok ${medianMonthly} kr · live ${mid} kr`);
console.log('\n[tele2-vakt] ✓ de två lägsta 24-mån-priserna oförändrade mot tele2.se — mobil-ankaret håller.');
