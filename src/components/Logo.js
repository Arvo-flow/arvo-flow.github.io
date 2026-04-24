import React from 'react';
import styled from 'styled-components';

const Wrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 600;
  font-size: 22px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.color.ink};
`;

const Mark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.brand};
  color: #FAFAF7;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 0;
  line-height: 1;
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const Name = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
`;

const Suffix = styled.em`
  font-style: italic;
  font-weight: 400;
  color: ${({ theme }) => theme.color.muted};
`;

const Logo = ({ showName = true }) => (
  <Wrap>
    <Mark>A</Mark>
    {showName && (
      <Name>
        Arvo <Suffix>Flow</Suffix>
      </Name>
    )}
  </Wrap>
);

export default Logo;
