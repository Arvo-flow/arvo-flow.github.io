// lib/verifiers/atlassian.mjs — vaktar Atlassians publika USD-listpriser (Jira + Confluence).
//
// Recon 2026-08-05 (ops/probe-saas-render.txt): sidorna är JS-renderade och bär en väljare
// "Monthly | Annually | SAVE UP TO 17%". Verifieraren klickar därför båda lägena i stället för
// att gissa vilket som var förvalt — ett pris vars faktureringsperiod man gissar är inte ett
// verifierat pris, det är rätt siffror med fel innebörd.
//
// ⚠️ SEAT-FÄLLAN (2026-08-05, upptäckt INNAN prisboken hann ändras — av prisbokens egen
// kommentar). Atlassians per-user-pris är TRAPPSTEGSBEROENDE på antal användare. Prisbokens
// 8,92/17,88/6,50/12,53 är verifierade "för 110 users". Den här verifieraren läste sidans
// STANDARDVY och fick 7,91/14,54/5,42/10,44 — och rapporterade det som DRIFT.
//
// Det var fel, och exakt samma felklass som Copilot-fällan: två olika saker jämförda som om de
// vore samma. Hade prisboken "rättats" till 7,91 hade ett dokumenterat 110-user-pris tyst bytts
// mot ett odokumenterat standardvy-pris — talet hade sett färskare ut och betytt något annat.
//
// Tills verifieraren kan STÄLLA IN användarantalet (kräver egen recon av sidans seat-väljare)
// får den inte påstå vare sig drift eller godkänt. Den rapporterar därför `skipped` med skäl —
// en ärlig "kan inte verifiera än", aldrig ett rött larm på fel grund och aldrig ett tyst grönt.
//
// BONUS-RÄTTELSE (väntar på samma recon): Confluence-tiers står med källan 'featurebase.app' —
// en tredjeparts blogg, inte Atlassian. Ett "verifierat publikt listpris" får inte vila på någon
// annans återgivning. Rättas när vakten kan läsa Atlassian vid rätt seat-nivå.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withPage } from './core.mjs';
// numCheck/planPriceFromText används först när seat-nivån går att styra — se SEAT-FÄLLAN nedan.

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

    // Bevisa att sidorna alls går att nå — annars vore skippen en ursäkt för att inte titta.
    const status = [];
    for (const p of PRODUKTER) {
      const r = await withPage(p.url, async (_page, st) => st, { timeoutMs: 40000, settleMs: 2000 })
        .catch((e) => 'ERR ' + e.message.split('\n')[0]);
      status.push(`${p.id}: ${r}`);
    }

    return {
      skipped: true,
      notes: [
        `Sidstatus — ${status.join(' · ')}`,
        'SEAT-BEROENDE PRISSÄTTNING: prisbokens tal gäller 110 users; sidans standardvy visar en',
        'annan trappsteg-nivå (7,91/14,54/5,42/10,44 vid recon 2026-08-05). Att jämföra dem vore',
        'samma felklass som Copilot-fällan — två olika saker behandlade som samma.',
        'ÅTGÄRD: recon av sidans seat-väljare, sedan verifiering vid 110 users. Först då får',
        'Confluence-källan flyttas från featurebase.app till atlassian.com.',
      ],
    };
  },
};
