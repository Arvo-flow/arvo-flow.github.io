// api/founding-member.mjs
// Tar emot Founding Member-anmälningar, skickar:
//   1. Bekräftelsemejl till anmälaren (via Resend)
//   2. Intern notis till teamet
//
// Miljövariabler:
//   RESEND_API_KEY        — hämtas från resend.com (samma nyckel som send-analysis.mjs)
//   RESEND_FROM           — valfri, default: "Arvo Flow <hej@arvoflow.se>"
//   FOUNDING_NOTIFY_EMAIL — valfri, default: "hej@arvoflow.se"

import { Resend } from 'resend';

const FROM   = process.env.RESEND_FROM            ?? 'Arvo Flow <hej@arvoflow.se>';
const NOTIFY = process.env.FOUNDING_NOTIFY_EMAIL  ?? 'hej@arvoflow.se';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const T = {
  bg:        '#F1F6F3',
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
};

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

const LOGO_SVG = `<svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5DD6CA"/><stop offset="100%" stop-color="#1B6E66"/></linearGradient></defs><path fill="url(#lg)" fill-rule="evenodd" d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"/></svg>`;

const CHECK_SVG = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="${T.brandSoft}"/><polyline points="11,21 18,28 30,14" stroke="${T.brand}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

const BENEFITS = [
  'Personlig onboarding direkt med grundarna — 30 min Teams',
  'Tjänsten helt gratis de första 6 månaderna — ingen success-fee, inga avgifter',
  'Du röstar på vilka kategorier vi öppnar nästa kvartal',
  'Garanterad förtur till försäkringsbyten när FI-licensen är klar',
];

