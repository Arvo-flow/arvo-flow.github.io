// api/send-analysis.mjs
// Skickar analysresultatet som HTML-mail + PDF-bilaga via Resend.
//
// Kräver miljövariabel:
//   RESEND_API_KEY — hämtas från resend.com
//   RESEND_FROM    — valfri, default: "Arvo Flow <analys@arvo-flow.se>"
//
// Frontend POSTar: { email: string, result: { extracted, categorized, recommendation } }

import { Resend } from 'resend';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

const FROM = process.env.RESEND_FROM ?? 'Arvo Flow <analys@arvo-flow.se>';

// ── Brand tokens (from theme.js) ──────────────────────────────────────────────
const T = {
  bg:           '#F1F6F3',
  surface:      '#FFFFFF',
  ink:          '#0E1A17',
  inkSoft:      '#1F2E2A',
  muted:        '#3F4B47',
  mutedSoft:    '#5C6E68',
  border:       '#D5E2DC',
  borderStrong: '#BACBC2',
  brand:        '#1B7A6E',
  brandLight:   '#4FBFB3',
  brandSoft:    '#DCEEEA',
  brandInk:     '#0E4F47',
  gradTop:      '#5DD6CA',
  gradBot:      '#1B6E66',
  warning:      '#A8761A',
  warningSoft:  '#F3E5C7',
  warningBdr:   '#D4A940',
};

const CATEGORY_LABELS = {
  mobil:            'Mobilabonnemang',
  'mjukvara-saas':  'Programvarulicenser / SaaS',
  skrivarleasing:   'Skrivarleasing / Print',
  el:               'El',
  bredband:         'Bredband',
  kortterminal:     'Betaltjänster',
  'faktura-tjanst': 'Fakturahantering',
  forsakring:       'Forsäkring',
};

function formatKr(n) {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n ?? 0) + ' kr';
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// ── PDF ────────────────────────────────────────────────────────────────────────
// Recreates the brand "A" mark using pdfkit path primitives + linearGradient.
// Built-in fonts only: Times-Bold ≈ Playfair Display, Helvetica ≈ Inter.
// Arrow character (→) avoided — uses "till" instead (WinAnsi limitation).

function drawLogoMark(doc, ox, oy, size) {
  const S = size / 40; // viewBox is 40×40
  const grad = doc.linearGradient(ox + 20 * S, oy, ox + 20 * S, oy + 40 * S);
  grad.stop(0, T.gradTop);
  grad.stop(1, T.gradBot);

  doc.save();
  // Outer "A" silhouette
  doc
    .moveTo(ox + 20 * S,   oy +  3 * S)
    .lineTo(ox + 37 * S,   oy + 36 * S)
    .lineTo(ox + 27.5 * S, oy + 36 * S)
    .lineTo(ox + 20 * S,   oy + 21.5 * S)
    .lineTo(ox + 12.5 * S, oy + 36 * S)
    .lineTo(ox +  3 * S,   oy + 36 * S)
    .closePath();
  // Inner triangle cutout (even-odd = hollow)
  doc
    .moveTo(ox + 20 * S, oy + 12.5 * S)
    .lineTo(ox + 24 * S, oy + 21 * S)
    .lineTo(ox + 16 * S, oy + 21 * S)
    .closePath();
  doc.fillColor(grad).fill('even-odd');
  doc.restore();
}

