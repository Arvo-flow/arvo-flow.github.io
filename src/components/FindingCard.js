// src/components/FindingCard.js — EN delad fynd-komponent, två ansikten (konvergens steg 2).
// Samma forensik-fynd (leadFinding: title/lineDescription/annualImpact/text) ritas av EN kodbas,
// men i två stämningar via variant: 'light' (testa-faktura, värmt/inbjudande) och 'dossier'
// (kontoret, mörkt/förtroligt). Skinnet skiljer — datan och strukturen är delad, så de två ytorna
// aldrig mer kan säga olika saker om samma fynd (regel 5). Amber-signal = en hittad läcka.
import React from 'react';
import styled, { css } from 'styled-components';

const fmt = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

const Card = styled.section`
  position: relative;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1px solid ${({ theme }) => theme.color.warning};
  padding: 18px 20px;
  margin: ${({ $variant }) => ($variant === 'dossier' ? '26px 0 4px' : '0 0 20px')};
  background: ${({ theme, $variant }) => ($variant === 'dossier' ? theme.dossier.bgRaised : theme.color.warningSoft)};

  .fc-eyebrow {
    display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px;
    text-transform: uppercase; color: ${({ theme }) => theme.color.warning};
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`font-family: ${theme.font.mono}; font-size: 11px; letter-spacing: .22em;`
      : css`font-size: 10px; font-weight: 800; letter-spacing: .1em;`)}
  }
  .fc-eyebrow::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${({ theme }) => theme.color.warning}; }

  .fc-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 12px; }
  .fc-title {
    line-height: 1.18;
    ${({ theme, $variant }) => ($variant === 'dossier'
      ? css`font-family: ${theme.font.display}; font-weight: 600; font-size: clamp(20px, 3.4vw, 27px); color: ${theme.dossier.inkOnDark};`
      : css`font-weight: 700; font-size: 17px; color: ${theme.color.ink};`)}
  }
  .fc-impact {
    flex-shrink: 0; font-family: ${({ theme }) => theme.font.mono}; font-weight: 600; letter-spacing: -.02em;
    font-feature-settings: 'tnum'; color: ${({ theme }) => theme.color.warning}; white-space: nowrap;
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
 * @param {object}  finding    - leadFinding: { title, lineDescription, annualImpact, text }
 * @param {number}  extraCount - antal övriga fynd (visar "+N fler fynd")
 * @param {string}  variant    - 'light' (testa-faktura) | 'dossier' (kontoret)
 * @param {string}  eyebrow    - valfri rubrik (default per variant)
 */
export default function FindingCard({ finding, extraCount = 0, variant = 'light', eyebrow }) {
  if (!finding || !finding.title) return null;
  const label = eyebrow ?? (variant === 'dossier' ? 'Fynd på era fakturor' : 'Fynd på er faktura');
  return (
    <Card $variant={variant}>
      <div className="fc-eyebrow">{label}</div>
      <div className="fc-row">
        <div className="fc-title">{finding.title}</div>
        {finding.annualImpact > 0 && <div className="fc-impact">{fmt(finding.annualImpact)} kr/år</div>}
      </div>
      {finding.lineDescription && <div className="fc-line">”{finding.lineDescription}”</div>}
      <p className="fc-text">{finding.text}</p>
      {extraCount > 0 && (
        <p className="fc-more"><strong>+{extraCount} fler fynd</strong> på fakturan — vi går igenom dem i er genomgång.</p>
      )}
    </Card>
  );
}
