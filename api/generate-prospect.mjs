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
import { bucketForSize } from '../agents/recommender/branchindex.js';
import { prospektAnkare } from '../lib/listprisankare.js';
import { PROSPEKT, granskaLagradText } from '../lib/kundmeningar.js';
import { swMonthYear, monthsAgo, MX_LABELS } from '../lib/format.js';
import { fetchBusinessFactsByOrgnr } from '../lib/business-intel.js';

export const config = { maxDuration: 20 };

const resend   = new Resend(process.env.RESEND_API_KEY);
const FROM     = process.env.RESEND_FROM         ?? 'Arvo Intelligence <analys@arvoflow.se>';
const INTERNAL = process.env.ARVO_INTERNAL_EMAIL ?? 'hej@arvoflow.se';
const BASE_URL = process.env.ARVO_BASE_URL ?? 'https://arvoflow.se';


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



/** Ett ankare som en rad i mejlet: produkt, pris per enhet och verifieringsdatum. */
const ankareRad = (a) => `<div class="intel-row"><span class="intel-desc">${a.referensProdukt}</span><span class="intel-val green">${fmt(a.perEnhetAr)} kr ${a.enhet.replace(/^per /, 'per ')} · verifierat ${a.verifierad}</span></div>`;

/**
 * Prospektmejlet (registergranskningen 2026-09-24). Det säger vad vi SER utifrån (DNS, Bolagsverket) och
 * det lägsta verifierade publika listpriset per enhet — aldrig vad bolaget betalar eller kan spara, för
 * det har vi inte sett. Varje mening om vad vi vet och inte vet kommer ur registret (PROSPEKT).
 * Exporterad för renderingssonden och KM-18.
 */
