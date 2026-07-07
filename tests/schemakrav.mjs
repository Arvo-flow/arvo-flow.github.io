// tests/schemakrav.mjs — Schemakravet B2 (lib/schema-guard.js): stenhård gränsvakt
// på AI-utfall. Tre lås:
//
//   1. SCHEMA-LINTEN: alla fyra produktionsscheman (extract, categorize, recommend,
//      extract-contract) är själva friska — required ⊆ properties, kända typ-
//      deklarationer, icke-tomma enums. Ett trasigt schema gör vakten blind.
//   2. TÄNDERNA: varje brottsklass (fel typ, enum-brott, saknat obligatoriskt fält,
//      icke-finit tal, decimal där heltal krävs, okänt fält, min/max) fångas med
//      exakt path — mot de RIKTIGA schemana, aldrig testdubbletter (regel 1).
//   3. LÄGENA: SKUGGA släpper igenom (loggar), ARMERAD avvisar, vaktens egen
//      krasch är fail-open — vakten får aldrig själv fälla en frisk analys.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { judgeSchema, lintToolSchema, guardToolPayload } from '../lib/schema-guard.js';
import { EXTRACT_TOOL } from '../agents/test-invoice/extract.js';
import { CATEGORIZE_TOOL } from '../agents/categorizer/prompt.js';
import { RECOMMEND_TOOL } from '../agents/recommender/prompt.js';
import { CONTRACT_TOOL } from '../agents/contract/extract-contract.js';

const ALL_TOOLS = [EXTRACT_TOOL, CATEGORIZE_TOOL, RECOMMEND_TOOL, CONTRACT_TOOL];

// ── Giltiga referens-payloads (verklighetstrogna, minsta kompletta) ───────────
const validExtract = {
  supplier: 'Telia Sverige AB',
  date: '2026-06-15',
  description: 'Mobilabonnemang juni 2026',
  billingPeriod: 'monthly',
  lineItems: [
    {
      description: 'Telia Jobbmobil M (5 st)', amount: 1745,
      type: 'recurring_subscription', quantity: 5, unitPrice: 349,
      is_addon: false, addon_type: null, is_prorata: false,
    },
  ],
  confidenceScore: 0.95,
  confidenceNotes: null,
  outOfScope: false,
  outOfScopeReason: null,
  projectedRecurringAmount: 1745,
  seatCount: 5,
};

const validCategorize = {
  category: 'mobil',
  subType: '',
  normalizedSupplier: 'Telia',
  confidence: 0.95,
  reasoning: 'Jobbmobil-abonnemang på samtliga rader.',
};

const validRecommend = {
  recommendationType: 'no_action',
  optimizationSaving: null,
  shouldSwitch: false,
  suggestedSupplier: null,
  suggestedAnnualCost: null,
  savingPerYear: 0,
  overpaymentPercent: -3,
  confidence: 'high',
  vipQueue: false,
  reasoning: 'Kunden ligger under median — inget byte motiverat.',
  switchSteps: [],
};

const validContract = {
  isContract: true,
  supplier: 'Bahnhof AB',
  avtalsstart: '2025-01-15',
  avtalstidMan: 12,
  uppsagningstidMan: 3,
  forlangningMan: 3,
  citat: {
    avtalsstart: 'leveransdag 2025-01-15',
    avtalstidMan: 'avtalstid tolv (12) månader',
    uppsagningstidMan: 'uppsägningstid tre (3) månader',
    forlangningMan: 'förlängs med tre (3) månader i taget',
  },
  confidence: 0.9,
};

// ── 1. Schema-linten ──────────────────────────────────────────────────────────
describe('Schemakravet · linten — produktionsschemana är friska', () => {
  for (const tool of ALL_TOOLS) {
    test(`${tool.name}: lintToolSchema → 0 problem`, () => {
      assert.deepEqual(lintToolSchema(tool), []);
    });
  }
  test('trasigt schema fångas: required-fält utanför properties', () => {
    const broken = { name: 'x', input_schema: { type: 'object', properties: { a: { type: 'string' } }, required: ['a', 'spöke'] } };
    const problems = lintToolSchema(broken);
    assert.equal(problems.length, 1);
    assert.match(problems[0], /spöke/);
  });
  test('trasigt schema fångas: okänd typdeklaration + tom enum', () => {
    const broken = { name: 'x', input_schema: { type: 'object', properties: { a: { type: 'sträng' }, b: { type: 'string', enum: [] } } } };
    const problems = lintToolSchema(broken);
    assert.equal(problems.length, 2);
  });
});

// ── 2. Giltiga payloads passerar (falsklarms-golvet) ─────────────────────────
describe('Schemakravet · giltiga AI-utfall passerar rent', () => {
  const cases = [
    [EXTRACT_TOOL, validExtract],
    [CATEGORIZE_TOOL, validCategorize],
    [RECOMMEND_TOOL, validRecommend],
    [CONTRACT_TOOL, validContract],
  ];
  for (const [tool, payload] of cases) {
    test(`${tool.name}: 0 brott`, () => {
      assert.deepEqual(judgeSchema(tool.input_schema, payload), []);
    });
  }
});

