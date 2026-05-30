// scripts/preview-pdf.mjs — genererar en lokal test-PDF med mockdata
// Usage: node scripts/preview-pdf.mjs
import { writeFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

const MOCK_ANALYSES = [
  {
    id: '1', route: 'auto',
    supplier: 'Microsoft 365', normalized_supplier: 'Microsoft',
    category: 'mjukvara-saas', annual_cost: 187200,
    net_saving: 44160, should_switch: true,
  },
  {
    id: '2', route: 'auto',
    supplier: 'Telia', normalized_supplier: 'Telia',
    category: 'mobil', annual_cost: 96000,
    net_saving: 26880, should_switch: true,
  },
  {
    id: '3', route: 'auto',
    supplier: 'Fortnox', normalized_supplier: 'Fortnox',
    category: 'saas-finance', annual_cost: 18000,
    net_saving: 0, should_switch: false,
  },
];

const T = {
  ink: '#0E1A17', inkSoft: '#1F2E2A', mutedSoft: '#5C6E68',
  border: '#D5E2DC', brand: '#1B7A6E', gradTop: '#5DD6CA', gradBot: '#1B6E66',
  red: '#C0392B', yellow: '#D4A940',
};

function formatKr(n) {
  if (n == null) return '-';
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' kr';
}

const CAT_LABEL = {
  'mjukvara-saas': 'Programvarulicenser', mobil: 'Mobilabonnemang',
  'saas-finance': 'Affarssystem', bredband: 'Foretagsbredband',
  el: 'Elavtal', skrivarleasing: 'Skrivare & MPS',
};
function catLabel(cat) { return CAT_LABEL[cat] ?? cat ?? '-'; }

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
    return 'Optimalt avtal. Ni har ratt moduler for ert behov. Inga atgarder kravs.';
  const yr = new Date().getFullYear();
  const map = {
    'mjukvara-saas': `Identifierad overlicensiering. Avtalsmodellen ar foraldrard jomfort med ${yr} ars marknadspriser.`,
    mobil: 'Dolda avgifter och ineffektiv paketetering. Marknaden har rort sig sedan avtalet tecknades.',
  };
  const savePct = a.annual_cost > 0 ? Math.round((a.net_saving / a.annual_cost) * 100) : 0;
  return map[a.category] ?? `Kostnadsnivan overstiger branschsnittet med ${savePct} %. Omforhandling rekommenderas.`;
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
     .text('Leverantorsrevision  .  ' + pageLabel, PAD, y+5, { width: W, align: 'right' });
  const divY = y + 28;
  doc.moveTo(PAD, divY).lineTo(PW-PAD, divY).strokeColor(T.border).lineWidth(0.5).stroke();
  return divY + 20;
}

