// tests/avtal-fallor.mjs — E2E-provets fem fällor (grundarens skarpa testavtal 2026-07-08),
// låsta för alltid (regel 7). Varje fall är HANDLÄST ur avtalsdokumentet och HANDRÄKNAT
// (facit i kommentaren). Före vässningen klarade motorn 1 av 5 — dessa tester garanterar
// att ingen av fällorna någonsin öppnas igen:
//
//   FÄLLA 1 (Telia):   villkorsbokens tillsvidare-default får inte köra över avtalets
//                      uttryckliga fasta förlängning (modellprioriteten).
//   FÄLLA 2 (Bahnhof): 3+3 rullande (uppsägningstid == periodlängd) är LOGISK — den
//                      klassiska svenska fällan, inte ett ogiltigt avtal.
//   FÄLLA 3 (Fortnox): uppsägningstid i DAGAR räknas i dagar — 30 dagar ≠ 1 månad.
//   FÄLLA 4 (GleSYS):  äkta tills vidare (ingen initial bindning) ger rolling-utfall.
//   FÄLLA 5 (Nordic):  lång bindning + lång varsel + stor förlängning räknas rakt.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  acceptExtractedContract, villkorForSupplier, resolveContractRules, computeContractOutcome,
  buildAvtalView,
} from '../lib/contract-intel.js';

// Frusen "idag" = dagen avtalen lämnades in. Facit är handräknat mot detta datum.
const TODAY = new Date('2026-07-08T12:00:00Z');

function runChain(supplier, extracted) {
  const acc = acceptExtractedContract(extracted, { today: TODAY });
  if (!acc.ok) return { rejected: acc.reason };
  const rules = resolveContractRules(extracted, villkorForSupplier(supplier));
  return computeContractOutcome(acc.fields, rules, { today: TODAY });
}

describe('FÄLLA 1 · Telia Touchpoint — 24 mån + auto-förlängning 12 mån (tecknat 2024-07-01)', () => {
  // Fönstret stängde 2026-04-01 → avtalet förnyades 2026-07-01. Bunden till 2027-07-01,
  // nästa deadline 2027-04-01. Avtalets fasta förlängning slår villkorsbokens tillsvidare.
  const out = runChain('Telia Sverige AB', {
    avtalsstart: '2024-07-01', avtalstidMan: 24, uppsagningstidMan: 3, forlangningMan: 12,
  });
  test('modellprioriteten: fast förnyelse, inte tillsvidare-rolling', () => {
    assert.equal(out.status, 'window-open');
  });
  test('rullade exakt en förnyelse → bunden till 2027-07-01', () => {
    assert.equal(out.renewals, 1);
    assert.equal(out.currentPeriodEnd, '2027-07-01');
  });
  test('nästa deadline 2027-04-01, regler ur avtalet', () => {
    assert.equal(out.deadline, '2027-04-01');
    assert.equal(out.regelKalla, 'avtalet');
  });
});

describe('FÄLLA 2 · Bahnhof fiber — rullande 3+3 (tecknat 2025-01-15)', () => {
  // Perioder om 3 mån, uppsägning 3 mån före nästa periodstart. Idag 2026-07-08:
  // deadline 2026-07-15 (7 dagar!), annars bunden till 2026-10-15. 6 förnyelser rullade.
  const out = runChain('Bahnhof AB', {
    avtalsstart: '2025-01-15', avtalstidMan: 3, uppsagningstidMan: 3, forlangningMan: 3,
  });
  test('3+3 accepteras — den klassiska fällan är logisk, inte ogiltig', () => {
    assert.equal(out.rejected, undefined);
  });
  test('AKUT fönster: deadline 2026-07-15, 7 dagar kvar', () => {
    assert.equal(out.status, 'window-open');
    assert.equal(out.deadline, '2026-07-15');
    assert.equal(out.daysToDeadline, 7);
  });
  test('missas fönstret är kunden bunden till 2026-10-15', () => {
    assert.equal(out.currentPeriodEnd, '2026-10-15');
    assert.equal(out.renewals, 6);
  });
});

