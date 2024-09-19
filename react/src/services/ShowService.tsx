// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

interface Show {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
}

interface CastMember {
  name: string;
}

interface ShowServiceData {
  getPremieres: () => Promise<Show[]>;
  get: (id: number) => Promise<Show>;
  search: (query: string) => Promise<Show[]>;
  getPopular: () => Promise<Show[]>;
  getCast: (id: number) => Promise<CastMember[]>;
}

const ShowService = (): ShowServiceData => {
  
  const makeRequest = async (url: string, params: Record<string, any>) => {
    const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await axios.get(`${requestUrl}&${queryString}`, {
        headers: { 'Content-Type': 'application/json' },
        cache: true,
      });
      return response.data;
    } catch (error) {
      console.error('XHR Failed for ShowService', error);
      throw error;
    }
  };

  const getPremieres = async (): Promise<Show[]> => {
    const date = new Date();
    date.setDate(1);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    const data = await makeRequest('discover/tv', { 'first_air_date.gte': formattedDate, append_to_response: 'genres' });
    return data.results;
  };

  const get = async (id: number): Promise<Show> => {
    return makeRequest(`tv/${id}`, {});
  };

  const getCast = async (id: number): Promise<CastMember[]> => {
    return makeRequest(`tv/${id}/credits`, {});
  };

  const search = async (query: string): Promise<Show[]> => {
    const data = await makeRequest('search/tv', { query });
    return data.results;
  };

  const getPopular = async (): Promise<Show[]> => {
    const data = await makeRequest('tv/popular', {});
    return data.results;
  };

  return { getPremieres, get, search, getPopular, getCast };
};

export default ShowService;
