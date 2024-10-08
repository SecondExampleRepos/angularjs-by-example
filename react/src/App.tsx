// /var/folders/tp/_k968y_x13z2b_bhm39165fm0000gn/T/second-repos/jobs/job_7400/react/src/App.tsx
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeController from './components/controllers/HomeController';
import PremieresController from './components/controllers/PremieresController';
import SearchController from './components/controllers/SearchController';
import PopularController from './components/controllers/PopularController';
import ViewController from './components/controllers/ViewController';

// CSS imports
import './assets/src/sections/home/home.css';
import './assets/src/sections/premieres/premieres.css';
import './assets/src/sections/search/search.css';
import './assets/src/sections/view/view.css';
import './assets/src/components/show/show.css';
import './assets/src/assets/css/animations.css';
import './assets/src/assets/css/style.css';
import './assets/src/assets/css/font-icons.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeController />} />
        <Route path="/premieres" element={<PremieresController />} />
        <Route path="/search" element={<SearchController />} />
        <Route path="/search/:query" element={<SearchController />} />
        <Route path="/popular" element={<PopularController />} />
        <Route path="/view/:id" element={<ViewController />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
