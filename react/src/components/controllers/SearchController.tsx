// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../../services/ShowService';

interface Show {
  id: number;
  original_name: string;
  vote_average: number;
  origin_country: string[];
  backdrop_path: string;
  first_air_date: string;
}

interface PageValues {
  title: string | null;
  description: string | null;
  loading: boolean;
}

const PageValues: PageValues = {
  title: null,
  description: null,
  loading: false,
};

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const history = useHistory();
  const { query: routeQuery } = useParams<{ query: string }>();

  useEffect(() => {
    PageValues.title = "SEARCH";
    PageValues.description = "Search for your favorite TV shows.";
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{PageValues.title}</h1>
      <p>{PageValues.description}</p>
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
          {shows.map((show) => (
            <li key={show.id}>
              <h2>{show.original_name}</h2>
              <p>Rating: {show.vote_average}</p>
              <p>Countries: {show.origin_country.join(', ')}</p>
              <img
                src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
                alt={show.original_name}
              />
              <p>First Air Date: {show.first_air_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchController;
