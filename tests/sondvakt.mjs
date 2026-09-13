// tests/sondvakt.mjs — VAKTERNA ÖVER VÅRA MÄTINSTRUMENT, TESTLÅSTA.
//
// Grundarorder 2026-08-14: "Vi behöver eliminera att dessa fel uppstår."
// Sju sondfel på ett dygn mot ett enda produktionsfel. Modulen lib/sondvakt.js gör de tre
// vanligaste avläsningarna omöjliga att hoppa över — och KÄLLVAKTEN nedan gör felmönstren
// omöjliga att återinföra, på samma sätt som claims-audit och kopidetektorn.
//
// VAKTENS PREMISS (Verifieringsplikten p.5):
//   FÅNGAR: `?? ` mot process.env (tom sträng är inte nullish) och `.catch(() => [])`-mönstret
//           som förvandlar ett fel till ett tomt fynd — i scripts/probe-*.mjs och lib/sondvakt.
//   BLIND:  källvakten läser TEXT. En sond kan svälja fel på hundra andra sätt (egen try/catch,
//           en tom array som default-parameter, ett villkor som aldrig är sant). Den stänger de
//           två mönster som FAKTISKT fällde oss, inte kategorin "sonden ljuger".
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { kravEnv, kravKolumner, aldrigTyst } from '../lib/sondvakt.js';
import { prissattningsdom } from '../lib/prissattningsdom.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

