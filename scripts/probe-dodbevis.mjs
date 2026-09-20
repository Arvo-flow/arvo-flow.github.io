#!/usr/bin/env node
// scripts/probe-dodbevis.mjs — BEVISAR, en post i taget, om en export är död eller levande.
//
// ══ VARFÖR (grundarorder 2026-09-20) ═══════════════════════════════════════════════════════
// «En lista från en sond är bara en brottsmisstanke, aldrig en fällande dom.»
// `probe-dodkod.mjs` LÄSER TEXT och har rättats åtta gånger. Den här sonden frågar den inte alls.
// Den gör ett EXPERIMENT per post, och låter maskinen svara:
//
//   1. Ta bort ordet `export ` framför deklarationen.
//   2. Försök LADDA varje modul i lib/, api/, agents/ och varje testfil.
//   3. I ESM är en namngiven import av något som inte exporteras ett LÄNKFEL — modulen som
//      importerar går inte att ladda. Alltså namnger felen exakt vilka konsumenter som fanns.
//   4. Återställ.
//
// Utfallet är trevärt och kommer ur körningen, aldrig ur en textsökning:
//   · DÖD          — ingen fil slutade ladda.
//   · BARA TEST    — endast filer i tests/ slutade ladda.
//   · LEVANDE      — en fil i lib/, api/, agents/ eller src/ slutade ladda (sonden hade fel).
//
// ══ MOTPROV (Noll-inferens, amendemang 1) ══════════════════════════════════════════════════
// Experimentet körs först på en KÄND LEVANDE export (`getBenchmark`) och en KÄND DÖD
// (`getMetricsHistory`). Ger de inte LEVANDE respektive DÖD är harnesset trasigt och avslutar 1
// UTAN att döma någon post. Ett instrument som inte kan svara åt båda håll är ingen mätning.
//
// ══ UTTALAD BLINDFLÄCK ═════════════════════════════════════════════════════════════════════
// Experimentet bevisar att ingen modul IMPORTERAR namnet. Det bevisar inte att en importerad
// funktion ANROPAS, och det ser inte dynamisk åtkomst via strängindex (`mod[namn]`). Det är
// ändå ett starkare bevis än textsökning: en länkfel-körning kan inte missa en relativ sökväg,
// och det var precis det antagandet som fällde textsonden fyra gånger.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { spawnSync } from 'node:child_process';

const ROT = process.cwd();

function allaFiler(dir, ut = []) {
  for (const namn of readdirSync(dir)) {
    if (['node_modules', 'build', '.git', 'results', 'test-pdfs', 'coverage'].includes(namn)) continue;
    const p = join(dir, namn);
    if (statSync(p).isDirectory()) allaFiler(p, ut);
    else if (['.js', '.mjs'].includes(extname(namn))) ut.push(relative(ROT, p));
  }
  return ut;
}
const ALLA = allaFiler(ROT);
// src/ hoppas över: React-filer importerar CSS/bilder och kan inte laddas av bare node.
// De täcks i stället av `npm run build` i slutkontrollen, och det sägs här i klartext.
const LADDBARA = ALLA.filter((f) => /^(lib|api|agents|tests)\//.test(f));

/**
 * Laddar en RIKTAD uppsättning filer i en egen process och returnerar de som inte gick att ladda.
 *
 * ⚠️ RIKTAD, INTE ALLA — och det är inget antagande. Att importera alla 371 filer betyder att
 * köra hela sviten (142 testfiler) en gång per experiment: dyrt OCH brusigt, eftersom ett
 * fallerande test inte är ett länkfel. Urvalet är i stället en BEVISAT ÖVERTÄCKANDE mängd: en
 * statisk import måste bokstavligen innehålla modulens filnamn i sin specificerare, och de 16
 * beräknade importerna i repot bär alla en literal sökväg (mätt 2026-09-20). En fil som inte
 * nämner filnamnet kan alltså inte importera modulen.
 */
function laddaRiktat(filer) {
  const skript = `
    const filer = ${JSON.stringify(filer)};
    const trasiga = [];
    for (const f of filer) {
      try { await import('./' + f); }
      catch (e) { trasiga.push(f + ' :: ' + String(e.message).split('\\n')[0].slice(0, 120)); }
    }
    console.log('###' + JSON.stringify(trasiga));
  `;
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', skript],
    { cwd: ROT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 120000 });
  const rad = (r.stdout ?? '').split('\n').find((l) => l.startsWith('###'));
  if (!rad) {
    // OKÄNT är aldrig tomt — och ett okänt utan sitt skäl är oanvändbart för nästa läsare.
    console.error(`  [laddaRiktat] inget svar · exit=${r.status} · signal=${r.signal}`
      + ` · stderr=${JSON.stringify(String(r.stderr ?? '').slice(0, 200))}`
      + ` · stdout=${JSON.stringify(String(r.stdout ?? '').slice(0, 120))}`);
    return null;
  }
  try { return JSON.parse(rad.slice(3)); } catch { return null; }
}

/**
 * Filer i PRODUKTIONSFLÖDET som överhuvudtaget kan importera modulen (supermängd — en statisk
 * import måste bokstavligen innehålla filnamnet). Testfiler utesluts här MED FLIT: att importera
 * dem kör dem, vilket är både långsamt och brusigt. Testkonsumenter mäts i stället av sviten.
 */
