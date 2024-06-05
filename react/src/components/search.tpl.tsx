import React, { useState } from 'react';

interface Show {
  // Define the properties of a show here
}

interface SearchProps {
  // Define any props that the Search component might need
}

const Search: React.FC<SearchProps> = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<Show[]>([]);

  const setSearch = () => {
    // Implement the search logic here
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
        // Mock data for demonstration purposes
        const mockShows = [
            { id: 1, name: 'Show 1' },
            { id: 2, name: 'Show 2' },
            { id: 3, name: 'Show 3' },
        ];

        // Filter shows based on the query
        const filteredShows = mockShows.filter(show =>
            show.name.toLowerCase().includes(query.toLowerCase())
        );

        setShows(filteredShows);
        setLoading(false);
    }, 1000);
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
        {loading && <div className="throbber"></div>}
        {!loading && (
          <ul className="list-of-shows">
            {shows.map((show, index) => (
              <li key={index} className="col-xs-6 col-md-4 repeat-animation">
                <ShowComponent show={show} />
      <h3>{show.name}</h3>
      <p>{show.description}</p>
      <img src={show.image} alt={show.name} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface ShowComponentProps {
  show: Show;
}

const ShowComponent: React.FC<ShowComponentProps> = ({ show }) => {
  return (
    <div>
      {/* Render the show details here */}
{/* Render the show details */}
<h3>{show.name}</h3>
<p>{show.description}</p>
<img src={show.image} alt={show.name} />
    </div>
  );
};

export default Search;