// tests/riktningskrav.mjs — RIKTNINGSKRAVET: ett prisgap får bara påstås åt det håll talen bär.
//
// ── VARFÖR DEN HÄR FILEN FINNS (2026-09-05, Atea-kortet) ──────────────────────────────────────
// Grundaren visade ett kort där rubriken sa «Marknadsmässigt pris — vi hittar inget prisgap» och
// brödtexten rakt under sa *«Microsofts eget publika listpris för exakt samma E3-licenser på
// årsavtal är LÄGRE … Bind om till Microsoft årsavtal så försvinner mellanhandens påslag.»*
//
// Mätt mot prisboken: kunden betalade 410,00 kr/anv/mån, Microsofts publika årsavtalspris för E3
// är 416,77 kr (`msrpAnnual`). Påståendet var falskt, och åtgärden vi föreslog hade KOSTAT kunden
// 6,77 kr per licens och månad. Under 20 % success fee är det den farligaste riktningen vi har.
//
// TRE LAGER SVEK SAMTIDIGT, alla med samma form — «inget gap» representerat som «inget underlag»:
//   1. PROMPTEN slog fast som premiss att «kunden överprisas» för VARJE faktura med LFL-underlag,
//      och bad modellen förklara VARFÖR. Modellen svarade på frågan den fick. Vi hittade inte på
//      lögnen — vi beordrade den.
//   2. ATTRIBUERINGSLÅSET returnerade null när savingPerYear inte var > 0 — alltså i precis det
//      läge där fakta är MEST kompletta.
//   3. Och låset satt dessutom inuti `if (result.shouldSwitch && benchmark)`, där `shouldSwitch`
//      kommer från MODELLEN. Sa modellen «inget byte» kördes ingen kodskriven logik alls: modellens
//      egen prosa VAR hela kortet, på webben, i PDF:en och i mailet.
//   4. PROSAKRAVET kunde aldrig se det: det verifierar TAL mot prompten, och «är lägre» bär inget.
//
// Testerna nedan matar PRODUKTIONSVÄGEN (recommend() med stub-klient) med den verkliga lögnen och
// kräver att den inte överlever. Att mata buildLikeForLikeReasoning direkt hade bara bevisat att
// mekanismen svarar när den matas — samma sjukdom som lät låset stå mörkt i två månader.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import {
  recommend, computeLikeForLikeSaasTarget, buildLikeForLikeReasoning, lflPrisgap,
} from '../agents/recommender/recommend.js';

const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
const E3_LISTA = TIERS['e3'].msrpAnnual;          // 416,77 — läses, skrivs aldrig av testet

// Den ordagranna texten ur grundarens skärmdump.
const AI_LOGNEN =
  'Ni betalar 410 kr/seat löpande månadsvis via Atea — utan årsåtagande. Microsofts eget publika '
  + 'listpris för exakt samma E3-licenser på årsavtal är lägre och tillgängligt utan förhandling. '
  + 'Bind om till Microsoft årsavtal så försvinner mellanhandens påslag.';

const rader = (aPris, antal = 25) => ([{
  type: 'recurring_subscription', description: 'Microsoft 365 E3',
  quantity: antal, unitPrice: aPris, amount: Math.round(aPris * antal),
}]);

/** Kör produktionsvägen och lämna tillbaka BÅDE svaret och den prompt modellen faktiskt fick. */
async function kor(lines, { aiText = AI_LOGNEN, aiSwitch = false } = {}) {
  const prompter = [];
  const stubAi = { messages: { create: async (args) => {
    prompter.push(JSON.stringify(args));
    return {
      content: [{ type: 'tool_use', input: {
        shouldSwitch: aiSwitch,
        recommendationType: aiSwitch ? 'switch' : 'no_action',
        reasoning: aiText,
      } }],
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    };
  } } };
  const stubKv = { get: async () => ({ rate: 10.5, fetchedAt: new Date().toISOString() }) };
  const annualCost = lines.reduce((s, l) => s + l.amount, 0) * 12;
  const lfl = computeLikeForLikeSaasTarget(lines, TIERS, annualCost);
  const svar = await recommend({
    customer:    { industry: 'it-tech', employees: 25 },
    categorized: { category: 'saas-productivity', subType: 'produktivitet', normalizedSupplier: 'Atea Sverige AB', confidence: 0.95 },
    invoice:     { annualCost, billingPeriod: 'monthly', seatCount: 25, lineItems: lines, likeForLikeTarget: lfl },
  }, { client: stubAi, kvStore: stubKv });
  return { svar, prompt: prompter.join('\n'), lfl };
}

