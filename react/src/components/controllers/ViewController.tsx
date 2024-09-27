// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
    const fetchCast = async () => {
      try {
        const response = await axios.get(`http://api.themoviedb.org/3/tv/${show.id}/credits?api_key=87de9079e74c828116acce677f6f255b`);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Failed to fetch cast', error);
      }
    };

    fetchCast();
  }, [show.id]);

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
