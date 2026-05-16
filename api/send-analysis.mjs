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

// ── Brand tokens ──────────────────────────────────────────────────────────────
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

// ── Supplier display rules ────────────────────────────────────────────────────
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
  el:               'Elavtal',
  mobil:            'Mobilabonnemang',
  bredband:         'Företagsbredband',
  'mjukvara-saas':  'Programvarulicenser / SaaS',
  skrivarleasing:   'Skrivare & Managed Print',
  kortterminal:     'Betaltjänster',
  'faktura-tjanst': 'Fakturatjänst / Affärssystem',
  loneadmin:        'Löneadministration',
  'larm-bevakning': 'Larm & Bevakning',
  foretagshalsovard:'Företagshälsovård',
  bankavgifter:     'Bankavgifter',
  kontorsmaterial:  'Kontorsmaterial',
  'städ-rengöring': 'Städ & Rengöring',
  'transport-frakt':'Transport & Frakt',
  'it-support':     'IT-drift & Support',
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
// Design principles:
//  - Proper page margins (56pt each side) so content feels contained
//  - No alternating row colors — clean white with hairline borders only
//  - Only the net-saving row and savings block carry brand color
//  - Logo mark and wordmark share exact vertical center

function generatePdf(result) {
  return new Promise((resolve, reject) => {
    const { extracted: ex, categorized: cat, recommendation: r } = result;
    const suppDisplay = displayedSupplier(cat, r);
    const catLabel    = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';

    const PAD = 56;
    const doc = new PDFDocument({ margin: PAD, size: 'A4' });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const PW = 595.28;
    const W  = PW - PAD * 2;  // 483pt usable width
    let y = PAD;

    // ── Header: logo mark + wordmark ─────────────────────────────────────────
    const MARK = 32;
    drawLogoMark(doc, PAD, y, MARK);

    // Wordmark vertically centered with the mark
    const WX   = PAD + MARK + 10;
    const WY   = y + (MARK - 18) / 2 + 1; // center 18pt text within 32pt mark
    doc.fontSize(18).font('Times-Bold').fillColor(T.ink).text('Arvo', WX, WY, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');

    // Subtitle right-aligned, same vertical center
    doc.fontSize(9).font('Helvetica').fillColor(T.mutedSoft)
      .text('Din leverantörsanalys', PAD, WY + 1, { width: W, align: 'right' });

    y += MARK + 20;

    // Hairline rule
    doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 20;

    // ── Supplier + category ───────────────────────────────────────────────────
    doc.fontSize(20).font('Times-Bold').fillColor(T.ink).text(ex.supplier ?? '', PAD, y);
    y += 26;
    doc.fontSize(10).font('Helvetica').fillColor(T.mutedSoft).text(catLabel, PAD, y);
    y += 28;

    // ── Savings block (full-bleed gradient) ───────────────────────────────────
    // Temporarily leave margins to draw full-width
    const BLK_H = 104;
    const blkGrad = doc.linearGradient(0, y, PW, y + BLK_H);
    blkGrad.stop(0, T.gradTop);
    blkGrad.stop(1, T.gradBot);
    doc.rect(0, y, PW, BLK_H).fill(blkGrad);

    doc.fontSize(8).font('Helvetica-Bold').fillColor('rgba(255,255,255,0.60)')
      .text('DIN NETTOBESPARING', PAD, y + 16, { characterSpacing: 1.4 });
    doc.fontSize(40).font('Times-Bold').fillColor(T.surface)
      .text('+' + formatKr(r.netSaving), PAD, y + 30);

    const costLine =
      formatKr(ex.annualCost) + ' till ' + formatKr(r.suggestedAnnualCost) + ' / ar' +
      (suppDisplay ? '  hos  ' + suppDisplay : '') +
      '   ·   Arvos arvode ' + formatKr(r.arvoFee) + ' (20 %)';
    doc.fontSize(9.5).font('Helvetica').fillColor('rgba(255,255,255,0.78)')
      .text(costLine, PAD, y + 78, { width: W });

    y += BLK_H + 28;

    // ── Details table — white rows, hairline borders only ────────────────────
    const ROW_H = 28;
    const LC = PAD;
    const RC = PAD + 210;

    const row = (label, value, opts = {}) => {
      // Just a top hairline — no background colors
      doc.moveTo(LC, y).lineTo(PW - LC, y).strokeColor(T.border).lineWidth(0.3).stroke();
      doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
        .text(label.toUpperCase(), LC, y + 8, { width: 200, characterSpacing: 0.5 });
      doc.fontSize(10.5)
        .font(opts.bold ? 'Times-Bold' : 'Helvetica')
        .fillColor(opts.color ?? (opts.bold ? T.brand : T.inkSoft))
        .text(value ?? '–', RC, y + 7, { width: W - 210 });
      y += ROW_H;
    };

    row('Nuvarande leverantör', ex.supplier);
    row('Du betalar idag',      formatKr(ex.annualCost) + ' / ar');
    row('Fakturadatum',         ex.date ?? '–');
    if (suppDisplay) row('Föreslagen leverantör', suppDisplay, { bold: true });
    row('Arvo-pris',            formatKr(r.suggestedAnnualCost) + ' / ar', { bold: true });
    row('Bruttobesparing',      formatKr(r.grossSaving));
    row('Arvos arvode (20 %)',  formatKr(r.arvoFee));

    // Net saving row — brand soft background, left accent line
    doc.moveTo(LC, y).lineTo(PW - LC, y).strokeColor(T.border).lineWidth(0.3).stroke();
    doc.rect(LC, y, W, ROW_H).fill(T.brandSoft);
    doc.rect(LC, y, 2.5, ROW_H).fill(T.brand);
    doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brandInk)
      .text('DIN NETTOBESPARING', LC + 8, y + 8, { characterSpacing: 0.5 });
    doc.fontSize(12).font('Times-Bold').fillColor(T.brand)
      .text('+' + formatKr(r.netSaving), RC, y + 7);
    y += ROW_H;
    // Bottom border of table
    doc.moveTo(LC, y).lineTo(PW - LC, y).strokeColor(T.border).lineWidth(0.3).stroke();

    // License overage
    if (r.licenseOverage > 0) {
      y += 16;
      const OH = 44;
      doc.rect(LC, y, W, OH).fill(T.warnSoft);
      doc.rect(LC, y, 2.5, OH).fill(T.warnBdr);
      doc.fontSize(8).font('Helvetica-Bold').fillColor(T.warning)
        .text('NOTERING OM LICENSER', LC + 10, y + 9, { characterSpacing: 0.5 });
      doc.fontSize(9).font('Helvetica').fillColor(T.inkSoft)
        .text(
          r.licenseOverage + ' överflödiga licenser — ytterligare ' + formatKr(r.overageSavings) + ' att spara.',
          LC + 10, y + 23, { width: W - 20 }
        );
      y += OH;
    }

    // ── Reasoning ─────────────────────────────────────────────────────────────
    y += 24;
    doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brand)
      .text('VARFÖR VI TROR DU KAN SPARA', PAD, y, { characterSpacing: 0.9 });
    y += 14;
    doc.fontSize(10.5).font('Helvetica').fillColor(T.inkSoft)
      .text(r.reasoning ?? '', PAD, y, { width: W, lineGap: 3 });

    // ── Footer ────────────────────────────────────────────────────────────────
    const FY = 806;
    doc.moveTo(PAD, FY).lineTo(PW - PAD, FY).strokeColor(T.border).lineWidth(0.5).stroke();

    const FMARK = 14;
    const FTX   = PW / 2 - 28;
    const FTY   = FY + 10;
    drawLogoMark(doc, FTX, FTY, FMARK);
    doc.fontSize(10).font('Times-Bold').fillColor(T.ink)
      .text('Arvo', FTX + FMARK + 5, FTY + 1, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
    doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
      .text('arvo-flow.se  ·  20 % av realiserad besparing. Inga fasta avgifter.', PAD, FY + 24, { width: W, align: 'center' });

    doc.end();
  });
}

