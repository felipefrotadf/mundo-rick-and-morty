// IA-ASSISTED: Utilizei o Inner AI para auxiliar na criação do AuthContext.
// Entendi como funciona o createContext, useContext e o fluxo de autenticação
// simulada com localStorage. A lógica de proteção de rotas ficou clara para mim.
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  function login(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function register(userData) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === userData.email);
    if (exists) throw new Error("Email já cadastrado");
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
