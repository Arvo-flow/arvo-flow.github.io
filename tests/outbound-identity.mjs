// tests/outbound-identity.mjs — UTGÅENDE IDENTITETSKRAVET (grundarbeslut 2026-07-16):
// vi kontaktar ALDRIG ett bolag vi inte kan binda till ett människoverifierat organisationsnummer.
// Leads-filen är utgående flödets enda dörr — varje rad måste bära ett giltigt orgnr (Luhn +
// organisationsmarkör), annars fälls sviten. Ett prospekt utan orgnr skickas inte, punkt.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { luhnValidOrgnr, normalizeOrgnr } from '../lib/business-intel.js';

describe('utgående identitetskravet · leads-filen', () => {
  const rows = readFileSync('leads/stockholm-leads.csv', 'utf8')
    .split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  const header = rows[0].split(',');
  const orgIdx = header.indexOf('org_nr');

  test('org_nr-kolumnen finns', () => { assert.ok(orgIdx >= 0); });

  test('VARJE lead bär ett giltigt organisationsnummer (Luhn + org-markör)', () => {
    for (const row of rows.slice(1)) {
      const cols = row.split(',');
      const raw = cols[orgIdx];
      const digits = normalizeOrgnr(raw);
      assert.ok(digits, `${cols[0]}: orgnr saknas eller fel form ("${raw}")`);
      assert.ok(luhnValidOrgnr(digits), `${cols[0]}: orgnr klarar inte Luhn ("${raw}")`);
      assert.ok(Number(digits.slice(2, 4)) >= 20, `${cols[0]}: inte ett organisationsnummer ("${raw}")`);
    }
  });
});
