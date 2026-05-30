// scripts/preview-pdf.mjs — genererar en lokal test-PDF med mockdata
// Usage: node scripts/preview-pdf.mjs
import { writeFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

// ── Mockdata — 3 leverantörer ─────────────────────────────────────────────────
const MOCK_ANALYSES = [
  {
    id: '1', route: 'auto',
    supplier: 'Microsoft 365', normalized_supplier: 'Microsoft',
    category: 'mjukvara-saas', annual_cost: 187200,
    suggested_annual_cost: 132000, gross_saving: 55200,
    net_saving: 44160, should_switch: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2', route: 'auto',
    supplier: 'Telia', normalized_supplier: 'Telia',
    category: 'mobil', annual_cost: 96000,
    suggested_annual_cost: 62400, gross_saving: 33600,
    net_saving: 26880, should_switch: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3', route: 'auto',
    supplier: 'Fortnox', normalized_supplier: 'Fortnox',
    category: 'saas-finance', annual_cost: 18000,
    suggested_annual_cost: 18000, gross_saving: 0,
    net_saving: 0, should_switch: false,
    created_at: new Date().toISOString(),
  },
];

// ── Importera PDF-generatorn ur send-report.mjs ───────────────────────────────
// Eftersom send-report.mjs är en Vercel-funktion utan default export för PDF,
// kopierar vi nyckelfunktionerna inline här.

const T = {
  surface: '#FFFFFF', ink: '#0E1A17', inkSoft: '#1F2E2A',
  mutedSoft: '#5C6E68', border: '#D5E2DC', brand: '#1B7A6E',
  brandSoft: '#DCEEEA', gradTop: '#5DD6CA', gradBot: '#1B6E66',
  red: '#C0392B', yellow: '#D4A940',
};

function formatKr(n) {
  if (n == null) return '–';
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' kr';
}

const CAT_LABEL = {
  'mjukvara-saas': 'Programvarulicenser', mobil: 'Mobilabonnemang',
  'saas-finance': 'Affärssystem', bredband: 'Företagsbredband',
  el: 'Elavtal', skrivarleasing: 'Skrivare & MPS',
};
function catLabel(cat) { return CAT_LABEL[cat] ?? cat ?? '–'; }

function calcArvoScore(totalCost, totalSaving) {
  if (totalCost <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((1 - totalSaving / totalCost) * 100)));
}

function trafficLight(a) {
  if (!a.should_switch || (a.net_saving ?? 0) <= 0) return 'green';
  const pct = a.annual_cost > 0 ? a.net_saving / a.annual_cost : 0;
  return pct >= 0.15 ? 'red' : 'yellow';
}

function aiDiagnos(a) {
  if (!a.should_switch || (a.net_saving ?? 0) <= 0)
    return 'Optimalt avtal. Ni har rätt moduler för ert behov. Inga åtgärder krävs.';
  const yr = new Date().getFullYear();
  const map = {
    'mjukvara-saas': `Identifierad överlicensiering. Avtalsmodellen är föråldrad jämfört med ${yr} års marknadspriser.`,
    mobil: 'Dolda avgifter och ineffektiv paketetering. Marknaden har rört sig sedan avtalet tecknades.',
    bredband: 'Kapaciteten matchar inte prisnivån. Kvalificerade alternativ tillgängliga till lägre kostnad.',
  };
  const savePct = a.annual_cost > 0 ? Math.round((a.net_saving / a.annual_cost) * 100) : 0;
  return map[a.category] ?? `Kostnadsnivån överstiger branschsnittet med ${savePct} %. Omförhandling rekommenderas.`;
}

