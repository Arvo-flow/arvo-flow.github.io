import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';

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
  white-space: nowrap;
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

const FoundingBtn = styled.span`
  @media (max-width: 600px) { display: none; }
`;

const CtaText = styled.span`
  .short { display: none; }
  @media (max-width: 480px) {
    .full  { display: none; }
    .short { display: inline; }
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(14, 26, 23, 0.48);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Modal = styled.div`
  background: #FAFAF7;
  border-radius: 16px;
  padding: 40px 36px 36px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 24px 80px rgba(14, 26, 23, 0.18);
  position: relative;
  @media (max-width: 480px) {
    padding: 32px 24px 28px;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.color.muted};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  &:hover { background: ${({ theme }) => theme.color.surfaceAlt}; color: ${({ theme }) => theme.color.ink}; }
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
  letter-spacing: -0.02em;
  margin: 0 0 8px;
`;

const ModalSub = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.muted};
  margin: 0 0 28px;
  line-height: 1.5;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.inkSoft ?? theme.color.ink};
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1.5px solid ${({ theme, $error }) => $error ? '#D94F3C' : theme.color.border};
  border-radius: ${({ theme }) => theme.size.radius.md};
  font-size: 14.5px;
  color: ${({ theme }) => theme.color.ink};
  background: #fff;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
  &:focus { border-color: ${({ theme }) => theme.color.brand}; }
  &::placeholder { color: ${({ theme }) => theme.color.muted}; }
`;

const FieldError = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #D94F3C;
`;

const ModalSuccess = styled.div`
  text-align: center;
  padding: 12px 0 4px;
`;

const SuccessIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.brandSoft ?? '#DCEEEA'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 26px;
`;

const SuccessTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.ink};
  margin: 0 0 8px;
  letter-spacing: -0.01em;
`;

const SuccessBody = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.muted};
  margin: 0;
  line-height: 1.55;
`;

const AuthChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthAvatar = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.brand};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0;
`;

const MagicToast = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: 14px 24px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  box-shadow: 0 8px 32px rgba(0,0,0,.18);
  background: ${({ $error, theme }) => $error
    ? '#D94F3C'
    : 'linear-gradient(135deg,#5DD6CA 0%,#1B6E66 100%)'};
  pointer-events: none;
`;

const EMPTY = { company: '', name: '', email: '' };
const EMPTY_AUTH = { email: '' };

