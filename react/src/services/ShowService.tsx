// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

interface Show {
  id: number;
  original_name: string;
  vote_average: number;
  origin_country: string[];
  backdrop_path: string;
  first_air_date: string;
}

interface Cast {
  cast: any[];
}

async function makeRequest(url: string, params: Record<string, any>) {
  const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
  const response = await axios.get(requestUrl, {
    params: {
      ...params,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

async function getPremieres(): Promise<Show[]> {
  const date = new Date();
  date.setDate(1);
  const data = await makeRequest('discover/tv', {
    'first_air_date.gte': moment(date).format('YYYY-MM-DD'),
    append_to_response: 'genres',
  });
  return data.results;
}

async function get(id: number): Promise<Show> {
  return makeRequest(`tv/${id}`, {});
}

async function getCast(id: number): Promise<Cast> {
  return makeRequest(`tv/${id}/credits`, {});
}

async function search(query: string): Promise<Show[]> {
  const data = await makeRequest('search/tv', { query });
  return data.results;
}

async function getPopular(): Promise<Show[]> {
  const data = await makeRequest('tv/popular', {});
  return data.results;
}

export default {
  getPremieres,
  get,
  search,
  getPopular,
  getCast,
};
