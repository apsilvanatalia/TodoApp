import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa o componente principal da aplicação
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './Components/UserContext/userContext'; // Importa o provedor de contexto de usuário

// Renderiza a aplicação React no elemento com o ID "root" no HTML
ReactDOM.render(
  <React.StrictMode>
    {/* Inclui o UserProvider para fornecer o contexto de usuário para a aplicação */}
    <UserProvider>
      <App /> {/* Renderiza o componente principal da aplicação */}
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root') // Obtém o elemento HTML com o ID "root" para renderização
);

// Se você quiser começar a medir o desempenho de sua aplicação, pode usar a função reportWebVitals para registrar métricas
reportWebVitals();