function generatePdf(result) {
  return new Promise((resolve, reject) => {
    const { extracted: ex, categorized: cat, recommendation: r } = result;

    const doc = new PDFDocument({ margin: 0, size: 'A4' });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const PAGE_W = 595.28;
    const PAD    = 44;
    const W      = PAGE_W - PAD * 2;

    // ── 1. Header (light brand background) ───────────────────────────────────
    const HDR_H = 76;
    doc.rect(0, 0, PAGE_W, HDR_H).fill(T.bg);

    // Logo mark
    const MARK_SIZE = 38;
    drawLogoMark(doc, PAD, (HDR_H - MARK_SIZE) / 2, MARK_SIZE);

    // Wordmark: "Arvo" bold serif + "Flow" italic
    const WX = PAD + MARK_SIZE + 10;
    const WY = (HDR_H - 24) / 2;
    doc.fontSize(20).font('Times-Bold').fillColor(T.ink).text('Arvo', WX, WY, { continued: true });
    doc.fontSize(20).font('Times-Italic').fillColor(T.mutedSoft).text(' Flow', { continued: false });

    // Subtitle right-aligned
    doc.fontSize(9).font('Helvetica').fillColor(T.muted)
      .text('Din leverantörsanalys', 0, WY + 2, { align: 'right', width: PAGE_W - PAD });

    // Hairline border under header
    doc.moveTo(0, HDR_H).lineTo(PAGE_W, HDR_H).strokeColor(T.border).lineWidth(0.75).stroke();

    // ── 2. Supplier name strip ────────────────────────────────────────────────
    const STRIP_Y = HDR_H;
    const STRIP_H = 44;
    doc.rect(0, STRIP_Y, PAGE_W, STRIP_H).fill(T.surface);
    doc.fontSize(16).font('Times-Bold').fillColor(T.ink)
      .text(ex.supplier ?? '', PAD, STRIP_Y + 10);
    const catLabel = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';
    doc.fontSize(9.5).font('Helvetica').fillColor(T.muted)
      .text(catLabel, PAD + doc.widthOfString(ex.supplier ?? '', { font: 'Times-Bold', fontSize: 16 }) + 10, STRIP_Y + 14);

    // ── 3. Gradient savings block ─────────────────────────────────────────────
    const BLK_Y = STRIP_Y + STRIP_H;
    const BLK_H = 100;
    const blkGrad = doc.linearGradient(0, BLK_Y, PAGE_W, BLK_Y + BLK_H);
    blkGrad.stop(0, T.gradTop);
    blkGrad.stop(1, T.gradBot);
    doc.rect(0, BLK_Y, PAGE_W, BLK_H).fill(blkGrad);

    doc.fontSize(8).font('Helvetica-Bold').fillColor('rgba(255,255,255,0.70)')
      .text('DIN NETTOBESPARING', PAD, BLK_Y + 14, { characterSpacing: 1.2 });
    doc.fontSize(40).font('Times-Bold').fillColor(T.surface)
      .text('+' + formatKr(r.netSaving), PAD, BLK_Y + 26);

    const costLine = `${formatKr(ex.annualCost)} till ${formatKr(r.suggestedAnnualCost)} / ar` +
      (r.suggestedSupplier ? `  hos  ${r.suggestedSupplier}` : '') +
      `   ·   Arvos arvode ${formatKr(r.arvoFee)} (20 %)`;
    doc.fontSize(9.5).font('Helvetica').fillColor('rgba(255,255,255,0.82)')
      .text(costLine, PAD, BLK_Y + 74, { width: W });

    // ── 4. Price note ─────────────────────────────────────────────────────────
    const NOTE_Y = BLK_Y + BLK_H;
    const NOTE_H = 32;
    doc.rect(0, NOTE_Y, PAGE_W, NOTE_H).fill(T.brandSoft);
    doc.fontSize(8.5).font('Helvetica').fillColor(T.brandInk)
      .text(
        'Detta pris baseras på Arvos samlade databas av förhandlade volymrabatter.',
        PAD, NOTE_Y + 10, { width: W, align: 'center' }
      );

    // ── 5. Details table ──────────────────────────────────────────────────────
    let y = NOTE_Y + NOTE_H + 12;
    const ROW_H = 23;
    const L = PAD, R = PAD + 220;

    const row = (label, value, opts = {}) => {
      if (opts.bg) doc.rect(0, y - 2, PAGE_W, ROW_H).fill(opts.bg);
      doc.fontSize(9).font('Helvetica').fillColor(T.muted)
        .text(label.toUpperCase(), L, y, { width: 210, characterSpacing: 0.4 });
      doc.fontSize(9.5)
        .font(opts.bold ? 'Times-Bold' : 'Helvetica')
        .fillColor(opts.color ?? (opts.bold ? T.brand : T.inkSoft))
        .text(value ?? '–', R, y, { width: W - 220 });
      y += ROW_H;
    };

    row('Nuvarande leverantör', ex.supplier);
    row('Du betalar idag',      formatKr(ex.annualCost) + ' / ar', { bg: T.bg });
    row('Fakturadatum',         ex.date ?? '–');
    row('Kategori',             catLabel, { bg: T.bg });
    if (r.suggestedSupplier)
      row('Föreslagen leverantör', r.suggestedSupplier, { bold: true });
    row('Arvo-pris',            formatKr(r.suggestedAnnualCost) + ' / ar', { bold: true, bg: T.bg });
    row('Bruttobesparing',      formatKr(r.grossSaving));
    row('Arvos arvode (20 %)',  formatKr(r.arvoFee), { bg: T.bg });

    // Net saving highlight
    doc.rect(0, y - 2, PAGE_W, ROW_H).fill(T.brandSoft);
    doc.rect(0, y - 2, 3, ROW_H).fill(T.brand);
    doc.fontSize(9).font('Helvetica-Bold').fillColor(T.brand)
      .text('DIN NETTOBESPARING', L + 6, y, { width: 210, characterSpacing: 0.4 });
    doc.fontSize(10).font('Times-Bold').fillColor(T.brand)
      .text('+' + formatKr(r.netSaving), R, y, { width: W - 220 });
    y += ROW_H;

    // License overage
    if (r.licenseOverage > 0) {
      y += 8;
      const OVH = 42;
      doc.rect(L, y, W, OVH).fill(T.warningSoft);
      doc.rect(L, y, 3, OVH).fill(T.warningBdr);
      doc.fontSize(8).font('Helvetica-Bold').fillColor(T.warning)
        .text('NOTERING OM LICENSER', L + 10, y + 8, { characterSpacing: 0.5 });
      doc.fontSize(9).font('Helvetica').fillColor(T.inkSoft)
        .text(
          `${r.licenseOverage} överflödiga licenser — ytterligare ${formatKr(r.overageSavings)} att spara om ni städar bland licenserna.`,
          L + 10, y + 21, { width: W - 16 }
        );
      y += OVH + 10;
    }

    // ── 6. Reasoning ─────────────────────────────────────────────────────────
    y += 8;
    doc.moveTo(PAD, y).lineTo(PAGE_W - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 13;

    doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brand)
      .text('VARFÖR VI TROR DU KAN SPARA', PAD, y, { characterSpacing: 0.8 });
    y += 14;
    doc.fontSize(10).font('Helvetica').fillColor(T.inkSoft)
      .text(r.reasoning ?? '', PAD, y, { width: W, lineGap: 2.5 });

    // ── 7. Footer ─────────────────────────────────────────────────────────────
    doc.rect(0, 800, PAGE_W, 42).fill(T.ink);
    // Small logo mark in footer
    drawLogoMark(doc, PAD, 811, 18);
    doc.fontSize(9).font('Helvetica').fillColor('rgba(255,255,255,0.55)')
      .text(
        'Arvo Flow  ·  arvo-flow.se  ·  Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.',
        PAD + 26, 817, { width: W - 26 }
      );

    doc.end();
  });
}

