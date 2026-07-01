// scripts/probe-business-intel.mjs — RESEARCH-sond v2 (Actions, fri egress).
//
// v1-läxan: detektorn strippade <script> INNAN den letade omsättning — men allabolag/proff är
// SPA:er som bär datan SOM JSON i script-taggar. v2 söker i RÅ HTML, dumpar utdrag runt träffarna
// (så vi SER exakt vad som finns), skriver ut slutlig URL efter redirect, och kör crt.sh med retry.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,application/json;q=0.9,*/*;q=0.8' };

const COMPANIES = [
  { name: 'Apendo AB',   orgnr: '556437-4840' },
  { name: 'Lynxeye AB',  orgnr: '556569-0087' },
];

// Signaler i RÅ text (inkl. JSON i script): svenska + vanliga JSON-fältnamn
const SIGNALS = [/nettoomsättning/i, /omsättning/i, /"revenue"/i, /netSales/i, /rörelseresultat/i, /"profit/i, /resultat efter finansnetto/i, /antal anställda/i, /"employees"/i];

function excerpts(raw, re, max = 2) {
  const out = [];
  let m, rx = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  while ((m = rx.exec(raw)) && out.length < max) {
    out.push(raw.slice(Math.max(0, m.index - 70), m.index + 130).replace(/\s+/g, ' '));
  }
  return out;
}

async function probeRaw(label, url, opts = {}) {
  try {
    const res = await fetch(url, { headers: H, redirect: 'follow', signal: AbortSignal.timeout(15000), ...opts });
    const raw = await res.text();
    console.log(`  ${res.ok ? '✓' : '✗'} HTTP ${res.status} · ${label} · slutlig URL: ${res.url}`);
    console.log(`     längd ${raw.length} · __NEXT_DATA__: ${raw.includes('__NEXT_DATA__')} · JSON-LD: ${raw.includes('application/ld+json')}`);
    for (const re of SIGNALS) {
      const hits = excerpts(raw, re);
      if (hits.length) {
        console.log(`     ✅ ${re.source}:`);
        for (const h of hits) console.log(`        …${h}…`);
      }
    }
    return raw;
  } catch (e) { console.log(`  ✗ FEL · ${label} — ${e.message}`); return ''; }
}

console.log('═══════ FRÅGA 1 v2 · rå-innehåll på bolagssidorna ═══════');
for (const c of COMPANIES) {
  const bare = c.orgnr.replace('-', '');
  console.log(`\n▶ ${c.name} (${c.orgnr})`);
  await probeRaw('allabolag.se', `https://www.allabolag.se/${bare}`);
  await probeRaw('proff.se företag', `https://www.proff.se/foretag/-/-/-/${bare}`);   // proff redirectar på orgnr
}

// Bolagsverkets riktiga öppna kandidater (dokumenterade portaler, inte gissade API-vägar)
console.log('\n═══════ Bolagsverket — vilka dörrar finns? ═══════');
await probeRaw('portal.api.bolagsverket.se', 'https://portal.api.bolagsverket.se/');
await probeRaw('bolagsverket öppna data-sida', 'https://bolagsverket.se/omoss/utvecklareochtestmiljoer/oppnadataochapierhosbolagsverket');

console.log('\n═══════ FRÅGA 2 v2 · crt.sh med retry (var 502 förra passet) ═══════');
const M365ISH = /autodiscover|lyncdiscover|enterpriseregistration|enterpriseenrollment|msoid|sip\.|adfs|sts\.|federation/i;
for (const d of ['lynxeye.com', 'westander.se']) {
  let done = false;
  for (let attempt = 1; attempt <= 3 && !done; attempt++) {
    try {
      const res = await fetch(`https://crt.sh/?q=${encodeURIComponent('%.' + d)}&output=json`, { headers: { ...H, Accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
      if (!res.ok) { console.log(`▶ ${d} försök ${attempt}: HTTP ${res.status}`); await new Promise((r) => setTimeout(r, 5000 * attempt)); continue; }
      const rows = await res.json();
      const names = [...new Set(rows.flatMap((r) => (r.name_value || '').toLowerCase().split('\n')))];
      const m365ish = names.filter((n) => M365ISH.test(n));
      console.log(`▶ ${d}: ${rows.length} cert · ${names.length} unika namn`);
      console.log(`   M365-aktiga: ${m365ish.length ? m365ish.join(', ') : 'INGA — datumet strukturellt omöjligt här'}`);
      console.log(`   alla namn: ${names.slice(0, 12).join(', ')}`);
      done = true;
    } catch (e) { console.log(`▶ ${d} försök ${attempt}: ${e.message}`); await new Promise((r) => setTimeout(r, 5000 * attempt)); }
  }
}
console.log('\n═══════ KLART ═══════');
