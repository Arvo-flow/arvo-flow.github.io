// tests/bevakat-kort.mjs — "BEVAKAT — INTE PRISSATT": rätt skäl, noll siffror.
//
// BAKGRUNDEN (skarpt rum 2026-08-14): en kund läste, om sina Slack- och Salesforce-fakturor:
//   "Leverantörens publika listpris finns bara i radsumma 3 991 kr ≠ fakturatotal 382 kr
//    (avvikelse 3 609 kr). Att räkna om till en svensk besparing via dagskurs vore en gissning…"
//
// Två fel i en mening, båda strukturella:
//   1. Grenen fyrade på LEVERANTÖRSNAMNET (INTL_SAAS matchar Slack/Salesforce) och plockade sedan
//      split(':')[1] ur ett triage_reason som tillhörde balanskravets radsummekontroll. Vi angav
//      alltså FEL SKÄL för vår tystnad — det verkliga var att fakturans egna tal inte gick ihop.
//   2. Interna mätvärden hamnade i kundytan. Funktionens egen kommentar lovar "NOLL siffror
//      (sifferrevisorns tystnad orörd)" — och sifferrevisorn granskar recommend(), inte den här
//      vägen. Invarianten var bruten utan att någon vakt märkte det.
//
// Disciplinen är hela produkten här: vi säger "vi prissätter inte" och måste kunna säga VARFÖR,
// sant och utan tal. En tystnad med fel motivering är sämre än ingen motivering.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: att ett bevakat kort bär ett belopp/tal, och att valutakortet väljs på annan grund
//           än ett valutaskäl — prövat genom att faktiskt ANROPA watchedCard med de rader som
//           fällde oss i produktion.
//   BLIND:  vakten prövar de reason-koder vi känner till. En helt ny kod som ingen tänkt på får
//           fallback-kortet, och att DEN texten är rätt för det nya fallet kan ingen svit veta.
//           Den skyddar mot fel skäl och mot siffror, inte mot ett skäl vi aldrig föreställt oss.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { watchedCard } from '../api/invoice-history.mjs';
import { tystnadsbesked, TYSTNADSSKAL, SKAL } from '../lib/tystnadsskal.js';

// Alla textfält ett kort kan visa för kunden.
const text = (k) => [k.kind, k.headline, k.detail, k.action].filter(Boolean).join(' | ');
// Siffror som är BELOPP eller mätvärden. Enstaka ord som "36 marknadskällor" hör inte hemma här
// heller — den här ytan ska vara helt talfri, så vi förbjuder varje siffergrupp.
const SIFFRA = /\d/;

