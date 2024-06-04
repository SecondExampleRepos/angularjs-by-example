// react/src/components/premieres.tpl.tsx

import React from 'react';
import Show from './Show'; // Assuming you have a Show component

interface Show {
  // Define the properties of a show here
  // Example:
  // id: number;
  // title: string;
}

interface PremieresProps {
  shows: Show[];
}

const Premieres: React.FC<PremieresProps> = ({ shows }) => {
  return (
    <ul className="list-of-shows">
      {shows.map((show, index) => (
        <li key={index} className="col-xs-6 col-md-4">
          <Show show={show} />
        </li>
      ))}
    </ul>
  );
};

export default Premieres;