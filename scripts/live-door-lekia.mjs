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
  { email: 'x@hdssyjxdd.se', tag: 'spokdoman' },   // spökdomän-läxan: ska ge ärligt besked, inget kort
  { email: 'info@k-fastigheter.se', tag: 'kfast', waitReceipt: true },   // pending-noten MÅSTE resolvera till kvitto
];

const b = await chromium.launch({ headless: true });
for (const { email, tag, waitReceipt } of CASES) {
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
    // Pending-läxan: vänta tills våg 2 resolverat till kvittot ("SAMMANSTÄLLT") och verifiera
    // att pending-noten ("arbetar fortfarande") ÄR BORTA — beviset att noten aldrig hänger kvar.
    if (waitReceipt) {
      await p.waitForFunction(() => [...document.querySelectorAll('.rv-receipt')]
        .some((e) => /SAMMANST/i.test(e.textContent)), { timeout: 30000 }).catch(() => {});
      const stillPending = await p.locator('.rv-receipt', { hasText: 'arbetar fortfarande' }).count();
      if (view === 'mobil') console.log(`PENDING KVAR ${tag}:`, stillPending, '(ska vara 0)');
    }
    if (view === 'mobil') {
      const rows = await p.locator('.rv-title').allTextContents();
      console.log(`FYND ${tag}:`, JSON.stringify(rows));
      if (!rows.length) console.log(`NOT ${tag}:`, JSON.stringify(await p.locator('.rp-note').allTextContents()));
    }
    await p.screenshot({ path: `${OUT}/${tag}-${view}.png`, fullPage: true });
    console.log(`✓ ${tag} ${view}`);
    await p.close();
  }
}
await b.close();
