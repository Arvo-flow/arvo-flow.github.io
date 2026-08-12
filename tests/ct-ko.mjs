// tests/ct-ko.mjs — KÖN OCH VÄRMAREN får aldrig bli en väg för ett påstående.
//
// Kön finns för att crt.sh svarar ~30 % av gångerna och en besökare bara har ett försök. Den
// flyttar priset till natten. Men allt som rör dörren måste tåla samma fråga som resten av huset:
// kan den här mekanismen få oss att säga något vi inte vet? Testerna nedan låser att svaret är nej.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { koaDoman, hamtaKo, taBortFranKo } from '../lib/ct-ko.js';

// Minimal KV-attrapp: samma yta som lib/kv.js ger (get/set), inget mer.
const kvAttrapp = (start = {}) => {
  const data = { ...start };
  return { get: async (k) => data[k] ?? null, set: async (k, v) => { data[k] = v; }, _data: data };
};

describe('ct-kön · en domän, aldrig en person', () => {
  test('köar en giltig domän', async () => {
    const kv = kvAttrapp();
    assert.equal(await koaDoman('skanska.se', kv), true);
    assert.deepEqual(await hamtaKo(kv), ['skanska.se']);
  });

  test('en mejladress är INTE en domän — kön lagrar aldrig en person', async () => {
    const kv = kvAttrapp();
    assert.equal(await koaDoman('anna@skanska.se', kv), false);
    assert.deepEqual(await hamtaKo(kv), [], 'ingenting med ett @ får hamna i kön');
  });

  test('dubbletter växer aldrig kön', async () => {
    const kv = kvAttrapp();
    await koaDoman('volvo.se', kv);
    assert.equal(await koaDoman('VOLVO.SE', kv), false, 'versaler är samma domän');
    assert.deepEqual(await hamtaKo(kv), ['volvo.se']);
  });

  test('utan KV är köandet en tyst no-op — en förbättring, aldrig ett krav', async () => {
    assert.equal(await koaDoman('skanska.se', null), false);
    assert.deepEqual(await hamtaKo(null), []);
  });

  test('bara avklarade tas bort — misslyckade ligger kvar för nästa natt', async () => {
    const kv = kvAttrapp({ 'ct:ko:v1': ['a.se', 'b.se', 'c.se'] });
    assert.equal(await taBortFranKo(['b.se'], kv), 1);
    assert.deepEqual(await hamtaKo(kv), ['a.se', 'c.se'],
      'att slänga en domän källan vägrade i dag vore att göra vår otur till ett permanent nej');
  });

  test('taket skyddar mot obegränsad tillväxt', async () => {
    const kv = kvAttrapp({ 'ct:ko:v1': Array.from({ length: 500 }, (_, i) => `d${i}.se`) });
    assert.equal(await koaDoman('ny.se', kv), false);
    assert.equal((await hamtaKo(kv)).length, 500);
  });
});
