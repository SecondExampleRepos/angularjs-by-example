import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './index.css';
import '../../sections/home/home.css';
import '../../sections/premieres/premieres.css';
import '../../sections/search/search.css';
import '../../sections/view/view.css';
import '../../components/show/show.css';
import '../../assets/css/animations.css';
import '../../assets/css/font-icons.css';
import '../../assets/css/style.css';

// Corrected import paths for controllers
import Home from '../../components/controllers/HomeController.js'; // Ensure the file exists and has the correct extension
import Premieres from '../../components/controllers/PremieresController.js'; // Ensure the file exists and has the correct extension
import Search from '../../components/controllers/SearchController.js'; // Ensure the file exists and has the correct extension
import Popular from '../../components/controllers/PopularController.js'; // Ensure the file exists and has the correct extension
import View from '../../components/controllers/ViewController.js'; // Ensure the file exists and has the correct extension

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
