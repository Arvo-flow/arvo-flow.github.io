// tests/business-intel.mjs — låser affärshjärnan i avslöjandet.
// Fixturerna SPEGLAR VERKLIGHETEN ur sond v3 (ops/probe-business-intel.txt 2026-07-01):
// sökets companies[]-form, bolagssidans company-form, Netigate-tvetydigheten, kan.se-fallet.
// Integritetskärnan: fel bolags omsättning får ALDRIG visas — grinden är exakt-match, exakt EN.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  sldFromDomain, normalizeCompanyName, matchCompany, normalizeOrgnr, foldToDomainAlphabet,
  extractNextData, extractSearchCompanies, extractCompanyFacts,
  buildBusinessFindings, mergeRevealFindings,
  luhnValidOrgnr, extractOrgnrCandidates, fetchOrgnrFromWebsite, fetchBusinessFacts,
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
    assert.deepEqual(extractOrgnrCandidates('VAT: SE556569008701'), ['5565690087']);
  });

  test('personnummer/datum/telefon fälls: månadsposition < 20 eller fel Luhn', () => {
    assert.deepEqual(extractOrgnrCandidates('Född 851224-1234'), []);          // månad 12 < 20
    assert.deepEqual(extractOrgnrCandidates('Tel 040-123 456, 070-1234567'), []);
    assert.deepEqual(extractOrgnrCandidates('Beställning 202607-1211'), []);   // fel Luhn
  });

  test('dubbletter dedupas; TVÅ olika nummer på sajten → tvetydigt (hanteras i fetch-lagret)', () => {
    const one = extractOrgnrCandidates('556569-0087 … samt org.nr 5565690087 igen');
    assert.deepEqual(one, ['5565690087']);
    const two = extractOrgnrCandidates('Vi: 556569-0087. Moderbolag: 559066-5658.');
    assert.equal(two.length, 2);
  });

  test('fetchOrgnrFromWebsite: ETT unikt nummer → orgnr, TVÅ olika → null, ingen sida → null', async () => {
    const page = (body) => Promise.resolve({ ok: true, text: () => Promise.resolve(body) });
    const one = await fetchOrgnrFromWebsite('x.se', { fetchImpl: () => page('Org.nr 556569-0087') });
    assert.equal(one, '5565690087');
    const two = await fetchOrgnrFromWebsite('x.se', {
      fetchImpl: () => page('556569-0087 och 559066-5658'),
    });
    assert.equal(two, null);
    const none = await fetchOrgnrFromWebsite('x.se', { fetchImpl: () => Promise.reject(new Error('nät')) });
    assert.equal(none, null);
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
  test('bolagsfakta extraheras: revenue i TKR, employees, år', () => {
    const f = extractCompanyFacts(extractNextData(companyHtml));
    assert.deepEqual(f, { legalName: 'Apendo AB', orgnr: '5564374840', revenueTkr: 52874, employees: 30, year: '2025' });
  });
  test('ogiltiga fakta → null (revenue saknas / employees orimligt)', () => {
    const bad = (company) => extractCompanyFacts({ props: { pageProps: { company } } });
    assert.equal(bad({ revenue: null, employees: '30', companyAccountsLastUpdatedDate: '2025' }), null);
    assert.equal(bad({ revenue: '100', employees: '0', companyAccountsLastUpdatedDate: '2025' }), null);
    assert.equal(bad({ revenue: '100', employees: '30', companyAccountsLastUpdatedDate: 'okänt' }), null);
  });
});

describe('business-intel · fynden (regel 2 + 3: kodräknat, källa på varje rad)', () => {
  const facts = { legalName: 'Apendo AB', orgnr: '5564374840', revenueTkr: 52874, employees: 30, year: '2025' };

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
    assert.match(biz.source, /Apendo AB/);
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
  test('utan ankare (prisboken onåbar) → bryggan står kvar som sista utväg', () => {
    const thinDns = [{ kind: 'bridge', title: 'brygga', floor: true }];
    const merged = mergeRevealFindings([], thinDns, null);
    assert.ok(merged.find((f) => f.floor));
  });
});
