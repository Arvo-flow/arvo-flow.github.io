// tests/rumsrad.mjs — RR-01..08: EN RAD I RUMMET ÄR EN ANALYS, ALDRIG HALVA TVÅ.
//
// ══ VARFÖR (2026-09-09, ur grundarens 25 fakturor) ═════════════════════════════════════════
// `storeAnalysis` uppdaterade TRE kolumner vid konflikt på samma dokument — user_email,
// seat_count, price_per_seat_monthly. `route`, besparingarna, `should_switch` och kategorin stod
// inte där, och ingen senare UPDATE rörde dem.
//
// Effekten var att en faktura ALDRIG kunde läka. Grundarens 21 bevakade rader skrevs av
// `storeTriaged` med `route: 'review_queue'`. Analyseras samma PDF om med en lagad pipeline
// behåller raden sin tystnad, sitt gamla triage-skäl och sitt tomma besparingsfält — och får ett
// nytt per-licenspris bredvid. Rummet svarar «Prissatta 1 · Bevakade 21» hur mycket bättre
// pipelinen än blir, och raden som blir kvar motsäger sig själv.
//
// Asymmetrin var avslöjaren: `storeTriaged` skriver över route och triage_reason villkorslöst.
// Tystnaden fick skriva över domen; domen fick aldrig skriva över tystnaden.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att en domkolumn saknas i DO UPDATE, eller står där med COALESCE (vilket ärver
//     föregående körnings tal). SQL:en fångas ur den KÖRDA satsen — sviten anropar
//     `storeAnalysis` med en injicerad db och läser vad produktionsvägen faktiskt skickar, inte
//     vad filen innehåller. Ett test som läser källtext hade inte kunnat se att det är DEN här
//     satsen som körs.
//   BLIND: Postgres egen ON CONFLICT-semantik. Vi bevisar att satsen SÄGER att kolumnen ska
//     uppdateras, aldrig att databasen gör det — det kräver en riktig Postgres, och den finns
//     inte i sviten. Blindfläcken är densamma som switchliggarens fejkade db och deklareras av
//     samma skäl: mekanismen är prövad, motparten är antagen.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { storeAnalysis, storeTriaged } from '../lib/invoice-store.js';

/** Fejkad neon-klient som SPARAR varje sats i stället för att köra den. */
function fangaSql() {
  const satser = [];
  const db = async (strings, ...varden) => {
    satser.push({ sql: strings.join('␟'), varden });
    return /RETURNING id/.test(strings.join(' ')) ? [{ id: 42 }] : [];
  };
  db.satser = satser;
  return db;
}

const INDATA = {
  fingerprint: 'fp-test', pdfHash: 'hash-test',
  extracted: { supplier: 'Microsoft', annualCost: 120000, billingPeriod: 'monthly' },
  categorized: { category: 'saas-productivity', normalizedSupplier: 'microsoft' },
  recommendation: { suggestedAnnualCost: 90000, grossSaving: 30000, netSaving: 24000, shouldSwitch: true },
  route: 'auto', industry: 'it-tech', employees: 10, userEmail: null, seatCount: 10,
};

async function huvudsatsen(indata = INDATA) {
  const db = fangaSql();
  await storeAnalysis({ ...indata, db });
  const s = db.satser.find((x) => /ON CONFLICT \(fingerprint, pdf_hash\)/.test(x.sql));
  assert.ok(s, 'huvudsatsen med ON CONFLICT kördes aldrig — vakten mäter fel sats');
  return { db, sql: s.sql, doUpdate: s.sql.split('DO UPDATE')[1] ?? '' };
}

