// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Updated import
import ShowService from '../../services/ShowService';

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const location = useLocation();
    const navigate = useNavigate(); // Updated hook

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryParam = searchParams.get('query');
        if (queryParam) {
            performSearch(queryParam);
            setQuery(decodeURI(queryParam));
        }
    }, [location.search]);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURI(query);
            navigate(`/search?query=${encodedQuery}`); // Updated navigation
        }
    };

    const performSearch = (query: string) => {
        setLoading(true);
        ShowService().search(query).then((response) => {
            setShows(response);
            setLoading(false);
        }).catch(() => {
            setLoading(false); // Ensure loading is set to false on error
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
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {shows.map((show) => (
                        <li key={show.id}>{show.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchController;
