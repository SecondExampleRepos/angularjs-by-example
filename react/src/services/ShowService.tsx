// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

interface ShowService {
  getPremieres: () => Promise<any>;
  get: (id: number) => Promise<any>;
  search: (query: string) => Promise<any>;
  getPopular: () => Promise<any>;
  getCast: (id: number) => Promise<any>;
}

const ShowService: ShowService = {
  getPremieres: async () => {
    const date = new Date();
    date.setDate(1);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const response = await makeRequest('discover/tv', {
      'first_air_date.gte': formattedDate,
      append_to_response: 'genres',
    });
    return response.results;
  },

  get: async (id: number) => {
    return makeRequest(`tv/${id}`, {});
  },

  search: async (query: string) => {
    const response = await makeRequest('search/tv', { query });
    return response.results;
  },

  getPopular: async () => {
    const response = await makeRequest('tv/popular', {});
    return response.results;
  },

  getCast: async (id: number) => {
    return makeRequest(`tv/${id}/credits`, {});
  },
};

async function makeRequest(url: string, params: Record<string, any>) {
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
}

export default ShowService;