function drawLogoMark(doc, ox, oy, size) {
  const S = size / 40;
  const grad = doc.linearGradient(ox + 20 * S, oy, ox + 20 * S, oy + 36 * S);
  grad.stop(0, T.gradTop); grad.stop(1, T.gradBot);
  doc.save();
  doc.moveTo(ox+20*S, oy+3*S).lineTo(ox+37*S, oy+36*S).lineTo(ox+27.5*S, oy+36*S)
     .lineTo(ox+20*S, oy+21.5*S).lineTo(ox+12.5*S, oy+36*S).lineTo(ox+3*S, oy+36*S).closePath()
     .moveTo(ox+20*S, oy+12.5*S).lineTo(ox+24*S, oy+21*S).lineTo(ox+16*S, oy+21*S).closePath();
  doc.fillColor(grad).fill('even-odd');
  doc.restore();
}

function miniHeader(doc, PAD, W, PW, pageLabel) {
  const y = PAD;
  drawLogoMark(doc, PAD, y, 22);
  doc.fontSize(10).font('Times-Bold').fillColor(T.ink).text('Arvo', PAD+30, y+4, { continued: true });
  doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
  doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
     .text(`Leverantörsrevision  ·  ${pageLabel}`, PAD, y+5, { width: W, align: 'right' });
  const divY = y + 28;
  doc.moveTo(PAD, divY).lineTo(PW-PAD, divY).strokeColor(T.border).lineWidth(0.5).stroke();
  return divY + 20;
}

function pageFooter(doc, PAD, W, PW, PH) {
  const fy = PH - PAD - 24;
  doc.moveTo(PAD, fy).lineTo(PW-PAD, fy).strokeColor(T.border).lineWidth(0.3).stroke();
  doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
     .text('arvoflow.se  ·  hej@arvoflow.se  ·  No Cure, No Pay — 20 % av realiserad besparing.', PAD, fy+8, { width: W, align: 'center' });
}

// ── Generera ──────────────────────────────────────────────────────────────────
const auto        = MOCK_ANALYSES.filter(a => a.route === 'auto');
const totalCost   = auto.reduce((s, a) => s + (a.annual_cost ?? 0), 0);
const totalSaving = auto.reduce((s, a) => s + (a.net_saving ?? 0), 0);
const switchCount = auto.filter(a => a.should_switch).length;
const score       = calcArvoScore(totalCost, totalSaving);
const scoreColor  = score >= 85 ? T.brand : score >= 70 ? T.yellow : T.red;
const sorted      = [...auto].sort((a, b) => {
  const order = { red: 0, yellow: 1, green: 2 };
  return (order[trafficLight(a)] ?? 3) - (order[trafficLight(b)] ?? 3);
});

const PAD = 52, PW = 595.28, PH = 841.89, W = PW - PAD * 2;
const doc    = new PDFDocument({ margin: PAD, size: 'A4', autoFirstPage: true });
const chunks = [];
doc.on('data', c => chunks.push(c));

const today = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

// ── SIDA 1 ────────────────────────────────────────────────────────────────────
const topBar = doc.linearGradient(0, 0, PW, 0);
topBar.stop(0, T.gradTop); topBar.stop(1, T.gradBot);
doc.rect(0, 0, PW, 4).fill(topBar);

let y = PAD;
const MARK = 28;
drawLogoMark(doc, PAD, y, MARK);
const lx = PAD + MARK + 8, ly = y + (MARK - 16) / 2;
doc.fontSize(14).font('Times-Bold').fillColor(T.ink).text('Arvo', lx, ly, { continued: true });
doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
   .text(`Leverantörsrevision  ·  ${today}`, PAD, ly+2, { width: W, align: 'right' });
