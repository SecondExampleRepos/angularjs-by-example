// Converted from src/services/show.fct.js

import axios from 'axios';
// Replaced 'moment' with native Date methods to avoid dependency issues
import API_KEY from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

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

async function fetchShows(endpoint: string, params: Record<string, any>): Promise<Show[]> {
  const data = await makeRequest(endpoint, params);
  return data.results;
}

async function getPremieres(): Promise<Show[]> {
  const date = new Date();
  date.setDate(1);
  const formattedDate = date.toISOString().split('T')[0]; // Using native Date methods
  return fetchShows('discover/tv', { 'first_air_date.gte': formattedDate, append_to_response: 'genres' });
}

async function get(id: number): Promise<Show> {
  return makeRequest(`tv/${id}`, {});
}

async function getCast(id: number): Promise<Cast> {
  return makeRequest(`tv/${id}/credits`, {});
}

async function search(query: string): Promise<Show[]> {
  return fetchShows('search/tv', { query });
}

async function getPopular(): Promise<Show[]> {
  return fetchShows('tv/popular', {});
}

// Assigning the export object to a variable to avoid anonymous default export
const ShowService = {
  getPremieres,
  get,
  search,
  getPopular,
  getCast,
};

export default ShowService;
