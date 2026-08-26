// tests/ingestkontrakt.mjs — IK-01..05: en faktura får aldrig försvinna tyst, och ett DB-fel får
// aldrig se ut som en tom kö.
//
// VARFÖR (2026-08-24, ur obduktionens spaning på invoice-store/ingest).
//
// TVÅ fel i kundens fakturaväg, båda felfamiljen:
//
//  1. `claimBatch` svarade `[]` på DB-FEL. Drainen läser det som «kön är tom», bryter loopen och
//     RADERAR köflaggan `ingest:pending` — kundens enda signal om att arbete finns. En transient
//     glitch under EN körning skickade de följande ~14 cron-minuterna förbi Postgres helt.
//     Modulen bär regeln i klartext femtio rader upp — «OKÄNT ÄR INTE SAMMA SAK SOM TOMT» — och
//     tillämpar den korrekt på köflaggan. Den bröts i samma fil.
//
//  2. Idempotensnyckeln hette `inbound:done:` och sattes i samma sekund mejlet togs EMOT. Dog
//     invokationen efter det men före svaret, avvisades Resends omleverans som «redan hanterad»:
//     fakturan borta, inget svarsmail, och loggraden identisk med en äkta dubblett. Ett värde som
//     betyder «påbörjat» lagrat på en plats som läses som «avslutat».
//
// FÅNGAR: att okänt-tillståndet kollapsar till tomt igen, att köflaggan släcks på ett DB-fel, och
//   att slutförandemarkeringen flyttas tillbaka före arbetet.
// BLIND: testet prövar KONTRAKTET (returformer och kodform), inte en verklig Vercel-invokation som
//   dör mitt i. Att `markeraSlutfort` anropas på varje SVARANDE utgång är en källtextvakt — en ny
//   utgång som svarar kunden utan att markera skulle passera. IK-05 räknar utgångarna så att en
//   tillkommande utgång åtminstone syns som en ändring.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const las = (f) => readFileSync(join(ROT, f), 'utf8');
const kod = (f) => las(f).split('\n').filter((r) => !r.trim().startsWith('//')).join('\n');

describe('IK · Köns okända tillstånd', () => {
  test('IK-01: claimBatch svarar null (okänt) när databasen inte kan frågas', async () => {
    const fore = process.env.DATABASE_URL;
    process.env.DATABASE_URL = 'postgresql://u:p@127.0.0.1:1/nada'; // hemlighet-ok: syntetisk död host, hela poängen är att frågan SKA kasta
    try {
      // Färsk modulinstans så getDb() ser den satta URL:en.
      const { claimBatch } = await import(`../lib/ingest-queue.js?ik=${Date.now()}`);
      const r = await claimBatch(5);
      assert.equal(r, null,
        'ett DB-fel måste svara null — `[]` är ett PÅSTÅENDE om att kön är tom, och drainen släcker då köflaggan');
    } finally {
      if (fore === undefined) delete process.env.DATABASE_URL; else process.env.DATABASE_URL = fore;
    }
  });

  test('IK-02: utan databas svarar claimBatch också null, aldrig tomt', async () => {
    const fore = process.env.DATABASE_URL;
    delete process.env.DATABASE_URL;
    try {
      const { claimBatch } = await import(`../lib/ingest-queue.js?ik=${Date.now()}b`);
      assert.equal(await claimBatch(5), null, 'ingen databas = vi vet ingenting om kön');
    } finally {
      if (fore !== undefined) process.env.DATABASE_URL = fore;
    }
  });

  test('IK-03: drainen släcker köflaggan bara vid BEVISAT tom kö', () => {
    const d = kod('api/cron/drain-ingest.mjs');
    assert.match(d, /jobs === null/, 'drainen måste skilja okänt från tomt');
    assert.match(d, /claimed === 0 && !koStatusOkand/,
      'clearPending() får aldrig köras när köstatus är okänd — då hoppar nästa kvart över Postgres');
  });
});

describe('IK · En påbörjad behandling är inte en avslutad', () => {
  test('IK-04: idempotensnyckeln som AVVISAR sätts inte före arbetet', () => {
    const k = kod('api/inbound-email.mjs');
    // Den avvisande nyckeln läses; den SÄTTS bara i markeraSlutfort.
    assert.match(k, /const klar = await kv\.get\(`inbound:done:/,
      'avvisningen ska bygga på en LÄST slutförandemarkering, inte på en satt mottagningsmarkering');
    assert.match(k, /inbound:started:/, 'den samtidiga dubbletten fångas av en kortlivad start-nyckel');
    const settDone = [...k.matchAll(/kv\.set\(`inbound:done:/g)].length;
    assert.equal(settDone, 1, 'inbound:done får sättas på exakt ETT ställe — i markeraSlutfort, efter svaret');
  });

  test('IK-05: varje SVARANDE utgång markerar slutfört', () => {
    const k = las('api/inbound-email.mjs');
    // De tre utgångar som faktiskt hanterat mejlet klart: kunden varnad (rate limit), jobben köade,
    // svarsmailet skickat. Övriga utgångar (fel typ, ogiltig avsändare, redan hanterad) har inte
    // utfört något arbete och ska INTE markera — annars vore en ogiltig avsändare permanent tyst.
    const markeringar = [...k.matchAll(/await markeraSlutfort\(\);/g)].length;
    assert.equal(markeringar, 3,
      'tre svarande utgångar ska markera slutfört — ändras antalet har en ny utgång tillkommit och '
      + 'måste granskas: svarar den kunden, ska den markera; gör den inget arbete, ska den inte');
  });
});
