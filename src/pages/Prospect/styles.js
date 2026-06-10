import styled, { keyframes, css } from 'styled-components';

const rise = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const pulse = keyframes`
  0%,100% { opacity:0.3; transform:scale(0.8); }
  50%     { opacity:1;   transform:scale(1);   }
`;

const appear = (delay = 0) => css`
  opacity: 0;
  animation: ${rise} 0.75s ${delay}s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const MONO = `'JetBrains Mono', 'SF Mono', ui-monospace, Menlo, monospace`;

// ── Page ──────────────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  min-height: 100vh;
  background: #050B09;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`;

/* Mask under iOS-statusbaren så skrollande text tonar ut istället för att
   krocka med klockan — Apple-mönstret för mörka sidor. */
export const TopFade = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 10;
  height: calc(env(safe-area-inset-top, 0px) + 28px);
  background: linear-gradient(to bottom, rgba(5,11,9,0.94) 0%, rgba(5,11,9,0) 100%);
  pointer-events: none;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeaderBar = styled.div`
  background: #050B09;
  padding: calc(76px + env(safe-area-inset-top, 0px)) 28px 96px;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Tunn brand-keyline i absoluta toppen */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #2BC4AC 35%, #5DD6CA 50%, #2BC4AC 65%, transparent 100%);
    opacity: 0.85;
  }

  /* Aurora — två lager ljus i mörkret, ger djup istället för platt svart */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 75% 55% at 50% 38%, rgba(43,196,172,0.16) 0%, transparent 62%),
      radial-gradient(ellipse 55% 40% at 18% 88%, rgba(27,110,102,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 45% 35% at 85% 12%, rgba(93,214,202,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
`;

export const HeaderInner = styled.div`
  position: relative;
`;

export const BrandMark = styled.div`
  font-family: ${MONO};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-indent: 0.42em; /* kompenserar sista bokstavens spacing vid centrering */
  color: #5DD6CA;
  margin-bottom: 18px;
  ${appear(0)}
`;

export const ConfidentialLabel = styled.div`
  font-family: ${MONO};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.46);
  margin-bottom: 48px;
  ${appear(0.05)}
`;

export const CompanyName = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(52px, 14vw, 76px);
  font-weight: 700;
  margin: 0 0 24px;
  line-height: 1.04;
  letter-spacing: -0.03em;

  /* Apple-metallisk text: vit som tonar mot teal-is i botten */
  color: #EAF6F3;
  background: linear-gradient(180deg, #FFFFFF 24%, #D9EFEA 58%, #9FD9CE 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  ${appear(0.10)}
`;

export const MetaLine = styled.div`
  font-size: 15px;
  color: rgba(255,255,255,0.58);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  ${appear(0.17)}
`;

export const MetaDot = styled.span`
  color: rgba(93,214,202,0.45);
`;

export const HeaderDate = styled.div`
  font-family: ${MONO};
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.36);
  margin-top: 32px;
  ${appear(0.24)}
`;

// ── Signal / finding section ──────────────────────────────────────────────────

export const SignalSection = styled.div`
  background: #050B09;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 84px 28px 76px;
  text-align: center;
`;

export const SectionEyebrow = styled.div`
  font-family: ${MONO};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: #2BC4AC;
  margin-bottom: 40px;
`;

export const SignalCard = styled.div`
  margin-bottom: 44px;
  &:last-of-type { margin-bottom: 0; }
  ${({ $i }) => appear(0.08 + ($i ?? 0) * 0.06)}
`;

export const SignalBullet = styled.div`
  width: 36px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(93,214,202,0.7), transparent);
  margin: 0 auto 30px;
`;

export const SignalText = styled.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 6.4vw, 31px);
  font-weight: 500;
  color: #F2F8F6;
  line-height: 1.46;
  max-width: 460px;
  margin: 0 auto;
  letter-spacing: -0.012em;
`;

export const DataCard = styled.div`
  margin: 52px auto 0;
  max-width: 360px;
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px;
  background: rgba(255,255,255,0.025);
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

export const DataDesc = styled.span`
  font-size: 13px;
  color: rgba(255,255,255,0.48);
`;

export const DataVal = styled.span`
  font-family: ${MONO};
  font-size: 12.5px;
  font-weight: 500;
  color: ${({ $highlight }) => $highlight ? '#5DD6CA' : 'rgba(255,255,255,0.88)'};
  text-align: right;
`;

// ── Financial section ─────────────────────────────────────────────────────────

export const FinancialSection = styled.div`
  background: #050B09;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 96px 28px 92px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 520px; height: 360px;
    background: radial-gradient(ellipse, rgba(43,196,172,0.12) 0%, transparent 65%);
    pointer-events: none;
  }
`;

export const BigNumber = styled.div`
  position: relative;
  font-size: clamp(58px, 16.5vw, 92px);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;

  color: #2BC4AC;
  background: linear-gradient(135deg, #7BEADB 0%, #2BC4AC 52%, #179580 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  ${appear(0.06)}
`;

export const BigNumberApprox = styled.span`
  font-size: 0.50em;
  font-weight: 600;
  vertical-align: 0.34em;
  margin-right: 0.10em;
`;

/* Intervallet som spektrum — precision man kan SE, inte tre rader text */
export const RangeWrap = styled.div`
  max-width: 320px;
  margin: 40px auto 0;
  ${appear(0.14)}
`;

export const RangeTrack = styled.div`
  position: relative;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(43,196,172,0.18) 0%, rgba(43,196,172,0.55) 50%, rgba(43,196,172,0.18) 100%);
