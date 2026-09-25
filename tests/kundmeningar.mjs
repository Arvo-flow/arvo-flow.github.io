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
import { kundensMotivering, kundensSteg, LOFTEN, LOFTEN_UTAN_MEKANISM, ANSVARSGRANS, UNDERLAGET, PROVENIENS_OCH_ENHET, KOHORT_ENHET, PROSPEKT, granskaLagradText } from '../lib/kundmeningar.js';
import { LOFTEN_TEXT, ANSVARSGRANS_TEXT, UNDERLAGET_TEXT, PROSPEKT_TEXT, KOHORT_ENHET as KOHORT_ENHET_TEXT } from '../src/lib/loften.js';

const ROT = new URL('..', import.meta.url).pathname;
const las = (p) => readFileSync(join(ROT, p), 'utf8');
const TELE2 = 'Ert Tele2-avtal ligger redan bättre än vad jämförbara bolag i er bransch betalar. Fakturan omfattar 23 abonnemang.';

/** Blankar kommentarer (även /* … *\/ över flera rader och JSX-kommentarer) men behåller radnumren. */
// HTML-entiteter avkodas före skanningen: mejlmallarna skriver «s&ouml;ker igenom era leverant&ouml;rsfakturor»,
// och en skanning som läser entiteten som text ser aldrig löftet (fyndet 2026-09-24, aktiveringsmejlet).
const ENTITETER = { ouml: 'ö', Ouml: 'Ö', auml: 'ä', Auml: 'Ä', aring: 'å', Aring: 'Å', eacute: 'é', nbsp: ' ', mdash: '—', ndash: '–', amp: '&', rarr: '→', middot: '·' };
const avkodaEntiteter = (s) => s.replace(/&(\w+);/g, (m, n) => ENTITETER[n] ?? m);
const utanKommentarer = (s) => avkodaEntiteter(s)
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
      // Premiumgrinden (2026-09-24): anmälan är ett öppet formulär och slår inte på någon bevakning.
      'Arvo börjar bevaka er imorgon bitti.', 'Arvo börjar bevaka er inom 24 timmar.', 'Arvo startar bevakningen inom 24h',
      'Bevakningen börjar inom 24 timmar', 'Arvo aktiverar er bevakning inom 24h',
      // Registergranskningen (2026-09-24): motdrag Arvo aldrig köat, en bok vakten inte ser, «identifierat».
      'Se Arvos förberedda motdrag', 'Köade ett motdrag inför en trolig höjning', 'Vi köar motdraget och agerar i fönstret.',
      'Maktkalendern · motdraget ligger klart', 'Motdraget ligger färdigt.', 'med motdraget förberett',
      'Arvo Intelligence vidgar vakten till resten av boken', 'Hela reskontran, bevakad dygnet runt.', 'När integrationen är på plats läses hela leverantörsreskontran automatiskt', 'Koppla er inkorg så bevakar Arvo alla era leverantörsfakturor löpande.', 'Vi fakturerar aldrig förrän ni sparar.', 'Se er kostnadsbedömning →', 'Sannolik premie — bolag med er profil', 'och hittar varenda besparing, inte bara den här.', 'kartlägger varje besparing, inte bara den här.', 'vad vi gjort åt det', 'Identifierat besparingsgap', 'Koppla er inkorg — Arvo hittar allt',
    ];
    // Mejlmallarna skriver svenska tecken som HTML-entiteter; skanningen avkodar dem (KM-05).
    assert.ok(LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(utanKommentarer('Arvo s&ouml;ker igenom er inkorg'))),
      'en entitetskodad löftesform passerar skanningen');
    const provbank = ['Marknadspris, samma tjänst', 'Jämfört mot verifierat B2B-marknadspris', 'väger priset mot verifierat marknadspris',
      'Vi väger varje faktura mot verifierade svenska marknadspriser.', 'och de äldsta är sällan omprövade. Det är oftast där det ligger pengar.',
      'volymen förhandlas sällan som en. Det brukar ligga pengar i strukturen.', 'Avtal från den eran följer ofta med av gammal vana', 'Varje namn är en rad i era kostnader', 'Jämförde era priser mot {featured.n} bolag', '${withSupplier} av ${total} bolag Arvo sett fakturor från'];
    assert.deepEqual(provbank.filter((m) => !PROVENIENS_OCH_ENHET.some(({ monster }) => monster.test(m))), [], 'en borttagen proveniens- eller enhetsmening kan komma tillbaka');
    // Motprov: den rätta formen fälls inte.
    assert.ok(!PROVENIENS_OCH_ENHET.some(({ monster }) => monster.test('Jämfört mot verifierat publikt listpris')), 'rätt proveniens fälls');
    assert.ok(!PROVENIENS_OCH_ENHET.some(({ monster }) => monster.test('{featured.n} {KOHORT_ENHET} jämförda')), 'registrets enhet fälls');
    const missade = borttagna.filter((m) => !LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(m)));
    assert.deepEqual(missade, [], 'en borttagen exekutiv mening kan komma tillbaka osedd');
    for (const [k, m] of Object.entries(ANSVARSGRANS)) {
      if (k === 'inteOmbud') continue;   // «Arvo säger inte upp» — nekandet fälls medvetet av säger-upp-formen; spegeln är undantagen som register (KM-05)
      assert.ok(!LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(m)), `ansvarsgränsens «${k}» fälls av registret`);
    }
    for (const k of ['intelligenceAnmalan', 'premiumutskick', 'gratisanalys']) {
      assert.ok(!LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(LOFTEN[k].text)), `löftet «${k}» fälls av registret`);
    }
    for (const t of Object.values(UNDERLAGET)) assert.ok(!LOFTEN_UTAN_MEKANISM.some(({ monster }) => monster.test(t)), `flödets ord fälls: ${t}`);
  });

  test('KM-15 · inkorgskopplingens mejl: en sidstorlek är inget antal, en ämnesträff är ingen faktura (motprov: under taket står talet)', () => {
    for (const p of ['api/auth/outlook-callback.mjs']) {
      const k = las(p);
      assert.match(k, /\$\{invoiceCount >= 20 \? 'minst 20' : invoiceCount\} mejl som ser ut som fakturor/, `${p}: räkningen redovisas inte som vad den är`);
      assert.doesNotMatch(k, /leverantörsfakturor<\/strong>/, `${p}: ämnesträffar kallas åter leverantörsfakturor`);
      assert.match(k, /Er inkorg är kopplad\./);
    }
    // Taket är det sökningen faktiskt använder — 20. (Gmail-vägen togs bort 2026-09-24.)
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
        const hit = [...LOFTEN_UTAN_MEKANISM, ...PROVENIENS_OCH_ENHET].find(({ monster }) => monster.test(l));
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

  test('KM-16 · lagrad text granskas vid läsning: /briefing visar ingen insikt med förbjuden form, och summan följer listan', async () => {
    process.env.RESEND_API_KEY ??= 're_test';
    const { granskadeInsikter } = await import('../api/briefing.mjs');
    const ren = { id: 'a', title: 'Telia höjde priset', action: null };
    const gammal = { id: 'b', title: 'Prishöjning', action: { label: 'Se Arvos förberedda motdrag' } };
    const kohort = { id: 'c', text: 'Ni betalar mer än jämförbara bolag i er bransch.' };
    assert.deepEqual(granskadeInsikter([ren, gammal, kohort]), { insikter: [ren], undanhallna: 2 });
    assert.deepEqual(granskaLagradText(ren), { ren: true, skal: [] }, 'motprov: en ren insikt visas');
    assert.equal(granskaLagradText({ a: [{ b: 'Marknadspris, samma tjänst' }] }).ren, false, 'nästlade strängar granskas');
    assert.deepEqual(granskadeInsikter(null), { insikter: [], undanhallna: 0 });
    // Endpointen läser granskningen — både GET och POST — och summan släpps när något undanhålls.
    const src = readFileSync(new URL('../api/briefing.mjs', import.meta.url), 'utf8');
    assert.equal((src.match(/granskadeInsikter\(br\.insights\)/g) ?? []).length, 2, 'GET och POST ska båda granska');
    assert.match(src, /totalSavingPotential:\s*undanhallna \? null/);
  });

  test('KM-17 · kohortkortet är avstängt vid källan: totalsumma mot totalsumma får aldrig bli «N % mer»', async () => {
    const { getMarketIntelligence } = await import('../lib/price-alert.js');
    assert.equal(await getMarketIntelligence({ normalizedSupplier: 'telia', category: 'mobil' }), null);
    // Båda konsumenterna frågar källan och ingen annan — en egen aggregering i en yta vore ett nytt kort.
    for (const f of ['api/invoice-history.mjs', 'api/test-invoice.mjs']) {
      const src = las(f);
      assert.match(src, /getMarketIntelligence\(/, `${f} frågar inte källan`);
      assert.doesNotMatch(src, /PERCENTILE_CONT[\s\S]{0,400}annual_cost|AVG\(annual_cost\)/, `${f} räknar ett eget kohortsnitt`);
    }
  });

  test('KM-18 · prospektet: ingen lagrad premie når en läsare, mejlet talar bara om det avlästa, dörrens fynd granskas', async () => {
    process.env.RESEND_API_KEY ??= 're_test';
    const { prospektSvar } = await import('../api/prospect.mjs');
    const gammal = { hasEstimates: true, totalSavingLow: 12000, totalSavingHigh: 30000, totalSavingCentral: 21000,
      categories: [{ category: 'mobil', typicalLow: 40000, savingCentral: 9000 }], mxPlatform: 'microsoft365',
      findings: ['DMARC saknas på er domän', 'Ni betalar mer än jämförbara bolag i er bransch'], foundedYear: 2004 };
    const ut = prospektSvar(gammal);
    for (const k of ['hasEstimates', 'totalSavingLow', 'totalSavingHigh', 'totalSavingCentral', 'categories']) assert.ok(!(k in ut), `${k} når läsaren`);
    assert.deepEqual(ut.findings, ['DMARC saknas på er domän'], 'kohortfyndet ska undanhållas, DNS-fyndet stå kvar (motprov)');
    assert.deepEqual(ut.ankare.map((a) => a.kategori), ['saas-productivity', 'mobil']);
    assert.ok(ut.ankare.every((a) => a.perEnhetAr > 0 && a.referensProdukt && /^\d{4}-\d{2}-\d{2}$/.test(a.verifierad)), 'ankaret bär tal, produkt och datum');
    assert.deepEqual(prospektSvar(null).ankare.map((a) => a.kategori), ['mobil'], 'utan plattform: bara mobil');

    const { buildOutboundEmail } = await import('../api/generate-prospect.mjs');
    const { prospektAnkare } = await import('../lib/listprisankare.js');
    const html = buildOutboundEmail({ companyName: 'Test AB', industry: 'Konsult', employees: 12, ankare: prospektAnkare({ mxPlatform: 'microsoft365' }),
      prospectUrl: 'https://x', mxPlatform: 'microsoft365', mxSince: '2021-04-01' });
    const text = html.replace(/<style>[\s\S]*?<\/style>/, '').replace(/<[^>]+>/g, ' ');
    assert.ok(text.includes(PROSPEKT.ingenKostnad) && text.includes(PROSPEKT.ankareRubrik), 'mejlet bär registrets ord');
    assert.match(text, /1\s606 kr per användare\/år/, 'ankaret står med sitt exakta tal');
    assert.doesNotMatch(text, /premie|besparing på|marknadskostnad|kostnadsbedömning|fakturerar aldrig/i);

    const { granskadeFynd } = await import('../api/reveal.mjs');
    const ok = { kind: 'platform', title: 'Ni kör Microsoft 365', detail: 'Avläst ur er publika e-postuppsättning.' };
    const dalig = { kind: 'heritage', title: 'Grundat 1990', detail: 'De äldsta är sällan omprövade. Det är oftast där det ligger pengar.' };
    assert.deepEqual(granskadeFynd([ok, dalig]), [ok]);
  });

  test('KM-07 · frontendens löftestexter är backendens', () => {
    for (const [k, t] of Object.entries(LOFTEN_TEXT)) assert.equal(t, LOFTEN[k]?.text, `${k} har glidit isär`);
    assert.equal(KOHORT_ENHET_TEXT, KOHORT_ENHET, 'kohortens enhet har glidit isär mellan mejl och rum');
    assert.deepEqual(PROSPEKT_TEXT, PROSPEKT, 'prospektets ord har glidit isär mellan mejl och sida');
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
