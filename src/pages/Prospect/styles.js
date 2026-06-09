import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1); }
`;

// ── Shared ────────────────────────────────────────────────────────────────────

const DARK  = '#040A09';
const TEAL  = '#1DB09A';
const TEAL2 = '#4ECDC4';

// ── Page ──────────────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  min-height: 100vh;
  background: ${DARK};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
`;

// ── Hero ──────────────────────────────────────────────────────────────────────

export const HeroSection = styled.div`
  background: ${DARK};
  padding: 64px 32px 56px;
  text-align: center;
  position: relative;
  animation: ${fadeUp} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, ${TEAL} 30%, ${TEAL2} 60%, transparent 100%);
  }
`;

export const HeroTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`;

export const ConfidentialLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${TEAL};
`;

export const HeroDate = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.22);
  letter-spacing: 0.04em;
`;

export const HeroCompany = styled.h1`
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(40px, 11vw, 56px);
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px;
  line-height: 1.06;
  letter-spacing: -0.025em;
  animation: ${fadeUp} 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const HeroMeta = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.28);
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  letter-spacing: 0.01em;
  animation: ${fadeUp} 0.5s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const MetaDot = styled.span`
  color: rgba(255,255,255,0.15);
`;

// ── Intel section (finding reveal) ───────────────────────────────────────────

export const IntelSection = styled.div`
  background: ${DARK};
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 56px 32px 52px;
  text-align: center;
`;

export const SectionEyebrow = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.30);
  margin-bottom: 28px;
`;

export const IntelFinding = styled.div`
  margin-bottom: 20px;
  animation: ${fadeUp} 0.5s ${({ $i }) => 0.1 + ($i ?? 0) * 0.08}s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const FindingStar = styled.div`
  font-size: 14px;
  color: ${TEAL};
  margin-bottom: 10px;
  letter-spacing: 0.08em;
`;

export const FindingText = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: rgba(255,255,255,0.92);
  line-height: 1.50;
  margin: 0;
  letter-spacing: -0.01em;
  max-width: 480px;
  margin-inline: auto;
`;

// ── Intel secondary metadata ──────────────────────────────────────────────────

export const IntelMeta = styled.div`
  margin-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 380px;
  margin-inline: auto;
`;

export const IntelMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
`;

export const IntelMetaLabel = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.30);
  flex-shrink: 0;
`;

export const IntelMetaVal = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? TEAL : 'rgba(255,255,255,0.70)'};
  text-align: right;
`;

// ── Number section (financial impact) ────────────────────────────────────────

export const NumberSection = styled.div`
  background: linear-gradient(180deg, ${DARK} 0%, #06120E 100%);
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 64px 32px 60px;
  text-align: center;
`;

export const NumberEyebrow = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  margin-bottom: 20px;
  animation: ${fadeUp} 0.5s 0.05s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const ImpactNumber = styled.div`
  font-size: clamp(44px, 13vw, 68px);
  font-weight: 800;
  color: ${TEAL};
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 4px;
  animation: ${fadeUp} 0.6s 0.10s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const ImpactUnit = styled.span`
  font-size: 0.40em;
  font-weight: 500;
  color: rgba(29,176,154,0.65);
  letter-spacing: -0.01em;
  vertical-align: baseline;
`;

export const ImpactMeta = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.28);
  margin-top: 12px;
  letter-spacing: 0.01em;
`;

export const ImpactNote = styled.div`
  font-size: 12px;
  font-style: italic;
  color: rgba(255,255,255,0.22);
  margin-top: 20px;
  max-width: 320px;
  margin-inline: auto;
  line-height: 1.6;
`;

// ── Breakdown section (light) ─────────────────────────────────────────────────

export const BreakdownSection = styled.div`
  background: #F5F8F6;
  padding: 48px 24px 40px;
`;

export const BreakdownInner = styled.div`
  max-width: 520px;
  margin: 0 auto;
`;

