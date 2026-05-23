#!/usr/bin/env node
// scripts/generate-test-invoices.mjs
// Genererar 50 realistiska svenska B2B-fakturor som PDF:er för stress-testning.
// Täcker: mobil, bredband, el, SaaS, skrivarleasing, cloud, transport + edge cases.
//
// Användning:
//   node scripts/generate-test-invoices.mjs
//   node scripts/generate-test-invoices.mjs --out ./stress-invoices/

import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const OUT_DIR = outIdx >= 0 ? resolve(args[outIdx + 1]) : join(ROOT, 'test-pdfs');

mkdirSync(OUT_DIR, { recursive: true });

// ── Hjälpfunktioner ───────────────────────────────────────────────────────────
const fmt = (n) => n.toLocaleString('sv-SE', { minimumFractionDigits: 2 });
const today = '2026-05-01';
const due   = '2026-05-30';

function invoice(filename, fn) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const out = createWriteStream(join(OUT_DIR, filename));
    doc.pipe(out);
    out.on('finish', resolve);
    out.on('error', reject);
    fn(doc);
    doc.end();
  });
}

// Gemensam faktura-layout
function header(doc, supplier, orgNr, address, invoiceNr, date, dueDate, customer) {
  doc.fontSize(20).font('Helvetica-Bold').text(supplier, 50, 50);
  doc.fontSize(9).font('Helvetica').fillColor('#555')
    .text(`Org.nr: ${orgNr}`, 50, 78)
    .text(address, 50, 90);
  doc.fillColor('#000').fontSize(22).font('Helvetica-Bold')
    .text('FAKTURA', 400, 50, { align: 'right' });
  doc.fontSize(9).font('Helvetica').fillColor('#333')
    .text(`Fakturanr: ${invoiceNr}`, 400, 80, { align: 'right' })
    .text(`Fakturadatum: ${date}`, 400, 92, { align: 'right' })
    .text(`Förfallodatum: ${dueDate}`, 400, 104, { align: 'right' });
  doc.fillColor('#000').fontSize(10).font('Helvetica-Bold').text('Faktureras till:', 50, 130);
  doc.fontSize(10).font('Helvetica').text(customer, 50, 145);
  doc.moveTo(50, 180).lineTo(545, 180).stroke('#ddd');
  return 200;
}

function tableHeader(doc, y) {
  doc.fillColor('#f5f5f5').rect(50, y, 495, 18).fill();
  doc.fillColor('#333').fontSize(8).font('Helvetica-Bold')
    .text('Beskrivning', 55, y + 5)
    .text('Antal', 330, y + 5)
    .text('À-pris', 380, y + 5)
    .text('Belopp (ex. moms)', 440, y + 5);
  doc.fillColor('#000');
  return y + 22;
}

function row(doc, y, desc, qty, unit, price, amount, bold = false) {
  const font = bold ? 'Helvetica-Bold' : 'Helvetica';
  doc.font(font).fontSize(9).fillColor('#111')
    .text(desc, 55, y, { width: 270 })
    .text(qty, 330, y)
    .text(unit, 360, y)
    .text(fmt(price), 380, y)
    .text(fmt(amount), 460, y, { align: 'right', width: 80 });
  return y + 16;
}

function totals(doc, y, rows, vatRate = 0.25) {
  const subtotal = rows.reduce((s, r) => s + r, 0);
  const vat = subtotal * vatRate;
  const total = subtotal + vat;
  doc.moveTo(50, y).lineTo(545, y).stroke('#ddd');
  y += 8;
  doc.font('Helvetica').fontSize(9)
    .text('Summa exkl. moms:', 380, y)
    .text(`${fmt(subtotal)} kr`, 460, y, { align: 'right', width: 80 });
  y += 14;
  doc.text(`Moms (${(vatRate * 100).toFixed(0)} %)`, 380, y)
    .text(`${fmt(vat)} kr`, 460, y, { align: 'right', width: 80 });
  y += 14;
  doc.font('Helvetica-Bold').fontSize(11)
    .text('ATT BETALA:', 380, y)
    .text(`${fmt(total)} kr`, 460, y, { align: 'right', width: 80 });
  y += 30;
  doc.font('Helvetica').fontSize(8).fillColor('#555')
    .text('Betalning: Bankgiro 5555-5555  ·  Referens: Fakturanummer', 50, y);
  return y;
}

function note(doc, y, text) {
  doc.font('Helvetica').fontSize(8).fillColor('#777')
    .text(text, 50, y + 14, { width: 495 });
}

// ── ALLA 50 FAKTUROR ──────────────────────────────────────────────────────────
const invoices = [];

// ═══════════════════════════════ MOBIL (15 st) ════════════════════════════════

// 1. Tele2 — enkel mobilfaktura utan addons
invoices.push(invoice('tele2-mobil-enkel.pdf', (doc) => {
  let y = header(doc, 'Tele2 Sverige AB', '556267-5164', 'Box 62, 164 94 Kista', 'TLE-20260501-001', today, due, 'Bergström & Partners AB\nStorgatan 12, 111 23 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Tele2 Jobbmobil L (10 abonnemang) — Maj 2026', '10', 'st', 299, 2990);
  y = row(doc, y, 'Fast månadsavgift', '1', 'st', 49, 49);
  totals(doc, y + 10, [2990, 49]);
}));

// 2. Tele2 — med roaming och övertrafik
invoices.push(invoice('tele2-mobil-roaming.pdf', (doc) => {
  let y = header(doc, 'Tele2 Sverige AB', '556267-5164', 'Box 62, 164 94 Kista', 'TLE-20260501-002', today, due, 'Nordic Trading AB\nHamngatan 5, 411 10 Göteborg');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Tele2 Jobbmobil XL (25 abonnemang) — Maj 2026', '25', 'st', 449, 11225);
  y = row(doc, y, 'Roaming Zone 2 (EU/EES) — Datatrafik 8,4 GB', '8.4', 'GB', 29, 243.6);
  y = row(doc, y, 'Roaming Zone 3 (USA/Kanada) — Datatrafik 2,1 GB', '2.1', 'GB', 89, 186.9);
  y = row(doc, y, 'Övertrafik — Datapåslag 3 nummer × 5 GB', '15', 'GB', 15, 225);
  y = row(doc, y, 'SMS Premium (betalnummer) — 47 st', '47', 'st', 2.5, 117.5);
  totals(doc, y + 10, [11225, 243.6, 186.9, 225, 117.5]);
}));

// 3. Telenor — standardfaktura
invoices.push(invoice('telenor-mobil-standard.pdf', (doc) => {
  let y = header(doc, 'Telenor Sverige AB', '556421-0309', 'Isafjordsgatan 10, 164 40 Kista', 'TEL-2026-05-8821', today, due, 'Konsultgruppen Stockholm AB\nKungsgatan 44, 111 35 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Telenor Business Smart (15 abonnemang) Maj', '15', 'st', 379, 5685);
  y = row(doc, y, 'Telenor Business XL (8 abonnemang) Maj', '8', 'st', 499, 3992);
  y = row(doc, y, 'Roaming Världen — Datatrafik 4,2 GB', '4.2', 'GB', 99, 415.8);
  y = row(doc, y, 'Telenor One Number (samtal vidare till fast) — 3 nr', '3', 'st', 59, 177);
  totals(doc, y + 10, [5685, 3992, 415.8, 177]);
  note(doc, y + 60, 'Avtals-ID: B2B-SE-2024-11923 | Bindningstid: 24 mån t.o.m. 2026-10-31 | Uppsägningstid: 3 månader');
}));

