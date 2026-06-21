// src/pages/Kontoret/styles.js — Arvo-kontoret, vilotillstånd.
// Dossier-mörkt instrument (theme.dossier). Regel 6: 0 hårdkodade hex utanför tokens.
// Mall: src/pages/Prospect/styles.js — samma premiumspråk (aurora, keyline, metallic).
import styled, { keyframes, css } from 'styled-components';
import theme from '../../theme';

const MONO = theme.font.mono;
const SERIF = theme.font.display;

// ── rörelse — telemetri, aldrig dekor ───────────────────────────────────────
const rise = keyframes`from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); }`;
const sweep = keyframes`to { transform: rotate(360deg); }`;
const blip = keyframes`0%,100% { opacity:.25; } 50% { opacity:1; }`;
const breathe = keyframes`0%,100% { opacity:.6; } 50% { opacity:1; }`;
const shimmer = keyframes`0% { background-position:-200% 0; } 100% { background-position:200% 0; }`;

const appear = (d = 0) => css`opacity:0; animation:${rise} .7s ${d}s cubic-bezier(0.16,1,0.3,1) forwards;`;

// ── sida ─────────────────────────────────────────────────────────────────────
export const Page = styled.main`
  min-height: 100vh;
  background: ${theme.dossier.bg};
  font-family: ${theme.font.sans};
  -webkit-font-smoothing: antialiased;
  position: relative;
  overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background: ${theme.dossier.aurora};
    pointer-events: none;
  }
  &::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: ${theme.dossier.keyline}; opacity: .85;
  }
`;

export const Shell = styled.div`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 22px 90px;
  @media (min-width: 768px) { padding: 56px 32px 120px; }
`;

// EXEMPEL-band — hederlighet (regel 9): all prototypdata är påhittad.
export const ProtoRibbon = styled.div`
  position: relative; z-index: 2;
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${MONO}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
  color: ${theme.dossier.faintOnDark};
  border: 1px solid ${theme.dossier.hairlineOnDark};
  border-radius: ${theme.size.radius.pill};
  padding: 6px 14px; margin-bottom: 28px;
  span.dot { width: 5px; height: 5px; border-radius: 50%; background: ${theme.dossier.tealBright}; }
`;

// ── topprad: identitet + vakten ──────────────────────────────────────────────
export const TopRow = styled.div`
  display: flex; align-items: flex-start; justify-content: space-between; gap: 28px;
  ${appear(0)}
  @media (max-width: 820px) { flex-direction: column; gap: 22px; }
`;

export const Ident = styled.div`
  .brand {
    font-family: ${MONO}; font-size: 11px; font-weight: 600;
    letter-spacing: .40em; text-indent: .40em; color: ${theme.dossier.tealBright};
    margin-bottom: 16px;
  }
  .confidential {
    font-family: ${MONO}; font-size: 10px; letter-spacing: .26em; text-transform: uppercase;
    color: ${theme.dossier.faintOnDark}; margin-bottom: 18px;
  }
  h1 {
    font-family: ${SERIF}; font-weight: 700; line-height: 1.02; letter-spacing: -.03em;
    font-size: clamp(40px, 7vw, 62px); margin: 0;
    color: ${theme.dossier.inkOnDark};
    background: ${theme.dossier.metallicText};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
`;

