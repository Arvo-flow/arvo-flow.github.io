// lib/verifiers/kortterminal.mjs — verifierar kortterminal-transaktionsrater (Zettle, Stripe)
// mot branchindex.kortterminal.verifiedRates. JS-renderade sidor → Playwright (needsBrowser:true).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, kontextUtdrag } from './core.mjs';

// Matchar lagrad rate på sidan, komma/punkt, tål en-decimalform (1,40 → "1,4" eller "1,40").
function pctRx(pct) {
  const [intPart, decPart] = pct.toFixed(2).split('.');
  const dec = decPart.endsWith('0') ? `${decPart[0]}0?` : decPart;
  return new RegExp(`\\b${intPart}[.,]${dec}\\s*%`);
}

/** Checken för EN rate ur en redan läst sidtext — ren funktion, så att sviten kan mata den. */
export function kortterminalCheck(r, text) {
  const found = pctRx(r.pct).test(String(text ?? ''));
  return {
    name: `${r.supplier} ${r.pct.toFixed(2).replace('.', ',')} %`,
    expected: 'finns på sidan', actual: found ? 'finns' : '(saknas)', ok: !!found,
  };
}

/** Vad sidan visade runt varje procentsats och den lagrade raten — för loggen. */
export function kortterminalKontext(r, text) {
  return [
    `${r.supplier} alla procentsatser: ${kontextUtdrag(text, /\d+(?:[.,]\d+)?\s*%/, { fore: 70, efter: 30, max: 8 }).map((s) => `«${s}»`).join(' · ') || '(ingen träff)'}`,
    `${r.supplier} lagrad rate: ${kontextUtdrag(text, pctRx(r.pct), { fore: 90, efter: 40, max: 3 }).map((s) => `«${s}»`).join(' · ') || '(ingen träff)'}`,
  ];
}

export default {
  id: 'kortterminal',
  category: 'kortterminal',
  label: 'Kortterminal transaktionsrater (Zettle/Stripe)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // Vilken KATEGORIPOST i prisboken vakten daterar (top-level lastVerified). Infört 2026-08-22:
  // kategoriposternas datum ruttnade i tysthet precis som nivåernas — molnvaxel låg 66 dagar
  // gammal medan den här vakten körde veckovis och bekräftade priset varje gång. `null` är ett
  // giltigt SVAR (vakten daterar ingen kategoripost), men svaret måste finnas: skillnaden mellan
  // «vaktar ingen» och «ingen frågade» ska stå i koden.
  bevakadKategori: 'kortterminal',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Zettle eller Stripe ändrar sin publicerade transaktionsrate på prissidan som vakten renderar.',
  blind: 'Den faktiska raten i kundens avtal, som beror på kortmix, internationella kort och volym — vakten läser en publik grundrate, inte ett utfall.',
  needsBrowser: true,
  schedule: '0 7 * * 1',
  async run() {
    const vr = BRANCHINDEX.kortterminal?.verifiedRates;
    if (!vr?.rates?.length) return { checks: [], notes: ['verifiedRates saknas'], fatal: true };
    const checks = [];
    const notes = [];
    for (const r of vr.rates) {
      const text = await withPage(r.url, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '));
      checks.push(kortterminalCheck(r, text));
      notes.push(`${r.supplier}: ${String(text ?? '').length} tecken lästa från ${r.url}`, ...kortterminalKontext(r, text));
    }
    return { checks, notes };
  },
};
