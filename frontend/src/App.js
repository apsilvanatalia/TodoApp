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
        {/*<Route path="/login" element={<Login />} />
        <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to = "/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />*/}
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dashboard" element={<Dashboard /> } />
      </Routes>
    </Router>
  );
}

export default App;
