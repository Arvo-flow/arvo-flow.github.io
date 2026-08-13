// scripts/live-landing-full.mjs — HELA landningssidan mot skarpa sajten, i BÅDA lägen:
//   A) som en ny besökare ser den (02 i exempelläge)
//   B) efter att dörren öppnats (02 personaliserat — rummet fortsätter tråden)
// Tålmodigt svep så rörelselagret (inview) hunnit landa före exponeringen.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const OUT = 'ops/landing-full';
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch({ headless: true });

async function shoot(tag, w, { openDoor }) {
  const p = await b.newPage({ viewport: { width: w, height: 1100 } });
  await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2500);

  if (openDoor) {
    // Fältet var type=email och tog en arbetsmejl. Dörren frågar sedan 2026-08-13 efter en
    // DOMÄN (type=text) — en sond som letar efter det gamla fältet rapporterar "sajten trasig"
    // om sin egen inaktualitet. Selektorn hänger nu på aria-label, som beskriver VAD fältet är
    // och inte hur det råkar vara typat.
    const input = p.locator('input[aria-label="Er företagsdomän"]').first();
    await input.scrollIntoViewIfNeeded();
    await p.waitForTimeout(600);
    await input.fill('lekia.se');
    await p.locator('button:has-text("Öppna underlaget")').click();
    await p.waitForSelector('.rv-find', { timeout: 45000 });
    await p.waitForFunction(() => [...document.querySelectorAll('.rv-receipt')]
      .some((e) => /SAMMANST/i.test(e.textContent)), { timeout: 30000 }).catch(() => {});
    await p.waitForTimeout(800);
  }

  // Tålmodigt svep hela vägen ner och tillbaka upp — inview-lagret måste ha landat överallt
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 300) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `${OUT}/${tag}.png`, fullPage: true });
  console.log('✓', tag);
  await p.close();
}

await shoot('a-exempel-mobil',    390,  { openDoor: false });
await shoot('b-personligt-mobil', 390,  { openDoor: true  });
await shoot('b-personligt-desktop', 1600, { openDoor: true });
await b.close();
