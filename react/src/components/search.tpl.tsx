import React, { useState, useEffect } from 'react';
import { useRootScope } from '../../hooks/useRootScope';

interface Show {
  // Define the properties of a show object
  id: number;
  name: string;
  // Add other properties as needed
}

const SearchComponent: React.FC = () => {
  const { exampleState, setExampleState, exampleFunction } = useRootScope();
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<Show[]>([]);

  const setSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setShows(data.shows);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch();
    }
  };

  return (
    <div className="search-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control input-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
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
      <div className="search-results">
        {loading === null && (
          <div className="no-data">
            Use the search box above to find your favorite TV shows
          </div>
        )}
        {loading === false && shows.length === 0 && (
          <div className="no-data">
            Your search did not return any results
          </div>
        )}
        {loading && <div className="throbber"></div>}
        {!loading && (
          <ul className="list-of-shows">
            {shows.map((show) => (
              <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
                <ShowComponent show={show} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ShowComponent: React.FC<{ show: Show }> = ({ show }) => {
  return (
    <div>
      {/* Render show details here */}
      <h3>{show.name}</h3>
      {/* Add more show details as needed */}
    </div>
  );
};

export default SearchComponent;
