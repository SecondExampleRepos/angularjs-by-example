// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../../services/showService';
import PageValues from '../../utils/constants/PageValues';

type Show = {
    id: number;
    name: string;
};

const SearchController: React.FC = () => {
    const history = useHistory();
    const { query } = useParams<{ query: string }>();
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";
        
        if (query) {
            performSearch(decodeURI(query));
            setSearchQuery(decodeURI(query));
        }
    }, [query]);

    const setSearch = () => {
        if (searchQuery) {
            const encodedQuery = encodeURI(searchQuery);
            history.push(`/search/${encodedQuery}`);
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
                    {shows.map((show, index) => (
                        <li key={index}>{show.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchController;
