// scripts/probe-adobe-vat.mjs — RIKTAD recon: är Adobes TEAM/B2B-priser (985/381 per licens) inkl
// eller EXKL moms? Avgörande för B2B-ankaret (Zero Trust: vi gissar aldrig en moms-bas). Stealth som
// knäckte Akamai. Dumpar moms-markörer + kontext runt team-priserna. Read-only. Kör i GH Actions.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const URLS = [
  'https://www.adobe.com/se/creativecloud/plans.html?plan=team',
  'https://www.adobe.com/se/creativecloud/plans.html?plan=team&filter=all-apps',
];

// Moms-markörer (svenska). Fångar både "inkl. moms", "exkl. moms", "moms tillkommer", "ex. moms".
const VAT_RX = /.{0,45}(inkl(?:usive)?\.?\s*moms|exkl(?:usive)?\.?\s*moms|moms\s*tillkommer|ex\.?\s*moms|priser?\s*(?:är\s*)?(?:exkl|inkl))/gi;
const priceCtx = (t, num) => [...new Set((t.match(new RegExp(`.{0,30}${num.replace('.', '[.,]')}.{0,60}`, 'g')) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 6);

const { chromium } = await import('playwright-extra');
const stealth = (await import('puppeteer-extra-plugin-stealth')).default;
chromium.use(stealth());
const browser = await chromium.launch({
  headless: process.env.HEADFUL !== '1' ? true : false,
  args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=sv-SE'],
});
console.log('[adobe-vat] stealth=on');

for (const url of URLS) {
  const ctx = await browser.newContext({
    userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm', viewport: { width: 1366, height: 900 },
    geolocation: { latitude: 59.3293, longitude: 18.0686 }, permissions: ['geolocation'],
    extraHTTPHeaders: { 'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8' },
  });
  const page = await ctx.newPage();
  let status = '?';
  try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); status = r ? r.status() : 'no-resp'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn")']) {
    try { await page.click(sel, { timeout: 2500 }); await page.waitForTimeout(900); break; } catch {}
  }
  try { await page.waitForFunction(() => /\d[\d\s.,]*\s*SEK/i.test(document.body?.innerText || ''), { timeout: 14000 }); } catch {}
  await page.waitForTimeout(2500);
  const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
  const vat = [...new Set((text.match(VAT_RX) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 14);
  console.log(`\n#### ${url}\n  status ${status} · innerText ${text.length}b · moms-markörer ${vat.length}`);
  vat.forEach((s) => console.log(`   moms| ${s}`));
  console.log('   — kontext kring 985 (All Apps team):');
  priceCtx(text, '985').forEach((s) => console.log(`     985| ${s}`));
  console.log('   — kontext kring 381 (Single App team):');
  priceCtx(text, '381').forEach((s) => console.log(`     381| ${s}`));
  await ctx.close();
}
await browser.close();
console.log('\n[adobe-vat] klar');
