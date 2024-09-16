// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Show {
  id: number;
  original_name: string;
  backdrop_path: string;
}

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  
  const history = useHistory();
  const location = useLocation();

  const setSearch = () => {
    if (query) {
      const encodedQuery = encodeURIComponent(query);
      history.push(`/search/${encodedQuery}`);
    }
  };

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await axios.get<{ results: Show[] }>(
        `http://api.themoviedb.org/3/search/tv?api_key=87de9079e74c828116acce677f6f255b&query=${searchQuery}`
      );
      setShows(response.data.results);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    if (queryParam) {
      performSearch(queryParam);
      setQuery(decodeURIComponent(queryParam));
    }
  }, [location.search]);

  return (
    <div>
      <div className="search-top">
        <div className="input-group">
          <input
            type="text"
            className="form-control input-lg"
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setSearch()}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-info btn-lg search-btn"
              type="button"
              disabled={!query}
              onClick={setSearch}
            >
              <span className="glyphicon glyphicon-search"></span> Search
            </button>
          </span>
        </div>
      </div>
      <div className="search-results">
        {loading === null && (
          <div className="no-data">Use the search box above to find your favorite TV shows</div>
        )}
        {shows.length === 0 && loading === false && (
          <div className="no-data">Your search did not return any results</div>
        )}
        {loading && <div className="throbber"></div>}
        {!loading && (
          <ul className="list-of-shows">
            {shows.map((show) => (
              <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
                {/* Assuming there's a ShowComponent to display each show */}
                {/* SECOND AGENT: [MISSING CONTEXT] - ShowComponent definition is required to render each show */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchController;