// Radarn — det levande beviset att en maskin vakar.
export const Radar = styled.div`
  flex-shrink: 0; width: 300px; max-width: 100%;
  border: 1px solid ${theme.dossier.hairlineOnDark};
  border-radius: ${theme.size.radius.lg};
  background: ${theme.dossier.bgRaised};
  padding: 18px 20px;
  @media (max-width: 820px) { width: 100%; }

  .radar-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .disc { position: relative; width: 46px; height: 46px; flex-shrink: 0; }
  .disc svg { position: absolute; inset: 0; }
  .disc .sweep {
    position: absolute; inset: 0; border-radius: 50%;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(93,214,202,.0) 270deg, rgba(93,214,202,.55) 360deg);
    animation: ${sweep} 3.2s linear infinite;
    mask: radial-gradient(circle, #000 62%, transparent 63%);
    -webkit-mask: radial-gradient(circle, #000 62%, transparent 63%);
  }
  .radar-title {
    font-family: ${MONO}; font-size: 10px; letter-spacing: .22em; text-transform: uppercase;
    color: ${theme.dossier.mutedOnDark}; line-height: 1.5;
    strong { color: ${theme.dossier.inkOnDark}; display: block; letter-spacing: .14em; }
  }
  .radar-stats { display: flex; flex-direction: column; gap: 7px; }
  .rstat {
    display: flex; align-items: baseline; justify-content: space-between;
    font-size: 12px; color: ${theme.dossier.mutedOnDark};
    span.v { font-family: ${MONO}; color: ${theme.dossier.inkOnDark}; font-feature-settings:'tnum'; }
  }
  .radar-foot {
    margin-top: 14px; padding-top: 12px; border-top: 1px solid ${theme.dossier.hairlineOnDark};
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: ${theme.dossier.inkOnDark};
    .live { width: 7px; height: 7px; border-radius: 50%; background: ${theme.dossier.tealBright};
      box-shadow: ${theme.dossier.glow}; animation: ${breathe} 2.4s ease-in-out infinite; }
  }
`;

// ── veckodomen — ETT författat omdöme ────────────────────────────────────────
export const Verdict = styled.section`
  margin-top: 30px; padding: 34px 0 4px;
  border-top: 1px solid ${theme.dossier.hairlineOnDark};
  ${appear(0.08)}

  .eyebrow {
    font-family: ${MONO}; font-size: 11px; letter-spacing: .26em; text-transform: uppercase;
    color: ${theme.dossier.teal}; margin-bottom: 18px;
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow::after { content:''; flex:1; height:1px; background:${theme.dossier.hairlineOnDark}; }

  h2 {
    font-family: ${SERIF}; font-weight: 600; letter-spacing: -.02em;
    font-size: clamp(30px, 5vw, 48px); line-height: 1.08; margin: 0 0 20px;
    max-width: 20ch; color: ${theme.dossier.inkOnDark};
  }
  h2 em { font-style: normal; color: ${theme.dossier.tealBright}; }

  p.work {
    font-size: 16px; line-height: 1.7; color: ${theme.dossier.mutedOnDark};
    max-width: 56ch; margin: 0 0 22px;
    b { color: ${theme.dossier.inkOnDark}; font-weight: 600; }
  }
`;


export const Confidence = styled.span`
  display: inline-flex; align-items: center; gap: 8px;
  font-family: ${MONO}; font-size: 11px; letter-spacing: .04em;
  color: ${theme.dossier.mutedOnDark};
  border: 1px solid ${theme.dossier.hairlineOnDark};
  border-radius: ${theme.size.radius.pill};
  padding: 7px 14px;
  .pct { color: ${theme.dossier.tealBright}; font-weight: 600; }
`;

// ── instrumentrutnät ─────────────────────────────────────────────────────────
export const Grid = styled.div`
  margin-top: 40px;
  display: grid; gap: 18px;
  grid-template-columns: minmax(0,1fr);
  ${appear(0.16)}
  @media (min-width: 880px) { grid-template-columns: 1.25fr 1fr; }
`;

const card = css`
  position: relative;
  background: ${theme.dossier.bgRaised};
  border: 1px solid ${theme.dossier.hairlineOnDark};
  border-radius: ${theme.size.radius.lg};
  padding: 26px 26px 24px;
`;

export const Card = styled.div`
  ${card}
  grid-column: ${({ $full }) => ($full ? '1 / -1' : 'auto')};

  .card-eyebrow {
    font-family: ${MONO}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${theme.dossier.teal}; margin-bottom: 16px;
    display: flex; align-items: center; justify-content: space-between;
    .src { color: ${theme.dossier.faintOnDark}; letter-spacing: .12em; }
  }
`;

