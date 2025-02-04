import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LerTarefa = () => {
  const { id } = useParams();
  const [tarefa, setTarefa] = useState({
    titulo: '',
    descricao: '',
    dataConclusao: '',
    status: '',
  });

  useEffect(() => {
    const carregarTarefa = async () => {
      try {
        const response = await axios.get(`https://localhost:7179/api/tarefas/${id}`);
        setTarefa(response.data);
      } catch (error) {
        toast.error('Erro ao carregar a tarefa.');
        console.error('Erro ao carregar a tarefa:', error);
      }
    };

    carregarTarefa();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h4 className="card-title mb-0">Detalhes da Tarefa</h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  value={tarefa.titulo}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descricao" className="form-label">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  id="descricao"
                  rows="3"
                  value={tarefa.descricao}
                  readOnly
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="dataConclusao" className="form-label">
                  Data de Conclusão
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dataConclusao"
                  value={tarefa.dataConclusao}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  value={tarefa.status}
                  readOnly
                />
              </div>

              <div className="d-flex justify-content-between">
                <Link to="/" className="btn btn-secondary">
                  <i className="fas fa-arrow-left me-2"></i> Voltar
                </Link>
                <Link to={`/editar/${id}`} className="btn btn-primary">
                  <i className="fas fa-edit me-2"></i> Editar Tarefa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LerTarefa;