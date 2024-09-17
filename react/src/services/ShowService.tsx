// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

interface ShowService {
  getPremieres: () => Promise<any>;
  get: (id: string) => Promise<any>;
  search: (query: string) => Promise<any>;
  getPopular: () => Promise<any>;
  getCast: (id: string) => Promise<any>;
}

const makeRequest = async (url: string, params: Record<string, any>) => {
  const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  try {
    const response = await axios.get(`${requestUrl}&${queryString}`, {
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

const showService: ShowService = {
  getPremieres: async () => {
    const date = new Date();
    date.setDate(1);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    
    const data = await makeRequest('discover/tv', { 
      'first_air_date.gte': formattedDate, 
      append_to_response: 'genres' 
    });
    
    return data.results;
  },

  get: async (id) => {
    return makeRequest(`tv/${id}`, {});
  },

  search: async (query) => {
    const data = await makeRequest('search/tv', { query });
    return data.results;
  },

  getPopular: async () => {
    const data = await makeRequest('tv/popular', {});
    return data.results;
  },

  getCast: async (id) => {
    return makeRequest(`tv/${id}/credits`, {});
  },
};

export default showService;
