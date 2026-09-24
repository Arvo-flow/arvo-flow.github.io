#!/usr/bin/env node
// scripts/probe-lokaldelar.mjs — TAR RESEND EMOT GODTYCKLIGA LOKALDELAR PÅ inbox.arvoflow.se? (2026-09-24)
//
// Vision A (zero touch) vilar på en premiss: att en kundunik adress som faktura+<nyckel>@inbox.arvoflow.se
// eller <nyckel>@inbox.arvoflow.se levereras. Mätt i produktion: faktura@ och test@ fungerar. Det är två
// lokaldelar, inte ett bevis för godtyckliga eller för plusformen.
//
// Sonden skickar tre mejl UTAN bilaga (ingen analys, ingen rad i databasen; handlern svarar avsändaren
// «ingen PDF»), och läser Resends mottagningslista (L1: tog Resend emot?). Webhooklagret (L2: nådde det
// vår handler?) läses i Vercels körlogg efteråt, per tidsfönstret sonden skriver ut.
//   A · faktura@inbox.arvoflow.se              — KONTROLL, bevisat sedan 11 juni (motprovet)
//   B · sond-<slump>@inbox.arvoflow.se         — godtycklig lokaldel
//   C · faktura+sond-<slump>@inbox.arvoflow.se — plusformen
// Tolkning: syns inte A är INSTRUMENTET trasigt, inte premissen. test@ används inte — den nollställer testytan.

import { Resend } from 'resend';
import { randomBytes } from 'node:crypto';

const key = process.env.RESEND_API_KEY;
// RESEND_FROM är tom som GitHub-hemlighet (mätt i första körningen); produktionens standard gäller då.
const FROM = process.env.RESEND_FROM || 'Arvo Flow <analys@arvoflow.se>';
if (!key) { console.error('✗ RESEND_API_KEY saknas — sonden kom inte fram. INTE ett mätvärde.'); process.exit(1); }
const resend = new Resend(key);
const t = randomBytes(5).toString('hex');
const DOM = 'inbox.arvoflow.se';
const MAL = [
  { namn: 'A kontroll', adress: `faktura@${DOM}` },
  { namn: 'B godtycklig', adress: `sond-${t}@${DOM}` },
  { namn: 'C plusform', adress: `faktura+sond-${t}@${DOM}` },
];
const t0 = new Date();
console.log(`\n── sond ${t} · start ${t0.toISOString()} ──`);
for (const m of MAL) {
  const { data, error } = await resend.emails.send({ from: FROM, to: m.adress, subject: `Arvo-sond lokaldel ${t} ${m.namn}`,
    text: `Mätning av mottagning på ${m.adress}. Ingen bilaga med flit.` });
  m.skickat = !error; m.fel = error?.message ?? null;
  console.log(`  skickat ${m.namn.padEnd(13)} → ${m.skickat ? `ok (${data?.id})` : `FEL: ${m.fel}`}`);
}

// L1: Resends mottagningslista. Polla upp till ~3 min.
const lista = async () => {
  const r = await fetch('https://api.resend.com/emails/receiving?limit=100', { headers: { Authorization: `Bearer ${key}` } });
  let j = null; try { j = await r.json(); } catch {}
  return { status: r.status, rader: Array.isArray(j?.data) ? j.data : [], nycklar: Object.keys(j ?? {}) };
};
const tillAdresser = (e) => [e.to, e.recipients, e.envelope?.to].flat().filter(Boolean).map((x) => String(x?.email ?? x).toLowerCase());
let senast = null;
for (let i = 0; i < 18; i++) {
  await new Promise((r) => setTimeout(r, 10_000));
  senast = await lista();
  if (senast.status !== 200) continue;
  for (const m of MAL) m.mottagen = senast.rader.some((e) => tillAdresser(e).includes(m.adress));
  if (MAL.every((m) => m.mottagen)) break;
}
console.log(`\n── L1 · Resends mottagningslista ──  HTTP ${senast?.status} · rader ${senast?.rader.length} · nycklar ${JSON.stringify(senast?.nycklar)}`);
if (senast?.rader[0]) console.log(`  radens fält: ${JSON.stringify(Object.keys(senast.rader[0]))}`);
for (const m of MAL) console.log(`  ${m.namn.padEnd(13)} ${m.adress.replace(t, '<t>').padEnd(40)} → ${m.mottagen ? 'MOTTAGEN' : 'ej sedd'}`);
console.log(`\n── L2 läses i Vercels körlogg: POST /api/inbound-email mellan ${t0.toISOString()} och ${new Date().toISOString()} (förväntat 3 anrop) ──`);
if (senast?.status !== 200 || !MAL[0].mottagen) {
  console.error('✗ KONTROLLEN syns inte — instrumentet mäter inte. Resultaten för B och C är INTE ett mätvärde.');
  process.exit(1);
}
console.log('\n[probe-lokaldelar] klar\n');
