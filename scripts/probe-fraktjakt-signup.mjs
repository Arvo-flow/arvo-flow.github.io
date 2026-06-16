// scripts/probe-fraktjakt-signup.mjs — verifiera den LEGITIMA snabba vägen till en nyckel.
//
// Tesen: Fraktjakt-konto ≠ företagsregistrering. Fraktjakt är konsumentvänt — privatpersoner
// registrerar sig gratis med bara e-post (inget org.nr) och får consignor_id + api_key i
// API:ts gratis query/test-läge. Den här sonden BEVISAR det (eller motbevisar det) genom att
// läsa de publika signup-/API-doc-sidorna: krävs org.nr? finns privat/gratis-nivå? sandbox?
//
// Helt legitimt: vi läser publika sidor, vi skapar inget konto, vi förfalskar ingen nyckel.
// Ren fetch (HTTP-egress krävs → GH Actions). Skriver inget.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const H = { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,application/json;q=0.9', 'Accept-Language': 'sv-SE,sv;q=0.9' };

async function get(url, timeoutMs = 12000) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(url, { headers: H, redirect: 'follow', signal: ac.signal });
    const body = await r.text();
    return { ok: r.ok, status: r.status, finalUrl: r.url, body };
  } catch (e) { return { ok: false, status: 'ERR ' + e.name, finalUrl: url, body: '' }; }
  finally { clearTimeout(t); }
}

// Plocka relevanta länkar ur en HTML (registrera/api/integration/utvecklare/konto/priser).
function extractLinks(html, base) {
  const out = new Set();
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    if (/(register|registrera|signup|sign_up|skapa.?konto|account\/new|\bapi\b|api_doc|apidoc|integration|integrering|utvecklare|developer|priser|pricing|services)/i.test(href)) {
      try { out.add(new URL(href, base).href.split('#')[0]); } catch {}
    }
  }
  return [...out].slice(0, 25);
}

// Dumpa formfält + nyckelord ur en sida.
function summarize(html) {
  const fields = [];
  const fre = /<(input|select)\b[^>]*>/gi; let m, c = 0;
  while ((m = fre.exec(html)) && c < 30) {
    const tag = m[0];
    const name = (tag.match(/name\s*=\s*["']([^"']+)["']/i) || [])[1] || '–';
    const type = (tag.match(/type\s*=\s*["']([^"']+)["']/i) || [])[1] || '';
    const req = /\brequired\b/i.test(tag) ? ' REQUIRED' : '';
    if (name !== '–' || type) { fields.push(`${name}[${type}]${req}`); c++; }
  }
  const kw = [];
  for (const [label, rx] of [
    ['org.nr-fält', /organisationsnummer|org.?nr|company_?number|vat|momsreg/i],
    ['personnr-fält', /personnummer|ssn|social.?security/i],
    ['privat/företag-val', /privat(person)?|company|f[öo]retag|business|individual/i],
    ['gratis/free', /gratis|kostnadsfri|free|utan kostnad|0 kr/i],
    ['API/consignor', /consignor|api[_\s-]?key|api[_\s-]?nyckel|access[_\s-]?token/i],
    ['test/sandbox', /sandbox|test[\s_-]?l[äa]ge|test[\s_-]?mode|development|utvecklingsl/i],
  ]) { if (rx.test(html)) kw.push(label); }
  return { fields, kw };
}

const SEEDS = [
  'https://www.fraktjakt.se/',
  'https://www.fraktjakt.se/account/register',
  'https://www.fraktjakt.se/account/new',
  'https://www.fraktjakt.se/users/sign_up',
  'https://api.fraktjakt.se/',
  'https://apidoc.fraktjakt.se/',
  'https://www.fraktjakt.se/services/api_doc',
];

const visited = new Set();
async function probe(url, depth) {
  if (visited.has(url) || visited.size > 22) return;
  visited.add(url);
  const r = await get(url);
  const { fields, kw } = summarize(r.body || '');
  const title = ((r.body || '').match(/<title>([^<]*)<\/title>/i) || [])[1] || '';
  console.log(`\n[${r.status}] ${url}${r.finalUrl !== url ? ' → ' + r.finalUrl : ''}`);
  if (title) console.log(`   titel: ${title.trim().slice(0, 90)}`);
  if (kw.length) console.log(`   signaler: ${kw.join(' · ')}`);
  if (fields.length) console.log(`   fält: ${fields.join(' | ')}`);
  // Följ relevanta länkar ett steg från hemsidan + api-roten.
  if (depth > 0 && r.body) {
    const links = extractLinks(r.body, r.finalUrl);
    if (links.length) console.log(`   länkar: ${links.slice(0, 12).join('  ')}`);
    for (const l of links.slice(0, 10)) await probe(l, depth - 1);
  }
}

console.log('==================== Fraktjakt signup/API legitim väg ====================');
for (const s of SEEDS) await probe(s, s.endsWith('.se/') ? 1 : 0);
console.log('\n[probe-fraktjakt-signup] klar');
