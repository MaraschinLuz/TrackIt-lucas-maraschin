import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Problemas() {
  const { token } = useContext(AuthContext);
  const [problemas, setProblemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/problemas/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar problemas');
        return res.json();
      })
      .then((data) => {
        setProblemas(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Erro ao carregar problemas');
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Carregando problemas...</p>;

  return (
    <div>
      <h1>Lista de Problemas</h1>
      <Link to="/problemas/novo">+ Novo Problema</Link>
      <ul>
        {problemas.length === 0 && <li>Nenhum problema cadastrado.</li>}
        {problemas.map((problema) => (
          <li key={problema.id}>
            <Link to={`/problemas/${problema.id}`}>
              {problema.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
