// scripts/probe-identitet-tackning.mjs — MÄTNINGEN: vad kostar tystnaden, och vad var någonsin sant?
//
// Grundaren frågade: hur många procent av kunderna tappar vi i automatisk magi om vi klipper
// botmurade sajter rakt av? Den frågan går att besvara på ett sätt som lurar oss båda — genom att
// bara räkna TÄCKNING. Ett kort som namnger fel bolag räknas då som en vinst.
//
// Därför mäter sonden TVÅ saker mot FACIT (leads-filens människoverifierade orgnr):
//   1 · TÄCKNING  — hur ofta namnger vi över huvud taget ett bolag?
//   2 · SANNING   — hur ofta är det RÄTT bolag?
// Först då går policyn att besluta. Avida-läxan: en falsk singelträff ser ut som en vinst i
// täckningssiffran och är en katastrof i verkligheten.
//
// Kör med den RIKTIGA koden (fetchBusinessFacts + de tre vägarna var för sig), aldrig en modell.
import { readFileSync } from 'node:fs';
import {
  sldFromDomain, normalizeOrgnr, extractOrgnrCandidates, fetchOrgnrFromWebsite,
  extractSiteCompanyName, foldToDomainAlphabet, normalizeCompanyName, fetchBusinessFacts,
} from '../lib/business-intel.js';

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' };
const FIL = process.argv[2] ?? 'leads/stockholm-leads.csv';

// Läs facit: bolagsnamn, domän, människoverifierat orgnr. Rader med '*' = otrolig domän → märks.
const rader = readFileSync(FIL, 'utf8').split('\n')
  .filter((r) => r.trim() && !r.startsWith('#') && !r.startsWith('company_name'))
  .map((r) => {
    const [company_name, domain, org_nr] = r.split(',');
    return {
      namn: company_name?.trim(),
      domain: (domain ?? '').trim().replace(/\*$/, ''),
      osaker: (domain ?? '').includes('*'),
      facit: normalizeOrgnr(org_nr ?? ''),
    };
  })
  .filter((x) => x.domain && x.facit);

console.log(`FACIT: ${rader.length} bolag med människoverifierat orgnr ur ${FIL}\n`);

const ut = [];
for (const rad of rader) {
  const sld = sldFromDomain(rad.domain);

  // Sajtens nåbarhet — den avgör om väg 1 och 2 alls kan användas.
  let siteHtml = null;
  for (const host of [rad.domain, `www.${rad.domain}`]) {
    try {
      const res = await fetch(`https://${host}/`, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(8000) });
      if (res.ok) { siteHtml = await res.text(); break; }
    } catch { /* nästa host */ }
  }
  const nabar = !!siteHtml;

  // Vilken väg KAN fyra? (samma ordning som fetchBusinessFacts)
  let vag = '—';
  if (nabar) {
    let cands = extractOrgnrCandidates(siteHtml);
    if (cands.length === 0) {
      const deep = await fetchOrgnrFromWebsite(rad.domain).catch(() => null);   // sondvakt-ok: en domän som inte går att läsa ÄR utfallet sonden mäter
      if (deep) cands = [deep];
    }
    if (cands.length === 1) vag = '1 · orgnr på sajten';
    else {
      const namn = extractSiteCompanyName(siteHtml, sld);
      if (namn && foldToDomainAlphabet(normalizeCompanyName(namn)) === foldToDomainAlphabet(sld)) vag = '2 · stavningsorakel';
      else vag = '3 · sökform';
    }
  } else {
    vag = '3 · sökform (sajt oåtkomlig)';
  }

  // Det SKARPA utfallet.
  const facts = await fetchBusinessFacts(rad.domain).catch(() => null);   // sondvakt-ok: en domän utan bolagsfakta ÄR utfallet sonden mäter
  const traff = facts?.orgnr ? normalizeOrgnr(facts.orgnr) : null;
  const utfall = !traff ? 'TYST' : (traff === rad.facit ? 'RÄTT' : 'FEL');

  ut.push({ ...rad, nabar, vag, traff, namngivet: facts?.legalName ?? null, utfall });
  console.log(`${utfall.padEnd(5)} ${rad.domain.padEnd(26)} ${nabar ? 'sajt✓' : 'sajt✗'}  ${vag.padEnd(28)} ${facts?.legalName ?? '(inget bolag)'}`);
  if (utfall === 'FEL') console.log(`      ⚠ facit ${rad.facit} (${rad.namn}) · vi sa ${traff}`);
}

// ── SAMMANSTÄLLNING ─────────────────────────────────────────────────────────
const n = ut.length;
const p = (x) => `${x} (${n ? Math.round((x / n) * 100) : 0} %)`;
const ratt = ut.filter((x) => x.utfall === 'RÄTT');
const fel = ut.filter((x) => x.utfall === 'FEL');
const tyst = ut.filter((x) => x.utfall === 'TYST');
const murad = ut.filter((x) => !x.nabar);

console.log(`\n══════════ SAMMANSTÄLLNING · ${n} bolag ══════════`);
console.log(`  RÄTT bolag namngivet .......... ${p(ratt.length)}`);
console.log(`  FEL bolag namngivet ........... ${p(fel.length)}   ← Avida-klassen`);
console.log(`  TYST .......................... ${p(tyst.length)}`);
console.log(`  Sajt oåtkomlig (botmurad) ..... ${p(murad.length)}`);

// Frågan som ställdes: vad kostar det att klippa botmurade sajter?
const rattMurad = ratt.filter((x) => !x.nabar).length;
const felMurad = fel.filter((x) => !x.nabar).length;
console.log(`\n── OM VI KLIPPER BOTMURADE SAJTER ──`);
console.log(`  Förlorade RÄTTA namngivningar . ${rattMurad} av ${ratt.length} (${ratt.length ? Math.round((rattMurad / ratt.length) * 100) : 0} % av magin)`);
console.log(`  Borttagna FELAKTIGA ............ ${felMurad} av ${fel.length}`);
console.log(`  Netto på hela populationen ..... −${rattMurad} sanna, −${felMurad} lögner`);

// Frågan som BORDE ställas: hur ren är magin i dag?
const namngivna = ratt.length + fel.length;
console.log(`\n── HUR SANN ÄR MAGIN I DAG? ──`);
console.log(`  Av ${namngivna} namngivna bolag är ${fel.length} FEL — felkvot ${namngivna ? Math.round((fel.length / namngivna) * 100) : 0} %`);
console.log(`  En falsk singelträff räknas som TÄCKNING men är en KATASTROF hos kunden.`);

console.log('\n── PER VÄG (var uppstår felen?) ──');
for (const v of [...new Set(ut.map((x) => x.vag))]) {
  const g = ut.filter((x) => x.vag === v);
  const r = g.filter((x) => x.utfall === 'RÄTT').length;
  const f = g.filter((x) => x.utfall === 'FEL').length;
  console.log(`  ${v.padEnd(30)} ${g.length} st · rätt ${r} · fel ${f} · tyst ${g.length - r - f}`);
}
