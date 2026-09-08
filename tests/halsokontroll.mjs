// tests/halsokontroll.mjs — HÄLSAN MÄTS PÅ SYSTEMET, INTE PÅ ETT VARIABELNAMN.
//
// ══ BAKGRUNDEN (2026-09-08) ════════════════════════════════════════════════════════════════
// `api/health.mjs` listade `'DATABASE_URL'` som CRITICAL och svarade 503 när just det NAMNET
// saknades. `lib/db.js` godtar fyra namn, och Vercels egen Postgres-integration sätter
// `POSTGRES_URL`. Health mätte alltså ett ANNAT OBJEKT än det koden använder.
//
// Följden var inte kosmetisk. `canary.yml` pingar endpointen varje timme och öppnar ett
// GH-ärende vid 503. MÄTT: ärende #79 bär 852 kommentarer sedan 9 juli, #75 bar 386
// dessförinnan — två månader av timvisa «produktion nere» på ett system som lagrade analyser
// hela tiden (jag läste en, tidsstämplad samma dag som larmet gick).
//
// Ett larm som ALLTID är rött är ett larm ingen läser. Det är exakt så smyghöjningsvakten
// stängdes av 2026-07-20, till en kostnad av 16 dygns osedda prishöjningar. Skillnaden här är
// att vakten inte ens stängdes av — den fortsatte skrika, och blev bakgrundsljud.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   UTLÖSER larmet: att health hårdkodar ett DB-variabelnamn i stället för att fråga
//     `lib/db.js`, och att de två listorna kan glida isär.
//   UTLÖSER DET INTE: en genuint saknad databas — `dbUrlKalla()` returnerar då `null` och 503
//     är RÄTT svar. Vakten skiljer «fel fråga» från «riktigt fel», och det är hela poängen.
//   BLIND: den ser KODEN, aldrig produktionen. Att health frågar rätt bevisar inte att Vercel
//     har någon av variablerna satt — det mäts av `scripts/probe-cronsecret.mjs` mot den
//     utlagda sajten, och den mätningen måste göras separat.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { dbUrlKalla, DB_URL_ALIAS, getDb } from '../lib/db.js';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HEALTH = readFileSync(join(ROT, 'api/health.mjs'), 'utf8');
const DB = readFileSync(join(ROT, 'lib/db.js'), 'utf8');

