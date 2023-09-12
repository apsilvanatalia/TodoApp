import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css"; //Importa seu arquivo CSS para estilização

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); //Estado para mensagem de erro

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3333/auth/login", {
        email,
        password,
      });

      console.log(response.data); //Mensagem de sucesso de login

      // Navegue até o painel após login bem-sucedido
      navigate("/tasks");
    } catch (error) {
      setErrorMessage(error.response.data.msg); // Define mensagem de erro do backend
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3333/auth/register", {
        name,
        email,
        password,
        confirmpassword: confirmPassword,
      });

      console.log(response.data); //Mensagem de sucesso de registro

      // Navegue até a página de login após o registro bem-sucedido
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response.data.msg); // Define mensagem de erro do backend
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm); // Alterna entre os formulários de login e registro
    setErrorMessage(""); // Limpa mensagem de erro ao alternar
  };

  return (
    <div className="login-container">
      {isLoginForm ? (
        <div className="login-section">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p className="error-message">{errorMessage}</p>
           <p>Ainda não tem uma conta? <span className="register-link" onClick={toggleForm}>Criar uma conta </span>
          </p>
        </div>
      ) : (
        <div className="register-section">
          <h1>Crie sua conta</h1>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Criar conta!</button>
          <p className="error-message">{errorMessage}</p>
          
            <p>Já tem uma conta?  <span className="register-link" onClick={toggleForm}>Fazer login
          </span></p>
        </div>
      )}
    </div>
  );
};

export default Login;