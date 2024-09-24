// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import PageValues from '../utils/constants/PageValues';

interface SearchParams {
  query?: string;
}

const SearchController: React.FC = () => {
  const history = useHistory();
  const { query } = useParams<SearchParams>();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    PageValues.title = "SEARCH";
    PageValues.description = "Search for your favorite TV shows.";
  }, []);

  useEffect(() => {
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
      <input
        type="text"
        value={searchQuery || ''}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for TV shows"
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
