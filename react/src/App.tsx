import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from '../../components/controllers/HomeController';
import Premieres from '../../components/controllers/PremieresController';
import Search from '../../components/controllers/SearchController';
import Popular from '../../components/controllers/PopularController';
import View from '../../components/controllers/ViewController';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/premieres" element={<Premieres />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
