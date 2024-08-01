import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import PageValues from '../utils/constants/PageValues';

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const location = useLocation();
    const { searchQuery } = useParams<{ searchQuery: string }>();

    useEffect(() => {
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";
    }, []);

    useEffect(() => {
        if (searchQuery) {
            performSearch(decodeURI(searchQuery));
            setQuery(decodeURI(searchQuery));
        }
    }, [searchQuery]);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURI(query);
            location.pathname = `/search/${encodedQuery}`;
        }
    };

    const performSearch = async (query: string) => {
        setLoading(true);
        try {
            const response = await ShowService.search(query);
            setShows(response);
        } catch (error) {
            console.error('Error performing search', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={setSearch}>Search</button>
            {loading && <p>Loading...</p>}
            <ul>
                {shows.map((show) => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchController;
