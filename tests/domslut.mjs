// tests/domslut.mjs — DL-01..07
//
// Ur den första skärmdumpen på hela obduktionen (2026-08-21). Rummet visade «Håll kursen. Era
// priser står sig mot verifierat listpris» rakt ovanför Arvo Score 15/100 och MARKNADSLÄGE:
// SÄMRE — och «Allt är under kontroll» som rubrik. Tre av fyra ytor översatte «vi har inget byte
// att lägga fram» till «ert pris är bra».
//
// Att det inte upptäcktes förrän jag följde regel 8 är läxan: jag hade lagat tolv fel i
// backend under ett dygn utan att en enda gång titta på vad kunden ser.
//
// FÅNGAR: att ett läge som gör ett positivt PRISPÅSTÅENDE kan väljas när mätaren inte säger
//   «bättre»; att en ny gren införs utan deklaration; att det omätta fallet berömmer.
// BLIND: prövar LÄGET, inte den slutliga svenskan. En berömmande mening skriven i ett läge som
//   deklarerats neutralt ses inte — texten bor bredvid deklarationen för att hålla avståndet
//   kort, men avståndet är inte noll.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { domensLage, beromsLage, DOMLAGEN } from '../src/lib/domslut.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const st = (niva) => (niva == null ? { satt: false, niva: null } : { satt: true, niva });

describe('DL · Domen kan inte berömma ett pris mätaren underkänner', () => {
  test('DL-01 · INVARIANTEN över hela fältet: beröm kräver niva === battre', () => {
    // Prövas som en invariant, inte på ett exempel — det var punktprovet som lät felet leva.
    for (const acting of [true, false]) {
      for (const hasSwitch of [true, false]) {
        for (const niva of ['battre', 'i-niva', 'samre', null]) {
          const lage = domensLage({ acting, hasSwitchAction: hasSwitch, standing: st(niva) });
          if (beromsLage(lage)) {
            assert.equal(niva, 'battre',
              `läget «${lage}» gör ett positivt prispåstående vid niva=${niva} ` +
              `(acting=${acting}, byte=${hasSwitch}). Frånvaron av ett bytesmål säger ingenting ` +
              'om huruvida kunden betalar rätt.');
          }
        }
      }
    }
  });

  test('DL-02 · det exakta fallet ur skärmdumpen: score 15, inget byte → inget beröm', () => {
    const lage = domensLage({ acting: false, hasSwitchAction: false, standing: st('samre') });
    assert.equal(lage, 'lugn_over_golvet');
    assert.equal(beromsLage(lage), false,
      'det här är raden som sa «Håll kursen. Era priser står sig» vid Arvo Score 15');
  });

  test('DL-03 · en kund som FAKTISKT ligger bra får fortfarande sitt beröm', () => {
    // Motprovet. En spärr som tystar allt är lika värdelös som ingen spärr.
    assert.equal(beromsLage(domensLage({ acting: false, hasSwitchAction: false, standing: st('battre') })), true);
  });

  test('DL-04 · omätt position berömmer aldrig', () => {
    for (const acting of [true, false]) {
      const lage = domensLage({ acting, hasSwitchAction: false, standing: st(null) });
      assert.equal(beromsLage(lage), false,
        'utan ett mätt score finns ingen position att påstå — samma disciplin som marketStanding');
    }
    assert.equal(beromsLage(domensLage({ acting: true, hasSwitchAction: true, standing: st(null) })), false);
  });

  test('DL-05 · saknad/trasig standing kraschar inte och berömmer inte', () => {
    for (const s of [undefined, null, {}, { satt: true }, { niva: 'battre' }]) {
      const lage = domensLage({ acting: false, hasSwitchAction: false, standing: s });
      assert.ok(lage in DOMLAGEN, `okänt läge «${lage}» för standing=${JSON.stringify(s)}`);
      if (s?.satt !== true) {
        assert.equal(beromsLage(lage), false, 'en halv standing får aldrig ge beröm');
      }
    }
    assert.ok(domensLage() in DOMLAGEN, 'ett tomt anrop måste ge ett giltigt läge, inte krascha');
  });

  test('DL-06 · varje läge funktionen kan returnera är deklarerat', () => {
    // En gren utan deklaration skulle passera DL-01 tyst (beromsLage → false på undefined).
    const sedda = new Set();
    for (const acting of [true, false]) {
      for (const hasSwitch of [true, false]) {
        for (const niva of ['battre', 'i-niva', 'samre', null]) {
          sedda.add(domensLage({ acting, hasSwitchAction: hasSwitch, standing: st(niva) }));
        }
      }
    }
    for (const lage of sedda) {
      assert.ok(lage in DOMLAGEN, `läget «${lage}» returneras men är inte deklarerat i DOMLAGEN`);
      assert.equal(typeof DOMLAGEN[lage].positivtPrispastaende, 'boolean',
        `läget «${lage}» saknar deklaration av om det påstår något om priset`);
    }
    assert.ok(sedda.size >= 8, `bara ${sedda.size} lägen nås — vakten prövar inte hela fältet`);
  });
});

