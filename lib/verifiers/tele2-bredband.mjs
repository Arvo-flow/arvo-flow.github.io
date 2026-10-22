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
  // Vilken KATEGORIPOST i prisboken vakten daterar (top-level lastVerified). Infört 2026-08-22:
  // kategoriposternas datum ruttnade i tysthet precis som nivåernas — molnvaxel låg 66 dagar
  // gammal medan den här vakten körde veckovis och bekräftade priset varje gång. `null` är ett
  // giltigt SVAR (vakten daterar ingen kategoripost), men svaret måste finnas: skillnaden mellan
  // «vaktar ingen» och «ingen frågade» ska stå i koden.
  bevakadKategori: 'bredband',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Tele2:s adress-API returnerar andra priser eller andra produkter för den sonderade adressen.',
  blind: 'Prissättning på andra adresser och nät än den vi sonderar — vakten mäter en punkt i landet, inte täckningen som helhet.',
  needsBrowser: false,
  schedule: '0 8 * * 1',
  // run() frågar Tele2 genom tele2BredbandKalla. NV-10 byter hämtaren där och anropar run() utan
  // argument, precis som fabriken gör (tredje granskningen, T-7; förut L-6).
  async run() {
    const tv = BRANCHINDEX.bredband?.tele2Verified;
    if (!tv?.verifyAddresses?.length) return { checks: [], notes: ['tele2Verified saknas'], fatal: true };

    const confirmed = new Set();
    const checks = [];
    const notes = [];
    let lastaProdukter = 0;
    for (const addr of tv.verifyAddresses) {
      let res;
      try { res = await tele2BredbandKalla.hamta(addr); }
      catch (e) { return { checks: [], notes: [`${addr}: ${e.message}`], fatal: true }; }
      if (!res.products.length) { notes.push(`${addr}: 0 produkter (obetjänad/bara mobilt)`); continue; }
      lastaProdukter += res.products.length;
      // Hela erbjudandet per adress skrivs ut, inte bara avvikelserna. 22 okt sa vakten «standard 500
      // Östersund: prisbok 455 · live 399», och loggen kunde inte visa om priset ändrats eller om
      // produkten var ny på adressen (andra blicken på uppföljningen efter PR #85, V-1).
      notes.push(`${res.address}: ${produktrad(res.products)}`);
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
    for (const [fam, sp] of REQUIRED) checks.push(ankarCheck(fam, sp, { bekraftad: confirmed.has(`${fam}:${sp}`), lastaProdukter }));
    return { checks, notes };
  },
};

/** Vägen run() frågar Tele2:s adress-API genom. NV-10 kräver att den i drift är tele2BroadbandFor. */
export const tele2BredbandKalla = { hamta: tele2BroadbandFor };

/** «Max 250 239 kr (12 mån) · Standard 500 455 kr (12 mån) · …», sorterat på familj och hastighet. */
export function produktrad(products) {
  return [...(products ?? [])]
    .sort((a, b) => String(a.family).localeCompare(String(b.family)) || a.downMbps - b.downMbps)
    .map((p) => `${p.family} ${p.downMbps} ${p.monthlyExcVat} kr (${p.bindingMonths ?? '?'} mån)`)
    .join(' · ');
}

// Ett obekräftat ankare är DRIFT bara när vakten faktiskt läste produkter. Svarade varje adress
// med 0 produkter vet vi ingenting om priset, och okänt är OLÄSBAR ('(saknas)'), inte drift. KF-08.
export function ankarCheck(fam, sp, { bekraftad, lastaProdukter }) {
  return {
    name: `ankare ${fam} ${sp} Mbit`,
    expected: 'bekräftat',
    actual: bekraftad ? 'bekräftat' : lastaProdukter > 0 ? '(ej funnet)' : '(saknas)',
    ok: bekraftad,
  };
}
