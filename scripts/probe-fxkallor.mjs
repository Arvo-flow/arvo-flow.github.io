#!/usr/bin/env node
// scripts/probe-fxkallor.mjs — VILKEN ADRESS SVARAR MED EN VÄXELKURS?
//
// ══ VARFÖR (2026-09-10) ════════════════════════════════════════════════════════════════════
// Produktionsloggen, efter att skäl-loggningen infördes:
//     [pricing] Live FX-hämtning misslyckades — riksbank: HTTP 400 · ecb: HTTP 404
//
// Båda våra endpoints är fel. Det var osynligt i fyra dygn eftersom två `catch { /* fall
// through */ }` gjorde nät-fel, 404 och ändrad svarsform omöjliga att skilja åt. Fyra rader
// loggning gav svaret på första körningen.
//
// MEN ADRESSERNA ÄR INTE MÄTTA. Att byta URL på en gissning vore samma fel en nivå upp — och
// sandlådan blockerar egress, så mätningen måste ske i GitHub Actions. Sonden provar varje
// kandidat, redovisar EXAKT vad den svarar (status, form, och det tal vi skulle läsa), och
// ändrar ingenting. Beslutet fattas av en människa på sondens utfall, aldrig av sonden.
//
// Kör: via .github/workflows/probe-fxkallor.yml (HTTP-egress finns bara där)
import { deklarera } from '../lib/sondkontrakt.js';

deklarera({
  namn: 'probe-fxkallor',
  fangar: 'Vilka valutakurs-endpoints som faktiskt svarar, med vilken status, vilken svarsform '
    + 'och vilket tal — så att ett URL-byte vilar på en avläsning i stället för på en gissning.',
  blind: 'Att en adress svarar i dag betyder inte att den är stabil, officiell eller fri att '
    + 'använda. Sonden mäter TILLGÄNGLIGHET och FORM, aldrig källans auktoritet eller villkor — '
    + 'en tredjeparts aggregator kan svara perfekt och ändå vara fel källa för en tjänst som '
    + 'säger «verifierat». Den mäter heller inte om talet är RÄTT: två källor som säger samma '
    + 'sak är det närmaste ett andra vittne sonden kommer.',
});

// Kandidaterna. Riksbanken bytte API-generation (SWEA v1 → nya portalen); ECB:s SDMX-väg har
// flera former. Vi provar dem alla och låter svaret avgöra — ingen adress är förhandsvald.
const KANDIDATER = [
  ['riksbank-swea-v1 (nuvarande)', 'https://api.riksbank.se/swea/v1/observations/SEKUSDPMI/latest'],
  ['riksbank-swea-v1-latest-alt', 'https://api.riksbank.se/swea/v1/Observations/Latest/SEKUSDPMI'],
  ['riksbank-swea-v1-crossrates', 'https://api.riksbank.se/swea/v1/CrossRates/SEKUSDPMI/SEKUSDPMI/2026-09-01'],
  ['ecb-sdmx-jsondata (nuvarande)', 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD.SEK.SP00.A?lastNObservations=1&format=jsondata'],
  ['ecb-sdmx-csv', 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD.SEK.SP00.A?lastNObservations=1&format=csvdata'],
  ['ecb-eur-sek-sdmx', 'https://data-api.ecb.europa.eu/service/data/EXR/D.SEK.EUR.SP00.A?lastNObservations=1&format=jsondata'],
  ['frankfurter-ecb-spegel', 'https://api.frankfurter.app/latest?from=USD&to=SEK'],
];

console.log('\n=== FX-KÄLLOR · vad svarar de FAKTISKT? ===\n');
for (const [namn, url] of KANDIDATER) {
  let rad = `${namn.padEnd(32)} `;
  try {
    const t0 = Date.now();
    const res = await fetch(url, { signal: AbortSignal.timeout(8000), headers: { Accept: 'application/json' } });
    const ms = Date.now() - t0;
    const txt = await res.text();
    rad += `HTTP ${res.status}  ${String(ms).padStart(4)} ms  ${String(txt.length).padStart(6)} B  `;
    if (res.ok) {
      // Formen redovisas, aldrig tolkas: nästa läsare ska se vad som faktiskt kom tillbaka.
      let form = '(ej JSON)';
      try {
        const d = JSON.parse(txt);
        form = Array.isArray(d) ? `array[${d.length}]` : `nycklar: ${Object.keys(d).slice(0, 5).join(',')}`;
      } catch { /* csv eller annat — texten redovisas nedan i stället */ }
      rad += form;
      console.log(rad);
      console.log(`${' '.repeat(34)}└ ${txt.slice(0, 160).replace(/\s+/g, ' ')}`);
      continue;
    }
    console.log(rad);
  } catch (err) {
    // Ett fel är ett MÄTVÄRDE här, inte ett avbrott: «timeout» och «404» kräver olika åtgärder.
    console.log(`${rad}FEL  ${err.name === 'TimeoutError' ? 'timeout 8s' : err.message.slice(0, 60)}`);
  }
}
console.log('\nSonden ändrar ingenting. Den visar vad varje adress svarar — beslutet är en människas.');
console.log('Kravet på en ny källa: ett tal i bandet 5–20 SEK/USD, ett DATUM, och en form vi kan läsa\ndeterministiskt. Utan datum är kursen «ingen kurs» enligt lib/fxfarskhet.js.');
