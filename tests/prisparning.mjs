// tests/prisparning.mjs — PP-01..08: ett pris binds till sin produkt, och kampanjpriset är
// aldrig listpriset.
//
// Fixturerna är RIKTIGA strängar ur sondernas utfall 2026-09-02/03 (ops/prislistor/), inte
// påhittade. Ett test som bygger sitt eget indata bevisar bara vidarebefordran — RO-01:s läxa,
// och den har fällt oss fyra gånger.
//
// FÅNGAR: ett pris utan namngiven produkt, ett kampanjpris som utges för listpris, och en
//   prisändring härledd ur en avläsning där produkten saknades.
// BLIND: modulen ser strängar, aldrig sidans mening. Att «Företag» hos Loopia avser webbhotell
//   och inte e-post kan ingen parsning avgöra — kontexten bärs fram för en människa.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import {
  listprisUrCell, parFranTabell, parFranKort, prisandringar, harPris,
} from '../lib/prisparning.js';

describe('PP · Kampanjpriset är aldrig listpriset', () => {
  test('PP-01 · Loopias egen cell: «39 kr första året därefter 279 kr» → 279', () => {
    // Ordagrant ur ops/prislistor/loopia.txt. Tas 39 som listpris blir en kund som betalar 279
    // en påstådd överbetalare med 615 % — HubSpot-fällan, mitt på leverantörens förstasida.
    const r = listprisUrCell('39 kr första året därefter 279 kr');
    assert.equal(r.listpris, 279);
    assert.equal(r.kampanjpris, 39);
    assert.equal(r.kampanj, true);
  });

  test('PP-02 · One.coms form «9 kr / 1:a året*» räknas också som kampanj', () => {
    // Detektorn missade förr just den här skrivningen och svarade lugnande «(inget)».
    assert.equal(listprisUrCell('9 kr / 1:a året*').kampanj, true);
    assert.equal(listprisUrCell('99 kr / 1:a året*').kampanj, true);
  });

  test('PP-03 · MOTPROVET — en ren prisrad rörs inte', () => {
    const r = listprisUrCell('209 kr/mån');
    assert.equal(r.listpris, 209);
    assert.equal(r.kampanjpris, null);
    assert.equal(r.kampanj, false, 'utan kampanjord ska ingen kampanj hittas på');
    assert.equal(listprisUrCell('1 908 kr').listpris, 1908, 'tusentalsavgränsare ska bäras');
    assert.equal(listprisUrCell('ingen siffra alls').listpris, null);
  });
});

describe('PP · Ett pris binds till sin produkt', () => {
  test('PP-04 · Loopias tabell: kolumnrubriken är paketet, radetiketten är perioden', () => {
    // Ordagrant ur sondens utfall: fem produkter × tre faktureringsperioder.
    const par = parFranTabell(
      ['', 'E-post', 'Loopia Starter', 'Webbhotell Privat', 'Webbhotell Företag'],
      [['Pris / mån (årsvis fakturering)', '79 kr', '89 kr', '39 kr första året därefter 159 kr', '39 kr första året därefter 279 kr']],
      'Jämför våra webbhotellspaket',
    );
    assert.equal(par.length, 4);
    const foretag = par.find((p) => p.paket === 'Webbhotell Företag');
    assert.equal(foretag.listpris, 279, 'listpriset, inte kampanjpriset');
    assert.equal(foretag.rad, 'Pris / mån (årsvis fakturering)',
      'perioden måste följa med — samma produkt kostar 279 årsvis och 299 månadsvis');
    assert.equal(foretag.kontext, 'Jämför våra webbhotellspaket');
  });

  test('PP-05 · ett pris UTAN kolumnrubrik blir inget par', () => {
    // Ett tal utan produkt är ett tal utan påstående. Hellre inget par än ett anonymt.
    const par = parFranTabell(['', '', ''], [['rad', '100 kr', '200 kr']], 'x');
    assert.deepEqual(par, []);
  });

  test('PP-06 · Oderlands domäntabell bär sin kontext så att den GÅR att avvisa', () => {
    // Sonden rapporterade 40 par som alla var domänpriser på en hosting-sida. Parsningen kan
    // inte avgöra relevans — men den ska göra det omöjligt att missa vad tabellen handlar om.
    const par = parFranTabell(
      ['', '.se', '.com'],
      [['REGISTRERING', '229,00 kr', '209,00 kr']],
      'Bestämt dig för vilken toppdomän du vill ha?',
    );
    assert.equal(par.length, 2);
    for (const p of par) {
      assert.match(p.kontext, /toppdomän/, 'kontexten måste bäras fram oförvanskad');
    }
  });

  test('PP-07 · kortformen: Fortnox «Mini → 209 kr/mån»', () => {
    const p = parFranKort(['Mini', 'Bokföring för enskild firma', '209 kr/mån'], 'prislista');
    assert.equal(p.paket, 'Mini');
    assert.equal(p.listpris, 209);
    assert.equal(parFranKort(['bara text utan pris'], ''), null, 'utan pris finns inget par');
    assert.equal(parFranKort(['499 kr'], ''), null, 'utan namn finns inget par');
    assert.ok(harPris('209 kr/mån') && !harPris('Mini'));
  });
});

