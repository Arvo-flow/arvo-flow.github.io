import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.z.nav};
  background: rgba(250, 250, 247, 0.82);
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.size.container};
  margin: 0 auto;
  padding: 14px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  @media (max-width: 480px) {
    padding: 12px 16px;
    gap: 12px;
  }
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 6px;
  @media (max-width: 740px) { display: none; }
`;

const Item = styled(Link)`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.size.radius.sm};
  font-size: 14px;
  color: ${({ theme, $active }) => ($active ? theme.color.ink : theme.color.muted)};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  transition: background ${({ theme }) => theme.motion.fast}, color ${({ theme }) => theme.motion.fast};
  background: ${({ theme, $active }) => ($active ? theme.color.surfaceAlt : 'transparent')};
  &:hover { color: ${({ theme }) => theme.color.ink}; background: ${({ theme }) => theme.color.surfaceAlt}; }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LoginLink = styled(Button)`
  @media (max-width: 480px) { display: none; }
`;

const Nav = ({ variant = 'public' }) => {
  const { pathname } = useLocation();

  const scrollTo = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Bar>
      <Inner>
        <Link to="/"><Logo /></Link>
        {variant === 'public' && (
          <Links>
            <Item to="/" $active={pathname === '/'}>Hem</Item>
            <Item to="/#hur" $active={false} onClick={(e) => scrollTo(e, 'hur')}>Så fungerar det</Item>
            <Item to="/#priser" $active={false} onClick={(e) => scrollTo(e, 'priser')}>Pris</Item>
            <Item to="/#faq" $active={false} onClick={(e) => scrollTo(e, 'faq')}>FAQ</Item>
          </Links>
        )}
        {variant === 'app' && (
          <Links>
            <Item to="/insights" $active={pathname === '/insights'}>Insikter</Item>
            <Item to="/insights" $active={false}>Historik</Item>
            <Item to="/insights" $active={false}>Inställningar</Item>
          </Links>
        )}
        <Right>
          {variant === 'public' ? (
            <>
              <LoginLink as={Link} to="/connect" $variant="ghost" $size="sm">Logga in</LoginLink>
              <Button as={Link} to="/connect" $variant="gradient" $size="sm">Se mina besparingar →</Button>
            </>
          ) : (
            <Button as={Link} to="/" $variant="ghost" $size="sm">Logga ut</Button>
          )}
        </Right>
      </Inner>
    </Bar>
  );
};

export default Nav;
