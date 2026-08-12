// lib/verifiers/hubspot.mjs — vaktar HubSpot Starters publika USD-listpris.
//
// Recon 2026-08-05 (ops/probe-saas-render.txt): sidan är JS-renderad och visar TVÅ tal intill
// varandra för samma plan:
//   "Save up to 65% on Starter … Starts at $7 /mo/seat  $20/mo/seat  Billing period Pay Monthly"
// $7 är kampanjpriset (65 % rabatt på $20 — räknat: 20 × 0,35 = 7). $20 är listpriset.
//
// KAMPANJFÄLLAN: en verifierare som tar första bästa tal ankrar marknaden på en rabattperiod.
// Då blir kundens "marknadspris" tillfälligt lågt, besparingen krymper eller vänder — och när
// kampanjen tar slut rör sig vårt ankare utan att marknaden gjort det. Ett ankare måste vara
// det pris vem som helst kan köpa när som helst.
//
// LÖSNINGEN är strukturell, inte en blocklista på ordet "rabatt": vi läser ALLA per-seat-priser
// i Starter-blocket och tar det HÖGSTA. En kampanj kan per definition bara vara lägre än
// listpriset — så maximum är listpriset, oavsett hur rabatten formuleras nästa gång.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck } from './core.mjs';

// EN nyckel, ett ställe: deklarationen och avläsningen får aldrig kunna peka på olika poster.
const TIER_NYCKEL = 'hubspot-starter';

const URL = 'https://www.hubspot.com/pricing/crm/starter';

// Alla "$N/mo/seat" i ett fönster efter "Starts at" — kampanj och listpris ligger intill varandra.
export function priserIStarterBlock(text) {
  const flat = String(text || '').replace(/\s+/g, ' ');
  const start = flat.search(/Starts at/i);
  if (start < 0) return [];
  const block = flat.slice(start, start + 220);
  return [...block.matchAll(/\$\s?(\d+(?:[.,]\d{1,2})?)\s*\/\s*mo\s*\/\s*seat/gi)]
    .map((m) => Number(String(m[1]).replace(',', '.')))
    .filter((n) => Number.isFinite(n) && n > 0);
}

export default {
  id: 'hubspot',
  category: 'saas-crm',
  label: 'HubSpot Starter publikt listpris (USD)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  bevakadeTiers: [TIER_NYCKEL],
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'HubSpot ändrar Starters publika USD-listpris (det högsta talet i blocket, aldrig kampanjtalet).',
  blind: 'En ren kampanjförändring — vakten tar medvetet listpriset och ignorerar det lägre kampanjtalet intill, så en kampanj som kommer eller går passerar tyst.',
  needsBrowser: true,
  schedule: '0 5 * * 1',
  async run() {
    const bm = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.[TIER_NYCKEL]
            ?? BRANCHINDEX['saas-crm']?.licenseTierBenchmarks?.[TIER_NYCKEL];
    if (!bm?.usdMonthly) return { checks: [], notes: ['hubspot-starter saknas i prisboken'], fatal: true };

    const res = await withPage(URL, async (page, status) => {
      if (typeof status === 'number' && status !== 200) return { status, text: '' };
      return { status, text: await page.evaluate(() => document.body?.innerText ?? '') };
    }, { timeoutMs: 45000, settleMs: 5000 });

    if (!res?.text) return { checks: [], notes: [`status ${res?.status} — ingen renderad text`], fatal: true };

    const priser = priserIStarterBlock(res.text);
    const listpris = priser.length ? Math.max(...priser) : null;
    return {
      checks: [numCheck('HubSpot Starter listpris (USD/seat/mån)', bm.usdMonthly, listpris, { unit: ' USD' })],
      notes: [`Sedda per-seat-priser i Starter-blocket: ${priser.join(', ') || '(inga)'} — högsta = listpris, lägre är kampanj.`],
    };
  },
};