describe('RR · en rad i rummet är EN analys', () => {
  // GRÄNSEN GÅR VID PENNINGPÅSTÅENDET. Besparingen räknas ur annual_cost,
  // suggested_annual_cost, category, seat_count och billing_period — kommer ett av dem från en
  // annan körning än de övriga är påståendet inkoherent. De rör sig därför tillsammans, och
  // listan är uttömmande: det var frånvaron av just dessa namn som gjorde grundarens rader
  // oläkbara.
  const DOMKOLUMNER = [
    'route', 'category', 'annual_cost',
    'suggested_annual_cost', 'gross_saving', 'net_saving', 'should_switch',
    'industry', 'employees', 'billing_period', 'seat_count', 'price_per_seat_monthly',
  ];
  /** Etiketter på ett dokument som inte ändras — de går inte in i aritmetiken. */
  const ETIKETTKOLUMNER = ['supplier', 'normalized_supplier'];

  test('RR-10 · en misslyckad leverantörsläsning raderar aldrig ett gott namn', async () => {
    // INSERT-grenen skriver `extracted?.supplier ?? ''`. Läts etiketten följa domen hade en
    // körning som inte kunde läsa leverantören skrivit tom sträng över ett namn som stod rätt —
    // en ny bugg införd av fixen mot den gamla. NULLIF är det som gör tomheten till ett icke-svar.
    const { doUpdate } = await huvudsatsen();
    assert.match(doUpdate, /supplier\s*=\s*COALESCE\(NULLIF\(EXCLUDED\.supplier, ''\)/i,
      'tom sträng måste behandlas som «jag läste inte», aldrig som «leverantören saknas»');
    for (const k of ETIKETTKOLUMNER) {
      assert.match(doUpdate, new RegExp(`${k}\\s*=\\s*COALESCE`, 'i'),
        `${k} är en etikett på ett oföränderligt dokument — den bevaras, den nollas inte`);
    }
  });

  test('RR-01 · varje domkolumn uppdateras vid konflikt', async () => {
    const { doUpdate } = await huvudsatsen();
    const saknas = DOMKOLUMNER.filter((k) => !new RegExp(`${k}\\s*=`).test(doUpdate));
    assert.deepEqual(saknas, [],
      'kolumner som inte uppdateras vid konflikt behåller FÖREGÅENDE körnings värde. En rad som '
      + 'bär halva den ena domen och halva den andra kan inte läka och motsäger sig själv');
  });

  test('RR-02 · ingen domkolumn ärver föregående körning via COALESCE', async () => {
    const { doUpdate } = await huvudsatsen();
    for (const k of DOMKOLUMNER) {
      const m = doUpdate.match(new RegExp(`${k}\\s*=\\s*([^,\\n]+)`));
      assert.ok(m, `${k} saknas — RR-01 äger det fallet`);
      assert.ok(!/COALESCE/i.test(m[1]),
        `${k} ärver föregående körnings värde. En körning som inte längre finner någon besparing `
        + 'skulle då bära den förras — ett anspråk ingen körning står bakom, under 20 % success fee');
    }
  });

  test('RR-03 · user_email är undantaget, och det ENDA', async () => {
    // Motprovet. En regel som gäller allt är lika oanvändbar som ingen regel: adressen är
    // IDENTITET, inte analys, och en anonym uppladdning får aldrig radera en känd adress.
    const { doUpdate } = await huvudsatsen();
    assert.match(doUpdate, /user_email\s*=\s*COALESCE/i,
      'user_email måste bevaras — annars raderar en anonym omanalys kundens adress ur rummet');
  });

  test('RR-04 · triage_reason nollställs när domen inte längre är en triage', async () => {
    // Skälet skrevs av `storeTriaged` och beskriver varför vi INTE prissatte. Står det kvar på en
    // rad som nu är prissatt är det en förklaring till en tystnad som inte finns.
    const { doUpdate } = await huvudsatsen();
    assert.match(doUpdate, /triage_reason\s*=\s*NULL/i);
  });

  test('RR-05 · fyndet skrivs även när det saknas — tystnaden är ett svar', async () => {
    const { db } = await huvudsatsen({ ...INDATA, recommendation: { grossSaving: null } });
    const s = db.satser.find((x) => /SET lead_finding_json/.test(x.sql));
    assert.ok(s, 'utan fynd hoppades UPDATE:n över — föregående körnings fyndkort blir kvar '
      + 'bredvid en dom som inte längre bär det');
    assert.equal(s.varden[0], null, 'ett saknat fynd ska skrivas som NULL, inte utelämnas');
  });

  test('RR-06 · scoret skrivs även när det saknas', async () => {
    // Riktningen är värre än fyndets: ett kvarlämnat score är ett OMDÖME om priset, med full
    // auktoritet och utan underlag — 75-fallbackens sjukdom med ett tal som ser räknat ut.
    const { db } = await huvudsatsen({ ...INDATA, recommendation: { grossSaving: null } });
    const s = db.satser.find((x) => /SET health_score/.test(x.sql));
    assert.ok(s, 'utan score hoppades UPDATE:n över — föregående körnings tal blir kvar');
    assert.equal(s.varden[0], null);
  });

  test('RR-07 · dokumentets avläsningar behåller sin bevarande semantik', async () => {
    // Den medvetna gränsen, testad så att den inte kan glida: `contract_end_date` läses ur ett
    // dokument som inte ändras. En bättre läsare kan bara lägga till; en sämre får inte radera.
    const { db } = await huvudsatsen({
      ...INDATA,
      extracted: { ...INDATA.extracted, servicePeriodEnd: '2027-01-01' },
    });
    const s = db.satser.find((x) => /SET contract_end_date/.test(x.sql));
    assert.ok(s, 'kontraktsslutet skrevs aldrig');
    assert.match(s.sql, /contract_end_date IS NULL/,
      'bindningsslutet får bara fyllas i, aldrig skrivas över av en körning som läste sämre');
  });

  test('RR-09 · en triage nollar en tidigare körnings besparing', async () => {
    // SYSKONFALLET, spegelvänt. En fix är inte klar förrän grannfallet är kört (24 aug): samma
    // rad kan gå åt andra hållet — prissatt under en äldre pipeline, sedan triagerad av dagens
    // hårdare grindar. Utan nollningen står raden i rummet som «vi kunde inte prissätta den» med
    // ett grossSaving kvar, och rummets summa räknar en besparing vi samtidigt säger oss inte
    // kunna bedöma. Farlig riktning under 20 % success fee.
    const db = fangaSql();
    await storeTriaged({
      fingerprint: 'fp', pdfHash: 'h', supplier: 'Telia', category: 'mobil',
      route: 'review_queue', reason: 'ring1_mismatch', userEmail: null, db,
    });
    const s = db.satser.find((x) => /ON CONFLICT \(fingerprint, pdf_hash\)/.test(x.sql));
    assert.ok(s, 'triage-satsen kördes aldrig');
    const doUpdate = s.sql.split('DO UPDATE')[1] ?? '';
    for (const k of ['suggested_annual_cost', 'gross_saving', 'net_saving']) {
      assert.match(doUpdate, new RegExp(`${k}\\s*=\\s*NULL`, 'i'),
        `${k} överlever en triage — raden bär då en besparing bredvid en tystnad`);
    }
    assert.match(doUpdate, /should_switch\s*=\s*false/i,
      'should_switch är boolean och INSERT-grenen skriver false — NULL vore ett tredje tillstånd');
  });

  test('RR-08 · vakten läser den KÖRDA satsen, inte filen', async () => {
    // Utan det här provet vore RR-01..04 bara en läsning av källtext, och en sådan kan aldrig se
    // om satsen den läser är den som körs (LFL-obduktionen 12 aug: sviten låste en funktion
    // produktionen aldrig anropade). Beviset är att fejken FICK satsen genom produktionsvägen.
    const { db, sql } = await huvudsatsen();
    assert.ok(db.satser.length >= 2, 'produktionsvägen skickade färre satser än väntat');
    assert.match(sql, /INSERT INTO invoice_analyses/);
  });
});
