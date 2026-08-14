// scripts/skicka-rumslank.mjs — MÄT UTSKICKET, LEVERERA LÄNKEN.
//
// Grundaren fick ingen rumslänk till sin Hotmail efter en bulk-ingest, medan samma flöde nådde
// Gmail 19 minuter tidigare och klickades. Databasen visade att länken SKAPADES i båda fallen
// (magic_tokens, note='inbound-email-reply'), så felet ligger i utskicket eller leveransen.
//
// Vad vi ALDRIG har sett: Resends eget svar. api/inbound-email sväljer det i en catch som bara
// console.error:ar — och Vercel-loggen når vi inte härifrån. Utan svaret kan vi inte skilja
//   (a) Resend vägrade ta emot brevet   från   (b) Resend tog emot men mottagaren tystade det.
// Det är två helt olika fel med två helt olika åtgärder, och att gissa mellan dem vore precis
// det Verifieringsplikten finns för att stoppa.
//
// Skriptet gör därför två saker i ett: mintar en FÄRSK rumslänk och skickar den — och skriver ut
// Resends fullständiga svar. Token loggas ALDRIG (det är en inloggningsuppgift; Actions-loggar
// sparas). Bara id/fel.
//
// Kör i GH Actions med DATABASE_URL + RESEND_API_KEY. Arg 1 = mottagaradress.
import { randomBytes } from 'node:crypto';
import { Resend } from 'resend';
import { getDb } from '../lib/db.js';
import { kravEnv, kravKolumner, aldrigTyst } from '../lib/sondvakt.js';

// Två adresser, medvetet åtskilda: RUMMET tillhör en identitet (den som fakturorna är nycklade
// på), men BREVET måste gå dit posten faktiskt kommer fram. När Hotmail tystar oss ska kunden
// inte bli utelåst från sitt eget rum — länken är giltig oavsett vilken inkorg den anländer i.
const rumFor = process.argv[2];
const till = process.argv[3] || rumFor;
if (!rumFor || !rumFor.includes('@')) { console.error('Ange rumsidentitet som argument 1.'); process.exit(1); }
if (!till.includes('@')) { console.error('Ogiltig mottagaradress (argument 2).'); process.exit(1); }

const BASE = kravEnv('ARVO_BASE_URL', { fallback: 'https://arvoflow.se' });
// ?? faller bara tillbaka på null/undefined. GitHub Actions sätter en SAKNAD hemlighet till en
// TOM STRÄNG, och '' ?? x är ''. Avsändaren blev därför tom och Resend svarade 422 "The domain is
// invalid" — ett fel jag höll på att rapportera som ett fel i vårt Resend-konto. Båda domänerna
// var verifierade hela tiden. || behandlar tomt som saknat, vilket är vad vi menar.
const FROM = kravEnv('RESEND_FROM', { fallback: 'Arvo Intelligence <analys@arvoflow.se>' });
const mask = (e) => { const [l, d] = String(e).split('@'); return `${l.slice(0, 2)}***@${d}`; };

const db = getDb();
if (!db) { console.error('Ingen DATABASE_URL.'); process.exit(1); }

// Färsk länk, 24 h, samma tabell och format som inbound-email och request-magic-link (regel 1).
const token = randomBytes(32).toString('hex');
await db`
  INSERT INTO magic_tokens (token, email, note, expires_at)
  VALUES (${token}, ${rumFor}, ${'manuell-rumslank'}, ${new Date(Date.now() + 24 * 3600 * 1000)})
`;
const lank = `${BASE}/portfolio?magic=${token}`;
console.log(`✓ rumslänk skapad för RUMMET ${mask(rumFor)} → levereras till ${mask(till)} (token loggas aldrig)`);

const resend = new Resend(process.env.RESEND_API_KEY);

