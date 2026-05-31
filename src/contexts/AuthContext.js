import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'arvo_user_email';

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch { return null; }
  });

  // Hantera ?magic=<token> i URL — validera och logga in
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get('magic');
    if (!token) return;

    fetch('/api/validate-magic', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.email) {
          try { localStorage.setItem(STORAGE_KEY, data.email); } catch {}
          setEmail(data.email);
        }
        // Ta bort magic-token från URL utan att ladda om sidan
        const url = new URL(window.location.href);
        url.searchParams.delete('magic');
        window.history.replaceState({}, '', url.toString());
      })
      .catch(() => {});
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
    <AuthContext.Provider value={{ email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
