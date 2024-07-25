import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../utils/constants/PageValues';
import API_KEY from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

interface Show {
  // Define the structure of a show object
  id: number;
  name: string;
  // Add other relevant fields as needed
}

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { searchQuery } = useParams<{ searchQuery: string }>();

  useEffect(() => {
    PageValues.title = "SEARCH";
    PageValues.description = "Search for your favorite TV shows.";
  }, []);

  useEffect(() => {
    if (searchQuery) {
      performSearch(decodeURI(searchQuery));
      setQuery(decodeURI(searchQuery));
    }
  }, [searchQuery]);

  const setSearch = () => {
    if (query) {
      const encodedQuery = encodeURI(query);
      history.push(`/search/${encodedQuery}`);
    }
  };

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/tv`, {
        params: {
          api_key: API_KEY,
          query: query
        }
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
      <h1>{PageValues.title}</h1>
      <p>{PageValues.description}</p>
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
