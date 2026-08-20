// tests/obduktion.mjs — HÅLEN SOM OBDUKTIONEN 2026-08-20 HITTADE.
//
// Grundaren: "Granska hela vår lösning ner på minsta beståndsdel. Noll procent magkänsla."
// Fynden nedan hittades genom att KÖRA funktionerna med fientliga indata och läsa varje
// utgång — inte genom att läsa koden och tycka att den såg rätt ut.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: (a) att avstämningsgrinden svarar BEVISAD_LIKHET på en rad vars valuta aldrig
//           fastställts, (b) att en verifierare kan tysta sig själv med `skipped` utan
//           deklarerat skäl, och (c) att "noll checkar" rapporteras som väntande i stället
//           för rött. Prövas genom att ANROPA grinden och LÄSA verifierarnas källkod.
//   BLIND:  vakten kan inte se om ett DEKLARERAT skippSkal är sant. Skriver någon
//           `skippSkal: 'väntar på credential'` när källan i själva verket bara bytt form är
//           utgången grön på fel grund igen. Kontraktet är en tvingande fråga, aldrig ett bevis.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { stamAv, AVST, SKAL } from '../lib/saas-avstamning.js';
import { routeExtraction } from '../agents/test-invoice/extract.js';
import { bedomVerifierarutfall, UTFALL } from '../lib/verifierarutfall.js';
import { judgeLineArithmetic } from '../lib/extraction-integrity.js';
import { judgeSchema } from '../lib/schema-guard.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VERIFIERARE = join(ROT, 'lib', 'verifiers');

const vaktad = (o = {}) => ({ leverantor: 'microsoft', tier: 'Business Standard',
  tierNyckel: 'business-standard', prisOre: 13382, period: 'manad', momsbas: 'exkl',
  valuta: 'SEK', vaktad: true, farsk: true, kalla: 'microsoft.com', ...o });
const rad = (o = {}) => ({ leverantor: 'microsoft', antal: 10, beloppOre: 133820,
  period: 'manad', momsbas: 'exkl', valuta: 'SEK', ...o });

