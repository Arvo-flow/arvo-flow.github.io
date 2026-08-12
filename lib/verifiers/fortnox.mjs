// lib/verifiers/fortnox.mjs — verifierar Fortnox publika listpriser (saas-finance-ankare)
// mot branchindex.['saas-finance'].fortnoxVerified. Prislistan är JS-renderad → Playwright
// (needsBrowser:true). Bekräftar att paket-ankarena (Mini/Liten/Mellan/Stor) + kärnmodulen
// Bokföring fortfarande står med sina priser på fortnox.se/produkt/prislista. Rött vid drift.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage } from './core.mjs';

const URL = 'https://www.fortnox.se/produkt/prislista';

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
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Fortnox ändrar ett publikt listpris på prislistan som vakten renderar.',
  blind: 'Paketpriser och kampanjer som bara framgår i en offert — vakten läser den publika prislistan och ser inget som kräver inloggning eller dialog.',
  needsBrowser: true,
  schedule: '30 7 * * 1',
  async run() {
    const fv = BRANCHINDEX['saas-finance']?.fortnoxVerified;
    if (!fv?.paket) return { checks: [], notes: ['fortnoxVerified saknas i prisboken'], fatal: true };

    const text = await withPage(URL, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '));
    if (!text) return { checks: [], notes: ['kunde inte läsa Fortnox prislista'], fatal: true };

    // Ankra på de fyra huvudpaketen + kärnmodulen Bokföring (etikett + pris i närhet).
    const anchors = [
      ['Mini', fv.paket.Mini], ['Liten', fv.paket.Liten], ['Mellan', fv.paket.Mellan], ['Stor', fv.paket.Stor],
      ['Bokföring', fv.moduler['Bokföring']],
    ];
    const checks = anchors.map(([name, price]) => {
      const present = new RegExp(`\\b${name}\\b[\\s\\S]{0,14}\\b${price}\\s*kr`, 'i').test(text);
      return { name: `${name} ${price} kr/mån`, expected: 'finns på prislistan', actual: present ? 'finns' : '(saknas)', ok: present };
    });
    return { checks };
  },
};
