// lib/verifiers/atlassian.mjs — vaktar Atlassians publika USD-listpriser (Jira + Confluence).
//
// Recon 2026-08-05 (ops/probe-saas-render.txt): sidorna är JS-renderade och bär en väljare
// "Monthly | Annually | SAVE UP TO 17%". Renderat läge visade Jira Standard $7.91 och Premium
// $14.54 (prisboken: 8,92 / 17,88) — alltså DRIFT NEDÅT, vilket betyder att vi övervärderat
// marknaden och därmed blåst upp kundens besparing. Samma riktning som Slack-felet.
//
// MEN: dumpen kunde inte avgöra VILKET läge väljaren stod i. Ett pris vars faktureringsperiod
// man gissar är inte ett verifierat pris — det är ett tal med rätt siffror och fel innebörd.
// Därför KLICKAR den här verifieraren båda lägena och läser var för sig. Ingen inferens.
//
// BONUS-RÄTTELSE: Confluence-tiers stod tidigare med källan 'featurebase.app' — en tredjeparts
// blogg, inte Atlassian. Ett "verifierat publikt listpris" får inte vila på någon annans
// återgivning. Vakten läser nu Atlassian direkt.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage, numCheck, planPriceFromText } from './core.mjs';

const PRODUKTER = [
  {
    id: 'jira', url: 'https://www.atlassian.com/software/jira/pricing',
    tiers: [
      { key: 'atlassian-jira-standard', label: 'Jira Standard', namn: 'Standard' },
      { key: 'atlassian-jira-premium', label: 'Jira Premium', namn: 'Premium' },
    ],
  },
  {
    id: 'confluence', url: 'https://www.atlassian.com/software/confluence/pricing',
    tiers: [
      { key: 'atlassian-confluence-standard', label: 'Confluence Standard', namn: 'Standard' },
      { key: 'atlassian-confluence-premium', label: 'Confluence Premium', namn: 'Premium' },
    ],
  },
];

// Läs sidan i ETT väljarläge. Returnerar { läge, text } eller null om knappen inte gick att klicka.
async function lasIlage(page, knapptext) {
  try {
    await page.click(`button:has-text("${knapptext}"), [role=tab]:has-text("${knapptext}"), label:has-text("${knapptext}")`,
      { timeout: 6000 });
    await page.waitForTimeout(2500);
  } catch { return null; }                        // knappen finns inte → vi påstår ingenting
  return page.evaluate(() => document.body?.innerText ?? '');
}

export default {
  id: 'atlassian',
  category: 'saas-productivity',
  label: 'Atlassian Jira + Confluence publika listpriser (USD)',
  needsBrowser: true,
  schedule: '0 5 * * 1',
  async run() {
    const T = BRANCHINDEX['saas-productivity']?.licenseTierBenchmarks;
    if (!T?.['atlassian-jira-standard']) return { checks: [], notes: ['Atlassian-tiers saknas i prisboken'], fatal: true };

    const checks = [];
    const notes = ['Väljaren Monthly/Annually klickas explicit — faktureringsperioden gissas aldrig.'];

    for (const p of PRODUKTER) {
      const lagen = await withPage(p.url, async (page, status) => {
        if (typeof status === 'number' && status !== 200) return { status };
        return {
          status,
          manad: await lasIlage(page, 'Monthly'),
          ar: await lasIlage(page, 'Annually'),
        };
      }, { timeoutMs: 45000, settleMs: 4000 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0] }));

      if (!lagen?.manad && !lagen?.ar) {
        notes.push(`${p.id}: status ${lagen?.status} — inget läge kunde läsas`);
        continue;
      }

      for (const t of p.tiers) {
        const bm = T[t.key];
        const opt = { fonster: 130, kravOrd: /per user\s*\/?\s*month/i };
        if (lagen.manad && bm?.usdMonthly != null) {
          checks.push(numCheck(`${t.label} månadsavtal (USD)`, bm.usdMonthly,
            planPriceFromText(lagen.manad, t.namn, opt).value, { unit: ' USD' }));
        }
        if (lagen.ar && bm?.usdAnnual != null) {
          checks.push(numCheck(`${t.label} årsavtal (USD)`, bm.usdAnnual,
            planPriceFromText(lagen.ar, t.namn, opt).value, { unit: ' USD' }));
        } else if (lagen.ar) {
          // usdAnnual är null i prisboken → vi har aldrig haft ett årspris. Rapportera det vi
          // ser, så att prisboken kan FYLLAS med ett verifierat tal i stället för att stå tomt.
          const sett = planPriceFromText(lagen.ar, t.namn, opt).value;
          notes.push(`${t.label}: prisboken saknar årspris · live årsavtal ${sett ?? '(saknas)'} USD`);
        }
      }
    }

    if (checks.length === 0) return { checks: [], notes, fatal: true };
    return { checks, notes };
  },
};
