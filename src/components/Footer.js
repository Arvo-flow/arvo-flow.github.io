import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Wrap = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  padding: 64px 28px 48px;
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 48px;
  @media (max-width: 860px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  p {
    margin-top: 14px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.muted};
    max-width: 320px;
  }
`;

const Col = styled.div`
  h4 {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.muted};
    margin-bottom: 14px;
  }
  ul li { margin-bottom: 10px; }
  a {
    font-size: 14px;
    color: ${({ theme }) => theme.color.inkSoft};
    transition: color ${({ theme }) => theme.motion.fast};
    &:hover { color: ${({ theme }) => theme.color.ink}; }
  }
`;

const Bottom = styled.div`
  max-width: ${({ theme }) => theme.size.container};
  margin: 56px auto 0;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.color.muted};
  @media (max-width: 520px) { flex-direction: column; gap: 10px; }
`;

const Footer = () => (
  <Wrap>
    <Inner>
      <Brand>
        <Logo />
        <p>AI-inköpschefen för svenska småföretag. Vi hittar pengarna du blöder på leverantörsavtal — du betalar bara när du sparar.</p>
      </Brand>
      <Col>
        <h4>Produkt</h4>
        <ul>
          <li><a href="#hur">Så fungerar det</a></li>
          <li><a href="#priser">Pris</a></li>
          <li><a href="#integrationer">Integrationer</a></li>
          <li><a href="#sakerhet">Säkerhet</a></li>
        </ul>
      </Col>
      <Col>
        <h4>Företag</h4>
        <ul>
          <li><a href="#om">Om oss</a></li>
          <li><a href="#partners">Partners</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
          <li><a href="#blog">Blog</a></li>
        </ul>
      </Col>
      <Col>
        <h4>Juridik</h4>
        <ul>
          <li><a href="#villkor">Villkor</a></li>
          <li><a href="#integritet">Integritet (GDPR)</a></li>
          <li><a href="#cookies">Cookies</a></li>
          <li><a href="#bias">Rankningspolicy</a></li>
        </ul>
      </Col>
    </Inner>
    <Bottom>
      <span>© 2026 Arvo Flow AB · Org.nr 559500-0000</span>
      <span>Stockholm · Made with care in Sweden</span>
    </Bottom>
  </Wrap>
);

export default Footer;
