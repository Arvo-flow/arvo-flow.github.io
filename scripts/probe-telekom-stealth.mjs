// scripts/probe-telekom-stealth.mjs — RECON (stealth, read-only): kartlägg Telavox + Telia Företag
// molnväxel-priser i ÄKTA SEK, per leverantör, MED moms-markör (Zero Trust: aldrig gissad moms, ingen FX).
//
// Vapnet: withStealthPage-mönstret (playwright-extra + stealth + svensk kontext + headful via xvfb) som
// knäckte Akamai för Adobe. Mål: deterministiska per-användare/mån SEK-listpriser + nivånamn + moms-bas.
// Dumpar pris-tokens (SEK/kr), moms-markörer, nivå/plan-kontext och flaggar EUR/USD (= FX-gräns, underkänt).

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const TARGETS = {
  Telavox: {
    tiers: ['Bas', 'Plus', 'Pro', 'Premium', 'Start', 'Standard', 'Enterprise', 'Kontaktcenter', 'Callcenter', 'Licens', 'användare'],
    urls: ['https://telavox.se/priser', 'https://www.telavox.se/priser', 'https://telavox.se/', 'https://www.telavox.com/se/', 'https://telavox.se/produkter/telefoni'],
  },
  Telia: {
    tiers: ['Touchpoint', 'Plus', 'App', 'Mobil', 'Växel', 'Bas', 'Standard', 'Kontaktcenter', 'licens', 'anknytning', 'användare'],
    urls: [
      'https://www.telia.se/foretag/tjanster/telefoni-vaxel',
      'https://www.telia.se/foretag/produkter/vaxel',
      'https://www.telia.se/foretag/tjanster/produkter/vaxeltjanster/touchpoint-plus',
      'https://www.telia.se/foretag/vaxel',
    ],
  },
};

const sekHits = (t) => [...new Set((t.match(/.{0,46}\d[\d\s.,]*\s*(?:SEK|kr)\b\s*\/?\s*(?:anv|anknytning|användare|m[åa]n(?:ad)?)?.{0,8}/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 40);
const eurUsd = (t) => [...new Set((t.match(/.{0,12}(?:€\s?\d[\d.,]*|\d[\d.,]*\s*EUR|(?:US)?\$\s?\d[\d.,]*|\d[\d.,]*\s*US\$)/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 8);
const VAT_RX = /.{0,40}(inkl(?:usive)?\.?\s*moms|exkl(?:usive)?\.?\s*moms|moms\s*tillkommer|ex\.?\s*moms|priser?\s*(?:är\s*)?(?:exkl|inkl)|per\s*(?:anv[äa]ndare|anknytning|licens))/gi;
function tierCtx(t, tiers) {
  const out = [];
  for (const x of tiers) {
    const re = new RegExp(`.{0,8}\\b${x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b.{0,55}`, 'gi');
    let m, c = 0; while ((m = re.exec(t)) !== null && c < 2) { out.push(m[0].replace(/\s+/g, ' ').trim()); c++; }
  }
  return [...new Set(out)].slice(0, 12);
}

const headful = process.env.HEADFUL === '1';
const { chromium } = await import('playwright-extra');
const stealth = (await import('puppeteer-extra-plugin-stealth')).default;
chromium.use(stealth());
const browser = await chromium.launch({ headless: !headful, args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=sv-SE'] });
console.log(`[telekom-stealth] launch headful=${headful} · stealth=on`);

for (const [vendor, { urls, tiers }] of Object.entries(TARGETS)) {
  console.log(`\n══════════════ ${vendor} ══════════════`);
  for (const url of urls) {
    const ctx = await browser.newContext({
      userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm', viewport: { width: 1366, height: 900 },
      geolocation: { latitude: 59.3293, longitude: 18.0686 }, permissions: ['geolocation'],
      extraHTTPHeaders: { 'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8' },
    });
    const page = await ctx.newPage();
    let status = '?';
    try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); status = r ? r.status() : 'no-resp'; }
    catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
    for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
      try { await page.click(sel, { timeout: 2500 }); await page.waitForTimeout(900); break; } catch {}
    }
    try { await page.waitForFunction(() => /\d[\d\s.,]*\s*(?:SEK|kr)/i.test(document.body?.innerText || ''), { timeout: 13000 }); } catch {}
    await page.waitForTimeout(2500);
    const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
    const sek = sekHits(text), fx = eurUsd(text);
    const vat = [...new Set((text.match(VAT_RX) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 10);
    console.log(`\n#### ${url}\n  status ${status} · innerText ${text.length}b · SEK ${sek.length} · EUR/USD ${fx.length}${text.length < 400 ? ' · ⚠ TOM/VÄGG' : ''}`);
    sek.slice(0, 18).forEach((s) => console.log(`   kr| ${s}`));
    fx.slice(0, 4).forEach((s) => console.log(`   FX| ${s}`));
    vat.forEach((s) => console.log(`   moms| ${s}`));
    tierCtx(text, tiers).forEach((s) => console.log(`   tier| ${s}`));
    await ctx.close();
  }
}
await browser.close();
console.log('\n[telekom-stealth] klar');