describe('FÄLLA 3 · Fortnox årslicens — uppsägning trettio (30) DAGAR (aktiverad 2025-08-15)', () => {
  const out = runChain('Fortnox AB', {
    avtalsstart: '2025-08-15', avtalstidMan: 12, uppsagningstidDagar: 30, forlangningMan: 12,
  });
  test('deadline räknas i dagar: 2026-08-15 − 30 dagar = 2026-07-16 (INTE månadsklampat 07-15)', () => {
    assert.equal(out.deadline, '2026-07-16');
    assert.equal(out.daysToDeadline, 8);
  });
  test('årsperioden löper till 2026-08-15, fönstret öppet', () => {
    assert.equal(out.currentPeriodEnd, '2026-08-15');
    assert.equal(out.status, 'window-open');
    assert.equal(out.renewals, 0);
  });
  test('dagar och månader samtidigt = tvetydigt → manuell', () => {
    const r = acceptExtractedContract(
      { avtalsstart: '2025-08-15', avtalstidMan: 12, uppsagningstidMan: 1, uppsagningstidDagar: 30 },
      { today: TODAY },
    );
    assert.equal(r.ok, false);
    assert.match(r.reason, /tvetydig/);
  });
});

describe('FÄLLA 4 · GleSYS VPS — äkta tills vidare, 1 mån ömsesidig uppsägning (från 2025-11-01)', () => {
  const out = runChain('GleSYS AB', {
    avtalsstart: '2025-11-01', avtalstidMan: null, uppsagningstidMan: 1, forlangningMan: null,
  });
  test('accepteras utan initial bindning → rolling (ingen deadline att missa)', () => {
    assert.equal(out.rejected, undefined);
    assert.equal(out.status, 'rolling');
    assert.equal(out.deadline, null);
  });
  test('tidigaste utträde = idag + varslet (2026-08-08) — varnar tidigt, aldrig sent', () => {
    assert.equal(out.currentPeriodEnd, '2026-08-08');
  });
  test('tills vidare HELT utan uppsägningstid → ärligt avslag (inget att räkna på)', () => {
    const r = acceptExtractedContract({ avtalsstart: '2025-11-01', avtalstidMan: null }, { today: TODAY });
    assert.equal(r.ok, false);
  });
});

describe('FÄLLA 5 · Nordic Managed IT — 36 mån, 6 mån varsel, +24 mån förlängning (2025-03-01)', () => {
  const out = runChain('Nordic Managed IT Services AB', {
    avtalsstart: '2025-03-01', avtalstidMan: 36, uppsagningstidMan: 6, forlangningMan: 24,
  });
  test('bunden till 2028-03-01, deadline 2027-09-01, inga förnyelser ännu', () => {
    assert.equal(out.status, 'window-open');
    assert.equal(out.currentPeriodEnd, '2028-03-01');
    assert.equal(out.deadline, '2027-09-01');
    assert.equal(out.renewals, 0);
  });
  test('okänd leverantör → regler ur avtalet, aldrig en gissad bok-post', () => {
    assert.equal(villkorForSupplier('Nordic Managed IT Services AB'), null);
    assert.equal(out.regelKalla, 'avtalet');
  });
});

// ── SMOKE: hela extractContract-svarsvägen offline (mock-klient) ─────────────────
// E2E-läxan 2026-07-08: schemakravets guard-anrop saknade IMPORT i just denna agent —
// felet nådde produktion eftersom AI-svarsvägen aldrig exercerades offline (alla fem
// fällor föll med "guardToolPayload is not defined"). Detta test kör den verkliga
// funktionen med en injicerad mock-klient: en saknad import/referens i svarsvägen
// fäller nu sviten, inte kunden.
import { extractContract } from '../agents/contract/extract-contract.js';

