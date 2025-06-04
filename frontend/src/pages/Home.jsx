import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Bem-vindo(a), {user?.username}!</h1>
      <p>Este é o painel inicial do sistema de chamados.</p>

      <div style={styles.buttons}>
        <button onClick={() => navigate('/problemas')}>Visualizar Problemas</button>
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 20,
    display: 'flex',
    gap: 10,
    justifyContent: 'center'
  }
};

export default Home;
