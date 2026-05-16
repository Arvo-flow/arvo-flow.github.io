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
// All text uses pdfkit built-in fonts (Helvetica family) which support WinAnsi
// encoding — covers Swedish a/o/a but NOT Unicode arrows. Use plain ASCII/Latin
// alternatives for special symbols (e.g. "till" instead of the arrow character).

function generatePdf(result) {
  return new Promise((resolve, reject) => {
    const { extracted: ex, categorized: cat, recommendation: r } = result;
    const doc = new PDFDocument({ margin: 0, size: 'A4' });
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const C = {
      dark:     '#0f172a',
      teal:     '#0d9488',
      tealDark: '#0f4c44',
      tealLight:'#5eead4',
      tealMid:  '#99f6e4',
      white:    '#ffffff',
      gray:     '#6b7280',
      grayLight:'#94a3b8',
      body:     '#374151',
      border:   '#e5e7eb',
      altRow:   '#f9fafb',
      greenBg:  '#f0fdf4',
      green:    '#15803d',
      amberBg:  '#fffbeb',
      amberBdr: '#fcd34d',
      amber:    '#92400e',
      amberTxt: '#78350f',
    };

    const PAGE_W = 595.28;
    const PAD    = 48;
    const W      = PAGE_W - PAD * 2;

    // ── 1. Dark header ───────────────────────────────────────────────────────
    const HEADER_H = 88;
    doc.rect(0, 0, PAGE_W, HEADER_H).fill(C.dark);

    // Logo mark: teal rounded square with "A"
    const MX = PAD, MY = 22, MS = 34, MR = 7;
    doc.roundedRect(MX, MY, MS, MS, MR).fill(C.teal);
    doc.fontSize(19).font('Helvetica-Bold').fillColor(C.white)
      .text('A', MX, MY + 7, { width: MS, align: 'center' });

    // Brand wordmark
    const TX = MX + MS + 12;
    doc.fontSize(19).font('Helvetica-Bold').fillColor(C.white).text('Arvo Flow', TX, MY + 2);
    doc.fontSize(10).font('Helvetica').fillColor(C.grayLight).text('Din leverantörsanalys', TX, MY + 24);

    // Supplier + date top-right
    doc.fontSize(9).font('Helvetica').fillColor(C.grayLight)
      .text(ex.date ?? '', 0, MY + 4, { align: 'right', width: PAGE_W - PAD });
    doc.fontSize(10).font('Helvetica-Bold').fillColor(C.white)
      .text(ex.supplier ?? '', 0, MY + 18, { align: 'right', width: PAGE_W - PAD });

    // ── 2. Teal savings block ────────────────────────────────────────────────
    const BLOCK_H = 102;
    const BLOCK_Y = HEADER_H;
    doc.rect(0, BLOCK_Y, PAGE_W, BLOCK_H).fill(C.tealDark);

    doc.fontSize(8).font('Helvetica-Bold').fillColor(C.tealLight)
      .text('DIN NETTOBESPARING', PAD, BLOCK_Y + 14, { characterSpacing: 1.2 });

    doc.fontSize(42).font('Helvetica-Bold').fillColor(C.white)
      .text('+' + formatKr(r.netSaving), PAD, BLOCK_Y + 26);

    const costLine = `${formatKr(ex.annualCost)} till ${formatKr(r.suggestedAnnualCost)} / ar` +
      (r.suggestedSupplier ? ` hos ${r.suggestedSupplier}` : '') +
      `  ·  Arvos arvode ${formatKr(r.arvoFee)} (20 %)`;
    doc.fontSize(10).font('Helvetica').fillColor(C.tealMid)
      .text(costLine, PAD, BLOCK_Y + 76, { width: W });

    // ── 3. Details table ─────────────────────────────────────────────────────
    let y = BLOCK_Y + BLOCK_H + 18;
    const ROW_H = 24;
    const L = PAD, R = PAD + 230;

    const row = (label, value, opts = {}) => {
      if (opts.bg) doc.rect(0, y - 3, PAGE_W, ROW_H).fill(opts.bg);
      doc.fontSize(9.5).font('Helvetica').fillColor(C.gray)
        .text(label, L, y, { width: 220 });
      doc.fontSize(9.5)
        .font(opts.bold ? 'Helvetica-Bold' : 'Helvetica')
        .fillColor(opts.color ?? (opts.bold ? C.teal : C.dark))
        .text(value ?? '–', R, y, { width: W - 230 });
      y += ROW_H;
    };

    row('Nuvarande leverantör', ex.supplier);
    row('Du betalar idag',      formatKr(ex.annualCost) + ' / ar', { bg: C.altRow });
    row('Fakturadatum',         ex.date ?? '–');
    row('Kategori',             CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '–', { bg: C.altRow });
    if (r.suggestedSupplier)
      row('Föreslagen leverantör', r.suggestedSupplier, { bold: true });
    row('Arvo-pris',            formatKr(r.suggestedAnnualCost) + ' / ar', { bold: true, bg: C.altRow });
    row('Bruttobesparing',      formatKr(r.grossSaving));
    row('Arvos arvode (20 %)',  formatKr(r.arvoFee), { bg: C.altRow });

    // Net saving highlight row
    doc.rect(0, y - 3, PAGE_W, ROW_H).fill(C.greenBg);
    doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.green)
      .text('Din nettobesparing', L, y, { width: 220 });
    doc.fontSize(9.5).font('Helvetica-Bold').fillColor(C.green)
      .text('+' + formatKr(r.netSaving), R, y, { width: W - 230 });
    y += ROW_H;

    // License overage
    if (r.licenseOverage > 0) {
      y += 6;
      doc.rect(L, y, W, 40).fill(C.amberBg);
      doc.rect(L, y, 3, 40).fill(C.amberBdr);
      doc.fontSize(8).font('Helvetica-Bold').fillColor(C.amber)
        .text('NOTERING OM LICENSER', L + 10, y + 7);
      doc.fontSize(9).font('Helvetica').fillColor(C.amberTxt)
        .text(
          `${r.licenseOverage} överflödiga licenser — ytterligare ${formatKr(r.overageSavings)} att spara om ni städar bland licenserna.`,
          L + 10, y + 20, { width: W - 16 }
        );
      y += 52;
    }

    // ── 4. Reasoning ─────────────────────────────────────────────────────────
    y += 10;
    doc.moveTo(PAD, y).lineTo(PAGE_W - PAD, y).strokeColor(C.border).lineWidth(0.5).stroke();
    y += 14;

    doc.fontSize(8).font('Helvetica-Bold').fillColor(C.teal)
      .text('VARFÖR VI TROR DU KAN SPARA', PAD, y, { characterSpacing: 0.8 });
    y += 15;
    doc.fontSize(10).font('Helvetica').fillColor(C.body)
      .text(r.reasoning ?? '', PAD, y, { width: W, lineGap: 3 });

    // ── 5. Footer ─────────────────────────────────────────────────────────────
    doc.moveTo(0, 808).lineTo(PAGE_W, 808).strokeColor(C.teal).lineWidth(2).stroke();
    doc.fontSize(8.5).font('Helvetica').fillColor(C.gray)
      .text(
        'Arvo Flow  ·  arvo-flow.se  ·  Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.',
        0, 818, { width: PAGE_W, align: 'center' }
      );

    doc.end();
  });
}

