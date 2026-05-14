// api/fortnox/callback.mjs
// Handles Fortnox OAuth 2.0 callback: exchanges authorization code for tokens,
// stores them in Postgres, creates a customer profile row, then sets an
// arvo_cid cookie and redirects to /scanning.
//
// Required env vars: FORTNOX_CLIENT_ID, FORTNOX_CLIENT_SECRET
// Optional env var:  FORTNOX_REDIRECT_URI
//
// GET /api/fortnox/callback?code=...&state=<base64url JSON>

import { getDb } from '../../lib/db.js';

function parseState(raw) {
  try {
    return JSON.parse(Buffer.from(raw, 'base64url').toString());
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  if (error) {
    res.statusCode = 302;
    res.setHeader('Location', `/connect?error=${encodeURIComponent(errorDescription ?? error)}`);
    res.end();
    return;
  }

  if (!code) {
    res.statusCode = 302;
    res.setHeader('Location', '/connect?error=no_code');
    res.end();
    return;
  }

  // Decode profile data embedded in state by auth.mjs
  const stateRaw = url.searchParams.get('state') ?? '';
  const { industry, employees } = parseState(stateRaw);

  const clientId = process.env.FORTNOX_CLIENT_ID;
  const clientSecret = process.env.FORTNOX_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({ error: 'FORTNOX_CLIENT_ID eller FORTNOX_CLIENT_SECRET saknas i Vercel' })
    );
    return;
  }

  const redirectUri =
    process.env.FORTNOX_REDIRECT_URI ??
    `https://${req.headers.host}/api/fortnox/callback`;

  let tokens;
  try {
    const response = await fetch('https://apps.fortnox.se/oauth-v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${response.status} ${text}`);
    }
    tokens = await response.json();
  } catch (err) {
    console.error('[fortnox/callback] token exchange failed:', err.message);
    res.statusCode = 302;
    res.setHeader(
      'Location',
      `/connect?error=${encodeURIComponent('Fortnox-anslutning misslyckades — försök igen')}`
    );
    res.end();
    return;
  }

  let customerId = null;
  const db = getDb();
  if (db) {
    try {
      const expiresAt = new Date(Date.now() + (tokens.expires_in ?? 3600) * 1000);

      // Store Fortnox tokens
      const [conn] = await db`
        INSERT INTO fortnox_connections
          (access_token, refresh_token, expires_at, scope)
        VALUES (
          ${tokens.access_token},
          ${tokens.refresh_token ?? null},
          ${expiresAt},
          ${tokens.scope ?? 'supplierinvoice'}
        )
        RETURNING id
      `;

      // Create customer profile linked to this Fortnox connection
      if (industry && employees) {
        const [customer] = await db`
          INSERT INTO customers (industry, employees, fortnox_id)
          VALUES (${industry}, ${Number(employees)}, ${conn.id})
          RETURNING id
        `;
        customerId = customer.id;
      }
    } catch (err) {
      console.error('[fortnox/callback] DB insert failed:', err.message);
    }
  }

  // Set a long-lived cookie so the app knows who this customer is
  if (customerId) {
    res.setHeader(
      'Set-Cookie',
      `arvo_cid=${customerId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`
    );
  }

  res.statusCode = 302;
  res.setHeader('Location', '/scanning');
  res.end();
}