describe('SONDVAKT · instrumenten hålls till samma krav som produktionen', () => {
  test('SV-01 · tom miljövariabel är SAKNAD, inte ett värde (422-buggen)', () => {
    process.env.SV_TEST_TOM = '';
    assert.throws(() => kravEnv('SV_TEST_TOM'), /saknas eller är TOM/);
    process.env.SV_TEST_TOM = '   ';
    assert.throws(() => kravEnv('SV_TEST_TOM'), /saknas eller är TOM/,
      'bara blanksteg är också tomt — annars blir avsändaren " " och Resend svarar 422');
    delete process.env.SV_TEST_TOM;
    assert.throws(() => kravEnv('SV_TEST_TOM'), /saknas eller är TOM/);
    process.env.SV_TEST_TOM = 'analys@arvoflow.se';
    assert.equal(kravEnv('SV_TEST_TOM'), 'analys@arvoflow.se');
    delete process.env.SV_TEST_TOM;
  });

  test('SV-02 · fallback används bara när den uttryckligen begärts', () => {
    process.env.SV_TEST_F = '';
    assert.equal(kravEnv('SV_TEST_F', { fallback: 'reserv' }), 'reserv');
    delete process.env.SV_TEST_F;
  });

  test('SV-03 · saknad kolumn ger felet OCH de faktiska kolumnerna (updated_at-buggen)', async () => {
    const fejkDb = () => Promise.resolve([
      { column_name: 'id' }, { column_name: 'status' }, { column_name: 'done_at' },
    ]);
    await assert.rejects(
      () => kravKolumner(fejkDb, 'ingest_jobs', ['status', 'updated_at']),
      (e) => {
        assert.match(e.message, /saknar kolumn\(er\): updated_at/);
        // Det avgörande: felet SKA visa vad som finns, annars gissar nästa läsare igen.
        assert.match(e.message, /faktiska kolumner:.*done_at/);
        return true;
      },
    );
  });

  test('SV-04 · tabell som inte finns är ett fel, aldrig ett tomt resultat', async () => {
    const tomDb = () => Promise.resolve([]);
    await assert.rejects(() => kravKolumner(tomDb, 'finns_inte', ['x']), /finns inte i databasen/);
  });

  test('SV-05 · aldrigTyst kastar vidare i stället för att svälja', async () => {
    await assert.rejects(
      () => aldrigTyst(Promise.reject(new Error('kolumn saknas')), 'läsning av ingest_jobs'),
      (e) => {
        assert.match(e.message, /läsning av ingest_jobs FELADE: kolumn saknas/);
        assert.match(e.message, /aldrig som ett fynd/);
        return true;
      },
    );
    assert.deepEqual(await aldrigTyst(Promise.resolve([1, 2]), 'ok'), [1, 2]);
  });

  // ── KÄLLVAKTEN: mönstren får inte återuppstå ────────────────────────────────────────────────
  const sondFiler = () => readdirSync(join(ROOT, 'scripts'))
    .filter((f) => /^(probe|skicka|diag)-.*\.mjs$/.test(f))
    .map((f) => [f, readFileSync(join(ROOT, 'scripts', f), 'utf8')]);

  test('SV-06 · ingen sond använder ?? mot process.env (tom sträng är inte nullish)', () => {
    const brott = [];
    for (const [namn, kod] of sondFiler()) {
      kod.split('\n').forEach((rad, i) => {
        if (/process\.env\.\w+\s*\?\?/.test(rad) && !/sondvakt-ok:/.test(rad)) {
          brott.push(`${namn}:${i + 1}`);
        }
      });
    }
    assert.deepEqual(brott, [],
      `?? mot process.env — en tom hemlighet passerar som ett värde (använd kravEnv eller ||):\n  ${brott.join('\n  ')}`);
  });

  test('SV-07 · ingen sond förvandlar ett fel till ett tomt fynd', () => {
    const brott = [];
    for (const [namn, kod] of sondFiler()) {
      kod.split('\n').forEach((rad, i) => {
        // Kommentarsrader hoppas över. Utan det fällde vakten sin egen dokumentation — den rad
        // som BESKRIVER mönstret för nästa läsare. En vakt som larmar på förklaringen får folk
        // att radera förklaringen, och då är läxan borta men buggen kvar.
        if (/^\s*(\/\/|\*|\/\*)/.test(rad)) return;
        // ── VAKTEN SÅG BARA DEN NAKNA FORMEN (utökad 2026-08-19) ──────────────────────────
        // Regexen matchade enbart `.catch(() => [])` — noll argument. Den 19 augusti skrev jag
        // `.catch((e) => { console.log('DB-fel:', e.message); return []; })` i en ny sond, och
        // vakten var grön. Den formen är den INSIDIÖSARE av de två: den loggar, alltså ser den
        // ansvarsfull ut, och ändå blir felet ett tomt resultat som rapporteras som "0 fynd".
        // Precis så hände det: en kolumn som inte fanns gjorde 48 rader till 0 motsägelser.
        // Nu fångas båda formerna — med parameter, med blockkropp, med logg.
        //   (a) .catch(() => [])                             naken
        //   (b) .catch((e) => { ...; return []; })           parameter + block + logg
        const naken = /\.catch\(\s*\(?\s*\w*\s*\)?\s*=>\s*(\[\s*\]|null|\{\s*\}|\(\s*\{\s*\}\s*\))\s*\)/.test(rad);
        // OBS: `[^)]*` fungerar INTE här — parameterlistan `(e)` innehåller själv en parentes,
        // så mönstret nådde aldrig fram till pilen. Första vidgningen såg därför fortfarande inte
        // den loggande formen, trots att kommentaren påstod det. Sabotaget avslöjade det; ett
        // grönt test på den ändringen hade varit grönt på fel grund.
        const block = /\.catch\(\s*\(?\s*\w*\s*\)?\s*=>\s*\{[^}]*\breturn\s+(\[\s*\]|null|\{\s*\})\s*;?\s*\}/.test(rad);
        if ((naken || block) && !/sondvakt-ok:/.test(rad)) {
          brott.push(`${namn}:${i + 1}`);
        }
      });
    }
    assert.deepEqual(brott, [],
      `Fel sväljs och blir ett tomt fynd (använd aldrigTyst, eller motivera med // sondvakt-ok:):\n  ${brott.join('\n  ')}`);
  });

  test('SV-08 · ingen sond bär död kod efter process.exit', () => {
    // 2026-08-21: jag la till en ny mätning i probe-enhetsfelet.mjs — EFTER filens
    // `process.exit(0)`. Sonden kördes, rapporterade «klar», och producerade exakt samma utfall
    // som förra körningen. Det gröna såg identiskt ut med ett grönt som faktiskt mätt, och bara
    // «nothing to commit» i workflow-loggen avslöjade att ingenting nytt hade räknats.
    //
    // Det är samma sjukdom som hela obduktionen handlar om, i mätinstrumentet: ett utfall som
    // betyder «jag tittade inte», återgivet som «jag tittade». Åttonde gången under obduktionen
    // som verktyget var felet och inte systemet.
    const brott = [];
    for (const [namn, kod] of sondFiler()) {
      const rader = kod.split('\n');
      // Ett `process.exit` inuti en gren (if/else, en rad med `{`) är ett legitimt tidigt avbrott.
      // Vakten letar bara efter den TOPPNIVÅ-sats som avslutar filen och sedan följs av kod.
      const sista = rader.findIndex((r) => /^process\.exit\(/.test(r));
      if (sista === -1) continue;
      const efter = rader.slice(sista + 1)
        .filter((r) => r.trim() !== '' && !/^\s*(\/\/|\*|\/\*)/.test(r.trim()));
      if (efter.length > 0) {
        brott.push(`${namn}: ${efter.length} kodrad(er) efter process.exit på rad ${sista + 1} — ` +
          `första: «${efter[0].trim().slice(0, 60)}»`);
      }
    }
    assert.deepEqual(brott, [],
      'kod efter ett toppnivå-process.exit körs aldrig. Sonden rapporterar «klar» utan att ha ' +
      'mätt, och utfallet är omöjligt att skilja från en körning som mätte:\n  ' + brott.join('\n  '));
  });

  test('SV-10 · källvakten läser faktiskt några sonder (annars grön av tomhet)', () => {
    const n = sondFiler().length;
    assert.ok(n >= 10, `hittade bara ${n} sondfiler — mönstret matchar inte längre katalogen`);
  });

  test('SV-09 · ingen sond frågar på ett RÅTT fingerprint', () => {
    // 2026-08-21: sonden frågade `fingerprint LIKE 'mail:%'` och svarade «0 av 48 kom via
    // mail-in». Men lib/invoice-store.js HASHAR fingerprinten före lagring (sha256, 32 tecken),
    // så kolumnen kan ALDRIG innehålla prefixet — frågan var dömd att svara noll oavsett
    // verkligheten. Jag höll på att bygga slutsatsen «13 tysta förluster i moaten» på det talet.
    //
    // Det är den farligaste sorten av mätfel: ett värde som pekar åt ett dramatiskt håll och
    // råkar bekräfta hypotesen man redan har. Nionde gången under obduktionen som instrumentet
    // var felet och inte systemet.
    const brott = [];
    for (const [namn, kod] of sondFiler()) {
      kod.split('\n').forEach((rad, i) => {
        if (/^\s*(\/\/|\*|\/\*)/.test(rad.trim())) return;
        // Fångar `fingerprint LIKE '...'` och `fingerprint = 'literal'` — båda jämför mot ett
        // värde som aldrig kan stå i kolumnen. En jämförelse mot en HASHAD variabel är rätt
        // och fälls inte.
        if (/\bfingerprint\s+LIKE\s+'/i.test(rad) || /\bfingerprint\s*=\s*'/i.test(rad)) {
          if (!/sondvakt-ok:/.test(rad)) brott.push(`${namn}:${i + 1}`);
        }
      });
    }
    assert.deepEqual(brott, [],
      'fingerprint-kolumnen bär en sha256-hash (lib/invoice-store.js hashFp). En fråga mot ett ' +
      'rått värde kan bara svara noll — och ett noll som ser ut som ett fynd är värre än inget ' +
      'mätvärde alls. Hasha först:\n  ' + brott.join('\n  '));
  });

  test('SV-11 · varje workflow som pipar en sond genom tee sätter pipefail', () => {
    // 2026-08-22: probe-grindarna dog på FÖRSTA raden (absolut sökväg som inte finns på
    // runnern), och steget rapporterade ändå success. Orsak: `node … | tee fil` returnerar
    // TEE:s exit-kod, alltid 0. Sonden var död i 35 sekunder och såg ut att ha mätt 75 fakturor.
    //
    // Det är obduktionens kärnsjukdom i mätapparaten själv — ett resultat som betyder «jag körde
    // inte» återgivet som «jag körde och allt gick bra» — samma dag jag skrev in den i bibeln.
    // Mätt vid införandet: 35 av 75 workflows saknade pipefail, alltså nästan halva sondflottan.
    const brott = [];
    const dir = join(ROOT, '.github', 'workflows');
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.yml'))) {
      const t = readFileSync(join(dir, f), 'utf8');
      if (!/\|\s*tee\s/.test(t)) continue;
      if (!/set -o pipefail/.test(t)) brott.push(f);
    }
    assert.deepEqual(brott, [],
      'dessa workflows pipar en sond genom `tee` utan `set -o pipefail` — stegets exit-kod blir ' +
      'tee:s (alltid 0), så en kraschad sond rapporterar framgång:\n  ' + brott.join('\n  '));
  });

});

