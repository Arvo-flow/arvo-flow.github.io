// tests/fakturarader.mjs — EN UPPDELNING SOM INTE GÅR ATT RÄKNA HEM FÅR INTE VISAS.
//
// BAKGRUNDEN (grundarbeslut 2026-08-15): rummet visade "Google · 72 900 kr/år · RÄTT PRISSATT"
// plus meningen "priset är konkurrenskraftigt". En finansdirektör kan inte analysera en post på
// det — hen måste se VAD de 72 900 kronorna består av: hur många licenser, till vilket à-pris,
// vad som är löpande och vad som är engångs.
//
// DEN FARLIGA DELEN, och skälet till att den här sviten finns: årskostnaden är INTE fakturans
// belopp. Den är projicerad LÖPANDE kostnad × periodmultiplikator — engångsavgifter och rörliga
// poster ingår aldrig. Visar vi rader som summerar till fakturans totalbelopp under rubriken
// "72 900 kr/år" har vi byggt exakt den motsägelse vi rensat ut ur resten av rummet: två tal
// bredvid varandra som inte går att addera (HELHETSKRAVET, regel 9).
//
// Prorata är den andra fällan: en delperiodsrad (CR-88412) är LÄGRE än fullpriset, så en naiv
// summering av radbeloppen ger en årstakt som inte matchar det lagrade talet. Årstakten bygger på
// antal × à-pris för de raderna.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: att en uppdelning visas trots att den inte summerar till det tal kortet visar, att
//           engångsposter smyger in i årstakten, att en prorata-rad räknas på sitt delbelopp, och
//           att en rad utan belopp tyst utelämnas ur summan. Prövas genom att ANROPA
//           byggUppdelning med de radformer extraktionen faktiskt producerar.
//   BLIND:  vakten kan inte se om RADTEXTEN är rätt läst. Står "Google Workspace Business
//           Standard" på fakturan men modellen skrev "Business Starter" summerar allt ändå, och
//           uppdelningen visas med fel produktnamn. Vakten skyddar aritmetiken, inte semantiken —
//           radtexten är kundens egen och kontrolleras av kunden själv mot pappret.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { byggUppdelning, periodEtikett, periodEtikettPlural } from '../lib/fakturarader.js';

const rad = (o) => ({ type: 'recurring_subscription', ...o });

