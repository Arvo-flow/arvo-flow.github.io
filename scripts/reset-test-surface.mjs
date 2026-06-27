// scripts/reset-test-surface.mjs — forcerad nollställning av testytan (rent pass på begäran).
// Raderar BARA testidentitetens data (hårdkodat TEST_EMAIL i lib/test-surface.js). Kör i Actions
// med DATABASE_URL. Efter detta: vidarebefordra de 26 fakturorna → "26 in, N analyser ut" läses rent.
import { forceResetTestSurface, TEST_EMAIL } from '../lib/test-surface.js';

const { deleted, jobs } = await forceResetTestSurface();
console.log(`Nollställde testytan (${TEST_EMAIL}): ${deleted} analyser + ${jobs} kö-jobb raderade.`);
console.log('Ren yta. Vidarebefordra de 26 fakturorna nu — drainen är snabb (parallell + paginerad).');
