import React from 'react';
import styled from 'styled-components';

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.color.ink};
`;

const Mark = styled.svg`
  width: ${({ $size }) => $size || 30}px;
  height: ${({ $size }) => $size || 30}px;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(14, 26, 23, 0.10));
`;

const Name = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  line-height: 1;
`;

const Suffix = styled.em`
  font-style: italic;
  font-weight: 400;
  color: ${({ theme }) => theme.color.muted};
`;

const Logo = ({ showName = true, showSuffix = true, size }) => (
  <Wrap>
    <Mark $size={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="arvoMarkGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5DD6CA" />
          <stop offset="100%" stopColor="#1B6E66" />
        </linearGradient>
      </defs>
      <path
        fill="url(#arvoMarkGradient)"
        fillRule="evenodd"
        d="M20 3 L37 36 L27.5 36 L20 21.5 L12.5 36 L3 36 Z M20 12.5 L24 21 L16 21 Z"
      />
    </Mark>
    {showName && (
      <Name>
        Arvo {showSuffix && <Suffix>Flow</Suffix>}
      </Name>
    )}
  </Wrap>
);

export default Logo;
