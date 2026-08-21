// api/cron/drain-ingest.mjs — drain-arbetaren för asynkron faktura-kö (bulk-ingest).
//
// Webhooken (api/inbound-email) köar ett jobb per PDF när en kund matar in >2 fakturor. Den här
// cronen betar av kön i bundna batchar — så att 50–100 fakturor analyseras utan att spränga 60s.
// Kör frekvent (vercel.json). Idempotent + retry: claimBatch tar bara obearbetade/stale jobb,
// failJob lägger tillbaka för omtag tills attempts-taket. Varje analys = SAMMA pipeline som
// /testa-faktura och mail-in (regel 1), nycklad på avsändaren → landar i kundens kontor.

import { createHash } from 'node:crypto';
import { claimBatch, completeJob, failJob, hasPendingFlag, clearPending, utfallFranSvar } from '../../lib/ingest-queue.js';
import { fetchInboundPdfByIndex } from '../inbound-email.mjs';

export const config = { maxDuration: 60 };

const BASE_URL = process.env.ARVO_BASE_URL ?? 'https://arvoflow.se';
// Samtidighet per våg: bunden så vi inte spränger Anthropics rate limit (felklassen vi sett).
// 5 parallella × ~8s ≈ en våg på 8s i stället för 40s sekventiellt.
const CONCURRENCY = Number(process.env.INGEST_DRAIN_CONCURRENCY) || 5;
// Hur många jobb vi claimar per våg (= samtidigheten — en claim, en parallell våg).
const BATCH = Number(process.env.INGEST_DRAIN_BATCH) || CONCURRENCY;
// Vi loopar vågor inom EN invokation tills kön är tom eller vi närmar oss 60s-taket.
// 45s lämnar marginal för att en redan startad våg (~8–12s) ska hinna klart före maxDuration 60s.
const TIME_BUDGET_MS = Number(process.env.INGEST_DRAIN_BUDGET_MS) || 45_000;
// Per-faktura-tak: en hängande analys får inte äta hela budgeten (jobbet blir stale → reclaimas).
const JOB_TIMEOUT_MS = Number(process.env.INGEST_DRAIN_JOB_TIMEOUT_MS) || 40_000;
// SÄKERHETSSLOTEN: hur ofta vi frågar Postgres ÄVEN utan köflagga. Behövs av två skäl —
// KV kan ha evinerats (då vet vi inte att arbete finns), och stale-reclaim (jobb som fastnat i
// 'processing' >10 min) kräver att claimBatch faktiskt körs ibland. 15 min ger värsta-fall-latens
// 15 min för ett strandsatt jobb, men inbound-email sparkar igång drainen direkt vid köläggning —
// så den verkliga latensen för en kund är oförändrad.
const SAFETY_EVERY_MIN = Number(process.env.INGEST_DRAIN_SAFETY_MIN) || 15;
const sha16 = (s) => createHash('sha256').update(String(s)).digest('hex').slice(0, 16);

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

