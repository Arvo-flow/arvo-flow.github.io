import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.04); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0%   { transform: translateX(-120%) skewX(-12deg); }
  100% { transform: translateX(220%)  skewX(-12deg); }
`;

const livePulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(27,122,110,.5); }
  60%       { box-shadow: 0 0 0 4px rgba(27,122,110,.0); }
`;

export const Page = styled.main`
  background: ${({ theme }) => theme.color.bg};
  min-height: 100vh;
`;

export const Hero = styled.section`
  max-width: 760px;
  margin: 0 auto;
  padding: 80px 28px 32px;
  text-align: center;
  animation: ${fadeUp} 0.6s ease both;
  @media (max-width: 740px) { padding: 48px 20px 20px; }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.size.radius.pill};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  background: ${({ theme }) => theme.color.surface};
  font-size: 12.5px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.inkSoft};

  span.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }
`;

export const Headline = styled.h1`
  margin-top: 22px;
  font-size: clamp(38px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.025em;
  em { font-style: italic; color: ${({ theme }) => theme.color.brand}; font-weight: 500; }
`;

export const Lede = styled.p`
  margin: 22px auto 0;
  max-width: 580px;
  font-size: 17px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
`;

export const Body = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 16px 28px 64px;
  @media (max-width: 740px) { padding: 12px 20px 48px; }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px;
  margin-bottom: 16px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  animation: ${fadeUp} 0.5s ease both;
  @media (max-width: 600px) { padding: 22px 20px; }
`;

export const Dropzone = styled.div`
  position: relative;
  border: 2px dashed ${({ theme, $active, $hasFile }) => {
    if ($active) return theme.color.brand;
    if ($hasFile) return theme.color.brand;
    return '#A8C8BE';
  }};
  background: ${({ theme, $active, $hasFile }) => {
    if ($active) return theme.color.brandSoft;
    if ($hasFile) return theme.color.brandSoft;
    return theme.color.surfaceAlt;
  }};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px 24px 28px;
  text-align: center;
  cursor: pointer;
  transition: background ${({ theme }) => theme.motion.fast},
              border-color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.color.brandSoft};
    border-color: ${({ theme }) => theme.color.brand};
  }

  div.icon {
    margin: 0 auto 16px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.brand};
  }

  strong.primary {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    margin-bottom: 14px;
  }

  span.cta-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 22px;
    border-radius: 100px;
    background: linear-gradient(135deg, #5DD6CA, #1B6E66);
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
    pointer-events: none;
    margin-bottom: 14px;
  }

  span.secondary {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
  }
  span.filename {
    display: block;
    margin-top: 8px;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 13px;
    color: ${({ theme }) => theme.color.brandInk};
    word-break: break-all;
  }

  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 18px;
  @media (max-width: 540px) { grid-template-columns: 1fr; }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span.label {
    font-size: 12.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.muted};
  }

  span.hint {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.4;
    margin-bottom: 2px;
  }

  select, input {
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    transition: border-color ${({ theme }) => theme.motion.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }
  }
`;

export const SubmitRow = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormReveal = styled.div`
  animation: ${slideDown} 0.28s cubic-bezier(0.4, 0, 0.2, 1) both;
`;

export const ScoreAnalysis = styled.div`
  margin: 20px 0 6px;
  animation: ${fadeUp} .4s ease both;

  .sa-head {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-bottom: 14px;
  }
  .sa-gauge {
    position: relative;
    width: 74px;
    height: 74px;
    flex-shrink: 0;
  }
  .sa-gauge svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }
  .sa-num {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  .sa-val {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 27px;
    font-weight: 500;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    color: var(--diag-color);
  }
  .sa-den {
    font-size: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.mutedSoft};
    letter-spacing: 0.02em;
    margin-top: 3px;
  }
  .sa-meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .sa-eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.color.brand};
  }
  .sa-label {
    font-size: 12.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--diag-label-clr);
    line-height: 1.1;
  }
  .sa-text {
    font-size: 15.5px;
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.ink};
    margin: 0;
  }
  @media (max-width: 480px) {
    .sa-label { font-size: 14px; }
    .sa-text { font-size: 14.5px; }
  }
`;

export const CalcToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  background: none;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  cursor: pointer;
  padding: 14px 0 6px;
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.brand};
  font-family: inherit;
  letter-spacing: 0.01em;
  transition: opacity .15s;
  &:hover { opacity: 0.7; }
`;

export const Disclaimer = styled.p`
  margin-top: 14px;
  font-size: 12px;
  color: ${({ theme }) => theme.color.mutedSoft};
  line-height: 1.55;
  text-align: center;

  a {
    color: ${({ theme }) => theme.color.brand};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const ErrorBox = styled.div`
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.dangerSoft};
  border: 1px solid ${({ theme }) => theme.color.danger};
  font-size: 14px;
  color: ${({ theme }) => theme.color.danger};
  line-height: 1.5;
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(250, 250, 247, 0.3);
  border-top-color: #FAFAF7;
  animation: ${spin} 0.7s linear infinite;
`;

export const ProgressList = styled.ol`
  margin: 24px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
`;

export const ProgressItem = styled.li`
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme, $state }) => $state === 'done' ? theme.color.surface : 'transparent'};
  border: 1px solid ${({ theme, $state }) =>
    $state === 'done' ? theme.color.borderStrong : 'transparent'};
  opacity: ${({ $state }) => $state === 'pending' ? 0.55 : 1};
  transition: opacity ${({ theme }) => theme.motion.base},
              background ${({ theme }) => theme.motion.base};

  div.bullet {
    width: 24px; height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme, $state }) => {
      if ($state === 'done') return theme.color.brand;
      if ($state === 'active') return theme.color.brandSoft;
      return theme.color.surfaceAlt;
    }};
    color: ${({ theme, $state }) => $state === 'done' ? '#FAFAF7' : theme.color.muted};
    animation: ${({ $state }) => $state === 'active' ? pulse : 'none'} 1.6s ease-in-out infinite;
    flex-shrink: 0;
  }
  div.label {
    font-size: 14.5px;
    color: ${({ theme, $state }) =>
      $state === 'pending' ? theme.color.muted : theme.color.ink};
    font-weight: ${({ $state }) => $state === 'active' ? 600 : 500};
  }
  div.time {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    color: ${({ theme }) => theme.color.mutedSoft};
  }
`;

export const ResultHead = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  align-items: start;
  margin-bottom: 24px;

  h2 {
    font-size: 22px;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  span.subtitle {
    margin-top: 4px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
    display: block;
  }
`;