// 4. Tre (3) — mobilfaktura med molnväxel (EDGE: combined)
invoices.push(invoice('tre-mobil-molnvaxel.pdf', (doc) => {
  let y = header(doc, 'Hi3G Access AB (3)', '556593-4899', 'Box 30213, 104 25 Stockholm', '3-INV-2605-44821', today, due, 'Fastighets AB Nordvik\nSveavägen 88, 113 59 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, '3 Företag Obegränsat (12 SIM-kort) — Maj 2026', '12', 'st', 349, 4188);
  y = row(doc, y, '3 Molnväxel Business — månadsavgift', '1', 'st', 1290, 1290);
  y = row(doc, y, 'Molnväxel tilläggslicenser (4 extra användare)', '4', 'st', 149, 596);
  y = row(doc, y, 'Roaming Europa — Datatrafik 11,3 GB', '11.3', 'GB', 19, 214.7);
  y = row(doc, y, 'Pappersfakturaavgift', '1', 'st', 29, 29);
  totals(doc, y + 10, [4188, 1290, 596, 214.7, 29]);
  note(doc, y + 60, 'Kombinerad faktura: Mobilabonnemang + Molnväxel Business. Molnväxeln är en tilläggstjänst till mobilabonnemanget.');
}));

// 5. Comviq — budget mobil, enkel faktura
invoices.push(invoice('comviq-mobil-budget.pdf', (doc) => {
  let y = header(doc, 'Comviq (Tele2 Sverige AB)', '556267-5164', 'Box 62, 164 94 Kista', 'CVQ-2026-05-003341', today, due, 'Bilverkstan i Bromma AB\nDrottningholmsvägen 200, 168 67 Bromma');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Comviq Jobbmobil Bas (6 abonnemang) 10 GB/mån', '6', 'st', 179, 1074);
  y = row(doc, y, 'Datatillägg 2 GB (abonnent 070-123 45 67)', '1', 'st', 49, 49);
  totals(doc, y + 10, [1074, 49]);
}));

// 6. Telia — hårdvara + abonnemang (EDGE: mixed hardware)
invoices.push(invoice('telia-mobil-hardvara.pdf', (doc) => {
  let y = header(doc, 'Telia Sverige AB', '556103-4249', 'Stjärntorget 1, 169 79 Solna', 'TEL-20260501-881234', today, due, 'Reklambolaget Sverige AB\nLjungbyvägen 3, 214 44 Malmö');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Telia Jobbmobil Obegränsad+ (20 abonnemang)', '20', 'st', 499, 9980);
  y = row(doc, y, 'iPhone 16 Pro 256GB (avbetalning mån 3/36)', '5', 'st', 416.67, 2083.35);
  y = row(doc, y, 'Samsung Galaxy S25 (avbetalning mån 8/24)', '3', 'st', 291.67, 875.01);
  y = row(doc, y, 'Roaming Världen Utanför EU — Datatrafik 6,8 GB', '6.8', 'GB', 149, 1013.2);
  totals(doc, y + 10, [9980, 2083.35, 875.01, 1013.2]);
  note(doc, y + 60, 'Hårdvara faktureras via Telia Avbetalning. Ej ångerrätt efter aktivering.');
}));

// 7. Tele2 — årsbetalning (EDGE: annual billing)
invoices.push(invoice('tele2-mobil-arsavtal.pdf', (doc) => {
  let y = header(doc, 'Tele2 Sverige AB', '556267-5164', 'Box 62, 164 94 Kista', 'TLE-2026-ARS-0421', '2026-01-01', '2026-01-31', 'Bokföringsbyrån Svensson AB\nStationsgatan 14, 582 73 Linköping');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Tele2 Jobbmobil XL — Årsavtal 2026 (8 abonnemang)', '8', 'st', 3990, 31920);
  y = row(doc, y, 'Tele2 Datarouter Flex — Årsavtal 2026 (1 st)', '1', 'st', 2988, 2988);
  totals(doc, y + 10, [31920, 2988]);
  note(doc, y + 60, 'Årsavtal — faktureras i förskott för perioden 2026-01-01 – 2026-12-31. Priset inkluderar 10% årsrabatt jämfört med månadsvis fakturering.');
}));

// 8. Telenor — pro-rata (EDGE: mid-month addition)
invoices.push(invoice('telenor-mobil-prorata.pdf', (doc) => {
  let y = header(doc, 'Telenor Sverige AB', '556421-0309', 'Isafjordsgatan 10, 164 40 Kista', 'TEL-2026-05-9944', today, due, 'Ingenjörsfirman Nilsson AB\nIndustrivägen 22, 721 30 Västerås');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Telenor Business Smart (10 abonnemang) Maj 2026', '10', 'st', 379, 3790);
  y = row(doc, y, 'Pro-rata: Tillagd 16 maj — abonnent 073-444 55 66', '0.5', 'mån', 379, 189.5);
  y = row(doc, y, 'Pro-rata: Tillagd 23 maj — abonnent 073-444 55 67', '0.3', 'mån', 379, 113.7);
  y = row(doc, y, 'Roaming Europa — Datatrafik 3,1 GB', '3.1', 'GB', 29, 89.9);
  totals(doc, y + 10, [3790, 189.5, 113.7, 89.9]);
  note(doc, y + 60, 'Pro-rata beräknat på återstående kalenderdagar i maj. Från juni faktureras full månadsavgift för alla 12 abonnemang.');
}));

// 9. GlobalCom — okänd leverantör, hög roaming (EDGE: unknown supplier)
invoices.push(invoice('globalcom-mobil-hog-roaming.pdf', (doc) => {
  let y = header(doc, 'GlobalCom Networks AB', '559123-4567', 'Centrumgatan 8, 753 20 Uppsala', 'GCN-MAJ26-00441', today, due, 'Transportbolaget Öst AB\nLogistikvägen 1, 602 38 Norrköping');
  y = tableHeader(doc, y);
  y = row(doc, y, 'GlobalCom Företag Bas 50 GB (5 abonnemang)', '5', 'st', 349, 1745);
  y = row(doc, y, 'Datatrafik Utland Zon 4 (Satellit/Sjöfart) — 61,7 GB', '61.7', 'GB', 149, 9193.3);
  y = row(doc, y, 'Samtal Utland Zon 4 — 284 min', '284', 'min', 4.9, 1391.6);
  totals(doc, y + 10, [1745, 9193.3, 1391.6]);
  note(doc, y + 60, 'Höga roaming-kostnader Zon 4. Överväg att aktivera roaming-spärr eller uppgradera till GlobalCom Satellite-plan.');
}));

// 10. Tele2 — kreditfaktura (EDGE: credit/adjustment)
invoices.push(invoice('tele2-mobil-kreditfaktura.pdf', (doc) => {
  let y = header(doc, 'Tele2 Sverige AB', '556267-5164', 'Box 62, 164 94 Kista', 'TLE-KRED-20260501-0088', today, due, 'Advokatbyrån Lindholm & Co\nBirger Jarlsgatan 33, 111 45 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Tele2 Jobbmobil XL (18 abonnemang) Maj 2026', '18', 'st', 449, 8082);
  y = row(doc, y, 'Kreditering: Uppsagda abonnemang (3 st) — avs. apr', '-3', 'st', 449, -1347);
  y = row(doc, y, 'Kreditering: Dubbelfakturering mars faktura 0071', '1', 'st', 898, -898);
  y = row(doc, y, 'Roaming EU — Datatrafik 2,4 GB', '2.4', 'GB', 29, 69.6);
  totals(doc, y + 10, [8082, -1347, -898, 69.6]);
  note(doc, y + 60, 'Kreditering avser felaktig debitering på faktura TLE-20260401-0071. Saldo återbetalas till registrerat bankkonto inom 10 bankdagar.');
}));

// ═══════════════════════════════ BREDBAND (10 st) ════════════════════════════

// 11. Bahnhof — ren fiber
invoices.push(invoice('bahnhof-fiber-ren.pdf', (doc) => {
  let y = header(doc, 'Bahnhof AB', '556558-6194', 'Box 7702, 103 95 Stockholm', 'BHF-2026-05-44123', today, due, 'Arkitektkontoret Ström AB\nHamngatan 11, 111 47 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Bahnhof Företag Fiber 1 Gbit (symmetrisk) — Maj 2026', '1', 'mån', 699, 699);
  totals(doc, y + 10, [699]);
  note(doc, y + 50, 'Tillsvidare-avtal | Uppsägningstid: 1 månad | Ingen bindningstid');
}));

// 12. Telia Fiber — med statisk IP (EDGE: addon)
invoices.push(invoice('telia-fiber-statisk-ip.pdf', (doc) => {
  let y = header(doc, 'Telia Sverige AB', '556103-4249', 'Stjärntorget 1, 169 79 Solna', 'TEL-FIB-20260501-77221', today, due, 'Revisionsbyrån Olsson & Partners AB\nKungsgatan 9, 252 21 Helsingborg');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Telia Bredband Företag 500/500 Mbit/s — Maj 2026', '1', 'mån', 649, 649);
  y = row(doc, y, 'Telia Statisk IP-adress (1 st) — Maj 2026', '1', 'mån', 149, 149);
  totals(doc, y + 10, [649, 149]);
  note(doc, y + 50, 'Avtal: 24 månader t.o.m. 2027-08-31 | IP-adress: 46.21.XX.XX (konfiguration medföljer separat)');
}));

// 13. IP-Only — fiber med full addon-stack (EDGE: addon-stack stress test)
invoices.push(invoice('iponly-fiber-addon-stack.pdf', (doc) => {
  let y = header(doc, 'IP-Only Networks AB', '556619-9015', 'Marieviksgatan 19, 117 43 Stockholm', 'IPO-2026-05-008841', today, due, 'Mediehuset Norr AB\nSödra Kungsgatan 10, 803 11 Gävle');
  y = tableHeader(doc, y);
  y = row(doc, y, 'IP-Only Fiber Företag Pro 1000/1000 Mbit/s — Maj', '1', 'mån', 1199, 1199);
  y = row(doc, y, 'SLA Platinum (2h inställelsetid, 99,9% SLA) — Maj', '1', 'mån', 799, 799);
  y = row(doc, y, 'Fasta IP-adresser /29 (6 användbara) — Maj', '1', 'mån', 399, 399);
  y = row(doc, y, 'Managed Firewall Fortinet FortiGate 60F — Maj', '1', 'mån', 599, 599);
  y = row(doc, y, 'DDoS-skydd Bas (upp till 10 Gbit/s) — Maj', '1', 'mån', 299, 299);
  totals(doc, y + 10, [1199, 799, 399, 599, 299]);
  note(doc, y + 60, 'Kombinerad faktura: Fiberanslutning + Managed tjänster. Avtal 36 mån t.o.m. 2028-05-31. SLA gäller fysisk anslutning, ej Internet-backbone.');
}));

// 14. Bredbandsbolaget — med kampanjrabatt (EDGE: discount)
invoices.push(invoice('bredbandsbolaget-kampanj.pdf', (doc) => {
  let y = header(doc, 'Bredbandsbolaget Sverige AB', '556533-8820', 'Box 9107, 400 92 Göteborg', 'BBL-2026-05-119944', today, due, 'Redovisningsbyrån Karlsson AB\nAvenyn 22, 411 36 Göteborg');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Bredbandsbolaget Fiber 500/500 Mbit/s — Maj 2026', '1', 'mån', 799, 799);
  y = row(doc, y, 'Kampanjrabatt Företagskund (mån 8 av 12) -25%', '1', 'st', -199.75, -199.75);
  totals(doc, y + 10, [799, -199.75]);
  note(doc, y + 50, 'Kampanjpris gäller t.o.m. faktura december 2026 (mån 12/12). Ordinarie pris 799 kr/mån fr.o.m. januari 2027.');
}));

// 15. Stadsnät Öresund — koaxial + TV (EDGE: outofscope mix)
invoices.push(invoice('stadsnät-koaxial-tv.pdf', (doc) => {
  let y = header(doc, 'Stadsnät Öresund AB', '556712-4488', 'Stortorget 1, 211 22 Malmö', 'SNO-2026-05-00234', today, due, 'Kioskkedjan Syd AB\nTingsgatan 4, 241 30 Eslöv');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Bredband Koaxial 600/50 Mbit/s — Maj 2026', '1', 'mån', 699, 699);
  y = row(doc, y, 'Kabel-TV Digital Bas (SVT1, SVT2, TV4 m.fl.) — Maj', '1', 'mån', 249, 249);
  y = row(doc, y, 'HBO Nordic Tillägg — Maj 2026', '1', 'mån', 89, 89);
  totals(doc, y + 10, [699, 249, 89]);
  note(doc, y + 50, 'Kabel-TV och streaming-tillägg ingår ej i Arvo Flows analys. Bredbandskomponenten analyseras separat.');
}));

// 16. Com Hem — kombinerad mobil + bredband (EDGE: combined)
invoices.push(invoice('comhem-mobil-bredband-kombinerad.pdf', (doc) => {
  let y = header(doc, 'Com Hem AB', '556354-4719', 'Fleminggatan 18, 112 26 Stockholm', 'CHM-2026-05-554433', today, due, 'Tandläkarpraktiken Lundin AB\nDrottninggatan 55, 111 21 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Com Hem Fiber 250/250 Mbit/s — Maj 2026', '1', 'mån', 549, 549);
  y = row(doc, y, 'Com Hem Mobil L (3 abonnemang) — Maj 2026', '3', 'st', 269, 807);
  y = row(doc, y, 'Statisk IP (Com Hem Business) — Maj 2026', '1', 'mån', 99, 99);
  y = row(doc, y, 'Roaming EU — Datatrafik 1,8 GB', '1.8', 'GB', 29, 52.2);
  totals(doc, y + 10, [549, 807, 99, 52.2]);
  note(doc, y + 60, 'Kombinerad faktura: Bredband + Mobilabonnemang. Paketerbjudande ger 10% rabatt på mobilabonnemangen jämfört med separat tecknade avtal.');
}));

// ═══════════════════════════════ EL (8 st) ════════════════════════════════════

// 17. E.ON — rörligt spotpris SE3
invoices.push(invoice('eon-el-spot-se3.pdf', (doc) => {
  let y = header(doc, 'E.ON Energilösningar AB', '556570-2650', 'Malmöhusvägen 1, 205 09 Malmö', 'EON-2026-05-0088123', today, due, 'Restaurang Källaren AB\nKöpmansgatan 4, 111 31 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Elhandel Företag Rörligt — April 2026 — 8 200 kWh', '8200', 'kWh', 0.891, 7306.2);
  y = row(doc, y, 'E.ON Elnätabonnemang 25A (fast avgift)', '1', 'mån', 385, 385);
  y = row(doc, y, 'Nätöverföringsavgift — 8 200 kWh × 0,215 kr/kWh', '8200', 'kWh', 0.215, 1763);
  y = row(doc, y, 'Energiskatt — 8 200 kWh × 0,428 kr/kWh', '8200', 'kWh', 0.428, 3509.6);
  totals(doc, y + 10, [7306.2, 385, 1763, 3509.6]);
  note(doc, y + 60, 'Elområde SE3 (Stockholm) | Spotprisavtal | Genomsnittspris april: 89,1 öre/kWh | Mätarnr: 735999112233445566');
}));

// 18. Fortum — fastprisavtal
invoices.push(invoice('fortum-el-fastpris.pdf', (doc) => {
  let y = header(doc, 'Fortum Markets AB', '556528-5889', 'Hangövägen 47, 115 77 Stockholm', 'FRT-2026-05-334411', today, due, 'Hantverksfirman Johansson AB\nVerkstadsgatan 8, 721 34 Västerås');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Fortum Fastpris Företag 2026 — April — 3 400 kWh', '3400', 'kWh', 1.12, 3808);
  y = row(doc, y, 'Elnätabonnemang 16A (fast avgift)', '1', 'mån', 295, 295);
  y = row(doc, y, 'Nätöverföring — 3 400 kWh × 0,198 kr/kWh', '3400', 'kWh', 0.198, 673.2);
  y = row(doc, y, 'Energiskatt — 3 400 kWh × 0,428 kr/kWh', '3400', 'kWh', 0.428, 1455.2);
  totals(doc, y + 10, [3808, 295, 673.2, 1455.2]);
  note(doc, y + 60, 'Fastprisavtal Fortum Företag Trygg 24 — gäller t.o.m. 2027-12-31 | Elområde SE3 | Pris inkl. elcertifikat: 1,12 kr/kWh');
}));

// 19. Tibber — spotpris med timavräkning (EDGE: unusual format)
invoices.push(invoice('tibber-el-timavrakning.pdf', (doc) => {
  let y = header(doc, 'Tibber AB', '556975-6529', 'Kungsgatan 8, 111 43 Stockholm', 'TIB-2026-05-A87123', today, due, 'IT-Konsulten Eriksson AB\nLidingövägen 14, 114 22 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Tibber Spot Timavräkning — April 2026 — 2 100 kWh', '2100', 'kWh', 0.834, 1751.4);
  y = row(doc, y, 'Tibber-avgift (app + tjänst) — April 2026', '1', 'mån', 39, 39);
  y = row(doc, y, 'Nätöverföring SE3 — 2 100 kWh × 0,211 kr/kWh', '2100', 'kWh', 0.211, 443.1);
  y = row(doc, y, 'Energiskatt — 2 100 kWh × 0,428 kr/kWh', '2100', 'kWh', 0.428, 898.8);
  totals(doc, y + 10, [1751.4, 39, 443.1, 898.8]);
  note(doc, y + 60, 'Tibber timavräkning — pris varierar per timme baserat på Nordpool spotpris. Genomsnittspris april: 83,4 öre/kWh. Elområde SE3.');
}));

// 20. Vattenfall — SE4 / Skåne (EDGE: different region)
invoices.push(invoice('vattenfall-el-se4.pdf', (doc) => {
  let y = header(doc, 'Vattenfall Eldistribution AB', '556417-0024', 'Evenemangsgatan 13, 169 79 Solna', 'VTF-2026-05-0091234', today, due, 'Skånska Livs AB\nStortorget 3, 211 23 Malmö');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Vattenfall Rörligt Företag — April 2026 — 6 800 kWh', '6800', 'kWh', 0.712, 4841.6);
  y = row(doc, y, 'Elnätabonnemang 3×25A (fast avgift)', '1', 'mån', 545, 545);
  y = row(doc, y, 'Nätöverföring SE4 — 6 800 kWh × 0,187 kr/kWh', '6800', 'kWh', 0.187, 1271.6);
  y = row(doc, y, 'Energiskatt — 6 800 kWh × 0,428 kr/kWh', '6800', 'kWh', 0.428, 2910.4);
  totals(doc, y + 10, [4841.6, 545, 1271.6, 2910.4]);
  note(doc, y + 60, 'Elområde SE4 (Malmö/Skåne) | Rörligt spotprisavtal | Genomsnittspris april: 71,2 öre/kWh | Anläggnings-ID: 7352298411234567');
}));

// 21. Kraftringen — litet lokalt elnät, SE4
invoices.push(invoice('kraftringen-el-lokalt.pdf', (doc) => {
  let y = header(doc, 'Kraftringen Energi AB', '556603-0498', 'Råbyvägen 3, 224 58 Lund', 'KRF-2026-05-11234', today, due, 'Lunds Cykelservice AB\nKlostergatan 5, 222 22 Lund');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Elhandel Rörligt — April 2026 — 1 200 kWh', '1200', 'kWh', 0.744, 892.8);
  y = row(doc, y, 'Kraftringen Nätabonnemang 10A', '1', 'mån', 195, 195);
  y = row(doc, y, 'Nätöverföring — 1 200 kWh × 0,193 kr/kWh', '1200', 'kWh', 0.193, 231.6);
  y = row(doc, y, 'Energiskatt — 1 200 kWh × 0,428 kr/kWh', '1200', 'kWh', 0.428, 513.6);
  totals(doc, y + 10, [892.8, 195, 231.6, 513.6]);
  note(doc, y + 60, 'Lokalt elnätsbolag SE4 | Lund, Skåne | Mätarnr: KR-11234567');
}));

// ══════════════════════ MICROSOFT 365 / SAAS-PRODUCTIVITY (8 st) ═════════════

// 22. Dustin — M365 standard reseller
invoices.push(invoice('dustin-m365-standard.pdf', (doc) => {
  let y = header(doc, 'Dustin AB', '556404-2528', 'Johanneslundsvägen 2, 194 81 Upplands Väsby', 'DST-2026-05-0099112', today, due, 'Advokatbyrån Lindqvist AB\nStrandvägen 29, 114 56 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Microsoft 365 Business Standard (32 licenser) Maj', '32', 'lic', 115, 3680);
  y = row(doc, y, 'Microsoft 365 Business Basic (8 licenser) Maj', '8', 'lic', 65, 520);
  totals(doc, y + 10, [3680, 520]);
  note(doc, y + 50, 'CSP-återförsäljare: Dustin AB | Licensperiod: 2026-05-01–2026-05-31 | Microsoft Tenant-ID: M-SE-88421');
}));

// 23. Atea — M365 med licensöverskott (EDGE: license overage)
invoices.push(invoice('atea-m365-overskott.pdf', (doc) => {
  let y = header(doc, 'Atea Sverige AB', '556084-6947', 'Marieviksgatan 3, 117 43 Stockholm', 'ATEA-2026-05-MIC-7712', today, due, 'Tillverkningsbolaget Väst AB\nIndustrivägen 100, 504 64 Borås');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Microsoft 365 Business Premium (60 licenser) Maj', '60', 'lic', 270, 16200);
  y = row(doc, y, 'Microsoft Defender for Business (60 licenser) Maj', '60', 'lic', 36, 2160);
  y = row(doc, y, 'Microsoft Azure AD Premium P2 (60 lic.) Maj', '60', 'lic', 73, 4380);
  totals(doc, y + 10, [16200, 2160, 4380]);
  note(doc, y + 60, 'OBS: 60 licenser fakturerade. Senaste HR-underlag visar 44 aktiva anställda. Rekommenderas att genomföra licensgranskning. Kontakta Atea för nedjustering.');
}));

// 24. Crayon — M365 + Azure (EDGE: mixed SaaS)
invoices.push(invoice('crayon-m365-azure.pdf', (doc) => {
  let y = header(doc, 'Crayon AS (Swedish Branch)', '556975-2234', 'Sveavägen 9, 111 57 Stockholm', 'CRY-2026-05-SE-44123', today, due, 'Logistikbolaget Nord AB\nFjärdingsgatan 4, 831 37 Östersund');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Microsoft 365 E3 (28 licenser) — Maj 2026', '28', 'lic', 380, 10640);
  y = row(doc, y, 'Microsoft Azure — Förbrukning april 2026 (SEK)', '1', 'mån', 8441.5, 8441.5);
  y = row(doc, y, 'Crayon Managed Services (Azure-förvaltning)', '1', 'mån', 2500, 2500);
  totals(doc, y + 10, [10640, 8441.5, 2500]);
  note(doc, y + 60, 'Azure-förbrukning specificeras i separat Azure Cost Report. Crayon Managed Services inkluderar driftövervakning, patchning och kostnadsoptimering.');
}));

// 25. Microsoft direkt — USD-faktura (EDGE: foreign currency)
invoices.push(invoice('microsoft-direkt-usd.pdf', (doc) => {
  let y = header(doc, 'Microsoft Ireland Operations Ltd', 'IE8256796U', 'One Microsoft Place, Dublin 18, Ireland', 'MS-INV-20260501-SE-78231', today, due, 'Tech Startup AB\nNorra Bantorget 2, 113 20 Stockholm');
  doc.font('Helvetica').fontSize(9).fillColor('#c00')
    .text('OBS: Faktura i USD — växlingskurs 10,42 SEK/USD per 2026-05-01', 50, 185);
  y = 210;
  y = tableHeader(doc, y);
  y = row(doc, y, 'Microsoft 365 Business Premium (15 lic.) Maj USD', '15', 'lic', 22, 330);
  y = row(doc, y, 'Microsoft Copilot for M365 (15 lic.) Maj USD', '15', 'lic', 30, 450);
  doc.font('Helvetica').fontSize(8).fillColor('#555').text('Belopp i USD exkl. moms. SEK-motvärde: 330 USD × 10,42 = 3 438,60 kr | 450 USD × 10,42 = 4 689 kr', 50, y + 5);
  totals(doc, y + 25, [3438.6, 4689]);
  note(doc, y + 70, 'VAT-nr: SE556XXX. Reverse charge tillämpas — köparen redovisar moms. Reverse charge § 1 kap. 2 § ML.');
}));

// 26. Google Workspace — årsbetalning (EDGE: annual SaaS)
invoices.push(invoice('google-workspace-arsbetalning.pdf', (doc) => {
  let y = header(doc, 'Google Ireland Limited', 'IE6388047V', 'Gordon House, Barrow Street, Dublin 4', 'GGL-2026-INV-SE-00441', '2026-01-01', '2026-01-31', 'DesignbyrånStröm AB\nMalmskillnadsgatan 36, 111 57 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Google Workspace Business Plus — Årslic. 2026 (20 lic)', '20', 'lic', 1404, 28080);
  y = row(doc, y, 'Google Workspace Archived User (5 lic.) 2026', '5', 'lic', 216, 1080);
  totals(doc, y + 10, [28080, 1080]);
  note(doc, y + 50, 'Årsbetalning — licenser gäller 2026-01-01 t.o.m. 2026-12-31. Faktureras i SEK via Google reseller. Reverse charge tillämpas.');
}));

// ══════════════════════════ SKRIVARLEASING (4 st) ════════════════════════════

// 27. Konica Minolta — klick + hyra
invoices.push(invoice('konica-minolta-klick.pdf', (doc) => {
  let y = header(doc, 'Konica Minolta Business Solutions Sweden AB', '556290-0373', 'Johanneslundsvägen 12, 194 81 Upplands Väsby', 'KM-2026-05-SE-44231', today, due, 'Redovisningsbyrån Magnusson AB\nÖstra Hamngatan 16, 411 09 Göteborg');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Grundhyra bizhub C360i (fast leasingavgift)', '1', 'mån', 1890, 1890);
  y = row(doc, y, 'Serviceavtal Konica Minolta Care — Maj 2026', '1', 'mån', 350, 350);
  y = row(doc, y, 'Svartvita utskrifter — 4 812 sidor × 0,082 kr/sida', '4812', 'sidor', 0.082, 394.58);
  y = row(doc, y, 'Färgutskrifter — 2 341 sidor × 0,68 kr/sida', '2341', 'sidor', 0.68, 1591.88);
  totals(doc, y + 10, [1890, 350, 394.58, 1591.88]);
  note(doc, y + 60, 'Leasingavtal: 60 mån t.o.m. 2028-03-31 | Klick räknas från maskinens inbyggda räknare | Avräkningsperiod: 2026-04-01–2026-04-30');
}));

// 28. Canon — hög klick-ratio (EDGE: >35% click ratio → requiresQuote)
invoices.push(invoice('canon-hog-klickratio.pdf', (doc) => {
  let y = header(doc, 'Canon Svenska AB', '556057-1117', 'Gustav III:s Boulevard 26, 169 27 Solna', 'CAN-2026-05-0077123', today, due, 'Tryckeriet Almqvist AB\nFabriksgatan 22, 582 14 Linköping');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Hyra imageRUNNER ADVANCE DX 6765 (fast avgift)', '1', 'mån', 2400, 2400);
  y = row(doc, y, 'Svartvita klickutskrifter — 28 441 sidor × 0,045', '28441', 'sidor', 0.045, 1279.85);
  y = row(doc, y, 'Färgklickutskrifter — 18 223 sidor × 0,41', '18223', 'sidor', 0.41, 7471.43);
  y = row(doc, y, 'Scanningavgift — 3 200 sidor × 0,012', '3200', 'sidor', 0.012, 38.4);
  totals(doc, y + 10, [2400, 1279.85, 7471.43, 38.4]);
  note(doc, y + 60, 'Klick/Hyra-ratio: 78% (klick 8 789 kr / totalt 11 189 kr). Hög klickandel — rekommenderas att se över utskriftsvolym. Serviceavtal inkl. toner.');
}));

// 29. Xerox — managed print med IT-tjänster (EDGE: mixed services)
invoices.push(invoice('xerox-managed-print-it.pdf', (doc) => {
  let y = header(doc, 'Xerox AB', '556017-5695', 'Kistagången 2, 164 40 Kista', 'XRX-2026-05-SE-0023441', today, due, 'Sjukhuset Friska AB\nSjukhusvägen 1, 931 86 Skellefteå');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Grundhyra Xerox AltaLink C8170 (2 enheter)', '2', 'st', 2100, 4200);
  y = row(doc, y, 'Xerox Managed Print Services — Maj 2026', '1', 'mån', 1500, 1500);
  y = row(doc, y, 'Svartvita sidor — 12 441 × 0,056 kr/sida', '12441', 'sidor', 0.056, 696.7);
  y = row(doc, y, 'Färgsidor — 4 102 × 0,62 kr/sida', '4102', 'sidor', 0.62, 2543.24);
  y = row(doc, y, 'Print-IT Support (helpdesk 8–17 mån–fre)', '1', 'mån', 800, 800);
  totals(doc, y + 10, [4200, 1500, 696.7, 2543.24, 800]);
  note(doc, y + 60, 'Managed Print Services inkluderar: toner, delar, service och support. IT Support är en separat avtalad tilläggstjänst.');
}));

// ══════════════════════ SAAS-OTHER / DEVTOOLS (5 st) ════════════════════════

// 30. Atlassian — månadsbetalning Cloud
invoices.push(invoice('atlassian-cloud-manad.pdf', (doc) => {
  let y = header(doc, 'Atlassian Network Services, Inc.', 'US-EIN-98-1234567', 'c/o Atlassian Pty Ltd, Sydney NSW 2000, Australia', 'ATL-INV-SE-2026-05-77221', today, due, 'Produktbolaget Digital AB\nKungsträdgårdsgatan 10, 111 47 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Jira Software Cloud Standard (35 användare) Maj', '35', 'lic', 71.5, 2502.5);
  y = row(doc, y, 'Confluence Cloud Standard (35 användare) Maj', '35', 'lic', 52, 1820);
  y = row(doc, y, 'Jira Service Management Cloud Team (10 ag.) Maj', '10', 'lic', 213, 2130);
  totals(doc, y + 10, [2502.5, 1820, 2130]);
  note(doc, y + 60, 'Faktura i SEK (konverterad från USD vid kurs 10,31). Reverse charge — köparen redovisar moms enligt 1 kap. 2 § ML. Cloud-region: EU (Frankfurt).');
}));

// 31. Adobe — årsavtal i USD (EDGE: annual + USD)
invoices.push(invoice('adobe-creative-cloud-ars.pdf', (doc) => {
  let y = header(doc, 'Adobe Systems Software Ireland Limited', 'IE6347448A', 'Unit 3100 Lake Drive, Citywest, Dublin 24', 'ADBE-2026-INV-SE-00234', '2026-03-01', '2026-03-31', 'Byrå Stockholm Creative AB\nHornsgatan 23, 118 49 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Adobe Creative Cloud All Apps (20 lic.) — Årsavtal SEK', '20', 'lic', 6588, 131760);
  y = row(doc, y, 'Adobe Sign Business (5 lic.) — Årsavtal SEK', '5', 'lic', 5148, 25740);
  totals(doc, y + 10, [131760, 25740]);
  note(doc, y + 60, 'Årsavtal faktureras i förskott. Licensperiod: 2026-03-01 – 2027-02-28. Ingen återbetalning vid uppsägning under löptid. Reverse charge tillämpas.');
}));

// 32. Salesforce — enterprise (EDGE: large SaaS amount)
invoices.push(invoice('salesforce-enterprise.pdf', (doc) => {
  let y = header(doc, 'Salesforce.com EMEA Ltd', 'IE9816989N', 'Salesforce Tower, North Dock, Dublin 1', 'SF-INV-SE-2026-Q2-00441', today, due, 'Säljbolaget Sverige AB\nKungsgatan 4, 111 22 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Salesforce Sales Cloud Enterprise (25 lic.) Q2 2026', '25', 'lic', 4250, 106250);
  y = row(doc, y, 'Salesforce Service Cloud Enterprise (10 lic.) Q2 2026', '10', 'lic', 4250, 42500);
  y = row(doc, y, 'Salesforce Einstein Analytics (25 lic.) Q2 2026', '25', 'lic', 1200, 30000);
  totals(doc, y + 10, [106250, 42500, 30000], 0);
  note(doc, y + 60, 'Kvartalsfaktura — avser perioden 2026-04-01–2026-06-30. Reverse charge. Belopp ex. moms i SEK (kurs 10,40 SEK/USD, fakturadatum 2026-05-01).');
}));

// 33. HubSpot — marketing (EDGE: USD quarterly)
invoices.push(invoice('hubspot-marketing-pro.pdf', (doc) => {
  let y = header(doc, 'HubSpot, Inc.', 'US-EIN-20-2632810', '25 First Street, Cambridge, MA 02141, USA', 'HS-2026-Q2-SE-00881', today, due, 'Marknadsföringsbyrån Webb AB\nSveavägen 48, 111 34 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'HubSpot Marketing Hub Pro (5 lic.) — Kvartal Q2 SEK', '5', 'lic', 4158, 20790);
  y = row(doc, y, 'HubSpot Sales Hub Pro (10 lic.) — Kvartal Q2 SEK', '10', 'lic', 2376, 23760);
  y = row(doc, y, 'HubSpot Onboarding (engångskostnad, Q1 2026)', '1', 'st', 8000, 8000);
  totals(doc, y + 10, [20790, 23760, 8000], 0);
  note(doc, y + 60, 'Kvartalsfaktura Q2 2026. Onboarding faktureras engång. Reverse charge. HubSpot EMEA-region: Frankfurt. Valuta: SEK via HubSpot Checkout.');
}));

// ══════════════════════ SERVERHOSTING / CLOUD (3 st) ═════════════════════════

// 34. AWS-reseller — komplex molnfaktura
invoices.push(invoice('aws-reseller-komplex.pdf', (doc) => {
  let y = header(doc, 'Cygate AB (AWS Advanced Partner)', '556552-0234', 'Kilsgatan 4, 411 04 Göteborg', 'CYG-2026-05-AWS-00441', today, due, 'Fintech Startup AB\nKungsgatan 62, 111 22 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'AWS EC2 — Compute (r6i.2xlarge × 720h)', '720', 'h', 5.12, 3686.4);
  y = row(doc, y, 'AWS RDS PostgreSQL (db.r6g.large × 720h)', '720', 'h', 2.84, 2044.8);
  y = row(doc, y, 'AWS S3 Standard — 8,4 TB lagring', '8400', 'GB', 0.023, 193.2);
  y = row(doc, y, 'AWS CloudFront — 2,1 TB datatrafik', '2100', 'GB', 0.085, 178.5);
  y = row(doc, y, 'Cygate Managed Cloud (driftövervakning + patching)', '1', 'mån', 4500, 4500);
  y = row(doc, y, 'AWS Savings Plan kredit (committment rabatt)', '1', 'st', -1840, -1840);
  totals(doc, y + 10, [3686.4, 2044.8, 193.2, 178.5, 4500, -1840]);
  note(doc, y + 60, 'Konverterat från USD (kurs 10,42 SEK/USD). Detaljerad AWS Cost Report bifogas separat. Managed Services avtal 12 mån t.o.m. 2026-12-31.');
}));

// 35. Azure — reseller
invoices.push(invoice('azure-csp-reseller.pdf', (doc) => {
  let y = header(doc, 'Advania Sverige AB (Microsoft CSP)', '556818-0840', 'Frösundaviks Allé 1, 169 70 Solna', 'ADV-2026-05-AZ-77123', today, due, 'Industribolaget Svensson AB\nFabriksvägen 10, 504 34 Borås');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Microsoft Azure — Förbrukning april 2026 (SEK)', '1', 'mån', 24412, 24412);
  y = row(doc, y, 'Azure Hybrid Benefit rabatt (Windows Server)', '1', 'mån', -3200, -3200);
  y = row(doc, y, 'Advania Cloud Management (månatlig tjänst)', '1', 'mån', 5500, 5500);
  totals(doc, y + 10, [24412, -3200, 5500]);
  note(doc, y + 60, 'Azure-förbrukning specificeras i Azure Cost Management portal. Hybrid Benefit aktiverat för 8 Windows Server-licenser (SA-berättigade). CSP-ID: ADV-SE-441.');
}));

// ═══════════════════ TRANSPORT / FRAKT (3 st) ═════════════════════════════════

// 36. DHL — standardfrakt
invoices.push(invoice('dhl-frakt-standard.pdf', (doc) => {
  let y = header(doc, 'DHL Freight Sweden AB', '556270-7928', 'Marieholmsgatan 22, 415 02 Göteborg', 'DHL-2026-05-SE-0088123', today, due, 'Grossistbolaget Hansson AB\nLagervägen 12, 151 60 Södertälje');
  y = tableHeader(doc, y);
  y = row(doc, y, 'DHL Euroconnect — 32 pallar inrikes (Zon 2)', '32', 'pallar', 685, 21920);
  y = row(doc, y, 'DHL Paket < 31,5 kg — 84 kolli', '84', 'st', 98, 8232);
  y = row(doc, y, 'Drivmedelstillägg (DMT) 29,1 % — Maj 2026', '1', 'st', 8759.84, 8759.84);
  y = row(doc, y, 'Miljötillägg 1,5 % — Maj 2026', '1', 'st', 451.08, 451.08);
  y = row(doc, y, 'Bomkörning — 2 tillfällen 14 och 22 maj', '2', 'st', 490, 980);
  totals(doc, y + 10, [21920, 8232, 8759.84, 451.08, 980]);
  note(doc, y + 60, 'DMT = Drivmedelstillägg Mottagningsterminal, varierar månadsvis med dieselindex. Maj 2026: index 29,1%. Miljötillägg beräknas på frakt + DMT.');
}));

// 37. PostNord — brev och paket
invoices.push(invoice('postnord-brev-paket.pdf', (doc) => {
  let y = header(doc, 'PostNord Sverige AB', '556027-3516', 'Terminalvägen 24, 171 73 Solna', 'PN-2026-05-0044123', today, due, 'Postorderbolaget Svedin AB\nLogistikgatan 3, 703 74 Örebro');
  y = tableHeader(doc, y);
  y = row(doc, y, 'PostNord MyPack Collect (501–999 g) — 412 st', '412', 'st', 67, 27604);
  y = row(doc, y, 'PostNord MyPack Collect (1–2 kg) — 188 st', '188', 'st', 82, 15416);
  y = row(doc, y, 'Avtal Pallet (Zon 1-2) — 15 pallar', '15', 'pallar', 420, 6300);
  y = row(doc, y, 'Drivmedelstillägg (DT) 29,1 % på frakt', '1', 'st', 14355.8, 14355.8);
  y = row(doc, y, 'Returhantering (avi+uthämtning misslyckad) — 12 st', '12', 'st', 45, 540);
  totals(doc, y + 10, [27604, 15416, 6300, 14355.8, 540]);
}));

// ═══════════════════════ EDGE CASES / SPECIAL (8 st) ═════════════════════════

// 38. Okänd leverantör — IT-konsult (EDGE: ambiguous, might be review_queue)
invoices.push(invoice('konsult-it-oklar.pdf', (doc) => {
  let y = header(doc, 'TechSolutions Konsult AB', '559234-5678', 'Gränsgatan 12, 602 11 Norrköping', 'TSK-2026-05-00441', today, due, 'Okänd Kund AB\nStorgatan 1, 111 11 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Systemutveckling och konsulttjänster — maj 2026', '1', 'mån', 45000, 45000);
  y = row(doc, y, 'Licensavgift eget system (oklart om SaaS)', '1', 'mån', 3500, 3500);
  y = row(doc, y, 'Drift och underhåll (oklart vad ingår)', '1', 'mån', 8000, 8000);
  totals(doc, y + 10, [45000, 3500, 8000]);
  note(doc, y + 60, 'Specifikation saknas. Avtalsreferens: TSK-AVTAL-2024-001. Kontakta leverantören för mer detaljerad fakturering.');
}));

// 39. Restaurang — out of scope
invoices.push(invoice('restaurang-mat-outofscope.pdf', (doc) => {
  let y = header(doc, 'Cateringbolaget Smakrika AB', '556712-9988', 'Köksvägen 4, 171 48 Solna', 'SMK-2026-05-0334', today, due, 'Kontorshotellet City AB\nKungsgatan 20, 111 35 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Lunchbuffé maj 2026 (22 arbetsdagar × 18 pers)', '396', 'port', 89, 35244);
  y = row(doc, y, 'Frukost-service måndag–fredag (22 dgr × 18 pers)', '396', 'port', 45, 17820);
  y = row(doc, y, 'Mötesfika (14 tillfällen)', '14', 'st', 450, 6300);
  totals(doc, y + 10, [35244, 17820, 6300]);
  note(doc, y + 60, 'Cateringavtal månadsvis. Priser exkl. moms. Eventuell förändring av antal portioner meddelas senast 3 dagar i förväg.');
}));

// 40. Städ — out of scope
invoices.push(invoice('stadbolag-outofscope.pdf', (doc) => {
  let y = header(doc, 'Proffsstäd Sverige AB', '556589-3312', 'Dammvägen 8, 302 44 Halmstad', 'PSS-2026-05-0712', today, due, 'Fastighets AB Centrum\nStortorget 10, 301 28 Halmstad');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Kontorsstädning 5 ggr/vecka — maj 2026', '22', 'dgr', 1200, 26400);
  y = row(doc, y, 'Storstädning (kvartalsstädning) — maj 2026', '1', 'st', 8500, 8500);
  y = row(doc, y, 'Fönsterputsning (insida+utsida) — maj 2026', '1', 'st', 3200, 3200);
  totals(doc, y + 10, [26400, 8500, 3200]);
}));

// 41. Bevakningsbolag — out of scope
invoices.push(invoice('bevakning-outofscope.pdf', (doc) => {
  let y = header(doc, 'Securitas AB', '556169-0573', 'P O Box 12307, 102 28 Stockholm', 'SEC-2026-05-SE-1234567', today, due, 'Detaljhandeln Lindberg AB\nHandelsgatan 5, 211 25 Malmö');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Bevakningstjänst ordinarie tid (larmutryckning)', '1', 'mån', 4200, 4200);
  y = row(doc, y, 'Larmsignal & Larmcentral — abonnemang maj', '1', 'mån', 890, 890);
  y = row(doc, y, 'Rondering natt 5 ggr/vecka — maj 2026', '22', 'st', 650, 14300);
  totals(doc, y + 10, [4200, 890, 14300]);
}));

// 42. Tele2 + bredband kombinerad (EDGE: mobil+bredband på samma faktura)
invoices.push(invoice('tele2-mobil-bredband-kombinerad.pdf', (doc) => {
  let y = header(doc, 'Tele2 Sverige AB', '556267-5164', 'Box 62, 164 94 Kista', 'TLE-20260501-KOMB-0044', today, due, 'Fastighetsbolaget Norden AB\nÄlvgatan 4, 652 25 Karlstad');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Tele2 Jobbmobil XL (8 abonnemang) — Maj 2026', '8', 'st', 449, 3592);
  y = row(doc, y, 'Tele2 Molnväxel Business 15 (tilläggstjänst)', '1', 'mån', 1490, 1490);
  y = row(doc, y, 'Tele2 Bredband Fiber 1000/1000 Mbit/s — Maj', '1', 'mån', 799, 799);
  y = row(doc, y, 'Statisk IP-adress (Tele2 Business) — Maj', '1', 'mån', 149, 149);
  y = row(doc, y, 'Roaming Europa — Datatrafik 5,6 GB', '5.6', 'GB', 29, 162.4);
  totals(doc, y + 10, [3592, 1490, 799, 149, 162.4]);
  note(doc, y + 60, 'Kombinerad faktura: Mobilabonnemang + Molnväxel + Bredband + Statisk IP. Molnväxeln är tilläggstjänst till mobilabonnemanget. Bredband är separat bastjänst.');
}));

// 43. SaaS med startup-kredit (EDGE: startup credit)
invoices.push(invoice('aws-startup-kredit.pdf', (doc) => {
  let y = header(doc, 'Amazon Web Services EMEA SARL', 'LU24682234', '38 Avenue John F. Kennedy, L-1855 Luxembourg', 'AWS-INV-SE-2026-05-00998', today, due, 'AI Startup AB\nKistagången 20, 164 40 Kista');
  y = tableHeader(doc, y);
  y = row(doc, y, 'AWS EC2 Computing (p3.2xlarge × 720h) — Maj', '720', 'h', 28.41, 20455.2);
  y = row(doc, y, 'AWS SageMaker — Modellträning 440h GPU', '440', 'h', 14.22, 6256.8);
  y = row(doc, y, 'AWS S3 Intelligent-Tiering — 12,4 TB', '12400', 'GB', 0.025, 310);
  y = row(doc, y, 'AWS Activate Startup Credit (återstår: $8 200)', '1', 'st', -18000, -18000);
  totals(doc, y + 10, [20455.2, 6256.8, 310, -18000]);
  note(doc, y + 60, 'AWS Activate for Startups kredit: $8 200 kvar (ursprungligen $25 000). Kreditförbrukning: $1 730/mån. Kreditperiod upphör 2026-11-30 eller vid nollsaldo.');
}));

// 44. Suddig/oklar faktura (EDGE: review_queue candidate)
invoices.push(invoice('oklar-blandad-faktura.pdf', (doc) => {
  let y = header(doc, 'Diverse Tjänster & IT AB', '559099-1234', 'Blandgatan 3, 123 45 Sundbyberg', 'DTIT-2026-05-0088', today, due, 'Lilla Bolaget AB\nVägen 1, 111 11 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Abonnemang diverse system (se bilaga)', '1', 'mån', 4500, 4500);
  y = row(doc, y, 'Support och underhåll — timmar maj', '12', 'h', 995, 11940);
  y = row(doc, y, 'Licenser (specifikation saknas)', '1', 'st', 2200, 2200);
  totals(doc, y + 10, [4500, 11940, 2200]);
  note(doc, y + 60, 'Bilaga saknas. Kontakta er kundansvarig för detaljspecifikation. Betalningsvillkor: 30 dagar netto.');
}));

// 45-50: Fler mobiloperatörer och nischade leverantörer

// 45. Telenor — molnväxel stor organisation
invoices.push(invoice('telenor-molnvaxel-stor.pdf', (doc) => {
  let y = header(doc, 'Telenor Sverige AB', '556421-0309', 'Isafjordsgatan 10, 164 40 Kista', 'TEL-2026-05-PBXL-0044', today, due, 'Advokatfirman Stenberg & Co AB\nStrandvägen 3A, 114 51 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Telenor Business Smart (45 abonnemang) Maj 2026', '45', 'st', 379, 17055);
  y = row(doc, y, 'Telenor One Talk Molnväxel — 50 användarlicenser', '50', 'lic', 89, 4450);
  y = row(doc, y, 'Telenor One Talk Reception (auto-svarare + IVR)', '1', 'st', 449, 449);
  y = row(doc, y, 'Roaming Europa Zone 1 — Datatrafik 28,4 GB', '28.4', 'GB', 19, 539.6);
  y = row(doc, y, 'Roaming Övriga Världen — Datatrafik 4,1 GB', '4.1', 'GB', 89, 364.9);
  totals(doc, y + 10, [17055, 4450, 449, 539.6, 364.9]);
  note(doc, y + 60, 'Molnväxel One Talk är tilläggstjänst. 50 PBX-licenser för 45 mobilabonnenter + 5 fasta platser. Avtals-ID: B2B-SE-2025-44123.');
}));

// 46. Comviq — kombination data + tal
invoices.push(invoice('comviq-data-tal.pdf', (doc) => {
  let y = header(doc, 'Comviq (Tele2 Sverige AB)', '556267-5164', 'Box 62, 164 94 Kista', 'CVQ-2026-05-009912', today, due, 'Hantverksbolaget AB\nVerkstadsgatan 11, 504 55 Borås');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Comviq Jobbmobil L 30GB (4 st) — Maj 2026', '4', 'st', 199, 796);
  y = row(doc, y, 'Comviq Jobbmobil M 10GB (6 st) — Maj 2026', '6', 'st', 149, 894);
  y = row(doc, y, 'Extra data 5GB tillägg — 2 abonnenter', '2', 'st', 49, 98);
  y = row(doc, y, 'Övertrafik data utland — 0,8 GB Zon 2', '0.8', 'GB', 89, 71.2);
  totals(doc, y + 10, [796, 894, 98, 71.2]);
}));

// 47. Bredband med månadsrabatt nytt avtal
invoices.push(invoice('bredband-nytt-avtal-rabatt.pdf', (doc) => {
  let y = header(doc, 'Telenor Sverige AB', '556421-0309', 'Isafjordsgatan 10, 164 40 Kista', 'TEL-FIB-2026-05-0099', today, due, 'Butiken Svensson AB\nButiksgatan 4, 431 36 Mölndal');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Telenor Bredband Fiber 250/250 Mbit/s — Maj 2026', '1', 'mån', 599, 599);
  y = row(doc, y, 'Välkomstrabatt nyteckning 24 mån (mån 3 av 24)', '1', 'st', -200, -200);
  y = row(doc, y, 'Telenor Managed WiFi (router-tjänst) — Maj 2026', '1', 'mån', 99, 99);
  totals(doc, y + 10, [599, -200, 99]);
  note(doc, y + 60, 'Rabatt 200 kr/mån gäller månader 1-12 av 24 månaders bindningstid. Fr.o.m. månad 13 faktureras ordinarie pris 599 kr/mån.');
}));

// 48. El med solcellsavräkning (EDGE: solar net metering)
invoices.push(invoice('eon-el-solceller.pdf', (doc) => {
  let y = header(doc, 'E.ON Energilösningar AB', '556570-2650', 'Malmöhusvägen 1, 205 09 Malmö', 'EON-2026-05-SOL-0044', today, due, 'Fastighetsutvecklaren Grön AB\nSolvägen 14, 222 40 Lund');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Köpt el Rörligt — April 2026 — 3 200 kWh', '3200', 'kWh', 0.712, 2278.4);
  y = row(doc, y, 'Såld solcellsel — kreditering 1 800 kWh × 0,54', '-1800', 'kWh', 0.54, -972);
  y = row(doc, y, 'Nätabonnemang 3×25A (fast avgift)', '1', 'mån', 545, 545);
  y = row(doc, y, 'Nätöverföring (netto) — 1 400 kWh × 0,194 kr/kWh', '1400', 'kWh', 0.194, 271.6);
  y = row(doc, y, 'Energiskatt (köpt) — 3 200 kWh × 0,428 kr/kWh', '3200', 'kWh', 0.428, 1369.6);
  totals(doc, y + 10, [2278.4, -972, 545, 271.6, 1369.6]);
  note(doc, y + 60, 'Solcellsproduktion krediteras per kWh. Nettomätning april 2026: köpt 3 200 kWh, producerat och sålt 1 800 kWh. Elområde SE4.');
}));

// 49. Mixad IT + frakt (EDGE: truly mixed, probably review_queue)
invoices.push(invoice('mixad-it-frakt.pdf', (doc) => {
  let y = header(doc, 'Allservice Partner AB', '556399-1234', 'Servicegatan 1, 504 34 Borås', 'ALP-2026-05-0044', today, due, 'Grossisten i Borås AB\nIndustrivägen 8, 504 62 Borås');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Molntjänst ERP-system (Microsoft Dynamics 365)', '1', 'mån', 8900, 8900);
  y = row(doc, y, 'Lagerhållning och plockning — maj 2026', '1', 'mån', 12000, 12000);
  y = row(doc, y, 'Frakt inrikes (enligt fraktlista bilaga 3)', '1', 'mån', 6400, 6400);
  y = row(doc, y, 'IT-support och helpdesk — maj 2026', '1', 'mån', 3500, 3500);
  totals(doc, y + 10, [8900, 12000, 6400, 3500]);
  note(doc, y + 60, 'Kombinerad leverantör: IT-system + logistiktjänster. Specifikation per tjänstepost i bilaga 1-4. Kontakta kundansvarig för separata avtal per kategori.');
}));

// 51. Telenor — mobil-PRIMÄR + bredband-SEKUNDÄR (EDGE: mobile-first combined)
// Täcker blindsteget: mobil dominerar kostnaden, bredband är tillägg på fakturan.
// potentialMixedCategories MÅSTE vara true — detta var felet som missades i batch.
invoices.push(invoice('telenor-mobil-bredband-kombinerad.pdf', (doc) => {
  let y = header(doc, 'Telenor Sverige AB', '556421-0309', 'Isafjordsgatan 10, 164 40 Kista', 'TEL-2026-05-KOMB-0078', today, due, 'Kreativa Konsulter IT AB\nBox 101, 111 22 Stockholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Telenor Business Smart (10 abonnemang) Maj 2026', '10', 'st', 349, 3490);
  y = row(doc, y, 'Telenor One Talk Molnväxel — 10 användarlicenser', '10', 'lic', 89, 890);
  y = row(doc, y, 'Telenor Fiber Företag 500/500 Mbit/s — Maj 2026', '1', 'mån', 749, 749);
  y = row(doc, y, 'Statisk IP-adress (Telenor Business) — Maj 2026', '1', 'mån', 149, 149);
  y = row(doc, y, 'Roaming Europa — Datatrafik 3,2 GB (utanför plan)', '3.2', 'GB', 29, 92.8);
  totals(doc, y + 10, [3490, 890, 749, 149, 92.8]);
  note(doc, y + 60, 'Kombinerad faktura: Mobilabonnemang (primär tjänst) + Molnväxel (tillägg) + Bredband Fiber (separat basabonnemang) + Statisk IP. Mobil och bredband är separata avtal med olika löptider.');
}));

// 50. Leasing servicebilar (EDGE: out-of-scope leasing)
invoices.push(invoice('ald-billeasing-outofscope.pdf', (doc) => {
  let y = header(doc, 'ALD Automotive AB', '556052-2003', 'Johanneslundsvägen 3–5, 194 81 Upplands Väsby', 'ALD-2026-05-SE-441123', today, due, 'Servicebolaget Mellansverige AB\nIndustrivägen 4, 641 46 Katrineholm');
  y = tableHeader(doc, y);
  y = row(doc, y, 'Leasing Volvo XC60 B4 AWD (APR-2024-001) — maj', '1', 'mån', 6490, 6490);
  y = row(doc, y, 'Leasing Volvo XC60 B4 AWD (APR-2024-002) — maj', '1', 'mån', 6490, 6490);
  y = row(doc, y, 'Leasing Volvo V90 D5 AWD (OKT-2023-008) — maj', '1', 'mån', 7290, 7290);
  y = row(doc, y, 'Serviceavtal inkl. däck & reparation — 3 fordon', '3', 'st', 890, 2670);
  totals(doc, y + 10, [6490, 6490, 7290, 2670]);
  note(doc, y + 60, 'Operationell leasing — ej aktiveras i balansräkning (IFRS 16 kan tillämpas). Avtal: 36 mån. Frikörda km: 20 000/år per fordon.');
}));

// ── Kör allt ──────────────────────────────────────────────────────────────────
console.log(`\n\x1b[1mArvo Flow — Genererar 51 test-fakturor\x1b[0m`);
console.log(`Destination: ${OUT_DIR}\n`);

let done = 0;
for (const p of invoices) {
  await p;
  done++;
  process.stdout.write(`\r  Genererade ${done}/50...`);
}

console.log(`\n\n\x1b[32m✓ Klart — ${done} PDF:er skapade i ${OUT_DIR}\x1b[0m`);
console.log(`\nNästa steg: \x1b[1mnode scripts/batch-import.mjs ${OUT_DIR}\x1b[0m\n`);
