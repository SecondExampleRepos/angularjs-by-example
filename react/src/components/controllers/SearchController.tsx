// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

type ShowType = {
    id: number;
    name: string;
};

const SearchController: React.FC = () => {
    const history = useHistory();
    const { query } = useParams<{ query: string }>();
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<ShowType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const setSearch = () => {
        if (searchQuery) {
            const encodedQuery = encodeURIComponent(searchQuery);
            history.push(`/search/${encodedQuery}`);
        }
    };

    const performSearch = (query: string) => {
        setLoading(true);
        axios.get(`/api/search/tv?query=${query}`)
            .then(response => {
                setShows(response.data.results);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";
        
        if (query) {
            performSearch(query);
            setSearchQuery(decodeURIComponent(query));
        }
    }, [query]);

    return (
        <div>
            <h1>{PageValues.title}</h1>
            <p>{PageValues.description}</p>
            <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for TV shows"
            />
            <button onClick={setSearch}>Search</button>
            
            {loading ? (
                <div>Loading...</div>
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
