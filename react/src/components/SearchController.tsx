// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';

interface SearchParams {
  query?: string;
}

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const history = useHistory();
  const { query: routeQuery } = useParams<SearchParams>();

  const setSearch = () => {
    if (query) {
      const encodedQuery = encodeURI(query);
      history.push(`/search/${encodedQuery}`);
    }
  };

  const performSearch = (searchQuery: string) => {
    setLoading(true);
    ShowService.search(searchQuery).then((response) => {
      setShows(response);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (routeQuery) {
      performSearch(routeQuery);
      setQuery(decodeURI(routeQuery));
    }
  }, [routeQuery]);

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
