// scripts/probe-fraktjakt-api.mjs — runda 2: bekräfta den OFFICIELLA vägen in.
//
// Runda 1 visade: aggregatorerna har INGEN Cloudflare-mur (alla 200) — hävstångstesen
// håller. Men rate-anropen fångades inte (Fraktjakts quote-form fanns ej på /, Sendifys
// kalkylator-endpoint matchade inte filtret). Runda 2 jagar två konkreta vägar in:
//
//   A. Fraktjakt har en DOKUMENTERAD frakt-API (api.fraktjakt.se) — normaliserad multi-
//      carrier-quote. Vi kartlägger ytan + autentiseringskravet via ren fetch (ingen
//      browser). Det vore den ultimata Zero Trust-källan: en officiell, normaliserad
//      rate-endpoint, inte skrapning.
//   B. Sendifys /priser/-kalkylator: driv båda numeriska fälten och fånga ALLA XHR (inte
//      bara pris-filtrerade) → hitta endpointen oavsett namn. No-auth-fallback.
//
// HTTP-egress krävs (GH Actions). Skriver inget — ren spaning.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const JSON_HEADERS = { 'User-Agent': UA, Accept: 'application/json, application/xml, text/xml, text/html;q=0.9', 'Accept-Language': 'sv-SE,sv;q=0.9' };

// ── DEL A: Fraktjakt officiella API ───────────────────────────────────────────
// Kandidat-endpoints för att kartlägga den dokumenterade frakt-API:n + autentisering.
const FJ_CANDIDATES = [
  'https://api.fraktjakt.se/',
  'https://api.fraktjakt.se/shipments/query',
  'https://api.fraktjakt.se/shipments/search',
  'https://api.fraktjakt.se/fraktjakt/query',
  'https://api.fraktjakt.se/api/shipments/query.json',
  'https://www.fraktjakt.se/shipments/query',
  'https://www.fraktjakt.se/api',
  'https://www.fraktjakt.se/api_doc',
  'https://www.fraktjakt.se/apidocs',
  'https://api.fraktjakt.se/shipments/query.xml',
];

async function probeFraktjaktApi() {
  console.log('\n==================== DEL A: Fraktjakt officiella API ====================');
  for (const url of FJ_CANDIDATES) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 12000);
    try {
      const r = await fetch(url, { headers: JSON_HEADERS, redirect: 'manual', signal: ac.signal });
      const ct = (r.headers.get('content-type') || '').split(';')[0];
      const loc = r.headers.get('location') || '';
      let body = '';
      try { body = (await r.text()).replace(/\s+/g, ' ').slice(0, 260); } catch {}
      console.log(`  [${r.status}${loc ? ' →' + loc.slice(0, 60) : ''} ${ct}] ${url}`);
      if (body && r.status < 500) console.log(`        ${body}`);
    } catch (e) {
      console.log(`  [ERR ${e.name}] ${url} — ${e.message.split('\n')[0].slice(0, 80)}`);
    } finally { clearTimeout(t); }
  }
  // Försök en faktisk query mot den dokumenterade endpointen (utan nyckel → ska berätta
  // exakt vad som krävs: consignor_id/key). Ett strukturerat fel = bekräftad väg in.
  console.log('\n  — Testquery utan nyckel (förväntat: auth-fel som avslöjar kravet) —');
  const q = 'https://api.fraktjakt.se/shipments/query.xml?value=1000&address_to=41103&weight=5.0';
  try {
    const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 12000);
    const r = await fetch(q, { headers: JSON_HEADERS, signal: ac.signal });
    const body = (await r.text()).replace(/\s+/g, ' ').slice(0, 400);
    console.log(`  [${r.status}] ${q}\n        ${body}`);
    clearTimeout(t);
  } catch (e) { console.log(`  [ERR] ${q} — ${e.message.split('\n')[0]}`); }
}

// ── DEL B: Sendify /priser/-kalkylator (djupdyk, fånga ALLA XHR) ───────────────
async function probeSendifyCalculator(browser) {
  console.log('\n==================== DEL B: Sendify priskalkylator (alla XHR) ====================');
  const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(30000);

  const xhr = [];
  const SKIP = /\.(js|css|woff2?|png|svg|jpg|jpeg|gif|ico|map)(\?|$)|hubspot|hubapi|hsforms|youtube|ipify|google|gtm|doubleclick|facebook|hotjar|segment|sentry|cookiebot|onetrust|cookielaw/i;
  page.on('response', async (resp) => {
    try {
      const req = resp.request();
      if (['image', 'stylesheet', 'font', 'media', 'script'].includes(req.resourceType())) return;
      const url = resp.url();
      if (SKIP.test(url)) return;
      let body = ''; try { body = (await resp.text()).slice(0, 300); } catch {}
      const reqBody = (() => { try { return (req.postData() || '').slice(0, 200); } catch { return ''; } })();
      xhr.push({ m: req.method(), url: url.slice(0, 160), s: resp.status(), ct: (resp.headers()['content-type'] || '').split(';')[0], reqBody: reqBody.replace(/\s+/g, ' '), snip: body.replace(/\s+/g, ' ').slice(0, 180) });
    } catch {}
  });

  let status = '?';
  try { const r = await page.goto('https://www.sendify.se/priser/', { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")']) {
    try { await page.click(sel, { timeout: 1500 }); break; } catch {}
  }
  await page.waitForTimeout(2500);

  // Fyll alla numeriska fält (kalkylatorn: vikt/dimensioner) + ev. postnummer-fält.
  const drove = [];
  try {
    const nums = await page.$$('input[type="number"]');
    const vals = ['5', '30', '20', '15']; // vikt + L/B/H
    for (let i = 0; i < nums.length && i < vals.length; i++) { try { await nums[i].fill(vals[i]); drove.push('num' + i + '=' + vals[i]); } catch {} }
    const texts = await page.$$('input[type="text"], input:not([type])');
    let z = 0;
    for (const el of texts) {
      const meta = (await el.evaluate((e) => `${e.name || ''} ${e.placeholder || ''} ${e.getAttribute('aria-label') || ''}`)).toLowerCase();
      if (/post|zip|fr[åa]n|till|from|to/.test(meta) && z < 2) { try { await el.fill(z === 0 ? '11122' : '41103'); drove.push('zip' + z); z++; } catch {} }
    }
  } catch {}
  for (const sel of ['button:has-text("Beräkna")', 'button:has-text("Jämför")', 'button:has-text("Visa priser")', 'button:has-text("Sök")', 'button[type="submit"]', 'input[type="submit"]']) {
    try { await page.click(sel, { timeout: 1500 }); drove.push('submit:' + sel); break; } catch {}
  }
  await page.waitForTimeout(6000);

  console.log(`  status ${status} · drev:[${drove.join(',') || '—'}]`);
  const seen = new Set();
  let n = 0;
  for (const h of xhr) {
    const k = h.m + h.url.split('?')[0];
    if (seen.has(k)) continue; seen.add(k);
    console.log(`  XHR [${h.s} ${h.ct}] ${h.m} ${h.url}`);
    if (h.reqBody) console.log(`       req: ${h.reqBody}`);
    if (h.snip) console.log(`       res: ${h.snip}`);
    if (++n >= 20) break;
  }
  if (!n) console.log('  (inga XHR fångade efter filter)');
  await page.close();
  await ctx.close();
}

await probeFraktjaktApi();
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
await probeSendifyCalculator(browser);
await browser.close();
console.log('\n[probe-fraktjakt-api] klar');
