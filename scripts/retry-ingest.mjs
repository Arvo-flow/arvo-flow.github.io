// scripts/retry-ingest.mjs — flippar fallna ingest-jobb tillbaka till 'pending' så drainen kör om dem.
// Används efter en fix av rotorsaken (t.ex. pagineringsfixen 2026-06-27): de 6 fallna idx 20–25 var
// terminala 'failed' (attempts-taket nått) och plockas inte av claimBatch förrän de återställs.
// Kör i Actions med DATABASE_URL. Arg = sender (default testytan).
import { retryFailedBySender, failedFilesBySender } from '../lib/ingest-queue.js';

const sender = process.argv[2] || 'testyta@arvoflow.se';
const before = await failedFilesBySender(sender, { limit: 100 });
console.log(`Fallna jobb för ${sender} före retry: ${before.length}`);
for (const f of before) console.log(`   • ${f}`);

const requeued = await retryFailedBySender(sender);
console.log(`\n→ Återställde ${requeued} jobb till 'pending'. Drainen (var minut) kör om dem med pagineringsfixen.`);
