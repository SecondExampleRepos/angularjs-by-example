﻿// Converted from src/sections/view/view.ctrl.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

type ShowType = {
  id: number;
  original_name: string;
  cast: Array<{ name: string }>;
};

const ViewController: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<ShowType | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch show details
      axios.get(`/api/shows/${id}`).then((response) => {
        setShow(response.data);
        PageValues.title = "VIEW";
        PageValues.description = `Overview, seasons & info for '${response.data.original_name}'.`;
      });

      // Fetch show cast
      axios.get(`/api/shows/${id}/cast`).then((response) => {
        setShow((prevShow) => prevShow ? { ...prevShow, cast: response.data.cast } : null);
      });
    }
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.original_name}</h1>
      <div>
        <h2>Cast</h2>
        <ul>
          {show.cast.map((member, index) => (
            <li key={index}>{member.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewController;
