import React from 'react';

interface Show {
  // Define the properties of a show here
  // For example:
  id: number;
  name: string;
  // Add other properties as needed
}

interface PremieresProps {
  shows: Show[];
}

const Premieres: React.FC<PremieresProps> = ({ shows }) => {
  return (
    <ul className="list-of-shows">
      {shows.map((show) => (
        <li key={show.id} className="col-xs-6 col-md-4">
          <ShowComponent show={show} />
        </li>
      ))}
    </ul>
  );
};

interface ShowComponentProps {
  show: Show;
}

const ShowComponent: React.FC<ShowComponentProps> = ({ show }) => {
  return (
    <div>
      {/* Render show details here */}
      <h2>{show.name}</h2>
      {/* Add other show details as needed */}
    </div>
  );
};

export default Premieres;