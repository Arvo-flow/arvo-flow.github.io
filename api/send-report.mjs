// api/send-report.mjs — POST /api/send-report
// Body: { fingerprint: string, email: string }
import { Resend } from 'resend';
import { createRequire } from 'module';
import { getAnalysesByFingerprint } from '../lib/invoice-store.js';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

export const config = { maxDuration: 30 };

const FROM           = process.env.RESEND_FROM         ?? 'Arvo Flow <analys@arvo-flow.se>';
const INTERNAL_EMAIL = process.env.ARVO_INTERNAL_EMAIL ?? 'hej@arvo-flow.se';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const T = {
  surface:   '#FFFFFF',
  ink:       '#0E1A17',
  inkSoft:   '#1F2E2A',
  mutedSoft: '#5C6E68',
  border:    '#D5E2DC',
  brand:     '#1B7A6E',
  brandSoft: '#DCEEEA',
  gradTop:   '#5DD6CA',
  gradBot:   '#1B6E66',
  red:       '#C0392B',
  yellow:    '#D4A940',
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
  el:                 'Elavtal',
  mobil:              'Mobilabonnemang',
  bredband:           'Foretagsbredband',
  'mjukvara-saas':    'Programvarulicenser',
  'saas-productivity':'Programvarulicenser',
  'saas-crm':         'CRM-system',
  'saas-finance':     'Affarssystem',
  'saas-other':       'SaaS, ovrigt',
  'saas-creative':    'Kreativ mjukvara',
  skrivarleasing:     'Skrivare & MPS',
  utrustningsleasing: 'IT-utrustningsleasing',
  kortterminal:       'Betaltjanster',
  'faktura-tjanst':   'Fakturatjanst',
  loneadmin:          'Loneadministration',
  'larm-bevakning':   'Larm & Bevakning',
  foretagshalsovard:  'Foretagshalsovard',
  bankavgifter:       'Bankavgifter',
  kontorsmaterial:    'Kontorsmaterial',
  'stad-rengoring':   'Stad & Rengoring',
  'transport-frakt':  'Transport & Frakt',
  'it-support':       'IT-drift & Support',
  serverhosting:      'Serverhosting',
  'leasing-bil':      'Foretagsleasing',
  vaxel:              'Molnvaxel',
  'avfall-atervinning':'Avfall & Atervinning',
};

function catLabel(cat) { return CAT_LABEL[cat] ?? cat ?? '–'; }

// ── Arvo Score (0–100, higher = more optimized) ───────────────────────────────
function calcArvoScore(totalCost, totalSaving) {
  if (totalCost <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((1 - totalSaving / totalCost) * 100)));
}

// ── Traffic light per supplier ────────────────────────────────────────────────
function trafficLight(a) {
  if (!a.should_switch || (a.net_saving ?? 0) <= 0) return 'green';
  const pct = a.annual_cost > 0 ? a.net_saving / a.annual_cost : 0;
  return pct >= 0.15 ? 'red' : 'yellow';
}

