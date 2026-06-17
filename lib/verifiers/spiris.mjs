// lib/verifiers/spiris.mjs — verifierar Spiris (tidigare Visma eEkonomi) publika listpriser
// mot branchindex.['saas-finance'].spirisVerified. JS-renderad prislista → Playwright. Bekräftar
// att abonnemangsnivåerna (Starta/Driva/Skala/Växa) + Lön-modulen står med sina priser. Rött vid drift.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage } from './core.mjs';

const URL = 'https://www.spiris.se/priser';

export default {
  id: 'spiris',
  category: 'saas-finance',
  label: 'Spiris (Visma eEkonomi) publika listpriser',
  needsBrowser: true,
  schedule: '45 7 * * 1',
  async run() {
    const sv = BRANCHINDEX['saas-finance']?.spirisVerified;
    if (!sv?.niva) return { checks: [], notes: ['spirisVerified saknas i prisboken'], fatal: true };

    const text = await withPage(URL, async (page) => (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' '));
    if (!text) return { checks: [], notes: ['kunde inte läsa Spiris prislista'], fatal: true };

    const anchors = [
      ['Starta', sv.niva.Starta], ['Driva', sv.niva.Driva], ['Skala', sv.niva.Skala], ['Växa', sv.niva['Växa']],
      ['Lön till anställda', sv.moduler['Lön till anställda']],
    ];
    const checks = anchors.map(([name, price]) => {
      // Moduler renderar en beskrivningsmening mellan etikett och pris → bredare fönster än för nivåerna.
      const present = new RegExp(`\\b${name}\\b[\\s\\S]{0,90}\\b${price}\\s*kr`, 'i').test(text);
      return { name: `${name} ${price} kr/mån`, expected: 'finns på prislistan', actual: present ? 'finns' : '(saknas)', ok: present };
    });
    return { checks };
  },
};
