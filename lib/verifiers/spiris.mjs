// lib/verifiers/spiris.mjs — verifierar Spiris (tidigare Visma eEkonomi) publika listpriser
// mot branchindex.['saas-finance'].spirisVerified. JS-renderad prislista → Playwright. Bekräftar
// att abonnemangsnivåerna (Starta/Driva/Skala/Växa) + Lön-modulen står med sina priser. Rött vid drift.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage } from './core.mjs';

const URL = 'https://www.spiris.se/priser';

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
  fangar: 'Spiris ändrar ett publikt listpris på sin prislista.',
  blind: 'En omdöpt eller utgången plan där talet står kvar men produkten bytt innebörd — vakten jämför tal mot etikett, inte produktens innehåll (Pipedrive-läxan gäller här med).',
  needsBrowser: true,
  schedule: '45 7 * * 1',
  async run() {
    const sv = BRANCHINDEX['saas-finance']?.spirisVerified;
    if (!sv?.niva) return { checks: [], notes: ['spirisVerified saknas i prisboken'], fatal: true };

    const text = await withPage(URL, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '));
    if (!text) return { checks: [], notes: ['kunde inte läsa Spiris prislista'], fatal: true };

    const anchors = [
      ['Starta', sv.niva.Starta], ['Driva', sv.niva.Driva], ['Skala', sv.niva.Skala], ['Växa', sv.niva['Växa']],
      ['Lön till anställda', sv.moduler['Lön till anställda']],
    ];
    const checks = anchors.map(([name, price]) => {
      // Moduler renderar en beskrivningsmening mellan etikett och pris → bredare fönster än för nivåerna.
      const present = new RegExp(`\\b${name}\\b[\\s\\S]{0,90}\\b${price}\\s*kr`, 'i').test(text);
      return { name: `${name} ${price} kr/mån`, expected: 'finns på prislistan', actual: present ? 'finns' : '(saknas)', ok: present };
    });
    return { checks };
  },
};
