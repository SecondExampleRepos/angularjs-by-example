// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../../services/ShowService';

interface Show {
  id: number;
  original_name: string;
}

const SearchController: React.FC = () => {
  const history = useHistory();
  const { query } = useParams<{ query: string }>();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const setSearch = () => {
    if (searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery);
      history.push(`/search/${encodedQuery}`);
    }
  };

  const performSearch = (query: string) => {
    setLoading(true);
    ShowService.search(query).then((response) => {
      setShows(response);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (query) {
      performSearch(decodeURIComponent(query));
      setSearchQuery(decodeURIComponent(query));
    }
  }, [query]);

  return (
    <div>
      <h1>SEARCH</h1>
      <p>Search for your favorite TV shows.</p>
      <input
        type="text"
        value={searchQuery || ''}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter show name"
      />
      <button onClick={setSearch}>Search</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {shows.map((show) => (
            <li key={show.id}>{show.original_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchController;
