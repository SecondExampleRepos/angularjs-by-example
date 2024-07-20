import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface BarData {
  title: string;
  description: string;
  loading: boolean;
}

const BarController: React.FC = () => {
  const [data, setData] = useState<BarData>({ title: '', description: '', loading: true });

  useEffect(() => {
    // Fetch data from the API
    axios.get('/api/bar-data')
      .then(response => {
        setData({
          title: response.data.title,
          description: response.data.description,
          loading: false
        });
      })
      .catch(error => {
        console.error('Error fetching bar data:', error);
        setData(prevData => ({ ...prevData, loading: false }));
      });
  }, []);

  return (
    <section id="site-bar">
      <div className="container">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
      {data.loading && (
        <div className="page-loader">
          <div className="throbber"></div>
        </div>
      )}
    </section>
  );
};

export default BarController;
