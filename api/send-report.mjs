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
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' kr';
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
  bredband:           'Företagsbredband',
  'mjukvara-saas':    'Programvarulicenser',
  'saas-productivity':'Programvarulicenser',
  'saas-crm':         'CRM-system',
  'saas-finance':     'Affärssystem',
  'saas-other':       'SaaS · övrigt',
  'saas-creative':    'Kreativ mjukvara',
  skrivarleasing:     'Skrivare & MPS',
  utrustningsleasing: 'IT-utrustningsleasing',
  kortterminal:       'Betaltjänster',
  'faktura-tjanst':   'Fakturatjänst',
  loneadmin:          'Löneadministration',
  'larm-bevakning':   'Larm & Bevakning',
  foretagshalsovard:  'Företagshälsovård',
  bankavgifter:       'Bankavgifter',
  kontorsmaterial:    'Kontorsmaterial',
  'städ-rengöring':   'Städ & Rengöring',
  'transport-frakt':  'Transport & Frakt',
  'it-support':       'IT-drift & Support',
  serverhosting:      'Serverhosting',
  'leasing-bil':      'Företagsleasing',
  vaxel:              'Molnväxel',
  'avfall-atervinning':'Avfall & Återvinning',
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
    return 'Optimalt avtal. Ni har rätt moduler för ert behov. Inga åtgärder krävs.';
  }
  const yr = new Date().getFullYear();
  const map = {
    'mjukvara-saas':     `Identifierad överlicensiering. Avtalsmodellen är föråldrad jämfört med ${yr} års marknadspriser.`,
    'saas-productivity': `Identifierad överlicensiering. Avtalsmodellen är föråldrad jämfört med ${yr} års marknadspriser.`,
    'saas-crm':          'Licensstrukturen överstiger behoven. Alternativa avtalsnivåer tillgängliga till lägre kostnad.',
    'saas-finance':      'Affärssystemet prissätts över marknadsnorm. Förhandlingsutrymme identifierat.',
    mobil:               'Dolda avgifter och ineffektiv paketetering. Marknaden har rört sig sedan avtalet tecknades.',
    bredband:            'Kapaciteten matchar inte prisnivån. Kvalificerade alternativ tillgängliga till lägre kostnad.',
    el:                  'Rörligt spotpris ger exponering mot prispikar. Bättre avtalsstruktur tillgänglig.',
    skrivarleasing:      'Klickkostnader och serviceavgifter överstiger marknadsnorm. Avtalstrukturen gynnar leverantören.',
    utrustningsleasing:  'Leasingvillkoren är ogynnsamma jämfört med aktuella marknadspriser.',
    kortterminal:        'Transaktionsavgifterna överstiger branschstandard. Förhandlingsutrymme identifierat.',
    loneadmin:           'Prisnivån är hög jämfört med moderna alternativ på marknaden.',
    'it-support':        'Supportavtalet prissätts över marknadssnittet för er supportnivå.',
    serverhosting:       'Hostingkostnaden överstiger jämförbara tjänster. Modernare alternativ tillgängliga.',
  };
  const savePct = a.annual_cost > 0 ? Math.round((a.net_saving / a.annual_cost) * 100) : 0;
  return map[a.category] ?? `Kostnadsnivån överstiger branschsnittet med ${savePct} %. Omförhandling rekommenderas.`;
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
     .text(`Leverantörsrevision  ·  ${pageLabel}`, PAD, y + 5, { width: W, align: 'right' });
  const divY = y + 28;
  doc.moveTo(PAD, divY).lineTo(PW - PAD, divY).strokeColor(T.border).lineWidth(0.5).stroke();
  return divY + 20;
}

function pageFooter(doc, PAD, W, PW, PH) {
  const fy = PH - PAD - 24;
  doc.moveTo(PAD, fy).lineTo(PW - PAD, fy).strokeColor(T.border).lineWidth(0.3).stroke();
  doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
     .text(
       'arvoflow.se  ·  hej@arvoflow.se  ·  No Cure, No Pay — 20 % av realiserad besparing. Inga fasta avgifter.',
       PAD, fy + 8, { width: W, align: 'center' }
     );
}

