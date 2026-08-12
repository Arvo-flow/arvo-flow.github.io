// lib/verifiers/m365.mjs — verifierar Microsoft 365 Business-listpriser (årsavtal, kr/anv/mån)
// mot microsoft.com/sv-se. Server-renderad sida → vanlig HTML-fetch (needsBrowser:false).
import { BRANCHINDEX } from '../../agents/recommender/branchindex.js';
import { fetchText, stripHtml, numCheck } from './core.mjs';

// PER-PLAN-SIDORNA, inte översikten (skärpt 2026-08-05). Översiktssidan slutade visa de rena
// planerna och listar numera bara "Business Standard OCH Microsoft 365 Copilot för företag"
// (224,63 kr) resp. Premium+Copilot (305,87 kr). Varje plan har sin egen sida där det RENA
// priset står — det är den kanoniska källan och den vi ankrar på.
// ENTERPRISE TILLAGT 2026-08-12. E3 och E5 är prisbokens största tal (416,77 / 641,18 kr) och
// lästes av ingen maskin — prisauditen visade ändå grönt, eftersom dess täckningskontroll var på
// leverantörsnivå. Bibelns egen NMIT-obduktion visar priset på ett felaktigt E3-ankare: en utlovad
// besparing gick från 24 569 kr/år till 2 248 när det rättades.
// Adresserna är BEVISADE, inte gissade — scripts/probe-m365-enterprise.mjs träffade båda sidorna
// och fann prisen i rätt kontext ("Årligt åtagande"). Fyra kandidatadresser prövades och föll.
//
// `matchNamn` är produktnamnet så som det står FÖRE priset i sidans text. Business-planerna heter
// "Business Standard", enterprise-planerna "Microsoft 365 E3". Att binda priset till namnet är
// nödvändigt just här: E3-sidan visar ÄVEN E5:s pris i sin jämförelsetabell, och en lös
// sifferplockning hade råkat läsa grannens tal.
const TIERS = [
  { key: 'business-basic', name: 'Basic', matchNamn: 'Business Basic', url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-basic' },
  { key: 'business-standard', name: 'Standard', matchNamn: 'Business Standard', url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-standard' },
  { key: 'business-premium', name: 'Premium', matchNamn: 'Business Premium', url: 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-premium' },
  { key: 'e3', name: 'E3', matchNamn: 'Microsoft 365 E3', url: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/e3' },
  { key: 'e5', name: 'E5', matchNamn: 'Microsoft 365 E5', url: 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/e5' },
];

// PAKET- OCH VARIANTFÄLLAN (grundarfynd 2026-08-05). Samma sida bär flera SKU:er som alla
// heter "Business <tier>": den rena planen, "… och Microsoft 365 Copilot för företag" (dyrare)
// och "… EES (exkl. Teams)" (billigare). Att råka läsa fel SKU vore en like-for-like-lögn i
// båda riktningarna — vi jämför kundens rena licens mot ett paket, eller mot en nedbantad
// variant. Därför kräver vi att tier-namnet följs DIREKT av priset: inget "och", inget "EES".
const FORBJUDEN_KONTEXT = /copilot|EES|exkl\.\s*Teams/i;

function extractAnnual(flat, matchNamn) {
  // "Microsoft 365 Business Standard 133,82 kr användare/månad, betalas årsvis"
  // "Microsoft 365 E3 416,77 kr användare/månad, betalas årsvis (Årligt åtagande)"
  const re = new RegExp(`${matchNamn}\\s+(\\d[\\d ]*[.,]\\d{2})\\s*kr\\s*användare\\s*/?\\s*månad,?\\s*betalas årsvis`, 'gi');
  for (const m of flat.matchAll(re)) {
    // Kontrollera 60 tecken före träffen: bär de en paket-/variantmarkör är det INTE ren plan.
    const fore = flat.slice(Math.max(0, m.index - 60), m.index + matchNamn.length);
    if (FORBJUDEN_KONTEXT.test(fore)) continue;
    return Number(m[1].replace(/\s/g, '').replace(',', '.'));
  }
  return null;                        // hellre "(saknas)" än fel SKU — okänt slår falsk precision
}

export default {
  id: 'm365',
  category: 'saas-productivity',
  label: 'Microsoft 365 Business- och Enterprise-listpriser (årsavtal)',
  // ── VAD VERIFIERAREN FAKTISKT LÄSER (deklarerat 2026-08-12) ──────────────────────────────
  // Prisauditens täckningskontroll var på LEVERANTÖRSNIVÅ: nyckeln 'e3' mappades till
  // 'microsoft', den här modulen finns, alltså "täckt". Men TIERS nedan innehåller tre planer.
  // E3 och E5 — prisbokens största tal — lästes av ingen maskin och lyste ändå grönt.
  // Deklarationen gör täckningen kontrollerbar per NIVÅ i stället för per leverantör, och den
  // är avsiktligt en lista över vad modulen läser, inte över vad den borde läsa.
  bevakadeTiers: TIERS.map((t) => t.key),
  // VAKTKONTRAKTET (lib/vaktkontrakt.js): den fråga som ska ställas innan något kallas vakt.
  fangar: 'Microsoft ändrar det publika listpriset per plan på microsoft.com/sv-se — vakten läser per-plan-sidorna och jämför mot prisbokens ankare.',
  blind: 'Priser som bara finns i kundens faktiska avtal (EA, volymrabatt, återförsäljarpris) — vakten läser publikt listpris och kan per definition inte se ett förhandlat tal.',
  needsBrowser: false,
  schedule: '0 5 * * 1',
  async run() {
    const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    const checks = [];
    const notes = ['Läser per-plan-sidorna; paket-/variant-SKU:er (Copilot, EES exkl. Teams) avvisas.'];

    for (const { key, name, matchNamn, url } of TIERS) {
      const { status, text } = await fetchText(url, { timeoutMs: 25000 });
      if (status !== 200) {
        notes.push(`${matchNamn}: HTTP ${status} — sidan oåtkomlig`);
        continue;                     // en otillgänglig sida är okänt, inte drift
      }
      checks.push(numCheck(`${matchNamn} årsavtal`, tiers[key].msrpAnnual,
        extractAnnual(stripHtml(text), matchNamn), { unit: ' kr' }));
    }

    // Nådde vi ingen sida alls kan vi inte verifiera något — rött, aldrig tyst grönt.
    if (checks.length === 0) return { checks: [], notes, fatal: true };
    return { checks, notes };
  },
};
