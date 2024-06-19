import React from 'react';

interface Show {
  // Define the properties of a show here
  // SECOND AGENT: [MISSING CONTEXT] - Define the properties of a show
}

interface PopularProps {
  popular: {
    shows: Show[];
  };
}

const Popular: React.FC<PopularProps> = ({ popular }) => {
  return (
    <div className="trending-results">
      {popular.shows.length === 0 ? (
        <div className="no-data">There are no popular shows available to display</div>
      ) : (
        <ul className="list-of-shows">
          {popular.shows.map((show, index) => (
            <li key={index} className="col-xs-6 col-md-4 repeat-animation">
              <ShowComponent show={show} />
            </li>
          ))}
        </ul>
      )}
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

      <div className="show-details">
        <h3>{show.title}</h3>
        <p>{show.description}</p>
        <img src={show.imageUrl} alt={show.title} />
      </div>
  );
};

export default Popular;