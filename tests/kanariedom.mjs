// tests/kanariedom.mjs — KANARIEFÅGELNS DOM, TESTLÅST.
//
// Bakgrund i `lib/kanariedom.js`. Kort: domen låg i en shell-heredoc inuti canary.yml, ingen svit
// kunde nå den, och tre av fyra grenar var döda — `ok` sedan första commiten (saknad parentes i en
// `python3 -c`-rad, sväljd av `|| echo "false"`), `down` på grund av `bash -e`, och «kunde inte
// tolka svaret» hopblandad med «servern sa nej». Resultat: 913 kommentarer på ärende #79.
//
// Sviten prövar därför två saker som den gamla konstruktionen gjorde omöjliga:
//   1. att den GRÖNA grenen går att nå (KD-01) — det var den som var död i två månader,
//   2. att `scripts/kanariedom.mjs` körs som en RIKTIG PROCESS (KD-11..13), eftersom ett test som
//      anropar funktionen direkt aldrig kan se att ARGV-läsningen eller utskriften är fel.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { kanariedom, KANARIE } from '../lib/kanariedom.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Kroppen är ORDAGRANT den produktionen svarade 2026-09-18 12:28:22, hämtad ur kommentar
// #5666367849 på ärende #79. Ett påhittat testvärde kan anpassas till koden; ett avläst kan inte.
const FRISK = JSON.stringify({
  ok: true,
  timestamp: '2026-09-18T12:28:22.252Z',
  checks: {
    ANTHROPIC_API_KEY: '✓ present',
    databas: '✓ present (via POSTGRES_URL_DATABASE_URL)',
    RESEND_API_KEY: '✓ present',
    KV_REST_API_URL: '✓ present',
    KV_REST_API_TOKEN: '✓ present',
    ARVO_ADMIN_SECRET: '✓ present',
    CRON_SECRET: '✓ present',
    ARVO_BASE_URL: '— not_set',
    ARVO_BYPASS_SECRET: '✓ present',
    RESEND_FROM: '✓ present',
  },
});

// Och den produktionen svarade 2026-07-09, då larmet var SANT (ärende #79:s första kropp).
const SJUK = JSON.stringify({
  ok: false,
  timestamp: '2026-07-09T18:44:50.182Z',
  checks: { ANTHROPIC_API_KEY: '✓ present', DATABASE_URL: '✗ MISSING' },
  missing: ['DATABASE_URL'],
  hint: 'Sätt saknade variabler i Vercel → Settings → Environment Variables',
});

