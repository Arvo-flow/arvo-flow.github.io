// ARKIVERAD — VERDIKT 2026-06-17 (3 sonder, GH Actions): Google publicerar publikt listpris ENBART i
// USD (workspace.google.com/intl/en: $7/$14/$22 årsavtal). Den svenska sidan visar 0 priser (rå-HTML +
// render); det faktiska SEK-priset ligger bakom signup-funnelns AUTH-GRIND (billinginfo/setup → 200 men
// ingen pris-DOM, inget publikt land-parametriserat pris-API). → Vi FX-gissar ALDRIG SEK mot kund
// (regel 3/4). Beslut: vakta USD-ankaret (lib/verifiers/google-workspace.mjs) + håll SEK tyst
// (google-sek-grind i recommend.js). Sonden behålls som mönster/bevis; workflowen borttagen (engångs-recon).
//
// scripts/probe-google-workspace.mjs — RECON v3: KNÄCK FUNNELN för äkta SEK (VD-beslut: högsta ambition,
// timeboxad). v2 slog fast: Google publicerar USD-listpris ($7/$14/$22) på en-sidan men INGET publikt SEK.
// Renderade sidan bar pris-PLATSHÅLLARE ($0/$1) → priserna hämtas av JS från en bakomliggande pris-API
// EFTER load. Hypotes: API:t tar en land-/valutaparameter; US-runner geo→USD, men SE-param kan ge SEK.
//
// v3 fångar ALLA nätverksanrop sidan gör (request + response) och dumpar URL:er + JSON-svar som bär
// pris-nycklar (price/amount/currency/SEK/USD). Då ser vi (a) finns en pris-endpoint, (b) tar den land,
// (c) exponeras SEK utan auth. Provar även signup-funnel-URL:er med hl=sv-SE&gl=SE.
// Slår vi i auth/bot-grind → rapportera, VD faller tillbaka på grinda-Google. Ren diagnos.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const PRICE_RX = /price|amount|currency|sku|plan|SEK|kr\b/i;

const { chromium } = await import('playwright');
const browser = await chromium.launch({ headless: true });

async function capture(url, { locale = 'sv-SE', tz = 'Europe/Stockholm' } = {}) {
  const ctx = await browser.newContext({ userAgent: UA, locale, timezoneId: tz });
  const page = await ctx.newPage();
  const apiHits = [];
  page.on('response', async (res) => {
    const u = res.url();
    const ct = res.headers()['content-type'] || '';
    if (!/json|protobuf|text\/plain/.test(ct)) return;
    if (!PRICE_RX.test(u) && !/batchexecute|pricing|billing|sku|catalog|commerce|subscription/i.test(u)) return;
    let body = '';
    try { body = await res.text(); } catch { return; }
    if (!PRICE_RX.test(body)) return;
    // Plocka pris/valuta-tokens ur svaret.
    const toks = [...new Set((body.match(/(?:SEK|USD|EUR)|[0-9]+(?:[.,][0-9]{2})?\s*(?:kr|USD|SEK)|"currencyCode"\s*:\s*"[A-Z]{3}"|amountMicros"?\s*:\s*"?\d+/gi) || []))].slice(0, 12);
    apiHits.push({ u: u.slice(0, 110), ct: ct.split(';')[0], bytes: body.length, toks });
  });
  let status = 'ok';
  try { const r = await page.goto(url, { waitUntil: 'networkidle', timeout: 40000 }); status = r ? r.status() : 'no-resp'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  await page.waitForTimeout(3500);
  // Synligt SEK i slut-DOM?
  const sekInDom = /\bkr\b|SEK/.test(await page.content());
  await ctx.close();
  return { status, apiHits, sekInDom };
}

const TARGETS = [
  'https://workspace.google.com/intl/sv/pricing.html?hl=sv-SE&gl=SE',
  'https://workspace.google.com/signup/businessstarter/billinginfo?hl=sv-SE&gl=SE',
  'https://workspace.google.com/signup/businessstarter/setup?hl=sv-SE&gl=SE',
];

for (const t of TARGETS) {
  const { status, apiHits, sekInDom } = await capture(t);
  console.log(`\n#### ${t}\n     status ${status} · SEK i DOM: ${sekInDom} · pris-API-träffar: ${apiHits.length}`);
  for (const h of apiHits.slice(0, 14)) {
    console.log(`     api| ${h.u} [${h.ct} ${h.bytes}b] toks: ${h.toks.join(' | ') || '—'}`);
  }
}

await browser.close();
console.log('\n[probe-google-workspace v3] klar');
