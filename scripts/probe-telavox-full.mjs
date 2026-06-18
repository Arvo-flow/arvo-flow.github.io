// scripts/probe-telavox-full.mjs — fokuserad full-dump av Telavox prissida (telavox.se/priser).
// Recon bekräftade ren SEK (Plus 298 / Premium 399 / Max 549) men INGEN moms-markör syntes i snippet-
// dumpen. Zero Trust kräver moms-basen innan vi avgrindar molnväxel (B2B = exkl moms). Här dumpar vi
// HELA innerText + RÅ-HTML och söker hårt efter "exkl/inkl moms" var den än står (kort, footer, tooltip),
// + exakt nivå-/funktionsstruktur. Stealth (withStealthPage-mönstret). Read-only. Kör i GH Actions.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const URL = 'https://telavox.se/priser';

const { chromium } = await import('playwright-extra');
const stealth = (await import('puppeteer-extra-plugin-stealth')).default;
chromium.use(stealth());
const browser = await chromium.launch({ headless: process.env.HEADFUL !== '1' ? true : false, args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=sv-SE'] });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm', viewport: { width: 1366, height: 1400 }, extraHTTPHeaders: { 'Accept-Language': 'sv-SE,sv;q=0.9' } });
const page = await ctx.newPage();
let status = '?';
try { const r = await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 45000 }); status = r ? r.status() : 'no-resp'; }
catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
  try { await page.click(sel, { timeout: 2500 }); await page.waitForTimeout(900); break; } catch {}
}
try { await page.waitForFunction(() => /\d[\d\s.,]*\s*kr/i.test(document.body?.innerText || ''), { timeout: 14000 }); } catch {}
await page.waitForTimeout(3000);
const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
const html = await page.content();

console.log(`#### ${URL} · status ${status} · innerText ${text.length}b`);

// MOMS — hård sökning i både innerText och rå-HTML.
const momsRx = /.{0,50}(?:exkl|inkl|ex\.|inkl\.|exklusive|inklusive|moms\s*tillkommer)[^.]{0,40}moms[^.]{0,20}/gi;
const momsHitsTxt = [...new Set((text.match(momsRx) || []).map((s) => s.replace(/\s+/g, ' ').trim()))];
const momsHitsHtml = [...new Set((html.match(/.{0,40}(?:exkl|inkl|exklusive|inklusive)[^<]{0,30}moms/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 8);
console.log(`\n=== MOMS-markörer (innerText: ${momsHitsTxt.length}, html: ${momsHitsHtml.length}) ===`);
momsHitsTxt.slice(0, 10).forEach((s) => console.log(`  moms-txt| ${s}`));
momsHitsHtml.forEach((s) => console.log(`  moms-html| ${s}`));
if (!momsHitsTxt.length && !momsHitsHtml.length) console.log('  (ingen moms-markör hittad — sidan anger ej moms-bas publikt)');

// Pris + nivå-kontext (bredare).
console.log('\n=== PRIS + NIVÅ-KONTEXT ===');
for (const n of ['298', '399', '549', '219', '299']) {
  const re = new RegExp(`.{0,60}\\b${n}\\s*kr.{0,90}`, 'g');
  const hits = [...new Set((text.match(re) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 3);
  hits.forEach((s) => console.log(`  ${n}| ${s}`));
}

// Full innerText (för exakt nivå/funktion-läsning) — beskuren till 6000 tecken.
console.log('\n=== FULL innerText (beskuren) ===\n' + text.slice(0, 6000));

await ctx.close(); await browser.close();
console.log('\n[probe-telavox-full] klar');
