// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../services/showService';

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
    const description = `Overview, seasons & info for '${show.original_name}'.`;
    // Assuming there's a way to set meta description in your app
    // setMetaDescription(description);

    const fetchCast = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tv/${show.id}/credits?api_key=${API_KEY}`);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [show]);

  const setBannerImage = () => ({
    background: 'url() no-repeat',
    backgroundSize: '100%',
    backgroundPosition: '100% 0%',
  });

  return (
    <div style={setBannerImage()}>
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
