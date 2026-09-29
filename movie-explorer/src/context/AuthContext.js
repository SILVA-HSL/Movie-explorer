import React, { createContext, useContext, useState } from "react";
import { loadJSON, saveJSON } from "../utils/storage";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON("me_user", null));

  const login = (username, password) => {
    if (username.trim().length < 3) {
      return { ok: false, message: "Username must be at least 3 characters." };
    }
    if (password.length < 6) {
      return { ok: false, message: "Password must be at least 6 characters." };
    }
    const newUser = { username: username.trim() };
    setUser(newUser);
    saveJSON("me_user", newUser);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("me_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