export const BreakdownEyebrow = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: rgba(14,26,23,0.35);
  margin-bottom: 24px;
  text-align: center;
`;

export const CategoryCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${TEAL} 0%, ${TEAL2} 100%);
  }
`;

export const CategoryLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #1B7A6E;
  margin-bottom: 20px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);

  &:last-of-type {
    border-bottom: none;
  }
`;

export const DataDesc = styled.span`
  font-size: 13px;
  color: rgba(14,26,23,0.45);
  flex-shrink: 0;
`;

export const DataVal = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#1B7A6E' : '#0E1A17'};
  text-align: right;
`;

export const SavingBand = styled.div`
  background: #0E1A17;
  border-radius: 12px;
  padding: 14px 18px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const SavingLabel = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.45);
  font-weight: 500;
`;

export const SavingRange = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${TEAL2};
  letter-spacing: -0.01em;
`;

export const SourceNote = styled.div`
  font-size: 11px;
  color: rgba(14,26,23,0.28);
  margin-top: 12px;
  line-height: 1.5;
`;

// ── CTA section (dark) ────────────────────────────────────────────────────────

export const CtaSection = styled.div`
  background: ${DARK};
  padding: 56px 28px 48px;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.05);
`;

export const MethodologyNote = styled.p`
  font-size: 12px;
  color: rgba(255,255,255,0.20);
  line-height: 1.75;
  max-width: 380px;
  margin: 0 auto 40px;
`;

export const PrimaryCtaWrap = styled.div`
  margin-bottom: 8px;
`;

export const PrimaryCta = styled.a`
  display: block;
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
  background: linear-gradient(135deg, ${TEAL2} 0%, ${TEAL} 55%, #1B6E66 100%);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  padding: 20px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.01em;
  box-shadow: 0 12px 40px rgba(29,176,154,0.35);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-sizing: border-box;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 6px 24px rgba(29,176,154,0.25);
  }
`;

export const PrimaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.25);
  margin-top: 10px;
  letter-spacing: 0.01em;
`;

export const CtaGap = styled.div`
  height: 20px;
`;

export const SecondaryCtaWrap = styled.div`
  margin-bottom: 8px;
`;

export const SecondaryCta = styled.a`
  display: block;
  width: 100%;
  max-width: 420px;
  margin-inline: auto;
  border: 1px solid rgba(255,255,255,0.18);
  background: transparent;
  color: rgba(255,255,255,0.80);
  font-size: 15px;
  font-weight: 600;
  padding: 18px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: border-color 0.18s ease, color 0.18s ease;
  box-sizing: border-box;

  &:active {
    border-color: rgba(255,255,255,0.35);
    color: #fff;
  }
`;

export const SecondaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.20);
  margin-top: 10px;
  letter-spacing: 0.01em;
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const PageFooter = styled.div`
  background: ${DARK};
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterDomain = styled.span`
  font-size: 11px;
  color: rgba(255,255,255,0.18);
  letter-spacing: 0.04em;
`;

export const FooterBrand = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.15);
`;

// ── Loading ───────────────────────────────────────────────────────────────────

export const LoadingWrap = styled.div`
  min-height: 100vh;
  background: ${DARK};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

export const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${TEAL};
  animation: ${pulse} 1.2s ${({ $i }) => ($i ?? 0) * 0.2}s ease-in-out infinite;
`;

export const LoadingText = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.04em;
`;

// ── Error ─────────────────────────────────────────────────────────────────────

export const ErrorWrap = styled.div`
  min-height: 100vh;
  background: ${DARK};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  text-align: center;
  gap: 0;
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
  color: rgba(255,255,255,0.35);
  line-height: 1.65;
  max-width: 320px;
  margin: 0 0 28px;
`;

export const ErrorCta = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: ${TEAL};
  text-decoration: none;
  border-bottom: 1px solid rgba(29,176,154,0.3);
  padding-bottom: 2px;
`;
