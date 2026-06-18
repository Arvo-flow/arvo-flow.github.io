// scripts/probe-telekom-stealth.mjs — RECON v2 (stealth, read-only): Telavox + Telia molnväxel i ÄKTA SEK,
// med moms-bas PER LEVERANTÖR (Zero Trust: aldrig gissad moms, ingen FX).
//
// Telia-URL:erna uppdaterade via web-search: Touchpoint Plus är legacy → nya produkten är Telia SMART
// CONNECT (SMB + stora org). Vi dumpar FULL innerText + söker moms-markör hårt + fångar pris/nivå/add-on.
// Vapnet: withStealthPage-mönstret (playwright-extra + stealth + svensk kontext + headful via xvfb).

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const TARGETS = {
  Telavox: {
    urls: ['https://telavox.se/priser'],
    prices: ['298', '399', '549', '219', '299', '999'],
  },
  Telia: {
    // Korrekta URL:er (web-search juni 2026): Smart Connect = nuvarande molnväxel; Touchpoint Plus = legacy.
    urls: [
      'https://www.telia.se/foretag/vaxlar/vaxel-sma-foretag',
      'https://www.telia.se/foretag/telefoni/smart-connect',
      'https://www.telia.se/foretag/vaxlar/vaxel-stora-foretag',
      'https://www.telia.se/foretag/vaxlar/touchpoint-plus',
    ],
    prices: ['89', '118', '49', '29', '99', '39', '149', '199'],
  },
};

const momsRx = /.{0,55}(?:exkl|inkl|ex\.|exklusive|inklusive|moms\s*tillkommer)[^.<]{0,30}moms[^.<]{0,15}/gi;
const tierVocab = /(Smart Connect|Touchpoint|Plus|Premium|Max|Bas|Standard|Pro|softphone|funktionsnummer|k[öo]hantering|svarsgrupp|kontaktcenter|inspelning|IVR|talsvar|CRM|anknytning|anv[äa]ndare|licens|Mobil)/gi;

const { chromium } = await import('playwright-extra');
const stealth = (await import('puppeteer-extra-plugin-stealth')).default;
chromium.use(stealth());
const browser = await chromium.launch({ headless: process.env.HEADFUL !== '1', args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=sv-SE'] });
console.log('[telekom-stealth v2] stealth=on · Telia-URL:er uppdaterade (Smart Connect)');

for (const [vendor, { urls, prices }] of Object.entries(TARGETS)) {
  console.log(`\n══════════════ ${vendor} ══════════════`);
  for (const url of urls) {
    const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm', viewport: { width: 1366, height: 1400 }, extraHTTPHeaders: { 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    const page = await ctx.newPage();
    let status = '?';
    try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); status = r ? r.status() : 'no-resp'; }
    catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
    for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
      try { await page.click(sel, { timeout: 2500 }); await page.waitForTimeout(900); break; } catch {}
    }
    try { await page.waitForFunction(() => /\d[\d\s.,]*\s*kr/i.test(document.body?.innerText || ''), { timeout: 13000 }); } catch {}
    await page.waitForTimeout(2800);
    const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
    const sek = [...new Set((text.match(/.{0,40}\d[\d\s.,]*\s*kr\b\s*\/?\s*(?:anv|anknytning|användare|m[åa]n(?:ad)?)?.{0,8}/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 24);
    const fx = (text.match(/€|\bEUR\b|\bUSD\b|US\$/g) || []).length;
    const moms = [...new Set((text.match(momsRx) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 8);
    console.log(`\n#### ${url}\n  status ${status} · ${text.length}b · SEK ${sek.length} · FX ${fx}${text.length < 500 ? ' · ⚠ TOM/404' : ''}`);
    sek.slice(0, 16).forEach((s) => console.log(`   kr| ${s}`));
    console.log(`  MOMS (${moms.length}): ${moms.length ? '' : '(ingen markör hittad)'}`);
    moms.forEach((s) => console.log(`   moms| ${s}`));
    if (text.length > 500) console.log('  — full innerText (beskuren 3500):\n' + text.slice(0, 3500));
    await ctx.close();
  }
}
await browser.close();
console.log('\n[telekom-stealth v2] klar');