// ── Category-aware AI diagnos ─────────────────────────────────────────────────
function aiDiagnos(a) {
  if (!a.should_switch || (a.net_saving ?? 0) <= 0) {
    return 'Optimalt avtal. Ni har ratt moduler for ert behov. Inga atgarder kravs.';
  }
  const yr = new Date().getFullYear();
  const map = {
    'mjukvara-saas':     `Identifierad overlicensiering. Avtalsmodellen ar foraldrard jomfort med ${yr} ars marknadspriser.`,
    'saas-productivity': `Identifierad overlicensiering. Avtalsmodellen ar foraldrard jomfort med ${yr} ars marknadspriser.`,
    'saas-crm':          'Licensstrukturen overstiger behoven. Alternativa avtalsnivaoer tillgangliga till lagre kostnad.',
    'saas-finance':      'Affarssystemet prissatts over marknadsnorm. Forhandlingsutrymme identifierat.',
    mobil:               'Dolda avgifter och ineffektiv paketetering. Marknaden har rort sig sedan avtalet tecknades.',
    bredband:            'Kapaciteten matchar inte prisnivan. Kvalificerade alternativ tillgangliga till lagre kostnad.',
    el:                  'Rorligt spotpris ger exponering mot prispikar. Battre avtalsstruktur tillganglig.',
    skrivarleasing:      'Klickkostnader och serviceavgifter overstiger marknadsnorm. Avtalstrukturen gynnar leverantoren.',
    utrustningsleasing:  'Leasingvillkoren ar ogynnsamma jomfort med aktuella marknadspriser.',
    kortterminal:        'Transaktionsavgifterna overstiger branschstandard. Forhandlingsutrymme identifierat.',
    loneadmin:           'Prisnivan ar hog jomfort med moderna alternativ pa marknaden.',
    'it-support':        'Supportavtalet prissatts over marknadssnittet for er supportniva.',
    serverhosting:       'Hostingkostnaden overstiger jomforbara tjanster. Modernare alternativ tillgangliga.',
  };
  const savePct = a.annual_cost > 0 ? Math.round((a.net_saving / a.annual_cost) * 100) : 0;
  return map[a.category] ?? `Kostnadsnivan overstiger branschsnittet med ${savePct} %. Omforhandling rekommenderas.`;
}

// ── PDF helpers ───────────────────────────────────────────────────────────────
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

function miniHeader(doc, PAD, W, PW, pageLabel) {
  const y = PAD;
  drawLogoMark(doc, PAD, y, 22);
  doc.fontSize(10).font('Times-Bold').fillColor(T.ink)
     .text('Arvo', PAD + 30, y + 4, { continued: true });
  doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
  doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
     .text(`Leverantorsrevision  .  ${pageLabel}`, PAD, y + 5, { width: W, align: 'right' });
  const divY = y + 28;
  doc.moveTo(PAD, divY).lineTo(PW - PAD, divY).strokeColor(T.border).lineWidth(0.5).stroke();
  return divY + 20;
}

function pageFooter(doc, PAD, W, PW, PH) {
  const fy = PH - PAD - 24;
  doc.moveTo(PAD, fy).lineTo(PW - PAD, fy).strokeColor(T.border).lineWidth(0.3).stroke();
  doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
     .text(
       'arvoflow.se  .  hej@arvoflow.se  .  No Cure, No Pay - 20 % av realiserad besparing. Inga fasta avgifter.',
       PAD, fy + 8, { width: W, align: 'center' }
     );
}

