// scripts/probe-fraktjakt-public.mjs — runda 3: knäck Fraktjakts PUBLIKA anonyma quote.
//
// Spelreglerna ändrade: ingen API-nyckel, inget org.nr, riktig data IDAG. Partner-API:t
// (/fraktjakt/query) gatar på login — men Fraktjakt ÄR en konsument-jämförelsesajt:
// anonyma besökare får riktiga, normaliserade multi-carrier-priser på webben utan konto.
// Det är vägen in. Vi reverse-engineerar webbflödet (form-kontrakt + CSRF) precis som Tele2.
//
// Sonden: (1) dumpar VARJE <form> på hemsidan + kandidat-quote-sidor (action, metod, alla
// fält inkl. dolda authenticity_token), (2) kartlägger synliga fält med etiketter, (3)
// fyller från/till/vikt och submittar, (4) fångar både navigeringar och XHR och letar
// pris-bärande svar (server-renderad resultatsida ELLER rate-XHR) med bärarnamn.
// HTTP-egress krävs (GH Actions). Skriver inget.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const SHIP = { fromZip: '11122', toZip: '41103', weight: '5' };
const CARRIERS = /(PostNord|DHL|Bring|Schenker|Budbee|Instabox|DB Schenker|UPS|FedEx|Airmee|Earlybird|Best|Postnord)/i;
const PRICE = /(\d{2,4}(?:[.,]\d{1,2})?)\s*(kr|:-|SEK)/i;

const ENTRY = [
  'https://www.fraktjakt.se/',
  'https://www.fraktjakt.se/shipments/new_extended',
  'https://www.fraktjakt.se/shipping/new',
  'https://www.fraktjakt.se/traffics',
];

async function acceptCookies(page) {
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Acceptera")',
    'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")', 'a:has-text("Acceptera")']) {
    try { await page.click(sel, { timeout: 1500 }); await page.waitForTimeout(700); return true; } catch {}
  }
  return false;
}

// Dumpa alla forms med fält (inkl. dolda — authenticity_token/CSRF).
async function dumpForms(page) {
  return page.evaluate(() => Array.from(document.querySelectorAll('form')).slice(0, 6).map((f) => ({
    action: f.action || '(none)',
    method: (f.method || 'get').toUpperCase(),
    fields: Array.from(f.querySelectorAll('input,select,textarea')).slice(0, 30).map((e) => {
      const hidden = e.type === 'hidden';
      return `${e.tagName.toLowerCase()}[${e.type || ''}] name=${e.name || '–'}` +
        (hidden && e.value ? ` val="${String(e.value).slice(0, 28)}"` : '') +
        (e.placeholder ? ` ph="${e.placeholder.slice(0, 20)}"` : '');
    }),
  })));
}

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const context = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });

for (const url of ENTRY) {
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  const hits = [];
  const SKIP = /\.(js|css|woff2?|png|svg|jpg|jpeg|gif|ico|map)(\?|$)|livechatinc|google|gtm|doubleclick|facebook|hotjar|cookiebot|onetrust|cookielaw|analytics/i;
  page.on('response', async (resp) => {
    try {
      const req = resp.request();
      const u = resp.url();
      if (SKIP.test(u)) return;
      if (['image', 'stylesheet', 'font', 'media', 'script'].includes(req.resourceType())) return;
      let body = ''; try { body = await resp.text(); } catch {}
      const hasPrice = PRICE.test(body) && CARRIERS.test(body);
      const reqBody = (() => { try { return (req.postData() || '').slice(0, 220); } catch { return ''; } })();
      if (hasPrice || /\/(shipment|traffic|quote|rate|price|order|search|result)/i.test(u)) {
        // Plocka ut upp till 6 bärare+pris-par ur svaret.
        const pairs = [];
        const re = new RegExp(`(${CARRIERS.source})[\\s\\S]{0,80}?(\\d{2,4}(?:[.,]\\d{1,2})?)\\s*(?:kr|:-|SEK)`, 'gi');
        let m, c = 0;
        while ((m = re.exec(body)) && c < 6) { pairs.push(`${m[1]}=${m[2]}kr`); c++; }
        hits.push({ m: req.method(), u: u.slice(0, 150), s: resp.status(), ct: (resp.headers()['content-type'] || '').split(';')[0], reqBody: reqBody.replace(/\s+/g, ' '), pairs });
      }
    } catch {}
  });

  let status = '?';
  try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  const cookied = await acceptCookies(page);
  await page.waitForTimeout(2000);

  console.log(`\n######## ${url} — status ${status} · cookies:${cookied ? 'ja' : 'nej'} ########`);

  // (1) Form-kontrakt
  try {
    const forms = await dumpForms(page);
    forms.forEach((f, i) => {
      console.log(`  FORM#${i} ${f.method} → ${f.action}`);
      console.log(`     ${f.fields.join(' | ')}`);
    });
    if (!forms.length) console.log('  (inga <form> på sidan — JS-widget?)');
  } catch (e) { console.log('  form-dump fel: ' + e.message.split('\n')[0]); }

  // (2) Försök fylla + submitta (best-guess namn) bara på sidor med fält
  if (typeof status === 'number' && status < 400) {
    const drove = [];
    try {
      // Fyll på namn/placeholder/etikett-matchning.
      const inputs = await page.$$('input:visible');
      let z = 0;
      for (const el of inputs) {
        const meta = (await el.evaluate((e) => `${e.name || ''} ${e.id || ''} ${e.placeholder || ''} ${e.getAttribute('aria-label') || ''}`)).toLowerCase();
        if (/vikt|weight/.test(meta)) { try { await el.fill(SHIP.weight); drove.push('vikt'); } catch {} }
        else if (/(fr[åa]n|sender|avsändare|from).*(post|zip)|^.*post.*fr|from_postal|sender_zip/.test(meta) && z === 0) { try { await el.fill(SHIP.fromZip); drove.push('från'); z = 1; } catch {} }
        else if (/(till|mottagare|receiver|to).*(post|zip)|to_postal|receiver_zip/.test(meta) && z <= 1) { try { await el.fill(SHIP.toZip); drove.push('till'); z = 2; } catch {} }
        else if (/post|zip/.test(meta) && z < 2) { try { await el.fill(z === 0 ? SHIP.fromZip : SHIP.toZip); drove.push('zip' + z); z++; } catch {} }
      }
    } catch {}
    for (const sel of ['button:has-text("Sök frakt")', 'button:has-text("Sök")', 'button:has-text("Jämför")',
      'button:has-text("Hitta frakt")', 'button:has-text("Beräkna")', 'input[type="submit"]', 'button[type="submit"]']) {
      try { await page.click(sel, { timeout: 1500 }); drove.push('submit:' + sel.slice(0, 28)); break; } catch {}
    }
    await page.waitForTimeout(6500);
    console.log(`  drev:[${drove.join(',') || '—'}] · url efter: ${page.url().slice(0, 90)}`);

    // (3) Server-renderad resultatsida? Sök bärare+pris i nuvarande DOM.
    try {
      const dom = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' '));
      const re = new RegExp(`(${CARRIERS.source})[\\s\\S]{0,60}?(\\d{2,4}(?:[.,]\\d{1,2})?)\\s*(?:kr|:-|SEK)`, 'gi');
      const found = []; let m, c = 0;
      while ((m = re.exec(dom)) && c < 8) { found.push(`${m[1]}=${m[2]}kr`); c++; }
      if (found.length) console.log('  💰 DOM-priser: ' + found.join(' · '));
    } catch {}
  }

  // (4) Pris-bärande svar
  const seen = new Set();
  let n = 0;
  for (const h of hits) {
    const k = h.m + h.u.split('?')[0];
    if (seen.has(k)) continue; seen.add(k);
    console.log(`  RESP [${h.s} ${h.ct}] ${h.m} ${h.u}`);
    if (h.reqBody) console.log(`       req: ${h.reqBody}`);
    if (h.pairs?.length) console.log(`       💰 ${h.pairs.join(' · ')}`);
    if (++n >= 8) break;
  }
  if (!n) console.log('  (inga pris-bärande svar fångade)');
  await page.close();
}
console.log('\n[probe-fraktjakt-public] klar');
await browser.close();
