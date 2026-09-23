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
import { domensLage, beromsLage, omattLage, DOMLAGEN } from '../lib/lagesregister.js';

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

describe('DL-07 · Rummets fyra ytor väljer text per LÄGE, aldrig ur rådata', () => {
  // ⚠️ OMSKRIVEN 2026-09-23 (Lägesregistret). Vakten krävde förut att varje yta läste `standing` i sin
  // EGEN gren — ett försvar mot att en gren tog fel utgång. Grenarna finns inte längre: läget räknas i
  // api-lagret (lib/lagesregister.js) och ytorna slår upp sin text i DOMTEXT per läge. Invarianten är
  // densamma — rubrik, dom, hjälte och bevakningskort kan inte välja text utan läget — men den prövas
  // nu där texten VÄLJS. LR-03 kräver att DOMTEXT täcker exakt registrets lägen.
  const kod = readFileSync(join(ROT, 'src', 'pages', 'Portfolio', 'index.js'), 'utf8');
  test('veckodomens rubrik och arbetsrad slås upp på läget', () => {
    assert.match(kod, /const domText = DOMTEXT\[domLage\]/);
    assert.match(kod, /const verdictHead = domText\?\.head/);
    assert.match(kod, /const verdictWork = domText\?\.work/);
    assert.doesNotMatch(kod, /const verdictHead = !acting|const verdictWork = !acting/, 'den gamla grenen på rådata lever kvar');
  });
  test('hjälterubriken slås upp på läget', () => {
    const h1 = kod.slice(kod.indexOf('<h1>{greeting}'), kod.indexOf('</h1>', kod.indexOf('<h1>{greeting}')));
    assert.ok(h1.length > 10, 'hittade inte hjälterubriken');
    assert.match(h1, /domText\?\.h1/);
  });
  test('läget kommer från API:t, inte ur en egen härledning', () => {
    assert.match(kod, /const domLage = rum\?\.lage/);
    assert.doesNotMatch(kod, /domensLage\(|computeActing\(|roomCounts\(/, 'rummet räknar sitt läge själv igen');
  });
  test('bevakningskortets beröm kräver registrets besked om beröm', () => {
    const i = kod.indexOf('inga byten på bordet just nu. Lugnet');
    assert.ok(i > 0, 'hittade inte bevakningskortet — vakten mäter fel objekt');
    assert.match(kod.slice(Math.max(0, i - 400), i), /rum\?\.berom/, 'berömmet väljs utan registrets besked');
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
  test('DL-09 · fyndläget säger aldrig att priserna står sig', async () => {
    // ⚠️ OMSKRIVEN 2026-09-23. Förut: «priserna står sig» villkorat av prissatta > 0. Men läget `fynd`
    // deklarerar positivtPrispastaende: false OAVSETT antal prissatta — och grenen sa «Era avtal står
    // sig» så snart en enda faktura var prissatt, också när den låg över golvet (mätt i översynen).
    // Meningarna är strukna ur rummet; fyndläget beskriver fyndet och inget annat.
    const { readFileSync } = await import('node:fs');
    const kalla = readFileSync(new URL('../src/pages/Portfolio/index.js', import.meta.url), 'utf8');
    const kod = kalla.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    const fynd = kod.slice(kod.indexOf('    fynd: {'), kod.indexOf('  };', kod.indexOf('    fynd: {')));
    assert.ok(fynd.length > 50, 'hittade inte fyndlägets text — testet får inte bli grönt av tomhet');
    assert.doesNotMatch(fynd, /står sig/, 'fyndläget fäller ett prispåstående registret förbjuder');
    assert.doesNotMatch(kod, /Era avtal står sig|priserna står sig/);
    assert.match(kod, /inget verifierat jämförelsepris/,
      'utan jämförelse ska rummet säga att det inte hävdar något — inte tiga om att det inte vet');
  });
});

// ── DL-10 · INGEN KUNDYTA FÅR DÖMA PRISET I EN GREN SOM BARA VET ATT INGET BYTE FANNS ────────
//
// GRUNDARENS MICROSOFT-KORT (2026-09-08). Rubriken sa «Marknadsmässigt pris.» — ovillkorligt, i
// den gren som fyrar så snart inget byte hittas. Rakt under stod brödtexten: «Att ligga under
// listpris är väntat … så det är INGET KVITTO PÅ ATT PRISET ÄR RÄTT.» Rubriken motsade sin egen
// kropp, på samma kort, i samma ögonblick.
//
// Satsen är bibelns, nu tredje gången (19 aug ringen/pillen/prosan, 22 aug veckodomen, nu
// analyskortet + mailet): FRÅNVARON AV ETT VERIFIERAT BYTESMÅL SÄGER INGENTING OM HURUVIDA
// ── DL-10/DL-11 · DET OMÄTTA LÄGET (2026-09-11, funnet i skärmdumpen av det SKARPA rummet) ──
// Regel 8 efter prisboksgrinden. Rummet visade samtidigt:
//   rubrik      «God kväll. Allt är under kontroll.»
//   domen       «Vi vaktar era avtal — men er position mot listpris kunde inte mätas i dag.»
//   bevakningen «Era priser står sig — inga byten på bordet just nu. Lugnet att ni ligger rätt …»
// Två ytor bar en TVÅVÄGSGREN (`satt && niva === 'samre' ? … : <positivt>`) på ett TREVÄRT
// tillstånd och föll därför till det positiva när positionen var OMÄTT. Registret deklarerade
// `lugn_omatt` hela tiden — ingen frågade det. Prisboksgrinden gör läget VANLIGARE (fyra av fem
// bärande celler tystnade), och bibeln är tydlig: en fix som gör ett gammalt redovisningsfel
// vanligare måste stänga det också.
describe('DL-10/11 · omätt läge får aldrig bli ett positivt påstående', () => {
  test('DL-10 · omattLage är sann för BÅDA omätta lägena och falsk för alla andra', () => {
    const omatta = Object.keys(DOMLAGEN).filter((l) => omattLage(l));
    assert.deepEqual(omatta.sort(), ['byte_omatt', 'lugn_omatt'],
      'exakt de två lägen som saknar mätning ska räknas som omätta');
    for (const lage of omatta) {
      assert.equal(beromsLage(lage), false, `${lage} får aldrig bära ett positivt prispåstående`);
    }
    // Motprovet: ett MÄTT lugnt läge är inte omätt — annars tystar vakten rätt beteende.
    assert.equal(omattLage('lugn_battre'), false);
    assert.equal(omattLage('lugn_i_niva'), false);
  });

  test('DL-11 · rummets ytor läser det omätta läget ur API:t i stället för att gissa', () => {
    // ⚠️ OMSKRIVEN 2026-09-23 (Lägesregistret): registret bor i lib/ och läget kommer i `data.rum`.
    const rummet = readFileSync(join(ROT, 'src/pages/Portfolio/index.js'), 'utf8');
    assert.match(rummet, /const omatt = rum\?\.omatt === true/, 'läget härleds EN gång, ur API:t');
    // Hjälten i det omätta läget: aldrig «Allt är under kontroll».
    const omattBlock = rummet.slice(rummet.indexOf('    lugn_omatt: {'), rummet.indexOf('    byte_battre: {'));
    assert.ok(omattBlock.length > 100, 'hittade inte det omätta lägets text');
    assert.match(omattBlock, /h1: 'Vi vaktar era avtal\.'/);
    assert.doesNotMatch(omattBlock, /under kontroll|står sig|behöver inte göra något|Vi jämförde/,
      'det omätta läget lånar ett påstående det inte kan bära');
    assert.equal((rummet.match(/<Tally>/g) ?? []).length, 1, 'flera <Tally> — utsnittet nedan vaktar fel kort');
    const tally = rummet.slice(rummet.indexOf('<Tally>'), rummet.indexOf('</Tally>'));
    assert.ok(tally.length > 500, `utsnittet är ${tally.length} tecken — en vakt kan inte bli grön av tomhet`);
    const positiv = tally.indexOf('Era priser står sig');
    const omattGren = tally.indexOf('omatt');
    assert.ok(omattGren >= 0 && omattGren < positiv,
      'det omätta fallet måste prövas FÖRE den positiva grenen — annars fångar den allt');
  });
});

// KUNDEN BETALAR RÄTT. DL-01..09 låste rummet. De två ytor kunden möter FÖRST — analyskortet på
// /testa-faktura och svarsmailet — hade aldrig frågat samma fråga.
//
// FÅNGAR: att frasen «marknadsmässigt pris» (i valfri kasus) återinförs i någon kundyta.
// BLIND: vakten läser ORD, aldrig innebörd. En ny formulering med samma påstående
//   («ni har bra betalt», «priset är i linje») syns inte härifrån. Den flyttar bevisbördan till
//   något en granskare kan slå upp; den bär den inte. Ett påstående om PRISET hör hemma bakom
//   `beromsLage()`, och det är den regeln — inte den här ordlistan — som är skyddet.
describe('DL-10 · Beslutet får beskrivas, priset får inte dömas utan mätning', () => {
  // Ytor som bär ett PRISOMDÖME till kunden. Granskningen 8 sep: listan hade två, men TRE ytor
  // renderar prisprosan — `api/send-analysis.mjs` skriver samma `recommendation.reasoning` till
  // både PDF:en (:256) och mailet (:412). Den har ingen EGEN rubrik i dag, och det är just därför
  // den ska stå här: vakten finns för att en framtida hårdkodad rubrik inte ska kunna smyga in
  // på den yta ingen tittade på. (Prosan själv vaktas av RK-16/RK-17, som prövar betydelsen.)
  const YTOR = [
    '../src/pages/TestaFaktura/index.js',
    '../api/inbound-email.mjs',
    '../api/send-analysis.mjs',
  ];
  // De ytor som har en EGEN rubrik och därför måste ge ett eget besked. send-analysis renderar
  // den delade prosan och har ingen rubrik att kräva — att kräva en av den vore att kräva en
  // andra sanning om samma faktura (regel 1).
  const YTOR_MED_EGEN_RUBRIK = YTOR.slice(0, 2);

  test('DL-10 · «marknadsmässigt pris» står inte i någon kundyta', async () => {
    const { readFileSync } = await import('node:fs');
    const traffar = [];
    for (const y of YTOR) {
      const kalla = readFileSync(new URL(y, import.meta.url), 'utf8');
      // Kommentarer räknas inte: de förklarar varför frasen ÄR borta (och den här filens egen
      // motivering skulle annars fälla sitt eget prov).
      const kod = kalla.split('\n').filter((r) => !r.trim().startsWith('//') && !r.trim().startsWith('*')).join('\n');
      if (/marknadsmässigt pris/i.test(kod)) traffar.push(y);
    }
    assert.deepEqual(traffar, [],
      'ett positivt prispåstående i en gren som bara vet att inget bytesmål fanns');
  });

  test('DL-10b · och grenen säger fortfarande något — tystnad är inte fixen', async () => {
    const { readFileSync } = await import('node:fs');
    // ⚠️ VAKTEN LÅSTE STRÄNGENS PLATS, INTE EGENSKAPEN (rättat 2026-09-08). Den krävde literalen
    // i varje ytfil — och fällde när rubriken flyttades till sitt REGISTER (ANALYSRUBRIKER i
    // src/lib/diagnos.js), alltså när ytan blev BÄTTRE. En vakt som larmar på rätt beteende blir
    // avstängd; egenskapen är att kunden får ett besked, inte var strängen råkar bo.
    const { ANALYSRUBRIKER } = await import('../src/lib/diagnos.js');
    assert.match(ANALYSRUBRIKER.inget_byte.rubrik, /Inget byte att rekommendera/,
      'registret måste bära beskedet om vad vi BESLUTAT');
    for (const y of YTOR_MED_EGEN_RUBRIK) {
      const kalla = readFileSync(new URL(y, import.meta.url), 'utf8');
      assert.ok(/Inget byte att rekommendera/.test(kalla) || /ANALYSRUBRIKER/.test(kalla),
        `${y} måste ge kunden ett besked — direkt, eller via ANALYSRUBRIKER`);
    }
    // Mailet och webben får aldrig säga olika saker (regel 5) — därför prövas båda, inte en.
    assert.equal(YTOR_MED_EGEN_RUBRIK.length, 2, 'båda rubrikytorna prövas (regel 5)');
    assert.equal(YTOR.length, 3, 'och ordvakten täcker alla tre ytor som bär prisprosan');
  });
});
