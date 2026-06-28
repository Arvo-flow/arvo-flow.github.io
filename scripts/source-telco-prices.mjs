// scripts/source-telco-prices.mjs — RESEARCH-sond (körs i GitHub Actions, fri HTTP-egress).
// Hämtar källartiklar med riktig browser-UA och dumpar texten så att exakta datum + belopp kan
// LÄSAS och verifieras av människa INNAN något seedas. Ingen auto-seed — ren insamling.
// (Sandboxen 403:ar fetch; Actions gör det inte. Detta är "träffa den riktiga maskinen".)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const TARGETS = [
  ['Tele2 mobil (mobilabonnemang.se)', 'https://www.mobilabonnemang.se/artiklar/hojda-priser-tele2s-mobilabonnemang-fran-1-mars'],
  ['Telia bredband (privataaffarer.se)', 'https://www.privataaffarer.se/telia-hojer-pa-nytt-bredbandspriserna/'],
  ['Tre mobil (mobil.se)', 'https://www.mobil.se/nyheter/blir-dyrare-tre-hojer-priserna-pa-mobilabonnemangen/1613248'],
];

// Plocka ut text + meningar som bär ett kr-belopp eller procent (de relevanta raderna).
function relevantLines(html) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
  const sentences = text.split(/(?<=[.!?])\s+/);
  const hits = sentences.filter((s) => /\b\d{2,4}\s*(kr|kronor)\b/i.test(s) || /\b\d{1,3}\s*(%|procent)\b/i.test(s) || /\b\d{4}\b/.test(s) && /(höj|pris|mars|januari|februari|april)/i.test(s));
  return { len: text.length, hits: hits.slice(0, 25) };
}

for (const [label, url] of TARGETS) {
  console.log(`\n══════════ ${label} ══════════\n${url}`);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html', 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    console.log(`HTTP ${res.status}`);
    if (!res.ok) continue;
    const html = await res.text();
    const { len, hits } = relevantLines(html);
    console.log(`text-längd: ${len} · relevanta rader: ${hits.length}`);
    for (const h of hits) console.log('  •', h);
  } catch (e) { console.log('fel:', e.message); }
}
