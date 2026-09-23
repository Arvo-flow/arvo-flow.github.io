// tests/ingest-bulk.mjs — låser bulk-ingest (moaten: 50–100 fakturor på en gång).
// Testar (a) bulk-kvittots mail och (b) drain-arbetarens hämtning av rätt bilaga per index.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

process.env.RESEND_API_KEY ||= 'test-key';   // krävs för att fetchInboundPdfForJob inte ska tyst-returnera

const { bulkReceivedHtml, fetchInboundPdfForJob, valjBilaga } = await import('../api/inbound-email.mjs');

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

describe('Drain · bulkjobbets bilaga väljs på IDENTITET, aldrig på position (BJ)', () => {
  // ⚠️ DE GAMLA TESTERNA HÄR KUNDE ALDRIG SE FELET. De matade köaren och drainen från SAMMA lista,
  // så «index N» pekade alltid på rätt fil. I produktion kommer köarens lista från webhooken och
  // drainens från Resends API — och Resend returnerar dem i ANNAN ordning. Mätt 2026-09-23: 4 av 4
  // prövbara jobb i grundarens bunt analyserade en annan leverantörs faktura än filnamnet angav.
  // BJ-01 bygger därför de två listorna i OLIKA ordning, som i verkligheten.

  test('BJ-01 · webhookens och API:ts ordning skiljer sig — jobbet får ändå SIN fil', async () => {
    // Köarens (webhookens) ordning: Atlassian först. API:ts ordning: Securitas först.
    const apiLista = [
      { content_type: 'application/pdf', filename: 'Arvo_12_Securitas.pdf', size: 1000, download_url: 'https://dl/securitas' },
      { content_type: 'application/pdf', filename: 'Arvo_05_Atlassian.pdf', size: 1000, download_url: 'https://dl/atlassian' },
    ];
    const hamtade = [];
    const f = async (url) => {
      if (String(url).includes('/attachments')) return { ok: true, json: async () => ({ data: apiLista }) };
      hamtade.push(String(url));
      return { ok: true, arrayBuffer: async () => Buffer.from('%PDF-1.4 fake').buffer };
    };
    // Jobbet köades som index 0 ur webhooken — där Atlassian låg FÖRST.
    const r = await fetchInboundPdfForJob('em_1', { filename: 'Arvo_05_Atlassian.pdf' }, { fetchImpl: f });
    assert.equal(r.filename, 'Arvo_05_Atlassian.pdf', 'jobbet måste få den fil det heter');
    assert.deepEqual(hamtade, ['https://dl/atlassian'], 'och ladda ner JUST den, aldrig API-listans position 0');
  });

  test('BJ-02 · icke-PDF filtreras bort och rör inte valet', async () => {
    const atts = [
      { content_type: 'image/png',       filename: 'logo.png', size: 500, download_url: 'https://dl/logo' },
      { content_type: 'application/pdf', filename: 'b.pdf', size: 2000, download_url: 'https://dl/b' },
    ];
    const f = async (url) => (String(url).includes('/attachments')
      ? { ok: true, json: async () => ({ data: atts }) }
      : { ok: true, arrayBuffer: async () => Buffer.from('%PDF-1.4 fake').buffer });
    const r = await fetchInboundPdfForJob('em_1', { filename: 'b.pdf' }, { fetchImpl: f });
    assert.equal(r.filename, 'b.pdf');
    assert.ok(r.content && r.content.length > 0);
  });

  test('BJ-03 · två bilagor med samma namn → ett ärligt fel, ALDRIG en gissning', () => {
    const pdfs = [{ filename: 'faktura.pdf', id: 'a' }, { filename: 'faktura.pdf', id: 'b' }];
    assert.deepEqual(valjBilaga(pdfs, { filename: 'faktura.pdf' }), { fel: 'bilaga_ej_entydig', antal: 2 });
    // Men ett id avgör — det är den enda identitet som skiljer två lika namn åt.
    assert.equal(valjBilaga(pdfs, { filename: 'faktura.pdf', attachmentId: 'b' }).bilaga.id, 'b');
  });

  test('BJ-04 · saknad fil och saknat namn är två OLIKA skäl', () => {
    assert.deepEqual(valjBilaga([{ filename: 'a.pdf' }], { filename: 'x.pdf' }), { fel: 'bilaga_saknas', antal: 0 });
    for (const namn of [null, undefined, '', '   ']) {
      assert.deepEqual(valjBilaga([{ filename: 'a.pdf' }], { filename: namn }), { fel: 'bilaga_utan_namn' },
        `ett saknat namn (${JSON.stringify(namn)}) får aldrig likna «filen fanns inte»`);
    }
  });

  test('BJ-05 · för stor PDF → { tooBig:true } (ingen nedladdning)', async () => {
    const big = [{ content_type: 'application/pdf', filename: 'big.pdf', size: 99 * 1024 * 1024, download_url: 'https://dl/big' }];
    const hamtade = [];
    const f = async (url) => {
      if (String(url).includes('/attachments')) return { ok: true, json: async () => ({ data: big }) };
      hamtade.push(url); return { ok: true, arrayBuffer: async () => Buffer.from('x').buffer };
    };
    const r = await fetchInboundPdfForJob('em_1', { filename: 'big.pdf' }, { fetchImpl: f });
    assert.equal(r.tooBig, true);
    assert.equal(hamtade.length, 0, 'en för stor fil ska aldrig laddas ner');
  });

  test('BJ-06 · drainen hämtar på filnamn och har ingen positionsväg kvar', async () => {
    const { readFileSync } = await import('node:fs');
    const drain = readFileSync(new URL('../api/cron/drain-ingest.mjs', import.meta.url), 'utf8');
    assert.match(drain, /fetchInboundPdfForJob\(job\.emailId, \{ filename: job\.filename \}\)/,
      'drainen väljer inte bilagan på jobbets filnamn');
    const kalla = readFileSync(new URL('../api/inbound-email.mjs', import.meta.url), 'utf8');
    assert.equal(/export async function fetchInboundPdfByIndex/.test(kalla), false,
      'positionsvägen är tillbaka — den gav fel dokument i 4 av 4 mätta jobb');
  });
});
