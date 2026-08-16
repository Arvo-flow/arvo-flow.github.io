// lib/ingest-queue.js — asynkron faktura-kö (moaten: en kund ska kunna mata in 50–100 fakturor
// på en gång). Serverless kan inte analysera 100 PDF:er i ETT 60s-webhook-anrop, så ingest delas:
//   1. webhooken KÖAR ett jobb per PDF (snabbt) och svarar direkt,
//   2. en frekvent cron (api/cron/drain-ingest) BETAR AV kön i bundna batchar.
//
// Robust + observerbar (Postgres, ej KV-lista): atomiskt claim via CTE + FOR UPDATE SKIP LOCKED
// (en sats → säker över Neon HTTP), idempotens på (email_id, attachment_index), retry-räknare,
// och stale-reclaim (ett jobb som fastnat i 'processing' >10 min tas om). Self-ensurar tabellen.

import { getDb } from './db.js';
import { getKv } from './kv.js';

async function ensureTable(db) {
  await db`CREATE TABLE IF NOT EXISTS ingest_jobs (
    id               BIGSERIAL PRIMARY KEY,
    email_id         TEXT NOT NULL,
    sender           TEXT NOT NULL,
    filename         TEXT,
    attachment_index INT NOT NULL DEFAULT 0,
    status           TEXT NOT NULL DEFAULT 'pending',   -- pending | processing | done | failed
    attempts         INT NOT NULL DEFAULT 0,
    error            TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    claimed_at       TIMESTAMPTZ,
    done_at          TIMESTAMPTZ,
    UNIQUE (email_id, attachment_index)
  )`;
  await db`CREATE INDEX IF NOT EXISTS ingest_jobs_pending_idx ON ingest_jobs (status, created_at)`;
  // ── BOKFÖRINGSPLIKTEN, PÅ KÖN (2026-08-15) ──────────────────────────────────────────────
  // `done` betydde bara "pipelinen svarade ok:true". Vilket BESLUT den fattade kastades bort.
  // När en faktura sedan saknades i rummet gick det inte att se vilken utgång den tog — kön
  // och liggaren var oense och ingen av dem kunde säga varför. Kolumnen bär utfallet
  // (route:reason), så en tyst förlust blir läsbar utan att någon behöver komma åt Vercel-loggen.
  await db`ALTER TABLE ingest_jobs ADD COLUMN IF NOT EXISTS outcome TEXT`;
}

const MAX_ATTEMPTS = 3;

// Köa ett jobb per PDF. Idempotent: webhook-retry/redelivery för samma mail dubbel-köar aldrig.
// Returnerar antal NYA jobb som lades till.
// ── KÖFLAGGAN (grundarfynd 2026-08-06): spärren mot att väcka databasen i onödan ─────────────
//
// api/cron/drain-ingest kör VARJE MINUT (vercel.json). Varje körning anropar claimBatch → en
// Postgres-fråga. Neon autosuspendar sin beräkning när ingen frågar — men en fråga var 60:e sekund
// betyder att den ALDRIG somnar. 43 200 väckningar i månaden ≈ 0,25 CU × 24 h × 30 d ≈ 180
// CU-timmar, vilket nästan exakt matchar den förbrukning som sprängde Free-taket den 18 juli.
// Kön är dessutom nästan alltid tom, och inbound-email sparkar igång drainen DIREKT när något
// köas — cronen är ett skyddsnät, inte primärvägen.
//
// Flaggan bor i KV (Redis), inte i Postgres: att fråga KV väcker ingen databas. Sätts av BÅDA
// köläggarna, läses av drainen, rensas när kön visat sig tom.
//
// OKÄNT ÄR INTE SAMMA SAK SOM TOMT: saknas KV eller felar den returneras null, och drainen MÅSTE
// då fråga Postgres. Ett jobb får aldrig bli strandsatt för att en cache var otillgänglig.
const PENDING_KEY = 'ingest:pending';

export async function markPending() {
  const kv = getKv();
  // EN TYST NOLLHANDLING ÄR INGEN HANDLING (2026-08-16). Raden löd `if (!kv) return;`. I ett
  // omköningsverktyg utan KV-nycklar betydde det att väckningen aldrig skedde — jobben låg
  // pending med noll försök tills säkerhetsslotten råkade fyra, och anropet såg ut att ha gjort
  // sitt jobb. Exakt den familj av fel vi jagat hela natten: ett utfall som inte kan skiljas från
  // framgång. Flaggan är fortfarande bara en optimering och får aldrig fälla anroparen — men den
  // ska säga ifrån när den inte kan sättas.
  if (!kv) {
    console.warn('[ingest-queue] markPending: ingen KV — köflaggan sattes ALDRIG. '
      + 'Drainen väcks först av säkerhetsslotten (var 15:e minut).');
    return;
  }
  try { await kv.set(PENDING_KEY, 1, { ex: 86400 }); } catch (err) {
    console.warn('[ingest-queue] markPending föll:', err.message, '— drainen väcks av säkerhetsslotten.');
  }
}

