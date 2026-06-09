import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1); }
`;

// ── Page wrapper ──────────────────────────────────────────────────────────────

export const PageWrap = styled.div`
  min-height: 100vh;
  background: #060D0B;
  font-family: 'Inter', -apple-system, sans-serif;
`;

// ── Top header bar ────────────────────────────────────────────────────────────

export const HeaderBar = styled.div`
  background: #060D0B;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 28px 24px 24px;
  position: relative;
  animation: ${fadeUp} 0.4s ease-out both;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #1DB09A 0%, #4ECDC4 50%, transparent 100%);
  }
`;

export const HeaderInner = styled.div`
  max-width: 560px;
  margin: 0 auto;
`;

export const HeaderMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ConfidentialLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: #1DB09A;
`;

export const HeaderDate = styled.div`
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 0.04em;
`;

export const CompanyName = styled.h1`
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px;
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

export const MetaLine = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.30);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  letter-spacing: 0.03em;
`;

export const MetaDot = styled.span`
  color: rgba(255,255,255,0.12);
`;

// ── Main content area ─────────────────────────────────────────────────────────

export const ContentArea = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 40px 24px 80px;
`;

// ── Section eyebrow ───────────────────────────────────────────────────────────

export const SectionEyebrow = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 1px;
    background: #1DB09A;
    opacity: 0.7;
  }
`;

// ── Signal cards ──────────────────────────────────────────────────────────────

export const SignalSection = styled.div`
  margin-bottom: 32px;
  animation: ${fadeUp} 0.4s ease-out both;
  animation-delay: 0.1s;
`;

export const SignalCard = styled.div`
  background: rgba(29,176,154,0.07);
  border-left: 3px solid #1DB09A;
  border-radius: 0 10px 10px 0;
  padding: 14px 18px;
  margin-bottom: 10px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  animation: ${fadeUp} 0.4s ease-out both;
  animation-delay: ${({ $i }) => 0.15 + ($i ?? 0) * 0.1}s;
`;

export const SignalBullet = styled.span`
  color: #4ECDC4;
  font-size: 12px;
  flex-shrink: 0;
  margin-top: 2px;
  font-weight: 700;
`;

export const SignalText = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255,255,255,0.88);
  line-height: 1.5;
`;

// ── Secondary data rows inside intel card ─────────────────────────────────────

export const DataCard = styled.div`
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 10px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  gap: 12px;

  &:last-child { margin-bottom: 0; }
`;

export const DataDesc = styled.span`
  font-size: 13px;
  color: rgba(255,255,255,0.38);
  flex: 1;
`;

export const DataVal = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#4ECDC4' : 'rgba(255,255,255,0.82)'};
  white-space: nowrap;
`;

// ── Financial stakes ──────────────────────────────────────────────────────────

export const FinancialSection = styled.div`
  margin-bottom: 32px;
  animation: ${fadeUp} 0.4s ease-out both;
  animation-delay: 0.2s;
`;

export const BigNumber = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #1DB09A;
  letter-spacing: -0.02em;
  margin: 8px 0;
`;

export const BigNumberSub = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.38);
  margin-bottom: 6px;
  line-height: 1.5;
`;

export const BigNumberNote = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.22);
  font-style: italic;
  line-height: 1.55;
`;

// ── Category estimate cards (minimal dark style) ───────────────────────────────

export const EstimateCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 12px;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(29,176,154,0.20);
  }
`;

export const CategoryLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.22);
  margin-bottom: 14px;
`;

export const SavingBand = styled.div`
  margin-top: 16px;
  background: linear-gradient(135deg, rgba(29,176,154,0.12), rgba(29,176,154,0.05));
  border: 1px solid rgba(29,176,154,0.22);
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SavingLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.38);
`;

export const SavingRange = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: #4ECDC4;
  letter-spacing: -0.01em;
`;

export const SourceNote = styled.div`
  margin-top: 10px;
  font-size: 11px;
  color: rgba(255,255,255,0.16);
  line-height: 1.5;
`;

// ── Methodology note ──────────────────────────────────────────────────────────

export const MethodologyNote = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  line-height: 1.65;
  padding: 14px 18px;
  border-left: 2px solid rgba(29,176,154,0.18);
  background: rgba(255,255,255,0.018);
  border-radius: 0 6px 6px 0;
  margin-bottom: 36px;
`;

// ── CTA section ───────────────────────────────────────────────────────────────

export const CtaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  animation: ${fadeUp} 0.6s ease-out both;
  animation-delay: 0.4s;
`;

export const PrimaryCtaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const PrimaryCta = styled.a`
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #4ECDC4 0%, #1DB09A 60%, #1B6E66 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 18px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  letter-spacing: -0.01em;
  transition: opacity 0.18s, transform 0.15s;
  box-shadow: 0 8px 32px rgba(29,176,154,0.28);
  box-sizing: border-box;

  &:hover {
    opacity: 0.90;
    transform: translateY(-2px);
  }
`;

export const PrimaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.28);
  letter-spacing: 0.03em;
  text-align: center;
`;

export const CtaGap = styled.div`
  height: 8px;
`;

export const SecondaryCtaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const SecondaryCta = styled.a`
  display: block;
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.50);
  text-align: center;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  box-sizing: border-box;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.28);
    color: rgba(255,255,255,0.80);
  }
`;

export const SecondaryCtaSub = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.22);
  letter-spacing: 0.02em;
  text-align: center;
`;

// ── Divider ───────────────────────────────────────────────────────────────────

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.05);
  margin: 28px 0;
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const PageFooter = styled.div`
  padding: 20px 24px 32px;
  max-width: 560px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterDomain = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.15);
  letter-spacing: 0.05em;
`;

export const FooterBrand = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.10);
`;

// ── Loading ───────────────────────────────────────────────────────────────────

export const LoadingWrap = styled.div`
  min-height: 100vh;
  background: #060D0B;
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

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1DB09A;
  animation: ${pulse} 1.2s ${({ $i }) => $i * 0.18}s ease-in-out infinite;
`;

export const LoadingText = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.28);
  margin: 0;
`;

// ── Error ─────────────────────────────────────────────────────────────────────

export const ErrorWrap = styled.div`
  min-height: 100vh;
  background: #060D0B;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
`;

export const ErrorIcon = styled.div`
  font-size: 36px;
  margin-bottom: 4px;
`;

export const ErrorTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const ErrorBody = styled.p`
  font-size: 14px;
  color: rgba(255,255,255,0.40);
  line-height: 1.6;
  margin: 0;
`;

export const ErrorCta = styled.a`
  margin-top: 8px;
  display: inline-block;
  background: linear-gradient(135deg, #4ECDC4, #1DB09A);
  color: #ffffff;
  text-decoration: none;
  padding: 13px 22px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
`;
