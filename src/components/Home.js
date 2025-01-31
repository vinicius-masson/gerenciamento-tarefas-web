import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    // Simulação de dados
    // const simulatedTasks = [
    //   { id: 1, titulo: 'Tarefa teste 1', descricao: 'Descrição da tarefa 1' },
    //   { id: 2, titulo: 'Tarefa teste 2', descricao: 'Descrição da tarefa 2' },
    //   { id: 3, titulo: 'Tarefa teste 3', descricao: 'Descrição da tarefa 3' },
    // ];
    try {
      const response = await axios.get('https://localhost:7179/api/tarefas/');
      setTarefas(response.data);
    } catch (error) {
      toast.error('Erro ao carregar a tarefa.');
      console.error('Erro ao carregar a tarefa:', error);
    }
    //setTarefas(simulatedTasks);
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-8">
                <h2>Gerenciamento de Tarefas</h2>
              </div>
              <div className="col-sm-4 text-end">
                <Link to="/criar" className='btn btn-primary'><i className="material-icons">&#xE145;</i> Nova Tarefa</Link>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tarefas.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.titulo}</td>
                  <td>{task.descricao}</td>
                  <td>
                    <Link to={`/ler/${task.id}`} className="view" title="Visualizar" data-toggle="tooltip">
                      <i className="material-icons">&#xE417;</i>
                    </Link>
                    <Link to={`/atualizar/${task.id}`} className="edit" title="Editar" data-toggle="tooltip">
                      <i className="material-icons">&#xE254;</i>
                    </Link>
                    <Link to={`/excluir/${task.id}`} className="delete" title="Excluir" data-toggle="tooltip">
                      <i className="material-icons">&#xE872;</i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;