// ── HTML email ─────────────────────────────────────────────────────────────────

function htmlEmail(result) {
  const { extracted: ex, categorized: cat, recommendation: r } = result;
  const categoryLabel = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';

  const licenseBlock = r.licenseOverage > 0
    ? `<tr><td style="padding:0 28px 16px">
        <div style="border-left:3px solid #fbbf24;background:#fffbeb;border-radius:0 6px 6px 0;padding:12px 14px">
          <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#92400e;letter-spacing:.08em;text-transform:uppercase">Notering om licenser</p>
          <p style="margin:0;font-size:13px;color:#78350f;line-height:1.5">
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
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;-webkit-font-smoothing:antialiased">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:36px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.10)">

  <!-- ── Header ── -->
  <tr>
    <td style="background:#0f172a;padding:26px 28px 22px">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:12px;vertical-align:middle">
            <!-- Logo mark: teal rounded square -->
            <div style="width:38px;height:38px;background:#0d9488;border-radius:9px;text-align:center;line-height:38px;font-size:21px;font-weight:800;color:#ffffff;font-family:Arial,sans-serif;display:inline-block">A</div>
          </td>
          <td style="vertical-align:middle">
            <p style="margin:0;font-size:19px;font-weight:700;color:#ffffff;letter-spacing:-.3px">Arvo Flow</p>
            <p style="margin:2px 0 0;font-size:11px;color:#94a3b8;letter-spacing:.02em">Din leverantörsanalys</p>
          </td>
          <td style="text-align:right;vertical-align:middle;padding-left:20px">
            <p style="margin:0;font-size:13px;font-weight:600;color:#ffffff">${ex.supplier}</p>
            <p style="margin:3px 0 0;font-size:11px;color:#64748b">${categoryLabel}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── Savings block ── -->
  <tr>
    <td style="background:#0f4c44;padding:28px 28px 24px">
      <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#5eead4;text-transform:uppercase;letter-spacing:.12em">Din nettobesparing</p>
      <p style="margin:0 0 10px;font-size:46px;font-weight:800;color:#ffffff;line-height:1;letter-spacing:-1px">+${formatKr(r.netSaving)}</p>
      <p style="margin:0;font-size:12.5px;color:#99f6e4;line-height:1.5">
        ${formatKr(ex.annualCost)} &rarr; ${formatKr(r.suggestedAnnualCost)} / år
        ${r.suggestedSupplier ? `hos <strong style="color:#ffffff">${r.suggestedSupplier}</strong>` : ''}
        &nbsp;&middot;&nbsp; Arvos fee ${formatKr(r.arvoFee)} (20&nbsp;%)
      </p>
    </td>
  </tr>

  <!-- ── Price note ── -->
  <tr>
    <td style="padding:14px 28px;background:#f8fafc;border-bottom:1px solid #e2e8f0">
      <p style="margin:0;font-size:11.5px;color:#64748b;line-height:1.55;text-align:center;font-style:italic">
        Detta pris baseras på Arvos samlade databas av förhandlade volymrabatter, vilket ger dig tillgång till prisnivåer som ligger utanför leverantörernas ordinarie listpriser.
      </p>
    </td>
  </tr>

  <!-- ── Details table ── -->
  <tr>
    <td style="padding:20px 28px 4px">
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;border-collapse:collapse">
        <tr>
          <td style="padding:9px 10px;color:#6b7280;border-bottom:1px solid #f1f5f9;width:50%">Nuvarande leverantör</td>
          <td style="padding:9px 10px;color:#111827;font-weight:600;border-bottom:1px solid #f1f5f9">${ex.supplier}</td>
        </tr>
        <tr style="background:#f8fafc">
          <td style="padding:9px 10px;color:#6b7280;border-bottom:1px solid #f1f5f9">Du betalar idag</td>
          <td style="padding:9px 10px;color:#111827;font-weight:600;border-bottom:1px solid #f1f5f9">${formatKr(ex.annualCost)} / år</td>
        </tr>
        ${r.suggestedSupplier ? `<tr>
          <td style="padding:9px 10px;color:#6b7280;border-bottom:1px solid #f1f5f9">Föreslagen leverantör</td>
          <td style="padding:9px 10px;color:#0d9488;font-weight:700;border-bottom:1px solid #f1f5f9">${r.suggestedSupplier}</td>
        </tr>` : ''}
        <tr style="background:#f8fafc">
          <td style="padding:9px 10px;color:#6b7280;border-bottom:1px solid #f1f5f9">Arvo-pris</td>
          <td style="padding:9px 10px;color:#0d9488;font-weight:700;border-bottom:1px solid #f1f5f9">${formatKr(r.suggestedAnnualCost)} / år</td>
        </tr>
        <tr>
          <td style="padding:9px 10px;color:#6b7280;border-bottom:1px solid #f1f5f9">Bruttobesparing</td>
          <td style="padding:9px 10px;color:#111827;font-weight:600;border-bottom:1px solid #f1f5f9">${formatKr(r.grossSaving)}</td>
        </tr>
        <tr style="background:#f8fafc">
          <td style="padding:9px 10px;color:#6b7280;border-bottom:1px solid #f1f5f9">Arvos arvode (20 %)</td>
          <td style="padding:9px 10px;color:#111827;border-bottom:1px solid #f1f5f9">${formatKr(r.arvoFee)}</td>
        </tr>
        <tr style="background:#f0fdf4">
          <td style="padding:10px 10px;color:#15803d;font-weight:700;border-bottom:2px solid #bbf7d0">Din nettobesparing</td>
          <td style="padding:10px 10px;color:#15803d;font-weight:800;border-bottom:2px solid #bbf7d0">+${formatKr(r.netSaving)}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── License overage ── -->
  ${licenseBlock}

  <!-- ── Reasoning ── -->
  <tr>
    <td style="padding:20px 28px 16px">
      <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#0d9488;text-transform:uppercase;letter-spacing:.1em">Varför vi tror du kan spara</p>
      <p style="margin:0;font-size:13px;color:#374151;line-height:1.7">${r.reasoning ?? ''}</p>
    </td>
  </tr>

  <!-- ── CTA ── -->
  <tr>
    <td style="padding:8px 28px 28px;text-align:center">
      <a href="https://arvo-flow.github.io/flow/testa-faktura"
         style="display:inline-block;background:#0d9488;color:#ffffff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:9px;text-decoration:none;letter-spacing:.01em">
        Aktivera bytet &rarr;
      </a>
      <p style="margin:12px 0 0;font-size:11px;color:#94a3b8">Du betalar 20 % av faktiskt realiserad besparing. Inga fasta avgifter.</p>
    </td>
  </tr>

  <!-- ── Footer ── -->
  <tr>
    <td style="background:#0f172a;padding:16px 28px;text-align:center">
      <p style="margin:0;font-size:11px;color:#475569">
        Arvo Flow &nbsp;&middot;&nbsp; arvo-flow.se
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
