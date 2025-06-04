import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function NovoProblema() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      titulo,
      descricao,
      usuario: user.id, // ajuste conforme seu backend
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/problemas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Problema criado com sucesso!');
        navigate('/problemas'); // volta para lista
      } else {
        const errorData = await response.json();
        alert('Erro: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor');
    }
  };

  return (
    <div>
      <h2>Criar Novo Problema</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}