// ── RK-01 · Riktningen är EN sanning, och «okänt» är inte «inget gap» ─────────────────────────
describe('RK-01 · lflPrisgap', () => {
  const lfl = (billed) => ({ dominantTierKey: 'e3', tierLines: [
    { key: 'e3', quantity: 25, benchmarkMonthly: E3_LISTA, billedUnitMonthly: billed },
  ] });

  test('under listpris → under (Atea-fallet)', () => {
    assert.equal(lflPrisgap(lfl(410)).riktning, 'under');
    assert.ok(lflPrisgap(lfl(410)).gapAnnual < 0, 'gapet ska bära sitt tecken');
  });

  test('exakt listpris → lika, aldrig over', () => {
    assert.equal(lflPrisgap(lfl(E3_LISTA)).riktning, 'lika');
    assert.equal(lflPrisgap(lfl(E3_LISTA)).gapAnnual, 0);
  });

  test('över listpris → over', () => {
    assert.equal(lflPrisgap(lfl(450)).riktning, 'over');
  });

  // Toleransen är HÄRLEDD ur avläsningens egen precision (billedUnitMonthly avrundas till två
  // decimaler ⇒ osäkerhet ≤ 0,005 kr/licens/mån), inte vald för att det kändes lagom.
  test('en avrundning i sista decimalen är samma pris, inte ett gap', () => {
    assert.equal(lflPrisgap(lfl(E3_LISTA + 0.005)).riktning, 'lika');
    assert.equal(lflPrisgap(lfl(E3_LISTA + 0.50)).riktning, 'over',
      'ett halvt kronavstånd är verkligt och får aldrig avrundas bort');
  });

  test('utan fakturerat à-pris är riktningen OKÄND — null, aldrig "under"', () => {
    const utanApris = { dominantTierKey: 'e3', tierLines: [{ key: 'e3', quantity: 25, benchmarkMonthly: E3_LISTA }] };
    assert.equal(lflPrisgap(utanApris), null,
      'den som läser null som "inget gap" återinför precis felet funktionen finns för');
    assert.equal(lflPrisgap(null), null);
    assert.equal(lflPrisgap({ tierLines: [] }), null);
  });
});

// ── RK-02 · Lögnen överlever inte produktionsvägen ────────────────────────────────────────────
describe('RK-02 · AI-prosan som motsäger talen når aldrig kunden', () => {
  test('Atea-kortet: 410 kr mot listpris 416,77 → modellens text ersätts', async () => {
    const { svar } = await kor(rader(410));
    assert.notEqual(svar.reasoning, AI_LOGNEN,
      'modellens egen text står kvar — då är låset lika mörkt som det var 4 september');
    assert.doesNotMatch(svar.reasoning, /bind om|byt till|teckna om/i,
      'en kund under listpris får aldrig uppmanas binda om på prisargument');
    assert.match(svar.reasoning, /under Microsofts eget listpris/,
      'den sanna riktningen ska stå i klartext');
    assert.match(svar.reasoning, new RegExp(String(E3_LISTA).replace('.', ',')),
      'jämförelsetalet ska stå i texten och komma ur prisboken');
  });

  // Regel 8:s syskon — samma text går till PDF (api/send-analysis.mjs) och mailet. Att den är
  // kodskriven här är därför enda stället felet kunde stoppas för alla tre ytorna på en gång.
  test('texten hävdar aldrig att priset är bra — frånvaron av bytesmål är inget kvitto', async () => {
    const { svar } = await kor(rader(410));
    assert.doesNotMatch(svar.reasoning, /konkurrenskraftigt pris|priset är bra|marknadsmässigt bra/i);
    assert.match(svar.reasoning, /väntat/,
      'att ligga under listpris är väntat — sägs det inte läses konstaterandet som beröm');
  });
});

// ── RK-03..05 · Premissen i prompten följer talen ─────────────────────────────────────────────
describe('RK-03 · prompten planterar ingen falsk premiss', () => {
  test('under listpris → prompten säger UNDER och förbjuder bytesrekommendation', async () => {
    const { prompt } = await kor(rader(410));
    assert.doesNotMatch(prompt, /kunden överprisas/,
      'premissen «kunden överprisas» renderades för VARJE LFL-faktura — det var den som skrev lögnen');
    assert.doesNotMatch(prompt, /Varför betalar kunden markant mer/,
      'en ledande fråga om en överdebitering som inte finns besvaras med en gissning');
    assert.match(prompt, /KUNDEN LIGGER UNDER/);
  });

  // MOTPROVET. En rättning som bara tystar allt är lika värdelös som ingen rättning: den sanna
  // grenen MÅSTE fortfarande gå fram. (Bibeln 20 aug: «en spärr som fäller allt är lika värdelös
  // som ingen spärr».)
  test('över listpris → premissen står kvar, oförändrad', async () => {
    const { prompt } = await kor(rader(600));
    assert.match(prompt, /kunden överprisas/);
    assert.match(prompt, /Varför betalar kunden markant mer/);
    assert.doesNotMatch(prompt, /KUNDEN LIGGER UNDER/);
  });

  // RK-05 · PREMISSEN BAKOM NULL-GRENEN, mätt i stället för antagen.
  //
  // Första versionen av det här testet försökte bygga en LFL UTAN à-pris och underkände sig själv:
  // «fixturen bär à-pris — då prövar testet inte det den påstår». Den som skrev testet (jag) antog
  // en lucka som inte finns. Produktionens enda byggare av likeForLikeTarget är
  // computeLikeForLikeSaasTarget (api/test-invoice.mjs:1427), och den returnerar null redan när en
  // tier-rad saknar `quantity` — alltså kan varje tierLine den producerar räknas om till ett
  // à-pris. Testet låser därför den EGENSKAPEN, inte ett tillstånd som inte går att nå.
  test('RK-05 · produktionens LFL-byggare ger alltid en läsbar riktning (null-grenen är ett skyddsnät)', () => {
    const utanApris = [{ type: 'recurring_subscription', description: 'Microsoft 365 E3', quantity: 25, amount: 10_250 }];
    const lfl = computeLikeForLikeSaasTarget(utanApris, TIERS, 10_250 * 12);
    assert.ok(lfl?.tierLines?.length, 'raden matchar E3 och bär antal — LFL ska byggas');
    assert.notEqual(lflPrisgap(lfl), null,
      'à-priset härleds ur radbeloppet ÷ antal; blir det null har byggaren ändrats och '
      + 'kommentaren vid attribueringslåset (recommend.js) är inte längre sann');

    const utanAntal = [{ type: 'recurring_subscription', description: 'Microsoft 365 E3', amount: 10_250 }];
    assert.equal(computeLikeForLikeSaasTarget(utanAntal, TIERS, 10_250 * 12), null,
      'utan antal byggs ingen LFL alls — det är där vägen stängs, inte i lflPrisgap');
  });
});

