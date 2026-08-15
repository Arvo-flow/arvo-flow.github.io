// src/components/FindingCard.js — EN delad fynd-komponent, två ansikten (konvergens steg 2).
// Samma fynd ritas av EN kodbas, men i två stämningar via variant: 'light' (testa-faktura,
// värmt/inbjudande) och 'dossier' (kontoret, mörkt/förtroligt). Skinnet skiljer — datan och
// strukturen är delad, så de två ytorna aldrig mer kan säga olika saker om samma fynd (regel 5).
//
// Två toner via finding.tone:
//   'leak'  (default) — amber-signal, en hittad läcka (forensik-fynden). Visar kr/år-impact.
//   'watch'           — brand-signal, vaktens lugna besked (kontraktsklockan). Visar metricText
//                       (t.ex. "184 dagar kvar") i stället för kr — klockan är inte ett larm.
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const fmt = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

// Accentfärg per ton × variant. Läck = amber (warning), bevakning = brand/teal.
const accent = (theme, tone, variant) => {
  if (tone === 'watch') return variant === 'dossier' ? theme.dossier.teal : theme.color.brand;
  return theme.color.warning;
};
// Mjuk bakgrund för ljus variant (mörk variant använder alltid dossier.bgRaised).
const softBg = (theme, tone) => (tone === 'watch' ? theme.color.brandSoft : theme.color.warningSoft);

const Card = styled.section`
  position: relative;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1px solid ${({ theme, $tone, $variant }) => accent(theme, $tone, $variant)};
  padding: 15px 18px;
  margin: ${({ $variant }) => ($variant === 'dossier' ? '26px 0 4px' : '0 0 20px')};
  background: ${({ theme, $variant, $tone }) => ($variant === 'dossier' ? theme.dossier.bgRaised : softBg(theme, $tone))};

  .fc-eyebrow {
    display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;
    text-transform: uppercase; color: ${({ theme, $tone, $variant }) => accent(theme, $tone, $variant)};
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`font-family: ${theme.font.mono}; font-size: 11px; letter-spacing: .22em;`
      : css`font-size: 10px; font-weight: 800; letter-spacing: .1em;`)}
  }
  .fc-eyebrow::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${({ theme, $tone, $variant }) => accent(theme, $tone, $variant)}; }

  .fc-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 10px; }
  .fc-title {
    line-height: 1.16;
    /* KOMPAKTERAT 2026-08-15: kortet tog en halv skärm i mobil. Rubriken är hooken och får
       stanna, men i mindre grad — fyndet ska ANNONSERA sig, inte ockupera rummet. */
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`font-family: ${theme.font.display}; font-weight: 600; font-size: clamp(18px, 2.6vw, 22px); color: ${theme.dossier.inkOnDark};`
      : css`font-weight: 700; font-size: 16px; color: ${theme.color.ink};`)}
  }
  .fc-impact {
    flex-shrink: 0; font-family: ${({ theme }) => theme.font.mono}; font-weight: 600; letter-spacing: -.02em;
    font-feature-settings: 'tnum'; color: ${({ theme, $tone, $variant }) => accent(theme, $tone, $variant)}; white-space: nowrap;
    font-size: ${({ $variant }) => ($variant === 'dossier' ? 'clamp(17px, 2.6vw, 21px)' : 'clamp(16px, 3.4vw, 20px)')};
  }
  /* KRAVET (2026-08-15): det enda talet kunden kan hämta hem I DAG låg begravt mitt i en löpande
     mening medan run-raten fick all typografi. En CFO agerar på det som går att kräva tillbaka. */
  .fc-claim {
    display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap;
    margin: 0 0 10px; padding: 9px 12px; border-radius: ${({ theme }) => theme.size.radius.md};
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`background: rgba(43,196,172,.07); border: 1px solid rgba(43,196,172,.30);`
      : css`background: ${theme.color.brandSoft}; border: 1px solid ${theme.color.border};`)}
    .fc-claim-k { font-family: ${({ theme }) => theme.font.mono}; font-size: 10px; letter-spacing: .16em;
      text-transform: uppercase; color: ${({ theme, $variant }) => ($variant === 'dossier' ? theme.dossier.tealBright : theme.color.brand)}; }
    .fc-claim-v { font-family: ${({ theme }) => theme.font.mono}; font-weight: 600; font-size: 17px;
      font-feature-settings: 'tnum';
      color: ${({ theme, $variant }) => ($variant === 'dossier' ? theme.dossier.inkOnDark : theme.color.ink)}; }
    .fc-claim-b {
      margin-left: auto; cursor: pointer; white-space: nowrap; font-size: 12px; font-weight: 600;
      border-radius: ${({ theme }) => theme.size.radius.pill}; padding: 7px 14px;
      ${({ theme, $variant }) => ($variant === 'dossier'
        ? css`background: transparent; border: 1px solid ${theme.dossier.tealBright}; color: ${theme.dossier.tealBright};`
        : css`background: transparent; border: 1px solid ${theme.color.brand}; color: ${theme.color.brand};`)}
    }
  }
  .fc-letter {
    margin: 0 0 10px; white-space: pre-wrap; font-family: ${({ theme }) => theme.font.mono};
    font-size: 11.5px; line-height: 1.55; max-height: 260px; overflow: auto;
    padding: 12px 14px; border-radius: ${({ theme }) => theme.size.radius.md};
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`color: ${theme.dossier.mutedOnDark}; border: 1px solid ${theme.dossier.hairlineOnDark};`
      : css`color: ${theme.color.inkSoft}; background: ${theme.color.surface}; border: 1px solid ${theme.color.border};`)}
  }
  .fc-line {
    display: inline-block; font-family: ${({ theme }) => theme.font.mono}; font-size: 11.5px;
    border-radius: ${({ theme }) => theme.size.radius.sm}; padding: 3px 8px; margin-bottom: 10px; word-break: break-word;
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`color: ${theme.dossier.mutedOnDark}; border: 1px solid ${theme.dossier.hairlineOnDark};`
      : css`color: ${theme.color.inkSoft}; background: ${theme.color.surface}; border: 1px solid ${theme.color.border};`)}
  }
  .fc-text {
    margin: 0; line-height: 1.55;
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`font-size: 13.5px; color: ${theme.dossier.mutedOnDark};`
      : css`font-size: 13px; color: ${theme.color.inkSoft};`)}
    strong { color: ${({ theme, $variant }) => ($variant === 'dossier' ? theme.dossier.inkOnDark : theme.color.ink)}; font-weight: 700; }
  }
  .fc-more {
    margin: 12px 0 0; padding-top: 10px; font-size: 12px;
    border-top: 1px solid ${({ theme, $variant }) => ($variant === 'dossier' ? theme.dossier.hairlineOnDark : theme.color.border)};
    color: ${({ theme, $variant }) => ($variant === 'dossier' ? theme.dossier.mutedOnDark : theme.color.muted)};
    strong { color: ${({ theme, $variant }) => ($variant === 'dossier' ? theme.dossier.inkOnDark : theme.color.ink)}; font-weight: 700; }
  }
`;

