// lib/verifiers/pipedrive.mjs — vaktar Pipedrives publika USD-listpriser (Lite + Growth).
//
// Recon 2026-08-05 (ops/probe-sista-tre.txt): sidan är JS-renderad (vanlig fetch ger 403) och
// listar planerna med rak namn↔pris-bindning, en rad per fält:
//   "Lite" · "US$" · "14" · "One payment of US$ 168 per seat/year" · "Per seat per month, billed annually"
//   "Growth" · "US$" · "39" · "One payment of US$ 468 per seat/year"
//   "Premium" 59 · "Ultimate" 79
//
// VARFÖR DEN HÄR VAKTEN KOM SIST: prisboken hade nycklarna 'essential' och 'advanced' — planer
// Pipedrive slutat sälja. Ett pris utan en plan man kan namnge är inget ankare, så verifieraren
// kunde inte skrivas förrän lineupen var kartlagd. Att bygga vakten först hade bara gett ett
// snyggt grönt på en produkt som inte finns.
//
// BELOPPSFÄLLAN: sidan visar TVÅ tal per plan — månadspriset (14) och årssumman (168). Ett
// månadspris som råkar läsas som årssumma (eller tvärtom) är ett 12× fel som ser helt rimligt ut
// i en tabell. Vi läser därför årssumman ur "One payment of US$ N per seat/year" och kräver att
// den är exakt 12 × månadspriset — talen får bekräfta varandra innan något godkänns.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck } from './core.mjs';

const URL = 'https://www.pipedrive.com/en/pricing';
const TIERS = [
  { key: 'pipedrive-lite', label: 'Pipedrive Lite', namn: 'Lite' },
  { key: 'pipedrive-growth', label: 'Pipedrive Growth', namn: 'Growth' },
];

// Plocka { manad, ar } för en plan ur den radbaserade texten.
export function planTal(text, plan) {
  const rader = String(text || '').split('\n').map((r) => r.trim());
  const i = rader.findIndex((r) => r === plan);
  if (i < 0) return { manad: null, ar: null };
  const block = rader.slice(i, i + 9);
  const manad = block.map((r) => /^(\d+(?:[.,]\d{1,2})?)$/.exec(r)?.[1]).find(Boolean);
  const ar = block.map((r) => /One payment of US\$\s?([\d\s,.]+)\s*per seat\/year/i.exec(r)?.[1]).find(Boolean);
  const n = (x) => (x == null ? null : Number(String(x).replace(/[\s,]/g, '')));
  return { manad: n(manad), ar: n(ar) };
}

export default {
  id: 'pipedrive',
  category: 'saas-crm',
  label: 'Pipedrive publika listpriser (USD, Lite + Growth)',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Pipedrive ändrar det publika USD-listpriset för Lite eller Growth.',
  blind: 'En plan som döps om eller slutar säljas utan att priset rör sig — incidenten 2026-08-05 var precis den: vi vaktade tal på planer som inte längre erbjöds.',
  needsBrowser: true,
  schedule: '0 5 * * 1',
  async run() {
    const T = BRANCHINDEX['saas-crm']?.licenseTierBenchmarks
           ?? BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks;
    if (!T?.['pipedrive-lite']) return { checks: [], notes: ['pipedrive-lite saknas i prisboken'], fatal: true };

    const res = await withPage(URL, async (page, status) => {
      if (typeof status === 'number' && status !== 200) return { status, text: '' };
      return { status, text: await page.evaluate(() => document.body?.innerText ?? '') };
    }, { timeoutMs: 45000, settleMs: 5000 });

    if (!res?.text) return { checks: [], notes: [`status ${res?.status} — ingen renderad text`], fatal: true };

    const checks = [];
    const notes = ['Månadspris och årssumma måste bekräfta varandra (år = 12 × månad) innan godkänt.'];
    for (const { key, label, namn } of TIERS) {
      const { manad, ar } = planTal(res.text, namn);
      // Korsvalidering: bara ett tal som stämmer med sin egen årssumma får bli ett ankare.
      const konsistent = manad != null && ar != null && Math.abs(ar - manad * 12) < 1;
      if (!konsistent) {
        notes.push(`${label}: månad ${manad ?? '(saknas)'} · år ${ar ?? '(saknas)'} — talen bekräftar inte varandra`);
      }
      checks.push(numCheck(`${label} (USD/plats/mån, årsbetalning)`, T[key].usdMonthly,
        konsistent ? manad : null, { unit: ' USD' }));
    }
    return { checks, notes };
  },
};
