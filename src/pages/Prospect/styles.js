import styled, { keyframes } from 'styled-components';

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

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%       { opacity: 1;   transform: scale(1); }
`;

// ── Hero (above the fold) ─────────────────────────────────────────────────────

export const HeroSection = styled.div`
  min-height: 100vh;
  background: #060D0B;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 64px;
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
  max-width: 440px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// ── Notification card ─────────────────────────────────────────────────────────

export const NotifCard = styled.div`
  width: 100%;
  background: rgba(6, 11, 10, 0.98);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.50);
  border-radius: 22px;
  padding: 20px 22px 22px;
  margin-bottom: 52px;
  text-align: left;
  animation: ${notifArrive} 0.75s cubic-bezier(0.34, 1.46, 0.64, 1) both;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.55) inset,
    0 -1px 0 rgba(255,255,255,0.06) inset,
    0 0 40px rgba(255,255,255,0.04),
    0 48px 120px rgba(0,0,0,0.70),
    0 8px 32px rgba(0,0,0,0.40);
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

export const NotifCta = styled.a`
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 600;
  color: #1DB09A;
  cursor: pointer;
  letter-spacing: -.01em;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover { opacity: 0.70; }
`;

// ── Hero text ─────────────────────────────────────────────────────────────────

export const HeroTagline = styled.h1`
  margin: 0 0 16px;
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: clamp(36px, 9vw, 64px);
  font-weight: 700;
  color: #fff;
  line-height: 1.10;
  letter-spacing: -.02em;
  animation: ${fadeUp} 0.8s 0.28s both ease-out;

  em {
    font-style: italic;
    font-weight: 400;
  }
`;

export const HeroSub = styled.p`
  margin: 0 0 48px;
  font-size: 16px;
  color: rgba(255,255,255,0.45);
  line-height: 1.55;
  animation: ${fadeUp} 0.8s 0.42s both ease-out;
`;

export const HeroCtaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  animation: ${fadeUp} 0.8s 0.56s both ease-out;
`;

export const HeroCta = styled.a`
  display: block;
  width: 100%;
  background: linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  padding: 18px 32px;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  letter-spacing: -.01em;
  transition: opacity 0.18s, transform 0.15s;
  box-shadow: 0 8px 32px rgba(29,176,154,0.32);

  &:hover {
    opacity: 0.90;
    transform: translateY(-2px);
  }
`;

export const HeroPrice = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.30);
  letter-spacing: .02em;
`;

// ── Footer ────────────────────────────────────────────────────────────────────

export const HeroFooter = styled.div`
  position: absolute;
  bottom: 28px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 1;
`;

export const FooterDomain = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.18);
  letter-spacing: .06em;
`;

export const FooterBrand = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.12);
`;

// ── Detail section (below the fold) ──────────────────────────────────────────

export const DetailSection = styled.div`
  background: #080F0D;
  padding: 60px 24px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailInner = styled.div`
  max-width: 560px;
  width: 100%;
`;

export const DetailEyebrow = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #1DB09A;
  margin-bottom: 32px;
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

export const CompanyName = styled.h2`
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px;
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

export const MetaLine = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.30);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  letter-spacing: 0.02em;
  margin-bottom: 32px;
`;

export const MetaDot = styled.span`
  color: rgba(255,255,255,0.14);
`;

// ── Intel card ────────────────────────────────────────────────────────────────

export const IntelCard = styled.div`
  position: relative;
  background: linear-gradient(145deg, rgba(29,176,154,0.10) 0%, rgba(29,176,154,0.04) 100%);
  border: 1px solid rgba(29,176,154,0.32);
  border-radius: 20px;
  padding: 28px 24px 24px;
  margin-bottom: 20px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
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
`;

export const IntelDivider = styled.div`
  height: 1px;
  background: rgba(29,176,154,0.14);
  margin: 16px 0;
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
  color: rgba(255,255,255,0.40);
  flex: 1;
`;

export const DataVal = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $highlight }) => $highlight ? '#4ECDC4' : 'rgba(255,255,255,0.85)'};
  white-space: nowrap;
`;

// ── Estimate card ─────────────────────────────────────────────────────────────

export const EstimateCard = styled.div`
  background: rgba(255,255,255,0.035);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 16px;

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
  color: rgba(255,255,255,0.24);
  margin-bottom: 16px;
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
  color: rgba(255,255,255,0.40);
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
  color: rgba(255,255,255,0.18);
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin: 24px 0;
`;

export const Disclaimer = styled.div`
  font-size: 12px;
  color: rgba(255,255,255,0.22);
  line-height: 1.65;
  padding: 14px 16px;
  background: rgba(255,255,255,0.02);
  border-left: 2px solid rgba(29,176,154,0.20);
  border-radius: 4px;
  margin-bottom: 32px;
`;

export const SecondaryCtaWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
`;

export const SecondaryCta = styled.a`
  display: block;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.50);
  text-align: center;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.28);
    color: rgba(255,255,255,0.80);
  }
`;

export const FreeNote = styled.div`
  text-align: center;
  font-size: 12px;
  color: rgba(255,255,255,0.28);
  letter-spacing: 0.03em;
`;

// ── Loading & error ───────────────────────────────────────────────────────────

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