// ── PDF: 3 sidor ──────────────────────────────────────────────────────────────
function generatePortfolioPdf(analyses) {
  return new Promise((resolve, reject) => {
    const auto        = analyses.filter(a => a.route === 'auto');
    const totalCost   = auto.reduce((s, a) => s + (a.annual_cost ?? 0), 0);
    const totalSaving = auto.reduce((s, a) => s + (a.net_saving  ?? 0), 0);
    const switchCount = auto.filter(a => a.should_switch).length;
    const score       = calcArvoScore(totalCost, totalSaving);
    const scoreColor  = score >= 85 ? T.brand : score >= 70 ? T.yellow : T.red;

    // Sort: red → yellow → green
    const sorted = [...auto].sort((a, b) => {
      const order = { red: 0, yellow: 1, green: 2 };
      return (order[trafficLight(a)] ?? 3) - (order[trafficLight(b)] ?? 3);
    });

    const PAD = 52;
    const PW  = 595.28;
    const PH  = 841.89;
    const W   = PW - PAD * 2;

    const doc    = new PDFDocument({ margin: PAD, size: 'A4', autoFirstPage: true });
    const chunks = [];
    doc.on('data', c  => chunks.push(c));
    doc.on('end',  () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const today = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

    // ════════════════════════════════════════════════════════════════════════
    // SIDA 1 — Executive Shock
    // ════════════════════════════════════════════════════════════════════════
    const topBar = doc.linearGradient(0, 0, PW, 0);
    topBar.stop(0, T.gradTop); topBar.stop(1, T.gradBot);
    doc.rect(0, 0, PW, 4).fill(topBar);

    let y = PAD;

    // Logo + date
    const MARK = 28;
    drawLogoMark(doc, PAD, y, MARK);
    const lx = PAD + MARK + 8;
    const ly = y + (MARK - 16) / 2;
    doc.fontSize(14).font('Times-Bold').fillColor(T.ink).text('Arvo', lx, ly, { continued: true });
    doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
    doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
       .text(`Leverantörsrevision  ·  ${today}`, PAD, ly + 2, { width: W, align: 'right' });
    y += MARK + 22;

    doc.moveTo(PAD, y).lineTo(PW - PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
    y += 48;

    // Eyebrow
    doc.fontSize(8.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('IDENTIFIERAD BESPARINGSPOTENTIAL', PAD, y, { width: W, align: 'center', characterSpacing: 1.5 });
    y += 18;

    // Giant savings number
    doc.fontSize(52).font('Helvetica-Bold').fillColor(T.brand)
       .text('+' + formatKr(totalSaving), PAD, y, { width: W, align: 'center' });
    y += 66;

    // Annual cost sub-line
    doc.fontSize(10).font('Helvetica').fillColor(T.mutedSoft)
       .text(`Nuvarande total årskkostnad: ${formatKr(totalCost)}`, PAD, y, { width: W, align: 'center' });
    y += 46;

    doc.moveTo(PAD + 80, y).lineTo(PW - PAD - 80, y).strokeColor(T.border).lineWidth(0.4).stroke();
    y += 32;

    // Arvo Score box
    const SBX_H = 78;
    doc.rect(PAD, y, W, SBX_H).fill('#F4FAF8');
    doc.rect(PAD, y, W, SBX_H).strokeColor(T.border).lineWidth(0.5).stroke();
    doc.rect(PAD, y, 3.5, SBX_H).fill(scoreColor);

    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('ARVO SCORE™', PAD + 16, y + 12, { characterSpacing: 1.2 });
    doc.fontSize(34).font('Helvetica-Bold').fillColor(scoreColor)
       .text(`${score}`, PAD + 16, y + 24, { continued: true, lineBreak: false });
    doc.fontSize(12).font('Helvetica').fillColor(T.mutedSoft).text('/100');

    const scoreText = score >= 85
      ? 'Er avtalsportfölj är väloptimerad.'
      : 'Er avtalsportfölj presterar under branschstandard (85+) för bolag av er storlek.';
    doc.fontSize(9.5).font('Helvetica').fillColor(T.inkSoft)
       .text(scoreText, PAD + 122, y + 28, { width: W - 140, lineGap: 3 });
    y += SBX_H + 34;

    // Meta line
    doc.fontSize(8.5).font('Helvetica').fillColor(T.mutedSoft)
       .text(
         `${auto.length} analyserade fakturor  ·  ${switchCount} leverantörer med besparingspotential  ·  Arvo tar 20 % av realiserad besparing`,
         PAD, y, { width: W, align: 'center' }
       );

    pageFooter(doc, PAD, W, PW, PH);

    // ════════════════════════════════════════════════════════════════════════
    // SIDA 2 — Syndabockarna
    // ════════════════════════════════════════════════════════════════════════
    doc.addPage();
    y = miniHeader(doc, PAD, W, PW, 'Sida 2 av 3');

    doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brand)
       .text('LEVERANTÖRSANALYS', PAD, y, { characterSpacing: 1.5 });
    y += 14;
    doc.fontSize(22).font('Helvetica-Bold').fillColor(T.ink).text('De största läckagen', PAD, y);
    y += 36;

    const LIGHT_COLOR = { red: T.red, yellow: T.yellow, green: T.brand };
    const LIGHT_LABEL = { red: 'Röd — Åtgärd krävs', yellow: 'Gul — Bevaka', green: 'Grön — Optimalt' };

    for (const a of sorted) {
      if (y > PH - PAD - 110) { doc.addPage(); y = PAD; }

      const light  = trafficLight(a);
      const lColor = LIGHT_COLOR[light];
      const name   = a.supplier || a.normalized_supplier || 'Okänd leverantör';
      const hasSav = a.should_switch && (a.net_saving ?? 0) > 0;
      const CARD_H = 86;

      doc.rect(PAD, y, W, CARD_H).fill('#FAFCFB');
      doc.rect(PAD, y, W, CARD_H).strokeColor(T.border).lineWidth(0.4).stroke();
      doc.rect(PAD, y, 3.5, CARD_H).fill(lColor);

      // Traffic dot
      doc.save();
      doc.circle(PAD + 20, y + 18, 5).fill(lColor);
      doc.restore();

      // Supplier name + category
      doc.fontSize(11).font('Helvetica-Bold').fillColor(T.ink)
         .text(name, PAD + 34, y + 9, { width: W - 145 });
      doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
         .text(catLabel(a.category), PAD + 34, y + 23);
      doc.fontSize(8).font('Helvetica-Bold').fillColor(lColor)
         .text(LIGHT_LABEL[light], PAD + 34, y + 34);

      // AI diagnos
      doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
         .text(`Arvo AI: ${aiDiagnos(a)}`, PAD + 34, y + 46, { width: W - 145, lineGap: 1.5 });

      // Saving (right column)
      if (hasSav) {
        doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
           .text('BESPARING/ÅR', PW - PAD - 100, y + 12, { width: 100, align: 'right', characterSpacing: 0.4 });
        doc.fontSize(13).font('Helvetica-Bold').fillColor(T.brand)
           .text('−' + formatKr(a.net_saving), PW - PAD - 100, y + 28, { width: 100, align: 'right' });
      } else {
        doc.fontSize(9).font('Helvetica-Bold').fillColor(T.brand)
           .text('✓ Optimerat', PW - PAD - 90, y + 34, { width: 90, align: 'right' });
      }

      y += CARD_H + 8;
    }

    pageFooter(doc, PAD, W, PW, PH);

    // ════════════════════════════════════════════════════════════════════════
    // SIDA 3 — Räddningsplankan
    // ════════════════════════════════════════════════════════════════════════
    doc.addPage();
    y = miniHeader(doc, PAD, W, PW, 'Sida 3 av 3');

    doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brand)
       .text('NÄSTA STEG', PAD, y, { characterSpacing: 1.5 });
    y += 14;
    doc.fontSize(24).font('Helvetica-Bold').fillColor(T.ink)
       .text('Låt oss hämta hem pengarna', PAD, y);
    y += 32;
    doc.fontSize(14).font('Helvetica').fillColor(T.mutedSoft).text('Helt utan risk.', PAD, y);
    y += 44;

    const steps = [
      {
        num:  '01',
        head: 'Ni ger oss fullmakt',
        body: 'Vi tar dialogen med era leverantörer — ni behöver inte lyfta ett finger.',
      },
      {
        num:  '02',
        head: 'Vi omförhandlar',
        body: 'Ni behåller exakt samma tjänster, men till rätt pris. Inga avbrott, inga byten om ni inte vill.',
      },
      {
        num:  '03',
        head: 'No Cure, No Pay',
        body: 'Vi tar endast 20 % av det vi faktiskt sparar under första året. Sparar vi inget, kostar vi inget.',
      },
    ];

    for (const step of steps) {
      const cx = PAD + 20;
      const cy = y + 22;
      const cg = doc.linearGradient(cx - 18, cy - 18, cx + 18, cy + 18);
      cg.stop(0, T.gradTop); cg.stop(1, T.gradBot);
      doc.save();
      doc.circle(cx, cy, 18).fillColor(cg).fill();
      doc.restore();

      doc.fontSize(11).font('Helvetica-Bold').fillColor('#fff')
         .text(step.num, cx - 14, cy - 8, { width: 28, align: 'center', lineBreak: false });

      doc.fontSize(12).font('Helvetica-Bold').fillColor(T.ink)
         .text(step.head, PAD + 50, y + 8);
      doc.fontSize(9.5).font('Helvetica').fillColor(T.inkSoft)
         .text(step.body, PAD + 50, y + 24, { width: W - 60, lineGap: 2 });

      y += 70;
    }

    y += 18;
    doc.moveTo(PAD + 80, y).lineTo(PW - PAD - 80, y).strokeColor(T.border).lineWidth(0.4).stroke();
    y += 28;

    // Gradient CTA block
    const CTA_H = 82;
    const ctaG  = doc.linearGradient(0, y, PW, y + CTA_H);
    ctaG.stop(0, T.gradTop); ctaG.stop(1, T.gradBot);
    doc.rect(0, y, PW, CTA_H).fill(ctaG);

    doc.fontSize(8.5).font('Helvetica-Bold').fillColor('rgba(255,255,255,0.65)')
       .text('REDO ATT REALISERA BESPARINGEN?', PAD, y + 14, { width: W, align: 'center', characterSpacing: 1.2 });
    doc.fontSize(22).font('Helvetica-Bold').fillColor('#fff')
       .text('arvoflow.se', PAD, y + 30, { width: W, align: 'center' });
    doc.fontSize(9).font('Helvetica').fillColor('rgba(255,255,255,0.75)')
       .text('hej@arvoflow.se', PAD, y + 56, { width: W, align: 'center' });

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
        <td style="padding:10px 12px;font-size:13px;font-weight:${pos ? 700 : 400};color:${pos ? '#1B7A6E' : '#5C6E68'};border-bottom:1px solid #D5E2DC;">${pos ? '−' + formatKr(a.net_saving) : 'Optimerat'}</td>
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
    <p style="margin:0 0 16px;font-size:13px;color:#5C6E68;">Nuvarande total årskkostnad: <strong style="color:#0E1A17;">${formatKr(totalCost)}</strong></p>
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
        <th style="padding:8px 12px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#5C6E68;text-align:left;">Årskkostnad</th>
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
        <td style="padding:8px 12px;font-size:13px;font-weight:${a.should_switch ? 700 : 400};color:${a.should_switch ? '#1B7A6E' : '#5C6E68'};border-bottom:1px solid #D5E2DC;">${a.should_switch && a.net_saving ? '−' + formatKr(a.net_saving) : '–'}</td>
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
        <td style="padding:10px 0;border-bottom:1px solid #D5E2DC;font-size:12px;color:#5C6E68;">Total årskkostnad</td>
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