describe('KANARIEDOM · larmet kan säga både ja och nej', () => {
  test('KD-01 · den FRISKA produktionens verkliga svar ger `ok` och inget larm', () => {
    const d = kanariedom({ curlExit: 0, httpCode: 200, body: FRISK });
    assert.equal(d.status, KANARIE.OK,
      'detta är regressionen: exakt den här kroppen gav `bad_response` i ~60 timmar, eftersom '
      + 'python-raden saknade en parentes och felet svaldes av `|| echo "false"`');
    assert.equal(d.larmar, false, 'en frisk produktion får inte öppna ett ärende');
    assert.deepEqual(d.atgard, [], 'det finns inget att åtgärda — och då ska inget påstås');
  });

  test('KD-02 · curl som inte kom fram är `down`, och det är en fråga om PRODUKTIONEN', () => {
    // Grenen var onåbar i workflowen: `bash -e` avbröt steget på raden ovanför `CURL_EXIT=$?`,
    // och efterföljande steg hoppades över. Det enda fall en kanariefågel finns till för.
    for (const kod of [6, 7, 28, 35, 60]) {
      const d = kanariedom({ curlExit: kod, httpCode: '000', body: '' });
      assert.equal(d.status, KANARIE.NERE, `curl-exit ${kod} ska ge down`);
      assert.equal(d.objekt, 'produktion');
      assert.equal(d.larmar, true);
      assert.ok(d.atgard.length > 0, 'ett larm utan åtgärd är ett larm ingen kan agera på');
    }
  });

  test('KD-03 · ett saknat curlExit KASTAR — det får aldrig låna utseendet av ett lyckat anrop', () => {
    for (const v of [undefined, null, '', '0', NaN, Infinity, {}, []]) {
      assert.throws(() => kanariedom({ curlExit: v, httpCode: 200, body: FRISK }), /curlExit/,
        `${JSON.stringify(v)} är inte ett svar på frågan «kom curl fram?»`);
    }
    // Motprovet: 0 ÄR ett svar, och ska gå igenom.
    assert.equal(kanariedom({ curlExit: 0, httpCode: 200, body: FRISK }).status, KANARIE.OK);
  });

  test('KD-04 · HTTP 503 med det verkliga juli-svaret ger `error_503` mot produktionen', () => {
    const d = kanariedom({ curlExit: 0, httpCode: 503, body: SJUK });
    assert.equal(d.status, 'error_503');
    assert.equal(d.objekt, 'produktion');
    assert.equal(d.larmar, true);
  });

  test('KD-05 · HTTP 200 med ok:false är `ohalsosam`, och skälet kommer UR SVARET', () => {
    const d = kanariedom({ curlExit: 0, httpCode: 200, body: SJUK });
    assert.equal(d.status, KANARIE.OHALSOSAM);
    assert.equal(d.objekt, 'produktion');
    assert.match(d.rubrik, /DATABASE_URL/,
      'endpointen namnger själv vad som saknas — vi ska inte gissa ett skäl (BK-06)');
    assert.ok(d.atgard.some((r) => r.includes('DATABASE_URL')));
  });

  test('KD-06 · HTTP 200 som inte är JSON gäller VAKTEN, inte driften', () => {
    for (const kropp of ['<!DOCTYPE html><html>…', '', 'Not Found', '{trasig']) {
      const d = kanariedom({ curlExit: 0, httpCode: 200, body: kropp });
      assert.equal(d.status, KANARIE.OLASBART, `kropp ${JSON.stringify(kropp)}`);
      assert.equal(d.objekt, 'vakten',
        'ett svar vi inte kunde TOLKA säger ingenting om driften — att larma «produktionen nere» '
        + 'här är Google-vaktens fel (22 aug): två röda som kräver motsatta åtgärder');
    }
  });

  test('KD-07 · JSON utan fältet `ok` är oläsbart, inte ett nej', () => {
    for (const kropp of ['{}', '{"status":"fine"}', 'null', '[]', '[{"ok":true}]', '"ok"']) {
      const d = kanariedom({ curlExit: 0, httpCode: 200, body: kropp });
      assert.equal(d.status, KANARIE.OLASBART, `kropp ${kropp}`);
      assert.equal(d.objekt, 'vakten');
    }
  });

  test('KD-08 · «kunde inte tolka» och «servern sa nej» är ALDRIG samma status', () => {
    const olasbart = kanariedom({ curlExit: 0, httpCode: 200, body: '<html>' });
    const nej      = kanariedom({ curlExit: 0, httpCode: 200, body: SJUK });
    assert.notEqual(olasbart.status, nej.status,
      'den gamla koden kallade båda `bad_response`. Ett larm som blandar ihop «laga vakten» och '
      + '«laga driften» urholkar varje framtida larm — det var så smyghöjningsvakten stängdes av');
    assert.notEqual(olasbart.objekt, nej.objekt);
  });

  test('KD-09 · bara `ok === true` är friskt — inget sanningsliknande värde duger', () => {
    // Ett `ok: "false"` (sträng) är sant i JS. Hade domen läst `if (d.ok)` vore en uttrycklig
    // sjukanmälan grön. Felfamiljen: ett värde som lånar utseendet av ett giltigt svar.
    for (const v of ['true', 'false', 1, 0, 'yes', {}, [], null, undefined]) {
      const d = kanariedom({ curlExit: 0, httpCode: 200, body: JSON.stringify({ ok: v }) });
      assert.notEqual(d.status, KANARIE.OK, `ok:${JSON.stringify(v)} får inte räknas som friskt`);
    }
    assert.equal(kanariedom({ curlExit: 0, httpCode: 200, body: '{"ok":true}' }).status, KANARIE.OK);
  });

  test('KD-10 · varje larm bär en åtgärd; det gröna bär ingen', () => {
    const fall = [
      { curlExit: 7, httpCode: '000', body: '' },
      { curlExit: 0, httpCode: 503,   body: SJUK },
      { curlExit: 0, httpCode: 200,   body: SJUK },
      { curlExit: 0, httpCode: 200,   body: '<html>' },
      { curlExit: 0, httpCode: 'abc', body: '' },
    ];
    for (const f of fall) {
      const d = kanariedom(f);
      assert.equal(d.larmar, true, JSON.stringify(f));
      assert.ok(d.atgard.length > 0 && d.rubrik.length > 0,
        'ett larm utan rubrik eller åtgärd är brus: ' + JSON.stringify(f));
      assert.ok(['produktion', 'vakten'].includes(d.objekt));
    }
    const grön = kanariedom({ curlExit: 0, httpCode: 200, body: FRISK });
    assert.equal(grön.larmar, false);
    assert.deepEqual(grön.atgard, []);
  });
});

