// tests/contract-intel.mjs — låser avtals-intelligensens deterministiska kärna (C1).
// Klockan är ren datumaritmetik (regel 2), villkorsboken är källbelagd per post (regel 3),
// acceptansgrinden släpper aldrig vidare orimliga AI-lästa fält (regel 4).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  VILLKORSBOK, villkorForSupplier, addMonths,
  acceptExtractedContract, computeContractClock,
  resolveContractRules, computeContractOutcome,
} from '../lib/contract-intel.js';

describe('villkorsboken · maskinvakt (prisbokens disciplin)', () => {
  test('VARJE post bär källa (https), ordagrant citat och verifieringsdatum', () => {
    const entries = Object.entries(VILLKORSBOK);
    assert.ok(entries.length >= 1);
    for (const [key, p] of entries) {
      assert.match(p.kalla, /^https:\/\//, `${key}: källa saknas/ogiltig`);
      assert.ok(p.citat && p.citat.length > 20, `${key}: ordagrant citat krävs`);
      assert.match(p.verifierad, /^\d{4}-\d{2}-\d{2}$/, `${key}: verifieringsdatum krävs`);
      assert.ok(Number.isInteger(p.uppsagningstidMan) && p.uppsagningstidMan >= 0 && p.uppsagningstidMan <= 12, `${key}: uppsägningstid utanför band`);
    }
  });
  test('Bahnhof-posten speglar sondens ordagranna klausul (3 mån + 3 mån löpande)', () => {
    const b = VILLKORSBOK.bahnhof;
    assert.equal(b.uppsagningstidMan, 3);
    assert.equal(b.forlangningMan, 3);
    assert.equal(b.brytavgiftModell, 'aterstaende-avtalstid');
    assert.match(b.citat, /tre \(3\) månader/);
  });
  test('uppslag via leverantörsnamn (skiftlägesokänsligt, delsträng)', () => {
    assert.equal(villkorForSupplier('Bahnhof Företag')?.supplier, 'Bahnhof');
    assert.equal(villkorForSupplier('BAHNHOF AB')?.supplier, 'Bahnhof');
    assert.equal(villkorForSupplier('Telia Sverige AB')?.supplier, 'Telia');
    assert.equal(villkorForSupplier('Tele2 Företag AB'), null);   // medvetet: bara privatvillkor funna (fel dokumentklass)
  });
  test('Telia-posten: tills-vidare-modellen, en (1) månad, gällande villkorsversion (260401)', () => {
    const t = VILLKORSBOK.telia;
    assert.equal(t.uppsagningstidMan, 1);
    assert.equal(t.efterBindning, 'tillsvidare');
    assert.match(t.citat, /en \(1\) månads uppsägningstid/);
    assert.match(t.kalla, /260401/);                              // gällande version, inte de äldre (3 mån)
  });
});

describe('addMonths · månadsaritmetik med dagklampning', () => {
  const d = (s) => new Date(`${s}T00:00:00Z`);
  test('31 jan + 1 mån = 28 feb (aldrig 2-3 mars)', () => {
    assert.equal(addMonths(d('2025-01-31'), 1).toISOString().slice(0, 10), '2025-02-28');
  });
  test('skottår: 31 jan 2024 + 1 mån = 29 feb', () => {
    assert.equal(addMonths(d('2024-01-31'), 1).toISOString().slice(0, 10), '2024-02-29');
  });
  test('negativa månader (deadline-beräkning): 15 okt − 3 mån = 15 jul', () => {
    assert.equal(addMonths(d('2026-10-15'), -3).toISOString().slice(0, 10), '2026-07-15');
  });
});

describe('acceptansgrinden · AI-lästa fält släpps aldrig vidare orimliga', () => {
  const TODAY = new Date('2026-07-03T00:00:00Z');
  const ok = { avtalsstart: '2025-01-15', avtalstidMan: 12, uppsagningstidMan: 3, forlangningMan: 3 };

  test('giltigt avtal accepteras med normaliserade fält', () => {
    const r = acceptExtractedContract(ok, { today: TODAY });
    assert.equal(r.ok, true);
    assert.deepEqual(r.fields, { avtalsstart: '2025-01-15', avtalstidMan: 12, uppsagningstidMan: 3, uppsagningstidDagar: null, forlangningMan: 3 });
  });
  test('trasigt/framtida/uråldrigt datum → avvisas med skäl', () => {
    assert.equal(acceptExtractedContract({ ...ok, avtalsstart: '15 jan 2025' }, { today: TODAY }).ok, false);
    assert.equal(acceptExtractedContract({ ...ok, avtalsstart: '2027-06-01' }, { today: TODAY }).ok, false);
    assert.equal(acceptExtractedContract({ ...ok, avtalsstart: '2005-01-01' }, { today: TODAY }).ok, false);
  });
  test('avtalstid/uppsägningstid utanför band → avvisas', () => {
    assert.equal(acceptExtractedContract({ ...ok, avtalstidMan: 0 }, { today: TODAY }).ok, false);
    assert.equal(acceptExtractedContract({ ...ok, avtalstidMan: 121 }, { today: TODAY }).ok, false);
    assert.equal(acceptExtractedContract({ ...ok, uppsagningstidMan: 13 }, { today: TODAY }).ok, false);
  });
  test('uppsägningstid LIKA MED avtalstid = 3+3-fällan — fullt logisk, accepteras (E2E-läxan)', () => {
    const r = acceptExtractedContract({ ...ok, avtalstidMan: 3, uppsagningstidMan: 3 }, { today: TODAY });
    assert.equal(r.ok, true);
    assert.equal(r.fields.uppsagningstidMan, 3);
  });
  test('uppsägningstid STÖRRE än avtalstid = ologiskt → manuell läsning, aldrig en gissning', () => {
    const r = acceptExtractedContract({ ...ok, avtalstidMan: 3, uppsagningstidMan: 4 }, { today: TODAY });
    assert.equal(r.ok, false);
    assert.match(r.reason, /manuell/);
  });
});

describe('kontraktsklockan · deterministisk rullning (handräknade fall)', () => {
  const TODAY = new Date('2026-07-03T00:00:00Z');

  test('Bahnhof-fallet: start 2025-01-15, 12 mån, 3+3 → deadline 15 jul 2026, 3 förnyelser', () => {
    // initial slut 2026-01-15 (deadline 2025-10-15, passerad) → +3: 2026-04-15 (deadline 2026-01-15,
    // passerad) → 2026-07-15 (deadline 2026-04-15, passerad) → 2026-10-15 → deadline 2026-07-15 = framtid.
    const c = computeContractClock({ avtalsstart: '2025-01-15', avtalstidMan: 12, uppsagningstidMan: 3, forlangningMan: 3 }, { today: TODAY });
    assert.equal(c.currentPeriodEnd, '2026-10-15');
    assert.equal(c.deadline, '2026-07-15');
    assert.equal(c.daysToDeadline, 12);
    assert.equal(c.renewals, 3);
    assert.equal(c.status, 'window-open');
  });

  test('ingen förlängning (förl=0): avtalet löper ut — status expires/expired', () => {
    const live = computeContractClock({ avtalsstart: '2026-01-01', avtalstidMan: 12, uppsagningstidMan: 3, forlangningMan: 0 }, { today: TODAY });
    assert.equal(live.status, 'expires');
    assert.equal(live.currentPeriodEnd, '2027-01-01');
    assert.equal(live.deadline, null);
    const past = computeContractClock({ avtalsstart: '2024-01-01', avtalstidMan: 12, uppsagningstidMan: 0, forlangningMan: 0 }, { today: TODAY });
    assert.equal(past.status, 'expired');
  });

  test('deadline i framtiden redan i första perioden → 0 förnyelser', () => {
    const c = computeContractClock({ avtalsstart: '2026-06-01', avtalstidMan: 24, uppsagningstidMan: 3, forlangningMan: 12 }, { today: TODAY });
    assert.equal(c.currentPeriodEnd, '2028-06-01');
    assert.equal(c.deadline, '2028-03-01');
    assert.equal(c.renewals, 0);
  });

  test('ogiltig input → null (aldrig ett kast, aldrig en gissning)', () => {
    assert.equal(computeContractClock({ avtalsstart: 'igår', avtalstidMan: 12, uppsagningstidMan: 3 }, { today: TODAY }), null);
    assert.equal(computeContractClock({ avtalsstart: '2025-01-01', avtalstidMan: 0, uppsagningstidMan: 3 }, { today: TODAY }), null);
  });
});

describe('regelupplösningen · avtalets villkor vinner, villkorsboken täcker, aldrig gissning', () => {
  const bok = VILLKORSBOK.bahnhof;

  test('avtalet anger uppsägningstid → avtalet vinner (källa: avtalet)', () => {
    const r = resolveContractRules({ uppsagningstidMan: 1, forlangningMan: 12 }, bok);
    assert.deepEqual(r, { uppsagningstidMan: 1, uppsagningstidDagar: null, forlangningMan: 12, efterBindning: 'forlangning', kalla: 'avtalet' });
  });
  test('avtalet tyst → villkorsboken täcker (källa: villkorsbok)', () => {
    const r = resolveContractRules({ uppsagningstidMan: null, forlangningMan: null }, bok);
    assert.deepEqual(r, { uppsagningstidMan: 3, uppsagningstidDagar: null, forlangningMan: 3, efterBindning: 'forlangning', kalla: 'villkorsbok' });
  });
  test('varken avtal eller bok → null-regler (källa: null) — aldrig en gissning', () => {
    const r = resolveContractRules({ uppsagningstidMan: null }, null);
    assert.deepEqual(r, { uppsagningstidMan: null, uppsagningstidDagar: null, forlangningMan: null, efterBindning: null, kalla: null });
  });
  test('avtalets uppsägning + bokens förlängning kombineras (lucktäckning per fält)', () => {
    const r = resolveContractRules({ uppsagningstidMan: 2, forlangningMan: null }, bok);
    assert.deepEqual(r, { uppsagningstidMan: 2, uppsagningstidDagar: null, forlangningMan: 3, efterBindning: 'forlangning', kalla: 'avtalet' });
  });
});

describe('computeContractOutcome · hela kedjan, ärlig vid regelluckor', () => {
  const TODAY = new Date('2026-07-03T00:00:00Z');
  const fields = { avtalsstart: '2025-01-15', avtalstidMan: 12 };

  test('kända regler → full klocka med regelKalla', () => {
    const o = computeContractOutcome(fields, { uppsagningstidMan: 3, forlangningMan: 3, kalla: 'villkorsbok' }, { today: TODAY });
    assert.equal(o.deadline, '2026-07-15');
    assert.equal(o.regelKalla, 'villkorsbok');
    assert.equal(o.status, 'window-open');
  });
  test('okända regler → ENDAST initial bindning (faktum), deadline null, aldrig gissad förnyelse', () => {
    const o = computeContractOutcome({ avtalsstart: '2026-01-15', avtalstidMan: 24 }, { uppsagningstidMan: null, forlangningMan: null, kalla: null }, { today: TODAY });
    assert.equal(o.currentPeriodEnd, '2028-01-15');
    assert.equal(o.deadline, null);
    assert.equal(o.regelKalla, null);
    assert.equal(o.status, 'expires');
    assert.equal(o.renewals, 0);
  });
  test('okända regler + passerad bindning → expired (lagras aldrig som framtid)', () => {
    const o = computeContractOutcome({ avtalsstart: '2023-01-01', avtalstidMan: 12 }, { uppsagningstidMan: null, kalla: null }, { today: TODAY });
    assert.equal(o.status, 'expired');
  });
  test('ofullständiga fält → null', () => {
    assert.equal(computeContractOutcome({ avtalsstart: null, avtalstidMan: 12 }, { uppsagningstidMan: 3 }, { today: TODAY }), null);
    assert.equal(computeContractOutcome(null, { uppsagningstidMan: 3 }, { today: TODAY }), null);
  });
});

describe('tills-vidare-modellen · Telia/Tele2-klassen (efter bindning: löper, upphör inte)', () => {
  const TODAY = new Date('2026-07-03T00:00:00Z');
  const rules = { uppsagningstidMan: 1, forlangningMan: null, efterBindning: 'tillsvidare', kalla: 'villkorsbok' };

  test('FÖRE deadline: fönstret öppet — utträde VID bindningsslutet', () => {
    const o = computeContractOutcome({ avtalsstart: '2025-01-15', avtalstidMan: 24 }, rules, { today: TODAY });
    assert.equal(o.currentPeriodEnd, '2027-01-15');
    assert.equal(o.deadline, '2026-12-15');            // slut − 1 mån varsel
    assert.equal(o.status, 'window-open');
    assert.equal(o.renewals, 0);
  });

  test('EFTER bindningen: rolling — tidigaste utträde = idag + varsel, ingen deadline-press', () => {
    const o = computeContractOutcome({ avtalsstart: '2023-01-15', avtalstidMan: 24 }, rules, { today: TODAY });
    assert.equal(o.status, 'rolling');
    assert.equal(o.deadline, null);
    assert.equal(o.currentPeriodEnd, '2026-08-03');    // idag (3 jul) + 1 mån varsel
    assert.equal(o.daysToEnd, 31);
  });

  test('mellan deadline och bindningsslut: rolling med utträde vid max(slut, idag+varsel)', () => {
    // slut 2026-07-20, deadline 2026-06-20 (passerad) → utträde = max(2026-07-20, 2026-08-03) = 2026-08-03
    const o = computeContractOutcome({ avtalsstart: '2024-07-20', avtalstidMan: 24 }, rules, { today: TODAY });
    assert.equal(o.status, 'rolling');
    assert.equal(o.currentPeriodEnd, '2026-08-03');
  });

  test('utan uppsägningstid faller tills-vidare tillbaka till ärlig initial-bindning', () => {
    const o = computeContractOutcome({ avtalsstart: '2025-01-15', avtalstidMan: 24 },
      { uppsagningstidMan: null, efterBindning: 'tillsvidare', kalla: null }, { today: TODAY });
    assert.equal(o.deadline, null);
    assert.equal(o.regelKalla, null);
  });

  test('resolveContractRules bär efterBindning ur villkorsboken', () => {
    const r = resolveContractRules({ uppsagningstidMan: null }, { uppsagningstidMan: 1, forlangningMan: null, efterBindning: 'tillsvidare' });
    assert.equal(r.efterBindning, 'tillsvidare');
    assert.equal(r.kalla, 'villkorsbok');
  });
});
