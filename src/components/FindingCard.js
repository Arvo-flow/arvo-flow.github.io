// src/components/FindingCard.js — EN delad fynd-komponent, två ansikten (konvergens steg 2).
// Samma fynd ritas av EN kodbas, men i två stämningar via variant: 'light' (testa-faktura,
// värmt/inbjudande) och 'dossier' (kontoret, mörkt/förtroligt). Skinnet skiljer — datan och
// strukturen är delad, så de två ytorna aldrig mer kan säga olika saker om samma fynd (regel 5).
//
// Två toner via finding.tone:
//   'leak'  (default) — amber-signal, en hittad läcka (forensik-fynden). Visar kr/år-impact.
//   'watch'           — brand-signal, vaktens lugna besked (kontraktsklockan). Visar metricText
//                       (t.ex. "184 dagar kvar") i stället för kr — klockan är inte ett larm.
import React from 'react';
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
  padding: 18px 20px;
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

  .fc-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
  .fc-title {
    line-height: 1.18;
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`font-family: ${theme.font.display}; font-weight: 600; font-size: clamp(20px, 3.4vw, 27px); color: ${theme.dossier.inkOnDark};`
      : css`font-weight: 700; font-size: 17px; color: ${theme.color.ink};`)}
  }
  .fc-impact {
    flex-shrink: 0; font-family: ${({ theme }) => theme.font.mono}; font-weight: 600; letter-spacing: -.02em;
    font-feature-settings: 'tnum'; color: ${({ theme, $tone, $variant }) => accent(theme, $tone, $variant)}; white-space: nowrap;
    font-size: ${({ $variant }) => ($variant === 'dossier' ? 'clamp(20px, 3.6vw, 26px)' : 'clamp(18px, 4vw, 24px)')};
  }
  .fc-line {
    display: inline-block; font-family: ${({ theme }) => theme.font.mono}; font-size: 12.5px;
    border-radius: ${({ theme }) => theme.size.radius.sm}; padding: 4px 9px; margin-bottom: 12px; word-break: break-word;
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`color: ${theme.dossier.mutedOnDark}; border: 1px solid ${theme.dossier.hairlineOnDark};`
      : css`color: ${theme.color.inkSoft}; background: ${theme.color.surface}; border: 1px solid ${theme.color.border};`)}
  }
  .fc-text {
    margin: 0; line-height: 1.6;
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`font-size: 14.5px; color: ${theme.dossier.mutedOnDark};`
      : css`font-size: 13.5px; color: ${theme.color.inkSoft};`)}
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
      <p className="fc-text">{finding.text}</p>
      {extraCount > 0 && (
        <p className="fc-more"><strong>+{extraCount} fler fynd</strong> på fakturan — vi går igenom dem i er genomgång.</p>
      )}
    </Card>
  );
}