describe('FAKTURARADER · uppdelningen måste summera till rubriken', () => {
  test('FR-01 · normalfallet: löpande rader × 12 = årskostnaden', () => {
    const u = byggUppdelning([
      rad({ description: 'Google Workspace Business Standard', quantity: 36, unitPrice: 168.75, amount: 6075 }),
    ], { annualCost: 72900, billingPeriod: 'monthly' });
    assert.ok(u, 'uppdelningen ska bära');
    assert.equal(u.lopandePerPeriod, 6075);
    assert.equal(u.multiplikator, 12);
    assert.equal(u.arstakt, 72900, 'årstakten måste vara exakt det tal kortet visar');
    assert.equal(u.avviker, 0);
    assert.equal(u.periodOrd, 'månad');
    assert.equal(u.periodOrdPlural, 'månader');
  });

  test('FR-02 · engångsavgifter hamnar UTANFÖR årstakten', () => {
    // Att annualisera en uppläggningsavgift blåser upp både kundens kostnad och vår besparing —
    // och en uppblåst besparing är den farliga riktningen att ha fel åt under 20 % success fee.
    const u = byggUppdelning([
      rad({ description: 'Licenser', quantity: 10, unitPrice: 100, amount: 1000 }),
      { type: 'one_time_fee', description: 'Uppläggningsavgift', amount: 450 },
    ], { annualCost: 12000, billingPeriod: 'monthly' });
    assert.ok(u);
    assert.equal(u.lopandePerPeriod, 1000, 'engångsavgiften får aldrig ingå i den löpande summan');
    assert.equal(u.arstakt, 12000);
    assert.equal(u.engangs.length, 1);
    assert.equal(u.engangs[0].belopp, 450);
  });

  test('FR-03 · en uppdelning som INTE går ihop visas inte alls (fail-closed)', () => {
    // Kärnan. Hellre inget underlag än ett som inte adderar — kunden ska alltid kunna räkna efter.
    const rader = [rad({ description: 'Licenser', quantity: 10, unitPrice: 100, amount: 1000 })];
    assert.equal(byggUppdelning(rader, { annualCost: 99000, billingPeriod: 'monthly' }), null);
    assert.equal(byggUppdelning(rader, { annualCost: 12000, billingPeriod: 'annual' }), null,
      'fel period ger fel årstakt — och då får uppdelningen inte visas');
  });

  test('FR-04 · prorata räknas på FULLT pris, aldrig på delperiodsbeloppet (CR-88412)', () => {
    // 612,50 kr för 5 licenser i 15 dagar är ett halvmånadsbelopp. Räknas det som månadskostnad
    // blir årstakten fel — det är precis felet prorata-buggen gjorde i besparingen.
    const u = byggUppdelning([
      rad({ description: 'Licenser (halv månad)', quantity: 5, unitPrice: 245, amount: 612, is_prorata: true }),
    ], { annualCost: 14700, billingPeriod: 'monthly' });
    assert.ok(u, '5 × 245 × 12 = 14 700 → ska bära');
    assert.equal(u.lopande[0].fulltBelopp, 1225, 'fullpriset är antal × à-pris, inte radbeloppet');
    assert.equal(u.arstakt, 14700);

    // Utan antal/à-pris går prorata-raden inte att projicera → ingen uppdelning.
    assert.equal(byggUppdelning([
      rad({ description: 'Delperiod', amount: 612, is_prorata: true }),
    ], { annualCost: 14700, billingPeriod: 'monthly' }), null);
  });

  test('FR-05 · en rad utan belopp får aldrig tyst utelämnas ur summan', () => {
    // Om en obeloppad rad hoppades över skulle resten summera "rätt" och kunden se en uppdelning
    // som saknar en post. Det är ett halvt underlag med full auktoritet — vi visar inget alls.
    assert.equal(byggUppdelning([
      rad({ description: 'Licenser', amount: 1000 }),
      rad({ description: 'Post utan belopp', amount: null }),
    ], { annualCost: 12000, billingPeriod: 'monthly' }), null);
  });

  test('FR-06 · kvartal och år bär rätt multiplikator och rätt ord', () => {
    const kv = byggUppdelning([rad({ description: 'Support', amount: 3000 })],
      { annualCost: 12000, billingPeriod: 'quarterly' });
    assert.equal(kv.multiplikator, 4);
    assert.equal(kv.periodOrd, 'kvartal');
    assert.equal(kv.periodOrdPlural, 'kvartal', 'kvartal böjs inte i plural — "× 4 kvartaler" vore fel');

    const ar = byggUppdelning([rad({ description: 'Årslicens', amount: 12000 })],
      { annualCost: 12000, billingPeriod: 'annual' });
    assert.equal(ar.multiplikator, 1);
    assert.equal(ar.periodOrd, 'år');
  });

  test('FR-07 · utan löpande rader finns ingen årstakt att dela upp', () => {
    assert.equal(byggUppdelning([
      { type: 'one_time_fee', description: 'Installation', amount: 5000 },
    ], { annualCost: 60000, billingPeriod: 'monthly' }), null);
    assert.equal(byggUppdelning([], { annualCost: 12000, billingPeriod: 'monthly' }), null);
    assert.equal(byggUppdelning(null, { annualCost: 12000, billingPeriod: 'monthly' }), null);
  });

  test('FR-08 · toleransen täcker avrundning men inte en felaktig uppdelning', () => {
    // Årskostnaden lagras avrundad. En krona per löpande rad räcker; tio gör det inte.
    const rader = [rad({ description: 'A', amount: 1000 }), rad({ description: 'B', amount: 1000 })];
    assert.ok(byggUppdelning(rader, { annualCost: 24002, billingPeriod: 'monthly' }),
      '2 kr avvikelse på två rader ska rymmas i avrundningen');
    assert.equal(byggUppdelning(rader, { annualCost: 24050, billingPeriod: 'monthly' }), null,
      '50 kr är ingen avrundning — det är en annan uppdelning');
  });

  test('FR-09 · periodetiketterna finns för varje period vi kan möta', () => {
    for (const p of ['monthly', 'quarterly', 'annual', 'one_time', 'unknown', 'nonsens']) {
      assert.ok(periodEtikett(p).length > 0, `${p} saknar etikett`);
      assert.ok(periodEtikettPlural(p).length > 0, `${p} saknar pluraletikett`);
    }
  });
});
