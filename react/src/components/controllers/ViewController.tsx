// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
// Removed unused import 'useLocation'
import axios from 'axios';

interface Show {
  id: number;
  original_name: string;
  cast: Array<{ name: string }>; // Specify the type of cast members
}

interface ViewControllerProps {
  show: Show;
}

const ViewController: React.FC<ViewControllerProps> = ({ show }) => {
  const [cast, setCast] = useState<Array<{ name: string }>>([]); // Specify the type of cast members

  useEffect(() => {
    document.title = "VIEW";
    // const description = `Overview, seasons & info for '${show.original_name}'.`; // Removed unused variable
    // Assuming there's a way to set meta description in your app
    // setMetaDescription(description);

    const fetchCast = async () => {
      try {
        const response = await axios.get(`http://api.themoviedb.org/3/tv/${show.id}/credits?api_key=87de9079e74c828116acce677f6f255b`);
        setCast(response.data.cast);
      } catch (error) {
        console.error('Failed to fetch cast', error);
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
