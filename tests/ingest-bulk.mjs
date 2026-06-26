// tests/ingest-bulk.mjs — låser bulk-ingest (moaten: 50–100 fakturor på en gång).
// Testar (a) bulk-kvittots mail och (b) drain-arbetarens hämtning av rätt bilaga per index.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

process.env.RESEND_API_KEY ||= 'test-key';   // krävs för att fetchInboundPdfByIndex inte ska tyst-returnera

const { bulkReceivedHtml, fetchInboundPdfByIndex } = await import('../api/inbound-email.mjs');

describe('Bulk-kvittot (mail)', () => {
  test('innehåller antal + kontorslänk, tabell-layout (Gmail-läxan), inget flex/grid', () => {
    const html = bulkReceivedHtml({ count: 47, portalLink: 'https://arvoflow.se/portfolio?magic=x' });
    assert.match(html, /47 fakturor/);
    assert.match(html, /portfolio\?magic=x/);
    assert.match(html, /<table role="presentation"/);
    assert.ok(!/display\s*:\s*flex/i.test(html));
    assert.ok(!/display\s*:\s*grid/i.test(html));
  });
});

// Mock-fetch: listnings-URL → bilagelista; download_url → bytes.
const makeFetch = (attachments) => async (url) => {
  if (String(url).includes('/attachments')) {
    return { ok: true, json: async () => ({ data: attachments }) };
  }
  return { ok: true, arrayBuffer: async () => Buffer.from('%PDF-1.4 fake').buffer };
};

const ATTS = [
  { content_type: 'application/pdf', filename: 'a.pdf', size: 1000, download_url: 'https://dl/a' },
  { content_type: 'image/png',       filename: 'logo.png', size: 500, download_url: 'https://dl/logo' },
  { content_type: 'application/pdf', filename: 'b.pdf', size: 2000, download_url: 'https://dl/b' },
];

describe('Drain · fetchInboundPdfByIndex (rätt PDF per index, icke-PDF filtreras bort)', () => {
  test('index 0 → första PDF:en (a.pdf), index 1 → andra (b.pdf)', async () => {
    const p0 = await fetchInboundPdfByIndex('em_1', 0, { fetchImpl: makeFetch(ATTS) });
    assert.equal(p0.filename, 'a.pdf');
    assert.ok(p0.content && p0.content.length > 0);
    const p1 = await fetchInboundPdfByIndex('em_1', 1, { fetchImpl: makeFetch(ATTS) });
    assert.equal(p1.filename, 'b.pdf');           // logo.png hoppas över → b.pdf är PDF-index 1
  });

  test('index bortom antalet PDF:er → null', async () => {
    assert.equal(await fetchInboundPdfByIndex('em_1', 2, { fetchImpl: makeFetch(ATTS) }), null);
  });

  test('för stor PDF → { tooBig:true } (ingen nedladdning)', async () => {
    const big = [{ content_type: 'application/pdf', filename: 'big.pdf', size: 99 * 1024 * 1024, download_url: 'https://dl/big' }];
    const r = await fetchInboundPdfByIndex('em_1', 0, { fetchImpl: makeFetch(big) });
    assert.equal(r.tooBig, true);
  });
});
