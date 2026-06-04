import styled, { keyframes, css } from 'styled-components';

// ── Keyframes ──────────────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const notifArrive = keyframes`
  from { opacity: 0; transform: translateY(-24px) scale(0.95); }
  65%  { transform: translateY(4px) scale(1.005); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const dotPulse = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(29,176,154,0.4); }
  50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(29,176,154,0); }
`;

// ── Page ──────────────────────────────────────────────────────────────────────

export const Page = styled.div`
  background: #060D0B;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 55% at 50% 10%, rgba(29,176,154,0.10) 0%, transparent 65%),
      radial-gradient(ellipse 50% 40% at 80% 85%, rgba(29,176,154,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ── Notification card ─────────────────────────────────────────────────────────

export const NotifCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(10, 22, 18, 0.88);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 20px;
  padding: 18px 20px 20px;
  margin-bottom: 56px;
  text-align: left;
  animation: ${notifArrive} 0.75s cubic-bezier(0.34, 1.46, 0.64, 1) both;
  box-shadow:
    0 32px 80px rgba(0,0,0,0.50),
    0 1px 0 rgba(255,255,255,0.07) inset;
`;

export const NotifHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
`;

export const NotifDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #1DB09A;
  flex-shrink: 0;
  animation: ${dotPulse} 2.2s ease-in-out infinite;
`;

export const NotifAppName = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  letter-spacing: .02em;
  flex: 1;
`;

export const NotifTime = styled.span`
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: .01em;
`;

export const NotifTitle = styled.p`
  margin: 0 0 7px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -.015em;
`;

export const NotifBody = styled.p`
  margin: 0 0 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.55);
  line-height: 1.6;

  strong {
    color: rgba(255,255,255,0.88);
    font-weight: 600;
  }
`;

export const NotifCta = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: #1DB09A;
  cursor: pointer;
  letter-spacing: -.01em;
  transition: opacity 0.2s;

  &:hover { opacity: 0.70; }
`;

// ── Hero text ─────────────────────────────────────────────────────────────────

export const HeroTagline = styled.h1`
  margin: 0 0 20px;
  font-size: clamp(38px, 6.5vw, 76px);
  font-weight: 800;
  color: #fff;
  line-height: 1.06;
  letter-spacing: -.045em;
  animation: ${fadeUp} 0.8s 0.28s both ease-out;
`;

export const HeroSub = styled.p`
  margin: 0 0 52px;
  font-size: clamp(16px, 2.2vw, 20px);
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  animation: ${fadeUp} 0.8s 0.42s both ease-out;
`;

export const HeroCtaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: ${fadeUp} 0.8s 0.56s both ease-out;
`;

export const HeroCta = styled.a`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 17px 40px;
  border-radius: 100px;
  text-decoration: none;
  letter-spacing: -.01em;
  box-shadow: 0 8px 40px rgba(29,176,154,0.28);
  transition: opacity 0.2s, transform 0.15s;

  &:hover {
    opacity: 0.90;
    transform: translateY(-2px);
  }
  &:active { transform: translateY(0); }
`;

export const HeroPrice = styled.p`
  margin: 0;
  font-size: 13px;
  color: rgba(255,255,255,0.28);
  letter-spacing: .01em;
`;

// ── Section shared ────────────────────────────────────────────────────────────

export const SectionWrap = styled.section`
  padding: 120px 24px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 640px) { padding: 80px 20px; }
`;

export const SectionEyebrow = styled.p`
  margin: 0 0 12px;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .20em;
`;

export const SectionHeadline = styled.h2`
  margin: 0 0 56px;
  font-size: clamp(28px, 4vw, 50px);
  font-weight: 800;
  color: #fff;
  line-height: 1.08;
  letter-spacing: -.035em;

  @media (max-width: 640px) { margin-bottom: 40px; }
`;

// ── Scenarios ─────────────────────────────────────────────────────────────────

export const ScenarioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ScenarioItem = styled.div`
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 18px;
  padding: 36px 40px;
  background: rgba(255,255,255,0.02);
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease, border-color 0.25s;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  &:hover { border-color: rgba(255,255,255,0.11); }

  @media (max-width: 640px) { padding: 28px 22px; }
`;

export const ScenarioTop = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 22px;
`;

export const ScenarioNum = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: rgba(255,255,255,0.18);
  letter-spacing: .18em;
  flex-shrink: 0;
`;

export const ScenarioTitle = styled.h3`
  margin: 0;
  font-size: clamp(17px, 2.5vw, 21px);
  font-weight: 700;
  color: #fff;
  letter-spacing: -.02em;
  line-height: 1.2;
`;

export const ScenarioRows = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const ScenarioBox = styled.div`
  border-radius: 12px;
  padding: 20px 22px;
  background: ${({ $type }) =>
    $type === 'without' ? 'rgba(239,68,68,0.06)' : 'rgba(29,176,154,0.06)'};
  border: 1px solid ${({ $type }) =>
    $type === 'without' ? 'rgba(239,68,68,0.14)' : 'rgba(29,176,154,0.14)'};
`;

export const ScenarioBoxLabel = styled.p`
  margin: 0 0 8px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .14em;
  color: ${({ $type }) =>
    $type === 'without' ? 'rgba(239,68,68,0.65)' : 'rgba(29,176,154,0.65)'};
`;

export const ScenarioBoxText = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.60);
  line-height: 1.6;
`;

export const ScenarioAmount = styled.p`
  margin: 12px 0 0;
  font-size: ${({ $isText }) => $isText ? '18px' : 'clamp(20px, 3vw, 28px)'};
  font-weight: 800;
  color: #EF4444;
  letter-spacing: -.03em;
  line-height: 1.1;
`;

export const ScenarioTotal = styled.div`
  margin-top: 40px;
  padding: 32px 36px;
  background: rgba(29,176,154,0.05);
  border: 1px solid rgba(29,176,154,0.18);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 22px;
  }