// ── SV-12..13 · SCOPVAKTEN (2026-09-06) ─────────────────────────────────────────────────────
// En odefinierad kv-referens nådde produktion och visades för kunden som ett rått felmeddelande.
// Ingen av 2 136 tester kunde se det, och kunde inte ha gjort det: sviten anropar aldrig
// handler(req, res). Den prövar rena funktioner, källtext och kontrakt — aldrig api-modulens
// exekverbara väg. Villkorsvaktens sjukdom en sista gång: varenda mekanism prövad, själva
// vägen genom filen aldrig.
describe('SV · Scopvakten — statiska fel fälls före deploy', () => {
  const ROT2 = join(dirname(fileURLToPath(import.meta.url)), '..');

  test('SV-12 · vakten är INKOPPLAD i pre-commit-kedjan', () => {
    // En vakt som finns men inte körs är ingen vakt — och tystnaden ser identisk ut med «allt är
    // bra» (bibeln, svitens tysta hål 2026-08-04).
    const hooks = readFileSync(join(ROT2, 'scripts/setup-hooks.mjs'), 'utf8');
    assert.match(hooks, /node scripts\/scopvakt\.mjs/,
      'scopvakten ligger utanför pre-commit — då fångas nästa scope-fel av en kund, inte av oss');
  });

  // ⚠️ OMSKRIVEN TILL BETEENDE 2026-09-13. Den gamla versionen letade strängen
  // `Cannot find module|command not found` i källtexten — alltså EN specifik felmening ur
  // CLI:ns utdata. När vakten lades om till ESLints Node-API försvann strängen och testet föll,
  // trots att skyddet blivit BREDARE (ett try/catch runt lintFiles fångar varje sätt att
  // misslyckas, inte bara det ena). En källtextvakt som pinnar en FELMENING mäter implementation,
  // inte invariant. Det som faktiskt ska hålla är: kom vakten inte fram, avslutar den skilt
  // från noll. Det prövas genom att KÖRA den där den inte kan hitta något att skanna.
  test('SV-13 · vakten skiljer «rent» från «kunde inte köras»', () => {
    const tom = mkdtempSync(join(tmpdir(), 'scopvakt-tom-'));
    const r = spawnSync(process.execPath, [join(ROT2, 'scripts/scopvakt.mjs')], { cwd: tom, encoding: 'utf8' });
    rmSync(tom, { recursive: true, force: true });
    assert.notEqual(r.status, 0,
      'noll filer att skanna är «kunde inte köras», aldrig «inga fel» — en vakt som blir grön av '
      + 'tomhet är grön precis när den behövs som mest');
    assert.match(`${r.stdout}${r.stderr}`, /INTE ett godkännande|grön av tomhet|kunde inte köras/,
      'utfallet måste SÄGA att det inte är ett godkännande, inte bara returnera en kod');
  });

  test('SV-13b · båda tänderna körs — no-undef OCH TDZ', () => {
    // Motprovet mot att en tand tyst faller bort: vakten fällde två skilda produktionsfel
    // (6 september odefinierad identifierare, 10 september TDZ i src/) och båda måste finnas kvar.
    const vakt = readFileSync(join(ROT2, 'scripts/scopvakt.mjs'), 'utf8');
    assert.match(vakt, /'no-undef': 'error'/, 'regeln som fällde 6-septemberfelet måste köras');
    assert.match(vakt, /klassaTdz/, 'TDZ-tanden som fällde 10-septemberfelet måste köras');
  });
});

