// api/fortnox/auth.mjs
// Redirects the browser to the Fortnox OAuth 2.0 authorization page.
// Required env vars: FORTNOX_CLIENT_ID
// Optional env var:  FORTNOX_REDIRECT_URI (defaults to https://<host>/api/fortnox/callback)
//
// GET /api/fortnox/auth

export default function handler(req, res) {
  const clientId = process.env.FORTNOX_CLIENT_ID;
  if (!clientId) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'FORTNOX_CLIENT_ID saknas — konfigurera env var i Vercel' }));
    return;
  }

  const redirectUri =
    process.env.FORTNOX_REDIRECT_URI ??
    `https://${req.headers.host}/api/fortnox/callback`;

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'supplierinvoice',
    state: crypto.randomUUID(),
    access_type: 'offline',
  });

  res.statusCode = 302;
  res.setHeader('Location', `https://apps.fortnox.se/oauth-v1/auth?${params}`);
  res.end();
}
