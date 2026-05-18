// api/send-confirmation.mjs
// Skickar bekräftelsemejl till kunden när de godkänt ett leverantörsbyte
// eller en avveckling av dubblad kostnad.
//
// POST { email, result }   — samma result-shape som send-analysis

import { Resend } from 'resend';

const FROM = process.env.RESEND_FROM ?? 'Arvo Flow <analys@arvo-flow.se>';

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
  warning:   '#A8761A',
  warnSoft:  '#F3E5C7',
  warnBdr:   '#D4A940',
};

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
  el:                'Elavtal',
  mobil:             'Mobilabonnemang',
  bredband:          'Företagsbredband',
  'mjukvara-saas':   'Programvarulicenser / SaaS',
  skrivarleasing:    'Skrivare & Managed Print',
  kortterminal:      'Betaltjänster',
  'faktura-tjanst':  'Fakturatjänst / Affärssystem',
  loneadmin:         'Löneadministration',
  'larm-bevakning':  'Larm & Bevakning',
  foretagshalsovard: 'Företagshälsovård',
  bankavgifter:      'Bankavgifter',
  kontorsmaterial:   'Kontorsmaterial',
  'städ-rengöring':  'Städ & Rengöring',
  'transport-frakt': 'Transport & Frakt',
  'it-support':      'IT-drift & Support',
};

function formatKr(n) {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n ?? 0) + ' kr';
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

