import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ExcluirTarefa = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const excluirTarefa = async () => {
      try {
        console.log('Bora excluir!!!!!!! :D', id)
        await axios.delete(`https://localhost:7179/api/tarefas/${id}`);
        toast.success('Tarefa excluída com sucesso!');
        setTimeout(() => navigate('/'), 2000);
      } catch (error) {
        toast.error('Erro ao excluir a tarefa.');
        console.error('Erro ao excluir a tarefa:', error);
      }
    };

    excluirTarefa();
  }, [id, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h4 className="card-title mb-0">Excluir Tarefa</h4>
            </div>
            <div className="card-body">
              <p className="text-center">Excluindo tarefa...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcluirTarefa;