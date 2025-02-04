// src/components/CreateTask.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CriarTarefa = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataConclusao, setDataConclusao] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [erroTitulo, setErroTitulo] = useState('');
  const navigate = useNavigate();

  const validarTitulo = (valor) => {
    if (!valor) {
      return 'O título é obrigatório.';
    }
    if (valor.length < 5) {
      return 'O título deve ter pelo menos 5 caracteres.';
    }
    return '';
  };

  const handleChange = (e) => {
    const valor = e.target.value;
    setTitulo(valor);
    setErroTitulo(validarTitulo(valor));
  };

  const handleBlur = () => {
    setErroTitulo(validarTitulo(titulo));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroTitulo = validarTitulo(titulo);
    const erroStatus = !status ? 'O status é obrigatório.' : '';

    setErroTitulo(erroTitulo);

    if (erroTitulo || erroStatus) {
        toast.error('Erros no formulário. Corrija antes de enviar.');
        return;
    }

    const retornarDataComHora = () => {
      if (!dataConclusao)
        return null;

      const agora = new Date();
      const horas = agora.getHours().toString().padStart(2, '0');
      const minutos = agora.getMinutes().toString().padStart(2, '0');
      const segundos = agora.getSeconds().toString().padStart(2, '0');
    
      return `${dataConclusao}T${horas}:${minutos}:${segundos}`;
    }

    try {
      console.log(retornarDataComHora())
      await axios.post('https://localhost:7179/api/tarefas/criar-tarefa', { titulo, descricao, dataConclusao: retornarDataComHora(), status: parseInt(status, 10) });
      toast.success('Tarefa criada com sucesso!');
      setTimeout(() => navigate('/'), 2000);
      navigate('/');
    } catch (error) {
        toast.error('Erro ao criar a tarefa. Tente novamente.'); // Notificação de erro
        console.error('Erro ao criar a tarefa:', error.response ? error.response.data : error.message);
      }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="card-title mb-0">Criar Nova Tarefa</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">
                    Título <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    value={titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {erroTitulo && <span style={{ color: 'red' }}>{erroTitulo}</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="descricao" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    className="form-control"
                    id="descricao"
                    rows="3"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
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
                    value={dataConclusao}
                    onChange={(e) => setDataConclusao(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Pendente</option>
                    <option value="2">Em Progresso</option>
                    <option value="3">Concluído</option>
                  </select>
                </div>

                <div className="d-flex justify-content-between">
                  <Link to="/" className="btn btn-secondary">
                    <i className="fas fa-arrow-left me-2"></i> Voltar
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save me-2"></i> Salvar Tarefa
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarTarefa;