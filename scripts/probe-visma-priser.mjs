// scripts/probe-visma-priser.mjs — lås Visma eEkonomi publika pris/nivå-schema (saas-finance).
// Visma eEkonomi (Visma Spcs) är Fortnox direkta SMF-konkurrent. Vi STARTAR på hemsidan, hittar
// pris-länken i navet, följer den och dumpar pris-korten (kr/mån) + nivånamn + ev. pris-API.
// Publikt listpris, samma proveniens som M365/Fortnox. Ren spaning. HTTP-egress krävs (GH Actions).

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const STARTS = ['https://www.vismaspcs.se', 'https://vismaspcs.se/produkter/bokforingsprogram', 'https://www.visma.se'];

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await ctx.newPage();
page.setDefaultTimeout(30000);

const apiHits = [];
page.on('response', async (r) => {
  try {
    const u = r.url();
    if (!/(api|graphql|pris|price|product|plan|package|offer)/i.test(u)) return;
    if (/\.(js|css|woff2?|png|svg|jpg|gif|ico)(\?|$)|gtm|google|cookie|consent|analytics|hotjar|segment|onetrust/i.test(u)) return;
    if (['image', 'stylesheet', 'font', 'media', 'script'].includes(r.request().resourceType())) return;
    let b = ''; try { b = (await r.text()).slice(0, 500); } catch {}
    if (/\d{2,5}.*(kr|"price"|"amount"|"pris")|"monthly"/i.test(b)) apiHits.push({ u: u.slice(0, 160), s: r.status(), snip: b.replace(/\s+/g, ' ').slice(0, 220) });
  } catch {}
});

async function cookies() {
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")', 'button:has-text("Acceptera")', 'button:has-text("Tillåt alla")', 'button:has-text("Jag godkänner")']) {
    try { await page.click(sel, { timeout: 1500 }); await page.waitForTimeout(800); return; } catch {}
  }
}

async function dumpPrices(url, status) {
  console.log(`\n######## ${url} — status ${status} ########`);
  if (typeof status !== 'number' || status >= 400) return false;
  const cards = await page.evaluate(() => {
    const out = []; for (const el of document.querySelectorAll('div,section,article,li,td,h2,h3')) {
      const t = (el.innerText || '').replace(/\s+/g, ' ').trim();
      if (t && t.length <= 150 && /\d{1,5}\s*kr\s*\/?\s*(m[åa]n|månad)/i.test(t)) out.push(t);
    } return [...new Set(out)].slice(0, 40);
  });
  if (cards.length) { console.log('  PRIS-KORT:'); cards.forEach(c => console.log('   • ' + c.slice(0, 120))); }
  const frags = await page.evaluate(() => {
    const t = (document.body.innerText || '').replace(/\s+/g, ' ');
    return [...new Set([...t.matchAll(/([A-ZÅÄÖ][\wåäö &]{2,26})?\s*(\d{1,5})\s*kr\s*\/?\s*(m[åa]n|månad)/gi)].map(m => m[0].trim()))].slice(0, 30);
  });
  if (frags.length) console.log('  FRAGMENT: ' + frags.join(' · ').slice(0, 600));
  return cards.length > 0 || frags.length > 0;
}

let found = false;
for (const start of STARTS) {
  let status = '?';
  try { const r = await page.goto(start, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  await cookies(); await page.waitForTimeout(2500);
  console.log(`\nSTART ${start} → status ${status} · final ${page.url().slice(0, 80)}`);
  if (typeof status !== 'number' || status >= 400) continue;

  // Om vi redan landade på en prissida, dumpa direkt.
  if (await dumpPrices(page.url(), status)) { found = true; break; }

  const links = await page.evaluate(() => {
    const out = new Set();
    for (const a of document.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href') || ''; const tx = (a.innerText || '').trim().toLowerCase();
      if (/pris|köp|kop|abonnemang|paket|plan|kostnad|bokforing/.test(href.toLowerCase() + ' ' + tx)) {
        try { out.add(new URL(href, location.href).href.split('#')[0]); } catch {}
      }
    } return [...out].slice(0, 20);
  });
  console.log('PRIS-LÄNKAR:', links.length ? links.join('  ') : '(inga)');
  const ranked = links.sort((a, b) => (/pris|kostnad/i.test(b) ? 1 : 0) - (/pris|kostnad/i.test(a) ? 1 : 0));
  for (const url of ranked.slice(0, 5)) {
    let st = '?';
    try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); st = r ? r.status() : '?'; } catch (e) { st = 'ERR ' + e.message.split('\n')[0]; }
    await cookies(); await page.waitForTimeout(3500);
    if (await dumpPrices(url, st)) { found = true; break; }
  }
  if (found) break;
}

console.log('\n==================== Pris-API ====================');
const seen = new Set(); let n = 0;
for (const h of apiHits) { const k = h.u.split('?')[0]; if (seen.has(k)) continue; seen.add(k); console.log(`  [${h.s}] ${h.u}\n     → ${h.snip}`); if (++n >= 8) break; }
if (!n) console.log('  (inga pris-bärande API-anrop)');

await browser.close();
console.log('\n[probe-visma-priser] klar');
