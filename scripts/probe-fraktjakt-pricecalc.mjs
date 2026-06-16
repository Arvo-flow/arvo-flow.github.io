// scripts/probe-fraktjakt-pricecalc.mjs — läs den dokumenterade pris-API-sidan i KLARTEXT.
//
// Frågan: dokumenterar Fraktjakt en PUBLIK test-/demo-credential (sandbox-consignor) för
// price_calculation-API:t? Många Rails-API:er gör det. Finns den = legitim väg in utan
// registrering (publicerad just för ändamålet). Vi läser bara publika sidor; vi förfalskar
// inget. Vi letar även upp den riktiga registreringssidan via "skapa konto"-länken.
// Ren fetch (HTTP-egress → GH Actions). Skriver inget.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const H = { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml', 'Accept-Language': 'sv-SE,sv;q=0.9' };

async function get(url, timeoutMs = 12000) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeoutMs);
  try { const r = await fetch(url, { headers: H, redirect: 'follow', signal: ac.signal }); return { status: r.status, finalUrl: r.url, body: await r.text() }; }
  catch (e) { return { status: 'ERR ' + e.name, finalUrl: url, body: '' }; }
  finally { clearTimeout(t); }
}

function text(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ').replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
}

// Rader som nämner något relevant.
function relevant(t) {
  const out = [];
  const sentences = t.split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    if (/(consignor|api[_\s-]?nyckel|api[_\s-]?key|access[_\s-]?token|test[\s_-]?(konto|läge|mode|server|nyckel)|demo|sandbox|registrer|skapa konto|gratis|kostnadsfri|privat|exempel|query)/i.test(s)) {
      out.push(s.slice(0, 260));
    }
  }
  return [...new Set(out)].slice(0, 30);
}

const TARGETS = [
  'https://api.fraktjakt.se/services/price_calculation?locale=sv',
  'https://www.fraktjakt.se/services/price_calculation?locale=sv',
  'https://api.fraktjakt.se/services/integrations?locale=sv',
];

for (const url of TARGETS) {
  const r = await get(url);
  const t = text(r.body || '');
  const title = ((r.body || '').match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
  console.log(`\n######## [${r.status}] ${url} ########`);
  if (title) console.log(`titel: ${title.trim()}`);
  const rel = relevant(t);
  if (rel.length) { console.log('— relevanta meningar —'); rel.forEach((s) => console.log('  • ' + s)); }
  else console.log('  (inget relevant — skannar hela texten:)\n  ' + t.slice(0, 600));
  // Länkar mot registrering / api-doc / nyckel.
  const links = new Set();
  let m; const re = /href\s*=\s*["']([^"']+)["']/gi;
  while ((m = re.exec(r.body || ''))) {
    if (/(registrer|skapa.?konto|sign_?up|account\/(new|create|register)|api_?doc|apidoc|nyckel|key|developer|utvecklare|query)/i.test(m[1])) {
      try { links.add(new URL(m[1], r.finalUrl).href.split('#')[0]); } catch {}
    }
  }
  if (links.size) console.log('— länkar (registrering/api/nyckel) —\n  ' + [...links].slice(0, 14).join('\n  '));
}

// Hitta registreringssidan via login-sidan (där brukar "Skapa konto"-länken finnas).
console.log('\n######## Registreringslänk via login-sidan ########');
const login = await get('https://www.fraktjakt.se/account/login?locale=sv');
const links = new Set();
let m; const re = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
while ((m = re.exec(login.body || ''))) {
  const href = m[1], label = text(m[2]);
  if (/(registrer|skapa|nytt konto|new account|sign_?up|bli kund|kom igång|gratis)/i.test(href + ' ' + label)) {
    try { links.add(`${new URL(href, login.finalUrl).href.split('#')[0]}  («${label.slice(0, 30)}»)`); } catch {}
  }
}
console.log(links.size ? [...links].slice(0, 12).map((l) => '  ' + l).join('\n') : '  (ingen registreringslänk hittad på login-sidan)');
console.log('\n[probe-fraktjakt-pricecalc] klar');
