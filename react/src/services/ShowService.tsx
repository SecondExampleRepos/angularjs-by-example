// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

const makeRequest = async (url: string, params: Record<string, any>) => {
  const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  const fullUrl = `${requestUrl}&${queryString}`;

  try {
    const response = await axios.get(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('XHR Failed for ShowService', error);
    throw error;
  }
};

const getPremieres = async () => {
  const date = new Date();
  date.setDate(1);
  const formattedDate = moment(date).format('DD-MM-YYYY');
  const data = await makeRequest('discover/tv', {
    'first_air_date.gte': formattedDate,
    append_to_response: 'genres',
  });
  return data.results;
};

const get = async (id: number) => {
  return makeRequest(`tv/${id}`, {});
};

const getCast = async (id: number) => {
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

const ShowService = {
  getPremieres,
  get,
  search,
  getPopular,
  getCast,
};

export default ShowService;
