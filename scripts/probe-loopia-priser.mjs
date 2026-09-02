// scripts/probe-loopia-priser.mjs — spaning: publicerar Loopia SEK-listpriser för företag på öppen sida?
// Ren rekognosering, ingen prisbok rörs. HTTP-egress krävs (GH Actions) — loopia.se är blockerad i sandboxen.
//
// Frågan sonden ska kunna svara på, och bara den:
//   1. Finns en publik SEK-prissida (webbhotell/VPS) — exakt URL?
//   2. Paketnamn + pris + enhet (kr/mån eller kr/år) + exkl/inkl moms.
//   3. KAMPANJFÄLLA: skiljer sig "första året"-priset från ordinarie? (Ordinarie ÄR listpriset.)
//   4. STRUKTUR: står talen i RÅ HTML (fetch-läsbara) eller renderas de av JS? Avgör om en
//      verifierare kan byggas utan Playwright.
//   5. HINDER: cookie-vägg, "kontakta oss", konfiguration/domänval krävs före pris.
//
// Punkt 4 mäts genom att jämföra samma sida hämtad med rå fetch mot renderad innerText —
// ett tal som bara finns i den renderade texten är JS-injicerat. Att gissa vore värdelöst.

import { chromium } from 'playwright';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const MAL = [
  'https://www.loopia.se/webbhotell/priser/',
  'https://www.loopia.se/webbhotell/',
  'https://www.loopia.se/vps/',
  'https://www.loopia.se/priser/',
  'https://support.loopia.se/wiki/vara-priser/',
];

// ---- Steg 1: RÅ HTML (utan JS) — kan en enkel verifierare läsa priset? ----
async function raHtml(url) {
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'sv-SE,sv;q=0.9' }, redirect: 'follow' });
    const html = await r.text();
    return { status: r.status, url: r.url, html };
  } catch (e) {
    return { status: 'ERR ' + e.message.split('\n')[0], url, html: '' };
  }
}

// Plocka pris-liknande fragment ur en textmassa. Ingen tolkning — bara vad som STÅR.
function prisfragment(text) {
  const t = text.replace(/\s+/g, ' ');
  const re = /(\d{1,3}(?:[  ]?\d{3})*(?:[.,]\d{1,2})?)\s*kr\s*\/?\s*(m[åa]n(?:ad)?|år|st)?/gi;
  return [...new Set([...t.matchAll(re)].map((m) => m[0].trim()))];
}

function momsord(text) {
  const t = text.replace(/\s+/g, ' ');
  const träffar = [...new Set([...t.matchAll(/[^.]{0,70}(exkl\.?\s*moms|inkl\.?\s*moms|ex\.?\s*moms|moms tillkommer|priser? (?:är |anges )?(?:exkl|inkl)[^.]{0,30})/gi)].map((m) => m[0].trim().slice(0, 110)))];
  return träffar.slice(0, 10);
}

function kampanjord(text) {
  const t = text.replace(/\s+/g, ' ');
  const träffar = [...new Set([...t.matchAll(/[^.]{0,90}(f[öo]rsta [åa]ret|d[äa]refter|ordinarie pris|ord\.?\s*pris|introduktionspris|kampanj|f[öo]rnyelse(?:pris)?|rabatt)[^.]{0,90}/gi)].map((m) => m[0].trim().slice(0, 180)))];
  return träffar.slice(0, 14);
}

function hinderord(text) {
  const t = text.replace(/\s+/g, ' ');
  const träffar = [...new Set([...t.matchAll(/[^.]{0,60}(kontakta oss|beg[äa]r offert|offert|logga in|v[äa]lj (?:din )?dom[äa]n|s[öo]k dom[äa]n)[^.]{0,60}/gi)].map((m) => m[0].trim().slice(0, 130)))];
  return träffar.slice(0, 8);
}

console.log('==================== STEG 1 · RÅ HTML (ingen JS) ====================');
const raResultat = {};
for (const url of MAL) {
  const r = await raHtml(url);
  const text = r.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
  const frag = prisfragment(text);
  raResultat[url] = { status: r.status, frag, bytes: r.html.length };
  console.log(`\n${url}\n  status ${r.status} · ${r.html.length} bytes · slutlig ${r.url}`);
  console.log(`  PRISFRAGMENT I RÅ HTML (${frag.length}): ${frag.slice(0, 30).join(' · ') || '(inga)'}`);
}

// ---- Steg 2: RENDERAD sida ----
console.log('\n\n==================== STEG 2 · RENDERAD (Playwright) ====================');
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
const page = await ctx.newPage();
page.setDefaultTimeout(30000);

async function cookies() {
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Tillåt alla")', 'button:has-text("Godkänn")', 'button:has-text("Acceptera")', 'button:has-text("Jag godkänner")']) {
    try { await page.click(sel, { timeout: 1500 }); await page.waitForTimeout(900); return sel; } catch {}
  }
  return null;
}

for (const url of MAL) {
  let status = '?';
  try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); status = r ? r.status() : '?'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  const cookieKnapp = await cookies();
  await page.waitForTimeout(3000);

  console.log(`\n######## ${url} — status ${status} ########`);
  console.log(`  cookie-vägg: ${cookieKnapp ? 'JA (klickade ' + cookieKnapp + ')' : 'ingen hittad'}`);
  if (typeof status !== 'number' || status >= 400) continue;

  const text = await page.evaluate(() => (document.body.innerText || ''));

  // Priskort: kortaste block som bär både ett tal och "kr"
  const kort = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll('div,section,article,li,td,h2,h3,span')) {
      const t = (el.innerText || '').replace(/\s+/g, ' ').trim();
      if (t && t.length <= 190 && /\d{1,5}\s*kr/i.test(t)) out.push(t);
    }
    return [...new Set(out)].slice(0, 45);
  });

  const frag = prisfragment(text);
  const ra = raResultat[url] || { frag: [] };
  const baraRenderade = frag.filter((f) => !ra.frag.includes(f));

  console.log(`  PRISKORT (${kort.length}):`);
  kort.slice(0, 30).forEach((k) => console.log('   • ' + k.slice(0, 170)));
  console.log(`\n  ALLA PRISFRAGMENT RENDERAT (${frag.length}): ${frag.slice(0, 40).join(' · ') || '(inga)'}`);
  console.log(`  → FANNS I RÅ HTML: ${frag.length - baraRenderade.length}/${frag.length} · ENDAST EFTER JS: ${baraRenderade.join(' · ') || '(inga)'}`);
  console.log(`  MOMS: ${momsord(text).join(' | ') || '(inget momsord)'}`);
  console.log(`  KAMPANJ: ${kampanjord(text).join(' | ') || '(inget kampanjord)'}`);
  console.log(`  HINDER: ${hinderord(text).join(' | ') || '(inga)'}`);

  // Paketnamn: rubriker nära ett pris
  const paket = await page.evaluate(() => {
    const out = [];
    for (const h of document.querySelectorAll('h1,h2,h3,h4')) {
      const namn = (h.innerText || '').replace(/\s+/g, ' ').trim();
      if (!namn || namn.length > 60) continue;
      const block = h.closest('div,section,article,li');
      const t = block ? (block.innerText || '').replace(/\s+/g, ' ').trim() : '';
      if (/\d{1,5}\s*kr/i.test(t)) out.push(namn + ' → ' + t.slice(0, 200));
    }
    return [...new Set(out)].slice(0, 25);
  });
  console.log('  PAKET (rubrik → block):');
  paket.forEach((p) => console.log('   § ' + p));
}

await browser.close();
console.log('\n[probe-loopia-priser] klar');
