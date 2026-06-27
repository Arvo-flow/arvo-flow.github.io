// tests/inbound-attachments.mjs — Resend-läxan: webhooken bär aldrig innehåll.
//
// email.received-payloaden innehåller BARA metadata. Första skarpa testmejlet
// (2026-06-11) gav "Ingen faktura hittades" eftersom handlern filtrerade på
// a.content som aldrig finns. Låser: bilagor hämtas via Attachments-API:t
// (lista → signerad download_url → bytes → base64), PDF-filter, 2-bilagstak,
// 6 MB-vakt och felpropagering.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { fetchInboundPdfs, fetchInboundPdfByIndex, listInboundAttachments } from '../api/inbound-email.mjs';

const PDF_BYTES = Buffer.from('%PDF-1.4 testinnehåll');

function mockFetch(listResponse, downloadOk = true) {
  const calls = [];
  const impl = async (url, opts) => {
    calls.push({ url, opts });
    if (String(url).includes('/attachments')) {
      return { ok: true, status: 200, json: async () => listResponse };
    }
    return {
      ok: downloadOk, status: downloadOk ? 200 : 500,
      arrayBuffer: async () => PDF_BYTES.buffer.slice(PDF_BYTES.byteOffset, PDF_BYTES.byteOffset + PDF_BYTES.byteLength),
    };
  };
  impl.calls = calls;
  return impl;
}

const att = (over = {}) => ({
  id: 'att_1', filename: 'faktura.pdf', size: 2048,
  content_type: 'application/pdf', download_url: 'https://dl.example/att_1', ...over,
});

describe('Resend-bilagehämtning — fetchInboundPdfs', () => {

  test('PDF hämtas via download_url och returneras som base64', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const f = mockFetch({ data: [att()] });
    const pdfs = await fetchInboundPdfs('em_123', { fetchImpl: f });
    assert.equal(pdfs.length, 1);
    assert.equal(pdfs[0].filename, 'faktura.pdf');
    assert.equal(Buffer.from(pdfs[0].content, 'base64').toString(), PDF_BYTES.toString());
    // Listningen paginerar nu (limit=100) så bilagor med index ≥20 aldrig tappas.
    assert.match(f.calls[0].url, /\/emails\/receiving\/em_123\/attachments\?limit=100&offset=0$/);
    assert.equal(f.calls[0].opts.headers.Authorization, 'Bearer test-key');
  });

  test('icke-PDF filtreras bort, max 2 PDF:er hämtas', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const f = mockFetch({ data: [
      att({ id: 'a1', filename: 'bild.png', content_type: 'image/png' }),
      att({ id: 'a2', filename: 'f1.pdf' }),
      att({ id: 'a3', filename: 'f2.pdf' }),
      att({ id: 'a4', filename: 'f3.pdf' }),
    ] });
    const pdfs = await fetchInboundPdfs('em_123', { fetchImpl: f });
    assert.equal(pdfs.length, 2);
    assert.deepEqual(pdfs.map(p => p.filename), ['f1.pdf', 'f2.pdf']);
  });

  test('över 6 MB markeras tooBig och laddas aldrig ned', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const f = mockFetch({ data: [att({ size: 7 * 1024 * 1024 })] });
    const pdfs = await fetchInboundPdfs('em_123', { fetchImpl: f });
    assert.equal(pdfs[0].tooBig, true);
    assert.equal(f.calls.length, 1, 'endast list-anropet — ingen nedladdning');
  });

  test('listfel propagerar (handlern loggar och svarar ärligt)', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const f = async () => ({ ok: false, status: 401 });
    await assert.rejects(() => fetchInboundPdfs('em_123', { fetchImpl: f }), /401/);
  });

  test('utan API-nyckel eller email-id: tom lista, inga anrop', async () => {
    delete process.env.RESEND_API_KEY;
    assert.deepEqual(await fetchInboundPdfs('em_123', { fetchImpl: mockFetch({ data: [] }) }), []);
    process.env.RESEND_API_KEY = 'test-key';
    assert.deepEqual(await fetchInboundPdfs(null, { fetchImpl: mockFetch({ data: [] }) }), []);
  });

});

// ── Pagineringsläxan (2026-06-27): Resends listning defaultar till 20 bilagor (has_more=true).
// Ett 26-bilagors mejl tappade idx 20–25 ("PDF kunde inte hämtas") tills vi paginerade med limit=100.
// Verifierat mot riktiga maskinen (probe-resend). Dessa tester låser att overflow ALDRIG tappas tyst.
const pdfAtt = (i) => ({
  id: `att_${i}`, filename: `INV_${i}.pdf`, size: 2048,
  content_type: 'application/pdf', download_url: `https://dl.example/att_${i}`,
});

// Resend-trogen mock: respekterar limit/offset OCH sätter has_more korrekt (default 20 utan limit).
function pagedMock(total) {
  const all = Array.from({ length: total }, (_, i) => pdfAtt(i));
  const impl = async (url) => {
    const s = String(url);
    if (s.includes('/attachments')) {
      const u = new URL(s);
      const limit = Number(u.searchParams.get('limit')) || 20;   // Resends default = 20
      const offset = Number(u.searchParams.get('offset')) || 0;
      const page = all.slice(offset, offset + limit);
      return { ok: true, status: 200, json: async () => ({ object: 'list', has_more: offset + limit < total, data: page }) };
    }
    return { ok: true, status: 200, arrayBuffer: async () => PDF_BYTES.buffer.slice(PDF_BYTES.byteOffset, PDF_BYTES.byteOffset + PDF_BYTES.byteLength) };
  };
  return impl;
}

describe('Resend-bilagepaginering — index ≥20 tappas aldrig', () => {
  test('listInboundAttachments hämtar ALLA 26 (inte bara default-20)', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const all = await listInboundAttachments('em_bulk', { fetchImpl: pagedMock(26) });
    assert.equal(all.length, 26);
  });

  test('fetchInboundPdfByIndex(25) på 26-bilagors mejl → hämtar PDF:en (regressionen)', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const r = await fetchInboundPdfByIndex('em_bulk', 25, { fetchImpl: pagedMock(26) });
    assert.ok(r && r.content, 'idx 25 ska resolva, inte bli null');
    assert.equal(r.filename, 'INV_25.pdf');
  });

  test('paginering över 100: idx 120 av 150 resolvar (flera sidor)', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    const r = await fetchInboundPdfByIndex('em_huge', 120, { fetchImpl: pagedMock(150) });
    assert.ok(r && r.content);
    assert.equal(r.filename, 'INV_120.pdf');
  });

  test('idx bortom alla bilagor → null (inget påhittat)', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    assert.equal(await fetchInboundPdfByIndex('em_bulk', 99, { fetchImpl: pagedMock(26) }), null);
  });
});