export function buildOutboundEmail({ companyName, industry, employees, ankare = [], prospectUrl, foundedYear, mxPlatform, mxSince, domainRegistered }) {
  const CSS = `
  body { margin:0; padding:0; background:#f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .wrap { max-width:560px; margin:32px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08); }
  .header { background:#080F0D; padding:28px 32px; display:flex; align-items:center; gap:12px; }
  .logo-text { color:#ffffff; font-size:17px; font-weight:700; letter-spacing:0.03em; }
  .tag { background:rgba(29,176,154,0.18); color:#1DB09A; font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; padding:3px 8px; border-radius:4px; margin-left:8px; }
  .body { padding:32px; }
  .eyebrow { font-size:11px; font-weight:600; letter-spacing:0.10em; text-transform:uppercase; color:#1DB09A; margin-bottom:8px; }
  h1 { font-size:22px; font-weight:700; color:#0E1A17; margin:0 0 6px; line-height:1.25; }
  .meta { font-size:13px; color:#6B8A80; margin-bottom:24px; }
  .intro { font-size:15px; color:#1A2E27; line-height:1.70; margin:0 0 20px; }
  .intel-card { background:#F6FAF8; border:1px solid #D8EDE7; border-radius:10px; padding:20px 24px; margin-bottom:20px; }
  .intel-label { font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:#5B8070; margin-bottom:14px; }
  .intel-row { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px; }
  .intel-desc { font-size:13px; color:#3A5248; }
  .intel-val { font-size:14px; font-weight:600; color:#0E1A17; }
  .intel-val.green { color:#1DB09A; }
  .saving-bar { background:#1DB09A; color:#ffffff; border-radius:8px; padding:13px 16px; margin-top:14px; font-size:14px; font-weight:600; text-align:center; letter-spacing:0.01em; }
  .disclaimer { font-size:12px; color:#8AA89E; line-height:1.55; margin-bottom:24px; padding:12px 16px; background:#F8FAF9; border-left:3px solid #D0E8E0; border-radius:4px; }
  .cta-btn { display:block; background:#1DB09A; color:#ffffff; text-align:center; text-decoration:none; padding:16px 24px; border-radius:10px; font-size:15px; font-weight:600; letter-spacing:0.02em; margin-bottom:12px; }
  .footer { padding:20px 32px; border-top:1px solid #E8F0ED; text-align:center; }
  .footer-text { font-size:12px; color:#9AADA8; line-height:1.6; }`;

  const LOGO = `<svg width="22" height="22" viewBox="0 0 100 100" fill="none">
    <defs><linearGradient id="g" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#4ECDC4"/><stop offset="100%" stop-color="#1DB09A"/>
    </linearGradient></defs>
    <path d="M50 5 L12 85 L35 85 L50 55 L65 85 L88 85 Z" fill="url(#g)"/>
  </svg>`;

  const HEADER = `<div class="header">${LOGO}<span class="logo-text">Arvo Intelligence</span><span class="tag">Profil</span></div>`;
  const FOOTER = `<div class="footer"><div class="footer-text">Arvo Intelligence · 1&nbsp;995 kr/mån · Ingen bindningstid<br><a href="https://arvoflow.se" style="color:#1DB09A;text-decoration:none;">arvoflow.se</a></div></div>`;

  const platformLabel = MX_LABELS[mxPlatform] ?? null;
  const mxSinceLabel  = swMonthYear(mxSince);
  const mxMonths      = mxSince ? monthsAgo(mxSince) : null;
  const domRegLabel   = swMonthYear(domainRegistered);
  const idag = new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' });

  const openingPara = platformLabel && mxSince
    ? `Vi gick igenom er publika digitala uppsättning den ${idag}. Er <strong>${platformLabel}</strong>-uppsättning har stått orörd sedan <strong>${mxSinceLabel}</strong> — ${mxMonths} månader.`
    : platformLabel
      ? `Vi gick igenom er publika digitala uppsättning den ${idag}. Ni kör <strong>${platformLabel}</strong>${foundedYear ? ` och grundades ${foundedYear}` : ''}.`
      : `Vi gick igenom det som går att se om ${companyName} utifrån den ${idag}.`;

  return `<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Arvo — ${companyName}</title><style>${CSS}</style></head><body>
<div class="wrap">
  ${HEADER}
  <div class="body">
    <div class="eyebrow">Det vi ser utifrån</div>
    <h1>${companyName}</h1>
    <div class="meta">${industry} &nbsp;·&nbsp; ${employees} anställda${foundedYear ? ` &nbsp;·&nbsp; Grundat ${foundedYear}` : ''}</div>

    <p class="intro">${openingPara}</p>

    ${platformLabel || domRegLabel ? `<div class="intel-card">
      <div class="intel-label">Vad vi redan ser</div>
      ${platformLabel ? `<div class="intel-row"><span class="intel-desc">E-postplattform</span><span class="intel-val">${platformLabel}</span></div>` : ''}
      ${mxSince ? `<div class="intel-row"><span class="intel-desc">Uppsättningen orörd sedan</span><span class="intel-val green">${mxSinceLabel} (${mxMonths} mån)</span></div>` : ''}
      ${domRegLabel ? `<div class="intel-row"><span class="intel-desc">Domän registrerad</span><span class="intel-val">${domRegLabel}</span></div>` : ''}
    </div>` : ''}

    ${ankare.length ? `<div class="intel-card">
      <div class="intel-label">${PROSPEKT.ankareRubrik}</div>
      ${ankare.map(ankareRad).join('\n      ')}
    </div>` : ''}

    <div class="disclaimer">${PROSPEKT.ingenKostnad}${ankare.some((a) => a.kraverBekraftadNiva) ? ` ${PROSPEKT.nivaOkand}` : ''}</div>

    <a href="${prospectUrl}" class="cta-btn">${PROSPEKT.cta} →</a>
  </div>
  ${FOOTER}
</div></body></html>`;
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
    createdBy  = 'admin',
    sendEmail  = false,
    foundedYear,
    mxPlatform,
    frozenScore,
    mxSince,
    domainRegistered,
    findings,
  } = req.body ?? {};

  if (!companyName) return send(res, 400, { error: 'companyName required' });
  let employees = parseInt(rawEmployees, 10);
  if (!employees || employees < 1) return send(res, 400, { error: 'employees required (integer ≥ 1)' });

  // AFFÄRSHJÄRNAN via ORGNR (2026-07-02): exakt, människoverifierad nyckel → bolagets offentliga
  // bokslut. Hämtas FÖRE estimaten så att Bolagsverkets anställda-siffra (färskast, auktoritativ)
  // blir EN sanning för hela dossiern — hero, estimat och bokslutsrad kan aldrig säga olika tal
  // (grundargranskning 2026-07-02: CSV sa 50, bokslutet 54 på samma sida). Fail-open: utan träff
  // byggs dossiern som förr på CSV-siffran.
  let business = null;
  if (orgNr) {
    business = await fetchBusinessFactsByOrgnr(orgNr).catch(() => null);
    if (business?.employees > 0) employees = business.employees;
  }

  // Resolve industry profile
  let profile = { label: rawIndustryLabel, segment: rawSegment, confidence: 1.0 };
  if (sniCode && !rawSegment) {
    const mapped = mapSni(sniCode);
    profile = { label: rawIndustryLabel ?? mapped.label, segment: mapped.segment, confidence: mapped.confidence };
  }
  if (!profile.segment) profile.segment = 'byraer';
  if (!profile.label)   profile.label   = 'Övrig verksamhet';

  const sizeBucket = bucketForSize(employees);

  // Profilen lagras i kolumnen `estimates` (namnet är historiskt). Den bär bara det som är avläst:
  // Bolagsverket, DNS-fynden och — räknat vid läsning i api/prospect — listprisankaret. Ingen
  // kostnad och ingen besparing: den gamla estimatorn gissade båda (lib/listprisankare.js).
  const estimates = {};

  if (business) estimates.business = business;

  // Attach frozen intelligence metadata if provided
  if (foundedYear)      estimates.foundedYear      = parseInt(foundedYear, 10);
  if (mxPlatform)       estimates.mxPlatform        = mxPlatform;
  if (frozenScore)      estimates.frozenScore       = parseInt(frozenScore, 10);
  if (mxSince)          estimates.mxSince           = mxSince;
  if (domainRegistered) estimates.domainRegistered  = domainRegistered;
  // Fynden är text ur fynd-motorn (scripts/score-leads). De granskas mot registret innan de lagras.
  if (Array.isArray(findings) && findings.length) {
    const rena = findings.filter((f) => granskaLagradText(f).ren);
    if (rena.length) estimates.findings = rena;
  }

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
      ankare: prospektAnkare({ mxPlatform }),
      prospectUrl,
      foundedYear,
      mxPlatform,
      mxSince,
      domainRegistered,
    });

    // Här stod «Vi har tittat på er telekomkostnad» och «Arvo har analyserat er kostnadsprofil» —
    // vi har sett varken kostnad eller profil, bara det som syns utifrån.
    const subject = `Det vi ser utifrån — ${companyName}`;

    const { error } = await resend.emails.send({
      from:    FROM,
      to:      contactEmail,
      subject,
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
