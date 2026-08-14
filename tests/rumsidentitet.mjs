// tests/rumsidentitet.mjs — RUMMET TILLHÖR EN IDENTITET, INTE EN DATOR.
//
// BAKGRUNDEN (skarpt läge 2026-08-14): grundaren mejlade in tio fakturor, öppnade rummet med sin
// magic-länk — och möttes av ELVA leverantörer och ett fynd om en iPad han aldrig skickat.
// invoice-history slog ihop två källor: e-postnycklad historik (hans tio) och webbläsarens
// fingerprint-historik (allt den datorn någonsin analyserat).
//
// Sammanslagningen var RÄTT när rummet var enhetsbundet — kunden laddade upp i en webbläsare och
// kom tillbaka till samma. Med mejl-intaget som huvudväg är den fel, av tre skäl:
//   1. Kunden kan inte skilja sitt eget underlag från datorns; ingenting märker raderna.
//   2. På en delad kontorsdator blandas två personers underlag i samma vy.
//   3. Vi lovar "ett eget rum". Vi levererade deras plus vad datorn råkade minnas.
//
// REGELN: är e-postägarskapet bevisat (magic-token eller signerad session) ÄR e-posten
// identiteten. Enhetens historik slås inte in — den redovisas separat och ärligt.
//
// VAKTENS PREMISS (Verifieringsplikten p.5), skriven före mekanismen:
//   FÅNGAR: att sammanslagningen återinförs — att byFp blandas in i listan när e-post finns —
//           och att antalet enhetsrader tystnar i stället för att redovisas.
//   BLIND:  vakten läser KÄLLTEXT, inte ett körande svar. Den ser inte om en FRAMTIDA konsument
//           läser byFp på egen hand längre ned i filen, och den bevisar inte att klienten
//           faktiskt visar `frånDennaEnhet` för kunden. Att raden NÅR kundens yta är fortfarande
//           en visuell verifiering (regel 8), inte något den här sviten kan garantera.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KALLA = readFileSync(join(ROOT, 'api/invoice-history.mjs'), 'utf8');

describe('RUMSIDENTITET · bevisad e-post slår enhetens minne', () => {
  test('RI-01 · enhetens historik slås INTE in när e-posten är bevisad', () => {
    // Den gamla raden var: [...byEmail, ...byFp]. Den får inte återuppstå.
    assert.doesNotMatch(KALLA, /\[\s*\.\.\.byEmail\s*,\s*\.\.\.byFp\s*\]/,
      'byFp blandas ovillkorligt in i listan — kundens rum bär då datorns historik igen');
    assert.match(KALLA, /identitetBevisad\s*\?\s*\[\]\s*:\s*byFp/,
      'sammanslagningen ska vara villkorad av att identiteten är bevisad');
  });

  test('RI-02 · identiteten är bevisad av e-post, inte av fingerprint', () => {
    assert.match(KALLA, /const identitetBevisad = Boolean\(email\)/,
      'e-posten (magic-token eller signerad session) är det som avgör');
  });

  test('RI-03 · det som inte visas RÄKNAS och redovisas (regel 9)', () => {
    assert.match(KALLA, /frånDennaEnhet/, 'antalet enhetsrader måste beräknas');
    // Och det ska nå svaret — annars är det en tystnad med extra steg.
    const svarsrad = KALLA.split('\n').find((r) => /return send\(res, 200, \{ ok: true, analyses/.test(r));
    assert.ok(svarsrad, 'huvudsvaret hittades inte — har svarsformen ändrats?');
    assert.match(svarsrad, /frånDennaEnhet/,
      'antalet beräknas men skickas aldrig till klienten — det är tystnad med extra steg');
  });

  test('RI-04 · rader som redan finns i e-posthistoriken dubbelräknas inte', () => {
    // Samma analys kan bära både fingerprint och user_email. Räknades den ändå som "från denna
    // enhet" skulle kunden få veta om rader hen redan ser — ett larm utan innehåll.
    assert.match(KALLA, /epostIdn[\s\S]{0,120}byFp\.filter\(\(a\) => !epostIdn\.has\(a\.id\)\)/,
      'överlappet mellan e-post och fingerprint måste räknas bort');
  });

  test('RI-05 · utan bevisad e-post är rummet fortfarande enhetsbundet', () => {
    // Regressionsskyddet åt andra hållet: en besökare UTAN magic-länk har bara sin webbläsare,
    // och för hen får fixen inte tömma rummet.
    assert.match(KALLA, /identitetBevisad\s*\?\s*\[\]\s*:\s*byFp/,
      'utan bevisad identitet ska byFp fortfarande med — annars ser gamla kunders rum tomma ut');
  });
});
