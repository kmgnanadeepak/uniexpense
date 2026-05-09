import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("fintrack_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("fintrack_token"));
  const [authLoading, setAuthLoading] = useState(Boolean(localStorage.getItem("fintrack_token")));

  const login = async ({ username, password }) => {
    const data = await authService.login({ username, password });
    const nextUser = { username: data.username, email: data.email, currency: data.currency };
    const nextToken = data.token;
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("fintrack_user", JSON.stringify(nextUser));
    localStorage.setItem("fintrack_token", nextToken);
    return nextUser;
  };

  const signup = async ({ username, password, email, currency }) => {
    const data = await authService.signup({ username, password, email, currency });
    const nextUser = { username: data.username, email: data.email, currency: data.currency };
    const nextToken = data.token;
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("fintrack_user", JSON.stringify(nextUser));
    localStorage.setItem("fintrack_token", nextToken);
    return nextUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("fintrack_user");
    localStorage.removeItem("fintrack_token");
  };

  useEffect(() => {
    const bootstrapAuth = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const profile = await authService.profile();
        const nextUser = {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          currency: profile.currency
        };
        setUser(nextUser);
        localStorage.setItem("fintrack_user", JSON.stringify(nextUser));
      } catch {
        logout();
      } finally {
        setAuthLoading(false);
      }
    };
    bootstrapAuth();
  }, [token]);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token && user), authLoading, login, signup, logout }),
    [user, token, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
