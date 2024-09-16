// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

interface Show {
  id: number;
  original_name: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  origin_country: string[];
}

interface Cast {
  name: string;
  character: string;
  profile_path: string;
}

interface ApiResponse<T> {
  results: T[];
}

async function makeRequest<T>(url: string, params: Record<string, any>): Promise<T> {
  const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}&${new URLSearchParams(params).toString()}`;
  
  try {
    const response = await axios.get<T>(requestUrl, {
      headers: { 'Content-Type': 'application/json' },
      cache: true,
    });
    return response.data;
  } catch (error) {
    console.error('XHR Failed for ShowService', error);
    throw error;
  }
}

export default function ShowService() {
  async function getPremieres(): Promise<Show[]> {
    const date = new Date();
    date.setDate(1);
    const formattedDate = moment(date).format('DD-MM-YYYY');
    
    const data = await makeRequest<ApiResponse<Show>>('discover/tv', { 
      'first_air_date.gte': formattedDate, 
      append_to_response: 'genres' 
    });
    
    return data.results;
  }

  async function get(id: number): Promise<Show> {
    return makeRequest<Show>(`tv/${id}`, {});
  }

  async function getCast(id: number): Promise<Cast[]> {
    const data = await makeRequest<{ cast: Cast[] }>(`tv/${id}/credits`, {});
    return data.cast;
  }

  async function search(query: string): Promise<Show[]> {
    const data = await makeRequest<ApiResponse<Show>>('search/tv', { query });
    return data.results;
  }

  async function getPopular(): Promise<Show[]> {
    const data = await makeRequest<ApiResponse<Show>>('tv/popular', {});
    return data.results;
  }

  return { getPremieres, get, getCast, search, getPopular };
}