// Den kollektiva sanningen — moaten, gjord synlig.
export const Truth = styled(Card)`
  overflow: hidden;
  &::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: radial-gradient(ellipse 380px 200px at 88% 0%, rgba(43,196,172,.10), transparent 70%);
  }
  h3 {
    font-family: ${SERIF}; font-weight: 600; font-size: clamp(21px, 2.6vw, 27px);
    line-height: 1.22; letter-spacing: -.01em; margin: 0 0 22px; max-width: 26ch;
    color: ${theme.dossier.inkOnDark};
    em { font-style: normal; color: ${theme.dossier.tealBright}; }
  }
  .bars { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
  .barrow {
    display: grid; grid-template-columns: 130px 1fr auto; align-items: center; gap: 14px;
    font-size: 13px; color: ${theme.dossier.mutedOnDark};
    @media (max-width: 480px) { grid-template-columns: 96px 1fr auto; gap: 10px; font-size: 12px; }
    .lbl { white-space: nowrap; }
    .track { height: 8px; border-radius: ${theme.size.radius.pill};
      background: rgba(255,255,255,.06); overflow: hidden; }
    .fill { height: 100%; border-radius: inherit; }
    .amt { font-family: ${MONO}; font-feature-settings:'tnum'; color: ${theme.dossier.inkOnDark};
      white-space: nowrap; }
    &.you .lbl { color: ${theme.dossier.tealBright}; font-weight: 600; }
    &.you .fill { background: ${theme.dossier.numberGradient}; box-shadow: 0 0 14px rgba(93,214,202,.4); }
    &:not(.you) .fill { background: rgba(255,255,255,.22); }
  }
  .truth-note { font-size: 13px; line-height: 1.6; color: ${theme.dossier.mutedOnDark};
    padding-top: 16px; border-top: 1px solid ${theme.dossier.hairlineOnDark};
    b { color: ${theme.dossier.inkOnDark}; } }
`;

// Arvo Score — levande, marknadsrelativt tal (0–100).
export const Index = styled(Card)`
  display: flex; flex-direction: column;
  .idx-main { display: flex; align-items: flex-end; gap: 14px; margin-bottom: 6px; }
  .idx-num {
    font-family: ${MONO}; font-weight: 700; font-size: 72px; line-height: .9;
    letter-spacing: -.04em; font-feature-settings:'tnum';
    background: ${theme.dossier.numberGradient};
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  }
  .idx-denom { font-family: ${MONO}; font-size: 22px; font-weight: 500; letter-spacing: -.02em;
    color: ${theme.dossier.faintOnDark}; padding-bottom: 8px; }
  .idx-delta {
    font-family: ${MONO}; font-size: 13px; color: ${theme.dossier.tealBright};
    padding-bottom: 10px; margin-left: auto; text-align: right;
    .d { display:block; } .dl { color: ${theme.dossier.faintOnDark}; font-size:11px; letter-spacing:.1em; }
  }
  .spark { display: flex; align-items: flex-end; gap: 4px; height: 34px; margin: 12px 0 18px; }
  .spark span { flex: 1; border-radius: 2px 2px 0 0; background: rgba(255,255,255,.14); }
  .spark span.hot { background: ${theme.dossier.numberGradient}; }

  /* Marknadsläge — under / i nivå / över marknaden */
  .mkt-k { font-family: ${MONO}; font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
    color: ${theme.dossier.faintOnDark}; margin-bottom: 9px; }
  .mkt-track {
    position: relative; height: 6px; border-radius: ${theme.size.radius.pill};
    background: linear-gradient(90deg, rgba(159,217,206,.16), rgba(255,255,255,.08) 50%, rgba(43,196,172,.30));
    margin-bottom: 9px;
  }
  .mkt-ptr {
    position: absolute; top: 50%; width: 12px; height: 12px; border-radius: 50%;
    background: ${theme.dossier.tealBright}; box-shadow: ${theme.dossier.glow};
    transform: translate(-50%, -50%);
  }
  .mkt-scale { display: flex; justify-content: space-between;
    font-family: ${MONO}; font-size: 9.5px; letter-spacing: .08em; text-transform: uppercase;
    color: ${theme.dossier.faintOnDark};
    .on { color: ${theme.dossier.tealBright}; } }
  .idx-note { font-size: 12.5px; line-height: 1.6; color: ${theme.dossier.mutedOnDark};
    margin-top: 16px; b { color: ${theme.dossier.inkOnDark}; } }
`;

