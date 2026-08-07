// scripts/probe-kandidatfalt.mjs — VAD VET VI OM KANDIDATERNA REDAN?
//
// Bländaren visar i dag: orgnr · namn · "närmast er domän". Live-doren (2026-08-07) fotade den
// på avida.se och avslöjade ett självmotsägande kort: fotnoten säger "ett bolagsnamn som liknar
// en domän är inte ett ägarbevis" — och raden ovanför pekar med exakt den signalen, rakt på
// Avida AB (1 anställd) när avida.se rimligen är Avida Bank AB (publ).
//
// Rätt drag är inte att NUDGA bättre utan att låta kunden KÄNNA IGEN SIG: ort, storlek, bransch.
// Men först måste vi veta vad sökträffen faktiskt bär — annars bygger vi på en gissning.
// Sonden dumpar hela nyckelmängden per kandidat. Ingen tolkning, bara fältnamn och värden.
import { extractNextData, extractSearchCompanies, foldToDomainAlphabet, normalizeCompanyName, sldFromDomain } from '../lib/business-intel.js';

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' };
const DOMANER = process.argv.slice(2).length ? process.argv.slice(2) : ['avida.se'];

for (const domain of DOMANER) {
  const sld = sldFromDomain(domain);
  console.log(`\n══════════ ${domain} (sld: ${sld}) ══════════`);
  const r = await fetch(`https://www.allabolag.se/what/${encodeURIComponent(sld)}`,
    { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(15000) });
  if (!r.ok) { console.log(`HTTP ${r.status}`); continue; }
  const bolag = extractSearchCompanies(extractNextData(await r.text())) ?? [];
  console.log(`${bolag.length} bolag i sökresultatet\n`);

  // Nyckelmängden över ALLA träffar — så att ett fält som bara vissa bolag bär inte missas.
  const nycklar = new Map();
  for (const c of bolag) for (const [k, v] of Object.entries(c ?? {})) {
    if (!nycklar.has(k)) nycklar.set(k, new Set());
    nycklar.get(k).add(v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);
  }
  console.log('── FÄLT (namn : typer : ifyllnadsgrad) ──');
  for (const [k, typer] of [...nycklar].sort()) {
    const ifyllda = bolag.filter((c) => c?.[k] !== null && c?.[k] !== undefined && c?.[k] !== '').length;
    console.log(`  ${k.padEnd(34)} ${[...typer].join('|').padEnd(18)} ${ifyllda}/${bolag.length}`);
  }

  console.log('\n── KANDIDATERNA I KLARTEXT (de som bländaren skulle visa) ──');
  const target = foldToDomainAlphabet(sld);
  for (const c of bolag.slice(0, 10)) {
    const namn = c.legalName ?? c.name;
    const exakt = foldToDomainAlphabet(normalizeCompanyName(namn)) === target;
    console.log(`\n  ${c.orgnr} ${namn}${exakt ? '   ⬅ "närmast er domän"' : ''}`);
    console.log('  ' + JSON.stringify(c).slice(0, 900));
  }
}
