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
    // Dörren frågar efter en DOMÄN (type=text) sedan 2026-08-13. Selektorn hänger på
    // aria-label — den beskriver VAD fältet är, inte hur det råkar vara typat, så en
    // attributändring kan inte tysta sonden. En sond som letar efter ett fält som inte
    // finns rapporterar sin egen inaktualitet som ett fel i sajten.
    //
    // ── SKILJ "TRASIG SAJT" FRÅN "DEPLOYEN HANN INTE" (2026-08-13) ────────────────────────
    // Sonden föll med en naken TimeoutError 90 sekunder efter en push: Vercel serverade
    // fortfarande föregående bygge, alltså ett fält utan denna aria-label. Utfallet var
    // oskiljbart från en verkligt trasig dörr — ett mätfel som läser som ett produktionsfel.
    // Vi laddar därför om några gånger och namnger orsaken när den ändå uteblir.
    const SEL = 'input[aria-label="Er företagsdomän"]';
    let hittad = false;
    for (let f = 1; f <= 6 && !hittad; f++) {
      hittad = await p.locator(SEL).first().waitFor({ state: 'attached', timeout: 15000 })
        .then(() => true).catch(() => false);
      if (!hittad) {
        console.log(`  · domänfältet ännu inte serverat (försök ${f}) — laddar om`);
        await p.reload({ waitUntil: 'domcontentloaded' });
        await p.waitForTimeout(2000);
      }
    }
    if (!hittad) {
      const harMejlfalt = await p.locator('input[type=email]').count();
      throw new Error(harMejlfalt
        ? `${BASE} serverar fortfarande en ÄLDRE version (e-postfältet finns, domänfältet saknas) — deployen har inte landat, dörren är inte trasig`
        : `${BASE} visar varken domän- eller e-postfält — dörren är verkligt trasig`);
    }
    const input = p.locator(SEL).first();
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