y += MARK + 22;
doc.moveTo(PAD, y).lineTo(PW-PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
y += 48;

doc.fontSize(8.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
   .text('IDENTIFIERAD BESPARINGSPOTENTIAL', PAD, y, { width: W, align: 'center', characterSpacing: 1.5 });
y += 18;
doc.fontSize(52).font('Helvetica-Bold').fillColor(T.brand)
   .text('+' + formatKr(totalSaving), PAD, y, { width: W, align: 'center' });
y += 66;
doc.fontSize(10).font('Helvetica').fillColor(T.mutedSoft)
   .text(`Nuvarande total årskkostnad: ${formatKr(totalCost)}`, PAD, y, { width: W, align: 'center' });
y += 46;
doc.moveTo(PAD+80, y).lineTo(PW-PAD-80, y).strokeColor(T.border).lineWidth(0.4).stroke();
y += 32;

const SBX_H = 78;
doc.rect(PAD, y, W, SBX_H).fill('#F4FAF8');
doc.rect(PAD, y, W, SBX_H).strokeColor(T.border).lineWidth(0.5).stroke();
doc.rect(PAD, y, 3.5, SBX_H).fill(scoreColor);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
   .text('ARVO SCORE™', PAD+16, y+12, { characterSpacing: 1.2 });
doc.fontSize(34).font('Helvetica-Bold').fillColor(scoreColor)
   .text(`${score}`, PAD+16, y+24, { continued: true, lineBreak: false });
doc.fontSize(12).font('Helvetica').fillColor(T.mutedSoft).text('/100');
const scoreText = score >= 85
  ? 'Er avtalsportfölj är väloptimerad.'
  : 'Er avtalsportfölj presterar under branschstandard (85+) för bolag av er storlek.';
doc.fontSize(9.5).font('Helvetica').fillColor(T.inkSoft)
   .text(scoreText, PAD+122, y+28, { width: W-140, lineGap: 3 });
y += SBX_H + 34;
doc.fontSize(8.5).font('Helvetica').fillColor(T.mutedSoft)
   .text(`${auto.length} analyserade fakturor  ·  ${switchCount} leverantörer med besparingspotential  ·  Arvo tar 20 % av realiserad besparing`, PAD, y, { width: W, align: 'center' });
pageFooter(doc, PAD, W, PW, PH);

// ── SIDA 2 ────────────────────────────────────────────────────────────────────
doc.addPage();
y = miniHeader(doc, PAD, W, PW, 'Sida 2 av 3');
doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brand).text('LEVERANTÖRSANALYS', PAD, y, { characterSpacing: 1.5 });
y += 14;
doc.fontSize(22).font('Helvetica-Bold').fillColor(T.ink).text('De största läckagen', PAD, y);
y += 36;

const LIGHT_COLOR = { red: T.red, yellow: T.yellow, green: T.brand };
const LIGHT_LABEL = { red: 'Röd — Åtgärd krävs', yellow: 'Gul — Bevaka', green: 'Grön — Optimalt' };

for (const a of sorted) {
  const light = trafficLight(a), lColor = LIGHT_COLOR[light];
  const name  = a.supplier || a.normalized_supplier || 'Okänd leverantör';
  const hasSav = a.should_switch && (a.net_saving ?? 0) > 0;
  const CARD_H = 86;

  doc.rect(PAD, y, W, CARD_H).fill('#FAFCFB');
  doc.rect(PAD, y, W, CARD_H).strokeColor(T.border).lineWidth(0.4).stroke();
  doc.rect(PAD, y, 3.5, CARD_H).fill(lColor);
  doc.save(); doc.circle(PAD+20, y+18, 5).fill(lColor); doc.restore();
  doc.fontSize(11).font('Helvetica-Bold').fillColor(T.ink).text(name, PAD+34, y+9, { width: W-145 });
  doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft).text(catLabel(a.category), PAD+34, y+23);
  doc.fontSize(8).font('Helvetica-Bold').fillColor(lColor).text(LIGHT_LABEL[light], PAD+34, y+34);
  doc.fontSize(8).font('Helvetica').fillColor(T.mutedSoft)
     .text(`Arvo AI: ${aiDiagnos(a)}`, PAD+34, y+46, { width: W-145, lineGap: 1.5 });
  if (hasSav) {
    doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('BESPARING/ÅR', PW-PAD-100, y+12, { width: 100, align: 'right', characterSpacing: 0.4 });
    doc.fontSize(13).font('Helvetica-Bold').fillColor(T.brand)
       .text('−' + formatKr(a.net_saving), PW-PAD-100, y+28, { width: 100, align: 'right' });
  } else {
    doc.fontSize(9).font('Helvetica-Bold').fillColor(T.brand)
       .text('✓ Optimerat', PW-PAD-90, y+34, { width: 90, align: 'right' });
  }
  y += CARD_H + 8;
}
pageFooter(doc, PAD, W, PW, PH);