function mojligaImportorer(modul) {
  const bas = modul.split('/').pop().replace(/\.(m?js)$/, '');
  const rx = new RegExp(bas.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return LADDBARA.filter((f) => f !== modul && !f.startsWith('tests/')
    && rx.test(readFileSync(join(ROT, f), 'utf8')));
}

/** Kör hela sviten och returnerar antalet fallerande test, eller null om körningen inte gick att läsa. */
function svitFel() {
  const r = spawnSync('npm', ['run', 'test:algo'], { cwd: ROT, encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024, timeout: 600000 });
  const m = /^# fail (\d+)$/m.exec(r.stdout ?? '');
  return m ? Number(m[1]) : null;
}

/**
 * Kör experimentet för EN export. Två frågor, mätta var för sig:
 *   1. Slutar någon PRODUKTIONSMODUL ladda? → LEVANDE (sonden hade fel)
 *   2. Slutar något TEST passera?           → BARA TEST
 * Ingendera → DÖD.
 */
function provaExport(modul, namn) {
  const p = join(ROT, modul);
  const orig = readFileSync(p, 'utf8');
  const rx = new RegExp(`^export\\s+((?:async\\s+)?(?:function|const|let|class)\\s+${
    namn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b)`, 'm');
  if (!rx.test(orig)) return { dom: 'EJ PRÖVBAR', nya: [], skal: 'deklarationen matchade inte' };

  const urval = mojligaImportorer(modul);
  const fore = laddaRiktat(urval);
  if (fore === null) return { dom: 'EJ PRÖVBAR', nya: [], skal: 'baslinjen gick inte att läsa' };

  writeFileSync(p, orig.replace(rx, '$1'));
  const efter = laddaRiktat(urval);
  const fel = efter === null ? null : svitFel();
  writeFileSync(p, orig);

  if (efter === null || fel === null) {
    return { dom: 'EJ PRÖVBAR', nya: [], skal: 'körningen gick inte att läsa' };
  }
  const bas = new Set(fore.map((r) => r.split(' :: ')[0]));
  const trasiga = efter.map((r) => r.split(' :: ')[0]).filter((f) => !bas.has(f));
  if (trasiga.length > 0) return { dom: 'LEVANDE', nya: trasiga };
  if (fel > 0) return { dom: 'BARA TEST', nya: [`${fel} test föll`] };
  return { dom: 'DÖD', nya: [], urval: urval.length };
}

// ── MOTPROVEN, före varje dom ───────────────────────────────────────────────────────────────
const mp1 = provaExport('lib/benchmark.js', 'getBenchmark');
const mp2 = provaExport('lib/production-monitor.js', 'getMetricsHistory');
console.log('\n═══ DÖDBEVIS · experimentet prövas först ═══\n');
console.log(`  MOTPROV LEVANDE (getBenchmark)      → ${mp1.dom}  ${mp1.dom === 'LEVANDE' ? '✓' : '✗'}`
  + (mp1.skal ? `  skäl: ${mp1.skal}` : '') + (mp1.nya?.length ? `  ← ${mp1.nya.join(', ')}` : ''));
console.log(`  MOTPROV DÖD (getMetricsHistory)     → ${mp2.dom}  ${mp2.dom === 'DÖD' ? '✓' : '✗'}`
  + (mp2.skal ? `  skäl: ${mp2.skal}` : '') + (mp2.nya?.length ? `  ← ${mp2.nya.join(', ')}` : ''));
if (mp1.dom !== 'LEVANDE' || mp2.dom !== 'DÖD') {
  console.error('\n✗ HARNESSET KAN INTE SVARA ÅT BÅDA HÅLL — ingen post döms.');
  process.exit(1);
}

// ── Kandidaterna: läses ur probe-dodkod, men DÖMS av experimentet ───────────────────────────
const lista = spawnSync(process.execPath, ['scripts/probe-dodkod.mjs'], { cwd: ROT, encoding: 'utf8' }).stdout;
const avsnitt = lista.slice(lista.indexOf('── TESTAD MEN ALDRIG'));
const kandidater = [...avsnitt.matchAll(/^ {2}(lib\/[\w./-]+):(\w+)$/gm)]
  .map((m) => ({ modul: m[1], namn: m[2] }))
  .filter((k) => !/^ {2}lib/.test(k.modul) && k.namn !== 'default');

// Skriptburna undantas enligt grundarbeslut: de fyller sitt syfte.
const skriptburna = new Set([...avsnitt.matchAll(/^ {2}(lib\/[\w./-]+):(\w+)\n(?:.*\n)?\s+skript:/gm)]
  .map((m) => `${m[1]}:${m[2]}`));
const attProva = kandidater.filter((k) => !skriptburna.has(`${k.modul}:${k.namn}`));

console.log(`\n  ${attProva.length} poster prövas en och en (skriptburna undantagna).\n`);
const resultat = { DÖD: [], 'BARA TEST': [], LEVANDE: [], 'EJ PRÖVBAR': [] };
for (const k of attProva) {
  const r = provaExport(k.modul, k.namn);
  resultat[r.dom].push({ ...k, ...r });
  const tecken = r.dom === 'LEVANDE' ? '⚠️ ' : '   ';
  console.log(`${tecken}${r.dom.padEnd(11)} ${k.modul}:${k.namn}`
    + (r.nya.length ? `  ← ${r.nya.slice(0, 3).join(', ')}` : '')
    + (r.skal ? `  (${r.skal})` : ''));
}

console.log('\n═══ DOM ═══');
for (const [dom, poster] of Object.entries(resultat)) {
  console.log(`  ${dom.padEnd(11)} ${poster.length}`);
}
console.log('\n[probe-dodbevis] klar\n');
