// tests/business-intel.mjs — låser affärshjärnan i avslöjandet.
// Fixturerna SPEGLAR VERKLIGHETEN ur sond v3 (ops/probe-business-intel.txt 2026-07-01):
// sökets companies[]-form, bolagssidans company-form, Netigate-tvetydigheten, kan.se-fallet.
// Integritetskärnan: fel bolags omsättning får ALDRIG visas — grinden är exakt-match, exakt EN.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';
import {
  sldFromDomain, normalizeCompanyName, matchCompany, normalizeOrgnr, foldToDomainAlphabet,
  extractNextData, extractSearchCompanies, extractCompanyFacts,
  buildBusinessFindings, mergeRevealFindings,
  luhnValidOrgnr, extractOrgnrCandidates, fetchOrgnrFromWebsite, fetchBusinessFacts, extractSiteCompanyName, titleSpanMatchingSld, extractAccountHistory,
  identityCandidates, buildLicensspannFinding,
} from '../lib/business-intel.js';

describe('business-intel · domän → SLD', () => {
  test('vanliga domäner', () => {
    assert.equal(sldFromDomain('apendo.se'), 'apendo');
    assert.equal(sldFromDomain('lynxeye.com'), 'lynxeye');
    assert.equal(sldFromDomain('BIMobject.COM'), 'bimobject');
  });
  test('för korta/generiska SLD → null (för osäkert att matcha)', () => {
    assert.equal(sldFromDomain('ab.se'), null);
    assert.equal(sldFromDomain(''), null);
    assert.equal(sldFromDomain(null), null);
  });
});

describe('business-intel · orgnr-vägen (utåtriktade flödet — exakt nyckel, ingen grind)', () => {
  test('normalisering: bindestreck bort, exakt 10 siffror krävs', () => {
    assert.equal(normalizeOrgnr('556569-0087'), '5565690087');
    assert.equal(normalizeOrgnr('5565690087'), '5565690087');
    assert.equal(normalizeOrgnr('556569-008'), null);     // 9 siffror → aldrig en gissning
    assert.equal(normalizeOrgnr('55 65 69-0087'), '5565690087');
    assert.equal(normalizeOrgnr(''), null);
    assert.equal(normalizeOrgnr(null), null);
  });
});

describe('business-intel · matchningsgrinden (integritetskärnan)', () => {
  test('exakt match, en träff → bolaget (Lynxeye-fallet)', () => {
    const m = matchCompany('lynxeye', [{ legalName: 'Lynxeye AB', orgnr: '5565690087' }]);
    assert.equal(m?.orgnr, '5565690087');
  });
  test('Netigate-fallet ordagrant: AB + Holding AB → ENDAST den exakta släpps igenom', () => {
    const m = matchCompany('netigate', [
      { legalName: 'Netigate AB', orgnr: '5565760997' },
      { legalName: 'Netigate Holding AB', orgnr: '5590665658' },
    ]);
    assert.equal(m?.orgnr, '5565760997');
  });
  // ── AVIDA-LÄXAN 2026-08-07 (sondbevisad, ops/probe-identitet.txt) ─────────────────────────
  // avida.se gav 25 sökträffar. Exakt EN vek till "avida": "Avida AB" — 1,9 mkr, 1 anställd,
  // grundat 2015. Grinden fyrade med full säkerhet. Men i SAMMA resultat låg "Avida Bank AB
  // (publ)", som med all sannolikhet äger domänen; den vek till "avidabank" och sågs aldrig
  // som konkurrent. Vi namngav ett litet bolag som en bank.
  // Felet är systematiskt: den verkliga ägaren bär nästan alltid ett kvalificerande ord
  // (X Bank/Finans/Sverige AB) medan något orelaterat "X AB" matchar domänen exakt.
  test('AVIDA: exakt "Avida AB" men "Avida Bank AB" i samma resultat → TYSTNAD', () => {
    const bolag = [
      { legalName: 'Avida Bank AB (publ)', orgnr: '5562309004' },
      { legalName: 'AVIDA ASSISTANS & OMSORG I SVERIGE AB', orgnr: '5591653182' },
      { legalName: 'Avida AB', orgnr: '5590177068' },
      { legalName: 'Bravida Sverige AB', orgnr: '5561974188' },
    ];
    assert.equal(matchCompany('avida', bolag), null,
      'namnstavning är inte ägarskap — en exakt vikning är entydig först när ingen annan kandidat rimligen kan äga domänen');
  });

  test('STRUKTURORD är inte rivaler: Holding/International märker samma varumärke', () => {
    // Gränsen mot Avida: "Holding" märker en annan ENHET i samma koncern; "Bank" kan vara en
    // helt annan VERKSAMHET. Tystnad vid det senare, träff vid det förra.
    assert.equal(matchCompany('netigate', [
      { legalName: 'Netigate AB', orgnr: '5565760997' },
      { legalName: 'Netigate Holding AB', orgnr: '5590665658' },
    ])?.orgnr, '5565760997');
    assert.equal(matchCompany('nordlock', [
      { legalName: 'Nord-Lock AB', orgnr: '5561371054' },
      { legalName: 'Nord-Lock International AB', orgnr: '5566105739' },
    ])?.orgnr, '5561371054');
  });

  test('en heuristik får UPPHÄVA ett påstående, aldrig SKAPA ett', () => {
    // Geminis förslag var att sortera på högst omsättning och välja den största. Det hade inte
    // räddat Avida — grinden såg aldrig ens att Avida Bank fanns i resultatet — och det hade
    // gjort identiteten till en gissning. Här bevisas den motsatta riktningen: vid rival tiger vi.
    const medRival = [{ legalName: 'Foo AB', orgnr: '1' }, { legalName: 'Foo Bank AB', orgnr: '2' }];
    assert.equal(matchCompany('foo', medRival), null);
    const utanRival = [{ legalName: 'Foo AB', orgnr: '1' }, { legalName: 'Bar AB', orgnr: '2' }];
    assert.equal(matchCompany('foo', utanRival)?.orgnr, '1');
  });

  test('kan.se-fallet: "Kanmalmo AB" matchar INTE "kan" → null (aldrig en chansning)', () => {
    assert.equal(matchCompany('kan', [{ legalName: 'Kanmalmo AB', orgnr: '5566692983' }]), null);
  });
  test('TVÅ exakta träffar → null (tvetydighet = tystnad, regel 4)', () => {
    const m = matchCompany('acme', [
      { legalName: 'Acme AB', orgnr: '1' },
      { legalName: 'ACME Aktiebolag', orgnr: '2' },
    ]);
    assert.equal(m, null);
  });
  test('normalisering: bolagsformer och skiljetecken faller bort', () => {
    assert.equal(normalizeCompanyName('Lynxeye AB'), 'lynxeye');
    assert.equal(normalizeCompanyName('ACME Aktiebolaget'), 'acme');
    assert.equal(normalizeCompanyName('Hallvarsson & Halvarsson AB'), 'hallvarssonhalvarsson');
  });

  // Kristianstad-läxan 2026-07-12: domäner kan aldrig bära å/ä/ö — utan vikningen fick VARJE
  // svenskt bolag med å/ä/ö i namnet (Måleri, Städ, Elektriska …) aldrig sitt bokslutsfynd.
  test('Kristianstad-fallet ordagrant: "Kristianstads Måleri AB" MATCHAR kristianstadsmaleri.se', () => {
    const m = matchCompany('kristianstadsmaleri', [{ legalName: 'Kristianstads Måleri AB', orgnr: '5560001111' }]);
    assert.equal(m?.orgnr, '5560001111');
  });
  test('bindestrecksdomän: svensk-bygg.se matchar "Svensk Bygg AB"', () => {
    const m = matchCompany('svensk-bygg', [{ legalName: 'Svensk Bygg AB', orgnr: '5560002222' }]);
    assert.equal(m?.orgnr, '5560002222');
  });
  test('vikningen vidgar alfabetet, ALDRIG toleransen: å/a-kollision → 2 träffar → null', () => {
    const m = matchCompany('malarfirman', [
      { legalName: 'Målarfirman AB', orgnr: '1' },
      { legalName: 'Malarfirman AB', orgnr: '2' },
    ]);
    assert.equal(m, null);
  });
  test('foldToDomainAlphabet: å/ä→a, ö→o, é→e, allt utanför a-z0-9 bort', () => {
    assert.equal(foldToDomainAlphabet('kristianstadsmåleri'), 'kristianstadsmaleri');
    assert.equal(foldToDomainAlphabet('Örebro Städ & Miljö'), 'orebrostadmiljo');
    assert.equal(foldToDomainAlphabet('Café Lundén'), 'cafelunden');
  });
});

