// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
  // Add other relevant fields as needed
}

interface SearchParams {
  query: string;
}

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const history = useHistory();
  const { query: routeQuery } = useParams<SearchParams>();

  useEffect(() => {
    if (routeQuery) {
      performSearch(routeQuery);
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
      const response = await axios.get('/api/search/tv', {
        params: { query: searchQuery },
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