// Maktkalendern — sannolikhetsbelagd horisont.
export const Calendar = styled(Card)`
  .cal-row {
    display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 16px;
    padding: 16px 0; border-top: 1px solid ${theme.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 480px) { grid-template-columns: auto 1fr; gap: 10px 12px; }
  }
  .cal-prob {
    font-family: ${MONO}; font-size: 15px; font-weight: 600; font-feature-settings:'tnum';
    color: ${theme.dossier.tealBright};
    width: 52px; text-align: right;
    @media (max-width: 480px) { grid-row: 1 / 3; }
  }
  .cal-body {
    .t { font-size: 14.5px; color: ${theme.dossier.inkOnDark}; font-weight: 600; margin-bottom: 3px; }
    .s { font-size: 12.5px; color: ${theme.dossier.mutedOnDark}; line-height: 1.45; }
  }
  .cal-when {
    font-family: ${MONO}; font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
    color: ${theme.dossier.faintOnDark}; white-space: nowrap;
    @media (max-width: 480px) { grid-column: 2; text-align: left; }
  }
`;

// Arbetets kvitton — den osynliga personalen, gjord synlig.
export const Receipts = styled(Card)`
  .rcpt {
    display: grid; grid-template-columns: 70px 1fr; gap: 14px; align-items: baseline;
    padding: 13px 0; border-top: 1px solid ${theme.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
  }
  .rcpt .day { font-family: ${MONO}; font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
    color: ${theme.dossier.teal}; }
  .rcpt .what { font-size: 13.5px; line-height: 1.5; color: ${theme.dossier.mutedOnDark};
    b { color: ${theme.dossier.inkOnDark}; font-weight: 600; } }
`;

// Likräkningen — avvärjda katastrofer, löpande summa.
export const Tally = styled(Card)`
  display: flex; flex-direction: column; justify-content: center;
  background: linear-gradient(150deg, ${theme.dossier.bgRaised} 0%, rgba(23,138,123,.16) 100%);
  .tally-k { font-family: ${MONO}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${theme.dossier.teal}; margin-bottom: 14px; }
  .tally-num { font-family: ${SERIF}; font-weight: 600; font-size: clamp(36px, 6vw, 52px);
    line-height: 1; letter-spacing: -.02em; color: ${theme.dossier.inkOnDark}; margin-bottom: 10px;
    small { font-family: ${theme.font.sans}; font-size: 16px; color: ${theme.dossier.mutedOnDark};
      font-weight: 400; margin-left: 6px; } }
  .tally-sub { font-size: 14px; line-height: 1.55; color: ${theme.dossier.mutedOnDark};
    b { color: ${theme.dossier.inkOnDark}; } }
`;

