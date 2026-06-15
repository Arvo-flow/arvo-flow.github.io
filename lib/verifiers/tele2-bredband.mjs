// lib/verifiers/tele2-bredband.mjs — verifierar Tele2:s adress-prissatta bredband (per nät)
// mot branchindex.bredband.tele2Verified. Plain JSON-API-replay via lib/tele2-broadband.js.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { tele2BroadbandFor } from '../tele2-broadband.js';

const REQUIRED = [['max', 1200], ['standard', 1000]];

export default {
  id: 'tele2-bredband',
  category: 'bredband',
  label: 'Tele2 bredband adress-API (per nät/hastighet)',
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
