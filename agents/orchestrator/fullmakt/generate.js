// agents/orchestrator/fullmakt/generate.js
// Render the structured fullmakt data to a PDF (or, as fallback, to a
// Markdown text file) and return bytes + metadata.
//
// pdf-lib is an optional dependency. If it's installed (cd agents/orchestrator
// && npm install), we render a real PDF. If not, we return the Markdown
// rendering with a .txt extension and a clear log message. This means the
// orchestrator demos work end-to-end without any extra install steps.

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { buildFullmaktData, renderMarkdown } from './template.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUT_DIR = resolve(__dirname, '..', 'data', 'fullmakter');

let _pdfLib = null;
let _pdfLibTried = false;

async function tryLoadPdfLib() {
  if (_pdfLibTried) return _pdfLib;
  _pdfLibTried = true;
  try {
    _pdfLib = await import('pdf-lib');
  } catch {
    _pdfLib = null;
  }
  return _pdfLib;
}

async function renderPdf(data) {
  const lib = await tryLoadPdfLib();
  if (!lib) {
    return null;
  }

  const { PDFDocument, StandardFonts, rgb } = lib;
  const doc = await PDFDocument.create();
  const fontReg = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();
  const margin = 50;
  let y = height - margin;
  const ink = rgb(0.06, 0.1, 0.09);
  const muted = rgb(0.36, 0.43, 0.41);

  function drawLine() {
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.5,
      color: muted,
    });
    y -= 14;
  }

  function newPage() {
    page = doc.addPage([595, 842]);
    y = height - margin;
  }

  function ensureSpace(needed) {
    if (y - needed < margin) newPage();
  }

  function drawText(text, { font = fontReg, size = 10, color = ink, indent = 0 } = {}) {
    const lineHeight = size * 1.4;
    const maxWidth = width - margin * 2 - indent;
    // Naive wrap by words
    const words = text.split(/\s+/);
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      const w = font.widthOfTextAtSize(candidate, size);
      if (w > maxWidth) {
        ensureSpace(lineHeight);
        page.drawText(line, { x: margin + indent, y, size, font, color });
        y -= lineHeight;
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) {
      ensureSpace(lineHeight);
      page.drawText(line, { x: margin + indent, y, size, font, color });
      y -= lineHeight;
    }
  }

  function drawHeading(text, { size = 14 } = {}) {
    y -= size * 0.6;
    drawText(text, { font: fontBold, size });
    y -= 4;
  }

  // === Title ===
  drawText(data.documentTitle, { font: fontBold, size: 18 });
  drawText(`Dokumentversion ${data.documentVersion}`, { size: 9, color: muted });
  drawText(`Utfärdat ${data.issuedAt}  ·  Giltigt ${data.validFrom} — ${data.validTo}`, { size: 9, color: muted });
  drawText(`Ärende-ID: ${data.switchId}`, { size: 9, color: muted });
  y -= 8;
  drawLine();

  // === Parties ===
  drawHeading('Fullmaktsgivare');
  drawText(data.grantor.name, { font: fontBold });
  drawText(`Org.nr ${data.grantor.orgNumber}`);
  drawText(data.grantor.address);
  y -= 6;
  drawText(`${data.grantor.signer.title}: ${data.grantor.signer.name}`);
  drawText(`Personnummer: ${data.grantor.signer.ssn}`);
  y -= 6;

  drawHeading('Fullmaktshavare');
  drawText(data.grantee.name, { font: fontBold });
  drawText(`Org.nr ${data.grantee.orgNumber}`);
  drawText(data.grantee.address);
  drawText(`${data.grantee.email}  ·  ${data.grantee.phone}`);
  drawLine();

  // === Scope ===
  drawHeading('Omfattning');
  drawText(
    `Fullmaktsgivaren ger härmed Fullmaktshavaren rätt att, i Fullmaktsgivarens namn och för Fullmaktsgivarens räkning, vidta följande åtgärder avseende ${data.scope.categoryLabel}:`
  );
  y -= 4;
  data.scope.actions.forEach((a, i) => {
    drawText(`${i + 1}. ${a}.`, { indent: 14 });
  });
  if (data.scope.notExceeds.length > 0) {
    y -= 6;
    drawHeading('Avgränsningar', { size: 11 });
    data.scope.notExceeds.forEach((n) => drawText(`• ${n}.`, { indent: 14 }));
  }
  drawLine();

  // === Transaction ===
  drawHeading('Transaktion');
  drawText(`Nuvarande leverantör: ${data.transaction.currentSupplier.name}`);
  if (data.transaction.currentSupplier.accountReference) {
    drawText(`Avtals-/kundnummer: ${data.transaction.currentSupplier.accountReference}`);
  }
  y -= 4;
  drawText(`Ny leverantör: ${data.transaction.newSupplier.name}`);
  drawText(`Produkt: ${data.transaction.newSupplier.productName}`);
  drawText(
    `Avtalat pris: ${data.transaction.newSupplier.agreedPrice.toLocaleString('sv-SE')} kr/år`
  );
  drawLine();

  // === Revocation ===
  drawHeading('Återkallelse');
  drawText(`Metod: ${data.revocation.method}`);
  y -= 4;
  drawText(`Effekt: ${data.revocation.effect}`);
  drawLine();

  // === Legal basis ===
  drawHeading('Rättslig grund');
  drawText(data.legalBasis);
  drawLine();

  // === Signature placeholder ===
  drawHeading('Signering');
  drawText(
    'Detta dokument signeras elektroniskt med BankID. Den elektroniska signaturen utgör fullmaktsgivarens bekräftelse på att samtliga uppgifter ovan är korrekta och att fullmakten upprättas medvetet och i samförstånd.',
    { size: 9 }
  );
  y -= 12;
  drawText('Signaturuppgifter (fylls av Scrive vid signering):', { size: 9, color: muted });
  drawText('Personnummer: __________________________', { size: 9, color: muted });
  drawText('Tidsstämpel: __________________________', { size: 9, color: muted });
  drawText('Scrive document-ID: __________________________', { size: 9, color: muted });

  return Buffer.from(await doc.save());
}

/**
 * Generate a fullmakt and write it to disk. Returns the path + bytes.
 *
 * @param {object} input - same shape as buildFullmaktData input
 * @param {object} [opts]
 * @param {string} [opts.outDir]
 */
export async function generateFullmakt(input, opts = {}) {
  const data = buildFullmaktData(input);
  const outDir = opts.outDir ?? DEFAULT_OUT_DIR;

  if (!existsSync(outDir)) {
    await mkdir(outDir, { recursive: true });
  }

  // Try real PDF first
  const pdfBytes = await renderPdf(data);
  if (pdfBytes) {
    const path = resolve(outDir, `${data.switchId}.pdf`);
    await writeFile(path, pdfBytes);
    return {
      path,
      bytes: pdfBytes,
      format: 'pdf',
      data,
      note: null,
    };
  }

  // Fallback: Markdown text file
  const markdown = renderMarkdown(data);
  const path = resolve(outDir, `${data.switchId}.fullmakt.md`);
  await writeFile(path, markdown, 'utf8');
  return {
    path,
    bytes: Buffer.from(markdown, 'utf8'),
    format: 'markdown',
    data,
    note:
      'pdf-lib är inte installerad — skrev fullmakten som Markdown istället. Kör "cd agents/orchestrator && npm install" för riktig PDF.',
  };
}
