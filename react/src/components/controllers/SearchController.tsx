// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ShowService from '../../services/ShowService';
import PageValues from '../../utils/constants/PageValues';

const SearchController: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURIComponent(query);
            navigate(`/search/${encodedQuery}`);
        }
    };

    const performSearch = (searchQuery: string) => {
        setLoading(true);
        ShowService.search(searchQuery).then((response) => {
            setShows(response);
            setLoading(false);
        });
    };

    useEffect(() => {
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";

        const searchParams = new URLSearchParams(location.search);
        const queryParam = searchParams.get('query');
        
        if (queryParam) {
            performSearch(decodeURIComponent(queryParam));
            setQuery(decodeURIComponent(queryParam));
        }
    }, [location.search]);

    return (
        <div>
            <input
                type="text"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for TV shows"
            />
            <button onClick={setSearch}>Search</button>
            
            {loading && <div>Loading...</div>}
            
            <ul>
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchController;