// ── 3. Tänderna — varje brottsklass fångas med exakt path ────────────────────
describe('Schemakravet · tänderna (mot riktiga scheman)', () => {
  test('extract: belopp som STRÄNG fångas (fel_typ på radnivå)', () => {
    const p = structuredClone(validExtract);
    p.lineItems[0].amount = '1745';
    const v = judgeSchema(EXTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.lineItems[0].amount');
    assert.match(v[0].reason, /fel_typ/);
  });

  test('extract: decimalbelopp där heltal krävs fångas', () => {
    const p = structuredClone(validExtract);
    p.lineItems[0].amount = 1745.5;
    const v = judgeSchema(EXTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.match(v[0].reason, /fel_typ.*integer/);
  });

  test('extract: NaN fångas som icke-finit', () => {
    const p = structuredClone(validExtract);
    p.confidenceScore = NaN;
    const v = judgeSchema(EXTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.confidenceScore');
    assert.match(v[0].reason, /icke-finit/);
  });

  test('extract: okänd addon_type fångas (enum_brott)', () => {
    const p = structuredClone(validExtract);
    p.lineItems[0].addon_type = 'mystery_addon';
    const v = judgeSchema(EXTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.lineItems[0].addon_type');
    assert.match(v[0].reason, /enum_brott/);
  });

  test('extract: saknat obligatoriskt radfält (is_prorata) fångas', () => {
    const p = structuredClone(validExtract);
    delete p.lineItems[0].is_prorata;
    const v = judgeSchema(EXTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.lineItems[0].is_prorata');
    assert.equal(v[0].reason, 'saknat_obligatoriskt_fält');
  });

  test('extract: modellpåhittat fält fångas (okänt_fält)', () => {
    const p = structuredClone(validExtract);
    p.hittepåFält = 'drift';
    const v = judgeSchema(EXTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.hittepåFält');
    assert.equal(v[0].reason, 'okänt_fält');
  });

  test('categorize: okänd kategori fångas (enum_brott)', () => {
    const p = { ...validCategorize, category: 'kryptovaluta' };
    const v = judgeSchema(CATEGORIZE_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.category');
    assert.match(v[0].reason, /enum_brott/);
  });

  test('categorize: confidence 1.5 fångas (över_maximum)', () => {
    const p = { ...validCategorize, confidence: 1.5 };
    const v = judgeSchema(CATEGORIZE_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.match(v[0].reason, /över_maximum/);
  });

  test('recommend: okänd confidence-nivå fångas (enum_brott)', () => {
    const p = { ...validRecommend, confidence: 'higher' };
    const v = judgeSchema(RECOMMEND_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.confidence');
  });

  test('recommend: tal i switchSteps fångas (fel_typ i array-item)', () => {
    const p = { ...validRecommend, switchSteps: ['Säg upp avtalet', 42] };
    const v = judgeSchema(RECOMMEND_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.switchSteps[1]');
  });

  test('contract: avtalstidMan som sträng fångas — acceptansgrindens förförsvar', () => {
    const p = structuredClone(validContract);
    p.avtalstidMan = '12 månader';
    const v = judgeSchema(CONTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.avtalstidMan');
  });

  test('contract: saknat citat-fält fångas (proveniens är obligatorisk)', () => {
    const p = structuredClone(validContract);
    delete p.citat.forlangningMan;
    const v = judgeSchema(CONTRACT_TOOL.input_schema, p);
    assert.equal(v.length, 1);
    assert.equal(v[0].path, '$.citat.forlangningMan');
    assert.equal(v[0].reason, 'saknat_obligatoriskt_fält');
  });
});

// ── 4. Lägena — SKUGGA / ARMERAD / fail-open ─────────────────────────────────
describe('Schemakravet · guardToolPayload-lägena', () => {
  const brokenPayload = { ...validCategorize, category: 'kryptovaluta' };

  test('SKUGGA (default): brott loggas men släpps igenom (ok=true)', () => {
    const r = guardToolPayload({ agent: 'test', tool: CATEGORIZE_TOOL, payload: brokenPayload, enforce: false });
    assert.equal(r.ok, true);
    assert.equal(r.violations.length, 1);
  });

  test('ARMERAD: brott avvisas (ok=false)', () => {
    const r = guardToolPayload({ agent: 'test', tool: CATEGORIZE_TOOL, payload: brokenPayload, enforce: true });
    assert.equal(r.ok, false);
    assert.equal(r.violations.length, 1);
  });

  test('ARMERAD + giltig payload: passerar (ok=true, 0 brott)', () => {
    const r = guardToolPayload({ agent: 'test', tool: CATEGORIZE_TOOL, payload: validCategorize, enforce: true });
    assert.equal(r.ok, true);
    assert.equal(r.violations.length, 0);
  });

  test('fail-open: vaktens egen krasch fäller aldrig analysen', () => {
    const r = guardToolPayload({ agent: 'test', tool: null, payload: {}, enforce: true });
    assert.equal(r.ok, true);
    assert.deepEqual(r.violations, []);
  });
});