describe('business-intel · orgnr-ur-sajten (Kristianstad-läxan steg 2 — starkare än namnmatch)', () => {
  test('Luhn: riktiga orgnr godkänns, påhittade fälls', () => {
    for (const ok of ['5565690087', '5565760997', '5590665658', '5567037485']) {
      assert.equal(luhnValidOrgnr(ok), true, ok);
    }
    assert.equal(luhnValidOrgnr('1234567890'), false);
    assert.equal(luhnValidOrgnr('556569008'), false);    // 9 siffror
  });

  test('footer-format hittas: bindestreck, tätskrivet och moms-format (SE…01)', () => {
    assert.deepEqual(extractOrgnrCandidates('Org.nr 556569-0087 · Stockholm'), ['5565690087']);
    assert.deepEqual(extractOrgnrCandidates('orgnr: 5565690087'), ['5565690087']);
    assert.deepEqual(extractOrgnrCandidates('Organisationsnummer 556569-0087'), ['5565690087']);
    assert.deepEqual(extractOrgnrCandidates('VAT: SE556569008701'), ['5565690087']);
  });

  test('personnummer/datum/telefon fälls: månadsposition < 20 eller fel Luhn', () => {
    assert.deepEqual(extractOrgnrCandidates('Född 851224-1234'), []);          // månad 12 < 20
    assert.deepEqual(extractOrgnrCandidates('Tel 040-123 456, 070-1234567'), []);
    assert.deepEqual(extractOrgnrCandidates('Beställning 202607-1211'), []);   // fel Luhn
  });

  test('dubbletter dedupas; TVÅ olika nummer på sajten → tvetydigt (hanteras i fetch-lagret)', () => {
    const one = extractOrgnrCandidates('org.nr 556569-0087 … samt org.nr 5565690087 igen');
    assert.deepEqual(one, ['5565690087']);
    const two = extractOrgnrCandidates('Org.nr: 556569-0087. Moderbolagets org.nr: 559066-5658.');
    assert.equal(two.length, 2);
  });

  test('fetchOrgnrFromWebsite: ETT unikt nummer → orgnr, TVÅ olika → null, ingen sida → null', async () => {
    const page = (body) => Promise.resolve({ ok: true, text: () => Promise.resolve(body) });
    const one = await fetchOrgnrFromWebsite('x.se', { fetchImpl: () => page('Org.nr 556569-0087') });
    assert.equal(one, '5565690087');
    const two = await fetchOrgnrFromWebsite('x.se', {
      fetchImpl: () => page('org.nr 556569-0087 och org.nr 559066-5658'),
    });
    assert.equal(two, null);
    const none = await fetchOrgnrFromWebsite('x.se', { fetchImpl: () => Promise.reject(new Error('nät')) });
    assert.equal(none, null);
  });

  test('stavningsoraklet: juridiska namnet plockas ur <title> (rättstavat med å/ä/ö)', () => {
    assert.equal(
      extractSiteCompanyName('<title>Kristianstads Måleri AB - Tradition & Kvalitet sedan 1928</title>'),
      'Kristianstads Måleri AB');
    assert.equal(
      extractSiteCompanyName('<meta property="og:site_name" content="Örebro Städ Aktiebolag – hem" />'),
      'Örebro Städ Aktiebolag');
    // v2: segmentet returneras — FOLD-GRINDEN i fetchBusinessFacts ('Välkommen till oss' viker
    // aldrig till någon SLD) är skyddet, inte extraktorn. Oraklet lånar stavning, grinden avgör.
    assert.equal(extractSiteCompanyName('<title>Välkommen till oss</title>'), 'Välkommen till oss');
  });

  test('KRISTIANSTAD-KEDJAN ordagrant: inget orgnr på sajten → titeln blir sökfrågan → grinden släpper', async () => {
    const calls = [];
    const nextData = (obj) => `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify(obj)}</script>`;
    const fetchImpl = (url) => {
      const u = String(url); calls.push(u);
      if (u === 'https://kristianstadsmaleri.se/') {
        return Promise.resolve({ ok: true, text: () => Promise.resolve(
          '<title>Kristianstads Måleri AB - Tradition & Kvalitet sedan 1928</title> Ring 0706242272') });
      }
      if (u.includes('/what/')) {
        // ascii-frågan ger 0 träffar (sondbevisat); den å-stavade träffar
        const companies = decodeURIComponent(u).includes('Måleri')
          ? [{ legalName: 'Kristianstads Måleri AB', orgnr: '5565690087' }]
          : [];
        return Promise.resolve({ ok: true, text: () => Promise.resolve(nextData(
          { props: { pageProps: { hydrationData: { searchStore: { companies: { companies } } } } } })) });
      }
      if (u.includes('allabolag.se/5565690087')) {
        return Promise.resolve({ ok: true, text: () => Promise.resolve(nextData({ props: { pageProps: { company: {
          legalName: 'Kristianstads Måleri AB', orgnr: '5565690087',
          revenue: '9876', employees: 12, companyAccountsLastUpdatedDate: '2025-08-31',
        } } } })) });
      }
      return Promise.resolve({ ok: false, text: () => Promise.resolve('') });
    };
    const facts = await fetchBusinessFacts('kristianstadsmaleri.se', { fetchImpl });
    assert.equal(facts?.legalName, 'Kristianstads Måleri AB');
    assert.equal(facts?.employees, 12);
    assert.ok(calls.some((u) => decodeURIComponent(u).includes('Kristianstads Måleri')),   // span-oraklet ger namnet utan bolagsform — stavningen är poängen
      'sökfrågan ska vara det rättstavade namnet ur titeln');
  });

  test('oraklet lånar stavningen, ALDRIG förtroendet: titel-AB som inte matchar domänen ignoreras', async () => {
    const calls = [];
    const fetchImpl = (url) => {
      const u = String(url); calls.push(u);
      if (u === 'https://foo.se/') {
        return Promise.resolve({ ok: true, text: () => Promise.resolve('<title>Byggd av Webbyrån Pixel AB</title>') });
      }
      return Promise.resolve({ ok: false, text: () => Promise.resolve('') });
    };
    await fetchBusinessFacts('foo.se', { fetchImpl });
    assert.ok(!calls.some((u) => decodeURIComponent(u).includes('Pixel')),
      'ett AB-namn som inte viker till domänens SLD får aldrig bli sökfråga');
  });

  test('fetchBusinessFacts tar orgnr-vägen FÖRST: å/ä/ö-bolag hittas utan sökträff', async () => {
    const calls = [];
    const fetchImpl = (url) => {
      calls.push(String(url));
      if (String(url).includes('kristianstadsmaleri.se')) {
        return Promise.resolve({ ok: true, text: () => Promise.resolve('Org.nr 556569-0087') });
      }
      if (String(url).includes('allabolag.se/5565690087')) {
        const nd = { props: { pageProps: { company: {
          legalName: 'Kristianstads Måleri AB', orgnr: '5565690087',
          revenue: '12345', employees: 9, companyAccountsLastUpdatedDate: '2025-06-30',
        } } } };
        return Promise.resolve({ ok: true, text: () => Promise.resolve(
          `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify(nd)}</script>`) });
      }
      return Promise.resolve({ ok: false, text: () => Promise.resolve('') });
    };
    const facts = await fetchBusinessFacts('kristianstadsmaleri.se', { fetchImpl });
    assert.equal(facts?.legalName, 'Kristianstads Måleri AB');
    assert.equal(facts?.employees, 9);
    assert.ok(!calls.some((u) => u.includes('/what/')), 'sökvägen ska inte behövas när orgnr-vägen bar');
  });
});

