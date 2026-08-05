// lib/verifiers/m365.mjs — verifierar Microsoft 365 Business-listpriser (årsavtal, kr/anv/mån)
// mot microsoft.com/sv-se. Server-renderad sida → vanlig HTML-fetch (needsBrowser:false).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { fetchText, stripHtml, numCheck } from './core.mjs';

// PER-PLAN-SIDORNA, inte översikten (skärpt 2026-08-05). Översiktssidan slutade visa de rena
// planerna och listar numera bara "Business Standard OCH Microsoft 365 Copilot för företag"
// (224,63 kr) resp. Premium+Copilot (305,87 kr). Varje plan har sin egen sida där det RENA
// priset står — det är den kanoniska källan och den vi ankrar på.
const TIERS = [
  { key: 'business-basic', name: 'Basic', url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-basic' },
  { key: 'business-standard', name: 'Standard', url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-standard' },
  { key: 'business-premium', name: 'Premium', url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-premium' },
];

// PAKET- OCH VARIANTFÄLLAN (grundarfynd 2026-08-05). Samma sida bär flera SKU:er som alla
// heter "Business <tier>": den rena planen, "… och Microsoft 365 Copilot för företag" (dyrare)
// och "… EES (exkl. Teams)" (billigare). Att råka läsa fel SKU vore en like-for-like-lögn i
// båda riktningarna — vi jämför kundens rena licens mot ett paket, eller mot en nedbantad
// variant. Därför kräver vi att tier-namnet följs DIREKT av priset: inget "och", inget "EES".
const FORBJUDEN_KONTEXT = /copilot|EES|exkl\.\s*Teams/i;

function extractAnnual(flat, tierName) {
  // "Microsoft 365 Business Standard 133,82 kr användare/månad, betalas årsvis"
  const re = new RegExp(`Business ${tierName}\\s+(\\d[\\d ]*[.,]\\d{2})\\s*kr\\s*användare\\s*/?\\s*månad,?\\s*betalas årsvis`, 'gi');
  for (const m of flat.matchAll(re)) {
    // Kontrollera 60 tecken före träffen: bär de en paket-/variantmarkör är det INTE ren plan.
    const fore = flat.slice(Math.max(0, m.index - 60), m.index + `Business ${tierName}`.length);
    if (FORBJUDEN_KONTEXT.test(fore)) continue;
    return Number(m[1].replace(/\s/g, '').replace(',', '.'));
  }
  return null;                        // hellre "(saknas)" än fel SKU — okänt slår falsk precision
}

export default {
  id: 'm365',
  category: 'saas-productivity',
  label: 'Microsoft 365 Business listpriser (årsavtal)',
  needsBrowser: false,
  schedule: '0 5 * * 1',
  async run() {
    const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    const checks = [];
    const notes = ['Läser per-plan-sidorna; paket-/variant-SKU:er (Copilot, EES exkl. Teams) avvisas.'];

    for (const { key, name, url } of TIERS) {
      const { status, text } = await fetchText(url, { timeoutMs: 25000 });
      if (status !== 200) {
        notes.push(`Business ${name}: HTTP ${status} — sidan oåtkomlig`);
        continue;                     // en otillgänglig sida är okänt, inte drift
      }
      checks.push(numCheck(`Business ${name} årsavtal`, tiers[key].msrpAnnual,
        extractAnnual(stripHtml(text), name), { unit: ' kr' }));
    }

    // Nådde vi ingen sida alls kan vi inte verifiera något — rött, aldrig tyst grönt.
    if (checks.length === 0) return { checks: [], notes, fatal: true };
    return { checks, notes };
  },
};
