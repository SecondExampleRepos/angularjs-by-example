// Converted from src/sections/view/view.ctrl.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShowService from '../../services/ShowService';

interface Show {
  id: number;
  original_name: string;
  cast: Array<any>;
}

const ViewController: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);

  useEffect(() => {
    if (id) {
      ShowService.get(id).then((data) => {
        setShow(data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (show) {
      ShowService.getCast(show.id).then((response) => {
        setShow((prevShow) => prevShow ? { ...prevShow, cast: response.cast } : null);
      });
    }
  }, [show]);

  const setBannerImage = () => ({
    background: 'url() no-repeat',
    backgroundSize: '100%',
    backgroundPosition: '100% 0%',
  });

  if (!show) return <div>Loading...</div>;

  return (
    <div>
      <h1>{show.original_name}</h1>
      {/* Additional UI elements to display show details and cast */}
    </div>
  );
};

export default ViewController;
