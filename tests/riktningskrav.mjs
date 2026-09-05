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
