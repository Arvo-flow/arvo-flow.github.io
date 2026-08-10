// tests/villkorslasare.mjs — låser LÄSAREN. Bevisbördan för ett förtjänat grönt bor här.
//
// Kravet är absolut och binärt: klausulen verifieras ordagrant eller inte alls. Låsen nedan
// bevisar båda riktningarna — att ett enda avvikande tecken fäller läsningen, OCH att ett
// oläsbart dokument aldrig rapporteras som "klausulen är borta".
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { lasKlausul, normaliseraOrdagrant, LAS_UTFALL, MIN_TEXTLAGER } from '../lib/villkorslasare.js';

const CITAT = 'Uppsägningstid är tre (3) månader. Efter Avtalstiden förlängs Avtalstiden automatiskt löpande med tre (3) månader.';
const KONTROLL = 'Allmänna villkor för företag, bostadsrättsföreningar och fastighetsägare';
// Ett verklighetstroget textlager: kontrollfras + citat + tillräcklig omgivande massa.
const fyll = (n) => 'Avtalet omfattar de tjänster som anges i beställningen. '.repeat(n);
const DOK = (citat = CITAT) => `${fyll(20)} ${KONTROLL} ${fyll(20)} ${citat} ${fyll(20)}`;

describe('villkorsläsaren · ordagrant eller inte alls', () => {
  test('citatet står i dokumentet → FUNNEN', () => {
    const d = lasKlausul({ text: DOK(), citat: CITAT, kontrollfras: KONTROLL });
    assert.equal(d.utfall, LAS_UTFALL.FUNNEN);
    assert.equal(d.ok, true);
  });

  // ── DEN BINÄRA GRÄNSEN ───────────────────────────────────────────────────────────────────
  // Ett enda tecken. Inte "nästan", inte "sannolikt samma klausul" — fel är fel.
  test('ETT avvikande tecken fäller läsningen (ingen fuzzy matching)', () => {
    const varianter = {
      'siffra ändrad (tre → två månader)': CITAT.replace('tre (3) månader.', 'tre (2) månader.'),
      'versal ändrad': CITAT.replace('Uppsägningstid', 'uppsägningstid'),
      'skiljetecken borttaget': CITAT.replace('(3)', '3'),
      'ett ord utbytt': CITAT.replace('automatiskt', 'normalt'),
      'ett tecken struket': CITAT.slice(0, -1) + '',
    };
    for (const [vad, muterat] of Object.entries(varianter)) {
      if (vad === 'ett tecken struket') continue;   // kortare citat ÄR fortfarande en delsträng
      const d = lasKlausul({ text: DOK(muterat), citat: CITAT, kontrollfras: KONTROLL });
      assert.equal(d.utfall, LAS_UTFALL.SAKNAS, vad);
      assert.equal(d.ok, false, vad);
    }
  });

  test('blanksteg är layout, inte innehåll — radbrytning och spaltflätning fäller inte', () => {
    // Så här ser Telias tvåspaltiga extraktion ut: brutna rader och ord delade mellan fragment.
    const brutet = 'Uppsägningstid  är\ntre (3)\tmånader. Efter Avtalstiden  förlängs\nAvtalstiden\n'
      + 'automatiskt   löpande med tre (3)\nmånader.';
    const d = lasKlausul({ text: DOK(brutet), citat: CITAT, kontrollfras: KONTROLL });
    assert.equal(d.utfall, LAS_UTFALL.FUNNEN);
  });

  test('normaliseringen rör ENDAST blanksteg', () => {
    assert.equal(normaliseraOrdagrant('Tre (3) må nader.'), 'Tre(3)månader.');
    // Inget annat får försvinna: versaler, skiljetecken, bindestreck, siffror.
    assert.equal(normaliseraOrdagrant('A-B, 3.'), 'A-B,3.');
  });
});

// ── OLÄSBART FÅR ALDRIG BLI "KLAUSULEN ÄR BORTA" ────────────────────────────────────────────
// Den viktigaste gruppen i filen. Ett larm som säger "er uppsägningsregel har strukits" om ett
// dokument vi aldrig kunde läsa är en lögn i den farliga riktningen.
describe('villkorsläsaren · okänt är inte samma sak som saknas', () => {
  test('tunt textlager (bild-PDF) → OLASBAR, aldrig SAKNAS', () => {
    const d = lasKlausul({ text: 'Sida 1 av 12', citat: CITAT, kontrollfras: KONTROLL });
    assert.equal(d.utfall, LAS_UTFALL.OLASBAR);
    assert.match(d.skal, /gick inte att läsa/);
  });

  test('långt men trasigt textlager → OLASBAR, för kontrollfrasen bär inte', () => {
    // CID-teckensnitt utan ToUnicode ger just detta: mycket text, noll läsbarhet.
    const skrap = '�'.repeat(3000);
    const d = lasKlausul({ text: skrap, citat: CITAT, kontrollfras: KONTROLL });
    assert.equal(d.utfall, LAS_UTFALL.OLASBAR);
    assert.match(d.skal, /kontrollfrasen hittades inte/);
    assert.ok(skrap.length > MIN_TEXTLAGER, 'testet ska passera längdtröskeln och ändå fällas');
  });

  test('utan kurerad kontrollfras säger läsaren ingenting alls', () => {
    for (const k of [undefined, '', 'kort']) {
      const d = lasKlausul({ text: DOK(), citat: CITAT, kontrollfras: k });
      assert.equal(d.utfall, LAS_UTFALL.OLASBAR, String(k));
      assert.match(d.skal, /kontrollfras/);
    }
  });

  test('SAKNAS uttalas ENDAST när läsningen bevisats fungera', () => {
    // Kontrollfrasen finns, citatet inte: nu är "saknas" ett fynd, inte en gissning.
    const utanCitat = `${fyll(30)} ${KONTROLL} ${fyll(30)}`;
    const d = lasKlausul({ text: utanCitat, citat: CITAT, kontrollfras: KONTROLL });
    assert.equal(d.utfall, LAS_UTFALL.SAKNAS);
    assert.match(d.skal, /läsningen fungerar/);
  });

  test('ett för kort citat får aldrig kallas belägg', () => {
    const d = lasKlausul({ text: DOK(), citat: 'tre (3) mån', kontrollfras: KONTROLL });
    assert.equal(d.utfall, LAS_UTFALL.OLASBAR);
  });

  test('tomma indata är OLASBAR, aldrig FUNNEN', () => {
    for (const inp of [{}, { text: '', citat: '', kontrollfras: '' }, undefined]) {
      assert.equal(lasKlausul(inp).ok, false, JSON.stringify(inp));
    }
  });
});