export async function clearPending() {
  const kv = getKv();
  if (!kv) return;
  try { await kv.del(PENDING_KEY); } catch { /* nästa tömning rensar */ }
}

/** true = arbete finns · false = kön bevisat tom · null = VET EJ (fråga Postgres). */
export async function hasPendingFlag() {
  const kv = getKv();
  if (!kv) return null;
  try { return !!(await kv.get(PENDING_KEY)); } catch { return null; }
}

export async function enqueueJobs(jobs = []) {
  const db = getDb();
  if (!db || !jobs.length) return 0;
  try {
    await ensureTable(db);
    let added = 0;
    for (const j of jobs) {
      if (!j.emailId || !j.sender) continue;
      const rows = await db`
        INSERT INTO ingest_jobs (email_id, sender, filename, attachment_index, status)
        VALUES (${j.emailId}, ${j.sender}, ${j.filename ?? null}, ${j.attachmentIndex ?? 0}, 'pending')
        ON CONFLICT (email_id, attachment_index) DO NOTHING
        RETURNING id
      `;
      if (rows.length) added++;
    }
    if (added > 0) await markPending();          // väck drainen — men bara när det FINNS arbete
    return added;
  } catch (err) {
    console.error('[ingest-queue] enqueueJobs:', err.message);
    return 0;
  }
}

// Atomiskt claim av upp till n väntande (eller stale-processing) jobb → 'processing'. EN sats.
// Jobb som överskridit MAX_ATTEMPTS lämnas (plockas av failStuck → 'failed'), så kön inte fastnar.
export async function claimBatch(n = 6) {
  const db = getDb();
  if (!db) return [];
  try {
    await ensureTable(db);
    const rows = await db`
      WITH claimed AS (
        SELECT id FROM ingest_jobs
        WHERE (status = 'pending' OR (status = 'processing' AND claimed_at < NOW() - INTERVAL '10 minutes'))
          AND attempts < ${MAX_ATTEMPTS}
        ORDER BY created_at
        LIMIT ${n}
        FOR UPDATE SKIP LOCKED
      )
      UPDATE ingest_jobs j
      SET status = 'processing', claimed_at = NOW(), attempts = j.attempts + 1
      FROM claimed
      WHERE j.id = claimed.id
      RETURNING j.id, j.email_id, j.sender, j.filename, j.attachment_index, j.attempts
    `;
    return rows.map((r) => ({
      id: r.id, emailId: r.email_id, sender: r.sender,
      filename: r.filename, attachmentIndex: r.attachment_index, attempts: r.attempts,
    }));
  } catch (err) {
    console.error('[ingest-queue] claimBatch:', err.message);
    return [];
  }
}

/**
 * Ett jobb som är klart ska säga VAD det kom fram till, inte bara att det blev klart.
 * `outcome` är pipelinens egen dom i komprimerad form ("auto:telia", "unsupported:natavgift",
 * "review_queue:no_benchmark"). Utan den betyder `done` bara "något svarade ok:true" — och det
 * var precis den tystnaden som gjorde en försvunnen faktura omöjlig att spåra utan Vercel-loggen.
 */
export async function completeJob(id, outcome = null) {
  const db = getDb();
  if (!db) return;
  const utfall = outcome == null ? null : String(outcome).slice(0, 200);
  try { await db`UPDATE ingest_jobs SET status='done', done_at=NOW(), error=NULL, outcome=${utfall} WHERE id=${id}`; }
  catch (err) { console.error('[ingest-queue] completeJob:', err.message); }
}

/**
 * Pipelinens svar → en kort, läsbar dom. Ren funktion så den kan testlåsas utan DB.
 * Aldrig fri text från modellen; bara route, reason och leverantörsnamn — fält vi själva sätter.
 */
