// Converted from src/services/show.fct.js

import axios from 'axios';
import moment from 'moment';

import API_KEY from '../utils/constants/API_KEY';
import BASE_URL from '../utils/constants/BASE_URL';

type ShowType = {
    id: number;
    name: string;
};

type Genre = {
    id: number;
    name: string;
};

type CastMember = {
    name: string;
};

type ShowDetails = {
    id: number;
    original_name: string;
    genres?: Genre[];
    cast?: CastMember[];
};

const makeRequest = async (url: string, params: Record<string, any>) => {
    const requestUrl = `${BASE_URL}/${url}?api_key=${API_KEY}`;
    const queryString = new URLSearchParams(params).toString();
    
    try {
        const response = await axios.get(`${requestUrl}&${queryString}`, {
            headers: { 'Content-Type': 'application/json' },
            cache: true
        });
        return response.data;
    } catch (error) {
        console.error('XHR Failed for ShowService', error);
        throw error;
    }
};

const getPremieres = async (): Promise<ShowType[]> => {
    const date = new Date();
    date.setDate(1);
    
    const data = await makeRequest('discover/tv', { 
        'first_air_date.gte': moment(date).format('DD-MM-YYYY'), 
        append_to_response: 'genres' 
    });
    
    return data.results;
};

const getShowDetails = async (id: number): Promise<ShowDetails> => {
    return await makeRequest(`tv/${id}`, {});
};

const getCast = async (id: number): Promise<CastMember[]> => {
    const data = await makeRequest(`tv/${id}/credits`, {});
    
    return data.cast;
};

const searchShows = async (query: string): Promise<ShowType[]> => {
    const data = await makeRequest('search/tv', { query });
    
    return data.results;
};

const getPopularShows = async (): Promise<ShowType[]> => {
    const data = await makeRequest('tv/popular', {});
    
    return data.results;
};

export default {
    getPremieres,
    getShowDetails,
    searchShows,
    getPopularShows,
    getCast
};
