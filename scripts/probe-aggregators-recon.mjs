// scripts/probe-aggregators-recon.mjs — hävstångs-recon mot frakt-AGGREGATORER.
//
// Tesen (kundens): aggregatorer har redan normaliserat marknaden. Knäcker vi deras
// rate-API får vi PostNord + DHL + Bring + Schenker i ETT svep — Zero Trust-källan för
// logistik. Vi stångas inte med Cloudflare per bärare; vi tar normaliseraren.
//
// Metoden (samma som knäckte Tele2-bredband): Playwright + nätverksfångst. För varje
// aggregator: (a) ladda offert-/prisflödet, (b) FÖRSÖK driva configuratorn (från/till
// postnummer + vikt → sök), (c) logga varje pris-bärande XHR/fetch (URL, metod, status,
// request-body, svar-snippet) så vi ser exakt vilken endpoint som returnerar rater och
// i vilket format. Skriver inget — ren spaning. HTTP-egress krävs (GH Actions, ej sandbox).

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// Representativ inrikes försändelse — paket Stockholm → Göteborg, 5 kg.
const SHIP = { fromZip: '11122', toZip: '41103', weight: '5', fromCity: 'Stockholm', toCity: 'Göteborg' };

const SOURCES = [
  // Fraktjakt — öppen instant-quote (konsument + företag), högst chans till öppet rate-API.
  { tag: 'Fraktjakt',  url: 'https://www.fraktjakt.se/',                drive: true },
  { tag: 'Fraktjakt-q', url: 'https://www.fraktjakt.se/shipments/new',  drive: true },
  // Sendify — företagsaggregator (kan kräva login men prisflödet kan ligga öppet).
  { tag: 'Sendify',    url: 'https://www.sendify.se/priser/',           drive: true },
  { tag: 'Sendify-app', url: 'https://app.sendify.se/',                 drive: false },
  // Shipmondo — multi-carrier, har prissidor.
  { tag: 'Shipmondo',  url: 'https://www.shipmondo.se/priser/',         drive: false },
  // Fraktpriser/booking-plattformar som backup.
  { tag: 'Sendle-no',  url: 'https://www.nshift.com/sv',               drive: false },
];

// Bredare pris-/rate-mönster än bredbandssonden (frakt-domänspecifikt).
const API_RX = /(api|graphql|rate|quote|price|pris|frakt|ship|shipment|carrier|transport|offer|search|booking|calc|tariff|leverans|forsandelse)/i;
const PRICEY = /(\d{2,5}[.,]?\d{0,2})\s*(kr|sek|:-)|"price"|"amount"|"rate"|"total"|"cost"|"carrier"|"service"|"product"/i;
const SKIP_RX = /\.(js|css|woff2?|png|svg|jpg|jpeg|gif|ico|map)(\?|$)|onetrust|cookielaw|cookiebot|analytics|gtm|google|doubleclick|facebook|hotjar|segment|sentry|intercom|consent/i;

const COOKIE_SELECTORS = [
  '#onetrust-accept-btn-handler', '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  'button:has-text("Acceptera alla")', 'button:has-text("Acceptera")', 'button:has-text("Godkänn alla")',
  'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'button:has-text("Jag godkänner")',
  'button:has-text("Accept all")', 'button:has-text("Tillåt alla cookies")',
];

const ZIP_RX = /post|zip|postal|fr[åa]n|till|from|to|avsändare|mottagare|sender|receiver/i;
const WEIGHT_RX = /vikt|weight|kg/i;

async function acceptCookies(page) {
  for (const sel of COOKIE_SELECTORS) {
    try { await page.click(sel, { timeout: 1500 }); await page.waitForTimeout(800); return true; } catch {}
  }
  return false;
}

