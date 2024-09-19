// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

interface Show {
  id: number;
  original_name: string;
  cast: Array<{ name: string }>;
}

const ViewController: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await axios.get(`/api/tv/${id}`);
        setShow(response.data);
      } catch (error) {
        console.error('Error fetching show data:', error);
      }
    };

    const fetchCast = async () => {
      try {
        const response = await axios.get(`/api/tv/${id}/credits`);
        if (show) {
          setShow({ ...show, cast: response.data.cast });
        }
      } catch (error) {
        console.error('Error fetching cast data:', error);
      }
    };

    fetchShow();
    fetchCast();
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <div>
      <h1>{show.original_name}</h1>
      <div style={setBannerImage()}></div>
      <ul>
        {show.cast.map((member, index) => (
          <li key={index}>{member.name}</li>
        ))}
      </ul>
    </div>
  );

  function setBannerImage() {
    return {
      background: 'url() no-repeat',
      backgroundSize: '100%',
      backgroundPosition: '100% 0%',
    };
  }
};

export default ViewController;
