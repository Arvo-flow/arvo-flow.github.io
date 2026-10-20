// lib/verifiers/fortnox.mjs — verifierar Fortnox publika listpriser (saas-finance-ankare)
// mot branchindex.['saas-finance'].fortnoxVerified. Prislistan är JS-renderad → Playwright
// (needsBrowser:true). Bekräftar att paket-ankarena (Mini/Liten/Mellan/Stor) + kärnmodulen
// Bokföring fortfarande står med sina priser på fortnox.se/produkt/prislista. Rött vid drift.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, kontextUtdrag, numCheck, lasEntydigt, TAL_SV } from './core.mjs';

const URL = 'https://www.fortnox.se/produkt/prislista';

// Ankra på de fyra huvudpaketen + kärnmodulen Bokföring (etikett + pris i närhet).
const ankare = (fv) => [
  ['Mini', fv.paket.Mini], ['Liten', fv.paket.Liten], ['Mellan', fv.paket.Mellan], ['Stor', fv.paket.Stor],
  ['Bokföring', fv.moduler['Bokföring']],
];

// Sidan bär «Mini» på fyra ställen (Mini 209, Mini+ 369, Löpande Mini 149, Gör det själv Mini 159,
// avläst 18 okt). Talet bredvid etiketten hade gett DRIFT på grannprodukten. De fyra huvudpaketen
// står däremot i ett block i fast ordning, «Mini N kr/mån Liten N kr/mån Mellan N kr/mån Stor N
// kr/mån», och blocket läses som en enhet. Bokföring är den enda «Bokföring N kr/mån» på sidan
// («Bokföring Attest & Läs 99 kr/mån» har inget tal direkt efter ordet).
const PAKETBLOCK = new RegExp(String.raw`\bMini\s+(${TAL_SV})\s*kr\s*\/\s*mån\s+Liten\s+(${TAL_SV})\s*kr\s*\/\s*mån\s+Mellan\s+(${TAL_SV})\s*kr\s*\/\s*mån\s+Stor\s+(${TAL_SV})\s*kr\s*\/\s*mån`, 'g');
const BOKFORING = new RegExp(String.raw`\bBokföring\s+(${TAL_SV})\s*kr\s*\/\s*mån`, 'g');

/** Vad sidan säger på de förankrade platserna; null där platsen inte finns eller är tvetydig. */
export function fortnoxLas(text) {
  const p = lasEntydigt(text, PAKETBLOCK);
  const b = lasEntydigt(text, BOKFORING);
  return { Mini: p?.[0] ?? null, Liten: p?.[1] ?? null, Mellan: p?.[2] ?? null, Stor: p?.[3] ?? null, Bokföring: b?.[0] ?? null };
}

/** Checkarna ur en redan läst sidtext — ren funktion, så att sviten kan mata den. */
export function fortnoxChecks(fv, text) {
  const live = fortnoxLas(text);
  return ankare(fv).map(([name, price]) => numCheck(`${name} (kr/mån, exkl moms)`, price, live[name], { unit: ' kr' }));
}

/** Vad sidan visade runt varje etikett och varje lagrat pris — för loggen. */
export function fortnoxKontext(fv, text) {
  return ankare(fv).flatMap(([name, price]) => [
    `etikett ${name}: ${kontextUtdrag(text, new RegExp(`\\b${name}\\b`, 'i'), { fore: 25, efter: 45, max: 6 }).map((s) => `«${s}»`).join(' · ') || '(ingen träff)'}`,
    `pris ${price} kr: ${kontextUtdrag(text, new RegExp(`\\b${price}\\s*kr`, 'i'), { fore: 45, efter: 15, max: 4 }).map((s) => `«${s}»`).join(' · ') || '(ingen träff)'}`,
  ]);
}

export default {
  id: 'fortnox',
  category: 'saas-finance',
  label: 'Fortnox publika listpriser (paket + modul)',
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
  bevakadKategori: 'saas-finance',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Fortnox ändrar priset på Mini, Liten, Mellan, Stor eller Bokföring på prislistan: vakten läser talet i paketblocket och på Bokföringsraden och visar det nya talet (DRIFT).',
  blind: 'Paketpriser och kampanjer som bara framgår i en offert. Byter Fortnox ordning på paketen eller bryter upp blocket hittar vakten inte platsen och blir OLÄSBAR, aldrig grön.',
  needsBrowser: true,
  schedule: '30 7 * * 1',
  async run() {
    const fv = BRANCHINDEX['saas-finance']?.fortnoxVerified;
    if (!fv?.paket) return { checks: [], notes: ['fortnoxVerified saknas i prisboken'], fatal: true };

    const text = await withPage(URL, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '));
    if (!text) return { checks: [], notes: ['kunde inte läsa Fortnox prislista'], fatal: true };

    return { checks: fortnoxChecks(fv, text), notes: fortnoxKontext(fv, text) };
  },
};
