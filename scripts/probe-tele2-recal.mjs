// scripts/probe-tele2-recal.mjs — diagnos för omkalibrering av tele2-mobil + tele2-bredband.
// Mobil (Playwright): dumpar prisbärande text för att hitta den NYA 24-mån-frasen/markupen.
// Bredband (fetch): råa svar från adress-/produkt-API:t för att se hur kontraktet driftat.
// Ren spaning, skriver inget. HTTP-egress krävs (GH Actions).

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// ── MOBIL ──────────────────────────────────────────────────────────────────────
const MOBIL_URLS = [
  'https://www.tele2.se/foretag/mobilabonnemang',
  'https://www.tele2.se/handla/abonnemang',
  'https://www.tele2.se/foretag/mobilt/mobilabonnemang',
];

async function probeMobil(browser) {
  console.log('\n==================== MOBIL ====================');
  const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(30000);
  for (const url of MOBIL_URLS) {
    let status = '?';
    try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
    catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
    for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn")']) {
      try { await page.click(sel, { timeout: 1500 }); await page.waitForTimeout(1000); break; } catch {}
    }
    await page.waitForTimeout(4000);
    console.log(`\n#### ${url} — status ${status} · finalUrl ${page.url().slice(0, 80)}`);
    if (typeof status !== 'number' || status >= 400) continue;
    // Plocka rader/fragment med pris-/24-mån-signaler.
    const frags = await page.evaluate(() => {
      const txt = (document.body.innerText || '').replace(/ /g, ' ');
      const lines = txt.split('\n').map((l) => l.trim()).filter(Boolean);
      const hit = lines.filter((l) => /(kr\s*\/?\s*m[åa]n|\/m[åa]n|24\s*m[åa]n|Nu:|GB|Obegränsad|surf)/i.test(l));
      return [...new Set(hit)].slice(0, 40);
    });
    console.log(frags.length ? frags.map((f) => '  • ' + f.slice(0, 90)).join('\n') : '  (inga pris-fragment i innerText — tyngre JS-render?)');
    if (frags.length) break; // hittade en sida som funkar
  }
  await ctx.close();
}

// ── BREDBAND ───────────────────────────────────────────────────────────────────
const H = { 'User-Agent': UA, Accept: 'application/json', 'Accept-Language': 'sv-SE,sv;q=0.9' };
const BASE = 'https://www.tele2.se/api';
const INFRA = encodeURIComponent(JSON.stringify(['VILLA_FIBER', 'LAN', 'COAX']));
const ENTRY_ID = '9cQPebFT7wUEj8FwrzG6F';

async function getJson(url) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 12000);
  try { const r = await fetch(url, { headers: H, signal: ac.signal }); const body = await r.text(); return { status: r.status, ct: (r.headers.get('content-type') || '').split(';')[0], body }; }
  catch (e) { return { status: 'ERR ' + e.name, ct: '', body: '' }; }
  finally { clearTimeout(t); }
}

async function probeBredband() {
  console.log('\n==================== BREDBAND (adress-API) ====================');
  const addr = 'Götgatan 92B, Stockholm';
  // 1) feasibility/addresses
  const f = await getJson(`${BASE}/feasibility/addresses?query=${encodeURIComponent(addr)}`);
  console.log(`\n#### feasibility/addresses?query=${addr}`);
  console.log(`  [${f.status} ${f.ct}] body: ${f.body.replace(/\s+/g, ' ').slice(0, 400)}`);
  let addressId = null;
  try { addressId = (JSON.parse(f.body).results ?? [])[0]?.id ?? null; } catch {}
  console.log(`  → addressId: ${addressId}`);

  // 2) products (om vi fick ett id)
  if (addressId != null) {
    const p = await getJson(`${BASE}/broadband/products?category=REGULAR&addressId=${addressId}&groupAgreement=false&infrastructure=${INFRA}&entryId=${ENTRY_ID}`);
    console.log(`\n#### broadband/products?addressId=${addressId}`);
    console.log(`  [${p.status} ${p.ct}] body: ${p.body.replace(/\s+/g, ' ').slice(0, 600)}`);
  }
  // 3) Sondera om endpoint-pathen flyttat (vanliga alternativ).
  console.log('\n#### alternativa endpoint-paths (status):');
  for (const path of [
    `/feasibility/address?query=${encodeURIComponent(addr)}`,
    `/address/search?query=${encodeURIComponent(addr)}`,
    `/broadband/feasibility/addresses?query=${encodeURIComponent(addr)}`,
    `/v2/feasibility/addresses?query=${encodeURIComponent(addr)}`,
  ]) {
    const r = await getJson(BASE + path);
    console.log(`  [${r.status} ${r.ct}] ${path} → ${r.body.replace(/\s+/g, ' ').slice(0, 100)}`);
  }
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
await probeMobil(browser);
await browser.close();
await probeBredband();
console.log('\n[probe-tele2-recal] klar');