describe('DL-07 · Rummets fyra ytor är villkorade på mätaren', () => {
  // Källtextvakt som komplement: de fyra ytor som ljög i skärmdumpen måste var och en läsa
  // `standing`. Prövar inte svenskan — bara att grenen inte kan väljas utan mätaren.
  const kod = readFileSync(join(ROT, 'src', 'pages', 'Portfolio', 'index.js'), 'utf8');

  // Vakten prövar EXAKT den gren som ljög — inte ett fönster runt den. Första versionen använde
  // ett symmetriskt fönster på ±700 tecken och stod GRÖN när originalbuggen återinfördes:
  // `standing` fanns i GRANNENS gren (hasSwitchAction-fallet ligger direkt efter). Grön på fel
  // grund, i den vakt som byggdes mot precis den sjukdomen. Sabotaget avslöjade det.
  const gren = (namn, fran, till) => {
    const i = kod.indexOf(fran);
    assert.ok(i > 0, `hittade inte ${namn}s startankare — vakten mäter fel objekt`);
    const j = kod.indexOf(till, i + fran.length);
    assert.ok(j > i, `hittade inte ${namn}s slutankare — grenen kan inte avgränsas`);
    return kod.slice(i, j);
  };
  const kravVillkorad = (namn, block) => {
    assert.match(block, /standing\.(satt|niva)/,
      `${namn} väljer sin text utan att läsa mätaren. Det var precis så «Era priser står sig» ` +
      'hamnade ovanför Arvo Score 15.');
  };

  test('veckodomens rubrik läser standing i sin EGNA gren', () =>
    kravVillkorad('verdictHead', gren('verdictHead', 'const verdictHead = !acting', ': hasSwitchAction')));
  test('veckodomens arbetsrad läser standing i sin EGNA gren', () =>
    kravVillkorad('verdictWork', gren('verdictWork', 'const verdictWork = !acting', ': hasSwitchAction')));
  test('hjälterubriken läser standing', () =>
    kravVillkorad('H1', gren('H1', '<h1>{greeting}', '</h1>')));
  test('bevakningskortet läser standing i grenen närmast texten', () => {
    // Bakåt 340 tecken: villkoret står FÖRE texten (uppmätt avstånd 330), och fönstret är för smalt
    // att nå grannens gren.
    const i = kod.indexOf('inga byten på bordet just nu');
    assert.ok(i > 0, 'hittade inte bevakningskortet — vakten mäter fel objekt');
    kravVillkorad('bevakning', kod.slice(Math.max(0, i - 340), i));
  });
});

// ── DL-09: «PRISERNA STÅR SIG» KRÄVER ATT NÅGOT FAKTISKT JÄMFÖRTS ───────────────────────────
// Funnet i live-granskningen 2026-08-24 (regel 8 — jag tittade på rummet i 1600 px). Rummet sa:
//   «Vi jämförde 0 fakturor mot verifierat publikt listpris — priserna står sig.»
// Meningen motsäger sig själv: noll jämförelser bär inget prispåstående. Och rakt under stod
// scoren och sa motsatsen, ärligt: «Vi har inget verifierat jämförelsepris för era kategorier
// ännu ... ett tal utan mätning är värre än inget tal», plus vaktens kvitto «Vägde 0 fakturor».
//
// Lägesregistret DEKLARERADE redan att läget inte gör något prispåstående (fynd:
// positivtPrispastaende: false) — men prosan gjorde det ändå. Registret och texten var oense,
// vilket är exakt den blindfläck domslut.js skrev ut om sig själv. DL-09 stänger den för det
// läge som faktiskt bar motsägelsen.
//
// BLIND: vakten läser den ROUTADE sidans källtext. PortfolioJuli26 bär en snarlik mening men är
// inte routad (grep: ingen referens utanför dess egen katalog) — död kod, uttalat.
describe('DL · Ett prispåstående kräver en jämförelse (live-granskningen 2026-08-24)', () => {
  test('DL-09 · «priserna står sig» är villkorat av att prissatta > 0', async () => {
    const { readFileSync } = await import('node:fs');
    const kalla = readFileSync(new URL('../src/pages/Portfolio/index.js', import.meta.url), 'utf8');
    const kod = kalla.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');

    const i = kod.indexOf('priserna står sig');
    assert.notEqual(i, -1, 'hittade inte meningen — testet får inte bli grönt av tomhet');
    // Villkoret måste stå MELLAN grenens början och påståendet, inte någon annanstans i filen.
    const fore = kod.slice(Math.max(0, i - 400), i);
    assert.match(fore, /counts\.prissatta > 0/,
      'ett positivt prispåstående får aldrig renderas när noll fakturor jämförts');

    // SYSKONFALLET: rubriken bär samma påstående två rader upp. Jag fixade brödtexten och
    // missade rubriken — funnet först i mobilskärmdumpen. Båda måste villkoras.
    const j = kod.indexOf('Era avtal står sig');
    assert.notEqual(j, -1, 'hittade inte rubriken');
    assert.match(kod.slice(Math.max(0, j - 400), j), /counts\.prissatta > 0/,
      'rubriken «Era avtal står sig» är ett PRISpåstående och kräver samma villkor som brödtexten');

    // Och nollgrenen måste finnas och vara ärlig.
    assert.match(kod, /inget verifierat jämförelsepris/,
      'utan jämförelse ska rummet säga att det inte hävdar något — inte tiga om att det inte vet');
  });
});
