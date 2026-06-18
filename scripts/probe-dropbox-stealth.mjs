// ═══ VERDIKT 2026-06-18: STEALTH PASSERADE — men Dropbox prissätter Sverige i USD → UNDERKÄNT (Zero Trust). ═══
//   Alla sidor status 200, fullt innehåll, priser PUBLIKA (ingen inloggning behövdes). MEN på /sv_SE-sidan
//   (svensk UI) är beloppen i US-DOLLAR: Plus 9,99 US$/mån · Standard 15 US$/anv/mån · Advanced 24 US$/anv/mån
//   · Professional 16,58 US$/mån. Inte SEK, inte EUR. → kräver USD→SEK-FX, vilket vi ALDRIG gör (regel: inga FX).
//   Inloggning (cookie) hade inte hjälpt — Dropbox debiterar svenska konton i USD. saas-creative/lagring via
//   Dropbox står därför utan ren SEK-källa. Ingen data stagead. (Adobe = den rena källan, se recon-adobe-*.)
//
// scripts/probe-dropbox-stealth.mjs — DROPBOX SOND 2.0 (PUBLIK, stealth, INGEN inloggning, INGEN cookie).
//
// Användaren når inte Dropbox från sin begränsade jobbdator → vi löser det utan cookie. Dropbox visar
// sina planpriser PUBLIKT för anonyma besökare (ingen inloggning krävs). Sond 1.0 rapporterade 0 priser
// av TVÅ skäl vi nu vet är buggar, inte en vägg: (a) gammal kr-only-regex (Dropbox skriver ev. "SEK"),
// (b) ingen stealth → headless fick degraderad sida (samma som Adobe). 2.0: playwright-extra + stealth +
// headful via xvfb + svensk kontext + SEK/EUR/USD-detektor.
//
// ZERO TRUST + INGA FX: bara ÄKTA SEK godtas. Visar Dropbox EUR/USD för Sverige (vanligt för nordiska SaaS)
// → FX-gräns, UNDERKÄNT (vi konverterar aldrig). Read-only recon, rör ingen prisbok. Kör i GH Actions.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const URLS = [
  'https://www.dropbox.com/sv_SE/plans',
  'https://www.dropbox.com/sv_SE/individual/plans',
  'https://www.dropbox.com/sv_SE/business/pricing',
  'https://www.dropbox.com/business/plans-comparison',
  'https://www.dropbox.com/buy',
];
const TIERS = ['Plus', 'Essentials', 'Professional', 'Standard', 'Advanced', 'Business'];

const sekHits = (t) => [...new Set((t.match(/.{0,46}\d[\d\s.,]*\s*(?:SEK|kr)\b\s*\/?\s*(?:m[åa]n(?:ad)?)?.{0,6}/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 40);
const eurHits = (t) => [...new Set((t.match(/.{0,30}(?:€\s?\d[\d.,]*|\d[\d.,]*\s*(?:EUR|€)).{0,8}/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 12);
// Dropbox skriver "9,99 US$/månad" (belopp FÖRE US$) OCH ev. "$9.99" — fånga båda formaten.
const usdHits = (t) => [...new Set((t.match(/.{0,6}\d[\d.,]*\s*US\$\s*\/?\s*(?:anv\/)?(?:m[åa]n(?:ad)?)?|(?:US)?\$\s?\d[\d.,]*.{0,8}/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 14);
function tierCtx(t) {
  const out = [];
  for (const x of TIERS) {
    const re = new RegExp(`.{0,5}\\b${x}\\b.{0,60}`, 'gi');
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
console.log(`[dropbox-stealth] launch headful=${headful} · stealth=on`);

let anySek = false, anyEur = false, anyUsd = false;
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
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Tillåt alla")', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn")']) {
    try { await page.click(sel, { timeout: 2500 }); await page.waitForTimeout(900); break; } catch {}
  }
  try { await page.waitForFunction(() => /\d[\d\s.,]*\s*(?:SEK|kr|EUR|€|\$)/i.test(document.body?.innerText || ''), { timeout: 14000 }); } catch {}
  await page.waitForTimeout(2500);
  const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
  const sek = sekHits(text), eur = eurHits(text), usd = usdHits(text);
  if (sek.length) anySek = true; if (eur.length) anyEur = true; if (usd.length) anyUsd = true;
  const blocked = text.length < 400;
  console.log(`\n#### ${url}`);
  console.log(`  status ${status} · innerText ${text.length}b · SEK ${sek.length} · EUR ${eur.length} · USD ${usd.length}${blocked ? ' · ⚠ TOM/VÄGG' : ''}`);
  sek.slice(0, 16).forEach((s) => console.log(`   kr| ${s}`));
  eur.slice(0, 6).forEach((s) => console.log(`   €| ${s}`));
  usd.slice(0, 4).forEach((s) => console.log(`   $| ${s}`));
  tierCtx(text).forEach((s) => console.log(`   tier| ${s}`));
  await ctx.close();
}
await browser.close();
console.log(`\n[dropbox-stealth] klar · ÄKTA SEK: ${anySek} · EUR: ${anyEur} · USD: ${anyUsd} (EUR/USD = FX-gräns)`);
console.log(anySek
  ? '→ KANDIDAT: Dropbox visar SEK publikt. Verifiera tier-struktur ovan + moms, stagea, bygg verifierare.'
  : (anyEur || anyUsd)
    ? `→ UNDERKÄNT (Zero Trust): Dropbox prissätter Sverige i ${anyUsd ? 'USD' : 'EUR'} → kräver FX. Vi konverterar aldrig.`
    : '→ OKLART: inga priser i någon valuta — JS-gated/inloggning. Kräver autentiserad session (cookie-sonden).');
