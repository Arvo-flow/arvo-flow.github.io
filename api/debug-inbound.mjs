// api/debug-inbound.mjs — TEMPORÄR diagnosendpoint för ingest-felsökningen.
// Skyddad av INBOUND_WEBHOOK_SECRET (constant-time). Returnerar ENDAST metadata
// och Resends felkroppar — aldrig bilageinnehåll. TAS BORT när ingest är grön.

import { timingSafeEqual } from 'node:crypto';

export default async function handler(req, res) {
  const url      = new URL(req.url, 'http://x');
  const secret   = process.env.INBOUND_WEBHOOK_SECRET ?? '';
  const provided = url.searchParams.get('secret') ?? '';
  const authed   = secret.length > 0 && provided.length === secret.length &&
    timingSafeEqual(Buffer.from(provided), Buffer.from(secret));
  if (!authed) { res.statusCode = 401; return res.end('unauthorized'); }

  const key = process.env.RESEND_API_KEY;
  const out = { hasKey: !!key, keyPrefix: key ? key.slice(0, 6) : null };

  try {
    const list = await fetch('https://api.resend.com/emails/receiving?limit=3', {
      headers: { Authorization: `Bearer ${key}` },
    });
    out.listStatus = list.status;
    const listText = await list.text();
    out.listBody = listText.slice(0, 900);

    const parsed = JSON.parse(listText);
    const latest = parsed?.data?.[0];
    if (latest?.id) {
      out.latestEmailId = latest.id;
      const att = await fetch(`https://api.resend.com/emails/receiving/${latest.id}/attachments`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      out.attStatus = att.status;
      out.attBody = (await att.text()).slice(0, 900);
    }
  } catch (err) {
    out.error = err.message;
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(out, null, 2));
}
