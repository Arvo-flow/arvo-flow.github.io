// tests/inbound-reply.mjs — Mejl-läxorna från första skarpa svarsmejlet (2026-06-11).
//
// 1. Gmail-läxan: e-postklienter stödjer inte flexbox/grid — "Årskostnad475 440"
//    klistrades ihop. Mejlmallen får ALDRIG använda flex/grid/<style>-beroende layout.
// 2. Fältläxan: API:t exponerar netSaving — mejlet läste savingPerYear (finns inte)
//    → "Inget tydligt prisgap" bredvid 475 440 → 450 871. Regel 5: mejl och webb
//    säger ALLTID samma sak — samma fält, samma etikett, samma besked.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { replyHtml, buildReplySubject } from '../api/inbound-email.mjs';

const NMIT_RESULT = {
  ok: true, filename: 'Faktura 1 - Lynxeye IT.pdf',
  supplier: 'Nordic Managed IT Services AB',
  annualCost: 475_440, suggestedAnnualCost: 450_871,
  netSaving: 19_655, requiresQuote: false,
};

const norm = (s) => s.replace(/[    ]/g, ' ');

describe('Mejlsvaret — replyHtml', () => {

  test('Gmail-läxan: ingen flex/grid — endast tabellayout', () => {
    const html = replyHtml({ results: [NMIT_RESULT], portalLink: 'https://arvoflow.se/portfolio?magic=x' });
    assert.ok(!/display\s*:\s*flex/i.test(html), 'flexbox stryks av Gmail');
    assert.ok(!/display\s*:\s*grid/i.test(html), 'grid stryks av Gmail');
    assert.match(html, /<table role="presentation"/);
  });

  test('etikett och belopp ligger i separata tabellceller — kan aldrig klistras ihop', () => {
    const html = norm(replyHtml({ results: [NMIT_RESULT], portalLink: null }));
    assert.match(html, /Årskostnad i dag<\/td>/);
    assert.match(html, /475 440 kr\/år<\/td>/);
    assert.ok(!/Årskostnad i dag475/.test(html));
  });

  test('regel 5: nettobesparingen visas med webbens belopp och etikett', () => {
    // Etiketten är "Möjlig nettobesparing" — SAMMA som webben (Portfolio), efter Switch-doktrin-
    // migreringen som strök "identifierad" (claims-audit förbjuder det i kundytor: vi lovar bara
    // realiserad besparing, och innan bytet är den möjlig, aldrig "identifierad").
    const html = norm(replyHtml({ results: [NMIT_RESULT], portalLink: null }));
    assert.match(html, /Möjlig nettobesparing/);
    assert.ok(!/Identifierad nettobesparing/.test(html), 'gammal "identifierad"-copy kan aldrig återuppstå');
    assert.match(html, /\+19 655 kr\/år/);
    assert.match(html, /450 871 kr\/år/, 'marknadspriset visas när besparing finns');
    assert.ok(!/Inget tydligt prisgap/.test(html), 'motsägelsen kan aldrig återuppstå');
  });

  test('utan besparing: "Marknadsmässigt pris" (webbens besked) — och inget marknadspris-rad', () => {
    const html = norm(replyHtml({
      results: [{ ...NMIT_RESULT, netSaving: 0, suggestedAnnualCost: 475_440 }],
      portalLink: null,
    }));
    assert.match(html, /Marknadsmässigt pris — inget prisgap mot verifierat marknadspris/);
    assert.ok(!/Marknadspris, samma tjänst/.test(html));
  });

  test('requiresQuote: ärligt offert-besked utan siffror', () => {
    const html = norm(replyHtml({
      results: [{ ok: true, filename: 'f.pdf', supplier: 'Svea Kontorsprint & Leasing AB', annualCost: 195_900, suggestedAnnualCost: null, netSaving: 0, requiresQuote: true }],
      portalLink: null,
    }));
    assert.match(html, /Kräver offert för exakt jämförelse/);
  });

  test('felresultat visar filnamn + ärligt meddelande', () => {
    const html = replyHtml({
      results: [{ ok: false, filename: 'Ingen faktura hittades', message: 'Vi hittade ingen PDF-bilaga i ert mail.' }],
      portalLink: null,
    });
    assert.match(html, /Ingen faktura hittades/);
    assert.match(html, /Vi hittade ingen PDF-bilaga/);
  });

});

describe('Mejlsvaret — buildReplySubject', () => {

  test('med besparing: leverantör + nettobesparing (samma tal som webben)', () => {
    assert.equal(
      norm(buildReplySubject([NMIT_RESULT])),
      'Er analys: Nordic Managed IT Services AB — 19 655 kr/år i möjlig nettobesparing'
    );
  });

  test('utan besparing: neutral ämnesrad', () => {
    assert.match(buildReplySubject([{ ...NMIT_RESULT, netSaving: 0 }]), /^Er analys är klar — Nordic/);
  });

  test('inga ok-resultat: ärligt fel-ämne', () => {
    assert.equal(buildReplySubject([{ ok: false }]), 'Vi kunde inte analysera ert mail');
  });

});
