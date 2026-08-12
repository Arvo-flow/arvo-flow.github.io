// scripts/probe-m365-enterprise.mjs — FINNS DET EN PUBLIK SIDA SOM BÄR E3/E5-PRISET?
//
// Fyndet: `lib/verifiers/m365.mjs` läser tre planer — Basic, Standard, Premium. E3 och E5 står i
// prisboken (416,77 och 641,18 kr) men läses av INGEN verifierare. Prisauditen visar ändå grönt,
// därför att dess täckningskontroll är LEVERANTÖRSNIVÅ: nyckeln 'e3' mappas till 'microsoft',
// m365-verifieraren finns, alltså "täckt". En kontroll som mäter på fel granularitet.
//
// Det är den dyraste sortens hål vi känner till: bibelns egen NMIT-obduktion visar att ett
// felaktigt E3-ankare tog en utlovad besparing från 24 569 kr/år till 2 248 kr. Enterprise-ankaren
// är de största talen i boken och de mest obevakade.
//
// Innan en verifierare byggs måste adressen BEVISAS, inte gissas (Verifieringsplikten p.1–2).
// Sonden prövar kandidatadresser och redovisar vilka som svarar och bär ett pris i rätt kontext.
import { deklarera } from '../lib/sondkontrakt.js';

deklarera({
  namn: 'probe-m365-enterprise',
  fangar: 'Om Microsoft publicerar E3/E5-priset på en publik svensk sida, och exakt vilken text priset står i.',
  blind: 'Sidor som kräver inloggning, geo-styrs bort från en GitHub-runner, eller renderar priset med JS efter interaktion. Ett uteblivet svar betyder "sonden såg det inte", aldrig "priset finns inte".',
});

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const KANDIDATER = [
  'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing',
  'https://www.microsoft.com/sv-se/microsoft-365/enterprise/e3',
  'https://www.microsoft.com/sv-se/microsoft-365/enterprise/e5',
  'https://www.microsoft.com/sv-se/microsoft-365/enterprise/office365-e3',
  'https://www.microsoft.com/sv-se/microsoft-365/business/compare-all-microsoft-365-business-products',
  'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing?market=se',
];

// Talen vi letar efter är prisbokens nuvarande ankare. Att de STÅR på sidan bevisar adressen;
// sonden kurerar aldrig ett nytt pris — det är verifierarens jobb, med sina egna grindar.
const ANKARE = [['E3', '416,77'], ['E5', '641,18']];

for (const url of KANDIDATER) {
  console.log(`\n· ${url}`);
  let html;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,*/*' }, redirect: 'follow', signal: AbortSignal.timeout(25000) });
    if (!r.ok) { console.log(`    → HTTP ${r.status}`); continue; }
    html = await r.text();
  } catch (e) { console.log(`    → ${String(e.message).slice(0, 60)}`); continue; }

  const flat = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log(`    → ${html.length} tecken html · ${flat.length} tecken text`);

  for (const [namn, tal] of ANKARE) {
    const i = flat.indexOf(tal);
    console.log(i >= 0
      ? `    [${namn}] ${tal} FINNS: «…${flat.slice(Math.max(0, i - 90), i + 60).trim()}…»`
      : `    [${namn}] ${tal} syns inte i texten`);
  }
  // Vilka kr-priser står över huvud taget på sidan? Underlag för att se om sidan är prissatt alls.
  const priser = [...new Set((flat.match(/\d[\d ]*,\d{2}\s*kr/g) ?? []).map((s) => s.trim()))].slice(0, 12);
  console.log(`    kr-priser på sidan: ${priser.length ? priser.join(' · ') : '(inga)'}`);
}

console.log('\nSonden bevisar adresser. Ett pris blir ankare först när en verifierare vaktar det.');