// ── HTML email ─────────────────────────────────────────────────────────────────
// Design principles:
//  - No alternating row colors — clean white table with hairline borders
//  - Only "Din nettobesparing" row gets the brand-soft accent
//  - Footer: light #F1F6F3 with logo, no dark block

const LOGO_SVG = `<svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#lg)" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;

function htmlEmail(result) {
  const { extracted: ex, categorized: cat, recommendation: r } = result;
  const catLabel    = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';
  const suppDisplay = displayedSupplier(cat, r);

  const licenseBlock = r.licenseOverage > 0
    ? `<tr><td style="padding:0 40px 24px">
        <div style="border-left:2px solid #D4A940;background:#F3E5C7;padding:14px 18px;border-radius:0 6px 6px 0">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#A8761A;letter-spacing:.09em;text-transform:uppercase;font-family:'Inter',Arial,sans-serif">Notering om licenser</p>
          <p style="margin:0;font-size:13px;color:#1F2E2A;line-height:1.65;font-family:'Inter',Arial,sans-serif">${r.licenseOverage} överflödiga licenser — ytterligare ${formatKr(r.overageSavings)} att spara.</p>
        </div>
      </td></tr>`
    : '';

  const suppRow = suppDisplay
    ? `<tr>
        <td style="padding:13px 16px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;width:44%;font-family:'Inter',Arial,sans-serif">Föreslagen leverantör</td>
        <td style="padding:13px 16px;color:#1B7A6E;font-weight:700;border-bottom:1px solid #E8F0EC;font-size:15px;font-family:'Inter',Arial,sans-serif">${suppDisplay}</td>
      </tr>`
    : '';

  // Simple white row helper (inline to keep template readable)
  const wr = (label, val, bold = false, color = '#1F2E2A') =>
    `<tr>
      <td style="padding:13px 16px;color:#5C6E68;border-bottom:1px solid #E8F0EC;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;width:44%;font-family:'Inter',Arial,sans-serif">${label}</td>
      <td style="padding:13px 16px;color:${color};font-weight:${bold ? 700 : 500};border-bottom:1px solid #E8F0EC;font-size:${bold ? 15 : 14}px;font-family:'Inter',Arial,sans-serif">${val}</td>
    </tr>`;

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
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 2px 16px rgba(14,26,23,0.07)">

  <!-- Logo header -->
  <tr>
    <td style="padding:24px 40px;border-bottom:1px solid #D5E2DC;background:#F1F6F3">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="vertical-align:middle">
          ${LOGO_SVG}
          <span style="margin-left:9px;font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:600;color:#0E1A17;vertical-align:middle">Arvo</span>
          <em style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:400;color:#5C6E68;vertical-align:middle"> Flow</em>
        </td>
        <td style="text-align:right;vertical-align:middle">
          <span style="font-size:10px;color:#5C6E68;font-family:'Inter',Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;font-weight:600">${catLabel}</span>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- Supplier name -->
  <tr>
    <td style="padding:24px 40px 20px;border-bottom:1px solid #E8F0EC">
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:600;color:#0E1A17;letter-spacing:-.3px;line-height:1.2">${ex.supplier}</p>
    </td>
  </tr>

  <!-- Savings block -->
  <tr>
    <td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:34px 40px 30px">
      <p style="margin:0 0 10px;font-size:9px;font-weight:700;color:rgba(255,255,255,0.60);text-transform:uppercase;letter-spacing:.18em;font-family:'Inter',Arial,sans-serif">Din nettobesparing</p>
      <p style="margin:0 0 14px;font-size:54px;font-weight:700;color:#ffffff;line-height:1;letter-spacing:-2px;font-family:'Playfair Display',Georgia,serif">+${formatKr(r.netSaving)}</p>
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.6;font-family:'Inter',Arial,sans-serif">
        ${formatKr(ex.annualCost)} &rarr; ${formatKr(r.suggestedAnnualCost)} / år
        ${suppDisplay ? `hos <strong style="color:#ffffff">${suppDisplay}</strong>` : ''}
        &nbsp;&middot;&nbsp; Arvos fee ${formatKr(r.arvoFee)} (20&nbsp;%)
      </p>
    </td>
  </tr>

  <!-- Details table — white rows only, hairline borders -->
  <tr>
    <td style="padding:28px 40px 8px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid #E8F0EC">
        ${wr('Nuvarande leverantör', ex.supplier)}
        ${wr('Du betalar idag', formatKr(ex.annualCost) + ' / år')}
        ${suppRow}
        ${wr('Arvo-pris', formatKr(r.suggestedAnnualCost) + ' / år', true, '#1B7A6E')}
        ${wr('Bruttobesparing', formatKr(r.grossSaving))}
        ${wr('Arvos arvode (20&nbsp;%)', formatKr(r.arvoFee))}
        <!-- Net saving — only accent row -->
        <tr style="background:#DCEEEA">
          <td style="padding:14px 16px 14px 19px;color:#0E4F47;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.07em;border-left:2.5px solid #1B7A6E;font-family:'Inter',Arial,sans-serif">Din nettobesparing</td>
          <td style="padding:14px 16px;color:#1B7A6E;font-weight:700;font-size:20px;font-family:'Playfair Display',Georgia,serif">+${formatKr(r.netSaving)}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- License overage -->
  ${licenseBlock}

  <!-- Reasoning -->
  <tr>
    <td style="padding:28px 40px 24px">
      <p style="margin:0 0 10px;font-size:9px;font-weight:700;color:#1B7A6E;text-transform:uppercase;letter-spacing:.14em;font-family:'Inter',Arial,sans-serif">Varför vi tror du kan spara</p>
      <p style="margin:0;font-size:14px;color:#1F2E2A;line-height:1.8;font-family:'Inter',Arial,sans-serif">${r.reasoning ?? ''}</p>
    </td>
  </tr>

  <!-- CTA -->
  <tr>
    <td style="padding:4px 40px 36px;text-align:center">
      <a href="https://arvo-flow.github.io/flow/testa-faktura"
         style="display:inline-block;background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);color:#ffffff;font-weight:600;font-size:15px;padding:15px 38px;border-radius:10px;text-decoration:none;font-family:'Inter',Arial,sans-serif">
        Aktivera bytet &rarr;
      </a>
      <p style="margin:14px 0 0;font-size:12px;color:#5C6E68;font-family:'Inter',Arial,sans-serif">Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.</p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="border-top:1px solid #D5E2DC;padding:22px 40px;text-align:center;background:#F1F6F3">
      <div style="margin-bottom:8px">
        ${LOGO_SVG}
        <span style="margin-left:8px;font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:600;color:#0E1A17;vertical-align:middle">Arvo</span>
        <em style="font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:400;color:#5C6E68;vertical-align:middle"> Flow</em>
      </div>
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