/** Källtext utan kommentarer — en kommentar som NÄMNER ett namn är inte en fråga till env. */
const kod = (s) => s.split('\n').map((r) => r.replace(/\/\/.*$/, '')).join('\n')
  .replace(/\/\*[\s\S]*?\*\//g, '');

describe('HK · Hälsan mäts på systemet, inte på ett variabelnamn', () => {
  test('HK-01 · health hårdkodar inget DB-variabelnamn', () => {
    // Kärnan. Varje namn i listan är ett sätt att ställa fel fråga; att räkna upp dem här och
    // förbjuda dem i health är billigare än att upptäcka nästa glidning efter 852 falsklarm.
    const h = kod(HEALTH);
    const traffar = DB_URL_ALIAS.filter((namn) => new RegExp(`['"\`]${namn}['"\`]`).test(h));
    assert.deepEqual(traffar, [],
      `health frågar efter ${traffar.join(', ')} direkt. Fråga lib/db.js i stället — annars `
      + 'mäter övervakningen ett annat objekt än produktionen använder.');
    assert.match(h, /dbUrlKalla\s*\(/, 'health måste fråga den enda sanningen');
  });

  test('HK-02 · listan finns på ETT ställe, och getDb använder den', () => {
    // Två listor är två sanningar, och den som ändras är inte nödvändigtvis den som läses.
    const d = kod(DB);
    assert.match(d, /export const DB_URL_ALIAS/, 'listan måste vara exporterad och enda källan');
    // `getDb` får inte läsa env direkt — då kan den godta ett namn health aldrig ser.
    const getDbKropp = d.slice(d.indexOf('export function getDb'));
    assert.doesNotMatch(getDbKropp, /process\.env\.[A-Z_]+/,
      'getDb läser env direkt och kan då godta ett namn dbUrlKalla inte känner — samma glidning, ny riktning');
    assert.match(getDbKropp, /dbUrlKalla\s*\(/, 'getDb måste gå via samma uppslag');
  });

  test('HK-03 · INVARIANTEN över hela fältet: varje godtaget namn är synligt', () => {
    // ⚠️ PROVET MÄTTE LISTAN MOT SIG SJÄLV (rättat av sabotaget). Loopen nedan itererar över
    // DB_URL_ALIAS, så sabotaget «ta bort POSTGRES_URL ur listan» fällde NOLL — det borttagna
    // namnet prövades helt enkelt inte längre. Grön av tomhet, i vakten mot precis den formen.
    //
    // Två namn är LASTBÄRANDE och ankras därför oberoende av listan:
    //   DATABASE_URL   — vår egen namngivning; den GitHub Actions och sonderna använder
    //   POSTGRES_URL   — Vercels egen Postgres-integration sätter detta, och det var just
    //                    dess frånvaro ur healths fråga som gav 852 falsklarm
    // Försvinner något av dem tyst ur listan är vi tillbaka i utgångsläget.
    for (const maste of ['DATABASE_URL', 'POSTGRES_URL']) {
      assert.ok(DB_URL_ALIAS.includes(maste),
        `${maste} är borta ur DB_URL_ALIAS. Det namnet BÄR anslutningen i produktion respektive `
        + 'i Actions — utan det rapporterar health saknad databas på ett friskt system igen.');
    }

    // Inte ett stickprov. Varje alias som getDb kan använda MÅSTE dbUrlKalla kunna namnge —
    // annars finns ett tillstånd där databasen fungerar och health säger att den saknas.
    for (const namn of DB_URL_ALIAS) {
      assert.equal(dbUrlKalla({ [namn]: 'postgres://x' }), namn,
        `${namn} godtas av getDb men syns inte för health`);
    }
    // Och det ENDA som betyder «ingen databas» är att inget av dem bär ett värde.
    assert.equal(dbUrlKalla({}), null);
    assert.equal(dbUrlKalla({ DATABASE_URL: '   ' }), null, 'en tom sträng är ingen anslutning');
    assert.equal(dbUrlKalla({ NAGOT_ANNAT: 'postgres://x' }), null,
      'ett okänt namn får aldrig räknas som en anslutning');
    // Prioriteten är listans ordning — deterministisk, aldrig beroende på env-objektets form.
    assert.equal(dbUrlKalla({ POSTGRES_URL: 'b', DATABASE_URL: 'a' }), 'DATABASE_URL');
  });

  test('HK-04 · MOTPROVET: en genuint saknad databas larmar fortfarande', () => {
    // En vakt som gör 503 omöjligt vore lika fel som den som gör det oundvikligt. Health måste
    // fortfarande falla när INGEN anslutning finns — det är då larmet är sant.
    const h = kod(HEALTH);
    assert.match(h, /if \(!dbKalla\) missing\.push/,
      'utan anslutning måste health fortfarande rapportera saknad — annars är larmet dött');
    assert.match(h, /ok \? 200 : 503/, '503 ska stå kvar för det verkliga felet');
    // Och getDb ska svara null i just det läget, inte kasta.
    const spar = { ...process.env };
    for (const k of DB_URL_ALIAS) delete process.env[k];
    try {
      assert.equal(getDb(), null, 'utan anslutning returnerar getDb null — den kraschar aldrig');
    } finally {
      for (const [k, v] of Object.entries(spar)) if (DB_URL_ALIAS.includes(k)) process.env[k] = v;
    }
  });

  test('HK-05 · källan NAMNGES i svaret, men värdet aldrig', () => {
    // Ett larm som bara säger «saknas» går inte att åtgärda; ett som säger via VILKET namn gör
    // det. Men en anslutningssträng bär lösenordet — den får aldrig lämna processen.
    const h = kod(HEALTH);
    assert.match(h, /via \$\{dbKalla\}/, 'svaret ska namnge källan så felet går att diagnostisera');
    assert.doesNotMatch(h, /process\.env\[dbKalla\]|process\.env\[.*ALIAS/,
      'health får aldrig läsa VÄRDET — bara namnet');
  });
});