`;

export const ScenarioTotalLeft = styled.div``;

export const ScenarioTotalLabel = styled.p`
  margin: 0 0 6px;
  font-size: 15px;
  color: rgba(255,255,255,0.50);
  line-height: 1.5;
  max-width: 340px;
`;

export const ScenarioTotalNote = styled.p`
  margin: 0;
  font-size: 12px;
  color: #1DB09A;
  font-weight: 600;
  letter-spacing: .01em;
`;

export const ScenarioTotalRight = styled.div`
  text-align: right;
  flex-shrink: 0;

  @media (max-width: 600px) { text-align: left; }
`;

export const ScenarioTotalAmount = styled.p`
  margin: 0 0 4px;
  font-size: clamp(32px, 4.5vw, 44px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.045em;
  line-height: 1;
`;

export const ScenarioTotalSub = styled.p`
  margin: 0;
  font-size: 12px;
  color: rgba(255,255,255,0.25);
`;

// ── Pillars ───────────────────────────────────────────────────────────────────

export const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;

  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;

export const PillarCard = styled.div`
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 40px 36px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.65s ${({ $i }) => `${0.08 * $i}s`} ease,
    transform 0.65s ${({ $i }) => `${0.08 * $i}s`} ease,
    border-color 0.25s;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}

  &:hover { border-color: rgba(255,255,255,0.13); }

  @media (max-width: 620px) { padding: 28px 22px; }
`;

export const PillarNum = styled.span`
  font-size: 26px;
  display: block;
`;

export const PillarTitle = styled.h3`
  margin: 0;
  font-size: clamp(17px, 2.2vw, 20px);
  font-weight: 700;
  color: #fff;
  letter-spacing: -.025em;
  line-height: 1.25;
`;

export const PillarBody = styled.p`
  margin: 0;
  font-size: 14px;
  color: rgba(255,255,255,0.48);
  line-height: 1.7;
  flex: 1;
`;

export const PillarQuote = styled.p`
  margin: 0;
  font-size: 13px;
  color: #1DB09A;
  font-style: italic;
  line-height: 1.55;
  padding-top: 14px;
  border-top: 1px solid rgba(29,176,154,0.18);
`;

// ── Rules ─────────────────────────────────────────────────────────────────────

export const RulesSection = styled.section`
  background: #000;
  padding: 128px 24px;
  text-align: center;

  @media (max-width: 640px) { padding: 88px 20px; }
`;

export const RulesInner = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

export const RulesEyebrow = styled.p`
  margin: 0 0 64px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(255,255,255,0.22);
  text-transform: uppercase;
  letter-spacing: .22em;
`;

export const RuleItem = styled.div`
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ${({ $i }) => `${$i * 0.18}s`} ease,
    transform 0.7s ${({ $i }) => `${$i * 0.18}s`} ease;

  ${({ $visible }) => $visible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`;

export const RuleNumber = styled.span`
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #1DB09A;
  text-transform: uppercase;
  letter-spacing: .20em;
  margin-bottom: 12px;
`;

export const RuleText = styled.p`
  margin: 0;
  font-size: clamp(26px, 4.5vw, 52px);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -.04em;
`;

export const RuleDivider = styled.div`
  width: 1px;
  height: 56px;
  background: rgba(255,255,255,0.08);
  margin: 48px auto;
`;

// ── Activation ────────────────────────────────────────────────────────────────

export const ActivationSection = styled.section`
  padding: 128px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(29,176,154,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 640px) { padding: 88px 20px; }
`;

export const ActivationInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 520px;
  margin: 0 auto;
`;

export const ActivationHeadline = styled.h2`
  margin: 0 0 16px;
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 800;
  color: #fff;
  letter-spacing: -.04em;
  line-height: 1.1;
`;

export const ActivationSub = styled.p`
  margin: 0 0 48px;
  font-size: 16px;
  color: rgba(255,255,255,0.42);
  line-height: 1.6;
`;

export const ActivationCta = styled.a`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #1DB09A 0%, #0B7A6A 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 18px 48px;
  border-radius: 100px;
  text-decoration: none;
  letter-spacing: -.01em;
  box-shadow: 0 8px 48px rgba(29,176,154,0.30);
  transition: opacity 0.2s, transform 0.15s;

  &:hover {
    opacity: 0.90;
    transform: translateY(-2px);
  }
  &:active { transform: translateY(0); }
`;

export const ActivationNote = styled.p`
  margin: 22px 0 0;
  font-size: 13px;
  color: rgba(255,255,255,0.22);
  letter-spacing: .01em;
`;
