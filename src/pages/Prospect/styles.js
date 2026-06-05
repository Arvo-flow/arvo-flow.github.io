import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Wrap = styled.div`
  min-height: 100vh;
  background: #080F0D;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
`;

export const Header = styled.header`
  width: 100%;
  max-width: 640px;
  padding: 28px 24px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
`;

export const LogoText = styled.span`
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
  flex: 1;
`;

export const DateStamp = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.30);
  letter-spacing: 0.04em;
`;

export const Body = styled.main`
  width: 100%;
  max-width: 640px;
  padding: 0 24px;
`;

export const MemoHead = styled.div`
  padding: 36px 0 28px;
  animation: ${fadeUp} 0.5s ease both;
`;

export const Eyebrow = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 10px;
`;

export const CompanyName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px;
  line-height: 1.18;
  letter-spacing: -0.01em;
`;

export const MetaLine = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.38);
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const MetaDot = styled.span`
  color: rgba(255,255,255,0.18);
`;

export const Intro = styled.p`
  font-size: 15px;
  color: rgba(255,255,255,0.68);
  line-height: 1.7;
  margin: 0 0 28px;
  animation: ${fadeUp} 0.5s 0.1s ease both;
`;

export const EstimateCard = styled.div`
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  animation: ${fadeUp} 0.5s 0.2s ease both;

  &:hover {
    border-color: rgba(29,176,154,0.25);
    background: rgba(255,255,255,0.055);
    transition: all 0.2s ease;
  }
`;

export const CategoryLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  margin-bottom: 14px;
`;

export const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  gap: 12px;
`;

export const DataDesc = styled.span`
  font-size: 13px;
  color: rgba(255,255,255,0.50);
  flex: 1;
`;

export const DataVal = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#1DB09A' : 'rgba(255,255,255,0.85)'};
  white-space: nowrap;
`;

export const SavingBand = styled.div`
  margin-top: 16px;
  background: rgba(29,176,154,0.10);
  border: 1px solid rgba(29,176,154,0.22);
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SavingLabel = styled.span`
  font-size: 12px;
  color: rgba(255,255,255,0.45);
`;

export const SavingRange = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #1DB09A;
`;

export const SourceNote = styled.div`
  margin-top: 10px;
  font-size: 11px;
  color: rgba(255,255,255,0.22);
  letter-spacing: 0.02em;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin: 24px 0;
`;

export const Disclaimer = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.28);
  line-height: 1.6;
  padding: 14px 16px;
  background: rgba(255,255,255,0.025);
  border-left: 2px solid rgba(29,176,154,0.30);
  border-radius: 4px;
  margin-bottom: 28px;
  animation: ${fadeUp} 0.5s 0.3s ease both;
`;

export const CtaSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: ${fadeUp} 0.5s 0.35s ease both;
`;

export const PrimaryCta = styled.a`
  display: block;
  background: #1DB09A;
  color: #ffffff;
  text-align: center;
  text-decoration: none;
  padding: 18px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: #18997F;
    transform: translateY(-1px);
  }
`;

export const SecondaryCta = styled.a`
  display: block;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  text-align: center;
  text-decoration: none;
  padding: 15px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.30);
    color: rgba(255,255,255,0.90);
  }
`;

export const Footer = styled.footer`
  width: 100%;
  max-width: 640px;
  padding: 28px 24px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  text-align: center;
  animation: ${fadeUp} 0.5s 0.4s ease both;
`;

export const FooterText = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.20);
  line-height: 1.7;
`;

// ── Loading & error states ──────────────────────────────────────────────────────

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1); }
`;

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
  background: #1DB09A;
  color: #ffffff;
  text-decoration: none;
  padding: 13px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
`;
