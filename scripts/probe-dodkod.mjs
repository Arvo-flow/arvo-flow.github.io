#!/usr/bin/env node
// scripts/probe-dodkod.mjs — MÄTER vilka exporter i lib/ som saknar produktionsanropare.
//
// ══ VARFÖR (grundarorder 2026-09-20) ═══════════════════════════════════════════════════════
// Tre exporter i `lib/telekom-normalize.js` visade sig ha NOLL produktionsanropare men stod
// exporterade och gröna i sviten: `deriveTelekomSeats` (raderad 19 sep), `buildTelekomDatapoint`
// och `marketComparisonAllowed`. En funktion som testas men aldrig körs ser INKOPPLAD ut — och
// `marketComparisonAllowed` vaktade en jämförelse vars indata aldrig skrevs (villkorsvaktens
// sjukdom). Frågan «vem anropar den i produktion?» ställs nu till hela `lib/`.
//
// ══ INSTRUMENTETS EGEN PREMISS (Noll-inferens, amendemang 1) ════════════════════════════════
// En mätning gäller först när den bär sitt MOTPROV. Sonden avslutar 1 om den inte klarar båda:
//   · KÄNT DÖD   — de tre ovan MÅSTE hamna i listan (annars ser sonden inte det den byggdes för).
//   · KÄNT LEVANDE — `getBenchmark`, `storeDatapoint`, `normalizeTelekomInvoice` m.fl. får ALDRIG
//     hamna där (annars överrapporterar den, och en lista full av falsklarm är oanvändbar).
//
// ══ UTTALAD BLINDFLÄCK ══════════════════════════════════════════════════════════════════════
// Sonden läser IMPORTSATSER, inte exekvering. Den kan inte se: en funktion som importeras men
// aldrig anropas (en import räknas som «levande» här — alltså UNDERrapporterar sonden), ett
// namn som nås via strängindex (`mod[namn]`), eller ett anrop i en gren som aldrig körs. Den
// svarar på «finns en produktionsväg som nämner namnet?» — aldrig på «körs den».

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROT = process.cwd();

// Kataloger som utgör PRODUKTIONSFLÖDET. `scripts/` räknas INTE hit: ett skript kan vara en
// nattlig produktionsjobb (price-monitor) eller en engångssond, och den skillnaden går inte att
// läsa ur sökvägen. De redovisas därför i en EGEN kolumn i stället för att gissas in eller bort.
const PROD = /^(api|agents|src)\//;
const LIB = /^lib\//;
const TEST = /^tests\//;
const SKRIPT = /^scripts\//;

function allaFiler(dir, ut = []) {
  for (const namn of readdirSync(dir)) {
    if (['node_modules', 'build', '.git', 'results', 'test-pdfs', 'coverage'].includes(namn)) continue;
    const p = join(dir, namn);
    if (statSync(p).isDirectory()) allaFiler(p, ut);
    else if (['.js', '.mjs', '.jsx'].includes(extname(namn))) ut.push(p);
  }
  return ut;
}

const filer = allaFiler(ROT);
const libFiler = filer.filter((f) => LIB.test(relative(ROT, f)));

// ── 1 · Samla exporterade NAMN per lib-modul ────────────────────────────────────────────────
const EXPORT_RX = /^export\s+(?:async\s+)?(?:function\s+(\w+)|(?:const|let|class)\s+(\w+))/gm;
const exporter = new Map();          // 'lib/x.js' -> Set(namn)
for (const f of libFiler) {
  const rel = relative(ROT, f);
  const kod = readFileSync(f, 'utf8');
  const namn = new Set();
  for (const m of kod.matchAll(EXPORT_RX)) namn.add(m[1] ?? m[2]);
  if (namn.size) exporter.set(rel, namn);
}

