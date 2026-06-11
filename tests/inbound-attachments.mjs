// tests/inbound-attachments.mjs — Resend-läxan: webhooken bär aldrig innehåll.
//
// email.received-payloaden innehåller BARA metadata. Första skarpa testmejlet
// (2026-06-11) gav "Ingen faktura hittades" eftersom handlern filtrerade på
// a.content som aldrig finns. Låser: bilagor hämtas via Attachments-API:t
// (lista → signerad download_url → bytes → base64), PDF-filter, 2-bilagstak,
// 6 MB-vakt och felpropagering.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { fetchInboundPdfs } from '../api/inbound-email.mjs';

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
    assert.match(f.calls[0].url, /\/emails\/receiving\/em_123\/attachments$/);
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
