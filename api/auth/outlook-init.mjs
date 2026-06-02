// api/auth/outlook-init.mjs
// GET — initierar Microsoft OAuth för Outlook/Exchange readonly-access.
// Kräver env: MICROSOFT_CLIENT_ID, MICROSOFT_TENANT_ID (default: common), MICROSOFT_REDIRECT_URI

export default function handler(req, res) {
  const clientId    = process.env.MICROSOFT_CLIENT_ID;
  const tenantId    = process.env.MICROSOFT_TENANT_ID ?? 'common';
  const redirectUri = process.env.MICROSOFT_REDIRECT_URI
    ?? 'https://arvoflow.se/api/auth/outlook-callback';

  if (!clientId) {
    const base = req.headers?.referer?.split('?')[0] ?? 'https://arvoflow.se/testa-faktura';
    res.writeHead(302, { Location: `${base}?oauth_pending=outlook` });
    res.end();
    return;
  }

  const email = req.query?.email ?? '';

  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  redirectUri,
    response_type: 'code',
    scope: [
      'https://graph.microsoft.com/Mail.Read',
      'https://graph.microsoft.com/User.Read',
      'offline_access',
    ].join(' '),
    response_mode: 'query',
    state:         email,
  });

  res.writeHead(302, {
    Location: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?${params}`,
  });
  res.end();
}
