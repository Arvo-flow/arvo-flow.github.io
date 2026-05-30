import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

// ─── animations ──────────────────────────────────────────────────────────────
const fadeUp = keyframes`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`;

// ─── styled ──────────────────────────────────────────────────────────────────
const Page    = styled.div`min-height:100vh;background:#0E1A17;color:#fff;font-family:system-ui,sans-serif;padding:32px 24px;`;
const H1      = styled.h1`font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 4px;`;
const Sub     = styled.p`font-size:13px;color:rgba(255,255,255,.45);margin:0 0 28px;`;
const Grid    = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;@media(max-width:700px){grid-template-columns:1fr 1fr;}`;
const StatBox = styled.div`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px 18px;`;
const SLabel  = styled.p`font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:0 0 4px;`;
const SValue  = styled.p`font-size:22px;font-weight:800;color:#5DD6CA;margin:0;letter-spacing:-.02em;`;
const Section = styled.div`margin-bottom:28px;animation:${fadeUp} .4s ease both;`;
const STitle  = styled.h2`font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 10px;`;
const Table   = styled.div`background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;`;
const THead   = styled.div`display:grid;grid-template-columns:${({$cols})=>$cols};padding:10px 16px;background:rgba(255,255,255,.06);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);gap:12px;`;
const TRow    = styled.div`display:grid;grid-template-columns:${({$cols})=>$cols};padding:11px 16px;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;gap:12px;align-items:center;&:hover{background:rgba(255,255,255,.03);}`;
const Tag     = styled.span`display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600;background:${({$c})=>$c??'rgba(255,255,255,.1)'};color:#fff;`;
const MagicForm = styled.form`display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;`;
const Input   = styled.input`padding:10px 14px;border-radius:100px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;flex:1;min-width:200px;outline:none;&::placeholder{color:rgba(255,255,255,.3);}`;
const Btn     = styled.button`padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-size:13px;font-weight:700;background:linear-gradient(135deg,#5DD6CA,#1B6E66);color:#fff;white-space:nowrap;&:disabled{opacity:.5;cursor:not-allowed;}`;
const LinkBox = styled.div`margin-top:8px;background:rgba(93,214,202,.1);border:1px solid rgba(93,214,202,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#5DD6CA;word-break:break-all;`;
const LoginWrap = styled.div`max-width:360px;margin:80px auto;text-align:center;`;
const EmptyRow  = styled.p`padding:20px 16px;font-size:13px;color:rgba(255,255,255,.3);margin:0;`;

