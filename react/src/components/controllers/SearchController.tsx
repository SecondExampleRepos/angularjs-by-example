// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Updated import
import ShowService from '../../services/ShowService';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    original_name: string;
};

const SearchController: React.FC = () => {
    const navigate = useNavigate(); // Updated hook
    const { query } = useParams<{ query: string }>();
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const setSearch = () => {
        if (searchQuery) {
            const encodedQuery = encodeURIComponent(searchQuery);
            navigate(`/search/${encodedQuery}`); // Updated method
        }
    };

    const performSearch = (query: string) => {
        setLoading(true);
        ShowService.search(query).then((response) => {
            setShows(response);
            setLoading(false);
        });
    };

    useEffect(() => {
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";

        if (query) {
            performSearch(decodeURIComponent(query));
            setSearchQuery(decodeURIComponent(query));
        }
    }, [query]);

    return (
        <div>
            <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for TV shows"
            />
            <button onClick={setSearch}>Search</button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {shows.map((show) => (
                        <li key={show.id}>{show.original_name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchController;
