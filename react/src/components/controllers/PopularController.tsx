// Converted from src/sections/popular/popular.ctrl.js

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Show from '../directives/show';
import { PageValues } from '../../services/pageValues';

interface PopularControllerProps {
  shows: Array<any>;
}

const PopularController: React.FC<PopularControllerProps> = ({ shows }) => {
  const location = useLocation();

  useEffect(() => {
    PageValues.title = "POPULAR";
    PageValues.description = "The most popular TV shows.";
    // Assuming there's a way to set meta description in your app
    // setMetaDescription(PageValues.description);
  }, [location]);

  return (
    <div>
      <h1>{PageValues.title}</h1>
      <p>{PageValues.description}</p>
      <ul>
        {shows.map((show, index) => (
          <li key={index}>
            <Show show={show} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularController;
