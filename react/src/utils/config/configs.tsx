// Converted from src/app.config.js

import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const interceptor = (error: any): Promise<any> => {
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      console.error('You are unauthorised to access the requested resource (401)');
    } else if (status === 404) {
      console.error('The requested resource could not be found (404)');
    } else if (status === 500) {
      console.error('Internal server error (500)');
    }
  }
  return Promise.reject(error);
};

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  interceptor
);

export default axios;