// Försök driva ett offert-/sökformulär: fyll postnummer + vikt, tryck sök.
async function driveQuoteForm(page) {
  const filled = [];
  try {
    const inputs = await page.$$('input:visible, input[type="text"], input[type="number"], input[type="search"]');
    let zipCount = 0;
    for (const el of inputs) {
      const meta = (await el.evaluate((e) => `${e.name || ''} ${e.id || ''} ${e.placeholder || ''} ${e.getAttribute('aria-label') || ''}`)).toLowerCase();
      if (WEIGHT_RX.test(meta)) { try { await el.fill(SHIP.weight); filled.push('weight'); } catch {} }
      else if (ZIP_RX.test(meta) && zipCount < 2) { try { await el.fill(zipCount === 0 ? SHIP.fromZip : SHIP.toZip); filled.push('zip' + zipCount); zipCount++; } catch {} }
    }
  } catch {}
  // Tryck en sök-/beräkna-/jämför-knapp.
  for (const sel of ['button:has-text("Sök")', 'button:has-text("Jämför")', 'button:has-text("Beräkna")',
    'button:has-text("Hämta priser")', 'button:has-text("Visa priser")', 'button:has-text("Sök frakt")',
    'button[type="submit"]', 'input[type="submit"]']) {
    try { await page.click(sel, { timeout: 1500 }); filled.push('submit:' + sel); break; } catch {}
  }
  return filled;
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

for (const src of SOURCES) {
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  const apiHits = [];
  page.on('request', (req) => { req._body = (() => { try { return req.postData(); } catch { return null; } })(); });
  page.on('response', async (resp) => {
    try {
      const req = resp.request();
      const url = resp.url();
      if (SKIP_RX.test(url)) return;
      if (!API_RX.test(url)) return;
      if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) return;
      let body = ''; try { body = (await resp.text()).slice(0, 700); } catch {}
      const reqBody = (() => { try { return (req.postData() || '').slice(0, 200); } catch { return ''; } })();
      if (PRICEY.test(body) || /\/(api|graphql|rate|quote|price|search|shipment|carrier|booking|tariff)/i.test(url)) {
        apiHits.push({
          method: req.method(),
          url: url.slice(0, 170),
          status: resp.status(),
          ctype: (resp.headers()['content-type'] || '').split(';')[0],
          reqBody: reqBody.replace(/\s+/g, ' '),
          snippet: PRICEY.test(body) ? body.replace(/\s+/g, ' ').slice(0, 220) : '(api-form)',
        });
      }
    } catch {}
  });

  let status = 'ok';
  try { const r = await page.goto(src.url, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }

  const cookied = await acceptCookies(page);
  await page.waitForTimeout(2500);

  let drove = [];
  if (src.drive && typeof status === 'number' && status < 400) {
    drove = await driveQuoteForm(page);
    await page.waitForTimeout(5000); // vänta in rate-anropet
  }

  console.log(`\n######## [${src.tag}] ${src.url} — status ${status} · cookies:${cookied ? 'ja' : 'nej'} · drev:[${drove.join(',') || '—'}] ########`);

  const seen = new Set();
  let n = 0;
  for (const h of apiHits) {
    const k = h.method + h.url.split('?')[0];
    if (seen.has(k)) continue; seen.add(k);
    console.log(`  API [${h.status} ${h.ctype}] ${h.method} ${h.url}`);
    if (h.reqBody) console.log(`       req: ${h.reqBody}`);
    console.log(`       res: ${h.snippet}`);
    if (++n >= 12) break;
  }
  if (!n) console.log('  (inga pris-bärande API-anrop fångade)');

  // Synliga fält (för configurator-driving nästa runda).
  try {
    const fields = await page.evaluate(() => Array.from(document.querySelectorAll('input,select')).filter((e) => e.offsetParent !== null).slice(0, 14)
      .map((e) => `${e.tagName.toLowerCase()}[${e.type || ''}] name=${e.name || '–'} ph="${(e.placeholder || '').slice(0, 24)}"`));
    if (fields.length) console.log('  FÄLT: ' + fields.join(' | '));
  } catch {}

  await page.close();
}
console.log('\n[probe-aggregators-recon] klar');
await browser.close();