// ── 2 · Samla vilka NAMN varje fil IMPORTERAR, och varifrån ─────────────────────────────────
// Täcker `import { a, b as c } from '…'` OCH `const { a } = await import('…')` — den andra formen
// användes av sonderna och hade annars räknats som «ingen anropare».
const IMPORT_RX = /(?:import\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"])|(?:(?:const|let)\s*\{([^}]*)\}\s*=\s*await\s+import\(\s*['"]([^'"]+)['"]\s*\))/g;
const anvandning = new Map();        // 'namn' -> Set('konsumentfil')
for (const f of filer) {
  const rel = relative(ROT, f);
  const kod = readFileSync(f, 'utf8');
  for (const m of kod.matchAll(IMPORT_RX)) {
    const lista = m[1] ?? m[3];
    if (!lista) continue;
    for (const bit of lista.split(',')) {
      const namn = bit.trim().split(/\s+as\s+/)[0].trim();
      if (!namn) continue;
      if (!anvandning.has(namn)) anvandning.set(namn, new Set());
      anvandning.get(namn).add(rel);
    }
  }
}

// ── 2b · Används namnet INTERNT i sin egen modul? ───────────────────────────────────────────
// ⚠️ UTAN DEN HÄR FRÅGAN ÖVERRAPPORTERAR SONDEN GROVT. En hjälpare som modulen anropar själv, men
// som exporterats för att ett test ska nå den, är INTE död kod — den körs varje gång modulen körs.
// Att radera den hade brutit produktionen. Skillnaden mellan «exporterad för testbarhet» och
// «aldrig anropad» är hela domen, och den går inte att läsa ur importlistan.
const internt = new Map();           // 'lib/x.js:namn' -> antal förekomster utanför exportraden
for (const [modul, namnen] of exporter) {
  const kod = readFileSync(join(ROT, modul), 'utf8');
  const utanExportrader = kod.split('\n')
    .filter((r) => !/^export\s+(?:async\s+)?(?:function|const|let|class)\s/.test(r)).join('\n');
  for (const namn of namnen) {
    const rx = new RegExp(`\\b${namn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    internt.set(`${modul}:${namn}`, (utanExportrader.match(rx) ?? []).length);
  }
}

// ── 3 · Döm varje export ────────────────────────────────────────────────────────────────────
const dom = [];
for (const [modul, namnen] of exporter) {
  for (const namn of namnen) {
    const konsumenter = [...(anvandning.get(namn) ?? [])].filter((k) => k !== modul);
    const prod = konsumenter.filter((k) => PROD.test(k));
    const libk = konsumenter.filter((k) => LIB.test(k));
    const test = konsumenter.filter((k) => TEST.test(k));
    const skript = konsumenter.filter((k) => SKRIPT.test(k));
    const egenAnvandning = internt.get(`${modul}:${namn}`) ?? 0;
    dom.push({ modul, namn, prod, libk, test, skript, egenAnvandning,
      levande: prod.length > 0 || libk.length > 0 || egenAnvandning > 0 });
  }
}

// ── 4 · MOTPROVEN — instrumentet prövas innan dess utfall får läsas ─────────────────────────
const dod = dom.filter((d) => !d.levande);
const hittad = (n) => dod.some((d) => d.namn === n);
const KANT_DOD = ['buildTelekomDatapoint', 'marketComparisonAllowed'];
// ⚠️ `kanoniskKategori` STOD HÄR I FÖRSTA VERSIONEN, och sonden fällde motprovet. Jag hade lagt
// den i «känt levande» för att jag skrev den i går — ett omätt antagande i den lista som ska
// BEVISA att instrumentet inte överrapporterar. Mätningen: noll produktionsanropare, bara tester.
// Den står nu i utfallet där den hör hemma. En motprovslista är också ett påstående.
const KANT_LEVANDE = ['getBenchmark', 'storeDatapoint', 'normalizeTelekomInvoice',
  'catLabel', 'checkSupplierFingerprint', 'isAudited',
  // Motprov för 2b: hjälpare som modulen anropar SJÄLV. Flaggas de är intern-mätningen trasig.
  'klassaVaxelrad', 'cellenBar'];

const missar = KANT_DOD.filter((n) => !hittad(n));
const falsklarm = KANT_LEVANDE.filter((n) => hittad(n));

console.log('\n═══ DÖD KOD I lib/ · instrumentets motprov först ═══\n');
console.log(`  MOTPROV A (ska hittas som död):   ${KANT_DOD.length - missar.length}/${KANT_DOD.length}`
  + (missar.length ? `  ✗ MISSADE: ${missar.join(', ')}` : '  ✓'));
console.log(`  MOTPROV B (får INTE flaggas):     ${KANT_LEVANDE.length - falsklarm.length}/${KANT_LEVANDE.length}`
  + (falsklarm.length ? `  ✗ FALSKLARM: ${falsklarm.join(', ')}` : '  ✓'));

if (missar.length || falsklarm.length) {
  console.error('\n✗ INSTRUMENTET KLARAR INTE SINA MOTPROV — utfallet nedan får INTE läsas som en mätning.');
  process.exit(1);
}

// ── 5 · Utfallet ────────────────────────────────────────────────────────────────────────────
console.log(`\n  Exporter i lib/: ${dom.length} i ${exporter.size} moduler`);
console.log(`  Utan produktions- eller lib-anropare: ${dod.length}\n`);

const baraTest = dod.filter((d) => d.test.length > 0 && d.skript.length === 0);
const baraSkript = dod.filter((d) => d.skript.length > 0);
const ingen = dod.filter((d) => d.test.length === 0 && d.skript.length === 0);

const skrivUt = (rubrik, rader) => {
  console.log(`── ${rubrik} (${rader.length}) ${'─'.repeat(Math.max(0, 58 - rubrik.length))}`);
  for (const d of rader.sort((a, b) => a.modul.localeCompare(b.modul))) {
    console.log(`  ${d.modul}:${d.namn}`);
    if (d.test.length) console.log(`      test:   ${d.test.join(', ')}`);
    if (d.skript.length) console.log(`      skript: ${d.skript.join(', ')}`);
  }
  console.log('');
};

skrivUt('TESTAD MEN ALDRIG ANROPAD — ser inkopplad ut, är det inte', baraTest);
skrivUt('BARA SKRIPT — kan vara nattligt produktionsjobb ELLER engångssond', baraSkript);
skrivUt('VARKEN TEST ELLER SKRIPT — helt oanvänd', ingen);

console.log('[probe-dodkod] klar\n');
