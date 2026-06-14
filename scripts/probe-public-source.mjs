// scripts/probe-public-source.mjs — HTTP-sond på Actions-runnern (obockerad egress).
// Kartlägger officiella/öppna priskällor inför adaptrar. Timeout per request så
// inget hänger. Inga inserts.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function get(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 9000);
  try {
    const r = await fetch(url, { signal: ac.signal, headers: { 'User-Agent': UA, Accept: 'application/json,text/html,*/*', 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    const body = await r.text();
    return { status: `${r.status} ${r.statusText}`, type: r.headers.get('content-type'), len: body.length, body };
  } catch (e) { return { status: 'ERR ' + e.name, body: e.message }; } finally { clearTimeout(t); }
}

async function post(url, json) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 9000);
  try {
    const r = await fetch(url, { signal: ac.signal, method: 'POST', headers: { 'User-Agent': UA, 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(json) });
    const body = await r.text();
    return { status: `${r.status} ${r.statusText}`, type: r.headers.get('content-type'), len: body.length, body };
  } catch (e) { return { status: 'ERR ' + e.name, body: e.message }; } finally { clearTimeout(t); }
}

const TASKS = [
  // Microsofts officiella retail-priser (Azure + ev. M365-SKU:er), SEK, ingen auth
  ['Azure Retail Prices (SEK)', () => get("https://prices.azure.com/api/retail/prices?currencyCode='SEK'&$top=5")],
  ['Azure Retail Prices (M365-filter)', () => get("https://prices.azure.com/api/retail/prices?currencyCode='SEK'&$filter=" + encodeURIComponent("contains(productName,'Microsoft 365')") + "&$top=5")],
  // Kommunal CKAN — Helsingborg öppna data, leverantörsbetalningar
  ['Helsingborg CKAN (leverantör)', () => get('https://catalog.helsingborg.io/api/3/action/package_search?q=leverant%C3%B6r&rows=5')],
  // TED v3 — EU-upphandlingar, svenska mjukvarukontrakt (CPV 48000000)
  ['TED v3 search (SE software)', () => post('https://api.ted.europa.eu/v3/notices/search', { query: "classification-cpv IN (48000000) AND buyer-country IN (SWE)", fields: ['publication-number', 'notice-title', 'winner-name', 'tender-value'], limit: 3 })],
  // Adda — rätt ramavtals-listningssida (reachable, ej blockerad)
  ['Adda ramavtal-listning', () => get('https://www.adda.se/upphandling-och-ramavtal/hitta-ramavtal-och-tjanster/')],
];

for (const [name, fn] of TASKS) {
  const r = await fn();
  console.log(`\n========== ${name}`);
  console.log(`STATUS : ${r.status} · TYPE ${r.type ?? '-'} · LEN ${r.len ?? '-'}`);
  console.log(`BODY   :\n${(r.body || '').slice(0, 1600)}`);
}
console.log('\n[probe] klar');