// ── SIDA 3 ────────────────────────────────────────────────────────────────────
doc.addPage();
y = miniHeader(doc, PAD, W, PW, 'Sida 3 av 3');
doc.fontSize(8).font('Helvetica-Bold').fillColor(T.brand).text('NÄSTA STEG', PAD, y, { characterSpacing: 1.5 });
y += 14;
doc.fontSize(24).font('Helvetica-Bold').fillColor(T.ink).text('Låt oss hämta hem pengarna', PAD, y);
y += 32;
doc.fontSize(14).font('Helvetica').fillColor(T.mutedSoft).text('Helt utan risk.', PAD, y);
y += 44;

const steps = [
  { num: '01', head: 'Ni ger oss fullmakt',  body: 'Vi tar dialogen med era leverantörer — ni behöver inte lyfta ett finger.' },
  { num: '02', head: 'Vi omförhandlar',       body: 'Ni behåller exakt samma tjänster, men till rätt pris. Inga avbrott, inga byten om ni inte vill.' },
  { num: '03', head: 'No Cure, No Pay',       body: 'Vi tar endast 20 % av det vi faktiskt sparar under första året. Sparar vi inget, kostar vi inget.' },
];
for (const step of steps) {
  const cx = PAD+20, cy = y+22;
  const cg = doc.linearGradient(cx-18, cy-18, cx+18, cy+18);
  cg.stop(0, T.gradTop); cg.stop(1, T.gradBot);
  doc.save(); doc.circle(cx, cy, 18).fillColor(cg).fill(); doc.restore();
  doc.fontSize(11).font('Helvetica-Bold').fillColor('#fff').text(step.num, cx-14, cy-8, { width: 28, align: 'center', lineBreak: false });
  doc.fontSize(12).font('Helvetica-Bold').fillColor(T.ink).text(step.head, PAD+50, y+8);
  doc.fontSize(9.5).font('Helvetica').fillColor(T.inkSoft).text(step.body, PAD+50, y+24, { width: W-60, lineGap: 2 });
  y += 70;
}
y += 18;
doc.moveTo(PAD+80, y).lineTo(PW-PAD-80, y).strokeColor(T.border).lineWidth(0.4).stroke();
y += 28;

const CTA_H = 82, ctaG = doc.linearGradient(0, y, PW, y+CTA_H);
ctaG.stop(0, T.gradTop); ctaG.stop(1, T.gradBot);
doc.rect(0, y, PW, CTA_H).fill(ctaG);
doc.fontSize(8.5).font('Helvetica-Bold').fillColor('rgba(255,255,255,0.65)')
   .text('REDO ATT REALISERA BESPARINGEN?', PAD, y+14, { width: W, align: 'center', characterSpacing: 1.2 });
doc.fontSize(22).font('Helvetica-Bold').fillColor('#fff').text('arvoflow.se', PAD, y+30, { width: W, align: 'center' });
doc.fontSize(9).font('Helvetica').fillColor('rgba(255,255,255,0.75)').text('hej@arvoflow.se', PAD, y+56, { width: W, align: 'center' });

doc.end();

doc.on('end', () => {
  const buf = Buffer.concat(chunks);
  writeFileSync('arvo-rapport-preview.pdf', buf);
  console.log(`✓ arvo-rapport-preview.pdf skapad (${Math.round(buf.length / 1024)} kB)`);
  console.log('  Öppna med:  open arvo-rapport-preview.pdf');
});