// ── RK-06 · Switch-vägen är oförändrad ───────────────────────────────────────────────────────
// Rättningen tog bort `&& result.shouldSwitch` från låsets villkor. Om det gjorde att den RÄKNADE
// besparingstexten slutade skrivas har jag bytt ett fel mot ett annat.
describe('RK-06 · den räknade besparingstexten står kvar', () => {
  test('kund med påslag → deterministisk gap-text, inte AI:ns', async () => {
    const { svar } = await kor(rader(900), { aiText: 'AI-text.', aiSwitch: true });
    assert.equal(svar.shouldSwitch, true, 'påslag över listpris ska utlösa bytet');
    assert.notEqual(svar.reasoning, 'AI-text.');
    assert.match(svar.reasoning, /Microsofts publika årsavtalspris/);
    assert.match(svar.reasoning, /utan att en enda funktion ändras/,
      'gap-grenens egen slutmening — saknas den är det inte-gap-texten som körts på fel gren');
  });
});

// ── RK-07 · Ingen gren rekommenderar ett byte den inte räknat fram ────────────────────────────
describe('RK-07 · inte-gap-texten föreslår aldrig ett byte', () => {
  for (const [namn, billed] of [['under', 410], ['lika', E3_LISTA], ['över', 450]]) {
    test(`riktning ${namn} → ingen bytesuppmaning`, () => {
      const lfl = { dominantTierKey: 'e3', tierLines: [
        { key: 'e3', quantity: 25, benchmarkMonthly: E3_LISTA, billedUnitMonthly: billed, tierAnnual: Math.round(E3_LISTA * 25 * 12) },
      ], addonLines: [] };
      const text = buildLikeForLikeReasoning({
        supplier: 'Atea Sverige AB', lfl, annualCost: 123_000,
        suggestedAnnualCost: 125_031, savingPerYear: 0, billingCycleType: 'monthly',
      });
      assert.ok(text, 'kompletta fakta ska alltid ge en kodskriven text');
      assert.doesNotMatch(text, /bind om|byt till|byt leverantör|teckna om/i);
    });
  }
});

// ── RK-08 · En gren som inte VET varför vi stannade får inte påstå ett skäl ───────────────────
// Reservkortsfelet (BK-06/BK-07, 15 aug), som jag begick i den här rättningens FÖRSTA version:
// «Skillnaden är 9 969 kr per år — under den gräns där ett leverantörsbyte är operationellt
// motiverat.» Gränsen är 500 kr. Funktionen känner den inte, och grenen är nåbar av flera skäl.
describe('RK-08 · ingen påhittad motivering i över-grenen', () => {
  test('över listpris utan räknad besparing → säger ATT vi stannade, aldrig varför', () => {
    const lfl = { dominantTierKey: 'e3', tierLines: [
      { key: 'e3', quantity: 25, benchmarkMonthly: E3_LISTA, billedUnitMonthly: 450, tierAnnual: Math.round(E3_LISTA * 25 * 12) },
    ], addonLines: [] };
    const text = buildLikeForLikeReasoning({
      supplier: 'Atea Sverige AB', lfl, annualCost: 135_000,
      suggestedAnnualCost: 125_031, savingPerYear: 0, billingCycleType: 'monthly',
    });
    assert.doesNotMatch(text, /under den gräns|operationellt motiverat|för lit(en|et)/i,
      'ett skäl funktionen inte kan mäta får inte skrivas ut som om den mätt det');
    assert.match(text, /över\s+Microsofts eget listpris/,
      'att ligga över leverantörens eget listpris är rummets vassaste besked och ska sägas rakt ut');
  });
});

