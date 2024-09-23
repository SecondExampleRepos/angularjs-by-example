// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // useHistory replaced with useNavigate
import axios from 'axios';
import BASE_URL from '../../utils/constants/BASE_URL'; // Import BASE_URL separately
import API_KEY from '../../utils/constants/API_KEY'; // Import API_KEY separately

interface Show {
  id: number;
  name: string;
  // Add other relevant fields as needed
}

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const navigate = useNavigate(); // useHistory replaced with useNavigate
  const { query: routeQuery } = useParams<{ query: string }>();

  useEffect(() => {
    if (routeQuery) {
      performSearch(decodeURI(routeQuery));
      setQuery(decodeURI(routeQuery));
    }
  }, [routeQuery]);

  const setSearch = () => {
    if (query) {
      const encodedQuery = encodeURI(query);
      navigate(`/search/${encodedQuery}`); // history.push replaced with navigate
    }
  };

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/tv`, {
        params: {
          api_key: API_KEY,
          query: searchQuery,
        },
      });
      setShows(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
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
