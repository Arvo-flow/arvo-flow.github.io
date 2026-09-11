// tests/testidentitet.mjs — TI-01..08 · testytan, arkiveringen och täckningspåståendet.
//
// ══ VARFÖR (grundarbeslut 2026-09-11, efter Fable 5.1:s strategiska dom) ════════════════════
// Tre beslut ur samma dom, alla defensiva: skydda det lilla vi har tills det blir en tillgång.
//
//  1 · TESTIDENTITETEN är ett BEGREPP, inte en e-poststräng. Skyddet som fanns var en bieffekt —
//      mail-in skickar `segmentOkant: true`, så testytans fakturor nådde aldrig prisboken. Men
//      det gäller MAIL-vägen, inte identiteten: en testfaktura uppladdad via /testa-faktura med
//      vald bransch hade skrivit rakt in i moaten. Fable: «segmentOkant svarar på om SEGMENTET
//      är avläst, inte på om fakturan är en marknadsobservation.»
//  2 · ANALYSER ARKIVERAS, de raderas aldrig. Rensningen 9 september tog med sig motparten som
//      bar dokumentidentiteten — 288 datapunkter blev permanent spårlösa. «Rensa ett rum» och
//      «radera bevisen» var samma operation; `arkiverad_at` skiljer dem åt.
//  3 · TÄCKNINGSPÅSTÅENDET ersätter tom tystnad. Tystnad kan aldrig bevisas fel, alltså är den
//      bekväm — och den kostar kunden, inte oss.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att grinden tas bort eller får ett defaultvärde; att en anropare slutar skicka
//     userEmail; att en läsväg slutar filtrera arkiverade rader; att rensningen återgår till
//     DELETE; att täckningskortet börjar påstå ett BOLAGSANTAL.
//   BLIND: den vet inte om produktionens databas faktiskt har kolumnen (det är migreringens
//     ansvar, LK-01) och den kan inte se om en ny skrivväg till invoice_datapoints tillkommer
//     någon annanstans än i api/test-invoice.mjs — AV-11 räknar anropen där, ingen annanstans.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { arTestidentitet, TEST_EMAIL } from '../lib/test-surface.js';
import { storeDatapoint, kohortTackning } from '../lib/benchmark.js';
import { buildTackning } from '../api/invoice-history.mjs';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const las = (f) => readFileSync(join(ROT, f), 'utf8');

/** Fejkad neon-klient som BOKFÖR varje sats — så «skrev den?» är en avläsning, inte en gissning. */
function fejkDb(svar = []) {
  const satser = [];
  const f = (strings) => { satser.push(strings.join(' ')); return Promise.resolve(svar); };
  f.satser = satser;
  return f;
}

describe('TI · testidentiteten når aldrig moaten', () => {
  test('TI-01 · arTestidentitet känner igen testytan och bara den', () => {
    assert.equal(arTestidentitet(TEST_EMAIL), true);
    assert.equal(arTestidentitet('TESTYTA@Arvoflow.SE  '), true, 'versaler och blanksteg får inte kringgå grinden');
    assert.equal(arTestidentitet('test@inbox.arvoflow.se'), true, 'en adress som kan STARTA ett testpass får inte skriva till prisboken');
    assert.equal(arTestidentitet('demo+tagg@inbox.arvoflow.se'), true, '+tagg får inte kringgå grinden');
    // MOTPROVET — en spärr som fäller allt är lika värdelös som ingen spärr (OB-23:s läxa).
    assert.equal(arTestidentitet('kund@bolag.se'), false, 'en riktig kund måste få bidra till moaten');
    assert.equal(arTestidentitet('testyta@annandoman.se'), false, 'lokaldelen ensam är inte testytan');
    for (const v of [null, undefined, '', 123, {}]) {
      assert.equal(arTestidentitet(v), false, `${String(v)} är inte en testidentitet`);
    }
  });

  test('TI-02 · en glömd userEmail KASTAR — den får aldrig bli ett tyst godkännande', async () => {
    // Ett defaultvärde hade gjort «ingen frågade» omöjligt att skilja från «anonym uppladdning»,
    // och det är felfamiljen i sin renaste form. Kastet fångas av anroparens .catch() — fail-closed
    // på prisboken, fail-open på kunden.
    const db = fejkDb();
    await assert.rejects(
      () => storeDatapoint({ category: 'mobil', supplier: 'X', annualCost: 1000, industry: 'konsult', employees: 10, db }),
      /kräver userEmail/,
    );
    assert.equal(db.satser.length, 0, 'ingen sats fick köras innan grinden ställt sin fråga');
  });

  test('TI-03 · testytans faktura skriver INGEN datapunkt', async () => {
    const db = fejkDb();
    await storeDatapoint({ category: 'mobil', supplier: 'X', annualCost: 1000, industry: 'konsult', employees: 10, userEmail: TEST_EMAIL, db });
    assert.equal(db.satser.length, 0, 'testytan rörde databasen — moaten är förgiftad');
  });

  test('TI-04 · en ANONYM uppladdning (null) är en legitim marknadsobservation', async () => {
    // Motprovet åt andra hållet: grinden får inte tysta riktiga fakturor utan avsändaradress.
    const db = fejkDb();
    await storeDatapoint({ category: 'mobil', supplier: 'X', annualCost: 1000, industry: 'konsult', employees: 10, userEmail: null, db });
    assert.ok(db.satser.length > 0, 'en anonym uppladdning måste nå prisboken');
  });
});

