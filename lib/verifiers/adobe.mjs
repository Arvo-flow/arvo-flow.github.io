// lib/verifiers/adobe.mjs — vaktar Adobe Creative Cloud publika SEK-listpriser (saas-creative).
//
// Adobe gömmer prissidan bakom Akamai bot-skydd → vanlig render får 39-byte challenge. Denna verifierare
// kör STEALTH (withStealthPage: playwright-extra + stealth-plugin, headful via xvfb) och läser de ÄKTA
// SEK-priserna direkt från adobe.com/se. Vaktar de ankare recommend()/adobe-rightsizing använder:
//   • Team/B2B (exkl moms): All Apps 985, Single App 381 — + att sidan säger "exkl. moms".
//   • Individ (inkl moms): Single App 311,25 + All Apps 932,50 (normalpris) — de-momsas i kod.
// Rött vid drift. needsStealth:true → verify-sources.yml installerar stealth-deps + kör headful.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withStealthPage, numCheck, kontextUtdrag, lasEntydigt, TAL_SV } from './core.mjs';

const TEAM_URL = 'https://www.adobe.com/se/creativecloud/plans.html?plan=team';
const PHOTOSHOP_URL = 'https://www.adobe.com/se/products/photoshop.html';

const readText = (url) => withStealthPage(url, async (page) => {
  try { await page.waitForFunction(() => /\d[\d\s.,]*\s*SEK/i.test(document.body?.innerText || ''), { timeout: 16000 }); } catch {}
  return (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
});
// ── TALEN LÄSES, DE LETAS INTE (2026-10-20) ─────────────────────────────────────────────────────
// Vakten letade förut efter fmtSek(n) + « SEK» i sidtexten. Intl skriver tusental med hårt mellanslag
// (U+00A0) medan sidtexten normaliseras till vanligt, så ett pris från 1 000 kr kunde aldrig matcha —
// och sidan visar redan «Creative Cloud Pro Plus … 1 091,00 SEK/mån» (avläst 18 okt). Nu läses talet
// på sin plats med TAL_SV, som tål båda mellanslagen, och numCheck skiljer DRIFT från OLÄSBAR.
// Platserna, avlästa 18 okt (körning 39155569488):
//   team:      «Creative Cloud Pro Populärast 985,00 SEK/mån per licens exkl. moms» (inte «Pro Plus»)
//              «Creative Cloud Fristående program Från 381,00 SEK/mån per licens exkl. moms»
//   photoshop: «Photoshop 311,25 SEK/måninkl. moms» · «Creative Cloud Pro Spara 50% Ordinarie pris 932,50 SEK/mån»
// Team-priserna läses bara tillsammans med «exkl. moms»: utan markören är momsbasen okänd, och då är
// talet okänt (OLÄSBAR), aldrig drift.
const SEK_MAN = String.raw`\s*SEK\s*\/\s*mån`;
const TEAM_ALLA = new RegExp(String.raw`Creative Cloud Pro(?!\s*Plus)\b[^\d]{0,30}?(${TAL_SV})${SEK_MAN}\s*per licens exkl\.?\s*moms`, 'g');
const TEAM_ETT = new RegExp(String.raw`Fristående program\s+Från\s+(${TAL_SV})${SEK_MAN}\s*per licens exkl\.?\s*moms`, 'g');
const IND_ETT = new RegExp(String.raw`Photoshop\s+(${TAL_SV})${SEK_MAN}\s*inkl\.?\s*moms`, 'g');
const IND_ALLA = new RegExp(String.raw`Creative Cloud Pro\s+(?:Spara\s+\d+\s*%\s+)?Ordinarie pris\s+(${TAL_SV})${SEK_MAN}`, 'g');

/** Talen på de förankrade platserna, eller null. */
export function adobeLas({ teamText, psText }) {
  const en = (text, rx) => lasEntydigt(text, rx)?.[0] ?? null;
  return {
    teamAlla: en(teamText, TEAM_ALLA), teamEtt: en(teamText, TEAM_ETT),
    indEtt: en(psText, IND_ETT), indAlla: en(psText, IND_ALLA),
  };
}

/**
 * Checkarna ur redan lästa sidtexter — ren funktion, så att sviten kan mata den. Talen läses ur
 * prisboken: förut stod 985/381/311,25/932,50 som litteraler bredvid namn som läste boken, så en
 * ändrad bok hade gett ett namn med det nya talet och en sökning efter det gamla.
 */
export function adobeChecks(av, { teamText, psText }) {
  const live = adobeLas({ teamText, psText });
  return [
    numCheck('Team All Apps (SEK/licens/mån, exkl moms)', av.teamExVatMonthly['all-apps'], live.teamAlla, { unit: ' SEK' }),
    numCheck('Team Single App (SEK/licens/mån, exkl moms)', av.teamExVatMonthly['single-app'], live.teamEtt, { unit: ' SEK' }),
    numCheck('Individ Single App Photoshop (SEK/mån, inkl moms)', av.individualInclVatMonthly['single-app'], live.indEtt, { unit: ' SEK' }),
    numCheck('Individ All Apps normalpris (SEK/mån, inkl moms)', av.individualInclVatMonthly['all-apps'], live.indAlla, { unit: ' SEK' }),
  ];
}

/** Vad sidorna visade runt varje SEK-pris — för loggen. */
export function adobeKontext(av, { teamText, psText }) {
  const utdrag = (text, rx, o) => kontextUtdrag(text, rx, o).map((s) => `«${s}»`).join(' · ') || '(ingen träff)';
  return [
    `team-sidan SEK-priser: ${utdrag(teamText, /\d[\d\s.]*,\d{2}\s*SEK/, { fore: 70, efter: 40, max: 10 })}`,
    `photoshop-sidan SEK-priser: ${utdrag(psText, /\d[\d\s.]*,\d{2}\s*SEK/, { fore: 70, efter: 40, max: 10 })}`,
    `team-sidan exkl moms: ${utdrag(teamText, /exkl\.?\s*moms/i, { fore: 60, efter: 20, max: 3 })}`,
  ];
}

export default {
  id: 'adobe',
  category: 'saas-creative',
  label: 'Adobe Creative Cloud SEK-listpriser (stealth)',
  // ── VAD VAKTEN FAKTISKT LÄSER (vaktkontraktet, tvingande sedan 2026-08-12) ────────────────
  // Prisauditens täckning mättes förr på LEVERANTÖRSNIVÅ: fanns en verifierare för leverantören
  // ansågs varje prisbokspost för den leverantören täckt. Så stod E3 och E5 — bokens största tal —
  // obevakade bakom en grön audit. Deklarationen nedan listar de prisboksnycklar den här modulen
  // LÄSER, och auditen prövar mot listan i stället för mot ett leverantörsnamn.
  // Tom lista = ett SVAR, inte ett hål: den här vakten läser kategorins toppnivåpriser, inte
  // några licensnivåer. Skillnaden mellan "läser inga" och "ingen frågade" måste synas i koden.
  bevakadeTiers: [],
  // Vilken KATEGORIPOST i prisboken vakten daterar (top-level lastVerified). Infört 2026-08-22:
  // kategoriposternas datum ruttnade i tysthet precis som nivåernas — molnvaxel låg 66 dagar
  // gammal medan den här vakten körde veckovis och bekräftade priset varje gång. `null` är ett
  // giltigt SVAR (vakten daterar ingen kategoripost), men svaret måste finnas: skillnaden mellan
  // «vaktar ingen» och «ingen frågade» ska stå i koden.
  bevakadKategori: 'saas-creative',
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Adobe ändrar ett av de fyra publika SEK-listpriserna (team All Apps och Single App exkl moms, individ Photoshop och Creative Cloud Pro normalpris inkl moms): vakten läser talet på sin plats och visar det nya (DRIFT), även över 1 000 kr.',
  blind: 'Priser bakom inloggning eller regionala varianter av sidan — vakten ser den publika svenska vyn som en utloggad besökare får den. Slutar Adobe visa «Ordinarie pris» för Creative Cloud Pro (kampanjen tar slut) hittar vakten inte platsen och blir OLÄSBAR, aldrig grön.',
  needsBrowser: true,
  needsStealth: true,
  schedule: '15 5 * * 1',
  async run() {
    const av = BRANCHINDEX['saas-creative']?.adobeVerified;
    if (!av) return { checks: [], notes: ['adobeVerified saknas i prisboken'], fatal: true };

    const teamText = await readText(TEAM_URL);
    if (!teamText || teamText.length < 400) return { checks: [], notes: ['Adobe team-sidan oläsbar (stealth/Akamai)'], fatal: true };
    const psText = await readText(PHOTOSHOP_URL);
    if (!psText || psText.length < 400) return { checks: [], notes: ['Adobe Photoshop-sidan oläsbar (stealth/Akamai)'], fatal: true };

    return {
      checks: adobeChecks(av, { teamText, psText }),
      notes: ['B2B-riktpriser exkl moms: team direkt, individ ÷1,25 i kod (lib/adobe-pricing.js). Ingen FX.', ...adobeKontext(av, { teamText, psText })],
    };
  },
};
