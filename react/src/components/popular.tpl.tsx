import React from 'react';
import Show from './Show'; // Assuming Show component is in the same directory

interface Show {
  // Define the structure of a show object
  id: number;
  name: string;
  // Add other properties as needed
}

interface PopularProps {
  shows: Show[];
}

const Popular: React.FC<PopularProps> = ({ shows }) => {
  return (
    <div className="trending-results">
      {shows.length === 0 ? (
        <div className="no-data">There are no popular shows available to display</div>
      ) : (
        <ul className="list-of-shows">
          {shows.map((show) => (
            <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
              <Show show={show} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Popular;