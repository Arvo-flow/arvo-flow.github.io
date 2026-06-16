// scripts/probe-fraktjakt-devtools.mjs — hitta EXAKT URL där consignor_id + key genereras.
// Founder är inloggad på mobilen och vill ha en enda länk att trycka på. Vi läser de publika
// utvecklar-/API-sidorna och extraherar länken till "registrera integration / mina
// integrationer / API-nyckel". Oinloggat redirectar den till login — men URL:en avslöjas.
// Ren fetch (GH Actions).

const UA = 'ArvoFlow-Recon/1.0 (+https://arvoflow.se)';
const H = { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml', 'Accept-Language': 'sv-SE,sv;q=0.9' };

async function get(url, redirect = 'follow', timeoutMs = 12000) {
  const ac = new AbortController(); const t = setTimeout(() => ac.abort(), timeoutMs);
  try { const r = await fetch(url, { headers: H, redirect, signal: ac.signal }); return { status: r.status, loc: r.headers.get('location') || '', finalUrl: r.url, body: await r.text().catch(() => '') }; }
  catch (e) { return { status: 'ERR ' + e.name, loc: '', finalUrl: url, body: '' }; }
  finally { clearTimeout(t); }
}
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

const PAGES = [
  'https://api.fraktjakt.se/services/api?locale=sv',
  'https://www.fraktjakt.se/services/api?locale=sv',
  'https://api.fraktjakt.se/xml/query_test?locale=sv',
];

const RELEVANT = /(integration|consignor|api[_-]?key|api[_-]?nyckel|api[_-]?kod|utvecklare|developer|mina[_\s-]?integration|register|installningar|settings|nyckl)/i;

const found = new Map(); // url -> label
for (const p of PAGES) {
  const r = await get(p);
  console.log(`\n######## [${r.status}] ${p} ########`);
  const re = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(r.body || ''))) {
    const label = strip(m[2]);
    if (RELEVANT.test(m[1] + ' ' + label)) {
      try { const u = new URL(m[1], r.finalUrl).href.split('#')[0]; if (!found.has(u)) found.set(u, label.slice(0, 50)); } catch {}
    }
  }
  // Knappar/onclick som pekar på integrationssidan
  const bre = /(?:data-href|onclick|action)\s*=\s*["']([^"']*(?:integration|consignor|api)[^"']*)["']/gi;
  while ((m = bre.exec(r.body || ''))) console.log('  KNAPP/onclick → ' + m[1].slice(0, 120));
}

console.log('\n==================== Kandidat-URL:er (integration/nyckel) ====================');
for (const [u, label] of found) console.log(`  ${u}   («${label}»)`);

// Testa gissade integrationssidor + se vart de redirectar (avslöjar rätt path).
console.log('\n==================== Vart leder integrationssidorna (oinloggat → login) ====================');
const GUESSES = [
  'https://www.fraktjakt.se/integrations',
  'https://www.fraktjakt.se/integrations/new',
  'https://www.fraktjakt.se/shipper/integrations',
  'https://www.fraktjakt.se/my_integrations',
  'https://www.fraktjakt.se/account/integrations',
  'https://www.fraktjakt.se/developer/integrations',
  ...found.keys(),
];
const seen = new Set();
for (const g of GUESSES) {
  if (seen.has(g)) continue; seen.add(g);
  const r = await get(g, 'manual');
  console.log(`  [${r.status}${r.loc ? ' → ' + r.loc.slice(0, 70) : ''}] ${g}`);
}
console.log('\n[probe-fraktjakt-devtools] klar');