export const BriefingHead = styled.div`
  margin-bottom: 28px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .bh-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .bh-stamp {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.brand};
  }
  .bh-dl {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surfaceAlt};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.color.muted};
    transition: all 0.18s;
    padding: 0;
    flex-shrink: 0;
    &:hover {
      background: ${({ theme }) => theme.color.brandSoft};
      border-color: ${({ theme }) => theme.color.brand};
      color: ${({ theme }) => theme.color.brand};
    }
  }
  h2.bh-supplier {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(26px, 4vw, 38px);
    font-weight: 600;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.color.ink};
    line-height: 1.1;
    margin: 0;
    flex: 1;
    min-width: 190px;
  }
  .bh-main {
    margin-bottom: 14px;
  }
  .bh-row {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
    align-items: center;
  }
  .bh-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    color: ${({ theme }) => theme.color.inkSoft};
    white-space: nowrap;
  }
  .bh-chip--alert {
    background: ${({ theme }) => theme.color.brand};
    border-color: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    font-weight: 700;
  }
`;

export const SavingsBlock = styled.div`
  position: relative;
  overflow: hidden;
  padding: 24px 26px 22px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.brandGradient};
  color: #FAFAF7;
  margin-bottom: 12px;
  box-shadow: 0 8px 32px rgba(27,110,102,.22), 0 2px 6px rgba(27,110,102,.14);
  animation: ${fadeUp} 0.5s ease both;

  /* shimmer sweep */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 38%,
      rgba(255,255,255,.14) 48%,
      rgba(255,255,255,.08) 52%,
      transparent 62%
    );
    animation: ${shimmer} 3.6s ease-in-out 1.2s infinite;
    pointer-events: none;
  }

  span.kicker {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    opacity: 0.75;
    margin-bottom: 10px;
  }
  span.amount {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(38px, 6.5vw, 56px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    font-feature-settings: "tnum";
  }
  span.unit {
    display: block;
    margin-top: 10px;
    font-size: 13.5px;
    opacity: 0.82;
    line-height: 1.55;
    border-top: 1px solid rgba(255,255,255,.18);
    padding-top: 10px;
  }
  span.key-finding {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    font-weight: 600;
    opacity: 0.9;
    letter-spacing: .01em;
    border-top: 1px solid rgba(255,255,255,.14);
    padding-top: 10px;
  }
`;

export const EstimateSavingsBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  border: 1.5px solid ${({ theme }) => theme.color.brand}99;
  margin-bottom: 20px;

  .estimate-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  span.kicker {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.brand};
  }
  span.estimate-badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.brand};
    background: ${({ theme }) => theme.color.brandSoft};
    border-radius: 4px;
    padding: 2px 6px;
  }
  span.amount {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(42px, 7vw, 64px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    font-feature-settings: "tnum";
    color: ${({ theme }) => theme.color.brand};
  }
  span.unit {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
  }
`;

// Verifierad M365-referens på Google-kortet: den BEVISADE datan (M365, verifierat SEK) som benchmark
// för den OBEVISADE (Google, inget publikt SEK). Visar Microsofts pris för den likvärdiga sviten —
// uttryckligen INTE Googles pris (disclaimer alltid med). Instrumentkänsla: monospace på talet.
export const M365ReferenceBlock = styled.div`
  padding: 20px 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  border: 1.5px solid ${({ theme }) => theme.color.border};
  margin-bottom: 20px;

  .ref-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  span.kicker {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.muted};
  }
  span.ref-badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.brand};
    background: ${({ theme }) => theme.color.brandSoft};
    border-radius: 4px;
    padding: 2px 6px;
  }
  .ref-tier {
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    font-size: 15px;
    margin-bottom: 8px;
  }
  .ref-figure {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: clamp(24px, 4.2vw, 34px);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    color: ${({ theme }) => theme.color.ink};
  }
  .ref-figure .per {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.muted};
  }
  .ref-sub {
    margin-top: 8px;
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
  }
  .ref-disclaimer {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
  }
  .ref-disclaimer strong {
    color: ${({ theme }) => theme.color.ink};
    font-weight: 600;
  }
`;

// ── AdvisoryCard — premiumkort för rätt-storlek/referens-råd (molnväxel, M365, Adobe, Fortnox) ──
// Instrument, inte ruta: monospace-hjältetal, visuell jämförelse mot verifierat golv, signalfärg
// sparsamt. 100 % theme-tokens (regel 6) — ersätter de inline-hex-boxar som drog ner ytan.
export const AdvisoryCard = styled.div`
  grid-column: 1 / -1;
  position: relative;
  margin-top: 14px;
  margin-bottom: 22px;
  padding: 22px 24px 18px;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;

  /* dossier-keyline överst — telemetri, inte dekor */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: ${({ theme }) => theme.color.brandGradient};
  }

  .adv-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
  }
  .adv-eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: ${({ theme }) => theme.color.brand};
  }
  .adv-badge {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.brand};
    background: ${({ theme }) => theme.color.brandSoft};
    border-radius: ${({ theme }) => theme.size.radius.pill};
    padding: 3px 9px;
  }
  .adv-badge::before {
    content: '';
    width: 5px; height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
  }

  /* Hjältetalet — kundens faktiska kostnad, instrumentläst */
  .adv-figure {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: clamp(30px, 6vw, 40px);
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    color: ${({ theme }) => theme.color.ink};
  }
  .adv-figure .unit {
    display: block;
    margin-top: 6px;
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
    color: ${({ theme }) => theme.color.muted};
  }

  /* Visuell jämförelse mot verifierat golv — två staplar på gemensam skala */
  .adv-compare {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .adv-bar {
    display: grid;
    grid-template-columns: 92px 1fr auto;
    align-items: center;
    gap: 12px;
  }
  .adv-bar .lbl {
    font-size: 11.5px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.muted};
  }
  .adv-bar .track {
    height: 8px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme }) => theme.color.surfaceAlt};
    overflow: hidden;
  }
  .adv-bar .fill {
    height: 100%;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    transition: width ${({ theme }) => theme.motion.slow};
  }
  .adv-bar.you .fill {
    background: ${({ theme, $over }) => ($over ? theme.color.warning : theme.color.brand)};
  }
  .adv-bar.floor .fill {
    background: ${({ theme }) => theme.color.borderStrong};
  }
  .adv-bar .amt {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 13px;
    font-weight: 600;
    font-feature-settings: "tnum";
    color: ${({ theme }) => theme.color.inkSoft};
    white-space: nowrap;
  }

  /* Signalchip — sparsam färg, bara när siffran förtjänar den */
  .adv-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 16px;
    padding: 6px 12px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    font-size: 12px;
    font-weight: 600;
    line-height: 1.3;
  }
  .adv-pill.warn {
    color: ${({ theme }) => theme.color.warning};
    background: ${({ theme }) => theme.color.warningSoft};
  }
  .adv-pill.ok {
    color: ${({ theme }) => theme.color.success};
    background: ${({ theme }) => theme.color.successSoft};
  }
  .adv-pill.neutral {
    color: ${({ theme }) => theme.color.muted};
    background: ${({ theme }) => theme.color.surfaceAlt};
  }

  .adv-prose {
    margin: 16px 0 0;
    font-size: 14px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  .adv-prose strong { color: ${({ theme }) => theme.color.ink}; font-weight: 700; }

  .adv-addons {
    margin: 12px 0 0;
    font-size: 12.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.muted};
  }

  .adv-foot {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    font-size: 11px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.mutedSoft};
  }

  @media (max-width: 480px) {
    padding: 20px 18px 16px;
    .adv-bar { grid-template-columns: 76px 1fr auto; gap: 9px; }
    .adv-bar .lbl { font-size: 11px; }
  }
