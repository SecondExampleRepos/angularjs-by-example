// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import PageValues from '../utils/constants/PageValues';

interface SearchParams {
    query?: string;
}

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const history = useHistory();
    const { query: routeQuery } = useParams<SearchParams>();

    useEffect(() => {
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";
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
            const response = await ShowService.search(searchQuery);
            setShows(response);
        } catch (error) {
            console.error('Error performing search', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Render search input and results here */}
            {/* Example: */}
            <input
                type="text"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for TV shows"
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
