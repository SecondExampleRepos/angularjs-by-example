// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShowService from '../../services/showService';

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

    ShowService.getCast(show.id).then(response => {
      setCast(response.cast);
    });
  }, [show]);

  const setBannerImage = () => ({
    background: 'url() no-repeat',
    backgroundSize: '100%',
    backgroundPosition: '100% 0%'
  });

  return (
    <div style={setBannerImage()}>
      {/* Render the show details and cast here */}
    </div>
  );
};

export default ViewController;
