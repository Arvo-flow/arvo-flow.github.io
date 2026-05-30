// api/send-report.mjs — POST /api/send-report
// Genererar portfölj-PDF och skickar den som rapport till användaren
// + lead-notis till Arvos interna inkorg.
//
// Body: { fingerprint: string, email: string }
import { Resend } from 'resend';
import { createRequire } from 'module';
import { getAnalysesByFingerprint } from '../lib/invoice-store.js';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

export const config = { maxDuration: 30 };

const FROM            = process.env.RESEND_FROM          ?? 'Arvo Flow <analys@arvo-flow.se>';
const INTERNAL_EMAIL  = process.env.ARVO_INTERNAL_EMAIL  ?? 'hej@arvo-flow.se';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const T = {
  surface:   '#FFFFFF',
  ink:       '#0E1A17',
  inkSoft:   '#1F2E2A',
  mutedSoft: '#5C6E68',
  border:    '#D5E2DC',
  brand:     '#1B7A6E',
  brandSoft: '#DCEEEA',
  brandInk:  '#0E4F47',
  gradTop:   '#5DD6CA',
  gradBot:   '#1B6E66',
  warnSoft:  '#F3E5C7',
  warnBdr:   '#D4A940',
  warning:   '#A8761A',
};

function formatKr(n) {
  if (n == null) return '–';
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' kr';
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// ── Category labels ───────────────────────────────────────────────────────────
const CAT_LABEL = {
  el:                'Elavtal',
  mobil:             'Mobilabonnemang',
  bredband:          'Företagsbredband',
  'mjukvara-saas':   'Programvarulicenser',
  'saas-productivity':'Programvarulicenser',
  'saas-crm':        'CRM-system',
  'saas-finance':    'Affärssystem',
  'saas-other':      'SaaS · övrigt',
  'saas-creative':   'Kreativ mjukvara',
  skrivarleasing:    'Skrivare & MPS',
  utrustningsleasing:'IT-utrustningsleasing',
  kortterminal:      'Betaltjänster',
  'faktura-tjanst':  'Fakturatjänst',
  loneadmin:         'Löneadministration',
  'larm-bevakning':  'Larm & Bevakning',
  foretagshalsovard: 'Företagshälsovård',
  bankavgifter:      'Bankavgifter',
  kontorsmaterial:   'Kontorsmaterial',
  'städ-rengöring':  'Städ & Rengöring',
  'transport-frakt': 'Transport & Frakt',
  'it-support':      'IT-drift & Support',
  serverhosting:     'Serverhosting',
  'leasing-bil':     'Företagsleasing',
  vaxel:             'Molnväxel',
  bankavgifter:      'Bankavgifter',
  'avfall-atervinning':'Avfall & Återvinning',
};

function catLabel(cat) { return CAT_LABEL[cat] ?? cat ?? '–'; }

// ── Logo mark (same as send-analysis.mjs) ────────────────────────────────────
function drawLogoMark(doc, ox, oy, size) {
  const S    = size / 40;
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

// ── PDF ───────────────────────────────────────────────────────────────────────
function generatePortfolioPdf(analyses) {
  return new Promise((resolve, reject) => {
    const auto        = analyses.filter(a => a.route === 'auto');
    const totalCost   = auto.reduce((s, a) => s + (a.annual_cost ?? 0), 0);
    const totalSaving = auto.reduce((s, a) => s + (a.net_saving  ?? 0), 0);
    const switchCount = auto.filter(a => a.should_switch).length;

    const PAD      = 56;
    const doc      = new PDFDocument({ margin: PAD, size: 'A4' });
    const chunks   = [];
    doc.on('data', c  => chunks.push(c));
    doc.on('end',  ()  => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const PW         = 595.28;
    const W          = PW - PAD * 2;
    const FOOTER_TOP = doc.page.height - PAD - 60;
    let   y          = PAD;

    // Top gradient accent bar
    const topBar = doc.linearGradient(0, 0, PW, 0);
    topBar.stop(0, T.gradTop); topBar.stop(1, T.gradBot);
    doc.rect(0, 0, PW, 4).fill(topBar);

    // ── Header ──────────────────────────────────────────────────────────────
    const MARK = 32;
    drawLogoMark(doc, PAD, y, MARK);
    const WX = PAD + MARK + 10;
    const WY = y + (MARK - 18) / 2 + 1;
    doc.fontSize(18).font('Times-Bold').fillColor(T.ink).text('Arvo', WX, WY, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
    const today = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.fontSize(9).font('Helvetica').fillColor(T.mutedSoft)
       .text(today, PAD, WY + 1, { width: W, align: 'right' });
    y += MARK + 20;

    doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 20;

    // Title
    doc.fontSize(22).font('Helvetica-Bold').fillColor(T.ink).text('Er leverantörsportfölj', PAD, y);
    y += 30;
    doc.fontSize(10).font('Helvetica').fillColor(T.mutedSoft)
       .text(`${auto.length} analyserade fakturor  ·  ${switchCount} med besparingspotential`, PAD, y);
    y += 28;

    // ── Savings block (full-bleed gradient) ───────────────────────────────
    const BLK_H  = 88;
    const blkGrd = doc.linearGradient(0, y, PW, y + BLK_H);
    blkGrd.stop(0, T.gradTop); blkGrd.stop(1, T.gradBot);
    doc.rect(0, y, PW, BLK_H).fill(blkGrd);

    doc.fontSize(8).font('Helvetica-Bold').fillColor('rgba(255,255,255,0.60)')
       .text('TOTAL NETTOBESPARING', PAD, y + 14, { characterSpacing: 1.4 });
    doc.fontSize(36).font('Helvetica-Bold').fillColor(T.surface)
       .text('+' + formatKr(totalSaving), PAD, y + 28);
    doc.fontSize(9).font('Helvetica').fillColor('rgba(255,255,255,0.78)')
       .text(
         `Total årskkostnad: ${formatKr(totalCost)}  ·  Arvo tar 20 % av realiserad besparing`,
         PAD, y + 68, { width: W }
       );
    y += BLK_H + 28;

    // ── Table header ─────────────────────────────────────────────────────
    const C1 = PAD; const C2 = PAD + 170; const C3 = PAD + 320; const C4 = PAD + 405;
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('LEVERANTÖR',   C1, y, { characterSpacing: 0.5 })
       .text('KATEGORI',     C2, y, { characterSpacing: 0.5 })
       .text('ÅRSKKOSTNAD',  C3, y, { characterSpacing: 0.5 })
       .text('BESPARING',    C4, y, { characterSpacing: 0.5 });
    y += 12;
    doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 2;

    // ── Supplier rows ────────────────────────────────────────────────────
    const ROW_H = 26;
    for (const a of auto) {
      if (y > FOOTER_TOP - 70) { doc.addPage(); y = PAD; }

      doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.3).stroke();

      const name      = a.supplier || a.normalized_supplier || 'Okänd leverantör';
      const hasSaving = a.should_switch && (a.net_saving ?? 0) > 0;

      doc.fontSize(9.5).font('Helvetica-Bold').fillColor(T.ink)
         .text(name, C1, y + 7, { width: 155, ellipsis: true });
      doc.fontSize(9).font('Helvetica').fillColor(T.mutedSoft)
         .text(catLabel(a.category), C2, y + 7, { width: 140 });
      doc.fontSize(9.5).font('Helvetica').fillColor(T.inkSoft)
         .text(a.annual_cost != null ? formatKr(a.annual_cost) : '–', C3, y + 7, { width: 80 });

      if (hasSaving) {
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor(T.brand)
           .text('−' + formatKr(a.net_saving), C4, y + 7);
      } else {
        doc.fontSize(8.5).font('Helvetica').fillColor(T.mutedSoft)
           .text('Optimerat', C4, y + 8);
      }
      y += ROW_H;
    }

    doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 28;

    if (y > FOOTER_TOP - 90) { doc.addPage(); y = PAD; }

    // ── FOMO box ─────────────────────────────────────────────────────────
    const FOMO_H = 54;
    doc.rect(PAD, y, W, FOMO_H).fill(T.brandSoft);
    doc.rect(PAD, y, 2.5, FOMO_H).fill(T.brand);
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.brand)
       .text('LÅS UPP ER FULLSTÄNDIGA ARVO SCORE™', PAD + 10, y + 9, { characterSpacing: 0.8 });
    doc.fontSize(9).font('Helvetica').fillColor(T.inkSoft)
       .text(
         'Koppla Fortnox eller Visma — vi skannar hela er leverantörsreskontra och identifierar dolda överpriser i varje kostnadspost.',
         PAD + 10, y + 23, { width: W - 20, lineGap: 2 }
       );
    y += FOMO_H + 12;

    doc.fontSize(9.5).font('Helvetica-Bold').fillColor(T.brand)
       .text('Redo att realisera besparingen?  ', PAD, y, { continued: true });
    doc.font('Helvetica').fillColor(T.mutedSoft)
       .text('arvoflow.se  ·  hej@arvo-flow.se');

    // ── Footer (fixed position) ───────────────────────────────────────────
    const FY    = FOOTER_TOP;
    const FMARK = 14;
    const FTX   = PW / 2 - 28;
    const FTY   = FY + 10;
    doc.moveTo(PAD, FY).lineTo(PW - PAD, FY).strokeColor(T.border).lineWidth(0.5).stroke();
    drawLogoMark(doc, FTX, FTY, FMARK);
    doc.fontSize(10).font('Times-Bold').fillColor(T.ink)
       .text('Arvo', FTX + FMARK + 5, FTY + 1, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
    doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
       .text('arvoflow.se  ·  20 % av identifierad besparing. Inga fasta avgifter.',
         PAD, FY + 24, { width: W, align: 'center' });

    doc.end();
  });
}

// ── SVG logo for HTML emails ──────────────────────────────────────────────────
function logo(size, id) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#${id})" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;
}

// ── User report email ─────────────────────────────────────────────────────────
function userEmailHtml({ analyses, totalCost, totalSaving }) {
  const auto = analyses.filter(a => a.route === 'auto');
  const rows = auto.map(a => {
    const pos  = a.should_switch && (a.net_saving ?? 0) > 0;
    return `<tr>
      <td style="padding:10px 12px;font-size:13px;font-weight:600;color:#0E1A17;border-bottom:1px solid #D5E2DC;">${a.supplier || a.normalized_supplier || 'Okänd'}</td>
      <td style="padding:10px 12px;font-size:12px;color:#5C6E68;border-bottom:1px solid #D5E2DC;">${catLabel(a.category)}</td>
      <td style="padding:10px 12px;font-size:13px;color:#1F2E2A;border-bottom:1px solid #D5E2DC;">${a.annual_cost != null ? formatKr(a.annual_cost) : '–'}</td>
      <td style="padding:10px 12px;font-size:13px;font-weight:${pos ? 700 : 400};color:${pos ? '#1B7A6E' : '#5C6E68'};border-bottom:1px solid #D5E2DC;">${pos ? '−' + formatKr(a.net_saving) : 'Optimerat'}</td>
    </tr>`;
  }).join('');

  return `<!DOCTYPE html><html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F6F3;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #D5E2DC;">

  <!-- Gradient header -->
  <tr><td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:28px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>${logo(32, 'g1')}</td>
      <td style="padding-left:10px;font-size:20px;font-family:Georgia,serif;color:#fff;font-weight:bold;">Arvo <span style="font-style:italic;font-weight:400;opacity:.8;">Flow</span></td>
      <td align="right" style="font-size:11px;color:rgba(255,255,255,.7);">Din leverantörsrapport</td>
    </tr></table>
  </td></tr>

  <!-- Savings hero -->
  <tr><td style="padding:32px 36px 24px;border-bottom:1px solid #D5E2DC;">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5C6E68;">Total nettobesparing</p>
    <p style="margin:0 0 8px;font-size:40px;font-weight:800;color:#1B7A6E;letter-spacing:-.03em;">+${formatKr(totalSaving)}</p>
    <p style="margin:0;font-size:13px;color:#5C6E68;">Nuvarande total årskkostnad: <strong style="color:#0E1A17;">${formatKr(totalCost)}</strong> · Arvo tar 20 % av realiserad besparing</p>
  </td></tr>

  <!-- Supplier table -->
  <tr><td style="padding:24px 36px;">
    <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5C6E68;">Analyserade leverantörer</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #D5E2DC;border-radius:10px;overflow:hidden;">
      <thead><tr style="background:#F1F6F3;">
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Leverantör</th>
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Kategori</th>
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Årskkostnad</th>
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Besparing</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </td></tr>

  <!-- FOMO -->
  <tr><td style="padding:0 36px 24px;">
    <div style="background:#DCEEEA;border-left:3px solid #1B7A6E;border-radius:8px;padding:16px 18px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1B7A6E;">Lås upp er fullständiga Arvo Score™</p>
      <p style="margin:0;font-size:13px;color:#1F2E2A;line-height:1.6;">Koppla Fortnox eller Visma — vi skannar hela er leverantörsreskontra. En av våra experter hör av sig inom 24 timmar.</p>
    </div>
  </td></tr>

  <!-- CTA -->
  <tr><td align="center" style="padding:0 36px 36px;">
    <a href="https://arvoflow.se/connect" style="display:inline-block;background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:100px;">Koppla Fortnox / Visma →</a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#F1F6F3;padding:20px 36px;border-top:1px solid #D5E2DC;text-align:center;">
    <p style="margin:0;font-size:11px;color:#5C6E68;">arvoflow.se · 20 % av identifierad besparing. Inga fasta avgifter.</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

// ── Internal lead notification ────────────────────────────────────────────────
function leadEmailHtml({ email, analyses, totalSaving, totalCost }) {
  const auto        = analyses.filter(a => a.route === 'auto');
  const switchCount = auto.filter(a => a.should_switch).length;
  const suppRows    = auto.map(a =>
    `<tr>
      <td style="padding:8px 12px;font-size:13px;color:#0E1A17;border-bottom:1px solid #D5E2DC;">${a.supplier || a.normalized_supplier || 'Okänd'}</td>
      <td style="padding:8px 12px;font-size:12px;color:#5C6E68;border-bottom:1px solid #D5E2DC;">${catLabel(a.category)}</td>
      <td style="padding:8px 12px;font-size:13px;color:#1F2E2A;border-bottom:1px solid #D5E2DC;">${a.annual_cost != null ? formatKr(a.annual_cost) : '–'}</td>
      <td style="padding:8px 12px;font-size:13px;font-weight:${a.should_switch ? 700 : 400};color:${a.should_switch ? '#1B7A6E' : '#5C6E68'};border-bottom:1px solid #D5E2DC;">${a.should_switch && a.net_saving ? '−' + formatKr(a.net_saving) : '–'}</td>
    </tr>`
  ).join('');

  return `<!DOCTYPE html><html>
<body style="font-family:'Inter',sans-serif;background:#F1F6F3;padding:32px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:12px;border:1px solid #D5E2DC;overflow:hidden;margin:0 auto;">

  <tr><td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:20px 28px;">
    <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.8);">🔥 Nytt säljlead</p>
    <p style="margin:6px 0 0;font-size:22px;font-weight:800;color:#fff;">${email}</p>
  </td></tr>

  <tr><td style="padding:24px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:12px;color:#5C6E68;font-weight:700;text-transform:uppercase;letter-spacing:.05em;">Besparingspotential</td>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:20px;font-weight:800;color:#1B7A6E;">+${formatKr(totalSaving)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:12px;color:#5C6E68;">Total årskkostnad</td>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:14px;color:#0E1A17;">${formatKr(totalCost)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:12px;color:#5C6E68;">Fakturor analyserade</td>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:14px;color:#0E1A17;">${auto.length} st</td>
      </tr>
      <tr>
        <td style="padding:10px 0;font-size:12px;color:#5C6E68;">Med besparingspotential</td>
        <td style="padding:10px 0;font-size:14px;color:#0E1A17;">${switchCount} av ${auto.length}</td>
      </tr>
    </table>

    <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;color:#5C6E68;letter-spacing:.05em;">Leverantörslista</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #D5E2DC;border-radius:8px;overflow:hidden;">
      <thead><tr style="background:#F1F6F3;">
        <th style="padding:7px 12px;font-size:10px;color:#5C6E68;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">Leverantör</th>
        <th style="padding:7px 12px;font-size:10px;color:#5C6E68;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">Kategori</th>
        <th style="padding:7px 12px;font-size:10px;color:#5C6E68;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">Kostnad</th>
        <th style="padding:7px 12px;font-size:10px;color:#5C6E68;text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">Besparing</th>
      </tr></thead>
      <tbody>${suppRows}</tbody>
    </table>
  </td></tr>

</table>
</body></html>`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST stöds' });

  let body;
  try {
    body = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON' });
  }

  const { fingerprint, email } = body ?? {};

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return send(res, 400, { error: 'Ogiltig e-postadress' });
  }
  if (!fingerprint || typeof fingerprint !== 'string' || fingerprint.length < 8) {
    return send(res, 400, { error: 'fingerprint saknas' });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return send(res, 500, { error: 'RESEND_API_KEY saknas' });

  const analyses = await getAnalysesByFingerprint(fingerprint);
  const auto     = analyses.filter(a => a.route === 'auto');
  if (auto.length === 0) return send(res, 400, { error: 'Inga analyserade fakturor hittades' });

  const totalCost   = auto.reduce((s, a) => s + (a.annual_cost ?? 0), 0);
  const totalSaving = auto.reduce((s, a) => s + (a.net_saving  ?? 0), 0);

  const pdfBuffer = await generatePortfolioPdf(analyses);
  const resend    = new Resend(resendKey);

  await Promise.all([
    resend.emails.send({
      from:        FROM,
      to:          email,
      subject:     `Din Arvo-rapport: +${formatKr(totalSaving)} i besparingspotential`,
      html:        userEmailHtml({ analyses, totalCost, totalSaving }),
      attachments: [{ filename: 'arvo-rapport.pdf', content: pdfBuffer }],
    }),
    resend.emails.send({
      from:    FROM,
      to:      INTERNAL_EMAIL,
      subject: `🔥 Nytt lead: ${email} — +${formatKr(totalSaving)} besparingspotential`,
      html:    leadEmailHtml({ email, analyses, totalSaving, totalCost }),
    }),
  ]);

  return send(res, 200, { ok: true });
}
