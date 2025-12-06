/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

// Context tidak di-export langsung, cukup lewat hook/useAuth
const AuthContext = createContext(null);

// Hook helper biar gampang dipakai di komponen lain
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Inisialisasi user langsung dari localStorage (tanpa useEffect)
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;

    const stored = window.localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
    setUser(userData);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