// Analyserar EN faktura via samma pipeline (regel 1). Uppdaterar kön (complete/fail). Kastar aldrig.
async function processJob(job) {
  try {
    const pdf = await fetchInboundPdfByIndex(job.emailId, job.attachmentIndex);
    if (!pdf || pdf.tooBig || !pdf.content) {
      await failJob(job.id, pdf?.tooBig ? 'PDF > 6 MB' : 'PDF kunde inte hämtas');
      return false;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), JOB_TIMEOUT_MS);
    let r;
    try {
      r = await fetch(`${BASE_URL}/api/test-invoice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          pdfBase64:   pdf.content,
          industry:    'ovrigt',
          employees:   10,
          bypass:      process.env.ARVO_BYPASS_SECRET,
          email:       job.sender,
          userEmail:   job.sender,
          fingerprint: `mail:${sha16(job.sender)}`,
          // industry/employees ovan är ANTAGNA, inte avlästa — flaggan hindrar att de skrivs
          // till prisboken som om de vore observerade (regel 3). Analysen och kundens svar rörs inte.
          segmentOkant: true,
        }),
      });
    } finally {
      clearTimeout(timer);
    }
    const a = await r.json().catch(() => null);
    // Drainen HAR pipelinens dom i handen och kastade bort den. Nu följer den med jobbet,
    // så kön kan svara på "vad hände med min tionde faktura?" utan Vercel-loggen.
    if (a?.ok) { await completeJob(job.id, utfallFranSvar(a)); return true; }
    // SKÄLET STOD I SVARET OCH KASTADES BORT. Kön sparade "analys misslyckades (HTTP 422)" för
    // tio fakturor i rad — en statuskod utan innehåll, medan pipelinen returnerade både `error`
    // och `stage` i samma svar. 422 betyder ett KÄNT fel (extract/categorize/recommend), och utan
    // meddelandet går det inte att skilja "Resend har inte mejlet kvar" från "vi har brutit
    // extraktionen för alla kunder". De två kräver rakt motsatta åtgärder. Samma bokföringsplikt
    // som gällde analysens beslut gäller kösnas fel.
    const skal = [a?.stage, a?.error].filter(Boolean).join(': ').slice(0, 150);
    await failJob(job.id, `HTTP ${r.status}${skal ? ` · ${skal}` : ' · svaret bar inget skäl'}`);
    return false;
  } catch (err) {
    await failJob(job.id, err.message);
    return false;
  }
}

export default async function handler(req, res) {
  // Vercel-cron triggar GET med Authorization: Bearer <CRON_SECRET>; manuell körning kan POSTa likadant.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.authorization !== `Bearer ${secret}`) {
    return send(res, 401, { error: 'unauthorized' });
  }

  // ── SPÄRREN MOT ATT VÄCKA DATABASEN I ONÖDAN (grundarfynd 2026-08-06) ──────────────────────
  // Cronen kör varje minut. Varje claimBatch är en Postgres-fråga, och en fråga var 60:e sekund
  // gör att Neons beräkning aldrig autosuspendar — ~180 CU-timmar/månad för att fråga en tom kö.
  // Är köflaggan bevisat FALSK och det inte är en säkerhetsslot rör vi inte databasen alls.
  // null (KV saknas/felar) räknas ALDRIG som tomt: okänt är inte samma sak som tomt.
  // ── EN KÖ SOM FYLLS UTANFÖR FLAGGAN BLIR OSYNLIG (grundarfall 2026-08-16) ─────────────────
  // Tio omköade jobb låg pending i över en timme. Drainen svarade "tom kö enligt köflaggan" varje
  // gång: omköningsverktyget sätter status i SQL, men kunde inte sätta KV-flaggan (inga nycklar i
  // dess miljö), och drainen litade på ett DEFINITIVT falskt värde. Spärren var rätt byggd för
  // sitt syfte — den skyddar Neon från 43 000 väckningar i månaden — men den gjorde flaggan till
  // sanningen om kön i stället för en gissning om den.
  //
  // `force` är operatörens spak: en manuell "töm nu" som HOPPAR ÖVER flaggan och frågar Postgres.
  // Den ändrar ingenting annat — samma claim, samma batch, samma budget. Utan den är enda vägen
  // att vänta på att minuten råkar bli delbar med säkerhetsintervallet.
  const force = req.query?.force === '1' || req.query?.force === 'true';
  const flagga = await hasPendingFlag();
  const sakerhetsslot = new Date().getUTCMinutes() % SAFETY_EVERY_MIN === 0;
  if (flagga === false && !sakerhetsslot && !force) {
    return send(res, 200, { ok: true, skipped: 'tom kö enligt köflaggan — Postgres orörd' });
  }

  const deadline = Date.now() + TIME_BUDGET_MS;
  let done = 0, failed = 0, claimed = 0, waves = 0;

  // Loopa vågor tills kön är tom ELLER vi närmar oss 60s-taket. claimBatch är atomisk
  // (FOR UPDATE SKIP LOCKED) → överlappande invokationer/vågor dubbel-claimar aldrig.
  while (Date.now() < deadline) {
    const jobs = await claimBatch(BATCH);
    if (!jobs.length) break;                        // kön tom → klart
    claimed += jobs.length;
    waves++;
    const results = await Promise.all(jobs.map(processJob));   // bunden parallell våg (BATCH ≤ CONCURRENCY)
    for (const ok of results) { if (ok) done++; else failed++; }
  }

  // Kön visade sig tom → släck flaggan, så nästa minut slipper väcka databasen.
  if (claimed === 0) await clearPending();

  console.log(`[drain-ingest] klar: ${done} klara · ${failed} fel · ${claimed} claimade i ${waves} våg(or)`
    + `${flagga === null ? ' · köflagga okänd (KV saknas) → Postgres frågad' : ''}`);
  return send(res, 200, { ok: true, drained: done, failed, claimed, waves });
}
