// tests/kundmeningar.mjs — KUNDMENINGSREGISTRET (KM). Bakgrund i lib/kundmeningar.js.
//
// FÅNGAR: kohortpåståenden och beröm i modelltext som når kunden; bytessteg med löften utan
//   mekanism; ett löfte vars mekanism inte finns; en löftesform utan mekanism i kundytornas kod;
//   en prompt som får kohortens tal eller «verifierat» på en kohort; spegeln frontend/backend som
//   glider isär; mejl som renderar webbläsarens ofiltrerade modelltext; månadsbriefens påhittade
//   faktorer och förhandlingsknappar.
// BLIND: filtret läser form, inte innebörd (modulhuvudet). Skanningen ser bara de formuleringar som
//   står i LOFTEN_UTAN_MEKANISM.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { kundensMotivering, kundensSteg, LOFTEN, LOFTEN_UTAN_MEKANISM, ANSVARSGRANS, UNDERLAGET } from '../lib/kundmeningar.js';
import { LOFTEN_TEXT, ANSVARSGRANS_TEXT, UNDERLAGET_TEXT } from '../src/lib/loften.js';

const ROT = new URL('..', import.meta.url).pathname;
const las = (p) => readFileSync(join(ROT, p), 'utf8');
const TELE2 = 'Ert Tele2-avtal ligger redan bättre än vad jämförbara bolag i er bransch betalar. Fakturan omfattar 23 abonnemang.';

