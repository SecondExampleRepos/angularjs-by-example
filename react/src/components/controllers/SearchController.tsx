// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
  // Add other relevant fields as needed
}

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    if (queryParam) {
      performSearch(queryParam);
      setQuery(decodeURI(queryParam));
    }
  }, [location.search]);

  const setSearch = () => {
    if (query) {
      const encodedQuery = encodeURI(query);
      history.push(`/search?query=${encodedQuery}`);
    }
  };

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://api.themoviedb.org/3/search/tv`, {
        params: {
          api_key: '87de9079e74c828116acce677f6f255b',
          query: query,
        },
      });
      setShows(response.data.results);
    } catch (error) {
      console.error('Error fetching search results', error);
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