// ── innehavet — portföljen, degraderad till arkiv ───────────────────────────
export const Holdings = styled.section`
  margin-top: 40px; padding-top: 28px; border-top: 1px solid ${theme.dossier.hairlineOnDark};
  ${appear(0.24)}
  .h-eyebrow { font-family: ${MONO}; font-size: 10px; letter-spacing: .24em; text-transform: uppercase;
    color: ${theme.dossier.teal}; margin-bottom: 18px; }
  .h-row {
    display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 18px;
    padding: 14px 0; border-top: 1px solid ${theme.dossier.hairlineOnDark};
    &:first-of-type { border-top: none; }
    @media (max-width: 560px) { grid-template-columns: 1fr auto; gap: 6px 12px; }
  }
  .h-name { color: ${theme.dossier.inkOnDark}; font-size: 14.5px; font-weight: 600; }
  .h-cat { font-size: 12px; color: ${theme.dossier.faintOnDark}; }
  .h-cost { font-family: ${MONO}; font-size: 13.5px; color: ${theme.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space: nowrap;
    @media (max-width:560px){ grid-column:2; grid-row:1; } }
  .h-state { font-family: ${MONO}; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase;
    white-space: nowrap; padding: 4px 10px; border-radius: ${theme.size.radius.pill};
    border: 1px solid ${theme.dossier.hairlineOnDark};
    &.opt { color: ${theme.dossier.tealBright}; }
    &.watch { color: ${theme.dossier.mutedOnDark}; }
    @media (max-width:560px){ grid-column:2; } }
`;

// ── tyst footer ──────────────────────────────────────────────────────────────
export const SignOff = styled.div`
  margin-top: 56px; text-align: center;
  .keyline { height: 1px; background: ${theme.dossier.keyline}; opacity: .5; margin-bottom: 22px; }
  .mark { font-family: ${MONO}; font-size: 11px; letter-spacing: .36em; text-indent: .36em;
    color: ${theme.dossier.faintOnDark}; }
  .tagline { font-family: ${SERIF}; font-style: italic; font-size: 16px;
    color: ${theme.dossier.mutedOnDark}; margin-top: 14px; }
`;

// ── innehavet, EXPANDERBART (riktiga /portfolio) ────────────────────────────
export const HoldRow = styled.div`
  border-top: 1px solid ${theme.dossier.hairlineOnDark};
  &:first-of-type { border-top: none; }
`;

export const HoldHead = styled.button`
  width:100%; background:none; border:none; cursor:pointer; text-align:left;
  display:grid; grid-template-columns:auto 1fr auto auto auto; align-items:center; gap:16px;
  padding:15px 0; color:inherit; transition:opacity .15s;
  &:hover { opacity:.82; }
  @media (max-width: 760px){ grid-template-columns:auto 1fr auto; gap:8px 12px; padding:14px 0; }

  .h-name { color:${theme.dossier.inkOnDark}; font-size:15px; font-weight:600; letter-spacing:-.005em;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .h-cat { font-size:12px; color:${theme.dossier.faintOnDark}; margin-top:2px; }
  .h-cost { font-family:${MONO}; font-size:13.5px; color:${theme.dossier.mutedOnDark};
    font-feature-settings:'tnum'; white-space:nowrap;
    @media (max-width:760px){ grid-column:2; grid-row:1; text-align:right; } }
  .h-badge { font-family:${MONO}; font-size:13px; letter-spacing:.06em;
    white-space:nowrap; padding:5px 11px; border-radius:${theme.size.radius.pill};
    border:1px solid ${theme.dossier.hairlineOnDark};
    /* sparbadgen bär ett tal (kr/år) → aldrig versaler; statusord versaliseras */
    &.save { color:${theme.dossier.bg}; background:${theme.dossier.tealBright}; border-color:transparent; font-weight:600; font-feature-settings:'tnum'; }
    &.watch { color:${theme.dossier.mutedOnDark}; text-transform:uppercase; }
    /* pillen högerställs under kostnaden → kostnad + pill bildar en ren högerkolumn (i linje) */
    @media (max-width:760px){ grid-column:2; grid-row:2; justify-self:end; } }
  .h-chev { color:${theme.dossier.faintOnDark}; display:flex; transition:transform .22s ease;
    transform:${({ $open }) => ($open ? 'rotate(180deg)' : 'none')};
    @media (max-width:760px){ grid-column:3; grid-row:1 / 3; } }
`;

// mini-ring för score på mörk botten
export const RingWrap = styled.div`
  position:relative; width:42px; height:42px; flex-shrink:0;
  span.v { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    font-family:${MONO}; font-size:15px; font-weight:700; font-feature-settings:'tnum'; }
`;

