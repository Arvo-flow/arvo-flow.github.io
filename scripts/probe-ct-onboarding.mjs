// scripts/probe-ct-onboarding.mjs — VARFÖR TIGER DEN VASSASTE RADEN VI ÄGER?
//
// "Er Microsoft 365 sattes upp oktober 2007" är dörrens starkaste "hur visste de det?": specifik,
// daterad, verifierbar för kunden — och den kräver varken faktura eller identitet. Flottmätningen
// (ops/diag-reveal-fleet.txt) visar att den fyrar i 2 fall av 28.
//
// Innan någon lovar att lyfta den måste vi veta VILKET av tre helt olika fel vi har:
//   A) crt.sh svarar inte i tid  → en budgetfråga, lösbar med tid eller cache
//   B) crt.sh svarar, men domänen har aldrig haft ett cert på autodiscover m.fl.
//      → en verklighetsgräns; modern M365-onboarding kräver inget sådant cert alls
//   C) certet finns men vårt fingeravtryck missar det → vår bugg, billigast att laga
//
// Skillnaden avgör om raden är en möjlighet eller ett tak. Sonden mäter alla tre och gissar inte.
import { deklarera } from '../lib/sondkontrakt.js';

deklarera({
  namn: 'probe-ct-onboarding',
  fangar: 'Om crt.sh svarar i tid, hur många certifikat domänen har, och om något av dem bär ett M365-värdnamn — per domän, med tid mätt.',
  blind: 'Certifikat som aldrig loggats i Certificate Transparency (interna CA:er, äldre utfärdare före CT-kravet 2018). En domän utan träff kan ha satt upp M365 tidigare än något publikt logg-spår visar — frånvaro av spår är inte frånvaro av händelse.',
});

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36';
// Samma lista som produktionen (lib/domain-intel.js) — sonden får inte mäta ett annat mönster än
// det som körs, då mäter den sig själv.
const M365_FINGERPRINTS = ['autodiscover', 'enterpriseregistration', 'msoid', 'lyncdiscover'];
// Kandidater UTANFÖR produktionens lista, för att skilja fall C från fall B: finns det andra
// M365-typiska värdnamn vi missar? Rena mätvärden — inget här ändrar produktionen.
const EXTRA = ['sip', 'lync', 'owa', 'mail', 'exchange', 'teams', 'sharepoint', 'outlook'];

const DOMANER = [
  'skanska.se', 'castra.se', 'seb.se', 'volvo.se', 'skatteverket.se', 'svenskfotboll.se',
  'trivector.se', 'westander.se', 'halvarsson.se', 'lekia.se', 'k-fastigheter.se',
  'sigmatechnology.com', 'initgroup.com', 'bimobject.com', 'apendo.se', 'alumni.se',
];

const rader = [];

for (const d of DOMANER) {
  // ── SONDENS EGET TYSTA FEL, RÄTTAT INNAN NÅGON SLUTSATS DRAGITS ─────────────────────────────
  // Första versionen registrerade HTTP-status och skrev aldrig ut den. Ett 429 eller 502 gav
  // rows=null och fel=null, vilket i utskriften blev "inga certifikat i registret" — ett FYND.
  // Sonden byggd för att diagnostisera en tyst tystnad hade fått en egen. Utfallet såg dessutom
  // ut som ett svar: noll cert för volvo.se, seb.se och skatteverket.se, domäner med hundratals
  // certifikat i CT. Ett resultat som inte kan vara sant ska granskas, inte rapporteras.
  const t0 = Date.now();
  let status = null, rows = null, fel = null, kropp = null;
  try {
    const r = await fetch(`https://crt.sh/?q=${encodeURIComponent('%.' + d)}&output=json`,
      { headers: { Accept: 'application/json', 'User-Agent': UA }, signal: AbortSignal.timeout(25000) });
    status = r.status;
    const text = await r.text();
    kropp = { längd: text.length, start: text.slice(0, 90).replace(/\s+/g, ' ') };
    if (r.ok) { try { rows = JSON.parse(text); } catch { fel = 'EJ JSON'; } }
    else fel = `HTTP ${r.status}`;
  } catch (e) { fel = e.name === 'TimeoutError' ? 'TIMEOUT' : String(e.message).slice(0, 40); }
  const ms = Date.now() - t0;

  if (!Array.isArray(rows)) { rader.push({ d, ms, status, fel: fel ?? 'INGET SVAR', kropp, certs: 0, prod: null, extra: [] }); continue; }

  // Exakt produktionens logik: namn ur name_value, prefixmatchning på fingeravtryck + punkt.
  let prod = null, via = null;
  const extraTraffar = new Set();
  for (const r of rows) {
    const nb = r.not_before;
    const names = (r.name_value || '').toLowerCase().split('\n');
    for (const fp of M365_FINGERPRINTS) {
      if (names.some((n) => n.startsWith(fp + '.')) && nb && (!prod || nb < prod)) { prod = nb; via = fp; }
    }
    for (const fp of EXTRA) if (names.some((n) => n.startsWith(fp + '.'))) extraTraffar.add(fp);
  }
  rader.push({ d, ms, status, fel: null, certs: rows.length, prod: prod?.slice(0, 10) ?? null, via, extra: [...extraTraffar] });
}

console.log(`\n  ${'domän'.padEnd(22)} ${'tid'.padStart(7)} ${'cert'.padStart(6)}  utfall`);
for (const r of rader) {
  const utfall = r.fel ? `✗ ${r.fel}${r.kropp ? ` · ${r.kropp.längd} tecken: «${r.kropp.start}»` : ''}`
    : r.prod ? `✓ ${r.prod} (via ${r.via})`
    : r.certs === 0 ? `— HTTP ${r.status}: registret svarade med en TOM lista (inte ett fel, inte ett fynd)`
    : `— ${r.certs} cert, inget M365-värdnamn${r.extra.length ? ` · sedda: ${r.extra.join(',')}` : ''}`;
  console.log(`  ${r.d.padEnd(22)} ${String(r.ms + 'ms').padStart(7)} ${String(r.certs).padStart(6)}  ${utfall}`);
}

const svar = rader.filter((r) => !r.fel);
const traff = rader.filter((r) => r.prod);
const tomma = svar.filter((r) => !r.prod && r.certs > 0);
const extraFinns = tomma.filter((r) => r.extra.length);
console.log(`\n  ── DIAGNOS ──`);
console.log(`  A · crt.sh svarade inte:        ${rader.length - svar.length} av ${rader.length}`);
const tomtSvar = svar.filter((r) => r.certs === 0);
if (tomtSvar.length) console.log(`      · varav HTTP 200 med tom lista: ${tomtSvar.length} — misstänk hastighetsspärr, inte tomhet`);
console.log(`  ✓ · M365-värdnamn hittat:       ${traff.length} av ${rader.length}`);
console.log(`  B · cert finns men inget M365:  ${tomma.length}`);
console.log(`  C · …varav andra M365-typiska värdnamn sågs: ${extraFinns.length}`);
if (svar.length) {
  const tider = svar.map((r) => r.ms).sort((a, b) => a - b);
  console.log(`  svarstid: median ${tider[Math.floor(tider.length / 2)]} ms · längst ${tider.at(-1)} ms (budget 25 000)`);
}
console.log('\n  Sonden mäter. Om raden går att lyfta avgörs av vilken bokstav som dominerar.');
