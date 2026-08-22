// lib/verifiers/telia-vaxel.mjs — vaktar Telia Smart Connect molnväxel-instegspriser (exkl moms)
// mot branchindex.molnvaxel.teliaVerified. Telia bot-väggar (Akamai) → stealth (needsStealth + withStealthPage,
// samma som Adobe). Bekräftar att "från 89 kr/mån" (T1) och "från 118 kr/mån" (T2) står på sidan. Rött vid drift.
//
// OBS moms: Telias /foretag-priser är EXKL moms (bekräftat 2026-06-18, telia.se/foretag/priser). Sidan visar
// "Pris från: NN kr/mån". Vi verifierar instegsgolven; offert-nivån (T3) har inget fast listpris att vakta.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withStealthPage } from './core.mjs';

const URL = 'https://www.telia.se/foretag/vaxlar/vaxel-sma-foretag';

export default {
  id: 'telia-vaxel',
  category: 'molnvaxel',
  label: 'Telia Smart Connect molnväxel-instegspriser (exkl moms)',
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
  bevakadKategori: 'molnvaxel',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Telia ändrar Smart Connects publicerade instegspris (exkl moms) på växelsidan.',
  blind: 'Add-on-priser och volymtrappor ovanför insteget — vakten ankrar på instegsgolvet och ser inte hur trappan ovanför det rör sig.',
  needsBrowser: true,
  needsStealth: true,
  schedule: '0 6 * * 1',
  async run() {
    const tv = BRANCHINDEX.molnvaxel?.teliaVerified;
    if (!tv?.tiers?.T1?.fromMonthly) return { checks: [], notes: ['molnvaxel.teliaVerified saknas i prisboken'], fatal: true };

    const text = await withStealthPage(URL, async (page) => {
      try { await page.waitForFunction(() => /\d[\d\s.,]*\s*kr/i.test(document.body?.innerText || ''), { timeout: 14000 }); } catch {}
      return (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
    });
    if (!text || text.length < 500) return { checks: [], notes: [`Telia-sidan oåtkomlig/tom (${text?.length ?? 0}b)`], fatal: true };

    // Sidan skriver "Pris från: 89 kr/mån". Matcha golvet per nivå.
    const checks = [
      ['T1', tv.tiers.T1.fromMonthly],
      ['T2', tv.tiers.T2.fromMonthly],
    ].map(([tier, from]) => {
      const present = new RegExp(`fr[åa]n:?\\s*${from}\\s*kr`, 'i').test(text);
      return { name: `${tier} instegsgolv ${from} kr/mån (exkl moms)`, expected: 'från-pris finns', actual: present ? 'finns' : '(saknas)', ok: present };
    });
    return { checks, notes: ['Telia /foretag-priser är exkl moms (bekräftat). T3/kontaktcenter = offert, inget fast golv.'] };
  },
};
