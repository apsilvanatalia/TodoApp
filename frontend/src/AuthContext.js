import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifique se há um token salvo no localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Faça uma chamada ao backend para verificar o token e obter os dados do usuário
      axios.get("/auth/userCheck", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Erro ao verificar token:", error);
      });
    }
  }, []);

  const login = (token, userData) => {
    setUser(userData);

    // Salve o token no localStorage
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);

    // Remova o token do localStorage
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);