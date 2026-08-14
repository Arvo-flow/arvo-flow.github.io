// scripts/probe-identitet.mjs — SOND: VILKEN av de tre identitetsvägarna fyrade?
//
// Avida-kortet visade "Avida AB · 1,9 mkr · 1 anställd" för avida.se. Men avida.se ägs sannolikt
// av Avida Finans AB — en betydligt större aktör. Om kortet namngett fel juridisk person är det
// inte ett layoutfel, det är identitetsinvarianten som brustit.
//
// HYPOTESEN (min, ej bevisad): bindningen är NAMNSTAVNING, inte ägarskap. "Avida Finans AB" viker
// till "avidafinans" och matchar inte "avida"; det enda namn som viker till "avida" är ett annat
// bolag. Grinden ser då EXAKT EN träff och fyrar — en FALSK SINGELTRÄFF, farligare än en tvetydig,
// eftersom grinden rapporterar en säkerhet den inte förtjänat.
//
// Sonden kör de tre vägarna var för sig med den RIKTIGA koden (aldrig en modell av den) och
// redovisar vilken som gav svaret. Först då vet vi om hålet finns — och var.
import {
  sldFromDomain, foldToDomainAlphabet, normalizeCompanyName, matchCompany,
  extractOrgnrCandidates, extractSiteCompanyName, fetchOrgnrFromWebsite,
  fetchBusinessFactsByOrgnr, fetchBusinessFacts, extractNextData, extractSearchCompanies,
} from '../lib/business-intel.js';

const DOMANER = (process.argv.slice(2).length ? process.argv.slice(2) : ['avida.se']);
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36' };

const kort = (o) => JSON.stringify(o, null, 1)?.slice(0, 700);

for (const domain of DOMANER) {
  const sld = sldFromDomain(domain);
  console.log(`\n══════════════ ${domain} ══════════════`);
  console.log(`sld: ${sld} · vikt: ${foldToDomainAlphabet(sld)}`);

  // ── Hämta sajten precis som fetchBusinessFacts gör ──────────────────────────
  let siteHtml = null, hamtadFran = null;
  for (const host of [domain, `www.${domain}`]) {
    try {
      const res = await fetch(`https://${host}/`, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(8000) });
      if (res.ok) { siteHtml = await res.text(); hamtadFran = host; break; }
    } catch (e) { console.log(`  sajt ${host}: ${e.name}`); }
  }
  console.log(`sajt: ${hamtadFran ?? '(oåtkomlig)'} · ${siteHtml?.length ?? 0} tecken`);

  // ── VÄG 1: orgnr på bolagets egen sajt (starkast bindning) ──────────────────
  console.log('\n── VÄG 1 · orgnr på sajten ──');
  let vag1 = null;
  if (siteHtml) {
    let cands = extractOrgnrCandidates(siteHtml);
    console.log(`  startsidan: ${cands.length} orgnr-kandidat(er) ${kort(cands)}`);
    if (cands.length === 0) {
      const deep = await fetchOrgnrFromWebsite(domain).catch(() => null);   // sondvakt-ok: en domän som inte går att läsa ÄR utfallet sonden mäter
      console.log(`  djupläsning (/kontakt, /om-oss): ${deep ?? '(inget)'}`);
      if (deep) cands = [deep];
    }
    if (cands.length === 1) {
      vag1 = await fetchBusinessFactsByOrgnr(cands[0]).catch(() => null);   // sondvakt-ok: ett orgnr utan träff ÄR utfallet sonden mäter
      console.log(`  → uppslag på ${cands[0]}: ${vag1 ? `${vag1.legalName} · ${vag1.revenueTkr} tkr · ${vag1.employees} anst` : '(ingen fakta)'}`);
    } else if (cands.length > 1) {
      console.log('  → FLERA kandidater — vägen ger tystnad (rätt beteende)');
    }
  }
  console.log(`  VÄG 1 utfall: ${vag1 ? 'FYRADE' : 'tyst'}`);

  // ── VÄG 2: stavningsoraklet (sajtens eget namn) ─────────────────────────────
  console.log('\n── VÄG 2 · stavningsoraklet ──');
  let vag2namn = null;
  if (siteHtml) {
    vag2namn = extractSiteCompanyName(siteHtml, sld);
    const viker = vag2namn && foldToDomainAlphabet(normalizeCompanyName(vag2namn)) === foldToDomainAlphabet(sld);
    console.log(`  sajtens namn: ${vag2namn ? JSON.stringify(vag2namn) : '(hittades ej)'}`);
    console.log(`  viker till samma som domänen? ${viker ? 'JA → vägen används' : 'NEJ → vägen hoppas över'}`);
  }

  // ── VÄG 3: sökformerna — HÄR bor den misstänkta falska singelträffen ────────
  console.log('\n── VÄG 3 · sökformerna (vad ser grinden?) ──');
  const former = [...new Set([sld, foldToDomainAlphabet(sld), sld.replace(/-/g, ' ')])];
  for (const q of former) {
    try {
      const r = await fetch(`https://www.allabolag.se/what/${encodeURIComponent(q)}`,
        { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(12000) });
      if (!r.ok) { console.log(`  "${q}": HTTP ${r.status}`); continue; }
      const bolag = extractSearchCompanies(extractNextData(await r.text())) ?? [];
      console.log(`  "${q}": ${bolag.length} bolag i sökresultatet`);
      // ALLA kandidater med deras vikning — så att en falsk singelträff syns svart på vitt.
      bolag.slice(0, 12).forEach((c) => {
        const namn = c.legalName ?? c.name;
        const v = foldToDomainAlphabet(normalizeCompanyName(namn));
        const traff = v === foldToDomainAlphabet(sld) ? '  ⬅ EXAKT VIKT MATCH' : '';
        console.log(`      ${String(c.orgnr ?? '—').padEnd(12)} ${namn}${traff}`);
        if (traff) console.log(`                   vikt: "${v}"`);
      });
      const m = matchCompany(sld, bolag, { allowPrefix: q === sld });
      console.log(`      → grinden: ${m ? `SLÄPPER ${m.legalName ?? m.name} (${m.orgnr})` : 'tystnad'}`);
    } catch (e) { console.log(`  "${q}": ${e.name}`); }
  }

  // ── Vad blir det SKARPA svaret? ────────────────────────────────────────────
  console.log('\n── SKARPT UTFALL (fetchBusinessFacts) ──');
  const facts = await fetchBusinessFacts(domain).catch((e) => ({ fel: e.message }));
  console.log('  ' + (facts ? kort(facts) : '(null — inget bolag namnges, tystnad)'));
}
