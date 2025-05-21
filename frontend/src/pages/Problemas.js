import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';

const Problemas = () => {
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    api.get('problemas/')
      .then(res => setProblemas(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Lista de Problemas</h2>
      <ul>
        {problemas.map(p => (
          <li key={p.id}>{p.titulo} - {p.status.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default Problemas;
