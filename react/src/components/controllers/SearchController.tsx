// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../../services/showService';

interface SearchControllerProps {
  initialQuery?: string;
}

const SearchController: React.FC<SearchControllerProps> = ({ initialQuery }) => {
  const [query, setQuery] = useState<string | null>(initialQuery || null);
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const history = useHistory();
  const { query: routeQuery } = useParams<{ query: string }>();

  useEffect(() => {
    document.title = "SEARCH";
    // Assuming there's a way to set meta description in your app
    // setMetaDescription("Search for your favorite TV shows.");

    if (routeQuery) {
      performSearch(decodeURI(routeQuery));
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
      const response = await ShowService.search(searchQuery);
      setShows(response);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query || ''}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for TV shows"
      />
      <button onClick={setSearch}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {shows.map((show, index) => (
            <li key={index}>{show.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchController;