`;

// ── ForensicLead — fynd-domen som LEDER (forensik-inversionen) ──────────────────
// Mekanismen kunden blöder på, läst ur deras EGEN faktura, överst före benchmark/score.
// Signalfärg (warning) för att den är ett fynd — en hittad läcka, inte ett pålägg. 100% theme-tokens.
export const ForensicLead = styled.div`
  position: relative;
  margin: 0 0 20px;
  padding: 18px 20px;
  background: ${({ theme }) => theme.color.warningSoft};
  border: 1px solid ${({ theme }) => theme.color.warning};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  overflow: hidden;

  .fl-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.warning};
    margin-bottom: 10px;
  }
  .fl-eyebrow::before {
    content: '';
    width: 7px; height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.warning};
  }
  .fl-title {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.3;
    color: ${({ theme }) => theme.color.ink};
    margin: 0 0 10px;
  }
  .fl-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .fl-line {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.inkSoft};
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.size.radius.sm};
    padding: 4px 9px;
    word-break: break-word;
  }
  .fl-impact {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: clamp(20px, 4vw, 26px);
    font-weight: 600;
    letter-spacing: -0.02em;
    font-feature-settings: "tnum";
    color: ${({ theme }) => theme.color.warning};
    white-space: nowrap;
  }
  .fl-text {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  .fl-more {
    margin: 12px 0 0;
    padding-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.color.warning}33;
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
  }
  .fl-more strong { color: ${({ theme }) => theme.color.ink}; font-weight: 700; }
`;

export const PriceNote = styled.p`
  margin-top: 10px;
  margin-bottom: ${({ $compact }) => $compact ? '10px' : '24px'};
  font-size: 12px;
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.6;
  font-style: italic;
  text-align: center;
`;

export const SwitchCTARow = styled.div`
  margin-bottom: 24px;
`;

export const PartnerBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 10px 0 4px;
  padding: 18px 20px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  border: 1.5px solid ${({ theme }) => theme.color.brand}55;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.color.brandSoft} 0%,
    ${({ theme }) => theme.color.surface} 100%
  );

  div.left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  span.verified-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    flex-shrink: 0;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }

  p.partner-name {
    margin: 0;
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
  }

  p.price-label {
    margin: 3px 0 0;
    font-size: 12px;
    color: ${({ theme }) => theme.color.brand};
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  div.price-offer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-shrink: 0;
    margin-right: 16px;
    @media (max-width: 540px) { display: none; }
  }
  span.offer-price {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.03em;
    font-feature-settings: "tnum";
    color: ${({ theme }) => theme.color.ink};
  }
  span.offer-label {
    font-size: 11px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 1px;
  }

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const SwitchCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-top: 3px solid ${({ theme }) => theme.color.brand};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px 32px 26px;
  margin-bottom: 12px;
  box-shadow: 0 4px 24px rgba(14,26,23,.10), 0 1px 4px rgba(14,26,23,.06);
  animation: ${fadeUp} 0.5s ease 0.08s both;

  .switch-eyebrow {
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.brand};
    text-transform: uppercase;
    letter-spacing: .22em;
    margin-bottom: 8px;
  }

  h3 {
    font-size: clamp(24px, 3.6vw, 30px);
    font-weight: 800;
    letter-spacing: -.028em;
    color: ${({ theme }) => theme.color.ink};
    margin: 0 0 8px;
    line-height: 1.18;
  }

  p.sub {
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.65;
    margin: 0 0 20px;
  }

  .switch-steps {
    display: flex;
    flex-direction: column;
    margin: 4px 0 24px;
  }

  .switch-step {
    position: relative;
    display: flex;
    gap: 16px;
    padding-bottom: 22px;
    &:last-child { padding-bottom: 0; }
  }

  /* connecting timeline line */
  .switch-step:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 13px;
    top: 30px;
    bottom: -2px;
    width: 2px;
    background: ${({ theme }) => theme.color.brand}26;
  }

  .step-num {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.surface};
    border: 2px solid ${({ theme }) => theme.color.brand};
    color: ${({ theme }) => theme.color.brand};
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-feature-settings: "tnum";
  }

  .step-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 3px;
  }

  .step-title {
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.015em;
    line-height: 1.3;
  }

  .step-detail {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
  }

  .switch-offer {
    border-radius: ${({ theme }) => theme.size.radius.md};
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    overflow: hidden;
    margin-bottom: 20px;
  }

  .switch-offer-head {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 14px 18px;
    background: ${({ theme }) => theme.color.surface};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }

  .switch-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    flex-shrink: 0;
  }

  .switch-supplier {
    flex: 1;
    min-width: 0;
  }

  .switch-supplier-name {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    margin: 0;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }

  .switch-price-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    color: ${({ theme }) => theme.color.brand};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    margin: 3px 0 0;
  }

  .switch-offer-body {
    padding: 20px 22px 18px;
  }

  .sp-from-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .sp-old {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.mutedSoft};
    text-decoration: line-through;
    text-decoration-color: ${({ theme }) => theme.color.borderStrong};
    font-feature-settings: "tnum";
    white-space: nowrap;
  }

  .sp-from-arrow {
    font-size: 13px;
    color: ${({ theme }) => theme.color.mutedSoft};
    flex-shrink: 0;
  }

  .sp-new {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(40px, 6vw, 52px);
    font-weight: 500;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.color.brand};
    line-height: 1;
    font-feature-settings: "tnum";
    white-space: nowrap;
    display: block;
    margin-bottom: 10px;

    small {
      font-family: ${({ theme }) => theme.font.sans};
      font-size: 15px;
      font-weight: 400;
      color: ${({ theme }) => theme.color.muted};
      margin-left: 4px;
      letter-spacing: 0;
    }
  }

  .sp-save-note {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.4;
  }

  .switch-fine-print {
    font-size: 11.5px;
    color: ${({ theme }) => theme.color.muted};
    text-align: center;
    margin-top: 10px;
    line-height: 1.5;
  }

  @media (max-width: 600px) { padding: 22px 20px; }
`;

