// tests/fraktjakt.mjs — låser Fraktjakt-API:ts query-builder + svarsparser (lib/fraktjakt.js).
// Bygg-XML mot det verifierade kontraktet (consignor/value/shipper_info/parcel/adresser).
// Parsern mot Fraktjakts dokumenterade svarsformat. Ingen nyckel behövs — ren enhetstest.
// Svars-fixturen nedan är schema från API-manualen och ERSÄTTS av ett inspelat skarpt svar
// vid första autentiserade anropet (verifieraren loggar rått svar). Kör via tests/run.mjs.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildQueryXml, parseQueryResponse, hasFraktjaktCreds, FRAKTJAKT_QUERY_ENDPOINT } from '../lib/fraktjakt.js';

// Schema-fixtur (Fraktjakts dokumenterade query-svar). Märkt: ersätts av skarpt svar live.
const RESPONSE_FIXTURE = `<?xml version="1.0" encoding="UTF-8"?>
<shipment>
  <shipment_id>12345</shipment_id>
  <access_code>abc123</access_code>
  <shipping_products>
    <shipping_product>
      <id>1</id><name>PostNord MyPack Collect</name>
      <description>Hämtas hos ombud</description>
      <price>129.00</price><tax_class>25.0</tax_class><arrival_time>1-2 vardagar</arrival_time>
    </shipping_product>
    <shipping_product>
      <id>2</id><name>DHL Service Point</name>
      <description>Hämtas hos ombud</description>
      <price>115.50</price><tax_class>25.0</tax_class><arrival_time>2-3 vardagar</arrival_time>
    </shipping_product>
    <shipping_product>
      <id>3</id><name>Bring Hempaket</name>
      <description>Hemleverans</description>
      <price>149.00</price><tax_class>25.0</tax_class><arrival_time>2-4 vardagar</arrival_time>
    </shipping_product>
  </shipping_products>
</shipment>`;

const ERROR_FIXTURE = `<?xml version="1.0" encoding="UTF-8"?>
<shipment><code>2</code><error_message>Ogiltig consignor</error_message></shipment>`;

describe('Fraktjakt · query-builder (verifierat kontrakt)', () => {
  const xml = buildQueryXml({ consignorId: 'CID42', key: 'SECRETKEY', fromZip: '11122', toZip: '41103', weightKg: 5, valueSek: 1000 });

  test('bär consignor-id och nyckel', () => {
    assert.match(xml, /<consignor>[\s\S]*<id>CID42<\/id>[\s\S]*<key>SECRETKEY<\/key>/);
  });
  test('shipper_info=1 (svaret ska bära prissatta alternativ)', () => {
    assert.match(xml, /<shipper_info>1<\/shipper_info>/);
  });
  test('bär från/till-postnummer och vikt', () => {
    assert.match(xml, /<address_from>[\s\S]*<postal_code>11122<\/postal_code>/);
    assert.match(xml, /<address_to>[\s\S]*<postal_code>41103<\/postal_code>/);
    assert.match(xml, /<weight>5<\/weight>/);
  });
  test('är välformad XML-deklaration', () => {
    assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  });
  test('kräver consignor + nyckel', () => {
    assert.throws(() => buildQueryXml({ fromZip: '11122', toZip: '41103' }), /consignorId \+ key/);
  });
  test('kräver från/till-postnummer', () => {
    assert.throws(() => buildQueryXml({ consignorId: 'x', key: 'y' }), /fromZip \+ toZip/);
  });
  test('escapar specialtecken (ingen XML-injektion)', () => {
    const x = buildQueryXml({ consignorId: 'a&b', key: '<k>', fromZip: '1', toZip: '2' });
    assert.match(x, /<id>a&amp;b<\/id>/);
    assert.match(x, /<key>&lt;k&gt;<\/key>/);
  });
});

describe('Fraktjakt · svarsparser', () => {
  test('parsar alla fraktalternativ med pris och bärarnamn', () => {
    const r = parseQueryResponse(RESPONSE_FIXTURE);
    assert.equal(r.ok, true);
    assert.equal(r.products.length, 3);
    assert.deepEqual(r.products.map((p) => p.name), ['PostNord MyPack Collect', 'DHL Service Point', 'Bring Hempaket']);
    assert.deepEqual(r.products.map((p) => p.price), [129, 115.5, 149]);
  });
  test('billigaste alternativet kan härledas (DHL 115,50)', () => {
    const r = parseQueryResponse(RESPONSE_FIXTURE);
    const cheapest = Math.min(...r.products.map((p) => p.price));
    assert.equal(cheapest, 115.5);
  });
  test('fångar arrival_time och beskrivning', () => {
    const r = parseQueryResponse(RESPONSE_FIXTURE);
    assert.equal(r.products[0].arrivalTime, '1-2 vardagar');
    assert.equal(r.products[1].description, 'Hämtas hos ombud');
  });
  test('error_message → ok:false, inga produkter', () => {
    const r = parseQueryResponse(ERROR_FIXTURE);
    assert.equal(r.ok, false);
    assert.equal(r.errorMessage, 'Ogiltig consignor');
    assert.equal(r.products.length, 0);
  });
  test('tomt/ogiltigt svar → ok:false', () => {
    assert.equal(parseQueryResponse('').ok, false);
    assert.equal(parseQueryResponse(null).ok, false);
  });
});

describe('Fraktjakt · credential-gate', () => {
  test('hasFraktjaktCreds speglar env', () => {
    const sav = [process.env.FRAKTJAKT_CONSIGNOR_ID, process.env.FRAKTJAKT_KEY];
    delete process.env.FRAKTJAKT_CONSIGNOR_ID; delete process.env.FRAKTJAKT_KEY;
    assert.equal(hasFraktjaktCreds(), false);
    process.env.FRAKTJAKT_CONSIGNOR_ID = 'a'; process.env.FRAKTJAKT_KEY = 'b';
    assert.equal(hasFraktjaktCreds(), true);
    // återställ
    if (sav[0] == null) delete process.env.FRAKTJAKT_CONSIGNOR_ID; else process.env.FRAKTJAKT_CONSIGNOR_ID = sav[0];
    if (sav[1] == null) delete process.env.FRAKTJAKT_KEY; else process.env.FRAKTJAKT_KEY = sav[1];
  });
  test('endpoint pekar på öppna API:t', () => {
    assert.equal(FRAKTJAKT_QUERY_ENDPOINT, 'https://api.fraktjakt.se/fraktjakt/query_xml');
  });
});
