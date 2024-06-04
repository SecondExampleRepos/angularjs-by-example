import axios from 'axios';
import moment from 'moment';
import { API_KEY, BASE_URL } from '../utils/constants';

interface ShowService {
  getPremieres: () => Promise<any>;
  get: (id: string) => Promise<any>;
  search: (query: string) => Promise<any>;
  getPopular: () => Promise<any>;
  getCast: (id: string) => Promise<any>;
}

const makeRequest = async (url: string, params: Record<string, any>) => {
  try {
    let requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    Object.keys(params).forEach(key => {
      requestUrl += `&${key}=${params[key]}`;
    });

    const response = await axios.get(requestUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: true
    });

    return response.data;
  } catch (error) {
    console.error('XHR Failed for ShowService');
    console.error(error);
    throw error;
  }
};

const getPremieres = async () => {
  const date = new Date();
  date.setDate(1);
  const formattedDate = moment(date).format('DD-MM-YYYY');
  const data = await makeRequest('discover/tv', { 'first_air_date.gte': formattedDate, append_to_response: 'genres' });
  return data.results;
};

const get = async (id: string) => {
  return await makeRequest(`tv/${id}`, {});
};

const getCast = async (id: string) => {
  return await makeRequest(`tv/${id}/credits`, {});
};

const search = async (query: string) => {
  const data = await makeRequest('search/tv', { query });
  return data.results;
};

const getPopular = async () => {
  const data = await makeRequest('tv/popular', {});
  return data.results;
};

const ShowService: ShowService = {
  getPremieres,
  get,
  search,
  getPopular,
  getCast
};

export default ShowService;