import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'react/src/assets/src/sections/home/home.css';
import 'react/src/assets/src/sections/premieres/premieres.css';
import 'react/src/assets/src/sections/search/search.css';
import 'react/src/assets/src/sections/view/view.css';
import 'react/src/assets/src/components/show/show.css';
import 'react/src/assets/src/assets/css/style.css';
import 'react/src/assets/src/assets/css/font-icons.css';
import 'react/src/assets/src/assets/css/animations.css';

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
