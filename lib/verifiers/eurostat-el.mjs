// lib/verifiers/eurostat-el.mjs — verifierar el-marknadsgolvet (branchindex.el.eurostatBands)
// mot Eurostats nrg_pc_205. Plain JSON-fetch (needsBrowser:false).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { fetchEurostatElBands, SMB_BANDS } from '../eurostat-el.js';
import { numCheck } from './core.mjs';

const TOL_ORE = 0.5;

export default {
  id: 'eurostat-el',
  category: 'el',
  label: 'Eurostat företagsel-band (öre/kWh)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Eurostat publicerar nya bandvärden i nrg_pc_205 som avviker från prisbokens elgolv.',
  blind: 'En prisrörelse på elmarknaden i dag — Eurostats serie publiceras i halvårsintervall med eftersläpning, så vakten ser historik, aldrig nuet.',
  needsBrowser: false,
  schedule: '0 6 * * 1',
  async run() {
    const eb = BRANCHINDEX.el?.eurostatBands;
    if (!eb?.bands?.length) return { checks: [], notes: ['eurostatBands saknas i prisboken'], fatal: true };
    let live;
    try { live = await fetchEurostatElBands(); }
    catch (e) { return { checks: [], notes: [`Eurostat oåtkomlig: ${e.message}`], fatal: true }; }

    const notes = [`live-period ${live.period} · lagrad ${eb.period}`];
    if (live.period !== eb.period) {
      // Ny verifierad period måste granskas av människa innan den blir kundsynlig.
      return { checks: [], notes: [...notes, `NY Eurostat-period publicerad — kräver mänsklig granskning`], fatal: true };
    }
    const liveByCode = new Map(live.bands.map((b) => [b.code, b.orePerKwh]));
    const checks = SMB_BANDS.map((code, i) => {
      const stored = eb.bands[i];
      const storedOre = Math.round(stored.allInKwh * 100 * 100) / 100;
      return numCheck(stored.label, storedOre, liveByCode.get(code), { tol: TOL_ORE, unit: ' öre' });
    });
    return { checks, notes };
  },
};
