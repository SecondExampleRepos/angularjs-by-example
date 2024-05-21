import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// SECOND AGENT: [MISSING CONTEXT]
import Home from './Home';
import About from './About';
import Contact from './Contact';

const RootRouter: React.FC = () => {
    return (
        <Router>
<Route path="/home" component={Home} />
<Route path="/about" component={About} />
<Route path="/contact" component={Contact} />
                {/* SECOND AGENT: [MISSING CONTEXT] */}
<Switch>
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
</Switch>
            </Switch>
        </Router>
    );
};

export default RootRouter;