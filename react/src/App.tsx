// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/controllers/HomeController.tsx';
import Premieres from '../components/controllers/PremieresController.tsx';
import Search from '../components/controllers/SearchController.tsx';
import Popular from '../components/controllers/PopularController.tsx';
import View from '../components/controllers/ViewController.tsx';

// CSS imports
import 'sanitize.css/sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/system-ui.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/ui-monospace.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/reduce-motion.css';
import 'react-toastify/dist/ReactToastify.minimal.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-clock/dist/Clock.css';
import 'react-calendar/dist/Calendar.css';
import 'react-resizable/css/styles.css';
import 'istanbul-reports/lib/html/assets/base.css';
import 'istanbul-reports/lib/html/assets/vendor/prettify.css';
import 'istanbul-reports/lib/html-spa/assets/spa.css';
import 'copy-to-clipboard/example/example.css';
import 'ag-grid-community/styles/ag-theme-material-no-font.min.css';
import 'ag-grid-community/styles/ag-grid-no-native-widgets.min.css';
import 'ag-grid-community/styles/ag-grid.min.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/agGridQuartzFont.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
    return (
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
    );
}

export default App;
