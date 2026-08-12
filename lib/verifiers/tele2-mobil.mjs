// lib/verifiers/tele2-mobil.mjs — verifierar Tele2:s mobil 24-mån-priser mot prisbokens
// mobil-ankare (matrix → p25/median ÷ 12). JS-renderad sida → Playwright (needsBrowser:true).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck } from './core.mjs';

const URL = 'https://www.tele2.se/foretag/mobilabonnemang';

export default {
  id: 'tele2-mobil',
  category: 'mobil',
  label: 'Tele2 mobil 24-mån-priser',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Tele2 ändrar sina publicerade 24-månaderspriser i abonnemangsmatrisen som vakten renderar.',
  blind: 'Riktade eller inloggningsskyddade kampanjpriser — vakten renderar den publika matrisen som utloggad och ser bara det som visas där.',
  needsBrowser: true,
  schedule: '30 5 * * 1',
  async run() {
    const cell = BRANCHINDEX.mobil.matrix.byraer.micro;
    const p25Monthly = Math.round(cell.p25 / 12);
    const medianMonthly = Math.round(cell.median / 12);

    const prices = await withPage(URL, async (page, status) => {
      if (typeof status === 'number' && status !== 200) return { status };
      const text = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
      // Tele2 flyttade "Nu:"-etiketten till en egen rad (drift 2026-06) → kräv den inte längre.
      // 24-mån-priset står som "<N> kr/mån i 24 mån" (ordinarie "<N> kr/mån" utan suffix matchas ej).
      const re = /(\d[\d\s]*?)\s*kr\s*\/?\s*m[åa]n\s*i\s*24\s*m[åa]n/gi;
      const out = []; let m;
      while ((m = re.exec(text))) { const v = Number(m[1].replace(/\s/g, '')); if (v >= 50 && !out.includes(v)) out.push(v); }
      return { status, prices: out.sort((a, b) => a - b) };
    });

    const found = prices?.prices ?? [];
    if (found.length < 2) return { checks: [], notes: [`status ${prices?.status} · läste ${found.length} 24-mån-priser — parse-fel/layoutändring`], fatal: true };
    return {
      checks: [
        numCheck('p25/entré (60 GB)', p25Monthly, found[0], { unit: ' kr' }),
        numCheck('median (Obegränsad)', medianMonthly, found[1], { unit: ' kr' }),
      ],
      notes: [`24-mån-priser live (sorterade): ${found.join(', ')} kr`],
    };
  },
};