// ── FRÅGA RESEND VILKA DOMÄNER SOM FAKTISKT FÅR SKICKA (2026-08-14) ──────────────────────────
// Första körningen fick 422 "The domain is invalid". Det är ett svar om VÅRT konto, inte om
// mottagaren — och det betyder att avsändaradressens domän inte är en verifierad sändardomän.
// Vi slutar gissa vilken den är och frågar API:t. Listan skrivs ut; nycklar aldrig.
const domaner = await resend.domains.list().catch((e) => ({ error: { message: e.message } }));
const lista = domaner?.data?.data ?? domaner?.data ?? [];
console.log('\n── VERIFIERADE SÄNDARDOMÄNER HOS RESEND ──');
if (Array.isArray(lista) && lista.length) {
  for (const d of lista) console.log(`   ${String(d.name).padEnd(28)} status=${d.status}  region=${d.region ?? '—'}`);
} else {
  console.log('   (kunde inte läsas)', JSON.stringify(domaner?.error ?? domaner).slice(0, 200));
}

// Välj avsändare som FAKTISKT får skicka: den konfigurerade om dess domän är verifierad, annars
// den första verifierade. Att skicka från en overifierad domän ger 422 varje gång — och tystnad
// mot kunden, vilket är precis felet vi utreder.
const fromDom = (FROM.match(/@([^>\s]+)/) || [])[1];
const verifierade = (Array.isArray(lista) ? lista : []).filter((d) => d.status === 'verified');
let avsandare = FROM;
if (fromDom && !verifierade.some((d) => d.name === fromDom)) {
  const val = verifierade[0];
  if (!val) { console.error(`\n⛔ Ingen verifierad sändardomän på kontot — inget brev kan skickas.`); process.exit(1); }
  avsandare = `Arvo Intelligence <analys@${val.name}>`;
  console.log(`\n⚠️  ${fromDom} är inte verifierad → skickar i stället från ${val.name}`);
}

const t0 = Date.now();
const svar = await resend.emails.send({
  from: avsandare,
  to: till,
  // Reply-To på en domän som FAKTISKT tar emot post. arvoflow.se saknar MX i apex — ett
  // avsändarnamn som inte kan svara är en klassisk spamsignal, särskilt hos Microsoft.
  replyTo: 'faktura@inbox.arvoflow.se',
  subject: 'Ert rum hos Arvo',
  html: `<!doctype html><html><body style="margin:0;background:#0A100E;padding:28px 16px;font-family:-apple-system,Segoe UI,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0E1613;border:1px solid rgba(93,214,202,.16);border-radius:16px">
        <tr><td style="padding:26px 26px 8px">
          <p style="margin:0;font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#5DD6CA">Ert eget rum</p>
          <p style="margin:12px 0 0;font-family:Georgia,serif;font-size:24px;color:#EAF2EF">Era fakturor ligger inne.</p>
          <p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:rgba(236,244,241,.80)">Länken nedan är personlig och gäller i 24 timmar.</p>
        </td></tr>
        <tr><td style="padding:18px 26px 28px">
          <a href="${lank}" style="display:inline-block;background:#5DD6CA;color:#05231F;font-weight:600;font-size:14px;text-decoration:none;padding:13px 22px;border-radius:10px">Öppna mitt rum →</a>
        </td></tr>
      </table>
    </td></tr></table></body></html>`,
});
const ms = Date.now() - t0;

// HELA svaret skrivs ut. Det är den avläsning vi aldrig gjort — och den som avgör vems fel det är.
console.log(`\n── RESENDS SVAR (${ms} ms) · from=${avsandare} ──`);
console.log(JSON.stringify({ data: svar?.data ?? null, error: svar?.error ?? null }, null, 2));
if (svar?.error) {
  console.log('\n⛔ Resend VÄGRADE brevet — felet är vårt/kontots, inte mottagarens.');
  process.exit(1);
}
console.log('\n✓ Resend tog emot brevet. Kommer det inte fram är det mottagarsidan som tystar det');
console.log('  (skräppost/reputation) — och då är DNS-posturen nästa sak att åtgärda, inte koden.');
