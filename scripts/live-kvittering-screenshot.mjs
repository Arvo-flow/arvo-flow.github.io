// scripts/live-kvittering-screenshot.mjs — KVITTERINGENS E2E genom skarpa testytan:
// seedat rum → Bahnhof-avtalet upp på Bahnhof-innehavet → "Vi har sagt upp" → ångra →
// "Vi stannar denna period" — varje läge fotograferat. Inga mockar.
// Körs på Actions (DATABASE_URL för seed + egress). Länken tas som argv.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const URL = process.argv[2];
if (!URL) { console.log('URL saknas (argv[2])'); process.exit(1); }
const OUT = 'ops/kvittering-shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 1200 } });

await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(4500);

// 1 · Expandera Bahnhof-innehavet och ladda upp fäll-avtalet.
const bahnhofRow = page.locator('[aria-expanded]', { hasText: 'Bahnhof' }).first();
await bahnhofRow.click();
await page.waitForTimeout(900);
const upload = page.locator('.sv-upload input[type=file]').first();
await upload.setInputFiles('test-pdfs/avtal/falla2-bahnhof-3plus3.pdf');
console.log('avtal uppladdat — väntar på domen…');
await page.waitForSelector('.sv-upload-note.done, .sv-upload-note.fail', { timeout: 60000 });
console.log('dom:', JSON.stringify(await page.locator('.sv-upload-note').first().textContent()));
await page.waitForTimeout(3500);   // loadOffice → avsnittet renderas

// 2 · Fönstret öppet med handlingarna.
await page.waitForSelector('.al-actions', { timeout: 15000 });
await page.locator('.al-actions').scrollIntoViewIfNeeded();
await page.screenshot({ path: `${OUT}/1-fonster-oppet.png`, fullPage: true });
console.log('✓ läge 1: fönstret öppet med två handlingar');

// 3 · "Vi har sagt upp ✓" → nedräkningsläget.
await page.locator('.al-btn.primary', { hasText: 'sagt upp' }).click();
await page.waitForSelector('text=Avtalet upphör', { timeout: 20000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/2-uppsagt.png`, fullPage: true });
console.log('✓ läge 2: uppsagt — nedräkning + om-vakt');

// 4 · Ångra → tillbaka till rått läge.
await page.locator('.al-angra').click();
await page.waitForSelector('.al-actions', { timeout: 20000 });
await page.waitForTimeout(800);
console.log('✓ ångra: fönstret öppet igen');

// 5 · "Vi stannar denna period" → lugnet registrerat.
await page.locator('.al-btn', { hasText: 'stannar' }).click();
await page.waitForSelector('text=varnar igen då', { timeout: 20000 });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${OUT}/3-stannar.png`, fullPage: true });
console.log('✓ läge 3: valt att stanna — nästa fönster bevakas');

await browser.close();
console.log('KLART — bilder i', OUT);
