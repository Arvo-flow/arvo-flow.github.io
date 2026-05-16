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

const CATEGORY_LABELS = {
  mobil:            'Mobilabonnemang',
  'mjukvara-saas':  'Programvarulicenser / SaaS',
  skrivarleasing:   'Skrivarleasing / Print',
  el:               'El',
  bredband:         'Bredband',
  kortterminal:     'Betaltjänster',
  'faktura-tjanst': 'Fakturahantering',
  forsakring:       'Försäkring',
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

function generatePdf(result) {
  return new Promise((resolve, reject) => {
    const { extracted: ex, categorized: cat, recommendation: r } = result;
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const teal   = '#0d9488';
    const dark   = '#111827';
    const muted  = '#6b7280';
    const border = '#e5e7eb';
    const W      = 495; // usable width

    // ── Header ────────────────────────────────────────────────────────────
    doc.fontSize(20).font('Helvetica-Bold').fillColor(dark).text('Arvo Flow', 50, 50);
    doc.fontSize(11).font('Helvetica').fillColor(muted).text('Din leverantörsanalys', 50, 76);
    doc.moveTo(50, 96).lineTo(545, 96).strokeColor(border).stroke();

    // ── Main saving ───────────────────────────────────────────────────────
    doc.fontSize(12).font('Helvetica-Bold').fillColor(muted).text('DIN NETTOBESPARING', 50, 112);
    doc.fontSize(38).font('Helvetica-Bold').fillColor(teal).text(`+${formatKr(r.netSaving)}`, 50, 128);
    doc.fontSize(11).font('Helvetica').fillColor(dark)
      .text(`${formatKr(ex.annualCost)} → ${formatKr(r.suggestedAnnualCost)} / år · Arvos arvode ${formatKr(r.arvoFee)} (20 %)`, 50, 175);

    doc.moveTo(50, 198).lineTo(545, 198).strokeColor(border).stroke();

    // ── Details table ─────────────────────────────────────────────────────
    let y = 212;
    const rowH = 22;
    const L = 50, R = 310;

    const row = (label, value, highlight = false) => {
      doc.fontSize(10).font('Helvetica').fillColor(muted).text(label, L, y, { width: 240 });
      doc.fontSize(10)
        .font(highlight ? 'Helvetica-Bold' : 'Helvetica')
        .fillColor(highlight ? teal : dark)
        .text(value, R, y, { width: 235 });
      y += rowH;
    };

    row('Nuvarande leverantör', ex.supplier ?? '–');
    row('Betalar idag',         formatKr(ex.annualCost) + ' / år');
    row('Fakturadatum',         ex.date ?? '–');
    row('Kategori',             CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '–');
    if (r.suggestedSupplier) row('Föreslagen leverantör', r.suggestedSupplier, true);
    row('Arvo-pris',            formatKr(r.suggestedAnnualCost) + ' / år', true);
    row('Bruttobesparing',      formatKr(r.grossSaving));
    row('Arvos arvode (20 %)',  formatKr(r.arvoFee));
    row('Din nettobesparing',   formatKr(r.netSaving), true);

    if (r.licenseOverage > 0) {
      y += 4;
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#d97706')
        .text(
          `${r.licenseOverage} överflödiga licenser — ytterligare ${formatKr(r.overageSavings)} att spara`,
          L, y, { width: W }
        );
      y += rowH;
    }

    // ── Reasoning ─────────────────────────────────────────────────────────
    y += 8;
    doc.moveTo(50, y).lineTo(545, y).strokeColor(border).stroke();
    y += 14;

    doc.fontSize(10).font('Helvetica-Bold').fillColor(teal)
      .text('VARFÖR VI TROR DU KAN SPARA', L, y);
    y += 16;
    doc.fontSize(10).font('Helvetica').fillColor(dark)
      .text(r.reasoning ?? '', L, y, { width: W, lineGap: 3 });

    // ── Footer ─────────────────────────────────────────────────────────────
    doc.fontSize(9).font('Helvetica').fillColor(muted)
      .text(
        'Arvo Flow · arvo-flow.se · Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.',
        50, 790, { width: W, align: 'center' }
      );

    doc.end();
  });
}

function htmlEmail(result) {
  const { extracted: ex, categorized: cat, recommendation: r } = result;
  const categoryLabel = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';

  const licenseRow = r.licenseOverage > 0
    ? `<tr><td colspan="2" style="padding:12px 8px">
        <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:12px 14px">
          <p style="margin:0;font-size:11px;font-weight:700;color:#92400e">NOTERING OM LICENSER</p>
          <p style="margin:6px 0 0;font-size:13px;color:#78350f">
            ${r.licenseOverage} överflödiga licenser — ytterligare ${formatKr(r.overageSavings)} att spara.
          </p>
        </div>
      </td></tr>`
    : '';

  return `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Din Arvo-analys</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="background:#0f172a;padding:24px 32px">
    <p style="margin:0;color:#fff;font-size:20px;font-weight:700;letter-spacing:-.3px">Arvo Flow</p>
    <p style="margin:4px 0 0;color:#94a3b8;font-size:12px">Din leverantörsanalys</p>
  </td></tr>

  <!-- Supplier -->
  <tr><td style="padding:24px 32px 0">
    <p style="margin:0;font-size:18px;font-weight:700;color:#111827">${ex.supplier}</p>
    <p style="margin:4px 0 0;font-size:12px;color:#6b7280">${categoryLabel}</p>
  </td></tr>

  <!-- Saving block -->
  <tr><td style="padding:20px 32px">
    <div style="background:#0f4c44;border-radius:10px;padding:24px 28px">
      <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#5eead4;text-transform:uppercase;letter-spacing:.1em">Din nettobesparing</p>
      <p style="margin:0 0 10px;font-size:42px;font-weight:800;color:#fff;line-height:1">+${formatKr(r.netSaving)}</p>
      <p style="margin:0;font-size:13px;color:#99f6e4">
        ${formatKr(ex.annualCost)} → ${formatKr(r.suggestedAnnualCost)} / år${r.suggestedSupplier ? ` hos <strong>${r.suggestedSupplier}</strong>` : ''}
        &nbsp;·&nbsp;Arvos fee ${formatKr(r.arvoFee)} (20 %)
      </p>
    </div>
  </td></tr>

  <!-- Details -->
  <tr><td style="padding:0 32px">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-top:1px solid #e5e7eb">
      <tr style="border-bottom:1px solid #f3f4f6">
        <td style="padding:10px 8px;color:#6b7280;width:50%">Nuvarande leverantör</td>
        <td style="padding:10px 8px;color:#111827;font-weight:600">${ex.supplier}</td>
      </tr>
      <tr style="background:#f9fafb;border-bottom:1px solid #f3f4f6">
        <td style="padding:10px 8px;color:#6b7280">Du betalar idag</td>
        <td style="padding:10px 8px;color:#111827;font-weight:600">${formatKr(ex.annualCost)} / år</td>
      </tr>
      <tr style="border-bottom:1px solid #f3f4f6">
        <td style="padding:10px 8px;color:#6b7280">Arvo-pris</td>
        <td style="padding:10px 8px;color:#0d9488;font-weight:700">${formatKr(r.suggestedAnnualCost)} / år</td>
      </tr>
      <tr style="background:#f9fafb;border-bottom:1px solid #f3f4f6">
        <td style="padding:10px 8px;color:#6b7280">Bruttobesparing</td>
        <td style="padding:10px 8px;color:#111827;font-weight:600">${formatKr(r.grossSaving)}</td>
      </tr>
      <tr style="border-bottom:1px solid #f3f4f6">
        <td style="padding:10px 8px;color:#6b7280">Arvos arvode (20 %)</td>
        <td style="padding:10px 8px;color:#111827">${formatKr(r.arvoFee)}</td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="padding:10px 8px;color:#15803d;font-weight:700">Din nettobesparing</td>
        <td style="padding:10px 8px;color:#15803d;font-weight:700">+${formatKr(r.netSaving)}</td>
      </tr>
      ${licenseRow}
    </table>
  </td></tr>

  <!-- Reasoning -->
  <tr><td style="padding:20px 32px">
    <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#0d9488;text-transform:uppercase;letter-spacing:.1em">Varför vi tror du kan spara</p>
    <p style="margin:0;font-size:13px;color:#374151;line-height:1.65">${r.reasoning ?? ''}</p>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:8px 32px 28px;text-align:center">
    <a href="https://arvo-flow.github.io/flow/testa-faktura"
       style="display:inline-block;background:#0d9488;color:#fff;font-weight:700;font-size:14px;padding:13px 30px;border-radius:8px;text-decoration:none">
      Aktivera bytet →
    </a>
    <p style="margin:12px 0 0;font-size:11px;color:#9ca3af">Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f9fafb;padding:14px 32px;border-top:1px solid #e5e7eb">
    <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center">
      Arvo Flow · arvo-flow.se
    </p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

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
      ? `Din analys: Spara ${formatKr(netSaving)} / år på ${result.extracted.supplier}`
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
