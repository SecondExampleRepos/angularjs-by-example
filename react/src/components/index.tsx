import React, { useState, useEffect } from 'react';
import './home.css';
import './premieres.css';
import './popular.css';
import './search.css';
import './view.css';
import './show.css';
import './bar.css';

type BarData = {
    title: string;
    description: string;
    loading: boolean;
};

const App: React.FC = () => {
    const [barData, setBarData] = useState<BarData>({ title: '', description: '', loading: false });

    useEffect(() => {
        // Simulate fetching data
        setBarData({
            title: 'Example Title',
            description: 'This is a description fetched from somewhere.',
            loading: false
        });
    }, []);

    return (
        <div>
            <header id="site-header">
                <div className="container">
                    <div className="pull-left logo">REACT <span className="alt">BY</span> EXAMPLE</div>
                    <ul className="pull-right menu">
                        <li><a href="#/">HOME</a></li>
                        <li><a href="#/premieres">PREMIERES</a></li>
                        <li><a href="#/popular">POPULAR</a></li>
                        <li><a href="#/search">SEARCH</a></li>
                    </ul>
                </div>
            </header>

            <section id="site-bar">
                <div className="container">
                    <h1>{barData.title}</h1>
                    <p>{barData.description}</p>
                </div>
                {barData.loading && <div className="page-loader"><div className="throbber"></div></div>}
            </section>

            <section id="main">
                <div className="container">
                    {/* SECOND AGENT: [MISSING CONTEXT] */}
                </div>
            </section>
        </div>
    );
};

export default App;