describe('OBDUKTION · hål som fanns innan granskningen 2026-08-20', () => {
  test('OB-01 · grinden svarar aldrig på en rad utan fastställd valuta', () => {
    // Filtret skriver `v.valuta === rad.valuta` och kommentaren lovar "ingen FX, någonsin".
    // Men jämförelsen KRÄVDE aldrig ett värde: saknades valutan på båda sidor blev
    // undefined === undefined sant, och grinden svarade BEVISAD_LIKHET på en rad vars valuta
    // aldrig fastställts. Mataren blockerade det — men en grind som förlitar sig på sin
    // anropare är ingen grind. Samma mönster som isTotal: en flagga som fanns men aldrig sattes.
    for (const v of [undefined, null, '', '   ']) {
      const dom = stamAv(rad({ valuta: v }), [vaktad({ valuta: v })]);
      assert.equal(dom.utfall, AVST.TYST, `valuta ${JSON.stringify(v)} gav ${dom.utfall}`);
      assert.equal(dom.skal, SKAL.INGEN_VALUTA);
    }
    // Normalfallet ska fortfarande gå igenom — annars har vi lagat genom att stänga av.
    assert.equal(stamAv(rad(), [vaktad()]).utfall, AVST.BEVISAD_LIKHET);
    // Och två olika valutor får aldrig mötas.
    assert.equal(stamAv(rad(), [vaktad({ valuta: 'USD' })]).utfall, AVST.TYST);
  });

  test('OB-02 · ingen verifierare får tysta sig själv med "noll checkar"', () => {
    // lib/verifiers/atlassian.mjs returnerade `{ skipped: true }` när checks.length === 0 —
    // exakt det tillstånd `!(res.checks?.length)` i scripts/verify.mjs finns för att göra RÖTT.
    // En verifierare kunde alltså läsa noll tal ur källan och rapportera "väntar". Det är den
    // avstängda vakten i ny kostym: fabriken grön medan en prisbokspost står obevakad.
    for (const f of readdirSync(VERIFIERARE).filter((n) => n.endsWith('.mjs'))) {
      const src = readFileSync(join(VERIFIERARE, f), 'utf8');
      const kod = src.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
      // En skip som villkoras på antalet checkar är per definition "jag hittade inget".
      assert.doesNotMatch(kod, /checks\.length\s*===?\s*0[^\n]*skipped/,
        `${f}: "noll checkar" returneras som skipped — det ska vara rött`);
    }
  });

  test('OB-03 · fabrikens dom prövas genom att ANROPAS, inte genom att läsas', () => {
    // Första versionen av det här testet matchade källtext i scripts/verify.mjs. Sabotaget som
    // stängde AV skip-kravet lämnade ordet kvar i en console.log — och vakten förblev grön.
    // En vakt som inte fäller för sitt eget sabotage är ingen vakt. Beslutet bor nu i en ren
    // funktion som både fabriken och sviten kallar (regel 1), och prövas på sitt BETEENDE.
    const f = (r) => bedomVerifierarutfall(r).utfall;

    // Rött ska vara rött — i alla former.
    assert.equal(f({ checks: [] }), UTFALL.ROTT, 'noll checkar');
    assert.equal(f({ checks: [{ ok: true }], fatal: true }), UTFALL.ROTT, 'oåtkomlig källa');
    assert.equal(f({ checks: [{ ok: true }, { ok: false }] }), UTFALL.ROTT, 'drift');
    assert.equal(f(undefined), UTFALL.ROTT, 'ett svar som inte finns är inte grönt');
    assert.equal(f({}), UTFALL.ROTT, 'ett tomt svar är inte grönt');

    // En skip utan deklarerat skäl är en självutfärdad dispens.
    assert.equal(f({ skipped: true }), UTFALL.ROTT);
    assert.equal(f({ skipped: true, skippSkal: '   ' }), UTFALL.ROTT);
    // Och skälet får aldrig vara "jag hittade inget" — det ÄR definitionen av rött.
    assert.equal(f({ skipped: true, skippSkal: 'hittade inga checkar på sidan' }), UTFALL.ROTT);

    // Bara ett deklarerat STRUKTURELLT skäl får vänta.
    assert.equal(f({ skipped: true, skippSkal: 'väntar på Atlassian-credential' }), UTFALL.VANTAR);

    // Och grönt ska fortfarande gå igenom — annars har vi lagat genom att stänga av.
    assert.equal(f({ checks: [{ ok: true }, { ok: true }] }), UTFALL.GRON);
  });

  test('OB-06 · rummets dom branschar på NYCKEL, aldrig på en visningsetikett', () => {
    // LIVE-BUGG, orsakad av min egen omdöpning en timme tidigare. Domens rubrik jämförde mot
    // etikettsträngen ('Bättre än marknaden'). När etiketterna byttes till listpris-språk blev
    // ALLA TRE jämförelser falska, och varje kund — även den som låg bättre än listpris — fick
    // rubriken "Ni betalar mer än marknaden". Ett falskt påstående i rummets största text.
    //
    // Samma fälla som tierNyckel finns för att undvika: en etikett kan skrivas om, en nyckel
    // kan det inte. Vakten läser källtexten eftersom rubriken är renderingskod.
    const rum = readFileSync(join(ROT, 'src/pages/Portfolio/index.js'), 'utf8');
    const kod = rum.split('\n').filter((r) => !r.trim().startsWith('//') && !r.trim().startsWith('*')).join('\n');

    assert.doesNotMatch(kod, /standing\.label\s*===/,
      'domen får aldrig jämföra mot en visningsetikett — byt till standing.niva');
    assert.match(kod, /standing\.niva\s*===\s*'battre'/, 'rubriken ska branscha på nyckeln');
    assert.match(kod, /niva:\s*null/, 'utan mätt score finns ingen nivå att peka ut');

    // Och nyckelns tre värden måste finnas som grenar — annars faller någon tyst igenom.
    for (const n of ['battre', 'i-niva']) {
      assert.match(kod, new RegExp(`standing\\.niva\\s*===\\s*'${n}'`), `grenen ${n} saknas`);
    }
  });

  test('OB-07 · rummet påstår aldrig att vi läst VARJE rad', () => {
    // 6 av 7 uppmätta rader saknar radposter helt. "Vi läste varje rad på era fakturor" var
    // därför ett absolut påstående vi inte kunde backa på majoriteten av underlaget — och
    // absoluta påståenden är det första en finansdirektör prövar.
    // Samma sak med "Resten håller måttet": ett omdöme om rader vi uttryckligen avstått från
    // att bedöma (ovissNiva → inget score), vilket är precis felet vi tog bort ett lager ned.
    const rum = readFileSync(join(ROT, 'src/pages/Portfolio/index.js'), 'utf8');
    const kod = rum.split('\n').filter((r) => !r.trim().startsWith('//') && !r.trim().startsWith('*')).join('\n');
    assert.doesNotMatch(kod, /läste varje rad/i, 'vi läser inte varje rad på varje faktura');
    assert.doesNotMatch(kod, /Resten håller måttet/i, 'ett omdöme om rader vi inte bedömt');
  });

  test('OB-08 · ingen kundfaktura tappas tyst i ytterdörren', () => {
    // api/inbound-email.mjs returnerade `{ ok: true, skipped: 'rate limit' }` UTAN logg och UTAN
    // svarsmail. En kund som vidarebefordrade sin bunt och passerade taket fick absolut tystnad:
    // hen tror att Arvo tagit emot fakturorna, Arvo tror att ingenting hänt, fakturorna är borta.
    //
    // Det är den tysta tappen i ytterdörren — och värre än de vi städat inne i pipelinen, för
    // här har kunden gjort allt rätt. Taket (40/dygn) krockar dessutom med löftet vi säljer
    // bulk-intaget på: "50–100 fakturor på en gång".
    const src = readFileSync(join(ROT, 'api', 'inbound-email.mjs'), 'utf8');
    const kod = src.split('\n').filter((r) => !r.trim().startsWith('//') && !r.trim().startsWith('*')).join('\n');

    // ANKARET MÅSTE VARA GRENEN, INTE KONSTANTEN. Första versionen matchade
    // 'RATE_LIMIT_PER_DAY)' och landade på deklarationen `= Number(...) || 40;` högst upp i
    // filen — 1 100 tecken från koden den skulle vakta. Vakten fällde då på fel grund och hade
    // varit lika värdelös om den blivit grön. Ett mätinstrument granskas lika hårt som det det mäter.
    const i = kod.indexOf('n > RATE_LIMIT_PER_DAY');
    assert.ok(i > 0, 'rate limit-GRENEN hittades inte — har villkoret skrivits om?');
    const gren = kod.slice(i, i + 1800);
    assert.match(gren, /resend\.emails\.send/,
      'rate limit måste svara avsändaren — en tyst 200 gör kunden till den som förlorar fakturan');
    assert.match(gren, /console\.(warn|error)/,
      'och den måste bokföras: ett beslut vi inte skriver ned har vi inte fattat');
  });

  test('OB-09 · en grind som kraschar har inte godkänt något', () => {
    // judgeLineArithmetic hade `catch { return { balanced: true } }`. Ett undantag mitt i
    // radgranskningen rapporterades alltså som GODKÄND BALANS — fail-open i en grind vars hela
    // syfte är att fälla. Den som läser utfallet kunde inte skilja "alla rader gick ihop" från
    // "jag kraschade på rad tre".
    const dom = judgeLineArithmetic({
      // En rad vars .type-getter kastar → undantag inuti loopen.
      lineItems: [new Proxy({}, { get(_, p) { if (p === 'quantity') return 1; if (p === 'unitPrice') return 1; throw new Error('trasig rad'); } })],
    });
    assert.equal(dom.balanced, false, 'en krasch får aldrig rapporteras som balanserad');
    assert.match(dom.violations[0]?.reason ?? '', /kraschade/, 'och skälet ska vara bokfört');
  });

  test('OB-10 · en okänd typdeklaration godkänner inte allt', () => {
    // schema-guard returnerade `true` för en typ den inte kände igen, med motiveringen att
    // lintToolSchema fångar den. Men linten är en ANNAN körning: den som deployar ett schema med
    // ett stavfel ('strng') fick en grind som tyst godkände varje värde.
    // En kontroll som inte förstår sin egen deklaration har inte kontrollerat något.
    const schema = { type: 'object', properties: { belopp: { type: 'strng' } } };
    const brott = judgeSchema(schema, { belopp: { helt: 'fel', form: true } });
    assert.ok(brott.length > 0, 'en okänd typdeklaration måste fälla, inte släppa igenom');
  });

  test('OB-05 · fabriken använder den delade domen, inte en egen kopia', () => {
    const kod = readFileSync(join(ROT, 'scripts', 'verify.mjs'), 'utf8')
      .split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
    assert.match(kod, /bedomVerifierarutfall\(res\)/,
      'verify.mjs måste kalla den prövade funktionen — en andra inline-kopia kan glida isär');
  });

  test('OB-04 · varje skip i registret bär sitt skäl', () => {
    // Deklarationen är en TVINGANDE FRÅGA, aldrig ett bevis: vakten ser att svaret finns,
    // aldrig att det är sant. Men skillnaden mellan "väntar på credential" och "jag hittade
    // inget" ska stå i koden, inte i någons huvud.
    for (const f of readdirSync(VERIFIERARE).filter((n) => n.endsWith('.mjs'))) {
      const src = readFileSync(join(VERIFIERARE, f), 'utf8');
      const kod = src.split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');
      if (!/skipped:\s*true/.test(kod)) continue;
      assert.match(kod, /skippSkal\s*:/,
        `${f}: returnerar skipped utan skippSkal — en skip utan skäl är en självutfärdad dispens`);
    }
  });
});

