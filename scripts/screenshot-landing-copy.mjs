// scripts/screenshot-landing-copy.mjs — visuell verifiering (regel 8) av Landing-copyn
// (ingressen/HeroProof/pris-intro) mot LIVE-sajten. Körs på Actions (egress).
// Kör: node scripts/screenshot-landing-copy.mjs   (BASE via env, default arvoflow.se)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/landing-copy-shots';
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch({ headless: true });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const p = await b.newPage({ viewport: { width: w, height: 1050 } });
  await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(3000);
  await p.screenshot({ path: `${OUT}/${tag}-hero.png` });
  await p.locator('#priser').scrollIntoViewIfNeeded();
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/${tag}-pris.png` });
  console.log('✓', tag);
  await p.close();
}
await b.close();
