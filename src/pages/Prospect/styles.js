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

// ── Page ──────────────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  min-height: 100vh;
  background: #060D0A;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeaderBar = styled.div`
  background: #060D0A;
  padding: 56px 28px 72px;
  text-align: center;
  position: relative;
  overflow: hidden;

  /* Atmospheric teal glow behind the company name */
  &::before {
    content: '';
    position: absolute;
    top: 55%; left: 50%;
    transform: translate(-50%, -50%);
    width: 420px; height: 280px;
    background: radial-gradient(ellipse, rgba(29,176,154,0.07) 0%, transparent 68%);
    pointer-events: none;
  }
`;

export const HeaderInner = styled.div`
  position: relative;
`;

export const HeaderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
  ${appear(0)}
`;

export const ConfidentialLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1DB09A;
`;

export const HeaderDate = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.18);
`;

export const CompanyName = styled.h1`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(52px, 14vw, 72px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 22px;
  line-height: 1.03;
  letter-spacing: -0.03em;
  ${appear(0.07)}
`;

export const MetaLine = styled.div`
  font-size: 14px;
  color: rgba(255,255,255,0.22);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  ${appear(0.15)}
`;

export const MetaDot = styled.span`
  color: rgba(255,255,255,0.10);
`;

// ── Signal / finding section ──────────────────────────────────────────────────

export const SignalSection = styled.div`
  background: #060D0A;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 80px 28px 72px;
  text-align: center;
`;

export const SectionEyebrow = styled.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.18);
  margin-bottom: 36px;
`;

export const SignalCard = styled.div`
  margin-bottom: 14px;
  ${({ $i }) => appear(0.08 + ($i ?? 0) * 0.06)}
`;

export const SignalBullet = styled.div`
  font-size: 16px;
  color: #1DB09A;
  margin-bottom: 18px;
`;

export const SignalText = styled.p`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 6.5vw, 32px);
  font-weight: 400;
  font-style: italic;
  color: rgba(255,255,255,0.88);
  line-height: 1.42;
  max-width: 440px;
  margin: 0 auto;
  letter-spacing: -0.01em;
`;

export const DataCard = styled.div`
  margin-top: 48px;
  padding-top: 36px;
  border-top: 1px solid rgba(255,255,255,0.06);
  max-width: 340px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

export const DataDesc = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.22);
`;

export const DataVal = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#1DB09A' : 'rgba(255,255,255,0.60)'};
  text-align: right;
`;

// ── Financial section ─────────────────────────────────────────────────────────

export const FinancialSection = styled.div`
  background: #060D0A;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 96px 28px 88px;
  text-align: center;
`;

export const BigNumber = styled.div`
  font-size: clamp(56px, 16vw, 84px);
  font-weight: 800;
  color: #1DB09A;
  letter-spacing: -0.05em;
  line-height: 1;
  ${appear(0.06)}
`;

export const BigNumberSub = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.20);
  margin-top: 18px;
  ${appear(0.14)}
`;

export const BigNumberNote = styled.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.14);
  margin-top: 10px;
`;

// ── Estimate cards (light section) ────────────────────────────────────────────

export const EstimateCard = styled.div`
  background: #ffffff;
  border-radius: 22px;
  padding: 26px 22px;
  margin-bottom: 14px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
`;

export const CategoryLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1B7A6E;
  margin-bottom: 18px;
`;

export const SavingBand = styled.div`
  background: #0B1612;
  border-radius: 12px;
  padding: 14px 18px;
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SavingLabel = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.35);
`;

export const SavingRange = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #4ECDC4;
`;

export const SourceNote = styled.div`
  font-size: 11px;
  color: rgba(14,26,23,0.22);
  margin-top: 10px;
`;

export const MethodologyNote = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.16);
  line-height: 1.80;
  max-width: 360px;
  margin: 0 auto 48px;
`;

export const Divider = styled.div`
  display: none;
`;

export const ContentArea = styled.div`
  background: #F4F7F5;
  padding: 48px 20px 40px;
`;

export const BreakdownEyebrow = styled.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(14,26,23,0.30);
  margin-bottom: 24px;
  text-align: center;
`;

export const EstimateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

export const EstimateDesc = styled.span`
  font-size: 12px;
  color: rgba(14,26,23,0.40);
`;

export const EstimateVal = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#1B7A6E' : 'rgba(14,26,23,0.65)'};
  text-align: right;
`;

// ── CTA ───────────────────────────────────────────────────────────────────────

export const CtaSection = styled.div`
  background: #060D0A;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 64px 24px 56px;
  text-align: center;
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
  padding: 22px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 16px 48px rgba(29,176,154,0.30);
  box-sizing: border-box;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.97);
    box-shadow: 0 8px 24px rgba(29,176,154,0.18);
  }
`;

export const PrimaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.18);
  margin-top: 12px;
`;

export const CtaGap = styled.div`
  height: 18px;
`;

export const SecondaryCtaWrap = styled.div``;

export const SecondaryCta = styled.a`
  display: block;
  max-width: 400px;
  margin-inline: auto;
  border: 1px solid rgba(255,255,255,0.12);
  background: transparent;
  color: rgba(255,255,255,0.55);
  font-size: 15px;
  font-weight: 500;
  padding: 18px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  transition: border-color 0.15s, color 0.15s;

  &:active {
    border-color: rgba(255,255,255,0.28);
    color: rgba(255,255,255,0.85);
  }
`;

export const SecondaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.16);
  margin-top: 12px;
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const PageFooter = styled.div`
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #060D0A;
`;

export const FooterDomain = styled.span`
  font-size: 11px;
  color: rgba(255,255,255,0.13);
`;

export const FooterBrand = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.10);
`;

// ── Loading / Error ───────────────────────────────────────────────────────────

export const LoadingWrap = styled.div`
  min-height: 100vh;
  background: #060D0A;
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
  color: rgba(255,255,255,0.20);
`;

export const ErrorWrap = styled.div`
  min-height: 100vh;
  background: #060D0A;
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
  color: rgba(255,255,255,0.30);
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
