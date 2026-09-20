// tests/vaxelrad.mjs — VÄXELNS NÄMNARE, TESTLÅST.
//
// Bakgrund i `lib/vaxelrad.js`. Kort: växelkostnaden delades med `seatCount`, som på en kombinerad
// telekomfaktura är antalet SIM-KORT. Täljaren var växel, nämnaren en annan domän. Mätt på
// `telenor-molnvaxel-stor.pdf` (45 SIM, 50 licenser à 89 kr) visades «Ni betalar 108,87
// kr/användare och månad» i en mening kunden läser — ett tal som inte står på fakturan — och på
// T1-nivå blev det **+11,1 % över golvet för en kund som betalar exakt listpris**. Åt vårt håll.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { klassaVaxelrad, vaxelUnderlag, VAXELRAD } from '../lib/vaxelrad.js';
import { normalizeTelekomInvoice } from '../lib/telekom-normalize.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const L = (description, quantity, amount) =>
  ({ description, quantity, amount, type: 'recurring_subscription' });

// Fakturan är ORDAGRANT `telenor-molnvaxel-stor.pdf` (scripts/generate-test-invoices.mjs:632).
const TELENOR = { seatCount: 45, lineItems: [
  L('Telenor Business Smart (45 abonnemang) Maj 2026', 45, 17055),
  L('Telenor One Talk Molnväxel — 50 användarlicenser', 50, 4450),
  L('Telenor One Talk Reception (auto-svarare + IVR)', 1, 449),
] };

