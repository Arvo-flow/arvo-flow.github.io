// lib/ingest-queue.js — asynkron faktura-kö (moaten: en kund ska kunna mata in 50–100 fakturor
// på en gång). Serverless kan inte analysera 100 PDF:er i ETT 60s-webhook-anrop, så ingest delas:
//   1. webhooken KÖAR ett jobb per PDF (snabbt) och svarar direkt,
//   2. en frekvent cron (api/cron/drain-ingest) BETAR AV kön i bundna batchar.
//
// Robust + observerbar (Postgres, ej KV-lista): atomiskt claim via CTE + FOR UPDATE SKIP LOCKED
// (en sats → säker över Neon HTTP), idempotens på (email_id, attachment_index), retry-räknare,
// och stale-reclaim (ett jobb som fastnat i 'processing' >10 min tas om). Self-ensurar tabellen.

import { getDb } from './db.js';

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
}

const MAX_ATTEMPTS = 3;

// Köa ett jobb per PDF. Idempotent: webhook-retry/redelivery för samma mail dubbel-köar aldrig.
// Returnerar antal NYA jobb som lades till.
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

export async function completeJob(id) {
  const db = getDb();
  if (!db) return;
  try { await db`UPDATE ingest_jobs SET status='done', done_at=NOW(), error=NULL WHERE id=${id}`; }
  catch (err) { console.error('[ingest-queue] completeJob:', err.message); }
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