describe('TI · analyser arkiveras, de raderas aldrig', () => {
  test('TI-05 · varje läsväg till kundens rum filtrerar arkiverade rader', () => {
    // SEX satser: tre per läsväg (full · efter läkning · reserv). En RESERV som visar arkiverade
    // rader är en tyst återuppståndelse — kunden ser det hen bad oss ta bort.
    const store = las('lib/invoice-store.js');
    const antal = (store.match(/arkiverad_at IS NULL/g) ?? []).length;
    assert.equal(antal, 6, `${antal} filtrerade satser — mätt: 6 (två läsvägar × full/läkt/reserv)`);
    // ⚠️ MIN FÖRSTA VERSION RÄKNADE FÖR BRETT och föll på rätt beteende: `fingerprint = ${hashedFp}`
    // förekommer SJU gånger, men fyra av dem är dedup-SKRIVNINGAR (`AND pdf_hash = …`) som aldrig
    // får filtrera bort en arkiverad rad — de ska tvärtom VÄCKA den. Vakten prövar därför bara de
    // två LÄSVÄGARNA, avgränsade på sina funktioner.
    for (const fn of ['getAnalysesByFingerprint', 'getAnalysesByEmail']) {
      const start = store.indexOf(`export async function ${fn}`);
      assert.ok(start > 0, `${fn} hittades inte — ankaret håller inte`);
      const slut = store.indexOf('\nexport ', start + 10);
      const kropp = store.slice(start, slut === -1 ? undefined : slut);
      const satser = (kropp.match(/FROM invoice_analyses/g) ?? []).length;
      const filtrerade = (kropp.match(/arkiverad_at IS NULL/g) ?? []).length;
      assert.equal(filtrerade, satser, `${fn}: ${filtrerade} av ${satser} satser filtrerar arkiverade rader`);
      assert.equal(satser, 3, `${fn} har ${satser} satser — mätt: 3 (full · efter läkning · reserv)`);
    }

    // GRANNFALLET: en arkiverad faktura som skickas in PÅ NYTT måste bli synlig igen — annars
    // uppdaterar skrivningen den arkiverade raden och kunden ser aldrig sin nya analys.
    //
    // ⚠️ VÄCKNINGEN FÅR INTE BO I ON CONFLICT-SATSEN, och det är ett [KUND]-fynd jag gjorde på
    // mig själv: saknas kolumnen (glappet mellan deploy och migrering) kastar HELA upserten,
    // storeAnalysis yttre catch returnerar null — och kundens faktura landar aldrig i rummet.
    // Exakt pdf_hash-fallet 10 september. Egen sats, egen catch.
    assert.ok(!/ON CONFLICT \(fingerprint, pdf_hash\) DO UPDATE\n\s*(--[^\n]*\n\s*)*SET arkiverad_at/.test(store),
      'väckningen i ON CONFLICT gör huvudinserten beroende av en kanske omigrerad kolumn');
    assert.match(store, /async function vackArkiverad\(db, hashedFp, pdfHash\)/, 'väckningen måste bo i en egen fail-open hjälpare');
    const anrop = (store.match(/await vackArkiverad\(/g) ?? []).length;
    assert.equal(anrop, 2, `${anrop} anrop till vackArkiverad — mätt: 2 (storeAnalysis + storeTriaged)`);
    assert.match(store, /catch \{ \/\* kolumn ej migrerad än → inget arkiv finns att väcka \*\/ \}/,
      'hjälparen måste vara fail-open: utan kolumn finns inget arkiv att väcka');

    // Och självläkningen måste känna kolumnen: går koden live före migreringen kastar VARJE
    // rumsläsning på en okänd kolumn — pdf_hash-fallet 10 september, ett lager upp.
    assert.match(store, /\['arkiverad_at', 'TIMESTAMPTZ'\]/,
      'utan självläkning faller hela rummet till sin reserv i glappet mellan deploy och migrering');
  });

  test('TI-06 · kolumnen skapas av en MIGRERING, och rensningen arkiverar', () => {
    // LK-01:s läxa: en självläkning någon annanstans räknas inte — det var precis den som
    // aldrig kördes 15 augusti.
    assert.match(las('scripts/migrate.mjs'), /ALTER TABLE invoice_analyses ADD COLUMN IF NOT EXISTS arkiverad_at/);
    const rensa = las('scripts/rensa-rummet.mjs');
    assert.match(rensa, /UPDATE invoice_analyses SET arkiverad_at = NOW\(\)/, 'rummet ska arkiveras, inte raderas');
    assert.ok(!/DELETE FROM invoice_analyses/.test(rensa),
      'ett DELETE mot invoice_analyses förstör prisbokens proveniens — det var hela fyndet');
  });
});

describe('TI · täckningspåståendet ersätter tom tystnad', () => {
  test('TI-07 · kohortTackning mäter, och ett okänt ser aldrig ut som en nolla', async () => {
    const tunn = await kohortTackning({ category: 'saas-productivity', industry: 'konsult', employees: 20, db: fejkDb([{ rader: 24, skilda: 2 }]) });
    assert.deepEqual(tunn, { category: 'saas-productivity', rader: 24, skilda: 2, bar: false, krav: 10 });
    const bar = await kohortTackning({ category: 'mobil', industry: 'konsult', employees: 20, db: fejkDb([{ rader: 83, skilda: 15 }]) });
    assert.equal(bar.bar, true, 'en cell med 15 skilda belopp bär och behöver ingen redovisning');
    // Utan databas vet vi ingenting — och ett okänt får aldrig renderas som «0 prispunkter».
    assert.equal(await kohortTackning({ category: 'mobil', industry: 'konsult', employees: 20 }), null);

    // Bara tystade celler med faktiskt underlag redovisas: en bärande cell talar redan, och en
    // tom cell har inget att redovisa.
    const rad = (c) => ({ route: 'auto', category: c, industry: 'konsult', employees: 20 });
    assert.deepEqual(await buildTackning([rad('mobil')]), {}, 'utan databas påstår rummet ingenting');
    assert.deepEqual(await buildTackning([{ ...rad('mobil'), route: 'review_queue' }]), {}, 'en triagerad rad är inget underlag');
  });

  test('TI-08 · kortet påstår ALDRIG ett bolagsantal', () => {
    // ⚠️ DEN HÄR RADEN ÄR HELA POÄNGEN. Ordern löd «Vi bevakar X BOLAG i denna kategori».
    // Det talet finns inte: `invoice_datapoints` bär ingen kundidentitet (anonymiserad by design),
    // och 288 av 297 rader saknar bevisad dokumentidentitet. Ett bolagstal härlett ur radantalet
    // hade varit ett tal utan källa — i just det kort som byggts för att vara ärligt om tunn data.
    const rum = las('src/pages/Portfolio/index.js');
    const i = rum.indexOf('Underlaget i er bransch');
    assert.ok(i > 0, 'täckningskortet finns inte i rummet');
    const kort = rum.slice(i, rum.indexOf('</Truth>', i));
    assert.ok(kort.length > 500, `utsnittet är ${kort.length} tecken — en vakt kan inte bli grön av tomhet`);
    assert.match(kort, /prispunkt/, 'enheten måste vara prispunkter — det är vad vi kan belägga');
    assert.match(kort, /skilda belopp|skilt belopp/, 'och antalet skilda belopp, som är tröskelns fråga');
    assert.match(kort, /inte antal bolag/, 'kortet måste SÄGA att talen inte är bolag');
    // Ingen rad får rendera ett bolagsantal ur täckningen.
    assert.ok(!/tackningsKort\.(rader|skilda)\}[^<]{0,40}bolag/i.test(kort),
      'ett täckningstal får aldrig sättas bredvid ordet bolag som enhet');

    // Och kortet måste kunna NÅ kunden: sektionen renderas bort utan det i villkoret — mätt,
    // inte antaget (den lokala renderingen visade noll träffar innan villkoret ändrades).
    assert.match(rum, /featured \|\| publicFeatured \|\| branchAnchor \|\| tackningsKort \|\| renewals\.length > 0/,
      'utan tackningsKort i sektionsvillkoret försvinner kortet i exakt det läge det finns för');
  });
});