describe('VÄXELRADEN · nämnaren kommer ur fakturan, aldrig ur en annan domän', () => {
  test('RK-01 · hela den uppmätta radpopulationen klassas som dokumenterat', () => {
    // Klassningen HÄRLEDDES ur de sex växelrader som faktiskt finns i fixturkorpusen. Låset här
    // gör att härledningen inte kan glida ifrån populationen den byggdes på.
    const V = VAXELRAD;
    for (const [text, antal, vantad, vantatAntal] of [
      ['3 Molnväxel Business — månadsavgift',              1,  V.OKAND,         null],
      ['Tele2 Molnväxel Business 15 (tilläggstjänst)',     1,  V.OKAND,         null],
      ['Molnväxel tilläggslicenser (4 extra användare)',   4,  V.PER_ANVANDARE, 4],
      ['Telenor One Talk Molnväxel — 50 användarlicenser', 50, V.PER_ANVANDARE, 50],
      ['Telenor One Talk Reception (auto-svarare + IVR)',  1,  V.PER_BOLAG,     null],
      ['Telenor One Talk Molnväxel — 10 användarlicenser', 10, V.PER_ANVANDARE, 10],
    ]) {
      const r = klassaVaxelrad(L(text, antal, 100));
      assert.equal(r.klass, vantad, `${text} → ${r.klass} (${r.skal})`);
      assert.equal(r.antal, vantatAntal, text);
    }
  });

  test('RK-02 · REGRESSIONEN: 108,87 → 89,00, och nämnaren är 50 licenser inte 45 SIM', () => {
    const n = normalizeTelekomInvoice(TELENOR, 'Telenor');
    assert.ok(n, 'fakturan SKA kunna prissättas — licensantalet står på raden');
    assert.equal(n.perUserMonthlyExVat, 89,
      'per-användare-priset ska vara fakturans eget licenspris, inte växelkostnad ÷ SIM');
    assert.equal(n.seats, 50, 'nämnaren är de 50 avlästa licenserna, inte de 45 SIM-korten');
    assert.notEqual(n.seats, TELENOR.seatCount,
      'motprovet: om seats råkar bli lika med seatCount prövar testet ingenting');
  });

  test('RK-03 · FALSKLARMET ÄR BORTA: en kund på exakt golvet visas som exakt på golvet', () => {
    // Utan IVR-raden blir nivån T1 och golvet 89. Förut: 4450/45 = 98,89 → +11,1 % över.
    const utanIvr = { seatCount: 45, lineItems: TELENOR.lineItems.slice(0, 2) };
    const n = normalizeTelekomInvoice(utanIvr, 'Telenor');
    const golv = BRANCHINDEX.molnvaxel.teliaVerified.tiers.T1.fromMonthly;
    assert.equal(n.canonicalTier, 'T1');
    assert.equal(n.perUserMonthlyExVat, golv,
      `kunden betalar ${golv} kr/licens och ska visas som ${golv}, inte ${(4450 / 45).toFixed(2)}`);
    assert.ok(n.perUserMonthlyExVat <= golv, 'ingen överbetalning får hävdas mot ett pris = golvet');
  });

  test('RK-04 · FAIL-CLOSED: en klumpsumma utan läsbart licensantal tystar priset', () => {
    // `tre-mobil-molnvaxel`: en basavgift (antal 1, 1 290 kr) som täcker ett OKÄNT antal användare,
    // plus 4 extralicenser. Att summera till 5 licenser vore en uppfunnen nämnare.
    const tre = { seatCount: 12, lineItems: [
      L('3 Företag Obegränsat (12 SIM-kort) — Maj 2026', 12, 4188),
      L('3 Molnväxel Business — månadsavgift', 1, 1290),
      L('Molnväxel tilläggslicenser (4 extra användare)', 4, 596),
    ] };
    assert.equal(normalizeTelekomInvoice(tre, '3'), null, 'hela fakturan ska tystas');

    // Och en ensam klumpsumma likaså — «Business 15» får ALDRIG läsas som 15 licenser
    // (antalsdoktrinen: ett antal är en avläsning, eller så finns det inte).
    const tele2 = { seatCount: 8, lineItems: [L('Tele2 Molnväxel Business 15 (tilläggstjänst)', 1, 1490)] };
    assert.equal(normalizeTelekomInvoice(tele2, 'tele2'), null);

    const u = vaxelUnderlag([L('3 Molnväxel Business — månadsavgift', 1, 1290)]);
    assert.equal(u.ok, false);
    assert.match(u.avvisatSkal, /okänt|oläsbar/i, 'tystnaden ska bära sitt skäl, aldrig vara tom');
  });

  test('RK-05 · inget belopp försvinner: bolagsavgiften OCH det övriga redovisas', () => {
    const n = normalizeTelekomInvoice(TELENOR, 'Telenor');
    assert.equal(n.perBolagMonthly, 449,
      'receptionen ligger utanför divisionen men är en kostnad kunden betalar — den ska synas');
    assert.equal(n.perAnvandareMonthly, 4450);
    // ⚠️ TRANSPARENSFÄLTET LJÖG FÖRE 2026-09-19. «Telenor Business Smart (45 abonnemang)» matchar
    // inte MOBIL_LINE (som kräver «mobilabonnemang»/«företagsabonnemang»), så 17 055 kr/mån föll i
    // 'other' och lades åt sidan medan `excludedMobilMonthly` rapporterade 0. Beslutet var rätt,
    // redovisningen falsk — ett obokfört beslut går inte att skilja från ett tapp.
    assert.equal(n.excludedMobilMonthly, 0, 'raden matchar inte mobilvokabulären, och det är sant');
    assert.equal(n.excludedOvrigMonthly, 17055, 'men beloppet ska ändå vara bokfört');
    const summa = n.perAnvandareMonthly + n.perBolagMonthly
      + n.excludedMobilMonthly + n.excludedOvrigMonthly;
    assert.equal(summa, 17055 + 4450 + 449,
      'varje löpande rad ska gå att hitta i exakt en hink — inget får tappas tyst');
  });

  test('RK-06 · SIM-antalet kan inte längre påverka växelpriset', () => {
    // Det bärande motprovet. Samma faktura, tre olika seatCount → samma pris.
    const priser = [45, 1, 999, undefined].map((sc) =>
      normalizeTelekomInvoice({ ...TELENOR, seatCount: sc }, 'Telenor')?.perUserMonthlyExVat);
    assert.deepEqual(priser, [89, 89, 89, 89],
      'priset får inte röra sig med SIM-antalet — gör det, bor nämnaren fortfarande fel');
  });

  test('RK-07 · en namngiven användarenhet väger tyngre än ett funktionsord (SK-08)', () => {
    // Min första version lade bolagsregeln först och klassade «Smart Connect växel med
    // köhantering» (antal 20) som bolagstjänst — en vakt som fäller rätt beteende blir avstängd.
    const plan = klassaVaxelrad(L('Telia Smart Connect Använd. med köhantering', 20, 3000));
    assert.equal(plan.klass, VAXELRAD.PER_ANVANDARE);
    assert.equal(plan.antal, 20);
    // Motprovet: utan namngiven enhet är samma funktionsord fortfarande en bolagstjänst.
    const funktion = klassaVaxelrad(L('Svarsgrupp / Köhantering', 3, 297));
    assert.equal(funktion.klass, VAXELRAD.PER_BOLAG);
  });

  test('RK-08 · antal 1 utan namngiven enhet är tvetydigt — och tystnar', () => {
    assert.equal(klassaVaxelrad(L('Molnväxel Business — månadsavgift', 1, 1290)).klass, VAXELRAD.OKAND);
    // Men antal 1 MED namngiven enhet är en avläsning, inte en gissning.
    assert.equal(klassaVaxelrad(L('Molnväxel användarlicens', 1, 89)).klass, VAXELRAD.PER_ANVANDARE);
  });

  test('RK-09 · antalsdoktrinen: bara ett avläst heltal får bli nämnare', () => {
    for (const q of [null, undefined, 0, -3, 2.5, '', 'tolv', NaN]) {
      const r = klassaVaxelrad(L('Molnväxel Business', q, 1290));
      assert.notEqual(r.klass, VAXELRAD.PER_ANVANDARE, `antal ${JSON.stringify(q)} får inte bli nämnare`);
    }
    // 2,5 licenser är ett extraktionsfel, inte en licensmängd — även med namngiven enhet.
    assert.equal(klassaVaxelrad(L('Molnväxel användarlicenser', 2.5, 500)).klass, VAXELRAD.OKAND);
  });

  test('RK-11 · kundens text bär bara tal som står på fakturan', async () => {
    const { molnvaxelRecommendation } = await import('../lib/molnvaxel-recommendation.js');
    const r = molnvaxelRecommendation({ invoice: TELENOR, categorized: { category: 'molnvaxel' } });
    // Före 2026-09-19 stod här «Ni betalar 108,87 kr/användare och månad» — ett tal som inte fanns
    // på något papper. Nu är varje siffra i meningen en rad kunden kan peka på.
    assert.match(r.reasoning, /89,00 kr\/användare/, '4 450 / 50 = 89,00 står på fakturan');
    assert.doesNotMatch(r.reasoning, /108,87/, 'SIM-nämnarens tal får aldrig komma tillbaka');
    assert.match(r.reasoning, /50 växellicenser/, 'nämnaren ska sägas högt, inte gömmas');
    assert.match(r.reasoning, /449 kr\/mån/, 'bolagsavgiften ska redovisas, inte försvinna');
    assert.equal(r.molnvaxel.perBolagMonthly, 449);
  });

  test('RK-12 · modulen får aldrig läsa seatCount för växelpriset igen', async () => {
    // Källvakt. `deriveTelekomSeats` är raderad, men ett `invoice.seatCount` är alltid ett
    // tangentbord bort. Vakten läser KOD, inte kommentarer — historien får nämnas.
    const { readFileSync } = await import('node:fs');
    const { fileURLToPath } = await import('node:url');
    const { dirname, join } = await import('node:path');
    const kod = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../lib/telekom-normalize.js'), 'utf8')
      .split('\n').filter((r) => !/^\s*(\/\/|\*)/.test(r)).join('\n');
    // ⚠️ FÖRSTA VERSIONEN FÖRBJÖD ORDET och fällde rad 151, `seatCount: normalized.seats` — ett
    // UTDATAFÄLT i datapunkten, alltså rätt beteende. SK-08 för andra gången i samma pass.
    // Det som ska vara förbjudet är att LÄSA seatCount av ett objekt, inte att skriva ett fält
    // som heter så.
    assert.doesNotMatch(kod, /\.\s*seatCount\b/,
      'lib/telekom-normalize.js LÄSER seatCount igen — det är SIM-nämnaren på väg tillbaka');
    assert.match(kod, /seatCount:\s*normalized\.seats/,
      'motprovet: datapunktens utdatafält ska finnas kvar, annars förbjöd vakten ordet');
    assert.ok(kod.includes('vaxelUnderlag'), 'motprovet: nämnaren ska komma från vaxelrad.js');
  });

  test('RK-13 · ett ortnamn är ingen enhet (Säter ≠ säten)', () => {
    // Funnet i granskningsvändan av mitt eget bygge: `s[äa]te[nr]?` matchade «Säter».
    assert.equal(klassaVaxelrad(L('Växel Säter kontor', 1, 500)).klass, VAXELRAD.OKAND);
    // Motprovet: den riktiga enheten ska fortfarande läsas.
    assert.equal(klassaVaxelrad(L('Molnväxel 12 säten', 12, 1068)).klass, VAXELRAD.PER_ANVANDARE);
  });

  test('RK-10 · den rättade aritmetiken reproducerar prisbokens verifierade golv', () => {
    // Den starkaste bekräftelsen på att nämnaren nu är rätt: två OBEROENDE leverantörers fakturor
    // landar, räknade ur sina egna rader, exakt på Telias verifierade instegsgolv.
    const tv = BRANCHINDEX.molnvaxel.teliaVerified.tiers;
    assert.equal(normalizeTelekomInvoice(TELENOR, 'Telenor').perUserMonthlyExVat, tv.T1.fromMonthly);

    const telia = { seatCount: 45, lineItems: [
      L('Telia Jobbmobil Obegränsad', 45, 15705),
      L('Telia Smart Connect Använd.', 45, 5310),
      L('Svarsgrupp / Köhantering', 3, 297),
    ] };
    assert.equal(normalizeTelekomInvoice(telia, 'Telia').perUserMonthlyExVat, tv.T2.fromMonthly);
  });
});