describe('BEVAKAT-KORT · rätt skäl, noll siffror', () => {
  test('BK-01 · balansfelet ger balans-skäl, inte valuta (produktionsfallet)', () => {
    // Exakt raden som nådde kunden: internationell leverantör MEN ett balansskäl.
    const k = watchedCard({
      normalized_supplier: 'Slack Technologies',
      route: 'review_queue',
      triage_reason: 'radsumma 3 991 kr ≠ fakturatotal 382 kr (avvikelse 3 609 kr)',
    });
    assert.doesNotMatch(text(k), /valuta|dagskurs/i,
      'ett balansfel får aldrig förklaras som ett valutaproblem');
    assert.match(text(k), /går inte ihop|stämmer inte/i,
      'kunden ska få veta det VERKLIGA skälet: fakturans tal möts inte');
  });

  test('BK-02 · inget bevakat kort bär en siffra', () => {
    const fall = [
      { normalized_supplier: 'Slack Technologies', triage_reason: 'radsumma 3 991 kr ≠ fakturatotal 382 kr (avvikelse 3 609 kr)' },
      { normalized_supplier: 'Salesforce.com',     triage_reason: 'foreign_currency:USD' },
      { normalized_supplier: 'Binero Group AB',    triage_reason: 'no_benchmark' },
      { normalized_supplier: 'Fortnox AB',         triage_reason: 'review_queue' },
      { normalized_supplier: 'Ellevio AB',         triage_reason: 'natavgift' },
      { normalized_supplier: 'Okänd AB',           triage_reason: 'credit_note' },
      { normalized_supplier: 'Okänd AB',           triage_reason: 'implausible_amounts' },
      { normalized_supplier: 'Okänd AB',           triage_reason: 'sanity_check_failed' },
      // Den farligaste formen: ett skäl som SJÄLVT bär tal och kan splittras in i copyn.
      { normalized_supplier: 'Zoom',               triage_reason: 'foreign_currency:1 234,56 kr' },
    ];
    const brott = [];
    for (const f of fall) {
      const t = text(watchedCard({ route: 'review_queue', ...f }));
      if (SIFFRA.test(t)) brott.push(`${f.triage_reason} → "${t}"`);
    }
    assert.deepEqual(brott, [],
      `Bevakat-kort bär siffror — ytan lovar noll tal och sifferrevisorn granskar inte den här vägen:\n  ${brott.join('\n  ')}`);
  });

  test('BK-03 · valutakoden måste SE UT som en valutakod, annars utelämnas den', () => {
    const bra = watchedCard({ normalized_supplier: 'Zoom', route: 'review_queue', triage_reason: 'foreign_currency:usd' });
    assert.match(text(bra), /\bUSD\b/, 'en giltig kod ska visas, versaliserad');

    const skrap = watchedCard({ normalized_supplier: 'Zoom', route: 'review_queue', triage_reason: 'foreign_currency:radsumma 3 991 kr' });
    assert.doesNotMatch(text(skrap), /radsumma/, 'en felsträng är inte en valuta och får inte klistras in');
    assert.match(text(skrap), /utländsk valuta/, 'kortet står kvar, men utan påhittad kod');
  });

  test('BK-04 · namnet ensamt räcker inte för att påstå valutaproblem', () => {
    // En internationell leverantör med ett skäl som inte handlar om valuta ska INTE få
    // valutakortet. Namnet får välja etikett när skälet redan är valuta — aldrig annars.
    const k = watchedCard({ normalized_supplier: 'Atlassian', route: 'review_queue', triage_reason: 'no_benchmark' });
    assert.doesNotMatch(text(k), /dagskurs/i,
      'INTL_SAAS-namnet får inte ensamt avgöra vad vi påstår om fakturan');
  });

  test('BK-06 · en teknisk kod förklaras aldrig som ett marknadsproblem (Fortnox-fallet)', () => {
    // Skarpt läge 2026-08-15: Fortnox-fakturan bar `fingerprint_mismatch` — VÅR leverantörs-
    // kontroll sa emot VÅR kategorisering. Kunden fick läsa "utan verifierat golv att prissätta
    // mot". Fakturan blev inte klassad utan FELklassad, golvet finns (loneadmin = real-public),
    // och samma PDF prissattes auto från en annan adress. Tre påståenden, noll sanna.
    const k = watchedCard({ normalized_supplier: 'Fortnox AB', route: 'review_queue',
      triage_reason: 'fingerprint_mismatch' });
    assert.doesNotMatch(text(k), /verifierat golv|marknadsreferens|prisnivå/i,
      'ett fel i VÅRA kontroller får aldrig förklaras som en lucka i marknadsdatan');
    assert.match(text(k), /oense|emot varandra|överens/i,
      'kunden ska få veta det sanna skälet — att vi stoppade när vi inte var överens med oss själva');
  });

  test('BK-07 · reservkortet påstår INGET skäl alls (blindfläcken, stängd)', () => {
    // Vaktens deklarerade blindfläck blev verklig: en kod ingen tänkt på fick fallback-kortets
    // substantiella förklaring och den var fel. Nu får reservkortet bara säga att vi stoppade.
    for (const kod of ['nagot_helt_nytt', 'schema_drift_v9', 'okand_kod_2027']) {
      const t = text(watchedCard({ normalized_supplier: 'Okänt AB', route: 'review_queue', triage_reason: kod }));
      assert.doesNotMatch(t, /verifierat golv|marknadsreferens|utländsk valuta|reglerad|splittrad marknad|kreditering/i,
        `reservkortet gissar ett skäl för '${kod}' — det är exakt formen som gav en osanning i kundyta`);
      assert.match(t, /tekniskt/i, 'det ärliga svaret för en okänd kod är att skälet är tekniskt');
      assert.match(t, /människa/i, 'och att en människa tar vid');
    }
  });

  test('BK-05 · nätavgiften bär sitt eget, sanna skäl', () => {
    const k = watchedCard({ normalized_supplier: 'Ellevio AB', route: 'unsupported', triage_reason: 'natavgift' });
    assert.match(text(k), /reglerad|monopol|nät/i,
      'Ellevio-fallet: kunden ska förstå att nätavgiften inte går att byta — det är vårt vassaste tysta beslut');
  });
  // ── TYSTNADEN SÄGER VARFÖR (grundarbeslut 2026-09-16) ──────────────────────────────────────
  test('BK-08 · en offertprissatt kategori får registrets besked, inte löftet om ett golv', async () => {
    // Här stod «Under bevakning — vi prissätter så snart ett verifierat golv finns». För
    // larm-bevakning kommer det golvet ALDRIG att finnas — priset sätts i offert. Ett kundlöfte
    // utan mekanik är regel 9 brutet, och det stod i rummet varje gång en sådan faktura lästes.
    // (Fixturen var larm-bevakning tills granskningens F1 flyttade den till OKLART — prisboken
    //  bär verifierade SEK-listpriser för just den kategorin. Ett test vars fixtur byter klass
    //  under fötterna slutar pröva det det heter.)
    const k = watchedCard({ supplier: 'Företagshälsan Väst AB', category: 'foretagshalsovard',
      triage_reason: 'no_benchmark', route: 'unsupported' });
    assert.equal(k.kind, 'Offertprissatt');
    assert.match(k.detail, /sätts i offert/);
    assert.ok(!/vi bevakar avtalsslutet|förbereder (det exakta )?motbudet/i.test(`${k.detail} ${k.action}`),
      'löftet om en bevakning vi inte har får inte stå i kortet');
    assert.ok(!/prissätter så snart|verifierat golv finns/.test(`${k.headline} ${k.detail} ${k.action}`),
      'löftet om ett framtida golv får inte stå kvar där golvet aldrig kan finnas');
    // Noll tal, precis som varje annat bevakat kort (BK-01..07).
    // ⚠️ EN AVVÄGNING, INTE EN UPPLUCKRING. BK-01 förbjuder VARJE siffra på reason-koderna och
    //  står orörd — den finns mot att interna mätvärden läcker ut (Slack-fallet: «radsumma 3 991 kr
    //  ≠ fakturatotal 382 kr»). Registrets åtgärd säger «60 och 30 dagar», vilket inte är ett
    //  mätvärde om kundens faktura utan vår EGEN utskicksplan, hämtad ur send-reminders. Att förbjuda
    //  den vore att vakta ordet i stället för påståendet (SK-08:s läxa) och tvinga kopian mot
    //  vaghet — precis det vi lagar. Men gränsen pinnas: 60 och 30 är de ENDA tal som får stå här.
    const utanPlanen = `${k.headline} ${k.detail} ${k.action}`.replace(/\b(60|30)\b/g, '');
    assert.ok(!/\d/.test(utanPlanen), `inga andra tal än utskicksplanen: ${utanPlanen}`);
    assert.ok(!/(kr|%|kronor)\b/i.test(`${k.detail} ${k.action}`), 'aldrig ett belopp i kundytan');
  });

  test('BK-09 · saas-crm säger utländsk valuta — aldrig offertprissatt', async () => {
    // Pipedrive/HubSpot/Zoho publicerar sina priser. «Offertprissatt» vore en osanning kunden
    // motbevisar på tio sekunder.
    const k = watchedCard({ supplier: 'Pipedrive', category: 'saas-crm',
      triage_reason: 'no_benchmark', route: 'unsupported' });
    assert.match(k.kind, /utländsk valuta/);
    assert.ok(!/offert/i.test(`${k.kind} ${k.detail}`));
  });

  test('BK-10 · en kategori UTAN deklaration behåller det gamla, försiktiga kortet', async () => {
    // Fail-closed åt rätt håll: faktura-tjanst SKA fyllas, och där är löftet inte tomt utan en kö.
    // Motprovet är hela poängen — utan det kunde registret svälja varje kategori och BK-08 vore
    // grön av att allt ser likadant ut.
    const k = watchedCard({ supplier: 'Billogram', category: 'faktura-tjanst',
      triage_reason: 'no_benchmark', route: 'unsupported' });
    assert.equal(k.kind, 'Ej prissatt kategori');
    assert.match(k.action, /prissätter så snart/);
  });

  test('BK-11 · volume_data_required NÅR registret — mätt mot produktionen, inte antaget', async () => {
    // ⚠️ GRANSKNINGENS F2, BEKRÄFTAD MOT PRODUKTIONSDATABASEN 2026-09-17. Grenen läste bara
    // `no_benchmark`, som sätts ENBART inuti `if (!catDef)` — alltså när kategorin SAKNAS i
    // prisboken. Alla deklarerade kategorier FINNS där, så registret var monterat på en signal
    // produktionen aldrig sänder. Sonden mätte: sex triagade rader i de nitton tysta
    // kategorierna, ALLA med `volume_data_required`, och 0 av 6 nådde grenen.
    //
    // De fyra kategorierna nedan är de som FAKTISKT ligger i produktionen med det skälet.
    for (const kategori of ['transport-frakt', 'utrustningsleasing', 'serverhosting', 'städ-rengöring']) {
      const k = watchedCard({ supplier: 'Leverantör AB', category: kategori,
        triage_reason: 'volume_data_required', route: 'review_queue' });
      assert.equal(k.kind, 'Volymstyrt pris', `${kategori} ska nå registret`);
      assert.ok(!/Skälet är tekniskt/.test(k.detail), `${kategori} fick reservkortet`);
    }
    // Motprov: en kategori UTAN deklaration får fortfarande det försiktiga kortet — grenen får
    // inte svälja allt bara för att den vidgades.
    const okand = watchedCard({ supplier: 'X AB', category: 'mobil',
      triage_reason: 'volume_data_required', route: 'review_queue' });
    assert.equal(okand.kind, 'Ej prissatt kategori');
  });

  test('BK-12 · ⚖️ försäkring får ALDRIG ett bevakningskort — juridisk karantän', async () => {
    // GRUNDARBESLUT 2026-09-17: Arvo saknar regulatoriskt tillstånd att hantera eller förmedla
    // försäkringar. Ett kort som lovar bevakning eller motbud vore inte ett premiumfel utan ett
    // lagbrott. Prövas här på KORTET, inte bara i registret — kunden läser kortet.
    for (const kategori of ['forsakring-foretag', 'forsakring-ansvar']) {
      const k = watchedCard({ supplier: 'Länsförsäkringar AB', category: kategori,
        triage_reason: 'no_benchmark', route: 'unsupported' });
      // ⚠️ RUBRIKEN LÄSES UR REGISTRET, inte skriven av hand. Testet pinnade förut strängen
      //  «Kräver särskilt tillstånd» och föll när grundaren bytte kopian till «Utanför mandatet» —
      //  ett test som bär en KOPIA av kopian fäller på rätt beteende, och blir avstängt.
      assert.equal(k.kind, tystnadsbesked(kategori).rubrik, kategori);
      const hela = `${k.headline} ${k.detail} ${k.action}`;
      // Varje löftesverb måste vara negerat — förbjud påståendet, aldrig ordet (SK-08).
      for (const v of ['bevakar', 'hör av oss', 'förbereder', 'förhandlar']) {
        assert.ok(!new RegExp(`vi ${v}(?![^.;,]*\\binte\\b)`, 'i').test(hela),
          `${kategori} bär ett obekräftat «vi ${v}»: ${hela}`);
      }
      assert.ok(!/motbud|omförhandling|60 och 30 dagar/i.test(hela),
        `${kategori} lovar en bevakning vi inte får utföra`);
      assert.match(hela, /tillstånd/i);
    }
    // Motprov: en LAGLIG offertkategori ska fortfarande få sitt bevakningsbesked, annars vore
    // karantänen bara ett sätt att tysta allt.
    const laglig = watchedCard({ supplier: 'Securitas', category: 'it-support',
      triage_reason: 'no_benchmark', route: 'unsupported' });
    assert.equal(laglig.kind, tystnadsbesked('it-support').rubrik);
    assert.match(laglig.action, /60 och 30 dagar/);
  });

  test('BK-13 · ⚖️ INGEN väg runt karantänen — hela matrisen, inte ett stickprov', async () => {
    // ⚠️ DETTA FYND VAR MITT EGET, OCH DET VAR STRUKTURELLT. Karantänen låg först INNE i
    // `no_benchmark`-grenen — ett fall bland tolv i en if/else-kedja. Mätt 2026-09-18 med
    // femton verkliga svenska försäkringsbolag × elva triage-skäl × två rutter:
    //
    //     600 av 720 kombinationer UNDSLAPP karantänen.
    //
    // Flera av dem lovade dessutom något: «En människa läser om fakturan och vi återkommer med
    // rätt jämförelse» på en försäkringsfaktura är ordagrant lagbrottet. BK-12 var grön hela
    // tiden — den prövade ETT skäl (`no_benchmark`), alltså precis det enda som fungerade.
    //
    // Läxan: ett stickprov på en regulatorisk gräns är inget bevis. Testet sveper därför HELA
    // korsprodukten, och listan av skäl HÄRLEDS ur produktionskoden i stället för att skrivas av.
    const { readFileSync } = await import('node:fs');
    const kalla = readFileSync(new URL('../api/test-invoice.mjs', import.meta.url), 'utf8');
    const SKAL_I_PRODUKTION = [...new Set([...kalla.matchAll(/reason: '([a-z_]+)'/g)].map((m) => m[1]))];
    assert.ok(SKAL_I_PRODUKTION.length >= 8,
      `bara ${SKAL_I_PRODUKTION.length} triage-skäl hittade i api/test-invoice.mjs — härledningen mäter tomhet`);

    const BOLAG = ['Länsförsäkringar AB', 'Trygg-Hansa Försäkring AB', 'If Skadeförsäkring AB',
      'Folksam ömsesidig sakförsäkring', 'Moderna Försäkringar', 'Svedea AB', 'Gjensidige Försäkring',
      'Protector Forsikring ASA', 'ICA Försäkring AB', 'Anticimex Försäkringar AB'];
    const KATEGORIER = Object.keys(TYSTNADSSKAL).filter((k) => TYSTNADSSKAL[k].skal === SKAL.TILLSTAND_KRAVS);
    assert.ok(KATEGORIER.length >= 2, 'motprov: karantänen måste ha invånare');

    const lackor = [];
    for (const kategori of KATEGORIER) {
      const vantat = tystnadsbesked(kategori).rubrik;
      for (const supplier of BOLAG) {
        for (const triage_reason of [...SKAL_I_PRODUKTION, null]) {
          for (const route of ['unsupported', 'review_queue']) {
            const k = watchedCard({ supplier, normalized_supplier: supplier.toLowerCase(),
              category: kategori, triage_reason, route });
            if (k.kind !== vantat) lackor.push(`${kategori} · ${supplier} · ${triage_reason} · ${route} → ${k.kind}`);
          }
        }
      }
    }
    assert.deepEqual(lackor.slice(0, 5), [],
      `${lackor.length} kombinationer undslapp karantänen — regulatorisk gräns bruten`);

    // MOTPROVET: en icke-försäkringskategori måste fortfarande få sitt vanliga kort, annars har
    // förkontrollen svalt hela kedjan och testet är grönt av att allt ser likadant ut.
    const laglig = watchedCard({ supplier: 'Nordic IT Support AB', category: 'it-support',
      triage_reason: 'no_benchmark', route: 'unsupported' });
    assert.equal(laglig.kind, tystnadsbesked('it-support').rubrik);
    const elnat = watchedCard({ supplier: 'Ellevio AB', category: 'el', triage_reason: 'natavgift', route: 'unsupported' });
    assert.equal(elnat.kind, 'Reglerad nätkostnad', 'de leverantörsspecifika grenarna ska leva kvar');
    // ⚠️ DET BÄRANDE MOTPROVET, och mitt första saknade det: förkontrollen får ENBART gälla den
    // juridiska klassen. Vidgas den till «alla med ett besked» (`if (karantan)`) tar den över
    // även där en LEVERANTÖRSGREN är mer precis — GleSYS på serverhosting ska ge «Fragmenterad
    // marknad», inte kategorins generella «Volymstyrt pris». Utan den här raden fällde
    // sabotaget noll, eftersom både den strikta och den vidgade grenen ger samma svar för
    // it-support och el.
    const hosting = watchedCard({ supplier: 'GleSYS AB', normalized_supplier: 'glesys ab',
      category: 'serverhosting', triage_reason: 'volume_data_required', route: 'review_queue' });
    assert.equal(hosting.kind, 'Fragmenterad marknad',
      'förkontrollen får inte åsidosätta en mer precis leverantörsgren för icke-juridiska klasser');
  });

});
