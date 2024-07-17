import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import { PageValues } from '../utils/constants/PageValues';

interface RouteParams {
    query?: string;
}

const SearchController: React.FC = () => {
    const history = useHistory();
    const { query } = useParams<RouteParams>();
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean | null>(null);

    useEffect(() => {
        // Set page title and description
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
        ShowService.search(query).then(response => {
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
