// scripts/probe-public-source.mjs — HTTP-sond som körs på GitHub Actions-runnern
// (obockerad egress, till skillnad från sandbox/WebFetch). Hämtar kandidat-API:er
// för officiell svensk/EU prisdata och dumpar status + svarsstruktur i loggen så
// vi kan skriva en korrekt parser. Inga inserts — ren upptäckt.

const CANDIDATES = [
  // SCB PxWeb v1 — metadata (GET) för elhandelspris efter kundkategori/företagsstorlek
  ['SCB v1 metadata (el)', 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/EN/EN0301/EN0301A/SSDManadElhandelpris'],
  // SCB PxWeb API v2 (beta) — tabell-lista
  ['SCB v2 tables', 'https://api.scb.se/ov0104/v2beta/api/v2/tables?lang=sv&query=elhandel&pageSize=5'],
  // Eurostat — elpriser icke-hushåll (företag), Sverige (officiell EU-statistik)
  ['Eurostat el non-household SE', 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/nrg_pc_205?format=JSON&geo=SE&lang=en&lastTimePeriod=1'],
  // elprisetjustnu.se — el spotpris (öre/kWh), öppet publikt JSON-API
  ['elprisetjustnu SE3', 'https://www.elprisetjustnu.se/api/v1/prices/2026/06-12_SE3.json'],
];

const UA = 'ArvoFlow-DataIngest/1.0 (+https://arvoflow.se; team@arvoflow.se)';

for (const [name, url] of CANDIDATES) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'application/json,text/plain,*/*' } });
    const body = await r.text();
    console.log(`\n========== ${name}`);
    console.log(`URL    : ${url}`);
    console.log(`STATUS : ${r.status} ${r.statusText}`);
    console.log(`TYPE   : ${r.headers.get('content-type')}`);
    console.log(`LENGTH : ${body.length}`);
    console.log(`BODY   :\n${body.slice(0, 2200)}`);
  } catch (err) {
    console.log(`\n========== ${name}\nURL    : ${url}\nERROR  : ${err.message}`);
  }
}
console.log('\n[probe] klar');