describe('extractContract · svarsvägen exerceras offline (mock-klient)', () => {
  const payload = {
    isContract: true, supplier: 'Bahnhof AB',
    avtalsstart: '2025-01-15', avtalstidMan: 3, uppsagningstidMan: 3, uppsagningstidDagar: null, forlangningMan: 3,
    citat: {
      avtalsstart: 'Tecknat datum: 2025-01-15',
      avtalstidMan: 'Avtalet löper i perioder om tre (3) månader',
      uppsagningstidMan: 'senast tre (3) månader innan nästkommande treperiodskonstruktion påbörjas',
      forlangningMan: 'bunden för nästkommande tre (3) månaders period',
    },
    confidence: 0.95,
  };
  const mockClient = {
    messages: {
      create: async () => ({ content: [{ type: 'tool_use', name: 'extract_contract', input: payload }] }),
    },
  };

  test('tool_use-payloaden flödar genom guard + retur utan referensfel', async () => {
    const out = await extractContract({ pdfBase64: 'ZGVtbw==' }, { client: mockClient });
    assert.equal(out.isContract, true);
    assert.equal(out.avtalstidMan, 3);
    assert.equal(out.uppsagningstidDagar, null);
  });
});

// ── AVTALSVYN (steg 1 av avtalsoptimeringen): "Avtalet · läst"-avsnittets datakontrakt ──
// Termerna fryses vid uppladdning; klockan räknas färsk per läsning. nastaPeriodSlut är
// fällans andra halva: vad kunden är bunden till OM fönstret missas.
describe('buildAvtalView · avsnittets datakontrakt (fällornas facit)', () => {
  const view = (supplier, ext) => {
    const acc = acceptExtractedContract(ext, { today: TODAY });
    const rules = resolveContractRules(ext, villkorForSupplier(supplier));
    return buildAvtalView({ supplier, readAt: '2026-07-08T12:00:00Z', fields: acc.fields, rules, citat: {} }, { today: TODAY });
  };

  test('Bahnhof 3+3: fällan = missat fönster binder till 2027-01-15', () => {
    const v = view('Bahnhof AB', { avtalsstart: '2025-01-15', avtalstidMan: 3, uppsagningstidMan: 3, forlangningMan: 3 });
    assert.equal(v.clock.deadline, '2026-07-15');
    assert.equal(v.nastaPeriodSlut, '2027-01-15');
    assert.equal(v.bindningLabel, '3 mån');
    assert.equal(v.forlangningLabel, '+3 mån i taget');
  });

  test('Fortnox: uppsägningstiden etiketteras i DAGAR, aldrig konverterad', () => {
    const v = view('Fortnox AB', { avtalsstart: '2025-08-15', avtalstidMan: 12, uppsagningstidDagar: 30, forlangningMan: 12 });
    assert.equal(v.uppsagningLabel, '30 dagar');
    assert.equal(v.nastaPeriodSlut, '2027-08-15');   // 2026-08-15 + 12 mån
  });

  test('GleSYS tills vidare: rolling utan fälla (ingen nastaPeriodSlut, ingen deadline)', () => {
    const v = view('GleSYS AB', { avtalsstart: '2025-11-01', avtalstidMan: null, uppsagningstidMan: 1, forlangningMan: null });
    assert.equal(v.clock.status, 'rolling');
    assert.equal(v.nastaPeriodSlut, null);
    assert.equal(v.bindningLabel, 'tills vidare');
  });

  test('Nordic: missat fönster = +24 mån → bunden till 2030-03-01', () => {
    const v = view('Nordic Managed IT Services AB', { avtalsstart: '2025-03-01', avtalstidMan: 36, uppsagningstidMan: 6, forlangningMan: 24 });
    assert.equal(v.nastaPeriodSlut, '2030-03-01');
  });

  test('trasiga termer → null, aldrig ett halvt avsnitt', () => {
    assert.equal(buildAvtalView({}, { today: TODAY }), null);
    assert.equal(buildAvtalView({ fields: { avtalsstart: 'trasigt' } }, { today: TODAY }), null);
  });
});
