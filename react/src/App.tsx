// Converted from src/app.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../components/controllers/HomeController';
import Premieres from '../../components/controllers/PremieresController';
import Search from '../../components/controllers/SearchController';
import Popular from '../../components/controllers/PopularController';
import View from '../../components/controllers/ViewController';

// CSS imports
import 'react/src/assets/react/node_modules/sanitize.css/sanitize.css';
import 'react/src/assets/react/node_modules/sanitize.css/typography.css';
import 'react/src/assets/react/node_modules/sanitize.css/system-ui.css';
import 'react/src/assets/react/node_modules/sanitize.css/forms.css';
import 'react/src/assets/react/node_modules/sanitize.css/ui-monospace.css';
import 'react/src/assets/react/node_modules/sanitize.css/assets.css';
import 'react/src/assets/react/node_modules/sanitize.css/reduce-motion.css';
import 'react/src/assets/react/node_modules/react-toastify/dist/ReactToastify.minimal.css';
import 'react/src/assets/react/node_modules/react-toastify/dist/ReactToastify.min.css';
import 'react/src/assets/react/node_modules/react-toastify/dist/ReactToastify.css';
import 'react/src/assets/react/node_modules/react-clock/dist/Clock.css';
import 'react/src/assets/react/node_modules/react-clock/src/Clock.css';
import 'react/src/assets/react/node_modules/react-calendar/dist/Calendar.css';
import 'react/src/assets/react/node_modules/react-calendar/src/Calendar.css';
import 'react/src/assets/react/node_modules/react-resizable/css/styles.css';
import 'react/src/assets/react/node_modules/istanbul-reports/lib/html/assets/base.css';
import 'react/src/assets/react/node_modules/istanbul-reports/lib/html/assets/vendor/prettify.css';
import 'react/src/assets/react/node_modules/istanbul-reports/lib/html-spa/assets/spa.css';
import 'react/src/assets/react/node_modules/copy-to-clipboard/example/example.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-material-no-font.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-grid-no-native-widgets.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-grid.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/agGridQuartzFont.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-material.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-alpine-no-font.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-grid-no-native-widgets.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-quartz-no-font.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-material-no-font.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/agGridClassicFont.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/agGridQuartzFont.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/agGridClassicFont.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/agGridBalhamFont.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/agGridMaterialFont.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-alpine.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-balham.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-quartz.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-balham-no-font.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/ag-theme-material.min.css';
import 'react/src/assets/react/node_modules/ag-grid-community/styles/agGridBalhamFont.min.css'; 
 import  'react / src / assets / react / node _ modules / ag - grid - community / styles / agGridMaterialFont . min . css' ; 
 import  'react / src / assets / react / node _ modules / ag - grid - community / styles / ag - theme - alpine - no - font . css' ; 
 import  'react / src / assets / react / node _ modules / ag - grid - community / styles / agGridAlpineFont . min . css' ; 
 import  'react / src / assets / react / node _ modules / ag - grid - community / styles / ag - theme - balham . min . css' ; 
 import  'react / src / assets / react / node _ modules / ag - grid - community / styles / ag - grid . css' ; 
 import  'react / src / assets / react / node _ modules / ag - grid - community / styles / ag - theme - quartz . css' ; 
 import  'react / src  assets  / react  node _ modules  ag  grid  community  styles  ag theme quartz no font min css' ; 
 import  'react   src   assets   react   node _ modules   ag   grid   community   styles   agGridAlpineFont   css' ; 
 import  'react   src   assets   react   node _ modules   react grid layout css styles css' ; 
 import  'react   src   assets   react   node _ modules   react bootstrap multiselect css bootstrap multiselect css' ; 
 import  'react   src   assets   react   node _ modules   react datetime picker dist DateTimePicker css' ; 
 import  'react   src   assets   react   node _ modules   @ csstools normalize css opinionated css' ; 
 import  'react     src     assets     react     node _ modules     @ csstools normalize css normalize css' ; 
 import  'react     src     assets     react     node _ modules     tailwindcss tailwind css' ; 
 import  'react     src     assets     react     node _ modules     tailwindcss screens css' ; 
 import  'react     src     assets     react     node _ modules     tailwindcss variants css' ; 
 import  'react     src     assets     react     node _ modules     tailwindcss components css' ; 
 import  'react                                                                                                                                                                                                                                

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
