// Converted from src/sections/view/view.ctrl.js

import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

interface Show {
  id: number;
  original_name: string;
  cast: Array<{ name: string }>;
}

interface PageValues {
  title: string | null;
  description: string | null;
  loading: boolean;
}

const ViewController: React.FC<{ show: Show; pageValues: PageValues }> = ({ show, pageValues }) => {
  const [cast, setCast] = useState<Array<{ name: string }>>([]);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Set page title and description
    pageValues.title = "VIEW";
    pageValues.description = `Overview, seasons & info for '${show.original_name}'.`;

    // Fetch cast information
    const fetchCast = async () => {
      try {
        const response = await axios.get(`http://api.themoviedb.org/3/tv/${id}/credits`, {
          params: { api_key: '87de9079e74c828116acce677f6f255b' },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Failed to fetch cast information', error);
      }
    };

    fetchCast();
  }, [id, show.original_name, pageValues]);

  const setBannerImage = () => ({
    background: 'url() no-repeat',
    backgroundSize: '100%',
    backgroundPosition: '100% 0%',
  });

  return (
    <div>
      <h1>{pageValues.title}</h1>
      <p>{pageValues.description}</p>
      <div style={setBannerImage()}></div>
      <ul>
        {cast.map((member, index) => (
          <li key={index}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewController;
