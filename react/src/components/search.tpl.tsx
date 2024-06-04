import React, { useState, useEffect } from 'react';
import useRootScope from '../../hooks/useRootScope';

const SearchComponent: React.FC = () => {
    const { someState, setSomeState, someFunction } = useRootScope();
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean | null>(null);
    const [shows, setShows] = useState<any[]>([]);

    const setSearch = () => {
        setLoading(true);
        fetch(`/api/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                setShows(data.shows);
        if (query) {
            setSearch();
        }
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (someState) {
            setQuery(someState);
            setSearch();
        }
    }, []);

    return (
        <div className="search-top">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control input-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && setSearch()}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-info btn-lg search-btn"
                        type="button"
                        disabled={!query}
                        onClick={setSearch}
                    >
                        <span className="glyphicon glyphicon-search"></span> Search
                    </button>
                </span>
            </div>
            <div className="search-results">
                {loading === null && (
                    <div className="no-data">
                        Use the search box above to find your favorite TV shows
                    </div>
                )}
                {shows.length === 0 && loading === false && (
                    <div className="no-data">
                        Your search did not return any results
                    </div>
                )}
                {loading && <div className="throbber"></div>}
                {!loading && (
                    <ul className="list-of-shows">
                        {shows.map((show, index) => (
                            <li key={index} className="col-xs-6 col-md-4 repeat-animation">
    return (
        <div className="show-details">
            <h3>{show.name}</h3>
            <p>{show.description}</p>
            <img src={show.image} alt={show.name} />
        </div>
    );
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
    return (
        <div className="show-details">
            <h3>{show.name}</h3>
            <p>{show.description}</p>
            <img src={show.image} alt={show.name} />
        </div>
    );

const ShowComponent: React.FC<{ show: any }> = ({ show }) => {
    return (
        <div className="show-details">
            <h3>{show.name}</h3>
            <p>{show.description}</p>
            <img src={show.image} alt={show.name} />
        </div>
    );
    return <div>{show.name}</div>;
};

export default SearchComponent;