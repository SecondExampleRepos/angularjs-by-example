import React from 'react';

interface Show {
  // Define the properties of a show here
  // Example:
  // id: number;
  // name: string;
  // description: string;
}

interface PremieresProps {
  shows: Show[];
}

const Premieres: React.FC<PremieresProps> = ({ shows }) => {
  return (
    <ul className="list-of-shows">
      {shows.map((show, index) => (
        <li key={index} className="col-xs-6 col-md-4">
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
      {/* Example:
      <h2>{show.name}</h2>
      <p>{show.description}</p>
      */}
    </div>
  );
};

export default Premieres;