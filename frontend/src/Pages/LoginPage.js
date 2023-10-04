import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from "../Services/api";
import { useUser } from '../Components/UserContext/userContext';

import './login.css';

const Login = () => {
  const { setUserId } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });
      const { token, userId } = response.data;

      // Armazene o token e o userId no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Define o userId no contexto
      setUserId(userId);

      // Navegue até o painel após o login bem-sucedido
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };

  const handleRegister = async () => {
    try {
      // Verifique se a senha e a confirmação de senha correspondem
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não coincidem.');
        return;
      }

      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        confirmpassword: confirmPassword, // Envie como "confirmpassword"
      });

      console.log(response.data); // Mensagem de sucesso de registro

      // Limpe os campos após o registro bem-sucedido
      clearFields();

      // Alterne para o modo de login após o registro bem-sucedido
      setIsLoginForm(true);

      // Limpe a mensagem de erro
      setErrorMessage('');

      // Navegue até a página de login após o registro bem-sucedido
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.msg);
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setErrorMessage('');
  };

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
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
          <p>
            Ainda não tem uma conta?{' '}
            <span className="register-link" onClick={toggleForm}>
              Criar uma conta
            </span>
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
          <p>
            Já tem uma conta?{' '}
            <span className="register-link" onClick={toggleForm}>
              Fazer login
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;