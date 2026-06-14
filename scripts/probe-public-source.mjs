// scripts/probe-public-source.mjs — HTTP-sond på Actions-runnern.
// Kartlägger leverantörers prissidor: vilka har server-renderat/strukturerat pris
// (JSON-LD Offer) som vanlig fetch kan läsa, vs vilka kräver Playwright (JS-render).
// Inga inserts. Mål: verifierade LISTPRISER för SMB-produkter (kall-start-benchmark).

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const PAGES = [
  ['Google Workspace (SV)', 'https://workspace.google.com/intl/sv/pricing.html'],
  ['Microsoft 365 Business (SV)', 'https://www.microsoft.com/sv-se/microsoft-365/business/compare-all-microsoft-365-business-products'],
  ['Slack pricing (SV)', 'https://slack.com/intl/sv-se/pricing'],
  ['Atlassian Jira pricing', 'https://www.atlassian.com/software/jira/pricing'],
  ['Dropbox Business (SV)', 'https://www.dropbox.com/business/plans-comparison'],
  ['Telia företag mobil', 'https://www.telia.se/foretag/mobilt/mobilabonnemang'],
  ['Tele2 företag mobil', 'https://www.tele2.se/foretag/mobilabonnemang'],
];

async function probe(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 9000);
  try {
    const r = await fetch(url, { signal: ac.signal, redirect: 'follow', headers: { 'User-Agent': UA, Accept: 'text/html,*/*', 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    const body = await r.text();
    const jsonld = [...body.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
    const priceLd = jsonld.find((j) => /"price"|priceCurrency|"offers"/i.test(j));
    const krHits = (body.match(/\d[\d\s.,]*\s*kr\b/gi) || []).slice(0, 6);
    return { status: `${r.status} ${r.statusText}`, len: body.length, finalUrl: r.url, jsonldCount: jsonld.length, hasPriceLd: !!priceLd, priceLd: priceLd ? priceLd.slice(0, 900) : null, krHits };
  } catch (e) { return { status: 'ERR ' + e.name, body: e.message }; } finally { clearTimeout(t); }
}

for (const [name, url] of PAGES) {
  const r = await probe(url);
  console.log(`\n========== ${name}`);
  console.log(`STATUS ${r.status} · LEN ${r.len ?? '-'} · finalUrl ${r.finalUrl ?? '-'}`);
  console.log(`JSON-LD: ${r.jsonldCount ?? 0} block · prisrik LD: ${r.hasPriceLd ?? false}`);
  if (r.krHits?.length) console.log(`"kr"-träffar: ${r.krHits.join(' | ')}`);
  if (r.priceLd) console.log(`PRIS-LD:\n${r.priceLd}`);
  if (r.body) console.log(`ERR: ${r.body}`);
}
console.log('\n[probe] klar');
