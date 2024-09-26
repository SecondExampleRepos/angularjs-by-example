// Converted from src/services/show.fct.js

import axios, { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import API_KEY from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

const ShowService = () => {
  const makeRequest = async (url: string, params: Record<string, string>) => {
    let requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    Object.entries(params).forEach(([key, value]) => {
      requestUrl += `&${key}=${value}`;
    });

    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
        // Removed 'cache' as it is not a valid AxiosRequestConfig option
      };
      const response = await axios.get(requestUrl, config);
      return response.data;
    } catch (error) {
      console.error('XHR Failed for ShowService', error);
      throw error;
    }
  };

  const getPremieres = async () => {
    const date = new Date();
    date.setDate(1);
    const formattedDate = moment(date).format('YYYY-MM-DD'); // Corrected date format to match API expectations
    const data = await makeRequest('discover/tv', {
      'first_air_date.gte': formattedDate,
      append_to_response: 'genres',
    });
    return data.results;
  };

  const get = (id: number) => {
    return makeRequest(`tv/${id}`, {});
  };

  const getCast = (id: number) => {
    return makeRequest(`tv/${id}/credits`, {});
  };

  const search = async (query: string) => {
    const data = await makeRequest('search/tv', { query });
    return data.results;
  };

  const getPopular = async () => {
    const data = await makeRequest('tv/popular', {});
    return data.results;
  };

  return {
    getPremieres,
    get,
    search,
    getPopular,
    getCast,
  };
};

export default ShowService;
