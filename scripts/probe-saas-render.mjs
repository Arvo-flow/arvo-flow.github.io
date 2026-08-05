// scripts/probe-saas-render.mjs — REKOGNOSERING med browser för de sista OVAKTADE prisposterna.
//
// Sonden med vanlig fetch (ops/probe-prisbok.txt) visade att Zoom, Atlassian, Pipedrive och
// HubSpot inte lämnar ifrån sig priser i serverrenderad HTML — och Pipedrive svarar 403. De kan
// alltså bara vaktas via rendering. Men innan en enda verifierare skrivs måste jag SE vad sidorna
// faktiskt säger: en verifierare byggd på ett gissat sidformat är en gissning i produktionskedjan.
//
// Skriptet renderar varje sida, dumpar varje pristal med kontext, och skriver ut prisbokens
// nuvarande värden bredvid — så att drift syns direkt i loggen och verifierarna kan skrivas mot
// verkligheten. Ren instrumentering: den rör aldrig prisboken.
import { withPage } from '../lib/verifiers/core.mjs';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const T = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
const C = BRANCHINDEX['saas-crm']?.licenseTierBenchmarks ?? {};

const KALLOR = [
  { id: 'zoom', url: 'https://zoom.us/pricing',
    vantat: { 'zoom-pro': T['zoom-pro'], 'zoom-business': T['zoom-business'] },
    ord: ['Pro', 'Business'] },
  { id: 'jira', url: 'https://www.atlassian.com/software/jira/pricing',
    vantat: { 'atlassian-jira-standard': T['atlassian-jira-standard'], 'atlassian-jira-premium': T['atlassian-jira-premium'] },
    ord: ['Standard', 'Premium'] },
  { id: 'confluence', url: 'https://www.atlassian.com/software/confluence/pricing',
    vantat: { 'atlassian-confluence-standard': T['atlassian-confluence-standard'], 'atlassian-confluence-premium': T['atlassian-confluence-premium'] },
    ord: ['Standard', 'Premium'] },
  { id: 'pipedrive', url: 'https://www.pipedrive.com/en/pricing',
    vantat: { 'pipedrive-lite': C['pipedrive-lite'] ?? T['pipedrive-lite'], 'pipedrive-growth': C['pipedrive-growth'] ?? T['pipedrive-growth'] },
    ord: ['Essential', 'Advanced'] },
  { id: 'hubspot', url: 'https://www.hubspot.com/pricing/crm/starter',
    vantat: { 'hubspot-starter': C['hubspot-starter'] ?? T['hubspot-starter'] },
    ord: ['Starter'] },
  { id: 'zoho', url: 'https://www.zoho.com/crm/zohocrm-pricing.html',
    vantat: { 'zoho-crm-standard': C['zoho-crm-standard'] ?? T['zoho-crm-standard'] },
    ord: ['Standard', 'Professional'] },
  // Pipedrive har DÖPT OM sina planer: sonden hittade priserna 14/39/59/79 men INGA av orden
  // "Essential"/"Advanced" som prisbokens tier-nycklar bygger på. Ett pris utan en plan vi kan
  // namnge är inget ankare — här söker vi namnen innan någon verifierare skrivs.
  { id: 'pipedrive-namn', url: 'https://www.pipedrive.com/en/pricing', vantat: {},
    ord: ['Lite', 'Growth', 'Premium', 'Ultimate', 'Essential', 'Advanced', 'Professional', 'Power'] },
  // Fortnox: både /produkter/lon och /produkter/priser 404:ar. Leta rätt sida via startsidan.
  { id: 'fortnox-start', url: 'https://www.fortnox.se/', vantat: {}, ord: ['Lön', 'pris', 'Priser'] },
];

for (const k of KALLOR) {
  console.log(`\n══════════════ ${k.id.toUpperCase()} ══════════════\n${k.url}`);
  for (const [namn, t] of Object.entries(k.vantat)) {
    if (t) console.log(`  prisbok ${namn}: månad ${t.usdMonthly} · år ${t.usdAnnual} (verifierat ${t.lastVerified}, källa ${t.source})`);
  }

  const res = await withPage(k.url, async (page, status) => {
    const text = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/[ \t]+/g, ' ');
    return { status, text };
  }, { timeoutMs: 45000, settleMs: 5000 }).catch((e) => ({ status: 'ERR ' + e.message.split('\n')[0], text: '' }));

  console.log(`  status ${res.status} · renderad text ${res.text.length} tecken`);
  if (!res.text) { console.log('  → ingen text (bot-vägg eller timeout) — kräver stealth'); continue; }

  // 1) Varje pristal med omgivning — så att plan↔pris-bindningen syns.
  const flat = res.text.replace(/\n+/g, ' ¶ ');
  const sedda = new Set();
  console.log('  ── pristal med kontext ──');
  for (const m of flat.matchAll(/(.{0,80}?)(?:US ?\$|\$|USD ?)\s?(\d+(?:[.,]\d{1,2})?)([\s\S]{0,70})/g)) {
    const rad = `$${m[2].padStart(6)} | …${m[1].trim().slice(-72)} ⟦PRIS⟧ ${m[3].trim().slice(0, 60)}…`;
    if (sedda.has(rad)) continue;
    sedda.add(rad); console.log('    ' + rad);
    if (sedda.size >= 24) break;
  }
  if (sedda.size === 0) console.log('    (inga $-tal i renderad text — priset kan ligga bakom väljare/land)');

  // 2) Raka planrader — hjälper till att se vilket ord som bär vilket pris.
  console.log('  ── rader som nämner planorden ──');
  const rader = res.text.split('\n').map((r) => r.trim()).filter(Boolean);
  let n = 0;
  for (const r of rader) {
    if (k.ord.some((o) => new RegExp(`\\b${o}\\b`, 'i').test(r)) && r.length < 160) {
      console.log('    ' + JSON.stringify(r)); if (++n >= 14) break;
    }
  }
}
