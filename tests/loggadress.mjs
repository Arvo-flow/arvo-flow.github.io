// tests/loggadress.mjs — EL-01..03: en kunds e-postadress står aldrig i klartext i en logg.
//
// VARFÖR (fabrikssvepet 2026-10-16). Regeln står i .cursorrules: «En personlig e-postadress står
// aldrig i en workflow-input eller en logg.» De tre vägarna som mejlar premiumkretsen bröt den:
//   · scripts/notify-price-changes.mjs skrev mottagaren i Actions-loggen på tre rader (publikt repo).
//   · api/cron/run-price-alerts.mjs och api/cron/generate-briefings.mjs skrev den i Vercels körlogg.
// Läckan var latent: avläst i de fem senaste nattliga prisvaktskörningarna (38187249578..38824254504)
// gav grinden 0 verifierade larm, och loggarna bar inga kundadresser. Den hade gått av första natten
// ett larm når en beviljad premiumkund.
//
// FÅNGAR: ett console-anrop i en mottagarväg som skriver en adress-egenskap (`email`, `user_email`,
//   `customer_email`, `agare_epost` …) utan loggAdress(), i en mallsträng eller som eget argument.
//   Mottagarvägarna härleds ur koden (anropar getAffectedCustomers, briefMottagare eller
//   lasPremiumkrets), så en fjärde väg skannas utan att någon skriver in den.
// BLIND: en adress i en variabel med annat namn (`const x = customer.email; console.log(x)`), en logg
//   utanför mottagarvägarna, och en adress som når loggen via ett felmeddelande från Resend eller
//   databasen. Skanningen läser namn, inte värden.

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { loggAdress } from '../lib/loggadress.js';
import { matchaAdress } from '../lib/premiumkrets.js';

const ROT = new URL('..', import.meta.url).pathname;
const sha256hex = (s) => createHash('sha256').update(s).digest('hex');

// Källtexten med kommentarer och strängtext borttagna. Mallsträngarnas ${…} behålls som kod, så
// `${customer.email}` syns men '[run-price-alerts] email failed:' gör det inte.
export function kodUtanText(src) {
  let ut = '';
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    const d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { const j = src.indexOf('*/', i + 2); i = j < 0 ? n : j + 2; continue; }
    if (c === "'" || c === '"') {
      i++;
      while (i < n && src[i] !== c && src[i] !== '\n') { if (src[i] === '\\') i++; i++; }
      i++;
      ut += '""';
      continue;
    }
    if (c === '`') {
      i++;
      let mall = '';
      while (i < n && src[i] !== '`') {
        if (src[i] === '\\') { i += 2; continue; }
        if (src[i] === '$' && src[i + 1] === '{') {
          let djup = 1;
          let j = i + 2;
          while (j < n && djup) { if (src[j] === '{') djup++; else if (src[j] === '}') djup--; j++; }
          mall += ` ${kodUtanText(src.slice(i + 2, j - 1))} `;
          i = j;
          continue;
        }
        i++;
      }
      i++;
      ut += `\`${mall}\``;
      continue;
    }
    ut += c;
    i++;
  }
  return ut;
}

function slutParentes(kod, start) {
  let djup = 0;
  for (let j = start; j < kod.length; j++) {
    if (kod[j] === '(') djup++;
    else if (kod[j] === ')' && --djup === 0) return j;
  }
  return kod.length - 1;
}

const ADRESSNAMN = /\b(email|user_email|userEmail|customer_email|customerEmail|agare_epost|epost)\b/;

