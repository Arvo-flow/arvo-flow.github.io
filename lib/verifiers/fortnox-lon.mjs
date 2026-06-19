// lib/verifiers/fortnox-lon.mjs — vaktar Fortnox Löns publika listpris (loneadmin-ankaret)
// mot branchindex.loneadmin.fortnoxLonVerified. Prislistan är JS-renderad → Playwright (needsBrowser).
// Bekräftar att den fasta avgiften (199 kr/mån) + per-anställd-priset (25 kr/anställd/mån) fortfarande
// står på fortnox.se. Rött vid drift — då har golvet i loneadmin-rätt-storleken flyttat sig.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage } from './core.mjs';

const URL = 'https://www.fortnox.se/produkt/lon';

export default {
  id: 'fortnox-lon',
  category: 'loneadmin',
  label: 'Fortnox Lön publikt listpris (fast + per anställd, exkl moms)',
  needsBrowser: true,
  schedule: '30 7 * * 1',
  async run() {
    const fv = BRANCHINDEX.loneadmin?.fortnoxLonVerified;
    if (!fv?.fixedMonthly || !fv?.perEmployeeMonthly) {
      return { checks: [], notes: ['loneadmin.fortnoxLonVerified saknas i prisboken'], fatal: true };
    }

    const text = await withPage(URL, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '));
    if (!text || text.length < 400) return { checks: [], notes: [`Fortnox Lön-sidan oåtkomlig/tom (${text?.length ?? 0}b)`], fatal: true };

    // Sidan skriver priserna som "199 kr/mån" och "25 kr/anställd". Ankra på båda talen.
    const checks = [
      { name: `Fast avgift ${fv.fixedMonthly} kr/mån (exkl moms)`, rx: new RegExp(`\\b${fv.fixedMonthly}\\s*kr`, 'i') },
      { name: `Per anställd ${fv.perEmployeeMonthly} kr/mån (exkl moms)`, rx: new RegExp(`\\b${fv.perEmployeeMonthly}\\s*kr[\\s\\S]{0,18}anst[äa]lld`, 'i') },
    ].map(({ name, rx }) => {
      const present = rx.test(text);
      return { name, expected: 'finns på prislistan', actual: present ? 'finns' : '(saknas)', ok: present };
    });
    return { checks, notes: ['Fortnox /produkt-priser är exkl moms. Lönebesked-/Kivra-utskick är rörligt — ej vaktat här.'] };
  },
};
