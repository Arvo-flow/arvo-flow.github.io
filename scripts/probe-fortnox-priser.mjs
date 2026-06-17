// scripts/probe-fortnox-priser.mjs — lås Fortnox publika pris/modul-schema (saas-finance-ankare).
// Fortnox flyttade sina pris-URL:er (gamla gissningar 404). Vi STARTAR på hemsidan, hittar den
// riktiga pris-länken i navet, följer den och dumpar pris-korten (kr/mån) + etiketter + ev API.
// Publikt listpris, samma proveniens som M365 MSRP. Ren spaning. HTTP-egress krävs (GH Actions).

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await ctx.newPage();
page.setDefaultTimeout(30000);

const apiHits = [];
page.on('response', async (r) => {
  try {
    const u = r.url();
    if (!/(api|graphql|pris|price|product|plan|package|module|program|offer)/i.test(u)) return;
    if (/\.(js|css|woff2?|png|svg|jpg|gif|ico)(\?|$)|gtm|google|cookie|consent|analytics|hotjar|segment|onetrust/i.test(u)) return;
    if (['image','stylesheet','font','media','script'].includes(r.request().resourceType())) return;
    let b=''; try { b=(await r.text()).slice(0,500); } catch {}
    if (/\d{2,5}.*(kr|"price"|"amount"|"pris")|"monthly"|"recurring"/i.test(b))
      apiHits.push({ u: u.slice(0,160), s: r.status(), snip: b.replace(/\s+/g,' ').slice(0,220) });
  } catch {}
});

async function cookies() {
  for (const sel of ['#onetrust-accept-btn-handler','button:has-text("Acceptera alla")','button:has-text("Godkänn alla")','button:has-text("Godkänn")','button:has-text("Acceptera")','button:has-text("Tillåt alla")']) {
    try { await page.click(sel,{timeout:1500}); await page.waitForTimeout(800); return; } catch {}
  }
}

async function dumpPrices(url, status) {
  console.log(`\n######## ${url} — status ${status} ########`);
  if (typeof status !== 'number' || status >= 400) return false;
  const cards = await page.evaluate(() => {
    const out=[]; for (const el of document.querySelectorAll('div,section,article,li,td,h2,h3')) {
      const t=(el.innerText||'').replace(/\s+/g,' ').trim();
      if (t && t.length<=150 && /\d{2,5}\s*kr\s*\/?\s*(m[åa]n|månad)/i.test(t)) out.push(t);
    } return [...new Set(out)].slice(0,40);
  });
  if (cards.length) { console.log('  PRIS-KORT:'); cards.forEach(c=>console.log('   • '+c.slice(0,120))); }
  const frags = await page.evaluate(() => {
    const t=(document.body.innerText||'').replace(/\s+/g,' ');
    return [...new Set([...t.matchAll(/([A-ZÅÄÖ][\wåäö &]{2,26})?\s*(\d{2,5})\s*kr\s*\/?\s*(m[åa]n|månad)/gi)].map(m=>m[0].trim()))].slice(0,30);
  });
  if (frags.length) console.log('  FRAGMENT: ' + frags.join(' · ').slice(0,600));
  return cards.length>0 || frags.length>0;
}

// 1) Hemsidan → hitta pris-länkar.
let status='?';
try { const r=await page.goto('https://www.fortnox.se', {waitUntil:'domcontentloaded',timeout:30000}); status=r?r.status():'?'; }
catch(e){ status='ERR '+e.message.split('\n')[0]; }
await cookies(); await page.waitForTimeout(2500);
console.log(`hemsida status ${status}`);

const links = await page.evaluate(() => {
  const out=new Set();
  for (const a of document.querySelectorAll('a[href]')) {
    const href=a.getAttribute('href')||''; const tx=(a.innerText||'').trim().toLowerCase();
    if (/pris|köp|kop|abonnemang|paket|program|plan|kostnad/.test(href.toLowerCase()+' '+tx)) {
      try { out.add(new URL(href, location.href).href.split('#')[0]); } catch {}
    }
  } return [...out].slice(0,20);
});
console.log('PRIS-LÄNKAR:', links.length ? links.join('  ') : '(inga)');

// 2) Följ de mest pris-lika kandidaterna och dumpa priser.
const ranked = links.sort((a,b)=>(/pris|kostnad/i.test(b)?1:0)-(/pris|kostnad/i.test(a)?1:0));
let found=false;
for (const url of ranked.slice(0,5)) {
  let st='?';
  try { const r=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000}); st=r?r.status():'?'; } catch(e){ st='ERR '+e.message.split('\n')[0]; }
  await cookies(); await page.waitForTimeout(3500);
  if (await dumpPrices(url, st)) { found=true; break; }
}
if (!found && !links.length) console.log('\n(ingen pris-länk hittad på hemsidan — kolla nav-struktur manuellt)');

console.log('\n==================== Pris-API ====================');
const seen=new Set(); let n=0;
for (const h of apiHits){ const k=h.u.split('?')[0]; if(seen.has(k))continue; seen.add(k); console.log(`  [${h.s}] ${h.u}\n     → ${h.snip}`); if(++n>=8)break; }
if(!n) console.log('  (inga pris-bärande API-anrop)');

await browser.close();
console.log('\n[probe-fortnox-priser] klar');
