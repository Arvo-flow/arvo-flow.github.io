#!/usr/bin/env node
// scripts/probe-premiumgrind.mjs — SKRIVSKYDDAD MÄTNING före premiumgrinden (grundarorder 2026-09-24).
//
// Frågan: vem får i dag de proaktiva utskicken, och vad är en «intelligence_activations»-rad?
// Loggen är publik: bara ANTAL och datum — aldrig en adress, ett fingeravtryck eller ett belopp.
//
// P1 · intelligence_activations: rader, skilda adresser, per källa, datumspann, testidentiteter.
// P2 · månadsbriefens mottagarkrets (user_email med auto-analys) — och hur många av dem som har en rad.
// P3 · prislarmens mottagarkrets (gate_emails med fingeravtryck) — och överlappet med raderna.
// P4 · avtalspåminnelsernas krets (framtida contract_end_date / contract_terms_json med user_email).
// P5 · vad som FAKTISKT gått ut: briefing_reports, price_alerts_sent, deadline_reminder_json satta.
//
// MOTPROV: varje fråga säger «KUNDE INTE LÄSAS» i stället för 0 när den kastar. Utan databas: exit 1.
import { getDb } from '../lib/db.js';
import { arTestidentitet } from '../lib/test-surface.js';

const db = getDb();
if (!db) { console.error('✗ INGEN DATABAS — sonden kom inte fram. Detta är INTE ett mätvärde.'); process.exit(1); }
const dag = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '—');
const fraga = async (namn, fn) => { try { console.log(`\n── ${namn} ──`); await fn(); } catch (e) { console.log(`   KUNDE INTE LÄSAS: ${String(e.message).slice(0, 140)}`); } };
const norm = (e) => String(e ?? '').trim().toLowerCase();

let aktiverade = null;
await fraga('P1 · intelligence_activations', async () => {
  const r = await db`SELECT email, source, created_at FROM intelligence_activations`;
  aktiverade = new Set(r.map((x) => norm(x.email)));
  const kallor = {};
  for (const x of r) kallor[x.source] = (kallor[x.source] ?? 0) + 1;
  const test = [...aktiverade].filter((e) => arTestidentitet(e)).length;
  const dat = r.map((x) => x.created_at).sort((a, b) => a - b);
  console.log(`   rader ${r.length} · skilda adresser ${aktiverade.size} · varav testidentiteter ${test}`);
  console.log(`   per källa ${JSON.stringify(kallor)} · första ${dag(dat[0])} · senaste ${dag(dat[dat.length - 1])}`);
});

const overlapp = (mangd) => (aktiverade ? [...mangd].filter((e) => aktiverade.has(e)).length : 'okänt (P1 kunde inte läsas)');

await fraga('P2 · månadsbriefens krets (user_email med auto-analys, ej arkiverad)', async () => {
  const r = await db`SELECT DISTINCT user_email FROM invoice_analyses   -- internt: sond, räknar mottagarkretsen
    WHERE user_email IS NOT NULL AND route = 'auto' AND arkiverad_at IS NULL`;
  const m = new Set(r.map((x) => norm(x.user_email)));
  const test = [...m].filter((e) => arTestidentitet(e)).length;
  console.log(`   skilda adresser ${m.size} (varav testidentiteter ${test}) · med aktiveringsrad ${overlapp(m)}`);
});

await fraga('P3 · prislarmens krets (gate_emails med fingeravtryck)', async () => {
  const r = await db`SELECT DISTINCT email FROM gate_emails WHERE fingerprint IS NOT NULL`;
  const m = new Set(r.map((x) => norm(x.email)));
  console.log(`   skilda adresser ${m.size} · med aktiveringsrad ${overlapp(m)}`);
});

await fraga('P4 · avtalspåminnelsernas krets', async () => {
  const r = await db`SELECT DISTINCT user_email FROM invoice_analyses   -- internt: sond, räknar mottagarkretsen
    WHERE arkiverad_at IS NULL AND user_email IS NOT NULL
      AND (contract_end_date > CURRENT_DATE OR contract_terms_json IS NOT NULL)`;
  const m = new Set(r.map((x) => norm(x.user_email)));
  console.log(`   skilda adresser ${m.size} · med aktiveringsrad ${overlapp(m)}`);
});

await fraga('P5 · vad som faktiskt gått ut', async () => {
  const b = await db`SELECT period, COUNT(*)::int AS n FROM briefing_reports GROUP BY period ORDER BY period`;
  console.log(`   briefing_reports per period ${JSON.stringify(b.map((x) => [x.period, x.n]))}`);
  const p = await db`SELECT COUNT(*)::int AS n, COALESCE(SUM(emails_sent),0)::int AS mejl, MIN(created_at) AS forst, MAX(created_at) AS sist FROM price_alerts_sent`;
  console.log(`   price_alerts_sent ${p[0].n} körningar · ${p[0].mejl} mejl · ${dag(p[0].forst)} – ${dag(p[0].sist)}`);
  const d = await db`SELECT COUNT(*)::int AS n FROM invoice_analyses   -- internt: sond, räknar skickade påminnelser
    WHERE deadline_reminder_json IS NOT NULL`;
  console.log(`   analyser med skickad avtalspåminnelse ${d[0].n}`);
});
process.exit(0);
