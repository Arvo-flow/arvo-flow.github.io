// lib/verifiers/spiris.mjs — verifierar Spiris (tidigare Visma eEkonomi) publika listpriser
// mot branchindex.['saas-finance'].spirisVerified. JS-renderad prislista → Playwright. Bekräftar
// att abonnemangsnivåerna (Starta/Driva/Skala/Växa) + Lön-modulen står med sina priser. Rött vid drift.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, kontextUtdrag, numCheck, lasEntydigt, talSv, TAL_SV } from './core.mjs';

const URL = 'https://www.spiris.se/priser';

const ankare = (sv) => [
  ['Starta', sv.niva.Starta], ['Driva', sv.niva.Driva], ['Skala', sv.niva.Skala], ['Växa', sv.niva['Växa']],
  ['Lön till anställda', sv.moduler['Lön till anställda']],
];

// Sidan visar nivåpriserna två gånger (avläst 18 okt): i jämförelsetabellen «Huvudfunktioner Starta
// 199 kr/mån Köp Driva 349 kr/mån Köp Populärt val Skala 549 kr/mån Köp Växa 749 kr/mån Köp Lyfta …»
// och på korten «Skala Bokföring & Fakturering 549 kr /mån». Tabellen läses som ett block i fast
// ordning; korten är ett andra vittne. Säger de olika är talet okänt (OLÄSBAR), inget val. Mellan
// «Köp» och nästa nivå får en etikett utan siffror stå («Populärt val»). Lön till anställda står i
// tabellen som en rad med ett pris per nivå («299 kr/mån 299 kr/mån 299 kr/mån Ingår Ingår»); de
// måste vara lika.
const KR_MAN = String.raw`\s*kr\s*\/\s*mån`;
const NIVATABELL = new RegExp(String.raw`\bStarta\s+(${TAL_SV})${KR_MAN}\s+Köp\b[^\d]{0,40}?\bDriva\s+(${TAL_SV})${KR_MAN}\s+Köp\b[^\d]{0,40}?\bSkala\s+(${TAL_SV})${KR_MAN}\s+Köp\b[^\d]{0,40}?\bVäxa\s+(${TAL_SV})${KR_MAN}`, 'g');
const kortRx = (niva) => new RegExp(String.raw`\b${niva}\s+Bokföring\b[^\d]{0,40}?(${TAL_SV})${KR_MAN}`, 'g');
const LONRAD = new RegExp(String.raw`\bLön till anställda\b[^\d]{0,90}?((?:(?:${TAL_SV})${KR_MAN}\s*)+)`, 'g');

const samstamt = (a, b) => (a != null && b != null ? (a === b ? a : null) : (a ?? b));

/** Vad sidan säger på de förankrade platserna; null där platsen saknas eller vittnena är oense. */
export function spirisLas(text) {
  const tabell = lasEntydigt(text, NIVATABELL);
  const ut = {};
  ['Starta', 'Driva', 'Skala', 'Växa'].forEach((niva, i) => {
    ut[niva] = samstamt(tabell?.[i] ?? null, lasEntydigt(text, kortRx(niva))?.[0] ?? null);
  });
  const rader = [...String(text ?? '').matchAll(LONRAD)].map((m) => [...m[1].matchAll(new RegExp(`(${TAL_SV})${KR_MAN}`, 'g'))].map((x) => x[1]));
  const lonTal = new Set(rader.flat().map(talSv));
  ut['Lön till anställda'] = lonTal.size === 1 ? [...lonTal][0] : null;
  return ut;
}

/** Checkarna ur en redan läst sidtext — ren funktion, så att sviten kan mata den. */
export function spirisChecks(sv, text) {
  const live = spirisLas(text);
  return ankare(sv).map(([name, price]) => numCheck(`${name} (kr/mån, exkl moms)`, price, live[name], { unit: ' kr' }));
}

/** Vad sidan visade runt varje etikett och varje lagrat pris — för loggen. */
export function spirisKontext(sv, text) {
  return ankare(sv).flatMap(([name, price]) => [
    `etikett ${name}: ${kontextUtdrag(text, new RegExp(`\\b${name}\\b`, 'i'), { fore: 25, efter: 110, max: 5 }).map((s) => `«${s}»`).join(' · ') || '(ingen träff)'}`,
    `pris ${price} kr: ${kontextUtdrag(text, new RegExp(`\\b${price}\\s*kr`, 'i'), { fore: 110, efter: 15, max: 4 }).map((s) => `«${s}»`).join(' · ') || '(ingen träff)'}`,
  ]);
}

export default {
  id: 'spiris',
  category: 'saas-finance',
  label: 'Spiris (Visma eEkonomi) publika listpriser',
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
  fangar: 'Spiris ändrar priset på Starta, Driva, Skala, Växa eller Lön till anställda: vakten läser talet i jämförelsetabellen (korten som andra vittne) och visar det nya talet (DRIFT).',
  blind: 'En omdöpt eller utgången plan där talet står kvar men produkten bytt innebörd — vakten jämför tal mot etikett, inte produktens innehåll (Pipedrive-läxan gäller här med). Säger tabellen och korten olika, eller ändras tabellens ordning, blir vakten OLÄSBAR, aldrig grön.',
  needsBrowser: true,
  schedule: '45 7 * * 1',
  async run() {
    const sv = BRANCHINDEX['saas-finance']?.spirisVerified;
    if (!sv?.niva) return { checks: [], notes: ['spirisVerified saknas i prisboken'], fatal: true };

    const text = await withPage(URL, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '));
    if (!text) return { checks: [], notes: ['kunde inte läsa Spiris prislista'], fatal: true };

    return { checks: spirisChecks(sv, text), notes: spirisKontext(sv, text) };
  },
};