// ── RK-09..11 · BLANDADE LICENSNIVÅER (2026-09-06, Fables granskning) ────────────────────────
// Varje fixtur i RK-01..08 bar EN nivå. Med två nivåer föll fixen isär: `lflPrisgap` mätte
// riktningen på AGGREGATET medan prosan citerar den DOMINANTA nivåns tal. Kört av Fable:
// 5 E3 à 500 kr (över 416,77) + 40 Basic à 55 kr (under 66,91) gav meningen
//     «Ni betalar 500 kr … listpris 416,77 kr. Ni ligger alltså UNDER Microsofts listpris.»
// 500 > 416,77 i samma mening som säger under — Atea-motsägelsen återinförd av fixen för den.
describe('RK · Riktningen mäts på den nivå prosan citerar', () => {
  const BLANDAD = { dominantTierKey: 'e3', tierLines: [
    { key: 'e3',             quantity:  5, benchmarkMonthly: E3_LISTA, billedUnitMonthly: 500 },
    { key: 'business-basic', quantity: 40, benchmarkMonthly: 66.91,    billedUnitMonthly:  55 },
  ], addonLines: [] };

  test('RK-09 · dominantRiktning följer den citerade nivån, inte summan', () => {
    const g = lflPrisgap(BLANDAD);
    assert.equal(g.riktning, 'under', 'aggregatet ÄR under — det är sant och styr promptens premiss');
    assert.equal(g.dominantRiktning, 'over',
      '500 > 416,77 på den nivå prosan citerar; att beskriva den med summan är motsägelsen');
    assert.equal(g.blandad, true, 'nivåerna pekar åt olika håll — det är ett fynd, inte brus');
  });

  test('RK-10 · prosan motsäger aldrig sina egna tal', () => {
    const t = buildLikeForLikeReasoning({ supplier: 'X', lfl: BLANDAD, annualCost: 1,
      suggestedAnnualCost: 1, savingPerYear: 0, billingCycleType: 'monthly' });
    assert.match(t, /500 kr per användare/);
    assert.match(t, /över\s+Microsofts eget listpris/,
      'den citerade nivån ligger ÖVER — meningen måste säga det');
    assert.doesNotMatch(t, /ligger alltså under Microsofts eget listpris/,
      'exakt den mening Fable körde fram: «500 kr … 416,77 kr … alltså under»');
    assert.match(t, /övriga licensnivåer ligger åt andra hållet/,
      'blandningen namnges — att jämna ut den till ett medeltal gömmer fyndet');
  });

  test('RK-11 · årsgapet är den citerade nivåns eget, aldrig aggregatets', () => {
    const g = lflPrisgap(BLANDAD);
    assert.equal(g.dominantGapArs, Math.round((500 - E3_LISTA) * 5 * 12),
      '(500 − 416,77) × 5 licenser × 12 mån = den dominanta nivåns eget gap');
    assert.notEqual(g.dominantGapArs, g.gapAnnual,
      'aggregatet och nivån skiljer sig här — samma fel, andra fältet');
    const t = buildLikeForLikeReasoning({ supplier: 'X', lfl: BLANDAD, annualCost: 1,
      suggestedAnnualCost: 1, savingPerYear: 0, billingCycleType: 'monthly' });
    assert.match(t, new RegExp(String(Math.abs(g.dominantGapArs)).replace(/\B(?=(\d{3})+(?!\d))/g, '\\s')));
  });

  // Motprovet: en-nivå-fallet får inte ändras av rättningen (RK-01..08 äger det, men en
  // regression där hade varit osynlig eftersom aggregat och nivå sammanfaller).
  test('RK-12 · med EN nivå är aggregat och nivå samma, och inget blandat-tillägg skrivs', () => {
    const en = { dominantTierKey: 'e3', tierLines: [
      { key: 'e3', quantity: 25, benchmarkMonthly: E3_LISTA, billedUnitMonthly: 410 }], addonLines: [] };
    const g = lflPrisgap(en);
    assert.equal(g.riktning, g.dominantRiktning);
    assert.equal(g.blandad, false);
    const t = buildLikeForLikeReasoning({ supplier: 'Atea Sverige AB', lfl: en, annualCost: 123_000,
      suggestedAnnualCost: 125_031, savingPerYear: 0, billingCycleType: 'monthly' });
    assert.doesNotMatch(t, /åt andra hållet/, 'ingen blandning finns — då nämns ingen');
  });
});