export const HoldDetail = styled.div`
  padding:6px 0 24px; animation:${rise} .28s ease both;
  display:flex; flex-direction:column; gap:18px;

  /* Arvo bedömer — bara omdömet (score-ringen bor i radhuvudet, ej dubblerad) */
  .diag { padding:0 2px; }
  .diag .dbody .dtop { font-family:${MONO}; font-size:10px; letter-spacing:.18em; text-transform:uppercase;
    color:${theme.dossier.teal}; margin-bottom:8px; }
  .diag .dbody .dtxt { font-size:14px; line-height:1.6; color:${theme.dossier.mutedOnDark};
    max-width:64ch; b { color:${theme.dossier.inkOnDark}; } }

  /* Faktatabell — råa tal, varje en gång */
  .facts { display:flex; flex-direction:column; gap:0;
    border-top:1px solid ${theme.dossier.hairlineOnDark}; }
  .fact { display:flex; justify-content:space-between; align-items:baseline; gap:14px;
    padding:10px 0; border-bottom:1px solid ${theme.dossier.hairlineOnDark}; font-size:13px;
    dt { color:${theme.dossier.mutedOnDark}; }
    dd { font-family:${MONO}; color:${theme.dossier.inkOnDark}; font-feature-settings:'tnum'; margin:0; } }
`;

// inbäddad Switch i raden (kundens "baka in i listan")
export const SwitchInline = styled.div`
  border:1px solid ${theme.dossier.hairlineOnDark}; border-radius:${theme.size.radius.md};
  background: linear-gradient(160deg, rgba(43,196,172,.10), rgba(23,138,123,.04));
  padding:18px 20px; display:flex; flex-direction:column;

  .si-k { font-family:${MONO}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${theme.dossier.teal}; margin-bottom:14px; }
  .si-steps { display:flex; flex-direction:column; gap:14px; margin-bottom:18px; }
  .si-step { display:flex; gap:12px; align-items:flex-start; }
  .si-n { flex-shrink:0; width:22px; height:22px; border-radius:50%;
    border:1.5px solid ${theme.dossier.teal}; color:${theme.dossier.tealBright};
    font-family:${MONO}; font-size:11px; font-weight:600; display:flex; align-items:center; justify-content:center; }
  .si-body { display:flex; flex-direction:column; gap:2px; }
  .si-t { display:block; font-size:13px; color:${theme.dossier.inkOnDark}; font-weight:600; line-height:1.3; }
  .si-d { display:block; font-size:12px; color:${theme.dossier.mutedOnDark}; line-height:1.45; }
  .si-offer { display:flex; align-items:baseline; gap:8px; margin-bottom:6px;
    padding-top:16px; border-top:1px solid ${theme.dossier.hairlineOnDark}; flex-wrap:wrap;
    .old { font-family:${MONO}; font-size:13px; color:${theme.dossier.faintOnDark};
      text-decoration:line-through; }
    .arr { color:${theme.dossier.faintOnDark}; }
    .new { font-family:${MONO}; font-size:20px; font-weight:700; font-feature-settings:'tnum';
      color:${theme.dossier.tealBright}; }
    .new small { font-family:${theme.font.sans}; font-size:12px; font-weight:400;
      color:${theme.dossier.mutedOnDark}; margin-left:3px; } }
  .si-save { font-size:12.5px; color:${theme.dossier.mutedOnDark}; line-height:1.5; margin-bottom:16px;
    b { color:${theme.dossier.inkOnDark}; font-feature-settings:'tnum'; } }
`;

export const SwitchBtn = styled.a`
  display:flex; align-items:center; justify-content:center; gap:8px;
  text-decoration:none; cursor:pointer;
  font-size:14px; font-weight:600; color:${theme.dossier.bg};
  background:${theme.dossier.ctaGradient}; box-shadow:${theme.dossier.ctaShadow};
  border-radius:${theme.size.radius.pill}; padding:13px 20px; border:none;
  transition:transform .15s ease, filter .15s ease;
  &:hover { transform:translateY(-1px); filter:brightness(1.05); }
`;

