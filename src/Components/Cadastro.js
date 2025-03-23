import React, { useState, useEffect } from 'react';

const Cadastro = () => {
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState(
    JSON.parse(localStorage.getItem('tarefas')) || []
  );
  const [nomeUsuario, setNomeUsuario] = useState(localStorage.getItem('nomeUsuario') || '');
  const [cor, setCor] = useState(localStorage.getItem('corFundo') || 'white');

  useEffect(() => {
    if (!nomeUsuario) {
      const nome = prompt('Qual é o seu nome?');
      if (nome) {
        setNomeUsuario(nome);
        localStorage.setItem('nomeUsuario', nome);
      }
    }
  }, [nomeUsuario]);

  useEffect(() => {
    if (cor === 'white' || cor === 'lightgray' || cor === 'lightblue') {
      document.body.style.color = 'black';
    } else if (cor === 'black') {
      document.body.style.color = 'white';
    }
    document.body.style.backgroundColor = cor;
  }, [cor]);

  const handleRegistro = (e) => {
    e.preventDefault();
    if (input.trim() === '') return; 
    const novasTarefas = [...tarefas, input];
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    setInput('');
  };

  const handleCorChange = (e) => {
    const novaCor = e.target.value;
    setCor(novaCor);
    localStorage.setItem('corFundo', novaCor); 
  };

  return (
    <div>
      <h2>{nomeUsuario}, sua lista de tarefas</h2>
      <form onSubmit={handleRegistro}>
        <label>Nome da tarefa:</label><br />
        <input
          type="text"
          name="tarefa"
          placeholder="Digite o nome da tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        /><br />
        <button type="submit">Registrar</button>
      </form>
      <br /><br />
      
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index}>{tarefa}</li>
        ))}
      </ul>

      <div>
        <h3>Escolha uma cor para o fundo da página:</h3>
        <label>
          <input
            type="radio"
            value="black"
            checked={cor === 'black'}
            onChange={handleCorChange}
            style={{ color: 'white' }}
          />
          Preto
        </label>
        <label>
          <input
            type="radio"
            value="lightgray"
            checked={cor === 'lightgray'}
            onChange={handleCorChange}
          />
          Ciano
        </label>
        <label>
          <input
            type="radio"
            value="lightblue"
            checked={cor === 'lightblue'}
            onChange={handleCorChange}
          />
          Azul Claro
        </label>
        <label>
          <input
            type="radio"
            value="white"
            checked={cor === 'white'}
            onChange={handleCorChange}
          />
          Branco
        </label>
      </div>
    </div>
  );
};

export default Cadastro;