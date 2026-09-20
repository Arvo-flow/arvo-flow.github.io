// tests/vallgraven.mjs — VALLGRAVENS HJÄRTA INKOPPLAT, TESTLÅST.
//
// `buildTelekomDatapoint` producerar `per_user_monthly_exvat` + `tier` — det fynd-motorn
// aggregerar för «marknaden betalar X för T2». Mätt 2026-09-20: funktionen hade **noll anropare i
// hela trädet**, och alla fyra molnväxelrader i produktionens prisbok bar NULL i båda fälten.
// `marketComparisonAllowed` vaktade alltså en jämförelse vars indata aldrig skrevs.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildTelekomDatapoint } from '../lib/telekom-normalize.js';
import { molnvaxelRecommendation } from '../lib/molnvaxel-recommendation.js';
import { storeDatapoint } from '../lib/benchmark.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const L = (d, q, a) => ({ description: d, quantity: q, amount: a, type: 'recurring_subscription' });

// Ordagrant `telenor-molnvaxel-stor.pdf` (scripts/generate-test-invoices.mjs:632).
const TELENOR = { seatCount: 45, annualCost: 274302, lineItems: [
  L('Telenor Business Smart (45 abonnemang) Maj 2026', 45, 17055),
  L('Telenor One Talk Molnväxel — 50 användarlicenser', 50, 4450),
  L('Telenor One Talk Reception (auto-svarare + IVR)', 1, 449),
] };
// Klumpsumman som inte går att läsa (RK-04).
const TRE = { seatCount: 12, annualCost: 75812, lineItems: [
  L('3 Företag Obegränsat (12 SIM-kort) — Maj 2026', 12, 4188),
  L('3 Molnväxel Business — månadsavgift', 1, 1290),
  L('Molnväxel tilläggslicenser (4 extra användare)', 4, 596),
] };

const punktFor = (faktura) => {
  const rec = molnvaxelRecommendation({ invoice: faktura,
    categorized: { category: 'molnvaxel', normalizedSupplier: 'Telenor' } });
  return rec?.molnvaxel?.normaliserad
    ? buildTelekomDatapoint({ normalized: rec.molnvaxel.normaliserad, industry: 'it-tech', employees: 45 })
    : null;
};

/** Fejkad db som FÅNGAR satserna i stället för att köra dem. */
function fejkDb({ kastaPa = null } = {}) {
  const satser = [];
  const tag = (strings, ...v) => {
    const sql = strings.join('§').replace(/\s+/g, ' ').trim();
    satser.push({ sql, v });
    if (kastaPa && kastaPa.test(sql)) return Promise.reject(new Error('kolumnen finns inte'));
    if (/RETURNING id/.test(sql)) return Promise.resolve([{ id: 4711 }]);
    return Promise.resolve([]);
  };
  tag.satser = satser;
  return tag;
}