// Intelligence — tyst avslutande pitch (kundens steg 1: kasta inte SaaS för tidigt)
export const IntelQuiet = styled.div`
  margin-top:40px; padding:30px 0 4px; border-top:1px solid ${theme.dossier.hairlineOnDark};
  ${appear(0.1)}
  .iq-k { font-family:${MONO}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${theme.dossier.teal}; margin-bottom:14px; }
  h3 { font-family:${SERIF}; font-weight:600; font-size:clamp(22px,3.2vw,30px); line-height:1.16;
    letter-spacing:-.02em; margin:0 0 14px; max-width:24ch; color:${theme.dossier.inkOnDark};
    em { font-style:normal; color:${theme.dossier.tealBright}; } }
  p { font-size:15px; line-height:1.65; color:${theme.dossier.mutedOnDark}; max-width:54ch; margin:0 0 22px;
    b { color:${theme.dossier.inkOnDark}; } }
  .iq-row { display:flex; align-items:center; gap:18px; flex-wrap:wrap; }
  /* Priset gömmer sig aldrig — krispig off-white som poppar ur mörkret */
  .iq-price { font-family:${MONO}; font-size:19px; font-weight:600; letter-spacing:-.01em;
    color:${theme.dossier.inkOnDark}; font-feature-settings:'tnum';
    span { color:${theme.dossier.mutedOnDark}; font-size:12.5px; font-weight:400; letter-spacing:0; } }
`;

export const Spinner = styled.div`
  width:30px; height:30px; border:3px solid ${theme.dossier.hairlineOnDark};
  border-top-color:${theme.dossier.tealBright}; border-radius:50%;
  animation:${sweep} .8s linear infinite; margin:120px auto;
`;

// ── Intelligensintaget (tomma kontoret = intagsdisk, ej säljpitch) ──────────
export const CoverageMap = styled.div`
  margin-top:34px; padding-top:28px; border-top:1px solid ${theme.dossier.hairlineOnDark};
  ${appear(0.06)}
  .cm-eyebrow { font-family:${MONO}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${theme.dossier.teal}; margin-bottom:16px; }
  .cm-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px;
    @media (max-width:600px){ grid-template-columns:repeat(2,1fr); } }
  .cm-cell { position:relative; border:1px solid ${theme.dossier.hairlineOnDark};
    border-radius:${theme.size.radius.md}; padding:14px 15px 15px;
    display:flex; flex-direction:column; gap:9px; background:${theme.dossier.bgRaised}; }
  .cm-cell.hot { border-color:rgba(43,196,172,.42);
    background:linear-gradient(155deg, rgba(43,196,172,.11), rgba(23,138,123,.03));
    box-shadow:0 0 0 1px rgba(43,196,172,.10); }
  .cm-top { display:flex; align-items:center; justify-content:space-between; min-height:24px; }
  .cm-ico { color:${theme.dossier.faintOnDark}; display:flex; }
  .cm-cell.hot .cm-ico { color:${theme.dossier.tealBright}; }
  .cm-label { font-size:13.5px; font-weight:600; color:${theme.dossier.mutedOnDark}; letter-spacing:-.005em; line-height:1.2; }
  .cm-cell.hot .cm-label { color:${theme.dossier.inkOnDark}; }
  .cm-hint { font-size:11px; color:${theme.dossier.faintOnDark}; letter-spacing:.01em; }
  .cm-tag { font-family:${MONO}; font-size:8.5px; letter-spacing:.12em; text-transform:uppercase;
    color:${theme.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${theme.size.radius.pill}; padding:3px 8px; white-space:nowrap; }
  .cm-tag.offert { color:${theme.dossier.faintOnDark}; border-color:${theme.dossier.hairlineOnDark}; }
  .cm-verified { font-family:${MONO}; font-size:9px; letter-spacing:.07em; text-transform:uppercase;
    color:${theme.dossier.tealBright}; margin-top:1px; }
`;

