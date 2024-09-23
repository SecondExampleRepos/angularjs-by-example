// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

interface Show {
  id: number;
  original_name: string;
  cast: Array<any>;
}

interface PageValues {
  title: string;
  description: string;
}

const ViewController: React.FC = () => {
  const [show, setShow] = useState<Show>({ id: 0, original_name: '', cast: [] });
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Set page title and description
    const pageValues: PageValues = {
      title: "VIEW",
      description: `Overview, seasons & info for '${show.original_name}'.`
    };

    // Fetch show details
    const fetchShowDetails = async () => {
      try {
        const response = await axios.get(`/api/shows/${id}`);
        setShow(response.data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      }
    };

    // Fetch cast details
    const fetchCastDetails = async () => {
      try {
        const response = await axios.get(`/api/shows/${id}/cast`);
        setShow(prevShow => ({ ...prevShow, cast: response.data.cast }));
      } catch (error) {
        console.error('Error fetching cast details:', error);
      }
    };

    fetchShowDetails();
    fetchCastDetails();
  }, [id, show.original_name]);

  const setBannerImage = () => ({
    background: 'url() no-repeat',
    backgroundSize: '100%',
    backgroundPosition: '100% 0%'
  });

  return (
    <div style={setBannerImage()}>
      <h1>{show.original_name}</h1>
      {/* Render other show details and cast here */}
    </div>
  );
};

export default ViewController;
