// tests/business-intel.mjs — låser affärshjärnan i avslöjandet.
// Fixturerna SPEGLAR VERKLIGHETEN ur sond v3 (ops/probe-business-intel.txt 2026-07-01):
// sökets companies[]-form, bolagssidans company-form, Netigate-tvetydigheten, kan.se-fallet.
// Integritetskärnan: fel bolags omsättning får ALDRIG visas — grinden är exakt-match, exakt EN.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  sldFromDomain, normalizeCompanyName, matchCompany,
  extractNextData, extractSearchCompanies, extractCompanyFacts,
  buildBusinessFindings, mergeRevealFindings,
} from '../lib/business-intel.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

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
  // Microsofts verifierade Business-planer (BRANCHINDEX-form): kr/anv/MÅN på årsavtal, microsoft.com
  const msTiers = { tiers: [
    { label: 'Business Basic', monthly: 57.40 },
    { label: 'Business Standard', monthly: 119.48 },
    { label: 'Business Premium', monthly: 210.29 },
  ], lastVerified: '2026-06-14' };

  test('bokslutsfyndet: mkr-format, år, källa Bolagsverket — ALDRIG profit i copy', () => {
    const f = buildBusinessFindings(facts, { msTiers });
    const biz = f.find((x) => x.kind === 'business');
    assert.ok(biz);
    assert.match(biz.title, /52,9 mkr/);
    assert.match(biz.title, /30 anställda/);
    assert.match(biz.title, /2025/);
    assert.match(biz.source, /Bolagsverket/);
    assert.ok(!/profit|resultat/i.test(biz.title + biz.detail), 'profit-fältet får aldrig nå copy (oklar etikett)');
  });

  test('koncern-lärdomen: fyndet NAMNGER den juridiska enheten (detail + källa)', () => {
    const f = buildBusinessFindings(facts, { msTiers });
    const biz = f.find((x) => x.kind === 'business');
    assert.match(biz.detail, /Gäller Apendo AB/);          // exakt vilken enhet siffrorna gäller
    assert.match(biz.source, /Apendo AB/);
  });
  test('costline: verifierat SPANN över Business-planerna — aldrig en antagen plan (grundarlärdom 2026-07-01)', () => {
    const f = buildBusinessFindings(facts, { msTiers });
    const c = f.find((x) => x.kind === 'costline');
    assert.ok(c);
    const sp = (s) => s.replace(/[  ]/g, ' ');   // sv-SE-format använder no-break space
    assert.match(sp(c.title), /20 664–75 704/);            // 30×57,40×12=20 664 · 30×210,29×12=75 704,40
    assert.match(sp(c.detail), /Business Basic 57,40 · Business Standard 119,48 · Business Premium 210,29/);
    assert.match(c.detail, /årsavtal/);
    assert.match(c.title, /beroende på plan/);
    assert.match(c.detail, /ser vi på er första faktura/);
    assert.match(c.source, /microsoft\.com, 2026-06-14/);
  });
  test('utan planer (eller <2) → bara bokslutsfyndet · utan fakta → tomt', () => {
    assert.equal(buildBusinessFindings(facts, {}).length, 1);
    assert.equal(buildBusinessFindings(facts, { msTiers: { tiers: [{ label: 'X', monthly: 100 }] } }).length, 1);
    assert.deepEqual(buildBusinessFindings(null, { msTiers }), []);
  });
  test('REGRESSIONSLÅS: "golvpris"-etiketten (p25 felmärkt som verifierad) får ALDRIG återkomma', () => {
    const f = buildBusinessFindings(facts, { msTiers });
    const allText = f.map((x) => `${x.title} ${x.detail} ${x.source}`).join(' ').replace(/\u00A0|\u202F/g, ' ');
    assert.ok(!/golvpris/i.test(allText), 'p25/golvpris-språk i costline = regel 3-brott (fel proveniens)');
    assert.ok(!/1 ?704/.test(allText), 'p25-talet 1704 får inte nå copy som pris');
    const c = f.find((x) => x.kind === 'costline');
    assert.ok(!/från ~/.test(c.title), 'ett "från"-golv byggt på EN antagen plan är inte ett sant golv (Basic är billigare)');
    assert.match(c.title, /–/);   // spann, inte punkt: vi antar aldrig kundens plan
  });
  test('MASKINVAKT: BRANCHINDEX bär alla TRE Business-planerna (spannet costline vilar på)', () => {
    const lt = BRANCHINDEX['saas-productivity'].licenseTierBenchmarks;
    for (const k of ['business-basic', 'business-standard', 'business-premium']) {
      assert.ok(lt[k]?.msrpAnnual > 0, `${k}.msrpAnnual saknas — spannet bruten`);
      assert.equal(lt[k].source, 'microsoft.com');
      assert.ok(lt[k].lastVerified, `${k}.lastVerified saknas — priset kan inte källdateras`);
    }
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
});
