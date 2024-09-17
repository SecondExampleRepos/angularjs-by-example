// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Updated import to useNavigate
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues'; // Ensure this path is correct and the file exists

type ShowType = {
    id: number;
    name: string;
};

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<ShowType[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const navigate = useNavigate(); // Updated to useNavigate
    const { query: routeQuery } = useParams<{ query: string }>();

    useEffect(() => {
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";

        if (routeQuery) {
            performSearch(decodeURI(routeQuery));
            setQuery(decodeURI(routeQuery));
        }
    }, [routeQuery]);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURI(query);
            navigate(`/search/${encodedQuery}`); // Updated to navigate
        }
    };

    const performSearch = async (searchQuery: string) => {
        setLoading(true);
        try {
            const response = await axios.get<ShowType[]>(`/search/tv`, { params: { query: searchQuery } });
            setShows(response.data);
        } catch (error) {
            console.error('Failed to fetch shows', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for TV shows"
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
