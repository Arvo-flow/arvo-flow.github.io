// lib/verifiers/tele2-bredband.mjs — verifierar Tele2:s adress-prissatta bredband (per nät)
// mot branchindex.bredband.tele2Verified. Plain JSON-API-replay via lib/tele2-broadband.js.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { tele2BroadbandFor } from '../tele2-broadband.js';

const REQUIRED = [['max', 1200], ['standard', 1000]];

export default {
  id: 'tele2-bredband',
  category: 'bredband',
  label: 'Tele2 bredband adress-API (per nät/hastighet)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Tele2:s adress-API returnerar andra priser eller andra produkter för den sonderade adressen.',
  blind: 'Prissättning på andra adresser och nät än den vi sonderar — vakten mäter en punkt i landet, inte täckningen som helhet.',
  needsBrowser: false,
  schedule: '0 8 * * 1',
  async run() {
    const tv = BRANCHINDEX.bredband?.tele2Verified;
    if (!tv?.verifyAddresses?.length) return { checks: [], notes: ['tele2Verified saknas'], fatal: true };

    const confirmed = new Set();
    const checks = [];
    const notes = [];
    for (const addr of tv.verifyAddresses) {
      let res;
      try { res = await tele2BroadbandFor(addr); }
      catch (e) { return { checks: [], notes: [`${addr}: ${e.message}`], fatal: true }; }
      if (!res.products.length) { notes.push(`${addr}: 0 produkter (obetjänad/bara mobilt)`); continue; }
      for (const p of res.products) {
        const fam = p.family === 'Max' ? 'max' : p.family === 'Standard' ? 'standard' : null;
        if (!fam) continue;
        const stored = tv[fam]?.[p.downMbps];
        if (stored == null) continue;
        if (tv[fam].bindingMonths != null && p.bindingMonths !== tv[fam].bindingMonths) continue;
        if (p.monthlyExcVat === stored) confirmed.add(`${fam}:${p.downMbps}`);
        else checks.push({ name: `${fam} ${p.downMbps} (${res.address})`, expected: `${stored} kr`, actual: `${p.monthlyExcVat} kr`, ok: false });
      }
    }
    // Ankar-tiers MÅSTE bekräftas av minst en adress.
    for (const [fam, sp] of REQUIRED) {
      const ok = confirmed.has(`${fam}:${sp}`);
      checks.push({ name: `ankare ${fam} ${sp} Mbit`, expected: 'bekräftat', actual: ok ? 'bekräftat' : '(ej funnet)', ok });
    }
    return { checks, notes };
  },
};
