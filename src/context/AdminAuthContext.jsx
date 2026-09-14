import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

const AUTH_STORAGE_KEY = 'mk_admin_session_v1';
const CREDENTIALS_KEY = 'mk_admin_credentials_v1';

// Default credentials as specified in prompt: password "1234arbaj" or "mkadmin123"
const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: '1234arbaj',
  alternatePassword: 'mkadmin123'
};

export function AdminAuthProvider({ children }) {
  const [credentials, setCredentials] = useState(() => {
    try {
      const stored = localStorage.getItem(CREDENTIALS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_CREDENTIALS;
    } catch {
      return DEFAULT_CREDENTIALS;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    } catch (e) {
      console.error(e);
    }
  }, [credentials]);

  const login = (username, password) => {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    const matchesUser = cleanUser === credentials.username.toLowerCase();
    const matchesPass = cleanPass === credentials.password || cleanPass === credentials.alternatePassword;

    if (matchesUser && matchesPass) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const updateCredentials = (newUsername, newPassword) => {
    setCredentials(prev => ({
      ...prev,
      username: newUsername || prev.username,
      password: newPassword || prev.password
    }));
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminLoggedIn,
        isAuthenticated: isAdminLoggedIn,
        login,
        logout,
        credentials,
        updateCredentials
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
