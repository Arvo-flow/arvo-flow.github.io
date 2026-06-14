// scripts/probe-public-source.mjs — upptäcktsrunda: mappa pris → plan.
// Hämtar M365- och Tele2-prissidorna på runnern, strippar HTML, och skriver ut
// varje pris med texten omedelbart före (= plannamnet). Inga inserts.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const PAGES = [
  ['Microsoft 365 Business', 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-plans-and-pricing'],
  ['Tele2 företag mobil', 'https://www.tele2.se/foretag/mobilabonnemang'],
];

async function fetchText(url) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 9000);
  try {
    const r = await fetch(url, { signal: ac.signal, redirect: 'follow', headers: { 'User-Agent': UA, Accept: 'text/html,*/*', 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    return { status: r.status, body: await r.text() };
  } catch (e) { return { status: 'ERR ' + e.name, body: '' }; } finally { clearTimeout(t); }
}

for (const [name, url] of PAGES) {
  const { status, body } = await fetchText(url);
  console.log(`\n========== ${name} (status ${status}, len ${body.length})`);
  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');
  // Pris med text precis före (planens namn brukar ligga där)
  const matches = [...text.matchAll(/([A-Za-zÅÄÖåäö0-9 .,/&+-]{8,70}?)\s(\d[\d ]*(?:[.,]\d{1,2})?)\s*kr\b/g)];
  const seen = new Set();
  let n = 0;
  for (const m of matches) {
    const ctx = m[1].trim(); const price = m[2].replace(/\s/g, '');
    const key = ctx + '|' + price;
    if (seen.has(key)) continue; seen.add(key);
    console.log(`  · "${ctx}"  →  ${price} kr`);
    if (++n >= 30) break;
  }
}
console.log('\n[probe] klar');
