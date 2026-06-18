// scripts/probe-adobe-stealth.mjs — ADOBE SOND 2.0: stealth-skrapning av Creative Cloud SEK-listpriser.
//
// Sond 1.0 dog mot Adobes Akamai bot-skydd (plain fetch → AbortError, headless render → 39-byte challenge).
// 2.0: playwright-extra + puppeteer-extra-plugin-stealth (patchar navigator.webdriver, chrome-runtime,
// WebGL-vendor m.m.) + realistisk SVENSK browser-kontext (sv-SE, Europa/Stockholm, äkta UA + Accept-Language,
// geolokalisering Stockholm) + HEADFUL via xvfb (huvudlöst läge är lättast att fingerprinta). Målet: passera
// väggen och läsa de FAKTISKA SEK-priserna för "Alla program" (All Apps) och "Enstaka program" (Single App).
//
// ZERO TRUST: vi extraherar bara den ÄKTA SEK-siffran som sidan faktiskt visar — ingen FX, ingen gissning.
// Read-only recon (rör ingen prisbok). Körs i GH Actions (HTTP-egress). Respektfullt: enstaka requests, ingen hammer.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const URLS = [
  'https://www.adobe.com/se/creativecloud/plans.html',
  'https://www.adobe.com/se/creativecloud/plans.html?plan=team&filter=all-apps',
  'https://www.adobe.com/se/products/photoshop.html',
  'https://www.adobe.com/se/creativecloud/plans-business.html',
];
const TIERS = ['Alla program', 'All Apps', 'Alla appar', 'Enstaka program', 'Single App', 'En app',
  'Photoshop', 'Illustrator', 'Acrobat', 'Lightroom', 'Express', 'Team', 'Företag'];

const priceHits = (t) => [...new Set((t.match(/.{0,42}\d[\d\s.,]*\s*kr\b.{0,18}/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 40);
function tierCtx(t) {
  const out = [];
  for (const x of TIERS) {
    const re = new RegExp(`.{0,5}${x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.{0,60}`, 'gi');
    let m, c = 0; while ((m = re.exec(t)) !== null && c < 2) { out.push(m[0].replace(/\s+/g, ' ').trim()); c++; }
  }
  return [...new Set(out)].slice(0, 12);
}

const headful = process.env.HEADFUL === '1';
const { chromium } = await import('playwright-extra');
const stealth = (await import('puppeteer-extra-plugin-stealth')).default;
chromium.use(stealth());

const browser = await chromium.launch({
  headless: !headful,
  args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=sv-SE'],
});
console.log(`[adobe-stealth] launch headful=${headful} · stealth=on`);

for (const url of URLS) {
  const ctx = await browser.newContext({
    userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm',
    viewport: { width: 1366, height: 900 },
    geolocation: { latitude: 59.3293, longitude: 18.0686 }, permissions: ['geolocation'],
    extraHTTPHeaders: { 'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8' },
  });
  const page = await ctx.newPage();
  let status = '?';
  try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); status = r ? r.status() : 'no-resp'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  // cookie consent (OneTrust m.fl.)
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")']) {
    try { await page.click(sel, { timeout: 2500 }); await page.waitForTimeout(900); break; } catch {}
  }
  // vänta in att ett kr-pris renderats (Adobe hämtar priser via JS efter load)
  try { await page.waitForFunction(() => /\d[\d\s.,]*\s*kr/i.test(document.body?.innerText || ''), { timeout: 14000 }); } catch {}
  await page.waitForTimeout(2500);
  const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
  const html = await page.content();
  const hitsTxt = priceHits(text), hitsHtml = priceHits(html);
  const blocked = /captcha|are you a human|access denied|reference #|bot|verifiera att du/i.test(text) || text.length < 400;
  console.log(`\n#### ${url}`);
  console.log(`  status ${status} · innerText ${text.length}b · kr(text) ${hitsTxt.length} · kr(html) ${hitsHtml.length}${blocked ? ' · ⚠ MÖJLIG VÄGG/TOM' : ''}`);
  (hitsTxt.length ? hitsTxt : hitsHtml).slice(0, 30).forEach((s) => console.log(`   kr| ${s}`));
  tierCtx(text).forEach((s) => console.log(`   tier| ${s}`));
  await ctx.close();
}
await browser.close();
console.log('\n[adobe-stealth] klar');
