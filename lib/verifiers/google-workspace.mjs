// lib/verifiers/google-workspace.mjs — vaktar Google Workspace publika listpriser.
//
// VIKTIGT (recon 2026-06-17, 3 sonder via GH Actions): Google publicerar publikt listpris ENBART
// i USD. Den svenska sidan visar 0 priser (rå-HTML + render); det faktiska SEK-priset ligger bakom
// signup-funnelns auth-grind. Därför vaktar vi USD-ankaret — och recommend.js (google-sek-grind)
// håller SEK TYST mot kund (FX-gissning förbjuden, regel 3/4). Rött vid drift i USD-listpriset.
//
// ── SIDAN BYTTE FORM (avläst 2026-10-16) ────────────────────────────────────────────────────
// Vakten letade efter «$7.00 USD» i serverrenderad HTML på /intl/en/pricing.html och föll varje
// vecka med «(saknas)» på alla tre nivåer. Sidan renderas nu på klienten och visar priset som
// «$4.90$7** / user per month»: introduktionspriset (30 % rabatt i tre månader för nya kunder)
// följt av listpriset. USD-priserna visas bara med `region=US`. Två motprov samma dag:
//   · årsväxeln påslagen → 7 · 14 · 22 USD, prisbokens årsavtal
//   · årsväxeln avslagen → 8,40 · 16,80 · 26,40 USD (månadsavtal)
// Instrumentet ser alltså skillnaden, och därför läser vakten växeln innan den jämför.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck, presenceCheck } from './core.mjs';

const URL = 'https://workspace.google.com/pricing?hl=en&region=US';
const TIERS = [
  ['Business Starter', 'google-starter', 'Starter'],
  ['Business Standard', 'google-standard', 'Standard'],
  ['Business Plus', 'google-plus', 'Plus'],
];
const PRISRAD = '\\**\\s*/\\s*user per month';
const USD_MARKOR = /All prices\s*\$\s*USD/;

// KAMPANJFÄLLAN (bibeln 2026-08-06, HubSpot $7 mot $20): det högsta priset i blocket ÄR listpriset,
// eftersom en rabatt bara kan vara lägre. Står planen på mer än ett ställe med olika listpris vet
// vi inte vilket som gäller, och då svarar parsern null i stället för att välja. KF-03, KF-04.
export function googleListpriser(text) {
  const t = String(text ?? '').replace(/\s+/g, ' ');
  const ut = {};
  for (const [, , kort] of TIERS) {
    const rx = new RegExp(`(?<!\\w)${kort}(?!\\w)[^$]{0,80}?((?:\\$\\d+(?:\\.\\d{1,2})?\\s*)+)${PRISRAD}`, 'g');
    const listpriser = [...t.matchAll(rx)].map((m) =>
      Math.max(...[...m[1].matchAll(/\$(\d+(?:\.\d{1,2})?)/g)].map((x) => Number(x[1]))));
    const unika = [...new Set(listpriser)];
    ut[kort] = unika.length === 1 ? unika[0] : null;
  }
  return { priser: ut, usd: USD_MARKOR.test(t) };
}

// Prisboken bär årsavtalets pris. Ett tal ur månadsläget, eller ur en sida som inte säger att
// priserna är i USD, jämförs aldrig mot den: det blir '(saknas)' (OLÄSBAR), inte en falsk DRIFT.
export function googleChecks(tiers, { text, arsLage }) {
  const { priser, usd } = googleListpriser(text);
  const lasbar = arsLage === true && usd;
  return [
    presenceCheck('Årsavtalsläget valt (växeln «Annual»)', arsLage === true),
    presenceCheck('Priserna anges i USD («All prices $USD»)', usd),
    ...TIERS.map(([label, key, kort]) =>
      numCheck(`${label} (årsavtal, listpris)`, tiers[key].usdAnnual, lasbar ? priser[kort] : null, { tol: 0.005, unit: ' USD' })),
  ];
}

export default {
  id: 'google-workspace',
  category: 'saas-productivity',
  label: 'Google Workspace publika listpriser (USD — SEK ej publikt)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  bevakadeTiers: TIERS.map(([, key]) => key),
  // Vilken KATEGORIPOST i prisboken vakten daterar (top-level lastVerified). Infört 2026-08-22:
  // kategoriposternas datum ruttnade i tysthet precis som nivåernas — molnvaxel låg 66 dagar
  // gammal medan den här vakten körde veckovis och bekräftade priset varje gång. `null` är ett
  // giltigt SVAR (vakten daterar ingen kategoripost), men svaret måste finnas: skillnaden mellan
  // «vaktar ingen» och «ingen frågade» ska stå i koden.
  bevakadKategori: 'saas-productivity',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Google ändrar sitt publika USD-listpris för årsavtal på workspace.google.com, eller slutar visa priserna i årsläget eller i USD.',
  blind: 'Svensk SEK-prissättning — Google publicerar inget publikt SEK-pris, så en förändring som bara slår mot svenska kunder är osynlig för vakten (därav google-sek-grinden). Visar sidan bara ett kampanjpris utan listpriset bredvid läses kampanjen som listpris och vakten larmar DRIFT på en prisändring som inte skett: rött åt rätt håll, men fel klass.',
  needsBrowser: true,
  schedule: '30 5 * * 1',
  async run() {
    const tiers = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks;
    if (!tiers?.['google-plus']?.usdAnnual) return { checks: [], notes: ['Google-tiers saknas i prisboken'], fatal: true };

    const { status, text, arsLage } = await withPage(URL, async (page, status) => {
      await page.waitForFunction(() => /user per month/.test(document.body?.innerText ?? ''), null, { timeout: 20000 }).catch(() => {});
      const arsvaxel = await page.locator('button[role=switch][aria-label*="Annual"], button[role=switch]:has-text("Annual")').first()
        .getAttribute('aria-checked').catch(() => null);
      return { status, text: await page.evaluate(() => document.body?.innerText ?? ''), arsLage: arsvaxel === 'true' };
    });
    if (status !== 200) return { checks: [], notes: [`HTTP ${status} — sidan oåtkomlig`], fatal: true };

    const { priser } = googleListpriser(text);
    return {
      checks: googleChecks(tiers, { text, arsLage }),
      notes: [
        `läst: Starter ${priser.Starter ?? '–'} · Standard ${priser.Standard ?? '–'} · Plus ${priser.Plus ?? '–'} USD · årsläge ${arsLage ? 'på' : 'AV/okänt'}`,
        'SEK ej publikt hos Google — endast USD-ankaret vaktas; google-sek-grind håller SEK tyst mot kund.',
      ],
    };
  },
};
