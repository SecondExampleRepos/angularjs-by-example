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

const showService: ShowService = {
  getPremieres: async () => {
    const date = new Date();
    date.setDate(1);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&first_air_date.gte=${formattedDate}&append_to_response=genres`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('XHR Failed for ShowService', error);
      throw error;
    }
  },

  get: async (id: string) => {
    const url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('XHR Failed for ShowService', error);
      throw error;
    }
  },

  search: async (query: string) => {
    const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('XHR Failed for ShowService', error);
      throw error;
    }
  },

  getPopular: async () => {
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('XHR Failed for ShowService', error);
      throw error;
    }
  },

  getCast: async (id: string) => {
    const url = `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`;
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('XHR Failed for ShowService', error);
      throw error;
    }
  },
};

export default showService;