/**
 * @param {object}  finding    - { title, lineDescription, annualImpact, text, tone?, metricText? }
 * @param {number}  extraCount - antal övriga fynd (visar "+N fler fynd")
 * @param {string}  variant    - 'light' (testa-faktura) | 'dossier' (kontoret)
 * @param {string}  eyebrow    - valfri rubrik (default per ton/variant)
 */
export default function FindingCard({ finding, extraCount = 0, variant = 'light', eyebrow }) {
  const [visarBrev, setVisarBrev] = useState(false);
  const [kopierat, setKopierat] = useState(false);
  if (!finding || !finding.title) return null;
  const tone = finding.tone === 'watch' ? 'watch' : 'leak';
  const defaultLabel = tone === 'watch'
    ? 'Avtalsbevakning'
    : (variant === 'dossier' ? 'Fynd på era fakturor' : 'Fynd på er faktura');
  const label = eyebrow ?? defaultLabel;
  const hasImpact = finding.annualImpact > 0;
  return (
    <Card $variant={variant} $tone={tone}>
      <div className="fc-eyebrow">{label}</div>
      <div className="fc-row">
        <div className="fc-title">{finding.title}</div>
        {hasImpact
          ? <div className="fc-impact">{fmt(finding.annualImpact)} kr/år</div>
          : finding.metricText ? <div className="fc-impact">{finding.metricText}</div> : null}
      </div>
      {finding.lineDescription && <div className="fc-line">”{finding.lineDescription}”</div>}
      {/* Kravet före förklaringen: det som går att hämta hem i dag ska läsas först. Brevet är
          MEKANIK, inte ett löfte — vi skriver det, kunden skickar det i eget namn (regel 9).
          Renderas bara när koden faktiskt producerat ett brev ur kundens egen rad. */}
      {finding.overpaidToDate > 0 && (
        <div className="fc-claim">
          <span className="fc-claim-k">Att begära tillbaka</span>
          <span className="fc-claim-v">{fmt(finding.overpaidToDate)} kr</span>
          {finding.letter && (
            <button
              type="button"
              className="fc-claim-b"
              onClick={() => {
                if (visarBrev) {
                  navigator.clipboard?.writeText(`${finding.letter.subject}\n\n${finding.letter.body}`)
                    .then(() => { setKopierat(true); setTimeout(() => setKopierat(false), 2200); })
                    .catch(() => {});
                } else setVisarBrev(true);
              }}
            >
              {visarBrev ? (kopierat ? 'Kopierat ✓' : 'Kopiera brevet') : 'Vi skrev brevet →'}
            </button>
          )}
        </div>
      )}
      {visarBrev && finding.letter && (
        <div className="fc-letter">{finding.letter.subject}{'\n\n'}{finding.letter.body}</div>
      )}
      <p className="fc-text">{finding.text}</p>
      {extraCount > 0 && (
        <p className="fc-more"><strong>+{extraCount} fler fynd</strong> på fakturan — vi går igenom dem i er genomgång.</p>
      )}
    </Card>
  );
}