// ── OB-11..14 · MOMSGRINDEN GISSADE SATSEN SOM FAKTURAN SKRIVER UT ────────────────────────────
// Ring 1 (radsumma = fakturatotal) förklarade bort ett glapp som «moms» om NÅGON av satserna
// 25/12/6 % passade inom toleransen. Med tolerans max(50 kr, 3 % av totalen) blir det ett fönster
// från ~3 % till ~9 % av fakturan där en SAKNAD RAD godkänns som moms — och kunden får bocken
// «radsumman stämmer mot fakturatotalen». Fakturan säger ju vilken sats den använder:
// `moms_sats` är ett observationsfält sedan 12 augusti, avläst och aldrig härlett.
//
// FÅNGAR: att grinden accepterar en annan sats än den fakturan anger; att en 0 %-faktura
//   (reverse charge) får sitt glapp bortförklarat som moms; att motsägelsen mellan fakturans
//   momsuppgift och dess egen aritmetik passerar obokförd.
// BLIND: vakten kan inte se om den AVLÄSTA satsen är rätt avläst. Hallucinerar modellen 0,25 på
//   en 6 %-faktura dömer grinden mot fel sats — lika säkert som förr, bara med en annan orsak.
//   Textlagret (lib/pdf-textlager.js) är det oberoende vittne som skulle kunna stänga det;
//   det används i dag bara för fakturanumret. Uttalad, ostängd.
describe('OB · Momsgrinden läser satsen i stället för att prova tre', () => {
  const bas = (extra) => ({
    supplier: 'Testleverantör AB', invoiceTotal: 10_000, annualCost: 120_000,
    lineItems: [{ description: 'Abonnemang', amount: 9_400, type: 'recurring_subscription' }],
    ...extra,
  });

  test('OB-11 · fakturan säger 25 % men glappet motsvarar 6 % → bokförd motsägelse, inte bock', () => {
    // lineSum 9 400, total 10 000 → glapp 600 (6,4 %). Tolerans = 300. 6 % förklarar; 25 % inte.
    const r = routeExtraction(bas({ momssats: 0.25 }));
    const rad = (r.verifications ?? []).find((v) => v.id === 'radsumma');
    assert.equal(rad?.status, 'varning',
      'fakturans egen momsuppgift förklarade inte glappet — då är «radsumman stämmer» ett påstående vi inte kan belägga');
    assert.match(rad.detalj, /25 %/);
    assert.notEqual(r.route, 'review_queue', 'motsägelsen får bokföras utan att kosta kunden fakturan');
  });

  test('OB-12 · fakturan säger 6 % och glappet är 6 % → bocken står, med satsen namngiven', () => {
    const r = routeExtraction(bas({ momssats: 0.06 }));
    const rad = (r.verifications ?? []).find((v) => v.id === 'radsumma');
    assert.equal(rad?.status, 'ok');
    assert.match(rad.detalj, /6 % enligt fakturan/,
      'ordet «verifierat» kräver ett underlag — säger vi att glappet är momsen ska vi säga vilken sats');
  });

  test('OB-13 · reverse charge (0 %) får inte få sitt glapp bortförklarat som moms', () => {
    // Det farligaste fallet: fakturan säger uttryckligen att ingen moms tas ut, och ändå gick
    // 25/12/6 %-provningen igång och kunde godkänna glappet.
    const r = routeExtraction(bas({ momssats: 0 }));
    const rad = (r.verifications ?? []).find((v) => v.id === 'radsumma');
    assert.notEqual(rad?.status, 'ok',
      'en faktura som säger 0 % moms kan inte ha ett glapp som «är momsen»');
  });

  test('OB-14 · utan avläst sats står tre-satsprovningen kvar (ingen faktura går förlorad)', () => {
    const r = routeExtraction(bas({ momssats: null }));
    const rad = (r.verifications ?? []).find((v) => v.id === 'radsumma');
    assert.equal(rad?.status, 'ok',
      'fail-closed för FÄLTET, fail-open för PIPELINEN: saknad observation får skärpa ingenting');
  });
});
