#!/usr/bin/env node
// TILLFÄLLIG GRANSKNINGSSOND — raderas efter körning. Testar den FAKTISKA parsningslogiken i
// fetchLiveEurSekRate mot ECB:s riktiga svar, för att se om dataSets/series/observations-vägen
// verkligen ger ett brukbart tal nu när D.SEK.EUR.SP00.A svarar 200 (tidigare 404, aldrig nådd).
const ECB_EUR_URL = 'https://data-api.ecb.europa.eu/service/data/EXR/D.SEK.EUR.SP00.A?lastNObservations=1&format=jsondata';

const res = await fetch(ECB_EUR_URL, { signal: AbortSignal.timeout(8000) });
console.log('STATUS', res.status);
const data = await res.json();
console.log('FULL JSON:');
console.log(JSON.stringify(data, null, 2).slice(0, 4000));

const obs = data?.dataSets?.[0]?.series?.['0:0:0:0:0']?.observations;
console.log('\n--- PARSAT MED PRODUKTIONSLOGIKEN ---');
console.log('obs finns:', !!obs);
if (obs) {
  const lastKey = Object.keys(obs).sort().at(-1);
  const rate = parseFloat(obs[lastKey]?.[0]);
  console.log('lastKey:', lastKey, 'rate:', rate, 'inom band 8-16:', rate > 8 && rate < 16);
} else {
  console.log('INGEN OBSERVATION HITTAD PÅ NYCKELN 0:0:0:0:0 — visar dataSets/series-strukturen:');
  console.log('series-nycklar:', Object.keys(data?.dataSets?.[0]?.series ?? {}));
}