export function utfallFranSvar(a) {
  if (!a || typeof a !== 'object') return 'okänt:tomt_svar';
  const route = String(a.route ?? 'okänd_väg');
  const skal = a.reason ?? a.categorized?.category ?? a.extracted?.supplier ?? null;
  const bas = skal ? `${route}:${String(skal).slice(0, 60)}` : route;
  // ── LANDADE RADEN? (2026-08-15) ────────────────────────────────────────────────────────────
  // Domen ensam räckte inte. Kön svarade `auto:saas-productivity` för den försvunna fakturan —
  // alltså huvudvägen, där storeAnalysis är en ren upsert som alltid ska ge ett id. Ändå fanns
  // ingen rad. Skillnaden mellan "vi beslutade" och "beslutet landade" fanns bara i Vercel-loggen.
  // Framgångsvägarna returnerar redan analysisId i svaret; frånvaron av det ÄR fyndet.
  // Triage-vägarna returnerar inget id (storeTriaged svarar inte till klienten), så markören
  // sätts bara där den betyder något — en markör som alltid säger samma sak är inget svar.
  // ID:t bärs med, inte bara att det fanns. storeAnalysis är en UPSERT på (fingerprint, pdf_hash):
  // två olika filnamn med IDENTISKA bytes landar på SAMMA rad, och andra gången returneras den
  // första radens id — "lagrad", men utan en ny rad. Kunden ser då nio fakturor av tio och vi kan
  // inte skilja det från en förlust. Med id:t i kön kan en dubblett läsas av direkt: två jobb som
  // svarar med samma id är samma PDF, oavsett vad filerna hette.
  if (route === 'auto' || route === 'monitoring') {
    // Fakturanumrets grind är fail-closed. Ett fält som alltid avvisas ser identiskt ut med ett
    // som fungerar, och skälet bor annars bara i Vercel-loggen. Kön bär det i stället.
    const nrSkal = a.fakturanummerSkal ? `·nr:${String(a.fakturanummerSkal).slice(0, 34)}` : '';
    return a.analysisId ? `${bas}·lagrad#${a.analysisId}${nrSkal}` : `${bas}·EJ_LAGRAD${nrSkal}`;
  }
  return bas;
}

// Misslyckat försök: tillbaka till 'pending' för retry, om inte attempts-taket nåtts → 'failed'.
export async function failJob(id, error) {
  const db = getDb();
  if (!db) return;
  try {
    await db`
      UPDATE ingest_jobs
      SET status = CASE WHEN attempts >= ${MAX_ATTEMPTS} THEN 'failed' ELSE 'pending' END,
          error = ${String(error ?? '').slice(0, 500)}, claimed_at = NULL
      WHERE id = ${id}
    `;
  } catch (err) { console.error('[ingest-queue] failJob:', err.message); }
}

// Hur många jobb väntar/processas för en avsändare (för svarsmailets "fylls nu"-besked).
export async function pendingCountForEmail(emailId) {
  const db = getDb();
  if (!db) return 0;
  try {
    const [r] = await db`SELECT COUNT(*)::int AS n FROM ingest_jobs WHERE email_id=${emailId} AND status IN ('pending','processing')`;
    return r?.n ?? 0;
  } catch { return 0; }
}

// Hur många fakturor är PÅ VÄG för en kontoidentitet (sender = identitetens e-post) — driver rummets
// "Arvo analyserar N fakturor"-läge så det aldrig visar tomt mitt i en pågående bunt.
export async function pendingCountBySender(sender) {
  const db = getDb();
  if (!db || !sender) return 0;
  try {
    const [r] = await db`SELECT COUNT(*)::int AS n FROM ingest_jobs WHERE sender=${sender} AND status IN ('pending','processing')`;
    return r?.n ?? 0;
  } catch { return 0; }
}

// Hur många fakturor FÖLL (efter alla omtag) för en identitet — driver rummets ärliga bortfalls-besked.
// Tyst tapp är oacceptabelt: kunden ska veta att N inte gick igenom, inte tro att de finns.
export async function failedCountBySender(sender) {
  const db = getDb();
  if (!db || !sender) return 0;
  try {
    const [r] = await db`SELECT COUNT(*)::int AS n FROM ingest_jobs WHERE sender=${sender} AND status='failed'`;
    return r?.n ?? 0;
  } catch { return 0; }
}

// De fallna fakturornas FILNAMN — så kunden ser EXAKT vilka, inte bara "N stycken".
export async function failedFilesBySender(sender, { limit = 25 } = {}) {
  const db = getDb();
  if (!db || !sender) return [];
  try {
    const rows = await db`
      SELECT filename FROM ingest_jobs WHERE sender=${sender} AND status='failed'
      ORDER BY created_at DESC LIMIT ${limit}`;
    return rows.map((r) => r.filename).filter(Boolean);
  } catch (err) { console.error('[ingest-queue] failedFilesBySender:', err.message); return []; }
}

// "Försök igen": återställ fallna jobb → pending (attempts=0) så drain-cronen kör om dem. Vi har kvar
// email_id + bilage-index, så PDF:en hämtas på nytt ur Resend — kunden behöver inte skicka något mejl.
// Återhämtar transienta fel (kredit-slut, timeout, glitch). En äkta bild-/icke-faktura faller igen.
export async function retryFailedBySender(sender) {
  const db = getDb();
  if (!db || !sender) return 0;
  try {
    const rows = await db`
      UPDATE ingest_jobs SET status='pending', attempts=0, error=NULL, claimed_at=NULL
      WHERE sender=${sender} AND status='failed'
      RETURNING id`;
    if (rows.length) await markPending();        // omköade jobb är också arbete
    return rows.length;
  } catch (err) {
    console.error('[ingest-queue] retryFailedBySender:', err.message);
    return 0;
  }
}