describe('VALLGRAVEN · per-enhet-fälten når prisboken', () => {
  test('VD-01 · datapunkten bär per-enhet-priset och nivån, ur kundens EGNA rader', () => {
    const p = punktFor(TELENOR);
    assert.ok(p, 'fakturan bär ett läsbart licensantal och ska ge en punkt');
    assert.equal(p.per_user_monthly_exvat, 89, '4 450 / 50 licenser — fakturans eget tal');
    assert.equal(p.tier, 'T2', 'IVR-raden ger Proffs-nivån');
    assert.equal(p.seatCount, 50, 'licenser, aldrig SIM-kort');
    // Oberoende bekräftelse: talet sammanfaller med prisbokens verifierade T1-golv.
    assert.equal(p.per_user_monthly_exvat, BRANCHINDEX.molnvaxel.teliaVerified.tiers.T1.fromMonthly);

    // ⚠️ OCH SPARVÄGEN MÅSTE LAGRA LICENSANTALET, INTE SIM-ANTALET. Sabotaget «seatCount tillbaka
    // till extracted.seatCount» fällde först noll test: funktionens retur var rätt, men ingen
    // vakt prövade vad api-lagret faktiskt skickar. 45 SIM i stället för 50 licenser hade gett
    // moaten fel nämnare — hela felet den här veckan handlat om, en nivå ned.
    const api = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8')
      .split('\n').filter((r) => !/^\s*(\/\/|\*)/.test(r)).join('\n');
    assert.match(api, /seatCount: telekomPunkt\?\.seatCount \?\? extracted\.seatCount/,
      'sparvägen ska föredra växelns licensantal före fakturans SIM-antal');
  });

  test('VD-02 · årskostnaden är VÄXELNS, aldrig hela den kombinerade fakturan', () => {
    // Mätt: hela fakturan är 274 302 kr/år varav bara 21 % är växel. Att lagra totalen under
    // kategorin `molnvaxel` hade blandat två domäner i moatens egen fördelning.
    const p = punktFor(TELENOR);
    assert.equal(p.annualCost, 89 * 50 * 12, '53 400 kr — växelraderna, inget annat');
    assert.ok(p.annualCost < TELENOR.annualCost / 4,
      `${p.annualCost} ska vara en bråkdel av fakturans ${TELENOR.annualCost}`);
    // ⚠️ OCH SPARVÄGEN MÅSTE ANVÄNDA DET. Första versionen prövade bara funktionens retur, så
    // sabotaget «annualCost tillbaka till hela fakturan» i api-lagret fällde noll.
    const api = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8')
      .split('\n').filter((r) => !/^\s*(\/\/|\*)/.test(r)).join('\n');
    assert.match(api, /annualCost: telekomPunkt\?\.annualCost \?\? extracted\.annualCost/,
      'sparvägen ska föredra växelns årskostnad före fakturans total');
  });

  test('VD-03 · per-enhet-fälten skrivs i EGEN sats — huvudinserten får aldrig bero på dem', async () => {
    // Bibelns 11 september-regel: en huvudinsert som nämner en kanske-omigrerad kolumn kastar
    // HELA skrivningen, och kundens datapunkt landar aldrig. Fail-open på fältet, aldrig på raden.
    const db = fejkDb();
    const p = punktFor(TELENOR);
    await storeDatapoint({ category: 'molnvaxel', supplier: 'Telenor', annualCost: p.annualCost,
      industry: 'it-tech', employees: 45, userEmail: null, seatCount: p.seatCount,
      perUserMonthlyExVat: p.per_user_monthly_exvat, tier: p.tier, db });

    const insert = db.satser.find((s) => /INSERT INTO invoice_datapoints/.test(s.sql));
    const update = db.satser.find((s) => /UPDATE invoice_datapoints/.test(s.sql));
    assert.ok(insert, 'huvudinserten ska köras');
    assert.doesNotMatch(insert.sql, /per_user_monthly_exvat|\btier\b/,
      'huvudinserten nämner en valfri kolumn — då tar den ned hela raden om migreringen släpar');
    assert.ok(update, 'per-enhet-fälten ska skrivas i en egen UPDATE');
    assert.ok(update.v.includes(89) && update.v.includes('T2'), 'och bära de mätta värdena');
  });

  test('VD-04 · en saknad kolumn får INTE ta ned datapunkten (fail-open på fältet)', async () => {
    // ⚠️ FÖRSTA VERSIONEN ÖVERLEVDE SITT SABOTAGE. Den prövade bara att INSERT:en kördes — och
    // den körs ju FÖRE fältsatsen, så att ta bort catchen ändrade ingenting testet kunde se.
    // Skillnaden är observerbar en nivå upp: `skrivPerEnhet` ligger INUTI den yttre try-satsen,
    // vars catch kastar vidare på icke-schemafel. Utan den inre catchen rapporteras alltså HELA
    // storeDatapoint som misslyckad, och allt efter try-blocket hoppas över.
    const db = fejkDb({ kastaPa: /UPDATE invoice_datapoints/ });
    const p = punktFor(TELENOR);
    const fel = [];
    const origError = console.error;
    console.error = (...a) => fel.push(a.join(' '));
    try {
      await storeDatapoint({ category: 'molnvaxel', supplier: 'Telenor', annualCost: p.annualCost,
        industry: 'it-tech', employees: 45, userEmail: null, seatCount: p.seatCount,
        perUserMonthlyExVat: p.per_user_monthly_exvat, tier: p.tier, db });
    } finally { console.error = origError; }

    assert.ok(db.satser.some((s) => /INSERT INTO invoice_datapoints/.test(s.sql)),
      'raden ska ha skrivits trots att fältsatsen kastade');
    assert.ok(fel.some((r) => /per-enhet-fälten skrevs INTE/.test(r)),
      'fältfelet ska loggas som just ett FÄLTfel — tystnad här vore ett obokfört beslut');
    assert.equal(fel.filter((r) => /storeDatapoint error/.test(r)).length, 0,
      'och det får ALDRIG rapporteras som att hela datapunkten misslyckades — gör det, saknas '
      + 'catchen i skrivPerEnhet och felet tar med sig allt efter try-blocket');
  });

  test('VD-05 · FAIL-CLOSED PÅ MOATEN: en oläsbar växelfaktura ger ingen observation', () => {
    // Funnet av mätningen av den här ändringen: den oläsbara fakturan skrev tidigare HELA
    // beloppet (75 812) som en molnvaxel-observation, medan en läsbar nu skriver 53 400.
    // Cellen hade blandat två enheter — och just inkopplingen gjorde skillnaden skarp.
    assert.equal(punktFor(TRE), null, 'klumpsumman ger inget underlag (RK-04)');

    const api = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8')
      .split('\n').filter((r) => !/^\s*(\/\/|\*)/.test(r)).join('\n');
    assert.match(api, /if \(!molnvaxelUtanUnderlag\) storeDatapoint\(/,
      'sparvägen ska hoppa över datapunkten helt när växelpriset inte går att läsa');
    assert.match(api, /categorized\.category === 'molnvaxel' && !telekomPunkt/,
      'och grinden ska gälla PRECIS molnväxel utan underlag — inte alla kategorier');
  });

  test('VD-06 · MOTPROV: andra kategorier skriver som förut, utan per-enhet-fält', async () => {
    // En grind som tystar allt är lika värdelös som ingen grind.
    const db = fejkDb();
    await storeDatapoint({ category: 'mobil', supplier: 'Tele2', annualCost: 58092,
      industry: 'it-tech', employees: 22, userEmail: null, seatCount: 22, db });
    const insert = db.satser.find((s) => /INSERT INTO invoice_datapoints/.test(s.sql));
    assert.ok(insert, 'mobil ska fortfarande skriva sin datapunkt');
    assert.equal(insert.v[2], 58092, 'och bära hela sin årskostnad, som förut');
    assert.equal(db.satser.find((s) => /UPDATE invoice_datapoints/.test(s.sql)), undefined,
      'utan per-enhet-fält körs ingen fältsats alls');
  });

  test('VD-07 · underlaget är kundens EGET tal, inte en andra beräkning', () => {
    // Moaten ska lagra exakt det tal kunden såg. Två beräkningar av samma sak kan glida isär.
    const rec = molnvaxelRecommendation({ invoice: TELENOR,
      categorized: { category: 'molnvaxel', normalizedSupplier: 'Telenor' } });
    assert.equal(rec.molnvaxel.normaliserad.perUserMonthlyExVat, rec.molnvaxel.perUserMonthlyExVat,
      'det lagrade talet och det visade talet kommer ur samma objekt');
    assert.match(rec.reasoning, /89,00 kr\/användare/, 'och det är talet i kundens text');
  });

  test('VD-09 · k-anonymitetsgrinden deklarerar att den inte kan matas', async () => {
    // Den tredje «döda» exporten är inte en saknad inkoppling. Mätt: den grindar på DISTINKTA
    // KUNDER, och invoice_datapoints har ingen kolumn som pekar ut en kund — anonymiserad by
    // design. Att koppla in den kräver ett designbeslut om identitet i moaten, inte en rad kod.
    // Tills dess är deklarationen skyddet: en rad som SER ut som ett skydd är sämre än ingen.
    const modul = readFileSync(join(ROT, 'lib/telekom-normalize.js'), 'utf8');
    const block = modul.slice(0, modul.indexOf('export const marketComparisonAllowed'));
    assert.match(block, /KAN INTE MATAS UR PRISBOKEN/,
      'grinden måste skriva ut att dess indata inte finns — annars läses dess gröna test som ett skydd');
    assert.match(block, /cellenBar.*aldrig kunder|aldrig kunder/s,
      'och varför cellenBar INTE ersätter den (rader ≠ kunder)');

    // TIER_ORDER var däremot en ren andra sanning och är borta.
    const m = await import('../lib/telekom-normalize.js');
    assert.equal(m.TIER_ORDER, undefined, 'TIER_ORDER ska vara raderad');
    assert.deepEqual(Object.keys(m.CANONICAL_TIERS), ['T1', 'T2', 'T3'],
      'motprovet: ordningen finns kvar i sin enda källa');
  });

  test('VD-08 · buildTelekomDatapoint HAR numera en produktionsanropare', () => {
    // Uttalad blindfläck: detta är en KÄLLTEXTVAKT. Den ser att anropet står i sparvägen —
    // aldrig att vägen körs. Handlern går inte att anropa ur sviten (den tar req/res och gör
    // nätanrop), så beteendet prövas i VD-01..07 och monteringen här.
    const api = readFileSync(join(ROT, 'api/test-invoice.mjs'), 'utf8');
    assert.match(api, /import \{ buildTelekomDatapoint \} from '\.\.\/lib\/telekom-normalize\.js'/);
    assert.match(api, /buildTelekomDatapoint\(\{/, 'och den ska faktiskt anropas');
    // ⚠️ ETT ANROP SOM FINNS ÄR INTE ETT ANROP SOM NÅS. Sabotaget `telekomPunkt = false && …`
    // lämnade anropet i källan och fällde noll test — vakten prövade förekomst, inte nåbarhet.
    const villkor = api.split('\n').find((r) => /const telekomPunkt =/.test(r)) ?? '';
    assert.match(villkor, /^\s*const telekomPunkt = categorized\.category === 'molnvaxel'/,
      `villkoret får inte kortslutas före kategorifrågan: ${villkor.trim()}`);
    assert.match(api, /perUserMonthlyExVat: telekomPunkt\?\.per_user_monthly_exvat/,
      'och resultatet ska nå storeDatapoint');
  });
});