function pageFooter(doc, PAD, W, PW, PH) {
  const fy = PH - PAD - 24;
  doc.moveTo(PAD, fy).lineTo(PW-PAD, fy).strokeColor(T.border).lineWidth(0.3).stroke();
  doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
     .text('arvoflow.se  .  hej@arvoflow.se  .  No Cure, No Pay - 20 % av realiserad besparing.', PAD, fy+8, { width: W, align: 'center' });
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

const PAD    = 48;
const PW     = 595.28;
const PH     = 841.89;
const W      = PW - PAD * 2;
const CARD_H = 60;
const useTwoPages = sorted.length > 3;

const LIGHT_COLOR = { red: T.red, yellow: T.yellow, green: T.brand };
const LIGHT_LABEL = { red: 'Rod - Atgard kravs', yellow: 'Gul - Bevaka', green: 'Gron - Optimalt' };

const doc    = new PDFDocument({ margin: PAD, size: 'A4', autoFirstPage: true });
const chunks = [];
doc.on('data', c => chunks.push(c));

const today = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

// ── Gradientbar ──
const topBar = doc.linearGradient(0, 0, PW, 0);
topBar.stop(0, T.gradTop); topBar.stop(1, T.gradBot);
doc.rect(0, 0, PW, 5).fill(topBar);

let y = PAD;

// ── Header ──
const MARK = 24;
drawLogoMark(doc, PAD, y, MARK);
const ly = y + 4;
doc.fontSize(13).font('Times-Bold').fillColor(T.ink).text('Arvo', PAD+MARK+7, ly, { continued: true });
doc.font('Times-Italic').fillColor(T.mutedSoft).text(' Flow');
doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
   .text('Leverantorsrevision  .  ' + today, PAD, ly+2, { width: W, align: 'right' });
y += MARK + 16;
doc.moveTo(PAD, y).lineTo(PW-PAD, y).strokeColor(T.border).lineWidth(0.5).stroke();
y += 30;

// ── Hero ──
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
   .text('IDENTIFIERAD BESPARINGSPOTENTIAL', PAD, y, { width: W, align: 'center', characterSpacing: 1.6 });
y += 16;
doc.fontSize(56).font('Helvetica-Bold').fillColor(T.brand)
   .text('+' + formatKr(totalSaving), PAD, y, { width: W, align: 'center' });
y += 62;
doc.fontSize(9).font('Helvetica').fillColor(T.mutedSoft)
   .text('Nuvarande total arskostnad: ' + formatKr(totalCost), PAD, y, { width: W, align: 'center' });
y += 24;
doc.moveTo(PAD+90, y).lineTo(PW-PAD-90, y).strokeColor(T.border).lineWidth(0.4).stroke();
y += 18;

// ── Arvo Score ──
const SBX_H = 62;
doc.rect(PAD, y, W, SBX_H).fill('#F4FAF8');
doc.rect(PAD, y, W, SBX_H).strokeColor(T.border).lineWidth(0.5).stroke();
doc.rect(PAD, y, 3, SBX_H).fill(scoreColor);
doc.fontSize(7).font('Helvetica-Bold').fillColor(T.mutedSoft).text('ARVO SCORE TM', PAD+14, y+9, { characterSpacing: 1.2 });
doc.fontSize(30).font('Helvetica-Bold').fillColor(scoreColor)
   .text(String(score), PAD+14, y+20, { continued: true, lineBreak: false });
doc.fontSize(10).font('Helvetica').fillColor(T.mutedSoft).text('/100');
const scoreText = score >= 85
  ? 'Er avtalsportfolj ar valoptimerad.'
  : 'Er avtalsportfolj presterar under branschstandard (85+) for bolag av er storlek.';
doc.fontSize(8.5).font('Helvetica').fillColor(T.inkSoft)
   .text(scoreText, PAD+110, y+22, { width: W-124, lineGap: 2 });
y += SBX_H + 20;

// ── Leverantorsanalys ──
doc.fontSize(7).font('Helvetica-Bold').fillColor(T.mutedSoft)
   .text('LEVERANTORSANALYS', PAD, y, { characterSpacing: 1.5 });
y += 12;

for (const a of sorted) {
  if (y > PH - PAD - CARD_H - 10) { doc.addPage(); y = PAD; }

  const light  = trafficLight(a);
  const lColor = LIGHT_COLOR[light];
  const name   = a.supplier || a.normalized_supplier || 'Okand leverantor';
  const hasSav = a.should_switch && (a.net_saving ?? 0) > 0;

  doc.rect(PAD, y, W, CARD_H).fill('#FAFCFB');
  doc.rect(PAD, y, W, CARD_H).strokeColor(T.border).lineWidth(0.4).stroke();
  doc.rect(PAD, y, 3, CARD_H).fill(lColor);
  doc.save(); doc.circle(PAD+17, y+11, 4).fill(lColor); doc.restore();

  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(T.ink).text(name, PAD+30, y+5, { width: W-130 });
  doc.fontSize(7).font('Helvetica').fillColor(T.mutedSoft)
     .text(catLabel(a.category) + '  |  ' + LIGHT_LABEL[light], PAD+30, y+19, { width: W-130 });
  doc.fontSize(7).font('Helvetica').fillColor(T.mutedSoft)
     .text(aiDiagnos(a), PAD+30, y+31, { width: W-130, lineGap: 1 });

  if (hasSav) {
    doc.fontSize(6.5).font('Helvetica-Bold').fillColor(T.mutedSoft)
       .text('BESPARING/AR', PW-PAD-92, y+7, { width: 92, align: 'right', characterSpacing: 0.4 });
    doc.fontSize(12).font('Helvetica-Bold').fillColor(T.brand)
       .text('-' + formatKr(a.net_saving), PW-PAD-92, y+20, { width: 92, align: 'right' });
  } else {
    doc.fontSize(9).font('Helvetica-Bold').fillColor(T.brand)
       .text('Optimerat', PW-PAD-75, y+23, { width: 75, align: 'right' });
  }
  y += CARD_H + 6;
}

if (useTwoPages) {
  y += 8;
  doc.fontSize(7.5).font('Helvetica').fillColor(T.mutedSoft)
     .text(auto.length + ' analyserade fakturor  .  ' + switchCount + ' leverantorer med besparingspotential  .  Arvo tar 20 % av realiserad besparing', PAD, y, { width: W, align: 'center' });
  pageFooter(doc, PAD, W, PW, PH);
  doc.addPage();
  y = miniHeader(doc, PAD, W, PW, 'Sida 2 av 2');
} else {
  y += 10;
  doc.moveTo(PAD+70, y).lineTo(PW-PAD-70, y).strokeColor(T.border).lineWidth(0.3).stroke();
  y += 16;
}

// ── Nasta steg ──
doc.fontSize(7).font('Helvetica-Bold').fillColor(T.brand).text('NASTA STEG', PAD, y, { characterSpacing: 1.5 });
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

doc.on('end', () => {
  const buf = Buffer.concat(chunks);
  writeFileSync('arvo-rapport-preview.pdf', buf);
  console.log('arvo-rapport-preview.pdf skapad (' + Math.round(buf.length/1024) + ' kB)');
  console.log('Oppna med:  open arvo-rapport-preview.pdf');
});
