// scripts/probe-telekom-moms.mjs — RIKTAD moms-sond (stealth, read-only): bekräfta moms-BASEN för
// Telavox + Telia telekom-listpriser. Förra sonden missade den (för strikt regex + truncering). Här
// dumpar vi VARJE förekomst av "moms" med kontext ur BÅDE renderad text OCH rå-HTML (footer/tooltip/
// villkor som innerText kan missa), över pris- + villkors-/köp-sidor där basen alltid anges.
// Zero Trust: vi avgrindar telekom-listpris först när basen är EXPLICIT verifierad. Ingen FX.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const TARGETS = {
  Telavox: ['https://telavox.se/priser', 'https://telavox.se/villkor', 'https://telavox.se/allmanna-villkor', 'https://telavox.se/anvandarvillkor'],
  Telia: [
    'https://www.telia.se/foretag/priser',
    'https://www.telia.se/foretag/vaxlar/vaxel-sma-foretag',
    'https://www.telia.se/foretag/villkor',
    'https://www.telia.se/foretag/kop-villkor',
  ],
};

const momsCtx = (s) => [...new Set((s.match(/.{0,75}moms.{0,45}/gi) || []).map((x) => x.replace(/\s+/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()))].slice(0, 14);

const { chromium } = await import('playwright-extra');
const stealth = (await import('puppeteer-extra-plugin-stealth')).default;
chromium.use(stealth());
const browser = await chromium.launch({ headless: process.env.HEADFUL !== '1', args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=sv-SE'] });
console.log('[telekom-moms] stealth=on · söker EXPLICIT moms-bas');

for (const [vendor, urls] of Object.entries(TARGETS)) {
  console.log(`\n══════════════ ${vendor} ══════════════`);
  for (const url of urls) {
    const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm', viewport: { width: 1366, height: 1400 }, extraHTTPHeaders: { 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    const page = await ctx.newPage();
    let status = '?';
    try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 }); status = r ? r.status() : 'no-resp'; }
    catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
    for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
      try { await page.click(sel, { timeout: 2000 }); await page.waitForTimeout(700); break; } catch {}
    }
    await page.waitForTimeout(2500);
    const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
    const html = await page.content();
    const m1 = momsCtx(text), m2 = momsCtx(html);
    console.log(`\n#### ${url}\n  status ${status} · text ${text.length}b · moms(text) ${m1.length} · moms(html) ${m2.length}${status !== 200 ? ' · ⚠ ej 200' : ''}`);
    m1.forEach((s) => console.log(`   moms-text| ${s}`));
    if (!m1.length) m2.slice(0, 10).forEach((s) => console.log(`   moms-html| ${s}`));
    await ctx.close();
  }
}
await browser.close();
console.log('\n[telekom-moms] klar');
