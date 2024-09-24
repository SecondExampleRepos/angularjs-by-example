// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory
import ShowService from '../../services/ShowService';

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('query');
        if (queryParam) {
            performSearch(queryParam);
            setQuery(decodeURI(queryParam));
        }
    }, [location.search]);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURI(query);
            navigate(`/search?query=${encodedQuery}`); // use navigate instead of history.push
        }
    };

    const performSearch = (query: string) => {
        setLoading(true);
        ShowService.search(query).then((response) => {
            setShows(response);
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>SEARCH</h1>
            <p>Search for your favorite TV shows.</p>
            <input
                type="text"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={setSearch}>Search</button>
            {loading && <p>Loading...</p>}
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchController;
