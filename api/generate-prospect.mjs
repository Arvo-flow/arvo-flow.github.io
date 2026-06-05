// api/generate-prospect.mjs
// POST — Admin endpoint. Creates an outbound prospect briefing token.
// Protected: requires x-arvo-admin header matching ARVO_ADMIN_SECRET.
//
// Body: { orgNr?, companyName, sniCode?, industryLabel?, segment?, employees,
//         contactEmail?, createdBy?, sendEmail? }
//
// Returns: { ok, token, url, prospect }

import crypto from 'crypto';
import { Resend } from 'resend';
import { getDb } from '../lib/db.js';
import { mapSni } from '../lib/sni-mapper.js';
import { estimateForProfile, bucketForSize } from '../lib/outbound-estimator.js';

export const config = { maxDuration: 20 };

const resend   = new Resend(process.env.RESEND_API_KEY);
const FROM     = process.env.RESEND_FROM         ?? 'Arvo Intelligence <analys@arvo-flow.se>';
const INTERNAL = process.env.ARVO_INTERNAL_EMAIL ?? 'hej@arvo-flow.se';
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://arvoflow.se';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function fmt(n) {
  if (!n && n !== 0) return '–';
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
}

function buildOutboundEmail({ companyName, industry, employees, estimates, prospectUrl }) {
  const cat = estimates.categories[0];
  const hasSaving = estimates.hasEstimates && cat;

  const savingRange = hasSaving
    ? `${fmt(estimates.totalSavingLow)}–${fmt(estimates.totalSavingHigh)} kr/år`
    : null;

  return `<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Arvo Kostnadsbedömning — ${companyName}</title>
<style>
  body { margin:0; padding:0; background:#f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .wrap { max-width:560px; margin:32px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08); }
  .header { background:#080F0D; padding:28px 32px; display:flex; align-items:center; gap:12px; }
  .logo-text { color:#ffffff; font-size:17px; font-weight:700; letter-spacing:0.03em; }
  .tag { background:rgba(29,176,154,0.18); color:#1DB09A; font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:3px 8px; border-radius:4px; margin-left:8px; }
  .body { padding:32px; }
  .eyebrow { font-size:11px; font-weight:600; letter-spacing:0.10em; text-transform:uppercase; color:#1DB09A; margin-bottom:8px; }
  h1 { font-size:22px; font-weight:700; color:#0E1A17; margin:0 0 6px; line-height:1.25; }
  .meta { font-size:13px; color:#6B8A80; margin-bottom:24px; }
  .intro { font-size:15px; color:#1A2E27; line-height:1.65; margin-bottom:28px; }
  .estimate-card { background:#F6FAF8; border:1px solid #D8EDE7; border-radius:10px; padding:20px 24px; margin-bottom:16px; }
  .estimate-label { font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#5B8070; margin-bottom:12px; }
  .estimate-row { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; }
  .estimate-desc { font-size:13px; color:#3A5248; }
  .estimate-val { font-size:14px; font-weight:600; color:#0E1A17; }
  .estimate-arvo { color:#1DB09A; }
  .saving-highlight { background:#1DB09A; color:#ffffff; border-radius:8px; padding:12px 16px; margin-top:12px; font-size:13px; font-weight:600; text-align:center; }
  .disclaimer { font-size:12px; color:#8AA89E; line-height:1.5; margin-bottom:24px; padding:12px 16px; background:#F8FAF9; border-left:3px solid #D0E8E0; border-radius:4px; }
  .cta-btn { display:block; background:#1DB09A; color:#ffffff; text-align:center; text-decoration:none; padding:16px 24px; border-radius:10px; font-size:15px; font-weight:600; letter-spacing:0.02em; margin-bottom:12px; }
  .footer { padding:20px 32px; border-top:1px solid #E8F0ED; text-align:center; }
  .footer-text { font-size:12px; color:#9AADA8; line-height:1.6; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
      <defs><linearGradient id="g" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#4ECDC4"/><stop offset="100%" stop-color="#1DB09A"/>
      </linearGradient></defs>
      <path d="M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z" fill="url(#g)"/>
    </svg>
    <span class="logo-text">Arvo Intelligence</span>
    <span class="tag">Kostnadsbedömning</span>
  </div>
  <div class="body">
    <div class="eyebrow">Konfidentiell analys</div>
    <h1>${companyName}</h1>
    <div class="meta">${industry} &nbsp;·&nbsp; ${employees} anställda</div>

    <p class="intro">
      Arvo har analyserat kostnadsprofilen för bolag i er bransch med ${employees}&nbsp;anställda.
      ${savingRange
        ? `Vår analys identifierar en potentiell besparing på <strong>${savingRange}</strong> — baserat på verifierade marknadspriser.`
        : 'Vår analys identifierar besparingspotential i er kostnadsprofil.'}
    </p>

    ${hasSaving ? `
    <div class="estimate-card">
      <div class="estimate-label">${cat.label}</div>
      <div class="estimate-row">
        <span class="estimate-desc">Typisk marknadskostnad</span>
        <span class="estimate-val">${fmt(cat.typicalLow)}–${fmt(cat.typicalHigh)} kr/år</span>
      </div>
      <div class="estimate-row">
        <span class="estimate-desc">Arvo-priset (verifierat listpris)</span>
        <span class="estimate-val estimate-arvo">${fmt(cat.arvoAnnual)} kr/år</span>
      </div>
      <div class="saving-highlight">
        Potentiell besparing: upp till ${fmt(cat.savingHigh)} kr/år
      </div>
    </div>
    ` : ''}

    <div class="disclaimer">
      Dessa siffror är uppskattningar baserade på branschdata och verifierade listpriser.
      Exakt analys kräver er faktura — ladda upp den på 2 minuter för att se vad ni faktiskt betalar.
    </div>

    <a href="${prospectUrl}" class="cta-btn">Se er fullständiga kostnadsbedömning →</a>
  </div>
  <div class="footer">
    <div class="footer-text">
      Arvo Intelligence · 1&nbsp;995 kr/mån · Ingen bindningstid<br>
      <a href="https://arvoflow.se" style="color:#1DB09A;text-decoration:none;">arvoflow.se</a>
    </div>
  </div>
</div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method not allowed' });

  // Admin auth
  // Accept either ARVO_ADMIN_SECRET (curl/batch) or ADMIN_TOKEN (admin UI)
  const secret = process.env.ARVO_ADMIN_SECRET ?? process.env.ADMIN_TOKEN;
  const provided = req.headers['x-arvo-admin'] ?? req.headers['x-admin-token'];
  if (secret && provided !== secret) {
    return send(res, 401, { error: 'unauthorized' });
  }

  const {
    orgNr,
    companyName,
    sniCode,
    industryLabel: rawIndustryLabel,
    segment: rawSegment,
    employees: rawEmployees,
    contactEmail,
    createdBy = 'admin',
    sendEmail = false,
  } = req.body ?? {};

  if (!companyName) return send(res, 400, { error: 'companyName required' });
  const employees = parseInt(rawEmployees, 10);
  if (!employees || employees < 1) return send(res, 400, { error: 'employees required (integer ≥ 1)' });

  // Resolve industry profile
  let profile = { label: rawIndustryLabel, segment: rawSegment, confidence: 1.0 };
  if (sniCode && !rawSegment) {
    const mapped = mapSni(sniCode);
    profile = { label: rawIndustryLabel ?? mapped.label, segment: mapped.segment, confidence: mapped.confidence };
  }
  if (!profile.segment) profile.segment = 'byraer';
  if (!profile.label)   profile.label   = 'Övrig verksamhet';

  const sizeBucket = bucketForSize(employees);

  // Generate estimates
  const estimates = estimateForProfile({ segment: profile.segment, sizeBucket, employees });

  // Create token
  const token = crypto.randomBytes(18).toString('base64url');
  const prospectUrl = `${BASE_URL}/prospect/${token}`;

  // Persist to DB
  const db = getDb();
  if (db) {
    await db`
      INSERT INTO outbound_prospects
        (token, org_nr, company_name, industry, segment, size_bucket,
         employees, contact_email, estimates, created_by)
      VALUES
        (${token}, ${orgNr ?? null}, ${companyName}, ${profile.label},
         ${profile.segment}, ${sizeBucket}, ${employees},
         ${contactEmail ?? null}, ${JSON.stringify(estimates)}, ${createdBy})
    `;
  }

  // Send email if requested and contact email provided
  let emailSent = false;
  if (sendEmail && contactEmail && resend) {
    const html = buildOutboundEmail({
      companyName,
      industry:    profile.label,
      employees,
      estimates,
      prospectUrl,
    });

    const { error } = await resend.emails.send({
      from:    FROM,
      to:      contactEmail,
      subject: `Arvo har analyserat er kostnadsprofil — ${companyName}`,
      html,
    });

    if (!error) {
      emailSent = true;
      if (db) {
        await db`
          UPDATE outbound_prospects
          SET email_sent_at = now()
          WHERE token = ${token}
        `;
      }

      // Internal alert
      await resend.emails.send({
        from:    FROM,
        to:      INTERNAL,
        subject: `[Arvo] Prospect-mail skickat till ${companyName}`,
        text:    `${companyName} (${contactEmail})\nIndustri: ${profile.label} | Segment: ${profile.segment} | Bucket: ${sizeBucket} | Anst: ${employees}\nToken: ${token}\nURL: ${prospectUrl}\nEstimates: ${JSON.stringify(estimates, null, 2)}`,
      }).catch(() => {});
    }
  }

  send(res, 200, {
    ok: true,
    token,
    url:    prospectUrl,
    emailSent,
    prospect: {
      companyName,
      industry:  profile.label,
      segment:   profile.segment,
      sizeBucket,
      employees,
      estimates,
    },
  });
}
