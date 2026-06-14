// scripts/verify-m365-prices.mjs — driftvakt för M365-listpriserna.
//
// Microsoft 365 Business Standard är den enskilt vanligaste mjukvaruraden hos
// svenska SMF — vårt mest använda "verifierat listpris"-ankare. Den här vakten
// hämtar Microsofts publika svenska prissida (server-renderad) och jämför de
// SEK-priser vi lagrar i branchindex.js mot vad som faktiskt står där NU.
//
//   node scripts/verify-m365-prices.mjs        (live — kräver HTTP-egress)
//
// HTTP fungerar inte i sandboxen → körs på GitHub Actions-runnern
// (.github/workflows/verify-m365-prices.yml, veckovis + manuell).
//
// REGEL 3 + REGEL 7: ett kundsynligt listpris får ALDRIG drifta tyst. Vid
// avvikelse exitar vakten med kod 1 (rött bygge → vi får larm → människa
// bekräftar och uppdaterar branchindex.js). Vakten skriver ALDRIG själv till
// prisboken — ett parse-fel får inte korrumpera ankaret. Matchar allt → exit 0.

import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const URL = 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-plans-and-pricing';

// De tre Business-tiers vi ankrar mot (E3/E5 ligger på enterprise-sidan, ej här).
const TIERS = [
  { key: 'business-basic',    name: 'Basic' },
  { key: 'business-standard', name: 'Standard' },
  { key: 'business-premium',  name: 'Premium' },
];

function parsePrice(str) {
  // "210,29" / "1 199,00" → 210.29 / 1199.00
  return Number(str.replace(/\s/g, '').replace(',', '.'));
}

async function fetchPage() {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 25000);
  try {
    const r = await fetch(URL, {
      signal: ac.signal, redirect: 'follow',
      headers: { 'User-Agent': UA, Accept: 'text/html,*/*', 'Accept-Language': 'sv-SE,sv;q=0.9' },
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  } finally { clearTimeout(t); }
}

function extractAnnual(text, tierName) {
  // Andra blocket på sidan ger namn direkt före årspriset:
  //   "Microsoft 365 Business Premium 210,29 kr användare/månad, betalas årsvis"
  // Tillåt valfri text mellan namn och pris (≤120 tecken, inget annat "kr"-pris
  // emellan) för att inte fastna på beskrivningstexten i första blocket.
  const re = new RegExp(
    `Business ${tierName}\\s+(\\d[\\d ]*[.,]\\d{2})\\s*kr\\s*användare\\s*/?\\s*månad,?\\s*betalas årsvis`,
    'i',
  );
  const m = re.exec(text);
  return m ? parsePrice(m[1]) : null;
}

async function main() {
  const raw = await fetchPage();
  const text = raw
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ');

  const tiers = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
  const drift = [];
  const missing = [];

  for (const { key, name } of TIERS) {
    const stored = tiers[key]?.msrpAnnual;
    const live = extractAnnual(text, name);
    if (live == null) { missing.push(name); continue; }
    const diff = Math.abs(live - stored);
    const status = diff < 0.005 ? '✓' : '✗ DRIFT';
    console.log(`  ${status} Business ${name.padEnd(9)} lagrat ${stored} kr · live ${live} kr`);
    if (diff >= 0.005) drift.push({ name, stored, live });
  }

  if (missing.length) {
    console.error(`\n[m365-vakt] kunde inte läsa ${missing.join(', ')} ur sidan — parse-fel eller layoutändring.`);
    console.error('[m365-vakt] FAIL: hellre rött bygge än tyst osäkerhet (regel 4).');
    process.exit(1);
  }
  if (drift.length) {
    console.error('\n[m365-vakt] PRISDRIFT upptäckt — Microsoft har ändrat listpriset:');
    for (const d of drift) console.error(`  · Business ${d.name}: ${d.stored} → ${d.live} kr/anv/mån (årsavtal)`);
    console.error('[m365-vakt] Uppdatera branchindex.js + bumpa lastVerified, kör testsviten, deploya.');
    process.exit(1);
  }
  console.log('\n[m365-vakt] ✓ alla tre Business-tiers oförändrade mot microsoft.com — ankaret håller.');
}

main().catch((e) => { console.error('[m365-vakt] fel:', e.message); process.exit(1); });
