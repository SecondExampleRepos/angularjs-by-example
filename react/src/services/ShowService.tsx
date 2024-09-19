// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

const API_KEY = '87de9079e74c828116acce677f6f255b';
const BASE_URL = 'http://api.themoviedb.org/3';

type Show = {
    id: number;
    original_name: string;
    genres?: string[];
    cast?: Array<{ name: string; character: string }>;
};

type ShowServiceType = {
    getPremieres: () => Promise<Show[]>;
    get: (id: number | string) => Promise<Show>;
    search: (query: string) => Promise<Show[]>;
    getPopular: () => Promise<Show[]>;
    getCast: (id: number | string) => Promise<{ cast: Array<{ name: string; character: string }> }>;
};

const ShowService: ShowServiceType = {
    getPremieres() {
        const date = new Date();
        date.setDate(1);
        const formattedDate = moment(date).format('DD-MM-YYYY');
        return makeRequest('discover/tv', { 'first_air_date.gte': formattedDate, append_to_response: 'genres' })
            .then(data => data.results);
    },

    get(id) {
        return makeRequest(`tv/${id}`, {});
    },

    search(query) {
        return makeRequest('search/tv', { query })
            .then(data => data.results);
    },

    getPopular() {
        return makeRequest('tv/popular', {})
            .then(data => data.results);
    },

    getCast(id) {
        return makeRequest(`tv/${id}/credits`, {});
    }
};

function makeRequest(url: string, params: Record<string, any>) {
    const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    
    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    return axios.get(`${requestUrl}&${queryString}`, {
        headers: { 'Content-Type': 'application/json' },
        cache: true
    })
    .then(response => response.data)
    .catch(dataServiceError);
}

function dataServiceError(errorResponse: any) {
    console.error('XHR Failed for ShowService');
    console.error(errorResponse);
    throw errorResponse;
}

export default ShowService;