`;

export const RangeMarker = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 11px; height: 11px;
  border-radius: 50%;
  background: #5DD6CA;
  box-shadow: 0 0 0 4px rgba(93,214,202,0.18), 0 0 18px rgba(93,214,202,0.55);
`;

export const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-family: ${MONO};
  font-size: 11px;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.52);
`;

export const BigNumberSub = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.50);
  margin-top: 30px;
  ${appear(0.18)}
`;

export const BigNumberNote = styled.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.38);
  margin-top: 10px;
`;

// ── Estimate cards (light section) ────────────────────────────────────────────

export const ContentArea = styled.div`
  background: #EDF3F0;
  padding: 56px 20px 48px;
`;

export const BreakdownEyebrow = styled.div`
  font-family: ${MONO};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.30em;
  text-indent: 0.30em;
  text-transform: uppercase;
  color: rgba(14,26,23,0.52);
  margin-bottom: 26px;
  text-align: center;
`;

export const EstimateCard = styled.div`
  background: #ffffff;
  border-radius: 24px;
  padding: 28px 24px 0;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 24px rgba(11,22,18,0.07);
`;

export const CategoryLabel = styled.div`
  font-family: ${MONO};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: #1B7A6E;
  margin-bottom: 10px;
`;

export const EstimateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(14,26,23,0.06);

  &:last-of-type { border-bottom: none; }
`;

export const EstimateDesc = styled.span`
  font-size: 13px;
  color: rgba(14,26,23,0.55);
`;

export const EstimateVal = styled.span`
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#1B7A6E' : 'rgba(14,26,23,0.84)'};
  text-align: right;
`;

export const EstimateValNote = styled.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: rgba(14,26,23,0.44);
  margin-top: 2px;
`;

/* Premie-bandet bleedar till kortets kanter — en avslutning, inte en låda i lådan */
export const SavingBand = styled.div`
  background: #0B1612;
  margin: 18px -24px 0;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  > div { text-align: right; }
`;

export const SavingLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.62);
`;

export const SavingCentral = styled.div`
  font-family: ${MONO};
  font-size: 16px;
  font-weight: 600;
  color: #5DD6CA;
  letter-spacing: -0.01em;
`;

export const SavingInterval = styled.div`
  font-family: ${MONO};
  font-size: 10.5px;
  color: rgba(255,255,255,0.46);
  margin-top: 3px;
`;

export const SourceNote = styled.div`
  font-size: 11px;
  color: rgba(14,26,23,0.46);
  margin: 12px 0 0;
  padding-bottom: 16px;
`;

// ── CTA ───────────────────────────────────────────────────────────────────────

export const CtaSection = styled.div`
  background: #050B09;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding: 72px 24px 60px;
  text-align: center;
`;

export const MethodologyNote = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.46);
  line-height: 1.80;
  max-width: 360px;
  margin: 0 auto 52px;
`;

export const PrimaryCtaWrap = styled.div`
  margin-bottom: 10px;
`;

export const PrimaryCta = styled.a`
  display: block;
  max-width: 400px;
  margin-inline: auto;
  background: linear-gradient(140deg, #4ECDC4 0%, #1DB09A 52%, #178A7B 100%);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  padding: 22px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 18px 56px rgba(29,176,154,0.38), inset 0 1px 0 rgba(255,255,255,0.22);
  box-sizing: border-box;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.97);
    box-shadow: 0 8px 24px rgba(29,176,154,0.20);
  }
`;

export const PrimaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.50);
  margin-top: 14px;
`;

export const CtaGap = styled.div`
  height: 36px;
`;

/* Intelligence på kall trafik är en viskning, inte en knapp —
   första kontaktytan har EN handling. */
export const SecondaryLink = styled.a`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.18);
  padding-bottom: 3px;
  transition: color 0.15s, border-color 0.15s;

  &:active {
    color: rgba(255,255,255,0.90);
    border-color: rgba(255,255,255,0.40);
  }
`;

export const SecondaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.38);
  margin-top: 12px;
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const PageFooter = styled.div`
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 22px 28px calc(22px + env(safe-area-inset-bottom, 0px));
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #050B09;
`;

export const FooterDomain = styled.span`
  font-family: ${MONO};
  font-size: 11px;
  color: rgba(255,255,255,0.32);
`;

export const FooterBrand = styled.span`
  font-family: ${MONO};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
`;

// ── Loading / Error ───────────────────────────────────────────────────────────

export const LoadingWrap = styled.div`
  min-height: 100vh;
  background: #050B09;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Dots = styled.div`display: flex; gap: 8px;`;

export const Dot = styled.div`
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${pulse} 1.2s ${({ $i }) => ($i ?? 0) * 0.2}s ease-in-out infinite;
`;

export const LoadingText = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.32);
`;

export const ErrorWrap = styled.div`
  min-height: 100vh;
  background: #050B09;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
`;

export const ErrorIcon = styled.div`
  font-size: 32px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.4s ease both;
`;

export const ErrorTitle = styled.h2`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
`;

export const ErrorBody = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.40);
  line-height: 1.65;
  max-width: 300px;
  margin: 0 0 28px;
`;

export const ErrorCta = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: #1DB09A;
  text-decoration: none;
  border-bottom: 1px solid rgba(29,176,154,0.3);
  padding-bottom: 2px;
`;
