import React, { useState, useEffect } from 'react';
import useRootScope from '../../hooks/useRootScope';

interface Show {
  // Define the properties of a show
  // Example:
  // id: number;
  // name: string;
}

const SearchComponent: React.FC = () => {
  const { state, updateState } = useRootScope();
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<Show[]>([]);

  const setSearch = () => {
    if (!query) return;
    setLoading(true);
fetch(`https://api.example.com/shows?query=${query}`)
  .then(response => response.json())
  .then(data => {
    setShows(data.shows);
    // Fetch initial data if needed and set initial state
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/initial-data');
        const initialData = await response.json();
        updateState({ someProperty: initialData.someProperty });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setLoading(false);
      }
    };
    fetchInitialData();
  })
  .catch(error => {
    console.error('Error fetching shows:', error);
    setLoading(false);
  });
  };
useEffect(() => {
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.example.com/initial-data');
      const data = await response.json();
      updateState({ someProperty: data.someProperty });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setLoading(false);
    }
  };

  fetchInitialData();
}, []);
  useEffect(() => {
    // Add any initialization logic here
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/initial-data');
        const data = await response.json();
        updateState({ someProperty: data.someProperty });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setLoading(false);
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
        {loading === null && (
          <div className="no-data">
            Use the search box above to find your favorite TV shows
          </div>
        )}
        {shows.length === 0 && loading === false && (
          <div className="no-data">
            Your search did not return any results
      <div>
        <h3>{show.name}</h3>
        <p>{show.description}</p>
        <p><strong>Genre:</strong> {show.genre}</p>
        <p><strong>Rating:</strong> {show.rating}</p>
      </div>
        )}
        {loading && <div className="throbber"></div>}
      <h3>{show.name}</h3>
      <p>{show.description}</p>
      <p><strong>Genre:</strong> {show.genre}</p>
      <p><strong>Rating:</strong> {show.rating}</p>
          <ul className="list-of-shows">
            {shows.map((show, index) => (
      <div>
        <h3>{show.name}</h3>
        <p>{show.description}</p>
        <p><strong>Genre:</strong> {show.genre}</p>
        <p><strong>Rating:</strong> {show.rating}</p>
      </div>
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
      <div>
        <h3>{show.name}</h3>
        <p>{show.description}</p>
        <p><strong>Genre:</strong> {show.genre}</p>
        <p><strong>Rating:</strong> {show.rating}</p>
      </div>
    </div>
  );
};

export default SearchComponent;