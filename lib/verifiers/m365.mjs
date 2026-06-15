// lib/verifiers/m365.mjs — verifierar Microsoft 365 Business-listpriser (årsavtal, kr/anv/mån)
// mot microsoft.com/sv-se. Server-renderad sida → vanlig HTML-fetch (needsBrowser:false).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { fetchText, stripHtml, numCheck } from './core.mjs';

const URL = 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-plans-and-pricing';
const TIERS = [
  { key: 'business-basic', name: 'Basic' },
  { key: 'business-standard', name: 'Standard' },
  { key: 'business-premium', name: 'Premium' },
];

function extractAnnual(flat, tierName) {
  const re = new RegExp(`Business ${tierName}\\s+(\\d[\\d ]*[.,]\\d{2})\\s*kr\\s*användare\\s*/?\\s*månad,?\\s*betalas årsvis`, 'i');
  const m = re.exec(flat);
  return m ? Number(m[1].replace(/\s/g, '').replace(',', '.')) : null;
}

export default {
  id: 'm365',
  category: 'saas-productivity',
  label: 'Microsoft 365 Business listpriser (årsavtal)',
  needsBrowser: false,
  schedule: '0 5 * * 1',
  async run() {
    const { status, text } = await fetchText(URL, { timeoutMs: 25000 });
    if (status !== 200) return { checks: [], notes: [`HTTP ${status} — sidan oåtkomlig`], fatal: true };
    const flat = stripHtml(text);
    const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    const checks = TIERS.map(({ key, name }) =>
      numCheck(`Business ${name} årsavtal`, tiers[key].msrpAnnual, extractAnnual(flat, name), { unit: ' kr' }));
    return { checks };
  },
};
