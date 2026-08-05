// scripts/probe-m365-priser.mjs — SOND: vad säger Microsofts svenska prissida NU?
//
// Bakgrund (2026-08-05): verifierar-fabriken larmade att Business Basic drivit 57,40 → 66,91 kr
// medan Standard och Premium gav "(saknas)" — regexen matchade inte längre. "Saknas" är INTE drift,
// det är okänt, och okänt får aldrig bli ett kundsynligt pris (regel 3, Verifieringsplikten).
// Den här sonden dumpar sidans råa formuleringar kring varje tier så att prisboken kan uppdateras
// mot vad Microsoft FAKTISKT skriver — inte mot vad vi gissar att de skriver.
import { fetchText, stripHtml } from '../lib/verifiers/core.mjs';

const URL = 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-plans-and-pricing';

const { status, text } = await fetchText(URL, { timeoutMs: 25000 });
console.log('HTTP', status, '· html-längd', text.length);
if (status !== 200) process.exit(1);

const flat = stripHtml(text);
console.log('flat-längd', flat.length);

// 1) Varje förekomst av "Business <tier>" med efterföljande kontext — där priset borde stå.
for (const tier of ['Basic', 'Standard', 'Premium']) {
  const re = new RegExp(`Business ${tier}[\\s\\S]{0,220}`, 'gi');
  const hits = [...flat.matchAll(re)].slice(0, 4);
  console.log(`\n──── Business ${tier} · ${hits.length} förekomst(er) ────`);
  hits.forEach((h, i) => console.log(`  [${i}] ${JSON.stringify(h[0].replace(/\s+/g, ' ').trim())}`));
}

// 2) Alla "NN,NN kr"-tal med kontext — fångar priser även om tier-orden formulerats om.
console.log('\n──── Alla kr-belopp med kontext ────');
const prisRe = /(.{0,90}?)(\d[\d ]*[.,]\d{2})\s*kr([\s\S]{0,90})/g;
const sedda = new Set();
for (const m of flat.matchAll(prisRe)) {
  const rad = `${m[2]} kr :: …${m[1].replace(/\s+/g, ' ').trim()} ⟦${m[2]} kr⟧ ${m[3].replace(/\s+/g, ' ').trim()}…`;
  if (sedda.has(rad)) continue;
  sedda.add(rad);
  console.log('  ' + rad);
  if (sedda.size >= 40) break;
}
