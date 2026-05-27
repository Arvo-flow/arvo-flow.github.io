// api/health.mjs — Vercel production health check
//
// GET /api/health
// Returnerar 200 OK om deploymentet är levande och alla miljövariabler är satta.
// Returnerar 503 om kritiska miljövariabler saknas.
//
// Används av:
//   - .github/workflows/canary.yml (varje timme)
//   - Manuell curl: curl https://arvoflow.se/api/health

export default function handler(req, res) {
  const REQUIRED_ENV = ['ANTHROPIC_API_KEY'];
  const OPTIONAL_ENV = ['RESEND_API_KEY', 'KV_REST_API_URL', 'KV_REST_API_TOKEN'];

  const missing = REQUIRED_ENV.filter(k => !process.env[k]);

  const checks = {};
  for (const k of REQUIRED_ENV) checks[k] = process.env[k] ? 'present' : 'MISSING';
  for (const k of OPTIONAL_ENV) checks[k] = process.env[k] ? 'present' : 'not_set';

  const ok = missing.length === 0;

  res.setHeader('Cache-Control', 'no-store');
  res.status(ok ? 200 : 503).json({
    ok,
    timestamp: new Date().toISOString(),
    checks,
    ...(missing.length > 0 && { missing }),
  });
}
