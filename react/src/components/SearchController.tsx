import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ShowService from '../services/ShowService';
import { PageValues } from '../utils/constants/PageValues';

interface SearchParams {
  query: string;
}

const SearchController: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean | null>(null);
  const history = useHistory();
  const { query: routeQuery } = useParams<SearchParams>();

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

  const performSearch = (query: string) => {
    setLoading(true);
    ShowService.search(query).then(response => {
      setShows(response);
      setLoading(false);
    });
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
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchController;
