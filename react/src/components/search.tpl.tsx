import React, { useState, useEffect } from 'react';
import useRootScope from '../../hooks/useRootScope';

const SearchComponent: React.FC = () => {
    const { exampleState, setExampleState, exampleFunction } = useRootScope();
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean | null>(null);
    const [shows, setShows] = useState<any[]>([]);

    const setSearch = () => {
        setLoading(true);

        fetch(`https://api.example.com/search?query=${query}`)
            .then(response => response.json())
            .then(data => {

        // Example initialization logic that was previously in $rootScope
        const initialize = async () => {
            try {
                // Fetch initial data or perform any setup required
                const initialData = await fetchInitialData();
                setExampleState(initialData);
            } catch (error) {
                console.error('Initialization error:', error);
            }
        };

        initialize();
    }, []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
                setLoading(false);
            });
    };

    useEffect(() => {

        const initialize = async () => {
            try {
                // Fetch initial data or perform any setup required
                const initialData = await fetchInitialData();
                setExampleState(initialData);
            } catch (error) {
                console.error('Initialization error:', error);
            }
        };

        initialize();
    }, []);
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

            <h3>{show.title}</h3>
            <p>{show.description}</p>
            <img src={show.image} alt={show.title} />
        </div>
                    <div className="no-data">
                        Your search did not return any results
                    </div>
                )}
                {loading && <div className="throbber"></div>}
                {!loading && (
                    <ul className="list-of-shows">
                        {shows.map((show, index) => (
                            <li key={index} className="col-xs-6 col-md-4 repeat-animation">
                                <ShowComponent show={show} />

            <h3>{show.title}</h3>
            <p>{show.description}</p>
            <img src={show.image} alt={show.title} />
        </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const ShowComponent: React.FC<{ show: any }> = ({ show }) => {
    return (
        <div>

            <h3>{show.title}</h3>
            <p>{show.description}</p>
            <img src={show.image} alt={show.title} />
        </div>
        </div>
    );
};

export default SearchComponent;