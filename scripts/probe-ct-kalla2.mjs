// scripts/probe-ct-kalla2.mjs — EN ANDRA LÄSARE AV SAMMA OFFENTLIGA REGISTER.
//
// Certifikattransparens är ett OFFENTLIGT, replikerat register. crt.sh är bara en av flera som
// läser det — och den har i dag vägrat oss i praktiskt taget varje mätning: 15 av 16, sedan 11 av
// 16 med omförsök, sedan 0 av 6 live, sedan 0 av 3 samtidigt från två håll (vilket avfärdade min
// egen hypotes om att Vercel var utestängt: källan teg för alla).
//
// Att vår vassaste kundrad hänger på EN gratistjänst som svarar när den känner för det är inte
// ett driftproblem — det är ett designfel. Samma doktrin som prisboken: ett ankare med en enda
// obevakad källa är ingen sanning, det är en förhoppning.
//
// Sonden prövar Cert Spotter (SSLMate), som läser samma loggar. Den KURERAR ingenting: adressen
// och svarsformen ska BEVISAS innan en rad kod litar på dem, och talen ska kunna ställas mot det
// crt.sh gett oss för samma domän (skanska.se: autodiscover 2011-11-17).
import { deklarera } from '../lib/sondkontrakt.js';

deklarera({
  namn: 'probe-ct-kalla2',
  fangar: 'Om Cert Spotter svarar där crt.sh tiger, vilken svarsform den har, och om den bär samma M365-värdnamn och datum.',
  blind: 'Om källan är fullständig. Två läsare av CT kan ha olika loggtäckning; ett tidigare datum hos den ena bevisar inte att den andra har fel, bara att de sett olika mycket.',
});

const UA = 'arvo-flow/1.0 (+https://arvoflow.se)';
const M365 = ['autodiscover', 'enterpriseregistration', 'msoid', 'lyncdiscover'];
const DOMANER = ['skanska.se', 'volvo.se', 'westander.se', 'castra.se'];

for (const d of DOMANER) {
  const t0 = Date.now();
  const url = `https://api.certspotter.com/v1/issuances?domain=${encodeURIComponent(d)}`
    + '&include_subdomains=true&expand=dns_names&expand=not_before';
  try {
    const r = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': UA }, signal: AbortSignal.timeout(25000) });
    const text = await r.text();
    const ms = Date.now() - t0;
    if (!r.ok) { console.log(`  ${d.padEnd(16)} ${String(ms + 'ms').padStart(8)}  ✗ HTTP ${r.status} · «${text.slice(0, 90).replace(/\s+/g, ' ')}»`); continue; }
    let rows = null; try { rows = JSON.parse(text); } catch { /* inte JSON */ }
    if (!Array.isArray(rows)) { console.log(`  ${d.padEnd(16)} ${String(ms + 'ms').padStart(8)}  ✗ oväntat format · «${text.slice(0, 90)}»`); continue; }

    let tidigast = null, via = null;
    for (const rad of rows) {
      const namn = (rad.dns_names || []).map((n) => String(n).toLowerCase());
      const nb = rad.not_before;
      for (const fp of M365) {
        if (namn.some((n) => n.startsWith(fp + '.')) && nb && (!tidigast || nb < tidigast)) { tidigast = nb; via = fp; }
      }
    }
    console.log(`  ${d.padEnd(16)} ${String(ms + 'ms').padStart(8)}  HTTP 200 · ${rows.length} utfärdanden · `
      + (tidigast ? `✓ ${tidigast.slice(0, 10)} (via ${via})` : '— inget M365-värdnamn'));
  } catch (e) {
    console.log(`  ${d.padEnd(16)} ${String(Date.now() - t0 + 'ms').padStart(8)}  ✗ ${e.name === 'TimeoutError' ? 'TIMEOUT' : String(e.message).slice(0, 40)}`);
  }
}

console.log('\n  Jämför mot crt.sh-mätningen: skanska.se gav 2011-11-17 (autodiscover), volvo.se 2013-04-09,');
console.log('  westander.se 2016-02-09. Samma datum från en andra läsare = ankaret tål att en källa faller.');
