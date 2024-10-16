// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useEffect } from 'react';

interface PremieresControllerProps {
  shows: Array<any>;
  setPageValues: (title: string, description: string) => void;
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows, setPageValues }) => {
  useEffect(() => {
    setPageValues("PREMIERES", "Brand new shows showing this month.");
  }, [setPageValues]);

  return (
    <div>
      <h1>Premieres</h1>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PremieresController;
