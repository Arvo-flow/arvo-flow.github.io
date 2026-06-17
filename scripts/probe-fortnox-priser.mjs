// scripts/probe-fortnox-priser.mjs — lås Fortnox publika pris/modul-schema (saas-finance-ankare).
// Fortnox säljer per program/modul (Bokföring, Fakturering, Lön…) + paket. Vi fångar de
// renderade priserna (kr/mån) med sina etiketter + ev. pris-API. Publikt listpris, samma
// proveniens som M365 MSRP. Ren spaning. HTTP-egress krävs (GH Actions).

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const URLS = [
  'https://www.fortnox.se/priser',
  'https://www.fortnox.se/priser/program',
  'https://www.fortnox.se/smaforetag/priser',
];
const PRICE_RX = /(\d{1,4})\s*kr\s*\/?\s*(m[åa]n|månad|mth)/i;

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await ctx.newPage();
page.setDefaultTimeout(30000);

const apiHits = [];
page.on('response', async (r) => {
  try {
    const u = r.url();
    if (!/(api|graphql|pris|price|product|plan|package|module|program)/i.test(u)) return;
    if (/\.(js|css|woff2?|png|svg|jpg|gif|ico)(\?|$)|gtm|google|cookie|consent|analytics|hotjar|segment/i.test(u)) return;
    if (['image','stylesheet','font','media','script'].includes(r.request().resourceType())) return;
    let b=''; try { b=(await r.text()).slice(0,400); } catch {}
    if (/\d{1,4}.*(kr|price|amount|"pris")|"price"|"amount"|"monthly"/i.test(b))
      apiHits.push({ u: u.slice(0,150), s: r.status(), snip: b.replace(/\s+/g,' ').slice(0,200) });
  } catch {}
});

for (const url of URLS) {
  let status='?';
  try { const r = await page.goto(url, { waitUntil:'domcontentloaded', timeout:30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR '+e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler','button:has-text("Acceptera alla")','button:has-text("Godkänn")','button:has-text("Acceptera")','button:has-text("Tillåt alla")']) {
    try { await page.click(sel,{timeout:1500}); await page.waitForTimeout(1000); break; } catch {}
  }
  await page.waitForTimeout(4000);

  console.log(`\n######## ${url} — status ${status} ########`);
  if (typeof status !== 'number' || status >= 400) continue;

  // Modul/tier-namn bredvid pris: leta kort med pris + närliggande rubrik.
  const cards = await page.evaluate(() => {
    const out = [];
    const all = Array.from(document.querySelectorAll('div,section,article,li,td'));
    for (const el of all) {
      const t = (el.innerText||'').replace(/\s+/g,' ').trim();
      if (!t || t.length > 160) continue;
      if (/\d{1,4}\s*kr\s*\/?\s*(m[åa]n|månad)/i.test(t)) out.push(t);
    }
    return [...new Set(out)].slice(0, 40);
  });
  if (cards.length) { console.log('  PRIS-KORT:'); cards.forEach(c => console.log('   • ' + c.slice(0,120))); }
  else console.log('  (inga pris/mån-kort i DOM)');

  // Råa pris-fragment ur hela texten (fallback).
  const frags = await page.evaluate(() => {
    const t=(document.body.innerText||'').replace(/\s+/g,' ');
    return [...t.matchAll(/([A-ZÅÄÖ][\wåäö &]{2,28})?\s*(\d{1,4})\s*kr\s*\/?\s*(m[åa]n|månad)/gi)].slice(0,30).map(m=>m[0].trim());
  });
  if (frags.length) console.log('  FRAGMENT: ' + [...new Set(frags)].join(' · ').slice(0,500));
}

console.log('\n==================== Pris-API ====================');
const seen=new Set(); let n=0;
for (const h of apiHits) { const k=h.u.split('?')[0]; if(seen.has(k))continue; seen.add(k); console.log(`  [${h.s}] ${h.u}\n     → ${h.snip}`); if(++n>=8)break; }
if (!n) console.log('  (inga pris-bärande API-anrop — priser ligger i DOM/HTML)');

await browser.close();
console.log('\n[probe-fortnox-priser] klar');
