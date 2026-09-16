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
    assert.deepEqual(tystnadsbesked('larm-bevakning'), tystnadsbesked('it-support'));
    assert.notDeepEqual(tystnadsbesked('larm-bevakning'), tystnadsbesked('serverhosting'));
  });

  test('TS-08 · beskedet lovar aldrig ett byte, och säger aldrig «vi saknar data»', () => {
    // Nivå 3 i Switch-doktrinen: Arvo BEVÄPNAR och utlovar aldrig verkställighet (regel 9).
    // Och «vi saknar data» läses som en brist; «det finns inget listpris» är ett omdöme.
    for (const k of Object.keys(TYSTNADSSKAL)) {
      const b = tystnadsbesked(k);
      if (!b) continue;
      const hela = `${b.rubrik} ${b.text}`;
      assert.ok(!/vi (genomför|utför|sköter) bytet|vi byter åt er/i.test(hela), `${k} lovar ett byte`);
      assert.ok(!/saknar data|har inte data|ingen information/i.test(hela), `${k} säger «vi saknar data»`);
      assert.ok(/bevakar|förbereder|säger till/i.test(hela), `${k} säger inte vad vi GÖR i stället`);
    }
  });

  test('TS-09 · de femton som bär Nivå-3-kopian är just femton — inte sjutton', () => {
    // Ordern sa 17. Talet står här för att nästa läsare annars räknar efter ordern och inte
    // efter registret — samma sjukdom som prisbokens avskrivna listor.
    const volym = Object.values(TYSTNADSSKAL).filter((v) => v.skal === SKAL.VOLYMSTYRD).length;
    const offert = Object.values(TYSTNADSSKAL).filter((v) => v.skal === SKAL.OFFERTPRISSATT).length;
    assert.equal(volym, 7, 'volymstyrda');
    assert.equal(offert, 8, 'offertprissatta (Nivå 3)');
    assert.equal(volym + offert, 15, 'de som får ett besked om att inget golv finns');
    // Och de övriga tysta ska vara redovisade, inte bortglömda.
    assert.equal(TYSTA.length, Object.keys(TYSTNADSSKAL).length,
      'registret ska täcka exakt de tysta kategorierna — varken fler eller färre');
  });
});