// ── HTML email ─────────────────────────────────────────────────────────────────
// Uses inline SVG logo mark + Google Fonts (Playfair Display + Inter).
// SVG is supported in all modern clients; Outlook falls back gracefully.

const LOGO_SVG = `<svg width="36" height="36" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle" aria-hidden="true">
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#5DD6CA"/>
      <stop offset="100%" stop-color="#1B6E66"/>
    </linearGradient>
  </defs>
  <path fill="url(#lg)" fill-rule="evenodd"
    d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/>
</svg>`;

function htmlEmail(result) {
  const { extracted: ex, categorized: cat, recommendation: r } = result;
  const catLabel = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';

  const licenseBlock = r.licenseOverage > 0
    ? `<tr><td style="padding:0 28px 16px">
        <div style="border-left:3px solid #D4A940;background:#F3E5C7;border-radius:0 8px 8px 0;padding:12px 16px">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#A8761A;letter-spacing:.08em;text-transform:uppercase;font-family:'Inter',Arial,sans-serif">Notering om licenser</p>
          <p style="margin:0;font-size:13px;color:#1F2E2A;line-height:1.55;font-family:'Inter',Arial,sans-serif">
            ${r.licenseOverage} överflödiga licenser — ytterligare ${formatKr(r.overageSavings)} att spara.
          </p>
        </div>
      </td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Din Arvo-analys</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { margin:0; padding:0; background:#F1F6F3; }
    .brand { font-family:'Playfair Display',Georgia,serif; }
    .sans  { font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif; }
  </style>
</head>
<body style="margin:0;padding:0;background:#F1F6F3;-webkit-font-smoothing:antialiased">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:36px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 8px 32px rgba(14,26,23,0.10)">

  <!-- ── Header ── -->
  <tr>
    <td style="background:#F1F6F3;padding:20px 28px;border-bottom:1px solid #D5E2DC">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="vertical-align:middle">
            ${LOGO_SVG}
            <span style="margin-left:10px;font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:600;color:#0E1A17;vertical-align:middle;letter-spacing:-.3px">Arvo</span>
            <span style="margin-left:5px;font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:400;font-style:italic;color:#5C6E68;vertical-align:middle"> Flow</span>
          </td>
          <td style="text-align:right;vertical-align:middle">
            <p style="margin:0;font-size:13px;font-weight:600;color:#0E1A17;font-family:'Inter',Arial,sans-serif">${ex.supplier}</p>
            <p style="margin:3px 0 0;font-size:11px;color:#5C6E68;font-family:'Inter',Arial,sans-serif">${catLabel}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── Savings block ── -->
  <tr>
    <td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:30px 28px 26px">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:rgba(255,255,255,0.70);text-transform:uppercase;letter-spacing:.14em;font-family:'Inter',Arial,sans-serif">Din nettobesparing</p>
      <p style="margin:0 0 10px;font-size:48px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-1.5px;font-family:'Playfair Display',Georgia,serif">+${formatKr(r.netSaving)}</p>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.82);line-height:1.5;font-family:'Inter',Arial,sans-serif">
        ${formatKr(ex.annualCost)} &rarr; ${formatKr(r.suggestedAnnualCost)} / år
        ${r.suggestedSupplier ? `hos <strong style="color:#ffffff">${r.suggestedSupplier}</strong>` : ''}
        &nbsp;&middot;&nbsp; Arvos fee ${formatKr(r.arvoFee)} (20&nbsp;%)
      </p>
    </td>
  </tr>

  <!-- ── Price note ── -->
  <tr>
    <td style="background:#DCEEEA;padding:12px 28px;border-bottom:1px solid #D5E2DC">
      <p style="margin:0;font-size:11.5px;color:#0E4F47;line-height:1.55;text-align:center;font-style:italic;font-family:'Playfair Display',Georgia,serif">
        Detta pris baseras på Arvos samlade databas av förhandlade volymrabatter, vilket ger dig tillgång till prisnivåer som ligger utanför leverantörernas ordinarie listpriser.
      </p>
    </td>
  </tr>

  <!-- ── Details table ── -->
  <tr>
    <td style="padding:20px 28px 4px">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse;font-family:'Inter',Arial,sans-serif">
        <tr>
          <td style="padding:9px 10px;color:#5C6E68;border-bottom:1px solid #D5E2DC;width:50%;font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:600">Nuvarande leverantör</td>
          <td style="padding:9px 10px;color:#0E1A17;font-weight:600;border-bottom:1px solid #D5E2DC">${ex.supplier}</td>
        </tr>
        <tr style="background:#F1F6F3">
          <td style="padding:9px 10px;color:#5C6E68;border-bottom:1px solid #D5E2DC;font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:600">Du betalar idag</td>
          <td style="padding:9px 10px;color:#0E1A17;font-weight:600;border-bottom:1px solid #D5E2DC">${formatKr(ex.annualCost)} / år</td>
        </tr>
        ${r.suggestedSupplier ? `<tr>
          <td style="padding:9px 10px;color:#5C6E68;border-bottom:1px solid #D5E2DC;font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:600">Föreslagen leverantör</td>
          <td style="padding:9px 10px;color:#1B7A6E;font-weight:700;border-bottom:1px solid #D5E2DC">${r.suggestedSupplier}</td>
        </tr>` : ''}
        <tr style="background:#F1F6F3">
          <td style="padding:9px 10px;color:#5C6E68;border-bottom:1px solid #D5E2DC;font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:600">Arvo-pris</td>
          <td style="padding:9px 10px;color:#1B7A6E;font-weight:700;border-bottom:1px solid #D5E2DC">${formatKr(r.suggestedAnnualCost)} / år</td>
        </tr>
        <tr>
          <td style="padding:9px 10px;color:#5C6E68;border-bottom:1px solid #D5E2DC;font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:600">Bruttobesparing</td>
          <td style="padding:9px 10px;color:#0E1A17;font-weight:600;border-bottom:1px solid #D5E2DC">${formatKr(r.grossSaving)}</td>
        </tr>
        <tr style="background:#F1F6F3">
          <td style="padding:9px 10px;color:#5C6E68;border-bottom:1px solid #D5E2DC;font-size:10px;text-transform:uppercase;letter-spacing:.06em;font-weight:600">Arvos arvode (20 %)</td>
          <td style="padding:9px 10px;color:#0E1A17;border-bottom:1px solid #D5E2DC">${formatKr(r.arvoFee)}</td>
        </tr>
        <tr style="background:#DCEEEA">
          <td style="padding:11px 10px;color:#0E4F47;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.06em;border-left:3px solid #1B7A6E">Din nettobesparing</td>
          <td style="padding:11px 10px;color:#1B7A6E;font-weight:800;font-size:15px;font-family:'Playfair Display',Georgia,serif">+${formatKr(r.netSaving)}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── License overage ── -->
  ${licenseBlock}

  <!-- ── Reasoning ── -->
  <tr>
    <td style="padding:20px 28px 16px">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#1B7A6E;text-transform:uppercase;letter-spacing:.12em;font-family:'Inter',Arial,sans-serif">Varför vi tror du kan spara</p>
      <p style="margin:0;font-size:13.5px;color:#1F2E2A;line-height:1.72;font-family:'Inter',Arial,sans-serif">${r.reasoning ?? ''}</p>
    </td>
  </tr>

  <!-- ── CTA ── -->
  <tr>
    <td style="padding:8px 28px 32px;text-align:center">
      <a href="https://arvo-flow.github.io/flow/testa-faktura"
         style="display:inline-block;background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);color:#ffffff;font-weight:700;font-size:14px;padding:14px 34px;border-radius:10px;text-decoration:none;letter-spacing:.01em;font-family:'Inter',Arial,sans-serif">
        Aktivera bytet &rarr;
      </a>
      <p style="margin:12px 0 0;font-size:11px;color:#5C6E68;font-family:'Inter',Arial,sans-serif">Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.</p>
    </td>
  </tr>

  <!-- ── Footer ── -->
  <tr>
    <td style="background:#0E1A17;padding:18px 28px;text-align:center">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto">
        <tr>
          <td style="padding-right:10px;vertical-align:middle">${LOGO_SVG}</td>
          <td style="vertical-align:middle">
            <span style="font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:600;color:#ffffff">Arvo</span>
            <span style="font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:400;font-style:italic;color:#4FBFB3"> Flow</span>
          </td>
        </tr>
      </table>
      <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.40);font-family:'Inter',Arial,sans-serif">
        arvo-flow.se &nbsp;&middot;&nbsp; Du betalar 20 % av faktiskt realiserad besparing.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Handler ────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  if (!process.env.RESEND_API_KEY) {
    return send(res, 500, { error: 'E-posttjänsten är inte konfigurerad (RESEND_API_KEY saknas)' });
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON' });
  }

  const { email, result } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return send(res, 400, { error: 'Ogiltig e-postadress' });
  }
  if (!result?.extracted || !result?.recommendation) {
    return send(res, 400, { error: 'Analysdata saknas i request' });
  }

  try {
    const pdfBuffer = await generatePdf(result);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const netSaving = result.recommendation?.netSaving ?? 0;
    const subject = netSaving > 0
      ? `Din analys: Spara ${formatKr(netSaving)} / ar pa ${result.extracted.supplier}`
      : `Din Arvo-analys: ${result.extracted.supplier}`;

    await resend.emails.send({
      from: FROM,
      to: email,
      subject,
      html: htmlEmail(result),
      attachments: [{ filename: 'Arvo-analys.pdf', content: pdfBuffer }],
    });

    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[send-analysis] fel:', err.message);
    return send(res, 500, { error: 'Kunde inte skicka analysen — försök igen.' });
  }
}
