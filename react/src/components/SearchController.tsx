import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../utils/constants/PageValues';
import { API_KEY } from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

// Define the type for the search results
type ShowType = {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
};

const SearchController: React.FC = () => {
    const [query, setQuery] = useState<string | null>(null);
    const [shows, setShows] = useState<ShowType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const { searchQuery } = useParams<{ searchQuery: string }>();

    useEffect(() => {
        // Set page title and description
        PageValues.title = "SEARCH";
        PageValues.description = "Search for your favorite TV shows.";

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
            const response = await axios.get(`${BASE_URL}/search/tv`, {
                params: {
                    api_key: API_KEY,
                    query: query
                }
            });
            setShows(response.data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
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
                placeholder="Search for TV shows"
            />
            <button onClick={setSearch}>Search</button>
            {loading && <p>Loading...</p>}
            <ul>
                {shows.map(show => (
                    <li key={show.id}>
                        <h2>{show.name}</h2>
                        <p>{show.overview}</p>
                        {show.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                                alt={show.name}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchController;
