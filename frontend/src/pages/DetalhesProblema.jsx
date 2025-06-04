import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function DetalhesProblema() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [problema, setProblema] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/problemas/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar problema');
        return res.json();
      })
      .then(setProblema)
      .catch(() => alert('Erro ao carregar problema'));
  }, [id, token]);

  if (!problema) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{problema.titulo}</h2>
      <p>{problema.descricao}</p>
      <button onClick={() => navigate('/problemas')}>Voltar para lista</button>
    </div>
  );
}