function fmtDate(iso) {
  if (!iso) return '–';
  return new Date(iso).toLocaleDateString('sv-SE', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
}

function fmtNum(n) {
  if (n == null) return '–';
  return Math.round(n).toLocaleString('sv-SE');
}

// ─── component ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [adminToken, setAdminToken]       = useState(() => sessionStorage.getItem('arvo_admin_token') ?? '');
  const [tokenInput, setTokenInput]       = useState('');
  const [authed, setAuthed]               = useState(false);
  const [data, setData]                   = useState(null);
  const [loadError, setLoadError]         = useState('');
  const [magicEmail, setMagicEmail]       = useState('');
  const [magicNote, setMagicNote]         = useState('');
  const [magicHours, setMagicHours]       = useState('72');
  const [magicLink, setMagicLink]         = useState('');
  const [magicState, setMagicState]       = useState('idle'); // idle | loading | done | error
  const [activeTab, setActiveTab]         = useState('queue'); // queue | waitlist | feedback

  const load = useCallback(async (token) => {
    setLoadError('');
    try {
      const res  = await fetch('/api/admin/dashboard', { headers: { 'x-admin-token': token } });
      const json = await res.json();
      if (!res.ok) { setLoadError(json.error ?? 'Ej behörig'); return; }
      setData(json);
      setAuthed(true);
      sessionStorage.setItem('arvo_admin_token', token);
    } catch {
      setLoadError('Nätverksfel');
    }
  }, []);

  useEffect(() => {
    if (adminToken) load(adminToken);
  }, [adminToken, load]);

  async function login(e) {
    e.preventDefault();
    setAdminToken(tokenInput);
  }

  async function generateMagicLink(e) {
    e.preventDefault();
    if (!magicEmail) return;
    setMagicState('loading');
    setMagicLink('');
    try {
      const res  = await fetch('/api/admin/magic-link', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body:    JSON.stringify({ email: magicEmail, note: magicNote || undefined, expiresInHours: Number(magicHours) }),
      });
      const json = await res.json();
      if (!res.ok) { setMagicState('error'); return; }
      setMagicLink(json.link);
      setMagicState('done');
    } catch {
      setMagicState('error');
    }
  }

  if (!authed) {
    return (
      <Page>
        <LoginWrap>
          <H1>Arvo Admin</H1>
          <Sub>Ange ADMIN_TOKEN för att fortsätta</Sub>
          {loadError && <p style={{ color: '#EF4444', fontSize: 13, marginBottom: 12 }}>{loadError}</p>}
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input
              type="password"
              placeholder="Admin-token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={{ borderRadius: 10, textAlign: 'center' }}
            />
            <Btn type="submit" disabled={!tokenInput}>Logga in →</Btn>
          </form>
        </LoginWrap>
      </Page>
    );
  }

  const s = data?.stats ?? {};

  const QUEUE_COLS  = '2fr 1.5fr 1fr 1fr 1fr 1.2fr';
  const WAIT_COLS   = '2fr 1.5fr 1.5fr 1.5fr';
  const FB_COLS     = '2fr 1.5fr 0.5fr 2fr 1.5fr';

  return (
    <Page>
      <H1>Arvo Admin</H1>
      <Sub>Live-data från Neon Postgres · senast laddad {new Date().toLocaleTimeString('sv-SE')}</Sub>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <Grid>
        <StatBox><SLabel>Totalt analyserade</SLabel><SValue>{fmtNum(s.total_analyses)}</SValue></StatBox>
        <StatBox><SLabel>Auto (klara)</SLabel><SValue>{fmtNum(s.auto_count)}</SValue></StatBox>
        <StatBox><SLabel>Review queue</SLabel><SValue style={{ color: '#F59E0B' }}>{fmtNum(s.review_count)}</SValue></StatBox>
        <StatBox><SLabel>Unika användare</SLabel><SValue>{fmtNum(s.unique_users)}</SValue></StatBox>
        <StatBox><SLabel>Byten rekommenderade</SLabel><SValue>{fmtNum(s.switch_recommended)}</SValue></StatBox>
        <StatBox><SLabel>Snitt nettobesparing</SLabel><SValue>{fmtNum(s.avg_net_saving)} kr</SValue></StatBox>
        <StatBox><SLabel>Waitlist</SLabel><SValue>{data?.waitlist?.length ?? '–'}</SValue></StatBox>
        <StatBox><SLabel>Feedback</SLabel><SValue>{data?.feedback?.length ?? '–'}</SValue></StatBox>
      </Grid>

      {/* ── Magic link-generator ───────────────────────────────── */}
      <Section>
        <STitle>Generera demo-länk (Magic Link)</STitle>
        <Table>
          <div style={{ padding: '16px 18px' }}>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
              Skickar en tidsbegränsad länk som ger direktåtkomst utan gate.
            </p>
            <MagicForm onSubmit={generateMagicLink}>
              <Input type="email" placeholder="mottagare@foretag.se" value={magicEmail}
                onChange={(e) => setMagicEmail(e.target.value)} required />
              <Input placeholder="Notering (frivillig)" value={magicNote}
                onChange={(e) => setMagicNote(e.target.value)} style={{ maxWidth: 200 }} />
              <Input type="number" placeholder="Timmar (default 72)" value={magicHours}
                onChange={(e) => setMagicHours(e.target.value)} style={{ maxWidth: 140 }} />
              <Btn type="submit" disabled={!magicEmail || magicState === 'loading'}>
                {magicState === 'loading' ? 'Genererar…' : 'Skicka magic link →'}
              </Btn>
            </MagicForm>
            {magicLink && (
              <LinkBox>
                ✓ Länk skickad till {magicEmail}<br />
                <strong>{magicLink}</strong>
              </LinkBox>
            )}
            {magicState === 'error' && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 8 }}>Misslyckades — kontrollera ADMIN_TOKEN och RESEND_API_KEY.</p>}
          </div>
        </Table>
      </Section>

      {/* ── Tabs ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {[['queue','Review Queue'], ['waitlist','Waitlist'], ['feedback','Feedback']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding: '7px 16px', borderRadius: 100, border: 'none', cursor: 'pointer',
            fontSize: 12.5, fontWeight: 600,
            background: activeTab === id ? '#5DD6CA' : 'rgba(255,255,255,.08)',
            color: activeTab === id ? '#0E1A17' : 'rgba(255,255,255,.6)',
          }}>{label}</button>
        ))}
      </div>

      {activeTab === 'queue' && (
        <Section>
          <Table>
            <THead $cols={QUEUE_COLS}>
              <span>Leverantör</span><span>Kategori</span><span>Årskkostnad</span>
              <span>Bransch</span><span>Anställda</span><span>Datum</span>
            </THead>
            {(data?.reviewQueue ?? []).length === 0 && <EmptyRow>Inga review_queue-fakturor ännu.</EmptyRow>}
            {(data?.reviewQueue ?? []).map((r) => (
              <TRow key={r.id} $cols={QUEUE_COLS}>
                <span style={{ fontWeight: 600 }}>{r.supplier || r.normalized_supplier || '–'}</span>
                <Tag $c="rgba(93,214,202,.15)">{r.category}</Tag>
                <span>{fmtNum(r.annual_cost)} kr</span>
                <span style={{ color: 'rgba(255,255,255,.5)' }}>{r.industry}</span>
                <span style={{ color: 'rgba(255,255,255,.5)' }}>{r.employees}</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(r.created_at)}</span>
              </TRow>
            ))}
          </Table>
        </Section>
      )}

      {activeTab === 'waitlist' && (
        <Section>
          <Table>
            <THead $cols={WAIT_COLS}><span>E-post</span><span>Källa</span><span>Reason</span><span>Datum</span></THead>
            {(data?.waitlist ?? []).length === 0 && <EmptyRow>Ingen waitlist ännu.</EmptyRow>}
            {(data?.waitlist ?? []).map((w) => (
              <TRow key={w.id} $cols={WAIT_COLS}>
                <span style={{ fontWeight: 600 }}>{w.email}</span>
                <Tag $c="rgba(245,158,11,.15)">{w.source}</Tag>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 11.5 }}>{w.reason ?? '–'}</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(w.created_at)}</span>
              </TRow>
            ))}
          </Table>
        </Section>
      )}

      {activeTab === 'feedback' && (
        <Section>
          <Table>
            <THead $cols={FB_COLS}><span>Leverantör</span><span>Kategori</span><span>Röst</span><span>Kommentar</span><span>Datum</span></THead>
            {(data?.feedback ?? []).length === 0 && <EmptyRow>Ingen feedback ännu.</EmptyRow>}
            {(data?.feedback ?? []).map((f) => (
              <TRow key={f.id} $cols={FB_COLS}>
                <span style={{ fontWeight: 600 }}>{f.supplier || '–'}</span>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 11.5 }}>{f.category ?? '–'}</span>
                <span style={{ fontSize: 18 }}>{f.vote === 'up' ? '👍' : '👎'}</span>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 11.5 }}>{f.comment ?? '–'}</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(f.created_at)}</span>
              </TRow>
            ))}
          </Table>
        </Section>
      )}
    </Page>
  );
}
