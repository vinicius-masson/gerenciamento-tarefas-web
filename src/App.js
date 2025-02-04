// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CriarTarefa from './components/CriarTarefa';
import LerTarefa from './components/LerTarefa';
import AtualizarTarefa from './components/AtualizarTarefa';
import ExcluirTarefa from './components/ExcluirTarefa';
//exact
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element= {<Home />} />
        <Route path="/criar" element={<CriarTarefa />} />
        <Route path="/ler/:id" element={<LerTarefa />} />
        <Route path="/atualizar/:id" element={<AtualizarTarefa />} />
        <Route path="/excluir/:id" element={<ExcluirTarefa />} />
      </Routes>
    </Router>
  );
};

export default App;