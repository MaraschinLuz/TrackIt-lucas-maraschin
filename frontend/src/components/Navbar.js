import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/problemas">Problemas</Link> | 
      {user && (
        <>
          <span>Olá, {user.username}</span>
          <button onClick={handleLogout}>Sair</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
