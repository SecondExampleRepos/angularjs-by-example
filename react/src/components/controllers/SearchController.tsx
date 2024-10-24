// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';
import ShowService from '../../services/ShowService';

type SearchControllerProps = {
    query?: string;
};

const SearchController: React.FC<SearchControllerProps> = ({ query }) => {
    const [searchQuery, setSearchQuery] = useState<string | null>(query || null);
    const [shows, setShows] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const { query: routeQuery } = useParams<{ query: string }>();

    useEffect(() => {
        // Set page title and description
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";

        if (routeQuery) {
            performSearch(routeQuery);
            setSearchQuery(decodeURI(routeQuery));
        }
    }, [routeQuery]);

    const setSearch = () => {
        if (searchQuery) {
            const encodedQuery = encodeURI(searchQuery);
            history.push(`/search/${encodedQuery}`);
        }
    };

    const performSearch = async (query: string) => {
        setLoading(true);
        try {
            const response = await ShowService.search(query);
            setShows(response);
        } catch (error) {
            console.error('Failed to perform search', error);
        } finally {
            setLoading(false);
        }
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
                <div>Loading...</div>
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
