// scripts/probe-public-source.mjs — HTTP-sond som körs på GitHub Actions-runnern
// (obockerad egress). Testar om runnern (ren GitHub-IP + browser-UA) når källor
// som 403:ade WebFetch, och kartlägger struktur inför adaptrar. Inga inserts.

const CANDIDATES = [
  // Tar sig runnern förbi 403 på ramavtalskällorna (per-licens-priser, hotspots)?
  ['avropa.se ramavtal (Microsoft)', 'https://www.avropa.se/ramavtal/ramavtalsomraden/programvaror-och-tjanster/Programvaror-och-tjanster/volymavtal-for-microsoft/'],
  ['adda.se ramavtal', 'https://www.adda.se/upphandling-och-ramavtal/vara-ramavtal/'],
  // SCB v2 — sök telekom/bredband-tabeller (absolutpriser?)
  ['SCB v2 sök telefoni', 'https://api.scb.se/ov0104/v2beta/api/v2/tables?lang=sv&query=telefoni&pageSize=8'],
  ['SCB v2 sök bredband', 'https://api.scb.se/ov0104/v2beta/api/v2/tables?lang=sv&query=bredband&pageSize=8'],
  // Eurostat — naturgas icke-hushåll (energi-tvilling till el)
  ['Eurostat gas non-household SE', 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_pc_203?format=JSON&geo=SE&currency=NAC&tax=X_VAT&unit=KWH&lastTimePeriod=1'],
];

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

for (const [name, url] of CANDIDATES) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html,application/json,*/*', 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    const body = await r.text();
    console.log(`\n========== ${name}`);
    console.log(`STATUS : ${r.status} ${r.statusText} · TYPE ${r.headers.get('content-type')} · LEN ${body.length}`);
    console.log(`BODY   :\n${body.slice(0, 1400)}`);
  } catch (err) {
    console.log(`\n========== ${name}\nERROR  : ${err.message}`);
  }
}
console.log('\n[probe] klar');
