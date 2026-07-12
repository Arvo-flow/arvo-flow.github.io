// scripts/live-door-lekia.mjs — LIVE-BEVIS för dörren: samma test grundaren kör,
// fotat efter svaret. Inga mockar. Två domänklasser: Lekia (rikt SPF-nät) och
// Kristianstads Måleri (tunt nät på Loopia — å/ä/ö-fallet + marknadsankaret).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/door-shots';
mkdirSync(OUT, { recursive: true });

const CASES = [
  { email: 'kontakt@lekia.se', tag: 'lekia' },
  { email: 'hej@kristianstadsmaleri.se', tag: 'kristianstadsmaleri' },
];

const b = await chromium.launch({ headless: true });
for (const { email, tag } of CASES) {
  for (const [w, view] of [[390, 'mobil'], [1600, 'desktop']]) {
    const p = await b.newPage({ viewport: { width: w, height: 1200 } });
    await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(2500);
    const input = p.locator('input[type=email]').first();
    await input.scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
    await input.fill(email);
    await p.locator('button:has-text("Öppna underlaget")').click();
    await p.waitForSelector('.rv-find, .rp-note', { timeout: 45000 });
    await p.waitForTimeout(1500);
    if (view === 'mobil') {
      const rows = await p.locator('.rv-title').allTextContents();
      console.log(`FYND ${tag}:`, JSON.stringify(rows));
    }
    await p.screenshot({ path: `${OUT}/${tag}-${view}.png`, fullPage: true });
    console.log(`✓ ${tag} ${view}`);
    await p.close();
  }
}
await b.close();
