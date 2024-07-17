import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ShowService } from '../services/showService';
import { PageValues } from '../utils/constants/pageValues';

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const { searchQuery } = useParams<{ searchQuery: string }>();
    const history = useHistory();

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
            history.push(`/search/${encodedQuery}`);
        }
    };

    const performSearch = (query: string) => {
        setLoading(true);
        ShowService.search(query).then(response => {
            setShows(response);
            setLoading(false);
        });
    };

    return (
        <div>
            <input
                type="text"
                value={query || ''}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={setSearch}>Search</button>
            {loading && <p>Loading...</p>}
            <ul>
                {shows.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchController;
