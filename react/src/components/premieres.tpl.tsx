import React from 'react';
import useRootScope from '../../hooks/useRootScope';

interface Show {
  // Define the properties of a show here
  // Example:
  // id: number;
  // name: string;
}

interface PremieresProps {
  shows: Show[];
}

const Premieres: React.FC<PremieresProps> = ({ shows }) => {
  const { state, updateState } = useRootScope();

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
      {/* Example: */}
      {/* <h2>{show.name}</h2> */}
    </div>
  );
};

export default Premieres;