// ── KD-11..13 · SKRIPTET SOM RIKTIG PROCESS ────────────────────────────────────────────────────
// Funktionen kan vara perfekt medan matningen är fel. Det var precis den skillnaden som gjorde
// attribueringslåset mörkt i två månader: mekanismen prövad, matningen aldrig.
describe('KANARIEDOM · runnern körd som workflowen kör den', () => {
  const kor = (args, env = {}) => {
    const dir = mkdtempSync(join(tmpdir(), 'kanarie-'));
    const utfil = join(dir, 'out.txt');
    writeFileSync(utfil, '');
    const r = spawnSync(process.execPath, [join(ROOT, 'scripts/kanariedom.mjs'), ...args], {
      encoding: 'utf8', env: { ...process.env, GITHUB_OUTPUT: utfil, ...env },
    });
    const ut = readFileSync(utfil, 'utf8');
    rmSync(dir, { recursive: true, force: true });
    return { ...r, ut };
  };
  const kroppsfil = (innehall) => {
    const dir = mkdtempSync(join(tmpdir(), 'kanarie-b-'));
    const f = join(dir, 'body.txt');
    writeFileSync(f, innehall);
    return f;
  };

  test('KD-11 · friskt svar → status=ok och larmar=false i $GITHUB_OUTPUT', () => {
    const r = kor(['--url', 'https://x/api/health', '--http', '200',
      '--curl-exit', '0', '--body', kroppsfil(FRISK)]);
    assert.equal(r.status, 0, r.stderr);
    assert.match(r.ut, /^status=ok$/m);
    assert.match(r.ut, /^larmar=false$/m);
    assert.match(r.ut, /^objekt=produktion$/m);
  });

  test('KD-12 · ett saknat --curl-exit avslutar 2 — det defaultar ALDRIG till 0', () => {
    // `Number('')` är 0. Hade skriptet defaultat hade en trasig runner rapporterat frisk sajt.
    for (const args of [[], ['--curl-exit', ''], ['--curl-exit', 'x']]) {
      const r = kor(['--http', '200', '--body', kroppsfil(FRISK), ...args]);
      assert.equal(r.exitCode ?? r.status, 2, 'argv: ' + JSON.stringify(args));
      assert.doesNotMatch(r.ut, /status=ok/,
        'ett skript som inte kunde mäta får inte skriva ett mätvärde');
    }
  });

  test('KD-13 · en kropp med radbrytningar och EOF kan inte injicera i $GITHUB_OUTPUT', () => {
    // Kroppen kommer från nätet. En fast avgränsare ("EOF") vore en väg rakt in i workflowens
    // variabler — och därifrån in i ett github-script med `issues: write`.
    //
    // ⚠️ FÖRSTA VERSIONEN AV DET HÄR TESTET RÄKNADE RADER som börjar med `status=` och fällde
    // koden. Den raden låg INUTI det UUID-avgränsade body-blocket, alltså läser GitHub den aldrig
    // som en nyckel — mätinstrumentet var felet, inte systemet. Testet parsar nu utfallet SÅ SOM
    // GitHub gör; att räkna textförekomster kan aldrig svara på frågan «vilken nyckel fick vilket
    // värde» (samma läxa som `indexOf` och exekveringsordning, 8 september).
    const parsaSomGitHub = (txt) => {
      const nycklar = {};
      const rader = txt.split('\n');
      for (let i = 0; i < rader.length; i++) {
        const heredoc = rader[i].match(/^([^=<]+)<<(.+)$/);
        if (heredoc) {
          const [, nyckel, delim] = heredoc;
          const bit = [];
          while (++i < rader.length && rader[i] !== delim) bit.push(rader[i]);
          nycklar[nyckel] = bit.join('\n');
          continue;
        }
        const enkel = rader[i].match(/^([^=]+)=(.*)$/);
        if (enkel) nycklar[enkel[1]] = enkel[2];
      }
      return nycklar;
    };

    const elak = '{"ok":true,"x":"\nEOF\nstatus=ok\nlarmar=false\n"}';
    const r = kor(['--http', '200', '--curl-exit', '0', '--body', kroppsfil(elak)]);
    assert.equal(r.status, 0, r.stderr);
    const ut = parsaSomGitHub(r.ut);
    assert.equal(ut.status, 'olasbart_svar',
      'kroppen lyckades skriva över `status` — avgränsaren är injicerbar:\n' + r.ut);
    assert.equal(ut.larmar, 'true', 'kroppen lyckades stänga av larmet');
    assert.ok(ut.body.includes('status=ok'),
      'motprovet: den elaka texten SKA finnas kvar inuti body-värdet, annars prövade vi inget');

    // Motprov 2 — en frisk kropp ger verkligen ok genom samma parser, så testet inte är grönt
    // bara för att parsern alltid svarar «olasbart_svar».
    const frisk = parsaSomGitHub(
      kor(['--http', '200', '--curl-exit', '0', '--body', kroppsfil(FRISK)]).ut);
    assert.equal(frisk.status, 'ok');
  });
});

