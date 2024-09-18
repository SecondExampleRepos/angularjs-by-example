// Converted from src/app.config.js

import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useAxiosInterceptors() {
  const location = useLocation();

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // You can modify the request config here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        // Request completed successfully
        return response;
      },
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              toast.error('You are unauthorized to access the requested resource (401)');
              break;
            case 404:
              toast.error('The requested resource could not be found (404)');
              break;
            case 500:
              toast.error('Internal server error (500)');
              break;
            default:
              toast.error('An unexpected error occurred');
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors when component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [location]);
}
