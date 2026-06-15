// lib/verifiers/kortterminal.mjs — verifierar kortterminal-transaktionsrater (Zettle, Stripe)
// mot branchindex.kortterminal.verifiedRates. JS-renderade sidor → Playwright (needsBrowser:true).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage } from './core.mjs';

// Matchar lagrad rate på sidan, komma/punkt, tål en-decimalform (1,40 → "1,4" eller "1,40").
function pctRx(pct) {
  const [intPart, decPart] = pct.toFixed(2).split('.');
  const dec = decPart.endsWith('0') ? `${decPart[0]}0?` : decPart;
  return new RegExp(`\\b${intPart}[.,]${dec}\\s*%`);
}

export default {
  id: 'kortterminal',
  category: 'kortterminal',
  label: 'Kortterminal transaktionsrater (Zettle/Stripe)',
  needsBrowser: true,
  schedule: '0 7 * * 1',
  async run() {
    const vr = BRANCHINDEX.kortterminal?.verifiedRates;
    if (!vr?.rates?.length) return { checks: [], notes: ['verifiedRates saknas'], fatal: true };
    const checks = [];
    for (const r of vr.rates) {
      const found = await withPage(r.url, async (page) => {
        const text = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ');
        return pctRx(r.pct).test(text);
      });
      checks.push({
        name: `${r.supplier} ${r.pct.toFixed(2).replace('.', ',')} %`,
        expected: 'finns på sidan', actual: found ? 'finns' : '(saknas)', ok: !!found,
      });
    }
    return { checks };
  },
};