export const IntakeDoors = styled.div`
  margin-top:20px; display:grid; gap:18px; grid-template-columns:1fr 1fr;
  ${appear(0.12)}
  @media (max-width:760px){ grid-template-columns:1fr; }
  .door { border:1px solid ${theme.dossier.hairlineOnDark}; border-radius:${theme.size.radius.lg};
    background:${theme.dossier.bgRaised}; padding:24px 24px 22px; display:flex; flex-direction:column; }
  .door-k { font-family:${MONO}; font-size:10px; letter-spacing:.24em; text-transform:uppercase;
    color:${theme.dossier.teal}; margin-bottom:12px; }
  .door h4 { font-family:${SERIF}; font-weight:600; font-size:18px; letter-spacing:-.01em;
    color:${theme.dossier.inkOnDark}; margin:0 0 8px; }
  .door p { font-size:13px; line-height:1.55; color:${theme.dossier.mutedOnDark}; margin:0 0 16px; }
  .door .spacer { flex:1; }
`;

export const AddressChipDark = styled.div`
  font-family:${MONO}; font-size:14px; letter-spacing:.01em; color:${theme.dossier.tealBright};
  background:rgba(43,196,172,.06); border:1px dashed rgba(43,196,172,.45);
  border-radius:${theme.size.radius.md}; padding:13px 16px; text-align:center; user-select:all;
`;

export const Dropzone = styled.label`
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
  border:1.5px dashed rgba(43,196,172,.38); border-radius:${theme.size.radius.md};
  padding:26px 18px; cursor:pointer; text-align:center;
  background:rgba(43,196,172,.04); transition:border-color .15s, background .15s;
  &:hover, &.over { border-color:${theme.dossier.tealBright}; background:rgba(43,196,172,.10); }
  &.over { box-shadow:0 0 0 1px ${theme.dossier.tealBright}; }
  .dz-ico { color:${theme.dossier.tealBright}; }
  .dz-t { font-size:14px; font-weight:600; color:${theme.dossier.inkOnDark}; }
  .dz-s { font-size:12px; color:${theme.dossier.mutedOnDark}; }
  input { display:none; }
`;

export const DropProgress = styled.div`
  margin-top:14px; display:flex; flex-direction:column; gap:7px;
  .dp-row { display:flex; align-items:center; justify-content:space-between; gap:12px;
    font-size:12.5px; color:${theme.dossier.mutedOnDark}; }
  .dp-name { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; }
  .dp-stat { font-family:${MONO}; font-size:11px; letter-spacing:.06em; white-space:nowrap; }
  .dp-stat.done { color:${theme.dossier.tealBright}; }
  .dp-stat.work { color:${theme.dossier.faintOnDark}; }
  .dp-stat.fail { color:#E06A4D; }
  .dp-note { margin-top:6px; font-size:12px; color:${theme.dossier.faintOnDark}; line-height:1.5; }
`;

export const FortnoxTease = styled.div`
  margin-top:24px; display:flex; align-items:center; gap:14px;
  padding:15px 18px; border:1px solid ${theme.dossier.hairlineOnDark};
  border-radius:${theme.size.radius.md}; ${appear(0.18)}
  .ft-ico { color:${theme.dossier.faintOnDark}; flex-shrink:0; display:flex; }
  .ft-txt { flex:1; font-size:13px; line-height:1.5; color:${theme.dossier.mutedOnDark};
    b { color:${theme.dossier.inkOnDark}; } }
  .ft-soon { font-family:${MONO}; font-size:9.5px; letter-spacing:.14em; text-transform:uppercase;
    color:${theme.dossier.tealBright}; border:1px solid rgba(43,196,172,.4);
    border-radius:${theme.size.radius.pill}; padding:5px 11px; white-space:nowrap; }
`;

export const shimmerCss = shimmer;
export const blipCss = blip;