// ── PDF: 1 sida (<=3 leverantorer) eller 2 sidor (4+) ────────────────────────
function generatePortfolioPdf(analyses) {
  return new Promise((resolve, reject) => {
    const auto        = analyses.filter(a => a.route === 'auto');
    const totalCost   = auto.reduce((s, a) => s + (a.annual_cost ?? 0), 0);
    const totalSaving = auto.reduce((s, a) => s + (a.net_saving  ?? 0), 0);
    const switchCount = auto.filter(a => a.should_switch).length;
    const score       = calcArvoScore(totalCost, totalSaving);
    const scoreColor  = score >= 85 ? T.brand : score >= 70 ? T.yellow : T.red;

    const sorted = [...auto].sort((a, b) => {
      const order = { red: 0, yellow: 1, green: 2 };
      return (order[trafficLight(a)] ?? 3) - (order[trafficLight(b)] ?? 3);
    });

    const PAD    = 48;
    const PW     = 595.28;
    const PH     = 841.89;
    const W      = PW - PAD * 2;
    const CARD_H = 60;

    // >3 suppliers: analysis page 1, next steps page 2
    const useTwoPages = sorted.length > 3;

    const doc    = new PDFDocument({ margin: PAD, size: 'A4', autoFirstPage: true });
    const chunks = [];
    doc.on('data', c  => chunks.push(c));
    doc.on('end',  () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const today = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

    const LIGHT_COLOR = { red: T.red, yellow: T.yellow, green: T.brand };
    const LIGHT_LABEL = { red: 'Rod - Atgard kravs', yellow: 'Gul - Bevaka', green: 'Gron - Optimalt' };

    // ════════════════════════════════════════════════════════════════════════
    // SIDA 1 — Analys
    // ════════════════════════════════════════════════════════════════════════
    const topBar = doc.linearGradient(0, 0, PW, 0);
    topBar.stop(0, T.gradTop); topBar.stop(1, T.gradBot);
    doc.rect(0, 0, PW, 5).fill(topBar);

    let y = PAD;

    // ── Header ──
    const MARK = 24;
    drawLogoMark(doc, PAD, y, MARK);
    const ly = y + 4;
    doc.fontSize(13).font('Times-Bold').fillColor(T.ink)
       .text('Arvo', PAD + MARK + 7, ly, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
    doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
       .text('Leverantorsrevision  .  ' + today, PAD, ly + 2, { width: W, align: 'right' });
    y += MARK + 16;
    doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 30;

    // ── Hero: besparingspotential ──
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('IDENTIFIERAD BESPARINGSPOTENTIAL', PAD, y, { width: W, align: 'center', characterSpacing: 1.6 });
    y += 16;
    doc.fontSize(56).font('Helvetica-Bold').fillColor(T.brand)
       .text('+' + formatKr(totalSaving), PAD, y, { width: W, align: 'center' });
    y += 62;
    doc.fontSize(9).font('Helvetica').fillColor(T.mutedSoft)
       .text('Nuvarande total arskostnad: ' + formatKr(totalCost), PAD, y, { width: W, align: 'center' });
    y += 24;
    doc.moveTo(PAD + 90, y).lineTo(PW - PAD - 90, y).strokeColor(T.border).lineWidth(0.4).stroke();
    y += 18;

    // ── Arvo Score ──
    const SBX_H = 62;
    doc.rect(PAD, y, W, SBX_H).fill('#F4FAF8');
    doc.rect(PAD, y, W, SBX_H).strokeColor(T.border).lineWidth(0.5).stroke();
    doc.rect(PAD, y, 3, SBX_H).fill(scoreColor);
    doc.fontSize(7).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('ARVO SCORE', PAD + 14, y + 9, { characterSpacing: 1.2 });
    doc.fontSize(7).font('Helvetica').fillColor(T.mutedSoft)
       .text('TM', PAD + 14 + 52, y + 9);
    doc.fontSize(30).font('Helvetica-Bold').fillColor(scoreColor)
       .text(String(score), PAD + 14, y + 20, { continued: true, lineBreak: false });
    doc.fontSize(10).font('Helvetica').fillColor(T.mutedSoft).text('/100');
    const scoreText = score >= 85
      ? 'Er avtalsportfolj ar valoptimerad.'
      : 'Er avtalsportfolj presterar under branschstandard (85+) for bolag av er storlek.';
    doc.fontSize(8.5).font('Helvetica').fillColor(T.inkSoft)
       .text(scoreText, PAD + 110, y + 22, { width: W - 124, lineGap: 2 });
    y += SBX_H + 20;

    // ── Leverantorsanalys rubrik ──
    doc.fontSize(7).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('LEVERANTORSANALYS', PAD, y, { characterSpacing: 1.5 });
    y += 12;

    // ── Leverantorskort ──
    for (const a of sorted) {
      if (y > PH - PAD - CARD_H - 10) { doc.addPage(); y = PAD; }

      const light  = trafficLight(a);
      const lColor = LIGHT_COLOR[light];
      const name   = a.supplier || a.normalized_supplier || 'Okand leverantor';
      const hasSav = a.should_switch && (a.net_saving ?? 0) > 0;

      doc.rect(PAD, y, W, CARD_H).fill('#FAFCFB');
      doc.rect(PAD, y, W, CARD_H).strokeColor(T.border).lineWidth(0.4).stroke();
      doc.rect(PAD, y, 3, CARD_H).fill(lColor);

      doc.save();
      doc.circle(PAD + 17, y + 11, 4).fill(lColor);
      doc.restore();

      doc.fontSize(10.5).font('Helvetica-Bold').fillColor(T.ink)
         .text(name, PAD + 30, y + 5, { width: W - 130 });
      doc.fontSize(7).font('Helvetica').fillColor(T.mutedSoft)
         .text(catLabel(a.category) + '  |  ' + LIGHT_LABEL[light], PAD + 30, y + 19, { width: W - 130 });
      doc.fontSize(7).font('Helvetica').fillColor(T.mutedSoft)
         .text(aiDiagnos(a), PAD + 30, y + 31, { width: W - 130, lineGap: 1 });

      if (hasSav) {
        doc.fontSize(6.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
           .text('BESPARING/AR', PW - PAD - 92, y + 7, { width: 92, align: 'right', characterSpacing: 0.4 });
        doc.fontSize(12).font('Helvetica-Bold').fillColor(T.brand)
           .text('-' + formatKr(a.net_saving), PW - PAD - 92, y + 20, { width: 92, align: 'right' });
      } else {
        doc.fontSize(9).font('Helvetica-Bold').fillColor(T.brand)
           .text('Optimerat', PW - PAD - 75, y + 23, { width: 75, align: 'right' });
      }

      y += CARD_H + 6;
    }

    if (useTwoPages) {
      y += 8;
      doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
         .text(
           auto.length + ' analyserade fakturor  .  ' + switchCount + ' leverantorer med besparingspotential  .  Arvo tar 20 % av realiserad besparing',
           PAD, y, { width: W, align: 'center' }
         );
      pageFooter(doc, PAD, W, PW, PH);

      // ════════════════════════════════════════════════════════════════════
      // SIDA 2 — Nasta steg
      // ════════════════════════════════════════════════════════════════════
      doc.addPage();
      y = miniHeader(doc, PAD, W, PW, 'Sida 2 av 2');
    } else {
      y += 10;
      doc.moveTo(PAD + 70, y).lineTo(PW - PAD - 70, y).strokeColor(T.border).lineWidth(0.3).stroke();
      y += 16;
    }

    // ── Nasta steg ──
    doc.fontSize(7).font('Helvetica-Bold').fillColor(T.brand)
       .text('NASTA STEG', PAD, y, { characterSpacing: 1.5 });
    y += 14;

    // White CTA card
    const CTACARD_H = 96;
    doc.rect(PAD, y, W, CTACARD_H).fill('#FFFFFF');
    doc.rect(PAD, y, W, CTACARD_H).strokeColor(T.border).lineWidth(0.5).stroke();
    const cardGrad = doc.linearGradient(PAD, y, PAD + W, y + CTACARD_H);
    cardGrad.stop(0, T.gradTop); cardGrad.stop(1, T.gradBot);
    doc.rect(PAD, y, W, 3).fill(cardGrad);

    // Title + TM superscript
    const ctaTitleText = 'Las upp er fullstandiga Arvo Score';
    doc.fontSize(13).font('Helvetica-Bold').fillColor(T.ink);
    const ctaTitleW = doc.widthOfString(ctaTitleText);
    doc.text(ctaTitleText, PAD + 20, y + 16, { lineBreak: false });
    doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
       .text('TM', PAD + 20 + ctaTitleW + 2, y + 13, { lineBreak: false });

    // Body text
    doc.fontSize(8.5).font('Helvetica').fillColor(T.mutedSoft)
       .text(
         'Koppla ert Fortnox- eller Visma-konto for att automatiskt importera era leverantorsfakturor och fa er kompletta portfoljanalys.',
         PAD + 20, y + 36, { width: W - 200, lineGap: 1.5 }
       );

    // Gradient pill button (right side, vertically centered)
    const BTN_W  = 150;
    const BTN_H  = 30;
    const btnX   = PAD + W - BTN_W - 16;
    const btnY   = y + CTACARD_H / 2 - BTN_H / 2;
    const btnGrd = doc.linearGradient(btnX, btnY, btnX + BTN_W, btnY + BTN_H);
    btnGrd.stop(0, T.gradTop); btnGrd.stop(1, T.gradBot);
    doc.roundedRect(btnX, btnY, BTN_W, BTN_H, BTN_H / 2).fill(btnGrd);
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#FFFFFF')
       .text('Koppla Fortnox / Visma ->', btnX, btnY + (BTN_H - 9) / 2, { width: BTN_W, align: 'center', lineBreak: false });

    y += CTACARD_H + 16;

    pageFooter(doc, PAD, W, PW, PH);

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
  const score = calcArvoScore(totalCost, totalSaving);
  const scoreColor = score >= 85 ? '#1B7A6E' : score >= 70 ? '#D4A940' : '#C0392B';

  const rows = auto
    .sort((a, b) => {
      const order = { red: 0, yellow: 1, green: 2 };
      return (order[trafficLight(a)] ?? 3) - (order[trafficLight(b)] ?? 3);
    })
    .map(a => {
      const light = trafficLight(a);
      const dot   = { red: '🔴', yellow: '🟡', green: '🟢' }[light];
      const pos   = a.should_switch && (a.net_saving ?? 0) > 0;
      return `<tr>
        <td style="padding:10px 12px;font-size:13px;font-weight:600;color:#0E1A17;border-bottom:1px solid #D5E2DC;">${dot} ${a.supplier || a.normalized_supplier || 'Okänd'}</td>
        <td style="padding:10px 12px;font-size:12px;color:#5C6E68;border-bottom:1px solid #D5E2DC;">${catLabel(a.category)}</td>
        <td style="padding:10px 12px;font-size:13px;color:#1F2E2A;border-bottom:1px solid #D5E2DC;">${a.annual_cost != null ? formatKr(a.annual_cost) : '–'}</td>
        <td style="padding:10px 12px;font-size:13px;font-weight:${pos ? 700 : 400};color:${pos ? '#1B7A6E' : '#5C6E68'};border-bottom:1px solid #D5E2DC;">${pos ? '-' + formatKr(a.net_saving) : 'Optimerat'}</td>
      </tr>`;
    }).join('');

  return `<!DOCTYPE html><html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F6F3;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #D5E2DC;">

  <tr><td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:28px 36px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td>${logo(32, 'g1')}</td>
      <td style="padding-left:10px;font-size:20px;font-family:Georgia,serif;color:#fff;font-weight:bold;">Arvo <span style="font-style:italic;font-weight:400;opacity:.8;">Flow</span></td>
      <td align="right" style="font-size:11px;color:rgba(255,255,255,.7);">Leverantörsrevision</td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:32px 36px 24px;border-bottom:1px solid #D5E2DC;">
    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5C6E68;">Identifierad besparingspotential</p>
    <p style="margin:0 0 8px;font-size:40px;font-weight:800;color:#1B7A6E;letter-spacing:-.03em;">+${formatKr(totalSaving)}</p>
    <p style="margin:0 0 16px;font-size:13px;color:#5C6E68;">Nuvarande total årskostnad: <strong style="color:#0E1A17;">${formatKr(totalCost)}</strong></p>
    <div style="display:inline-block;background:#F4FAF8;border:1px solid #D5E2DC;border-left:3px solid ${scoreColor};border-radius:6px;padding:10px 16px;">
      <span style="font-size:11px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.06em;">Arvo Score™ </span>
      <span style="font-size:20px;font-weight:800;color:${scoreColor};">${score}/100</span>
    </div>
  </td></tr>

  <tr><td style="padding:24px 36px;">
    <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#5C6E68;">Leverantörsanalys</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #D5E2DC;border-radius:10px;overflow:hidden;">
      <thead><tr style="background:#F1F6F3;">
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Leverantör</th>
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Kategori</th>
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Årskostnad</th>
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Besparing</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </td></tr>

  <tr><td style="padding:0 36px 24px;">
    <div style="background:#DCEEEA;border-left:3px solid #1B7A6E;border-radius:8px;padding:16px 18px;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1B7A6E;">Låt oss hämta hem pengarna</p>
      <p style="margin:0;font-size:13px;color:#1F2E2A;line-height:1.6;">Koppla Fortnox eller Visma — vi skannar hela er leverantörsreskontra och kontaktar dig inom 24 timmar.</p>
    </div>
  </td></tr>

  <tr><td align="center" style="padding:0 36px 36px;">
    <a href="https://arvoflow.se/connect" style="display:inline-block;background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);color:#fff;text-decoration:none;font-size:14px;font-weight:700;padding:14px 32px;border-radius:100px;">Koppla Fortnox / Visma →</a>
  </td></tr>

  <tr><td style="background:#F1F6F3;padding:20px 36px;border-top:1px solid #D5E2DC;text-align:center;">
    <p style="margin:0;font-size:11px;color:#5C6E68;">arvoflow.se · No Cure, No Pay — 20 % av realiserad besparing. Inga fasta avgifter.</p>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

// ── Internal lead notification ────────────────────────────────────────────────
function leadEmailHtml({ email, analyses, totalSaving, totalCost }) {
  const auto        = analyses.filter(a => a.route === 'auto');
  const switchCount = auto.filter(a => a.should_switch).length;
  const score       = calcArvoScore(totalCost, totalSaving);
  const suppRows    = auto
    .sort((a, b) => (b.net_saving ?? 0) - (a.net_saving ?? 0))
    .map(a => {
      const light = trafficLight(a);
      const dot   = { red: '🔴', yellow: '🟡', green: '🟢' }[light];
      return `<tr>
        <td style="padding:8px 12px;font-size:13px;color:#0E1A17;border-bottom:1px solid #D5E2DC;">${dot} ${a.supplier || a.normalized_supplier || 'Okänd'}</td>
        <td style="padding:8px 12px;font-size:12px;color:#5C6E68;border-bottom:1px solid #D5E2DC;">${catLabel(a.category)}</td>
        <td style="padding:8px 12px;font-size:13px;color:#1F2E2A;border-bottom:1px solid #D5E2DC;">${a.annual_cost != null ? formatKr(a.annual_cost) : '–'}</td>
        <td style="padding:8px 12px;font-size:13px;font-weight:${a.should_switch ? 700 : 400};color:${a.should_switch ? '#1B7A6E' : '#5C6E68'};border-bottom:1px solid #D5E2DC;">${a.should_switch && a.net_saving ? '-' + formatKr(a.net_saving) : '–'}</td>
      </tr>`;
    }).join('');

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
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:12px;color:#5C6E68;">Total årskostnad</td>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:14px;color:#0E1A17;">${formatKr(totalCost)}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:12px;color:#5C6E68;">Arvo Score™</td>
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:14px;font-weight:700;color:#0E1A17;">${score}/100</td>
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
      subject:     `Er Arvo Score: ${calcArvoScore(totalCost, totalSaving)}/100 — +${formatKr(totalSaving)} i besparingspotential`,
      html:        userEmailHtml({ analyses, totalCost, totalSaving }),
      attachments: [{ filename: 'arvo-leverantorsrevision.pdf', content: pdfBuffer }],
    }),
    resend.emails.send({
      from:    FROM,
      to:      INTERNAL_EMAIL,
      subject: `🔥 Nytt lead: ${email} — Score ${calcArvoScore(totalCost, totalSaving)}/100, +${formatKr(totalSaving)}`,
      html:    leadEmailHtml({ email, analyses, totalSaving, totalCost }),
    }),
  ]);

  return send(res, 200, { ok: true });
}
