// lib/switchliggare.js — switchliggaren i Postgres, så att arvodet har något att läsa.
//
// ══ VARFÖR (2026-08-30) ══════════════════════════════════════════════════════════════════════
//
// Arvodeskörningen (`lib/arvodeskorning.js`) frågar liggaren «vilka byten har passerat karensen?».
// Den frågan hade varit meningslös mot den liggare som fanns: `FileStore` skriver en JSON-fil per
// switch till en **gitignorerad lokal katalog**. På Vercel dör den katalogen med invokationen.
// Ett dagligt cron mot den hade svarat «0 fakturerbara» varje dag för alltid — och det svaret är
// omöjligt att skilja från «inga byten är mogna än».
//
// **Det är villkorsvaktens sjukdom, ordagrant** (Verifieringsplikten p.5): en mekanism som
// reagerar korrekt när den matas, monterad på en signal som aldrig kan röra sig. Att bygga cronen
// mot FileStore hade varit att bygga en vakt som per konstruktion aldrig kan larma.
//
// Liggaren bor därför i Postgres, som överlever invokationen. Gränssnittet är `FileStore`:s
// (save/load/list) så att orkestratorn kan byta implementation utan en enda ändring.
//
// ══ TVÅ TILLSTÅND SOM ALDRIG FÅR SE LIKADANA UT ═════════════════════════════════════════════
//
//   `list()` → `[]`    ← liggaren är BEVISAT tom (frågan ställdes, svaret var noll rader)
//   `list()` → `null`  ← liggaren är OKÄND (ingen databas — vi kunde inte fråga)
//
// Det är hela felfamiljen i två rader. `claimBatch` bröt exakt den regeln 24 augusti: den svarade
// `[]` på ett DB-fel, drainen läste det som «kön är tom» och raderade kundens enda signal om att
// arbete fanns. En körning som inte kan fråga får aldrig rapportera ett tal.
//
// FÅNGAR: att arvodeskörningen läser en liggare som inte överlever invokationen, och att «kunde
//   inte fråga» rapporteras som «inget att göra».
// BLIND: modulen vet vad liggaren INNEHÅLLER, aldrig om orkestratorn faktiskt skriver till den.
//   Så länge Switch-rälsen är `mode:'stub'` är tabellen tom av rätt skäl — inga byten har gjorts.
//   Den dagen rälsen blir skarp måste orkestratorn instansieras med den HÄR storen; gör den inte
//   det är liggaren tom av FEL skäl, och de två ser likadana ut härifrån. Därför rapporterar
//   cronen alltid liggarens storlek bredvid köns, så att skillnaden syns i utfallet.

import { getDb } from './db.js';

let _ensured = false;

async function ensure(db) {
  if (_ensured) return;
  await db`CREATE TABLE IF NOT EXISTS switch_records (
    id           TEXT PRIMARY KEY,
    state        TEXT NOT NULL,
    record       JSONB NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  await db`CREATE INDEX IF NOT EXISTS switch_records_state_idx ON switch_records (state)`;
  _ensured = true;
}

/**
 * Postgres-implementation av orkestratorns Store-gränssnitt.
 * Metodnamnen är `FileStore`:s — bytet ska inte kräva en rad ändrad i orchestrator.js.
 */
export class PgStore {
  async save(record) {
    if (!record?.id) throw new Error('record.id required');
    const db = getDb();
    if (!db) throw new Error('switchliggare: ingen databas — en switch får aldrig sparas i tomma intet');
    await ensure(db);
    await db`
      INSERT INTO switch_records (id, state, record, updated_at)
      VALUES (${record.id}, ${String(record.state)}, ${JSON.stringify(record)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE
        SET state = EXCLUDED.state, record = EXCLUDED.record, updated_at = NOW()
    `;
    return record;
  }

  async load(switchId) {
    const db = getDb();
    if (!db) return null;
    await ensure(db);
    const rader = await db`SELECT record FROM switch_records WHERE id = ${switchId}`;
    return rader?.[0]?.record ?? null;
  }

  /**
   * @returns {Promise<Array<object>|null>} null = OKÄND (ingen databas), aldrig tolkad som tom.
   */
  async list() {
    const db = getDb();
    if (!db) return null;
    await ensure(db);
    const rader = await db`SELECT record FROM switch_records ORDER BY created_at ASC`;
    return (rader ?? []).map((r) => r.record);
  }
}

/** Bekvämlighet för körningen. Se `list()` för tillstånden — `null` betyder OKÄND. */
export async function hamtaLiggare() {
  return new PgStore().list();
}
