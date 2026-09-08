// api/health.mjs — Vercel production health check
//
// GET /api/health
// Returnerar 200 OK om alla kritiska env-vars är satta.
// Returnerar 503 om någon CRITICAL-variabel saknas.
//
// Nivåer:
//   critical  → 503 om saknas (produkt fungerar inte)
//   important → visas som "not_set" (degraderad funktion)
//   config    → visas som "not_set" (admin/intern funktion)
//
// Används av:
//   .github/workflows/canary.yml (varje timme) → skapar GH-ärende vid 503
//   Manuell check: curl https://arvoflow.se/api/health | jq

import { dbUrlKalla, DB_URL_ALIAS } from '../lib/db.js';

export default function handler(req, res) {
  // ── HÄLSAN MÄTS PÅ SYSTEMET, INTE PÅ ETT VARIABELNAMN (2026-09-08) ────────────────────────
  // Här stod `'DATABASE_URL'` som en av två CRITICAL-strängar. Men `lib/db.js` godtar FYRA namn,
  // och Vercels egen Postgres-integration sätter `POSTGRES_URL`. Health mätte alltså ett annat
  // objekt än det koden använder — samma felform som fällde prisauditen 18 augusti («är det den
  // artefakt kunden faktiskt ser?»), här på driftövervakningen.
  //
  // Utfallet, mätt: canary.yml pingar den här endpointen varje timme och öppnar ett GH-ärende
  // vid 503. Ärende #79 bär 852 kommentarer sedan 9 juli; #75 bar 386 dessförinnan. Två månader
  // av timvisa «produktion nere» på ett system som lagrade analyser hela tiden. Ett larm som
  // alltid är rött blir ignorerat, och då är det värre än inget larm.
  //
  // Frågan ställs nu till `lib/db.js` (regel 1 — en sanning per fråga). `null` därifrån betyder
  // att INGEN av de godtagna anslutningarna finns, och det är det enda som ska larma.
  const dbKalla = dbUrlKalla();

  const CRITICAL = [
    'ANTHROPIC_API_KEY',   // AI-pipeline — inget fungerar utan denna
  ];

  const IMPORTANT = [
    'RESEND_API_KEY',      // Mail — magic links, briefings, prisvarningar
    'KV_REST_API_URL',     // Vercel KV — benchmark-cache + rate limiting
    'KV_REST_API_TOKEN',   // Vercel KV — krävs tillsammans med URL
  ];

  const CONFIG = [
    'ARVO_ADMIN_SECRET',   // Admin-API (/api/admin/**)
    'CRON_SECRET',         // GH Actions → Vercel cron-autentisering
    'ARVO_BASE_URL',       // Mail-länk-bas (default: arvoflow.se)
    'ARVO_BYPASS_SECRET',  // Bypass rate limit + gate utan IP-whitelist
    'RESEND_FROM',         // Avsändaradress (default: analys@arvoflow.se)
  ];

  // Databasen är kritisk, men mäts som ett TILLSTÅND och inte som ett namn.
  const missing = CRITICAL.filter(k => !process.env[k]);
  if (!dbKalla) missing.push(`databas (inget av ${DB_URL_ALIAS.join(' / ')})`);
  const ok      = missing.length === 0;

  const checks = {};
  for (const k of CRITICAL)   checks[k] = process.env[k] ? '✓ present' : '✗ MISSING';
  // Namnet på källan, aldrig värdet — så att en felkonfiguration går att DIAGNOSTISERA och inte
  // bara larmas om. Utan den raden hade nästa läsare fått gissa vilket av fyra namn som bar.
  checks.databas = dbKalla ? `✓ present (via ${dbKalla})` : '✗ MISSING';
  for (const k of IMPORTANT)  checks[k] = process.env[k] ? '✓ present' : '— not_set';
  for (const k of CONFIG)     checks[k] = process.env[k] ? '✓ present' : '— not_set';

  res.setHeader('Cache-Control', 'no-store');
  res.status(ok ? 200 : 503).json({
    ok,
    timestamp: new Date().toISOString(),
    checks,
    ...(missing.length > 0 && { missing, hint: 'Sätt saknade variabler i Vercel → Settings → Environment Variables' }),
  });
}