function confirmationHtml(company, name) {
  const benefitRows = BENEFITS.map(
    (b) =>
      `<tr><td style="padding:6px 0;vertical-align:top;width:22px">
        <span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:${T.brandSoft};text-align:center;line-height:18px;font-size:10px;color:${T.brand};font-weight:700;font-family:Arial,sans-serif">✓</span>
      </td><td style="padding:6px 0 6px 10px;font-size:13.5px;color:${T.inkSoft};line-height:1.55;font-family:'Inter',Arial,sans-serif">${b}</td></tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Din plats är reserverad — Arvo Flow</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <style>:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}@media(prefers-color-scheme:dark){:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}}</style>
</head>
<body style="margin:0;padding:0;background:${T.bg};-webkit-font-smoothing:antialiased;color-scheme:light">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${T.bg};padding:40px 16px;color-scheme:light">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:${T.surface};border-radius:16px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 2px 16px rgba(14,26,23,0.07)">

  <!-- Logo header -->
  <tr>
    <td style="padding:24px 40px;border-bottom:1px solid ${T.border};background:${T.bg}">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td style="vertical-align:middle">
          ${LOGO_SVG}
          <span style="margin-left:9px;font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:600;color:${T.ink};vertical-align:middle">Arvo</span>
          <em style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:400;color:${T.mutedSoft};vertical-align:middle"> Flow</em>
        </td>
        <td style="text-align:right;vertical-align:middle">
          <span style="font-size:10px;color:${T.mutedSoft};font-family:'Inter',Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;font-weight:600">Founding Member</span>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- Hero -->
  <tr>
    <td style="background:linear-gradient(135deg,${T.gradTop} 0%,${T.gradBot} 100%);padding:40px 40px 36px;text-align:center">
      <div style="margin-bottom:16px">${CHECK_SVG}</div>
      <p style="margin:0 0 10px;font-size:9px;font-weight:700;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:.18em;font-family:'Inter',Arial,sans-serif">Din plats är reserverad</p>
      <p style="margin:0;font-size:30px;font-weight:700;color:#ffffff;line-height:1.2;letter-spacing:-.5px;font-family:'Playfair Display',Georgia,serif">Välkommen, ${name}.</p>
      <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.80);line-height:1.6;font-family:'Inter',Arial,sans-serif">
        Vi hör av oss inom 48 timmar för att boka er onboarding.
      </p>
    </td>
  </tr>

  <!-- What happens next -->
  <tr>
    <td style="padding:32px 40px 8px">
      <p style="margin:0 0 6px;font-size:9px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.14em;font-family:'Inter',Arial,sans-serif">Vad händer härnäst?</p>
      <p style="margin:0;font-size:14px;color:${T.inkSoft};line-height:1.75;font-family:'Inter',Arial,sans-serif">
        En av grundarna hör av sig till <strong>${company}</strong> inom 48 timmar för att boka en 30-minuters onboarding via Teams. Under det samtalet hjälper vi er komma igång och förklarar hur analysen fungerar.
      </p>
    </td>
  </tr>

  <!-- Benefits -->
  <tr>
    <td style="padding:20px 40px 32px">
      <p style="margin:0 0 14px;font-size:9px;font-weight:700;color:${T.brand};text-transform:uppercase;letter-spacing:.14em;font-family:'Inter',Arial,sans-serif">Det ingår i er Founding Member-plats</p>
      <table cellpadding="0" cellspacing="0" width="100%">
        ${benefitRows}
      </table>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="border-top:1px solid ${T.border};padding:22px 40px;text-align:center;background:${T.bg}">
      <div style="margin-bottom:8px">
        ${LOGO_SVG}
        <span style="margin-left:8px;font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:600;color:${T.ink};vertical-align:middle">Arvo</span>
        <em style="font-family:'Playfair Display',Georgia,serif;font-size:15px;font-weight:400;color:${T.mutedSoft};vertical-align:middle"> Flow</em>
      </div>
      <p style="margin:0;font-size:11px;color:${T.mutedSoft};font-family:'Inter',Arial,sans-serif">
        <a href="https://arvoflow.se" style="color:${T.brand};text-decoration:none">arvoflow.se</a>
        &nbsp;&middot;&nbsp; Vi kontaktar dig enbart om Founding Member-platsen. Inga nyhetsbrev utan ditt godkännande.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

function notifyHtml(company, name, email, referrer, timestamp) {
  return `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><title>Ny Founding Member</title><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><style>:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}@media(prefers-color-scheme:dark){:root{color-scheme:light!important}html,body{background-color:#EEF4F1!important;color:#0E1A17!important}}</style></head>
<body style="margin:0;padding:32px 16px;background:#F1F6F3;font-family:Arial,sans-serif;color-scheme:light">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:560px;border:1px solid #D5E2DC">
  <tr><td style="padding:20px 32px;background:#0E4F47">
    <span style="font-size:15px;font-weight:700;color:#fff">Ny Founding Member-anmälan</span>
  </td></tr>
  <tr><td style="padding:24px 32px">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="padding:8px 0;font-size:12px;color:#5C6E68;text-transform:uppercase;letter-spacing:.06em;width:140px">Företag</td><td style="padding:8px 0;font-size:14px;color:#0E1A17;font-weight:600">${company}</td></tr>
      <tr><td style="padding:8px 0;font-size:12px;color:#5C6E68;text-transform:uppercase;letter-spacing:.06em">Namn</td><td style="padding:8px 0;font-size:14px;color:#0E1A17">${name}</td></tr>
      <tr><td style="padding:8px 0;font-size:12px;color:#5C6E68;text-transform:uppercase;letter-spacing:.06em">E-post</td><td style="padding:8px 0;font-size:14px;color:#1B7A6E"><a href="mailto:${email}" style="color:#1B7A6E">${email}</a></td></tr>
      <tr><td style="padding:8px 0;font-size:12px;color:#5C6E68;text-transform:uppercase;letter-spacing:.06em">Referrer</td><td style="padding:8px 0;font-size:13px;color:#5C6E68">${referrer || '—'}</td></tr>
      <tr><td style="padding:8px 0;font-size:12px;color:#5C6E68;text-transform:uppercase;letter-spacing:.06em">Tidpunkt</td><td style="padding:8px 0;font-size:13px;color:#5C6E68">${timestamp}</td></tr>
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

  const { company, name, email, referrer, timestamp } = body;

  if (!company?.trim() || !name?.trim()) {
    return send(res, 400, { error: 'Företagsnamn och namn krävs' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return send(res, 400, { error: 'Ogiltig e-postadress' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await Promise.all([
      resend.emails.send({
        from:    FROM,
        to:      email,
        subject: `Din Founding Member-plats är reserverad — Arvo Flow`,
        html:    confirmationHtml(company.trim(), name.trim()),
      }),
      resend.emails.send({
        from:    FROM,
        to:      NOTIFY,
        subject: `Ny Founding Member: ${company.trim()} (${name.trim()})`,
        html:    notifyHtml(company.trim(), name.trim(), email, referrer, timestamp),
      }),
    ]);

    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[founding-member] fel:', err.message);
    return send(res, 500, { error: 'Kunde inte skicka bekräftelse — försök igen.' });
  }
}