// ── SV-14..16 · CACHETRÄFFEN (2026-09-09) ────────────────────────────────────────────────────
// `scripts/diag-live.mjs` finns för EN sak: bevisa att en fix nått den utlagda koden. Den skrev
// `cached: true` i sitt eget utfall och drog ändå slutsatser ur talen — run 19 fick tillbaka
// run 18:s dom två sekunder efter Ring 1-omläggningen, och sondens larmrad pekade ut fältnamnen
// som misstänkt när hela svaret var producerat av gårdagens kod.
//
// PRÖVAS SOM BETEENDE, INTE SOM TEXT. En källtextvakt hade bara kunnat se att ordet `cached`
// står i filen — och ordningsinvarianter och avbrott är precis det källtext inte kan bevisa
// (bibeln, 2026-09-09: «ordningsinvarianter kan bara bevisas av beteende»). Sonden körs därför
// mot en riktig HTTP-server som svarar det vi vill pröva, och det som mäts är EXITKODEN.
//
// FÅNGAR: att sonden avslutar 0 på ett cachat svar, alltså rapporterar en grön körning som inte
//   mätt någon deploy.
// BLIND: allt om vad talen BETYDER. Vakten vet bara om sonden vägrade, aldrig om den mätte rätt
//   sak när den inte vägrade.
describe('SV · sonden får aldrig rapportera ett cachat svar som en mätning', () => {
  /** Startar en attrapp av arvoflow.se som svarar `svar` på /api/test-invoice. */
  async function medServer(svar, fn, drojMs = 0) {
    const server = createServer((req, res) => {
      res.setHeader('Content-Type', 'application/json');
      if (req.url.startsWith('/api/token')) return res.end(JSON.stringify({ token: 'attrapp' }));
      req.resume();
      req.on('end', () => setTimeout(() => res.end(JSON.stringify(svar)), drojMs));
    });
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    try { return await fn(`http://127.0.0.1:${server.address().port}`); }
    finally { server.close(); }
  }

  /** Kör sonden skarpt och returnerar dess exitkod — det enda som räknas i CI. */
  function korSonden(bas) {
    return new Promise((resolve) => {
      const p = spawn(process.execPath, [join(ROOT, 'scripts/diag-live.mjs')], {
        cwd: ROOT,
        env: { ...process.env, ARVO_BASE_URL: bas, PDF: 'test-pdfs/microsoft-direkt-usd.pdf' },
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      let ut = '';
      p.stdout.on('data', (d) => { ut += d; });
      p.stderr.on('data', (d) => { ut += d; });
      p.on('close', (kod) => resolve({ kod, ut }));
    });
  }

  const FARSKT = {
    route: 'auto', cached: false,
    extracted: { invoiceNumber: 'MS-1', originalCurrency: 'USD', pricePerSeatMonthly: 131.9 },
    recommendation: {},
  };

  test('SV-14 · ett cachat svar ger RÖTT, inte en varningsrad', async () => {
    const { kod, ut } = await medServer({ ...FARSKT, cached: true }, korSonden);
    assert.equal(kod, 1,
      'sonden avslutade 0 på ett cachat svar — en grön körning läses som ett bevis, och ett '
      + 'bevis som betyder «jag mätte inte» är farligare än ett rött');
    assert.match(ut, /INGEN DEPLOY ÄR MÄTT/, 'skälet måste stå i loggen, inte bara i exitkoden');
  });

  test('SV-15 · ett färskt svar ger GRÖNT — vakten fäller inte allt', async () => {
    // Motprovet. En spärr som fäller varje körning är lika värdelös som ingen spärr (OB-23).
    const { kod, ut } = await medServer(FARSKT, korSonden);
    assert.equal(kod, 0, `sonden fällde ett färskt svar:\n${ut}`);
    assert.match(ut, /Färsk analys/);
  });

  test('SV-17 · svarstiden är en riktig klockavläsning, inte en nolla', async () => {
    // Det andra vittnet mot serverns egen utsaga. Ett observationsfält som tyst kan bli 0 är
    // precis den familj som gav «25 LÄSTA» och de fyra tysta null:en — och till skillnad från
    // dem syns en nolla här som ett trovärdigt tal. Servern dröjer därför 400 ms, och sonden
    // måste rapportera minst 0,3 s: ett sabotage som nollar klockan fäller nu.
    const langsam = { ...FARSKT };
    const { ut } = await medServer(langsam, korSonden, 400);
    const m = ut.match(/svarstid (\d+[.,]\d) s/);
    assert.ok(m, `svarstiden skrevs inte ut alls:\n${ut}`);
    assert.ok(Number(m[1].replace(',', '.')) >= 0.3,
      `svarstiden rapporterades som ${m[1]} s för ett svar som dröjde 400 ms — vittnet mäter inte`);
  });

  test('SV-16 · ett svar UTAN cache-fält behandlas som färskt, inte som cachat', async () => {
    // Gränsfallet åt andra hållet: `cached` saknas helt (en äldre svarsform, eller ett felsvar).
    // Att läsa `undefined` som «cachat» hade gjort varje felsvar till ett cachelarm och därmed
    // dolt det verkliga felet bakom fel diagnos — samma sjukdom som larmet vi just lagade.
    const { kod } = await medServer({ route: 'auto', extracted: { invoiceNumber: 'MS-1' } }, korSonden);
    assert.equal(kod, 0);
  });
});

// ── SV-18..19 · KOSTNADSMÄTAREN (2026-09-10, oraklets spricka 8) ─────────────────────────────
// Varje grind har ett test som bevisar att den fäller rätt sak. Ingen mätte deras SAMLADE pris.
// En ny grind kunde merga med noll fällda tester och tysta trettio procent av fakturorna —
// grundarens enda KPI — utan att någon såg det förrän en människa räknade i rummet.
//
// FÅNGAR: att mätaren kopplas ur pre-commit, eller att facit försvinner.
// BLIND: om FACIT uppdateras utan att någon läser diffen ser mätaren inget alls. Ett facit som
//   anpassas till koden är ingen mätning längre — den kontrollen är mänsklig och kan inte
//   automatiseras bort, och därför skriver skriptet ut den varningen vid varje `--update`.
describe('SV · grindarnas samlade pris mäts före commit', () => {
  test('SV-18 · mätaren är inkopplad i pre-commit-kedjan', () => {
    const hook = readFileSync(join(ROOT, 'scripts/setup-hooks.mjs'), 'utf8');
    assert.match(hook, /node scripts\/prissattningsgrad\.mjs/,
      'en mätare som inte körs är ingen mätare — samma sjukdom som en testfil utanför sviten');
    // ⚠️ FÖRSTA VERSIONEN LETADE `STATUS=$?` VAR SOM HELST I FILEN (rättat 2026-09-10, fientlig
    // granskning). Kedjan har åtta grindar och var och en har raden — att ta bort den ur JUST
    // prissättningsblocket fällde noll test. En vakt som matchar grannens rad vaktar grannen.
    const block = hook.slice(hook.indexOf('node scripts/prissattningsgrad.mjs'));
    const slut = block.indexOf('fi');
    assert.match(block.slice(0, slut), /STATUS=\$\?/,
      'exitkoden måste fångas i prissättningsblocket självt — annars kan mätaren aldrig stoppa commiten');
    // Larmraderna måste dessutom SYNAS. Grepet filtrerade bort FEL-raderna, så en människa såg
    // «✓ Oförändrad» medan 77 fixturer kraschade — samma blindhet som domen hade.
    assert.match(block.slice(0, slut), /FIXTURER KRASCHAR/,
      'kraschlarmet måste nå människan i hooken, inte bara exitkoden');
  });

  test('SV-20 · domen jämför HELA sammanfattningen — prövad genom ANROP, inte genom ord', () => {
    // ⚠️ FÖRRA VERSIONEN VAR EN KÄLLTEXTVAKT (`assert.match` mot två strängar) och gick att göra
    // HELT OVERKSAM på tre sätt utan att röra en enda av dem (fientlig granskning 2026-09-10):
    //   `if (false && sammanfattning.fel > …)` · samma på avvikelsekontrollen · filtret begränsat
    //   till nyckeln 'prissatt'. Det sista ÅTERINFÖR precis den brist granskningen av a6f776b
    //   stängde — 77 kraschade fixturer rapporterade som «✓ Oförändrad». Alla tre: 0 fällda test.
    // Domen bor därför i `lib/prissattningsdom.js` och prövas här av BETEENDE.
    const facit = { matt: '2026-09-10', fixturer: 334, prissatt: 131, tystad: 163, offert: 40, fel: 0 };
    const oforandrad = { fixturer: 334, prissatt: 131, tystad: 163, offert: 40, fel: 0 };
    assert.equal(prissattningsdom(oforandrad, facit).blockerar, false, 'en oförändrad korpus ska passera');

    // GRANSKARENS EGET FALL, med hans mätta tal: en grind som KASTAR för bredband. `prissatt` står
    // still — det är hela poängen — och en dom som bara läser den nyckeln säger «oförändrad».
    const kraschad = { fixturer: 334, prissatt: 131, tystad: 86, offert: 40, fel: 77 };
    const d = prissattningsdom(kraschad, facit);
    assert.equal(d.blockerar, true, '77 kraschade fixturer måste blockera');
    assert.equal(d.kod, 'krasch', 'en krasch får en EGEN kod — den ska aldrig kunna frysas bort som en flyttad gräns');

    // Varje nyckel måste bära: en ändring i ENBART `tystad` (en grind som väljer tystnad utan att
    // krascha) är lika osynlig för en dom som bara läser `prissatt`.
    for (const nyckel of ['fixturer', 'tystad', 'offert']) {
      const ett = { ...oforandrad, [nyckel]: oforandrad[nyckel] - 1 };
      assert.equal(prissattningsdom(ett, facit).blockerar, true, `en ändring i ${nyckel} måste blockera`);
      assert.equal(prissattningsdom(ett, facit).kod, 'avvikelse');
    }

    // Motprovet: utan facit får domen ALDRIG blockera — första körningen i en ny miljö är inte
    // ett fel, och en spärr som fäller allt är lika värdelös som ingen (OB-23:s läxa).
    assert.equal(prissattningsdom(oforandrad, null).blockerar, false);
    assert.equal(prissattningsdom(oforandrad, null).kod, 'ingen_facit');

    // ── ANDRA GRANSKNINGSVARVET (2026-09-10): NYCKEL-BORTTAGNING, inte bara nyckel-BEGRÄNSNING.
    // Granskaren tog bort `fel:` och `tystad:` ur skriptets `sammanfattning`-literal och tvingade
    // en verklig krasch i fixturen `mob-13`. Domen svarade «✓ Oförändrad», exit 0 — samma felbild
    // som SV-20 just stängt, en nivå djupare: `Object.keys(sammanfattning)` frågar INDATA vilka
    // nycklar som ska jämföras, och ett objekt som saknar en nyckel tystar sin egen avvikelse.
    for (const borttagen of ['fel', 'tystad', 'fixturer', 'prissatt', 'offert']) {
      const stympad = { ...oforandrad };
      delete stympad[borttagen];
      const s = prissattningsdom(stympad, facit);
      assert.equal(s.blockerar, true, `en saknad nyckel (${borttagen}) måste blockera`);
      assert.equal(s.kod, 'omatt', 'en saknad nyckel är ett OKÄNT — aldrig en avvikelse att frysa bort');
    }
    // Och det gäller ÄVEN när en krasch samtidigt är dold: utan `fel` finns inget att jämföra.
    assert.equal(prissattningsdom({ fixturer: 334, prissatt: 131, tystad: 86, offert: 40 }, facit).kod, 'omatt');
    // ── TREDJE VARVET: SAMMA HÅL PÅ FACIT-SIDAN. Granskarens bevis, med hans egna tal: ett facit
    // med BARA `fixturer` godkände en korpus där prissättningsgraden kollapsat till NOLL.
    const halvt = prissattningsdom({ fixturer: 334, prissatt: 0, tystad: 0, offert: 0, fel: 0 }, { fixturer: 334 });
    assert.equal(halvt.blockerar, true, 'ett halvt facit får aldrig godkänna en mätning');
    assert.equal(halvt.kod, 'trasigt_facit', 'och det är TRASIGT, inte «inget facit» — de kräver motsatta åtgärder');
    // Tre tillstånd som aldrig får se likadana ut:
    assert.equal(prissattningsdom(oforandrad, {}).kod, 'ingen_facit', 'tomt facit = första körningen');
    assert.equal(prissattningsdom(oforandrad, {}).blockerar, false, 'och den blockerar inte');
    assert.equal(prissattningsdom(oforandrad, { ...facit }).kod, 'ok', 'ett helt facit jämför');
    // Ett tal som blivit sträng är inte ett tal: `'334'` gav förut texten «fixturer: 334 → 334».
    assert.equal(prissattningsdom(oforandrad, { ...facit, fixturer: '334' }).kod, 'trasigt_facit');
    for (const saknad of ['prissatt', 'tystad', 'offert', 'fel']) {
      const stympat = { ...facit };
      delete stympat[saknad];
      assert.equal(prissattningsdom(oforandrad, stympat).kod, 'trasigt_facit', `facit utan ${saknad} måste fällas`);
    }

    // Och skriptet måste faktiskt ANVÄNDA domen — en ren funktion ingen anropar är död kod.
    const src = readFileSync(join(ROOT, 'scripts/prissattningsgrad.mjs'), 'utf8');
    assert.match(src, /prissattningsdom\(sammanfattning, facit\)/, 'skriptet måste anropa domen');
    assert.match(src, /if \(dom\.blockerar\) process\.exit\(1\)/, 'och dess utfall måste styra exitkoden');
  });

  test('SV-19 · facit finns och bär sina fyra utfall åtskilda', () => {
    const facit = JSON.parse(readFileSync(join(ROOT, 'tests/fixtures/prissattningsgrad-facit.json'), 'utf8'));
    for (const k of ['fixturer', 'prissatt', 'tystad', 'offert', 'fel']) {
      assert.equal(typeof facit[k], 'number', `facit saknar ${k}`);
    }
    assert.equal(facit.fel, 0,
      'ett FEL får aldrig frysas in som normalläge — då blir en krasch omöjlig att skilja från '
      + 'ett medvetet beslut, vilket är hela felfamiljen mätaren finns mot');
    assert.equal(facit.fixturer, facit.prissatt + facit.tystad + facit.offert + facit.fel,
      'delarna måste summera till helheten — annars räknas någon fixtur två gånger eller inte alls');
  });
});
