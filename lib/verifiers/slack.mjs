// lib/verifiers/slack.mjs — vaktar Slacks publika USD-listpriser (Pro + Business+).
//
// Bakgrund (2026-08-05): Slack-tiers hade drivit 69–75 dagar utan att någon vakt fanns. Sonden
// (ops/probe-prisbok.txt) visade att slack.com/pricing ÄR serverrenderad — priserna står i HTML:en
// och kräver ingen browser. Alltså finns ingen ursäkt för att lämna dem obevakade.
//
// SIDANS FÄLLA: varje tier visar TRE tal i följd — månadslistpris, ett tidsbegränsat kampanjpris
// ("50% off for 3 months") och årspriset:
//   "Pro … 50% off for 3 months* $8.75 $4.38 USD per user / month, when paying monthly $7.25 USD …"
// Kampanjpriset är exakt den sortens tal som aldrig får bli ett ankare (det är inte marknadens
// pris, det är en rabattperiod). Vi läser därför ENDAST talet efter "when paying monthly", som är
// årsavtalspriset, plus månadslistpriset — och rör aldrig kampanjsiffran.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { fetchText, stripHtml, numCheck } from './core.mjs';

const URL = 'https://slack.com/pricing';
const TIERS = [
  { key: 'slack-pro', label: 'Pro', namn: 'Pro' },
  { key: 'slack-business-plus', label: 'Business+', namn: 'Business\\+' },
];

// Ur "<Tier> … $<månad> $<kampanj> USD per user / month, when paying monthly $<år> USD"
// plockar vi månadslistpriset (första talet) och årspriset (efter "when paying monthly").
export function extractSlack(flat, namn) {
  const block = new RegExp(`${namn}[\\s\\S]{0,320}?when paying monthly\\s*\\$?([\\d.]+)`, 'i');
  const m = block.exec(flat);
  if (!m) return { monthly: null, annual: null };
  const annual = Number(m[1]);
  // Månadslistpriset är det FÖRSTA $-talet i samma block (kampanjpriset är det andra).
  const doller = [...m[0].matchAll(/\$\s?([\d.]+)/g)].map((x) => Number(x[1])).filter((n) => n > 0);
  return { monthly: doller[0] ?? null, annual: Number.isFinite(annual) ? annual : null };
}

export default {
  id: 'slack',
  category: 'saas-productivity',
  label: 'Slack publika listpriser (USD, Pro + Business+)',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Slack ändrar sitt publika USD-listpris för Pro eller Business+.',
  blind: 'Enterprise Grid, som prissätts på offert och saknar publikt tal — vakten kan bara vakta det som står publicerat.',
  needsBrowser: false,
  schedule: '0 5 * * 1',
  async run() {
    const tiers = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks;
    if (!tiers?.['slack-pro']?.usdAnnual) return { checks: [], notes: ['Slack-tiers saknas i prisboken'], fatal: true };

    const { status, text } = await fetchText(URL, { timeoutMs: 25000 });
    if (status !== 200) return { checks: [], notes: [`HTTP ${status} — sidan oåtkomlig`], fatal: true };
    const flat = stripHtml(text);

    const checks = [];
    for (const { key, label, namn } of TIERS) {
      const { monthly, annual } = extractSlack(flat, namn);
      checks.push(numCheck(`Slack ${label} årsavtal (USD)`, tiers[key].usdAnnual, annual, { unit: ' USD' }));
      checks.push(numCheck(`Slack ${label} månadsavtal (USD)`, tiers[key].usdMonthly, monthly, { unit: ' USD' }));
    }
    return { checks, notes: ['Kampanjpriset ("50% off for 3 months") läses aldrig — endast list- och årspris.'] };
  },
};
