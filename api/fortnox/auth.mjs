// api/fortnox/auth.mjs
// Redirects the browser to the Fortnox OAuth 2.0 authorization page.
// Accepts industry and employees as query params and encodes them in the
// OAuth state so the callback can create the customer profile without
// needing a separate round-trip or sessionStorage.
//
// GET /api/fortnox/auth?industry=byraer&employees=10
// Required env vars: FORTNOX_CLIENT_ID

const ALLOWED_INDUSTRIES = ['byraer', 'hantverkare', 'ehandel', 'tillverkning'];

export default function handler(req, res) {
  const clientId = process.env.FORTNOX_CLIENT_ID;
  if (!clientId) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'FORTNOX_CLIENT_ID saknas — konfigurera env var i Vercel' }));
    return;
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const industry = url.searchParams.get('industry') ?? 'byraer';
  const employees = parseInt(url.searchParams.get('employees') ?? '5', 10);

  if (!ALLOWED_INDUSTRIES.includes(industry)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: `Ogiltig bransch: ${industry}` }));
    return;
  }
  if (!Number.isFinite(employees) || employees < 1 || employees > 5000) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Ogiltigt antal anställda (1–5000)' }));
    return;
  }

  const redirectUri =
    process.env.FORTNOX_REDIRECT_URI ??
    `https://${req.headers.host}/api/fortnox/callback`;

  // Encode profile data + nonce in state so callback can read them without
  // a separate DB lookup or sessionStorage dependency.
  const state = Buffer.from(
    JSON.stringify({ nonce: crypto.randomUUID(), industry, employees })
  ).toString('base64url');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'supplierinvoice',
    state,
    access_type: 'offline',
  });

  res.statusCode = 302;
  res.setHeader('Location', `https://apps.fortnox.se/oauth-v1/auth?${params}`);
  res.end();
}
