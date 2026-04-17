import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(localStorage.getItem("username") || null);

  const login = (username, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUser(username);
    navigate("/contacts");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login"); // 🔥 THIS IS THE KEY
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
