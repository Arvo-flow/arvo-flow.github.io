// api/auth/gmail-init.mjs
// GET — initierar Google OAuth för Gmail readonly-access.
// Kräver env: GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI
// Vid saknade credentials: redirect med ?oauth_pending=gmail

export default function handler(req, res) {
  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const redirectUri  = process.env.GOOGLE_REDIRECT_URI
    ?? 'https://arvoflow.se/api/auth/gmail-callback';

  if (!clientId) {
    // Concierge MVP: credentials ej konfigurerade ännu — visa pending-state
    const base = req.headers?.referer?.split('?')[0] ?? 'https://arvoflow.se/testa-faktura';
    res.writeHead(302, { Location: `${base}?oauth_pending=gmail` });
    res.end();
    return;
  }

  const email = req.query?.email ?? '';

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  redirectUri,
    response_type: 'code',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    access_type: 'offline',
    prompt:      'consent',
    state:       email,
  });

  res.writeHead(302, {
    Location: `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
  });
  res.end();
}
