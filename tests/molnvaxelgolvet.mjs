// tests/molnvaxelgolvet.mjs — VARFÖR MOLNVÄXEL INTE BÄR ETT BRANSCHANKARE, TESTLÅST.
//
// ══ FRÅGAN (grundarorder 2026-09-19) ════════════════════════════════════════════════════════
// «Går det att härleda ett säkert prisgolv ur `teliaVerified.tiers`, så att den kollektiva
// sanningen kan visas för molnväxel i Rummet?»
//
// ══ SVARET: GOLVET GÅR ATT HÄRLEDA. JÄMFÖRELSEN GÖR DET INTE. ══════════════════════════════
// Det är inte samma fråga, och skillnaden är hela domen. `89 kr/användare/mån × 12 = 1 068
// kr/användare/år` är exakt, läst ur prisbokens verifierade Telia-ankare, och oberoende bekräftat:
// Telenors One Talk-licens på en verklig fixtur kostar också 89 kr. Talet är sunt.
//
// Men ankaret (`buildBranchAnchors`) parar golvet med TVÅ tal som båda är fel för den här
// kategorin, och det är MÄTT i MG-03 genom att köra produktionens egna funktioner:
//
//   · `annual_cost` är HELA den kombinerade fakturan. På `telenor-molnvaxel-stor` är bara 21 %
//     av beloppet växel — resten är 45 mobilabonnemang och roaming.
//   · `seat_count` är SIM-kortsantalet (45), inte antalet växellicenser (50). `extract.js` sätter
//     det MED FLIT: «benchmark is on mobile subscriptions, not switchboard capacity.»
//
// Utfallet: en kund som betalar EXAKT Telias verifierade listpris, på kronan, skulle visas som
// **+471 % över golvet med Arvo Score 15** — «SÄMRE ÄN MARKNADEN». Med rätt operander blir samma
// kund `perEnhet 1 068 = golvet`, 0 %, score 88. **Samma golv, samma kund, 73 poängs skillnad.**
//
// Det är E3/E5-falsklarmet (20 augusti) och «kundens 40-SIM-total mot en kohort vars enhetsantal
// ingen normaliserat» (21 augusti) samtidigt — och riktningen är den farliga: mot vårt eget arvode.
//
// ══ OCH DET HADE INTE BARA TRÄFFAT ANKARET ═════════════════════════════════════════════════
// `getPublicListBenchmark` har fler konsumenter än `buildBranchAnchors`: `recommend.js`
// (`publiktGolv`, bytesgolvet) och `lib/prisunderlag.js` → SCOREN. Att lägga en matris i prisboken
// hade alltså tänt scoren också, inte bara kortet. 19 augusti-regeln: en läsväg som ger fel sorts
// tal är inte lagad förrän VARJE konsument är inventerad.
//
// ══ VAKTENS PREMISS (Verifieringsplikten p.5) ══════════════════════════════════════════════
//   FÅNGAR: att någon lägger till `molnvaxel` i enhets-allowlistan eller ger kategorin en matris
//           utan att först lösa enhetsproblemet — och MG-03 visar med tal varför det är fel.
//   BLIND:  sviten vet inget om huruvida 89 kr fortfarande är Telias pris (det är prisauditens och
//           telia-vaxel-verifierarens jobb), och den kan inte se en framtida kategori med samma
//           form. Den vaktar molnväxel, inte «kombinerade fakturor» som klass.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import { getPublicListBenchmark } from '../lib/benchmark.js';
import { byggPrisunderlag, scoreUrUnderlag } from '../lib/prisunderlag.js';
import { BRANCH_ANCHOR_UNIT } from '../api/invoice-history.mjs';

// Raderna är ORDAGRANT `telenor-molnvaxel-stor.pdf` (scripts/generate-test-invoices.mjs:632).
// Avlästa, inte påhittade — ett testvärde som anpassas till koden är ingen mätning.
const FAKTURAN = {
  mobilMan:     45 * 379,      // 45 abonnemang à 379 kr
  vaxelMan:     50 * 89,       // 50 växellicenser à 89 kr  ← den verkliga växelkostnaden
  receptionMan: 449,           // One Talk Reception (IVR) — per BOLAG, inte per användare
  roamingMan:   539.6 + 364.9,
  simAntal:     45,            // det extract.js lagrar som seat_count
  licensAntal:  50,            // det fakturan fakturerar växellicenser för
};
const ARSKOSTNAD = Math.round(
  (FAKTURAN.mobilMan + FAKTURAN.vaxelMan + FAKTURAN.receptionMan + FAKTURAN.roamingMan) * 12);

