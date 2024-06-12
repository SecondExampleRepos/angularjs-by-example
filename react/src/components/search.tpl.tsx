import React, { useState } from 'react';

interface Show {
  // Define the properties of a show object
  // SECOND AGENT: [MISSING CONTEXT] - Define the properties of a show object
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<Show[]>([]);

  const setSearch = () => {

    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      // Mock data for demonstration purposes
      const mockShows = [
        { id: 1, name: 'Show 1', description: 'Description 1' },
        { id: 2, name: 'Show 2', description: 'Description 2' },
        // Add more mock shows as needed
      ];

      // Filter shows based on the query
      const filteredShows = mockShows.filter(show =>
        show.name.toLowerCase().includes(query.toLowerCase())
      );

      setShows(filteredShows);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay for the API call
  };
  };

  return (
    <div className="search-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control input-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setSearch();
            }
          }}
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
          </div>
        )}

      <div className="show-details">
        <h3>{show.title}</h3>
        <p>{show.description}</p>
        <img src={show.image} alt={show.title} />
      </div>
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

const ShowComponent: React.FC<{ show: Show }> = ({ show }) => {
  return (
    <div>
      {/* Render show details here */}

      <h3>{show.name}</h3>
      <p>{show.description}</p>
      {/* Assuming there is an image property in the show object */}
      {show.image && <img src={show.image} alt={show.name} />}
    </div>
  );
};

export default SearchComponent;