describe('PP · Produktens identitet är paket + rad, aldrig paket ensamt', () => {
  test('PP-09 · två RADER i samma tabell är inte en prisändring över tid', () => {
    // Det dyraste felet i hela prisdata-arbetet, funnet mot Fortnox arkiverade fakturaservice-
    // tabell. Där är KOLUMNRUBRIKEN en kostnadstyp och RADETIKETTEN produkten — så en gruppering
    // på enbart `paket` samlade varje rads pris i en serie och rapporterade skillnaderna MELLAN
    // RADER som höjningar över tid: «Kostnad för fakturautställare: 2 → 90 kr (+4400 %) ·
    // 2022-03-15 → 2022-03-15». Samma datum på båda sidor. 151 «ändringar», nästan alla brus.
    // Hade det matat Maktkalendern hade vi sagt till kunden att Fortnox höjt 4 400 %.
    const enOgonblicksbild = [{
      datum: '2022-03-15',
      par: [
        { paket: 'Kostnad för fakturautställare', rad: 'Fakturaservice postal faktura', listpris: 12 },
        { paket: 'Kostnad för fakturautställare', rad: '-Tillägg för A-post', listpris: 2 },
        { paket: 'Kostnad för fakturautställare', rad: 'Påminnelseservice', listpris: 90 },
      ],
    }];
    assert.deepEqual(prisandringar(enOgonblicksbild), [],
      'tre rader i EN ögonblicksbild är tre produkter, inte två prisändringar');

    // MOTPROVET: samma produkt (paket + rad) över TVÅ datum är en riktig ändring.
    const overTid = prisandringar([
      { datum: '2022-03-15', par: [{ paket: 'Kostnad för fakturautställare', rad: 'Påminnelseservice', listpris: 90 }] },
      { datum: '2024-01-23', par: [{ paket: 'Kostnad för fakturautställare', rad: 'Påminnelseservice', listpris: 99 }] },
    ]);
    assert.equal(overTid.length, 1);
    assert.equal(overTid[0].rad, 'Påminnelseservice', 'radetiketten måste följa med i utfallet');
    assert.equal(overTid[0].procent, 10);
  });

  test('PP-11 · IDENTITETEN ensam lastbärande: samma paket, olika rad, över TVÅ datum', () => {
    // PP-09 kunde inte skilja de två vakterna åt: tog jag bort identitetsnyckeln räddades testet
    // av datumspärren, och tvärtom. Två vakter som maskerar varandra är två OPRÖVADE vakter —
    // «en vakt vars sabotage inte fäller är ingen vakt». Här är datumspärren verkningslös, så
    // bara den sammansatta nyckeln kan hålla.
    const oforandrat = [
      { datum: '2022-03-15', par: [
        { paket: 'Kostnad för fakturautställare', rad: 'A-post', listpris: 12 },
        { paket: 'Kostnad för fakturautställare', rad: 'Påminnelse', listpris: 90 },
      ] },
      { datum: '2024-01-23', par: [
        { paket: 'Kostnad för fakturautställare', rad: 'A-post', listpris: 12 },
        { paket: 'Kostnad för fakturautställare', rad: 'Påminnelse', listpris: 90 },
      ] },
    ];
    assert.deepEqual(prisandringar(oforandrat), [],
      'inget pris rörde sig — varje «ändring» här vore ett hopp mellan två olika produkter');
  });

  test('PP-12 · DATUMSPÄRREN ensam lastbärande: samma produkt två gånger i EN bild', () => {
    // Här är identitetsnyckeln verkningslös (samma paket OCH samma rad), så bara datumspärren
    // kan hindra att en dubblerad tabellrad blir en prisändring.
    const dubblett = [{ datum: '2022-01-01', par: [
      { paket: 'X', rad: 'r', listpris: 10 },
      { paket: 'X', rad: 'r', listpris: 20 },
    ] }];
    assert.deepEqual(prisandringar(dubblett), [],
      'två avläsningar i samma ögonblicksbild är samma mätpunkt, aldrig en förändring');
  });

  test('PP-10 · ett nollpris ger ingen procent — «+Infinity %» är inget mätvärde', () => {
    const a = prisandringar([
      { datum: '2022-01-01', par: [{ paket: 'X', rad: '', listpris: 0 }] },
      { datum: '2023-01-01', par: [{ paket: 'X', rad: '', listpris: 60 }] },
    ]);
    assert.equal(a.length, 1, 'ändringen finns — 0 till 60 kr är en verklig förändring');
    assert.equal(a[0].procent, null, 'men procenten är ODEFINIERAD, inte Infinity');
    assert.equal(a[0].tillPris, 60);
  });
});

