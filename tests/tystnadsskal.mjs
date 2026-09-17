// tests/tystnadsskal.mjs — TS-01..09 · varje tyst kategori ska ha ett deklarerat skäl, och
// «oklart» ska aldrig nå kunden.
//
// ══ VARFÖR (2026-09-16) ═════════════════════════════════════════════════════════════════════
// Grundarordern löd «tillämpa Nivå-3-kopian rakt av på de 17 offert/volym-kategorierna». Sant
// tal är 15: `saas-crm` publicerar priser (i USD) och `vaxel` är en dublett av `molnvaxel`, som
// TALAR med ett verifierat Telia-ankare. Att skriva «offertprissatt» på någon av dem vore en
// osanning kunden kan motbevisa — den ena på tio sekunder, den andra genom att läsa nästa rad i
// samma rum.
//
// Sviten vaktar tre saker som alla har fällt oss förr:
//   · en tyst kategori UTAN deklaration (den nya kategorin som tyst får ingen text)
//   · en deklaration för en kategori som TALAR (två sanningar om samma kategori, regel 5)
//   · ett `oklart` som producerar kundtext (ett okänt som lånar ett giltigt värde)
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { SKAL, TYSTNADSSKAL, tystnadsbesked, tystnadsgrund } from '../lib/tystnadsskal.js';
import { isAudited } from '../lib/revision-gate.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const TYSTA = Object.keys(BRANCHINDEX).filter((k) => !isAudited(k));

