// lib/verifiers/adobe.mjs — vaktar Adobe Creative Cloud publika SEK-listpriser (saas-creative).
//
// Adobe gömmer prissidan bakom Akamai bot-skydd → vanlig render får 39-byte challenge. Denna verifierare
// kör STEALTH (withStealthPage: playwright-extra + stealth-plugin, headful via xvfb) och läser de ÄKTA
// SEK-priserna direkt från adobe.com/se. Vaktar de ankare recommend()/adobe-rightsizing använder:
//   • Team/B2B (exkl moms): All Apps 985, Single App 381 — + att sidan säger "exkl. moms".
//   • Individ (inkl moms): Single App 311,25 + All Apps 932,50 (normalpris) — de-momsas i kod.
// Rött vid drift. needsStealth:true → verify-sources.yml installerar stealth-deps + kör headful.
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { withStealthPage, presenceCheck } from './core.mjs';

const TEAM_URL = 'https://www.adobe.com/se/creativecloud/plans.html?plan=team';
const PHOTOSHOP_URL = 'https://www.adobe.com/se/products/photoshop.html';

const readText = (url) => withStealthPage(url, async (page) => {
  try { await page.waitForFunction(() => /\d[\d\s.,]*\s*SEK/i.test(document.body?.innerText || ''), { timeout: 16000 }); } catch {}
  return (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
});
const has = (text, n) => new RegExp(`${String(n).replace('.', '[.,]')}\\s*SEK`).test(text);

export default {
  id: 'adobe',
  category: 'saas-creative',
  label: 'Adobe Creative Cloud SEK-listpriser (stealth)',
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

    const exVatMarker = /exkl\.?\s*moms/i.test(teamText);
    const checks = [
      presenceCheck(`Team All Apps ${av.teamExVatMonthly['all-apps']} SEK/licens (exkl moms)`, has(teamText, 985) && exVatMarker),
      presenceCheck(`Team Single App ${av.teamExVatMonthly['single-app']} SEK/licens (exkl moms)`, has(teamText, 381) && exVatMarker),
      presenceCheck(`Individ Single App ${av.individualInclVatMonthly['single-app']} SEK (inkl moms)`, has(psText, 311.25)),
      presenceCheck(`Individ All Apps ${av.individualInclVatMonthly['all-apps']} SEK normalpris (inkl moms)`, has(psText, 932.50)),
    ];
    return { checks, notes: ['B2B-riktpriser exkl moms: team direkt, individ ÷1,25 i kod (lib/adobe-pricing.js). Ingen FX.'] };
  },
};
