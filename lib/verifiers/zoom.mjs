// lib/verifiers/zoom.mjs — vaktar Zooms publika USD-listpriser (Pro + Business).
//
// Recon 2026-08-05 (ops/probe-saas-render.txt): zoom.us/pricing lämnar INGA priser i serverrenderad
// HTML — de kräver rendering. Renderat visar sidan (svensk lokal):
//   "Workplace · Pro · Bäst för personligt bruk … $14.16 /användare per månad · Faktureras årsvis"
//   "Workplace · Affärsverksamhet · Bäst för större team … $18.33 /användare per månad · Faktureras årsvis"
// Båda stämde exakt mot prisboken — Zoom hade alltså inte drivit, den var bara OBEVAKAD i 70 dagar.
// Det är hela poängen: vi visste inte, och att inte veta är inte samma sak som att det är rätt.
//
// VAD SOM VAKTAS: usdAnnual — talet som faktiskt når kunden via recommend(). Månadspriset
// (usdMonthly) ligger bakom sidans Månadsvis/Årsvis-väljare och vaktas medvetet INTE här;
// att bumpa ett datum på ett tal vi inte läst vore precis den falska verifiering vi städat bort.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck, planPriceFromText } from './core.mjs';

const URL = 'https://zoom.us/pricing';
// Svenska sidan kallar Business "Affärsverksamhet" — vi accepterar båda så en språkändring
// inte tystar vakten (första träffen som ger ett pris vinner).
const TIERS = [
  { key: 'zoom-pro', label: 'Zoom Pro', namn: ['Pro'] },
  { key: 'zoom-business', label: 'Zoom Business', namn: ['Affärsverksamhet', 'Business'] },
];

export default {
  id: 'zoom',
  category: 'saas-productivity',
  label: 'Zoom publika listpriser (USD, årsavtal)',
  needsBrowser: true,
  schedule: '0 5 * * 1',
  async run() {
    const tiers = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks;
    if (!tiers?.['zoom-pro']?.usdAnnual) return { checks: [], notes: ['Zoom-tiers saknas i prisboken'], fatal: true };

    const res = await withPage(URL, async (page, status) => {
      if (typeof status === 'number' && status !== 200) return { status, text: '' };
      return { status, text: await page.evaluate(() => document.body?.innerText ?? '') };
    }, { timeoutMs: 45000, settleMs: 5000 });

    if (!res?.text) return { checks: [], notes: [`status ${res?.status} — ingen renderad text`], fatal: true };

    const checks = [];
    const notes = ['Endast årsavtalspriset (usdAnnual) vaktas — månadspriset ligger bakom sidans väljare.'];
    for (const { key, label, namn } of TIERS) {
      let hittat = null;
      for (const n of namn) {
        const r = planPriceFromText(res.text, n, { fonster: 120, kravOrd: /per m[åa]nad|per month/i });
        if (r.value != null) { hittat = r.value; break; }
      }
      checks.push(numCheck(`${label} årsavtal (USD)`, tiers[key].usdAnnual, hittat, { unit: ' USD' }));
    }
    return { checks, notes };
  },
};
