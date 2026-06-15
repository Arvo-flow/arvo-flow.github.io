// scripts/probe-segments-recon.mjs — käll-recon för de tre nya tunga segmenten.
// Hedrar "glöm inte de andra": EN runda täcker logistik (fokus) + fordon + mjukvara.
// Playwright + nätverksfångst (samma metod som knäckte Tele2-bredband): för varje kandidat-
// källa loggas (a) API/XHR-anrop med pris-bärande kroppar, (b) synliga formulärfält (så vi
// kan driva configuratorn nästa runda), (c) om priser redan renderas i HTML (mjukvara).
// Skriver inget — ren spaning.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// Kandidatkällor per segment. URL:er kan 404:a — sonden rapporterar vad som faktiskt finns.
const SOURCES = [
  // ── LOGISTIK (fokus): fraktbärares priskalkylatorer (rate-API bakom) ──
  { seg: 'logistik', tag: 'PostNord-paket',  url: 'https://www.postnord.se/skicka-och-ta-emot/skicka/skicka-paket-utomlands' },
  { seg: 'logistik', tag: 'Bring-paket',     url: 'https://www.bring.se/tjanster/paket/skicka-paket' },
  { seg: 'logistik', tag: 'DHL-quote',       url: 'https://www.dhl.com/se-en/home/get-a-quote.html' },
  { seg: 'logistik', tag: 'Schenker',        url: 'https://www.dbschenker.com/se-sv/kundservice/priskalkylator' },
  // ── FORDON: leasing-configuratorer/aggregatorer (config-gated rate-API) ──
  { seg: 'fordon',   tag: 'Kinto-leasing',   url: 'https://www.kinto.se/foretag' },
  { seg: 'fordon',   tag: 'Leasingmarknaden', url: 'https://www.leasingmarknaden.se/' },
  // ── MJUKVARA: SaaS-prissidor (M365-mönstret — bekräfta skrapbarhet) ──
  { seg: 'mjukvara', tag: 'Fortnox-priser',  url: 'https://www.fortnox.se/priser', plainPrices: true },
  { seg: 'mjukvara', tag: 'Pipedrive-pris',  url: 'https://www.pipedrive.com/sv/pricing', plainPrices: true },
];

const API_RX = /(api|graphql|pris|price|rate|quote|calc|frakt|shipping|leasing|offer|product|tariff|kostnad)/i;
const PRICEY = /(\d{2,5}[.,]?\d{0,2})\s*(kr|sek|:-)|"price"|"amount"|"rate"|"monthly"/i;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

for (const src of SOURCES) {
  const page = await context.newPage();
  page.setDefaultTimeout(25000);
  const apiHits = [];
  page.on('response', async (resp) => {
    try {
      const req = resp.request();
      const url = resp.url();
      if (!API_RX.test(url)) return;
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) return;
      if (/\.(js|css|woff|png|svg|jpg)(\?|$)|onetrust|cookielaw|analytics|gtm|doubleclick|consent/i.test(url)) return;
      let body = ''; try { body = (await resp.text()).slice(0, 500); } catch {}
      if (PRICEY.test(body) || /\/(api|graphql|rate|quote|calc|price|product|offer)/i.test(url)) {
        apiHits.push({ method: req.method(), url: url.slice(0, 150), status: resp.status(), snippet: PRICEY.test(body) ? body.replace(/\s+/g, ' ').slice(0, 160) : '(api-form)' });
      }
    } catch {}
  });

  let status = 'ok';
  try { const r = await page.goto(src.url, { waitUntil: 'domcontentloaded', timeout: 25000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Acceptera alla")']) {
    try { await page.click(sel, { force: true, timeout: 1500 }); await page.waitForTimeout(1200); break; } catch {}
  }
  await page.waitForTimeout(3500);

  console.log(`\n######## [${src.seg}] ${src.tag} — status ${status} ########`);

  // (a) API/XHR pris-bärande anrop
  const seen = new Set();
  let n = 0;
  for (const h of apiHits) { const k = h.method + h.url.split('?')[0]; if (seen.has(k)) continue; seen.add(k); console.log(`  API [${h.status}] ${h.method} ${h.url}\n       → ${h.snippet}`); if (++n >= 8) break; }
  if (!n) console.log('  (inga pris-bärande API-anrop på load)');

  // (b) synliga formulärfält (för configurator-driving nästa runda)
  const inputs = await page.evaluate(() => Array.from(document.querySelectorAll('input,select')).filter((e) => e.offsetParent !== null).slice(0, 10)
    .map((e) => `${e.tagName.toLowerCase()}[${e.type || ''}] name=${e.name || '–'} ph="${e.placeholder || ''}" aria="${e.getAttribute('aria-label') || ''}"`));
  if (inputs.length) console.log('  FÄLT: ' + inputs.join(' | '));

  // (c) mjukvara: renderas priser direkt i HTML?
  if (src.plainPrices) {
    const prices = await page.evaluate(() => {
      const t = (document.body.innerText || '').replace(/\s+/g, ' ');
      return [...t.matchAll(/(\d{2,5})\s*(kr|:-|SEK)\s*\/?\s*(m[åa]n|user|anv|månad)?/gi)].slice(0, 8).map((m) => m[0].trim());
    });
    console.log('  PRISER i HTML: ' + (prices.length ? [...new Set(prices)].join(' · ') : '(inga — JS-renderat?)'));
  }
  await page.close();
}
console.log('\n[probe-segments-recon] klar');
await browser.close();
