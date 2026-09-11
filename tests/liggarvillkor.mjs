// tests/liggarvillkor.mjs — LV-01..05 · varje läsväg mot liggaren bär sin klass, och klassens villkor.
//
// ══ VARFÖR (2026-09-11, ur den fientliga granskningen av 6cd359f) ═══════════════════════════
// Jag stängde två dörrar och lämnade elva öppna, i samma session som jag citerade regeln mot det:
// **en fix som inte följs till alla konsumenter är en halv fix** (bibeln, 19 augusti).
//
// Granskaren mätte båda hålen:
//  · Testidentitetsgrinden satt på `storeDatapoint` (→ `invoice_datapoints`), men `invoice_analyses`
//    är en EGEN prisbokskälla med LÄGRE tröskel (5 mot 10) — alltså lättare att förorena än den
//    väg som stängdes. Samma skada, annan tabell.
//  · Arkivfiltret satt i 2 av 11 kundsynliga läsvägar. Månadsbriefingen, avtalspåminnelserna,
//    utfallsenkäten och prislarmens mottagarlista kunde alla mejla om rader kunden fått veta var
//    borttagna — arkiveringen hade varit en lögn i fyra ytor.
//
// Vakten finns för att den TOLFTE konsumenten ska hittas av en maskin, inte av nästa granskare.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: en ny eller flyttad läsväg utan klassmarkör; en `kundvy` utan arkivfilter; ett
//     `moat`-aggregat utan testidentitetsspärr; ett `internt` utan skäl.
//   BLIND: den läser markören, aldrig innebörden — en läsväg FELklassad som `internt` med ett
//     rimligt skäl passerar. Samma gräns som vaktkontraktet: maskinen ser att svaret finns, aldrig
//     att det är sant. Och räckvidden är `api/` + `lib/`; ett skript eller en framtida vy med annat
//     namn ligger utanför, uttalat.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { KLASSER, MOAT_UTESLUT_TEST } from '../lib/liggarvillkor.js';
import { TEST_EMAIL } from '../lib/test-surface.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');

function kallfiler() {
  const ut = [];
  const ga = (d) => {
    for (const namn of readdirSync(d)) {
      if (namn.startsWith('.') || namn === 'node_modules') continue;
      const p = join(d, namn);
      if (statSync(p).isDirectory()) ga(p);
      else if (namn.endsWith('.js') || namn.endsWith('.mjs')) ut.push(p);
    }
  };
  ga(join(ROT, 'api')); ga(join(ROT, 'lib'));
  return ut;
}

/** Varje förekomst av FROM invoice_analyses med sitt utsnitt fram till satsens slut. */
function lasvagar() {
  const ut = [];
  for (const fil of kallfiler()) {
    // ⚠️ REGELNS EGEN DOKUMENTATION ÄR INTE EN LÄSVÄG. `lib/liggarvillkor.js` CITERAR frasen i
    // sin förklaring, och vakten fällde den — samma form som RD-08 som larmade på en kommentar.
    // `strippaStrangar` är fel verktyg här: satserna vi vaktar ÄR mallsträngar, så den hade
    // blankat just det vi letar efter. Uteslutningen är därför namngiven, inte mönsterbaserad.
    // UTTALAD BLINDFLÄCK: prosa i en ANNAN fil som nämner frasen ger fortfarande falsklarm — men
    // ett falsklarm är högljutt och lätt att rätta, medan en tyst miss är den farliga riktningen.
    if (fil.endsWith('lib/liggarvillkor.js')) continue;
    const kod = readFileSync(fil, 'utf8');
    for (let i = kod.indexOf('FROM invoice_analyses'); i !== -1; i = kod.indexOf('FROM invoice_analyses', i + 1)) {
      // Utsnittet går till mallens slut (backtick) eller 700 tecken — vilket som kommer först.
      // Backticken är satsens VERKLIGA gräns; teckentaket är bara ett tak, aldrig ankaret.
      const slutBacktick = kod.indexOf('`', i);
      const slut = slutBacktick === -1 ? i + 700 : Math.min(slutBacktick, i + 700);
      ut.push({ fil: relative(ROT, fil), rad: kod.slice(0, i).split('\n').length, sats: kod.slice(i, slut) });
    }
  }
  return ut;
}

describe('LV · liggarens läsvägar är klassade', () => {
  const vagar = lasvagar();

  test('LV-01 · vakten hittar läsvägarna alls (aldrig grön av tomhet)', () => {
    // Mätt 2026-09-11: 29 förekomster i 14 filer. Ett tal, inte en tröskel — sjunker det har
    // antingen en läsväg försvunnit eller mönstret slutat matcha, och båda ska synas.
    assert.ok(vagar.length >= 25, `hittade ${vagar.length} läsvägar — mätt: 29. En vakt som matchar noll blir grön av tomhet`);
  });

  test('LV-02 · varje läsväg bär en klassmarkör', () => {
    const omarkta = vagar.filter((v) => !KLASSER.some((k) => v.sats.includes(`liggare: ${k}`)));
    assert.deepEqual(omarkta.map((v) => `${v.fil}:${v.rad}`), [],
      'en omärkt läsväg är en oställd fråga — klassa den som kundvy, moat eller internt: <skäl>');
  });

  test('LV-03 · en KUNDVY filtrerar alltid bort arkiverade rader', () => {
    // Arkivering betyder «borta ur kundens vy». En yta som ändå räknar raden gör arkiveringen
    // till en lögn — och kunden får ett mail om en faktura hen bad oss ta bort.
    const brott = vagar.filter((v) => v.sats.includes('liggare: kundvy') && !v.sats.includes('arkiverad_at IS NULL'));
    assert.deepEqual(brott.map((v) => `${v.fil}:${v.rad}`), [],
      'en kundvy utan arkivfilter visar rader kunden fått veta är borttagna');
  });

  test('LV-04 · ett MOAT-aggregat utesluter alltid testidentiteten', () => {
    // En testfaktura är inte en marknadsobservation, hur äkta talet än är. Och den här tabellen
    // är en egen prisbokskälla med LÄGRE tröskel än datapunkterna — lättare att förorena.
    const brott = vagar.filter((v) => v.sats.includes('liggare: moat') && !v.sats.includes('MOAT_UTESLUT_TEST'));
    assert.deepEqual(brott.map((v) => `${v.fil}:${v.rad}`), [],
      'ett tvärkunds-aggregat utan testidentitetsspärr kan prissätta på våra egna testfakturor');
    // Och spärren måste peka på testytans EGNA konstant — en kopierad sträng glider isär.
    assert.equal(MOAT_UTESLUT_TEST, TEST_EMAIL, 'moat-spärren måste vara samma identitet som testytan använder');
  });

  test('LV-05 · ett INTERNT undantag bär alltid sitt skäl', () => {
    // «internt» utan motivering är «ingen frågade» förklätt till «prövat» — och de två får
    // aldrig se likadana ut (samma regel som triage-bokföringens inline-undantag).
    const utanSkal = vagar.filter((v) => v.sats.includes('liggare: internt') && !/liggare: internt: \S/.test(v.sats));
    assert.deepEqual(utanSkal.map((v) => `${v.fil}:${v.rad}`), [],
      'skriv `liggare: internt: <skäl>` — ett undantag utan skäl kan ingen granska');
    // Motprovet: det FINNS interna undantag, annars vaktar LV-05 ingenting.
    assert.ok(vagar.some((v) => v.sats.includes('liggare: internt:')), 'inga interna undantag alls — kontrollera mönstret');
  });
});
