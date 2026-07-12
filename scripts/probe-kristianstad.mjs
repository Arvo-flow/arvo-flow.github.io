// scripts/probe-kristianstad.mjs — DIAGNOS-sond (Actions, fri egress) för Kristianstad-fallet:
// varför saknar kristianstadsmaleri.se sitt bokslutsfynd? Kör dörrens EXAKTA väg steg för steg
// (samma kod, inte en modell av den) och skriver ut var kedjan brister:
//   1. allabolag-SÖKET på domänens SLD — vad returnerar träfflistan?
//   2. matchningsgrinden (med å/ä/ö-vikningen) — matchar den?
//   3. bolagssidan — extraheras fakta?
//   4. hela revealFromDomain — vilka fynd landar?
import {
  sldFromDomain, matchCompany, normalizeCompanyName, foldToDomainAlphabet,
  extractNextData, extractSearchCompanies, extractCompanyFacts, fetchBusinessFacts,
  fetchOrgnrFromWebsite, fetchBusinessFactsByOrgnr,
} from '../lib/business-intel.js';
import { revealFromDomain } from '../lib/domain-intel.js';

const DOMAIN = process.env.PROBE_DOMAIN || 'kristianstadsmaleri.se';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,*/*;q=0.8' };

const sld = sldFromDomain(DOMAIN);
console.log('═══ 1 · SÖKET ═══  sld =', sld, ' vikt =', foldToDomainAlphabet(sld));
const sRes = await fetch(`https://www.allabolag.se/what/${encodeURIComponent(sld)}`,
  { headers: H, redirect: 'follow', signal: AbortSignal.timeout(15000) });
console.log('status:', sRes.status, '→', sRes.url);
const companies = extractSearchCompanies(extractNextData(await sRes.text()));
console.log(`träffar: ${companies.length}`);
for (const c of companies.slice(0, 10)) {
  const norm = normalizeCompanyName(c.legalName ?? c.name);
  console.log(`  · "${c.legalName ?? c.name}" (${c.orgnr}) → norm "${norm}" → vikt "${foldToDomainAlphabet(norm)}"`);
}

console.log('═══ 2 · GRINDEN ═══');
const match = matchCompany(sld, companies);
console.log('matchCompany →', match ? `${match.legalName} (${match.orgnr})` : 'null');

if (match) {
  console.log('═══ 3 · BOLAGSSIDAN ═══');
  const cRes = await fetch(`https://www.allabolag.se/${encodeURIComponent(match.orgnr)}`,
    { headers: H, redirect: 'follow', signal: AbortSignal.timeout(15000) });
  console.log('status:', cRes.status);
  console.log('fakta:', JSON.stringify(extractCompanyFacts(extractNextData(await cRes.text()))));
}

console.log('═══ 3a · ORGNR-UR-SAJTEN (nya vägen) ═══');
const siteOrgnr = await fetchOrgnrFromWebsite(DOMAIN);
console.log('orgnr på bolagets egen sajt →', siteOrgnr);
if (siteOrgnr) console.log('allabolag by orgnr →', JSON.stringify(await fetchBusinessFactsByOrgnr(siteOrgnr)));

console.log('═══ 3b · fetchBusinessFacts (dörrens exakta anrop) ═══');
console.log(JSON.stringify(await fetchBusinessFacts(DOMAIN)));

console.log('═══ 4 · HELA AVSLÖJANDET ═══');
const r = await revealFromDomain(DOMAIN);
for (const f of r.findings) console.log(`  [${f.kind}] ${f.title}`);
