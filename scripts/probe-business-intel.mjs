// scripts/probe-business-intel.mjs — RESEARCH-sond v3 (Actions, fri egress).
//
// v2 bevisade: allabolag serverar hela affärsbilden (omsättning/resultat/anställda, källa
// Bolagsverket/UC) server-side i __NEXT_DATA__, oblockerat, på orgnr-URL. v3 löser de två
// återstående byggfrågorna INNAN lib-koden skrivs:
//
//  A · DOMÄN → ORGNR: dörren börjar med en mejldomän. Kan allabolag-SÖKET lösa domänens
//      SLD ("apendo") till rätt bolag ENTYDIGT? (Fel bolags omsättning = integritetskatastrof —
//      vi behöver se träfflistans struktur för att designa en konservativ matchningsgrind.)
//  B · PARSNING-KONTRAKTET: exakt var i __NEXT_DATA__ bor revenue/profit/employees/historik?
//      Skriver ut JSON-vägarna så lib/business-intel.js byggs mot verkligheten, inte gissning.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,*/*;q=0.8' };

function nextData(html) {
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json"[^>]*>([\s\S]*?)<\/script>/);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}

// Hitta alla JSON-vägar vars nyckel matchar — så vi ser VAR datan bor.
function findPaths(obj, keyRe, path = '', out = [], depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 9 || out.length > 40) return out;
  for (const [k, v] of Object.entries(obj)) {
    const p = path ? `${path}.${k}` : k;
    if (keyRe.test(k) && (typeof v !== 'object' || v === null)) out.push(`${p} = ${JSON.stringify(v)?.slice(0, 90)}`);
    if (typeof v === 'object') findPaths(v, keyRe, p, out, depth + 1);
  }
  return out;
}

async function get(url) {
  const res = await fetch(url, { headers: H, redirect: 'follow', signal: AbortSignal.timeout(15000) });
  const body = await res.text();
  return { status: res.status, url: res.url, body };
}

console.log('═══════ A · DOMÄN → ORGNR: allabolag-sökets träffstruktur ═══════');
// SLD ur domän, som dörren skulle göra: apendo.se → "apendo"
for (const q of ['apendo', 'lynxeye', 'westander', 'netigate']) {
  try {
    const r = await get(`https://www.allabolag.se/what/${encodeURIComponent(q)}`);
    console.log(`\n▶ sök "${q}" → HTTP ${r.status} · ${r.url} · längd ${r.body.length}`);
    const nd = nextData(r.body);
    if (!nd) { console.log('   ingen __NEXT_DATA__ — annan sökväg krävs'); continue; }
    // leta träfflistor: nycklar som ser ut som resultat
    const hits = findPaths(nd, /^(legalName|orgnr|organisationNumber|companyId|name)$/i).slice(0, 14);
    console.log(hits.length ? hits.map((h) => `   ${h}`).join('\n') : '   inga uppenbara träffält — dumpar toppnycklar:');
    if (!hits.length) console.log('   props-nycklar:', Object.keys(nd.props?.pageProps ?? nd.props ?? {}).join(', '));
  } catch (e) { console.log(`▶ sök "${q}": FEL ${e.message}`); }
}

console.log('\n═══════ B · PARSNING-KONTRAKTET: var bor siffrorna i bolagssidans __NEXT_DATA__? ═══════');
try {
  const r = await get('https://www.allabolag.se/5564374840');   // Apendo
  console.log(`▶ Apendo-sidan → HTTP ${r.status} · ${r.url}`);
  const nd = nextData(r.body);
  if (nd) {
    console.log('  props.pageProps-nycklar:', Object.keys(nd.props?.pageProps ?? {}).join(', '));
    for (const [label, re] of [
      ['revenue',   /^revenue$/i],
      ['profit',    /^profit$/i],
      ['employees', /^employees$/i],
      ['orgnr',     /^(orgnr|organisationNumber)$/i],
      ['legalName', /^legalName$/i],
      ['år/period', /^(year|period|companyAccountsLastUpdatedDate)$/i],
    ]) {
      const paths = findPaths(nd, re).slice(0, 6);
      console.log(`  ${label}:`);
      for (const p of paths) console.log(`     ${p}`);
    }
  } else console.log('  ingen __NEXT_DATA__');
} catch (e) { console.log('▶ Apendo-sidan: FEL', e.message); }
console.log('\n═══════ KLART ═══════');
