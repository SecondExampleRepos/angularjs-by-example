// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShowService from '../../services/ShowService';

interface Show {
  id: number;
  original_name: string;
  vote_average: number;
  origin_country: string[];
  backdrop_path: string;
  first_air_date: string;
}

interface PageValuesType {
  title: string | null;
  description: string | null;
  loading: boolean;
}

const pageValues: PageValuesType = {
  title: "SEARCH",
  description: "Search for your favorite TV shows.",
  loading: false,
};

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { query: routeQuery } = useParams<{ query: string }>();

  useEffect(() => {
    if (routeQuery) {
      const decodedQuery = decodeURI(routeQuery);
      performSearch(decodedQuery);
      setQuery(decodedQuery);
    }
  }, [routeQuery]);

  const setSearch = () => {
    if (query) {
      const encodedQuery = encodeURI(query);
      navigate(`/search/${encodedQuery}`);
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
      <h1>{pageValues.title}</h1>
      <p>{pageValues.description}</p>
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
