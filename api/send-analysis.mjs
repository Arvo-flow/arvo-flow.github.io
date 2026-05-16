// api/send-analysis.mjs
// Skickar analysresultatet som HTML-mail + PDF-bilaga via Resend.
//
// Kräver miljövariabel:
//   RESEND_API_KEY — hämtas från resend.com
//   RESEND_FROM    — valfri, default: "Arvo Flow <analys@arvo-flow.se>"

import { Resend } from 'resend';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

const FROM = process.env.RESEND_FROM ?? 'Arvo Flow <analys@arvo-flow.se>';

// ── Brand tokens (from theme.js) ──────────────────────────────────────────────
const T = {
  bg:        '#F1F6F3',
  surface:   '#FFFFFF',
  ink:       '#0E1A17',
  inkSoft:   '#1F2E2A',
  muted:     '#3F4B47',
  mutedSoft: '#5C6E68',
  border:    '#D5E2DC',
  brand:     '#1B7A6E',
  brandSoft: '#DCEEEA',
  brandInk:  '#0E4F47',
  gradTop:   '#5DD6CA',
  gradBot:   '#1B6E66',
  warning:   '#A8761A',
  warnSoft:  '#F3E5C7',
  warnBdr:   '#D4A940',
};

// ── Supplier display rules — mirrors frontend REAL_PRICE_CATEGORIES ───────────
const REAL_PRICE_CATEGORIES = new Set(['mjukvara-saas', 'mobil']);

const CATEGORY_PARTNER_LABEL = {
  el:                'Kvalificerad Elleverantör',
  bredband:          'Kvalificerad Bredbandsoperatör',
  kortterminal:      'Kvalificerad Betaltjänstleverantör',
  'faktura-tjanst':  'Kvalificerad Affärssystemsleverantör',
  'leasing-bil':     'Kvalificerad Leasingpartner',
  skrivarleasing:    'Kvalificerad Print-leverantör',
  loneadmin:         'Kvalificerad Lönesystemleverantör',
  'larm-bevakning':  'Kvalificerad Säkerhetsleverantör',
  foretagshalsovard: 'Kvalificerad Hälsovårdspartner',
  bankavgifter:      'Kvalificerad Bankpartner',
  kontorsmaterial:   'Kvalificerad Förbrukningsleverantör',
  'städ-rengöring':  'Kvalificerad Städleverantör',
  'transport-frakt': 'Kvalificerad Fraktleverantör',
  'it-support':      'Kvalificerad IT-partner',
};

const CATEGORY_LABELS = {
  el:                  'Elavtal',
  mobil:               'Mobilabonnemang',
  bredband:            'Företagsbredband',
  'mjukvara-saas':     'Programvarulicenser / SaaS',
  skrivarleasing:      'Skrivare & Managed Print',
  kortterminal:        'Betaltjänster',
  'faktura-tjanst':    'Fakturatjänst / Affärssystem',
  loneadmin:           'Löneadministration',
  'larm-bevakning':    'Larm & Bevakning',
  foretagshalsovard:   'Företagshälsovård',
  bankavgifter:        'Bankavgifter',
  kontorsmaterial:     'Kontorsmaterial',
  'städ-rengöring':    'Städ & Rengöring',
  'transport-frakt':   'Transport & Frakt',
  'it-support':        'IT-drift & Support',
};

function displayedSupplier(cat, r) {
  if (!r.suggestedSupplier) return null;
  if (REAL_PRICE_CATEGORIES.has(cat?.category)) return r.suggestedSupplier;
  return CATEGORY_PARTNER_LABEL[cat?.category] ?? 'Arvo-verifierad Partner';
}

function formatKr(n) {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n ?? 0) + ' kr';
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// ── Logo mark ─────────────────────────────────────────────────────────────────
// Recreates the brand SVG "A" (viewBox 0 0 40 40) using pdfkit primitives
// with a top→bottom linear gradient (#5DD6CA → #1B6E66), even-odd fill rule.

