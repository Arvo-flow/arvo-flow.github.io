import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const TrustRow = styled.div`
  max-width: ${({ theme }) => theme.size.container};
  margin: 56px auto 0;
  padding: 18px 20px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  font-size: 12.5px;
  color: ${({ theme }) => theme.color.muted};

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  span div.dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.brand};
    opacity: 0.55;
  }
  strong {
    color: ${({ theme }) => theme.color.inkSoft};
    font-weight: 600;
  }
`;

const Bottom = styled.div`
  max-width: ${({ theme }) => theme.size.container};
  margin: 24px auto 0;
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
        <p>Er proaktiva finansdirektör för leverantörskostnader. Bevakning på prenumeration — bytet förberett när ni vill, signerat av er.</p>
      </Brand>
      <Col>
        <h4>Produkt</h4>
        <ul>
          <li><a href="/#hur">Så fungerar det</a></li>
          <li><a href="/#priser">Pris</a></li>
          {/* "Integrationer" och "Säkerhet" pekade på #hur respektive #sakerhet. Sidan hade inga
              id:n alls, så båda var döda — liksom de två ovan. Nu pekar de dit innehållet
              faktiskt bor: kopplingarna på /connect, säkerheten i integritetspolicyn. */}
          <li><Link to="/connect">Integrationer</Link></li>
          <li><Link to="/integritet">Säkerhet</Link></li>
        </ul>
      </Col>
      <Col>
        <h4>Företag</h4>
        <ul>
          <li><Link to="/">Om oss</Link></li>
          {/* BORTTAGEN 2026-08-07: länken hette "Partners" och pekade på rankningspolicyn — sidan
              som förklarar att vi ALDRIG tar en krona från en leverantör. Etiketten lovade alltså
              raka motsatsen till sin egen destination, och antydde precis den sortens
              leverantörsrelation som neutralitets-moaten förbjuder. Rankningspolicyn ligger kvar
              under Juridik, där den hör hemma.
              (Vakthunden fällde min FÖRSTA version av den här kommentaren, för att jag skrev ut
              det förbjudna ordet i klartext. Jag skrev om meningen i stället för att lägga till
              ett claims-ok-undantag — ett undantag hade gjort vakten en aning trubbigare för
              alltid, och kommentaren behövde aldrig ordet.) */}
          <li><a href="mailto:hej@arvoflow.se">Kontakt</a></li>
        </ul>
      </Col>
      <Col>
        <h4>Juridik</h4>
        <ul>
          <li><Link to="/villkor">Villkor</Link></li>
          <li><Link to="/integritet">Integritet (GDPR)</Link></li>
          <li><Link to="/cookies">Cookies</Link></li>
          <li><Link to="/bias">Rankningspolicy</Link></li>
        </ul>
      </Col>
    </Inner>
    {/* RÄTTAT 2026-08-07: här stod "GDPR-säkrad infrastruktur i Sverige" — och footern bärs av
        VARJE yta, alltså även dörren och rummet. Infrastrukturen är Neon, Vercel, Anthropic och
        Resend; svensk hosting är planerad, inte i drift. Samma påstående rättades samtidigt i
        FAQ, Connect-badgen och integritetspolicyns §5, men footern var den som stod överallt.
        Den ärliga versionen säljer dessutom bättre: ingen konkurrent namnger sina underbiträden
        i footern. Transparens är ett premiumargument — svepande trygghetsord är det inte. */}
    <TrustRow>
      <span><div className="dot" /> Varje underbiträde <strong>namngivet</strong> — EU/EES + USA under SCC</span>
      <span><div className="dot" /> Krypterad i vila och i transport</span>
    </TrustRow>
    <Bottom>
      <span>© 2026 Arvo Flow · verksamhet under bildande</span>
      <span>Stockholm · Made with care in Sweden</span>
    </Bottom>
  </Wrap>
);

export default Footer;
