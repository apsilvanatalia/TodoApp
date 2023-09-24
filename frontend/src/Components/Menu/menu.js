import React from 'react';
import { Link } from 'react-router-dom';

import {AiOutlineAreaChart, AiOutlineLogout} from "react-icons/ai";

import './menu.css';

const Menu = ({ userName, onLogout }) => {
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

export default Menu;