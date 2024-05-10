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

const Header = () => (
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
);

const Bar = () => {
    const [data, setData] = useState<BarData>({ title: '', description: '', loading: false });

    useEffect(() => {
        // Simulate fetching data
        setData({ title: 'Example Title', description: 'This is a description.', loading: false });
    }, []);

    return (
        <section id="site-bar">
            <div className="container">
                <h1>{data.title}</h1>
                <p>{data.description}</p>
            </div>
            {data.loading && <div className="page-loader"><div className="throbber"></div></div>}
        </section>
    );
};

const Main = () => (
    <section id="main">
        <div className="container">
            {/* Placeholder for routing views */}
            <React.Fragment>
                {/* This would typically be replaced by a React Router setup in a real app */}
                <div>Home View</div>
            </React.Fragment>
        </div>
    </section>
);

const App = () => (
    <>
        <Header />
        <Bar />
        <Main />
    </>
);

export default App;