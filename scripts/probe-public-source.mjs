// scripts/probe-public-source.mjs — upptäcktsrunda M365 (längre timeout, kontext).
// Microsoft-sidan är server-renderad men långsam → 20s. Skriver ut varje pris med
// text FÖRE och EFTER (planens namn ligger oftast i en rubrik bredvid). Inga inserts.

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const URL = 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-plans-and-pricing';

const ac = new AbortController();
const t = setTimeout(() => ac.abort(), 20000);
let body = '', status = '';
try {
  const r = await fetch(URL, { signal: ac.signal, redirect: 'follow', headers: { 'User-Agent': UA, Accept: 'text/html,*/*', 'Accept-Language': 'sv-SE,sv;q=0.9' } });
  status = r.status; body = await r.text();
} catch (e) { status = 'ERR ' + e.name; } finally { clearTimeout(t); }

console.log(`M365 status ${status}, len ${body.length}`);
const text = body
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&[a-z#0-9]+;/gi, ' ')
  .replace(/\s+/g, ' ');

const re = /(\d[\d ]*[.,]\d{2})\s*kr/g;
const seen = new Set();
let m, n = 0;
while ((m = re.exec(text)) && n < 30) {
  const price = m[1].replace(/\s/g, '');
  const before = text.slice(Math.max(0, m.index - 75), m.index).trim();
  const after = text.slice(m.index + m[0].length, m.index + m[0].length + 45).trim();
  const key = before.slice(-30) + price;
  if (seen.has(key)) continue; seen.add(key);
  console.log(`  [${price} kr]  …${before}  «PRIS»  ${after}…`);
  n++;
}
console.log('[probe] klar');