/** Varje console-anrop i källan som skriver en adress-egenskap utan loggAdress(). */
export function raaAdressloggar(src) {
  const kod = kodUtanText(src);
  const fynd = [];
  for (const m of kod.matchAll(/console\.(log|warn|error|info)\(/g)) {
    const oppna = m.index + m[0].length - 1;
    let anrop = kod.slice(oppna, slutParentes(kod, oppna) + 1);
    for (let k = anrop.indexOf('loggAdress('); k >= 0; k = anrop.indexOf('loggAdress(')) {
      const slut = slutParentes(anrop, k + 'loggAdress'.length);
      anrop = `${anrop.slice(0, k)} ${anrop.slice(slut + 1)}`;
    }
    if (ADRESSNAMN.test(anrop)) fynd.push(`${m[0]}${anrop.slice(1, 120).replace(/\s+/g, ' ')}`);
  }
  return fynd;
}

function filer(dir) {
  const ut = [];
  for (const namn of readdirSync(dir)) {
    const p = join(dir, namn);
    if (statSync(p).isDirectory()) ut.push(...filer(p));
    else if (/\.(mjs|js)$/.test(namn)) ut.push(p);
  }
  return ut;
}

const MOTTAGARANROP = /\b(getAffectedCustomers|briefMottagare|lasPremiumkrets)\(/;
const mottagarvagar = () => ['api', 'scripts'].flatMap((d) => filer(join(ROT, d)))
  .filter((p) => MOTTAGARANROP.test(kodUtanText(readFileSync(p, 'utf8'))))
  .map((p) => relative(ROT, p))
  .sort();

describe('EL · en kunds e-postadress står aldrig i klartext i en logg', () => {
  test('EL-01 · loggAdress ger samma sha256-form som grundarens beviljande läser, aldrig adressen', () => {
    const adress = '  Kund.Namn@Exempel.SE ';
    const logg = loggAdress(adress);
    assert.equal(logg, `sha256:${sha256hex('kund.namn@exempel.se')}`);
    assert.doesNotMatch(logg, /@|kund|exempel/i);
    // Raden går att para med adressen i bevilja-premium utan att adressen står i loggen.
    assert.deepEqual(matchaAdress([adress], logg, sha256hex).adress, 'kund.namn@exempel.se');
    for (const ingen of [null, undefined, '', 'inte-en-adress', 42]) assert.equal(loggAdress(ingen), '(ingen adress)');
  });

  test('EL-02 · ingen mottagarväg skriver en adress-egenskap i en logg', () => {
    const vagar = mottagarvagar();
    for (const v of ['api/cron/generate-briefings.mjs', 'api/cron/run-price-alerts.mjs', 'scripts/notify-price-changes.mjs']) {
      assert.ok(vagar.includes(v), `${v} hittades inte som mottagarväg — skanningen prövar inget`);
    }
    const fynd = vagar.flatMap((v) => raaAdressloggar(readFileSync(join(ROT, v), 'utf8')).map((f) => `${v}: ${f}`));
    assert.deepEqual(fynd, [], `adress i klartext i en logg:\n${fynd.join('\n')}`);
  });

  test('EL-03 · motprov: skanningen fäller de gamla raderna och släpper den lagade formen', () => {
    const gamla = [
      'console.log(`  ✅ Skickat till ${customer.email}${x ? ` (impact: ${fmt(x)} kr/år)` : \'\'}`);',
      "console.error('[run-price-alerts] email failed:', customer.email, emailErr.message);",
      'console.error(`[generate-briefings] Error for ${email}:`, err.message);',
      'console.warn(\n  "fel för",\n  r.user_email,\n);',
    ];
    for (const rad of gamla) assert.equal(raaAdressloggar(rad).length, 1, `släpptes: ${rad}`);
    const lagade = [
      'console.log(`  ✅ Skickat till ${loggAdress(customer.email)}${x ? ` (impact: ${fmt(x)} kr/år)` : \'\'}`);',
      "console.error('[run-price-alerts] email failed:', loggAdress(customer.email), emailErr.message);",
      'console.error(`[generate-briefings] Error for ${loggAdress(email)}:`, err.message);',
      '// console.log(customer.email) i en kommentar\nawait resend.emails.send({ to: customer.email });',
    ];
    for (const rad of lagade) assert.deepEqual(raaAdressloggar(rad), [], `fälldes: ${rad}`);
  });
});