export const NoSwitchBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05), 0 1px 2px rgba(14,26,23,.04);

  strong {
    display: block;
    font-size: 18px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.color.ink};
  }
  p {
    font-size: 14.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.muted};
  }

  .estimate-banner {
    margin: 0 0 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
  .est-kicker {
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 8px;
  }
  .est-amount {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(36px, 6vw, 52px);
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.0;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
    margin-bottom: 6px;
  }
  .est-note {
    display: block;
    font-size: 12px;
    color: ${({ theme }) => theme.color.inkSoft};
    line-height: 1.5;
  }
`;

export const QuoteLeadForm = styled.form`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.color.borderStrong};

  .qlf-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
    @media (max-width: 480px) { grid-template-columns: 1fr; }
  }
  .qlf-full { grid-column: 1 / -1; }

  input[type="text"], input[type="email"] {
    width: 100%;
    box-sizing: border-box;
    padding: 11px 13px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    font-size: 14px;
    color: ${({ theme }) => theme.color.ink};
    background: ${({ theme }) => theme.color.surface};
    outline: none;
    &:focus { border-color: ${({ theme }) => theme.color.accent}; }
    &::placeholder { color: ${({ theme }) => theme.color.muted}; }
  }

  .qlf-mandate {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 12px 0 14px;
    padding: 12px 14px;
    background: ${({ theme }) => theme.color.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    border-radius: ${({ theme }) => theme.size.radius.md};
    cursor: pointer;

    input[type="checkbox"] {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-top: 2px;
      accent-color: ${({ theme }) => theme.color.brand};
      cursor: pointer;
    }
    span {
      font-size: 12.5px;
      line-height: 1.55;
      color: ${({ theme }) => theme.color.inkSoft};
      em { font-style: normal; font-weight: 600; color: ${({ theme }) => theme.color.ink}; }
    }
  }

  .qlf-sent {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    background: #ECFDF5;
    border: 1px solid #6EE7B7;
    border-radius: ${({ theme }) => theme.size.radius.md};
    font-size: 14px;
    color: #065F46;
    font-weight: 500;
  }

  .qlf-zero-risk {
    margin-top: 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.inkSoft};
    text-align: center;
    line-height: 1.5;
  }
`;

export const MonitoringBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: #FFFBEB;
  border: 1.5px solid #D97706;
  margin-bottom: 20px;

  .monitoring-kicker {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: #B45309;
    margin-bottom: 10px;
  }

  .monitoring-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #D97706;
    box-shadow: 0 0 0 3px #FDE68A;
    flex-shrink: 0;
  }

  strong {
    display: block;
    font-size: 18px;
    font-weight: 700;
    color: #92400E;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    line-height: 1.65;
    color: #78350F;
    margin: 0;
  }
`;

export const OptimizeBlock = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.brandSoft};
  border: 1.5px solid ${({ theme }) => theme.color.brand}55;
  margin-bottom: 20px;

  .kicker {
    display: block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 10px;
  }
  .amount {
    display: block;
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(42px, 7vw, 64px);
    font-weight: 500;
    line-height: 1.0;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
  }
  .unit {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.brandInk};
    opacity: 0.85;
    line-height: 1.5;
    font-feature-settings: "tnum";
  }
`;

export const CreditAlert = styled.div`
  margin-top: 16px;
  padding: 16px 20px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.warningSoft};
  border-left: 3px solid ${({ theme }) => theme.color.warning};

  strong {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.warning};
    margin-bottom: 6px;
  }
  p {
    font-size: 13.5px;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.inkSoft};
    margin: 0;
  }
`;

export const RoamingInsight = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ $type }) => $type === 'satellite' ? '#F8F9FA' : '#EFF9F7'};
  border: 1px solid ${({ theme, $type }) => $type === 'satellite' ? theme.color.border : theme.color.brand + '33'};

  svg { flex-shrink: 0; margin-top: 2px; color: ${({ theme, $type }) => $type === 'satellite' ? theme.color.muted : theme.color.brand}; }
  span {
    font-size: 13px;
    line-height: 1.55;
    color: ${({ theme, $type }) => $type === 'satellite' ? theme.color.muted : theme.color.inkSoft};
  }
`;

export const KV = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
  margin: 32px 0 0;
  @media (max-width: 540px) { grid-template-columns: 1fr; }

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  dt {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => theme.color.muted};
  }
  dd {
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    font-weight: 500;
    margin: 0;
  }
  dd small {
    display: block;
    margin-top: 4px;
    font-size: 11.5px;
    font-weight: 400;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.5;
  }
  div.full {
    grid-column: 1 / -1;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    padding-top: 14px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 8, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeUp} 0.2s ease both;
