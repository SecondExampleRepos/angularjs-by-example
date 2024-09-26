// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import showService from '../services/ShowService';
import PageValues from '../utils/constants/PageValues';

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    PageValues.title = "SEARCH";
    PageValues.description = "Search for your favorite TV shows.";

    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get('query');
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

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await showService.search(searchQuery);
      setShows(response);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
  };

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
          <div className="no-data">
            Use the search box above to find your favorite TV shows
          </div>
        )}
        {shows.length === 0 && loading === false && (
          <div className="no-data">
            Your search did not return any results
          </div>
        )}
        {loading && <div className="throbber"></div>}
        {!loading && (
          <ul className="list-of-shows">
            {shows.map((show) => (
              <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
                <Show data-show={show} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchController;