describe('PP · En prisändring kräver TVÅ lästa tal', () => {
  test('PP-08 · ett saknat pris är aldrig en ändring, och ingenting interpoleras', () => {
    // Att en arkiverad ögonblicksbild inte bär produkten kan betyda att arkivet missade den
    // delen av sidan. Skulle frånvaro räknas som en ändring skulle varje lucka i arkivet bli
    // en påhittad prishöjning — felfamiljen i historikens form.
    const andringar = prisandringar([
      { datum: '2024-12-08', par: [{ paket: 'Mini', listpris: 169 }] },
      { datum: '2025-05-12', par: [] },                                   // arkivet missade sidan
      // OCH DET FARLIGARE FALLET: produkten SYNS men priset gick inte att läsa (JS-renderat
      // belopp i en arkiverad sida). Utan spärren blir `null` en mätpunkt, och serien får en
      // påhittad ändring 209 → null → 209. Mitt första sabotage fällde noll tester just för att
      // fixturen bara hade den tomma listan — spärren var oprövad.
      { datum: '2025-09-01', par: [{ paket: 'Mini', listpris: null }] },
      { datum: '2026-08-22', par: [{ paket: 'Mini', listpris: 209 }] },
    ]);
    assert.equal(andringar.length, 1, 'två lästa tal ger EN ändring, inte två');
    assert.deepEqual(andringar[0], {
      paket: 'Mini', rad: '', fran: '2024-12-08', till: '2026-08-22',
      franPris: 169, tillPris: 209, procent: 23.7,
    });

    // MOTPROVET: oförändrat pris är ingen ändring.
    assert.deepEqual(prisandringar([
      { datum: '2025-01-01', par: [{ paket: 'Mini', listpris: 209 }] },
      { datum: '2026-01-01', par: [{ paket: 'Mini', listpris: 209 }] },
    ]), []);
  });
});
