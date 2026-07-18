// scripts/probe-kristianstad.mjs — DIAGNOS-sond (Actions, fri egress): kör dörrens EXAKTA
// identitetskedja steg för steg per domän och visar var den brister. PROBE_DOMAINS styr listan.
import {
  sldFromDomain, matchCompany, normalizeCompanyName, foldToDomainAlphabet,
  extractNextData, extractSearchCompanies, fetchBusinessFacts, extractSiteCompanyName,
  extractOrgnrCandidates, fetchOrgnrFromWebsite,
} from '../lib/business-intel.js';

const DOMAINS = (process.env.PROBE_DOMAINS || 'bastadgruppen.com,k-fastigheter.se').split(',');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,*/*;q=0.8' };

for (const DOMAIN of DOMAINS) {
  console.log(`\n════════ ${DOMAIN} ════════`);
  const sld = sldFromDomain(DOMAIN);
  console.log('sld =', sld, '· vikt =', foldToDomainAlphabet(sld));

  // 1 · sajten: status, titel, orakelnamn, orgnr-kandidater
  let siteHtml = null;
  for (const host of [DOMAIN, `www.${DOMAIN}`]) {
    try {
      const res = await fetch(`https://${host}/`, { headers: H, redirect: 'follow', signal: AbortSignal.timeout(8000) });
      console.log(`  sajt ${host}: HTTP ${res.status}`);
      if (res.ok) { siteHtml = await res.text(); break; }
    } catch (e) { console.log(`  sajt ${host}: FEL ${e?.name}`); }
  }
  const title = (siteHtml?.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim();
  console.log('  titel:', JSON.stringify(title));
  const oracle = siteHtml ? extractSiteCompanyName(siteHtml) : null;
  console.log('  orakel:', JSON.stringify(oracle), '· viker till sld?',
    oracle ? foldToDomainAlphabet(normalizeCompanyName(oracle)) === foldToDomainAlphabet(sld) : '-');
  console.log('  orgnr på startsidan:', JSON.stringify(siteHtml ? extractOrgnrCandidates(siteHtml) : null));
  console.log('  orgnr djupsidor:', JSON.stringify(await fetchOrgnrFromWebsite(DOMAIN).catch(() => 'FEL')));

  // 2 · söket: ascii-frågan + orakelfrågan
  const qforms = [...new Set([sld, foldToDomainAlphabet(sld), sld.replace(/-/g, ' '), ...(oracle && oracle !== sld ? [oracle] : [])])];
  for (const q of qforms) {
    try {
      const r = await fetch(`https://www.allabolag.se/what/${encodeURIComponent(q)}`, { headers: H, redirect: 'follow', signal: AbortSignal.timeout(15000) });
      const companies = extractSearchCompanies(extractNextData(await r.text()));
      console.log(`  sök "${q}": ${companies.length} träffar`);
      for (const c of companies.slice(0, 6)) console.log(`    · "${c.legalName ?? c.name}" (${c.orgnr})`);
      console.log('    grinden →', JSON.stringify(matchCompany(sld, companies)?.legalName ?? null));
    } catch (e) { console.log(`  sök "${q}": FEL ${e?.name}`); }
  }

  // 3 · dörrens exakta anrop
  const facts = await fetchBusinessFacts(DOMAIN).catch((e) => ({ FEL: e?.message }));
  console.log('  fetchBusinessFacts →', JSON.stringify(facts)?.slice(0, 220));
}
