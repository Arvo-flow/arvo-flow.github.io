// scripts/live-avtal-screenshot.mjs — RIKTIG avtalsuppladdning genom det SKARPA rummet
// (arvoflow.se/portfolio) med Playwright, fotograferad steg för steg. Inga mockar:
// äkta fingerprint-rum, äkta AI-läsning, äkta klocka, äkta pixlar (grundarens begäran
// 2026-07-08: "ladda upp avtalet och skicka bilder på resultatet").
//
// Körning 4 (2026-07-08): "nyare avtal"-vägen i avsnittet (körning 3 fann att ett läst
// avtal saknade ersättningsväg) — Bahnhof mot Tele2-innehavet ska ge den ÄRLIGA FLAGGAN.
// Flöde: öppna rummet → fånga sidans egna fingerprint ur invoice-history-anropet →
// mynta ett innehav via den vanliga fakturapipen (samma fingerprint) → ladda om →
// expandera innehavet → ladda upp Bahnhof-fällan genom det riktiga UI:t → fotografera
// domen. Körs på Actions (egress). Bilder → ops/live-avtal-shots/ (committas av workflow).
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/live-avtal-shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
// OBS: fingerprintet räknas på userAgent+SKÄRM+tidszon — samma screen på båda sidorna,
// annars öppnar desktop-vyn ett ANNAT (tomt) rum än det vi just fyllt.
const SCREEN = { width: 1600, height: 1200 };
const page = await browser.newPage({ viewport: { width: 390, height: 1200 }, screen: SCREEN });

// 1 · Öppna rummet och fånga fingerprintet sidan själv räknar fram.
let fingerprint = null;
page.on('request', (req) => {
  if (req.url().includes('/api/invoice-history')) {
    const u = new URL(req.url());
    fingerprint = fingerprint ?? u.searchParams.get('fingerprint');
  }
});
await page.goto(`${BASE}/portfolio`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4000);
console.log('fingerprint fångat:', fingerprint ? `${fingerprint.slice(0, 12)}…` : 'SAKNAS');
if (!fingerprint) { console.log('AVBRYTER'); process.exit(1); }

// 2 · Mynta ett innehav i DET rummet via den vanliga pipen (om rummet är tomt).
const holdings = await page.locator('[aria-expanded]').count();
console.log('innehav före:', holdings);
if (holdings === 0) {
  const tr = await fetch(`${BASE}/api/token`, { method: 'POST' });
  const token = (await tr.json().catch(() => ({})))?.token ?? null;
  const invRes = await fetch(`${BASE}/api/test-invoice`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pdfBase64: readFileSync('test-pdfs/diag-bredband.pdf').toString('base64'),
      industry: 'ovrigt', employees: 12, token, fingerprint,
    }),
  });
  const inv = await invRes.json().catch(() => ({}));
  console.log(`analys myntad: HTTP ${invRes.status} · route ${inv.route} · id ${inv.analysisId ?? 'SAKNAS'}`);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4500);
}

await page.screenshot({ path: `${OUT}/1-rummet.png`, fullPage: true });

// 3 · Expandera första innehavet → uppladdningsytan.
const row = page.locator('[aria-expanded]').first();
await row.click();
await page.waitForTimeout(900);
const upload = page.locator('.sv-upload').first();
if (!(await upload.count())) { console.log('INGEN uppladdningsyta — avbryter'); await page.screenshot({ path: `${OUT}/fel.png`, fullPage: true }); process.exit(1); }
await upload.scrollIntoViewIfNeeded();
await page.screenshot({ path: `${OUT}/2-innehavet.png`, fullPage: true });

// 4 · Den riktiga uppladdningen: Bahnhof-fällan (3+3, AKUT fönster).
await upload.locator('input[type=file]').setInputFiles('test-pdfs/avtal/falla2-bahnhof-3plus3.pdf');
await page.waitForTimeout(700);
console.log('under läsning — knapptext:', JSON.stringify(await upload.textContent()));
await page.screenshot({ path: `${OUT}/3-laser-avtalet.png`, fullPage: true });

// 5 · Vänta in domen (AI + klocka tar ~10–25 s live).
await page.waitForSelector('.sv-upload-note.done, .sv-upload-note.fail', { timeout: 60000 });
const note = page.locator('.sv-upload-note').first();
console.log('DOMEN:', JSON.stringify(await note.textContent()));
await note.scrollIntoViewIfNeeded();
await page.waitForTimeout(2500);   // loadOffice-uppdateringen (teal-läget) hinner landa
await page.screenshot({ path: `${OUT}/4-domen.png`, fullPage: true });

// 6 · Desktop-vy av slutläget (regel 8: båda brytpunkterna).
const desk = await browser.newPage({ viewport: { width: 1600, height: 1400 }, screen: SCREEN });
await desk.goto(`${BASE}/portfolio`, { waitUntil: 'domcontentloaded' });
await desk.waitForTimeout(4500);
const deskRow = desk.locator('[aria-expanded]').first();
if (await deskRow.count()) { await deskRow.click(); await desk.waitForTimeout(900); }
await desk.screenshot({ path: `${OUT}/5-desktop.png`, fullPage: true });

await browser.close();
console.log('KLART — bilder i', OUT);
