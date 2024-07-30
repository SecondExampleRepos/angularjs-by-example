import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import PageValues from '../utils/constants/PageValues';

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);
    const history = useHistory();
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
                {shows.map((show, index) => (
                    <li key={index}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchController;
