import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShowService from '../services/ShowService';

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const { searchQuery } = useParams<{ searchQuery: string }>();
    const history = useHistory();

    useEffect(() => {
        if (searchQuery) {
            performSearch(decodeURI(searchQuery));
            setQuery(decodeURI(searchQuery));
        }
    }, [searchQuery]);

    const setSearch = () => {
        if (query) {
            const encodedQuery = encodeURI(query);
            history.push(`/search/${encodedQuery}`);
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
            <h1>SEARCH</h1>
            <p>Search for your favorite TV shows.</p>
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
