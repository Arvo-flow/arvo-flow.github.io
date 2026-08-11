// tests/sondkontrakt.mjs — låser SONDKONTRAKTET. En omärkt mätning får aldrig produceras.
//
// Bakgrund: jag skrev vaktkontraktet och byggde sedan tre sonder utan att tillämpa det. Priset
// kom direkt — en sond rapporterade "0 villkorssidor" när den menade "jag kunde inte se sidan".
// Låset gör undantaget omöjligt: sonden kastar innan den mätt något.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { deklarera } from '../lib/sondkontrakt.js';

const OK = {
  namn: 'exempelsond',
  fangar: 'Att leverantörens villkorssida länkar ett annat dokument än det vi har fastnålat.',
  blind: 'Sidor som kräver inloggning — sonden läser bara det en utloggad besökare ser.',
};

describe('sondkontraktet · ingen mätning utan sin gräns', () => {
  test('fullständig deklaration godkänns', () => {
    assert.equal(deklarera(OK).namn, 'exempelsond');
  });

  test('saknad blindfläck KASTAR — sonden får inte mäta först och förklara sen', () => {
    assert.throws(() => deklarera({ ...OK, blind: undefined }), /SONDKONTRAKTET BRUTET/);
    assert.throws(() => deklarera({ ...OK, fangar: '' }), /SONDKONTRAKTET BRUTET/);
    assert.throws(() => deklarera({ namn: 'x' }), /SONDKONTRAKTET BRUTET/);
    assert.throws(() => deklarera(null), /SONDKONTRAKTET BRUTET/);
  });

  test('påstådd allseende kastar — varje mätning har en gräns', () => {
    assert.throws(() => deklarera({ ...OK, blind: 'Inget alls, sonden ser hela sajten och varje dokument.' }),
      /påståendet är felet/);
  });

  test('etikett duger inte som inventering', () => {
    assert.throws(() => deklarera({ ...OK, blind: 'botmurar' }), /för kort/);
  });
});