/** Blankar kommentarer (även /* … *\/ över flera rader och JSX-kommentarer) men behåller radnumren. */
const utanKommentarer = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
  .split('\n').map((l) => (/^\s*\/\//.test(l) ? '' : l)).join('\n');

describe('KM · kundmeningsregistret', () => {
  test('KM-01 · ett kohortpåstående stryks — resten av texten står kvar', () => {
    const r = kundensMotivering(TELE2);
    assert.equal(r.text, 'Fakturan omfattar 23 abonnemang.');
    assert.equal(r.strukna.length, 1);
    assert.equal(kundensMotivering('Ni betalar mer än jämförbara bolag.').text, null, 'stryks allt är svaret null — aldrig en tom lögn');
    assert.deepEqual(kundensMotivering(null), { text: null, strukna: [] });
  });

  test('KM-02 · beröm stryks om läget inte bär det — ett nekande är inget beröm (motprov)', () => {
    assert.equal(kundensMotivering('Priset är konkurrenskraftigt.').text, null);
    assert.equal(kundensMotivering('Priset är konkurrenskraftigt.', { tillatBerom: true }).text, 'Priset är konkurrenskraftigt.');
    assert.equal(kundensMotivering('Priset är inte konkurrenskraftigt.').text, 'Priset är inte konkurrenskraftigt.',
      'ett nekande fälldes — filtret förbjuder ordet i stället för påståendet');
  });

  test('KM-03 · bytessteg och motiveringar med löften utan mekanism stryks (motprov: det förberedda bytet står kvar)', () => {
    // Andra blicken 2026-09-24: första versionen lät «Du signerar med BankID» stå — och testet KRÄVDE det.
    const falska = ['Vi förhandlar Microsoft årsavtal för Business Standard', 'Offerter från Arvo-verifierad partner',
      'Du signerar med BankID', 'Vi säger upp ert nuvarande avtal', 'Arvo genomför bytet åt er',
      'Arvo tecknar det nya avtalet i ert namn', 'Vi ordnar hela bytet', 'Vi beställer porting av numren'];
    const sanna = ['Vi förbereder uppsägningen av Vattenfall och nyteckningen hos Tibber',
      'Ni signerar själva — inget sägs upp eller tecknas innan dess'];
    const r = kundensSteg([...falska, ...sanna, 42, '']);
    assert.deepEqual(r.steg, sanna);
    assert.equal(r.strukna.length, falska.length);
    const m = kundensMotivering('Fakturan omfattar 8 abonnemang. Arvo genomför bytet av bredbandet till ett lägre pris.');
    assert.equal(m.text, 'Fakturan omfattar 8 abonnemang.', 'ett löfte i motiveringen nådde kunden');
    assert.equal(kundensMotivering('Vi kan förbereda även bredbandsbytet.').text, 'Vi kan förbereda även bredbandsbytet.', 'motprov');
  });

  test('KM-13 · bytesbekräftelsen är strikt förberedande: varje ansvarsmening ur registret, ingen exekutiv form (motprov: registret kan fälla)', async () => {
    process.env.RESEND_API_KEY ??= 're_test_ingen_riktig_nyckel';
    const { buildHtml } = await import('../api/send-confirmation.mjs');
    const r = (typ) => ({ extracted: { supplier: 'Telia', annualCost: 48000 }, categorized: { category: 'mobil' },
      recommendation: { recommendationType: typ, grossSaving: 12000, optimizationSaving: 6000 } });
    for (const typ of ['switch', 'optimize']) {
      const text = buildHtml(r(typ)).replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
      for (const [k, mening] of Object.entries(ANSVARSGRANS)) assert.ok(text.includes(mening), `${typ}: ansvarsgränsen «${k}» saknas i mejlet`);
      assert.ok(text.includes(typ === 'optimize' ? UNDERLAGET.mottagenAvveckling : UNDERLAGET.mottagen), `${typ}: rubriken kommer inte ur registret`);
      const fel = LOFTEN_UTAN_MEKANISM.filter(({ monster }) => monster.test(text.replace(new RegExp(Object.values(ANSVARSGRANS).map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g'), ' ')));
      assert.deepEqual(fel.map((f) => f.skal), [], `${typ}: en exekutiv form står i mejlet`);
    }
    // Motprov: formerna fäller den gamla texten — annars är testet grönt för att mönstren inte kan se något.
    const gammal = 'Vi har tagit emot er bytesbegäran. 24 timmars ångerrätt: Vi påbörjar ingen uppsägning eller nytt avtal förrän ångerfristen löpt ut.';
    assert.ok(LOFTEN_UTAN_MEKANISM.filter(({ monster }) => monster.test(gammal)).length >= 3, 'mönstren fäller inte den gamla mejltexten');
    // Modalens finstil sa samma sak utan ordet «ångerrätt» — fångad av rendering, inte av skanningen.
    assert.ok(LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test('Inget sägs upp eller tecknas innan ni signerat. Ni kan ångra begäran inom 24 timmar.')));
    assert.ok(!LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(ANSVARSGRANS.inteAvtal)), 'motprov: ansvarsgränsens egen mening om att ångra får stå');
  });

  test('KM-14 · meningsbanken: varje exekutiv mening som togs bort 2026-09-24 fälls av registret (motprov: ansvarsgränsen fälls inte)', () => {
    // Ytorna är rättade, så inget annat test bär formerna. Banken är minnet av vad som stod där.
    const borttagna = [
      'Vi har tagit emot er bytesbegäran.', 'Vi påbörjar ingen uppsägning eller nytt avtal förrän ångerfristen löpt ut.',
      '24 timmars ångerrätt', 'Ni kan ångra begäran inom 24 timmar.', 'Inget sägs upp eller tecknas innan ni signerat.',
      'Be Arvo förbereda bytet', 'Arvo förbereder hela bytet.', 'Ni aktiverar bytet', 'Ett klick — Arvo tar det därifrån.',
      'Fullmakt och bytesplan i er inkorg inom 24 timmar', 'Ni betalar 20 % av den identifierade besparingen',
      'Din identifierade nettobesparing', 'Varje byte kräver er BankID-signatur.', 'En signatur med BankID.',
      'ni godkänner med BankID', 'Bytet förberett i sin helhet', 'Arvo hanterar hela bytet', 'Arvo Flow agerar som ditt företags ombud',
      'Arvo identifierar läckan och genomför bytet åt er',
      // Inkorgslöftena (2026-09-24): ingen kod läser inkorgen efter kopplingen.
      'Arvo söker igenom er inkorg — ni behöver inte lyfta ett finger.', 'Arvo bevakar nu er inkorg.',
      'Arvo söker er inkorg efter leverantörsfakturor och skickar er första fullständiga briefing inom en timme.',
      'Arvo söker igenom era leverantörsfakturor och kontaktar er när något hänt.',
    ];
    const missade = borttagna.filter((m) => !LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(m)));
    assert.deepEqual(missade, [], 'en borttagen exekutiv mening kan komma tillbaka osedd');
    for (const [k, m] of Object.entries(ANSVARSGRANS)) {
      if (k === 'inteOmbud') continue;   // «Arvo säger inte upp» — nekandet fälls medvetet av säger-upp-formen; spegeln är undantagen som register (KM-05)
      assert.ok(!LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(m)), `ansvarsgränsens «${k}» fälls av registret`);
    }
    for (const t of Object.values(UNDERLAGET)) assert.ok(!LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(t)), `flödets ord fälls: ${t}`);
  });

  test('KM-15 · inkorgskopplingens mejl: en sidstorlek är inget antal, en ämnesträff är ingen faktura (motprov: under taket står talet)', () => {
    for (const p of ['api/auth/gmail-callback.mjs', 'api/auth/outlook-callback.mjs']) {
      const k = las(p);
      assert.match(k, /\$\{invoiceCount >= 20 \? 'minst 20' : invoiceCount\} mejl som ser ut som fakturor/, `${p}: räkningen redovisas inte som vad den är`);
      assert.doesNotMatch(k, /leverantörsfakturor<\/strong>/, `${p}: ämnesträffar kallas åter leverantörsfakturor`);
      assert.match(k, /Er inkorg är kopplad\./);
    }
    // Taket är det sökningen faktiskt använder — 20 i båda.
    assert.match(las('api/auth/gmail-callback.mjs'), /newer_than:180d',\s*20\s*\)/);
    assert.match(las('api/auth/outlook-callback.mjs'), /outlookSearch\(accessToken, 20\)/);
  });

  test('KM-12 · filtret: «företag»-kohorter och berömformer stryks; en överbetalningsmening står kvar', () => {
    for (const m of ['Jämförbara företag betalar väsentligt mindre.', 'Liknande företag i er storlek betalar mindre.',
      'Andra företag med 10 anställda betalar mindre.', 'Ni betalar mer än bolag av er storlek.',
      'Priset är fördelaktigt.', 'Abonnemanget är prisvärt.', 'Ni ligger i nivå med marknaden.', 'Ni ligger väl till.',
      'Ni betalar redan det lägsta publika priset.', 'Ert pris ligger under listpris.', 'Ni har bättre villkor än listpris.']) {
      assert.equal(kundensMotivering(m).text, null, `står kvar: ${m}`);
    }
    // Skälet att byta är inget beröm — första versionen strök det, och bytet förlorade sin motivering.
    for (const m of ['Leverantörens publika listpris ligger under det ni betalar.', 'Tele2 har ett abonnemang som ligger lägre i pris, 269 kr/mån.',
      'Tele2 Bas kostar 269 kr/mån enligt listpris, vilket är lägre än ert pris.', 'Abonnemanget är inte prisvärt.']) {
      assert.equal(kundensMotivering(m).text, m, `struken: ${m}`);
    }
  });

  test('KM-04 · varje löfte pekar på en mekanism som finns', () => {
    assert.ok(Object.keys(LOFTEN).length >= 4);
    for (const [namn, l] of Object.entries(LOFTEN)) {
      assert.ok(typeof l.text === 'string' && l.text.length > 20, `${namn}: texten saknas`);
      assert.ok(Array.isArray(l.mekanism) && l.mekanism.length > 0, `${namn}: ingen mekanism`);
      for (const f of l.mekanism) assert.ok(existsSync(join(ROT, f)), `${namn}: mekanismen ${f} finns inte`);
    }
  });

  test('KM-05 · ingen löftesform utan mekanism står i kundytornas kod', () => {
    const app = las('src/ArvoFlow.js');
    const routade = [...app.matchAll(/^import \w+ from '\.\/pages\/([\w-]+)';/gm)].map((m) => `src/pages/${m[1]}`);
    const filer = [];
    const ga = (d) => { for (const n of readdirSync(join(ROT, d))) { if (n === 'node_modules' || n.startsWith('.')) continue;
      const p = `${d}/${n}`; if (statSync(join(ROT, p)).isDirectory()) ga(p); else if (/\.m?js$/.test(n)) filer.push(p); } };
    for (const d of ['api', 'lib', 'agents', 'src/components', 'src/lib', 'src/utils', ...routade]) ga(d);
    filer.push('scripts/notify-price-changes.mjs');
    assert.ok(filer.length > 200, `skanningen hittade bara ${filer.length} filer`);
    const REGISTREN = new Set(['lib/kundmeningar.js', 'lib/kundytor.js', 'src/lib/loften.js']);   // de citerar formerna med flit; loften.js är registrets spegel (KM-07)
    // Switch-rälsen (mode:stub) bär fullmaktens text om BankID-signering — den FRAMTIDA mekanismen.
    // Undantaget gäller bara så länge ingen kundyta når den; det prövas här, inte antas.
    const RALSEN = 'agents/orchestrator/';
    const narRalsen = filer.filter((f) => !f.startsWith(RALSEN) && !f.startsWith('agents/')
      && /from ['"][./]*agents\/orchestrator/.test(las(f)));
    assert.deepEqual(narRalsen, [], 'en kundyta importerar Switch-rälsen — fullmaktens BankID-löfte når då kunden');
    // AVTALSTEXTEN är grundarens (och en jurists) att skriva om — den säger i dag det motsatta mot
    // ANSVARSGRANS (§2.1 fullmakt, §2.2 ångerfrist, ombudskap, §3.3, §4.2, §5.1). Undantaget gäller
    // EN fil och prövas här, så att det inte kan vidgas i tysthet. Konflikten står öppen i bibeln.
    const AVTALSTEXT = new Set(['src/pages/Villkor/index.js']);
    assert.deepEqual([...AVTALSTEXT], ['src/pages/Villkor/index.js'], 'avtalsundantaget har vidgats');
    assert.ok([...AVTALSTEXT].every((f) => filer.includes(f)), 'undantaget pekar på en fil skanningen inte ser');
    const traffar = [];
    for (const f of filer) {
      if (REGISTREN.has(f) || AVTALSTEXT.has(f) || f.startsWith(RALSEN)) continue;
      const rader = utanKommentarer(las(f)).split('\n'); const orig = las(f).split('\n');
      rader.forEach((l, i) => {
        if (/kundmening-ok:\s*\S.{7,}/.test(orig[i - 1] ?? '')) return;
        const hit = LOFTEN_UTAN_MEKANISM.find(({ monster }) => monster.test(l));
        if (hit) traffar.push(`${f}:${i + 1} (${hit.skal}) «${l.trim().slice(0, 70)}»`);
      });
    }
    assert.deepEqual(traffar, []);
  });

  test('KM-06 · prompten får aldrig kohortens tal — bara ett verifierat listpris jämförs (motprov)', async () => {
    const { formatPrompt } = await import('../agents/recommender/recommend.js');
    const bas = { customer: { industry: 'ovrigt', employees: 10 }, categorized: { category: 'mobil' }, elContext: null, convertedTierBm: null,
      invoice: { supplier: 'Tele2', amount: 30000, annualCost: 30000, seatCount: 8, billingPeriod: 'monthly' } };
    for (const source of ['live_analyses', 'real', 'estimated']) {
      const p = formatPrompt({ ...bas, benchmark: { median: 50000, p25: 35880, source, n: 83, note: 'per användare', unit: 'kr/år', isTotal: true, alternatives: [], industry: 'x', size: 'y' } });
      assert.doesNotMatch(p, /% UNDER|% ÖVER|35[\s ]?880|Verifierat lägre marknadspris/, `${source}: kohortens tal eller procent når prompten`);
      assert.match(p, /Ingen verifierad prisjämförelse/, `${source}: prompten säger inte att jämförelse saknas`);
    }
    const pub = formatPrompt({ ...bas, benchmark: { median: 3947, p25: 3588, source: 'real-public', n: 3, note: 'per användare', unit: 'kr/år', alternatives: [], industry: 'x', size: 'y' } });
    assert.match(pub, /% ÖVER verifierat listpris/, 'motprovet: ett verifierat listpris ska fortfarande jämföras');
  });

  test('KM-07 · frontendens löftestexter är backendens', () => {
    for (const [k, t] of Object.entries(LOFTEN_TEXT)) assert.equal(t, LOFTEN[k]?.text, `${k} har glidit isär`);
    // Ansvarsgränsen och flödets ord: exakt samma nycklar och texter på båda sidor — en saknad nyckel
    // i spegeln vore en yta som formulerar ansvarsgränsen själv.
    assert.deepEqual(ANSVARSGRANS_TEXT, ANSVARSGRANS, 'ansvarsgränsen har glidit isär');
    assert.deepEqual(UNDERLAGET_TEXT, UNDERLAGET, 'flödets ord har glidit isär');
  });

  test('KM-08 · mejlen renderar aldrig webbläsarens ofiltrerade modelltext', async () => {
    process.env.RESEND_API_KEY ??= 're_test_ingen_riktig_nyckel';   // modulerna bygger klienten vid import
    const { htmlEmail } = await import('../api/send-analysis.mjs');
    const { buildBriefingHtml } = await import('../api/activate-intelligence.mjs');
    const r = { extracted: { supplier: 'Tele2', annualCost: 30000 }, categorized: { category: 'mobil' },
      recommendation: { shouldSwitch: false, reasoning: TELE2, suggestedAnnualCost: null, netSaving: null } };
    const mejl = htmlEmail(r);
    assert.doesNotMatch(mejl, /jämförbara bolag/);
    assert.match(mejl, /Fakturan omfattar 23 abonnemang/, 'motprov: den neutrala meningen ska stå kvar');
    const akt = buildBriefingHtml({ supplier: 'Tele2', annualCost: 30000, reasoning: TELE2 });
    assert.doesNotMatch(akt, /jämförbara bolag/);
    assert.match(akt, /Fakturan omfattar 23 abonnemang/);
  });

  test('KM-09 · modellens utgång: kohort och förhandlingslöften når aldrig svaret', async () => {
    const { recommend } = await import('../agents/recommender/recommend.js');
    let prompt = '';
    const stubAi = { messages: { create: async (req) => { prompt = req.messages[0].content; return {
      content: [{ type: 'tool_use', input: { shouldSwitch: false, recommendationType: 'no_action', reasoning: TELE2,
        switchSteps: ['Vi förhandlar ett volymavtal åt er', 'Ni signerar själva'] } }],
      usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 } }; } } };
    const r = await recommend({
      customer: { industry: 'ovrigt', employees: 10 },
      categorized: { category: 'mobil', subType: 'företag', normalizedSupplier: 'Tele2', confidence: 0.95 },
      invoice: { annualCost: 30000, amount: 2500, billingPeriod: 'monthly', seatCount: 8,
        lineItems: [{ type: 'recurring_subscription', description: 'Mobil Företag 8 st', quantity: 8, unitPrice: 312, amount: 2500 }] },
    }, { client: stubAi, kvStore: { get: async () => null } });
    assert.ok(prompt.length > 100, 'stubben anropades aldrig — testet prövar inte modellens utgång');
    assert.doesNotMatch(String(r.reasoning ?? ''), /jämförbara bolag/);
    assert.match(String(r.reasoning ?? ''), /23 abonnemang/, 'motprov: den neutrala meningen ska stå kvar');
    assert.ok(!(r.switchSteps ?? []).some((s) => /förhandla/i.test(s)), 'ett förhandlingslöfte nådde bytesstegen');
  });

  test('KM-10 · månadsbriefen: inga påhittade faktorer, inga förhandlingsknappar, byten ur läget', () => {
    const k = utanKommentarer(las('lib/briefing-generator.js'));
    assert.doesNotMatch(k, /\*\s*0\.(85|7)\b/, 'en påhittad faktor är tillbaka i briefingen');
    assert.doesNotMatch(k, /renegotiate|överbetalning|jämförbara bolag/);
    assert.match(k, /radLage\(a\)/, 'bytet härleds inte ur läget');
  });

  test('KM-11 · bytesbekräftelsen: larmet först, ett Resend-fel är aldrig «ok», klientens text escapas', async () => {
    process.env.RESEND_API_KEY ??= 're_test_ingen_riktig_nyckel';
    const { default: handler, buildHtml } = await import('../api/send-confirmation.mjs');
    const result = { extracted: { supplier: '<a href="https://ond.example">Telia</a>', annualCost: 48000 },
      categorized: { category: 'mobil' },
      recommendation: { recommendationType: 'switch', suggestedSupplier: '<img src=x>Tele2', grossSaving: 12000 } };
    const kor = async (svar) => {
      const skickat = []; const orig = globalThis.fetch;
      globalThis.fetch = async (url, init) => { const b = JSON.parse(init?.body ?? '{}'); skickat.push({ to: [].concat(b.to)[0], html: b.html });
        const [status, json] = svar(skickat.length);
        return new Response(JSON.stringify(json), { status, headers: { 'content-type': 'application/json' } }); };
      let status = 0, ut = null;
      const res = { setHeader() {}, set statusCode(v) { status = v; }, end(b) { ut = JSON.parse(b); } };
      try { await handler({ method: 'POST', body: { email: 'kund@example.se', result } }, res); } finally { globalThis.fetch = orig; }
      return { status, ut, skickat };
    };
    const fel = [422, { name: 'validation_error', message: 'fel', statusCode: 422 }];
    const okSvar = [200, { id: 'x' }];
    const alltFel = await kor(() => fel);
    assert.equal(alltFel.skickat.length, 1, 'kunden fick ett löfte trots att larmet till oss inte gick');
    assert.notEqual(alltFel.status, 200, `Resend-fel besvarades ${alltFel.status} ${JSON.stringify(alltFel.ut)}`);
    const kvittoFel = await kor((n) => (n === 1 ? okSvar : fel));
    assert.deepEqual([kvittoFel.status, kvittoFel.ut?.bekraftelseSkickad], [200, false], 'begäran nådde oss men kvittot saknas');
    const allt = await kor(() => okSvar);   // motprov
    assert.deepEqual([allt.status, allt.ut?.bekraftelseSkickad, allt.skickat.map((x) => x.to)], [200, true, [process.env.ARVO_ALERT_EMAIL ?? 'team@arvoflow.se', 'kund@example.se']]);
    for (const { html } of allt.skickat) assert.doesNotMatch(html, /<a href="https:\/\/ond|<img src=x>/, 'klientens html når mejlet');
    assert.doesNotMatch(buildHtml(result), /Tele2/, 'klientens föreslagna leverantör står i kundens mejl');
    assert.match(buildHtml(result), /&lt;a href=/, 'motprov: namnet står kvar, escapat');
  });
});
