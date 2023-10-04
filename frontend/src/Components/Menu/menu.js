import React from 'react';
import { NavLink } from 'react-router-dom'; // Importe NavLink em vez de Link

import { AiOutlineAreaChart, AiOutlineLogout } from 'react-icons/ai';

import './menu.css';

const Menu = ({ userName, onLogout }) => {
  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    // Recarrega a página para efetuar o logout completamente
    window.location.reload();

    // Chame a função onLogout se necessário (pode ser usada para limpar o estado de autenticação)
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active" className="nav-link">
            <AiOutlineAreaChart className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" activeClassName="active" className="nav-link">
            <AiOutlineAreaChart className="nav-icon" />
            <span className="nav-text">Tarefas</span>
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="nav-link">
            <AiOutlineLogout className="nav-icon" />
            <span className="nav-text">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;

/*const Menu = ({ userName, onLogout }) => {
  const handleLogout = () => {
    // Adicione esta linha para recarregar a página
    window.location.reload();
    
    // Chame a função onLogout se necessário
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  return (
    <menu>
        <ul>
          <li>
            <Link to="/dashboard">
              <span><AiOutlineAreaChart size='30px'/></span>
            </Link>
          </li>
          <li>
            
            <button onClick={handleLogout}>
                <span><AiOutlineLogout size='30px'/></span>
            </button>
            
          </li>
        </ul>
      </menu>
  )
}

export default Menu;*/