// ── RK-13..15 · ETT ABSOLUT PÅSTÅENDE BREDVID EN NIVÅ SOM MOTSÄGER DET (2026-09-06) ──────────
// Fables ANDRA granskning, av fixen för hans första. Båda fynden är samma fel i var sin gren:
// en sats om HELHETEN placerad bredvid en nivå som säger emot den. Att lägga till en nyansering
// («era övriga nivåer ligger åt andra hållet») upphäver inte ett absolut påstående — den ställer
// det bara bredvid sin egen motsägelse.
describe('RK · Absoluta påståenden skopas till den nivå som citeras', () => {
  // Dominant UNDER golvet, en mindre nivå ÖVER → ingen räknad besparing.
  const A = { dominantTierKey: 'e3', tierLines: [
    { key: 'e3',             quantity: 40, benchmarkMonthly: E3_LISTA, billedUnitMonthly: 400 },
    { key: 'business-basic', quantity:  5, benchmarkMonthly: 66.91,    billedUnitMonthly: 100 },
  ], addonLines: [] };

  // Dominant UNDER golvet, MEN hela gapet bärs av en annan nivå → besparing > 0, switch-grenen.
  const B = { dominantTierKey: 'e3', tierLines: [
    { key: 'e3',             quantity:  5, benchmarkMonthly: E3_LISTA, billedUnitMonthly: 400, tierAnnual: 1 },
    { key: 'business-basic', quantity: 40, benchmarkMonthly: 66.91,    billedUnitMonthly: 100, tierAnnual: 1 },
  ], addonLines: [] };

  const text = (lfl, saving) => buildLikeForLikeReasoning({
    supplier: 'X', lfl, annualCost: 60_000, suggestedAnnualCost: 40_000,
    savingPerYear: saving, billingCycleType: 'monthly',
  });

  test('RK-13 · under-grenen påstår inte att INGET lägre pris finns när ett gör det', () => {
    const t = text(A, 0);
    assert.doesNotMatch(t, /inte hittar något publikt pris som är lägre än ert,/,
      'den absoluta satsen stod bredvid «era övriga nivåer ligger åt andra hållet» — alltså '
      + '«det finns inget lägre pris» och «det finns ett lägre pris» i samma stycke');
    assert.match(t, /lägre än ert för era E3-licenser/,
      'satsen ska skopas till den nivå prosan citerar');
    assert.match(t, /åt andra hållet/, 'blandningen ska fortfarande namnges');
  });

  test('RK-14 · switch-grenen påstår inte «helt» när en nivå ligger under golvet', () => {
    const t = text(B, 20_000);
    assert.doesNotMatch(t, /Skillnaden ligger helt i fakturerat à-pris/,
      'ledande nivå är 400 kr mot golvet 416,77 — «helt» är osant när hela gapet bärs av en annan');
    assert.match(t, /Gapet bärs av era Business Basic-licenser/,
      'den nivå som BÄR gapet ska namnges');
  });

  // Motprovet: ledningen får INTE bytas. Att citera en annan nivå än den dominanta kan ställa
  // namnet (suggestedSupplier, RD-09) mot talet — precis det låset finns för att stoppa.
  test('RK-16 · «lika» är inte en motsatt riktning — grundarens Microsoft-kort', () => {
    // ── VAD KORTET SA (2026-09-08) ──────────────────────────────────────────────────────────
    // «Era övriga licensnivåer ligger åt andra hållet, så den samlade bilden är blandad.»
    // Den «övriga nivån» var Business Premium på 210,29 kr — EXAKT Microsofts listpris, på öret.
    // «Åt andra hållet» från «under» betyder ÖVER. Kunden låg varken över eller under; de låg
    // precis på. Meningen var alltså falsk om den enda nivå den beskrev.
    //
    // Orsaken är mitt eget fält från samma morgon: `blandad` räknades som
    // `new Set(tiers.map(riktningFor)).size > 1` — och 'lika' är ett av tre värden i den mängden.
    // Ett tillstånd som betyder «varken över eller under» behandlat som en RIKTNING.
    //
    // Två fält, två frågor, för de styr olika meningar:
    //   `blandad`      — finns en STRIKT MOTSATT riktning? (styr «åt andra hållet»)
    //   `heterogen`    — skiljer sig NÅGON nivå från den dominanta? (styr att det absoluta
    //                    påståendet skopas till den citerade nivån — att skopa är aldrig fel,
    //                    att inte skopa är fel så snart nivåerna skiljer sig alls)
    const PREMIUM_LISTA = TIERS['business-premium'].msrpAnnual;
    const BASIC_LISTA   = TIERS['business-basic'].msrpAnnual;
    const paListpris = { dominantTierKey: 'business-basic', addonLines: [], tierLines: [
      { key: 'business-basic',   quantity: 30, benchmarkMonthly: BASIC_LISTA,   billedUnitMonthly: 60 },
      { key: 'business-premium', quantity: 5,  benchmarkMonthly: PREMIUM_LISTA, billedUnitMonthly: PREMIUM_LISTA },
    ]};
    const g = lflPrisgap(paListpris);
    assert.equal(g.dominantRiktning, 'under', 'den citerade nivån ligger under sitt golv');
    assert.equal(g.blandad, false,
      'den andra nivån ligger EXAKT på listpris — det är inte «åt andra hållet»');
    assert.equal(g.heterogen, true,
      'nivåerna skiljer sig ändå åt, så det absoluta påståendet måste skopas');

    const t = buildLikeForLikeReasoning({ supplier: 'X', lfl: paListpris, annualCost: 1,
      suggestedAnnualCost: 1, savingPerYear: 0, billingCycleType: 'monthly' });
    assert.doesNotMatch(t, /åt andra hållet/,
      'meningen påstod en riktning som ingen nivå har — exakt vad grundarens kort gjorde');
    assert.match(t, /exakt på listpris/,
      'det sanna beskedet om den nivån ska stå kvar, inte bara tystas');
    // Och det absoluta påståendet får ändå inte gälla hela fakturan (RK-13:s regel, ny utlösare).
    // ⚠️ FÖRSTA VERSIONEN SÖKTE «inget publikt pris» — prosan säger «NÅGOT publikt pris».
    // Assertionen kunde alltså aldrig matcha, och sabotaget «skopa på blandad i stället för
    // heterogen» passerade grönt. Ett prov vars enda möjliga svar är «godkänt» är inget prov.
    // Nu prövas BÅDA halvorna: den skopade satsen ska finnas, den oskopade får inte.
    assert.match(t, /lägre än ert för era Business Basic-licenser\./,
      'satsen måste namnge nivån den gäller');
    assert.doesNotMatch(t, /lägre än ert, och därför inget byte som sänker kostnaden/,
      'den oskopade, fakturaomfattande satsen får inte stå när nivåerna skiljer sig');

    // ── MOTPROVET: en ÄKTA motsatt riktning ska fortfarande namnges ────────────────────────
    // En spärr som tystar «åt andra hållet» överallt vore lika fel som den som sa det överallt.
    const aktaMotsats = { dominantTierKey: 'business-basic', addonLines: [], tierLines: [
      { key: 'business-basic',   quantity: 30, benchmarkMonthly: BASIC_LISTA,   billedUnitMonthly: 60 },
      { key: 'business-premium', quantity: 5,  benchmarkMonthly: PREMIUM_LISTA, billedUnitMonthly: PREMIUM_LISTA + 50 },
    ]};
    const g2 = lflPrisgap(aktaMotsats);
    assert.equal(g2.blandad, true, 'en nivå under och en ÖVER är en verklig motsättning');
    assert.equal(g2.heterogen, true);
    assert.match(buildLikeForLikeReasoning({ supplier: 'X', lfl: aktaMotsats, annualCost: 1,
      suggestedAnnualCost: 1, savingPerYear: 0, billingCycleType: 'monthly' }),
      /åt andra hållet/, 'den verkliga blandningen ska fortfarande namnges');

    // Och enhetligt fall: inget tillägg alls.
    const enhetlig = { dominantTierKey: 'business-basic', addonLines: [], tierLines: [
      { key: 'business-basic',   quantity: 30, benchmarkMonthly: BASIC_LISTA,   billedUnitMonthly: 60 },
      { key: 'business-premium', quantity: 5,  benchmarkMonthly: PREMIUM_LISTA, billedUnitMonthly: PREMIUM_LISTA - 20 },
    ]};
    const g3 = lflPrisgap(enhetlig);
    assert.equal(g3.blandad, false);
    assert.equal(g3.heterogen, false, 'båda ligger under — inget att reservera');
  });

  test('RK-17 · granskningens fyra fynd: prosan uttalar sig om HELA fakturan', () => {
    // ── EN ANDRA BLICK PÅ MIN EGEN FIX (2026-09-08, Bevisplikten p.1) ───────────────────────
    // RK-16 rättade «lika är inte en riktning». En separat granskningssession körde grannfallen
    // och hittade fyra hål — alla samma rot: PROSAN UTTALAR SIG OM HELA FAKTURAN MEDAN `gap`
    // BARA BESKRIVER TIER-RADERNA, och «era övriga nivåer» är en ALLMÄN sats som räknades
    // EXISTENTIELLT. Var och en verifierad med egen körning innan den rättades.
    const P = TIERS['business-premium'].msrpAnnual;
    const BA = TIERS['business-basic'].msrpAnnual;
    const E3 = TIERS['e3'].msrpAnnual;
    const prosa = (lfl) => buildLikeForLikeReasoning({ supplier: 'X', lfl, annualCost: 1,
      suggestedAnnualCost: 1, savingPerYear: 0, billingCycleType: 'monthly' });

    // FYND 1 · 'lika'-grenens absoluta påstående var OSKOPAT. Jag skopade under-grenen och
    // lämnade den här — halva fixen, i samma commit där jag skrev att en halv fix är sjukdomen.
    // Mätt: Premium exakt på listpris + Basic 4 kr över = 480 kr/år FINNS att byta ned till,
    // medan meningen sa att inget fanns.
    const likaGren = { dominantTierKey: 'business-premium', addonLines: [], tierLines: [
      { key: 'business-premium', quantity: 20, benchmarkMonthly: P,  billedUnitMonthly: P },
      { key: 'business-basic',   quantity: 10, benchmarkMonthly: BA, billedUnitMonthly: BA + 4 },
    ]};
    assert.equal(lflPrisgap(likaGren).heterogen, true);
    assert.doesNotMatch(prosa(likaGren), /Det finns inget publikt pris att byta ned till/,
      'satsen gäller HELA fakturan men en annan nivå ligger över sitt golv');
    assert.match(prosa(likaGren), /För era Business Premium-licenser finns inget publikt pris/,
      'skopad till den nivå meningen faktiskt citerar');

    // FYND 2 + 3 · «Era ÖVRIGA licensnivåer …» är en ALLMÄN sats. Den räknades med `some`.
    // Vid tre nivåer blev båda varianterna falska — och «åt andra hållet» om en nivå som ligger
    // EXAKT på listpris är grundarens ursprungliga fel, återinfört av fixen för det.
    const treNivaer = { dominantTierKey: 'e3', addonLines: [], tierLines: [
      { key: 'e3',               quantity: 10, benchmarkMonthly: E3, billedUnitMonthly: E3 - 30 },
      { key: 'business-premium', quantity: 5,  benchmarkMonthly: P,  billedUnitMonthly: P + 40 },
      { key: 'business-basic',   quantity: 5,  benchmarkMonthly: BA, billedUnitMonthly: BA },
    ]};
    assert.equal(lflPrisgap(treNivaer).ovrigaLage, 'olika',
      'en över och en exakt på listpris är varken «alla motsatta» eller «alla lika»');
    const t3 = prosa(treNivaer);
    assert.doesNotMatch(t3, /åt andra hållet/,
      'Basic ligger EXAKT på listpris — «åt andra hållet» är falskt om den');
    assert.doesNotMatch(t3, /övriga licensnivåer ligger exakt på listpris/,
      'Premium ligger ÖVER — «alla exakt på listpris» är lika falskt');
    assert.match(t3, /ligger olika i förhållande till listpris/,
      'det uttömmande, sanna beskedet');

    // Och de rena fallen ska fortfarande ge sitt EGNA besked — tystnad är inte fixen.
    const allaMotsatt = { dominantTierKey: 'e3', addonLines: [], tierLines: [
      { key: 'e3',               quantity: 10, benchmarkMonthly: E3, billedUnitMonthly: E3 - 30 },
      { key: 'business-premium', quantity: 5,  benchmarkMonthly: P,  billedUnitMonthly: P + 40 },
    ]};
    assert.equal(lflPrisgap(allaMotsatt).ovrigaLage, 'alla-motsatt');
    assert.match(prosa(allaMotsatt), /åt andra hållet/);
    const allaLika = { dominantTierKey: 'e3', addonLines: [], tierLines: [
      { key: 'e3',               quantity: 10, benchmarkMonthly: E3, billedUnitMonthly: E3 - 30 },
      { key: 'business-premium', quantity: 5,  benchmarkMonthly: P,  billedUnitMonthly: P },
    ]};
    assert.equal(lflPrisgap(allaLika).ovrigaLage, 'alla-lika');
    assert.match(prosa(allaLika), /övriga licensnivåer ligger exakt på listpris/);
    const allaSamma = { dominantTierKey: 'business-basic', addonLines: [], tierLines: [
      { key: 'business-basic',   quantity: 30, benchmarkMonthly: BA, billedUnitMonthly: BA - 6 },
      { key: 'business-premium', quantity: 5,  benchmarkMonthly: P,  billedUnitMonthly: P - 20 },
    ]};
    assert.equal(lflPrisgap(allaSamma).ovrigaLage, 'alla-samma');
    assert.doesNotMatch(prosa(allaSamma), /övriga licensnivåer/,
      'inget att reservera när alla pekar åt samma håll — då skrivs inget tillägg');

    // FYND 4 · GRUNDARENS EGEN FAKTURA. En DISKVALIFICERAD rad passerar LFL:ens else-gren och
    // blir en add-on till fakturapris. Den försvann därmed ur varje fält — och på hans faktura
    // var det 54 720 kr/år, 68 % av pengarna, medan prosan påstod ABSOLUT att inget fanns att
    // byta ned till. `lasLicensniva` stängde exakt den luckan samma dag («en diskvalificerad rad
    // gör fakturan blandad — den försvinner inte»); computeLikeForLikeSaasTarget hade den öppen.
    const grundaren = computeLikeForLikeSaasTarget([
      { description: 'Microsoft 365 Business Premium', quantity: 10, unitPrice: P, amount: P * 10, type: 'recurring_subscription' },
      { description: 'Office 365 E3', quantity: 12, unitPrice: 380, amount: 4560, type: 'recurring_subscription' },
    ], TIERS, (P * 10 + 4560) * 12);
    const g4 = lflPrisgap(grundaren);
    assert.deepEqual(g4.oprissattaLicensrader, ['Office 365 E3'],
      'raden är osynlig i talen — då måste den åtminstone vara synlig som oprissatt');
    const t4 = prosa(grundaren);
    assert.doesNotMatch(t4, /Det finns inget publikt pris att byta ned till/,
      'ett absolut besked om en faktura där 68 % av pengarna inte gick att prissätta');
    assert.match(t4, /Office 365 E3 prissätter vi inte/,
      'det vi INTE kunde belägga sägs, med skälet — det är premiumsignalen, inte en brasklapp');
    assert.match(t4, /inget verifierat publikt svenskt listpris/, 'och skälet är det sanna');

    // MOTPROVET: en vanlig add-on (backup, support) är INTE en annan licensprodukt och får
    // aldrig utlösa reservationen. En spärr som fäller allt är lika värdelös som ingen spärr.
    const medBackup = computeLikeForLikeSaasTarget([
      { description: 'Microsoft 365 Business Premium', quantity: 10, unitPrice: P, amount: P * 10, type: 'recurring_subscription' },
      { description: 'Molnbackup 1 TB', quantity: 1, unitPrice: 400, amount: 400, type: 'recurring_subscription' },
    ], TIERS, (P * 10 + 400) * 12);
    assert.deepEqual(lflPrisgap(medBackup).oprissattaLicensrader, [],
      'en backup-rad är ingen licensprodukt vi borde ha prissatt');
    assert.doesNotMatch(prosa(medBackup), /prissätter vi inte/);
  });

  test('RK-15 · den citerade nivån är fortfarande den dominanta', () => {
    assert.match(text(B, 20_000), /^Ni betalar 400 kr per användare och månad för era 5 E3-licenser/,
      'texten leder med dominantTierKey; bara PÅSTÅENDET om helheten justeras');
    // Och en-nivå-fallet är oförändrat: `helt` är sant när alla nivåer ligger över.
    const en = { dominantTierKey: 'e3', tierLines: [
      { key: 'e3', quantity: 25, benchmarkMonthly: E3_LISTA, billedUnitMonthly: 500, tierAnnual: 1 }], addonLines: [] };
    assert.match(text(en, 20_000), /Skillnaden ligger helt i fakturerat à-pris/,
      'med alla nivåer över golvet ÄR skillnaden helt i à-priset — vakten får inte förbjuda ordet');
  });

  test('RK-18 · en kund på EXAKT listpris får aldrig en riktning ur avrundningen', () => {
    // ══ ÖRESFIXEN (2026-09-09) ═══════════════════════════════════════════════════════════════
    // `amountOre`/`unitPriceOre` infördes 12 augusti som observationer och lästes av NOLL
    // konsumenter i recommend.js. Run-raten byggdes på kronorfältet, som avrundar varje rad till
    // ±0,50 kr — delat på antalet licenser blir det ±0,50/qty per licens och månad, alltså
    // femtio gånger den fasta toleransen 0,01 vid en enda licens.
    //
    // MÄTT genom computeLikeForLikeSaasTarget, kund som betalar EXAKT Business Premiums
    // verifierade listpris (210,29 kr/mån), dominantRiktning per licensmängd FÖRE fixen:
    //     1 → under (−3 kr/år) · 2 → over (+5) · 3 → over · 5 → under (−5) · 8 → under
    //     10 → over · 12 → under · 20 → over · 25 → lika · 40 → over · 45 → lika · 57 → over
    // Tio av tolv gav en FALSK riktning, och riktningen kastade godtyckligt med antalet. Talet
    // styr prosan OCH «era övriga licensnivåer ligger åt andra hållet» — brus som omdöme, på en
    // kund som betalar precis rätt pris.
    const P = TIERS['business-premium'].msrpAnnual;
    for (const qty of [1, 2, 3, 5, 8, 10, 12, 20, 25, 40, 45, 57]) {
      const exakt = P * qty;
      const amount = Math.round(exakt);          // det kronorfältet kan bära
      const lfl = computeLikeForLikeSaasTarget([{
        description: 'Microsoft 365 Business Premium', type: 'recurring_subscription',
        quantity: qty, amount, unitPrice: Math.round(P),
        amountOre: Math.round(exakt * 100),
      }], TIERS, amount * 12);
      const g = lflPrisgap(lfl);
      assert.equal(g.dominantRiktning, 'lika',
        `${qty} licenser à exakt ${P} kr gav «${g.dominantRiktning}» — en riktning ur `
        + 'kronorfältets avrundning, inte ur kundens pris');
      assert.equal(g.dominantGapArs, 0, 'och gapet måste vara noll, inte en avrundning');
      assert.equal(lfl.tierLines[0].tolerans, 0.01,
        'med öret avläst ÄR toleransen den 0,01 kommentaren alltid påstod');
    }
  });

  test('RK-19 · MOTPROVET: den härledda toleransen slutar aldrig larma', () => {
    // En tolerans som växer tills grinden slutat titta är samma sjukdom som den lagar — det var
    // precis så min första balanskravsfix blev blind vid höga kvantiteter (24 aug). Utan öre är
    // toleransen 0,50/qty + 0,01, och den måste absorbera avrundningen UTAN att svälja ett gap.
    const P = TIERS['business-premium'].msrpAnnual;
    const bygg = (qty, krPerEnhet, medOre) => {
      const kr = krPerEnhet * qty;
      const rad = { description: 'Microsoft 365 Business Premium', type: 'recurring_subscription',
        quantity: qty, amount: Math.round(kr), unitPrice: Math.round(krPerEnhet) };
      // Fixturen SKRIVER fältet i den aggregerade formen — det är formen produktionen matar
      // recommend.js med. RO-08 vaktar mot att LÄSA det utanför radensOre; att bygga indatan
      // är ingen läsväg som kan glida isär.
      if (medOre) rad.amountOre = Math.round(kr * 100);   // ore-ok: fixturen skriver, läser inte
      return lflPrisgap(computeLikeForLikeSaasTarget([rad], TIERS, Math.round(kr) * 12));
    };
    // Utan öre: exakt listpris tystas (rätt), men verkliga gap åt BÅDA håll står kvar.
    assert.equal(bygg(1, P, false).dominantRiktning, 'lika', 'avrundningen ska absorberas');
    assert.equal(bygg(1, 250, false).dominantRiktning, 'over', '+39,71 kr är ett verkligt gap');
    assert.equal(bygg(5, 200, false).dominantRiktning, 'under', '−10,29 kr likaså');
    // Och ett LITET äkta gap överlever — även utan öre, även vid en enda licens.
    assert.equal(bygg(1, P + 1, false).dominantRiktning, 'over',
      'en krona över listpris är dubbelt toleransen vid qty 1 och måste synas');
    // Med öre är grinden VASSARE, inte trubbigare: 20 öre fångas där kronorfältet inte kan se det.
    assert.equal(bygg(10, P + 0.2, true).dominantRiktning, 'over');
    assert.equal(bygg(10, P + 0.2, true).dominantGapArs, 24);
  });

  test('RK-20 · ett tal får aldrig motsäga sin egen dom', () => {
    // Öresmätningen avslöjade en sista lögn: `riktning: 'lika'` bredvid `dominantGapArs: -3`.
    // Domen sa «samma pris», talet sa «tre kronor billigare». OB-19:s form ordagrant
    // (`recommendationType: 'switch'` bredvid `grossSaving: 0`) — och en yta som läser det ena
    // bredvid en yta som läser det andra producerar precis grundarens kortmotsägelse.
    const P = TIERS['business-premium'].msrpAnnual;
    // Utan öre vid qty 1: billedUnitMonthly blir 210, golvet 210,29 → domen «lika», och DÅ måste
    // varje tal i svaret vara noll. Det är fallet som bar lögnen.
    const g = lflPrisgap(computeLikeForLikeSaasTarget([{
      description: 'Microsoft 365 Business Premium', type: 'recurring_subscription',
      quantity: 1, amount: Math.round(P), unitPrice: Math.round(P),
    }], TIERS, Math.round(P) * 12));
    assert.equal(g.riktning, 'lika');
    assert.equal(g.gapAnnual, 0, 'aggregatets gap får inte motsäga aggregatets riktning');
    assert.equal(g.dominantGapArs, 0, 'och nivåns gap inte nivåns riktning');
    // MOTPROVET: när domen INTE är «lika» ska talet vara det verkliga, aldrig nollat.
    const h = lflPrisgap(computeLikeForLikeSaasTarget([{
      description: 'Microsoft 365 Business Premium', type: 'recurring_subscription',
      quantity: 10, amount: 2500, unitPrice: 250,
    }], TIERS, 2500 * 12));
    assert.equal(h.riktning, 'over');
    assert.ok(h.gapAnnual > 4000, `ett verkligt gap ska stå kvar orört, fick ${h.gapAnnual}`);
  });
});
