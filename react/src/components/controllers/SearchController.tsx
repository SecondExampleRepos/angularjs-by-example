// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Show from '../directives/show';

interface SearchParams {
    query?: string;
}

interface ShowData {
    id: number;
    genres: { name: string }[];
}

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<ShowData[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const history = useHistory();
    const { query: routeQuery } = useParams<SearchParams>();

    useEffect(() => {
        document.title = "SEARCH";
        // Assuming there's a way to set meta description in your app
        // setMetaDescription("Search for your favorite TV shows.");
    }, []);

    useEffect(() => {
        if (routeQuery) {
            performSearch(routeQuery);
            setQuery(decodeURI(routeQuery));
        }
    }, [routeQuery]);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURI(query);
            history.push(`/search/${encodedQuery}`);
        }
    };

    const performSearch = async (searchQuery: string) => {
        setLoading(true);
        try {
            const response = await axios.get<ShowData[]>(`/api/search/${searchQuery}`);
            setShows(response.data);
        } catch (error) {
            console.error('Error performing search:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="search-top">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control input-lg"
                        value={query || ''}
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
            </div>
            <div className="search-results">
                {loading === null && <div className="no-data">Use the search box above to find your favorite TV shows</div>}
                {shows.length === 0 && loading === false && <div className="no-data">Your search did not return any results</div>}
                {loading && <div className="throbber"></div>}
                {!loading && (
                    <ul className="list-of-shows">
                        {shows.map((show) => (
                            <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
                                <Show show={show} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchController;
