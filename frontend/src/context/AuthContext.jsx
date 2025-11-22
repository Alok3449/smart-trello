// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export function useAuth(){ return useContext(AuthContext); }

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id });
      } catch {
        setUser(null);
      }
    } else setUser(null);
  }, [token]);

  const login = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, login, logout, user }}>{children}</AuthContext.Provider>;
}
