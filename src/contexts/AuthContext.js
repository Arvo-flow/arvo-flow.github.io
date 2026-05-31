import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'arvo_user_email';

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

  const login = useCallback((e) => {
    try { localStorage.setItem(STORAGE_KEY, e); } catch {}
    setEmail(e);
  }, []);

  const logout = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setEmail(null);
  }, []);

  return (
    <AuthContext.Provider value={{ email, login, logout, magicState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
