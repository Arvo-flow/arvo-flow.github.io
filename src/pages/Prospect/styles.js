import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { opacity: 0.6; }
  50%  { opacity: 1; }
  100% { opacity: 0.6; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1); }
`;

// ── Layout ──────────────────────────────────────────────────────────────────────

export const Wrap = styled.div`
  min-height: 100vh;
  background: #080F0D;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse at 50% 0%, rgba(29,176,154,0.09) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  > * { position: relative; z-index: 1; }
`;

export const Header = styled.header`
  width: 100%;
  max-width: 600px;
  padding: 26px 24px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(29,176,154,0.20);
`;

export const LogoText = styled.span`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.90);
  flex: 1;
  text-transform: uppercase;
`;

export const DateStamp = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.28);
  letter-spacing: 0.04em;
`;

export const Body = styled.main`
  width: 100%;
  max-width: 600px;
  padding: 0 24px;
`;

// ── Memo header ────────────────────────────────────────────────────────────────

export const MemoHead = styled.div`
  padding: 40px 0 28px;
  animation: ${fadeUp} 0.45s ease both;
`;

export const Eyebrow = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 1px;
    background: #1DB09A;
    opacity: 0.7;
  }
`;

export const CompanyName = styled.h1`
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 38px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px;
  line-height: 1.10;
  letter-spacing: -0.02em;

  @media (max-width: 400px) {
    font-size: 30px;
  }
`;

export const MetaLine = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  letter-spacing: 0.02em;
`;

export const MetaDot = styled.span`
  color: rgba(255,255,255,0.16);
`;

export const Intro = styled.p`
  font-size: 16px;
  color: rgba(255,255,255,0.72);
  line-height: 1.75;
  margin: 0 0 32px;
  animation: ${fadeUp} 0.45s 0.08s ease both;
`;

// ── Intel card — "Hur visste de det?" ──────────────────────────────────────────

export const IntelCard = styled.div`
  position: relative;
  background: linear-gradient(145deg, rgba(29,176,154,0.10) 0%, rgba(29,176,154,0.04) 100%);
  border: 1px solid rgba(29,176,154,0.32);
  border-radius: 20px;
  padding: 28px 24px 24px;
  margin-bottom: 24px;
  animation: ${fadeUp} 0.45s 0.10s ease both;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #4ECDC4 0%, #1DB09A 60%, transparent 100%);
    border-radius: 20px 20px 0 0;
  }
`;

export const IntelLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #4ECDC4;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(29,176,154,0.20);
  }
`;

export const FindingsList = styled.div`
  margin-bottom: 20px;
`;

export const FindingItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid rgba(29,176,154,0.10);

  &:first-child { padding-top: 0; }
  &:last-child  { border-bottom: none; padding-bottom: 0; }
`;

export const FindingBullet = styled.span`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(78,205,196,0.14);
  border: 1px solid rgba(78,205,196,0.30);
  color: #4ECDC4;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  letter-spacing: 0;
`;

export const FindingText = styled.span`
  font-size: 14px;
  color: rgba(255,255,255,0.85);
  line-height: 1.55;
  font-weight: 400;
`;

export const IntelDivider = styled.div`
  height: 1px;
  background: rgba(29,176,154,0.14);
  margin: 16px 0;
`;

// ── Estimate card ───────────────────────────────────────────────────────────────

export const EstimateCard = styled.div`
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 16px;
  animation: ${fadeUp} 0.45s 0.18s ease both;

  &:hover {
    border-color: rgba(29,176,154,0.22);
    background: rgba(255,255,255,0.05);
    transition: all 0.2s ease;
  }
`;

export const CategoryLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.28);
  margin-bottom: 16px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  gap: 12px;
`;

export const DataDesc = styled.span`
  font-size: 13px;
  color: rgba(255,255,255,0.46);
  flex: 1;
`;

export const DataVal = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#4ECDC4' : 'rgba(255,255,255,0.88)'};
  white-space: nowrap;
`;

export const SavingBand = styled.div`
  margin-top: 18px;
  background: linear-gradient(135deg, rgba(29,176,154,0.14), rgba(29,176,154,0.06));
  border: 1px solid rgba(29,176,154,0.28);
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SavingLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.42);
  letter-spacing: 0.02em;
`;

export const SavingRange = styled.span`
  font-size: 17px;
  font-weight: 800;
  color: #4ECDC4;
  letter-spacing: -0.01em;
`;

export const SourceNote = styled.div`
  margin-top: 10px;
  font-size: 11px;
  color: rgba(255,255,255,0.20);
  letter-spacing: 0.02em;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin: 28px 0;
`;

// ── Disclaimer ──────────────────────────────────────────────────────────────────

export const Disclaimer = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.26);
  line-height: 1.65;
  padding: 14px 16px;
  background: rgba(255,255,255,0.02);
  border-left: 2px solid rgba(29,176,154,0.25);
  border-radius: 4px;
  margin-bottom: 32px;
  animation: ${fadeUp} 0.45s 0.28s ease both;
`;

// ── CTAs ─────────────────────────────────────────────────────────────────────────

export const CtaSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeUp} 0.45s 0.32s ease both;
`;

export const PrimaryCta = styled.a`
  display: block;
  background: linear-gradient(135deg, #4ECDC4 0%, #1DB09A 100%);
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  padding: 20px 28px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: opacity 0.18s, transform 0.15s;
  box-shadow: 0 8px 24px rgba(29,176,154,0.28);

  &:hover {
    opacity: 0.90;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(29,176,154,0.36);
  }
`;

export const FreeNote = styled.div`
  text-align: center;
  font-size: 12px;
  color: rgba(255,255,255,0.36);
  letter-spacing: 0.04em;
  margin-top: -4px;
`;

export const SecondaryCta = styled.a`
  display: block;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.55);
  text-align: center;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.28);
    color: rgba(255,255,255,0.85);
  }
`;

// ── Footer ──────────────────────────────────────────────────────────────────────

export const Footer = styled.footer`
  width: 100%;
  max-width: 600px;
  padding: 28px 24px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  text-align: center;
  animation: ${fadeUp} 0.45s 0.38s ease both;
`;

export const FooterText = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.18);
  line-height: 1.7;
`;

// ── Loading & error states ──────────────────────────────────────────────────────

export const LoadingWrap = styled.div`
  min-height: 100vh;
  background: #080F0D;
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
  color: rgba(255,255,255,0.30);
  margin: 0;
`;

export const ErrorWrap = styled.div`
  min-height: 100vh;
  background: #080F0D;
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
  color: rgba(255,255,255,0.45);
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
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
`;
