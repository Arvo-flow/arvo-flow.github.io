// scripts/live-sektion02.mjs — LIVE-BEVIS för 02 · Arvo-kontoret i BÅDA lägen:
//   A) exempelläget (besökaren har inte öppnat dörren)
//   B) personaliserat läge (dörren öppnad → rummet fortsätter tråden med deras EGNA fakta)
// Bevisar också att personaliseringen bor i 02 och ALDRIG i dörren.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/sek02-shots';
mkdirSync(OUT, { recursive: true });

// Diagnos: vad svarar den publika pulsen? (bevisar om hjärtslaget har verklig data att visa)
try {
  const r = await fetch(`${BASE}/api/vakt-pulse`);
  console.log('[puls] HTTP', r.status, '→', (await r.text()).slice(0, 200));
} catch (e) { console.log('[puls] FEL', e?.message); }

const b = await chromium.launch({ headless: true });

async function shoot(tag, { openDoor }) {
  const p = await b.newPage({ viewport: { width: 430, height: 1200 }, deviceScaleFactor: 2 });
  await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);

  if (openDoor) {
    // Dörren frågar efter en DOMÄN sedan 2026-08-13 (type=text). Selektorn hänger på
    // aria-label — en sond som letar efter det gamla type=email rapporterar sin egen
    // inaktualitet som ett fel i sajten.
    const input = p.locator('input[aria-label="Er företagsdomän"]').first();
    await input.scrollIntoViewIfNeeded();
    await p.waitForTimeout(600);
    await input.fill('lekia.se');
    await p.locator('button:has-text("Öppna underlaget")').click();
    await p.waitForSelector('.rv-find', { timeout: 45000 });
    // vänta in kvittot (våg 2 klar) så kortet är i sitt slutliga läge
    await p.waitForFunction(() => [...document.querySelectorAll('.rv-receipt')]
      .some((e) => /SAMMANST/i.test(e.textContent)), { timeout: 30000 }).catch(() => {});
    await p.waitForTimeout(800);
  }

  // Rulla ner till 02 så rörelselagret (inview) hunnit landa
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 320) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 130));
    }
  });
  await p.waitForTimeout(1200);

  const dom = await p.locator('.a-dom').first().textContent().catch(() => null);
  const cont = await p.locator('.a-cont').first().textContent().catch(() => null);
  const label = await p.locator('.a-plabel').first().textContent().catch(() => null);
  console.log(`[${tag}] hjärtslag:`, JSON.stringify((label || '').trim()));
  console.log(`[${tag}] veckodom :`, JSON.stringify((dom || '').trim().slice(0, 70)));
  console.log(`[${tag}] fortsättning:`, cont ? JSON.stringify(cont.trim().slice(0, 130)) : '(ingen — exempelläge)');

  const card = p.locator('.a-card').first();
  await card.scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  await card.screenshot({ path: `${OUT}/${tag}.png` });
  console.log(`✓ ${tag}`);
  await p.close();
}

await shoot('a-exempel', { openDoor: false });
await shoot('b-personligt', { openDoor: true });
await b.close();
