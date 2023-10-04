import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Pages/LoginPage";
import Tasks from "./Pages/TasksPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Verifique se há um token salvo no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Atualize o estado para autenticado
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rota padrão redireciona para a página de login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* Rota para a página de login */}
        <Route path="/login" element={<Login />} />
        {/* Rota para a página de tarefas, acessível apenas se autenticado */}
        <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />}/>
        {/* Rota para a página de painel, acessível apenas se autenticado */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}/>
      </Routes>
    </Router>
  );
}

export default App;
