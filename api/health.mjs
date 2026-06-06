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

export default function handler(req, res) {
  const CRITICAL = [
    'ANTHROPIC_API_KEY',   // AI-pipeline — inget fungerar utan denna
    'DATABASE_URL',        // Neon Postgres — analyser sparas ej, benchmark hämtas ej
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
    'RESEND_FROM',         // Avsändaradress (default: analys@arvo-flow.se)
  ];

  const missing = CRITICAL.filter(k => !process.env[k]);
  const ok      = missing.length === 0;

  const checks = {};
  for (const k of CRITICAL)   checks[k] = process.env[k] ? '✓ present' : '✗ MISSING';
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
