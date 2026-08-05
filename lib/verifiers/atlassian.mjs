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
// LÖST 2026-08-05: recon hittade kontrollen — <input id="unit-count" type="number" value="300">.
// Vakten ställer nu in 110 users innan den läser, så talen jämförs på samma bas. Går fältet inte
// att ställa in rapporteras skipped med skäl — aldrig ett rött larm på fel grund, aldrig ett
// tyst grönt.
//
// BONUS-RÄTTELSE (väntar på samma recon): Confluence-tiers står med källan 'featurebase.app' —
// en tredjeparts blogg, inte Atlassian. Ett "verifierat publikt listpris" får inte vila på någon
// annans återgivning. Rättas när vakten kan läsa Atlassian vid rätt seat-nivå.
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

// SEAT-VÄLJAREN (recon 2026-08-05): sidan bär <input id="unit-count" type="number" value="300">.
// Standardvyn visar alltså priset för 300 användare — prisbokens tal gäller 110. Det var därför
// den första versionen rapporterade fyra falska "drifter". Vakten ställer nu in fältet explicit.
const SEATS = 110;                       // samma bas som prisbokens dokumenterade tal

async function stallInSeats(page, antal) {
  try {
    await page.fill('#unit-count', String(antal), { timeout: 8000 });
    await page.dispatchEvent('#unit-count', 'change').catch(() => {});
    await page.dispatchEvent('#unit-count', 'input').catch(() => {});
    await page.waitForTimeout(3000);
    const satt = await page.inputValue('#unit-count').catch(() => null);
    return String(satt) === String(antal);
  } catch { return false; }
}

async function lasIlage(page, knapptext) {
  try {
    await page.click(`button:has-text("${knapptext}"), [role=tab]:has-text("${knapptext}"), label:has-text("${knapptext}")`,
      { timeout: 6000 });
    await page.waitForTimeout(2500);
  } catch { return null; }
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
    const notes = [`Seat-väljaren (#unit-count) ställs till ${SEATS} — samma bas som prisbokens tal.`];

    for (const p of PRODUKTER) {
      const res = await withPage(p.url, async (page, status) => {
        if (typeof status === 'number' && status !== 200) return { status };
        const seatOk = await stallInSeats(page, SEATS);
        if (!seatOk) return { status, seatOk: false };
        return { status, seatOk: true, manad: await lasIlage(page, 'Monthly') };
      }, { timeoutMs: 50000, settleMs: 4000 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0] }));

      if (!res?.seatOk) {
        // Kunde vi inte styra seat-nivån har vi inget jämförbart tal. Tystnad med skäl — aldrig
        // ett rött larm på fel grund, aldrig ett grönt vi inte förtjänat.
        notes.push(`${p.id}: status ${res?.status} — seat-fältet kunde inte ställas till ${SEATS}, inget jämförbart pris`);
        continue;
      }
      if (!res.manad) { notes.push(`${p.id}: Monthly-läget kunde inte läsas`); continue; }

      for (const t of p.tiers) {
        const bm = T[t.key];
        if (bm?.usdMonthly == null) continue;
        checks.push(numCheck(`${t.label} månadsavtal @ ${SEATS} users (USD)`, bm.usdMonthly,
          planPriceFromText(res.manad, t.namn, { fonster: 130, kravOrd: /per user\s*\/?\s*month/i }).value,
          { unit: ' USD' }));
      }
    }

    if (checks.length === 0) return { skipped: true, notes };
    return { checks, notes };
  },
};
