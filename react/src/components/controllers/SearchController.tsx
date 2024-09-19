// Converted from src/sections/search/search.ctrl.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Updated import
import axios from 'axios';

interface Show {
  id: number;
  name: string;
}

const SearchController: React.FC = () => {
  const navigate = useNavigate(); // Updated to useNavigate
  const { query } = useParams<{ query: string }>();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (query) {
      performSearch(decodeURI(query));
      setSearchQuery(decodeURI(query));
    }
  }, [query]);

  const setSearch = () => {
    if (searchQuery) {
      const encodedQuery = encodeURI(searchQuery);
      navigate(`/search/${encodedQuery}`); // Updated to navigate
    }
  };

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/search/tv`, { params: { query } });
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
            <li key={show.id}>{show.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchController;
