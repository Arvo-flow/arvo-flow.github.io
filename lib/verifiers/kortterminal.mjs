// lib/verifiers/kortterminal.mjs — verifierar kortterminal-transaktionsrater (Zettle, Stripe)
// mot branchindex.kortterminal.verifiedRates. JS-renderade sidor → Playwright (needsBrowser:true).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, kontextUtdrag, numCheck, lasEntydigt } from './core.mjs';

// Matchar lagrad rate på sidan, komma/punkt, tål en-decimalform (1,40 → "1,4" eller "1,40").
function pctRx(pct) {
  const [intPart, decPart] = pct.toFixed(2).split('.');
  const dec = decPart.endsWith('0') ? `${decPart[0]}0?` : decPart;
  return new RegExp(`\\b${intPart}[.,]${dec}\\s*%`);
}

// Var raten står, per leverantör (avläst 18 okt). Stripe: «1,4 % + 1,00 kr per genomförd
// debitering för EES-kort 2,9 % + 1,00 kr … » — EES-raten är den första och den enda med «EES-kort»
// efter sig. Zettle: «1,85 % korttransaktionsavgift» står tre gånger; «1,85 % Andra
// transaktionstyper» och «Betalningslänkar* 2,5 %» är andra produkter. En leverantör utan läsare här
// ger null, alltså OLÄSBAR — en ny rate i boken kan aldrig bli grön av att ingen läste den (NV-03).
//
// Stripes fasta avgift står i samma mening («+ 1,00 kr per genomförd debitering») och når kunden som
// «Lägst rate: 1,4 % + 1,00 kr». Den lästes förut inte, så en höjd fast avgift var grön och kategorin
// stämplades ändå som verifierad (andra blicken V85-K1). Nu läses den ur samma träff (NV-03). Zettle
// trycker ingen fast avgift (boken: 0) och har därför ingen andra grupp och ingen check (NV-03): en
// nolla som inte står på sidan finns inget att läsa ur.
const PCT = String.raw`\d+(?:,\d+)?`;
const RATELASARE = {
  'Stripe Terminal': { fastAvgift: true, rx: new RegExp(String.raw`(${PCT})\s*%\s*\+\s*(${PCT})\s*kr\s+per genomförd debitering för EES-kort`, 'g') },
  'Zettle by PayPal': { fastAvgift: false, rx: new RegExp(String.raw`(${PCT})\s*%\s*korttransaktionsavgift`, 'g') },
};

/** Raten och, där meningen bär den, den fasta avgiften på leverantörens förankrade plats; null där
 *  platsen saknas eller sidan säger olika. */
export function kortterminalLas(r, text) {
  const lasare = RATELASARE[r.supplier];
  const tal = lasare ? lasEntydigt(text, lasare.rx) : null;
  return { pct: tal?.[0] ?? null, fast: tal?.[1] ?? null, harFastAvgift: !!lasare?.fastAvgift };
}

/** Checken för EN rate ur en redan läst sidtext — ren funktion, så att sviten kan mata den. */
export function kortterminalCheck(r, text) {
  return numCheck(`${r.supplier} transaktionsavgift (%)`, r.pct, kortterminalLas(r, text).pct, { unit: ' %' });
}

/** Checken för den fasta avgiften, eller null för en leverantör vars mening inte bär någon. */
export function kortterminalFastCheck(r, text) {
  const live = kortterminalLas(r, text);
  return live.harFastAvgift ? numCheck(`${r.supplier} fast avgift per debitering (kr)`, r.fixed, live.fast, { unit: ' kr' }) : null;
}

/** Alla checkar för EN leverantör — det kortterminalUtfall lägger i fabrikens utfall (NV-03). */
export function kortterminalChecks(r, text) {
  const fast = kortterminalFastCheck(r, text);
  return fast ? [kortterminalCheck(r, text), fast] : [kortterminalCheck(r, text)];
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
  fangar: 'Zettle ändrar sin korttransaktionsavgift, eller Stripe sin rate eller fasta avgift för EES-kort, på prissidan: vakten läser talet på sin plats och visar det nya (DRIFT).',
  blind: 'Den faktiska raten i kundens avtal, som beror på kortmix, internationella kort och volym — vakten läser en publik grundrate, inte ett utfall. En leverantör i boken utan läsare i RATELASARE blir OLÄSBAR. Zettles fasta avgift (0 i boken) står inte som tal på sidan och läses inte.',
  needsBrowser: true,
  schedule: '0 7 * * 1',
  async run() {
    const vr = BRANCHINDEX.kortterminal?.verifiedRates;
    if (!vr?.rates?.length) return { checks: [], notes: ['verifiedRates saknas'], fatal: true };
    const texter = [];
    for (const r of vr.rates) {
      texter.push(await withPage(r.url, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ')));
    }
    return kortterminalUtfall(vr.rates, texter);
  },
};

/**
 * Fabrikens utfall ur de lästa sidorna, en text per leverantör i samma ordning som raterna. Det här
 * är slingan i run(), utbruten så att NV-03 kan pröva den: förut prövades bara kortterminalChecks,
 * och run() kunde sluta anropa den utan att något test föll (andra blicken på uppföljningen efter
 * PR #85, V-2).
 */
export function kortterminalUtfall(rates, texter) {
  const checks = [];
  const notes = [];
  rates.forEach((r, i) => {
    const text = texter[i];
    checks.push(...kortterminalChecks(r, text));
    notes.push(`${r.supplier}: ${String(text ?? '').length} tecken lästa från ${r.url}`, ...kortterminalKontext(r, text));
  });
  return { checks, notes };
}
