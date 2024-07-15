import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ShowService from '../../services/ShowService';
import PageValues from '../../utils/constants/PageValues';

const SearchController: React.FC = () => {
    const { query } = useParams<{ query: string }>();
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);

    useEffect(() => {
        // Set page title and description
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";

        if (query) {
            performSearch(query);
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
        ShowService.search(query).then(response => {
            setShows(response);
            setLoading(false);
        });
    };

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
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
