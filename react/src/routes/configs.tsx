// Converted from src/app.config.js

import axios, { AxiosResponse } from 'axios';
import { useLocation } from 'react-router-dom';

export const useHttpInterceptor = () => {
  const location = useLocation();

  const errorInterceptor = (error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('You are unauthorised to access the requested resource (401)');
          break;
        case 404:
          console.error('The requested resource could not be found (404)');
          break;
        case 500:
          console.error('Internal server error (500)');
          break;
        default:
          console.error('An unknown error occurred');
      }
    }
    return Promise.reject(error);
  };

  const successInterceptor = (response: AxiosResponse) => {
    // Request completed successfully
    return response;
  };

  axios.interceptors.response.use(successInterceptor, errorInterceptor);
};
