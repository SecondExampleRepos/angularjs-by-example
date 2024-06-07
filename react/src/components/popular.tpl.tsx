import React from 'react';
import useRootScope from '../../hooks/useRootScope';

interface Show {
  // Define the properties of a show object
  id: number;
  name: string;
  // Add other properties as needed
}

interface PopularProps {
  popular: {
    shows: Show[];
  };
}

const Popular: React.FC<PopularProps> = ({ popular }) => {
  const { exampleState, setExampleState, exampleFunction } = useRootScope();

  return (
    <div className="trending-results">
      {popular.shows.length === 0 ? (
        <div className="no-data">There are no popular shows available to display</div>
      ) : (
        <ul className="list-of-shows">
          {popular.shows.map((show) => (
            <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
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
      {/* Render show details here */}
      <h3>{show.name}</h3>
      {/* Add other show details as needed */}
    </div>
  );
};

export default Popular;