const Nav = ({ variant = 'public' }) => {
  const { pathname } = useLocation();
  const { email: authEmail, logout, magicState } = useAuth();
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (magicState === 'ok' || magicState === 'error') {
      setToastVisible(true);
      const t = setTimeout(() => setToastVisible(false), 4000);
      return () => clearTimeout(t);
    }
  }, [magicState]);
  const [modalOpen, setModalOpen]   = useState(false);
  const [authModal, setAuthModal]   = useState(false);
  const [authForm, setAuthForm]     = useState(EMPTY_AUTH);
  const [authState, setAuthState]   = useState('idle'); // idle | submitting | sent | error
  const [form, setForm]             = useState(EMPTY);
  const [errors, setErrors]         = useState({});
  const [submitState, setSubmitState] = useState('idle');
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (modalOpen && firstInputRef.current) firstInputRef.current.focus();
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const openModal = () => {
    setForm(EMPTY);
    setErrors({});
    setSubmitState('idle');
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const validate = () => {
    const e = {};
    if (!form.company.trim()) e.company = 'Fyll i företagsnamn.';
    if (!form.name.trim()) e.name = 'Fyll i ditt namn.';
    if (!form.email.trim()) e.email = 'E-post saknas.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'E-postadressen ser inte rätt ut.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/founding-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company:   form.company.trim(),
          name:      form.name.trim(),
          email:     form.email.trim(),
          referrer:  typeof document !== 'undefined' ? document.referrer || null : null,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('API ' + res.status);
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const scrollTo = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const email = authForm.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setAuthState('submitting');
    try {
      await fetch('/api/auth/request-magic-link', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      setAuthState('sent');
    } catch {
      setAuthState('error');
    }
  };

  return (
    <>
      {toastVisible && (
        <MagicToast $error={magicState === 'error'}>
          {magicState === 'ok'
            ? `✓ Inloggad som ${authEmail}`
            : '✕ Länken fungerade inte — begär en ny'}
        </MagicToast>
      )}
      <>
      <Bar>
        <Inner>
          <Link to="/"><Logo /></Link>
          {variant === 'public' && (
            <Links>
              <Item to="/" $active={pathname === '/'}>Hem</Item>
              <Item to="/intelligence" $active={pathname === '/intelligence'}>Arvo Intelligence</Item>
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
            {authEmail ? (
              <AuthChip>
                <AuthAvatar>{authEmail[0].toUpperCase()}</AuthAvatar>
                <Button $variant="ghost" $size="sm" onClick={logout}>Logga ut</Button>
              </AuthChip>
            ) : (
              <Button $variant="ghost" $size="sm" onClick={() => { setAuthForm(EMPTY_AUTH); setAuthState('idle'); setAuthModal(true); }}>
                Logga in
              </Button>
            )}
            {variant === 'public' ? (
              <>
                <FoundingBtn><Button $variant="ghost" $size="sm" onClick={openModal}>Bli Founding Member</Button></FoundingBtn>
                <Button as={Link} to="/testa-faktura" $variant="gradient" $size="sm">
                  <CtaText><span className="full">Se mina besparingar →</span><span className="short">Se besparingar →</span></CtaText>
                </Button>
              </>
            ) : (
              null
            )}
          </Right>
        </Inner>
      </Bar>

      {authModal && (
        <Overlay onClick={(e) => { if (e.target === e.currentTarget) setAuthModal(false); }}>
          <Modal role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
            <ModalClose onClick={() => setAuthModal(false)} aria-label="Stäng">✕</ModalClose>
            {authState === 'sent' ? (
              <ModalSuccess>
                <SuccessIcon>✉</SuccessIcon>
                <SuccessTitle>Kolla inkorgen.</SuccessTitle>
                <SuccessBody>
                  Vi har skickat en inloggningslänk till {authForm.email}.<br />
                  Klicka på länken i mejlet — det tar 10 sekunder.
                </SuccessBody>
              </ModalSuccess>
            ) : (
              <form onSubmit={handleAuthSubmit} noValidate>
                <ModalTitle id="auth-modal-title">Logga in på Arvo Flow</ModalTitle>
                <ModalSub>
                  Ange din e-post — vi skickar en inloggningslänk direkt. Inget lösenord.
                </ModalSub>
                <Field>
                  <FieldLabel htmlFor="auth-email">E-postadress</FieldLabel>
                  <Input
                    id="auth-email"
                    type="email"
                    placeholder="anna@acme.se"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ email: e.target.value })}
                    autoComplete="email"
                    autoFocus
                  />
                </Field>
                {authState === 'error' && (
                  <FieldError style={{ marginBottom: 12 }}>Något gick fel — försök igen.</FieldError>
                )}
                <Button
                  type="submit"
                  $variant="gradient"
                  $size="md"
                  $full
                  disabled={authState === 'submitting'}
                >
                  {authState === 'submitting' ? 'Skickar…' : 'Skicka inloggningslänk →'}
                </Button>
              </form>
            )}
          </Modal>
        </Overlay>
      )}

      {modalOpen && (
        <Overlay onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <Modal role="dialog" aria-modal="true" aria-labelledby="early-access-title">
            <ModalClose onClick={closeModal} aria-label="Stäng">✕</ModalClose>

            {submitState === 'success' ? (
              <ModalSuccess>
                <SuccessIcon>✓</SuccessIcon>
                <SuccessTitle>Er plats är reserverad.</SuccessTitle>
                <SuccessBody>
                  En av grundarna hör av sig inom 48 timmar för att boka er onboarding. Kolla inkorgen — mejlet är på väg.
                </SuccessBody>
              </ModalSuccess>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <ModalTitle id="early-access-title">Bli Founding Member</ModalTitle>
                <ModalSub>
                  Reservera er plats och få personlig onboarding, 6 månader gratis och förtur till Fortnox / Visma-kopplingen när den öppnar.
                </ModalSub>

                <Field>
                  <FieldLabel htmlFor="ea-company">Företag</FieldLabel>
                  <Input
                    id="ea-company"
                    ref={firstInputRef}
                    type="text"
                    placeholder="Acme AB"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    $error={!!errors.company}
                    autoComplete="organization"
                  />
                  {errors.company && <FieldError>{errors.company}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="ea-name">Ditt namn</FieldLabel>
                  <Input
                    id="ea-name"
                    type="text"
                    placeholder="Anna Andersson"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    $error={!!errors.name}
                    autoComplete="name"
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="ea-email">E-post</FieldLabel>
                  <Input
                    id="ea-email"
                    type="email"
                    placeholder="anna@acme.se"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    $error={!!errors.email}
                    autoComplete="email"
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>

                {submitState === 'error' && (
                  <FieldError style={{ marginBottom: 12 }}>Något gick fel — försök igen om en stund.</FieldError>
                )}

                <Button
                  type="submit"
                  $variant="gradient"
                  $size="md"
                  $full
                  disabled={submitState === 'submitting'}
                >
                  {submitState === 'submitting' ? 'Skickar…' : 'Reservera min plats →'}
                </Button>
              </form>
            )}
          </Modal>
        </Overlay>
      )}
    </>
    </>
  );
};

export default Nav;
