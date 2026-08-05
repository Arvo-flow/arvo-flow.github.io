// scripts/probe-prisbok.mjs — SOND över prisbokens ÅTERSTÅENDE inaktuella källor (2026-08-05).
//
// Fabriken (scripts/verify.mjs) täcker 9 av de 21 inaktuella posterna. Den här sonden tar de
// övriga — plus de två där fabriken sa "(saknas)" i stället för ett tal. "Saknas" är INTE drift,
// det är okänt, och okänt får varken bli ett nytt pris eller ett nytt verifieringsdatum.
//
// Syftet är BESLUTSUNDERLAG, inte automatik: dumpa vad varje källa FAKTISKT skriver, så att
// prisboken kan uppdateras mot verkligheten och nya verifierare byggas där det går. Källor som
// inte lämnar ifrån sig priset i serverrenderad HTML redovisas som just det — inte som en gissning.
import { fetchText, stripHtml } from '../lib/verifiers/core.mjs';

const SIDOR = [
  // Fabriken sa "(saknas)" här — vi måste se den nya formuleringen.
  ['fortnox-lon', 'https://www.fortnox.se/produkter/lon'],
  ['fortnox-priser', 'https://www.fortnox.se/produkter/priser'],
  ['m365-enterprise', 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing'],
  // Helt ovaktade i dag — 12 av de 21 inaktuella tiers bor här.
  ['slack', 'https://slack.com/pricing'],
  ['zoom', 'https://zoom.us/pricing'],
  ['atlassian-jira', 'https://www.atlassian.com/software/jira/pricing'],
  ['atlassian-confluence', 'https://www.atlassian.com/software/confluence/pricing'],
  ['pipedrive', 'https://www.pipedrive.com/en/pricing'],
  ['hubspot', 'https://www.hubspot.com/pricing/crm'],
  ['zoho-crm', 'https://www.zoho.com/crm/zohocrm-pricing.html'],
];

// Fångar både "$12", "12 USD", "133,82 kr" och "€10" med kontext runt omkring.
const PRIS_RE = /(.{0,100}?)(?:\$\s?(\d+(?:[.,]\d{1,2})?)|(\d[\d ]*(?:[.,]\d{1,2})?)\s*(kr|USD|EUR|€))([\s\S]{0,70})/g;

for (const [namn, url] of SIDOR) {
  console.log(`\n════════ ${namn.toUpperCase()} ════════\n${url}`);
  const { status, text } = await fetchText(url, { timeoutMs: 25000 });
  console.log('HTTP', status, '· html-längd', text.length);
  if (status !== 200) { console.log('  → oåtkomlig i serverrenderad hämtning'); continue; }

  const flat = stripHtml(text);
  const sedda = new Set();
  for (const m of flat.matchAll(PRIS_RE)) {
    const belopp = m[2] ? `$${m[2]}` : `${m[3]} ${m[4]}`;
    const fore = m[1].replace(/\s+/g, ' ').trim().slice(-85);
    const efter = m[5].replace(/\s+/g, ' ').trim().slice(0, 55);
    const rad = `${belopp.padStart(10)} | …${fore} ⟦PRIS⟧ ${efter}…`;
    if (sedda.has(rad)) continue;
    sedda.add(rad);
    console.log('  ' + rad);
    if (sedda.size >= 22) break;
  }
  if (sedda.size === 0) {
    console.log('  → INGA priser i serverrenderad HTML (kräver rendering/JS — verifierare måste använda browser)');
  }
}