`;

export const ModalCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px;
  width: 100%;
  max-width: 440px;
  position: relative;

  button.close {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surfaceAlt};
    color: ${({ theme }) => theme.color.muted};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1;
    transition: background ${({ theme }) => theme.motion.fast};
    &:hover { background: ${({ theme }) => theme.color.border}; }
  }

  h3 {
    font-size: 22px;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 8px;
    padding-right: 32px;
    em {
      font-style: normal;
      color: ${({ theme }) => theme.color.brand};
    }
  }

  p.sub {
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
    margin: 0 0 20px;
  }

  div.context-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: ${({ theme }) => theme.size.radius.pill};
    background: ${({ theme }) => theme.color.brandSoft};
    border: 1px solid ${({ theme }) => theme.color.brand}33;
    font-size: 12.5px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.brandInk};
    margin-bottom: 20px;
  }

  div.modal-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input[type="email"] {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    transition: border-color ${({ theme }) => theme.motion.fast};
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }
    &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
  }

  div.gate-saving {
    background: ${({ theme }) => theme.color.brandGradient};
    border-radius: ${({ theme }) => theme.size.radius.lg};
    padding: 22px 24px;
    margin-bottom: 20px;
    color: #FAFAF7;

    span.gate-saving-label {
      display: block;
      font-size: 10.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      opacity: 0.8;
      margin-bottom: 8px;
    }

    span.gate-saving-amount {
      display: block;
      font-family: ${({ theme }) => theme.font.display};
      font-size: clamp(36px, 9vw, 52px);
      font-weight: 500;
      letter-spacing: -0.025em;
      font-feature-settings: "tnum";
      line-height: 1.0;
      margin-bottom: 8px;
    }

    span.gate-saving-context {
      display: block;
      font-size: 13px;
      opacity: 0.8;
      line-height: 1.4;
    }
  }

  p.fine-print {
    margin: 4px 0 0;
    font-size: 11.5px;
    color: ${({ theme }) => theme.color.mutedSoft};
    text-align: center;
    line-height: 1.5;
  }

  button.manual-link {
    display: block;
    width: 100%;
    margin-top: 14px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    text-align: center;
    line-height: 1.5;
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover { color: ${({ theme }) => theme.color.inkSoft}; }
  }

  button.back-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 16px;
    &:hover { color: ${({ theme }) => theme.color.ink}; }
  }

  div.sent-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 0 4px;
    text-align: center;

    span.sent-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.brandSoft};
      color: ${({ theme }) => theme.color.brand};
    }
    p.sent-title {
      font-size: 15px;
      font-weight: 600;
      color: ${({ theme }) => theme.color.ink};
      margin: 0;
    }
    p.sent-sub {
      font-size: 13.5px;
      color: ${({ theme }) => theme.color.muted};
      margin: 0;
      line-height: 1.5;
    }
  }

  /* ── BankID activation modal ────────────────────────────── */
  p.bk-title {
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    margin: 0 0 18px;
    padding-right: 32px;
    color: ${({ theme }) => theme.color.ink};
  }

  div.bk-offer {
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    border-radius: ${({ theme }) => theme.size.radius.md};
    padding: 16px;
    margin-bottom: 18px;
    background: ${({ theme }) => theme.color.surfaceAlt};
  }

  div.bk-offer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  span.bk-partner-name {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
  }

  span.bk-verified {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.brand};
  }

  div.bk-price-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  span.bk-from {
    font-size: 13.5px;
    color: ${({ theme }) => theme.color.muted};
    text-decoration: line-through;
    text-decoration-color: ${({ theme }) => theme.color.muted}88;
  }

  span.bk-arrow {
    color: ${({ theme }) => theme.color.brand};
    font-weight: 700;
    font-size: 14px;
  }

  span.bk-to {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
  }

  p.bk-savings-row {
    font-size: 12.5px;
    color: ${({ theme }) => theme.color.muted};
    margin: 0;
    line-height: 1.5;
  }

  p.bk-email-confirm {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    margin: 0 0 14px;
    strong { color: ${({ theme }) => theme.color.ink}; font-weight: 500; }
  }

  p.bk-fine-print {
    font-size: 12px;
    color: ${({ theme }) => theme.color.mutedSoft};
    text-align: center;
    margin: 12px 0 0;
    line-height: 1.5;
  }
`;

// ── Activation Modal — Arvo Intelligence onboarding ──────────────────────────
export const ActivationCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};
  border-top: 3px solid ${({ theme }) => theme.color.brand};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px 32px 28px;
  width: 100%;
  max-width: 440px;
  position: relative;
  box-shadow: 0 24px 64px rgba(14,26,23,.22);

  button.ac-close {
    position: absolute;
    top: 16px; right: 16px;
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: none;
    color: ${({ theme }) => theme.color.muted};
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; line-height: 1;
    &:hover { background: ${({ theme }) => theme.color.surfaceAlt}; }
  }

  .ac-eyebrow {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .22em; color: ${({ theme }) => theme.color.brand};
    margin-bottom: 12px;
  }

  h2.ac-heading {
    font-size: clamp(20px, 4vw, 26px);
    font-weight: 800; letter-spacing: -.03em;
    color: ${({ theme }) => theme.color.ink};
    margin: 0 0 8px; line-height: 1.15; padding-right: 28px;
  }

  p.ac-sub {
    font-size: 14px; color: ${({ theme }) => theme.color.muted};
    line-height: 1.6; margin: 0 0 24px;
  }

  /* ── OAuth provider buttons ── */
  .ac-oauth-btn {
    display: flex; align-items: center; gap: 12px;
    width: 100%; padding: 13px 18px;
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    border-radius: 11px;
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit; font-size: 14.5px; font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    cursor: pointer; text-align: left; text-decoration: none;
    transition: border-color ${({ theme }) => theme.motion.fast},
                box-shadow    ${({ theme }) => theme.motion.fast};
    margin-bottom: 9px;

    &:hover {
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }

    .ac-provider-badge {
      width: 28px; height: 28px; border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 800; flex-shrink: 0;
    }
    .ac-provider-badge--google  { background: #FEF2F2; color: #C0392B; }
    .ac-provider-badge--outlook { background: #EFF6FF; color: #1D4ED8; }

    .ac-oauth-label { flex: 1; }
    .ac-oauth-arrow { color: ${({ theme }) => theme.color.muted}; font-size: 12px; }
  }

  /* ── Divider ── */
  .ac-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 20px 0 18px;
    font-size: 11.5px; color: ${({ theme }) => theme.color.muted};
    &::before, &::after {
      content: ''; flex: 1; height: 1px;
      background: ${({ theme }) => theme.color.border};
    }
  }

  /* ── Email input ── */
  .ac-email-row { display: flex; gap: 8px; }

  .ac-email-input {
    flex: 1; padding: 12px 14px;
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    border-radius: 10px;
    font-family: inherit; font-size: 14.5px;
    color: ${({ theme }) => theme.color.ink};
    background: ${({ theme }) => theme.color.surface};
    transition: border-color ${({ theme }) => theme.motion.fast};
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }
    &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
  }

  /* ── Privacy note ── */
  .ac-privacy {
    font-size: 11px; color: ${({ theme }) => theme.color.mutedSoft};
    text-align: center; margin-top: 14px; line-height: 1.6;
  }

  /* ── Success state ── */
  .ac-success {
    text-align: center; padding: 8px 0 4px;

    .ac-check {
      width: 52px; height: 52px; border-radius: 50%;
      background: ${({ theme }) => theme.color.brandSoft};
      color: ${({ theme }) => theme.color.brand};
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px; font-size: 22px;
    }
    h3 { font-size: 20px; font-weight: 800; color: ${({ theme }) => theme.color.ink}; margin: 0 0 6px; letter-spacing: -.02em; }
    .ac-email-sent { font-size: 13px; color: ${({ theme }) => theme.color.brand}; font-weight: 600; margin: 0 0 20px; }
    p.ac-success-sub { font-size: 13.5px; color: ${({ theme }) => theme.color.muted}; line-height: 1.6; margin: 0 0 20px; }

    .ac-upgrade-label {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .14em; color: ${({ theme }) => theme.color.muted};
      margin-bottom: 10px; display: block;
    }
  }

  @media (max-width: 480px) {
    padding: 24px 20px 22px;
    h2.ac-heading { font-size: 19px; }
  }
