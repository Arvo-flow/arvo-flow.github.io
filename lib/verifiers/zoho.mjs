// lib/verifiers/zoho.mjs — vaktar Zoho CRM Standards publika USD-listpris.
//
// Recon 2026-08-05 (ops/probe-saas-render.txt): sidan är JS-renderad och listar planerna som
//   "… Mobile apps · Standard · $14 · US$14 · /user/month · FREE TRIAL"
//   "… Most Popular · Professional · $23 · US$23 · /user/month"
// Prisbokens usdAnnual för zoho-crm-standard (14) stämde exakt — men posten hade stått
// OBEVAKAD i 63 dagar. Att den råkade vara rätt är tur, inte kontroll.
//
// PRECISIONSDETALJ: ordet "Standard" förekommer också i "Standard reports" högre upp på sidan.
// Fönstret hålls därför kort (40 tecken) så att bara plannamnet omedelbart före sitt eget pris
// kan matcha — en bred sökning hade råkat ge rätt svar här och fel svar nästa gång sidan ändras.
//
// Sidans Monthly/Annually-väljare gör att bara det RENDERADE läget kan läsas säkert; vi vaktar
// därför usdAnnual och påstår inget om månadspriset.
//
// TIDSBUDGET: zoho.com hängde renderaren i 9+ minuter 2026-08-05 och sköts ned av jobbets tak —
// utan utfall och utan rad i loggen. Sidbudgeten är därför kort här, och scripts/verify.mjs har
// dessutom ett tak per källa. En vakt som kan hänga är en vakt som tystnar.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck, planPriceFromText } from './core.mjs';

const URL = 'https://www.zoho.com/crm/zohocrm-pricing.html';

export default {
  id: 'zoho-crm',
  category: 'saas-crm',
  label: 'Zoho CRM Standard publikt listpris (USD)',
  needsBrowser: true,
  schedule: '0 5 * * 1',
  async run() {
    const bm = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks?.['zoho-crm-standard']
            ?? BRANCHINDEX['saas-crm']?.licenseTierBenchmarks?.['zoho-crm-standard'];
    if (!bm?.usdAnnual) return { checks: [], notes: ['zoho-crm-standard saknas i prisboken'], fatal: true };

    const res = await withPage(URL, async (page, status) => {
      if (typeof status === 'number' && status !== 200) return { status, text: '' };
      return { status, text: await page.evaluate(() => document.body?.innerText ?? '') };
    }, { timeoutMs: 30000, settleMs: 3500 });

    if (!res?.text) return { checks: [], notes: [`status ${res?.status} — ingen renderad text`], fatal: true };

    const r = planPriceFromText(res.text, 'Standard', {
      valuta: /(?:US\s?\$|\$)\s?(\d+(?:[.,]\d{1,2})?)/,
      fonster: 40,                                  // kort: "Standard reports" får aldrig matcha
      kravOrd: /\/\s*user\s*\/\s*month|US\$/i,
    });
    return {
      checks: [numCheck('Zoho CRM Standard (USD/user/mån)', bm.usdAnnual, r.value, { unit: ' USD' })],
      notes: ['Endast det renderade väljarläget läses; månadspriset påstås inte.'],
    };
  },
};
