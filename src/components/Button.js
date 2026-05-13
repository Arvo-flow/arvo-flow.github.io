import styled, { css } from 'styled-components';

const variants = {
  primary: css`
    background: ${({ theme }) => theme.color.ink};
    color: #FAFAF7;
    border: 1px solid ${({ theme }) => theme.color.ink};
    box-shadow: ${({ theme }) => theme.shadow.sm};
    &:hover { transform: translateY(-1px); box-shadow: ${({ theme }) => theme.shadow.md}; }
    &:active { transform: translateY(0); }
  `,
  brand: css`
    background: ${({ theme }) => theme.color.brand};
    color: #FAFAF7;
    border: 1px solid ${({ theme }) => theme.color.brand};
    box-shadow: ${({ theme }) => theme.shadow.sm};
    &:hover { transform: translateY(-1px); box-shadow: ${({ theme }) => theme.shadow.md}; background: ${({ theme }) => theme.color.brandInk}; }
    &:active { transform: translateY(0); }
  `,
  gradient: css`
    background: ${({ theme }) => theme.color.brandGradient};
    color: #FFFFFF;
    border: 1px solid transparent;
    box-shadow: ${({ theme }) => theme.shadow.brand};
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: ${({ theme }) => theme.color.brandGradientHover};
      opacity: 0;
      transition: opacity ${({ theme }) => theme.motion.fast};
    }
    & > * { position: relative; z-index: 1; }
    &:hover { transform: translateY(-1px); box-shadow: 0 16px 40px rgba(27, 122, 110, 0.36); }
    &:hover::after { opacity: 1; }
    &:active { transform: translateY(0); }
  `,
  secondary: css`
    background: ${({ theme }) => theme.color.surface};
    color: ${({ theme }) => theme.color.ink};
    border: 1px solid ${({ theme }) => theme.color.borderStrong};
    &:hover { background: ${({ theme }) => theme.color.surfaceAlt}; }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.color.ink};
    border: 1px solid transparent;
    &:hover { background: ${({ theme }) => theme.color.surfaceAlt}; }
  `,
  ghostInverse: css`
    background: transparent;
    color: rgba(250, 250, 247, 0.85);
    border: 1px solid rgba(250, 250, 247, 0.18);
    &:hover { background: rgba(250, 250, 247, 0.08); color: #FAFAF7; }
  `,
};

const sizes = {
  sm: css`
    height: 36px;
    padding: 0 14px;
    font-size: 13.5px;
    border-radius: ${({ theme }) => theme.size.radius.sm};
  `,
  md: css`
    height: 44px;
    padding: 0 18px;
    font-size: 14.5px;
    border-radius: ${({ theme }) => theme.size.radius.md};
  `,
  lg: css`
    height: 52px;
    padding: 0 24px;
    font-size: 15.5px;
    border-radius: ${({ theme }) => theme.size.radius.md};
  `,
};

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;
  letter-spacing: -0.005em;
  white-space: nowrap;
  transition: transform ${({ theme }) => theme.motion.fast},
              background ${({ theme }) => theme.motion.fast},
              box-shadow ${({ theme }) => theme.motion.fast},
              color ${({ theme }) => theme.motion.fast};
  cursor: pointer;
  ${({ $variant = 'primary' }) => variants[$variant]}
  ${({ $size = 'md' }) => sizes[$size]}
  ${({ $full }) => $full && 'width: 100%;'}

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export default Button;
