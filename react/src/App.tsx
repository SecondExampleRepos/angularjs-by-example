import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import './sections/home/home.css';
import './sections/premieres/premieres.css';
import './sections/search/search.css';
import './sections/view/view.css';
import './components/show/show.css';
import './assets/css/animations.css';
import './assets/css/font-icons.css';
import './assets/css/style.css';

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
    </div>
  );
}

export default App;
