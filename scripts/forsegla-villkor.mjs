// scripts/forsegla-villkor.mjs — FÖRSEGLINGEN, förtjänad genom en läsning.
//
// Villkorsboken har stått röd sedan vakten byggdes, av rätt skäl: förseglingen krävde en läsning
// av klausulen mot dokumentet, och ingen läsning fanns. Regeln som stoppade oss — "ett ankare
// utan läsning är en gissning med hash" — löses inte upp här, den UPPFYLLS. Läsningen och
// ankaret sker i samma sekund mot samma bytes, och därför får båda datumen samma värde.
//
// Skriptet gissar aldrig. Det gör tre saker och redovisar varje steg:
//   1 · hämtar dokumentet och hashar exakt de bytes som lästes
//   2 · extraherar textlagret och läser klausulen ORDAGRANT (lib/villkorslasare.js)
//   3 · förseglar ENDAST vid FUNNEN — allt annat lämnas rött med ett exakt skäl
//
// Kör utan flagga för att bara läsa och rapportera. Kör med --forsegla för att skriva in
// beviset i lib/contract-intel.js. Utan bevis skrivs ingenting, oavsett flagga.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { VILLKORSBOK } from '../lib/contract-intel.js';
import { extraheraTextlager } from '../lib/pdf-textlager.js';
import { lasKlausul, LAS_UTFALL, normaliseraOrdagrant } from '../lib/villkorslasare.js';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const SKRIV = process.argv.includes('--forsegla');
const IDAG = new Date().toISOString().slice(0, 10);
const FIL = 'lib/contract-intel.js';

let allaFunna = true;

for (const [nyckel, post] of Object.entries(VILLKORSBOK)) {
  console.log(`\n═══ ${nyckel} · ${post.supplier} ═══`);
  console.log(`  källa: ${post.kalla}`);

  let bytes;
  try {
    const res = await fetch(post.kalla, { headers: { 'User-Agent': UA, Accept: 'application/pdf,*/*' }, redirect: 'follow', signal: AbortSignal.timeout(45000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    bytes = Buffer.from(await res.arrayBuffer());
  } catch (e) {
    console.log(`  ✗ OLÄSBAR — dokumentet gick inte att hämta (${e.message})`);
    allaFunna = false;
    continue;
  }
  const hash = createHash('sha256').update(bytes).digest('hex');
  console.log(`  hämtat: ${bytes.length} byte · sha256 ${hash}`);

  let text = '', sidor = 0, stadnot = null;
  try {
    ({ text, sidor, stadnot } = await extraheraTextlager(bytes));
  } catch (e) {
    console.log(`  ✗ OLÄSBAR — textlagret gick inte att extrahera (${e.message.slice(0, 90)})`);
    allaFunna = false;
    continue;
  }
  console.log(`  textlager: ${sidor} sidor · ${normaliseraOrdagrant(text).length} tecken (utan blanksteg)` + (stadnot ? ` · ${stadnot}` : ''));

  const dom = lasKlausul({ text, citat: post.citat, kontrollfras: post.kontrollfras });
  const ORD = { funnen: 'FUNNEN', saknas: 'SAKNAS', olasbar: 'OLÄSBAR' };
  console.log(`  läsning: ${ORD[dom.utfall] ?? dom.utfall.toUpperCase()} — ${dom.skal}`);
  if (dom.bevis) console.log(`  brytpunkt: ${dom.bevis}`);

  if (dom.utfall !== LAS_UTFALL.FUNNEN) {
    allaFunna = false;
    // Ett smakprov ur den VERKLIGA texten, så att en kontrollfras kan kureras ur bevisat
    // extraherad text i stället för ur någons minne. Aldrig en gissning — alltid ett citat.
    const prov = text.replace(/\s+/g, ' ').trim().slice(0, 400);
    console.log(`  ── smakprov ur textlagret (för att kurera kontrollfras) ──\n  «${prov}»`);
    continue;
  }

  console.log(`  ✓ FÖRTJÄNAD: citatet står ordagrant i exakt de bytes som hashats.`);
  if (!SKRIV) { console.log('  (torrkörning — kör med --forsegla för att skriva in beviset)'); continue; }

  // Skriv förseglingen. Läsning och ankare får SAMMA datum, för de skedde i samma sekund mot
  // samma bytes — det är hela skälet till att regeln "ankaret får aldrig vara nyare än
  // läsningen" nu kan uppfyllas i stället för kringgås.
  let kall = readFileSync(FIL, 'utf8');
  const block = new RegExp(`(\\n  ${nyckel}: \\{[\\s\\S]*?\\n  \\},)`);
  const m = kall.match(block);
  if (!m) { console.log(`  ✗ kunde inte hitta postblocket för '${nyckel}' i ${FIL} — skriver ingenting`); allaFunna = false; continue; }

  let post_ny = m[1]
    .replace(/\n    verifierad: '[^']*',/, `\n    verifierad: '${IDAG}',`)
    .replace(/\n    dokumentSha256: '[^']*',/, '')
    .replace(/\n    forsegladDatum: '[^']*',/, '');
  post_ny = post_ny.replace(/(\n    verifierad: '[^']*',)/,
    `$1\n    // FÖRSEGLAD ${IDAG} av scripts/forsegla-villkor.mjs: citatet lästes ordagrant ur exakt\n`
    + `    // dessa bytes. Läsning och ankare i samma sekund — därför samma datum.\n`
    + `    dokumentSha256: '${hash}',\n    forsegladDatum: '${IDAG}',`);
  writeFileSync(FIL, kall.replace(m[1], post_ny));
  console.log(`  ✓ förseglad i ${FIL} (verifierad + forsegladDatum ${IDAG})`);
}

console.log(allaFunna
  ? '\n✓ Varje villkorspost bär nu ett läst och förseglat citat.'
  : '\n✗ Minst en post är inte förtjänad. Den förblir röd — det är rätt tillstånd.');
process.exitCode = allaFunna ? 0 : 1;