`;

export const FortnoxButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px 20px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  border: none;
  background: #0055CC;
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s;

  &:hover { background: #0047B0; }

  span.f-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    background: #fff;
    color: #0055CC;
    font-size: 13px;
    font-weight: 900;
    line-height: 1;
    flex-shrink: 0;
  }
`;

export const Reasoning = styled.div`
  margin-top: 24px;
  margin-bottom: 28px;
  padding-left: 16px;
  border-left: 3px solid ${({ theme }) => theme.color.brand}55;

  span.kicker {
    display: block;
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 8px;
  }
  p {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 17px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.inkSoft};
    margin: 0;
  }
`;

export const LicenseOverageNote = styled.div`
  margin-top: 16px;
  border-left: 2px solid ${({ theme }) => theme.color.borderStrong};

  .lon-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    background: none;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    &:hover .lon-teaser { color: ${({ theme }) => theme.color.ink}; }
  }
  .lon-head {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  span.kicker {
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.muted};
  }
  .lon-teaser {
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.color.inkSoft};
    letter-spacing: -0.01em;
    transition: color .15s;
  }
  .lon-chevron {
    flex-shrink: 0;
    color: ${({ theme }) => theme.color.muted};
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
    &.open { transform: rotate(90deg); }
  }
  .lon-body {
    padding: 2px 16px 10px;
    animation: ${slideDown} 0.2s ease both;
  }
  p {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 14px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.inkSoft};
    margin: 0;
  }
`;

export const TierOptAccordion = styled.div`
  margin-top: 20px;
  border: 2px solid ${({ theme }) => theme.color.brand};
  border-radius: ${({ theme }) => theme.size.radius.md};
  overflow: hidden;
  box-shadow: 0 2px 8px ${({ theme }) => theme.color.brand}22;

  .acc-trigger {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 15px 18px;
    background: ${({ theme }) => theme.color.surface};
    cursor: pointer;
    border: none;
    text-align: left;
    gap: 10px;
    transition: background 0.14s ease;
    &:hover { background: ${({ theme }) => theme.color.brandSoft}; }
  }
  .acc-icon {
    flex-shrink: 0;
    font-size: 15px;
    line-height: 1;
  }
  .acc-label-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .acc-label {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
  }
  .acc-hint {
    font-size: 11px;
    color: ${({ theme }) => theme.color.brand};
    font-weight: 500;
    letter-spacing: 0;
  }
  .acc-amount {
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
    letter-spacing: -0.015em;
  }
  .acc-chevron {
    flex-shrink: 0;
    margin-left: 4px;
    color: ${({ theme }) => theme.color.brand};
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    &.open { transform: rotate(90deg); }
  }

  .acc-body {
    padding: 16px 18px 20px;
    border-top: 1.5px solid ${({ theme }) => theme.color.brand}33;
    background: ${({ theme }) => theme.color.surface};
  }
  .acc-intro {
    font-size: 14.5px;
    line-height: 1.65;
    color: ${({ theme }) => theme.color.ink};
    margin: 0 0 18px;
  }
  .acc-row {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
  }
  .acc-row-icon {
    flex-shrink: 0;
    margin-top: 2px;
  }
  .acc-row-content {}
  .acc-row-head {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    margin-bottom: 3px;
    &.keeps { color: ${({ theme }) => theme.color.brand}; }
    &.loses { color: ${({ theme }) => theme.color.warning}; }
  }
  .acc-row-text {
    font-size: 13.5px;
    line-height: 1.6;
    color: ${({ theme }) => theme.color.inkSoft};
    margin: 0;
  }
  .acc-disclaimer {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    font-size: 12.5px;
    line-height: 1.6;
    color: #7A8F89;
    font-style: italic;
  }
  .acc-combined {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 10px 14px;
    border-radius: ${({ theme }) => theme.size.radius.sm};
    background: ${({ theme }) => theme.color.brandSoft};
    border: 1px solid ${({ theme }) => theme.color.brand}33;
  }
  .acc-combined-label {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    letter-spacing: -0.01em;
  }
  .acc-combined-amount {
    font-size: 13.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.brand};
    font-feature-settings: "tnum";
    letter-spacing: -0.015em;
  }
  .acc-cta {
    margin-top: 18px;
    text-align: center;
  }
`;

// P2.1 — Beräkningskedja
export const CalculationChain = styled.div`
  margin: 16px 0 20px;
  border: 1px solid ${({ theme }) => theme.color.border ?? '#D5E2DC'};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  overflow: hidden;

  .chain-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: ${({ theme }) => theme.color.surface ?? '#F7FAF9'};
    border-bottom: 1px solid ${({ theme }) => theme.color.border ?? '#D5E2DC'};
    cursor: pointer;
    user-select: none;
    gap: 8px;
  }
  .chain-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .07em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.brand ?? '#1B6E66'};
  }
  .chain-toggle {
    font-size: 11px;
    color: #888;
    flex-shrink: 0;
  }
  .chain-body {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .chain-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 12px;
    font-size: 13px;
    color: ${({ theme }) => theme.color.text ?? '#0E1A17'};
    border-bottom: 1px dashed #E8F0EC;
    padding-bottom: 7px;
    &:last-child { border-bottom: none; padding-bottom: 0; }
  }
  .chain-row.total {
    font-weight: 700;
    font-size: 14px;
    color: ${({ theme }) => theme.color.brand ?? '#1B6E66'};
    border-top: 1.5px solid #D5E2DC;
    border-bottom: none;
    padding-top: 8px;
    margin-top: 4px;
  }
  .chain-label { color: #5C6E68; font-size: 12px; }
  .chain-value { font-weight: 600; white-space: nowrap; }
  .chain-source {
    font-size: 10px;
    color: #888;
    margin-top: 2px;
  }
`;

// P2.2 — Konfidensintervall-badge (för Kategori 2)
export const SavingRangeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: rgba(27,110,102,.08);
  border: 1px solid rgba(27,110,102,.18);
  border-radius: 100px;
  font-size: 11px;
  color: #1B6E66;
  font-weight: 600;
  margin-top: 6px;

  .range-label { opacity: .7; font-weight: 400; }
