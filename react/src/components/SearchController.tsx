import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShowService from '../services/ShowService';
import { PageValues } from '../utils/constants/PageValues';

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const { query: routeQuery } = useParams<{ query: string }>();
    const history = useHistory();

    useEffect(() => {
        // Set page title and description
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
            <input
                type="text"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for TV shows"
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
