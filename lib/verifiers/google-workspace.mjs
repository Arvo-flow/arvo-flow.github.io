// lib/verifiers/google-workspace.mjs — vaktar Google Workspace publika listpriser.
//
// VIKTIGT (recon 2026-06-17, 3 sonder via GH Actions): Google publicerar publikt listpris ENBART
// i USD på workspace.google.com/intl/en (server-renderat: "$7.00 USD" / "$14.00 USD" / "$22.00 USD").
// Den svenska sidan visar 0 priser (rå-HTML + render); det faktiska SEK-priset ligger bakom
// signup-funnelns auth-grind. Därför vaktar vi USD-ankaret — och recommend.js (google-sek-grind)
// håller SEK TYST mot kund (FX-gissning förbjuden, regel 3/4). Rött vid drift i USD-listpriset.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { fetchText, presenceCheck } from './core.mjs';

const URL = 'https://workspace.google.com/intl/en/pricing.html';
const TIERS = [
  ['Business Starter', 'google-starter'],
  ['Business Standard', 'google-standard'],
  ['Business Plus', 'google-plus'],
];

export default {
  id: 'google-workspace',
  category: 'saas-productivity',
  label: 'Google Workspace publika listpriser (USD — SEK ej publikt)',
  needsBrowser: false,
  schedule: '30 5 * * 1',
  async run() {
    const tiers = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks;
    if (!tiers?.['google-plus']?.usdAnnual) return { checks: [], notes: ['Google-tiers saknas i prisboken'], fatal: true };

    const { status, text } = await fetchText(URL, { timeoutMs: 25000 });
    if (status !== 200) return { checks: [], notes: [`HTTP ${status} — sidan oåtkomlig`], fatal: true };

    // Priserna står som synlig text "$7.00 USD" i serverrenderad HTML (recon-verifierat).
    const checks = TIERS.map(([label, key]) => {
      const usd = tiers[key].usdAnnual;
      const token = `$${usd.toFixed(2)} USD`;
      const present = text.includes(token);
      return presenceCheck(`${label} ${token} (årsavtal, listpris)`, present);
    });
    return {
      checks,
      notes: ['SEK ej publikt hos Google — endast USD-ankaret vaktas; google-sek-grind håller SEK tyst mot kund.'],
    };
  },
};