`;

export const NextSteps = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 28px 32px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(14,26,23,.05), 0 1px 2px rgba(14,26,23,.04);

  h3 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.015em;
    margin-bottom: 8px;
    sup {
      font-size: 9px;
      font-weight: 700;
      color: ${({ theme }) => theme.color.brand};
      vertical-align: super;
    }
  }
  p.sub {
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.65;
    margin: 0 0 16px;
  }
  p.seg-count {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.muted};
    margin: 0 0 10px;
  }

  .segment-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-bottom: 20px;
    @media (max-width: 580px) { grid-template-columns: repeat(2, 1fr); }
  }
  .segment-tile {
    position: relative;
    padding: 12px 12px 11px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.border};
    background: ${({ theme }) => theme.color.surface};
    display: flex;
    flex-direction: column;
    gap: 3px;
    opacity: 0.6;
    cursor: default;
    transition: opacity 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
    &:hover {
      opacity: 0.85;
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(14,26,23,.07);
    }
  }
  .tile-active {
    border: 1.5px solid ${({ theme }) => theme.color.brand};
    background: linear-gradient(
      145deg,
      ${({ theme }) => theme.color.brandSoft} 0%,
      ${({ theme }) => theme.color.surface} 100%
    );
    box-shadow: 0 2px 12px ${({ theme }) => theme.color.brand}1A;
    opacity: 1;
    &:hover {
      opacity: 1;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px ${({ theme }) => theme.color.brand}2A;
    }
  }
  .tile-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.color.surfaceAlt};
    border: 1px solid ${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 7px;
    flex-shrink: 0;
  }
  .icon-active {
    width: 32px;
    height: 32px;
    background: ${({ theme }) => theme.color.brand};
    border-color: transparent;
    color: #FAFAF7;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft};
  }
  .tile-name {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
    color: ${({ theme }) => theme.color.inkSoft};
  }
  .tile-active .tile-name {
    font-size: 12.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
  }
  .tile-status {
    font-size: 10.5px;
    color: ${({ theme }) => theme.color.muted};
    font-weight: 500;
  }
  .status-active {
    color: ${({ theme }) => theme.color.brand};
    font-weight: 600;
    font-size: 11px;
  }
  .tile-metric {
    font-size: 12px;
    font-weight: 800;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
    letter-spacing: -0.03em;
    margin-top: 2px;
  }
  .tile-lock {
    position: absolute;
    top: 8px;
    right: 8px;
    color: ${({ theme }) => theme.color.borderStrong};
  }

  @media (max-width: 600px) { padding: 22px 20px; }
`;

export const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14.5px;
    color: ${({ theme }) => theme.color.inkSoft};
    line-height: 1.5;

    span.check {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.brandSoft};
      color: ${({ theme }) => theme.color.brand};
    }
  }
`;

export const ScoreDiag = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surface};
  border: 1.5px solid var(--diag-color, ${({ theme }) => theme.color.borderStrong});
  margin-bottom: 16px;

  .gauge-wrap {
    flex-shrink: 0;
    position: relative;
    width: 60px;
    height: 60px;
  }
  .gauge-svg {
    position: absolute;
    inset: 0;
  }
  .gauge-num {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;
    gap: 2px;
  }
  .gauge-val {
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.04em;
    font-feature-settings: "tnum";
  }
  .gauge-denom {
    font-size: 8px;
    font-weight: 600;
    opacity: 0.5;
    letter-spacing: 0;
  }
  .diag-body {
    flex: 1;
    min-width: 0;
  }
  .diag-top {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 4px;
  }
  .diag-score-label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: ${({ theme }) => theme.color.ink};
  }
  .diag-sep {
    color: ${({ theme }) => theme.color.borderStrong};
    font-size: 13px;
    flex-shrink: 0;
  }
  .diag-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }
  .diag-label {
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .diag-text {
    font-size: 14.5px;
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.color.ink};
    margin: 0;
    line-height: 1.55;
  }

  @media (max-width: 480px) {
    gap: 15px;
    padding: 16px 18px;
    align-items: flex-start;
    .diag-top {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
    .diag-sep { display: none; }
  }
`;

export const EmailGate = styled.div`
  margin-top: 20px;
  padding: 20px 24px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.borderStrong};

  p.label {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    margin-bottom: 12px;
  }

  div.row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  input[type="email"] {
    flex: 1;
    min-width: 200px;
    padding: 11px 14px;
    border-radius: ${({ theme }) => theme.size.radius.md};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    background: ${({ theme }) => theme.color.surface};
    font-family: inherit;
    font-size: 15px;
    color: ${({ theme }) => theme.color.ink};
    transition: border-color ${({ theme }) => theme.motion.fast};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.color.brand};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    }
    &::placeholder { color: ${({ theme }) => theme.color.mutedSoft}; }
  }

  p.note {
    margin-top: 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.mutedSoft};
    line-height: 1.5;
  }

  div.sent {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.color.brand};
    font-size: 14.5px;
    font-weight: 500;
    padding: 4px 0;
  }
`;

// ── Batch mode UI ─────────────────────────────────────────────────────────────

export const BatchHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: ${({ theme }) => theme.color.brandSoft};
    color: ${({ theme }) => theme.color.brand};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 100px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.ink};
    margin: 0;
  }

  .sub {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    margin-top: 1px;
  }
`;

export const BatchProgressBar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.color.borderSoft};
  border-radius: 3px;
  margin-bottom: 24px;
  overflow: hidden;

  .fill {
    height: 100%;
    background: ${({ theme }) => theme.color.brand};
    border-radius: 3px;
    transition: width 0.4s ease;
    width: ${({ $pct }) => $pct ?? 0}%;
  }
`;

export const BatchInvoiceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

export const BatchInvoiceCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.size.radius.md};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ $status, theme }) =>
    $status === 'done'       ? theme.color.brand + '33' :
    $status === 'failed'     ? '#E5383B33' :
    $status === 'processing' ? theme.color.brand + '22' :
    theme.color.border};
  transition: border-color 0.2s;

  .icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ $status, theme }) =>
      $status === 'done'       ? theme.color.brandSoft :
      $status === 'failed'     ? '#FFE8E8' :
      $status === 'processing' ? theme.color.brandSoft + '88' :
      theme.color.borderSoft};
    color: ${({ $status, theme }) =>
      $status === 'done'       ? theme.color.brand :
      $status === 'failed'     ? '#C0392B' :
      $status === 'processing' ? theme.color.brand :
      theme.color.muted};
  }

  .name {
    flex: 1;
    min-width: 0;
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.ink};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status-label {
    font-size: 11.5px;
    font-weight: 500;
    color: ${({ $status, theme }) =>
      $status === 'done'       ? theme.color.brand :
      $status === 'failed'     ? '#C0392B' :
      $status === 'processing' ? theme.color.brand :
      theme.color.muted};
    white-space: nowrap;
  }

  .saving {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.brand};
    white-space: nowrap;
    margin-left: 4px;
  }
`;

export const BatchSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }

  .stat {
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.size.radius.md};
    padding: 14px;
    text-align: center;

    .value {
      font-size: 22px;
      font-weight: 700;
      color: ${({ theme }) => theme.color.ink};
      line-height: 1.1;
    }
    .label {
      font-size: 11px;
      color: ${({ theme }) => theme.color.muted};
      margin-top: 2px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    &.highlight .value {
      color: ${({ theme }) => theme.color.brand};
    }
  }
`;


