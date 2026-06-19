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
