// scripts/live-door-lekia.mjs — LIVE-BEVIS för SPF-läxan: samma test grundaren körde
// (lekia.se i dörren på arvoflow.se), fotat före/efter svaret. Inga mockar.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/door-shots';
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 390, height: 1100 } });
await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(2500);

// Ner till dörren, fyll i och öppna
const input = p.locator('input[type=email]').first();
await input.scrollIntoViewIfNeeded();
await p.waitForTimeout(900);
await input.fill('kontakt@lekia.se');
await p.locator('button:has-text("Öppna underlaget")').click();
console.log('dörren öppnad — väntar på underlaget…');
await p.waitForSelector('.rv-find, .rp-note', { timeout: 45000 });
await p.waitForTimeout(1500);

const rows = await p.locator('.rv-title').allTextContents();
console.log('FYND:', JSON.stringify(rows));
await p.locator('.rv-eyebrow').first().scrollIntoViewIfNeeded().catch(() => {});
await p.waitForTimeout(600);
await p.screenshot({ path: `${OUT}/lekia-mobil.png`, fullPage: true });
console.log('✓ mobil');

const d = await b.newPage({ viewport: { width: 1600, height: 1200 } });
await d.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
await d.waitForTimeout(2500);
const di = d.locator('input[type=email]').first();
await di.scrollIntoViewIfNeeded();
await d.waitForTimeout(800);
await di.fill('kontakt@lekia.se');
await d.locator('button:has-text("Öppna underlaget")').click();
await d.waitForSelector('.rv-find, .rp-note', { timeout: 45000 });
await d.waitForTimeout(1500);
await d.screenshot({ path: `${OUT}/lekia-desktop.png`, fullPage: true });
console.log('✓ desktop');

await b.close();
