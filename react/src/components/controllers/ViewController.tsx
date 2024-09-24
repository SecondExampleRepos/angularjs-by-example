// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowService from '../../services/show.fct';

interface Show {
  id: number;
  original_name: string;
  cast: Array<any>;
}

interface ViewControllerProps {
  show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
  const [cast, setCast] = useState<Array<any>>([]);
  const location = useLocation();

  useEffect(() => {
    document.title = "VIEW";
    // Assuming PageValues is a global object or a context that sets page metadata
    // PageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

    const fetchCast = async () => {
      try {
        const response = await ShowService.getCast(show.id);
        setCast(response.cast);
      } catch (error) {
        console.error('Failed to fetch cast', error);
      }
    };

    fetchCast();
  }, [show.id, show.original_name]);

  const setBannerImage = () => ({
    background: 'url() no-repeat',
    backgroundSize: '100%',
    backgroundPosition: '100% 0%',
  });

  return (
    <div style={setBannerImage()}>
      {/* Render show details and cast here */}
      <h1>{show.original_name}</h1>
      <ul>
        {cast.map((member, index) => (
          <li key={index}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewController;
