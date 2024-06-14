import React, { useState, useEffect } from 'react';
import useRootScope from '../../hooks/useRootScope';

const SearchComponent: React.FC = () => {
  const { someState, setSomeState, someFunction } = useRootScope();
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<any[]>([]);

  const setSearch = () => {
    setLoading(true);

    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        setShows(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setLoading(false);

    // Example effect logic: Fetch initial data or perform setup
    const fetchInitialData = async () => {
      try {
        const response = await fetch('/api/initial-data'); // Replace with actual API endpoint
        const data = await response.json();
        setSomeState(data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);
    setTimeout(() => {
      // Simulate an API call
      const results = query ? [{ name: 'Example Show' }] : [];
      setShows(results);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {

    // Fetch initial data or perform setup
    const fetchInitialData = async () => {
      try {
        const response = await fetch('/api/initial-data'); // Replace with actual API endpoint
        const data = await response.json();
        setSomeState(data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <div className="search-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control input-lg"
          value={query}
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
      <div className="search-results">
        <div className="no-data" style={{ display: loading === null ? 'block' : 'none' }}>
          Use the search box above to find your favorite TV shows
        </div>
        <div className="no-data" style={{ display: shows.length === 0 && loading === false ? 'block' : 'none' }}>
          Your search did not return any results
        </div>
        <div className="throbber" style={{ display: loading ? 'block' : 'none' }}></div>
        <ul className="list-of-shows" style={{ display: loading === false ? 'block' : 'none' }}>
          {shows.map((show, index) => (
            <li className="col-xs-6 col-md-4 repeat-animation" key={index}>
              <ShowComponent show={show} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ShowComponent: React.FC<{ show: any }> = ({ show }) => {
  return (
    <div>
      {/* Render show details here */}
      <h3>{show.name}</h3>
    </div>
  );
};

export default SearchComponent;