const LOGO_SVG = `<svg width="28" height="28" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#lg)" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;

function buildHtml({ extracted: ex, categorized: cat, recommendation: r }) {
  const isOptimize   = r.recommendationType === 'optimize';
  const catLabel     = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';
  const suppDisplay  = REAL_PRICE_CATEGORIES.has(cat?.category)
    ? r.suggestedSupplier
    : (CATEGORY_PARTNER_LABEL[cat?.category] ?? 'Arvo-verifierad Partner');

  const saving      = isOptimize ? (r.optimizationSaving ?? 0) : (r.grossSaving ?? 0);
  const arvoFee     = Math.round(saving * 0.20);
  const netSaving   = saving - arvoFee;

  const heroTitle   = isOptimize
    ? 'Avvecklingen är igångsatt.'
    : 'Bytet är igångsatt.';
  const heroSub     = isOptimize
    ? `Vi hjälper er aktivera den inbyggda modulen och avveckla det separata abonnemanget hos ${ex.supplier}. Du behöver inte göra något mer.`
    : `Vi förbereder uppsägning hos ${ex.supplier} och tecknar nytt avtal med ${suppDisplay ?? 'den nya leverantören'}. Du behöver inte göra något mer.`;

  const isRealPrice = REAL_PRICE_CATEGORIES.has(cat?.category);

  const steps = isOptimize ? [
    `Vi kontaktar ${ex.supplier} och initierar avveckling av det separata abonnemanget.`,
    'Du får bekräftelse när abonnemanget är avslutat och modulen är aktiverad.',
    `Arvo skickar besparingsarvodet ${formatKr(arvoFee)} (20&nbsp;%) efter din första period utan den dubbla kostnaden.`,
  ] : isRealPrice ? [
    `Vi skickar uppsägning till ${ex.supplier} och hanterar all kommunikation.`,
    `Vi tecknar nytt avtal med ${suppDisplay} — förväntat aktivt inom 2–4 veckor.`,
    `Arvo skickar besparingsarvodet ${formatKr(arvoFee)} (20&nbsp;%) efter din första faktura från den nya leverantören.`,
  ] : [
    `Vi kartlägger ert nuvarande avtal hos ${ex.supplier}, inklusive uppsägningstid och avtalsvillkor.`,
    `Arvo kontaktar kvalificerade leverantörer inom ${catLabel.toLowerCase()} och presenterar det starkaste budet baserat på er volym. Du väljer sedan om du vill gå vidare.`,
    `Arvo skickar besparingsarvodet ${formatKr(arvoFee)} (20&nbsp;%) efter din första faktura från den nya leverantören.`,
  ];

  const stepsHtml = steps.map((s, i) => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #E8F0EC;vertical-align:top">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:32px;vertical-align:top;padding-top:1px">
            <div style="width:24px;height:24px;border-radius:50%;background:#DCEEEA;color:#0E4F47;font-size:12px;font-weight:700;text-align:center;line-height:24px;font-family:'Inter',Arial,sans-serif">${i + 1}</div>
          </td>
          <td style="padding-left:12px;font-size:13.5px;color:#1F2E2A;line-height:1.6;font-family:'Inter',Arial,sans-serif">${s}</td>
        </tr></table>
      </td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${heroTitle}</title>
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
    <td style="padding:22px 40px;border-bottom:1px solid #D5E2DC;background:#F1F6F3">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="vertical-align:middle">
          ${LOGO_SVG}
          <span style="margin-left:9px;font-family:'Playfair Display',Georgia,serif;font-size:17px;font-weight:600;color:#0E1A17;vertical-align:middle">Arvo</span>
          <em style="font-family:'Playfair Display',Georgia,serif;font-size:17px;font-weight:400;color:#5C6E68;vertical-align:middle"> Flow</em>
        </td>
        <td style="text-align:right;vertical-align:middle">
          <span style="font-size:10px;color:#5C6E68;font-family:'Inter',Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;font-weight:600">${catLabel}</span>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- Hero -->
  <tr>
    <td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:36px 40px 32px">
      <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.18);display:inline-flex;align-items:center;justify-content:center;margin-bottom:18px">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <p style="margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-.3px">${heroTitle}</p>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.82);line-height:1.65;font-family:'Inter',Arial,sans-serif;max-width:460px">${heroSub}</p>
    </td>
  </tr>

  <!-- Saving summary -->
  <tr>
    <td style="padding:28px 40px 4px">
      <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#1B7A6E;text-transform:uppercase;letter-spacing:.12em;font-family:'Inter',Arial,sans-serif">Din besparing</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E8F0EC;border-radius:10px;overflow:hidden">
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid #E8F0EC;color:#5C6E68;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;width:44%;font-family:'Inter',Arial,sans-serif">Nuvarande leverantör</td>
          <td style="padding:14px 18px;border-bottom:1px solid #E8F0EC;color:#1F2E2A;font-size:14px;font-weight:500;font-family:'Inter',Arial,sans-serif">${ex.supplier}</td>
        </tr>
        <tr>
          <td style="padding:14px 18px;border-bottom:1px solid #E8F0EC;color:#5C6E68;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;font-family:'Inter',Arial,sans-serif">Du betalar idag</td>
          <td style="padding:14px 18px;border-bottom:1px solid #E8F0EC;color:#1F2E2A;font-size:14px;font-weight:500;font-family:'Inter',Arial,sans-serif">${formatKr(ex.annualCost)}&thinsp;/&thinsp;år</td>
        </tr>
        <tr style="background:#DCEEEA">
          <td style="padding:15px 18px 15px 21px;color:#0E4F47;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;border-left:3px solid #1B7A6E;font-family:'Inter',Arial,sans-serif">Din nettobesparing</td>
          <td style="padding:15px 18px;color:#1B7A6E;font-size:17px;font-weight:700;font-family:'Playfair Display',Georgia,serif">+${formatKr(netSaving)}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Steps -->
  <tr>
    <td style="padding:28px 40px 8px">
      <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#1B7A6E;text-transform:uppercase;letter-spacing:.12em;font-family:'Inter',Arial,sans-serif">Vad händer nu</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${stepsHtml}
      </table>
    </td>
  </tr>

  <!-- Ångerrätt -->
  <tr>
    <td style="padding:20px 40px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-left:3px solid #D4A940;background:#F3E5C7;border-radius:0 8px 8px 0">
        <tr>
          <td style="padding:16px 20px">
            <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#A8761A;text-transform:uppercase;letter-spacing:.09em;font-family:'Inter',Arial,sans-serif">24 timmars ångerrätt</p>
            <p style="margin:0;font-size:13px;color:#1F2E2A;line-height:1.6;font-family:'Inter',Arial,sans-serif">
              Vi påbörjar ingen uppsägning eller nytt avtal förrän ångerfristen löpt ut.
              Vill du avbryta — svara <strong>"ÅNGRA"</strong> på det här mejlet eller kontakta oss på
              <a href="mailto:hej@arvoflow.se" style="color:#A8761A">hej@arvoflow.se</a>.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Fee note -->
  <tr>
    <td style="padding:4px 40px 32px">
      <p style="margin:0;font-size:12px;color:#5C6E68;line-height:1.6;font-family:'Inter',Arial,sans-serif">
        <strong style="color:#1F2E2A">Besparingsarvode:</strong> ${formatKr(arvoFee)} (20&nbsp;% av ${formatKr(saving)}) —
        faktureras efter din första ${isOptimize ? 'period utan den dubbla kostnaden' : 'faktura från den nya leverantören'}.
        Inga fasta avgifter. Fr.o.m. år 2 tillfaller hela besparingen er.
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="border-top:1px solid #D5E2DC;padding:22px 40px;text-align:center;background:#F1F6F3">
      <div style="margin-bottom:8px">
        ${LOGO_SVG}
        <span style="margin-left:8px;font-family:'Playfair Display',Georgia,serif;font-size:14px;font-weight:600;color:#0E1A17;vertical-align:middle">Arvo</span>
        <em style="font-family:'Playfair Display',Georgia,serif;font-size:14px;font-weight:400;color:#5C6E68;vertical-align:middle"> Flow</em>
      </div>
      <p style="margin:0;font-size:11px;color:#5C6E68;line-height:1.8;font-family:'Inter',Arial,sans-serif">
        <a href="https://arvoflow.se" style="color:#1B7A6E;text-decoration:none">arvoflow.se</a>
        &nbsp;&middot;&nbsp;
        <a href="mailto:hej@arvoflow.se" style="color:#1B7A6E;text-decoration:none">hej@arvoflow.se</a>
      </p>
    </td>
  </tr>

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
    const resend    = new Resend(process.env.RESEND_API_KEY);
    const isOptimize = result.recommendation.recommendationType === 'optimize';
    const supplier   = result.extracted.supplier ?? '';
    const subject    = isOptimize
      ? `Arvo Flow – Vi avvecklar den dubbla kostnaden hos ${supplier}`
      : `Arvo Flow – Vi hanterar ditt leverantörsbyte hos ${supplier}`;

    await resend.emails.send({
      from:    FROM,
      to:      email,
      subject,
      html:    buildHtml(result),
    });

    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[send-confirmation] fel:', err.message);
    return send(res, 500, { error: 'Kunde inte skicka bekräftelsen — försök igen.' });
  }
}
