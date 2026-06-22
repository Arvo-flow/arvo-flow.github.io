import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'arvo_user_email';
const SESSION_KEY = 'arvo_session';   // varaktig signerad session — överlever 24h-magic-token

// Läs magic-token SYNKRONT vid modulinläsning — innan något useEffect kört.
// TestaFaktura kör window.history.replaceState i sitt useEffect (child-effect
// körs före parent-effect i React), vilket raderar ?magic= ur URL:en innan
// AuthContext useEffect hinner läsa den. Modulnivå-IIFE löser race condition.
const PENDING_MAGIC_TOKEN = (() => {
  try {
    return new URLSearchParams(window.location.search).get('magic') ?? null;
  } catch { return null; }
})();

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch { return null; }
  });
  const [sessionToken, setSessionToken] = useState(() => {
    try { return localStorage.getItem(SESSION_KEY) || null; } catch { return null; }
  });
  // 'idle' | 'validating' | 'ok' | 'error'
  const [magicState, setMagicState] = useState('idle');

  // Hantera ?magic=<token> — validera token som fångades synkront vid modulinläsning
  useEffect(() => {
    const token = PENDING_MAGIC_TOKEN;
    if (!token) return;

    setMagicState('validating');

    fetch('/api/validate-magic', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ token }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data.email) {
          try { localStorage.setItem(STORAGE_KEY, data.email); } catch {}
          setEmail(data.email);
          // Varaktig session — håller kunden inloggad efter att 24h-token gått ut.
          if (data.session) {
            try { localStorage.setItem(SESSION_KEY, data.session); } catch {}
            setSessionToken(data.session);
          }
          setMagicState('ok');
        } else {
          setMagicState('error');
        }
      })
      .catch((err) => {
        console.error('[auth] validate-magic misslyckades:', err.message);
        setMagicState('error');
      });
  }, []);

  const login = useCallback((e, session) => {
    try { localStorage.setItem(STORAGE_KEY, e); } catch {}
    setEmail(e);
    if (session) { try { localStorage.setItem(SESSION_KEY, session); } catch {} setSessionToken(session); }
  }, []);

  const logout = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(SESSION_KEY); } catch {}
    setEmail(null);
    setSessionToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ email, sessionToken, login, logout, magicState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
