// scripts/probe-business-intel.mjs — RESEARCH-sond (Actions, fri egress). Två frågor mot verkligheten:
//
//  FRÅGA 1 · AFFÄRSHJÄRNAN: kan vi hämta svensk affärsdata (omsättning/resultat/anställda) för ett
//  orgnr ur öppna/publika källor, rent och maskinellt? Provar Bolagsverkets öppna API-kandidater och
//  publika bolagssidor (allabolag/proff/merinfo) med riktig browser-UA. Rapporterar HTTP-status +
//  om omsättningssiffror faktiskt syns i svaret. INGEN auto-build — ren insamling för beslut.
//
//  FRÅGA 2 · KÄFTSLÄPPAREN: varför fyrar M365-uppsättningsdatumet bara 1/20? Dumpar de faktiska
//  CT-loggnamnen för M365-bolag som SAKNADE datum — finns där något M365-format alls att matcha,
//  eller är datumet strukturellt sällsynt (bara hybrid-Exchange utfärdar publika autodiscover-cert)?
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,application/json;q=0.9,*/*;q=0.8' };

// Riktiga bolag ur leads-filen (orgnr verifierade via allabolag 2026-06-06)
const COMPANIES = [
  { name: 'Apendo AB',   orgnr: '556437-4840' },
  { name: 'Lynxeye AB',  orgnr: '556569-0087' },
  { name: 'Netigate AB', orgnr: '556576-0997' },
];

const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
// Omsättningssignal: "omsättning" nära ett tal (tkr/mkr/kr)
const hasRevenue = (text) => /omsättning[^.]{0,80}\d[\d\s.,]*\s*(tkr|mkr|tsek|msek|kkr|kr|')/i.test(text) || /nettoomsättning/i.test(text);

async function probe(label, url, opts = {}) {
  try {
    const res = await fetch(url, { headers: H, redirect: 'follow', signal: AbortSignal.timeout(15000), ...opts });
    const body = await res.text();
    const text = strip(body).slice(0, 400000);
    const rev = hasRevenue(text);
    console.log(`  ${res.ok ? '✓' : '✗'} HTTP ${res.status} · ${label}`);
    console.log(`     omsättning i svaret: ${rev ? 'JA ✅' : 'nej'} · längd ${body.length}`);
    if (rev) {
      const m = text.match(/.{0,60}omsättning.{0,120}/i);
      if (m) console.log(`     utdrag: "…${m[0].trim()}…"`);
    }
    return { ok: res.ok, rev };
  } catch (e) { console.log(`  ✗ FEL · ${label} — ${e.message}`); return { ok: false, rev: false }; }
}

console.log('═══════ FRÅGA 1 · AFFÄRSHJÄRNAN — går affärsdata att hämta? ═══════');
for (const c of COMPANIES) {
  const bare = c.orgnr.replace('-', '');
  console.log(`\n▶ ${c.name} (${c.orgnr})`);
  // Bolagsverkets öppna kandidater (gratis "Sök företagsinformation")
  await probe('Bolagsverket sokforetagsinfo (POST)', 'https://sokforetagsinfo.bolagsverket.se/api/foretag', {
    method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify({ identitetsbeteckning: bare }),
  });
  await probe('allabolag.se', `https://www.allabolag.se/${bare}`);
  await probe('proff.se sök', `https://www.proff.se/bransch-s%C3%B6k?q=${bare}`);
  await probe('merinfo.se', `https://www.merinfo.se/search?q=${bare}`);
}

console.log('\n═══════ FRÅGA 2 · KÄFTSLÄPPAREN — vad finns i CT-loggarna för M365-bolag utan datum? ═══════');
const CT_DOMAINS = ['lynxeye.com', 'netigate.se', 'westander.se'];   // M365-verifierade, saknade datum i flottan
const M365ISH = /autodiscover|lyncdiscover|enterpriseregistration|enterpriseenrollment|msoid|sip\.|adfs|sts\.|federation|exchange|mail\./i;
for (const d of CT_DOMAINS) {
  try {
    const res = await fetch(`https://crt.sh/?q=${encodeURIComponent('%.' + d)}&output=json`, { headers: { ...H, Accept: 'application/json' }, signal: AbortSignal.timeout(25000) });
    if (!res.ok) { console.log(`\n▶ ${d}: crt.sh HTTP ${res.status}`); continue; }
    const rows = await res.json();
    const names = [...new Set(rows.flatMap((r) => (r.name_value || '').toLowerCase().split('\n')))];
    const m365ish = names.filter((n) => M365ISH.test(n));
    console.log(`\n▶ ${d}: ${rows.length} cert · ${names.length} unika namn`);
    console.log(`   M365-aktiga namn: ${m365ish.length ? m365ish.join(', ') : 'INGA — datumet är strukturellt omöjligt här'}`);
    console.log(`   exempel på namn: ${names.slice(0, 8).join(', ')}`);
  } catch (e) { console.log(`\n▶ ${d}: fel — ${e.message}`); }
}
console.log('\n═══════ KLART ═══════');