function drawLogoMark(doc, ox, oy, size) {
  const S = size / 40;
  const grad = doc.linearGradient(ox + 20 * S, oy, ox + 20 * S, oy + 36 * S);
  grad.stop(0, T.gradTop);
  grad.stop(1, T.gradBot);
  doc.save();
  doc
    .moveTo(ox + 20 * S,   oy +  3 * S)
    .lineTo(ox + 37 * S,   oy + 36 * S)
    .lineTo(ox + 27.5 * S, oy + 36 * S)
    .lineTo(ox + 20 * S,   oy + 21.5 * S)
    .lineTo(ox + 12.5 * S, oy + 36 * S)
    .lineTo(ox +  3 * S,   oy + 36 * S)
    .closePath()
    .moveTo(ox + 20 * S, oy + 12.5 * S)
    .lineTo(ox + 24 * S, oy + 21 * S)
    .lineTo(ox + 16 * S, oy + 21 * S)
    .closePath();
  doc.fillColor(grad).fill('even-odd');
  doc.restore();
}

// ── PDF ────────────────────────────────────────────────────────────────────────

function generatePdf(result) {
  return new Promise((resolve, reject) => {
    const { extracted: ex, categorized: cat, recommendation: r } = result;
    const suppDisplay = displayedSupplier(cat, r);
    const catLabel = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';

    const doc = new PDFDocument({ margin: 0, size: 'A4' });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const PW  = 595.28;
    const PAD = 48;
    const W   = PW - PAD * 2;

    // ── Header: logo + brand on #F1F6F3 ──────────────────────────────────────
    const HDR_H = 70;
    doc.rect(0, 0, PW, HDR_H).fill(T.bg);

    const MARK = 34;
    const MARK_Y = (HDR_H - MARK) / 2;
    drawLogoMark(doc, PAD, MARK_Y, MARK);

    const TX = PAD + MARK + 10;
    const TY = MARK_Y + 4;
    doc.fontSize(18).font('Times-Bold').fillColor(T.ink).text('Arvo', TX, TY, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');

    doc.fontSize(9).font('Helvetica').fillColor(T.mutedSoft)
      .text('Din leverantörsanalys', 0, MARK_Y + 8, { align: 'right', width: PW - PAD });

    doc.moveTo(0, HDR_H).lineTo(PW, HDR_H).strokeColor(T.border).lineWidth(0.5).stroke();

    // ── Supplier strip ────────────────────────────────────────────────────────
    const SUP_Y = HDR_H;
    const SUP_H = 52;
    doc.rect(0, SUP_Y, PW, SUP_H).fill(T.surface);

    doc.fontSize(17).font('Times-Bold').fillColor(T.ink)
      .text(ex.supplier ?? '', PAD, SUP_Y + 10);
    doc.fontSize(10).font('Helvetica').fillColor(T.mutedSoft)
      .text(catLabel, PAD, SUP_Y + 33);

    // ── Gradient savings block ────────────────────────────────────────────────
    const BLK_Y = SUP_Y + SUP_H;
    const BLK_H = 108;
    const blkGrad = doc.linearGradient(0, BLK_Y, PW, BLK_Y + BLK_H);
    blkGrad.stop(0, T.gradTop);
    blkGrad.stop(1, T.gradBot);
    doc.rect(0, BLK_Y, PW, BLK_H).fill(blkGrad);

    doc.fontSize(8).font('Helvetica-Bold').fillColor('rgba(255,255,255,0.65)')
      .text('DIN NETTOBESPARING', PAD, BLK_Y + 16, { characterSpacing: 1.4 });
    doc.fontSize(42).font('Times-Bold').fillColor(T.surface)
      .text('+' + formatKr(r.netSaving), PAD, BLK_Y + 30);

    const costLine =
      formatKr(ex.annualCost) + ' till ' + formatKr(r.suggestedAnnualCost) + ' / ar' +
      (suppDisplay ? '  hos  ' + suppDisplay : '') +
      '   ·   Arvos arvode ' + formatKr(r.arvoFee) + ' (20 %)';
    doc.fontSize(9.5).font('Helvetica').fillColor('rgba(255,255,255,0.80)')
      .text(costLine, PAD, BLK_Y + 80, { width: W });

    // ── Details table ─────────────────────────────────────────────────────────
    let y = BLK_Y + BLK_H + 20;
    const ROW_H = 26;
    const LC = PAD, RC = PAD + 230;

    const row = (label, value, opts = {}) => {
      if (opts.bg) doc.rect(0, y - 4, PW, ROW_H).fill(opts.bg);
      doc.fontSize(8.5).font('Helvetica').fillColor(T.mutedSoft)
        .text(label.toUpperCase(), LC, y, { width: 220, characterSpacing: 0.5 });
      doc.fontSize(10)
        .font(opts.bold ? 'Times-Bold' : 'Helvetica')
        .fillColor(opts.color ?? (opts.bold ? T.brand : T.inkSoft))
        .text(value ?? '–', RC, y - 0.5, { width: W - 230 });
      y += ROW_H;
    };

    row('Nuvarande leverantör', ex.supplier);
    row('Du betalar idag',     formatKr(ex.annualCost) + ' / ar', { bg: T.bg });
    row('Fakturadatum',        ex.date ?? '–');
    if (suppDisplay) row('Föreslagen leverantör', suppDisplay, { bold: true, bg: T.bg });
    row('Arvo-pris',           formatKr(r.suggestedAnnualCost) + ' / ar', { bold: true });
    row('Bruttobesparing',     formatKr(r.grossSaving), { bg: T.bg });
    row('Arvos arvode (20 %)', formatKr(r.arvoFee));

    // Net saving highlight row
    doc.rect(0, y - 4, PW, ROW_H + 2).fill(T.brandSoft);
    doc.rect(0, y - 4, 3, ROW_H + 2).fill(T.brand);
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor(T.brandInk)
      .text('DIN NETTOBESPARING', LC + 8, y, { characterSpacing: 0.5 });
    doc.fontSize(11).font('Times-Bold').fillColor(T.brand)
      .text('+' + formatKr(r.netSaving), RC, y - 0.5);
    y += ROW_H + 6;

    // License overage
    if (r.licenseOverage > 0) {
      y += 6;
      const OH = 44;
      doc.rect(LC, y, W, OH).fill(T.warnSoft);
      doc.rect(LC, y, 3, OH).fill(T.warnBdr);
      doc.fontSize(8).font('Helvetica-Bold').fillColor(T.warning)
        .text('NOTERING OM LICENSER', LC + 10, y + 9, { characterSpacing: 0.5 });
      doc.fontSize(9).font('Helvetica').fillColor(T.inkSoft)
        .text(
          r.licenseOverage + ' överflödiga licenser — ytterligare ' + formatKr(r.overageSavings) + ' att spara.',
          LC + 10, y + 23, { width: W - 20 }
        );
      y += OH + 10;
    }

    // ── Reasoning ─────────────────────────────────────────────────────────────
    y += 14;
    doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 14;

    doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brand)
      .text('VARFÖR VI TROR DU KAN SPARA', PAD, y, { characterSpacing: 0.9 });
    y += 14;
    doc.fontSize(10.5).font('Helvetica').fillColor(T.inkSoft)
      .text(r.reasoning ?? '', PAD, y, { width: W, lineGap: 3 });

    // ── Footer ─────────────────────────────────────────────────────────────────
    doc.moveTo(0, 802).lineTo(PW, 802).strokeColor(T.border).lineWidth(0.5).stroke();
    doc.rect(0, 803, PW, 39).fill(T.bg);
    drawLogoMark(doc, (PW - 16) / 2 - 60, 812, 16);
    doc.fontSize(9.5).font('Times-Bold').fillColor(T.ink).text('Arvo', (PW - 16) / 2 - 38, 815, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow', { continued: false });
    doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
      .text('arvo-flow.se  ·  20 % av realiserad besparing. Inga fasta avgifter.', 0, 828, { width: PW, align: 'center' });

    doc.end();
  });
}

// ── HTML email ─────────────────────────────────────────────────────────────────

const LOGO_SVG = `<svg width="32" height="32" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#lg)" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;

function htmlEmail(result) {
  const { extracted: ex, categorized: cat, recommendation: r } = result;
  const catLabel    = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';
  const suppDisplay = displayedSupplier(cat, r);

  const licenseBlock = r.licenseOverage > 0
    ? `<tr><td style="padding:0 36px 24px">
        <div style="border-left:3px solid #D4A940;background:#F3E5C7;border-radius:0 8px 8px 0;padding:14px 18px">
          <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#A8761A;letter-spacing:.09em;text-transform:uppercase;font-family:'Inter',Arial,sans-serif">Notering om licenser</p>
          <p style="margin:0;font-size:13px;color:#1F2E2A;line-height:1.6;font-family:'Inter',Arial,sans-serif">
            ${r.licenseOverage} överflödiga licenser — ytterligare ${formatKr(r.overageSavings)} att spara.
          </p>
        </div>
      </td></tr>`
    : '';

  const suppRow = suppDisplay
    ? `<tr>
        <td style="padding:11px 14px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;width:46%;font-family:'Inter',Arial,sans-serif">Föreslagen leverantör</td>
        <td style="padding:11px 14px;color:#1B7A6E;font-weight:700;border-bottom:1px solid #E8F0EC;font-size:14px;font-family:'Inter',Arial,sans-serif">${suppDisplay}</td>
      </tr>`
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
</head>
<body style="margin:0;padding:0;background:#F1F6F3;-webkit-font-smoothing:antialiased">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:40px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 4px 24px rgba(14,26,23,0.08)">

  <!-- Logo header -->
  <tr>
    <td style="background:#F1F6F3;padding:22px 36px 20px;border-bottom:1px solid #D5E2DC">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="vertical-align:middle">
          ${LOGO_SVG}
          <span style="margin-left:9px;font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:600;color:#0E1A17;vertical-align:middle;letter-spacing:-.2px">Arvo</span>
          <em style="margin-left:4px;font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:400;color:#5C6E68;vertical-align:middle"> Flow</em>
        </td>
        <td style="text-align:right;vertical-align:middle">
          <p style="margin:0;font-size:11px;color:#5C6E68;font-family:'Inter',Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;font-weight:600">${catLabel}</p>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- Supplier name -->
  <tr>
    <td style="padding:22px 36px 18px;border-bottom:1px solid #E8F0EC">
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:600;color:#0E1A17;letter-spacing:-.2px">${ex.supplier}</p>
    </td>
  </tr>

  <!-- Savings block -->
  <tr>
    <td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:32px 36px 28px">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:.16em;font-family:'Inter',Arial,sans-serif">Din nettobesparing</p>
      <p style="margin:0 0 12px;font-size:52px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-2px;font-family:'Playfair Display',Georgia,serif">+${formatKr(r.netSaving)}</p>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.80);line-height:1.6;font-family:'Inter',Arial,sans-serif">
        ${formatKr(ex.annualCost)} &rarr; ${formatKr(r.suggestedAnnualCost)} / år
        ${suppDisplay ? `hos <strong style="color:#ffffff;font-weight:700">${suppDisplay}</strong>` : ''}
        &nbsp;&middot;&nbsp; Arvos fee ${formatKr(r.arvoFee)} (20&nbsp;%)
      </p>
    </td>
  </tr>

  <!-- Details table -->
  <tr>
    <td style="padding:28px 36px 8px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        <tr>
          <td style="padding:11px 14px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;width:46%;font-family:'Inter',Arial,sans-serif">Nuvarande leverantör</td>
          <td style="padding:11px 14px;color:#0E1A17;font-weight:600;border-bottom:1px solid #E8F0EC;font-size:14px;font-family:'Inter',Arial,sans-serif">${ex.supplier}</td>
        </tr>
        <tr style="background:#F7FAF8">
          <td style="padding:11px 14px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;font-family:'Inter',Arial,sans-serif">Du betalar idag</td>
          <td style="padding:11px 14px;color:#0E1A17;font-weight:600;border-bottom:1px solid #E8F0EC;font-size:14px;font-family:'Inter',Arial,sans-serif">${formatKr(ex.annualCost)} / år</td>
        </tr>
        ${suppRow}
        <tr${suppDisplay ? ' style="background:#F7FAF8"' : ''}>
          <td style="padding:11px 14px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;font-family:'Inter',Arial,sans-serif">Arvo-pris</td>
          <td style="padding:11px 14px;color:#1B7A6E;font-weight:700;border-bottom:1px solid #E8F0EC;font-size:14px;font-family:'Inter',Arial,sans-serif">${formatKr(r.suggestedAnnualCost)} / år</td>
        </tr>
        <tr${!suppDisplay ? ' style="background:#F7FAF8"' : ''}>
          <td style="padding:11px 14px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;font-family:'Inter',Arial,sans-serif">Bruttobesparing</td>
          <td style="padding:11px 14px;color:#0E1A17;font-weight:600;border-bottom:1px solid #E8F0EC;font-size:14px;font-family:'Inter',Arial,sans-serif">${formatKr(r.grossSaving)}</td>
        </tr>
        <tr${suppDisplay ? ' style="background:#F7FAF8"' : ''}>
          <td style="padding:11px 14px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;font-family:'Inter',Arial,sans-serif">Arvos arvode (20&nbsp;%)</td>
          <td style="padding:11px 14px;color:#3F4B47;border-bottom:1px solid #E8F0EC;font-size:14px;font-family:'Inter',Arial,sans-serif">${formatKr(r.arvoFee)}</td>
        </tr>
        <tr style="background:#DCEEEA">
          <td style="padding:13px 14px 13px 17px;color:#0E4F47;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.06em;border-left:3px solid #1B7A6E;font-family:'Inter',Arial,sans-serif">Din nettobesparing</td>
          <td style="padding:13px 14px;color:#1B7A6E;font-weight:700;font-size:18px;font-family:'Playfair Display',Georgia,serif">+${formatKr(r.netSaving)}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- License overage -->
  ${licenseBlock}

  <!-- Reasoning -->
  <tr>
    <td style="padding:28px 36px 24px">
      <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#1B7A6E;text-transform:uppercase;letter-spacing:.12em;font-family:'Inter',Arial,sans-serif">Varför vi tror du kan spara</p>
      <p style="margin:0;font-size:14px;color:#1F2E2A;line-height:1.78;font-family:'Inter',Arial,sans-serif">${r.reasoning ?? ''}</p>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="padding:4px 36px 36px;text-align:center">
      <a href="https://arvo-flow.github.io/flow/testa-faktura"
         style="display:inline-block;background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);color:#ffffff;font-weight:600;font-size:15px;padding:15px 36px;border-radius:10px;text-decoration:none;font-family:'Inter',Arial,sans-serif;letter-spacing:.01em">
        Aktivera bytet &rarr;
      </a>
      <p style="margin:14px 0 0;font-size:12px;color:#5C6E68;font-family:'Inter',Arial,sans-serif">Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.</p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="border-top:1px solid #D5E2DC;padding:20px 36px;text-align:center;background:#F1F6F3">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto 8px">
        <tr>
          <td style="padding-right:8px;vertical-align:middle">${LOGO_SVG}</td>
          <td style="vertical-align:middle">
            <span style="font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:600;color:#0E1A17">Arvo</span>
            <em style="font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:400;color:#5C6E68"> Flow</em>
          </td>
        </tr>
      </table>
      <p style="margin:0;font-size:11px;color:#5C6E68;font-family:'Inter',Arial,sans-serif">
        <a href="https://arvo-flow.se" style="color:#1B7A6E;text-decoration:none">arvo-flow.se</a>
        &nbsp;&middot;&nbsp; Du betalar 20 % av faktiskt realiserad besparing.
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
    const resend    = new Resend(process.env.RESEND_API_KEY);
    const net       = result.recommendation?.netSaving ?? 0;
    const subject   = net > 0
      ? `Din analys: Spara ${formatKr(net)} / ar pa ${result.extracted.supplier}`
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
