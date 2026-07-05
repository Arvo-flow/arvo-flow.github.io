// scripts/probe-avtal-corpus.mjs — SOURCING-sond för avtals-extraktionen (C1).
// Steg 1 av bygget (verifieringsplikten): hämta VERKLIGA svenska avtalsvillkor (publika PDF:er
// från operatörer/SaaS) och dumpa klausulerna kring nyckelorden — så extraktionskontraktet
// ritas mot verkliga dokument, inte gissningar. Kräver egress + pdftotext (poppler) → Actions.
//
// Tvåstegs: (1) villkors-indexsidor → hitta PDF-länkar, (2) ladda ner max N, pdftotext,
// dumpa ±kontext runt bindningstid/uppsägning/förlängning/avtalstid/brytavgift.
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'sv-SE,sv;q=0.9', Accept: 'text/html,application/pdf,*/*;q=0.8' };

// Villkors-indexsidor (publika). Sonden överlever döda länkar — varje källa är try/catch.
const INDEX_PAGES = [
  ['Tele2 företag villkor',   'https://www.tele2.se/foretag/villkor'],
  ['Telia företag villkor',   'https://www.telia.se/foretag/om/villkor'],
  ['Telenor företag villkor', 'https://www.telenor.se/foretag/kundservice/villkor/'],
  ['Bahnhof villkor',         'https://bahnhof.se/foretag/villkor'],
  ['Fortnox avtal & villkor', 'https://www.fortnox.se/om-fortnox/avtal-och-villkor'],
  ['Telavox villkor',         'https://telavox.com/sv/legal/'],
];

const KEYWORDS = /bindningstid|uppsägningstid|uppsägning|förläng|avtalstid|avtalsperiod|brytavgift|förtida upphörande|initial period|löper.*tills vidare|automatiskt.*förnya/i;

async function get(url, asBuffer = false) {
  const res = await fetch(url, { headers: H, redirect: 'follow', signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return asBuffer ? Buffer.from(await res.arrayBuffer()) : await res.text();
}

function pdfLinks(html, baseUrl) {
  const links = new Set();
  const re = /href="([^"]+\.pdf[^"]*)"/gi;
  let m;
  while ((m = re.exec(html))) {
    try { links.add(new URL(m[1], baseUrl).href); } catch { /* ogiltig URL */ }
  }
  return [...links];
}

mkdirSync('/tmp/avtal', { recursive: true });
const allPdfs = [];

console.log('═══════ STEG 1 · PDF-länkar på villkors-sidorna ═══════');
for (const [label, url] of INDEX_PAGES) {
  try {
    const html = await get(url);
    const links = pdfLinks(html, url).filter((l) => /villkor|avtal|terms|allmanna|abonnemang|foretag/i.test(l));
    console.log(`\n▶ ${label}: ${links.length} relevanta PDF-länkar`);
    links.slice(0, 5).forEach((l) => console.log('   ·', l.slice(0, 130)));
    allPdfs.push(...links.slice(0, 3).map((l) => ({ source: label, url: l })));
  } catch (e) { console.log(`\n▶ ${label}: FEL ${e.message}`); }
}

console.log(`\n═══════ STEG 2 · Klausul-dump ur ${Math.min(allPdfs.length, 8)} PDF:er ═══════`);
let idx = 0;
for (const { source, url } of allPdfs.slice(0, 8)) {
  idx++;
  try {
    const buf = await get(url, true);
    if (buf.length < 2000 || buf.length > 15_000_000) { console.log(`\n[${idx}] ${source}: orimlig storlek ${buf.length} — hoppar`); continue; }
    const p = `/tmp/avtal/doc${idx}.pdf`;
    writeFileSync(p, buf);
    const text = execFileSync('pdftotext', ['-layout', p, '-'], { maxBuffer: 20_000_000 }).toString();
    console.log(`\n[${idx}] ${source} · ${Math.round(buf.length / 1024)} kB · ${text.length} tecken text`);
    console.log(`    ${url.slice(0, 120)}`);
    // Dumpa ±180 tecken runt varje nyckelordsträff (max 8 per dokument, dedup:ade)
    const seen = new Set();
    let m, hits = 0;
    const rx = new RegExp(KEYWORDS.source, 'gi');
    while ((m = rx.exec(text)) && hits < 8) {
      const ctx = text.slice(Math.max(0, m.index - 90), m.index + 180).replace(/\s+/g, ' ').trim();
      const key = ctx.slice(0, 50);
      if (seen.has(key)) continue;
      seen.add(key); hits++;
      console.log(`    » …${ctx}…`);
    }
    if (!hits) console.log('    (inga klausul-träffar — trolig marknadsförings-PDF)');
  } catch (e) { console.log(`\n[${idx}] ${source}: FEL ${e.message}`); }
}
console.log('\n═══════ KLART ═══════');
