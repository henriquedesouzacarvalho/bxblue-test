import React from 'react';
import Routes from './routes'
import './App.css';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a href="/" className="navbar-brand">Reclame aí</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-toggle="collapse" 
          data-target="#navbarContent">
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/add-complaint">Cadastrar Reclamação</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/list-complaint">Listar Reclamações</a>
            </li>
          </ul>
        </div>
      </nav>
      <Routes/>
    </div>
  );
}

export default App;