describe('TS · tystnadens skäl', () => {
  test('TS-01 · VARJE tyst kategori bär ett deklarerat skäl', () => {
    // Mätt mot prisboken och revisionsgrinden, inte mot en avskriven lista — en lista i prosa
    // glider isär från den den beskriver (bibeln, 1 september).
    assert.ok(TYSTA.length > 10, `bara ${TYSTA.length} tysta kategorier — mät inte på tomhet`);
    const odeklarerade = TYSTA.filter((k) => !TYSTNADSSKAL[k]);
    assert.deepEqual(odeklarerade, [],
      `tysta kategorier utan deklarerat skäl: ${odeklarerade.join(', ')}`);
  });

  test('TS-02 · en kategori som TALAR får inte bära ett tystnadsskäl', () => {
    // De två kan inte båda vara sanna. Utan den här riktningen ruttnar registret i tysthet när en
    // kategori lyfts in bland dem som får tala — och ingen märker att skälet står kvar.
    const motsagelser = Object.keys(TYSTNADSSKAL).filter((k) => isAudited(k));
    assert.deepEqual(motsagelser, [],
      `kategorier som både talar och bär ett tystnadsskäl: ${motsagelser.join(', ')}`);
  });

  test('TS-03 · «oklart» producerar ALDRIG kundtext', () => {
    const oklara = Object.entries(TYSTNADSSKAL).filter(([, v]) => v.skal === SKAL.OKLART).map(([k]) => k);
    assert.ok(oklara.length > 0, 'motprov: det MÅSTE finnas oklara, annars vaktar TS-03 ingenting');
    for (const k of oklara) {
      assert.equal(tystnadsbesked(k), null, `«${k}» är oklar och får inte producera text`);
      assert.ok(tystnadsgrund(k), `men skälet ska stå skrivet för granskning: ${k}`);
    }
  });

  test('TS-04 · en okänd kategori ger tystnad, aldrig den mest generella texten', () => {
    // Fyrvärt tillstånd läst av en tvåvägsgren hamnar i `else`, och `else` är alltid det mest
    // generösa påståendet (bibeln 11 september). Här finns ingen else.
    for (const k of ['finns-inte', '', null, undefined, 'mobil']) {
      assert.equal(tystnadsbesked(k), null, String(k));
    }
  });

  test('TS-05 · saas-crm säger publikt pris i utländsk valuta, ALDRIG offertprissatt', () => {
    // Pipedrive, HubSpot och Zoho publicerar sina priser. En kund kan motbevisa «offertprissatt»
    // på tio sekunder, på exakt den yta där vår premiumposition bor.
    const b = tystnadsbesked('saas-crm');
    assert.equal(b.skal, SKAL.UTLANDSK_VALUTA);
    assert.ok(!/offert/i.test(b.rubrik + b.text), 'får aldrig kalla ett publicerat pris offertprissatt');
    assert.match(b.text, /inte i kronor|utländsk/i);
  });

  test('TS-06 · vaxel tiger, för molnvaxel talar om samma sak', () => {
    // `molnvaxel` är real-public med verifierat Telia-ankare och TALAR. Ett «offertprissatt» på
    // `vaxel` hade motsagt en rad i samma rum (regel 5).
    assert.equal(TYSTNADSSKAL['vaxel'].skal, SKAL.OKLART);
    assert.equal(tystnadsbesked('vaxel'), null);
    assert.equal(isAudited('molnvaxel'), true, 'motprovet: molnvaxel MÅSTE tala, annars är TS-06 meningslös');
  });

  test('TS-07 · varje klass utom «oklart» har en text, och texten kommer ur KLASSEN', () => {
    // Regel 1: femton handskrivna meningar glider isär, och den sextonde kategorin får ingen.
    const medText = Object.values(SKAL).filter((s) => s !== SKAL.OKLART);
    for (const s of medText) {
      const kat = Object.entries(TYSTNADSSKAL).find(([, v]) => v.skal === s)?.[0];
      assert.ok(kat, `ingen kategori bär klassen «${s}» — död klass`);
      const b = tystnadsbesked(kat);
      assert.ok(b && b.rubrik && b.text.length > 80, `klassen «${s}» saknar text`);
    }
    // Två kategorier med SAMMA klass ska ge IDENTISK text — annars är texten skriven per
    // kategori och registret är dekoration.
    // (Fixturen pekade förr på larm-bevakning, som flyttades till OKLART av F1 — ett test vars
    //  fixtur byter klass under fötterna prövar plötsligt null mot null.)
    assert.deepEqual(tystnadsbesked('it-support'), tystnadsbesked('foretagshalsovard'));
    assert.notDeepEqual(tystnadsbesked('it-support'), tystnadsbesked('serverhosting'));
  });

  test('TS-08 · beskedet lovar bara det som är backat — mätt, inte antaget', () => {
    // ⚠️ GRANSKNINGENS F3, GRUNDARBESLUT «B». Förra versionen lovade «vi bevakar avtalsslutet»,
    // «förbereder motbudet» och «säger till när något rör sig». INGEN av dem fanns:
    // `storeTriaged` skriver aldrig `contract_end_date`, och prislarmens mottagarlista
    // filtrerar `route = 'auto'`. Testet förbjuder därför de PÅSTÅENDENA, och kräver det enda
    // som är kontrollerat hela vägen: save-contract skriver datumet, send-reminders mejlar på
    // 60/30 dagar utan route-filter.
    for (const k of Object.keys(TYSTNADSSKAL)) {
      const b = tystnadsbesked(k);
      if (!b) continue;
      const hela = `${b.rubrik} ${b.rad} ${b.text} ${b.atgard}`;
      assert.ok(!/vi (genomför|utför|sköter) bytet|vi byter åt er/i.test(hela), `${k} lovar ett byte`);
      assert.ok(!/saknar data|har inte data|ingen information/i.test(hela), `${k} säger «vi saknar data»`);
      // De tre löftena utan mekanik, namngivna så de inte kan smyga tillbaka.
      assert.ok(!/vi bevakar avtalsslutet|förbereder (det exakta )?motbudet|säger till när något rör sig/i.test(hela),
        `${k} lovar en bevakning som inte finns för triagerade rader`);
      // Och det som FINNS ska stå där — annars är kortet en återvändsgränd.
      assert.match(b.atgard, /60 och 30 dagar/, `${k} saknar den backade åtgärden`);
    }
  });

  test('TS-09 · registret täcker exakt de tysta kategorierna — härlett, inte uppräknat', () => {
    // ⚠️ HÄR STOD 7, 8 OCH 15. Granskaren: talen har ingen självständig källa och kommer att
    // bumpas för att bli gröna (Tele2-läxan 18 aug) — en vakt vars svar man justerar är ingen
    // vakt. Den bärande raden är den HÄRLEDDA: registret och prisbokens tysta kategorier ska
    // vara samma mängd, varken fler eller färre.
    assert.deepEqual(
      Object.keys(TYSTNADSSKAL).slice().sort(),
      TYSTA.slice().sort(),
      'registret ska täcka exakt de tysta kategorierna',
    );
    // Varje klass ska vara i bruk — en död klass är en gren ingen prövar.
    const brukade = new Set(Object.values(TYSTNADSSKAL).map((v) => v.skal));
    for (const s of Object.values(SKAL)) assert.ok(brukade.has(s), `klassen «${s}» är död`);
  });

  test('TS-10 · klassen får ALDRIG säga emot prisboken', () => {
    // ⚠️ GRANSKNINGENS F1 OCH F8. Jag klassade `larm-bevakning` som offertprissatt — «inget
    // publikt listpris finns» — medan prisbokens egen not för samma kategori säger «Sector Alarm
    // 299–399, Verisure 349–499, Safemore 249–349 (VERIFIERADE LISTPRISER maj 2026)». Båda kan
    // inte vara sanna, och ingen vakt kunde se det: TS-01 prövar att ett svar FINNS, aldrig att
    // det är sant. `note` är maskinläsbar, alltså kan den halvan mätas.
    //
    // Det här är den vakt som hade fällt F1 utan granskare — och gränsen för vad en maskin kan
    // avgöra: den ser att prisboken MOTSÄGER klassen, aldrig att klassen är rätt vald.
    const VERIFIERAT = /verifierade? listpris|verifierat listpris/i;
    const strider = Object.entries(TYSTNADSSKAL)
      .filter(([k, v]) => v.skal === SKAL.OFFERTPRISSATT && VERIFIERAT.test(BRANCHINDEX[k]?.note ?? ''))
      .map(([k]) => k);
    assert.deepEqual(strider, [],
      `klassad som offertprissatt trots att prisboken bär verifierade listpriser: ${strider.join(', ')}`);
    // Motprov: regeln MÅSTE kunna fyra, annars är den grön av tomhet. larm-bevakning bär noten.
    assert.ok(VERIFIERAT.test(BRANCHINDEX['larm-bevakning']?.note ?? ''),
      'motprovet förutsätter att larm-bevakning fortfarande bär «verifierade listpriser» i prisboken');
  });
  test('TS-11 · VOLYMSTYRD kräver att prisboken NAMNGER drivkraften', () => {
    // ⚠️ GRANSKNINGENS F5, och min första rättelse hade ingen tand: att flytta tillbaka
    // `saas-other` till VOLYMSTYRD fällde NOLL tester. Klassen påstår något POSITIVT — «priset
    // styrs av volym» — och det får inte vara min åsikt.
    //
    // Mätt över prisbokens sju `volumeDataNote`: sex säger «styrs av antal fordon / specifikationer
    // / lokalyta …» och namnger drivkraften. `saas-other` säger «kräver en djupare analys av era
    // specifika funktionskrav» — ingen drivkraft, bara att det behöver en människa. Att kalla det
    // volymstyrt vore affirmativt falskt om en restpost vi per definition inte vet innehållet i.
    const NAMNGER = /styrs av/i;
    const utan = Object.entries(TYSTNADSSKAL)
      .filter(([k, v]) => v.skal === SKAL.VOLYMSTYRD && !NAMNGER.test(BRANCHINDEX[k]?.volumeDataNote ?? ''))
      .map(([k]) => k);
    assert.deepEqual(utan, [],
      `klassad som volymstyrd utan att prisboken namnger drivkraften: ${utan.join(', ')}`);
    // Motprov i BÅDA ändar — annars är regeln grön av tomhet eller fäller allt.
    assert.ok(NAMNGER.test(BRANCHINDEX['serverhosting']?.volumeDataNote ?? ''),
      'motprov: serverhosting MÅSTE namnge sin drivkraft, annars vaktar TS-11 ingenting');
    assert.ok(!NAMNGER.test(BRANCHINDEX['saas-other']?.volumeDataNote ?? ''),
      'motprov: saas-other MÅSTE sakna drivkraft, annars är F5-rättelsen omotiverad');
  });

});
