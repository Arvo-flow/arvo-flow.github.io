#!/usr/bin/env node
// scripts/probe-rumsdorren.mjs — ÄR RUMMETS DÖRR STÄNGD FÖR GISSADE NYCKLAR I PRODUKTIONEN? (2026-09-23)
//
// Prövar beteendet, inte koden: gissbara nycklar ska nekas (400 rumsnyckel_ogiltig), en slumpad ska
// INTE nekas (motprov — annars är dörren stängd för alla), och send-report ska vara borta (404).
// Skickar inga hemligheter och läser ingen kunds data: den slumpade nyckeln är nyss skapad och tom.
import { randomBytes, createHash } from 'node:crypto';
const BAS = process.env.ARVO_BASE_URL || 'https://arvoflow.se';
const hamta = async (p, init) => { try { const r = await fetch(`${BAS}${p}`, { ...init, signal: AbortSignal.timeout(20000) });
  return { status: r.status, text: await r.text() }; } catch (e) { return { status: null, text: e.message }; } };
let fel = 0;
const pröva = async (namn, qs, forvant) => {
  const r = await hamta(`/api/invoice-history?${qs}`);
  let kod = null; try { kod = JSON.parse(r.text).error ?? null; } catch {}
  const ok = forvant === 'nekad' ? (r.status === 400 && kod === 'rumsnyckel_ogiltig') : (r.status !== null && kod !== 'rumsnyckel_ogiltig');
  if (!ok) fel++;
  console.log(`${ok ? '✓' : '✗'} ${namn}: HTTP ${r.status} ${kod ?? ''}`);
};
const deterministisk = createHash('sha256').update('Mozilla/5.0|sv-SE|1920x1080|Europe/Stockholm|8').digest('hex').slice(0, 24);
await pröva('gammalt webbläsarformat (24 hex)', `fingerprint=${deterministisk}`, 'nekad');
await pröva('mail:-nyckel', `fingerprint=mail:${'a'.repeat(16)}`, 'nekad');
await pröva('kontor:-nyckel', `fingerprint=kontor:${'b'.repeat(16)}`, 'nekad');
await pröva('MOTPROV · nyskapad slumpnyckel', `fingerprint=${randomBytes(16).toString('hex')}`, 'öppen');
// send-report: det som räknas är att FUNKTIONEN är borta. En okänd sökväg besvaras av sidans
// reserv (GET → HTML 200, POST → 405) — en första version av sonden förväntade 404 och föll på rätt
// beteende. Provet nu: GET får inte vara JSON från en funktion, och POST med nyckel + adress får
// aldrig svara ok.
{
  const g = await hamta('/api/send-report');
  const gOk = g.status !== null && !/^\s*\{/.test(g.text); if (!gOk) fel++;
  console.log(`${gOk ? '✓' : '✗'} send-report GET: HTTP ${g.status} · ${/^\s*</.test(g.text) ? 'sidans HTML-reserv' : g.text.slice(0, 60)}`);
  const p = await hamta('/api/send-report', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fingerprint: deterministisk, email: 'sond@invalid.example' }) });
  let svarOk = false; try { svarOk = JSON.parse(p.text).ok === true; } catch {}
  const pOk = p.status !== null && !(p.status >= 200 && p.status < 300) && !svarOk; if (!pOk) fel++;
  console.log(`${pOk ? '✓' : '✗'} send-report POST med nyckel + adress: HTTP ${p.status}${svarOk ? ' · ok:true — FUNKTIONEN LEVER' : ''}`);
}
if (fel) { console.log(`\n✗ ${fel} kontroll(er) föll — antingen är deployen inte ute ännu, eller så är dörren öppen.`); process.exit(1); }
console.log('\n✓ Dörren nekar gissade nycklar, släpper in en slumpad, och send-report kan inte längre anropas.');
