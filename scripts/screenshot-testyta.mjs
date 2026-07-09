// scripts/screenshot-testyta.mjs — fotar det seedade avtals-testrummet (mobil + desktop).
// Kör: node scripts/screenshot-testyta.mjs "https://arvoflow.se/portfolio?magic=..."
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const URL = process.argv[2];
if (!URL) { console.log('URL saknas'); process.exit(1); }
mkdirSync('ops/testyta-shots', { recursive: true });

const browser = await chromium.launch({ headless: true });
for (const [w, h, tag] of [[390, 1200, 'mobil'], [1600, 1400, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4500);
  // Expandera första innehavet så amber-uppladdningen syns
  const row = page.locator('[aria-expanded]').first();
  if (await row.count()) { await row.click(); await page.waitForTimeout(800); }
  await page.screenshot({ path: `ops/testyta-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag}`);
  await page.close();
}
await browser.close();
