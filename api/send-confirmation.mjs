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

function logo(size, id) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#${id})" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;
}

function buildHtml({ extracted: ex, categorized: cat, recommendation: r }) {
  const isOptimize  = r.recommendationType === 'optimize';
  const catLabel    = CATEGORY_LABELS[cat?.category] ?? cat?.category ?? '';
  const isRealPrice = REAL_PRICE_CATEGORIES.has(cat?.category);
  const suppDisplay = isRealPrice
    ? r.suggestedSupplier
    : (CATEGORY_PARTNER_LABEL[cat?.category] ?? 'Arvo-verifierad Partner');

  const saving    = isOptimize ? (r.optimizationSaving ?? 0) : (r.grossSaving ?? 0);
  const arvoFee   = Math.round(saving * 0.20);
  const netSaving = saving - arvoFee;

  const heroTitle = isOptimize ? 'Avvecklingen är igångsatt.' : 'Bytet är igångsatt.';
  const heroSub   = isOptimize
    ? `Vi hjälper er aktivera den inbyggda modulen och avveckla det separata abonnemanget hos ${ex.supplier}. Du behöver inte göra något mer.`
    : `Vi förbereder uppsägning hos ${ex.supplier} och tecknar nytt avtal med ${suppDisplay ?? 'den nya leverantören'}. Du behöver inte göra något mer.`;

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
      <td style="padding:16px 0;border-top:1px solid #EDF3EF;vertical-align:top">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:36px;vertical-align:top;padding-top:1px">
            <div style="width:26px;height:26px;border-radius:50%;background:#DCEEEA;color:#0E4F47;font-size:12px;font-weight:700;text-align:center;line-height:26px;font-family:'Inter',Arial,sans-serif">${i + 1}</div>
          </td>
          <td style="padding-left:12px;font-size:14px;color:#1F2E2A;line-height:1.7;font-family:'Inter',Arial,sans-serif">${s}</td>
        </tr></table>
      </td>
    </tr>`).join('');

  const T = {
    bg: '#F1F6F3', ink: '#0E1A17', inkSoft: '#1F2E2A', mutedSoft: '#5C6E68',
    brand: '#1B7A6E', brandSoft: '#DCEEEA', brandInk: '#0E4F47',
    warning: '#A8761A', warnSoft: '#F3E5C7', warnBdr: '#D4A940',
  };

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${heroTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <style>:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}@media(prefers-color-scheme:dark){:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}}</style>
</head>
<body style="margin:0;padding:0;background:${T.bg};-webkit-font-smoothing:antialiased;color-scheme:light">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${T.bg};padding:48px 16px;color-scheme:light">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 4px 32px rgba(14,26,23,0.10)">

  <!-- Top accent bar -->
  <tr><td style="height:4px;background:linear-gradient(90deg,#5DD6CA 0%,#1B6E66 100%);font-size:0;line-height:0">&nbsp;</td></tr>

  <!-- Header -->
  <tr>
    <td style="padding:24px 44px;border-bottom:1px solid ${T.bg};background:#FAFCFB">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="vertical-align:middle">
          ${logo(32, 'hlg')}
          <span style="margin-left:9px;font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:600;color:${T.ink};vertical-align:middle">Arvo</span>
          <em style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:400;font-style:italic;color:${T.mutedSoft};vertical-align:middle"> Flow</em>
        </td>
        <td style="text-align:right;vertical-align:middle">
          <span style="display:inline-block;font-size:10px;color:${T.brand};font-family:'Inter',Arial,sans-serif;text-transform:uppercase;letter-spacing:.09em;font-weight:600;background:${T.brandSoft};padding:5px 12px;border-radius:100px">${catLabel}</span>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- Supplier -->
  <tr>
    <td style="padding:32px 44px 28px;border-bottom:1px solid ${T.bg}">
      <p style="margin:0 0 8px;font-size:10px;font-weight:600;color:${T.mutedSoft};letter-spacing:.1em;text-transform:uppercase;font-family:'Inter',Arial,sans-serif">${isOptimize ? 'Optimering' : 'Leverantörsbyte'}</p>
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:30px;font-weight:700;color:${T.ink};letter-spacing:-.5px;line-height:1.2">${ex.supplier}</p>
    </td>
  </tr>

  <!-- Hero -->
  <tr>
    <td style="background:linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%);padding:40px 44px 36px">
      <table cellpadding="0" cellspacing="0"><tr>
        <td style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.18);text-align:center;vertical-align:middle;padding-bottom:18px" valign="middle">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;margin:13px auto 0"><polyline points="20 6 9 17 4 12"/></svg>
        </td>
      </tr></table>
      <p style="margin:0 0 10px;font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-.3px">${heroTitle}</p>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.80);line-height:1.7;font-family:'Inter',Arial,sans-serif;max-width:460px">${heroSub}</p>
    </td>
  </tr>

  <!-- Saving summary -->
  <tr>
    <td style="padding:32px 44px 4px">
      <p style="margin:0 0 14px;font-size:9px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.18em;font-family:'Inter',Arial,sans-serif">Din besparing</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:18px 14px 18px 16px;color:#3F5550;border-top:1px solid ${T.bg};font-size:13px;font-weight:500;width:40%;font-family:'Inter',Arial,sans-serif">Nuvarande leverantör</td>
          <td style="padding:13px 16px 13px 14px;color:${T.inkSoft};font-weight:500;border-top:1px solid ${T.bg};font-size:14px;font-family:'Inter',Arial,sans-serif">${ex.supplier}</td>
        </tr>
        <tr>
          <td style="padding:18px 14px 18px 16px;color:#3F5550;border-top:1px solid ${T.bg};font-size:13px;font-weight:500;width:40%;font-family:'Inter',Arial,sans-serif">Du betalar idag</td>
          <td style="padding:13px 16px 13px 14px;color:${T.inkSoft};font-weight:500;border-top:1px solid ${T.bg};font-size:14px;white-space:nowrap;font-family:'Inter',Arial,sans-serif">${formatKr(ex.annualCost)}/år</td>
        </tr>
        <tr style="background:${T.brandSoft}">
          <td style="padding:16px 16px 16px 19px;color:${T.brandInk};font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.09em;border-top:1px solid #B8D9D1;border-left:3px solid ${T.brand};font-family:'Inter',Arial,sans-serif">Din nettobesparing</td>
          <td style="padding:16px 16px;color:${T.brand};font-size:20px;font-weight:700;border-top:1px solid #B8D9D1;font-family:'Playfair Display',Georgia,serif">+${formatKr(netSaving)}</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Steps -->
  <tr>
    <td style="padding:28px 44px 8px">
      <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.18em;font-family:'Inter',Arial,sans-serif">Vad händer nu</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${stepsHtml}
      </table>
    </td>
  </tr>

  <!-- Ångerrätt -->
  <tr>
    <td style="padding:24px 44px">
      <div style="border-left:3px solid ${T.warnBdr};background:${T.warnSoft};border-radius:0 8px 8px 0;padding:16px 22px">
        <p style="margin:0 0 6px;font-size:9px;font-weight:700;color:${T.warning};text-transform:uppercase;letter-spacing:.1em;font-family:'Inter',Arial,sans-serif">24 timmars ångerrätt</p>
        <p style="margin:0;font-size:13px;color:${T.inkSoft};line-height:1.65;font-family:'Inter',Arial,sans-serif">
          Vi påbörjar ingen uppsägning eller nytt avtal förrän ångerfristen löpt ut.
          Svara <strong>"ÅNGRA"</strong> på det här mejlet eller kontakta
          <a href="mailto:hej@arvoflow.se" style="color:${T.warning}">hej@arvoflow.se</a>.
        </p>
      </div>
    </td>
  </tr>

  <!-- Fee note -->
  <tr>
    <td style="padding:0 44px 40px">
      <p style="margin:0;font-size:12px;color:#8FA8A0;line-height:1.65;font-family:'Inter',Arial,sans-serif">
        <strong style="color:${T.inkSoft}">Besparingsarvode:</strong> ${formatKr(arvoFee)} (20&nbsp;% av ${formatKr(saving)}) —
        faktureras efter din första ${isOptimize ? 'period utan den dubbla kostnaden' : 'faktura från den nya leverantören'}.
        Inga fasta avgifter. Fr.o.m. år&nbsp;2 tillfaller hela besparingen er.
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="border-top:1px solid ${T.bg};padding:28px 44px;text-align:center;background:#FAFCFB">
      <div style="margin-bottom:10px">
        ${logo(22, 'flg')}
        <span style="margin-left:7px;font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:600;color:${T.ink};vertical-align:middle">Arvo</span>
        <em style="font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:400;font-style:italic;color:${T.mutedSoft};vertical-align:middle"> Flow</em>
      </div>
      <p style="margin:0 0 5px;font-size:11px;color:${T.mutedSoft};line-height:1.6;font-family:'Inter',Arial,sans-serif">
        <a href="https://arvoflow.se" style="color:${T.brand};text-decoration:none">arvoflow.se</a>
        &nbsp;&middot;&nbsp;
        <a href="mailto:hej@arvoflow.se" style="color:${T.brand};text-decoration:none">hej@arvoflow.se</a>
      </p>
      <p style="margin:0;font-size:10px;color:#B0C4BE;line-height:1.6;font-family:'Inter',Arial,sans-serif">Besparingsarvode 20 % av identifierad besparing, faktureras en gång. Inga fasta avgifter.</p>
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
