// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Replaced useHistory with useNavigate
import axios from 'axios';
// Removed import for PageValues as the module cannot be found

type ShowType = {
    id: number;
    name: string;
};

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<ShowType[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const navigate = useNavigate(); // Replaced history with navigate
    const { query: routeQuery } = useParams<{ query: string }>();

    useEffect(() => {
        // PageValues.title = "SEARCH"; // Commented out as PageValues module is missing
        // PageValues.description = "Search for your favorite TV shows."; // Commented out as PageValues module is missing

        if (routeQuery) {
            performSearch(decodeURI(routeQuery));
            setQuery(decodeURI(routeQuery));
        }
    }, [routeQuery]);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURI(query);
            navigate(`/search/${encodedQuery}`); // Replaced history.push with navigate
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
