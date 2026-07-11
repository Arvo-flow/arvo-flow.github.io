// scripts/screenshot-landing-copy.mjs — visuell verifiering (regel 8) av Landing-copyn
// (ingressen/HeroProof/pris-intro) mot LIVE-sajten. Körs på Actions (egress).
// Kör: node scripts/screenshot-landing-copy.mjs   (BASE via env, default arvoflow.se)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/landing-copy-shots';
mkdirSync(OUT, { recursive: true });

// v5 (2026-07-12): fullsides-foto med tålmodigt svep så rörelselagret (inview) hunnit landa.
const b = await chromium.launch({ headless: true });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1050 } });
  await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 350) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(2200);
  await p.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
  console.log('✓', tag);
  await p.close();
}
await b.close();