// ── Arvo Intelligence — premium AI-CFO acquisition card ────────────────────
export const IntelligenceCard = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-top: 3px solid ${({ theme }) => theme.color.brand};
  border-radius: ${({ theme }) => theme.size.radius.lg};
  padding: 32px 32px 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 24px rgba(14,26,23,.08), 0 1px 4px rgba(14,26,23,.04);
  animation: ${fadeUp} 0.5s ease 0.16s both;

  .eyebrow {
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.brand};
    text-transform: uppercase;
    letter-spacing: .22em;
    margin-bottom: 14px;
  }

  h3 {
    font-size: clamp(24px, 3.6vw, 30px);
    font-weight: 800;
    letter-spacing: -.028em;
    color: ${({ theme }) => theme.color.ink};
    margin: 0 0 20px;
    line-height: 1.18;
  }

  p.sub {
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.7;
    margin: 0 0 20px;
  }

  /* ── Briefing preview — signal cards ── */
  .briefing-preview {
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 24px;
    box-shadow: 0 2px 10px rgba(14,26,23,.06);
  }

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    background: ${({ theme }) => theme.color.surface};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }

  .preview-live-dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.brandSoft};
    animation: ${livePulse} 2s ease-in-out infinite;
    margin-right: 7px;
    vertical-align: middle;
    position: relative;
    top: -1px;
  }

  .preview-brand-name {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .18em;
    color: ${({ theme }) => theme.color.brand};
    vertical-align: middle;
  }

  .preview-time {
    font-size: 11px;
    color: ${({ theme }) => theme.color.muted};
  }

  /* ── Signal rows ── */
  .signal {
    display: flex;
    gap: 14px;
    padding: 16px 18px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    &:last-child {
      border-bottom: none;
    }
  }

  .signal-ico {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: ${({ theme }) => theme.color.brandSoft};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.brand};
    margin-top: 1px;
  }

  .signal-tag {
    display: block;
    font-size: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.muted};
    letter-spacing: .04em;
    margin-bottom: 5px;
  }

  .signal-line {
    font-size: 14.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.ink};
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 6px;
    letter-spacing: -.01em;
  }

  .signal-badge {
    font-size: 12px;
    font-weight: 800;
    padding: 3px 9px;
    border-radius: 100px;
    background: #FEF2F2;
    color: #C41E1E;
    white-space: nowrap;
    letter-spacing: -.01em;

    &.signal-badge--contract {
      background: #FFFBEB;
      color: #92400E;
    }
  }

  .signal-sub {
    font-size: 13px;
    line-height: 1.5;
    color: ${({ theme }) => theme.color.muted};
    margin: 0;

    strong { color: ${({ theme }) => theme.color.ink}; font-weight: 700; }
  }

  /* ── Community Benchmark dot grid ── */
  .bench-grid {
    display: grid;
    grid-template-columns: repeat(5, 13px);
    gap: 5px;
    margin: 7px 0 8px;

    span {
      display: block;
      width: 13px;
      height: 13px;
      border-radius: 3px;
      background: ${({ theme }) => theme.color.surfaceAlt};
      border: 1px solid ${({ theme }) => theme.color.border};

      &.on {
        background: ${({ theme }) => theme.color.brand};
        border-color: ${({ theme }) => theme.color.brand};
        opacity: .6;
      }
      &.you {
        background: ${({ theme }) => theme.color.brand};
        border-color: ${({ theme }) => theme.color.brand};
        opacity: 1;
        box-shadow: 0 0 0 2.5px #fff, 0 0 0 4px ${({ theme }) => theme.color.brand};
      }
    }
  }

  /* ── Price row ── */
  .price-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    padding-top: 20px;
    margin-bottom: 16px;
  }

  .price {
    font-family: ${({ theme }) => theme.font.display};
    font-size: 36px;
    font-weight: 500;
    letter-spacing: -.03em;
    color: ${({ theme }) => theme.color.ink};
    font-feature-settings: "tnum";
  }

  .price-period {
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.color.muted};
    margin-left: 4px;
  }

  .price-note {
    font-size: 12px;
    color: ${({ theme }) => theme.color.muted};
  }

  @media (max-width: 600px) {
    padding: 24px 20px 22px;
    h3 { font-size: 21px; }
    .price { font-size: 30px; }
  }
`;

export const PortfolioBridge = styled.div`
  margin-bottom: 12px;
  padding: 30px 32px 26px;
  border-radius: ${({ theme }) => theme.size.radius.lg};
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-top: 3px solid ${({ theme }) => theme.color.brand};
  box-shadow: ${({ theme }) => theme.shadow.md};
  animation: ${fadeUp} 0.5s ease 0.24s both;

  .pb-eyebrow {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .22em;
    color: ${({ theme }) => theme.color.brand};
    margin-bottom: 12px;
  }

  .pb-head {
    font-family: ${({ theme }) => theme.font.display};
    font-size: clamp(20px, 3vw, 27px);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.ink};
    line-height: 1.22;
    margin: 0 0 24px;
    max-width: 30ch;
  }

  .pb-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;
    margin-bottom: 24px;
    @media (max-width: 560px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 18px;
    }
  }

  .pb-seg {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
    text-align: center;
    opacity: 0.42;
    transition: opacity .35s ease, transform .35s ease;
  }
  .pb-seg.lit {
    opacity: 1;
    transform: translateY(-2px);
  }

  .pb-seg-ico {
    width: 52px;
    height: 52px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.color.surface};
    border: 1px solid ${({ theme }) => theme.color.border};
    color: ${({ theme }) => theme.color.muted};
    transition: all .35s ease;
  }
  .pb-seg.lit .pb-seg-ico {
    background: ${({ theme }) => theme.color.brand};
    border-color: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.brandSoft}, 0 6px 16px rgba(27,122,110,.24);
  }

  .pb-seg-label {
    font-size: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.25;
    letter-spacing: -0.005em;
  }
  .pb-seg.lit .pb-seg-label {
    color: ${({ theme }) => theme.color.brandInk};
    font-weight: 700;
  }

  .pb-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
    padding-top: 22px;
    border-top: 1px solid ${({ theme }) => theme.color.border};
  }
  .pb-note {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
    line-height: 1.55;
    margin: 0;
    flex: 1;
    min-width: 220px;
  }
  .pb-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.brand};
    text-decoration: none;
    white-space: nowrap;
    transition: gap .2s ease;
    &:hover { gap: 10px; }
  }

  @media (max-width: 600px) {
    padding: 24px 20px 22px;
  }
`;
