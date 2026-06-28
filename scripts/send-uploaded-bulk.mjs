// scripts/send-uploaded-bulk.mjs — skickar de stagade test-fakturorna (test-pdfs/bulk26/) som ETT
// mejl via Resend till test@inbox.arvoflow.se → driver hela den riktiga rälsen (inbound-webhook →
// bulk-kö → drain). Kör i Actions med RESEND_API_KEY. Verifierar 26 in → alla landar, noll failed.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { Resend } from 'resend';

const DIR  = process.env.BULK_DIR || 'test-pdfs/bulk26';
const TO   = process.env.TEST_INBOX || 'test@inbox.arvoflow.se';
const FROM = process.env.RESEND_FROM || 'analys@arvoflow.se';

if (!process.env.RESEND_API_KEY) { console.log('RESEND_API_KEY saknas — avbryter'); process.exit(1); }

const files = readdirSync(DIR).filter((f) => f.toLowerCase().endsWith('.pdf')).sort();
console.log(`Hittade ${files.length} PDF:er i ${DIR}.`);
const attachments = files.map((f) => ({
  filename: f,
  content: readFileSync(path.join(DIR, f)).toString('base64'),
}));

const resend = new Resend(process.env.RESEND_API_KEY);
const r = await resend.emails.send({
  from: FROM, to: TO,
  subject: `Rent testpass: ${attachments.length} fakturor`,
  text: `Automatiskt ${attachments.length}-pass för ingest-verifiering. Förväntat: ${attachments.length} köade, alla landar, noll failed.`,
  attachments,
});
console.log('Resend-svar:', JSON.stringify(r));
console.log(`KLART — ${attachments.length} bilagor skickade ${FROM} → ${TO}. Inbound-webhooken bör nu köa ${attachments.length} jobb.`);