describe('business-intel · parsning (kontraktet ur sond v3)', () => {
  const searchHtml = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
    props: { pageProps: { hydrationData: { searchStore: { companies: { companies: [
      { name: 'Lynxeye AB', legalName: 'Lynxeye AB', orgnr: '5565690087', companyId: '2K1O1YFI5YEHU' },
    ] } } } } },
  })}</script></html>`;
  const companyHtml = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
    props: { pageProps: { company: {
      legalName: 'Apendo AB', orgnr: '5564374840', revenue: '52874', profit: '2036',
      employees: '30', companyAccountsLastUpdatedDate: '2025',
    } } },
  })}</script></html>`;

  test('sökets companies[] extraheras', () => {
    const list = extractSearchCompanies(extractNextData(searchHtml));
    assert.equal(list.length, 1);
    assert.equal(list[0].orgnr, '5565690087');
  });
  // ── ÅRET KOMMER UR RÄKENSKAPSÅRET, INTE UR UPPDATERINGSSTÄMPELN (2026-08-12) ───────────────
  // Testerna nedan kodifierade tidigare buggen: de krävde att year hämtades ur
  // companyAccountsLastUpdatedDate. Grundaren fångade felet på ett kort där Avida sa "bokslut
  // 2024" och Skanska "2025" — två olika storheter under samma etikett. Nu låser de motsatsen.
  test('utan bokslutshistorik finns inget källbelagt år — rubrikens tal står kvar, året utelämnas', () => {
    const f = extractCompanyFacts(extractNextData(companyHtml));
    assert.equal(f.year, null, 'en uppdateringsstämpel är inte ett räkenskapsår och får aldrig visas som ett');
    assert.equal(f.revenueTkr, 52874);
    assert.equal(f.employees, 30);
  });
  test('med bokslutshistorik: år OCH tal ur SAMMA post', () => {
    const html = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
      props: { pageProps: { company: {
        legalName: 'Apendo AB', orgnr: '5564374840', revenue: '99999', employees: '99',
        companyAccountsLastUpdatedDate: '2026',
        companyAccounts: [
          { year: '2024', accounts: [{ code: 'SDI', amount: 52874 }, { code: 'ANT', amount: 30 }] },
          { year: '2023', accounts: [{ code: 'SDI', amount: 48000 }, { code: 'ANT', amount: 28 }] },
        ],
      } } },
    })}</script></html>`;
    const f = extractCompanyFacts(extractNextData(html));
    assert.equal(f.year, '2024', 'året ska komma ur räkenskapsårets eget fält, inte ur stämpeln 2026');
    assert.equal(f.revenueTkr, 52874, 'talet ska komma ur SAMMA post som året — aldrig ur rubriken (99999)');
    assert.equal(f.employees, 30, 'samma post, annars är etiketten fel på ett nytt sätt');
  });
  test('bokslut utan anställdatal → talet utelämnas, lånas aldrig från rubriken', () => {
    const html = `<html><script id="__NEXT_DATA__" type="application/json">${JSON.stringify({
      props: { pageProps: { company: {
        legalName: 'X AB', orgnr: '5564374840', revenue: '1', employees: '77',
        companyAccounts: [{ year: '2025', accounts: [{ code: 'SDI', amount: 4200 }] }],
      } } },
    })}</script></html>`;
    const f = extractCompanyFacts(extractNextData(html));
    assert.equal(f.year, '2025');
    assert.equal(f.revenueTkr, 4200);
    assert.equal(f.employees, null, 'rubrikens 77 hör till en annan period — att låna det vore samma fel igen');
    const rad = buildBusinessFindings(f)[0];
    assert.match(rad.title, /Ert bokslut 2025: 4,2 mkr i omsättning$/, 'meningen ska sluta rent utan anställdatal');
  });
  test('ogiltiga fakta → null (revenue saknas / employees orimligt)', () => {
    const bad = (company) => extractCompanyFacts({ props: { pageProps: { company } } });
    assert.equal(bad({ revenue: null, employees: '30' }), null);
    assert.equal(bad({ revenue: '100', employees: '0' }), null);
  });
});

describe('business-intel · fynden (regel 2 + 3: kodräknat, källa på varje rad)', () => {
  const facts = { provenance: 'bolagsverket', legalName: 'Apendo AB', orgnr: '5564374840', revenueTkr: 52874, employees: 30, year: '2025' };

  test('bokslutsfyndet: mkr-format, år, källa Bolagsverket — ALDRIG profit i copy', () => {
    const f = buildBusinessFindings(facts);
    const biz = f.find((x) => x.kind === 'business');
    assert.ok(biz);
    assert.match(biz.title, /52,9 mkr/);
    assert.match(biz.title, /30 anställda/);
    assert.match(biz.title, /2025/);
    assert.match(biz.source, /Bolagsverket/);
    assert.ok(!/profit|resultat/i.test(biz.title + biz.detail), 'profit-fältet får aldrig nå copy (oklar etikett)');
  });

  test('koncern-lärdomen: fyndet NAMNGER den juridiska enheten (detail + källa)', () => {
    const f = buildBusinessFindings(facts);
    const biz = f.find((x) => x.kind === 'business');
    assert.match(biz.detail, /Gäller Apendo AB/);          // exakt vilken enhet siffrorna gäller
    // Källan citerar REGISTRET och nyckeln — inte enheten en andra gång. Raden låste tidigare
    // att namnet stod i BÅDE detalj och källa; det var en dubblering (namnet står dessutom en
    // tredje gång i identitetsraden) och den kostade fyra radbrytningar i källspalten.
    // Lärdomen som skulle låsas är att fyndet NAMNGER enheten — det gör detaljen ovan.
    assert.match(biz.source, /^Bolagsverket · bokslutsår \d{4}$/);
    assert.doesNotMatch(biz.source, /Apendo/);             // aldrig samma namn två gånger på ett kort
  });
  test('GRUNDARBESLUT 2026-07-01: costline är BORTTAGEN — avslöjandet bär ALDRIG en räknad rad', () => {
    // Tre iterationer (p25-felmärkning → antagen plan → 3,7×-spann + Microsoft-priser åt
    // Google-bolag) hade samma rot: raden var RÄKNAD, inte UPPTÄCKT. Dörren visar bara fakta;
    // licensmatematiken bor i analysen där planen är känd (tests/saas-tier-detection.mjs).
    const f = buildBusinessFindings(facts);
    assert.equal(f.length, 1);
    assert.equal(f[0].kind, 'business');
    assert.equal(f.find((x) => x.kind === 'costline'), undefined);
    const allText = f.map((x) => `${x.title} ${x.detail} ${x.source}`).join(' ');
    assert.ok(!/kr\/år|listpris|golvpris|licenser/i.test(allText), 'kostnadsräknat språk får inte nå avslöjandet');
  });
  test('utan fakta → tomt', () => {
    assert.deepEqual(buildBusinessFindings(null), []);
  });
});

describe('business-intel · sammanfogning med DNS-fynden', () => {
  const biz = [{ kind: 'business', title: 'x' }];
  const dns = [{ kind: 'platform', title: 'M365' }, { kind: 'bridge', title: 'brygga', floor: true }];

  test('affärsfynd leder; DNS-golvbryggan faller bort (annars dubblett av costline)', () => {
    const merged = mergeRevealFindings(biz, dns);
    assert.equal(merged[0].kind, 'business');
    assert.equal(merged.find((f) => f.floor), undefined);
    assert.ok(merged.find((f) => f.kind === 'platform'));
  });
  test('utan affärsfynd → DNS-fynden orörda (golvet står kvar)', () => {
    const merged = mergeRevealFindings([], dns);
    assert.equal(merged.length, 2);
    assert.ok(merged.find((f) => f.floor));
  });

  // Marknadsankaret i dörren (Kristianstad-läxan): "om marknaden"-raden visas när "om er"-nätet
  // är tunt — aldrig som utspädning av ett kort som redan bär plattforms-/leverantörsfynd.
  const anchor = { kind: 'market', title: 'Måttstocken…' };

  test('tunt nät (ingen plattform/leverantörer) → ankaret läggs SIST och bryggan faller bort', () => {
    const thinDns = [{ kind: 'infra', title: 'Loopia' }, { kind: 'bridge', title: 'brygga', floor: true }];
    const merged = mergeRevealFindings(biz, thinDns, anchor);
    assert.equal(merged[merged.length - 1].kind, 'market');
    assert.equal(merged.find((f) => f.floor), undefined);
  });
  test('kort med plattformsfynd (Lekia-klassen) → ankaret utelämnas (utspädning ≠ premium)', () => {
    const merged = mergeRevealFindings(biz, dns, anchor);
    assert.equal(merged.find((f) => f.kind === 'market'), undefined);
  });
  test('helt tomt "om er" (inte ens bokslut) → ankaret bär ensamt, bryggan behövs inte', () => {
    const thinDns = [{ kind: 'bridge', title: 'brygga', floor: true }];
    const merged = mergeRevealFindings([], thinDns, anchor);
    assert.deepEqual(merged.map((f) => f.kind), ['market']);
  });
  test('Lynxeye-regeln för korsläsningen: cross-raden tränger undan den rena domän-längdraden', () => {
    const biz = [{ kind: 'business', title: 'bokslut' }, { kind: 'cross', title: 'korsläsningen' }];
    const dns = [{ kind: 'domain', title: '12 års obruten närvaro' }, { kind: 'spoofing', title: 'lucka' }];
    const merged = mergeRevealFindings(biz, dns, null);
    assert.equal(merged.find((x) => x.kind === 'domain'), undefined, 'två rader om samma årtal grälar');
    assert.ok(merged.find((x) => x.kind === 'spoofing'));
  });

  test('utan ankare (prisboken onåbar) → bryggan står kvar som sista utväg', () => {
    const thinDns = [{ kind: 'bridge', title: 'brygga', floor: true }];
    const merged = mergeRevealFindings([], thinDns, null);
    assert.ok(merged.find((f) => f.floor));
  });
});

describe('business-intel · trenden (Kristianstad-läxan del A — riktningen, kodräknad)', () => {
  const facts = (h) => ({
    provenance: 'bolagsverket', legalName: 'Kristianstads Måleri Aktiebolag', orgnr: '5562896430',
    revenueTkr: 13976, employees: 14, year: '2025', history: h,
  });

  test('SDI-kontraktet ur sonden: historiken extraheras med år, omsättning (SDI) och anställda (ANT)', () => {
    const companyAccounts = [
      { year: '2025', accounts: [{ code: 'SDI', amount: '13976' }, { code: 'ANT', amount: '14' }, { code: 'EK', amount: '-61' }] },
      { year: '2024', accounts: [{ code: 'SDI', amount: '18905' }, { code: 'ANT', amount: '16' }] },
      { year: 'fel',  accounts: [{ code: 'SDI', amount: '99' }] },              // ogiltigt år → hoppas
      { year: '2023', accounts: [{ code: 'ANT', amount: '15' }] },              // ingen SDI → hoppas
    ];
    assert.deepEqual(extractAccountHistory(companyAccounts), [
      { year: '2025', revenueTkr: 13976, employees: 14 },
      { year: '2024', revenueTkr: 18905, employees: 16 },
    ]);
    assert.deepEqual(extractAccountHistory(null), []);
  });

  test('KRISTIANSTAD ordagrant: 18 905 → 13 976 tkr = föll 26 % — respektfull copy, aldrig anklagelse', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 13976, employees: 14 },
      { year: '2024', revenueTkr: 18905, employees: 16 },
    ]));
    const t = f.find((x) => x.kind === 'trend');
    assert.ok(t, 'trendfyndet saknas');
    assert.equal(t.title, 'Er omsättning föll 26 % senaste bokslutsåret');
    assert.match(t.detail, /Från 18,9 till 14,0 mkr \(bokslutsåren 2024 → 2025\)/);
    assert.match(t.detail, /varje kostnadskrona dubbelt/);
    assert.match(t.source, /Bolagsverket.*2024–2025/);
  });

  test('tillväxt: +18 % med utvecklings-copyn', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 14160, employees: 14 },
      { year: '2024', revenueTkr: 12000, employees: 12 },
    ]));
    const t = f.find((x) => x.kind === 'trend');
    assert.equal(t.title, 'Er omsättning växte 18 % senaste bokslutsåret');
    assert.match(t.detail, /följer med upp och blir vanor/);
  });

  test('brus är inte ett fynd: < 5 % rörelse → tystnad', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 10300, employees: 10 },
      { year: '2024', revenueTkr: 10000, employees: 10 },
    ]));
    assert.equal(f.find((x) => x.kind === 'trend'), undefined);
  });

  test('ett enda bokslutsår eller trasig historik → tystnad (aldrig en division med noll)', () => {
    assert.equal(buildBusinessFindings(facts([{ year: '2025', revenueTkr: 13976, employees: 14 }]))
      .find((x) => x.kind === 'trend'), undefined);
    assert.equal(buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 13976, employees: 14 },
      { year: '2024', revenueTkr: 0, employees: 16 },
    ])).find((x) => x.kind === 'trend'), undefined);
    assert.equal(buildBusinessFindings(facts(undefined)).find((x) => x.kind === 'trend'), undefined);
  });
});

describe('business-intel · kurvan i rad (punkt 1) + måttstocksbeslutet (punkt 2)', () => {
  const facts = (h) => ({
    provenance: 'bolagsverket', legalName: 'X AB', orgnr: '1', revenueTkr: h[0].revenueTkr, employees: 10, year: h[0].year, history: h,
  });

  test('tredje växande året i rad: sviten räknas, rubrikprocenten är SENASTE årets, spannet hela kurvan', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 14200, employees: 10 },
      { year: '2024', revenueTkr: 12000, employees: 9 },   // +18 %
      { year: '2023', revenueTkr: 10500, employees: 8 },   // +14 %
      { year: '2022', revenueTkr: 9200,  employees: 8 },   // +14 %
    ]));
    const t = f.find((x) => x.kind === 'trend');
    assert.equal(t.title, 'Tredje växande året i rad (+18 % senast)');
    assert.match(t.detail, /Från 9,2 till 14,2 mkr \(bokslutsåren 2022 → 2025\)/);
    assert.match(t.source, /2022–2025/);
  });

  test('andra fallande året i rad — med fall-copyn', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 13976, employees: 14 },
      { year: '2024', revenueTkr: 18905, employees: 16 },  // −26 %
      { year: '2023', revenueTkr: 21000, employees: 17 },  // −10 %
    ]));
    const t = f.find((x) => x.kind === 'trend');
    assert.equal(t.title, 'Andra fallande året i rad (−26 % senast)');
    assert.match(t.detail, /kostnadskrona dubbelt/);
    assert.match(t.detail, /Från 21,0 till 14,0 mkr \(bokslutsåren 2023 → 2025\)/);
  });

  test('riktningsbyte bryter sviten → enkelårs-rubriken', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 14200, employees: 10 },
      { year: '2024', revenueTkr: 12000, employees: 9 },   // +18 %
      { year: '2023', revenueTkr: 13000, employees: 9 },   // −8 % → brott
    ]));
    const t = f.find((x) => x.kind === 'trend');
    assert.equal(t.title, 'Er omsättning växte 18 % senaste bokslutsåret');
    assert.match(t.detail, /Från 12,0 till 14,2 mkr/);
  });

  test('brusgolvet: ett ±1 %-år räknas inte in i sviten', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 14200, employees: 10 },
      { year: '2024', revenueTkr: 12000, employees: 9 },   // +18 %
      { year: '2023', revenueTkr: 11900, employees: 9 },   // +0,8 % → bryter (varken tillväxt eller fall)
    ]));
    assert.match(f.find((x) => x.kind === 'trend').title, /^Er omsättning växte 18 %/);
  });

  test('fyra år i rad cappas språkligt vid "Fjärde"', () => {
    const f = buildBusinessFindings(facts([
      { year: '2025', revenueTkr: 16000, employees: 10 },
      { year: '2024', revenueTkr: 14000, employees: 9 },
      { year: '2023', revenueTkr: 12000, employees: 8 },
      { year: '2022', revenueTkr: 10000, employees: 8 },
      { year: '2021', revenueTkr: 8000,  employees: 7 },
    ]));
    assert.match(f.find((x) => x.kind === 'trend').title, /^Fjärde växande året i rad/);
  });

  test('SKÄRPTA GRINDEN (grundarbeslut 2026-07-13, ersätter gårdagens): ankaret utelämnas på kort med ≥3 "om er"-rader', () => {
    const biz = [{ kind: 'business', title: 'bokslut' }, { kind: 'trend', title: 'kurvan' }];
    const dns = [{ kind: 'spoofing', title: 'lucka' }];
    const anchor = { kind: 'market', title: 'måttstocken' };
    const merged = mergeRevealFindings(biz, dns, anchor);
    assert.equal(merged.find((x) => x.kind === 'market'), undefined, 'kuratering är premium — starka kort bär sig själva');
    assert.equal(merged.length, 3);
  });

  test('…men ett tunt kort (2 "om er"-rader) räddas fortfarande av ankaret — infra räknas inte som substans', () => {
    const biz = [{ kind: 'business', title: 'bokslut' }];
    const dns = [{ kind: 'infra', title: 'Loopia' }, { kind: 'spoofing', title: 'lucka' }];
    const anchor = { kind: 'market', title: 'måttstocken' };
    const merged = mergeRevealFindings(biz, dns, anchor);
    assert.equal(merged[merged.length - 1].kind, 'market');
  });

  test('GRUNDAT-RADEN: ≥20 år fyrar med ålder och källa; ungt bolag → tystnad (trenden bär dem)', () => {
    const base = { provenance: 'bolagsverket', legalName: 'Kristianstads Måleri Aktiebolag', orgnr: '1', revenueTkr: 13976, employees: 14, year: '2025', history: [] };
    const NOW = new Date('2026-07-13');
    const old_ = buildBusinessFindings({ ...base, foundationYear: 1987 }, { now: NOW });
    const h = old_.find((x) => x.kind === 'heritage');
    assert.equal(h.title, 'Grundat 1987 — 39 år i verksamhet');
    assert.match(h.detail, /sällan omprövade/);
    assert.match(h.source, /grundandeår 1987/);
    assert.equal(buildBusinessFindings({ ...base, foundationYear: 2019 }, { now: NOW }).find((x) => x.kind === 'heritage'), undefined);
    assert.equal(buildBusinessFindings({ ...base, foundationYear: null }, { now: NOW }).find((x) => x.kind === 'heritage'), undefined);
  });
});

describe('business-intel · Issa-läxan: singularen (aldrig "1 anställda" i en premiumyta)', () => {
  test('1 anställd böjs rätt; flertal orört', () => {
    const one = buildBusinessFindings({ provenance: 'bolagsverket', legalName: 'Issa Group AB', orgnr: '1', revenueTkr: 9700, employees: 1, year: '2025', history: [] });
    assert.match(one[0].title, /1 anställd$/);
    const many = buildBusinessFindings({ provenance: 'bolagsverket', legalName: 'X AB', orgnr: '2', revenueTkr: 9700, employees: 14, year: '2025', history: [] });
    assert.match(many[0].title, /14 anställda$/);
  });
});

describe('business-intel · koncernkartan (Issa-menyn punkt 3 — sondbevisat kontrakt 2026-07-13)', () => {
  const base = { provenance: 'bolagsverket', legalName: 'X AB', orgnr: '1', revenueTkr: 13976, employees: 14, year: '2025', history: [] };
  test('KM-formen: dotterbolag med namngiven moder', () => {
    const f = buildBusinessFindings({ ...base, koncern: { companies: 2, subsidiaries: null, parentName: 'Ksd Paint Service AB' } });
    const kc = f.find((x) => x.kind === 'koncern');
    assert.equal(kc.title, 'Ni ingår i en koncern om 2 bolag');
    assert.match(kc.detail, /Moderbolag: Ksd Paint Service AB/);
    assert.match(kc.source, /2 bolag i strukturen/);
  });
  test('Lekia-formen: moder med dotterbolag', () => {
    const f = buildBusinessFindings({ ...base, koncern: { companies: 4, subsidiaries: 2, parentName: null } });
    const kc = f.find((x) => x.kind === 'koncern');
    assert.equal(kc.title, 'Er koncern rymmer 4 bolag');
    assert.match(kc.detail, /2 dotterbolag/);
  });
  test('fristående bolag (Issa-formen: corporateStructure null) → tystnad', () => {
    assert.equal(buildBusinessFindings({ ...base, koncern: null }).find((x) => x.kind === 'koncern'), undefined);
  });
});

describe('business-intel · taket (grundarbeslut 2026-07-13): max 5 rader, rankade — aldrig trunkerade', () => {
  const F = (kind) => ({ kind, title: kind });
  test('åtta kandidater → de fem starkaste, i rangordning', () => {
    const biz = [F('business'), F('trend'), F('heritage'), F('koncern'), F('cross')];
    const dns = [F('spoofing'), F('cert'), F('suppliers')];
    const out = mergeRevealFindings(biz, dns, null);
    assert.deepEqual(out.map((x) => x.kind), ['business', 'trend', 'cross', 'suppliers', 'spoofing']);
  });
  test('risken slår strukturen: spoofing vinner över koncern/heritage om sista platsen', () => {
    const out = mergeRevealFindings([F('business'), F('trend'), F('koncern'), F('heritage')], [F('spoofing'), F('cert')], null);
    assert.ok(out.find((x) => x.kind === 'spoofing'));
    assert.equal(out.find((x) => x.kind === 'cert'), undefined, 'cert faller när kortet är fullt');
    assert.equal(out.length, 5);
  });
  test('tunna kort påverkas inte: ankaret avslutar fortfarande (3 rader)', () => {
    const out = mergeRevealFindings([F('business')], [{ kind: 'infra', title: 'i' }], { kind: 'market', title: 'm' });
    assert.deepEqual(out.map((x) => x.kind), ['business', 'infra', 'market']);
  });
});

describe('IDENTITETSINVARIANTEN (grundarbeslut 2026-07-16): påhittade företag är omöjliga på typnivå', () => {
  test('bolagsfakta utan Bolagsverket-proveniens → TYSTNAD, oavsett hur kompletta de ser ut', () => {
    const smuggled = { legalName: 'Fantasibolaget AB', orgnr: '5565690087', revenueTkr: 99999, employees: 50, year: '2025', history: [] };
    assert.deepEqual(buildBusinessFindings(smuggled), []);
    assert.deepEqual(buildBusinessFindings({ ...smuggled, provenance: 'ai' }), []);
    assert.deepEqual(buildBusinessFindings({ ...smuggled, provenance: 'merinfo' }), []);
  });
  test('extractCompanyFacts är enda producenten av markören', () => {
    const nd = { props: { pageProps: { company: { legalName: 'Riktig AB', orgnr: '5565690087', revenue: '1000', employees: 5, companyAccountsLastUpdatedDate: '2025' } } } };
    assert.equal(extractCompanyFacts(nd).provenance, 'bolagsverket');
  });
});

describe('Adversariella svepet 2026-07-17 · läsbarhet + IDN + orgnr', () => {
  const B = { provenance: 'bolagsverket', legalName: 'X AB', orgnr: '1', revenueTkr: 500, employees: 1, year: '2025' };
  test('extremtillväxt uttrycks som multipel — "+4 999 900 %" är sant men oläsbart', () => {
    const f = buildBusinessFindings({ ...B, history: [
      { year: '2025', revenueTkr: 500 }, { year: '2024', revenueTkr: 100 }] }, { now: new Date('2026-07-17') });
    assert.equal(f.find((x) => x.kind === 'trend').title, 'Er omsättning 5-dubblade sig senaste bokslutsåret');
  });
  test('måttlig tillväxt behåller procentformen', () => {
    const f = buildBusinessFindings({ ...B, history: [
      { year: '2025', revenueTkr: 118 }, { year: '2024', revenueTkr: 100 }] }, { now: new Date('2026-07-17') });
    assert.match(f.find((x) => x.kind === 'trend').title, /växte 18 %/);
  });
  test('IDN-SLD: xn--mleri-sra.se avkodas till "måleri" i matchningsnamnrummet', () => {
    assert.equal(sldFromDomain('xn--mleri-mra.se'), 'måleri');
  });
  test('orgnr med em-streck hittas', () => {
    assert.deepEqual(extractOrgnrCandidates('Org.nr 556569\u20140087'), ['5565690087']);
  });
});

describe('Täckningsläxan 2026-07-17 · grinden v2 (ord-prefix) — Gleerups-klassen utan att öppna kan.se-hålet', () => {
  test('GLEERUPS: unikt ord-prefix → träff ("Gleerups Utbildning AB" för gleerups.se)', () => {
    const m = matchCompany('gleerups', [{ legalName: 'Gleerups Utbildning AB', orgnr: '5560proben' }]);
    assert.equal(m?.orgnr, '5560proben');
  });
  test('kan.se-fallet STÅR: "Kanmalmo AB" har ingen ordgräns vid "kan" → null', () => {
    assert.equal(matchCompany('kan', [{ legalName: 'Kanmalmo AB', orgnr: '1' }]), null);
  });
  test('kort sld (<6) får aldrig prefix-matcha: volvo → null även vid unik kandidat', () => {
    assert.equal(matchCompany('volvo', [{ legalName: 'Volvo Personvagnar AB', orgnr: '1' }]), null);
  });
  test('TVÅ prefix-kandidater → tystnad (tvetydighet vinner alltid)', () => {
    assert.equal(matchCompany('gleerups', [
      { legalName: 'Gleerups Utbildning AB', orgnr: '1' },
      { legalName: 'Gleerups Fastigheter AB', orgnr: '2' },
    ]), null);
  });
  test('EXAKT match vinner alltid över prefix (Netigate-fallet orört)', () => {
    const m = matchCompany('netigate', [
      { legalName: 'Netigate AB', orgnr: '5565760997' },
      { legalName: 'Netigate Holding AB', orgnr: '5590665658' },
    ]);
    assert.equal(m?.orgnr, '5565760997');
  });
  test('oraklet v2: titel UTAN bolagsform ger första segmentet ("Skånska Byggvaror – Uterum")', () => {
    assert.equal(extractSiteCompanyName('<title>Skånska Byggvaror – Uterum, fönster och dörrar</title>'), 'Skånska Byggvaror');
    assert.equal(extractSiteCompanyName('<title>Gleerups | Läromedel</title>'), 'Gleerups');
  });
});

describe('Skånska Byggvaror-läxan 2026-07-17 · entiteter + span-skanning + kontextkrav', () => {
  test('entitetskodad titel avkodas och namnet hittas VAR SOM HELST i titeln', () => {
    const name = extractSiteCompanyName(
      '<title>Byggvaror p&#229; n&#228;tet och i butik hos Sk&#229;nska Byggvaror</title>', 'skanskabyggvaror');
    assert.equal(name, 'Skånska Byggvaror');
  });
  test('span-grinden: ett spann som inte viker till domänen godkänns aldrig', () => {
    assert.equal(titleSpanMatchingSld('Byggvaror på nätet hos Skånska Byggvaror', 'gleerups'), null);
  });
  test('kontextkravet: Luhn-slumptal utan org.nr-markör räknas inte (besproud-fallet 1779373354)', () => {
    assert.deepEqual(extractOrgnrCandidates('Artikelnr 177937-3354 i lager'), []);
    assert.deepEqual(extractOrgnrCandidates('Org.nr 556569-0087'), ['5565690087']);
  });
});

describe('Storkoncern-gränsen (Båstadgruppen-läxan, grundarbeslut 2026-07-18)', () => {
  const base = { provenance: 'bolagsverket', legalName: 'Båstadgruppen AB', orgnr: '1', revenueTkr: 625500, employees: 77, year: '2024', history: [] };

  test('BÅSTADGRUPPEN ordagrant: 251 bolag → "Ni ägs av en större koncern", lilla-kroken FÖRBJUDEN', () => {
    const f = buildBusinessFindings({ ...base, koncern: { companies: 251, subsidiaries: null, parentName: 'Storskogen 3 Invest AB' } });
    const kc = f.find((x) => x.kind === 'koncern');
    assert.equal(kc.title, 'Ni ägs av en större koncern');
    assert.match(kc.detail, /Storskogen 3 Invest AB/);
    assert.match(kc.detail, /er juridiska enhet/);
    assert.doesNotMatch(kc.detail, /volymen förhandlas sällan som en/, 'lilla-gruppens krok är FALSK för en serieförvärvare');
    assert.match(kc.source, /251 bolag/);
  });

  test('gränsen är skarp: 24 bolag → lilla varianten, 25 → ägarvarianten', () => {
    const small = buildBusinessFindings({ ...base, koncern: { companies: 24, subsidiaries: null, parentName: 'X Holding AB' } });
    assert.match(small.find((x) => x.kind === 'koncern').title, /^Ni ingår i en koncern om 24 bolag$/);
    const big = buildBusinessFindings({ ...base, koncern: { companies: 25, subsidiaries: null, parentName: 'X Holding AB' } });
    assert.equal(big.find((x) => x.kind === 'koncern').title, 'Ni ägs av en större koncern');
  });

  test('stor moder utan parent (Storskogen själva skriver in sig) → neutral rad utan lilla-kroken', () => {
    const f = buildBusinessFindings({ ...base, koncern: { companies: 251, subsidiaries: 250, parentName: null } });
    const kc = f.find((x) => x.kind === 'koncern');
    assert.equal(kc.title, 'Er koncern rymmer 251 bolag');
    assert.doesNotMatch(kc.detail, /volymen förhandlas sällan som en/);
  });
});

describe('K-Fastigheter-läxan 2026-07-18 · sökform-vidgning (grinden avgör alltid)', () => {
  const nd = (companies) => JSON.stringify({ props: { pageProps: { hydrationData: { searchStore: { companies: { companies } } } } } });
  const company = (obj) => `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify({ props: { pageProps: { company: obj } } })}</script>`;

  test('K-FASTIGHETER-SKYDDET: vidgad form + ENDAST prefix-match → TYSTNAD (kunde inte bekräfta ägaren)', async () => {
    // Verkligt fall: hopvikt sök gav "Kfastigheter Sverige AB" (prefix), sajten bot-vägg-skyddad.
    // Ett prefix-fynd på en vidgad form utan bekräftelse är en gissning → tystnad, aldrig bokslut.
    const nd = (companies) => JSON.stringify({ props: { pageProps: { hydrationData: { searchStore: { companies: { companies } } } } } });
    const fetchImpl = (url) => {
      const u = decodeURIComponent(String(url));
      if (u.includes('/what/kfastigheter')) return Promise.resolve({ ok: true, text: () => Promise.resolve(
        `<script id="__NEXT_DATA__" type="application/json">${nd([{ legalName: 'Kfastigheter Sverige AB', orgnr: '5590000000' }])}</script>`) });
      return Promise.resolve({ ok: false, text: () => Promise.resolve('') });   // bot-vägg + tom rå-sök
    };
    assert.equal(await fetchBusinessFacts('k-fastigheter.se', { fetchImpl }), null);
  });

  test('men EXAKT-vikt-match på vidgad form släpps (namnet = domänen exakt, ingen gissning)', async () => {
    const calls = [];
    const fetchImpl = (url) => {
      const u = decodeURIComponent(String(url)); calls.push(u);
      if (u.includes('/what/k-fastigheter')) {                       // rå: allabolag tappar k-
        return Promise.resolve({ ok: true, text: () => Promise.resolve(
          `<script id="__NEXT_DATA__" type="application/json">${nd([{ legalName: 'ICA Fastigheter AB', orgnr: '5560338518' }])}</script>`) });
      }
      if (u.includes('/what/kfastigheter')) {                        // hopvikt: rätt bolag surfacear
        return Promise.resolve({ ok: true, text: () => Promise.resolve(
          `<script id="__NEXT_DATA__" type="application/json">${nd([{ legalName: 'K-Fastigheter AB', orgnr: '5590000000' }])}</script>`) });
      }
      if (u.includes('allabolag.se/5590000000')) {
        return Promise.resolve({ ok: true, text: () => Promise.resolve(company({
          legalName: 'K-Fastigheter AB', orgnr: '5590000000', revenue: '2500000', employees: 300, companyAccountsLastUpdatedDate: '2024' })) });
      }
      return Promise.resolve({ ok: false, text: () => Promise.resolve('') });   // bot-vägg på sajten
    };
    const facts = await fetchBusinessFacts('k-fastigheter.se', { fetchImpl });
    assert.equal(facts?.legalName, 'K-Fastigheter AB');
    assert.ok(calls.some((u) => u.includes('/what/kfastigheter')), 'hopvikta sökformen ska ha provats');
  });
});

describe('Särskrivnings-klassen 2026-07-20 (sondbevisad: nordlock funkar, webmanuals tiger korrekt)', () => {
  test('NORD-LOCK: bindestrecket viker bort -> Nord-Lock AB exakt-matchar nordlock, syskon utan effekt', () => {
    const m = matchCompany('nordlock', [
      { legalName: 'Nordlo Syd AB', orgnr: '5564720208' },
      { legalName: 'Nord-Lock International AB', orgnr: '5566105739' },
      { legalName: 'Nord-Lock AB', orgnr: '5561371054' },
    ]);
    assert.equal(m?.orgnr, '5561371054');
  });

  test('WEB MANUALS: fem syskonbolag, inget rent "Web Manuals AB" -> TYSTNAD (aldrig fel syskon)', () => {
    const siblings = ['Sweden', 'International', 'Technologies', 'Americas', 'Innovation 1']
      .map((suf, i) => ({ legalName: `Web Manuals ${suf} AB`, orgnr: `55600000${i}0` }));
    assert.equal(matchCompany('webmanuals', siblings), null);
  });

  test('oraklet bryter inte namn pa inre bindestreck (All-in-One / Nord-Lock)', () => {
    // span-scan hittar "Web Manuals" trots All-in-One i titeln
    assert.equal(extractSiteCompanyName('<title>All-in-One Aviation | Web Manuals</title>', 'webmanuals'), 'Web Manuals');
    // first-segment-fallbacken bryter INTE "All-in-One" till "All" (bindestreck ur delaruttrycket)
    assert.equal(extractSiteCompanyName('<title>All-in-One System</title>'), 'All-in-One System');
  });
});

// ── BLÄNDARENS KANDIDATER — igenkänning, aldrig knuff (grundarbeslut 2026-08-07) ───────────
// Fixturen är RIKTIG: exakt de tre Avida-posterna ur sökresultatet, med de fältvägar sonden
// bevisade (ops/probe-kandidatfalt.txt 2026-08-07 — location.municipality, currentIndustry.name,
// ifyllnadsgrad 25/25). Läxan som låses: "närmast er domän" satt på Avida AB (Företagsutveckling,
// Hägersten) medan avida.se rimligen tillhör Avida Bank AB (publ) — vår egen fotnot avfärdade
// samtidigt just den signalen. En knuff åt fel håll är identitetsinvariantens felläge, bara
// utfört av kunden istället för av oss.
describe('Bländaren · kandidater bär igenkänning, inte vägvisning (Avida-läxan 2026-08-07)', () => {
  const AVIDA = [
    { legalName: 'Avida Bank AB (publ)', orgnr: '5562309004',
      location: { municipality: 'Stockholm' }, currentIndustry: { name: 'Finansbolag, finansiella tjänster' } },
    { legalName: 'AVIDA ASSISTANS & OMSORG I SVERIGE AB', orgnr: '5591653182',
      location: { municipality: 'Örebro' }, currentIndustry: { name: 'Omvårdnad och omsorg' } },
    { legalName: 'Avida AB', orgnr: '5590177068',
      location: { municipality: 'Stockholm' }, currentIndustry: { name: 'Företagsutveckling' } },
    { legalName: 'Bravida Sverige AB', orgnr: '5561974188',
      location: { municipality: 'Stockholm' }, currentIndustry: { name: 'Byggmästare' } },
  ];

  test('alla tre Avida-posterna surfacear — Bravida (infix, inte prefix) gör det inte', () => {
    const k = identityCandidates('avida', AVIDA);
    assert.deepEqual(k.map((x) => x.orgnr), ['5562309004', '5591653182', '5590177068']);
  });

  test('varje kandidat bär ort och bransch ur registerposten', () => {
    const k = identityCandidates('avida', AVIDA);
    assert.deepEqual(k[0], { orgnr: '5562309004', legalName: 'Avida Bank AB (publ)',
      ort: 'Stockholm', bransch: 'Finansbolag, finansiella tjänster' });
    assert.ok(k.every((x) => x.ort && x.bransch), 'ingen kandidat får sakna igenkänningsfälten');
  });

  test('INGEN kandidat bär ett vägvisar-märke — stavningslikhet får aldrig peka igen', () => {
    const k = identityCandidates('avida', AVIDA);
    for (const x of k) {
      assert.equal(x.closest, undefined, 'closest/"närmast er domän" är avskaffad — den pekade fel på avida.se');
      assert.deepEqual(Object.keys(x).sort(), ['bransch', 'legalName', 'orgnr', 'ort'],
        'kandidatens form är låst: inga smygande rangordningsfält');
    }
  });

  test('INGA tal i kandidaten — en siffra inbjuder till "stämmer den?", ort och bransch till "det är vi"', () => {
    const medTal = [{ legalName: 'Avida AB', orgnr: '5590177068', revenue: '1900', employees: '1',
      location: { municipality: 'Stockholm' }, currentIndustry: { name: 'Företagsutveckling' } }];
    const [k] = identityCandidates('avida', medTal);
    assert.equal(k.revenue, undefined);
    assert.equal(k.employees, undefined);
  });

  test('registrets ordning bevaras — ingen sortering på storlek (Geminis gissning som förval)', () => {
    const bakvant = [AVIDA[2], AVIDA[0], AVIDA[1]];
    assert.deepEqual(identityCandidates('avida', bakvant).map((x) => x.orgnr),
      ['5590177068', '5562309004', '5591653182']);
  });

  test('saknad ort/bransch blir null, aldrig en tom sträng eller en gissning', () => {
    const [k] = identityCandidates('avida', [{ legalName: 'Avida AB', orgnr: '5590177068' }]);
    assert.equal(k.ort, null);
    assert.equal(k.bransch, null);
  });
});

// ── LICENSSPANNET · KORTETS FÖRSTA KRONA (2026-08-12) ────────────────────────────────────────
// Identitetskortet blev en dossier med fem rader och noll kronor. Den här raden är den enda
// pengarad som går att säga innan en faktura delats utan att gissa: två VERIFIERADE fakta
// multiplicerade — bolagets egna anställdatal och Microsofts publika listpriser.
//
// Testerna vaktar gränsen den lever på: den får aldrig påstå något om vad kunden BETALAR, aldrig
// födas ur fakta utan Bolagsverket-proveniens, och varje tal ska gå att räkna hem med miniräknare.
describe('buildLicensspannFinding · ett spann, aldrig ett påstående om fakturan', () => {
  const TIERS = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
  const FACTS = { provenance: 'bolagsverket', employees: 5227, legalName: 'Skanska Sverige AB', year: 2025 };

  test('talet går att räkna hem ur källan', () => {
    const f = buildLicensspannFinding(FACTS, TIERS);
    // 641,18 − 66,91 = 574,27 kr/mån · ×12 = 6 891 kr/anställd/år · ×5 227 = 36 019 257 kr/år
    // OBS \s, inte mellanslag: sv-SE-formatteringen ger HÅRT mellanslag (U+00A0) som
    // tusentalsavgränsare. Det är rätt typografi — ett tal ska aldrig brytas mitt itu — men ett
    // test som matchar på vanligt mellanslag faller på ett fel som inte finns.
    assert.match(f.title, /36\s019\s257 kr\/år/);
    assert.match(f.detail, /66,91–641,18 kr per användare och månad/);
    assert.match(f.detail, /6\s891 kr per anställd och år/);
  });

  test('påstår ALDRIG vad kunden betalar eller sparar', () => {
    const f = buildLicensspannFinding(FACTS, TIERS);
    for (const forbjudet of [/ni betalar/i, /ni överbetalar/i, /ni kan spara/i, /besparing/i]) {
      assert.doesNotMatch(`${f.title} ${f.detail}`, forbjudet,
        'spannet är ett faktum om prislistan — aldrig ett påstående om fakturan');
    }
    assert.match(f.detail, /Vi påstår inget om er nivå/);
  });

  test('inget om kundens interna beslut — det kan vi inte belägga', () => {
    const f = buildLicensspannFinding(FACTS, TIERS);
    assert.doesNotMatch(f.detail, /valet gjordes|någon som inte såg|utan att veta/i,
      'en CFO som valde medvetet ska aldrig kunna falsifiera vår text');
  });

  test('identitetsinvarianten gäller: utan Bolagsverket-proveniens ingen rad', () => {
    assert.equal(buildLicensspannFinding({ employees: 500 }, TIERS), null);
    assert.equal(buildLicensspannFinding({ provenance: 'gissning', employees: 500 }, TIERS), null);
  });

  test('utan anställdatal, med för få anställda, eller utan spann → tystnad', () => {
    assert.equal(buildLicensspannFinding({ ...FACTS, employees: null }, TIERS), null);
    assert.equal(buildLicensspannFinding({ ...FACTS, employees: 4 }, TIERS), null);
    assert.equal(buildLicensspannFinding(FACTS, { bara: { currency: 'SEK', msrpAnnual: 100 } }), null);
  });

  test('källan namnger BÅDA leden — ett tal utan sina två ursprung är inte källbelagt', () => {
    const f = buildLicensspannFinding(FACTS, TIERS);
    assert.match(f.source, /Microsofts publika listpriser/);
    assert.match(f.source, /anställdatal ur bokslutet/);
    assert.match(f.source, /verifierade \d{4}-\d{2}-\d{2}/);
  });
});
