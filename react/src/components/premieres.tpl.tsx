// react/src/components/premieres.tpl.tsx

import React from 'react';
import Show from './Show'; // Assuming Show component is defined in the same directory

interface Show {
  // Define the properties of a show here
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
          <Show show={show} />
        </li>
      ))}
    </ul>
  );
};

export default Premieres;