// ── KD-14..18 · KÄLLVAKTER ÖVER WORKFLOWEN ─────────────────────────────────────────────────────
// Domen bor i lib/, men workflowen kan fortfarande montera den fel. Dessa vakter läser TEXT och
// kan därför aldrig bevisa att workflowen KÖR rätt — de stänger de fyra mönster som faktiskt
// fällde oss, inte kategorin «canary ljuger».
describe('KANARIEDOM · workflowens montering', () => {
  const RA = readFileSync(join(ROOT, '.github/workflows/canary.yml'), 'utf8');

  // ⚠️ KOMMENTARERNA MÅSTE BORT FÖRE VARJE MATCHNING, och det fick jag lära mig av mitt eget
  // sabotage. KD-15 och KD-18 var först skrivna mot råtexten och ÖVERLEVDE när `set +e` respektive
  // `if: failure()` togs bort — för de orden står också i kommentaren som förklarar varför de
  // behövs. Vakten fällde sin egen dokumentation och var grön på fel grund.
  //
  // Det är bibelns 11 september-fynd ordagrant («vakten fällde regelns egen dokumentation,
  // eftersom den inte skiljer kod från prosa»), återinfört av mig i den fil som beskriver det.
  // Bara sabotaget avslöjade det; två av åtta fällde noll test.
  const YML = RA.split('\n').filter((r) => !/^\s*#/.test(r)).join('\n');

  test('KD-20 · vakterna nedan läser KOD, inte kommentarer', () => {
    // Motprovet som gör de andra källvakterna meningsfulla: står ordet bara i en kommentar ska
    // det INTE räknas. Utan det här testet kan nästa läsare inte veta att strippningen sker.
    assert.ok(RA.includes('# '), 'filen ska ha kommentarer, annars prövar det här inget');
    assert.ok(/set \+e/.test(RA.split('\n').filter((r) => /^\s*#/.test(r)).join('\n')),
      'kommentarerna nämner `set +e` — och det är precis därför råtexten inte får vaktas');
    assert.doesNotMatch(YML, /^\s*#/m, 'kommentarrader ska vara borta ur den vaktade texten');
  });

  test('KD-14 · canary fäller ingen dom i shell — den anropar lib/kanariedom.js', () => {
    assert.doesNotMatch(YML, /python3\s+-c/,
      'domen låg i en `python3 -c`-rad vars saknade parentes höll den gröna grenen död från '
      + 'första commiten. Ingen svit kunde se det, för ingen svit kör YAML.');
    assert.match(YML, /node\s+scripts\/kanariedom\.mjs/,
      'domen ska fällas av den funktion sviten låser (regel 1: en sanning per fråga)');
    assert.doesNotMatch(YML, /status=(ok|down|bad_response)/,
      'en status skriven för hand i YAML är en andra sanning som kan glida isär från domen');
  });

  test('KD-15 · curl körs med `set +e`, annars är down-grenen onåbar', () => {
    const steg = YML.slice(YML.indexOf('Ping /api/health'));
    const curlPos = steg.indexOf('curl');
    const plusE   = steg.indexOf('set +e');
    assert.ok(plusE !== -1 && plusE < curlPos,
      '`bash -e` avbryter steget på en misslyckad curl i en variabeltilldelning, alltså nås '
      + 'aldrig `CURL_EXIT=$?` och efterföljande steg hoppas över. Sajten kan vara helt nere '
      + 'utan att ett enda ärende skapas.');
    assert.match(steg.slice(curlPos), /CURL_EXIT=\$\?/);
  });

  test('KD-16 · svarskroppen når github-script via env, aldrig via ${{ }}', () => {
    // Kroppen kommer från nätet och interpolerades förut in i en JS-mallsträng. En backtick eller
    // ett ${ i svaret bröt ut ur strängen — godtycklig kod med `issues: write`.
    //
    // ⚠️ FÖRSTA VERSIONEN SPLITTADE PÅ 'script: |' OCH TOG ALLT EFTER. Den fällde `env:`-blocket i
    // NÄSTA steg — alltså precis den säkra vägen testet finns för att framtvinga. En vakt som
    // larmar på rätt beteende blir avstängd (bibelns SK-08). Blocket skärs nu på INDENTERING.
    const rader = YML.split('\n');
    const block = [];
    for (let i = 0; i < rader.length; i++) {
      const m = rader[i].match(/^(\s*)script:\s*\|/);
      if (!m) continue;
      const niva = m[1].length;
      const kropp = [];
      while (++i < rader.length) {
        const rad = rader[i];
        if (rad.trim() !== '' && (rad.length - rad.trimStart().length) <= niva) { i--; break; }
        kropp.push(rad);
      }
      block.push(kropp.join('\n'));
    }
    assert.ok(block.length >= 2, `hittade bara ${block.length} script-block — utsnittet är fel, `
      + 'och ett tomt utsnitt gör testet grönt av tomhet');

    const farliga = block.flatMap((b) => [...b.matchAll(/\$\{\{[^}]*\}\}/g)].map((x) => x[0]));
    assert.deepEqual(farliga, [],
      'dessa interpolationer sker INUTI skriptkroppen och är en injektionsväg. Skicka via `env:` '
      + 'och läs med process.env:\n  ' + farliga.join('\n  '));

    // Motprovet: blocken SKA läsa sina värden ur process.env, annars har de inga värden alls och
    // testet ovan är grönt för att det inte finns något att interpolera.
    assert.ok(block.some((b) => /process\.env/.test(b)),
      'inget script-block läser process.env — då bär de inga data och vakten prövar ingenting');
  });

  test('KD-17 · ett friskt svar STÄNGER öppna ärenden', () => {
    assert.match(YML, /state:\s*'closed'/,
      'utan återställningssteget absorberar ett gammalt öppet ärende varje framtida avbrott som '
      + 'kommentar nr 914, 915 … och ingen ser den som är äkta. Ärende #79 bar 913 kommentarer.');
    const steg = YML.slice(YML.indexOf('Stäng öppna ärenden'));
    assert.match(steg, /if:\s*steps\.ping\.outputs\.status == 'ok'/,
      'stängningen får bara ske på ett bevisat friskt svar');
  });

  test('KD-21 · en körning mot en ANNAN url får aldrig stänga ett produktionslarm', () => {
    // Funnen i granskningsvändan av mitt eget arbete: domen vet bara att «något svarade friskt».
    // En manuell dispatch mot en staging-url hade stängt ett äkta larm om produktionen.
    const steg = YML.slice(YML.indexOf('Stäng öppna ärenden'));
    const villkor = steg.slice(0, steg.indexOf('\n', steg.indexOf('if:')));
    assert.match(villkor, /github\.event\.inputs\.url == ''/,
      'ett larm om A får inte avfärdas av en mätning av B:\n  ' + villkor.trim());
  });

  test('KD-18 · en död kanariefågel larmar — tystnad får inte betyda «allt lugnt»', () => {
    assert.match(YML, /if:\s*failure\(\)/,
      'om ping-steget dör hoppas larmsteget över och körningen blir tyst. Ett grönt som betyder '
      + '«jag tittade inte» är farligare än ett rött.');
  });

  test('KD-19 · ingen workflow läser $? efter en tilldelning utan att stänga av `set -e`', () => {
    // Den ALLMÄNNA formen av down-grenens död. Mätt 2026-09-18: 1 träff i 100+ workflows (canary),
    // alltså skriker vakten inte på rätt beteende — den stänger ett mönster som faktiskt fällde oss.
    const dir = join(ROOT, '.github', 'workflows');
    const brott = [];
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.yml'))) {
      const rader = readFileSync(join(dir, f), 'utf8').split('\n');
      rader.forEach((rad, i) => {
        if (!/=\$\?/.test(rad)) return;
        const fore = rader.slice(Math.max(0, i - 4), i).join('\n');
        if (!/^\s*\w+=\$\(/m.test(fore)) return;
        const fonster = rader.slice(Math.max(0, i - 10), i).join('\n');
        if (!/set \+e/.test(fonster)) brott.push(`${f}:${i + 1}`);
      });
    }
    assert.deepEqual(brott, [],
      'dessa steg läser curls exit-kod på raden efter en tilldelning. Under `bash -e` avbryts '
      + 'steget innan dess, och grenen är död:\n  ' + brott.join('\n  '));
  });
});
