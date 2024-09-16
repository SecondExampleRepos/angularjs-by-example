// Converted from src/sections/premieres/premieres.ctrl.js

import React, { useState, useEffect } from 'react';

interface Show {
  // Define the properties of a show object based on the AngularJS code
  // Assuming shows is an array of objects with at least a title property
  title: string;
}

interface PremieresControllerProps {
  shows: Show[];
}

const PremieresController: React.FC<PremieresControllerProps> = ({ shows }) => {
  const [pageTitle, setPageTitle] = useState<string>("PREMIERES");
  const [pageDescription, setPageDescription] = useState<string>("Brand new shows showing this month.");
  const [premiereShows, setPremiereShows] = useState<Show[]>([]);

  useEffect(() => {
    // Set the page title and description
    document.title = pageTitle;
    // Set the shows for premieres
    setPremiereShows(shows);
  }, [shows, pageTitle]);

  return (
    <div>
      <h1>{pageTitle}</h1>
      <p>{pageDescription}</p>
      <ul className="list-of-shows">
        {premiereShows.map((show, index) => (
          <li key={index} className="col-xs-6 col-md-4">
            {/* Assuming there's a Show component to display each show */}
            <ShowComponent show={show} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Placeholder for the ShowComponent which would be defined elsewhere
const ShowComponent: React.FC<{ show: Show }> = ({ show }) => (
  <div>{show.title}</div>
);

export default PremieresController;
