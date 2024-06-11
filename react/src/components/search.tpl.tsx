import React, { useState, useEffect } from 'react';
import useRootScope from '../../hooks/useRootScope';

const SearchComponent: React.FC = () => {
  const { exampleState, setExampleState, exampleFunction, user, setUser, isAuthenticated, setIsAuthenticated } = useRootScope();
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<any[]>([]);

  const setSearch = () => {
    setLoading(true);

    fetch(`https://api.example.com/shows?query=${query}`)
      .then(response => response.json())
      .then(data => {

    // Example initialization logic: Fetch initial data or set up event listeners
    const initialize = async () => {
      try {
        // Example: Fetch initial data from an API
        const response = await fetch('/api/initial-data');
        const data = await response.json();
        // Update state with the fetched data
        setExampleState(data.exampleState);
        setUser(data.user);
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    initialize();
  }, []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
        setLoading(false);
      });
  };

  useEffect(() => {

    const initialize = async () => {
      try {
        // Example: Fetch initial data from an API
        const response = await fetch('/api/initial-data');
        const data = await response.json();
        // Update state with the fetched data
        setExampleState(data.exampleState);
        setUser(data.user);
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    initialize();
  }, []);
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

  return (
    <div className="show-details">
      <h3>{show.name}</h3>
      <p>{show.description}</p>
      <img src={show.image} alt={show.name} />
    </div>
  );
};
          </button>
        </span>
      </div>
      <div className="search-results">
        {loading === null && (
          <div className="no-data">Use the search box above to find your favorite TV shows</div>
        )}
        {shows.length === 0 && loading === false && (
          <div className="no-data">Your search did not return any results</div>
        )}

  return (
    <div className="show-details">
      <h3>{show.name}</h3>
      <p>{show.description}</p>
      <img src={show.image} alt={show.name} />
    </div>
  );
};
        {!loading && (
          <ul className="list-of-shows">
            {shows.map((show, index) => (
              <li key={index} className="col-xs-6 col-md-4 repeat-animation">
                <ShowComponent show={show} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const ShowComponent: React.FC<{ show: any }> = ({ show }) => {

  return (
    <div className="show-details">
      <h3>{show.name}</h3>
      <p>{show.description}</p>
      <img src={show.image} alt={show.name} />
    </div>
  );
};
  return <div>{show.name}</div>;
};

export default SearchComponent;