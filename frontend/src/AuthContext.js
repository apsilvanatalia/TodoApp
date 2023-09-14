import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifique se há um token salvo no localStorage
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Faça uma chamada ao backend para verificar o token e obter os dados do usuário
      axios.get("http://localhost:3333/auth/userCheck", {
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
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    // Salve o token no localStorage
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // Remova o token do localStorage
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return !!token; // Verifica se há um token válido
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);