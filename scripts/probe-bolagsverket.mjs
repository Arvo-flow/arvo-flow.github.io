// scripts/probe-bolagsverket.mjs — RESEARCH-sond (Actions, fri egress): exakt vad kräver
// Bolagsverkets kundanmälan (värdefulla datamängder = digitala årsredovisningar), vad kostar
// anslutning + transaktioner, och vad erbjuder devportalen? Ren insamling för grundarbeslut.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,*/*;q=0.8' };

const strip = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&aring;/g, 'å')
  .split('\n').map((l) => l.trim()).filter(Boolean).join('\n');

const PAGES = [
  ['Kundanmälan (värdefulla datamängder)', 'https://bolagsverket.se/apierochoppnadata/hamtaforetagsinformation/vardefulladatamangder/kundanmalantillapiforvardefulladatamangder.5528.html'],
  ['API värdefulla datamängder (översikt)', 'https://bolagsverket.se/apierochoppnadata/hamtaforetagsinformation/vardefulladatamangder/apiforvardefulladatamangder.5513.html'],
  ['API företagsinformation (översikt)', 'https://bolagsverket.se/apierochoppnadata/hamtaforetagsinformation/apiforatthamtaforetagsinformation.3988.html'],
  ['FAQ om API:erna', 'https://bolagsverket.se/apierochoppnadata/driftochsupport/fragorochsvaromapierna.4611.html'],
];

for (const [label, url] of PAGES) {
  console.log(`\n══════════ ${label} ══════════`);
  try {
    const res = await fetch(url, { headers: H, redirect: 'follow', signal: AbortSignal.timeout(15000) });
    console.log(`HTTP ${res.status} · ${res.url}`);
    if (!res.ok) continue;
    const text = strip(await res.text());
    // Relevanta stycken: anmälan/uppgifter/avgift/pris/nyckel/BankID/tid
    const lines = text.split('\n');
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
      if (/anmäl|avgift|kostar|pris|krona|kr\b|nyckel|BankID|e-post|sms|telefon|transaktion|anslutning|formulär|test.*milj|produktionsmilj|behandl|handläggning/i.test(lines[i])) {
        hits.push(lines[i]);
      }
    }
    // dedupe + trimma
    const seen = new Set();
    for (const h of hits) {
      const k = h.slice(0, 60);
      if (seen.has(k) || h.length < 15) continue;
      seen.add(k);
      console.log('  · ' + h.slice(0, 240));
      if (seen.size > 40) break;
    }
  } catch (e) { console.log('FEL:', e.message); }
}
console.log('\n══════════ KLART ══════════');