describe('MOLNVÄXELGOLVET · golvet håller, jämförelsen gör det inte', () => {
  test('MG-01 · golvet GÅR att härleda ur det verifierade ankaret, och det är exakt', () => {
    const t1 = BRANCHINDEX.molnvaxel?.teliaVerified?.tiers?.T1;
    assert.equal(t1?.fromMonthly, 89, 'T1:s instegsgolv är talet hela härledningen vilar på');
    assert.equal(BRANCHINDEX.molnvaxel.teliaVerified.vatBasis, 'exkl',
      'ett golv utan momsbas är inte jämförbart med en B2B-faktura');
    assert.equal(t1.fromMonthly * 12, 1068);
    // Oberoende bekräftelse: Telenors One Talk-licens på en verklig fixtur kostar också 89 kr.
    assert.equal(FAKTURAN.vaxelMan / FAKTURAN.licensAntal, 89,
      'två leverantörer, samma listpris — golvet är inte en Telia-egenhet');
  });

  test('MG-02 · en MEDIAN går INTE att härleda — det publicerade spannet är kapat uppåt', () => {
    // T1 och T2 är två nivåer hos EN leverantör, inte två marknadsobservationer. Och T3
    // (Kontaktcenter) saknar publicerat pris. En «median» över {89, 118} vore alltså medianen av
    // de två BILLIGASTE nivåerna, presenterad som vad marknaden betalar — systematiskt för låg,
    // vilket ökar den påvisade överbetalningen och därmed vårt eget arvode. Regel 3 känner ingen
    // avvägning, och allra minst när felet pekar åt vårt håll (18 augusti).
    const kanoniska = BRANCHINDEX.molnvaxel.canonicalTiers;
    const prissatta = BRANCHINDEX.molnvaxel.teliaVerified.tiers;
    assert.ok(kanoniska.T3, 'kategorin HAR en tredje nivå');
    assert.equal(prissatta.T3, undefined,
      'T3 saknar publicerat pris (offert) — spannet vi ser är kapat uppåt, alltså finns ingen '
      + 'fördelning att ta en median ur');
    assert.equal(Object.keys(prissatta).length, 2);
  });

  test('MG-03 · BEVISET: samma golv, två operandpar, 73 poängs skillnad', () => {
    // Kör produktionens EGNA funktioner. Golvet är korrekt i båda fallen; bara de två talen
    // ankaret parar det med skiljer sig.
    const ankare = {
      category: 'molnvaxel', median: 1068, p25: 1068, source: 'real-public',
      unitLabel: 'per användare/år', unitNoun: 'användare', unitNounPl: 'användare',
    };

    // (a) Ankarets operander: hela fakturan ÷ SIM-antal.
    const fel = byggPrisunderlag({
      annualCost: ARSKOSTNAD, seats: FAKTURAN.simAntal, ankare, niva: null });
    assert.ok(fel.avstandPct > 400,
      `en kund på exakt listpris visas som +${fel.avstandPct} % över — falsklarm per konstruktion`);
    assert.ok(scoreUrUnderlag(fel) <= 20,
      'och scoren kraschar till botten på en kund som inte gjort något fel');

    // (b) Rätt operander: växellicensraderna ÷ antalet licenser.
    const ratt = byggPrisunderlag({
      annualCost: FAKTURAN.vaxelMan * 12, seats: FAKTURAN.licensAntal, ankare, niva: null });
    assert.equal(ratt.perEnhet, 1068, 'med rätt operander ligger kunden EXAKT på golvet');
    assert.equal(ratt.avstandPct, 0);
    assert.equal(ratt.underGolv, true);

    // Skillnaden är hela domen — och den mäts, den påstås inte.
    const spann = scoreUrUnderlag(ratt) - scoreUrUnderlag(fel);
    assert.ok(spann > 60,
      `bara ${spann} poängs skillnad — då håller inte domens premiss och den ska skrivas om`);
  });

  test('MG-04 · därför bär molnvaxel INGET ankare, och prisboken är fail-closed', () => {
    assert.equal(BRANCH_ANCHOR_UNIT.molnvaxel, undefined,
      'molnvaxel får inte ligga i enhets-allowlistan förrän jämförelsen isolerar VÄXELN: '
      + '`annual_cost` är hela den kombinerade fakturan och `seat_count` är SIM-antalet. '
      + 'Se MG-03 för vad det kostar i kundytan.');
    assert.equal(BRANCHINDEX.molnvaxel.matrix, undefined,
      'och ingen matris — annars svarar getPublicListBenchmark, och den läses av SCOREN '
      + '(lib/prisunderlag.js) och av bytesgolvet i recommend.js, inte bara av ankaret');
    assert.equal(getPublicListBenchmark({ category: 'molnvaxel', employees: 45 }), null,
      'tystnaden ska komma ur läsvägen själv, inte ur att ingen råkar fråga');
  });

  test('MG-05 · MOTPROVET: tystnaden är riktad, inte allmän', () => {
    // En vakt som är grön för att ALLT är tyst vaktar ingenting. Kategorier vars jämförelse
    // faktiskt håller ska fortfarande bära sitt ankare.
    for (const k of ['mobil', 'saas-productivity', 'loneadmin']) {
      assert.ok(BRANCH_ANCHOR_UNIT[k], `${k} ska ligga kvar i allowlistan`);
      const b = getPublicListBenchmark({ category: k, employees: 10 });
      assert.ok(b && b.median > 0, `${k} ska fortfarande ge ett golv`);
    }
  });
});
